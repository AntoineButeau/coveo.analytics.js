# coveo.analytics.js

[![Build Status](https://travis-ci.org/Coveo/analytics.js.svg?branch=master)](https://travis-ci.org/Coveo/analytics.js)

Send events to the Coveo Analytics service. No external dependencies, pure JavaScript solution.

[Service Api Documentation](https://usageanalytics.coveo.com/docs/)

# Limitations

- You can't have multiple sessions running.
- Should work with `ie9+` , and decent version of `ff/chrome/other...`

# Usage

in the Browser:

```js
var ua = Coveo.UA({token: 'your-token-here'})

ua.sendCustomEvent({
  eventType: 'Your Custom Event Type',
  eventValue: 'Your Custom Event Value'  
})
```
