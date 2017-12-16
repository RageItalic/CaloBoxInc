
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pouches').del()
    .then(function () {
      return knex('pouches').insert({
        pouch_name: 'Tomattinos',
        pouch_description: null,
        pouch_contents: null,
        pouch_price: 78,
        pouch_image_url: "https://res.cloudinary.com/dg7wliucz/image/upload/v1513377864/tomaContents_pfkhk2.jpg",
        pouch_image_url_2: "https://res.cloudinary.com/dg7wliucz/image/upload/v1513377864/Tomttinos_zugddf.jpg",
        pouch_image_url_3: "https://res.cloudinary.com/dg7wliucz/image/upload/v1513377862/toma_tlkcr4.jpg",
        type: 'pouch',
        tag: "A healthy and tangy, fibre rich substitute for your regular roasties, with natural benefits of lycopene antioxidant. Keep one in your bag for a source of protein, vitamin E, iron and magnesium on the go!",
        why_created: "Our Calo Freaks set out to create a sweet nutritious treat that was perfect for you. Keep it with you for a quick refuel as it’s rich ingredients makes a delicious and filling mid meal snack!",
        benefits: "This combination of tomato flakes, oat rings, rolled oats, and Chana Dalia creates a supercharged snack that’s full of vitamins and minerals! Each serving is a source of protein, magnesium, Iron and vitamin E! The combination boosts your immune system, is low calorie and improves skin health. If these roasties aren’t the perfect boost for a busy day, we don’t know what is! \n This roasties are crunchy and naturally sweet with benefits of lycopene anti-oxidants which is the healthiest way to get energized!",
        time_to_eat: "These are a great snack to keep in your bag when you need a quick and long-lasting boost. We recommend to have it on you at all times just in case you need an afternoon mid-meal munchies. Ideally you can consume it with upma, poha, subhudana khichdi, sprouts, and apply on salad dressings.",
        net_weight: 125
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'Minty Masti',
        pouch_description: null,
        pouch_contents: null,
        pouch_price: 65,
        pouch_image_url: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377853/mintyContents_qdxpmw.jpg',
        pouch_image_url_2: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377835/Minty_Masti_rfxia0.jpg',
        pouch_image_url_3: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377861/minty_taidny.jpg',
        type: 'pouch',
        tag: 'With an aftertaste like Pani Puri and stuffed with numerous health benefits, these Minty Masti roasties will definitely freshen up your day. Keep one in your bag for a source of protein, vitamin E, iron and magnesium on the go!',
        why_created: 'Our Calo Freaks set out to create a sweet nutritious treat that was perfect to keep on hand for a quick refuel which is why they added all of their favourite wholesome ingredients into a delicious and filling mid meal snack!',
        benefits: 'This combination of pudina flakes, rolled oats, and peas creates a supercharged snack full of vitamins and minerals! Each serving is a source of protein, magnesium, Iron and vitamin E which helps boost the immune system, is low calorie and improves skin health. If these roasties aren’t the perfect boost for a busy day, we don’t know what is! \n This pudina roasties are crunchy and extremely light with no added sugar which is the healthiest way to get energized!',
        time_to_eat: 'These are a great snack to keep in your bag when you need a quick and long-lasting boost. We recommend keeping a bag on your at all times just in case you need an afternoon mid-meal munchies. Ideally you can consume it with upma, poha, subhudana khichdi, sprouts, and apply on salad dressings.',
        net_weight: 100
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'Seedy Munch',
        pouch_description: null,
        pouch_contents: null,
        pouch_price: 200,
        pouch_image_url: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377859/seedyContents_f5gqto.jpg',
        pouch_image_url_2: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377838/Seedy_Munch_1_gnmeam.jpg',
        pouch_image_url_3: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377862/seedy_cuwjee.jpg',
        type: 'pouch',
        tag: 'This mix of premium nuts contains omega-3 seeds and a pinch of chilli flakes, thus creating a party of flavours in the mouth. Keep one in your bag for a source of high protein, vitamin E, zinc and magnesium on the go!',
        why_created: 'Our Calo Freaks set out to create a sweet nutritious treat that was perfect to keep on hand for a quick protein refuel which is why they added all of their favourite wholesome ingredients into a healthy and filling mid meal snack!',
        benefits: 'This combination of Sunflower Seeds, Pumpkin Seeds, Almonds, Olive Oil, and Chilli Flakes creates a supercharged snack full of vitamins and minerals! Each serving is a source of high protein, magnesium, Iron and vitamin E which helps boost the immune system, assist prevention of diabetes and improves skin health. If these superfoods aren’t the perfect snack for a busy day, we don’t know what is! \n This Superfood Mix is 100% vegan, and gluten free, it’s a crunchy and extremely filling mix with no added sugar, which provides you the healthiest way to get energized!',
        time_to_eat: 'This is a great snack to keep in your bag when you need a quick and long-lasting boost. We recommend keeping a bag on you just in case you need an afternoon mid-meal munchies. Ideally you can consume it with hummus, subhudana khichdi, sprouts, and apply on numerous salad dressings.',
        net_weight: 150
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'BerryLicious Mix',
        pouch_description: null,
        pouch_contents: null,
        pouch_price: 205,
        pouch_image_url: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377822/berryContents_tometo.jpg',
        pouch_image_url_2: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513390349/BerryLicious_Mix_bjhv9m.jpg',
        pouch_image_url_3: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377806/berries_pxp9bt.jpg',
        type: 'pouch',
        tag: 'This mix contains cranberry, blueberry, and natural seeds that contain omega-3, which combine to form a fruity flavour. Keep one in your bag for a high source of vitamin C, fibre, zinc and magnesium on the go!',
        why_created: 'Our Calo Freaks set out to create a sweet nutritious treat that was perfect to keep on hand for a quick protein and Vitamin C refuel which is why they added all of their favourite wholesome ingredients into a healthy and filling mid meal snack!',
        benefits: 'This combination of Sunflower Seeds, Pumpkin Seeds, Cranberry, and Blueberry creates a supercharged snack full of vitamins and minerals! Each serving is a source of high Vitamin C, magnesium, Iron and vitamin E which helps boosts immune system, assist prevention of diabetes and improves skin health. If these superfoods aren’t the perfect snack for a busy day, we don’t know what is! \n This Superfood Mix is 100% vegan, and gluten free, it’s a crunchy and extremely filling mix with no added sugar, which provides you the healthiest way to get energized!',
        time_to_eat: 'This is a great snack to keep in your bag when you need a quick and long-lasting boost. We recommend keeping a bag on you just in case you need an afternoon mid-meal munchies. Ideally you can consume it with subhudana khichdi, sprouts, and apply on numerous salad dressings.',
        net_weight: 150
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'ChocoRite',
        pouch_description: null,
        pouch_contents: null,
        pouch_price: 150,
        pouch_image_url: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377831/chocoContents_asoenl.jpg',
        pouch_image_url_2: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377827/ChocoRite_1_la3emp.jpg',
        pouch_image_url_3: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377834/choco_kwyasb.jpg',
        type: 'pouch',
        tag: 'This blend between our premium dark chocolate and nutritional seeds creates a healthy granola that can be enjoyed with Greek yoghurt and as cereal. Keep one in your bag for a high source of protein, fibre, zinc and magnesium on the go!',
        why_created: 'Our Calo Freaks set out to create a sweet nutritious treat that was perfect to keep on hand for a quick protein and energy refuel which is why they added all of their favourite wholesome ingredients into a healthy and filling mid meal snack!',
        benefits: 'This combination of Rolled Oats, Oat Flax, Cocoa, and Almonds creates a supercharged morning cereal full of vitamins and minerals! Each serving is a source of high protein, magnesium, Iron and vitamin E which helps boosts immune system, assist prevention of diabetes and improves cognitive function. If this superfood granola isn’t the perfect breakfast cereal for a busy day, we don’t know what is! \n This Superfood cereal is crunchy and extremely filling with no added sugar, which provides you the healthiest way to get energized!',
        time_to_eat: 'This is a great snack to keep in your bag when you need a quick and long-lasting boost. We recommend keeping a bag on you just in case you need a healthy kick in the morning. Ideally you can consume it with milk to create healthy smoothies, healthy toppings on ice-creams, and superb combo with greek yoghurt.',
        net_weight: 150
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'ClassicRite',
        pouch_description: null,
        pouch_contents: null,
        pouch_price: 190,
        pouch_image_url: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513399174/Screen_Shot_2017-12-15_at_11.38.34_PM_bknopx.png',
        pouch_image_url_2: null,
        pouch_image_url_3: null,
        type: 'pouch',
        tag: 'This blend between our premium honey and nutritional seeds creates a healthy granola that can be enjoyed with Greek yoghurt and as cereal. Keep one in your bag for a high source of protein, fibre, zinc and magnesium on the go!',
        why_created: 'Our Calo Freaks set out to create a sweet nutritious treat that was perfect to keep on hand for a quick protein and energy refuel which is why they added all of their favourite wholesome ingredients into a healthy and filling mid meal snack!',
        benefits: 'This combination of Rolled Oats, Oat Flax, Honey, and Cinnamon creates a supercharged morning cereal full of vitamins and minerals! Each serving is a source of high protein, magnesium, Iron and vitamin E which helps boosts immune system, assist prevention of diabetes and improves cognitive function. If this superfood granola isn’t the perfect breakfast cereal for a busy day, we don’t know what is! \n This Superfood cereal is crunchy and extremely filling with no added sugar, which provides you the healthiest way to get energized!',
        time_to_eat: 'This is a great snack to keep in your bag when you need a quick and long-lasting boost. We recommend keeping a bag on you just in case you need a healthy kick in the morning. Ideally you can consume it with milk to create healthy smoothies, healthy toppings on ice-creams, and superb combo with greek yoghurt.',
        net_weight: 150
      })
    }).then(function(){
      return knex('pouches').insert({
        pouch_name: 'Energy Bites',
        pouch_description: null,
        pouch_contents: null,
        pouch_price: 190 ,
        pouch_image_url: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377828/Energy_Bites_lbyv1d.jpg',
        pouch_image_url_2: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513377835/EBs_daltje.jpg',
        pouch_image_url_3: null,
        type: 'pouch',
        tag: 'This combination of premium quality dates and seeds creates a tasty yet nutritious energy bite. Keep one in your bag for a high source of protein, fibre, zinc and magnesium on the go!',
        why_created: 'Our Calo Freaks set out to create a sweet nutritious treat that was perfect to keep on hand for a quick protein and energy refuel which is why they added all of their favourite wholesome ingredients into a healthy and filling mid meal snack!',
        benefits: 'This combination of various seeds such as pumpkin, pineapple, amaranth, etc.. , figs and black dates creates a supercharged snack full of vitamins and minerals! Each serving is a source of high protein, magnesium, Iron and vitamin E which helps boosts immune system, assist prevention of diabetes and improves cognitive function. If this superfood granola isn’t the perfect breakfast cereal for a busy day, we don’t know what is! \n These Superfood energy bites is extremely filling with no added sugar, which provides you the healthiest way to get energized!',
        time_to_eat: 'This is a great snack to keep in your bag when you need a quick and long-lasting boost. We recommend keeping a bag on you just in case you need an afternoon mid-meal munchies. Ideally you can consume it at as a pre-workout energy booster or to suffice your sweet tooth.',
        net_weight: 150
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'Energy Bites 2.0',
        pouch_description: null,
        pouch_contents: null,
        pouch_price: null,
        pouch_image_url: 'https://res.cloudinary.com/dg7wliucz/image/upload/v1513399174/Screen_Shot_2017-12-15_at_11.38.14_PM_plusbr.png',
        pouch_image_url_2: null,
        pouch_image_url_3: null,
        type: 'pouch',
        tag: 'This combination of premium quality cranberry and Anjir blended with rich in omega-3 seeds creates a tasty yet nutritious energy bite. Keep one in your bag for a high source of protein, fibre, zinc and magnesium on the go!',
        why_created: 'Our Calo Freaks set out to create a sweet nutritious treat that was perfect to keep on hand for a quick protein and energy refuel which is why they added all of their favourite wholesome ingredients into a healthy and filling mid meal snack!',
        benefits: 'This combination of various fruits and seed such as Anjir , cranberry, cashew nut, almond, pistachio, figs and black dates creates a supercharged snack full of vitamins and minerals! Each serving is a source of high protein, magnesium, Iron and vitamin E which helps boosts immune system, assist prevention of diabetes and improves cognitive function. If this superfood granola isn’t the perfect breakfast cereal for a busy day, we don’t know what is! \n These Superfood energy bites is extremely filling with no added sugar, which provides you the healthiest way to get energized!',
        time_to_eat: 'This is a great snack to keep in your bag when you need a quick and long-lasting boost. We recommend keeping a bag on you just in case you need an afternoon mid-meal munchies. Ideally you can consume it at as a pre-workout energy booster or to suffice your sweet tooth.',
        net_weight: 150
      })
    });
};
