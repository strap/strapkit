 /*
    Copyright 2014 EnSens, LLC D/B/A Strap
   
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
 // general modules
 var _ = require("underscore")._;
 var logger = require("../util/logger");
 var util = require("../util/util");

 var UI = {
     view: function(args) {
     	// private
        var id = 'v' + util.gen();

        logger.debug('Init view with args ' + args);

        // public
        var v = {};
	  	v.backgroundColor = args.backgroundColor;
      	v.layers = {};

		v.addLayer = function() {
		    logger.debug(this);
		    // add the specified layer to this view
		    v.layers[id] = this;
		    return this.view;
		};

		v.show = function() {
		    return {};
		};

		v.hide = function() {
		    return {};
		};

		v.destroy = function() {
		    return {};
		};

      	v.getId = function() {
      		return id;
      	};

	    return v;
     },
     textLayer: function(args) {
         logger.debug('Init textLayer');
     },
     imageLayer: function(args) {
         logger.debug('Init imageLayer');
     }
 };



 module.exports = UI;
