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

module.exports = {
    'pebble' : {
        parser : './metadata/pebble_parser',
        url    : 'https://github.com/strap/strapkit_pebble/tarball/master/',
        version: '0.1.0'
    },
    'samsung-gear' : {
        parser : './metadata/samsung_gear_parser',
        url    : '',
        version: '0.1.0'
    },
    'android-wear' : {
        parser : './metadata/android_wear_parser',
        url    : 'https://bitbucket.org/strap/strapkit_wear/get/master.tar.gz',
        version: '0.1.0'
    },
    'js' : {
        hostos:[],
        url    : 'https://github.com/strap/strapkit_app_hello_world/tarball/master/',
        version: '0.1.0'
    }
};

var addModuleProperty = require('./util').addModuleProperty;
Object.keys(module.exports).forEach(function(key) {
    var obj = module.exports[key];
    if (obj.parser) {
        addModuleProperty(module, 'parser', obj.parser, false, obj);
    }
});
