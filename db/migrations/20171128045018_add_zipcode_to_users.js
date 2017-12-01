
exports.up = function(knex, Promise) {
  return knex.schema.table('users',(table)=> {
    table.string('zipcode')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (table)=> {
    table.dropColumn('zipcode');
  });
};
