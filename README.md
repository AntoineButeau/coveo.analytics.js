# coveo.analytics.js

[![Build Status](https://travis-ci.org/Coveo/analytics.js.svg?branch=master)](https://travis-ci.org/Coveo/analytics.js)
[![Coverage Status](https://coveralls.io/repos/Coveo/analytics.js/badge.svg?branch=master)](https://coveralls.io/r/Coveo/analytics.js?branch=master)

Send events to the Coveo Analytics service. No external dependencies, pure JavaScript solution.

[Service Api Documentation](https://usageanalytics.coveo.com/docs/)

# Limitations

- You can't have multiple sessions running. (cookies)
- Should work with `ie9+` , and decent version of `ff/chrome/other...`

# Usage

add script in your page:

```html
<script src="https://static.cloud.coveo.com/ua/coveo.analytics.min.js"></script>
```

in the Browser:

```js
// works with or without new
// the token can be retrieved by contacting Coveo Support
var ua = Coveo.UA({token: 'your-token-here'})

ua.sendCustomEvent({
  eventType: 'Your Custom Event Type',
  eventValue: 'Your Custom Event Value'  
})
```

# Api

**CoveoAnalytics(options)**: instantiate a new analytics event logger

```js
var options = {
  token: '' // required
  endpoint: '' // optional: defaults to https://usageanalytics.coveo.com/rest/v13/analytics
}
```

**CoveoAnalytics.getStatus(callback)**: gets the status of the analytics service

```js
// https://usageanalytics.coveo.com/docs/#!/v13_analytics/getServiceStatus
var callback = function(data){
  // Format of data: { status: '' }
  console.log(data.status)
}
```

**CoveoAnalytics.sendSearchEvent(data, callback)**: user searched something

```js
var data = {/* https://usageanalytics.coveo.com/docs/#!/v13_analytics/addSearchEvent */}
var callback = function(){
  console.log('logged event')
}
```

**CoveoAnalytics.sendSearchEvents(data, callback)**: sends multiple search events

```js
//
var data = [/* https://usageanalytics.coveo.com/docs/#!/v13_analytics/addSearchEvents */]
var callback = function(){
  console.log('logged a lot of events')
}
```

**CoveoAnalytics.sendClickEvent(data, callback)**: user clicked on something

```js
var data = {/* https://usageanalytics.coveo.com/docs/#!/v13_analytics/addClickEvent */}
var callback = function(){
  console.log('logged event')
}
```
**CoveoAnalytics.sendCustomEvent(data, callback)**: send events other than click/search

```js
var data = {/* https://usageanalytics.coveo.com/docs/#!/v13_analytics/addCustomEventViaPost */}
var callback = function(){
  console.log('logged event')
}
```

**CoveoAnalytics.deleteSession()**: clears cookies, you lose your visitor id and your current session is stopped. Next queries will get you a new one.
