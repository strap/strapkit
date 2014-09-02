var UI = require('ui');
var Accel = require('ui/accel');
Accel.init();

module.exports = { 
	'ui' : {
		'view' : function(config){ return new UI.Card(config); },
		'menu' : function(config){ return new UI.Menu(config); },
		'window' : function(config){ return new UI.Window(config); },
		'text' : function(config){ return new UI.Text(config); },
		'vibe' : function(config){ return require('ui/vibe'); }
	},
	'sensors' : {
		'accel' : function(){ return Accel; }
	},
}; 
