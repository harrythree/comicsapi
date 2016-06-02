var config = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(config.mongo);

var AccessTokenSchema = new Schema({
  token: String,
  clientId: String
});

mongoose.model('AccessToken', AccessTokenSchema);

var ClientSchema = new Schema({
  name: String,
  clientId: String,
  clientSecret: String
});

mongoose.model('Client', ClientSchema);
