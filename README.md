StrapKit - Cross-Platform Tools for Wearable Developers
----
A cross platform development framework for wearables.

Use ```strapkit``` to generate a new project with StrapMetrics built right in. More to follow.

## Version
0.0.1

## LICENSE

See [LICENSE](LICENSE)

## Installation

```bash
sudo npm install strapkit -g
```

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
Card is a standard wearable UI compenent accross all platforms. This UI compenent typically has a title and a body associated with it, and can be clickable. This must be added to a Page in order for the compenent to be shown.

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
TextView is a standard wearable UI compenent accross all platforms. This UI compenent can show text and a position of your your choosing.
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
    // left (default): puts text left justificed within your page
});
```
### ListView
ListView is a standard wearable UI compenent accross all platforms. This UI compenent will show a list of items defined by you. And Item will contain a title and a subtitle as strings. To make the app more interactive, you can attach an object to and Item as data.
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
  // heaaders: { 'Authorization': 'Token: 0sdknweeksokdf0'}
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
