        $(document).ready(function() {
            let token = window.localStorage.getItem('auth_token');

            $(document).keydown(function (event) {
                if (event.keyCode == 123) { // Prevent F12
                    return false;
                } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
                    return false;
                }
            });

            $(document).on("contextmenu", function (e) {        
                e.preventDefault();
            });

            if(token) {

                $.ajaxSetup({
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                getAuthors();
                $('#email').keyup(function() {
                    console.log($(this).val());
                    let email = $(this).val();

                    $.get(serverUrl + 'authors/check-email?email=' + email, function(data, status) {
                        console.log(data);
                    });
                })

                $('#addAuthorForm').submit(function(e) {
                    e.preventDefault();

                    let first = $('#firstName').val();
                    let last = $('#lastName').val();
                    let email = $('#email').val();
                    let image = $('#image').val();
                    let dayOfBirth = $('#dayOfBirth').val();

                    let author = {
                        firstName: first,
                        lastName: last,
                        email: email,
                        imageUrl: image,
                        dateOfBirth: dayOfBirth
                    };

                    $.ajax({
                        url: serverUrl + 'authors',
                        method: 'POST',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(author),
                        complete: function(data) {
                            console.log(data);
                            if(data.status == 500) {
                                console.log('Error happened');
                            }

                            if(data.status == 201) {
                                $('#authorsTable tbody').empty();
                                $('#addAuthorForm')[0].reset();
                                getAuthors();
                            }
                        }
                    })

                });

                $(document).on('change', '#authorsTable tbody input', function(e) {
                    console.log(e.target.id);
                    let elementId = e.target.id;
                    let authorId = elementId.split('-')[1];
                    uploadFile(authorId);
                });
            } else {
                console.log('Token does not exists');
            }
        });

        function uploadFile(authorId) {
            let formData = new FormData();
            formData.append('image', $('#image-' + authorId)[0].files[0]);

            $.ajax({
                url: serverUrl + 'authors/image/' + authorId,
                method: 'POST',
                contentType: false,
                data: formData,
                processData: false,
                complete: function(data) {
                    $('#authorsTable tbody').empty();
                    getAuthors();
                }
            })

        }


        function getAuthors() {
            $.ajax({
                url: serverUrl + 'authors',
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function(response) {
                    console.log(response);
                    $.each(response, function(key, value) {
                        $('#authorsTable tbody').append(
                            `
                            <tr>
                                <td>
                                    <img src="${value.imageUrl}" width="200px">
                                </td>
                                <td> ${ value.firstName } </td>
                                <td> ${ value.lastName } </td>
                                <td> ${ value.email } </td>
                                <td>
                                    <input type="file" class="form-control" id="image-${value.authorId}">
                                </td>
                            </tr>
                            `
                        );
                    });
                }
            })
        }