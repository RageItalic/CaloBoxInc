
exports.up = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.text('benefits');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.dropColumn('benefits');
  });
};
