var UI = require('ui');
var Accel = require('ui/accel');
Accel.init();

// module.exports = {
// 	'ui' : {
// 		'view' : function(config){ return new UI.Card(config); },
// 		'menu' : function(config){ return new UI.Menu(config); },
// 		'window' : function(config){ return new UI.Window(config); },
// 		'text' : function(config){ return new UI.Text(config); },
// 		'vibe' : function(config){ return require('ui/vibe'); }
// 	},
// 	'sensors' : {
// 		'accel' : function(){ return Accel; }
// 	},
// 	'settings' : function(){ return require('settings'); },
// 	'ajax' : function(){ return require('ajax'); }
// }; 

UI.view = function(config){ return new UI.Card(config); };
UI.menu = function(config){ return new UI.Menu(config); };
UI.window = function(config){ return new UI.Window(config); };
UI.text = function(config){ return new UI.Text(config); };
UI.vibe = function(config){ return require('ui/vibe'); };

module.exports = {
	'ui' : UI,
	'sensors' : {
		'accel' : function(){ return Accel; }
	},
	'settings' : function(){ return require('settings'); },
	'ajax' : function(){ return require('ajax'); }
}