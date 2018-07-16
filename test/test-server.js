const chai = require('chai');
const chaiHttp = require('chai-http');

describe('Web Page', function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    //test strategy:
    // 1. check to see if the webpage is loading
    it('should load page upon GET', function() {
        return chai.request(app)
            .get('/public')
            .then(function(res) {
                expect(res).to.have.status(200);
            })
    })
})