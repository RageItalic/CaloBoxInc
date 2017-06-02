
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('calousers', function(table){
      table.increments('users_id').primary();
      table.string('full_name');
      table.string('email');
      table.string('password_hash');
      table.dateTime('created_at');
    }),

    knex.schema.createTable('caloassortments', function(table){
      table.increments('box_id').primary();
      table.string('box_name');
      table.string('product_1');
      table.integer('qty_1');
      table.string('product_2');
      table.integer('qty_2');
      table.string('product_3');
      table.integer('qty_3');
      table.string('product_4');
      table.integer('qty_4');
      table.string('product_5');
      table.integer('qty_5');
      table.string('product_6');
      table.integer('qty_6');
      table.string('box_image_url');
      table.integer('box_price');
    }),

    knex.schema.createTable('caloassortments_subscribed_to', function(table){
      table.increments('assortment_subscribed_to_id').primary();
      table.integer('subscriber_id')
           .references('users_id')
           .inTable('calousers');
      table.integer('assortment_id')
           .references('box_id')
           .inTable('caloassortments');
      table.dateTime('date_subscribed');
      table.string('box_sent_every');
    }),

    knex.schema.createTable('caloassortments_bought', function(table){
      table.increments('assortment_bought_id').primary();
      table.integer('subscriber_id')
           .references('users_id')
           .inTable('calousers');
      table.integer('assortment_id')
           .references('box_id')
           .inTable('caloassortments');
      table.dateTime('time_bought');
      table.integer('number_of_times_bought');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
        knex.schema.dropTable('calousers'),
        knex.schema.dropTable('caloassortments'),
        knex.schema.dropTable('caloassortments_subscribed_to'),
        knex.schema.dropTable('caloassortments_bought')
    ])
};
