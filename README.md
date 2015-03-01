Strap Kit - Cross-Platform Tools for Wearable Developers
----
A cross platform development framework for wearables.

Use ```strapkit``` to generate a new project with Strap Metrics built right in. More to follow.

## Version
0.0.1

## LICENSE

See [LICENSE](LICENSE)

## Checking Dependencies

Strap Kit requires git, python, node, and npm at a minimum, and platform specific SDK's like Pebble and Android Wear to build for those platforms. To check your dependencies, you can run the command below (requires curl and bash). For a full run down of how to install the dependencies, go to the <a href="https://docs.straphq.com" target="_blank">full developer docs</a>.

```bash
$> curl http://check-config.straphq.com | bash
```

## Installation

```bash
$> sudo npm install strapkit -g
```

## Using the CLI

* Create your Strapkit project.
```bash
$> strapkit create TestProject
```
OR
```bash
$> strapkit create ./TestProject com.testproject TestProject
```

```strapkit create``` generates a starter app.js in ./TestProject/js. This is where you write your app using the API documentation below.

* Choose deployment platforms.

```bash
$> strapkit platform add pebble android-wear
```
OR, to add just one platform only, you may specify that platform by itself.
```bash
$> strapkit platform add pebble
```
Removing platforms is just as easy as adding them.
```bash
$> strapkit platform remove pebble
```

* Compile for all platforms.
```bash
$> strapkit build
```
OR, to compile for one platform only, you may specify just that platform.
```bash
$> strapkit build pebble
```
If you wish to forego using Strap kit to install your app, the compiled binary of your app is available in a "build" folder after running the Strap kit build command.

* Install to device.
```bash
# When not using pebble
$> strapkit install

# IP Required for pebble
$> strapkit install Phones.IP.Goes.Here
```
Publish 'n' Profit!

## Write your first cross platform app

### Page
A Page is the container for all your app's UI. When you create a new page, you are bringing the user to a different set of looks and actions.

#### Example

```javascript
var splashPage = StrapKit.UI.Page();

var card = StrapKit.UI.Card({
  title: 'Weather App',
  body:'Loading data now...'
});

// Adds content to a Page
splashPage.addView(card);

// Tells your wearable app to show this page
splashPage.show();
```
#### Initialize
```javascript
var page = StrapKit.UI.Page();
```
OR
```javascript
var page = StrapKit.UI.Page(cardView);
var page = StrapKit.UI.Page([textView, anotherView]);
```
#### Add View
```javascript
page.addView(textView);
```
#### Show Page
```javascript
page.show();
```

### Card View
Card is a standard wearable UI component across all platforms. This UI
component typically has a title and a body associated with it, and can be
clickable. This must be added to a Page in order for the component to be shown.

#### Example
```javascript
var card = StrapKit.UI.Card({
  title: "My First App",
  body: "Writing apps are easy with StrapKit JS"
});
myPage.addView(card);
```
#### Initialize
```javascript
var card = StrapKit.UI.Card({
    title: 'My Title',  // The title of your card
    body: 'My Body',  // The body of your card
    onClick: function() { // What happens when you click on the card
        console.log('My Function');
    }
});
```
#### Set On Click Function
```javascript
card.setOnClick(function() {
    console.log("My Card was clicked");
});
```
### TextView
TextView is a standard wearable UI component across all platforms. This UI
component can show text and a position of your your choosing.

#### Example
```javascript
var textView = StrapKit.UI.TextView({
    position: "center",
    text: "Loading weather data..."
});
myPage.addView(textView);
```
#### Position
```javascript
StrapKit.UI.TextView({
    position: 'center|right|left'
    // center: puts text center justified within your page
    // right: puts text right justified within your page
    // left (default): puts text left justified within your page
});
```
### ListView
ListView is a standard wearable UI competent across all platforms. This UI
component will show a list of items defined by you. And Item will contain a
title and a subtitle as strings. To make the app more interactive, you can
attach an object to and Item as data.

#### Example
```javascript
var menuItems = [
    {
        title: 'My Title 1',
        subtitle: 'My Subtitle 1',
        data: {info: "My Info 1"}
    },
    {
        title: 'My Title 2',
        subtitle: 'My Subtitle 2',
        data: {info: "My Info 2"}
    }];

var resultsMenu = StrapKit.UI.ListView({
    items: menuItems
});

resultsMenu.setOnItemClick(function(e) {
    console.log(JSON.stringify(e.item));
    // { "title":"My Title 1","subtitle":"My Subtitle 1","data":{"info":"My Info 1"}}
    console.log(e.itemIndex);
    // 0
});
```
#### Set On Item Click
```javascript
myList.setOnItemClick(function(e) {
    e.item // returns the item you clicked on containing title, subtitle and data
    e.itemIndex // returns the index of the item you clicked on
});
```
## Deletion

```bash
$> strapkit delete TestProject
```
### HttpClient
HttpClient allows you to access API clients outside of the wearable app.
#### Example
```javascript
StrapKit.HttpClient(
  {
    url:'http://api.openweathermap.org/data/2.5/forecast?q=London',
    type:'json'
  },
  function(data) {
    console.log(JSON.stringify(data));
  },
  function(error) {
    console.log(error);
  }
);
```
#### Opts
```javascript
StrapKit.HttpClient({
  // url: url to call
  // method: 'POST', 'GET', 'UPDATE', etc
  // data: { 'username': 'myUsername'}
  // headers: { 'Authorization': 'Token: 0sdknweeksokdf0'}
}, success, failure);
```
### Strap Metrics
With StrapKit JS, adding Strap Metrics to your app is a breeze.
#### Initialize
Initializing Strap Metrics allows you to immediately get access to diagnostics and sensor data. You can then log events that are specific to your app.
```javascript
var app_id = "8djanek08sdjk";
StrapKit.Metrics.init(app_id); // Metrics will start logging sensor data

// Log an event
StrapKit.Metrics.logEvent("/myfirstevent/winning");

// Log an event with data
var myInfo = {info: "This was easy"};
StrapKit.Metrics.logEvent("/myfirstevent/data", myInfo);
```

### Location
StrapKit JS can leverage native geolocation in Javascript to get the location of the device. A callback can be used to extract the `position` from the successful function. The generic form of this method is:

```
navigator.geolocation.getCurrentPosition(success, failure, options);
```

#### Example
```
if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Got geolocation!");

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

    }, function() {
        console.log("Failed to get geolocation!");
    }, {
        maximumAge: 50000,
        timeout: 5000,
        enableHighAccuracy: true
    });
}
```
