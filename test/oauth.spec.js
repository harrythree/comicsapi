var request = require('supertest');
var app = require('../server');
var testUtils = require('./utils');
var expect = require('chai').expect;

describe('POST /oauth/token', function() {
	before(testUtils.createOauthClient);
  after(testUtils.dropMongoCollections);

	var accessToken = null;

	it('should respond with 200', function(done) {
		request(app)
			.post('/oauth/token')
      .set(testUtils.authorizationBasic)
      .send(testUtils.grantType)
      .expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				accessToken = res.body.access_token;
				expect(res.body).to.have.property('access_token').that.is.a('string');
				done();
			});
	});

	it('should respond with same access_token if it already exists', function(done) {
		request(app)
			.post('/oauth/token')
			.set(testUtils.authorizationBasic)
      .send(testUtils.grantType)
      .expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				expect(res.body.access_token).to.equal(accessToken);
				done();
			});
	});

});
