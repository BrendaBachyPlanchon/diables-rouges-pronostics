// ==========================================
// AFFICHER LE PROFIL
// VERSION SUPABASE
// ==========================================

function afficherProfil() {

    let pseudo =
        localStorage.getItem("pseudoActuel");

    // Si aucun pseudo n'est trouvé,
    // essayer de récupérer le dernier pseudo utilisé
    if (!pseudo) {

        pseudo =
            localStorage.getItem("pseudo");

    }

    // Dernier recours
    if (!pseudo) {

        pseudo = "Supporter";

    }

    let supporterId =
        localStorage.getItem("supporterId");


    // ==========================================
    // CHARGER LES PRONOSTICS DEPUIS SUPABASE
    // ==========================================

    supabaseClient
        .from("pronostics")
        .select("*")

        .then(function(resultat) {

            if (resultat.error) {

                throw resultat.error;

            }


            let pronostics =
                resultat.data || [];


            console.log(
                "✅ Pronostics du profil chargés depuis Supabase :",
                pronostics.length
            );


            // ==========================================
            // PRENDRE UNIQUEMENT MES PRONOSTICS
            // ==========================================

            let mesPronostics =
                pronostics.filter(function(p) {

                    return (
                        p.supporter_id === supporterId
                    );

                });


            // ==========================================
            // ANCIEN FORMAT SANS SUPPORTER ID
            // ==========================================

            if (
                mesPronostics.length === 0 &&
                pseudo !== "Supporter"
            ) {

                mesPronostics =
                    pronostics.filter(function(p) {

                        return (
                            p.joueur &&
                            p.joueur.toLowerCase() ===
                            pseudo.toLowerCase()
                        );

                    });

            }


            // ==========================================
            // CALCUL DES STATISTIQUES DU PROFIL
            // ==========================================

            let points = 0;

            let scoresExacts = 0;


            mesPronostics.forEach(function(p) {

                let score =
                    Number(p.score);

                if (Number.isNaN(score)) {
                    score = 0;
                }

                points += score;


                if (score === 3) {

                    scoresExacts++;

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

                    if (p.joueur === joueur) {

                        let score =
                            Number(p.score);

                        if (Number.isNaN(score)) {
                            score = 0;
                        }

                        totalPoints += score;

                    }

                });


                classementJoueurs.push({

                    nom: joueur,

                    points: totalPoints

                });

            });


            // ==========================================
            // TRI DU CLASSEMENT
            // ==========================================

            classementJoueurs.sort(
                function(a, b) {

                    return b.points - a.points;

                }
            );


            // ==========================================
            // POSITION
            // ==========================================

            let position = "À venir";


            let maPosition =
                classementJoueurs.findIndex(
                    function(joueur) {

                        return (
                            joueur.nom.toLowerCase() ===
                            pseudo.toLowerCase()
                        );

                    }
                );


            if (maPosition !== -1) {

                position =
                    (maPosition + 1) + "e";

            }


            // ==========================================
            // AFFICHAGE DU PROFIL
            // ==========================================

            let pseudoProfil =
                document.getElementById(
                    "pseudo-profil"
                );


            if (pseudoProfil) {

                pseudoProfil.innerText =
                    "👤 " + pseudo;

            }


            let profilPronostics =
                document.getElementById(
                    "profil-pronostics"
                );


            if (profilPronostics) {

                profilPronostics.innerText =
                    mesPronostics.length;

            }


            let profilExacts =
                document.getElementById(
                    "profil-exacts"
                );


            if (profilExacts) {

                profilExacts.innerText =
                    scoresExacts;

            }


            let profilPoints =
                document.getElementById(
                    "profil-points"
                );


            if (profilPoints) {

                profilPoints.innerText =
                    points;

            }


            let profilPosition =
                document.getElementById(
                    "profil-position"
                );


            if (profilPosition) {

                profilPosition.innerText =
                    position;

            }


            // ==========================================
            // MESSAGE
            // ==========================================

            let message =
                document.getElementById(
                    "message-profil"
                );


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
                document.getElementById(
                    "badge-supporter"
                );


            if (badgeElt) {

                badgeElt.innerText =
                    badge;


                if (mesPronostics.length >= 50) {

                    badgeElt.style.background =
                        "#e30613";

                    badgeElt.style.color =
                        "white";

                } else if (mesPronostics.length >= 25) {

                    badgeElt.style.background =
                        "#FFD700";

                    badgeElt.style.color =
                        "black";

                } else if (mesPronostics.length >= 10) {

                    badgeElt.style.background =
                        "#C0C0C0";

                    badgeElt.style.color =
                        "black";

                } else if (mesPronostics.length >= 5) {

                    badgeElt.style.background =
                        "#CD7F32";

                    badgeElt.style.color =
                        "white";

                } else {

                    badgeElt.style.background =
                        "#555";

                    badgeElt.style.color =
                        "white";

                }

            }


            // ==========================================
            // TABLEAU DE MES PRONOSTICS
            // ==========================================

            let tableau =
                document.getElementById(
                    "mes-pronostics"
                );


            if (tableau) {

                tableau.innerHTML = "";


                mesPronostics.forEach(
                    function(p) {

                        tableau.innerHTML +=

                            "<tr>" +

                            "<td>" +
                            p.match +
                            "</td>" +

                            "<td>⚽ " +
                            (p.partition || "-") +
                            "</td>" +

                            "</tr>";

                    }
                );

            }


            console.log(
                "✅ Profil affiché depuis Supabase"
            );

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger le profil :",
                erreur
            );

        });

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

// ==========================================
// CHOIX DE L'AVATAR DU SUPPORTER
// ==========================================

function initialiserAvatars() {

    const avatars =
        document.querySelectorAll(".avatar-choix");

    const avatarProfil =
        document.getElementById("avatar-profil");

    const avatarSelectionne =
        document.getElementById("avatar-selectionne");


    if (!avatars.length || !avatarProfil) {
        return;
    }


    // ==========================================
    // CHARGER L'AVATAR DÉJÀ CHOISI
    // ==========================================

    const avatarSauvegarde =
        localStorage.getItem("avatarSupporter");


    if (avatarSauvegarde) {

        avatarProfil.src =
            "images/avatars/" + avatarSauvegarde;


        // Afficher la sélection dans la galerie
        avatars.forEach(function(avatar) {

            if (
                avatar.dataset.avatar ===
                avatarSauvegarde
            ) {

                avatar.classList.add(
                    "avatar-selectionne"
                );

            }

        });

    }


    // ==========================================
    // CLIQUER SUR UN AVATAR
    // ==========================================

    avatars.forEach(function(avatar) {

        avatar.addEventListener(
            "click",
            function() {


                const choix =
                    avatar.dataset.avatar;


                // Retirer la sélection précédente
                avatars.forEach(function(a) {

                    a.classList.remove(
                        "avatar-selectionne"
                    );

                });


                // Ajouter la sélection au nouvel avatar
                avatar.classList.add(
                    "avatar-selectionne"
                );


                // Afficher l'avatar choisi
                avatarProfil.src =
                    "images/avatars/" + choix;


                // Sauvegarder le choix
                localStorage.setItem(
                    "avatarSupporter",
                    choix
                );


                // Afficher le message
               if (avatarSelectionne) {

    avatarSelectionne.innerText =
        "🇧🇪 Ton avatar de supporter est sélectionné !";

}


                console.log(
                    "✅ Avatar choisi :",
                    choix
                );

            }
        );

    });

}


// Lancer le système d'avatars
window.addEventListener(
    "load",
    function() {

        initialiserAvatars();

    }
);