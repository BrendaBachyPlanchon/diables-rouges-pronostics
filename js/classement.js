// ==========================================
// CALCUL DES POINTS
// ==========================================

function calculerPoints(
    pronosticEquipe1,
    pronosticEquipe2,
    resultatEquipe1,
    resultatEquipe2
) {

    // Score exact
    if (
        pronosticEquipe1 == resultatEquipe1 &&
        pronosticEquipe2 == resultatEquipe2
    ) {
        return 3;
    }

    // Résultat du pronostic
    let pronosticGagnant =
        pronosticEquipe1 > pronosticEquipe2
            ? "Equipe1"
            : pronosticEquipe1 < pronosticEquipe2
                ? "Equipe2"
                : "Nul";

    // Résultat réel
    let resultatGagnant =
        resultatEquipe1 > resultatEquipe2
            ? "Equipe1"
            : resultatEquipe1 < resultatEquipe2
                ? "Equipe2"
                : "Nul";

    // Bon résultat
    if (pronosticGagnant == resultatGagnant) {
        return 1;
    }

    return 0;
}

// ==========================================
// METTRE À JOUR LE SCORE DANS SUPABASE
// ==========================================

function mettreAJourScoreSupabase(id, points) {

    if (!id) {
        console.error("❌ ID du pronostic manquant.");
        return;
    }

    supabaseClient
        .from("pronostics")
        .update({
            score: points
        })
        .eq("id", id)

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur mise à jour score Supabase :",
                    resultat.error
                );

                return;
            }

            console.log(
                "✅ Score mis à jour dans Supabase :",
                id,
                points
            );

        });
}

// ==========================================
// AFFICHER LE CLASSEMENT
// ==========================================

function afficherClassement(
    pronostics,
    matchsAdmin
) {


    let tableau =
        document.getElementById("classement");


    if (!tableau) {

        return;

    }



    // ==========================================
    // EN-TÊTE DU TABLEAU
    // ==========================================

    tableau.innerHTML =

        "<tr>" +

        "<th>Position</th>" +

        "<th>Pseudo</th>" +

        "<th>Pronostics</th>" +

        "<th>Scores exacts</th>" +

        "<th>Points</th>" +

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



    let classementJoueurs = [];



    // ==========================================
    // CALCUL POUR CHAQUE JOUEUR
    // ==========================================

    joueurs.forEach(function(joueur) {


        let points = 0;

        let nombrePronostics = 0;

        let scoresExacts = 0;



        pronostics.forEach(function(p) {


            if (p.joueur !== joueur) {

                return;

            }



            nombrePronostics++;



            // ==========================================
            // RÉCUPÉRER LE SCORE DU PRONOSTIC
            // ==========================================

           let scores =
                 p.partition.split("-");


            let pronostic1 =
                 Number(scores[0]);


            let pronostic2 =
                 Number(scores[1]);



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



            // Match introuvable
            if (!matchAdmin) {


                console.log(
                    "⚠️ Match introuvable :",
                    p.match
                );


                return;

            }



            // ==========================================
            // MATCH TERMINÉ
            // ==========================================

            if (

                matchAdmin.statut === "Terminé" &&

                matchAdmin.score1 !== "" &&

                matchAdmin.score2 !== ""

            ) {


                let resultat1 =
                    Number(matchAdmin.score1);


                let resultat2 =
                    Number(matchAdmin.score2);



               // ==========================================
// CALCUL DES POINTS
// ==========================================

let pointsPronostic = calculerPoints(
    pronostic1,
    pronostic2,
    resultat1,
    resultat2
);

points += pointsPronostic;


// ==========================================
// METTRE À JOUR SUPABASE
// ==========================================

if (Number(p.score) !== pointsPronostic) {

    mettreAJourScoreSupabase(
        p.id,
        pointsPronostic
    );

}


// ==========================================
// SCORE EXACT
// ==========================================

if (

    pronostic1 === resultat1 &&

    pronostic2 === resultat2

) {

    scoresExacts++;

}


            }


        });



        // ==========================================
        // AJOUTER LE JOUEUR
        // ==========================================

        classementJoueurs.push({

            nom:
                joueur,

            points:
                points,

            pronostics:
                nombrePronostics,

            exacts:
                scoresExacts

        });


    });



    // ==========================================
    // TRI DU CLASSEMENT
    // ==========================================

    classementJoueurs.sort(function(a, b) {


        // Plus de points
        if (b.points !== a.points) {

            return b.points - a.points;

        }


        // Plus de scores exacts
        if (b.exacts !== a.exacts) {

            return b.exacts - a.exacts;

        }


        // Plus de pronostics
        return b.pronostics - a.pronostics;


    });



    // ==========================================
    // AFFICHAGE
    // ==========================================

    classementJoueurs.forEach(
        function(joueur, index) {


            let classe =

                index === 0
                    ? "premier"
                    : index === 1
                        ? "deuxieme"
                        : index === 2
                            ? "troisieme"
                            : "";



            let position =

                index === 0
                    ? "🥇"
                    : index === 1
                        ? "🥈"
                        : index === 2
                            ? "🥉"
                            : index + 1;



            tableau.innerHTML +=


                "<tr class='" +
                classe +
                "'>" +


                "<td>" +
                position +
                "</td>" +


                "<td>" +
                joueur.nom +
                "</td>" +


                "<td>" +
                joueur.pronostics +
                "</td>" +


                "<td>🎯 " +
                joueur.exacts +
                "</td>" +


                "<td>⭐ " +
                joueur.points +
                " pts</td>" +


                "</tr>";


        }

    );


}



// ==========================================
// CHARGER LES PRONOSTICS DEPUIS SUPABASE
// ==========================================

function chargerPronosticsClassement() {

    return supabaseClient
        .from("pronostics")
        .select("*")

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement pronostics Supabase :",
                    resultat.error
                );

                return [];
            }

            console.log(
                "✅ Pronostics chargés depuis Supabase :",
                resultat.data.length
            );

            return resultat.data;
        });
}


// ==========================================
// CHARGER LES MATCHS DEPUIS SUPABASE
// ==========================================

function chargerMatchsClassement() {

    supabaseClient
        .from("matchs")
        .select("*")

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement matchs Supabase :",
                    resultat.error
                );

                return;

            }

            let matchsAdmin =
                resultat.data || [];


            console.log(
                "✅ Matchs chargés pour le classement depuis Supabase :",
                matchsAdmin.length
            );


            // ==========================================
            // CHARGER LES PRONOSTICS
            // ==========================================

            chargerPronosticsClassement()

                .then(function(pronostics) {

                    afficherClassement(
                        pronostics,
                        matchsAdmin
                    );

                });

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger les données du classement :",
                erreur
            );

        });

}


// ==========================================
// DÉMARRAGE
// ==========================================

chargerMatchsClassement();