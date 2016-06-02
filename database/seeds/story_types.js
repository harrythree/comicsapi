var table = 'gcd_story_type';

exports.seed = function(knex, Promise) {
  var rows = Promise.map(types, function(row) {
    return knex(table).insert(row);
  });
  return Promise.join(
    knex(table).del(),
    rows
  );
};

var types = [
  {
    "id": 6,
    "name": "cover",
    "sort_code": 5
  },
  {
    "id": 19,
    "name": "comic story",
    "sort_code": 1
  },
  {
    "id": 12,
    "name": "letters page",
    "sort_code": 19
  },
  {
    "id": 16,
    "name": "promo (ad from the publisher)",
    "sort_code": 10
  }
];
