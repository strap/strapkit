 /*
  Copyright 2014 EnSens, LLC D/B/A Strap
  Portions derived from original source created by Apache Software Foundation.
 
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */

var path          = require('path'),
    fs            = require('fs'),
    shell         = require('shelljs'),
    platforms     = require('./platforms'),
    events        = require('./events'),
    config        = require('./config'),
    lazy_load     = require('./lazy_load'),
    Q             = require('q'),
    StrapkitError  = require('../StrapkitError'),
    ConfigParser = require('./ConfigParser'),
    util          = require('./util');

var DEFAULT_NAME = "HelloStrapKit",
    DEFAULT_ID   = "com.straphq.hellostrapkit";

/**
 * Usage:
 * @dir - directory where the project will be created. Required.
 * @id - app id. Optional, default is DEFAULT_ID.
 * @name - app name. Optional, default is DEFAULT_NAME.
 * @cfg - extra config to be saved in .strapkit/config.json
 **/
// Returns a promise.
module.exports = create;
function create(dir, id, name, cfg) {
    if (!dir ) {
        return Q.reject(new StrapkitError(
            'At least the dir must be provided to create new project. See `strapkit help`.'
        ));
    }

    // Massage parameters
    if (typeof cfg == 'string') {
        cfg = JSON.parse(cfg);
    }
    cfg = cfg || {};
    id = id || cfg.id || DEFAULT_ID;
    name = name || cfg.name || DEFAULT_NAME;

    // Make absolute.
    dir = path.resolve(dir);

    events.emit('log', 'Creating a new StrapKit project with name "' + name + '" and id "' + id + '" at location "' + dir + '"');

    var js_dir = path.join(dir, 'js');

    // dir must be either empty or not exist at all.

    // dir must be either empty except for .strapkit config file or not exist at all..
    var sanedircontents = function (d) {
        var contents = fs.readdirSync(d);
        if (contents.length === 0) {
            return true;
        } else if (contents.length == 1) {
            if (contents[0] == '.strapkit') {
                return true;
            }
        }
        return false;
    };

    if (fs.existsSync(dir) && !sanedircontents(dir)) {
        return Q.reject(new StrapkitError('Path already exists and is not empty: ' + dir));
    }

    // Read / Write .strapkit/config.json file if necessary.
    var config_json = config(dir, cfg);

    var p;
    var symlink = false; // Whether to symlink the js dir instead of copying.
    var js_parent_dir;
    var custom_config_xml;
    var custom_merges;
    var custom_hooks;

    if (config_json.lib && config_json.lib.js) {
        events.emit('log', 'Using custom js assets from '+config_json.lib.js.uri);
        // TODO (kamrik): extend lazy_load for retrieval without caching to allow net urls for --src.
        var js_version = config_json.lib.js.version || 'not_versioned';
        var js_id = config_json.lib.js.id || 'dummy_id';
        symlink  = !!config_json.lib.js.link;
        if ( js_dir.indexOf(path.resolve(config_json.lib.js.uri)) === 0 ) {
            throw new StrapkitError(
                'Project must not be created inside the js assets dir.' +
                '\n    project dir:\t' + dir +
                '\n    js assets dir:\t' + config_json.lib.js.uri
            );
        }
        if(symlink) {
            p = Q(config_json.lib.js.uri);
            events.emit('verbose', 'Symlinking custom js assets into "' + js_dir + '"');
        } else {
            p = lazy_load.custom(config_json.lib.js.uri, js_id, 'js', js_version)
            .then(function(d) {
                events.emit('verbose', 'Copying custom js assets into "' + js_dir + '"');
                return d;
            });
        }
    } else {
        // No custom js - use stock strapkit-hello-world-app.
        events.emit('verbose', 'Using stock strapkit hello-world application.');
        p = lazy_load.strapkit('js')
        .then(function(d) {
            events.emit('verbose', 'Copying stock StrapKit js assets into "' + js_dir + '"');
            return d;
        });
    }

    return p.then(function(js_lib) {
        if (!fs.existsSync(js_lib)) {
            throw new StrapkitError('Could not find directory: '+js_lib);
        }
        // Keep going into child "js" folder if exists in stock app package.
        while (fs.existsSync(path.join(js_lib, 'js'))) {
            js_parent_dir = js_lib;
            js_lib = path.join(js_lib, 'js');
        }

        // Find if we also have custom merges and config.xml as siblings of custom js.
        if (js_parent_dir && config_json.lib && config_json.lib.js) {
            custom_config_xml = path.join(js_parent_dir, 'config.xml');
            if ( !fs.existsSync(custom_config_xml) ) {
                custom_config_xml = null;
            }
            custom_merges = path.join(js_parent_dir, 'merges');
            if ( !fs.existsSync(custom_merges) ) {
                custom_merges = null;
            }
            custom_hooks = path.join(js_parent_dir, 'hooks');
            if ( !fs.existsSync(custom_hooks) ) {
                custom_hooks = null;
            }
        }

        var dirAlreadyExisted = fs.existsSync(dir);
        if (!dirAlreadyExisted) {
            shell.mkdir(dir);
        }
        if (symlink) {
            try {
                fs.symlinkSync(js_lib, js_dir, 'dir');
                if (custom_merges) {
                    fs.symlinkSync(custom_merges, path.join(dir, 'merges'), 'dir');
                }
                if (custom_hooks) {
                    fs.symlinkSync(custom_hooks, path.join(dir, 'hooks'), 'dir');
                }
                if (custom_config_xml) {
                    fs.symlinkSync(custom_config_xml, path.join(dir, 'config.xml'));
                }
            } catch (e) {
                if (!dirAlreadyExisted) {
                    fs.rmdirSync(dir);
                }
                if (process.platform.slice(0, 3) == 'win' && e.code == 'EPERM')  {
                    throw new StrapkitError('Symlinks on Windows require Administrator privileges');
                }
                throw e;
            }
        } else {
            shell.mkdir(js_dir);
            shell.cp('-R', path.join(js_lib, '*'), js_dir);
            if (custom_merges) {
                var merges_dir = path.join(dir, 'merges');
                shell.mkdir(merges_dir);
                shell.cp('-R', path.join(custom_merges, '*'), merges_dir);
            }
            if (custom_hooks) {
                var hooks_dir = path.join(dir, 'hooks');
                shell.mkdir(hooks_dir);
                shell.cp('-R', path.join(custom_hooks, '*'), hooks_dir);
            }
            if (custom_config_xml) {
                shell.cp(custom_config_xml, path.join(dir, 'config.json'));
            }

        }

        // Create basic project structure.
        shell.mkdir(path.join(dir, 'platforms'));
        if ( !custom_merges) {
            shell.mkdir(path.join(dir, 'merges'));
        }
        // shell.mkdir(path.join(dir, 'plugins'));
        // shell.mkdir(path.join(dir, 'hooks'));

        // Add hooks README.md
        // shell.cp(path.join(__dirname, '..', '..', 'templates', 'hooks-README.md'), path.join(dir, 'hooks', 'README.md'));

        var configPath = util.projectConfig(dir);
        // Add template config.xml for apps that are missing it
        if (!fs.existsSync(configPath)) {
            var template_config_xml = path.join(__dirname, '..', '..', 'templates', 'config.xml');
            shell.cp(template_config_xml, configPath);
            // Write out id and name to config.xml
            var config = new ConfigParser(configPath);
            config.setPackageName(id);
            config.setName(name);
            config.write();
        }
    });
}
