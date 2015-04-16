//* coveo.analytics.js 0.1.3
//* https://github.com/coveo/coveo.analytics.js
//* (c) 2015 Coveo
//* freely distributed under the MIT license
(function(){
    'use strict';

    // this === window in the browser context
    var root = this;
    var doc = this.document;

    /***************************************************************
     *
     *                         Utils
     *
     **************************************************************/
    var isArray = Array.isArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };
    // XHR Utils
    // var XHR = root.XMLHttpRequest;

    // JSONP utils
    var _callbackNONCE = Math.floor(Math.random() * 1000) + 1; // Set unique id for jsonp callbacks
    var _getCallbackNONCE = function(){ return (++_callbackNONCE); };
    var _getJSONP = function(url, params, callback){

        if(!callback || (typeof callback !== 'function')){
            callback = function(){};
        }


        var callbackName = 'coveoua__' + _getCallbackNONCE();
        root[callbackName] = function(){
            callback.apply(this, arguments);
            delete root[callbackName];
        };
        params.callback = callbackName;

        // Convert params to url params
        var paramString = [];
        for(var pkey in params){
            if(params.hasOwnProperty(pkey)){
                // Inner params are or strings or json encoded objects
                var val = typeof params[pkey] === 'string' ? params[pkey] : JSON.stringify(params[pkey]);
                paramString.push(pkey + '=' + encodeURIComponent(val));
            }
        }

        var scr = doc.createElement('script');
        scr.src = url + '?' + paramString.join('&');
        doc.body.appendChild(scr);
    };

    /***************************************************************
     *
     *                      CoveoAnalytics
     *
     **************************************************************/

    // CoveoAnalytics
    //
    // options : {
    //   endpoint: 'https://usageanalytics.coveo.com'
    // }
    var _defaultVersion = 13;
    var _defaultEndpoint = 'https://usageanalytics.coveo.com/rest/v' + _defaultVersion + '/analytics';

    function CoveoUA(options){
        // Do not require new when calling
        if(!(this instanceof CoveoUA)){
            return new CoveoUA(options);
        }
        if(!options){
            options = {};
        }

        this.version = options.version || _defaultVersion;
        this.endpoint = options.endpoint || _defaultEndpoint;
        this.token = options.token;

        if(!this.token){
            console.log('WARNING: CoveoAnalytics -> token not set ');
        }
    }

    CoveoUA.prototype = {
        // getStatus : gets the status of the analytics service
        // returns an object with:
        // { status : '' }
        getStatus: function(callback){
            var url = this.endpoint + '/status';
            _getJSONP(url, {/* jsonp call requires a data object even if empty*/}, callback);
        },

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
        sendSearchEvent: function(data, callback){
            if(!this.token){ return false; }

            var url = this.endpoint + '/search';

            // TODO: Checks and default on data

            _getJSONP(url, {
                'searchEvent':  data,
                'access_token': this.token
            }, callback);
        },

        // sendSearchEvents : add multiple seach events
        // data contains an array of searchEvent:
        // data : [ searchEvent, ... ]
        sendSearchEvents: function(data, callback){
            if(!this.token){ return false; }

            var url = this.endpoint + '/searches';

            // TODO: Checks and default on data

            _getJSONP(url, {
                'searchEvents': data,
                'access_token': this.token
            }, callback);
        },

        // sendClickEvent: Sends a click event (a document was clicked)
        //
        // required params are:
        // var data = {
        //     "actionCause":"documentOpen",
        //     "searchQueryUid":"dc39ef98-f06c-48f9-8c61-3425714b8fc0", // needs to be well formed
        //     "documentUri":"https://example.com/randomdoc",
        //     "documentUriHash":"4p1+Qt7oxARhuldx",
        //     "sourceName":"Mailbox Customer Support 2013",
        //     "documentPosition":0,
        // }
        sendClickEvent: function(data, callback){
            if(!this.token){ return false; }

            var url = this.endpoint + '/click';
            var eventData = {
                documentUri:         data.documentUri,
                documentUriHash:     data.documentUriHash,
                searchQueryUid:      data.searchQueryUid,
                collectionName:      data.collectionName || 'default',
                sourceName:          data.sourceName,
                documentPosition:    data.documentPosition,
                actionCause:         data.actionCause,
                documentTitle:       data.documentTitle,
                documentUrl:         data.documentUrl,
                queryPipeline:       data.queryPipeline,
                actionType:          data.actionType,
                anonymous:           data.anonymous,
                userGroups:          data.userGroups,
                userDisplayName:     data.userDisplayName,
                customData:          data.customData || {},
                device:              data.device || navigator.userAgent,
                mobile:              data.mobile,
                splitTestRunName:    data.splitTestRunName,
                splitTestRunVersion: data.splitTestRunVersion,
                userAgent:           data.userAgent || navigator.userAgent,
                username:            data.username,
                language:            data.language || navigator.language || navigator.userLanguage
            };

            _getJSONP(url, {
                clickEvent:     eventData,
                'access_token': this.token
            }, callback);
        },

        // sendCustomEvent : Sends a custom event (case deflection, ...) into the
        // usage analytics api
        //
        // Required params are:
        // var data = {
        //        eventType:  'theeventtype',
        //        eventValue: 'eventvalue'
        // };
        sendCustomEvent: function(data, callback){
            if(!this.token){ return false; }

            var url = this.endpoint + '/custom';
            var eventData = {
                    eventType:           data.eventType,
                    eventValue:          data.eventValue,
                    lastSearchQueryUid:  data.lastSearchQueryUid,
                    anonymous:           data.anonymous,
                    userGroups:          data.userGroups, // This should be an array of strings
                    userDisplayName:     data.userDisplayName,
                    customData:          data.customData || {}, // Map string , obj
                    device:              data.device || navigator.userAgent,
                    mobile:              data.mobile,
                    splitTestRunName:    data.splitTestRunName,
                    splitTestRunVersion: data.splitTestRunVersion,
                    userAgent:           data.userAgent || navigator.userAgent,
                    username:            data.username,
                    language:            data.language || navigator.language || navigator.userLanguage
            };

            _getJSONP(url, {
                'customEvent':  eventData,
                'access_token': this.token
            }, callback);
        }
    };


    /***************************************************************
     *
     *                 Simple Auto Analytics
     *
     **************************************************************/


    var _store = {}

    var simpleActions = {
        'init': function(opts){
            _store.ua = new CoveoUA({token:opts})
        },
        'send': function(opts){
            if(typeof opts === "string"){

            }

            _store.ua.sendCustomEvent({

            });
        }
    };


    // CoveoAnalytics.q ; // is the queue of last called actions before lib was included
    // CoveoAnalytics.l ; // Time where the page was really loaded (include this in custom data)
    var CoveoAnalytics = function(action,params){
        simpleActions[action](params);
    };
    CoveoAnalytics.t = 1 * new Date();

    // Lib loaded after analytics were defined
    // Auto analytics! from actions
    if(root.CoveoAnalytics){
        CoveoAnalytics.t = root.CoveoAnalytics.t;


        if(isArray(root.CoveoAnalytics.q)){
            root.CoveoAnalytics.q.forEach(function(args){
                CoveoAnalytics.apply(this, args);
            });
        }
    }
    _store.t = CoveoAnalytics.t;



    /***************************************************************
     *
     *                         Export
     *
     **************************************************************/

    // Export CoveoAnalytics so we are able to use it in **node.js**
    // or in the browser
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            CoveoUA:        CoveoUA,
            CoveoAnalytics: CoveoAnalytics
        };
    } else {
        root.Coveo = root.Coveo || { };
        root.Coveo.UA = CoveoUA;
        root.CoveoAnalytics = CoveoAnalytics;
    }

}.call(this));
