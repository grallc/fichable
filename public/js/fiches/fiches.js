$(function () {

    $("#submitFiche").on("click", function (event) {
        event.preventDefault();

        var values = {};
        $.each($('#ficheForm').serializeArray(), function (i, field) {
            values[field.name] = field.value.trim();
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/fiches/');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(values));
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () { // On gère ici une requête asynchrone
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur.
                $('#ficheInfo').show().html("La fiche a bien été postée !")
                $('#ficheError').hide()
                setTimeout(function(){ window.location = "/"; }, 500);
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

    $(".like").click(function(event) {
        event.preventDefault();

        var values = {};
        values = {
            fiche: $(this).attr('fiche')
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/likes/');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(values));
        xhr.responseType = 'json';
        console.log

        xhr.addEventListener('readystatechange', function () { // On gère ici une requête asynchrone
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur.
                $(`.likes-amount-` + values.fiche).text(parseInt($(`.likes-amount-` + values.fiche).html(), 10)+1)
                $(`#like-button-` + values.fiche).hide()
                $(`#dislike-button-` + values.fiche).show()
            }
        });
    });
    

    $(".dislike").click(function(event) {
        event.preventDefault();

        var values = {
            fiche: $(this).attr('fiche')
        };

        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/api/likes/');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(values));
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () { // On gère ici une requête asynchrone
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur.
                $(`.likes-amount-` + values.fiche).text(parseInt($(`.likes-amount-` + values.fiche).html(), 10)-1)
                $(`#dislike-button-` + values.fiche).hide()
                $(`#like-button-` + values.fiche).show()
            }
        });
    });

    $(".fiche-delete-checkbox").change(function() {
        $("#deleteFicheButton-" + $(this).attr('fiche')).prop('disabled', (!this.checked));
    });

    $(".deleteFiche").click(function(event) {
        event.preventDefault();

        var values = {
            fiche: $(this).attr('fiche')
        };

        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/api/fiches/');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(values));
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () { // On gère ici une requête asynchrone
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Si le fichier est chargé sans erreur.
                setTimeout(function(){ window.location = "/users/profile?info=18"; }, 500);
            } else {
                setTimeout(function(){ window.location = "/users/profile?error=19"; }, 500);
            }
        });
    });
});
