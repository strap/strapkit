var SK = require('strapkit');
var UI = SK.UI;
var SM = SK.Metrics;
SM.Init({
    app_id: "jNW93sNJpsgTGiPQF",
    resolution: "144x168",
    useragent: "PEBBLE/2.0"
});

var main = UI.View({
  title: 'Strapkit',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();
SM.Log('/main/show');

main.on('click', 'up', function(e) {
  var menu =  UI.Menu({
    sections: [{
      items: [{
        title: 'Strapkit',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.Log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.Log('The item is titled "' + e.item.title + '"');
    SM.Log('/selected/'+e.item.title);
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind =  UI.Window();
  var Textfield =  UI.Text({
    position: SK.Coord(0, 50),
    size: SK.Coord(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    TextAlign: 'center'
  });
  wind.add(Textfield);
  wind.show();
  SM.Log('/main/select');
});

main.on('click', 'down', function(e) {
  var card = UI.View();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest Window type in Strapkit.');
  card.show();
  SM.Log('/main/down');
});
