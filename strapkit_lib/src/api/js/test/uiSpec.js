var expect = require("chai").expect;
var ui = require("../modules/UI.js");


describe("UI", function() {
    describe("view()", function() {
        
        var newView = ui.view({backgroundColor:'black'})

        it("should exist", function() {
            expect(ui.view).to.exist;
        });

        // viewObject = {backgroundColor:'black',id:'v123456'}
        it("should return a view object", function() {
            expect(newView).to.have.property('backgroundColor');
            expect(newView).to.have.property('id');
        });

        it("should have a generated name consisting of v and a 6 number string", function() {
            expect(newView.id).to.match(/v\d\d\d\d\d\d/);
        });
        describe("addLayer()", function() {
            it("should exist", function() {
                expect(ui.view.addLayer).to.exist;
            });

            // viewObject = {backgroundColor:'black',id:'v123456',layers:{
            //    'tl123456':{text:'foo',id:'tl123456',x:'25%',y:'5%',wrap:false}
            // }

            it("should return a view object with a layers object", function() {
                expect(newView).to.have.property('backgroundColor');
                expect(newView).to.have.property('id');
                expect(newView).to.have.property('layers');
            });

        });
        
        describe("show()", function() {
            it("should exist", function() {
                expect(ui.view.show).to.exist;
            });
        });
        describe("hide()", function() {
            it("should exist", function() {
                expect(ui.view.hide).to.exist;
            });
        });
        describe("destroy()", function() {
            it("should exist", function() {
                expect(ui.view.destroy).to.exist;
            });
        });
    });

    describe("textLayer()", function() {
        var newTextLayer = ui.textLayer({backgroundColor:'black'})

        it("should exist", function() {
            expect(ui.textLayer).to.exist;
        });

        // textLayerObject = {text:'foo',id:'tl123456',x:'25%',y:'5%',wrap:false}
        it("should return a textLayer object", function() {
            expect(newTextLayer).to.have.property('text');
            expect(newTextLayer).to.have.property('id');
            expect(newTextLayer).to.have.property('x');
            expect(newTextLayer).to.have.property('y');
            expect(newTextLayer).to.have.property('wrap');
        });

        it("should have a generated name consisting of tl and a 6 number string", function() {
            expect(newTextLayer.id).to.match(/tl\d\d\d\d\d\d/);
        });
    });

    describe("imageLayer()", function() {
        it("should exist", function() {
            expect(ui.imageLayer).to.exist;
        });
    });
});
