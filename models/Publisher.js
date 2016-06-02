var bookshelf = require('../database/bookshelf');

module.exports = bookshelf.Model.extend({
	tableName: 'gcd_publisher',
	country: function() {
		var Country = require('../models/Country');
		return this.belongsTo(Country, 'country_id');
	}
});
