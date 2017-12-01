$(()=> {
  console.log('HELLLLO FATHER.')
  console.log('the value', $('#SelectValue').val())
  var homeBoxStr = "";
  $( "select" ).change(function () {
    $( "select option:selected" ).each(function() {
      homeBoxStr += $( this ).text() + " ";
      console.log('LOOOOK',homeBoxStr)
    });
    $( "#snackName" ).text( homeBoxStr )
  }).change();

  // [
  //   {
  //     boxImageUrl:,
  //     boxName:,
  //     boxQuantity:,
  //     boxPrice:
  //   },
  //   {

  //   },

  // ]
  // var cartStorage = window.sessionStorage;
  // var arrayOfItems = [];
  // var individualItem = {};

  // $("#addBoxToCart").on('click', ()=> {
  //   alert('CLICKED')
  //   var $boxImageUrl = $('#bigBoxImageUrl').val();
  //   var $boxName = $('#bigBoxName').val();
  //   var $boxQuantity = $('#bigBoxQuantity').val();
  //   var $boxPrice = $('#bigBoxPrice').val();
  //   console.log('DEKH BHAI DEKH', $boxImageUrl, $boxName, $boxPrice, $boxQuantity)

  //   //setting individualItem obj with cart info
  //   individualObject.boxImageUrl = $boxImageUrl;
  //   individualObject.boxName = $boxName;
  //   individualObject.boxQuantity = $boxQuantity;
  //   individualObject.boxPrice = $boxPrice;
  //   console.log('individual object set', individualObject)

  //   //pushing object into array
  //   arrayOfObjects.push(individualObject)
  //   console.log('arrayOfObjects set', arrayOfObjects)

  //   //setting session storage with cart info.
  //   cartStorage.setItem('cartItems', arrayOfObjects)
  //   console.log('sessionStorage set', cartStorage)
  //   console.log('and have a look here', cartStorage.cartItems)
  // })

  // $('.slick-carousel').slick({
  //   dots: true,
  //   infinite: true
  //   // speed: 500,
  //   // fade: true,
  //   // cssEase: 'linear'
  // });

})
