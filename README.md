# coveo.analytics.js

[![Build Status](https://travis-ci.org/Coveo/analytics.js.svg?branch=master)](https://travis-ci.org/Coveo/analytics.js)

Send events to the Coveo Analytics service. No external dependencies, pure JavaScript solution.

# Usage

in Node:

```js

var CoveoUA = require('coveo-usageanalytics');

var ua = CoveoUA({token: 'your-token-here'});

ua.sendCustomEvent({
  eventType: 'Your Custom Event Type',
  eventValue: 'Your Custom Event Value'
});
```
