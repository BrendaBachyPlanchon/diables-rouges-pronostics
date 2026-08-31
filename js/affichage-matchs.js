// ==========================================
// AFFICHAGE DES MATCHS DEPUIS SUPABASE
// ==========================================

console.log("✅ affichage-matchs.js Supabase actif");


// ==========================================
// LOGOS JUPILER PRO LEAGUE
// ==========================================

var logosJupilerProLeague = {

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
// AUTRES CHAMPIONNATS
// ==========================================

var logosPremierLeague = {};
var logosSerieA = {};
var logosLiga = {};
var logosBundesliga = {};
var logosLigue1 = {};

// ==========================================
// LOGOS LIGUE DES CHAMPIONS
// ==========================================

var logosLigueDesChampions = {

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
// LOGOS EUROPA LEAGUE
// ==========================================

var logosEuropaLeague = {

    "AZ Alkmaar": "images/clubs/europa-league/az-alkmaar.png",
    "Bournemouth": "images/clubs/europa-league/bournemouth.png",
    "Celta": "images/clubs/europa-league/celta.png",
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
// ZONE DES MATCHS
// ==========================================

let zoneMatchs =
    document.getElementById("liste-matchs");


if (zoneMatchs) {

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        console.error(
            "❌ Supabase Client indisponible"
        );

        zoneMatchs.innerHTML =
            "<p>❌ Impossible de charger les matchs.</p>";

    } else {

        supabaseClient
            .from("matchs")
            .select("*")

            .then(function(resultat) {

                let matchs = resultat.data;
                let erreur = resultat.error;

                if (erreur) {

                    console.error(
                        "❌ Erreur chargement matchs Supabase :",
                        erreur
                    );

                    zoneMatchs.innerHTML =
                        "<p>❌ Impossible de charger les matchs.</p>";

                    return;
                }


                if (!matchs) {
                    matchs = [];
                }


                console.log(
                    "✅ Matchs chargés depuis Supabase :",
                    matchs.length
                );


                // ==========================================
                // COMPÉTITION DE LA PAGE
                // ==========================================

                let competitionPage =
                    window.competitionPage || "";


                console.log(
                    "🏆 Compétition de la page :",
                    competitionPage
                );


                // ==========================================
                // SI AUCUNE COMPÉTITION N'EST DÉFINIE
                // ==========================================

                if (!competitionPage) {

                    console.warn(
                        "⚠️ Aucune compétition définie pour cette page"
                    );

                }


                // ==========================================
                // FILTRER LA COMPÉTITION
                // ==========================================

                if (competitionPage) {

                    matchs =
                        matchs.filter(function(match) {

                            return (
                                (match.competition || "").trim()
                                ===
                                competitionPage.trim()
                            );

                        });

                }


                console.log(
                    "📋 Matchs affichés après filtrage :",
                    matchs.length
                );


                zoneMatchs.innerHTML = "";


                // ==========================================
                // TRI PAR DATE
                // ==========================================

                matchs.sort(function(a, b) {

                    let dateA =
                        new Date(
                            a.date +
                            "T" +
                            a.heure
                        );

                    let dateB =
                        new Date(
                            b.date +
                            "T" +
                            b.heure
                        );

                    return dateA - dateB;

                });


                // ==========================================
                // AFFICHER LES MATCHS
                // ==========================================

                matchs.forEach(function(match) {

                    let equipe1 =
                        (match.equipe1 || "").trim();

                    let equipe2 =
                        (match.equipe2 || "").trim();


                    // ==========================================
                    // LOGOS
                    // ==========================================

                   let logo1 =
    logosJupilerProLeague[equipe1] ||
    logosPremierLeague[equipe1] ||
    logosSerieA[equipe1] ||
    logosLiga[equipe1] ||
    logosBundesliga[equipe1] ||
    logosLigue1[equipe1] ||
    logosLigueDesChampions[equipe1] ||
    logosEuropaLeague[equipe1];


                  let logo2 =
    logosJupilerProLeague[equipe2] ||
    logosPremierLeague[equipe2] ||
    logosSerieA[equipe2] ||
    logosLiga[equipe2] ||
    logosBundesliga[equipe2] ||
    logosLigue1[equipe2] ||
    logosLigueDesChampions[equipe2] ||
    logosEuropaLeague[equipe2];


                    let urlMatch =
                        equipe1 +
                        " - " +
                        equipe2;


                    // ==========================================
                    // STATUT
                    // ==========================================

                    let statut =
                        match.statut ||
                        "À venir";


                    let boutonTexte =
                        "⚽ Pronostiquer";


                    let boutonDisabled = "";


                    if (
                        statut === "Terminé" ||
                        statut === "En cours"
                    ) {

                        boutonTexte =
                            "🔒 Pronostics clôturés";

                        boutonDisabled =
                            "disabled";

                    }


                    // ==========================================
                    // CARTE DU MATCH
                    // ==========================================

                    zoneMatchs.innerHTML += `

                    <div class="carte">

                        <h3>
                            🏆 ${match.competition || ""}
                        </h3>

                        <h2>

                            ${
                                logo1
                                ?
                                `<img
                                    src="${logo1}"
                                    width="50"
                                    style="vertical-align:middle;"
                                >`
                                :
                                ""
                            }

                            ${equipe1}

                            🆚

                            ${equipe2}

                            ${
                                logo2
                                ?
                                `<img
                                    src="${logo2}"
                                    width="50"
                                    style="vertical-align:middle;"
                                >`
                                :
                                ""
                            }

                        </h2>

                        <p>
                            📅 ${match.date || ""}
                        </p>

                        <p>
                            🕘 ${match.heure || ""}
                        </p>

                        <p>
                            📌 ${statut}
                        </p>

                        ${
                            boutonDisabled
                            ?
                            `
                            <button
                                disabled
                                style="
                                    opacity:0.6;
                                    cursor:not-allowed;
                                "
                            >
                                ${boutonTexte}
                            </button>
                            `
                            :
                            `
                            <a
                                href="pronostic.html?match=${encodeURIComponent(urlMatch)}"
                            >

                                <button>
                                    ${boutonTexte}
                                </button>

                            </a>
                            `
                        }

                    </div>

                    `;

                });


                // ==========================================
                // AUCUN MATCH
                // ==========================================

                if (matchs.length === 0) {

                    zoneMatchs.innerHTML = `
                        <p>
                            🕘 Aucun match disponible pour cette compétition pour le moment.
                        </p>
                    `;

                }

            })

            .catch(function(erreur) {

                console.error(
                    "❌ Impossible de charger les matchs :",
                    erreur
                );

                zoneMatchs.innerHTML =
                    "<p>❌ Impossible de charger les matchs.</p>";

            });

    }

}