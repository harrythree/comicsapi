var table = 'gcd_indicia_publisher';

exports.seed = function(knex, Promise) {
  var rows = Promise.map(indicia_publishers, function(row) {
    return knex(table).insert(row);
  });
  return Promise.join(
    knex(table).del(),
    rows
  );
};

var indicia_publishers = [{
  "id": 307,
  "name": "Vista Publications, Inc.",
  "parent_id": 78,
  "country_id": 225,
  "year_began": 1957,
  "year_ended": 1970,
  "is_surrogate": 0,
  "notes": "",
  "url": "",
  "issue_count": 392,
  "created": "2010-01-09T05:00:00.000Z",
  "modified": "2015-06-16T23:18:36.000Z",
  "reserved": 0,
  "deleted": 0,
  "year_began_uncertain": 0,
  "year_ended_uncertain": 0
}];
