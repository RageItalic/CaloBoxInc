// var carty = require('carty');

// var cart = carty({
//     storage: carty.storage.localStorage(),
//     currency: 'INR'
// });

$(document).ready(()=> {
// var carty = require('carty');

// var cart = carty({
//     storage: carty.storage.localStorage(),
//     currency: 'INR'
// });


  // console.log('HELLLLLO')
  // var cartStorage = window.sessionStorage;
  // var arrayOfItems = [];
  // // var individualItem = {};

  // $("#addBoxToCart").on('click', function() {
  //   var individualItem = {};
  //   var $boxImageUrl = $('#bigBoxImageUrl').attr('src');
  //   var $boxName = $('#bigBoxName').text();
  //   var $boxQuantity = $('#bigBoxQuantity').val();
  //   var $boxPrice = $('#bigBoxPrice').text();
  //   console.log('DEKH BHAI DEKH', $boxImageUrl, $boxName, $boxPrice, $boxQuantity)

  //   //setting individualItem obj with cart info
  //   individualItem.boxImageUrl = $boxImageUrl;
  //   individualItem.boxName = $boxName;
  //   individualItem.boxQuantity = $boxQuantity;
  //   individualItem.boxPrice = $boxPrice;
  //   console.log('individual object set', individualItem)

  //   // individualItem.each((item)=> {
  //   //   //pushing object into array
  //   //   arrayOfItems.push(JSON.stringify(item))
  //   //   console.log('arrayOfItems set', arrayOfItems)
  //   // })

  //   //pushing object into array
  //   arrayOfItems.push(JSON.stringify(individualItem))
  //   console.log('arrayOfItems set', arrayOfItems)

  //   //setting session storage with cart info.
  //   cartStorage.setItem('cartItems', arrayOfItems)
  //   console.log('sessionStorage set', cartStorage)
  //   console.log('and have a look here', cartStorage.cartItems)
  //   // console.log('YELLO')

  //   // cart.add({
  //   //   id: $boxName,
  //   //   label: $boxName,
  //   //   price: $boxPrice,
  //   //   quantity: $boxQuantity
  //   // })

  //   console.log('ADDED TO CART!')

  //   // cart.each((item) => {
  //   //   console.log('LOKI here',
  //   //       item.id(),
  //   //       item.label(),
  //   //       item.price(),
  //   //       item.quantity()
  //   //   );
  //   // })

  // })

  $('.slick-carousel').slick({
    dots: true,
    infinite: true
  });

  $('.snipcart-add-item').on('click', ()=> {
    alert('Please ensure that you have Rs. 450 worth of items in your cart before continuing to checkout.')
  })

  $('.snipcart-checkout').on('click', ()=> {
    alert('Please ensure that you have Rs. 450 worth of items in your cart before continuing to checkout.')
  })



})

