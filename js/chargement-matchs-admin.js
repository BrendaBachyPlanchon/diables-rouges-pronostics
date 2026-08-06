// ==========================================
// CHARGEMENT DES MATCHS ADMIN DEPUIS LE SERVEUR
// ==========================================

console.log("✅ chargement-matchs-admin.js serveur actif");


let selectMatchAdmin =
    document.getElementById("choix-match");


if (selectMatchAdmin) {


    // ==========================================
    // CHARGER LES MATCHS DEPUIS LE SERVEUR
    // ==========================================

    fetch("matchs.php")

        .then(function(reponse) {

            if (!reponse.ok) {
                throw new Error("Erreur matchs.php");
            }

            return reponse.json();

        })

        .then(function(matchsAdmin) {


            console.log(
                "✅ Matchs admin chargés depuis le serveur :",
                matchsAdmin.length
            );


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


                    option.value = valeur;


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
                "❌ Impossible de charger les matchs admin :",
                erreur
            );

        });

}