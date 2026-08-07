let choixMatch = document.getElementById("choix-match");

if (choixMatch) {

    choixMatch.addEventListener("change", function () {

        let valeurMatch = this.value.trim();

        if (!valeurMatch) {
            return;
        }


        // ==========================================
        // RECHERCHE DU MATCH DANS LE FICHIER JSON
        // ==========================================

        fetch("matchs.json")

            .then(function(reponse) {

                if (!reponse.ok) {
                    throw new Error("Erreur matchs.php");
                }

                return reponse.json();

            })

            .then(function(matchsAdmin) {

                console.log(
                    "✅ Matchs changement-match chargés depuis le serveur :",
                    matchsAdmin.length
                );


                // ==========================================
                // TROUVER LE MATCH
                // ==========================================

                let matchAdmin = matchsAdmin.find(function(match) {

                    return (
                        match.equipe1.trim() +
                        " - " +
                        match.equipe2.trim()
                    ).toLowerCase() === valeurMatch.toLowerCase();

                });


                if (!matchAdmin) {

                    console.error(
                        "❌ Match introuvable :",
                        valeurMatch
                    );

                    return;

                }


                // ==========================================
                // INFORMATIONS DU MATCH
                // ==========================================

                let infos = {

                    date: matchAdmin.date,
                    heure: matchAdmin.heure,
                    competition: matchAdmin.competition

                };


                // ==========================================
                // ÉQUIPES
                // ==========================================

                let equipes = valeurMatch.split(" - ");

                let equipe1 = equipes[0].trim();
                let equipe2 = equipes[1].trim();


                console.log("Equipe 1 :", equipe1);
                console.log("Equipe 2 :", equipe2);


                document.getElementById(
                    "equipe-domicile"
                ).innerText = equipe1;


                document.getElementById(
                    "equipe-exterieur"
                ).innerText = equipe2;


                document.getElementById(
                    "score-domicile"
                ).innerText = equipe1;


                document.getElementById(
                    "score-exterieur"
                ).innerText = equipe2;


                // ==========================================
                // DRAPEAUX
                // ==========================================

                let drapeaux = {

    "Italie": "images/pays/italie.png",
    "Belgique": "images/pays/belgique.png",
    "France": "images/pays/france.png",
    "Turquie": "images/pays/turquie.png",
    "Espagne": "images/pays/espagne.png",

    "Andorre": "images/pays/andorre.png",
    "Malte": "images/pays/malte.png",
    "Serbie": "images/pays/serbie.png",
    "Grèce": "images/pays/grece.png",
    "Kosovo": "images/pays/kosovo.png",
    "Irlande": "images/pays/irlande.png",
    "Autriche": "images/pays/autriche.png",
    "Israël": "images/pays/israel.png",
    "Portugal": "images/pays/portugal.png",
    "Pays de Galles": "images/pays/pays-galles.png",
    "Liechtenstein": "images/pays/liechtenstein.png",
    "Lituanie": "images/pays/lituanie.png",
    "Pays-Bas": "images/pays/pays-bas.png",
    "Allemagne": "images/pays/allemagne.png",
    "Norvège": "images/pays/norvege.png",
    "Danemark": "images/pays/danemark.png",
    "Géorgie": "images/pays/georgie.png",
    "Irlande du Nord": "images/pays/irlande-du-nord.png",
    "Arménie": "images/pays/armenie.png",
    "Lettonie": "images/pays/lettonie.png",
    "Pologne": "images/pays/pologne.png",
    "Bosnie Herzégovine": "images/pays/bosnie-herzegovine.png",
    "Suède": "images/pays/suede.png",
    "Roumanie": "images/pays/roumanie.png",
    "Monténégro": "images/pays/montenegro.png",
    "Chypre": "images/pays/chypre.png",
    "Hongrie": "images/pays/hongrie.png",
    "Ukraine": "images/pays/ukraine.png",
    "Slovénie": "images/pays/slovenie.png",
    "Écosse": "images/pays/ecosse.png",
    "Féroé": "images/pays/feroe.png",
    "Kazakhstan": "images/pays/kazakhstan.png",
    "Bulgarie": "images/pays/bulgarie.png",
    "Luxembourg": "images/pays/luxembourg.png",
    "Islande": "images/pays/islande.png",
    "Estonie": "images/pays/estonie.png",
    "San Marin": "images/pays/saint-marin.png",
    "Finlande": "images/pays/finlande.png",
    "Macédoine du Nord": "images/pays/macedoine-du-nord.png",
    "Suisse": "images/pays/suisse.png",
    "Albanie": "images/pays/albanie.png",
    "Biélorussie": "images/pays/bielorussie.png",
    "Angleterre": "images/pays/angleterre.png",
    "Slovaquie": "images/pays/slovaquie.png",
    "Moldavie": "images/pays/moldavie.png",
    "République Tchèque": "images/pays/republique-tcheque.png",
    "Croatie": "images/pays/croatie.png",
    "Azerbaïdjan": "images/pays/azerbaidjan.png",
    "Gibraltar": "images/pays/gibraltar.png"

};


                // ==========================================
                // LOGOS JUPILER PRO LEAGUE
                // ==========================================

                let logosJupilerProLeague = {

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
                // NETTOYAGE DU NOM DES ÉQUIPES
                // ==========================================

                let nomEquipe1 =
                    equipe1.replace(
                        / 🇮🇹| 🇧🇪| 🇫🇷| 🇹🇷| 🇪🇸/g,
                        ""
                    ).trim();


                let nomEquipe2 =
                    equipe2.replace(
                        / 🇮🇹| 🇧🇪| 🇫🇷| 🇹🇷| 🇪🇸/g,
                        ""
                    ).trim();


                // ==========================================
                // AFFICHER LOGO / DRAPEAU ÉQUIPE 1
                // ==========================================

                document.getElementById(
                    "drapeau-domicile"
                ).src =

                    logosJupilerProLeague[nomEquipe1] ||
                    drapeaux[nomEquipe1] ||
                    "images/pays/belgique.png";


                // ==========================================
                // AFFICHER LOGO / DRAPEAU ÉQUIPE 2
                // ==========================================

                document.getElementById(
                    "drapeau-exterieur"
                ).src =

                    logosJupilerProLeague[nomEquipe2] ||
                    drapeaux[nomEquipe2] ||
                    "images/pays/france.png";


                // ==========================================
                // DATE / HEURE
                // ==========================================

                document.getElementById(
                    "date-match"
                ).innerText = infos.date;


                document.getElementById(
                    "heure-match"
                ).innerText = infos.heure;


                // ==========================================
                // COMPÉTITION
                // ==========================================

                let competitionAffichee =
                    infos.competition;


                if (
                    competitionAffichee ===
                    "Ligue des Nations"
                ) {

                    competitionAffichee =
                        "🏆🇪🇺 Ligue des Nations";

                }


                if (
                    competitionAffichee ===
                    "Coupe du Monde"
                ) {

                    competitionAffichee =
                        "🌍 Coupe du Monde";

                }


                if (
                    competitionAffichee ===
                    "Euro"
                ) {

                    competitionAffichee =
                        "🏆 Euro";

                }


                if (
                    competitionAffichee ===
                    "Ligue des Champions"
                ) {

                    competitionAffichee =
                        "⭐ Ligue des Champions";

                }


                document.getElementById(
                    "competition-match"
                ).innerText =
                    competitionAffichee;


                // ==========================================
                // VÉRIFIER OUVERTURE PRONOSTIC
                // ==========================================

                verifierOuverturePronostic();

            })

            .catch(function(erreur) {

                console.error(
                    "❌ Impossible de charger le match :",
                    erreur
                );

            });

    });

}


// ==========================================
// MATCH TRANSMIS DANS L'URL
// ==========================================

let parametreMatch =
    new URLSearchParams(
        window.location.search
    ).get("match");


let selectMatch =
    document.getElementById("choix-match");


if (
    parametreMatch &&
    selectMatch
) {

    for (
        let option of selectMatch.options
    ) {

        if (
            parametreMatch.includes(option.value) ||
            option.text.includes(parametreMatch)
        ) {

            option.selected = true;

            selectMatch.dispatchEvent(
                new Event("change")
            );

            break;

        }

    }

}
