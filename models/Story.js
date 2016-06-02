var bookshelf = require('../database/bookshelf');

module.exports = bookshelf.Model.extend({
	tableName: 'gcd_story',
	type: function() {
		var StoryType = require('../models/StoryType');
		return this.belongsTo(StoryType, 'type_id');
	}
});
