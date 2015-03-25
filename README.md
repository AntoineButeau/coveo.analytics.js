# coveo.analytics.js
Send events to coveo analytics service.

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
