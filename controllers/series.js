var Series = require('../models/Series');
var Issue = require('../models/Issue');
var Brand = require('../models/BrandEmblemGroup');
var IndiciaPublishers = require('../models/IndiciaPublisher');
var bookshelf = require('../database/bookshelf');
var pm = require('bookshelf-pagemaker')(bookshelf);
var _ = require('lodash');

function all(req, res, next) {
	pm(Series).forge()
	.fields([
		'id', 'name', 'year_began', 'publisher', 'publisher.name', 'publisher.country.name',
		'publisher.country.code', 'issue_count', 'publication_dates'
	])
	.query(function(qb) {
		qb.where('name', 'LIKE', '%'+req.query.name+'%');
	})
	.paginate({
		request: req,
		withRelated: ['publisher.country'],
		path: '/series'
	})
	.end()
	.then(function(results) {
		res.status(200).json(results);
	})
	.catch(next);
}

function get(req, res, next) {
	Series.forge({
		id: req.params.id
	})
	.fetch({
		columns: [
			'id', 'name', 'year_began', 'publication_dates', 'issue_count', 'color', 'notes',
			'dimensions', 'paper_stock', 'binding', 'publishing_format', 'publisher_id'
		],
		withRelated: [{
			publisher: function(qb) {
				qb.column('id','name','country_id');
			},
			'publisher.country': function(qb) {
				qb.column('id', 'name');
			}
		}]
	})
	.then(function(result) {
		var response = jsonResponseThatMatchesPaging(result);
		res.json(response);
	})
	.catch(next);
}

function details(req, res, next) {
	pm(Issue).forge()
	.fields([
		'id', 'key_date', 'publication_date', 'number', 'on_sale_date', 'volume', 'indicia_publisher_id',
		'indicia_publisher.name', 'brand_id', 'brand.name', 'page_count', 'price', 'indicia_frequency', 'barcode', 'rating'
	])
	.query(function(qb) {
		qb.where({series_id: req.params.id});
	})
	.paginate({
		request: req,
		withRelated: ['indicia_publisher', 'brand'],
		path: '/issues'
	})
	.end()
	.then(function(results) {
		res.status(200).json(results);
	})
	.catch(next);
}

function brands(req, res, next) {
	seriesSubResource(req, res, next, 'brand');
}

function indiciaPublishers(req, res, next) {
	seriesSubResource(req, res, next, 'indicia_publisher');
}

function seriesSubResource(req, res, next, table) {
	var withRelated = {};

	withRelated[table] = function(qb) {
		qb.column('id', 'name');
	}

	Issue.forge()
	.query(function(qb) {
		qb.select(table+'_id');
		qb.count('id as issues');
		qb.groupBy(table+'_id');
		qb.where({
			series_id: req.params.id
		});
	})
	.fetchAll({
		withRelated: [withRelated]
	})
	.then(function(results) {
		results = tableResponse(results, table);
		var response = jsonResponseThatMatchesPaging(results);
		res.status(200).json(response);
	})
	.catch(next);
}

function tableResponse(results, table) {
	return _.map(results.toJSON(), function(result) {
		var response = {
			id: null,
			issues: result.issues,
			name: null
		};

		if (!_.isEmpty(result)) {
			response.id = result[table+'_id'];
		}

		if (!_.isEmpty(result[table])) {
			response.name = result[table].name;
		}
		return response;
	});
}

function jsonResponseThatMatchesPaging(results) {
	return {
		previous: null,
		current: null,
		next: null,
		limit: 1,
		pagesTotal: null,
		pagesFiltered: null,
		resources: results
	}
}

module.exports = {
	all: all,
	get: get,
	details: details,
	brands: brands,
	indiciaPublishers: indiciaPublishers
};
