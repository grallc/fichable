$(function () {
    $("#submitPasswordChange").on("click", function (event) {
        event.preventDefault();

        var values = {};
        $.each($('#changePasswordForm').serializeArray(), function (i, field) {
            values[field.name] = field.value.trim();
        });
        var xhr = new XMLHttpRequest();

        xhr.open('PATCH', '/api/users/change');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(values));
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () { // On gère ici une requête asynchrone
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur
                $('#profileInfo').show().html("Votre mot de passe a bien été changé !")
                $('#profileError').hide();
                $('#currentPassword').val('');
                $('#confirmPasswordChange').val('');
                $('#newPassword').val('');
            } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !.
                if (xhr.response && xhr.response[0]) {
                    for (const key in xhr.response[0]) {
                        $('#profileInfo').hide()
                        $('#profileError').show().html(xhr.response[0][key])
                    }
                }
            }
        });
    });
});