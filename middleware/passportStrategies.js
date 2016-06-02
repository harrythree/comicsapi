var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var mongoose = require('mongoose');
var AccessToken = mongoose.model('AccessToken');
var Client = mongoose.model('Client');

passport.use(new BasicStrategy(verifyClient));

passport.use(new ClientPasswordStrategy(verifyClient));

passport.use(new BearerStrategy(veryifyBearer));

function veryifyBearer(accessToken, done) {
  AccessToken.findOne({token: accessToken}, function (err, token) {
    if (err) {
      return done(err);
    }
    if (!token) {
      return done(null, false);
    }

    findClientByToken(token, done);
  });
}

function verifyClient(username, password, done) {
  Client.findOne({clientId: username}, function (err, client) {
    if (err) {
      return done(err);
    }
    if (!client) {
      return done(null, false);
    }
    if (client.clientSecret !== password) {
      return done(null, false);
    }
    return done(null, client);
  });
}

function findClientByToken(token, done) {
  Client.findOne({clientId: token.clientId}, function (err, client) {
    if (err) {
      return done(err);
    }
    if (!client) {
      return done(null, false);
    }

    var info = {scope: '*'};
    return done(null, client, info);
  });
}
