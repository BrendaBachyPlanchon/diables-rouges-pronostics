// ==========================================
// AFFICHAGE DU PROCHAIN MATCH SUR L'ACCUEIL
// ==========================================

console.log("✅ affichage-accueil.js serveur actif");


fetch("matchs.json")

    .then(function(reponse) {

        if (!reponse.ok) {
            throw new Error("Erreur lors du chargement des matchs");
        }

        return reponse.json();

    })

    .then(function(matchsAdmin) {

        console.log(
            "✅ Matchs accueil chargés depuis le serveur :",
            matchsAdmin.length
        );


        let equipe1Accueil =
            document.getElementById("accueil-equipe1");


        if (!equipe1Accueil) {
            return;
        }


        if (matchsAdmin.length === 0) {

            console.log("⚠️ Aucun match disponible");

            return;

        }


        // ==========================================
        // PRENDRE LE PROCHAIN MATCH
        // ==========================================

        let matchsTries = matchsAdmin.slice().sort(function(a, b) {

            let dateA =
                new Date(a.date + "T" + a.heure);

            let dateB =
                new Date(b.date + "T" + b.heure);

            return dateA - dateB;

        });


        let match = matchsTries[0];


        // ==========================================
        // ÉQUIPES
        // ==========================================

        document.getElementById(
            "accueil-equipe1"
        ).innerText = match.equipe1;


        document.getElementById(
            "accueil-equipe2"
        ).innerText = match.equipe2;


        // ==========================================
        // DRAPEAUX / LOGOS
        // ==========================================

        let equipe1 =
            match.equipe1.trim();

        let equipe2 =
            match.equipe2.trim();


        if (typeof trouverImageEquipe === "function") {

            document.getElementById(
                "accueil-drapeau1"
            ).src =
                trouverImageEquipe(
                    equipe1,
                    "images/pays/belgique.png"
                );


            document.getElementById(
                "accueil-drapeau2"
            ).src =
                trouverImageEquipe(
                    equipe2,
                    "images/pays/belgique.png"
                );

        }


        // ==========================================
        // DATE
        // ==========================================

        document.getElementById(
            "accueil-date"
        ).innerText =
            "📅 Date : " + match.date;


        // ==========================================
        // HEURE
        // ==========================================

        document.getElementById(
            "accueil-heure"
        ).innerText =
            "🕘 Heure : " + match.heure;


        // ==========================================
        // COMPÉTITION
        // ==========================================

        let badgeCompetition =
            document.getElementById(
                "badge-competition"
            );


        if (badgeCompetition) {

            badgeCompetition.innerText =
                afficherCompetition(
                    match.competition
                );

        }


        // ==========================================
        // STADE
        // ==========================================

        let badgeStade =
            document.getElementById(
                "badge-stade"
            );


        if (badgeStade) {

            badgeStade.innerText =
                "🏟️ Stade : " +
                (match.stade || "À définir");

        }


        // ==========================================
        // STATUT
        // ==========================================

        let statutAffiche =
            "🟡 À venir";


        if (match.statut === "En cours") {

            statutAffiche =
                "🔴 En direct";

        }


        if (match.statut === "Terminé") {

            statutAffiche =
                "✅ Terminé";

        }


        let statutAccueil =
            document.getElementById(
                "accueil-statut"
            );


        if (statutAccueil) {

            statutAccueil.innerText =
                "Statut : " +
                statutAffiche;

        }

    })


    .catch(function(erreur) {

        console.error(
            "❌ Impossible de charger le match d'accueil :",
            erreur
        );

    });


// ==========================================
// AFFICHAGE DE LA COMPÉTITION
// ==========================================

function afficherCompetition(competition) {

    if (competition === "Ligue des Nations") {

        return "🏆🇪🇺 Ligue des Nations";

    }

    if (competition === "Coupe du Monde") {

        return "🌍 Coupe du Monde";

    }

    if (competition === "Euro") {

        return "🏆 Euro";

    }

    if (competition === "Ligue des Champions") {

        return "⭐ Ligue des Champions";

    }

    return competition;

}