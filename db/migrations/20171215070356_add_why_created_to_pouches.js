
exports.up = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.text('why_created');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('pouches', (table)=> {
    table.dropColumn('why_created');
  });
};
