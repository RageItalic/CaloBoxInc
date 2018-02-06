$(()=> {
  console.log('Welcome to Calobox!');

  $('.my-slider').unslider({ autoplay: true, delay: 7000 });

  $('#mailForm').on('submit', (e)=> {
    e.preventDefault();
    $.ajax({
      url: '/contactEmail',
      type: 'POST',
      data: {
        pName: $('#pName').val(),
        email: $('#email').val(),
        pNumber: $('#pNumber').val(),
        message: $('#message').val()
      }
    }).done((serverResponse) => {
      console.log('LUKE::',JSON.parse(serverResponse).message);
      var message = JSON.parse(serverResponse).message;
      $('#pName').val('');
      $('#email').val('');
      $('#pNumber').val('');
      $('#message').val('');
      $('#messageHere').append(message);
    })
  })

  $('#loginForm').on('submit', (e)=> {
    e.preventDefault();
    $.ajax({
      url: '/loggingIn',
      type: 'POST',
      data: {
        email: $('#email').val(),
        password: $('#password').val()
      }
    }).done((fromServer) => {
      if (JSON.parse(fromServer).status === 200) {
        window.location.replace('/')
      } else {
        $('#errorMessageHere').append(JSON.parse(fromServer).message)
      }
    })
  })

  $('#signupForm').on('submit', (e)=> {
    e.preventDefault();
    if($('#password').val() === $('#confirmPassword').val()) {
      $.ajax({
        url: '/signingUp',
        type: 'POST',
        data: {
          fName: $('#fName').val(),
          lName: $('#lName').val(),
          pNumber: $('#pNumber').val(),
          email: $('#email').val(),
          password: $('#password').val(),
          confirmPassword: $('#confirmPassword').val()
        }
      }).done((fromServer) => {
        if (JSON.parse(fromServer).status === 200) {
          window.location.replace('/')
        } else {
          $('#errorMessageHere').append(JSON.parse(fromServer).message)
        }
      })
    } else {
      $('#errorMessageHere').append("The passwords you entered do not match... try again.")
    }
  })
})
