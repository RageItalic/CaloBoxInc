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
    console.log("item added!!!");
  })

  $('.snipcart-checkout').on('click', ()=> {
    console.log("cart clicked");
    console.log("checkout clicked");
  })

})

