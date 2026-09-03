// ==========================================
// AFFICHAGE DES PROCHAINS MATCHS SUR L'ACCUEIL
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


        // ==========================================
        // TROUVER LE CONTENEUR
        // ==========================================

        let zoneMatchs =
            document.getElementById(
                "liste-prochains-matchs-accueil"
            );


        if (!zoneMatchs) {

            console.error(
                "❌ Conteneur liste-prochains-matchs-accueil introuvable"
            );

            return;
        }


        // ==========================================
        // MATCHS À VENIR
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

            zoneMatchs.innerHTML =
                "<p>⚽ Aucun match à venir.</p>";

            console.log(
                "⚠️ Aucun match à venir"
            );

            return;
        }


        // ==========================================
        // TRIER PAR DATE ET HEURE
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
        // PREMIER COUP D'ENVOI
        // ==========================================

        let datePremierMatch =
            new Date(
                matchsAVenir[0].date +
                "T" +
                matchsAVenir[0].heure
            ).getTime();


        // ==========================================
        // TOUS LES MATCHS AU MÊME COUP D'ENVOI
        // ==========================================

        let prochainsMatchs =
            matchsAVenir.filter(function(match) {

                let dateMatch =
                    new Date(
                        match.date +
                        "T" +
                        match.heure
                    ).getTime();

                return (
                    dateMatch ===
                    datePremierMatch
                );

            });


        console.log(
            "🎯 Prochains matchs accueil :",
            prochainsMatchs
        );


        // ==========================================
        // AFFICHAGE
        // ==========================================

        zoneMatchs.innerHTML = "";


        prochainsMatchs.forEach(function(match) {

            let equipe1 =
                (match.equipe1 || "").trim();


            let equipe2 =
                (match.equipe2 || "").trim();


            // ==========================================
            // LOGOS
            // ==========================================

            let logo1 =
                "images/pays/belgique.png";


            let logo2 =
                "images/pays/belgique.png";


            if (
                typeof logosJupilerProLeague !==
                "undefined"
            ) {

                if (
                    logosJupilerProLeague[equipe1]
                ) {

                    logo1 =
                        logosJupilerProLeague[equipe1];

                }


                if (
                    logosJupilerProLeague[equipe2]
                ) {

                    logo2 =
                        logosJupilerProLeague[equipe2];

                }

            }


            // ==========================================
            // DRAPEAUX
            // ==========================================

            if (
                typeof drapeaux !==
                "undefined"
            ) {

                if (drapeaux[equipe1]) {

                    logo1 =
                        drapeaux[equipe1];

                }


                if (drapeaux[equipe2]) {

                    logo2 =
                        drapeaux[equipe2];

                }

            }


            // ==========================================
            // LIGNE DU MATCH
            // ==========================================

            let ligne =
                document.createElement("div");


            ligne.className =
                "match-accueil-ligne";


            ligne.innerHTML = `

                <div class="equipe-accueil">

                    <img
                        src="${logo1}"
                        alt="${equipe1}"
                        width="65"
                    >

                    <strong>
                        ${equipe1}
                    </strong>

                </div>


                <div class="versus-accueil">

                    🆚

                </div>


                <div class="equipe-accueil">

                    <strong>
                        ${equipe2}
                    </strong>

                    <img
                        src="${logo2}"
                        alt="${equipe2}"
                        width="65"
                    >

                </div>

            `;


            zoneMatchs.appendChild(ligne);

        });


        // ==========================================
        // DATE
        // ==========================================

        let premierMatch =
            prochainsMatchs[0];


        let dateAccueil =
            document.getElementById(
                "accueil-date"
            );


        if (dateAccueil) {

            dateAccueil.innerText =
                "📅 Date : " +
                premierMatch.date;

        }


        // ==========================================
        // HEURE
        // ==========================================

        let heureAccueil =
            document.getElementById(
                "accueil-heure"
            );


        if (heureAccueil) {

            heureAccueil.innerText =
                "🕘 Heure : " +
                premierMatch.heure;

        }


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
                    premierMatch.competition
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

            if (prochainsMatchs.length === 1) {

                badgeStade.innerText =
                    "🏟️ Stade : " +
                    (
                        premierMatch.stade ||
                        "À définir"
                    );

            } else {

                badgeStade.innerText =
                    "🏟️ " +
                    prochainsMatchs.length +
                    " matchs au même coup d'envoi";

            }

        }


        // ==========================================
        // STATUT
        // ==========================================

        let statutAccueil =
            document.getElementById(
                "accueil-statut"
            );


        if (statutAccueil) {

            statutAccueil.innerText =
                "🟡 Statut : À venir";

        }

    })


    .catch(function(erreur) {

        console.error(
            "❌ Impossible de charger les matchs d'accueil depuis Supabase :",
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


    if (
        competition ===
        "Europa League"
    ) {

        return "🟠 Europa League";

    }


    if (
        competition ===
        "Conference League"
    ) {

        return "🟢 Conference League";

    }


    if (
        competition ===
        "Jupiler Pro League"
    ) {

        return "🇧🇪 Jupiler Pro League";

    }


    return competition;

}