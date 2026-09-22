// ==========================================
// COMPTE À REBOURS DES PROCHAINS MATCHS
// VERSION SUPABASE
// ==========================================

let dateProchainMatch = null;
let prochainsMatchs = [];


// ==========================================
// LOGOS ET DRAPEAUX
// ==========================================

const drapeaux = {

    "Belgique": "images/pays/belgique.png",
    "France": "images/pays/france.png",
    "Italie": "images/pays/italie.png",
    "Espagne": "images/pays/espagne.png",
    "Turquie": "images/pays/turquie.png"

};


// ==========================================
// LOGOS JUPILER PRO LEAGUE
// ==========================================

const logosCompteurJupilerProLeague = {

    "Club Brugge": "images/clubs/club-brugge.png",
    "Club Bruges": "images/clubs/club-brugge.png",
    "Bruges": "images/clubs/club-brugge.png",

    "KV Kortrijk": "images/clubs/kortrijk.png",
    "Kortrijk": "images/clubs/kortrijk.png",
    "Courtrai": "images/clubs/kortrijk.png",
    "KV Courtrai": "images/clubs/kortrijk.png",

    "Lommel SK": "images/clubs/lommel.png",
    "Lommel": "images/clubs/lommel.png",

    "SK Beveren": "images/clubs/beveren.png",
    "Beveren": "images/clubs/beveren.png",

    "STVV": "images/clubs/stvv.png",
    "Saint-Trond": "images/clubs/stvv.png",

    "Union Saint-Gilloise": "images/clubs/union.png",
    "Union": "images/clubs/union.png",
    "Union SG": "images/clubs/union.png",

    "KVC Westerlo": "images/clubs/westerlo.png",
    "Westerlo": "images/clubs/westerlo.png",

    "Standard de Liège": "images/clubs/standard.png",
    "Standard": "images/clubs/standard.png",

    "Cercle Brugge": "images/clubs/cercle-brugge.png",
    "Cercle Bruges": "images/clubs/cercle-brugge.png",
    "Cercle de Bruges": "images/clubs/cercle-brugge.png",
    "Cercle": "images/clubs/cercle-brugge.png",

    "SV Zulte Waregem": "images/clubs/zulte-waregem.png",
    "Zulte Waregem": "images/clubs/zulte-waregem.png",

    "KRC Genk": "images/clubs/genk.png",
    "Genk": "images/clubs/genk.png",

    "RSC Anderlecht": "images/clubs/anderlecht.png",
    "Anderlecht": "images/clubs/anderlecht.png",

    "RAAL La Louvière": "images/clubs/raal-la-louviere.png",
    "La Louvière": "images/clubs/raal-la-louviere.png",
    "RAAL": "images/clubs/raal-la-louviere.png",

    "Sporting Charleroi": "images/clubs/charleroi.png",
    "Charleroi": "images/clubs/charleroi.png",

    "OH Leuven": "images/clubs/oh-leuven.png",
    "OH Louvain": "images/clubs/oh-leuven.png",
    "Louvain": "images/clubs/oh-leuven.png",

    "KAA Gent": "images/clubs/gent.png",
    "Gent": "images/clubs/gent.png",
    "Gantoise": "images/clubs/gent.png",
    "La Gantoise": "images/clubs/gent.png",

    "KV Mechelen": "images/clubs/mechelen.png",
    "Mechelen": "images/clubs/mechelen.png",
    "Malines": "images/clubs/mechelen.png",

    "Royal Antwerp FC": "images/clubs/antwerp.png",
    "Antwerp": "images/clubs/antwerp.png",
    "Anvers": "images/clubs/antwerp.png"

};

// ==========================================
// LOGOS LIGUE DES NATIONS
// ==========================================

