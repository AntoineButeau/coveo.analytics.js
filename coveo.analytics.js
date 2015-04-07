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
var XHR = window.XMLHttpRequest;

// JSONP utils
var _callbackNONCE = Math.floor(Math.random() * 1000) + 1; // Set unique id for jsonp callbacks
var _getCallbackNONCE = function(){ return (++_callbackNONCE); };
var _getJSONP = function(url, params, callback){

    var callbackName = '__coveoua' + _getCallbackNONCE();
    window[callbackName] = function(){
        callback.call(this);
        delete window[callbackName];
    };

    // TODO: Convert Params to url params if there are any
    var paramString = '';
    var pkeys = Object.keys(params);
    pkeys.forEach(function(pkey){
        paramString += pkey + '=' + encodeURIComponent(JSON.stringify(params[pkey]));
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
    var url = this.endpoint + '/status';
    _getJSONP(url, {}, callback);
};

// CoveoAnalytics.prototype.sendSearchEvent(data,callback)
// sends a search event logging to the analytics service
// {
//   "searchQueryUid": "",
//   "queryText": "",
//   "actionCause": "",
//   "advancedQuery": "",
//   "resultsPerPage": 0,
//   "pageNumber": 0,
//   "numberOfResults": 0,
//   "contextual": false,
//   "responseTime": 0,
//   "results": [
//     {
//       "documentUri": "",
//       "documentUriHash": ""
//     }
//   ],
//   "originLevel1": "",
//   "originLevel2": "",
//   "originLevel3": "",
//   "queryPipeline": "",
//   "actionType": "",
//   "anonymous": false,
//   "userGroups": [
//     ""
//   ],
//   "userDisplayName": "",
//   "customData": "Map[string,Object]",
//   "device": "",
//   "mobile": false,
//   "splitTestRunName": "",
//   "splitTestRunVersion": "",
//   "userAgent": "",
//   "username": "",
//   "language": ""
// }
CoveoAnalytics.prototype.sendSearchEvent = function(data, callback){
    var url = this.endpoint + '/search';
    _getJSONP(url, {searchEvent: data}, callback);
};
// post searches : add multiple seaches
// [
// {
//   "searchQueryUid": "",
//   "queryText": "",
//   "actionCause": "",
//   "advancedQuery": "",
//   "resultsPerPage": 0,
//   "pageNumber": 0,
//   "numberOfResults": 0,
//   "contextual": false,
//   "responseTime": 0,
//   "results": [
//     {
//       "documentUri": "",
//       "documentUriHash": ""
//     }
//   ],
//   "originLevel1": "",
//   "originLevel2": "",
//   "originLevel3": "",
//   "queryPipeline": "",
//   "actionType": "",
//   "anonymous": false,
//   "userGroups": [
//     ""
//   ],
//   "userDisplayName": "",
//   "customData": "Map[string,Object]",
//   "device": "",
//   "mobile": false,
//   "splitTestRunName": "",
//   "splitTestRunVersion": "",
//   "userAgent": "",
//   "username": "",
//   "language": ""
// }
// ]
CoveoAnalytics.prototype.sendSearchEvents = function(data, callback){
    var url = this.endpoint + '/searches';
    _getJSONP(url, {searchEvents: data}, callback);
};
// post click : add click event
// {
//   "documentUri": "",
//   "documentUriHash": "",
//   "searchQueryUid": "",
//   "collectionName": "",
//   "sourceName": "",
//   "documentPosition": 0,
//   "actionCause": "",
//   "documentTitle": "",
//   "documentUrl": "",
//   "queryPipeline": "",
//   "actionType": "",
//   "anonymous": false,
//   "userGroups": [
//     ""
//   ],
//   "userDisplayName": "",
//   "customData": "Map[string,Object]",
//   "device": "",
//   "mobile": false,
//   "splitTestRunName": "",
//   "splitTestRunVersion": "",
//   "userAgent": "",
//   "username": "",
//   "language": ""
// }
CoveoAnalytics.prototype.sendClickEvent = function(data, callback){
    var url = this.endpoint + '/click';
    _getJSONP(url, {searchEvent: data}, callback);
};
// post custom : add custom events
// {
//   "eventType": "",
//   "eventValue": "",
//   "lastSearchQueryUid": "",
//   "anonymous": false,
//   "userGroups": [
//     ""
//   ],
//   "userDisplayName": "",
//   "customData": "Map[string,Object]",
//   "device": "",
//   "mobile": false,
//   "splitTestRunName": "",
//   "splitTestRunVersion": "",
//   "userAgent": "",
//   "username": "",
//   "language": ""
// }
CoveoAnalytics.prototype.sendCustomEvent = function(data, callback){
    var url = this.endpoint + '/custom';
    // TODO: Add some params if needed
    _getJSONP(url, {customEvent: data}, callback);
};

// delete session : clears cookies
CoveoAnalytics.prototype.deleteSession = function(){
    var url = this.endpoint + '/click';

    var xhr = new XHR();
    xhr.onprogress = function(){}; // IE9 ...
    xhr.open('DELETE', url, false);
};

// Export
UA.CoveoAnalytics = CoveoAnalytics;
