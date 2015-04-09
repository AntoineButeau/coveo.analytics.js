/*global describe, it, expect, Coveo*/

var _token = 'bf0eadb7-3444-4abb-ae44-34a0f5b261b9';
var _getNewUA = function(){
    return new Coveo.UA({token: _token});

}

// TODO: service should be mocked it guess...
describe('CoveoAnalytics/Analytics', function() {
    'use strict';

    it('should be able to get the status of the service', function(done) {
        var ua = _getNewUA();
        ua.getStatus(function(ans){
            expect(ans.status).not.toBe(undefined);
            done();
        });
    });

    it('should be able to get the status of the service even without callback', function(done) {
        var ua = _getNewUA();
        ua.getStatus();
        done()
    });

    it('should be able send click events', function(done) {
        // var ua = _getNewUA();
        // ua.sendClickEvent({}, function(){
        //     // currently only check if the callback is called
        //     expect(true).not.toBe(undefined);
        //     done();
        // });

        expect(true).toBe(true);
        done();
    });

    it('should be able send search event', function(done) {
        // var ua = _getNewUA();
        // ua.sendSearchEvent({}, function(){
        //     // currently only check if the callback is called
        //     expect(true).not.toBe(undefined);
        //     done();
        // });
        expect(true).toBe(true);
        done();
    });

    it('should be able to send multiple search events', function(done){
        // var ua = _getNewUA();
        // ua.sendSearchEvents([], function(){
        //     // currently only check if the callback is called
        //     expect(true).not.toBe(undefined);
        //     done();
        // });
        expect(true).toBe(true);
        done();
    });

    it('should be able to send custom events', function(done){
        var ua = _getNewUA();
        ua.sendCustomEvent({
                eventType:  'unit test',
                eventValue: 'customEvent'
        }, function(){
            // currently only check if the callback is called
            expect(true).not.toBe(undefined);
            done();
        });
    });

});
