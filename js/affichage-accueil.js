// ==========================================
// AFFICHAGE DU PROCHAIN MATCH SUR L'ACCUEIL
// VERSION SUPABASE
// ==========================================

console.log("✅ affichage-accueil.js serveur actif");


// ==========================================
// CHARGER LES MATCHS DEPUIS SUPABASE
// ==========================================

supabaseClient
    .from("matchs")
    .select("*")

    .then(function(resultat) {

        if (resultat.error) {

            console.error(
                "❌ Erreur chargement matchs accueil depuis Supabase :",
                resultat.error
            );

            return;

        }


        let matchsAdmin =
            resultat.data || [];


        console.log(
            "✅ Matchs accueil chargés depuis Supabase :",
            matchsAdmin.length
        );


        let equipe1Accueil =
            document.getElementById(
                "accueil-equipe1"
            );


        if (!equipe1Accueil) {
            return;
        }


        if (matchsAdmin.length === 0) {

            console.log(
                "⚠️ Aucun match disponible dans Supabase"
            );

            return;

        }


        // ==========================================
        // PRENDRE LE PROCHAIN MATCH À VENIR
        // ==========================================

        let maintenant =
            new Date().getTime();


        let matchsAVenir =
            matchsAdmin.filter(function(match) {

                let dateMatch =
                    new Date(
                        match.date +
                        "T" +
                        match.heure
                    ).getTime();

                return (
                    match.statut === "À venir" &&
                    dateMatch > maintenant
                );

            });


        if (matchsAVenir.length === 0) {

            console.log(
                "⚠️ Aucun match à venir"
            );

            return;

        }


        // ==========================================
        // TRIER PAR DATE
        // ==========================================

        matchsAVenir.sort(function(a, b) {

            let dateA =
                new Date(
                    a.date +
                    "T" +
                    a.heure
                ).getTime();

            let dateB =
                new Date(
                    b.date +
                    "T" +
                    b.heure
                ).getTime();

            return dateA - dateB;

        });


        // ==========================================
        // PRENDRE LE PREMIER MATCH
        // ==========================================

        let match =
            matchsAVenir[0];


        console.log(
            "🎯 Prochain match accueil depuis Supabase :",
            match.equipe1,
            "-",
            match.equipe2,
            match.date,
            match.heure
        );


        // ==========================================
        // ÉQUIPES
        // ==========================================

        document.getElementById(
            "accueil-equipe1"
        ).innerText =
            match.equipe1;


        document.getElementById(
            "accueil-equipe2"
        ).innerText =
            match.equipe2;


        // ==========================================
        // DRAPEAUX / LOGOS
        // ==========================================

        let equipe1 =
            match.equipe1.trim();

        let equipe2 =
            match.equipe2.trim();


        if (
            typeof logosJupilerProLeague !==
            "undefined"
        ) {

            let logo1 =
                logosJupilerProLeague[equipe1];

            let logo2 =
                logosJupilerProLeague[equipe2];


            if (logo1) {

                document.getElementById(
                    "accueil-drapeau1"
                ).src =
                    logo1;

            }


            if (logo2) {

                document.getElementById(
                    "accueil-drapeau2"
                ).src =
                    logo2;

            }

        }


        // ==========================================
        // DATE
        // ==========================================

        document.getElementById(
            "accueil-date"
        ).innerText =
            "📅 Date : " +
            match.date;


        // ==========================================
        // HEURE
        // ==========================================

        document.getElementById(
            "accueil-heure"
        ).innerText =
            "🕘 Heure : " +
            match.heure;


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
                (
                    match.stade ||
                    "À définir"
                );

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
            "❌ Impossible de charger le match d'accueil depuis Supabase :",
            erreur
        );

    });


// ==========================================
// AFFICHAGE DE LA COMPÉTITION
// ==========================================

function afficherCompetition(competition) {

    if (
        competition ===
        "Ligue des Nations"
    ) {

        return "🏆🇪🇺 Ligue des Nations";

    }


    if (
        competition ===
        "Coupe du Monde"
    ) {

        return "🌍 Coupe du Monde";

    }


    if (
        competition ===
        "Euro"
    ) {

        return "🏆 Euro";

    }


    if (
        competition ===
        "Ligue des Champions"
    ) {

        return "⭐ Ligue des Champions";

    }


    return competition;

}