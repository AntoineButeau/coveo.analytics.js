'use strict';

var UA = {};

// Let's be able to use it in the browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Coveo.UA;
} else {
    var Coveo = Coveo || { };
    Coveo.UA = UA;
    if(window){
        window.Coveo = Coveo;
    }
}


// XHR Utils
var XHR = window.XMLHttpRequest || noop;

// JSONP utils
var _callbackNONCE = Math.floor(Math.random() * 1000) + 1; // Set unique id for jsonp callbacks
var _getCallbackNONCE = function(){ return (++_callbackNONCE); };
var _getJSONP = function(url, params, callback){

    var callbackName = '__callback' + _getCallbackNONCE();
    window[callbackName] = function(){
        callback.call(this);
        delete window[callbackName];
    };

    // TODO: Convert Params to url params if there are any
    var paramString = '';
    var pkeys = Object.keys(params);
    pkeys.forEach(function(pkey){
        paramString += pkey + '=' + encodeURIComponent(params[pkey]);
    });

    var scr = document.createElement('script');
    scr.src = url + '?' + paramString;
    document.body.appendChild(scr);
};

// CoveoAnalytics
//
// options : {
//   endpoint: 'https://usageanalytics.coveo.com'
// }
var _defaultVersion = 13;
var _defaultEndpoint = 'https://usageanalytics.coveo.com/rest/v' + _defaultVersion + '/analytics';

function CoveoAnalytics(options){
    // Do not require new when calling
    if(!(this instanceof CoveoAnalytics)){
        return new CoveoAnalytics(options);
    }

    this.version = options.version || _defaultVersion;
    this.endpoint = options.endpoint || _defaultEndpoint;
    this.token = options.token;
}

// Queries
// get status : gets the status of the analytics service
// returns an object with:
// { status : '' }
CoveoAnalytics.prototype.getStatus = function(callback){
    var url = '/rest/v' + this.version + '/analytics/status';
    _getJSONP(url,{}, callback);
};

// post search : add a search event
CoveoAnalytics.prototype.sendSearchEvent = function(){ return false; };
// post searches : add multiple seaches
CoveoAnalytics.prototype.sendSearchEvents = function(){ return false; };
// post click : add click event
CoveoAnalytics.prototype.sendClickEvent = function(){ return false; };
// post custom : add custom events
CoveoAnalytics.prototype.sendCustomEvent = function(data, callback){
    var url = '/rest/v' + this.version + '/analytics/custom';
    // TODO: Add some params if needed
    _getJSONP(url, data, callback);
};

// delete session : clears cookies
CoveoAnalytics.prototype.deleteSession = function(){
    // Needs to be a delete XHR call
    return false;
};

// Export
UA.CoveoAnalytics = CoveoAnalytics;
