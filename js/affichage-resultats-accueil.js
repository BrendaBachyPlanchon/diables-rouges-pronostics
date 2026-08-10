function formaterDate(date) {

    let d = new Date(date);

    return d.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}

function afficherDerniersResultatsAccueil() {

    let bloc =
        document.getElementById("derniers-resultats");

    if (!bloc) return;


    fetch("matchs.json")

        .then(function(reponse) {

            if (!reponse.ok) {
                throw new Error("Impossible de charger matchs.json");
            }

            return reponse.json();

        })

        .then(function(matchs) {

            // Garder uniquement les matchs terminés
            let resultats = matchs.filter(function(match) {

                return match.statut === "Terminé";

            });


            // Trier du plus récent au plus ancien
            resultats.sort(function(a, b) {

                let dateA =
                    new Date(a.date + "T" + a.heure);

                let dateB =
                    new Date(b.date + "T" + b.heure);

                return dateB - dateA;

            });


            // Garder les 3 derniers résultats
            resultats = resultats.slice(0, 3);


            if (resultats.length === 0) {

                bloc.innerHTML =
                    "<p>Aucun résultat disponible pour le moment.</p>";

                return;

            }


            bloc.innerHTML = "";


            resultats.forEach(function(match) {

                let equipe1 =
                    match.equipe1.trim();

                let equipe2 =
                    match.equipe2.trim();


                bloc.innerHTML += `

                    <div class="resultat-accueil">

                        <h3>
                            ${equipe1}
                            <strong>
                                ${match.score1} - ${match.score2}
                            </strong>
                            ${equipe2}
                        </h3>

                        <p>
                            📅 ${formaterDate(match.date)}
                        </p>

                        <p>
                            🏆 ${match.competition}
                        </p>

                    </div>

                `;

            });

        })

        .catch(function(erreur) {

            console.error(
                "❌ Erreur derniers résultats :",
                erreur
            );

            bloc.innerHTML =
                "<p>❌ Impossible de charger les résultats.</p>";

        });

}


window.addEventListener("load", function() {

    afficherDerniersResultatsAccueil();

});