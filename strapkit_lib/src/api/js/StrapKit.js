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
 var logger = require("./util/logger");
 //

 // strapkit modules
 // see modules/index.js
 var modules = require("./modules");
 var strapkit = {};

 var StrapKit = {

    init: function() {

    // add each module into the StrapKit object so it is available for the caller

     _.each(modules, function(members, name) {
         strapkit[name] = members;
     });

     return strapkit;

 	},

    reset: function() {
		StrapKit = {};
     	return StrapKit;
     }


 };





 module.exports = StrapKit;
