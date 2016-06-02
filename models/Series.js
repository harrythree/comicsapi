var bookshelf = require('../database/bookshelf');

module.exports = bookshelf.Model.extend({
	tableName: 'gcd_series',
	issues: function() {
		var Issue = require('../models/Issue');
		return this.hasMany(Issue, 'series_id');
	},
	publisher: function() {
		var Publisher = require('../models/Publisher');
		return this.belongsTo(Publisher, 'publisher_id');
	}
});
