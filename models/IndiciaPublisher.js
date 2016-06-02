var bookshelf = require('../database/bookshelf');

module.exports = bookshelf.Model.extend({
	tableName: 'gcd_indicia_publisher',
	publisher: function() {
		var Publisher = require('../models/Publisher');
		return this.belongsTo(Publisher, 'parent_id');
	}
});
