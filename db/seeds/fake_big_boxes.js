
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('big_boxes').del()
    .then(function () {
      return knex('big_boxes').insert({
        big_box_name: "Withing",
        big_box_description: "The junction bellwoods can collectors electric circus pop up video parkdale no frills north of bloor leslieville 647 the maddie spoke club tiff.",
        small_box_1_id: 1,
        small_box_2_id: 2,
        small_box_3_id: 3,
        small_box_4_id: 4,
        big_box_price: 899.98,
        big_box_image_url: "https://bulma.io/images/placeholders/1280x960.png",
        big_box_image_url_2: "https://bulma.io/images/placeholders/1280x960.png",
        type: "big_box"
      })
    }).then(function(){
      return knex('big_boxes').insert({
        big_box_name: "Handscape",
        big_box_description: "Beaches degrassi high sufferin dufferin white squirrel the shoe king slice drum circles toronto public library.",
        small_box_1_id: 5,
        small_box_2_id: 6,
        small_box_3_id: 4,
        small_box_4_id: 3,
        big_box_price: 655.79,
        big_box_image_url: "https://bulma.io/images/placeholders/1280x960.png",
        big_box_image_url_2: "https://bulma.io/images/placeholders/1280x960.png",
        type: "big_box"
      })
    }).then(function(){
      return knex('big_boxes').insert({
        big_box_name: "Alternal",
        big_box_description: "NOOOOBODY the shoe east of Spadina turrono TTC delays BELIEVE ACC the CNE.",
        small_box_1_id: 3,
        small_box_2_id: 4,
        small_box_3_id: 1,
        small_box_4_id: 6,
        big_box_price: 788.23,
        big_box_image_url: "https://bulma.io/images/placeholders/1280x960.png",
        big_box_image_url_2: "https://bulma.io/images/placeholders/1280x960.png",
        type: "big_box"
      })
    }).then(function(){
      return knex('big_boxes').insert({
        big_box_name: "Attachers",
        big_box_description: "Go jays go distillery district fare inspectors croc rock sufferin dufferin croc rock go jays go spadina bus got it.",
        small_box_1_id: 5,
        small_box_2_id: 4,
        small_box_3_id: 1,
        small_box_4_id: 2,
        big_box_price: 298.96,
        big_box_image_url: "https://bulma.io/images/placeholders/1280x960.png",
        big_box_image_url_2: "https://bulma.io/images/placeholders/1280x960.png",
        type: "big_box"
      })
    })
};
