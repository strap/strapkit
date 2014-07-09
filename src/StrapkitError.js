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


// A derived exception class. See usage example in cli.js
// Based on:
// stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/8460753#8460753
function StrapkitError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
}
StrapkitError.prototype.__proto__ = Error.prototype;

module.exports = StrapkitError;
