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
    document.getElementById(
        "pseudo-supporter"
    ).value.trim();

                if (pseudo !== "") {

    localStorage.setItem(
        "pseudoActuel",
        pseudo
    );

}



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

    supporter_id: supporterId,

    joueur: pseudo,

    match: nomMatchChoisi,

    partition:
        scores[0].value +
        " - " +
        scores[1].value,

    score: 0
};

// ==========================================
// ENREGISTRER OU MODIFIER DANS SUPABASE
// ==========================================

console.log(
    "📤 PRONOSTIC À ENREGISTRER :",
    pronostic
);


// ==========================================
// CHERCHER SI CE SUPPORTER A DÉJÀ
// PRONOSTIQUÉ CE MATCH
// ==========================================

supabaseClient
    .from("pronostics")
    .select("*")
    .eq("supporter_id", supporterId)
    .eq("match", nomMatchChoisi)
    .maybeSingle()

    .then(function(resultat) {

        if (resultat.error) {

            console.error(
                "❌ Erreur lors de la vérification :",
                resultat.error
            );

            alert(
                "❌ Impossible de vérifier ton pronostic."
            );

            return;
        }


        // ==========================================
        // PRONOSTIC EXISTANT → MODIFICATION
        // ==========================================

        if (resultat.data) {

            console.log(
                "✏️ Pronostic déjà existant : modification"
            );


            supabaseClient
                .from("pronostics")
                .update({

                    joueur: pseudo,

                    partition:
                        scores[0].value +
                        " - " +
                        scores[1].value

                })
                .eq(
                    "id",
                    resultat.data.id
                )

                .then(function(modification) {

                    if (modification.error) {

                        console.error(
                            "❌ Erreur modification :",
                            modification.error
                        );

                        alert(
                            "❌ Impossible de modifier ton pronostic."
                        );

                        return;
                    }


                    console.log(
                        "✅ Pronostic modifié dans Supabase !"
                    );


                    alert(
                        "✅ Ton pronostic a été modifié !"
                    );


                    afficherPronostics();

                });

        }


        // ==========================================
        // AUCUN PRONOSTIC → NOUVEL ENREGISTREMENT
        // ==========================================

        else {

            console.log(
                "🆕 Nouveau pronostic : enregistrement"
            );


            supabaseClient
                .from("pronostics")
                .insert([
                    pronostic
                ])

                .then(function(insertion) {

                    if (insertion.error) {

                        console.error(
                            "❌ Erreur insertion :",
                            insertion.error
                        );

                        console.log(
                            "CODE SUPABASE =",
                            insertion.error?.code
                        );

                        console.log(
                            "MESSAGE SUPABASE =",
                            insertion.error?.message
                        );

                        console.log(
                            "DETAILS SUPABASE =",
                            insertion.error?.details
                        );

                        console.log(
                            "HINT SUPABASE =",
                            insertion.error?.hint
                        );


                        alert(
                            "❌ Le pronostic n'a pas pu être enregistré."
                        );

                        return;
                    }


                    console.log(
                        "✅ Pronostic enregistré dans Supabase !",
                        insertion.data
                    );


                    alert(
                        "✅ Ton pronostic est enregistré !"
                    );


                    afficherPronostics();

                });

        }

    })



        })


       .catch(function(erreur) {

    console.error("❌ ERREUR COMPLETE :", erreur);
    console.error("❌ MESSAGE :", erreur.message);
    console.error("❌ STACK :", erreur.stack);

    alert(
        "❌ Impossible de vérifier le match : " +
        erreur.message
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


    // ==========================================
    // CHARGER LES PRONOSTICS DEPUIS SUPABASE
    // ==========================================

    supabaseClient
        .from("pronostics")
        .select("*")
        .order("created_at", {
            ascending: false
        })

        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement des pronostics :",
                    resultat.error
                );

                return;
            }


            let pronostics =
                resultat.data || [];


            console.log(
                "✅ Pronostics chargés depuis Supabase :",
                pronostics.length
            );


            pronostics.forEach(function(p) {

                table.innerHTML +=

                    "<tr>" +

                    "<td>" +
                    (p.joueur || "") +
                    "</td>" +

                    "<td>" +
                    (p.match || "") +
                    "</td>" +

                    "<td>" +
                    "🎯 " +
                    (p.partition || "-") +
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

            // ==========================================
// SÉLECTIONNER AUTOMATIQUEMENT LE PROCHAIN MATCH
// ==========================================

let prochainMatch = matchsAdmin.find(function(match) {

    return match.statut === "À venir";

});

if (prochainMatch) {

    selectMatch.value =
        prochainMatch.equipe1.trim() +
        " - " +
        prochainMatch.equipe2.trim();

    selectMatch.dispatchEvent(
        new Event("change")
    );

}

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

// ==========================================
// MÉMORISER AUTOMATIQUEMENT LE PSEUDO
// ==========================================

let champPseudo =
    document.getElementById(
        "pseudo-supporter"
    );

if (champPseudo) {

    champPseudo.addEventListener(
        "input",
        function() {

            let pseudo =
                champPseudo.value.trim();

            if (pseudo !== "") {

                localStorage.setItem(
                    "pseudoActuel",
                    pseudo
                );

            }

        }
    );

}