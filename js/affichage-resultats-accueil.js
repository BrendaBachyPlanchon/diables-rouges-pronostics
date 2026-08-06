function formaterDate(date) {

    let d = new Date(date);

    return d.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}

function afficherDerniersResultatsAccueil() {


    let bloc = document.getElementById("derniers-resultats");


    if (!bloc) return;


    let matchsAdmin = JSON.parse(localStorage.getItem("matchsAdmin")) || [];


   let resultats = matchsAdmin.filter(function(match) {

    return match.statut === "Terminé";

});


resultats = resultats.slice(-3).reverse();


    if (resultats.length === 0) {

        bloc.innerHTML = "<p>Aucun résultat disponible pour le moment.</p>";
        return;

    }


    bloc.innerHTML = "";


   resultats.forEach(function(match) {


    let drapeaux = {
        "Belgique": "images/pays/belgique.png",
        "Turquie": "images/pays/turquie.png",
        "France": "images/pays/france.png",
        "Italie": "images/pays/italie.png",
        "Espagne": "images/pays/espagne.png"
    };


    let equipe1 = match.equipe1.trim();
    let equipe2 = match.equipe2.trim();


    equipe1 = equipe1.charAt(0).toUpperCase() + equipe1.slice(1).toLowerCase();
    equipe2 = equipe2.charAt(0).toUpperCase() + equipe2.slice(1).toLowerCase();


    bloc.innerHTML +=

"<div class='resultat-match'>" +

"<div>" +

"<img src='" + (drapeaux[equipe1] || "images/pays/belgique.png") + "' width='40'>" +

" " + match.equipe1 +

" <strong>" + match.score1 + " - " + match.score2 + "</strong> " +

match.equipe2 +

" <img src='" + (drapeaux[equipe2] || "images/pays/belgique.png") + "' width='40'>" +

"</div>" +

"<p>📅 " + formaterDate(match.date) + "</p>" +

"<p>🏆 " + match.competition + "</p>" +

"</div>";

});


}


window.addEventListener("load", function() {

    afficherDerniersResultatsAccueil();

});