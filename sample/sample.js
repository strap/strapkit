var SK = require('strapkit');
var Vector2 = require('vector2');

var main = SK.ui.view({
  title: 'Strapkit',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = SK.ui.menu({
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
    console.log('Selected item: ' + e.section + ' ' + e.item);
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = SK.ui.window();
  var textfield = SK.ui.text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = SK.ui.view();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Strapkit.');
  card.show();
});
