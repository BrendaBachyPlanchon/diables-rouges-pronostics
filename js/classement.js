// ==========================================
// CALCUL DES POINTS
// ==========================================

function calculerPoints(
pronosticBelgique,
pronosticAdversaire,
resultatBelgique,
resultatAdversaire
) {

```
// Score exact
if (
    pronosticBelgique == resultatBelgique &&
    pronosticAdversaire == resultatAdversaire
) {
    return 3;
}

// Résultat du pronostic
let pronosticGagnant =
    pronosticBelgique > pronosticAdversaire ? "Belgique" :
    pronosticBelgique < pronosticAdversaire ? "Adversaire" :
    "Nul";

// Résultat réel
let resultatGagnant =
    resultatBelgique > resultatAdversaire ? "Belgique" :
    resultatBelgique < resultatAdversaire ? "Adversaire" :
    "Nul";

// Bon résultat
if (pronosticGagnant == resultatGagnant) {
    return 1;
}

return 0;
```

}

// ==========================================
// AFFICHER LE CLASSEMENT
// ==========================================

function afficherClassement(pronostics, matchsAdmin) {

```
let tableau = document.getElementById("classement");

if (!tableau) return;

tableau.innerHTML =
    "<tr>" +
    "<th>Position</th>" +
    "<th>Pseudo</th>" +
    "<th>Pronostics</th>" +
    "<th>Scores exacts</th>" +
    "<th>Points</th>" +
    "</tr>";


// ==========================================
// RÉCUPÉRER LES JOUEURS
// ==========================================

let joueurs = [];

pronostics.forEach(function(p) {

    if (!joueurs.includes(p.joueur)) {
        joueurs.push(p.joueur);
    }

});


let classementJoueurs = [];


// ==========================================
// CALCUL POUR CHAQUE JOUEUR
// ==========================================

joueurs.forEach(function(joueur) {

    let points = 0;
    let nombrePronostics = 0;
    let scoresExacts = 0;


    pronostics.forEach(function(p) {

        if (p.joueur !== joueur) {
            return;
        }


        nombrePronostics++;


        let scores = p.score.split(" - ");

        let pronostic1 = Number(scores[0]);
        let pronostic2 = Number(scores[1]);


        // ==========================================
        // RECHERCHER LE MATCH
        // ==========================================

        let matchAdmin = matchsAdmin.find(function(match) {

            let nomMatch =
                match.equipe1.trim() +
                " - " +
                match.equipe2.trim();

            return nomMatch.toLowerCase() ===
                p.match.trim().toLowerCase();

        });


        // Match introuvable
        if (!matchAdmin) {

            console.log(
                "⚠️ Match introuvable pour le pronostic :",
                p.match
            );

            return;

        }


        // ==========================================
        // MATCH TERMINÉ
        // ==========================================

        if (
            matchAdmin.statut === "Terminé" &&
            matchAdmin.score1 !== "" &&
            matchAdmin.score2 !== ""
        ) {

            let resultat1 = Number(matchAdmin.score1);
            let resultat2 = Number(matchAdmin.score2);


            // Calcul des points
            points += calculerPoints(
                pronostic1,
                pronostic2,
                resultat1,
                resultat2
            );


            // Score exact
            if (
                pronostic1 === resultat1 &&
                pronostic2 === resultat2
            ) {

                scoresExacts++;

            }

        }

    });


    classementJoueurs.push({

        nom: joueur,
        points: points,
        pronostics: nombrePronostics,
        exacts: scoresExacts

    });

});


// ==========================================
// TRI DU CLASSEMENT
// ==========================================

classementJoueurs.sort(function(a, b) {

    if (b.points !== a.points) {
        return b.points - a.points;
    }

    if (b.exacts !== a.exacts) {
        return b.exacts - a.exacts;
    }

    return b.pronostics - a.pronostics;

});


// ==========================================
// AFFICHAGE
// ==========================================

classementJoueurs.forEach(function(joueur, index) {

    tableau.innerHTML +=

        "<tr class='" +

        (
            index === 0 ? "premier" :
            index === 1 ? "deuxieme" :
            index === 2 ? "troisieme" :
            ""
        ) +

        "'>" +

        "<td>" +

        (
            index === 0 ? "🥇" :
            index === 1 ? "🥈" :
            index === 2 ? "🥉" :
            (index + 1)
        ) +

        "</td>" +

        "<td>" +
        joueur.nom +
        "</td>" +

        "<td>" +
        joueur.pronostics +
        "</td>" +

        "<td>🎯 " +
        joueur.exacts +
        "</td>" +

        "<td>⭐ " +
        joueur.points +
        " pts</td>" +

        "</tr>";

});
```

}

// ==========================================
// CHARGER PRONOSTICS + MATCHS
// VERSION GITHUB PAGES
// ==========================================

Promise.all([

```
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
```

])

.then(function(donnees) {

```
let pronostics = donnees[0];
let matchsAdmin = donnees[1];


console.log(
    "✅ Pronostics chargés depuis GitHub :",
    pronostics.length
);


console.log(
    "✅ Matchs chargés depuis GitHub pour le classement :",
    matchsAdmin.length
);


afficherClassement(
    pronostics,
    matchsAdmin
);
```

})

.catch(function(erreur) {

```
console.error(
    "❌ Impossible de charger les données du classement :",
    erreur
);
```

});
