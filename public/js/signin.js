$(document).ready(function(e) {
    $('#signinForm').submit(function(e){
        e.preventDefault();
        signin();
    });
});

function signin() {
    let loginData = {
        username: $('#username').val(),
        password: $('#password').val()
    };

    $.ajax({
        url: serverUrl + 'auth/signin',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(loginData),
        complete: function(data) {
            if(data.status == 200) {
                console.log(data);
                window.localStorage.setItem('auth_token', data.responseJSON.token);
                window.localStorage.setItem('auth_role', data.responseJSON.role);
                
                if(data.responseJSON.role == 'ROLE_ADMIN') {
                    $(location).attr('href', 'pages/admin/dashboard.html');
                }
                
                if(data.responseJSON.role == 'ROLE_USER') {
                    $(location).attr('href', 'pages/user/profile.html');
                }
            }
        }
    });
}