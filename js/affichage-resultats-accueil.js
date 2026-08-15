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


    // ==========================================
    // VÉRIFIER SUPABASE
    // ==========================================

    if (typeof supabaseClient === "undefined") {

        console.error(
            "❌ supabaseClient n'est pas disponible"
        );

        bloc.innerHTML =
            "<p>❌ Connexion à Supabase impossible.</p>";

        return;
    }


    // ==========================================
    // CHARGER LES MATCHS DEPUIS SUPABASE
    // ==========================================

    supabaseClient
        .from("matchs")
        .select("*")
        .eq("statut", "Terminé")

        .then(function(resultatSupabase) {

            if (resultatSupabase.error) {

                console.error(
                    "❌ Erreur Supabase derniers résultats :",
                    resultatSupabase.error
                );

                bloc.innerHTML =
                    "<p>❌ Impossible de charger les résultats.</p>";

                return;
            }


            let matchs =
                resultatSupabase.data || [];


            console.log(
                "✅ Derniers résultats chargés depuis Supabase :",
                matchs.length
            );


            // ==========================================
            // TRIER DU PLUS RÉCENT AU PLUS ANCIEN
            // ==========================================

            matchs.sort(function(a, b) {

                let dateA =
                    new Date(a.date + "T" + a.heure);

                let dateB =
                    new Date(b.date + "T" + b.heure);

                return dateB - dateA;

            });


            // ==========================================
            // PRENDRE LES 3 DERNIERS
            // ==========================================

            let resultats =
                matchs.slice(0, 3);


            if (resultats.length === 0) {

                bloc.innerHTML =
                    "<p>Aucun résultat disponible pour le moment.</p>";

                return;

            }


            // ==========================================
            // AFFICHER LES RÉSULTATS
            // ==========================================

            bloc.innerHTML = "";


            resultats.forEach(function(match) {

                let equipe1 =
                    (match.equipe1 || "").trim();

                let equipe2 =
                    (match.equipe2 || "").trim();


                bloc.innerHTML += `

                    <div class="resultat-accueil">

                        <h3>

                            ${equipe1}

                            <strong>
                                ${match.score1 ?? "-"}
                                -
                                ${match.score2 ?? "-"}
                            </strong>

                            ${equipe2}

                        </h3>

                        <p>
                            📅 ${formaterDate(match.date)}
                        </p>

                        <p>
                            🏆 ${match.competition || ""}
                        </p>

                    </div>

                `;

            });


            console.log(
                "✅ Carte Derniers résultats synchronisée avec Supabase"
            );

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

