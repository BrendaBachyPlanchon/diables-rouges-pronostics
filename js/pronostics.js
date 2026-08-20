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
// CHARGER LE MATCH DEPUIS SUPABASE
// ==========================================

let resultatMatch =
    await supabaseClient
        .from("matchs")
        .select("*");

if (resultatMatch.error) {

    console.error(
        "❌ Erreur chargement du match depuis Supabase :",
        resultatMatch.error
    );

    alert(
        "❌ Impossible de vérifier le match."
    );

    return;
}

let matchsAdmin =
    resultatMatch.data || [];

console.log(
    "✅ Matchs pour vérification du pronostic depuis Supabase :",
    matchsAdmin.length
);


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
// FILTRÉS PAR COMPÉTITION
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
   // DÉTECTER LA COMPÉTITION DE LA PAGE
   // ==========================================

let pageActuelle =
    window.location.pathname.toLowerCase();

let competitionPage = null;


// ==========================================
// LIGUE DES NATIONS
// ==========================================

if (
    pageActuelle.includes("nations-league")
) {

    competitionPage =
        "Ligue des Nations";

}


// ==========================================
// JUPILER PRO LEAGUE
// ==========================================

else if (
    pageActuelle.includes(
        "championnats-europeens"
    )
) {

    competitionPage =
        "Jupiler Pro League";

}


// ==========================================
// COUPE DU MONDE 2030
// ==========================================

else if (
    pageActuelle.includes(
        "coupe-du-monde-2030"
    )
) {

    competitionPage =
        "Coupe du Monde 2030";

}

// ==========================================
// LIGUE DES CHAMPIONS
// ==========================================

else if (
    pageActuelle.includes("ligue-des-champions")
) {

    competitionPage =
        "Ligue des Champions";

}

// ==========================================
// EUROPA LEAGUE
// ==========================================

else if (
    pageActuelle.includes("europa-league")
) {

    competitionPage =
        "Europa League";

}

// ==========================================
// EURO
// ==========================================

else if (
    pageActuelle.includes("euro")
) {

    competitionPage =
        "Euro";

}


