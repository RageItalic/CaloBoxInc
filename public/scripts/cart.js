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

  // $('.slick-carousel').slick({
  //   dots: true,
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 1,
  //   adaptiveHeight: true
  // });



  // Snipcart.subscribe('cart.ready', function (data) {
  //   var count = Snipcart.api.items.count();
  //   console.log("initial load count right here, ", count)
  //   $('#itemCount').empty();
  //   $('#itemCount').append(`${count} Items`);
  // });

  // Snipcart.subscribe('item.added', function (data) {
  //   var count = Snipcart.api.items.count();
  //   console.log("Item added, count right here, ", count)
  //   $('#itemCount').empty();
  //   $('#itemCount').append(`${count} Items`);
  // })

  // Snipcart.subscribe('item.removed', function (data) {
  //   var count = Snipcart.api.items.count();
  //   console.log("Item removed, count right here, ", count)
  //   $('#itemCount').empty();
  //   $('#itemCount').append(`${count} Items`);
  // })

  console.log("Cart working.")

  Snipcart.subscribe('cart.opened', function (data) {
    var button = $("#cart-content-text-0").html();
    $(button).appendTo($("#snipcart-actions"));

    var footerInfo = $("#cart-content-text-1").html();
    $(footerInfo).insertBefore($("#snipcart-footer"));
  })

  Snipcart.subscribe('order.completed', function (data) {
    console.log(data);
    $.ajax({
      url: '/testRequest',
      type: 'POST',
      data: {
        orderInfo: data
      }
    }).done(json => {
      console.log("JSON HAS BEEN RETURNED, ", json)
    })
  });

  $('.snipcart-add-item').on('click', ()=> {
    console.log("cart clicked");
  })

  $('.snipcart-checkout').on('click', ()=> {
    console.log("cart clicked");
  })



})

