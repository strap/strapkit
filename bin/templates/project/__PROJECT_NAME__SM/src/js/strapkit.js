var Vector2 = require('vector2');
var UI = require('ui');
var Accel = require('ui/accel');
Accel.init();

var strap_api_url = "https://api.straphq.com/create/visit/with/";

var strap_api_clone = function(obj) {
    var copy = {};
    var attr;
    if (!obj || "object" !== typeof obj) { return obj; }
    for (attr in obj) {
        if (obj.hasOwnProperty(attr)) { copy[attr] = obj[attr]; }
    }
    return copy;
};

// probably want to clone your constant params before adding values
// var params = strap_api_clone(strap_params);

function strap_api_init_accel(accel, params){
    accel.config({
        rate: 10,
        samples: 10
    });
    var p = strap_api_clone(params); 
    p['action_url'] = "STRAP_API_ACCL";
    strap_api_accl_on(accel, p);
}

function strap_api_accl_on(accel, params){
    console.log("turning accl on");
    strap_api_log(params);
    accel.on('data', function(e){
        // correcting for odd time values
        var now = new Date().getTime();
        var base = 0;
        if(e.accels.length > 0){
            base = e.accels[0].time;
        }
        //console.log(JSON.stringify(e.accels));
        for(var i = 0; i < e.accels.length; i++){
            e.accels[i].time = now + e.accels[i].time - base;
        }
        var tmpstore = window.localStorage['strap_accl'];
        if(tmpstore){
            tmpstore = JSON.parse(tmpstore);
        }
        else {
            tmpstore = [];
        }
        tmpstore = tmpstore.concat(e.accels);
        window.localStorage['strap_accl'] = JSON.stringify(tmpstore);
    });
    setTimeout(function(){
        strap_api_log(params);
        strap_api_accl_off(accel, params);
    },1000 * 60 * 1);
}

function strap_api_accl_off(accel, params){
    console.log("turning accl off");
    strap_api_log(params);
    accel.off();
    setTimeout(function(){
        strap_api_log(params);
        strap_api_accl_on(accel, params);
    },1000 * 60 * 2);
}

function strap_api_init(params){
    var lp = strap_api_clone(params);
    lp['action_url'] = 'STRAP_START';
    strap_api_log(lp);
}

function strap_api_conv_accel(data, act){
    var da = [];
    for(var i = 0; i < data.length; i++){
        var d = {};
        d.x = data[i].x;
        d.y = data[i].y;
        d.z = data[i].z;
        d.ts = data[i].time;
        d.vib = data[i].vibe?true:false;
        d.act = act;
        da.push(d);
    }
    return da;
}

function strap_api_log(params){
    var lp = params;
    var req = new XMLHttpRequest();
    req.open("POST", strap_api_url, true);

    var tz_offset = new Date().getTimezoneOffset() / 60 * -1;
    var query = "app_id=" + lp['app_id']
        + "&resolution=" + (lp['resolution'] || "")
        + '&useragent=' + (lp['useragent']  || "")
        + '&action_url=' + (lp['action_url']  || "")
        + '&visitor_id=' + (lp['visitor_id'] || Pebble.getAccountToken())
        + '&act=' + (lp['act']  || "")
        + '&visitor_timeoffset=' + tz_offset;
        
    if(lp['action_url'] === "STRAP_API_ACCL"){
        var tmpstore = window.localStorage['strap_accl'];
        if(tmpstore){
            tmpstore = JSON.parse(tmpstore);
        }
        else {
            tmpstore = [];
        }
        if(tmpstore.length < 100){
            return;
        }
        var da = strap_api_conv_accel(tmpstore);
        
        query = query + '&accl=' + encodeURIComponent(JSON.stringify(da));
        window.localStorage.removeItem('strap_accl');
    }
    else{
        var p = strap_api_clone(params); 
        p['action_url'] = "STRAP_API_ACCL";
        setTimeout(function(){
            strap_api_log(p);
        }, 100);
    }
        
    //console.log('query: ' + query);
    
    //Send the proper header information along with the request
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Content-length", query.length);
    req.setRequestHeader("Connection", "close");

    req.onload = function(e) {
        if (req.readyState == 4 && req.status == 200) {
            if(req.status == 200) {
                //console.log("Sent");
            } else { 
            //console.log("Error"); 
            }
        }
    };
    req.send(query);
}

var APP = {};

UI.View = function(config){ return new UI.Card(config); };
UI.Menu = function(config){ return new UI.Menu(config); };
UI.Window = function(config){ return new UI.Window(config); };
UI.Text = function(config){ return new UI.Text(config); };
UI.Vibe = function(config){ return require('ui/vibe'); };

module.exports = {
    'Coord': function(X,Y){ return new Vector2(X,Y); },
    'UI' : UI,
    'Sensors' : {
        'Accel' : function(){ return Accel; }
    },
    'Settings' : function(){ return require('settings'); },
    'Ajax' : function(){ return require('ajax'); },
    'Metrics' : { 
        'Init' : function(params){
            APP = strap_api_clone(params);
            if( APP ) {
                if( Accel ) { strap_api_init_accel(Accel, APP); }
                strap_api_init(APP);
            }
        },
        'Log' : function(e){
            var params = strap_api_clone(APP);
            params['action_url'] = e;
            strap_api_log(params);
        }
    }
};