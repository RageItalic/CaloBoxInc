$(()=> {
  console.log('HELLLLO FATHER.')

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

  var vid = document.getElementById('bgvid'); //$('#bgvid');
  vid.onended = () => {
    $('#vidSection').css('display', 'none');
  }

})
