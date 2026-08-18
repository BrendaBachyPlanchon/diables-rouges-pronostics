// ==========================================
// AFFICHAGE DES MATCHS DEPUIS SUPABASE
// ==========================================

console.log("✅ affichage-matchs.js Supabase actif");


// ==========================================
// LOGOS DES CLUBS
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
// ZONE DES MATCHS
// ==========================================

let zoneMatchs =
    document.getElementById("liste-matchs");


if (zoneMatchs) {

    // ==========================================
    // VÉRIFIER SUPABASE
    // ==========================================

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        console.error(
            "❌ Supabase Client indisponible pour affichage-matchs.js"
        );

        zoneMatchs.innerHTML =
            "<p>❌ Impossible de charger les matchs.</p>";

    } else {


        // ==========================================
        // CHARGER LES MATCHS DEPUIS SUPABASE
        // ==========================================

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
                    "✅ Matchs affichage chargés depuis Supabase :",
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
                // FILTRER LA COMPÉTITION
                // ==========================================

                let pageActuelle =
                    window.location.pathname;


                if (
                    pageActuelle.includes(
                        "nations-league"
                    )
                ) {

                    matchs =
                        matchs.filter(function(match) {

                            return (
                                match.competition ===
                                "Ligue des Nations"
                            );

                        });

                }


                if (
                    pageActuelle.includes(
                        "championnats-europeens"
                    )
                ) {

                    matchs =
                        matchs.filter(function(match) {

                            return (
                                match.competition ===
                                "Jupiler Pro League"
                            );

                        });

                }


                console.log(
                    "📋 Matchs affichés après filtrage :",
                    matchs.length
                );


                // ==========================================
                // AFFICHER LES MATCHS
                // ==========================================

                matchs.forEach(function(match) {

                    let equipe1 =
                        (match.equipe1 || "").trim();

                    let equipe2 =
                        (match.equipe2 || "").trim();


                    let logo1 =
                        logosJupilerProLeague[
                            equipe1
                        ];


                    let logo2 =
                        logosJupilerProLeague[
                            equipe2
                        ];


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

            })

            .catch(function(erreur) {

                console.error(
                    "❌ Impossible de charger les matchs depuis Supabase :",
                    erreur
                );


                zoneMatchs.innerHTML =
                    "<p>❌ Impossible de charger les matchs.</p>";

            });

    }

}