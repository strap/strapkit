var Vector2 = require('vector2');
var SK = require('strapkit');
var UI = SK.ui;
var SM = SK.metrics;
SM.init({
    app_id: "jNW93sNJpsgTGiPQF",
    resolution: "144x168",
    useragent: "PEBBLE/2.0"
});

var main = UI.view({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();
SM.log('/main/show');

main.on('click', 'up', function(e) {
  var menu =  UI.menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    SM.log('/selected/'+e.item.title);
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind =  UI.window();
  var textfield =  UI.text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
  SM.log('/main/select');
});

main.on('click', 'down', function(e) {
  var card = UI.view();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
  SM.log('/main/down');
});
