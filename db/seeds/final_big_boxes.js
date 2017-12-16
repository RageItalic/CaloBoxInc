
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('big_boxes').del()
    .then(function () {
      return knex('big_boxes').insert({
        big_box_name: "Calo Lite",
        big_box_description: "Now, get a delicious intro to our product range with Calo Lite. Get one of each type in the box - roasties, seed mix, granola and energy bites.",
        small_box_1_id: null,
        small_box_2_id: null,
        small_box_3_id: null,
        small_box_4_id: null,
        big_box_price: null,
        big_box_image_url: null,
        big_box_image_url_2: null,
        type: "big_box"
      })
    }).then(function(){
      return knex('big_boxes').insert({
        big_box_name: "Calo Masala Twist",
        big_box_description: "This Yummy Masaledar combo of Calo Snacks will give you a reason to keep munching healthy snacks all day, everyday!!!",
        small_box_1_id: null,
        small_box_2_id: null,
        small_box_3_id: null,
        small_box_4_id: null,
        big_box_price: null,
        big_box_image_url: null,
        big_box_image_url_2: null,
        type: "big_box"
      })
    }).then(function(){
      return knex('big_boxes').insert({
        big_box_name: "Calo Energy Boom",
        big_box_description: "Well, as the name suggests, after having our Calo Energy Boom products, your taste buds and body will be blown by the amazing flavors they possess and the long hours of energy they provide!!!",
        small_box_1_id: null,
        small_box_2_id: null,
        small_box_3_id: null,
        small_box_4_id: null,
        big_box_price: null,
        big_box_image_url: null,
        big_box_image_url_2: null,
        type: "big_box"
      })
    }).then(function(){
      return knex('big_boxes').insert({
        big_box_name: "Calo Protein Munch",
        big_box_description: "Add this Calo Snack Box to your diet!!! Have our tasty seed mixes post-workout and fulfil your protein needs…. Add some good bites to your post-workout routine and make gym fun!! ",
        small_box_1_id: null,
        small_box_2_id: null,
        small_box_3_id: null,
        small_box_4_id: null,
        big_box_price: null,
        big_box_image_url: null,
        big_box_image_url_2: null,
        type: "big_box"
      })
    }).then(function(){
      return knex('big_boxes').insert({
        big_box_name: "Calo Chai Munchies",
        big_box_description: "Need something tasty and healthy to complement you morning/afternoon tea time? Look no further than Calo Chai Munchies!!",
        small_box_1_id: null,
        small_box_2_id: null,
        small_box_3_id: null,
        small_box_4_id: null,
        big_box_price: null,
        big_box_image_url: null,
        big_box_image_url_2: null,
        type: "big_box"
      })
    })
};
