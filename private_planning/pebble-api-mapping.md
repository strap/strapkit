#Pebble API Mapping to StrapKit JS
=====================
### Contributors:

Steve Caldwell, Marcelle Bonterre


=====================

Complete module documentation can be found at https://developer.getpebble.com/2/api-reference.

Format will be generally as follows:

    Pebble: the Pebble function stub that needs to be represented
    PebContext: the parent function or context of the Peb function (if req)

    JS: the StrapKit API function that produces it
    JSContext: the parent function or context of the JS function (if req)

##Foundation

###App

App entry point and event loop.

    Pebble: void app_event_loop(void)
    PebContext: int main(void)

    JS: handled by StrapKit 
    JSContext: handled by StrapKit

###AppMessage
AppMessage is for bi-directional communication between the phone apps and watchapps. Typically if there will be ongoing passing of data back and forth (like for updating layers from the result of HTTP calls or location service updates), you'll call functions to open the protocol and also register callbacks. In our case, I recommend that we always open AppMessage with the max available inbox/outbox size and include handlers on the C side that will update layers/do things on the watch. 

We will have to come up with a good way to detect whether or not callbacks on the various elements will need to pass data via appmessage. This is likely one of the most challenging core elements in the StrapKit as we attempt to establish a reliable way to pass things between watch and phone from our bindings.

####
    Pebble: void app_event_loop(void)
    PebContext: int main(void)

    JS: handled by StrapKit 
    JSContext: handled by StrapKit

###Resources


##Layers

