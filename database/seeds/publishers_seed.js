var table = 'gcd_publisher';

exports.seed = function(knex, Promise) {
  var rows = Promise.map(publishers, function(row) {
    return knex(table).insert(row);
  });
  return Promise.join(
    knex(table).del(),
    rows
  );
};

var publishers = [{
  "id": 78,
  "name": "Marvel",
  "country_id": 225,
  "year_began": 1939,
  "year_ended": null,
  "notes": "",
  "url": "http://marvel.com",
  "is_master": 1,
  "parent_id": null,
  "imprint_count": 0,
  "brand_count": 33,
  "indicia_publisher_count": 109,
  "series_count": 7164,
  "created": "1999-06-15T04:00:00.000Z",
  "modified": "2016-03-14T16:05:49.000Z",
  "issue_count": 45556,
  "reserved": 0,
  "deleted": 0,
  "year_began_uncertain": 0,
  "year_ended_uncertain": 0
}];
