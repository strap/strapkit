var UI = require('ui');
var Accel = require('ui/accel');
var Vector2 = require('vector2');

var strapkit = { ui : {} };

function strapkitPebbleMapGenerator(type,pebblejs){
	if( 'ui' === type ){
		return function(config){
			return UI[pebblejs](config);
		};
	}
	
	return function(config){
		return Accel[pebblejs](config);
	};
}

(function(){
	var uiMappings = {
		'view' : 'Card',
		'menu' : 'Menu',
		'window' : 'Window',
		'text' : 'Text'
	};
	var strapkitMethod, pebblejs;
	for(strapkitMethod in uiMappings ){
		pebblejs = uiMappings[strapkitMethod];
		strapkit.ui[strapkitMethod] = strapkitPebbleMapGenerator( 'ui', pebblejs );
	}
	
	Accel.init();
	var sensorMappings = {};
	for(strapkitMethod in sensorMappings ){
		pebblejs = sensorMappings[strapkitMethod];
		strapkit.ui[strapkitMethod] = strapkitPebbleMapGenerator( 'accel', pebblejs );
	}

}());

module.exports = strapkit; 
