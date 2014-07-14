var StrapKit = require("./StrapKit.js");
var logger = require("./util/logger");

var app = StrapKit.init();

logger.debug(app);

var mainView = app.UI.view({
    backgroundColor: "white"
});

var helloText = app.UI.textLayer({
    alignment: 'left',
    x: '25%', // percent of available pixel space or absolute pixels
    y: '5%',
    wrap: true,
    text:'Hello StrapKit'
});
logger.debug(mainView);


mainView.addLayer(helloText);


