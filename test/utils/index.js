var knex = require('../../database/bookshelf').knex;
var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var AccessToken = mongoose.model('AccessToken');

module.exports = {
  migrate: migrate,
  createOauthClient: createOauthClient,
  dropMongoCollections: dropMongoCollections,
  authorizationBasic: {'Authorization': 'Basic '+basicAuth()},
  grantType: {grant_type: 'client_credentials'}
};

function migrate(done) {
  return knex.migrate.rollback()
  .then(function() {
    return knex.migrate.latest();
  })
  .then(function() {
    return knex.seed.run();
  })
  .then(function() {
    done();
  });
}

function dropMongoCollections() {
  Client.collection.drop();
  AccessToken.collection.drop();
}

function createOauthClient() {
  dropMongoCollections();
	Client.create({
		clientId: 'clientid',
		clientSecret: 'clientsecret',
		name: 'test'
	});
}

function basicAuth() {
  var creds = 'clientid:clientsecret';
  return new Buffer(creds || '').toString('base64');
}
