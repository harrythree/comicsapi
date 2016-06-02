var request = require('supertest');
var app = require('../server');
var testUtils = require('./utils');
var expect = require('chai').expect;

describe('Series Endpoints Integration Tests', function() {
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

	describe('GET /series', function() {
		it('should respond with 401 Unauthorized', function(done) {
			request(app)
				.get('/api/series')
				.set({'Authorization': 'Bearer foo'})
				.expect(401)
				.end(function(err, res) {
					expect(res.error.text).to.equal('Unauthorized');
					expect(res.body).to.be.empty;
					done();
				});
		});

		it('should respond with 200 and a JSON array of length 10', function(done) {
			request(app)
				.get('/api/series?name=avengers')
				.set({'Authorization': 'Bearer '+accessToken})
	      .expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.resources).to.be.an('array');
					expect(res.body.resources).to.have.lengthOf(10);
					done();
				});
		});

		it('should respond with a JSON array of length 3', function(done) {
			request(app)
				.get('/api/series?name=avengers&limit=3')
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
				.get('/api/series?name=avengers&page=2')
				.set({'Authorization': 'Bearer '+accessToken})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.current).to.match(/page=2/);
					expect(res.body.resources[0].id).to.equal(3829);
					done();
				});
		});

		it('should respond with a JSON array ordered by name descending', function(done) {
			request(app)
				.get('/api/series?name=avengers&order=name.desc')
				.set({'Authorization': 'Bearer '+accessToken})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.resources).to.be.an('array');
					expect(res.body.resources[0].id).to.be.equal(2900);
					expect(res.body.resources[0].name).to.be.equal('West Coast Avengers');
					done();
				});
		});
	});

	describe('GET /series/:id', function() {
		it('should respond with 200 and single series', function(done) {
			request(app)
				.get('/api/series/1571')
				.set({'Authorization': 'Bearer '+accessToken})
	      .expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.resources).to.be.an('object');
					expect(res.body.resources.id).to.be.equal(1571);
					expect(res.body.resources.name).to.be.equal('The Avengers');
					done();
				});
		});
	});

	describe('GET /series/:id/brands', function() {
		it('should respond with 200 and a specific series brands', function(done) {
			request(app)
				.get('/api/series/1571/brands')
				.set({'Authorization': 'Bearer '+accessToken})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.resources).to.be.an('array');
					expect(res.body.resources[0].id).to.be.equal(35);
					done();
				});
		});
	});

	describe('GET /series/:id/indicia_publishers', function() {
		it('should respond with 200 and a specific series indicia publishers', function(done) {
			request(app)
				.get('/api/series/1571/indicia_publishers')
				.set({'Authorization': 'Bearer '+accessToken})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.resources).to.be.an('array');
					expect(res.body.resources[1].id).to.be.equal(307);
					done();
				});
		});
	});

	describe('GET /series/:id/details', function() {
		it('should respond with 200 and a specific series details', function(done) {
			request(app)
				.get('/api/series/1571/details')
				.set({'Authorization': 'Bearer '+accessToken})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.resources).to.be.an('array');
					expect(res.body.resources[1].id).to.be.equal(1540651);
					done();
				});
		});
	});

});
