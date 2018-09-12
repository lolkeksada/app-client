$(document).ready(function(e) {
    $('#signupForm input[type="submit"]').prop('disabled', true);

    
    $('#password, #passwordConfirm').on('keyup', function(e) {
        if($('#password').val() == $('#passwordConfirm').val()) {
            $('#signupForm input[type="submit"]').prop('disabled', false);
            $('#message').html('Password do match').css('color', 'green');
        } else {
            $('#signupForm input[type="submit"]').prop('disabled', true);
            $('#message').html('Password do not match').css('color', 'red');
        }
    });
 
    $('#signupForm').submit(function(e) {
        e.preventDefault();
        signup();
    });
});


function signup() {

    let user = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        username: $('#username').val(),
        password: $('#password').val()
    };

    $.ajax({
        url: serverUrl + 'auth/signup',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        complete: function(data) {
            if(data.status == 500) {
                console.log('Error');
            }

            if(data.status == 201) {
                $(location).attr('href', 'signin.html');
            }
        }
    });
}