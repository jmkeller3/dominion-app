const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

describe('Web Page', function() {

    //test strategy:
    // 1. check to see if the webpage is loading
    it('should load page upon GET', function() {
        return chai.request(app)
            .get('/public/index.html')
            .then(function(res) {
                expect(res).to.have.status(200);
            })
    })
})