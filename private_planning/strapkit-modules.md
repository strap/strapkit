#StrapKit Modules API
=====================
###Contributors:

Steve Caldwell, Marcelle Bonterre

The following modules are available with every StrapKit project by default.

=====================

##com.straphq.strapkit.ui

This module provides access to create and modify UI elements on the device.

####strapkit.ui.view()

Creates a view element.

__Constructor:__

    new strapkit.ui.view();

__Options:__

* backgroundColor: the view's background color (String,default:'black')

__Methods:__

* view.show
* view.hide
* view.destroy
* view.addLayer

__Example:__

    var helloView = new strapkit.ui.view();

####strapkit.ui.textLayer()

Draw text in a view.

__Constructor:__
    
    new strapkit.ui.textLayer(options)

__Options:__

* text: text to display in the text layer (String, default:'')
* x: offset in percent or px (String, default: 0px)
* y: offset in percent or px (String, default: 0px)
* wrap: wrap long lines (Boolean, default: false)
* style: text style (String, default: 'default')
    - See StrapKit text style guide for more info

__Methods:__

* textLayer.show
    - make the given textLayer visible
* textLayer.hide
    - make the given textLayer hidden
* textLayer.destroy
    - remove the given textLayer completely

__Example:__

    var helloText = new strapkit.ui.textLayer({
        alignment: 'left',
        x: '25%', // percent of available pixel space or absolute pixels
        y: '5%',
        wrap: true,
        text:'Hello StrapKit'
    });

    helloView.addLayer(helloText);

####strapkit.ui.imageLayer()

Draw an image in a view.

    var helloImg = new strapkit.ui.imageLayer({
        src: '/resources/hello.png',
        x: '25%', // percent of available pixel space or absolute pixels
        y: '25%',
        width:'24px',
        height:'22px'
    });

    helloView.addLayer(helloImg);

####strapkit.ui.menuLayer()

Draw a scrollable menu in a view.

    var helloMenu = new strapkit.ui.menuLayer([{
        title: 'Menu Item 1',
        subtitle:'Update text',
        onSelect: function() {
            helloText.text = 'Hello Again!';
        }
    },{
        title: 'Menu Item 2',
        subtitle:'Short vibration',
        onSelect: function() {
            strapkit.vibrator.vibe("short");
        }
    },{
        title: 'Menu Item 3',
        subtitle:'Delete text'
        onSelect: function() {
            strapkit.notifications.confirm({
                title: 'Deleting Text', // title
                message: 'Are you sure?', // message
                callback: function(r) {
                    if (r) {
                        helloText.destroy();
                    }
                }
            });
        }
    }]);

    menuView.addLayer(helloMenu);

## com.straphq.strapkit.notifications

This module provides access to notification elements on the device.

__Methods:__

####strapkit.notifications.alert()

Provides a simple notification on the device

    strapkit.notifications.alert({
        title: 'Hey there!',
        message: 'StrapKit is awesome'
    });


####strapkit.notifications.confirm()

Provides a Yes/No confirmation dialog on the device.

__Example:__

    onNotificationEnd = function(result) {
        if (result){
            // do something
        } else {
            // answered no
        }
    }

    strapkit.notifications.confirm({
        title: 'Need Input', // title
        message: 'Are you sure?', // message
        callback: onNotificationEnd
    });