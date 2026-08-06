console.log("Participants chargé");


function afficherParticipants() {


    let tableau = document.getElementById("table-participants");


    if (!tableau) return;


    let pronostics = JSON.parse(localStorage.getItem("pronostics")) || [];


    let joueurs = [];


    pronostics.forEach(function(p) {


        if (!joueurs.includes(p.joueur)) {

            joueurs.push(p.joueur);

        }

    });



    joueurs.forEach(function(joueur) {


       let nombrePronostics = 0;
       let points = 0;
       let scoresExacts = 0;


        pronostics.forEach(function(p) {


            if (p.joueur == joueur) {


                nombrePronostics++;


                let resultat = trouverResultat(p.match);


                if (resultat && resultat.equipe1 !== null) {


                    let scores = p.score.split(" - ");


                    points += calculerPoints(
                        Number(scores[0]),
                        Number(scores[1]),
                        resultat.equipe1,
                        resultat.equipe2
                    );
if (
    Number(scores[0]) == resultat.equipe1 &&
    Number(scores[1]) == resultat.equipe2
) {

    scoresExacts++;

}

                }


            }


        });



        tableau.innerHTML +=


        "<tr>" +

        "<td>" + joueur + "</td>" +

        "<td>" + nombrePronostics + "</td>" +

        "<td>🎯 " + scoresExacts + "</td>" +

        "<td>⭐ " + points + "</td>" +

        "<td><button onclick=\"supprimerParticipant('" + joueur + "')\">🗑️ Supprimer</button></td>" +

        "</tr>";



    });


}



function supprimerParticipant(joueur) {


    let confirmation = confirm(
        "⚠️ Voulez-vous vraiment supprimer " + joueur + " ?"
    );


    if (!confirmation) {

        return;

    }


    let pronostics = JSON.parse(localStorage.getItem("pronostics")) || [];


    pronostics = pronostics.filter(function(p) {

        return p.joueur !== joueur;

    });


    localStorage.setItem(
        "pronostics",
        JSON.stringify(pronostics)
    );


    alert("✅ Participant supprimé");


    location.reload();

}



window.addEventListener("load", function() {

    afficherParticipants();

});