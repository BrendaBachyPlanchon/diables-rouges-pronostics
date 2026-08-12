console.log("✅ Participants chargé");


// ==========================================
// AFFICHER LES PARTICIPANTS
// ==========================================

function afficherParticipants() {

    let tableau =
        document.getElementById("table-participants");


    if (!tableau) {
        return;
    }


    // ==========================================
    // CHARGER LES PRONOSTICS
    // ==========================================

    let pronostics =
        JSON.parse(
            localStorage.getItem("pronostics")
        ) || [];


    // ==========================================
    // EN-TÊTE DU TABLEAU
    // ==========================================

    tableau.innerHTML =

        "<tr>" +

        "<th>Pseudo</th>" +
        "<th>Pronostics</th>" +
        "<th>Scores exacts</th>" +
        "<th>Points</th>" +
        "<th>Action</th>" +

        "</tr>";


    // ==========================================
    // RÉCUPÉRER LES JOUEURS
    // ==========================================

    let joueurs = [];


    pronostics.forEach(function(p) {

        if (!joueurs.includes(p.joueur)) {

            joueurs.push(p.joueur);

        }

    });


    // ==========================================
    // CHARGER LES MATCHS
    // ==========================================

    fetch("matchs.json")

        .then(function(reponse) {

            if (!reponse.ok) {

                throw new Error(
                    "Erreur lors du chargement de matchs.json"
                );

            }

            return reponse.json();

        })


        .then(function(matchsAdmin) {


            console.log(
                "✅ Matchs chargés pour les participants :",
                matchsAdmin.length
            );


            // ==========================================
            // CALCULER CHAQUE PARTICIPANT
            // ==========================================

            joueurs.forEach(function(joueur) {


                let nombrePronostics = 0;

                let points = 0;

                let scoresExacts = 0;


                pronostics.forEach(function(p) {


                    if (p.joueur !== joueur) {

                        return;

                    }


                    nombrePronostics++;


                    // ==========================================
                    // RECHERCHER LE MATCH DANS matchs.json
                    // ==========================================

                    let matchAdmin =
                        matchsAdmin.find(function(match) {


                            let nomMatch =

                                match.equipe1.trim() +
                                " - " +
                                match.equipe2.trim();


                            return (

                                nomMatch.toLowerCase() ===
                                p.match.trim().toLowerCase()

                            );

                        });


                    // Match introuvable

                    if (!matchAdmin) {

                        console.log(
                            "⚠️ Match introuvable :",
                            p.match
                        );

                        return;

                    }


                    // ==========================================
                    // VÉRIFIER SI LE MATCH EST TERMINÉ
                    // ==========================================

                    if (

                        matchAdmin.statut !== "Terminé" ||

                        matchAdmin.score1 === "" ||

                        matchAdmin.score2 === ""

                    ) {

                        return;

                    }


                    // ==========================================
                    // SCORE DU PRONOSTIC
                    // ==========================================

                    let scores =
                        p.score.split(" - ");


                    let pronostic1 =
                        Number(scores[0]);


                    let pronostic2 =
                        Number(scores[1]);


                    // ==========================================
                    // SCORE RÉEL
                    // ==========================================

                    let resultat1 =
                        Number(matchAdmin.score1);


                    let resultat2 =
                        Number(matchAdmin.score2);


                    // ==========================================
                    // CALCUL DES POINTS
                    // ==========================================

                    points += calculerPoints(

                        pronostic1,
                        pronostic2,

                        resultat1,
                        resultat2

                    );


                    // ==========================================
                    // SCORE EXACT
                    // ==========================================

                    if (

                        pronostic1 === resultat1 &&

                        pronostic2 === resultat2

                    ) {

                        scoresExacts++;

                    }


                });


                // ==========================================
                // AFFICHER LE PARTICIPANT
                // ==========================================

                tableau.innerHTML +=

                    "<tr>" +

                    "<td>" +
                    joueur +
                    "</td>" +

                    "<td>" +
                    nombrePronostics +
                    "</td>" +

                    "<td>🎯 " +
                    scoresExacts +
                    "</td>" +

                    "<td>⭐ " +
                    points +
                    "</td>" +

                    "<td>" +

                    "<button onclick=\"supprimerParticipant('" +
                    joueur +
                    "')\">" +

                    "🗑️ Supprimer" +

                    "</button>" +

                    "</td>" +

                    "</tr>";


            });


        })


        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger matchs.json :",
                erreur
            );

        });

}



// ==========================================
// SUPPRIMER UN PARTICIPANT
// ==========================================

function supprimerParticipant(joueur) {


    let confirmation = confirm(

        "⚠️ Voulez-vous vraiment supprimer " +
        joueur +
        " ?"

    );


    if (!confirmation) {

        return;

    }


    let pronostics =
        JSON.parse(
            localStorage.getItem("pronostics")
        ) || [];


    pronostics =

        pronostics.filter(function(p) {

            return p.joueur !== joueur;

        });


    localStorage.setItem(

        "pronostics",

        JSON.stringify(pronostics)

    );


    alert(
        "✅ Participant supprimé"
    );


    location.reload();

}



// ==========================================
// DÉMARRAGE
// ==========================================

window.addEventListener(
    "load",
    function() {

        afficherParticipants();

    }
);

