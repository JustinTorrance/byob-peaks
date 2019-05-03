
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('mountains', function(table) {
      table.integer('rank');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('mountains', function(table) {
      table.dropColumn('rank');
    })
  ]);
};
