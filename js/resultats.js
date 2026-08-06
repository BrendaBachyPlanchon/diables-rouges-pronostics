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

let tableauResultats = document.getElementById("table-resultats");

if (tableauResultats) {

    let matchsAdmin = JSON.parse(localStorage.getItem("matchsAdmin")) || [];

matchsAdmin.forEach(function(match) {

    console.log("MATCH ADMIN RESULTATS :", match.equipe1, "-", match.equipe2);

    let equipe1 = match.equipe1.trim();
let equipe2 = match.equipe2.trim();

let imageEquipe1 =
    logosJupilerProLeagueResultats[equipe1] ||
    drapeauxPaysResultats[equipe1];

let affichageEquipe1 = imageEquipe1
    ? `<img src="${imageEquipe1}" 
             style="width:35px; height:35px; object-fit:contain; vertical-align:middle; margin-right:8px;">
       ${equipe1}`
    : equipe1;

let imageEquipe2 =
    logosJupilerProLeagueResultats[equipe2] ||
    drapeauxPaysResultats[equipe2];

let affichageEquipe2 = imageEquipe2
    ? `<img src="${imageEquipe2}" 
             style="width:35px; height:35px; object-fit:contain; vertical-align:middle; margin-right:8px;">
       ${equipe2}`
    : equipe2;

    let resultat = "⚽ À venir";
let vainqueur = "";


if (match.statut === "Terminé") {


    resultat = match.score1 + " - " + match.score2;


    if (match.score1 > match.score2) {

        vainqueur = "🏆 Victoire " + match.equipe1;

    } else if (match.score1 < match.score2) {

        vainqueur = "🏆 Victoire " + match.equipe2;

    } else {

        vainqueur = "🤝 Match nul";

    }


} else if (match.statut === "En cours") {


    resultat = "🔴 Match en cours";


}


tableauResultats.innerHTML +=

"<tr>" +
"<td>" + affichageEquipe1 + " 🆚 " + affichageEquipe2 + "</td>" +
"<td>" + match.date + "</td>" +
"<td>" + match.heure + "</td>" +
"<td>" + afficherCompetition(match.competition) + "</td>" +
"<td>" + match.statut + "</td>" +
"<td>⚽ " + resultat + "<br>" + vainqueur + "</td>" +
"</tr>";

});

let matchsAdminNoms = matchsAdmin.map(function(match) {
    return (
        match.equipe1.replace(/[^a-zA-ZÀ-ÿ]/g, "").toLowerCase()
        +
        "-"
        +
        match.equipe2.replace(/[^a-zA-ZÀ-ÿ]/g, "").toLowerCase()
    );
});

    for (let match in resultatsOfficiels) {

console.log("MATCH OFFICIEL RESULTATS :", match);

let nomOfficiel = match
.replace(/[^a-zA-ZÀ-ÿ]/g, "")
.toLowerCase();

if (matchsAdmin.some(function(m) {

    let admin = (m.equipe1 + " - " + m.equipe2)
    .replace(/[^a-zA-ZÀ-ÿ]/g, "")
    .toLowerCase();

    let officiel = match
    .replace(/[^a-zA-ZÀ-ÿ]/g, "")
    .toLowerCase();

    return admin === officiel;

})) {

    continue;

}

        let resultat = resultatsOfficiels[match];

        let score = "À venir";
let statut = "⏳ À venir";
let vainqueur = "";

if (resultat.equipe1 !== null) {

    score = resultat.equipe1 + " - " + resultat.equipe2;
    statut = "✅ Terminé";


    let equipes = match.split(" - ");

if (resultat.equipe1 > resultat.equipe2) {

    vainqueur = "🏆 Victoire " + equipes[0];

} else if (resultat.equipe1 < resultat.equipe2) {

    vainqueur = "🏆 Victoire " + equipes[1];

} else {

    vainqueur = "🤝 Match nul";

}

}
        tableauResultats.innerHTML +=

        "<tr>" +
"<td>" + match + "</td>" +
"<td>" + statut + "</td>" +
"<td>⚽ " + score + "<br>" + vainqueur + "</td>" +
"</tr>";

    }

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