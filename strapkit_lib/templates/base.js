var exec = require('strapkit/exec');

exports.coolMethod = function(arg0, success, error) {
    exec(success, error, "%pluginName%", "coolMethod", [arg0]);
};
