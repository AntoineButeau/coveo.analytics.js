'use strict';

var UA = {};

// Let's be able to use it in the browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports=Coveo.UA;
} else {
    var Coveo = Coveo || {};
    Coveo.UA = UA;
}


var _defaults = {
  version:13,
  endpoint:'https://usageanalytics.coveo.com'
};


function CoveoUsageAnalytics(options){
  // Do not require new when calling
  if(!(this instanceof CoveoUsageAnalytics)){
    return new CoveoUsageAnalytics(options);
  }

  this.version  = options.version || _defaults.version;
  this.endpoint = options.endpoint || _defaults.endpoint;
  this.token    = options.token;
}

// Queries
// get status : gets the status of the analytics service
CoveoUsageAnalytics.prototype.status = function(){
  // TODO: do the query
  return false;
}
// post search : add a search event
CoveoUsageAnalytics.prototype.search = function(options){ return false }
// post searches : add multiple seaches
CoveoUsageAnalytics.prototype.searches = function(options){ return false }
// post click : add click event
CoveoUsageAnalytics.prototype.click = function(options){ return false }
// post custom : add custom events
CoveoUsageAnalytics.prototype.custom = function(options){ return false }
// delete session : clears cookies
CoveoUsageAnalytics.prototype.deleteSession = function(options){ return false }
