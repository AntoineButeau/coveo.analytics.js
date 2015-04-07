// coveo.analytics.js 0.0.0
// https://github.com/coveo/coveo.analytics.js
// (c) 2015 Coveo
// freely distributed under the MIT license

(function(){
    'use strict';

    // this === window in the browser context
    var root = this;
    var doc = this.document;

    // XHR Utils
    var XHR = window.XMLHttpRequest;

    // JSONP utils
    var _callbackNONCE = Math.floor(Math.random() * 1000) + 1; // Set unique id for jsonp callbacks
    var _getCallbackNONCE = function(){ return (++_callbackNONCE); };
    var _getJSONP = function(url, params, callback){

        if(!params){ params = {}; }

        if(callback){
            var callbackName = 'coveoua__' + _getCallbackNONCE();
            root[callbackName] = function(){
                callback.call(this);
                delete window[callbackName];
            };
            params.callback = callbackName;
        }
        // TODO: Convert Params to url params if there are any
        var paramString = '';
        var pkeys = Object.keys(params);
        pkeys.forEach(function(pkey){
            var val = typeof params[pkey] === "string" ? params[pkey] : JSON.stringify(params[pkey]);

            paramString += pkey + '=' + encodeURIComponent(val);
        });

        var scr = doc.createElement('script');
        scr.src = url + '?' + paramString;
        doc.body.appendChild(scr);
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
        if(!options){
            options = {};
        }

        this.version = options.version || _defaultVersion;
        this.endpoint = options.endpoint || _defaultEndpoint;
        this.token = options.token;
    }

    // getStatus : gets the status of the analytics service
    // returns an object with:
    // { status : '' }
    CoveoAnalytics.prototype.getStatus = function(callback){
        var url = this.endpoint + '/status';
        _getJSONP(url, {}, callback);
    };

    // sendSearchEvent: Sends a search event (something was searched)
    // a searchEvent data looks like:
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
    // sendSearchEvents : add multiple seach events
    // data contains an array of searchEvent:
    // data : [ searchEvent, ... ]
    CoveoAnalytics.prototype.sendSearchEvents = function(data, callback){
        var url = this.endpoint + '/searches';
        _getJSONP(url, {searchEvents: data}, callback);
    };
    // sendClickEvent: Sends a click event (a document was clicked)
    // data param looks like: {
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
    // sendCustonEvent : Sends a custom event (case deflection, ...) into the
    // usage analytics api
    // data parameter looks like :
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

    // deleteSession : clears cookies, the cookie contains the visitor id which
    // is used by the usageanalytics api to differentiate bewteen visitors
    CoveoAnalytics.prototype.deleteSession = function(){
        var url = this.endpoint + '/click';

        var xhr = new XHR();
        xhr.onprogress = function(){}; // IE9 ...
        xhr.open('DELETE', url, false);
    };

    // Export CoveoAnalytics so we are able to use it in **node.js**
    // or in the browser
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = CoveoAnalytics;
    } else {
        root.Coveo = root.Coveo || { };
        root.Coveo.UA = CoveoAnalytics;
    }

}.call(this));
