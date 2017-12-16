
exports.up = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.text('time_to_eat');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.dropColumn('time_to_eat');
  });
};
