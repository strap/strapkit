/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/
var strapkit_events = require('./events');
var strapkit_util = require('./util');

var off = function() {
    strapkit_events.removeListener.apply(strapkit_events, arguments);
};

var emit = function() {
    strapkit_events.emit.apply(strapkit_events, arguments);
};

exports = module.exports = {
    on:        function() {
        strapkit_events.on.apply(strapkit_events, arguments);
    },
    off:       off,
    removeListener:off,
    removeAllListeners:function() {
        strapkit_events.removeAllListeners.apply(strapkit_events, arguments);
    },
    emit:      emit,
    trigger:   emit,
    raw: {}
};

exports.findProjectRoot = function(opt_startDir) {
    return strapkit_util.isStrapKit(opt_startDir);
}

// Each of these APIs takes a final parameter that is a callback function.
// The callback is passed the error object upon failure, or undefined upon success.
// To use a promise instead, call the APIs via strapkit.raw.FOO(), which returns
// a promise instead of using a final-parameter-callback.
var addModuleProperty = strapkit_util.addModuleProperty;
addModuleProperty(module, 'prepare', './prepare', true);
addModuleProperty(module, 'build', './build', true);
addModuleProperty(module, 'help', './help');
addModuleProperty(module, 'config', './config');
addModuleProperty(module, 'create', './create', true);
addModuleProperty(module, 'emulate', './emulate', true);
// addModuleProperty(module, 'plugin', './plugin', true);
// addModuleProperty(module, 'plugins', './plugin', true);
// addModuleProperty(module, 'serve', './serve');
addModuleProperty(module, 'platform', './platform', true);
addModuleProperty(module, 'platforms', './platform', true);
addModuleProperty(module, 'compile', './compile', true);
addModuleProperty(module, 'run', './run', true);
addModuleProperty(module, 'info', './info', true);


