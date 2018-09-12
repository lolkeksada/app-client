let serverUrl = 'https://agile-hollows-19108.herokuapp.com/';
let token =  window.localStorage.getItem('auth_token');
let role = window.localStorage.getItem('auth_role');

$(document).ready(function(){
    $('#logout').on('click', function() {
        window.localStorage.removeItem('auth_token');
        window.localStorage.removeItem('auth_role');
        $(location).attr('href', 'signin.html');
    })
})