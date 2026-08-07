// ==========================================
// ADMINISTRATION DES MATCHS
// ==========================================

console.log("✅ admin.js serveur actif");


// ==========================================
// CHARGER LES MATCHS DEPUIS LE FICHIER JSON
// ==========================================

function chargerMatchsAdmin() {

    return fetch("matchs.json")
        .then(function(reponse) {

            if (!reponse.ok) {
                throw new Error("Erreur lors du chargement des matchs");
            }

            return reponse.json();

        })
        .then(function(matchs) {

            console.log("✅ Matchs chargés depuis JSON :", matchs.length);

            return matchs;

        });

}


// ==========================================
// ENREGISTRER LES MATCHS SUR LE SERVEUR
// ==========================================

function sauvegarderMatchsAdmin(matchs) {

    return fetch("matchs.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(matchs)

    })
    .then(function(reponse) {

        if (!reponse.ok) {
            throw new Error("Erreur lors de l'enregistrement");
        }

        return reponse.json();

    });

}


// ==========================================
// AFFICHER LES MATCHS
// ==========================================

function afficherMatchsAdmin() {

    let tableau = document.getElementById("table-matchs-admin");

    if (!tableau) return;

    let filtre = document.getElementById("filtre-competition-admin");

    tableau.innerHTML =
        "<tr>" +
        "<th>Match</th>" +
        "<th>Date</th>" +
        "<th>Heure</th>" +
        "<th>Compétition</th>" +
        "<th>Statut</th>" +
        "<th>Score</th>" +
        "<th>Action</th>" +
        "</tr>";


    chargerMatchsAdmin()

        .then(function(matchsAdmin) {


            // Trier les matchs par date

            matchsAdmin.sort(function(a, b) {

                let dateA = new Date(a.date + "T" + a.heure);
                let dateB = new Date(b.date + "T" + b.heure);

                return dateA - dateB;

            });


            matchsAdmin.forEach(function(match, index) {

                if (
                    filtre &&
                    filtre.value !== "Toutes" &&
                    match.competition !== filtre.value
                ) {
                    return;
                }


                let scoreAffiche = "⚽ À venir";

                if (
                    match.score1 !== "" &&
                    match.score2 !== ""
                ) {

                    scoreAffiche =
                        match.score1 + " - " + match.score2;

                }


                tableau.innerHTML +=

                    "<tr>" +

                    "<td>" +
                    match.equipe1 +
                    " - " +
                    match.equipe2 +
                    "</td>" +

                    "<td>" +
                    match.date +
                    "</td>" +

                    "<td>" +
                    match.heure +
                    "</td>" +

                    "<td>" +
                    match.competition +
                    "</td>" +

                    "<td>" +
                    match.statut +
                    "</td>" +

                    "<td>" +
                    scoreAffiche +
                    "</td>" +

                    "<td>" +

                    "<button onclick='modifierMatch(" +
                    index +
                    ")'>✏️ Modifier</button> " +

                    "<button onclick='supprimerMatch(" +
                    index +
                    ")'>🗑️ Supprimer</button>" +

                    "</td>" +

                    "</tr>";

            });

        })

        .catch(function(erreur) {

            console.error("❌ Erreur :", erreur);

            tableau.innerHTML +=
                "<tr><td colspan='7'>❌ Impossible de charger les matchs</td></tr>";

        });

}


// ==========================================
// AJOUTER / MODIFIER UN MATCH
// ==========================================

let bouton = document.getElementById("ajouter-match-admin");


if (bouton) {

    bouton.addEventListener("click", function() {


        let equipe1 =
            document.getElementById("equipe1-admin").value.trim();

        let equipe2 =
            document.getElementById("equipe2-admin").value.trim();

        let date =
            document.getElementById("date-admin").value;

        let heure =
            document.getElementById("heure-admin").value;

        let statut =
            document.getElementById("statut-admin").value;

        let competition =
            document.getElementById("competition-admin").value;

        let score1 =
            document.getElementById("score1-admin").value;

        let score2 =
            document.getElementById("score2-admin").value;


        if (
            equipe1 === "" ||
            equipe2 === "" ||
            date === "" ||
            heure === "" ||
            competition === ""
        ) {

            alert("⚠️ Veuillez remplir tous les champs");

            return;

        }


        let nouveauMatch = {

            equipe1: equipe1,
            equipe2: equipe2,
            date: date,
            heure: heure,
            competition: competition,
            statut: statut,
            score1: score1,
            score2: score2

        };


        chargerMatchsAdmin()

            .then(function(matchsAdmin) {


                let modification =
                    localStorage.getItem("matchModification");


                // ==========================================
                // MODIFICATION
                // ==========================================

                if (modification !== null) {

                    let index = Number(modification);

                    if (matchsAdmin[index]) {

                        matchsAdmin[index] = nouveauMatch;

                    }

                    localStorage.removeItem("matchModification");

                }


                // ==========================================
                // NOUVEAU MATCH
                // ==========================================

                else {

                    matchsAdmin.push(nouveauMatch);

                }


                return sauvegarderMatchsAdmin(matchsAdmin);

            })

            .then(function(resultat) {

                if (resultat.success) {

                    alert(
                        "✅ Match enregistré : " +
                        equipe1 +
                        " - " +
                        equipe2
                    );

                    location.reload();

                } else {

                    alert("❌ " + resultat.message);

                }

            })

            .catch(function(erreur) {

                console.error(erreur);

                alert(
                    "❌ Impossible d'enregistrer le match sur le serveur."
                );

            });

    });

}


