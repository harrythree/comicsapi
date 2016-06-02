
exports.up = function(knex, Promise) {
  return knex.schema.createTable('gcd_story', function(table) {
    table.integer('id');
    table.string('title');
    table.integer('title_inferred');
    table.string('feature');
    table.integer('sequence_number');
    table.integer('page_count');
    table.integer('issue_id');
    table.string('script');
    table.string('pencils');
    table.string('inks');
    table.string('colors');
    table.string('letters');
    table.string('editing');
    table.string('genre');
    table.string('characters');
    table.string('synopsis');
    table.string('reprint_notes');
    table.timestamp('created');
    table.timestamp('modified');
    table.string('notes');
    table.integer('no_script');
    table.integer('no_pencils');
    table.integer('no_inks');
    table.integer('no_colors');
    table.integer('no_letters');
    table.integer('no_editing');
    table.integer('page_count_uncertain');
    table.integer('type_id');
    table.string('job_number');
    table.integer('reserved');
    table.integer('deleted');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gcd_story');
};
