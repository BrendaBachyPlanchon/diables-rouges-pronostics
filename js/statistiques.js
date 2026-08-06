function afficherStatistiques() {
 
    let pronostics = JSON.parse(localStorage.getItem("pronostics")) || [];

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

                let scores = p.score.split(" - ");

                let resultat = trouverResultat(p.match);
                
                if (resultat && resultat.equipe1 !== null) {

    points += calculerPoints(
        Number(scores[0]),
        Number(scores[1]),
        resultat.equipe1,
        resultat.equipe2
    );

}

            }

        });

        if (points > meilleurScore) {
            meilleurScore = points;
            meilleur = joueur + " (" + points + " pts)";
        }

    });

    let participantsElt = document.getElementById("nb-participants");
    let pronosticsElt = document.getElementById("nb-pronostics");
    let leaderElt = document.getElementById("leader");

    if (participantsElt) participantsElt.innerText = participants;
    if (pronosticsElt) pronosticsElt.innerText = nbPronostics;
    if (leaderElt) leaderElt.innerText = meilleur;

}

window.addEventListener("load", function() {
    afficherStatistiques();
});