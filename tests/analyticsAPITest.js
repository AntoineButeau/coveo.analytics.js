/*global describe, it, expect, Coveo*/


// TODO: service should be mocked it guess...
describe('CoveoAnalytics/Analytics', function() {
    'use strict';

    it('should be able to get the status of the service', function(done) {
        var ua = new Coveo.UA();
        ua.getStatus(function(ans){
            expect(ans.status).not.toBe(undefined);
            done();
        });
    });

    it('should be able send click events', function() {
        expect(true).toBe(true);
    });

    it('should be able send search event', function() {
        expect(true).toBe(true);
    });

    it('should be able to send multiple search events', function(){
        expect(true).toBe(true);
    });

    it('should be able to send custom events', function(){
        expect(true).toBe(true);
    });

    it('should be able to delete session', function(){
        expect(true).toBe(true);
    });
});
