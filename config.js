require('dotenv').config({silent:true});
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    port: process.env.PORT || 8080,
    db: {
			client: 'mysql',
			connection: {
				host: 'localhost',
        port: 3306,
				user: 'root',
				password: '',
				database: 'gcd'
			}
		},
    mongo: 'mongodb://localhost/comicsapi-dev'
  },

  test: {
    port: process.env.PORT || 8080,
    db: {
			client: 'sqlite3',
			connection: {
				filename: ':memory:'
			},
      seeds: {
        directory: './database/seeds'
      },
      migrations: {
        directory: './database/migrations'
      }
		},
    mongo: 'mongodb://localhost/comicsapi-test'
  },

  production: {
    port: process.env.PORT || 8080,
    db: {
			client: 'mysql',
			connection: process.env.JAWSDB_URL
		},
    mongo: process.env.MONGODB_URI
  }
};

module.exports = config[env];
