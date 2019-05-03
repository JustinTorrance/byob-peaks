exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ranges', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('tallest_peaks');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('mountains', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('elevation')
      table.integer('range_id').unsigned()
      table.foreign('range_id')
        .references('ranges.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mountains'),
    knex.schema.dropTable('ranges')
  ]);
};