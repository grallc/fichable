$(function () {
    $("#signInButton").on("click", function (event) {
        event.preventDefault();

        var user = {
            username: $("#loginEmail").val().toLowerCase().trim(),
            password: $("#loginPassword").val().trim(),
            remember: document.getElementById('rememberUser').checked
        }

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/users/login');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(user));
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () { // On gère ici une requête asynchrone

            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur
                $('#loginInfo').html("Vous êtes désormais connecté ! Redirection en cours...").css('color', '#9BC53D')
            } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !
                alert(xhr.status);
                if (xhr.response && xhr.response.password) {
                    $('#loginInfo').html(xhr.response.password).css('color', '#9BC53D')
                }
            }
        });
    });
    

    $("#signUpButton").on("click", function (event) {
        event.preventDefault();

        var values = {};
        $.each($('#registerForm').serializeArray(), function (i, field) {
            values[field.name] = field.value.trim();
        });
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/users/register');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(values));
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () { // On gère ici une requête asynchrone
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur
                $('#registerInfo').show().html("Vous êtes désormais enregistré, vous pouvez donc vous connecter !")
                $('#registerError').hide();
            } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !.
                console.log(xhr.response)
                if (xhr.response && xhr.response[0]) {
                    for (const key in xhr.response[0]) {
                        $('#registerError').show().html(xhr.response[0][key])
                    }
                }
            }
        });
    });
});