var logosClassementPays = {

    "France": "images/pays/france.png",
    "Italie": "images/pays/italie.png",
    "Belgique": "images/pays/belgique.png",
    "Turquie": "images/pays/turquie.png",

    "Allemagne": "images/pays/allemagne.png",
    "Pays-Bas": "images/pays/pays-bas.png",
    "Serbie": "images/pays/serbie.png",
    "Grèce": "images/pays/grece.png",

    "Espagne": "images/pays/espagne.png",
    "Croatie": "images/pays/croatie.png",
    "Angleterre": "images/pays/angleterre.png",
    "République Tchèque": "images/pays/republique-tcheque.png",

    "Portugal": "images/pays/portugal.png",
    "Danemark": "images/pays/danemark.png",
    "Norvège": "images/pays/norvege.png",
    "Pays de Galles": "images/pays/pays-galles.png",

    "Écosse": "images/pays/ecosse.png",
    "Suisse": "images/pays/suisse.png",
    "Slovénie": "images/pays/slovenie.png",
    "Macédoine du Nord": "images/pays/macedoine-du-nord.png",

    "Hongrie": "images/pays/hongrie.png",
    "Ukraine": "images/pays/ukraine.png",
    "Géorgie": "images/pays/georgie.png",
    "Irlande du Nord": "images/pays/irlande-du-nord.png",

    "Israël": "images/pays/israel.png",
    "Autriche": "images/pays/autriche.png",
    "Irlande": "images/pays/irlande.png",
    "Kosovo": "images/pays/kosovo.png",

    "Pologne": "images/pays/pologne.png",
    "Bosnie Herzégovine": "images/pays/bosnie-herzegovine.png",
    "Roumanie": "images/pays/roumanie.png",
    "Suède": "images/pays/suede.png",

    "Albanie": "images/pays/albanie.png",
    "Finlande": "images/pays/finlande.png",
    "Biélorussie": "images/pays/bielorussie.png",
    "San Marin": "images/pays/saint-marin.png",

    "Chypre": "images/pays/chypre.png",
    "Monténégro": "images/pays/montenegro.png",
    "Arménie": "images/pays/armenie.png",
    "Lettonie": "images/pays/lettonie.png",

    "Féroé": "images/pays/feroe.png",
    "Kazakhstan": "images/pays/Kazakhstan.png",
    "Slovaquie": "images/pays/slovaquie.png",
    "Moldavie": "images/pays/moldavie.png",

    "Islande": "images/pays/islande.png",
    "Bulgarie": "images/pays/bulgarie.png",
    "Estonie": "images/pays/estonie.png",
    "Luxembourg": "images/pays/luxembourg.png",

    "Gibraltar": "images/pays/gibraltar.png",
    "Malte": "images/pays/malte.png",
    "Andorre": "images/pays/andorre.png",

    "Azerbaïdjan": "images/pays/azerbaidjan.png",
    "Lituanie": "images/pays/lituanie.png",
    "Liechtenstein": "images/pays/liechtenstein.png"

};


// ==========================================
// TROUVER LES PROCHAINS MATCHS
// ==========================================

function trouverProchainMatch() {

    supabaseClient
        .from("matchs")
        .select("*")

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement prochains matchs depuis Supabase :",
                    resultat.error
                );

                return;

            }


            let matchs =
                resultat.data || [];


            console.log(
                "✅ Matchs compteur chargés depuis Supabase :",
                matchs.length
            );


            let maintenant =
                new Date().getTime();


            // ==========================================
            // GARDER UNIQUEMENT LES MATCHS À VENIR
            // ==========================================

            let prochains =
                matchs.filter(function(match) {

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


            if (prochains.length === 0) {

                prochainsMatchs = [];
                dateProchainMatch = null;

                afficherProchainsMatchs();

                console.log(
                    "⚠️ Aucun match à venir pour le compteur"
                );

                return;

            }


            // ==========================================
            // TRIER PAR DATE
            // ==========================================

            prochains.sort(function(a, b) {

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
            // DATE DU PROCHAIN COUP D'ENVOI
            // ==========================================

            let premierMatch =
                prochains[0];


            dateProchainMatch =
                new Date(
                    premierMatch.date +
                    "T" +
                    premierMatch.heure
                ).getTime();


            // ==========================================
            // PRENDRE TOUS LES MATCHS
            // AYANT LE MÊME COUP D'ENVOI
            // ==========================================

            prochainsMatchs =
                prochains.filter(function(match) {

                    let dateMatch =
                        new Date(
                            match.date +
                            "T" +
                            match.heure
                        ).getTime();

                    return (
                        dateMatch ===
                        dateProchainMatch
                    );

                });


            console.log(
                "🎯 Matchs au prochain coup d'envoi :",
                prochainsMatchs
            );


            afficherProchainsMatchs();

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger les prochains matchs du compteur :",
                erreur
            );

        });

}


