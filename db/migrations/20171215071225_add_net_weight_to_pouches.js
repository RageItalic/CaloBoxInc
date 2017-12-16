
exports.up = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.integer('net_weight');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.dropColumn('net_weight');
  });
};
