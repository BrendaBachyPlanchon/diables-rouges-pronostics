// ==========================================
// CHARGEMENT DES MATCHS ADMIN DEPUIS SUPABASE
// ==========================================

console.log("✅ chargement-matchs-admin.js Supabase actif");


let selectMatchAdmin =
    document.getElementById("choix-match");


if (selectMatchAdmin) {


    // ==========================================
    // CHARGER LES MATCHS DEPUIS SUPABASE
    // ==========================================

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


            let matchsAdmin =
                resultat.data || [];


            console.log(
                "✅ Matchs admin chargés depuis Supabase :",
                matchsAdmin.length
            );


            // ==========================================
            // AFFICHER LES MATCHS
            // ==========================================

            matchsAdmin.forEach(function(match) {


                let valeur =
                    match.equipe1.trim() +
                    " - " +
                    match.equipe2.trim();


                // ==========================================
                // ÉVITER LES DOUBLONS
                // ==========================================

                let existe = false;


                for (
                    let option of selectMatchAdmin.options
                ) {

                    if (option.value === valeur) {

                        existe = true;

                        break;

                    }

                }


                if (!existe) {


                    let option =
                        document.createElement("option");


                    option.value =
                        valeur;


                    let competition =
                        match.competition;


                    if (
                        competition ===
                        "Ligue des Nations"
                    ) {

                        competition =
                            "🏆🇪🇺 Ligue des Nations";

                    }


                    option.textContent =
                        competition +
                        " : " +
                        match.equipe1 +
                        " 🆚 " +
                        match.equipe2;


                    selectMatchAdmin.appendChild(
                        option
                    );

                }

            });

        })

        .catch(function(erreur) {

            console.error(
                "❌ Impossible de charger les matchs Supabase :",
                erreur
            );

        });

}

