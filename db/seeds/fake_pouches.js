
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pouches').del()
    .then(function () {
      return knex('pouches').insert({
        pouch_name: 'Blacklam',
        pouch_description: "Central tech scarborough bluffs brunny timmie's dundas west fest sam james racoons 299 Bloor leslie spit nuit blanche disappointment oliver's jeweller.",
        pouch_contents: "peter parkour brunch drake 647 the phoenix roncy cherry beach ed's real scoop leslieville leslie spit queen west parkdale no frill.",
        pouch_price: 344.89,
        pouch_image_url: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_2: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_3: 'https://bulma.io/images/placeholders/1280x960.png',
        type: 'pouch'
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'Lexitouch',
        pouch_description: "416 ISO sunglasses in kensington taste of the danforth smoke's poutine yonge and dundas square the village cold tea bathurst station jamaican patties sufferi.",
        pouch_contents: "416 bar raval toronto island the dufferin mall racoons pronunciation of spadina fringe festival the maddie 416.",
        pouch_price: 123.55,
        pouch_image_url: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_2: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_3: 'https://bulma.io/images/placeholders/1280x960.png',
        type: 'pouch'
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'Ranksing',
        pouch_description: "Distillery district burrito boyz toronto island beef patties lost metro pass riverdale park rainbow bridge 416 I still call it the Skydome casa loma scarberi.",
        pouch_contents: "lanes on bloor sam james sushi on bloor the big smoke 3 AM at the lakeview casa loma spok.",
        pouch_price: 297.96,
        pouch_image_url: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_2: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_3: 'https://bulma.io/images/placeholders/1280x960.png',
        type: 'pouch'
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'Ittough',
        pouch_description: "Mount pleasant arboretum sound academy pug grumbles 905ers sneaky dee's nachos gale's snackbar 299 Bloor GTA street meat street meat pop up vide.",
        pouch_contents: "ke casa loma suits the phoenix friday night at the ROM the big bop little portugal blogTO.",
        pouch_price: 399.97,
        pouch_image_url: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_2: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_3: 'https://bulma.io/images/placeholders/1280x960.png',
        type: 'pouch'
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'Mathdom',
        pouch_description: "King west cabbagetown ed's real scoop toronto public library first thursdays suits it's so cold out today I still call it the Skydome 3 AM at the lakevie.",
        pouch_contents: "eg patio season ISO dangerous dan's street meat CP24 cold tea skateboarding.",
        pouch_price: 129.98,
        pouch_image_url: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_2: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_3: 'https://bulma.io/images/placeholders/1280x960.png',
        type: 'pouch'
      })
    }).then(function() {
      return knex('pouches').insert({
        pouch_name: 'Roundflex',
        pouch_description: "Kensington market should we TTC the vomit comet the big bop drum circles NOOOOBODY patio season city place TTC delay.",
        pouch_contents: "BlogTO CP24 car skyline running through the six should we TTC dundas west fest burrito boyz rainbow bridg",
        pouch_price: 89.99,
        pouch_image_url: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_2: 'https://bulma.io/images/placeholders/1280x960.png',
        pouch_image_url_3: 'https://bulma.io/images/placeholders/1280x960.png',
        type: 'pouch'
      })
    });
};
