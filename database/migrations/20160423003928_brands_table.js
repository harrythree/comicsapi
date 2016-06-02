
exports.up = function(knex, Promise) {
  return knex.schema.createTable('gcd_brand', function(table) {
    table.integer('id');
    table.string('name');
    table.integer('parent_id');
    table.integer('year_began');
    table.integer('year_ended');
    table.string('notes');
    table.string('url');
    table.integer('issue_count');
    table.timestamp('created');
    table.timestamp('modified');
    table.integer('reserved');
    table.integer('deleted');
    table.integer('year_began_uncertain');
    table.integer('year_ended_uncertain');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gcd_brand');
};
