
exports.up = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.text('tag');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.dropColumn('type');
  });
};
