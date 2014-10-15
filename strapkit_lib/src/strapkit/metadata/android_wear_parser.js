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


var fs            = require('fs'),
    path          = require('path'),
    xcode         = require('xcode'),
    util          = require('../util'),
    events        = require('../events'),
    shell         = require('shelljs'),
    plist         = require('plist-with-patches'),
    Q             = require('q'),
    ConfigParser  = require('../ConfigParser'),
    StrapkitError  = require('../../StrapkitError'),
    config        = require('../config');


module.exports = function android_wear_parser(project) {
    this.path = project;
    this.config_path = path.join(this.path, 'config.xml');
};

// Returns a promise.
module.exports.check_requirements = function(project_root) {
    // Rely on platform's bin/create script to check requirements.
    return Q(true);
};

//Returns a promise
module.exports.prototype = {
    // Returns the platform-specific www directory.
    js_dir:function() {
        return path.join(this.path, 'js');
    },
    config_xml:function(){
        return this.config_path;
    }
};