
exports.up = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.string('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.dropColumn('type');
  });
};
