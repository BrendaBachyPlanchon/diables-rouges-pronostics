function verifierOuverturePronostic() {

    let choixMatch = document.getElementById("choix-match");
    let bouton = document.getElementById("envoyer-pronostic");
    if (!choixMatch || !bouton) return;


    let matchChoisi = choixMatch.value;

   let infos = null;


// Chercher dans les matchs ajoutés par l'administration

let matchsAdmin = JSON.parse(localStorage.getItem("matchsAdmin")) || [];


let matchAdmin = matchsAdmin.find(function(match) {

    return (match.equipe1.trim() + " - " + match.equipe2.trim()) == matchChoisi.trim();

});


if (matchAdmin) {

    infos = {

        dateDebut: matchAdmin.date + "T" + matchAdmin.heure,
        statut: matchAdmin.statut

    };

}


// Sinon chercher dans les matchs classiques

if (!infos && typeof matchs !== "undefined") {

    infos = matchs[matchChoisi];

}

    if (!infos) return;


    let maintenant = new Date().getTime();
    let dateMatch = new Date(infos.dateDebut).getTime();


   if (infos.statut === "Terminé" || infos.statut === "En cours") {

    bouton.disabled = true;
    bouton.innerText = "🔒 Pronostics fermés";


} else if (maintenant >= dateMatch) {

    bouton.disabled = true;
    bouton.innerText = "🔒 Pronostics fermés";


} else {

    bouton.disabled = false;
    bouton.innerText = "⚽ Envoyer mon pronostic";

}

}


window.addEventListener("load", function() {

    verifierOuverturePronostic();

});

let selectMatchFermeture = document.getElementById("choix-match");

if (selectMatchFermeture) {

    selectMatchFermeture.addEventListener("change", function() {

        verifierOuverturePronostic();

    });

}