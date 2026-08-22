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
    // CHARGER LES PRONOSTICS DEPUIS SUPABASE
    // ==========================================

    supabaseClient
        .from("pronostics")
        .select("*")

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement participants Supabase :",
                    resultat.error
                );

                return;
            }

            let pronostics =
                resultat.data || [];


            console.log(
                "✅ Pronostics des participants chargés depuis Supabase :",
                pronostics.length
            );


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

                if (
                    p.joueur &&
                    !joueurs.includes(p.joueur)
                ) {

                    joueurs.push(p.joueur);

                }

            });


            // ==========================================
            // CHARGER LES MATCHS DEPUIS SUPABASE
            // ==========================================

            return supabaseClient
                .from("matchs")
                .select("*")

                .then(function(resultatMatchs) {

                    if (resultatMatchs.error) {

                        throw resultatMatchs.error;

                    }


                    let matchsAdmin =
                        resultatMatchs.data || [];


                    console.log(
                        "✅ Matchs chargés pour les participants depuis Supabase :",
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
                            // RECHERCHER LE MATCH
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


                            if (!matchAdmin) {

                                console.warn(
                                    "⚠️ Match introuvable :",
                                    p.match
                                );

                                return;

                            }


                            // ==========================================
                            // MATCH TERMINÉ
                            // ==========================================

                            if (

                                matchAdmin.statut !== "Terminé" ||

                                matchAdmin.score1 === "" ||

                                matchAdmin.score2 === ""

                            ) {

                                return;

                            }


                            // ==========================================
                            // PRONOSTIC
                            // ==========================================

                            if (!p.partition) {

                                console.warn(
                                    "⚠️ Pronostic sans partition :",
                                    p
                                );

                                return;

                            }


                            let scores =
                                p.partition.split("-");


                            if (scores.length !== 2) {

                                console.warn(
                                    "⚠️ Partition incorrecte :",
                                    p.partition
                                );

                                return;

                            }


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

                            let pointsPronostic =
                                calculerPoints(
                                    pronostic1,
                                    pronostic2,
                                    resultat1,
                                    resultat2
                                );


                            points += pointsPronostic;


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
                            joueur.replace(/'/g, "\\'") +
                            "')\">" +

                            "🗑️ Supprimer" +

                            "</button>" +

                            "</td>" +

                            "</tr>";

                    });

                });

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger les participants :",
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
        " et tous ses pronostics ?"

    );


    if (!confirmation) {
        return;
    }


    supabaseClient
        .from("pronostics")
        .delete()
        .eq("joueur", joueur)

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur suppression participant :",
                    resultat.error
                );

                alert(
                    "❌ Impossible de supprimer le participant."
                );

                return;
            }


            console.log(
                "✅ Participant supprimé de Supabase :",
                joueur
            );


            alert(
                "✅ Participant supprimé"
            );


            afficherParticipants();

        });

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