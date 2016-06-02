var bookshelf = require('../database/bookshelf');

module.exports = bookshelf.Model.extend({
	tableName: 'gcd_story_type'
});
