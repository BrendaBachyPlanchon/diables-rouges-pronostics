// ==========================================
// COMPTE À REBOURS DU PROCHAIN MATCH
// VERSION SUPABASE
// ==========================================

let dateProchainMatch = null;
let prochainMatch = null;


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
// TROUVER LE PROCHAIN MATCH DEPUIS SUPABASE
// ==========================================

function trouverProchainMatch() {

    supabaseClient
        .from("matchs")
        .select("*")

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement prochain match depuis Supabase :",
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

                prochainMatch = null;
                dateProchainMatch = null;

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
            // PRENDRE LE PROCHAIN MATCH
            // ==========================================

            prochainMatch =
                prochains[0];


            dateProchainMatch =
                new Date(
                    prochainMatch.date +
                    "T" +
                    prochainMatch.heure
                ).getTime();


            console.log(
                "🎯 Prochain match du compteur depuis Supabase :",
                prochainMatch.equipe1,
                "-",
                prochainMatch.equipe2,
                prochainMatch.date,
                prochainMatch.heure
            );


            afficherNomProchainMatch();

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger le prochain match du compteur :",
                erreur
            );

        });

}


// ==========================================
// AFFICHER LE MATCH
// ==========================================

function afficherNomProchainMatch() {

    if (!prochainMatch) {
        return;
    }


    let equipe1 =
        document.getElementById(
            "compteur-equipe1"
        );


    let equipe2 =
        document.getElementById(
            "compteur-equipe2"
        );


    if (equipe1) {

        equipe1.innerText =
            prochainMatch.equipe1.trim();

    }


    if (equipe2) {

        equipe2.innerText =
            prochainMatch.equipe2.trim();

    }


    // ==========================================
    // LOGOS
    // ==========================================

    let drapeau1 =
        document.getElementById(
            "compteur-drapeau1"
        );


    let drapeau2 =
        document.getElementById(
            "compteur-drapeau2"
        );


    let equipe1Nom =
        prochainMatch.equipe1.trim();


    let equipe2Nom =
        prochainMatch.equipe2.trim();


    if (drapeau1) {

        drapeau1.src =
            logosCompteurJupilerProLeague[equipe1Nom] ||
            drapeaux[equipe1Nom] ||
            "images/pays/belgique.png";

    }


    if (drapeau2) {

        drapeau2.src =
            logosCompteurJupilerProLeague[equipe2Nom] ||
            drapeaux[equipe2Nom] ||
            "images/pays/belgique.png";

    }

}


// ==========================================
// COMPTE À REBOURS
// ==========================================

function lancerCompteARebours() {

    if (prochainMatch === null) {

        trouverProchainMatch();

    }


    if (dateProchainMatch === null) {

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
    // MATCH COMMENCÉ
    // ==========================================

    if (distance <= 0) {

        if (compteur) {

            compteur.innerHTML =
                "⚽ Match commencé !";

        }


        prochainMatch = null;
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