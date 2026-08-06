let boutonPronostic = document.getElementById("envoyer-pronostic");

// ==========================================
// ENREGISTRER UN PRONOSTIC
// ==========================================

if (boutonPronostic) {

boutonPronostic.addEventListener("click", function() {

    let choixMatch = document.getElementById("choix-match");

    let nomMatchChoisi = choixMatch.value.trim();

    if (!nomMatchChoisi) {

        alert("⚠️ Veuillez sélectionner un match.");

        return;

    }


    // ==========================================
    // VÉRIFIER LE MATCH SUR LE SERVEUR
    // ==========================================

    fetch("matchs.php")

        .then(function(reponse) {

            if (!reponse.ok) {

                throw new Error("Erreur matchs.php");

            }

            return reponse.json();

        })

        .then(function(matchsAdmin) {

            let matchAdmin = matchsAdmin.find(function(match) {

                return (
                    match.equipe1.trim() +
                    " - " +
                    match.equipe2.trim()
                ).toLowerCase() ===
                nomMatchChoisi.toLowerCase();

            });


            if (!matchAdmin) {

                alert("❌ Match introuvable.");

                return;

            }


            // ==========================================
            // VÉRIFIER SI LE MATCH EST DÉJÀ COMMENCÉ
            // ==========================================

            let dateDebut =
                matchAdmin.date +
                "T" +
                matchAdmin.heure;


            let maintenant =
                new Date().getTime();

            let dateMatch =
                new Date(dateDebut).getTime();


            if (maintenant >= dateMatch) {

                alert(
                    "🔒 Les pronostics sont fermés pour ce match !"
                );

                return;

            }


            // ==========================================
            // RÉCUPÉRER LES INFORMATIONS
            // ==========================================

            let pseudo =
                document.querySelector(
                    'input[type="text"]'
                ).value.trim();


            let scores =
                document.querySelectorAll(
                    'input[type="number"]'
                );


            if (
                pseudo === "" ||
                scores.length < 2 ||
                scores[0].value === "" ||
                scores[1].value === ""
            ) {

                alert(
                    "⚠️ Veuillez remplir tous les champs."
                );

                return;

            }


            // ==========================================
            // IDENTIFIANT DU SUPPORTER
            // ==========================================

            let supporterId =
                localStorage.getItem(
                    "supporterId"
                );


            if (!supporterId) {

                supporterId =
                    "supporter-" +
                    Date.now() +
                    "-" +
                    Math.random()
                        .toString(36)
                        .substring(2, 10);


                localStorage.setItem(
                    "supporterId",
                    supporterId
                );

            }


            localStorage.setItem(
                "pseudoActuel",
                pseudo
            );


            // ==========================================
            // PRONOSTIC
            // ==========================================

            let pronostic = {

                supporterId:
                    supporterId,

                joueur:
                    pseudo,

                match:
                    nomMatchChoisi,

                score:
                    scores[0].value +
                    " - " +
                    scores[1].value

            };


            // ==========================================
            // ENVOI AU SERVEUR
            // ==========================================

            fetch("pronostics.php", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(
                        pronostic
                    )

            })

            .then(function(reponse) {

                if (!reponse.ok) {

                    throw new Error(
                        "Erreur pronostics.php"
                    );

                }

                return reponse.json();

            })

            .then(function(resultat) {

                if (resultat.success) {

                    alert(
                        "✅ Ton pronostic est enregistré !"
                    );


                    afficherPronostics();

                } else {

                    alert(
                        "🔒 " +
                        (
                            resultat.message ||
                            "Pronostic refusé."
                        )
                    );

                }

            })

            .catch(function(erreur) {

                console.error(
                    "❌ Erreur enregistrement :",
                    erreur
                );


                alert(
                    "❌ Impossible d'enregistrer le pronostic."
                );

            });

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de vérifier le match :",
                erreur
            );


            alert(
                "❌ Impossible de vérifier le match."
            );

        });

});

}

// ==========================================
// AFFICHER LES PRONOSTICS DEPUIS LE SERVEUR
// ==========================================

function afficherPronostics() {


let table =
    document.getElementById(
        "table-pronostics"
    );


if (!table) {

    return;

}


table.innerHTML =
    "<tr>" +
    "<th>👤 Joueur</th>" +
    "<th>⚽ Match</th>" +
    "<th>🎯 Pronostic</th>" +
    "</tr>";


// ==========================================
// CHARGER DEPUIS LE SERVEUR
// ==========================================

fetch("pronostics.php")

    .then(function(reponse) {

        if (!reponse.ok) {

            throw new Error(
                "Erreur pronostics.php"
            );

        }

        return reponse.json();

    })

    .then(function(pronostics) {

        console.log(
            "✅ Pronostics chargés depuis le serveur :",
            pronostics.length
        );


        pronostics.forEach(function(p) {

            table.innerHTML +=

                "<tr>" +

                "<td>" +
                p.joueur +
                "</td>" +

                "<td>" +
                p.match +
                "</td>" +

                "<td>" +
                p.score +
                "</td>" +

                "</tr>";

        });

    })

    .catch(function(erreur) {

        console.error(
            "❌ Impossible de charger les pronostics :",
            erreur
        );

    });

}

// ==========================================
// CHARGER LES MATCHS DEPUIS LE SERVEUR
// ==========================================

function chargerMatchsAdmin() {

let selectMatch =
    document.getElementById(
        "choix-match"
    );


if (!selectMatch) {

    return;

}


fetch("matchs.php")

    .then(function(reponse) {

        if (!reponse.ok) {

            throw new Error(
                "Erreur matchs.php"
            );

        }

        return reponse.json();

    })

    .then(function(matchsAdmin) {

        selectMatch.innerHTML =
            '<option value="">⚽ Sélectionner un match</option>';


        matchsAdmin.forEach(function(match) {

            let equipe1 =
                match.equipe1.trim();

            let equipe2 =
                match.equipe2.trim();


            let option =
                document.createElement(
                    "option"
                );


            option.value =
                equipe1 +
                " - " +
                equipe2;


            option.textContent =
                equipe1 +
                " 🆚 " +
                equipe2;


            selectMatch.appendChild(
                option
            );

        });


        console.log(
            "✅ Matchs chargés depuis le serveur :",
            matchsAdmin.length
        );

    })

    .catch(function(erreur) {

        console.error(
            "❌ Impossible de charger les matchs :",
            erreur
        );

    });

}

// ==========================================
// DÉMARRAGE
// ==========================================

chargerMatchsAdmin();

afficherPronostics();
