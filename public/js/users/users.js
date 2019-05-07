$(function () {
    $("#signInButton").on("click", function (event) {
        event.preventDefault();

        var user = {
            username: $("#loginEmail").val().trim(),
            password: $("#loginPassword").val().trim()
        }

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/users/login');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(user));
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () { // On gère ici une requête asynchrone

            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur

                document.getElementById('fileContent').innerHTML = '<span>' + xhr.responseText + '</span>'; // On l'affiche !

            } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !
                $('#loginInfo').html(xhr.response.password).css('color', '#9BC53D')
            }

        });

    });


});