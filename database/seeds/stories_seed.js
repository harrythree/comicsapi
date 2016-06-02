var table = 'gcd_story';

exports.seed = function(knex, Promise) {
  var rows = Promise.map(stories, function(row) {
    return knex(table).insert(row);
  });
  return Promise.join(
    knex(table).del(),
    rows
  );
};

var stories = [
{
    "id": 137337,
    "title": "",
    "title_inferred": 0,
    "feature": "The Avengers",
    "sequence_number": 0,
    "page_count": 1,
    "issue_id": 17888,
    "script": "Stan Lee",
    "pencils": "Jack Kirby",
    "inks": "Dick Ayers",
    "colors": "Stan Goldberg",
    "letters": "Artie Simek (cover lettering and logo design); Sol Brodsky (logo design)",
    "editing": "",
    "genre": "superhero",
    "characters": "The Avengers [Thor [Donald Blake]; Wasp; Ant-Man [Hank Pym]; Iron Man [Tony Stark]; Hulk [Bruce Banner]]; Loki",
    "synopsis": "",
    "reprint_notes": "",
    "created": "2003-05-31T04:00:00.000Z",
    "modified": "2016-02-25T12:50:36.000Z",
    "notes": "Logo design credit from Todd Klein via his Facebook page, used with permission.",
    "no_script": 0,
    "no_pencils": 0,
    "no_inks": 0,
    "no_colors": 0,
    "no_letters": 0,
    "no_editing": 1,
    "page_count_uncertain": 0,
    "type_id": 6,
    "job_number": "",
    "reserved": 0,
    "deleted": 0
},
{
    "id": 137338,
    "title": "The Coming of the Avengers!",
    "title_inferred": 0,
    "feature": "The Avengers",
    "sequence_number": 1,
    "page_count": 22,
    "issue_id": 17888,
    "script": "Stan Lee",
    "pencils": "Jack Kirby",
    "inks": "Dick Ayers",
    "colors": "Stan Goldberg",
    "letters": "Sam Rosen",
    "editing": "",
    "genre": "superhero",
    "characters": "The Avengers [Thor [Thor Odinson, Don Blake]; Iron Man [Tony Stark]; Ant-Man [Henry Pym]; The Wasp [Janet Van Dyne]; Hulk [Bruce Banner, Mechano]] (introduction, origin); circus ringmaster; lion tamer; trapeze artists; Bobby; Bobby's mother; Charlie; Captain; Jane Foster; Asgardians [Odin]; Teen Brigade [Rick Jones; William \"Willie\" Bishop]; Fantastic Four [Mr. Fantastic [Reed Richards]; Invisible Girl [Sue Storm]; The Thing [Ben Grimm]; The Human Torch [Johnny Storm]]; Loki [Loki Laufeyson]; Silent Ones",
    "synopsis": "Iron Man, the Hulk, Ant-Man, the Wasp, and Thor join forces to defeat Loki.",
    "reprint_notes": "",
    "created": "2003-05-31T04:00:00.000Z",
    "modified": "2016-02-25T12:50:36.000Z",
    "notes": "Loki mentions that the \"Old Man of the Sea\" was based on legends of the Silent Ones, trolls from Asgard.",
    "no_script": 0,
    "no_pencils": 0,
    "no_inks": 0,
    "no_colors": 0,
    "no_letters": 0,
    "no_editing": 1,
    "page_count_uncertain": 0,
    "type_id": 19,
    "job_number": "",
    "reserved": 0,
    "deleted": 0
}];
