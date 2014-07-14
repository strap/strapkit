var util = {
    gen: function() {
        // even though this is a simple generator
        // collision will be highly unlikely in an individual application

        var gen = Math.floor(Math.random() * 1000001);

        // we get 5 or 6 digit numbers from the generator function
        // make sure that the length is always 6.

        return (gen.toString().length == 6) ? gen : 10 * gen;

    }
};

module.exports = util;