// ==========================================
// SUPPRIMER UN MATCH
// ==========================================

function supprimerMatch(index) {


    let confirmation =
        confirm("⚠️ Voulez-vous vraiment supprimer ce match ?");


    if (!confirmation) {
        return;
    }


    chargerMatchsAdmin()

        .then(function(matchsAdmin) {


            matchsAdmin.splice(index, 1);


            return sauvegarderMatchsAdmin(matchsAdmin);

        })

        .then(function(resultat) {


            if (resultat.success) {

                alert("🗑️ Match supprimé");

                location.reload();

            } else {

                alert("❌ " + resultat.message);

            }

        })

        .catch(function(erreur) {

            console.error(erreur);

            alert(
                "❌ Impossible de supprimer le match."
            );

        });

}


// ==========================================
// MODIFIER UN MATCH
// ==========================================

function modifierMatch(index) {


    chargerMatchsAdmin()

        .then(function(matchsAdmin) {


            let match = matchsAdmin[index];


            if (!match) {

                alert("❌ Match introuvable");

                return;

            }


            document.getElementById("equipe1-admin").value =
                match.equipe1;

            document.getElementById("equipe2-admin").value =
                match.equipe2;

            document.getElementById("date-admin").value =
                match.date;

            document.getElementById("heure-admin").value =
                match.heure;

            document.getElementById("competition-admin").value =
                match.competition;

            document.getElementById("statut-admin").value =
                match.statut;

            document.getElementById("score1-admin").value =
                match.score1 || "";

            document.getElementById("score2-admin").value =
                match.score2 || "";


            localStorage.setItem(
                "matchModification",
                index
            );


            document.getElementById(
                "ajouter-match-admin"
            ).innerText = "💾 Enregistrer la modification";


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        })

        .catch(function(erreur) {

            console.error(erreur);

            alert("❌ Impossible de charger le match.");

        });

}


// ==========================================
// FILTRE COMPÉTITION
// ==========================================

let filtreCompetition =
    document.getElementById("filtre-competition-admin");


if (filtreCompetition) {

    filtreCompetition.addEventListener(
        "change",
        function() {

            afficherMatchsAdmin();

        }
    );

}


// ==========================================
// IMPORTER PLUSIEURS MATCHS
// ==========================================

let boutonImport =
    document.getElementById("importer-matchs-admin");


if (boutonImport) {

    boutonImport.addEventListener(
        "click",
        function() {


            let texte =
                document.getElementById("import-matchs").value;


            if (texte.trim() === "") {

                alert(
                    "⚠️ Veuillez coller des matchs à importer"
                );

                return;

            }


            let lignes =
                texte.split("\n");


            chargerMatchsAdmin()

                .then(function(matchsAdmin) {


                    lignes.forEach(function(ligne) {


                        ligne = ligne.trim();


                        if (ligne === "") {
                            return;
                        }


                        let infos =
                            ligne.split(";");


                        if (infos.length >= 5) {


                            let nouveauMatch = {

                                equipe1:
                                    infos[0].trim(),

                                equipe2:
                                    infos[1].trim(),

                                date:
                                    infos[2].trim(),

                                heure:
                                    infos[3].trim(),

                                competition:
                                    infos[4].trim(),

                                statut:
                                    "À venir",

                                score1:
                                    "",

                                score2:
                                    ""

                            };


                            let existe =
                                matchsAdmin.some(
                                    function(match) {

                                        return (

                                            match.equipe1 ===
                                            nouveauMatch.equipe1 &&

                                            match.equipe2 ===
                                            nouveauMatch.equipe2 &&

                                            match.date ===
                                            nouveauMatch.date

                                        );

                                    }
                                );


                            if (!existe) {

                                matchsAdmin.push(
                                    nouveauMatch
                                );

                            }

                        }

                    });


                    return sauvegarderMatchsAdmin(
                        matchsAdmin
                    );

                })

                .then(function(resultat) {


                    if (resultat.success) {

                        alert(
                            "✅ Matchs importés avec succès"
                        );

                        location.reload();

                    } else {

                        alert(
                            "❌ " + resultat.message
                        );

                    }

                })

                .catch(function(erreur) {

                    console.error(erreur);

                    alert(
                        "❌ Impossible d'importer les matchs."
                    );

                });

        }
    );

}


// ==========================================
// LANCER L'AFFICHAGE
// ==========================================

afficherMatchsAdmin();