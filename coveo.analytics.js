'use strict';

var UA = {};

// Let's be able to use it in the browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Coveo.UA;
} else {
    var Coveo = Coveo || { };
    Coveo.UA = UA;
}


var _defaults = {
    version:  13,
    endpoint: 'https://usageanalytics.coveo.com'
};


function CoveoUsageAnalytics(options){
    // Do not require new when calling
    if(!(this instanceof CoveoUsageAnalytics)){
        return new CoveoUsageAnalytics(options);
    }


    this.version = options.version || _defaults.version;
    this.endpoint = options.endpoint || _defaults.endpoint;
    this.token = options.token;

    // TODO: GENERATE A SESSION ID HERE?
    // or we save the first one the analytics service returns us
}

// Queries
// get status : gets the status of the analytics service
CoveoUsageAnalytics.prototype.getStatus = function(){
    // TODO: do the query
    return { status: false };
};
// post search : add a search event
CoveoUsageAnalytics.prototype.sendSearchEvent = function(){ return false; };
// post searches : add multiple seaches
CoveoUsageAnalytics.prototype.sendSearchEvents = function(){ return false; };
// post click : add click event
CoveoUsageAnalytics.prototype.sendClickEvent = function(){ return false; };
// post custom : add custom events
CoveoUsageAnalytics.prototype.sendCustomEvent = function(){ return false; };
// delete session : clears cookies
CoveoUsageAnalytics.prototype.deleteSession = function(){ return false; };
