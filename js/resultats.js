const logosJupilerProLeagueResultats = {

    // Club Brugge
    "Club Brugge": "images/clubs/club-brugge.png",
    "Club Bruges": "images/clubs/club-brugge.png",
    "Bruges": "images/clubs/club-brugge.png",

    // Courtrai
    "KV Kortrijk": "images/clubs/kortrijk.png",
    "Kortrijk": "images/clubs/kortrijk.png",
    "Courtrai": "images/clubs/kortrijk.png",
    "KV Courtrai": "images/clubs/kortrijk.png",

    // Lommel
    "Lommel SK": "images/clubs/lommel.png",
    "Lommel": "images/clubs/lommel.png",

    // Beveren
    "SK Beveren": "images/clubs/beveren.png",
    "Beveren": "images/clubs/beveren.png",

    // STVV
    "STVV": "images/clubs/stvv.png",
    "Saint-Trond": "images/clubs/stvv.png",
    "Sint-Truiden": "images/clubs/stvv.png",

    // Union
    "Union Saint-Gilloise": "images/clubs/union.png",
    "Union Saint-Gilloise": "images/clubs/union.png",
    "Union": "images/clubs/union.png",

    // Westerlo
    "KVC Westerlo": "images/clubs/westerlo.png",
    "Westerlo": "images/clubs/westerlo.png",

    // Standard
    "Standard de Liège": "images/clubs/standard.png",
    "Standard": "images/clubs/standard.png",

    // Cercle Brugge
    "Cercle Brugge": "images/clubs/cercle-brugge.png",
    "Cercle Bruges": "images/clubs/cercle-brugge.png",

    // Zulte Waregem
    "SV Zulte Waregem": "images/clubs/zulte-waregem.png",
    "Zulte Waregem": "images/clubs/zulte-waregem.png",

    // Genk
    "KRC Genk": "images/clubs/genk.png",
    "Genk": "images/clubs/genk.png",

    // Anderlecht
    "RSC Anderlecht": "images/clubs/anderlecht.png",
    "Anderlecht": "images/clubs/anderlecht.png",

    // RAAL La Louvière
    "RAAL La Louvière": "images/clubs/raal-la-louviere.png",
    "La Louvière": "images/clubs/raal-la-louviere.png",

    // Charleroi
    "Sporting Charleroi": "images/clubs/charleroi.png",
    "Charleroi": "images/clubs/charleroi.png",

    // OH Leuven
    "OH Leuven": "images/clubs/oh-leuven.png",
    "OHL": "images/clubs/oh-leuven.png",
    "OH Louvain": "images/clubs/oh-leuven.png",

    // Gent / Gantoise
    "KAA Gent": "images/clubs/gent.png",
    "Gent": "images/clubs/gent.png",
    "La Gantoise": "images/clubs/gent.png",
    "Gantoise": "images/clubs/gent.png",

    // Mechelen
    "KV Mechelen": "images/clubs/mechelen.png",
    "Mechelen": "images/clubs/mechelen.png",

    // Antwerp
    "Royal Antwerp FC": "images/clubs/antwerp.png",
    "Antwerp": "images/clubs/antwerp.png"

};

const drapeauxPaysResultats = {

    "Belgique": "images/pays/belgique.png",
    "France": "images/pays/france.png",
    "Italie": "images/pays/italie.png",
    "Kosovo": "images/pays/kosovo.png",
    "Irlande": "images/pays/irlande.png",
    "Autriche": "images/pays/autriche.png",
    "Israël": "images/pays/israel.png",
    "Portugal": "images/pays/portugal.png",
    "Allemagne": "images/pays/allemagne.png",
    "Pays-Bas": "images/pays/pays-bas.png",
    "Norvège": "images/pays/norvege.png",
    "Danemark": "images/pays/danemark.png",
    "Grèce": "images/pays/grece.png",
    "Serbie": "images/pays/serbie.png",
    "Espagne": "images/pays/espagne.png",
    "Croatie": "images/pays/croatie.png",
    "Suisse": "images/pays/suisse.png",
    "Suède": "images/pays/suede.png",
    "Roumanie": "images/pays/roumanie.png",
    "Pologne": "images/pays/pologne.png",
    "Ukraine": "images/pays/ukraine.png",
    "Turquie": "images/pays/turquie.png",
    "Slovénie": "images/pays/slovenie.png",
    "Écosse": "images/pays/ecosse.png",
    "Hongrie": "images/pays/hongrie.png",
    "Géorgie": "images/pays/georgie.png",
    "Arménie": "images/pays/armenie.png",
    "Chypre": "images/pays/chypre.png",
    "Monténégro": "images/pays/montenegro.png",
    "Lettonie": "images/pays/lettonie.png",
    "Lituanie": "images/pays/lituanie.png",
    "Estonie": "images/pays/estonie.png",
    "Finlande": "images/pays/finlande.png",
    "Bulgarie": "images/pays/bulgarie.png",
    "Albanie": "images/pays/albanie.png",
    "Biélorussie": "images/pays/bielorussie.png",
    "Bosnie Herzégovine": "images/pays/bosnie-herzegovine.png",
    "Macédoine du Nord": "images/pays/macedoine-du-nord.png",
    "Slovaquie": "images/pays/slovaquie.png",
    "République Tchèque": "images/pays/republique-tcheque.png",
    "Moldavie": "images/pays/moldavie.png",
    "Kazakhstan": "images/pays/kazakhstan.png",
    "Féroé": "images/pays/feroe.png",
    "Liechtenstein": "images/pays/liechtenstein.png",
    "Azerbaïdjan": "images/pays/azerbaidjan.png",
    "Gibraltar": "images/pays/gibraltar.png",
    "Malte": "images/pays/malte.png",
    "Andorre": "images/pays/andorre.png",
    "Pays de Galles": "images/pays/pays-galles.png",
    "Irlande du Nord": "images/pays/irlande-du-nord.png",
    "Luxembourg": "images/pays/luxembourg.png",
    "Islande": "images/pays/islande.png",
    "San Marin": "images/pays/saint-marin.png",
    "Angleterre": "images/pays/angleterre.png"
};

