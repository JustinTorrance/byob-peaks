exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ranges', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('#_of_tallest_peaks');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('mountains', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('elevation')
      table.integer('ranges_id').unsigned()
      table.foreign('ranges_id')
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