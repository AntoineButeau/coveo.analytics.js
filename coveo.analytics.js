var Coveo = Coveo || {};
Coveo.UA = {
    token: undefined,
    version: 13,
    sendCustomEvent: function(args) {
        if (typeof Coveo.UA.token === 'undefined') {
            console.log('Error: token is not set.');
        } else {
            var url = 'https://usageanalyticsdev.coveo.com/rest/v13/analytics/custom?access_token=' + Coveo.UA.token;

            if (typeof args.eventType === 'undefined') {
                console.log('Error: eventType is required.');
                return;
            }
            if (typeof args.eventValue === 'undefined') {
                console.log('Error: eventValue is required.');
                return;
            }

            customEventData = {
                eventType: args.eventType,
                eventValue: args.eventValue,
                device: args.device || navigator.userAgent,
                userDisplayName: args.userDisplayName,
                customData: args.customData || {},
                username: args.username,
                language: args.language || navigator.language || navigator.userLanguage
            }

            var request = new XMLHttpRequest();
            request.open('POST', url, true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.withCredentials = true;
            request.onerror = function() {
              console.log('UA Event logging failed');
            };
            request.send(JSON.stringify(customEventData));
        }
    }
}
