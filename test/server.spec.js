var request = require('supertest');
var app = require('../server');
var expect = require('chai').expect;

describe('Status Endpoint', function() {

	describe('GET /', function() {

		it('should respond with 200 with server status', function(done) {
			request(app)
				.get('/')
	      .expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status', 'available');
					expect(res.body).to.have.property('uptime').that.is.a('number');
					done();
				});
		});

    it('should respond with 404', function(done) {
			request(app)
				.get('/foo')
	      .expect('Content-Type', /json/)
				.expect(404)
				.end(function(err, res) {
					expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'Not Found');
					done();
				});
		});

	});
});
