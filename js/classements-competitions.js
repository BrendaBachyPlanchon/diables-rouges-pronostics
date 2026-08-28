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

// ==========================================
// ÉQUIPES LIGUE DES CHAMPIONS 2026-2027
// ==========================================

const equipesLigueDesChampions = [

    "Arsenal",
    "Manchester City",
    "Liverpool",
    "Manchester United",
    "Real Madrid",
    "Barcelona",
    "Bayern Munich",
    "Borussia Dortmund",
    "Atlético de Madrid",
    "Aston Villa",
    "Inter Milan",
    "Napoli",
    "Paris Saint-Germain",
    "Porto",
    "PSV Eindhoven",
    "Feyenoord",
    "Galatasaray",
    "Como",
    "Lille",
    "Lens",
    "RB Leipzig",
    "Real Betis",
    "Roma",
    "Sporting CP",
    "VfB Stuttgart",
    "Villarreal",
    "Bodø/Glimt",
    "LASK",
    "Sabah",
    "Shakhtar Donetsk",
    "Slavia Prague",
    "Club Brugge",
    "Fenerbahçe",
    "AEK Athens",
    "Viking",
    "Slovan Bratislava"

];

// ==========================================
// LOGOS LIGUE DES CHAMPIONS
// ==========================================

const logosClassementLigueDesChampions = {

    "Arsenal": "images/clubs/champions-league/arsenal.png",
    "Manchester City": "images/clubs/champions-league/manchester-city.png",
    "Liverpool": "images/clubs/champions-league/liverpool.png",
    "Manchester United": "images/clubs/champions-league/manchester-united.png",
    "Real Madrid": "images/clubs/champions-league/real-madrid.png",
    "Barcelona": "images/clubs/champions-league/barcelone.png",
    "Bayern Munich": "images/clubs/champions-league/bayern-munich.png",
    "Borussia Dortmund": "images/clubs/champions-league/dortmund.png",
    "Atlético de Madrid": "images/clubs/champions-league/atletico-madrid.png",
    "Aston Villa": "images/clubs/champions-league/aston-villa.png",
    "Inter Milan": "images/clubs/champions-league/inter-milan.png",
    "Napoli": "images/clubs/champions-league/napoli.png",
    "Paris Saint-Germain": "images/clubs/champions-league/paris-saint-germain.png",
    "Porto": "images/clubs/champions-league/porto.png",
    "PSV Eindhoven": "images/clubs/champions-league/psv-eindhoven.png",
    "Feyenoord": "images/clubs/champions-league/feyenoord.png",
    "Galatasaray": "images/clubs/champions-league/galatasaray.png",
    "Como": "images/clubs/champions-league/como.png",
    "Lille": "images/clubs/champions-league/lille.png",
    "Lens": "images/clubs/champions-league/lens.png",
    "RB Leipzig": "images/clubs/champions-league/leipzig.png",
    "Real Betis": "images/clubs/champions-league/real-betis.png",
    "Roma": "images/clubs/champions-league/roma.png",
    "Sporting CP": "images/clubs/champions-league/sporting.png",
    "VfB Stuttgart": "images/clubs/champions-league/stuttgart.png",
    "Villarreal": "images/clubs/champions-league/villarreal.png",
    "Bodø/Glimt": "images/clubs/champions-league/bodo-glimt.png",
    "LASK": "images/clubs/champions-league/lask.png",
    "Sabah": "images/clubs/champions-league/sabah.png",
    "Shakhtar Donetsk": "images/clubs/champions-league/shakhtar-donetsk.png",
    "Slavia Prague": "images/clubs/champions-league/slavia-prague.png",
    "Club Brugge": "images/clubs/champions-league/club-brugge.png",
    "Fenerbahçe": "images/clubs/champions-league/fenerbahce.png",
    "AEK Athens": "images/clubs/champions-league/aek-athens.png",
    "Viking": "images/clubs/champions-league/viking.png",
    "Slovan Bratislava": "images/clubs/champions-league/slovan-bratislava.png"

};

// ==========================================
// LOGOS EUROPA LEAGUE 2026-2027
// ==========================================

