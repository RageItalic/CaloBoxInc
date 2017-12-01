
exports.up = function(knex, Promise) {
  return knex.schema.table('big_boxes', (table)=> {
    table.string('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('big_boxes', (table)=> {
    table.dropColumn('type');
  });
};
