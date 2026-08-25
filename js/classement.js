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
// AFFICHER LE CLASSEMENT PUBLIC + PODIUM
// ==========================================

function afficherClassement(classement) {

    let tableau =
        document.getElementById("classement");

    let podium =
        document.getElementById("podium-classement");


    if (!tableau) {
        return;
    }


    // ==========================================
    // PODIUM DES 3 PREMIERS
    // ==========================================

    if (podium) {

        podium.innerHTML = "";


        classement.slice(0, 3).forEach(
            function(joueur, index) {

                let position =
                    index === 0
                        ? "🥇"
                        : index === 1
                            ? "🥈"
                            : "🥉";


                podium.innerHTML +=

                    "<div class='bloc-podium'>" +

                    "<div class='podium-position'>" +
                    position +
                    "</div>" +

                    "<img src='images/avatars/" +
                    (joueur.avatar || "avatar1.png") +
                    "' " +
                    "width='90' height='90' " +
                    "style='border-radius:50%;'>" +

                    "<h3>" +
                    (joueur.pseudo || "Supporter") +
                    "</h3>" +

                    "<p>🎯 " +
                    (joueur.exacts || 0) +
                    " score(s) exact(s)</p>" +

                    "<p>⭐ <strong>" +
                    (joueur.points || 0) +
                    " pts</strong></p>" +

                    "</div>";

            }
        );

    }


    // ==========================================
    // TABLEAU
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
// AVEC GESTION DES ÉGALITÉS
// ==========================================

let positionActuelle = 1;

classement.forEach(function(joueur, index) {

    // Vérifier si le joueur est égal au précédent
    let memeClassement = false;

    if (index > 0) {

        let precedent = classement[index - 1];

        memeClassement =
            Number(joueur.points || 0) === Number(precedent.points || 0) &&
            Number(joueur.exacts || 0) === Number(precedent.exacts || 0) &&
            Number(joueur.pronostics || 0) === Number(precedent.pronostics || 0);

    }


    // Si ce n'est pas une égalité,
    // la position correspond au rang réel
    if (!memeClassement) {

        positionActuelle = index + 1;

    }


    // ==========================================
    // CLASSE CSS
    // ==========================================

    let classe =

        positionActuelle === 1
            ? "premier"
            : positionActuelle === 2
                ? "deuxieme"
                : positionActuelle === 3
                    ? "troisieme"
                    : "";


    // ==========================================
    // POSITION AFFICHÉE
    // ==========================================

    let position =

        positionActuelle === 1
            ? "🥇"
            : positionActuelle === 2
                ? "🥈"
                : positionActuelle === 3
                    ? "🥉"
                    : positionActuelle;


    // ==========================================
    // AFFICHAGE
    // ==========================================

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

    let competition =
    window.competitionPage || "Ligue des Nations";

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