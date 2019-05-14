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
});