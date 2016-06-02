var bookshelf = require('../database/bookshelf');

module.exports = bookshelf.Model.extend({
	tableName: 'gcd_brand',
	brandGroup: function() {
	  var BrandGroup = require('../models/BrandGroup');
	  return this.belongsToMany(BrandGroup, 'gcd_brand_group', 'brand_id', 'brandgroup_id');
	}
});
