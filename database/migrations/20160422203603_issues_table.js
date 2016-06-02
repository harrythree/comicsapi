
exports.up = function(knex, Promise) {
  return knex.schema.createTable('gcd_issue', function(table) {
    table.integer('id');
    table.integer('number');
    table.integer('volume');
    table.integer('no_volume');
    table.integer('display_volume_with_number');
    table.integer('series_id');
    table.integer('indicia_publisher_id');
    table.integer('indicia_pub_not_printed');
    table.integer('brand_id');
    table.integer('no_brand');
    table.string('publication_date');
    table.string('key_date');
    table.integer('sort_code');
    table.string('price');
    table.integer('page_count');
    table.integer('page_count_uncertain');
    table.string('indicia_frequency');
    table.integer('no_indicia_frequency');
    table.string('editing');
    table.integer('no_editing');
    table.string('notes');
    table.timestamp('created');
    table.timestamp('modified');
    table.integer('reserved');
    table.integer('deleted');
    table.integer('is_indexed');
    table.string('isbn');
    table.string('valid_isbn');
    table.integer('no_isbn');
    table.integer('variant_of_id');
    table.string('variant_name');
    table.string('barcode');
    table.integer('no_barcode');
    table.string('title');
    table.integer('no_title');
    table.string('on_sale_date');
    table.integer('on_sale_date_uncertain');
    table.string('rating');
    table.integer('no_rating');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gcd_issue');
};
