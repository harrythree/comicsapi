var table = 'gcd_brand';

exports.seed = function(knex, Promise) {
  var rows = Promise.map(brands, function(row) {
    return knex(table).insert(row);
  });
  return Promise.join(
    knex(table).del(),
    rows
  );
};

var brands = [{
  "id": 35,
  "name": "Marvel Comics Group [under character box]",
  "parent_id": null,
  "year_began": 1963,
  "year_ended": 2007,
  "notes": "",
  "url": "",
  "issue_count": 3383,
  "created": "2009-12-07T05:00:00.000Z",
  "modified": "2016-03-14T22:14:37.000Z",
  "reserved": 0,
  "deleted": 0,
  "year_began_uncertain": 1,
  "year_ended_uncertain": 1
}];
