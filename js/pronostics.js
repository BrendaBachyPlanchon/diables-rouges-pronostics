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
        // VÉRIFIER LE MATCH AVEC matchs.json
        // ==========================================

        fetch("matchs.json")

        .then(function(reponse) {

            if (!reponse.ok) {

                throw new Error("Erreur matchs.json");

            }

            return reponse.json();

        })


        .then(function(matchsAdmin) {


            let matchAdmin = matchsAdmin.find(function(match) {


                let nomMatch =

                    match.equipe1.trim() +
                    " - " +
                    match.equipe2.trim();


                return nomMatch.toLowerCase() ===
                    nomMatchChoisi.toLowerCase();


            });



            if (!matchAdmin) {

                alert("❌ Match introuvable.");
                return;

            }



            // ==========================================
            // VÉRIFIER DATE DU MATCH
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
            // IDENTIFIANT SUPPORTER
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
                    .substring(2,10);



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
            // CRÉATION DU PRONOSTIC
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
            // SAUVEGARDE LOCAL
            // ==========================================


            let anciensPronostics =

                JSON.parse(
                    localStorage.getItem("pronostics")
                ) || [];



            anciensPronostics.push(
                pronostic
            );



            localStorage.setItem(
                "pronostics",
                JSON.stringify(anciensPronostics)
            );



            alert(
                "✅ Ton pronostic est enregistré !"
            );



            afficherPronostics();



        })


        .catch(function(erreur) {


            console.error(
                "❌ Erreur vérification match :",
                erreur
            );


            alert(
                "❌ Impossible de vérifier le match."
            );


        });



    });

}



// ==========================================
// AFFICHER LES PRONOSTICS
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




    let pronostics =

        JSON.parse(
            localStorage.getItem("pronostics")
        ) || [];




    console.log(
        "✅ Pronostics chargés :",
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



}




// ==========================================
// CHARGER LES MATCHS
// ==========================================


function chargerMatchsAdmin() {

    let selectMatch =
        document.getElementById("choix-match");

    if (!selectMatch) {
        return;
    }

    fetch("matchs.json")

        .then(function(reponse) {

            if (!reponse.ok) {
                throw new Error("Erreur matchs.json");
            }

            return reponse.json();

        })

        .then(function(matchsAdmin) {

            console.log(
                "✅ Matchs chargés :",
                matchsAdmin.length
            );

            // ==========================================
            // TRIER LES MATCHS PAR DATE
            // ==========================================

           matchsAdmin.sort(function(a, b) {

    // À venir en premier
    let ordreStatut = {
        "À venir": 1,
        "En cours": 2,
        "Terminé": 3
    };

    let statutA =
        ordreStatut[a.statut] || 4;

    let statutB =
        ordreStatut[b.statut] || 4;

    // Priorité au statut
    if (statutA !== statutB) {
        return statutA - statutB;
    }

    // Puis tri par date
    let dateA =
        new Date(a.date + "T" + a.heure);

    let dateB =
        new Date(b.date + "T" + b.heure);

    return dateA - dateB;

});

            // ==========================================
            // VIDER LE MENU
            // ==========================================

            selectMatch.innerHTML =
                '<option value="">⚽ Sélectionner un match</option>';

            // ==========================================
            // AFFICHER LES MATCHS
            // ==========================================

            matchsAdmin.forEach(function(match) {

                let option =
                    document.createElement("option");

                option.value =
                    match.equipe1.trim() +
                    " - " +
                    match.equipe2.trim();

                option.textContent =
                    match.equipe1 +
                    " 🆚 " +
                    match.equipe2;

                selectMatch.appendChild(option);

            });

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