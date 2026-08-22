// ==========================================
// ADMINISTRATION DES MATCHS
// ==========================================

console.log("✅ admin.js serveur actif");


// ==========================================
// CHARGER LES MATCHS DEPUIS SUPABASE
// ==========================================

function chargerMatchsAdmin() {

    return supabaseClient
        .from("matchs")
        .select("*")
        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement Supabase :",
                    resultat.error
                );

                throw resultat.error;

            }

            console.log(
                "✅ Matchs chargés depuis Supabase :",
                resultat.data.length
            );

            return resultat.data;

        });

}


// ==========================================
// ENREGISTRER LES MATCHS SUR LE SERVEUR
// ==========================================

function sauvegarderMatchsAdmin(matchs) {

    console.log(
        "📤 Enregistrement des matchs dans Supabase :",
        matchs.length
    );

    // Nettoyage des scores avant l'envoi
    const matchsNettoyes = matchs.map(function(match) {

        return {
            ...match,

            score1:
                match.score1 === "" ||
                match.score1 === undefined ||
                match.score1 === null
                    ? null
                    : Number(match.score1),

            score2:
                match.score2 === "" ||
                match.score2 === undefined ||
                match.score2 === null
                    ? null
                    : Number(match.score2)
        };

    });

    console.log(
        "📦 Matchs préparés pour Supabase :",
        matchsNettoyes
    );

    return supabaseClient
        .from("matchs")
        .upsert(matchsNettoyes)
        .select()
        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur Supabase :",
                    resultat.error
                );

                return {
                    success: false,
                    message: resultat.error.message
                };

            }

            console.log(
                "✅ Matchs enregistrés dans Supabase"
            );

            return {
                success: true,
                message: "Matchs enregistrés avec succès"
            };

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

                console.log("🔎 MATCH :", match.equipe1, "-", match.equipe2, "score1 =", match.score1, "score2 =", match.score2);

                if (
                    filtre &&
                    filtre.value !== "Toutes" &&
                    match.competition !== filtre.value
                ) {
                    return;
                }


                let scoreAffiche = "⚽ À venir";

