$(function () {
    $("#submitFiche").on("click", function (event) {
        event.preventDefault();

        var values = {};
        $.each($('#ficheForm').serializeArray(), function (i, field) {
            values[field.name] = field.value.trim();
        });

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/fiches/submit');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(values));
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () { // On gère ici une requête asynchrone
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur
                $('#ficheInfo').html("La fiche sera postée après validation manuelle !").css('color', '#9BC53D')
            } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !
                console.log(xhr.response);
                if (xhr.response && xhr.response.password) {
                    $('#loginInfo').html(xhr.response.password).css('color', '#9BC53D')
                }
            }
        });
    });
});