var log4js = require("log4js");
log4js.configure({
  appenders: [
    { type: 'console' }
  ]
});

var logger = log4js.getLogger('StrapKit');
logger.setLevel('DEBUG');

module.exports = logger;