let tableauResultats =
    document.getElementById("table-resultats");

if (tableauResultats) {

    fetch("matchs.json")

        .then(function(reponse) {

            if (!reponse.ok) {
                throw new Error("Erreur matchs.json");
            }

            return reponse.json();

        })

        .then(function(matchsAdmin) {

            // ==========================================
// TRIER LES MATCHS DU PLUS RÉCENT AU PLUS ANCIEN
// ==========================================

matchsAdmin.sort(function(a, b) {

    let dateA =
        new Date(a.date + "T" + a.heure);

    let dateB =
        new Date(b.date + "T" + b.heure);

    return dateB - dateA;

});

            console.log(
                "✅ Résultats chargés depuis matchs.json :",
                matchsAdmin.length
            );

            // ==========================================
            // AFFICHER LES MATCHS
            // ==========================================

            matchsAdmin.forEach(function(match) {

                console.log(
                    "MATCH RESULTAT :",
                    match.equipe1,
                    "-",
                    match.equipe2,
                    match.score1,
                    "-",
                    match.score2
                );

                let equipe1 =
                    match.equipe1.trim();

                let equipe2 =
                    match.equipe2.trim();


                // ==========================================
                // LOGO / DRAPEAU ÉQUIPE 1
                // ==========================================

                let imageEquipe1 =
                    logosJupilerProLeagueResultats[equipe1] ||
                    drapeauxPaysResultats[equipe1];


                let affichageEquipe1 =
                    imageEquipe1

                    ? `<img src="${imageEquipe1}"
                        style="width:35px;height:35px;object-fit:contain;vertical-align:middle;margin-right:8px;">
                       ${equipe1}`

                    : equipe1;


                // ==========================================
                // LOGO / DRAPEAU ÉQUIPE 2
                // ==========================================

                let imageEquipe2 =
                    logosJupilerProLeagueResultats[equipe2] ||
                    drapeauxPaysResultats[equipe2];


                let affichageEquipe2 =
                    imageEquipe2

                    ? `<img src="${imageEquipe2}"
                        style="width:35px;height:35px;object-fit:contain;vertical-align:middle;margin-right:8px;">
                       ${equipe2}`

                    : equipe2;


                // ==========================================
                // RÉSULTAT
                // ==========================================

                let resultat =
                    "⚽ À venir";

                let vainqueur = "";


                if (match.statut === "Terminé") {

                    resultat =
                        match.score1 +
                        " - " +
                        match.score2;


                    if (
                        Number(match.score1) >
                        Number(match.score2)
                    ) {

                        vainqueur =
                            " 🏆 Victoire " +
                            equipe1;

                    }

                    else if (
                        Number(match.score1) <
                        Number(match.score2)
                    ) {

                        vainqueur =
                            " 🏆 Victoire " +
                            equipe2;

                    }

                    else {

                        vainqueur =
                            " 🤝 Match nul";

                    }

                }

                else if (
                    match.statut === "En cours"
                ) {

                    resultat =
                        "🔴 Match en cours";

                }


                // ==========================================
                // AJOUTER LA LIGNE AU TABLEAU
                // ==========================================

                tableauResultats.innerHTML +=

                    "<tr>" +

                    "<td>" +
                    affichageEquipe1 +
                    " 🆚 " +
                    affichageEquipe2 +
                    "</td>" +

                    "<td>" +
                    match.date +
                    "</td>" +

                    "<td>" +
                    match.heure +
                    "</td>" +

                    "<td>" +
                    afficherCompetition(
                        match.competition
                    ) +
                    "</td>" +

                    "<td>" +
                    match.statut +
                    "</td>" +

                    "<td>" +
                    "⚽ " +
                    resultat +
                    vainqueur +
                    "</td>" +

                    "</tr>";

            });

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger les résultats :",
                erreur
            );

        });

}

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