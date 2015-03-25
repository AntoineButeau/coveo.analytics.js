# coveo.analytics.js
Send events to the Coveo analytics service. No external dependencies, pure JavaScript solution.

# Quick Start
To begin sending analytics events using coveo.analytics.js, paste the following snippet into your html page so that it appears before the closing `</head>` tag.
```html
<script src="https://static.cloud.coveo.com/ua/coveo.analytics.min.js"></script>
<script>
Coveo.UA.token = 'your-token-here';
Coveo.UA.sendCustomEvent({
    eventType: 'EventType',
    eventValue: 'EventValue'
});
</script>
```
Replace `your-token-here` with your API Key. Change `EventType` and `EventValue` to any event you want to send.

# Usage
## Include in your html files.

Using our CloudFront CDN:
```html
<script src="https://static.cloud.coveo.com/ua/coveo.analytics.min.js"></script>
```

Using locally:
```html
<script src="path/to/coveo.analytics.min.js"></script>
```

## Set your access token
Ask your administrator for an API key

```js
Coveo.UA.token = 'aaaaaaaa-bbbbbbbb-cccccccc-ddddddddd';
```

## Send events
```js
Coveo.UA.sendCustomEvent({
    eventType: 'Your event type here',
    eventValue: 'Event Value'
});
```

## Optional parameters
```js
Coveo.UA.sendCustomEvent({
  eventType: 'eventType',
  eventValue: 'eventValue',
  device: 'device',
  userDisplayName: 'userDisplayName',
  customData: {
    c_custom_dimension_x: 'custom dimension value',
    c_custom_dimension_y: 'custom dimension value'
  },
  username: 'username',
  language: 'language'
});
```
