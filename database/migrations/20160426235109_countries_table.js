
exports.up = function(knex, Promise) {
  return knex.schema.createTable('gcd_country', function(table) {
    table.integer('id');
    table.string('name');
    table.string('code');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gcd_country');
};