const logosClassementEuropaLeague = {

    "AZ Alkmaar": "images/clubs/europa-league/az-alkmaar.png",
    "Bournemouth": "images/clubs/europa-league/bournemouth.png",
    "Celta Vigo": "images/clubs/europa-league/celta.png",
    "Crystal Palace": "images/clubs/europa-league/crystal-palace.png",
    "Hoffenheim": "images/clubs/europa-league/hoffenheim.png",
    "Juventus": "images/clubs/europa-league/juventus.png",
    "Bayer Leverkusen": "images/clubs/europa-league/bayer-leverkusen.png",
    "Marseille": "images/clubs/europa-league/marseille.png",
    "AC Milan": "images/clubs/europa-league/milan.png",
    "Real Sociedad": "images/clubs/europa-league/real-sociedad.png",
    "Rennes": "images/clubs/europa-league/rennes.png",
    "Sunderland": "images/clubs/europa-league/sunderland.png",
    "Torreense": "images/clubs/europa-league/torreense.png",
    "Anderlecht": "images/clubs/europa-league/anderlecht.png",
    "Ararat-Armenia": "images/clubs/europa-league/ararat-armenia.png",
    "Benfica": "images/clubs/europa-league/benfica.png",
    "Beşiktaş": "images/clubs/europa-league/besiktas.png",
    "Celje": "images/clubs/europa-league/celje.png",
    "Celtic": "images/clubs/europa-league/celtic.png",
    "Dinamo Zagreb": "images/clubs/europa-league/dynamo-zagreb.png",
    "Ferencváros": "images/clubs/europa-league/ferencvaros.png",
    "Hapoel Beer-Sheva": "images/clubs/europa-league/hapoel-beer-sheva.png",
    "Jagiellonia Białystok": "images/clubs/europa-league/jagiellonia-bialystok.png",
    "Lech Poznań": "images/clubs/europa-league/lech-poznan.png",
    "Levski Sofia": "images/clubs/europa-league/levski-sofia.png",
    "Lillestrøm": "images/clubs/europa-league/lillestrom.png",
    "Lyon": "images/clubs/europa-league/lyon.png",
    "NEC Nijmegen": "images/clubs/europa-league/nec-nijmegen.png",
    "OFI Crète": "images/clubs/europa-league/ofi-crete.png",
    "Olympiacos": "images/clubs/europa-league/olympiacos.png",
    "Omonia Nicosie": "images/clubs/europa-league/omonia-nicosie.png",
    "Salzburg": "images/clubs/europa-league/salzburg.png",
    "Sparta Prague": "images/clubs/europa-league/sparta-prague.png",
    "Sturm Graz": "images/clubs/europa-league/sturm-graz.png",
    "Union Saint-Gilloise": "images/clubs/europa-league/union.png",
    "Viktoria Plzeň": "images/clubs/europa-league/viktoria-plzen.png"

};


// ==========================================
// ÉQUIPES EUROPA LEAGUE 2026-2027
// ==========================================

const equipesEuropaLeague = [

    "AZ Alkmaar",
    "Bournemouth",
    "Celta Vigo",
    "Crystal Palace",
    "Hoffenheim",
    "Juventus",
    "Bayer Leverkusen",
    "Marseille",
    "AC Milan",
    "Real Sociedad",
    "Rennes",
    "Sunderland",
    "Torreense",
    "Anderlecht",
    "Ararat-Armenia",
    "Benfica",
    "Beşiktaş",
    "Celje",
    "Celtic",
    "Dinamo Zagreb",
    "Ferencváros",
    "Hapoel Beer-Sheva",
    "Jagiellonia Białystok",
    "Lech Poznań",
    "Levski Sofia",
    "Lillestrøm",
    "Lyon",
    "NEC Nijmegen",
    "OFI Crète",
    "Olympiacos",
    "Omonia Nicosie",
    "Salzburg",
    "Sparta Prague",
    "Sturm Graz",
    "Union Saint-Gilloise",
    "Viktoria Plzeň"

];


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

if (competition === "Ligue des Champions") {

    zoneClassements.innerHTML = `

        <div class="carte">


            <div id="classement-champions"
                 style="width:100%; overflow-x:auto;">
            </div>

        </div>

    `;

    afficherClassementLigueDesChampions();

}

