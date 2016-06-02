var table = 'gcd_country';

exports.seed = function(knex, Promise) {
  var rows = Promise.map(countries, function(row) {
    return knex(table).insert(row);
  });
  return Promise.join(
    knex(table).del(),
    rows
  );
};

var countries = [{
  "id": 225,
  "code": "us",
  "name": "United States"
}];
