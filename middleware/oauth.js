var oauth2orize = require('oauth2orize');
var passport = require('passport');
var server = oauth2orize.createServer();
var crypto = require('crypto');
var mongoose = require('mongoose');
var AccessToken = mongoose.model('AccessToken');

server.exchange(oauth2orize.exchange.clientCredentials(exchangeClientCredentials));

exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
  server.token(),
  server.errorHandler()
];

function exchangeClientCredentials (client, scope, done) {
  AccessToken.findOne({clientId: client.clientId}, checkIfAccessTokenExists.bind(null, client, done));
}

function checkIfAccessTokenExists(client, done, err, token) {
  if (err) {
    return done(err);
  }

  if (token) {
    return done(null, token.token, null);
  }

  generateNewAccessToken(client, done);
}

function generateNewAccessToken(client, done) {
  var token = crypto.randomBytes(32).toString('base64');

  AccessToken.create({
    token: token,
    clientId: client.clientId
  }, function (err) {
    if (err) {
      return done(err);
    }
    return done(null, token, null);
  });
}
