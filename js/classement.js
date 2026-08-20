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

// ==========================================
// AFFICHER LE CLASSEMENT PUBLIC
// ==========================================

function afficherClassement(classement) {

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
    // AFFICHER LES SUPPORTERS
    // ==========================================

    classement.forEach(function(joueur, index) {

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

           "<img src='images/avatars/" +
            (joueur.avatar || "avatar1.png") +
            "' " +
            "width='45' height='45' " +
            "style='border-radius:50%; vertical-align:middle; margin-right:8px;'>" +

            (joueur.pseudo || "Supporter") +

            "</td>" +

            "<td>" +
            (joueur.pronostics || 0) +
            "</td>" +

            "<td>🎯 " +
            (joueur.exacts || 0) +
            "</td>" +

            "<td>⭐ " +
            (joueur.points || 0) +
            " pts</td>" +

            "</tr>";

    });

}



// ==========================================
// CHARGER LES PRONOSTICS DEPUIS SUPABASE
// ==========================================

function chargerClassementSupabase() {

    return supabaseClient
        .rpc("classement_public")

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement classement Supabase :",
                    resultat.error
                );

                return [];
            }

            console.log(
                "✅ Classement public chargé depuis Supabase :",
                resultat.data.length
            );

            return resultat.data || [];

        });
}

// ==========================================
// CHARGER LE CLASSEMENT DEPUIS SUPABASE
// ==========================================

function chargerClassement() {

    supabaseClient
        .rpc("classement_public")

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement classement Supabase :",
                    resultat.error
                );

                return;
            }

            let classement =
                resultat.data || [];


            console.log(
                "✅ Classement public chargé depuis Supabase :",
                classement.length
            );


            afficherClassement(
                classement
            );

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger le classement :",
                erreur
            );

        });

}


// ==========================================
// DÉMARRAGE
// ==========================================

chargerClassement();