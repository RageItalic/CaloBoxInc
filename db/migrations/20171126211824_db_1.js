
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table)=> {
      table.increments('users_id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email').unique();
      table.string('password_hash');
      table.string('phone_number');
    }),

    knex.schema.createTable('pouches', (table)=> {
      table.increments('pouch_id').primary();
      table.string('pouch_name');
      table.text('pouch_description');
      table.text('pouch_contents');
      table.decimal('pouch_price');
      table.string('pouch_image_url');
      table.string('pouch_image_url_2');
      table.string('pouch_image_url_3');
    }),

    knex.schema.createTable('small_boxes', (table)=> {
      table.increments('small_box_id').primary();
      table.string('small_box_name');
      table.text('small_box_description');
      table.text('small_box_contents');
      table.decimal('small_box_price');
      table.string('small_box_image_url');
      table.string('small_box_image_url_2');
      table.string('small_box_image_url_3');
    }),

    knex.schema.createTable('big_boxes', (table)=> {
      table.increments('big_box_id').primary();
      table.string('big_box_name');
      table.text('big_box_description');
      table.integer('small_box_1_id')
            .references('small_box_id')
            .inTable('small_boxes');
      table.integer('small_box_2_id')
            .references('small_box_id')
            .inTable('small_boxes');
      table.integer('small_box_3_id')
            .references('small_box_id')
            .inTable('small_boxes');
      table.integer('small_box_4_id')
            .references('small_box_id')
            .inTable('small_boxes');
      table.decimal('big_box_price');
      table.string('big_box_image_url');
      table.string('big_box_image_url_2');
    }),

    knex.schema.createTable('pouch_bought', (table)=> {
      table.increments('pouch_order_id').primary();
      table.integer('buyer_id')
            .references('users_id')
            .inTable('users');
      table.integer('pouch_bought_id')
            .references('pouch_id')
            .inTable('pouches');
      table.integer('quantity');
      table.dateTime('date_and_time_bought');
    }),

    knex.schema.createTable('big_box_bought', (table)=> {
      table.increments('big_box_order_id').primary();
      table.integer('buyer_id')
            .references('users_id')
            .inTable('users');
      table.integer('big_box_bought_id')
            .references('big_box_id')
            .inTable('big_boxes');
      table.integer('quantity');
      table.dateTime('date_and_time_bought');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('pouches'),
    knex.schema.dropTable('small_boxes'),
    knex.schema.dropTable('big_boxes'),
    knex.schema.dropTable('pouch_bought'),
    knex.schema.dropTable('big_box_bought')
  ])
};
