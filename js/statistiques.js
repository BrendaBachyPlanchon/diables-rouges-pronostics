// ==========================================
// STATISTIQUES
// ==========================================

function afficherStatistiques() {

    // ==========================================
    // CHARGER LES MATCHS DEPUIS SUPABASE
    // ==========================================

    supabaseClient
        .from("matchs")
        .select("*")

        .then(function(resultatMatchs) {

            if (resultatMatchs.error) {

                throw resultatMatchs.error;

            }

            let matchsStatistiques =
                resultatMatchs.data || [];

            console.log(
                "✅ Matchs statistiques chargés depuis Supabase :",
                matchsStatistiques.length
            );

            // ==========================================
            // CHARGER LES PRONOSTICS DEPUIS SUPABASE
            // ==========================================

            return supabaseClient
                .from("pronostics")
                .select("*")

                .then(function(resultat) {

                    if (resultat.error) {

                        throw resultat.error;

                    }

                    return {
                        matchs: matchsStatistiques,
                        pronostics: resultat.data
                    };

                });

        })

        .then(function(donnees) {

            let matchsStatistiques =
                donnees.matchs;

            let pronostics =
                donnees.pronostics;


            console.log(
                "✅ Statistiques chargées depuis Supabase :",
                pronostics.length
            );


           // ==========================================
// RÉCUPÉRER LES SUPPORTERS
// ==========================================

let joueurs = [];


pronostics.forEach(function(p) {

    if (
        p.supporter_id &&
        !joueurs.includes(p.supporter_id)
    ) {

        joueurs.push(p.supporter_id);

    }

});


            let participants =
                joueurs.length;


            let nbPronostics =
                pronostics.length;


            // ==========================================
            // MEILLEUR JOUEUR
            // ==========================================

            let meilleur =
                "À venir";

            let meilleurScore =
                -1;


            joueurs.forEach(function(joueur) {

                let points = 0;


                pronostics.forEach(function(p) {

                    if (p.joueur !== joueur) {

                        return;

                    }


                    // ==========================================
                    // VÉRIFIER LA PARTITION
                    // ==========================================

                    if (!p.partition) {

                        console.warn(
                            "⚠️ Pronostic sans partition :",
                            p
                        );

                        return;

                    }


                    let scores =
                        p.partition.split("-");


                    if (scores.length !== 2) {

                        console.warn(
                            "⚠️ Partition incorrecte :",
                            p.partition
                        );

                        return;

                    }


                    let pronostic1 =
                        Number(scores[0]);


                    let pronostic2 =
                        Number(scores[1]);


                    // ==========================================
                    // RECHERCHER LE MATCH
                    // ==========================================

                    let matchTrouve =
                        matchsStatistiques.find(
                            function(match) {

                                let nomMatch =

                                    match.equipe1.trim() +
                                    " - " +
                                    match.equipe2.trim();


                                return (

                                    nomMatch.toLowerCase() ===
                                    p.match.trim().toLowerCase()

                                );

                            }
                        );


                    if (!matchTrouve) {

                        console.warn(
                            "⚠️ Match introuvable :",
                            p.match
                        );

                        return;

                    }


                    // ==========================================
                    // MATCH TERMINÉ
                    // ==========================================

                    if (

                        matchTrouve.statut === "Terminé" &&

                        matchTrouve.score1 !== "" &&

                        matchTrouve.score2 !== ""

                    ) {

                        let resultat1 =
                            Number(matchTrouve.score1);


                        let resultat2 =
                            Number(matchTrouve.score2);


                        points += calculerPoints(

                            pronostic1,
                            pronostic2,

                            resultat1,
                            resultat2

                        );

                    }

                });


                // ==========================================
                // MEILLEUR SCORE
                // ==========================================

                if (points > meilleurScore) {

                    meilleurScore =
                        points;

                    meilleur =
                        joueur +
                        " (" +
                        points +
                        " pts)";

                }

            });


            // ==========================================
            // AFFICHER LES STATISTIQUES
            // ==========================================

            let participantsElt =
                document.getElementById(
                    "nb-participants"
                );


            let pronosticsElt =
                document.getElementById(
                    "nb-pronostics"
                );


            let leaderElt =
                document.getElementById(
                    "leader"
                );


            if (participantsElt) {

                participantsElt.innerText =
                    participants;

            }


            if (pronosticsElt) {

                pronosticsElt.innerText =
                    nbPronostics;

            }


            if (leaderElt) {

                leaderElt.innerText =
                    meilleur;

            }


            console.log(
                "✅ Statistiques affichées"
            );

        })


        .catch(function(erreur) {

            console.error(
                "❌ Erreur statistiques :",
                erreur
            );

        });

}


// ==========================================
// DÉMARRAGE
// ==========================================

window.addEventListener(
    "load",
    function() {

        afficherStatistiques();

    }
);