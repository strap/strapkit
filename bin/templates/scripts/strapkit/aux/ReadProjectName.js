var ConfigParser = require('./ConfigParser');

var args = process.argv.slice(2);
var configPath = args[0];
var config = new ConfigParser(configPath);
console.log(config.name());