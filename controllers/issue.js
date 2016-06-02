var Issue = require('../models/Issue');
var bookshelf = require('../database/bookshelf');
var pm = require('bookshelf-pagemaker')(bookshelf);

function all(req, res, next) {
	pm(Issue).forge()
	.fields([
		'id', 'key_date', 'publication_date', 'number', 'on_sale_date', 'volume', 'indicia_publisher_id',
		'series_id', 'series.name', 'indicia_publisher.parent_id', 'indicia_publisher.name',
		'indicia_publisher.publisher.country_id', 'indicia_publisher.publisher.country',
		'brand_id', 'brand.name', 'page_count', 'price', 'indicia_frequency', 'barcode', 'rating',
		'variant_name'
	])
	.query(function(qb) {
		if (req.query.series_id) {
			qb.where({series_id: req.query.series_id});
		}
		if (req.query.barcode) {
			qb.where('barcode', 'LIKE', '%'+req.query.barcode+'%');
		}
	})
	.paginate({
		request: req,
		withRelated: ['indicia_publisher.publisher', 'indicia_publisher.publisher.country', 'brand', 'series'],
		path: '/issues'
	})
	.end()
	.then(function(results) {
		res.status(200).json(results);
	})
	.catch(next);
}

function get(req, res, next) {
	Issue.forge({
		id: req.params.id
	})
	.fetch({
		columns: [
			'id', 'volume', 'price', 'page_count', 'indicia_frequency', 'rating', 'indicia_publisher_id',
			'brand_id', 'editing', 'series_id'
		],
		withRelated: [{
			series: function(qb) {
				qb.column('id','color','dimensions', 'paper_stock', 'binding', 'publishing_format');
			},
			stories: function(qb) {
				qb.column('id','issue_id', 'title', 'feature', 'page_count', 'script', 'pencils', 'type_id',
					'inks', 'colors', 'letters', 'genre', 'characters', 'job_number', 'notes', 'synopsis'
				);
			},
			'stories.type': function(qb) {
				qb.column('id','name');
			},
			brand: function(qb) {
				qb.column('id', 'name');
			}
		}]
	})
	.then(function(result) {
		res.status(200).json({
			resources: result
		});
	})
	.catch(next);
}

module.exports = {
	all: all,
	get: get
};
