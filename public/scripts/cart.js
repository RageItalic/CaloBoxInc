$(document).ready(()=> {

  console.log("Cart working.")

  Snipcart.api.configure('show_cart_automatically', false);

  Snipcart.subscribe('cart.opened', function (data) {
    var button = $("#cart-content-text-0").html();
    $(button).appendTo($("#snipcart-actions"));

    var footerInfo = $("#cart-content-text-1").html();
    $(footerInfo).insertBefore($("#snipcart-footer"));
  })

  Snipcart.subscribe('cart.closed', function() {
    $(".custom-snipcart-footer-text").empty();
  });

  Snipcart.subscribe('order.completed', function (data) {
    console.log(data);
    console.log("ajaxing");
    $.ajax({
      url: '/postToStyledge',
      type: 'POST',
      data: {
        orderInfo: data
      }
    }).done(status => {
      console.log("Shipping company notified!", JSON.parse(status))
    })
  });

  $('.snipcart-add-item').on('click', ()=> {
    console.log("cart clicked");
    console.log("item added!!!");

    $.toast({
    text: "Item Successfully Added to cart!", // Text that is to be shown in the toast
    heading: 'Congratulations!', // Optional heading to be shown on the toast

    showHideTransition: 'fade', // fade, slide or plain
    allowToastClose: true, // Boolean value true or false
    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
    position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values

    bgColor: '#ffffff',  // Background color of the toast
    textColor: '#000000',  // Text color of the toast
    textAlign: 'center',  // Text alignment i.e. left, right or center
    loader: true,  // Whether to show loader or not. True by default
    loaderBg: '#9EC600',  // Background color of the toast loader
    beforeShow: function () {}, // will be triggered before the toast is shown
    afterShown: function () {}, // will be triggered after the toat has been shown
    beforeHide: function () {}, // will be triggered before the toast gets hidden
    afterHidden: function () {}  // will be triggered after the toast has been hidden
});


  })

  $('.snipcart-checkout').on('click', ()=> {
    console.log("cart clicked");
    console.log("checkout clicked");
  })

})

