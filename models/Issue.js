var bookshelf = require('../database/bookshelf');

module.exports = bookshelf.Model.extend({
	tableName: 'gcd_issue',
	indicia_publisher: function() {
		var IndiciaPublisher = require('../models/IndiciaPublisher');
		return this.belongsTo(IndiciaPublisher, 'indicia_publisher_id');
	},
	stories: function() {
		var Story = require('../models/Story');
		return this.hasMany(Story, 'issue_id');
	},
	brand: function() {
		var Brand = require('../models/Brand');
		return this.belongsTo(Brand, 'brand_id');
	},
	series: function() {
		var Series = require('../models/Series');
		return this.belongsTo(Series, 'series_id');
	}
});
