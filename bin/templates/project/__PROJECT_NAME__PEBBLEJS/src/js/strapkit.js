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
	var mappings = {
		'view' : 'Card',
		'menu' : 'Menu',
		'window' : 'Window',
		'text' : 'Text'
	};

	for(var strapkitMethod in mappings ){
		var pebblejs = mappings[strapkitMethod];
		strapkit.ui[strapkitMethod] = strapkitPebbleMapGenerator( 'ui', pebblejs );

	}
}());

(function(){
	Accel.init();
	var mappings = {
	};

	for(var strapkitMethod in mappings ){
		var pebblejs = mappings[strapkitMethod];
		strapkit.ui[strapkitMethod] = strapkitPebbleMapGenerator( 'accel', pebblejs );

	}
}());

module.exports = strapkit; 