if (
    match.score1 !== null &&
    match.score2 !== null &&
    match.score1 !== undefined &&
    match.score2 !== undefined &&
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

                   "<button onclick='modifierMatch(\"" +
match.date +
"\", \"" +
match.heure +
"\", \"" +
match.equipe1 +
"\", \"" +
match.equipe2 +
"\")'>✏️ Modifier</button> " +

"<button onclick='supprimerMatch(\"" +
match.date +
"\", \"" +
match.heure +
"\", \"" +
match.equipe1 +
"\", \"" +
match.equipe2 +
"\")'>🗑️ Supprimer</button>" +

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

        let stade =
            document.getElementById("stade-admin").value.trim();

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
    stade: stade,
    statut: statut,
    score1: score1,
    score2: score2

};


        chargerMatchsAdmin()

            .then(function(matchsAdmin) {


                let modification =
                    localStorage.getItem("matchModification");

                    console.log("🔎 Modification trouvée :", modification);


                // ==========================================
                // MODIFICATION
                // ==========================================

              if (modification !== null) {

    let ancienMatch = JSON.parse(modification);

    console.log("✏️ Modification du match :", ancienMatch);
    console.log("📋 Nouveau match :", nouveauMatch);

    // Conversion correcte des scores
    nouveauMatch.score1 =
        nouveauMatch.score1 === ""
            ? null
            : Number(nouveauMatch.score1);

    nouveauMatch.score2 =
        nouveauMatch.score2 === ""
            ? null
            : Number(nouveauMatch.score2);

    // Mise à jour DIRECTE du match dans Supabase
    return supabaseClient
        .from("matchs")
        .update({
            equipe1: nouveauMatch.equipe1,
            equipe2: nouveauMatch.equipe2,
            date: nouveauMatch.date,
            heure: nouveauMatch.heure,
            competition: nouveauMatch.competition,
            stade: nouveauMatch.stade,
            statut: nouveauMatch.statut,
            score1: nouveauMatch.score1,
            score2: nouveauMatch.score2
        })
        .eq("date", ancienMatch.date)
        .eq("heure", ancienMatch.heure)
        .eq("equipe1", ancienMatch.equipe1)
        .eq("equipe2", ancienMatch.equipe2)
        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur modification Supabase :",
                    resultat.error
                );

                return {
                    success: false,
                    message: resultat.error.message
                };

            }

            console.log(
                "✅ Match modifié directement dans Supabase"
            );

            // ==========================================
            // CALCULER LES POINTS DES PRONOSTICS
           // ==========================================

if (
    nouveauMatch.statut === "Terminé" &&
    nouveauMatch.score1 !== null &&
    nouveauMatch.score2 !== null
) {

    const nomMatch =
        nouveauMatch.equipe1.trim() +
        " - " +
        nouveauMatch.equipe2.trim();

    console.log(
        "🎯 Calcul des points pour :",
        nomMatch
    );

    return supabaseClient
        .from("pronostics")
        .select("id, partition")
        .eq("match", nomMatch)

        .then(function(resultatPronostics) {

            if (resultatPronostics.error) {

                console.error(
                    "❌ Erreur récupération pronostics :",
                    resultatPronostics.error
                );

                throw resultatPronostics.error;

            }

            let pronostics =
                resultatPronostics.data || [];

            console.log(
                "🎯 Pronostics trouvés :",
                pronostics.length
            );

            console.log(
                "📋 Pronostics récupérés :",
                pronostics
            );


            let misesAJour = pronostics.map(function(p) {

                if (!p.partition) {
                    return null;
                }

                let scores =
                    p.partition.split("-");

                if (scores.length !== 2) {
                    return null;
                }

                let pronostic1 =
                    Number(scores[0]);

                let pronostic2 =
                    Number(scores[1]);

                let points =
                    calculerPoints(
                        pronostic1,
                        pronostic2,
                        Number(nouveauMatch.score1),
                        Number(nouveauMatch.score2)
                    );

                return supabaseClient
                    .from("pronostics")
                    .update({
                        score: points
                    })
                    .eq("id", p.id);

            }).filter(Boolean);


            return Promise.all(misesAJour);

        })

        .then(function() {

            console.log(
                "✅ Points des pronostics mis à jour"
            );

            localStorage.removeItem(
                "matchModification"
            );

            return {
                success: true,
                message: "Match modifié et points calculés"
            };

        });

}

            localStorage.removeItem("matchModification");

            return {
                success: true,
                message: "Match modifié avec succès"
            };

        });

}


                // ==========================================
                // NOUVEAU MATCH
                // ==========================================

               else {

    matchsAdmin.push(nouveauMatch);

    return sauvegarderMatchsAdmin(matchsAdmin);

}

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

function supprimerMatch(date, heure, equipe1, equipe2) {


    let confirmation =
        confirm("⚠️ Voulez-vous vraiment supprimer ce match ?");


    if (!confirmation) {
        return;
    }


    chargerMatchsAdmin()

        .then(function(matchsAdmin) {


           let index = matchsAdmin.findIndex(function(m) {

    return (
        m.date === date &&
        m.heure === heure &&
        m.equipe1 === equipe1 &&
        m.equipe2 === equipe2
    );

});


if (index !== -1) {

    matchsAdmin.splice(index, 1);

}


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

function modifierMatch(date, heure, equipe1, equipe2) {


    chargerMatchsAdmin()

        .then(function(matchsAdmin) {


                   // Refaire exactement le même tri
        // que celui utilisé dans l'affichage
        matchsAdmin.sort(function(a, b) {

            let dateA =
                new Date(a.date + "T" + a.heure);

            let dateB =
                new Date(b.date + "T" + b.heure);

            return dateA - dateB;

        });


        let match = matchsAdmin.find(function(m) {

    return (
        m.date === date &&
        m.heure === heure &&
        m.equipe1 === equipe1 &&
        m.equipe2 === equipe2
    );

});


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

            document.getElementById("stade-admin").value =
                match.stade || "";

            document.getElementById("statut-admin").value =
                match.statut;

            document.getElementById("score1-admin").value =
                match.score1 || "";

            document.getElementById("score2-admin").value =
                match.score2 || "";


            localStorage.setItem(
    "matchModification",
    JSON.stringify({
        date: date,
        heure: heure,
        equipe1: equipe1,
        equipe2: equipe2
    })
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