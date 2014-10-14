var Vector2 = require('vector2');
var UI = require('ui');
var Accel = require('ui/accel');
Accel.init();

var APP = {};

UI.View = function(config){ return new UI.Card(config); };
UI.Menu = function(config){ return new UI.Menu(config); };
UI.Window = function(config){ return new UI.Window(config); };
UI.Text = function(config){ return new UI.Text(config); };
UI.Vibe = function(config){ return require('ui/vibe'); };

module.exports = {
    'Coord': function(X,Y){ return Vector2(X,Y); },
	'UI' : UI,
	'Sensors' : {
		'Accel' : function(){ return Accel; }
	},
	'Settings' : function(){ return require('settings'); },
	'Ajax' : function(){ return require('ajax'); }
};