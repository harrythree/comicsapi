
exports.up = function(knex, Promise) {
  return knex.schema.createTable('gcd_series', function(table) {
    table.integer('id');
    table.string('name');
    table.string('sort_name');
    table.string('format');
    table.integer('year_began');
    table.integer('year_began_uncertain');
    table.integer('year_ended');
    table.integer('year_ended_uncertain');
    table.string('publication_dates');
    table.integer('first_issue_id');
    table.integer('last_issue_id');
    table.integer('is_current');
    table.integer('publisher_id');
    table.integer('country_id');
    table.integer('language_id');
    table.string('tracking_notes');
    table.string('notes');
    table.string('publication_notes');
    table.integer('has_gallery');
    table.integer('open_reserve');
    table.integer('issue_count');
    table.timestamp('created');
    table.timestamp('modified');
    table.integer('reserved');
    table.integer('deleted');
    table.integer('has_indicia_frequency');
    table.integer('has_isbn');
    table.integer('has_barcode');
    table.integer('has_issue_title');
    table.integer('has_volume');
    table.integer('is_comics_publication');
    table.string('color');
    table.string('dimensions');
    table.string('paper_stock');
    table.string('binding');
    table.string('publishing_format');
    table.integer('has_rating');
    table.integer('publication_type_id');
    table.integer('is_singleton');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gcd_series');
};
