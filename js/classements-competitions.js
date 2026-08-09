console.log("Classements des compétitions chargé");

let choixCompetition = document.getElementById("choix-competition-classement");
let zoneClassements = document.getElementById("zone-classements");

const equipesJupilerProLeague = [
    "Club Brugge",
    "Courtrai",
    "Lommel",
    "SK Beveren",
    "Saint-Trond",
    "Union Saint-Gilloise",
    "Westerlo",
    "Standard",
    "Cercle Bruges",
    "Zulte Waregem",
    "Genk",
    "Anderlecht",
    "La Louvière",
    "Charleroi",
    "OH Louvain",
    "Gantoise",
    "Mechelen",
    "Antwerp"
];

const logosClassementJupilerProLeague = {

    "Club Brugge": "images/clubs/club-brugge.png",
    "Courtrai": "images/clubs/kortrijk.png",
    "Lommel": "images/clubs/lommel.png",
    "SK Beveren": "images/clubs/beveren.png",
    "Saint-Trond": "images/clubs/stvv.png",
    "Union Saint-Gilloise": "images/clubs/union.png",
    "Westerlo": "images/clubs/westerlo.png",
    "Standard": "images/clubs/standard.png",
    "Cercle Bruges": "images/clubs/cercle-brugge.png",
    "Zulte Waregem": "images/clubs/zulte-waregem.png",
    "Genk": "images/clubs/genk.png",
    "Anderlecht": "images/clubs/anderlecht.png",
    "La Louvière": "images/clubs/raal-la-louviere.png",
    "Charleroi": "images/clubs/charleroi.png",
    "OH Louvain": "images/clubs/oh-leuven.png",
    "Gantoise": "images/clubs/gent.png",
    "Mechelen": "images/clubs/mechelen.png",
    "Antwerp": "images/clubs/antwerp.png"

};

