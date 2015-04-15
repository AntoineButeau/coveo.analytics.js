# coveo.analytics.js

[![Build Status](https://img.shields.io/travis/Coveo/coveo.analytics.js.svg?style=flat-square)](https://travis-ci.org/Coveo/coveo.analytics.js)
[![Coverage Status](https://img.shields.io/coveralls/Coveo/coveo.analytics.js.svg?style=flat-square)](https://coveralls.io/r/Coveo/coveo.analytics.js)
[![Code Climate](https://img.shields.io/codeclimate/github/Coveo/coveo.analytics.js.svg?style=flat-square)](https://codeclimate.com/github/Coveo/coveo.analytics.js)
[![dev-dependencies](https://img.shields.io/david/dev/Coveo/coveo.analytics.js.svg?style=flat-square)](https://github.com/Coveo/coveo.analytics.js/blob/master/package.json)
[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Coveo/coveo.analytics.js/blob/master/LICENSE)

Send events to the Coveo Analytics service. No external dependencies, pure JavaScript solution.

[Service Api Documentation](https://usageanalytics.coveo.com/docs/)

# Limitations

- You can't have multiple sessions running. (cookies)
- Works with `IE9+` and recent versions of `Firefox/Chrome/other...`

# Development

```sh
# install development dependencies
npm install
# Check standard respects (tabs and spaces should be automatic if your editor
# supports editorconfig http://editorconfig.org/)
npm run lint
# Run tests automatically (open your browser on http://localhost:9876 )
npm run testlive
# Wanna see other available tasks
# just run:
npm run
```

# Deployment

publish your version tag and update `latest` tag

```sh
git tag -a v0.0.0 -m "v0.0.0 new features =D"
# -f needed to override tag locally and when pushing
git tag -f -a latest -m "v0.0.0"
git push -f --tags
```

# Web Analytics Usage

```
(function(k,r,y,p,t,o,n){
  k.CoveoAnalytics=t;k[t]=k[t]||function(){(k[t].q=k[t].q||[]).push(arguments)};
  k[t].t=1*new Date();o=r.createElement(y);o.async=1;o.src=p;
  n = r.getElementsByTagName(y)[0];n.parentNode.insertBefore(o,n);
})(window,document,'script','//static.cloud.coveo.com/coveo.analytics.js/latest/coveo.analytics.js','coveoua');

coveoua('init','yourtoken');
coveoua('send','pageView');
```

# Usage

add script in your page:

```html
<script src="https://static.cloud.coveo.com/ua/0.1.0/coveo.analytics.min.js"></script>
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

# API

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
// Required params are here
// You can find others at: https://usageanalytics.coveo.com/docs/#!/v13_analytics/addClickEvent
var data = {
  "actionCause":"documentOpen",
  "searchQueryUid":"dc39ef98-f06c-48f9-8c61-3425714b8fc0",
  "documentUri":"http://uri.com",
  "documentUriHash":"4p1+Qt7oxARhuldx",
  "sourceName":"That coveo Source",
  "documentPosition":0,
}
var callback = function(resp){
  console.log('logged event with', resp)
}
```
**CoveoAnalytics.sendCustomEvent(data, callback)**: send events other than click/search

```js
// Required params are here
// You can find others at: https://usageanalytics.coveo.com/docs/#!/v13_analytics/addCustomEventViaPost
var data = {
  eventType:  'theeventtype',
  eventValue: 'eventvalue'
};
var callback = function(resp){
  console.log('logged event with', resp)
}
```

**CoveoAnalytics.deleteSession()**: **this call is not yet supported (to be released soon)** clears cookies, you lose your visitor id and your current session is stopped. Next queries will get you a new one.
