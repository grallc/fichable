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
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur.
                $('#ficheInfo').show().html("La fiche sera postée après validation manuelle !")
                $('#ficheError').hide()
            } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) { // En cas d'erreur !
                if (xhr.response && xhr.response[0]) {                
                    for (const key in xhr.response[0]) {
                        $('#ficheInfo').hide()
                        $('#ficheError').show().html(xhr.response[0][key])
                    }
                }
            }
        });
    });
});