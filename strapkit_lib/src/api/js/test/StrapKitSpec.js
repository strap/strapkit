var expect = require("chai").expect;
var sk = require("../StrapKit.js");


describe("StrapKit", function() {
    describe("init()", function(){
        it("should return an empty object", function(){
            expect(sk.init()).to.be.defined;
        });
    });
    describe("reset()", function(){
        it("should return an empty object", function(){
            expect(sk.reset()).to.be.empty;
        });
    });
});