describe("CoveoAnalytics/Analytics", function() {


  it("should be able to get the status of the service", function(done) {
    var ua = new Coveo.UA();
    ua.getStatus(function(ans){
        console.log(ans)
        dump(ans);
        expect(ans.status.not.toBe(undefined))
        done();
    });
  });
});