// ==========================================
// AFFICHER LES PROCHAINS MATCHS
// ==========================================

function afficherProchainsMatchs() {

    let zone =
        document.getElementById(
            "liste-prochains-matchs"
        );


    if (!zone) {
        return;
    }


    // ==========================================
    // AUCUN MATCH
    // ==========================================

    if (prochainsMatchs.length === 0) {

        zone.innerHTML =
            "⚽ Aucun match à venir.";

        return;

    }


    // ==========================================
    // CONSTRUIRE LA LISTE
    // ==========================================

    zone.innerHTML = "";


    prochainsMatchs.forEach(function(match) {

        let equipe1 =
            (match.equipe1 || "").trim();


        let equipe2 =
            (match.equipe2 || "").trim();


      // ==========================================
// CHOISIR LES LOGOS SELON LA COMPÉTITION
// ==========================================

let logosCompetition = {};


// ==========================================
// JUPILER PRO LEAGUE
// ==========================================

if (
    match.competition === "Jupiler Pro League"
) {

    logosCompetition =
        logosCompteurJupilerProLeague;

}


// ==========================================
// LIGUE DES CHAMPIONS
// ==========================================

else if (
    match.competition === "Ligue des Champions" &&
    typeof logosLigueDesChampions !== "undefined"
) {

    logosCompetition =
        logosLigueDesChampions;

}


// ==========================================
// EUROPA LEAGUE
// ==========================================

else if (
    match.competition === "Europa League" &&
    typeof logosEuropaLeague !== "undefined"
) {

    logosCompetition =
        logosEuropaLeague;

}


// ==========================================
// RECHERCHER LES LOGOS
// ==========================================

let logo1 =
    logosCompetition[equipe1] ||
    drapeaux[equipe1] ||
    "images/pays/belgique.png";

let logo2 =
    logosCompetition[equipe2] ||
    drapeaux[equipe2] ||
    "images/pays/belgique.png";


        let ligne =
            document.createElement("div");


        ligne.className =
            "match-compteur-ligne";


        ligne.innerHTML = `

            <img
                src="${logo1}"
                alt="${equipe1}"
                width="45"
            >

            <strong>
                ${equipe1}
            </strong>

            <span>
                🆚
            </span>

            <strong>
                ${equipe2}
            </strong>

            <img
                src="${logo2}"
                alt="${equipe2}"
                width="45"
            >

        `;


        zone.appendChild(ligne);

    });

}


// ==========================================
// COMPTE À REBOURS
// ==========================================

function lancerCompteARebours() {

    if (dateProchainMatch === null) {

        trouverProchainMatch();

        return;

    }


    let maintenant =
        new Date().getTime();


    let distance =
        dateProchainMatch -
        maintenant;


    let compteur =
        document.getElementById(
            "compte-a-rebours"
        );


    // ==========================================
    // COUP D'ENVOI ATTEINT
    // ==========================================

    if (distance <= 0) {

        if (compteur) {

            compteur.innerHTML =
                "⚽ Coup d'envoi !";

        }


        prochainsMatchs = [];
        dateProchainMatch = null;


        setTimeout(function() {

            trouverProchainMatch();

        }, 1000);


        return;

    }


    // ==========================================
    // CALCUL DU TEMPS
    // ==========================================

    let jours =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    let heures =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    let minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    let secondes =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    if (compteur) {

        compteur.innerHTML =
            jours + " jours " +
            heures + " heures " +
            minutes + " minutes " +
            secondes + " secondes";

    }

}


// ==========================================
// LANCEMENT
// ==========================================

trouverProchainMatch();

setInterval(
    lancerCompteARebours,
    1000
);