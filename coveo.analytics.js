var Coveo = Coveo || {};
Coveo.UA = {
    token: undefined,
    version: 13,
    endpoint: 'https://usageanalytics.coveo.com',
    sendCustomEvent: function(args) {
        if (typeof Coveo.UA.token === 'undefined') {
            console.log('Error: token is not set.');
        } else {
            if (typeof args.eventType === 'undefined') {
                console.log('Error: eventType is required.');
                return;
            }
            if (typeof args.eventValue === 'undefined') {
                console.log('Error: eventValue is required.');
                return;
            }

            var data = {
                eventType: args.eventType,
                eventValue: args.eventValue,
                lastSearchQueryUid: args.lastSearchQueryUid,
                anonymous: args.anonymous,
                userGroups: args.userGroups,
                userDisplayName: args.userDisplayName,
                customData: args.customData || {},
                device: args.device || navigator.userAgent,
                mobile: args.mobile,
                splitTestRunName: args.splitTestRunName,
                splitTestRunVersion: args.splitTestRunVersion,
                userAgent: args.userAgent,
                username: args.username,
                language: args.language || navigator.language || navigator.userLanguage
            }

            var customEventData = encodeURIComponent(JSON.stringify(data));
            var callBackUID = Math.floor(Math.random() * 1000) + 1;
            var url = Coveo.UA.endpoint +
                '/rest/v13/analytics/custom?customEvent=' + customEventData +
                '&access_token=' + Coveo.UA.token +
                '&callback=Coveo.UA.customEventCallback';
            var scr = document.createElement('script');
            scr.src = url;
            document.body.appendChild(scr);
        }
    },
    customEventCallback: function(response) {}
}
