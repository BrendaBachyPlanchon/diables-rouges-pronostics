function afficherProfil() {


let pseudo = localStorage.getItem("pseudoActuel");

if (!pseudo) {
    pseudo = "Supporter";
}

let supporterId = localStorage.getItem("supporterId");


// ==========================================
// CHARGER LES PRONOSTICS ET LES MATCHS
// VERSION GITHUB PAGES
// ==========================================

Promise.all([

    fetch("pronostics.json")
        .then(function(reponse) {

            if (!reponse.ok) {
                throw new Error("Erreur pronostics.json");
            }

            return reponse.json();

        }),

    fetch("matchs.json")
        .then(function(reponse) {

            if (!reponse.ok) {
                throw new Error("Erreur matchs.json");
            }

            return reponse.json();

        })

])

.then(function(donnees) {

    let pronostics = donnees[0];
    let matchsAdmin = donnees[1];


    console.log(
        "✅ Pronostics du profil chargés depuis GitHub :",
        pronostics.length
    );

    console.log(
        "✅ Matchs du profil chargés depuis GitHub :",
        matchsAdmin.length
    );


    // ==========================================
    // PRENDRE UNIQUEMENT MES PRONOSTICS
    // ==========================================

    let mesPronostics = pronostics.filter(function(p) {

        return (
            p.supporterId === supporterId
        );

    });


    // ==========================================
    // ANCIEN FORMAT SANS SUPPORTER ID
    // ==========================================

    if (
        mesPronostics.length === 0 &&
        pseudo !== "Supporter"
    ) {

        mesPronostics = pronostics.filter(function(p) {

            return (
                p.joueur &&
                p.joueur.toLowerCase() ===
                pseudo.toLowerCase()
            );

        });

    }


    // ==========================================
    // TROUVER LE RÉSULTAT D'UN MATCH
    // ==========================================

    function trouverResultat(matchNom) {

        let matchAdmin = matchsAdmin.find(function(match) {

            let nom =
                match.equipe1.trim() +
                " - " +
                match.equipe2.trim();

            return (
                nom.toLowerCase() ===
                matchNom.trim().toLowerCase()
            );

        });


        if (!matchAdmin) {
            return null;
        }


        if (
            matchAdmin.statut === "Terminé" &&
            matchAdmin.score1 !== "" &&
            matchAdmin.score2 !== ""
        ) {

            return {

                equipe1: Number(matchAdmin.score1),
                equipe2: Number(matchAdmin.score2)

            };

        }


        return null;

    }


    // ==========================================
    // CALCUL DES POINTS
    // ==========================================

    function calculerPoints(
        pronosticBelgique,
        pronosticAdversaire,
        resultatBelgique,
        resultatAdversaire
    ) {

        // Score exact
        if (
            pronosticBelgique == resultatBelgique &&
            pronosticAdversaire == resultatAdversaire
        ) {

            return 3;

        }


        // Résultat du pronostic
        let pronosticGagnant =
            pronosticBelgique > pronosticAdversaire
                ? "Belgique"
                : pronosticBelgique < pronosticAdversaire
                    ? "Adversaire"
                    : "Nul";


        // Résultat réel
        let resultatGagnant =
            resultatBelgique > resultatAdversaire
                ? "Belgique"
                : resultatBelgique < resultatAdversaire
                    ? "Adversaire"
                    : "Nul";


        // Bon résultat
        if (
            pronosticGagnant === resultatGagnant
        ) {

            return 1;

        }


        return 0;

    }


    // ==========================================
    // CALCUL DE MES POINTS
    // ==========================================

    let points = 0;
    let scoresExacts = 0;


    mesPronostics.forEach(function(p) {

        let resultat =
            trouverResultat(p.match);


        if (
            resultat &&
            resultat.equipe1 !== null
        ) {

            let scores =
                p.score.split(" - ");


            let score1 =
                Number(scores[0]);

            let score2 =
                Number(scores[1]);


            // Score exact
            if (
                score1 === resultat.equipe1 &&
                score2 === resultat.equipe2
            ) {

                scoresExacts++;

            }


            // Points
            points += calculerPoints(

                score1,
                score2,

                resultat.equipe1,
                resultat.equipe2

            );

        }

    });


    // ==========================================
    // CONSTRUIRE LE CLASSEMENT
    // ==========================================

    let joueurs = [];


    pronostics.forEach(function(p) {

        if (
            p.joueur &&
            !joueurs.includes(p.joueur)
        ) {

            joueurs.push(p.joueur);

        }

    });


    let classementJoueurs = [];


    joueurs.forEach(function(joueur) {

        let totalPoints = 0;


        pronostics.forEach(function(p) {

            if (
                p.joueur === joueur
            ) {

                let resultat =
                    trouverResultat(p.match);


                if (
                    resultat &&
                    resultat.equipe1 !== null
                ) {

                    let scores =
                        p.score.split(" - ");


                    totalPoints +=
                        calculerPoints(

                            Number(scores[0]),
                            Number(scores[1]),

                            resultat.equipe1,
                            resultat.equipe2

                        );

                }

            }

        });


        classementJoueurs.push({

            nom: joueur,
            points: totalPoints

        });

    });


    classementJoueurs.sort(function(a, b) {

        return b.points - a.points;

    });


    // ==========================================
    // POSITION
    // ==========================================

    let position = "À venir";


    let maPosition =
        classementJoueurs.findIndex(function(joueur) {

            return (
                joueur.nom.toLowerCase() ===
                pseudo.toLowerCase()
            );

        });


    if (maPosition !== -1) {

        position =
            (maPosition + 1) + "e";

    }


    // ==========================================
    // AFFICHAGE PROFIL
    // ==========================================

    let pseudoProfil =
        document.getElementById("pseudo-profil");


    if (pseudoProfil) {

        pseudoProfil.innerText =
            "👤 " + pseudo;

    }


    let profilPronostics =
        document.getElementById("profil-pronostics");


    if (profilPronostics) {

        profilPronostics.innerText =
            mesPronostics.length;

    }


    let profilExacts =
        document.getElementById("profil-exacts");


    if (profilExacts) {

        profilExacts.innerText =
            scoresExacts;

    }


    let profilPoints =
        document.getElementById("profil-points");


    if (profilPoints) {

        profilPoints.innerText =
            points;

    }


    let profilPosition =
        document.getElementById("profil-position");


    if (profilPosition) {

        profilPosition.innerText =
            position;

    }


    // ==========================================
    // MESSAGE
    // ==========================================

    let message =
        document.getElementById("message-profil");


    if (message) {

        if (mesPronostics.length === 0) {

            message.innerHTML =
                "🇧🇪 Tu n'as pas encore réalisé de pronostic.<br>" +
                "Va dans la page <b>Pronostics</b> pour participer !";

        } else {

            message.innerHTML =
                "🔥 Bravo <b>" +
                pseudo +
                "</b> !<br>" +
                "Tu as déjà réalisé <b>" +
                mesPronostics.length +
                "</b> pronostic(s) et tu totalises <b>" +
                points +
                "</b> point(s).";

        }

    }


    // ==========================================
    // BADGE
    // ==========================================

    let badge =
        "🏅 Nouveau supporter";


    if (mesPronostics.length >= 50) {

        badge =
            "👑 Légende des pronostics";

    } else if (mesPronostics.length >= 25) {

        badge =
            "🥇 Expert des Diables Rouges";

    } else if (mesPronostics.length >= 10) {

        badge =
            "🥈 Supporter fidèle";

    } else if (mesPronostics.length >= 5) {

        badge =
            "🥉 Supporter débutant";

    }


    let badgeElt =
        document.getElementById("badge-supporter");


    if (badgeElt) {

        badgeElt.innerText = badge;


        if (mesPronostics.length >= 50) {

            badgeElt.style.background = "#e30613";
            badgeElt.style.color = "white";

        } else if (mesPronostics.length >= 25) {

            badgeElt.style.background = "#FFD700";
            badgeElt.style.color = "black";

        } else if (mesPronostics.length >= 10) {

            badgeElt.style.background = "#C0C0C0";
            badgeElt.style.color = "black";

        } else if (mesPronostics.length >= 5) {

            badgeElt.style.background = "#CD7F32";
            badgeElt.style.color = "white";

        } else {

            badgeElt.style.background = "#555";
            badgeElt.style.color = "white";

        }

    }


    // ==========================================
    // TABLEAU DE MES PRONOSTICS
    // ==========================================

    let tableau =
        document.getElementById("mes-pronostics");


    if (tableau) {

        tableau.innerHTML = "";


        mesPronostics.forEach(function(p) {

            tableau.innerHTML +=

                "<tr>" +

                "<td>" +
                p.match +
                "</td>" +

                "<td>⚽ " +
                p.score +
                "</td>" +

                "</tr>";

        });

    }

})


// ==========================================
// ERREUR
// ==========================================

.catch(function(erreur) {

    console.error(
        "❌ Impossible de charger le profil :",
        erreur
    );

});
```

}

// ==========================================
// LANCER LE PROFIL
// ==========================================

window.addEventListener(
"load",
function() {


    afficherProfil();

}


);
