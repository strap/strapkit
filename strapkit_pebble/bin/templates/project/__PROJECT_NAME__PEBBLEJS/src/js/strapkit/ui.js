var UI = require('./pebblejs/src/js/ui');
var Vector2 = require('./pebblejs/src/js/lib/vector2');

var strapkit = { ui : {} };

function strapkitPebbleMapGenerator(pebblejs){
	return function(config){
		return UI[pebblejs](config);
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
		strapkit.ui[strapkitMethod] = strapkitPebbleMapGenerator( pebblejs );

	}
}());

module.exports = strapkit;