var request = require('supertest');
var app = require('../server');
var testUtils = require('./utils');
var expect = require('chai').expect;

describe('Issues Endpoints', function() {
	var accessToken = null;

	beforeEach(testUtils.migrate);

	before(function(done) {
		testUtils.createOauthClient();
		request(app)
			.post('/oauth/token')
			.set(testUtils.authorizationBasic)
			.send(testUtils.grantType)
			.end(function(err, res) {
				accessToken = res.body.access_token;
				done();
			});
	});

	after(testUtils.dropMongoCollections);

	describe('GET /issue', function() {
		it('should respond with 401 Unauthorized', function(done) {
			request(app)
				.get('/api/issue')
				.set({'Authorization': 'Bearer foo'})
				.expect(401)
				.end(function(err, res) {
					expect(res.error.text).to.equal('Unauthorized');
					expect(res.body).to.be.empty;
					done();
				});
		});

	  it('should get issues by series_id and respond with a JSON array of length 10', function(done) {
			request(app)
				.get('/api/issue?series_id=1571')
				.set({'Authorization': 'Bearer '+accessToken})
	      .expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.resources).to.be.an('array');
					expect(res.body.resources).to.have.lengthOf(10);
					done();
				});
		});

		it('should get issues by barcode and respond with a JSON array', function(done) {
			request(app)
				.get('/api/issue?barcode=75960607882000641')
				.set({'Authorization': 'Bearer '+accessToken})
	      .expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.resources).to.be.an('array');
					expect(res.body.resources[0].id).to.be.equal(1171576);
					done();
				});
		});

	  it('should respond with a JSON array of length 3', function(done) {
			request(app)
				.get('/api/issue?series_id=1571&limit=3')
				.set({'Authorization': 'Bearer '+accessToken})
	      .expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.limit).to.equal(3);
					expect(res.body.resources).to.be.an('array');
					expect(res.body.resources).to.have.lengthOf(3);
					done();
				});
		});

		it('should respond with results for page 2', function(done) {
			request(app)
				.get('/api/issue?series_id=1571&page=2')
				.set({'Authorization': 'Bearer '+accessToken})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.current).to.match(/page=2/);
					expect(res.body.resources[0].id).to.equal(18560);
					done();
				});
		});

		it('should respond with results for page 2', function(done) {
			request(app)
				.get('/api/issue?series_id=1571&page=2')
				.set({'Authorization': 'Bearer '+accessToken})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.current).to.match(/page=2/);
					expect(res.body.resources[0].id).to.equal(18560);
					done();
				});
		});

	});

	describe('GET /issue/:id', function() {
		it('should respond with 200 and single issue', function(done) {
			request(app)
				.get('/api/issue/17888')
				.set({'Authorization': 'Bearer '+accessToken})
	      .expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.resources).to.be.an('object');
					expect(res.body.resources.id).to.be.equal(17888);
					expect(res.body.resources).to.have.property('stories').that.is.an('array');
	        expect(res.body.resources).to.have.property('brand').that.is.an('object');
					done();
				});
		});
	});
});