if (competition === "Europa League") {

    zoneClassements.innerHTML = `

        <div class="carte">

            <div id="classement-europa"
                 style="width:100%; overflow-x:auto;">
            </div>

        </div>

    `;

    afficherClassementEuropaLeague();

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


   supabaseClient
    .from("matchs")
    .select("*")
    .then(function(resultat) {

        if (resultat.error) {

            console.error(
                "❌ Erreur chargement matchs Ligue des Nations Supabase :",
                resultat.error
            );

            return;
        }

        let matchsAdmin = resultat.data;

        console.log(
            "✅ Matchs Ligue des Nations chargés depuis Supabase :",
            matchsAdmin.length
        );



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

   supabaseClient
    .from("matchs")
    .select("*")
    .then(function(resultat) {

        if (resultat.error) {

            console.error(
                "❌ Erreur chargement matchs Supabase :",
                resultat.error
            );

            return;
        }

        let matchsAdmin = resultat.data;

        console.log(
            "✅ Matchs Jupiler chargés depuis Supabase :",
            matchsAdmin.length
        );

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

// ==========================================
// CLASSEMENT LIGUE DES CHAMPIONS 2026-2027
// ==========================================

function afficherClassementLigueDesChampions() {

    let classementChampions =
        document.getElementById("classement-champions");

    if (!classementChampions) {
        return;
    }

    let equipes = {};

    // ==========================================
    // INITIALISER LES 32 CLUBS
    // ==========================================

    equipesLigueDesChampions.forEach(function(equipe) {

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


    // ==========================================
    // CHARGER LES MATCHS
    // ==========================================

    supabaseClient
        .from("matchs")
        .select("*")

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement matchs Ligue des Champions :",
                    resultat.error
                );

                return;

            }


            let matchs =
                resultat.data || [];


            console.log(
                "✅ Matchs Ligue des Champions chargés :",
                matchs.length
            );


            // ==========================================
            // CALCULER LES RÉSULTATS
            // ==========================================

            matchs.forEach(function(match) {

                if (
                    match.competition !==
                    "Ligue des Champions"
                ) {
                    return;
                }


                if (
                    match.statut !==
                    "Terminé"
                ) {
                    return;
                }


                let equipe1 =
                    (match.equipe1 || "").trim();

                let equipe2 =
                    (match.equipe2 || "").trim();


                if (
                    !equipes[equipe1] ||
                    !equipes[equipe2]
                ) {
                    return;
                }


                let score1 =
                    Number(match.score1);

                let score2 =
                    Number(match.score2);


                if (
                    isNaN(score1) ||
                    isNaN(score2)
                ) {
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

                }

                else if (score1 < score2) {

                    equipes[equipe2].v++;
                    equipes[equipe2].pts += 3;

                    equipes[equipe1].d++;

                }

                else {

                    equipes[equipe1].n++;
                    equipes[equipe2].n++;

                    equipes[equipe1].pts++;
                    equipes[equipe2].pts++;

                }

            });


            // ==========================================
            // TRIER LE CLASSEMENT
            // ==========================================

            let listeEquipes =
                Object.keys(equipes);


            listeEquipes.sort(function(a, b) {

                let diffA =
                    equipes[a].bp -
                    equipes[a].bc;

                let diffB =
                    equipes[b].bp -
                    equipes[b].bc;


                if (
                    equipes[b].pts !==
                    equipes[a].pts
                ) {

                    return (
                        equipes[b].pts -
                        equipes[a].pts
                    );

                }


                if (diffB !== diffA) {

                    return (
                        diffB -
                        diffA
                    );

                }


                return (
                    equipes[b].bp -
                    equipes[a].bp
                );

            });


            // ==========================================
            // AFFICHER LE TABLEAU
            // ==========================================

            let html = `

                <h2>
                    ⭐ Ligue des Champions 2026-2027
                </h2>

                <p>
                    Classement de la phase de ligue
                </p>

                <table border="1"
                       align="center"
                       cellpadding="8"
                       style="width:100%;">

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


            listeEquipes.forEach(
                function(equipe, index) {

                    let diff =
                        equipes[equipe].bp -
                        equipes[equipe].bc;


                    let logo =
                        logosClassementLigueDesChampions[
                            equipe
                        ];


                    html += `

                        <tr>

                            <td>
                                ${index + 1}
                            </td>

                            <td>

                                <div style="
                                    display:flex;
                                    align-items:center;
                                    gap:10px;
                                ">

                                    ${
                                        logo
                                        ?
                                        `<img
                                            src="${logo}"
                                            alt="${equipe}"
                                            style="
                                                width:35px;
                                                height:35px;
                                                object-fit:contain;
                                            "
                                        >`
                                        :
                                        ""
                                    }

                                    <span>
                                        ${equipe}
                                    </span>

                                </div>

                            </td>

                            <td>
                                ${equipes[equipe].mj}
                            </td>

                            <td>
                                ${equipes[equipe].v}
                            </td>

                            <td>
                                ${equipes[equipe].n}
                            </td>

                            <td>
                                ${equipes[equipe].d}
                            </td>

                            <td>
                                ${equipes[equipe].bp}
                            </td>

                            <td>
                                ${equipes[equipe].bc}
                            </td>

                            <td>
                                ${diff}
                            </td>

                            <td>
                                ${equipes[equipe].pts}
                            </td>

                        </tr>

                    `;

                }
            );


            html += `</table>`;


            classementChampions.innerHTML =
                html;

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger le classement Ligue des Champions :",
                erreur
            );

        });

}

// ==========================================
// CLASSEMENT EUROPA LEAGUE 2026-2027
// ==========================================

function afficherClassementEuropaLeague() {

    let classementEuropa =
        document.getElementById("classement-europa");

    if (!classementEuropa) {
        return;
    }

    let equipes = {};

    // ==========================================
    // INITIALISER LES ÉQUIPES
    // ==========================================

    equipesEuropaLeague.forEach(function(equipe) {

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

    // ==========================================
    // CHARGER LES MATCHS
    // ==========================================

    supabaseClient
        .from("matchs")
        .select("*")

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement matchs Europa League :",
                    resultat.error
                );

                return;
            }

            let matchs =
                resultat.data || [];

            console.log(
                "✅ Matchs Europa League chargés :",
                matchs.length
            );

            // ==========================================
            // CALCULER LES RÉSULTATS
            // ==========================================

            matchs.forEach(function(match) {

                if (
                    match.competition !==
                    "Europa League"
                ) {
                    return;
                }

                if (
                    match.statut !==
                    "Terminé"
                ) {
                    return;
                }

                let equipe1 =
                    (match.equipe1 || "").trim();

                let equipe2 =
                    (match.equipe2 || "").trim();

                if (
                    !equipes[equipe1] ||
                    !equipes[equipe2]
                ) {
                    return;
                }

                let score1 =
                    Number(match.score1);

                let score2 =
                    Number(match.score2);

                if (
                    isNaN(score1) ||
                    isNaN(score2)
                ) {
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

                }

                else if (score1 < score2) {

                    equipes[equipe2].v++;
                    equipes[equipe2].pts += 3;

                    equipes[equipe1].d++;

                }

                else {

                    equipes[equipe1].n++;
                    equipes[equipe2].n++;

                    equipes[equipe1].pts++;
                    equipes[equipe2].pts++;

                }

            });

            // ==========================================
            // TRIER LE CLASSEMENT
            // ==========================================

            let listeEquipes =
                Object.keys(equipes);

            listeEquipes.sort(function(a, b) {

                let diffA =
                    equipes[a].bp -
                    equipes[a].bc;

                let diffB =
                    equipes[b].bp -
                    equipes[b].bc;

                if (
                    equipes[b].pts !==
                    equipes[a].pts
                ) {

                    return (
                        equipes[b].pts -
                        equipes[a].pts
                    );

                }

                if (diffB !== diffA) {

                    return diffB - diffA;

                }

                return (
                    equipes[b].bp -
                    equipes[a].bp
                );

            });

            // ==========================================
            // AFFICHER LE TABLEAU
            // ==========================================

            let html = `

                <h2>
                    🟠 Europa League 2026-2027
                </h2>

                <p>
                    Classement de la phase de ligue
                </p>

                <table border="1"
                       align="center"
                       cellpadding="8"
                       style="width:100%;">

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

            listeEquipes.forEach(
                function(equipe, index) {

                    let diff =
                        equipes[equipe].bp -
                        equipes[equipe].bc;

                    let logo =
                        logosClassementEuropaLeague[
                            equipe
                        ];

                    html += `

                        <tr>

                            <td>
                                ${index + 1}
                            </td>

                            <td>

                                <div style="
                                    display:flex;
                                    align-items:center;
                                    gap:10px;
                                ">

                                    ${
                                        logo
                                        ?
                                        `<img
                                            src="${logo}"
                                            alt="${equipe}"
                                            style="
                                                width:35px;
                                                height:35px;
                                                object-fit:contain;
                                            "
                                        >`
                                        :
                                        ""
                                    }

                                    <span>
                                        ${equipe}
                                    </span>

                                </div>

                            </td>

                            <td>
                                ${equipes[equipe].mj}
                            </td>

                            <td>
                                ${equipes[equipe].v}
                            </td>

                            <td>
                                ${equipes[equipe].n}
                            </td>

                            <td>
                                ${equipes[equipe].d}
                            </td>

                            <td>
                                ${equipes[equipe].bp}
                            </td>

                            <td>
                                ${equipes[equipe].bc}
                            </td>

                            <td>
                                ${diff}
                            </td>

                            <td>
                                ${equipes[equipe].pts}
                            </td>

                        </tr>

                    `;

                }
            );

            html += `</table>`;

            classementEuropa.innerHTML =
                html;

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger le classement Europa League :",
                erreur
            );

        });

}