const logosClassementPays = {

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

const groupesLigueA = {

    A1: ["France", "Italie", "Belgique", "Turquie"],

    A2: ["Allemagne", "Pays-Bas", "Serbie", "Grèce"],

    A3: ["Espagne", "Croatie", "Angleterre", "République Tchèque"],

    A4: ["Portugal", "Danemark", "Norvège", "Pays de Galles"]

};


const groupesLigueB = {

    B1: ["Écosse", "Suisse", "Slovénie", "Macédoine du Nord"],

    B2: ["Hongrie", "Ukraine", "Géorgie", "Irlande du Nord"],

    B3: ["Israël", "Autriche", "Irlande", "Kosovo"],

    B4: ["Pologne", "Bosnie Herzégovine", "Roumanie", "Suède"]

};


const groupesLigueC = {

    C1: ["Albanie", "Finlande", "Biélorussie", "San Marin"],

    C2: ["Chypre", "Monténégro", "Arménie", "Lettonie"],

    C3: ["Féroé", "Kazakhstan", "Slovaquie", "Moldavie"],

    C4: ["Islande", "Bulgarie", "Estonie", "Luxembourg"]

};


const groupesLigueD = {

    D1: ["Gibraltar", "Malte", "Andorre"],

    D2: ["Azerbaïdjan", "Lituanie", "Liechtenstein"]

};


if (choixCompetition) {

    choixCompetition.addEventListener("change", function() {

        let competition = choixCompetition.value;

        zoneClassements.innerHTML = "";

        if (competition === "Ligue des Nations") {

            zoneClassements.innerHTML = `

                <div class="carte">

                    <h2>🏆🇪🇺 Ligue des Nations 2026-2027</h2>

                    <label>Choisir un groupe :</label><br><br>

                    <select id="choix-groupe-classement">

                        <option value="">🏆 Sélectionner un groupe</option>

                        <option value="A1">Groupe A1</option>
                        <option value="A2">Groupe A2</option>
                        <option value="A3">Groupe A3</option>
                        <option value="A4">Groupe A4</option>

                        <option value="B1">Groupe B1</option>
                        <option value="B2">Groupe B2</option>
                        <option value="B3">Groupe B3</option>
                        <option value="B4">Groupe B4</option>

                        <option value="C1">Groupe C1</option>
                        <option value="C2">Groupe C2</option>
                        <option value="C3">Groupe C3</option>
                        <option value="C4">Groupe C4</option>

                        <option value="D1">Groupe D1</option>
                        <option value="D2">Groupe D2</option>

                    </select>

                    <div id="classement-groupe" style="width:100%; overflow-x:auto;"></div>

                </div>

            `;

            let choixGroupe = document.getElementById("choix-groupe-classement");

            choixGroupe.addEventListener("change", function() {

                let groupe = choixGroupe.value;

                afficherClassementGroupe(groupe);

            });

              }

        if (competition === "Jupiler Pro League") {

    zoneClassements.innerHTML = `

        <div class="carte">

            <div id="classement-jupiler"></div>

        </div>

    `;

    afficherClassementJupiler();

}

    });

}


function afficherClassementGroupe(groupe) {

    let classementGroupe = document.getElementById("classement-groupe");

    if (!classementGroupe) {
        return;
    }

    let groupes = {

    ...groupesLigueA,
    ...groupesLigueB,
    ...groupesLigueC,
    ...groupesLigueD

};

if (!groupes[groupe]) {
    classementGroupe.innerHTML = "";
    return;
}


    let equipes = {};


    groupes[groupe].forEach(function(equipe) {

        equipes[equipe] = {

            mj: 0,
            v: 0,
            n: 0,
            d: 0,
            bp: 0,
            bc: 0,
            pts: 0

        };

    });


    fetch("matchs.json")
    .then(function(reponse) {

        if (!reponse.ok) {
            throw new Error("Erreur lors du chargement de matchs.json");
        }

        return reponse.json();

    })
    .then(function(matchsAdmin) {



    matchsAdmin.forEach(function(match) {

        if (match.competition !== "Ligue des Nations") {
            return;
        }

        if (match.statut !== "Terminé") {
            return;
        }


        let equipe1 = match.equipe1;
        let equipe2 = match.equipe2;


        if (!equipes[equipe1] || !equipes[equipe2]) {
            return;
        }


        let score1 = Number(match.score1);
        let score2 = Number(match.score2);


        if (isNaN(score1) || isNaN(score2)) {
            return;
        }


        equipes[equipe1].mj++;
        equipes[equipe2].mj++;


        equipes[equipe1].bp += score1;
        equipes[equipe1].bc += score2;

        equipes[equipe2].bp += score2;
        equipes[equipe2].bc += score1;


        if (score1 > score2) {

            equipes[equipe1].v++;
            equipes[equipe1].pts += 3;

            equipes[equipe2].d++;

        } else if (score1 < score2) {

            equipes[equipe2].v++;
            equipes[equipe2].pts += 3;

            equipes[equipe1].d++;

        } else {

            equipes[equipe1].n++;
            equipes[equipe2].n++;

            equipes[equipe1].pts++;
            equipes[equipe2].pts++;

        }

    });


    let listeEquipes = Object.keys(equipes);


    listeEquipes.sort(function(a, b) {

        let diffA = equipes[a].bp - equipes[a].bc;
        let diffB = equipes[b].bp - equipes[b].bc;


        if (equipes[b].pts !== equipes[a].pts) {

            return equipes[b].pts - equipes[a].pts;

        }


        if (diffB !== diffA) {

            return diffB - diffA;

        }


        return equipes[b].bp - equipes[a].bp;

    });


    let html = `

        <h2>🇪🇺 Groupe ${groupe}</h2>

       <table border="1" align="center" cellpadding="6" style="width:100%; max-width:100%; box-sizing:border-box;">

            <tr>

                <th>#</th>
                <th>Équipe</th>
                <th>MJ</th>
                <th>V</th>
                <th>N</th>
                <th>D</th>
                <th>BP</th>
                <th>BC</th>
                <th>Diff</th>
                <th>Pts</th>

            </tr>

    `;


    listeEquipes.forEach(function(equipe, index) {

        let diff = equipes[equipe].bp - equipes[equipe].bc;


        html += `

            <tr>

                <td>${index + 1}</td>

                <td>
    <div style="display:flex; align-items:center; gap:10px;">
        <img src="${logosClassementPays[equipe]}"
             alt="${equipe}"
             style="width:35px; height:35px; object-fit:contain;">
        <span>${equipe}</span>
    </div>
</td>

                <td>${equipes[equipe].mj}</td>

                <td>${equipes[equipe].v}</td>

                <td>${equipes[equipe].n}</td>

                <td>${equipes[equipe].d}</td>

                <td>${equipes[equipe].bp}</td>

                <td>${equipes[equipe].bc}</td>

                <td>${diff}</td>

                <td>${equipes[equipe].pts}</td>

            </tr>

        `;

    });


    html += `</table>`;


   classementGroupe.innerHTML = html;

});
}

function afficherClassementJupiler() {

    let classementGroupe = document.getElementById("classement-jupiler");

    if (!classementGroupe) {
        return;
    }

    let equipes = {};

    equipesJupilerProLeague.forEach(function(equipe) {

        equipes[equipe] = {

            mj: 0,
            v: 0,
            n: 0,
            d: 0,
            bp: 0,
            bc: 0,
            pts: 0

        };

    });

    fetch("matchs.json")
.then(function(reponse) {

    if (!reponse.ok) {
        throw new Error("Erreur lors du chargement de matchs.json");
    }

    return reponse.json();

})
.then(function(matchsAdmin) {

    matchsAdmin.forEach(function(match) {

        if (match.competition !== "Jupiler Pro League") {
            return;
        }

        if (match.statut !== "Terminé") {
            return;
        }

        let equipe1 = match.equipe1.trim();
        let equipe2 = match.equipe2.trim();

        if (!equipes[equipe1] || !equipes[equipe2]) {
            return;
        }

        let score1 = Number(match.score1);
        let score2 = Number(match.score2);

        if (isNaN(score1) || isNaN(score2)) {
            return;
        }

        equipes[equipe1].mj++;
        equipes[equipe2].mj++;

        equipes[equipe1].bp += score1;
        equipes[equipe1].bc += score2;

        equipes[equipe2].bp += score2;
        equipes[equipe2].bc += score1;

        if (score1 > score2) {

            equipes[equipe1].v++;
            equipes[equipe1].pts += 3;

            equipes[equipe2].d++;

        } else if (score1 < score2) {

            equipes[equipe2].v++;
            equipes[equipe2].pts += 3;

            equipes[equipe1].d++;

        } else {

            equipes[equipe1].n++;
            equipes[equipe2].n++;

            equipes[equipe1].pts++;
            equipes[equipe2].pts++;

        }

    });

    let listeEquipes = Object.keys(equipes);

    listeEquipes.sort(function(a, b) {

        let diffA = equipes[a].bp - equipes[a].bc;
        let diffB = equipes[b].bp - equipes[b].bc;

        if (equipes[b].pts !== equipes[a].pts) {
            return equipes[b].pts - equipes[a].pts;
        }

        if (diffB !== diffA) {
            return diffB - diffA;
        }

        return equipes[b].bp - equipes[a].bp;

    });

    let html = `

      <h2>
    🇧🇪
    <img src="images/clubs/jupiler-pro-league.png"
         alt="Jupiler Pro League"
         style="height:45px; vertical-align:middle;">
    2026-2027
</h2>

        <table border="1" align="center" cellpadding="10">

            <tr>

                <th>#</th>
                <th>Équipe</th>
                <th>MJ</th>
                <th>V</th>
                <th>N</th>
                <th>D</th>
                <th>BP</th>
                <th>BC</th>
                <th>Diff</th>
                <th>Pts</th>

            </tr>

    `;

    listeEquipes.forEach(function(equipe, index) {

        let diff = equipes[equipe].bp - equipes[equipe].bc;

        html += `

            <tr>

                <td>${index + 1}</td>

                <td>
    <div style="display:flex; align-items:center; gap:10px;">
        <img src="${logosClassementJupilerProLeague[equipe]}"
             alt="${equipe}"
             style="width:35px; height:35px; object-fit:contain;">
        <span>${equipe}</span>
    </div>
</td>

                <td>${equipes[equipe].mj}</td>

                <td>${equipes[equipe].v}</td>

                <td>${equipes[equipe].n}</td>

                <td>${equipes[equipe].d}</td>

                <td>${equipes[equipe].bp}</td>

                <td>${equipes[equipe].bc}</td>

                <td>${diff}</td>

                <td>${equipes[equipe].pts}</td>

            </tr>

        `;

    });

    html += `</table>`;

   classementGroupe.innerHTML = html;

});
}