console.log(
    "🏆 Compétition de la page :",
    competitionPage || "Toutes"
);

    // ==========================================
    // CHARGER LES PRONOSTICS
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

        .then(function(resultatPronostics) {

            if (resultatPronostics.error) {

                console.error(
                    "❌ Erreur chargement des pronostics :",
                    resultatPronostics.error
                );

                return;

            }


            let pronostics =
                resultatPronostics.data || [];


            console.log(
                "✅ Pronostics chargés depuis Supabase :",
                pronostics.length
            );


            // ==========================================
            // CHARGER LES MATCHS
            // ==========================================

            return supabaseClient
                .from("matchs")
                .select("*")

                .then(function(resultatMatchs) {

                    if (resultatMatchs.error) {

                        console.error(
                            "❌ Erreur chargement des matchs :",
                            resultatMatchs.error
                        );

                        return;

                    }


                    let matchs =
                        resultatMatchs.data || [];


                    // ==========================================
                    // FILTRER LES PRONOSTICS
                    // ==========================================

                    let pronosticsFiltres =
                        pronostics.filter(function(p) {

                            // Hors page compétition :
                            // afficher tous les pronostics

                            if (!competitionPage) {

                                return true;

                            }


                            // Rechercher le match

                            let matchCorrespondant =
                                matchs.find(function(match) {

                                    let nomMatch =
                                        (
                                            match.equipe1 +
                                            " - " +
                                            match.equipe2
                                        )
                                        .trim()
                                        .toLowerCase();

                                    return (
                                        nomMatch ===
                                        (
                                            p.match || ""
                                        )
                                        .trim()
                                        .toLowerCase()
                                    );

                                });


                            // Match introuvable

                            if (!matchCorrespondant) {

                                console.warn(
                                    "⚠️ Match introuvable :",
                                    p.match
                                );

                                return false;

                            }


                            // Vérifier la compétition

                            return (
                                matchCorrespondant.competition ===
                                competitionPage
                            );

                        });


                    console.log(
                        "📋 Pronostics affichés pour",
                        competitionPage || "toutes les compétitions",
                        ":",
                        pronosticsFiltres.length
                    );


                    // ==========================================
                    // AFFICHER
                    // ==========================================

                    pronosticsFiltres.forEach(
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


                    // ==========================================
                    // AUCUN PRONOSTIC
                    // ==========================================

                    if (
                        pronosticsFiltres.length === 0
                    ) {

                        table.innerHTML +=

                            "<tr>" +

                            "<td colspan='3'>" +

                            "ℹ️ Aucun pronostic enregistré pour cette compétition."

                            +

                            "</td>" +

                            "</tr>";

                    }

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
// CHARGER LES MATCHS DEPUIS SUPABASE
// ==========================================

function chargerMatchsAdmin() {

    let selectMatch =
        document.getElementById("choix-match");

    if (!selectMatch) {
        return;
    }

    supabaseClient
        .from("matchs")
        .select("*")
        .then(function(resultat) {

            if (resultat.error) {

                console.error(
                    "❌ Erreur chargement matchs Supabase :",
                    resultat.error
                );

                return;
            }

            let matchsAdmin = resultat.data || [];

            console.log(
                "✅ Matchs chargés depuis Supabase :",
                matchsAdmin.length
            );


            // ==========================================
            // TRIER LES MATCHS
            // ==========================================

            matchsAdmin.sort(function(a, b) {

                let dateA =
                    new Date(
                        a.date + "T" + a.heure
                    );

                let dateB =
                    new Date(
                        b.date + "T" + b.heure
                    );

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
            // CHERCHER LE PROCHAIN MATCH
            // ==========================================

            let maintenant = new Date();

            let matchsFuturs =
                matchsAdmin.filter(function(match) {

                    let dateMatch =
                        new Date(
                            match.date +
                            "T" +
                            match.heure
                        );

                    return dateMatch > maintenant;

                });


            // ==========================================
            // TRIER LES MATCHS FUTURS
            // ==========================================

            matchsFuturs.sort(function(a, b) {

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
            // PRENDRE LE PROCHAIN MATCH
            // ==========================================

            let prochainMatch =
                matchsFuturs[0];


          if (prochainMatch) {

    // ==========================================
    // SÉLECTIONNER LE PROCHAIN MATCH DANS LE MENU
    // ==========================================

    selectMatch.value =
        prochainMatch.equipe1.trim() +
        " - " +
        prochainMatch.equipe2.trim();


    selectMatch.dispatchEvent(
        new Event("change")
    );


    // ==========================================
    // METTRE À JOUR LE BLOC "PROCHAIN MATCH"
    // ==========================================

    let equipeDomicile =
        document.getElementById("equipe-domicile");

    let equipeExterieur =
        document.getElementById("equipe-exterieur");

    let drapeauDomicile =
        document.getElementById("drapeau-domicile");

    let drapeauExterieur =
        document.getElementById("drapeau-exterieur");

    let dateMatch =
        document.getElementById("date-match");

    let heureMatch =
        document.getElementById("heure-match");

    let competitionMatch =
        document.getElementById("competition-match");

    let scoreDomicile =
        document.getElementById("score-domicile");

    let scoreExterieur =
        document.getElementById("score-exterieur");


    // ==========================================
    // ÉQUIPES
    // ==========================================

    if (equipeDomicile) {

        equipeDomicile.textContent =
            prochainMatch.equipe1;

    }


    if (equipeExterieur) {

        equipeExterieur.textContent =
            prochainMatch.equipe2;

    }


    // ==========================================
    // SCORES
    // ==========================================

    if (scoreDomicile) {

        scoreDomicile.textContent =
            prochainMatch.equipe1;

    }


    if (scoreExterieur) {

        scoreExterieur.textContent =
            prochainMatch.equipe2;

    }


    // ==========================================
    // DATE
    // ==========================================

    if (dateMatch) {

        dateMatch.textContent =
            "📅 Date : " +
            prochainMatch.date;

    }


    // ==========================================
    // HEURE
    // ==========================================

    if (heureMatch) {

        heureMatch.textContent =
            "🕘 Heure : " +
            prochainMatch.heure;

    }


    // ==========================================
    // COMPÉTITION
    // ==========================================

    if (competitionMatch) {

        competitionMatch.textContent =
            "🏆 Compétition : " +
            (
                prochainMatch.competition ||
                ""
            );

    }


    // ==========================================
// LOGOS DES CLUBS
// ==========================================

let logoDomicile =
    logosJupilerProLeague[
        prochainMatch.equipe1.trim()
    ];

let logoExterieur =
    logosJupilerProLeague[
        prochainMatch.equipe2.trim()
    ];


if (
    drapeauDomicile &&
    logoDomicile
) {

    drapeauDomicile.src =
        logoDomicile;

}


if (
    drapeauExterieur &&
    logoExterieur
) {

    drapeauExterieur.src =
        logoExterieur;

}


    console.log(
        "🎯 Prochain match sélectionné depuis Supabase :",
        prochainMatch.equipe1,
        "-",
        prochainMatch.equipe2,
        prochainMatch.date,
        prochainMatch.heure
    );


            } else {

                console.log(
                    "ℹ️ Aucun match futur disponible."
                );

            }

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger les matchs Supabase :",
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