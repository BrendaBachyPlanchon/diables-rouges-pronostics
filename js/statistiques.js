function afficherStatistiques() {

    fetch("matchs.json")

    .then(function(reponse) {

        return reponse.json();

    })

    .then(function(matchsStatistiques) {


        let pronostics =
            JSON.parse(localStorage.getItem("pronostics")) || [];


        let joueurs = [];


        pronostics.forEach(function(p) {

            if (!joueurs.includes(p.joueur)) {

                joueurs.push(p.joueur);

            }

        });


        let participants = joueurs.length;

        let nbPronostics = pronostics.length;


        let meilleur = "À venir";

        let meilleurScore = -1;



        joueurs.forEach(function(joueur) {


            let points = 0;



            pronostics.forEach(function(p) {


                if (p.joueur == joueur) {


                    let scores =
                        p.score.split(" - ");



                    let matchTrouve =
                        matchsStatistiques.find(function(match) {


                            let nomMatch =
                                match.equipe1.trim() +
                                " - " +
                                match.equipe2.trim();



                            return nomMatch.toLowerCase()
                                === p.match.toLowerCase();


                        });



                    if (
                        matchTrouve &&
                        matchTrouve.statut === "Terminé"
                    ) {


                        points += calculerPoints(

                            Number(scores[0]),

                            Number(scores[1]),

                            Number(matchTrouve.score1),

                            Number(matchTrouve.score2)

                        );


                    }


                }


            });



            if (points > meilleurScore) {

                meilleurScore = points;

                meilleur =
                    joueur +
                    " (" +
                    points +
                    " pts)";

            }


        });



        let participantsElt =
            document.getElementById("nb-participants");


        let pronosticsElt =
            document.getElementById("nb-pronostics");


        let leaderElt =
            document.getElementById("leader");



        if (participantsElt)
            participantsElt.innerText = participants;


        if (pronosticsElt)
            pronosticsElt.innerText = nbPronostics;


        if (leaderElt)
            leaderElt.innerText = meilleur;



    })

    .catch(function(erreur) {

        console.error(
            "❌ Erreur statistiques :",
            erreur
        );

    });

}



window.addEventListener("load", function() {

    afficherStatistiques();

});