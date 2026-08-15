let boutonPronostic =
    document.getElementById("envoyer-pronostic");


// ==========================================
// ENREGISTRER UN PRONOSTIC
// VERSION SUPABASE
// ==========================================

if (boutonPronostic) {

    boutonPronostic.addEventListener(
        "click",
        async function() {

            try {

                // ==========================================
                // RÉCUPÉRER LE MATCH
                // ==========================================

                let choixMatch =
                    document.getElementById("choix-match");

                let nomMatchChoisi =
                    choixMatch.value.trim();


                if (!nomMatchChoisi) {

                    alert(
                        "⚠️ Veuillez sélectionner un match."
                    );

                    return;

                }


                // ==========================================
                // CHARGER matchs.json
                // ==========================================

                let reponse =
                    await fetch("matchs.json");


                if (!reponse.ok) {

                    throw new Error(
                        "Erreur matchs.json"
                    );

                }


                let matchsAdmin =
                    await reponse.json();


                // ==========================================
                // TROUVER LE MATCH
                // ==========================================

                let matchAdmin =
                    matchsAdmin.find(function(match) {

                        let nomMatch =

                            match.equipe1.trim() +
                            " - " +
                            match.equipe2.trim();


                        return (
                            nomMatch.toLowerCase() ===
                            nomMatchChoisi.toLowerCase()
                        );

                    });


                if (!matchAdmin) {

                    alert(
                        "❌ Match introuvable."
                    );

                    return;

                }


                // ==========================================
                // VÉRIFIER LA DATE DU MATCH
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
                // RÉCUPÉRER LE PSEUDO
                // ==========================================

                let champPseudo =
                    document.getElementById(
                        "pseudo-supporter"
                    );


                let pseudo =
                    champPseudo.value.trim();


                if (!pseudo) {

                    alert(
                        "⚠️ Veuillez indiquer ton prénom ou pseudo."
                    );

                    return;

                }


                // ==========================================
                // RÉCUPÉRER LES SCORES
                // ==========================================

                let scores =
                    document.querySelectorAll(
                        'input[type="number"]'
                    );


                if (
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
                // MÉMORISER LE PSEUDO
                // ==========================================

                localStorage.setItem(
                    "pseudoActuel",
                    pseudo
                );


               ```js
// ==========================================
// RÉCUPÉRER L'UTILISATEUR AUTH SUPABASE
// ==========================================

let sessionResult =
    await supabaseClient.auth.getUser();


if (
    sessionResult.error ||
    !sessionResult.data ||
    !sessionResult.data.user
) {

    console.error(
        "❌ Aucun utilisateur Auth connecté :",
        sessionResult.error
    );

    alert(
        "❌ Tu dois être connecté pour enregistrer un pronostic."
    );

    return;

}


let user =
    sessionResult.data.user;


let supporterId =
    user.id;


console.log(
    "🆔 UUID Auth utilisé :",
    supporterId
);


// ==========================================
// RECHERCHER LE PROFIL SUPPORTER
// ==========================================

let rechercheSupporter =
    await supabaseClient
        .from("supporters")
        .select(
            "supporter_id, pseudo, avatar"
        )
        .eq(
            "supporter_id",
            supporterId
        )
        .maybeSingle();


if (rechercheSupporter.error) {

    console.error(
        "❌ Erreur recherche supporter :",
        rechercheSupporter.error
    );

    alert(
        "❌ Impossible de retrouver ton profil."
    );

    return;

}


if (!rechercheSupporter.data) {

    console.error(
        "❌ Aucun profil supporter associé au compte Auth."
    );

    alert(
        "❌ Ton profil supporter est introuvable."
    );

    return;

}


pseudo =
    rechercheSupporter
        .data
        .pseudo;


localStorage.setItem(
    "supporterId",
    supporterId
);


localStorage.setItem(
    "pseudoActuel",
    pseudo
);


if (
    rechercheSupporter
        .data
        .avatar
) {

    localStorage.setItem(
        "avatarSupporter",
        rechercheSupporter
            .data
            .avatar
    );

}


console.log(
    "✅ Profil supporter retrouvé :",
    pseudo
);

console.log(
    "🆔 UUID Auth :",
    supporterId
);
```



                // ==========================================
                // CRÉER LE PRONOSTIC
                // ==========================================

                let pronostic = {

                    supporter_id:
                        supporterId,

                    joueur:
                        pseudo,

                    match:
                        nomMatchChoisi,

                    partition:
                        scores[0].value +
                        " - " +
                        scores[1].value,

                    score:
                        0

                };


                console.log(
                    "📤 PRONOSTIC À ENREGISTRER :",
                    pronostic
                );


                // ==========================================
                // CHERCHER UN PRONOSTIC EXISTANT
                // ==========================================

                let recherchePronostic =
                    await supabaseClient
                        .from("pronostics")
                        .select("*")
                        .eq(
                            "supporter_id",
                            supporterId
                        )
                        .eq(
                            "match",
                            nomMatchChoisi
                        )
                        .maybeSingle();


                if (recherchePronostic.error) {

                    console.error(
                        "❌ Erreur vérification pronostic :",
                        recherchePronostic.error
                    );

                    alert(
                        "❌ Impossible de vérifier ton pronostic."
                    );

                    return;

                }


                // ==========================================
                // PRONOSTIC EXISTANT
                // ==========================================

                if (recherchePronostic.data) {

                    console.log(
                        "✏️ Pronostic existant : modification"
                    );


                    let modification =
                        await supabaseClient
                            .from("pronostics")
                            .update({

                                joueur:
                                    pseudo,

                                partition:
                                    scores[0].value +
                                    " - " +
                                    scores[1].value

                            })
                            .eq(
                                "id",
                                recherchePronostic
                                    .data
                                    .id
                            );


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

                    return;

                }


                // ==========================================
                // NOUVEAU PRONOSTIC
                // ==========================================

                console.log(
                    "🆕 Nouveau pronostic : enregistrement"
                );


                let insertion =
                    await supabaseClient
                        .from("pronostics")
                        .insert([
                            pronostic
                        ]);


                if (insertion.error) {

                    console.error(
                        "❌ Erreur insertion :",
                        insertion.error
                    );

                    console.error(
                        "CODE SUPABASE =",
                        insertion.error.code
                    );

                    console.error(
                        "MESSAGE SUPABASE =",
                        insertion.error.message
                    );

                    console.error(
                        "DETAILS SUPABASE =",
                        insertion.error.details
                    );

                    console.error(
                        "HINT SUPABASE =",
                        insertion.error.hint
                    );


                    alert(
                        "❌ Le pronostic n'a pas pu être enregistré."
                    );

                    return;

                }


                console.log(
                    "✅ Pronostic enregistré dans Supabase !"
                );


                alert(
                    "✅ Ton pronostic est enregistré !"
                );


                afficherPronostics();

            }

            catch (erreur) {

                console.error(
                    "❌ ERREUR COMPLETE :",
                    erreur
                );

                console.error(
                    "❌ MESSAGE :",
                    erreur.message
                );

                alert(
                    "❌ Une erreur est survenue : " +
                    erreur.message
                );

            }

        }
    );

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
        .order(
            "created_at",
            {
                ascending: false
            }
        )

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


            pronostics.forEach(
                function(p) {

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

                }
            );

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
        document.getElementById(
            "choix-match"
        );


    if (!selectMatch) {
        return;
    }


    fetch("matchs.json")

        .then(function(reponse) {

            if (!reponse.ok) {

                throw new Error(
                    "Erreur matchs.json"
                );

            }

            return reponse.json();

        })

        .then(function(matchsAdmin) {

            console.log(
                "✅ Matchs chargés :",
                matchsAdmin.length
            );


            // ==========================================
            // TRIER LES MATCHS
            // ==========================================

            matchsAdmin.sort(
                function(a, b) {

                    let ordreStatut = {

                        "À venir": 1,

                        "En cours": 2,

                        "Terminé": 3

                    };


                    let statutA =
                        ordreStatut[a.statut] || 4;


                    let statutB =
                        ordreStatut[b.statut] || 4;


                    if (
                        statutA !== statutB
                    ) {

                        return (
                            statutA -
                            statutB
                        );

                    }


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


                    return (
                        dateA -
                        dateB
                    );

                }
            );


            // ==========================================
            // VIDER LE MENU
            // ==========================================

            selectMatch.innerHTML =
                '<option value="">⚽ Sélectionner un match</option>';


            // ==========================================
            // AFFICHER LES MATCHS
            // ==========================================

            matchsAdmin.forEach(
                function(match) {

                    let option =
                        document.createElement(
                            "option"
                        );


                    option.value =

                        match.equipe1.trim() +
                        " - " +
                        match.equipe2.trim();


                    option.textContent =

                        match.equipe1 +
                        " 🆚 " +
                        match.equipe2;


                    selectMatch.appendChild(
                        option
                    );

                }
            );


            // ==========================================
            // SÉLECTIONNER LE PROCHAIN MATCH
            // ==========================================

            let prochainMatch =
                matchsAdmin.find(
                    function(match) {

                        return (
                            match.statut ===
                            "À venir"
                        );

                    }
                );


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