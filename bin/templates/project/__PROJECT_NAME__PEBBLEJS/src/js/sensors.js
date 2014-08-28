var Accel = require('ui/accel');

var strapkit = { ui : {} };

function strapkitPebbleMapGenerator(pebblejs){
	return function(config){
		return Accel[pebblejs](config);
	};
}

(function(){
	Accel.init();
	var mappings = {
	};

	for(var strapkitMethod in mappings ){
		var pebblejs = mappings[strapkitMethod];
		strapkit.ui[strapkitMethod] = strapkitPebbleMapGenerator( pebblejs );

	}
}());

module.exports = strapkit;