
exports.up = function(knex, Promise) {
  return knex.schema.createTable('gcd_story_type', function(table) {
    table.integer('id');
    table.string('name');
    table.string('sort_code');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gcd_story_type');
};
