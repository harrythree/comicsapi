var bookshelf = require('../database/bookshelf');

module.exports = bookshelf.Model.extend({
	tableName: 'gcd_brand_use',
  publisher: function() {
		var Publisher = require('../models/Publisher');
		return this.hasMany(Publisher, 'publisher_id');
	},
  brand: function() {
	  var Brand = require('../models/Brand');
	  return this.belongsTo(BrandEmblemGroup, 'emblem_id');
	}
});
