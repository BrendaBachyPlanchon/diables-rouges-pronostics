// ==========================================
// FERMETURE AUTOMATIQUE DES PRONOSTICS
// ==========================================

function verifierOuverturePronostic() {

    let choixMatch =
        document.getElementById("choix-match");

    let bouton =
        document.getElementById("envoyer-pronostic");


    if (!choixMatch || !bouton) {
        return;
    }


    let matchChoisi =
        choixMatch.value.trim();


    if (!matchChoisi) {
        bouton.disabled = true;
        bouton.innerText = "⚽ Sélectionner un match";
        return;
    }


    // ==========================================
    // CHARGER LES MATCHS DU SERVEUR
    // ==========================================

    fetch("matchs.json")

        .then(function(reponse) {

            if (!reponse.ok) {
                throw new Error("Impossible de charger matchs.json");
            }

            return reponse.json();

        })

        .then(function(matchs) {

            console.log(
                "✅ Vérification fermeture chargée :",
                matchs.length
            );


            // ==========================================
            // TROUVER LE MATCH SÉLECTIONNÉ
            // ==========================================

            let match = matchs.find(function(match) {

                let nomMatch =
                    match.equipe1.trim() +
                    " - " +
                    match.equipe2.trim();

                return nomMatch.toLowerCase() ===
                       matchChoisi.toLowerCase();

            });


            if (!match) {

                console.warn(
                    "⚠️ Match introuvable pour fermeture :",
                    matchChoisi
                );

                return;

            }


            console.log(
                "🔎 Vérification fermeture :",
                match.equipe1,
                "-",
                match.equipe2,
                "| statut =",
                match.statut,
                "| date =",
                match.date,
                "| heure =",
                match.heure
            );


            // ==========================================
            // VÉRIFIER LE STATUT
            // ==========================================

            if (
                match.statut === "Terminé" ||
                match.statut === "En cours"
            ) {

                bouton.disabled = true;

                bouton.innerText =
                    "🔒 Pronostics clôturés";

                bouton.style.opacity = "0.6";

                bouton.style.cursor =
                    "not-allowed";


                console.log(
                    "🔒 Pronostics clôturés pour :",
                    match.equipe1,
                    "-",
                    match.equipe2
                );


                return;

            }


            // ==========================================
            // VÉRIFIER LA DATE ET L'HEURE
            // ==========================================

            let dateMatch =
                new Date(
                    match.date +
                    "T" +
                    match.heure
                ).getTime();


            let maintenant =
                new Date().getTime();


            if (dateMatch <= maintenant) {

                bouton.disabled = true;

                bouton.innerText =
                    "🔒 Pronostics clôturés";

                bouton.style.opacity = "0.6";

                bouton.style.cursor =
                    "not-allowed";


                console.log(
                    "🔒 Match commencé ou dépassé :",
                    match.equipe1,
                    "-",
                    match.equipe2
                );


                return;

            }


            // ==========================================
            // MATCH À VENIR
            // ==========================================

            bouton.disabled = false;

            bouton.innerText =
                "⚽ Envoyer mon pronostic";

            bouton.style.opacity = "1";

            bouton.style.cursor =
                "pointer";


            console.log(
                "🟢 Pronostics ouverts pour :",
                match.equipe1,
                "-",
                match.equipe2
            );

        })

        .catch(function(erreur) {

            console.error(
                "❌ Erreur vérification fermeture :",
                erreur
            );

        });

}


// ==========================================
// AU CHARGEMENT DE LA PAGE
// ==========================================

window.addEventListener(
    "load",
    function() {

        verifierOuverturePronostic();

    }
);


// ==========================================
// QUAND ON CHANGE DE MATCH
// ==========================================

let selectMatchFermeture =
    document.getElementById("choix-match");


if (selectMatchFermeture) {

    selectMatchFermeture.addEventListener(
        "change",
        function() {

            verifierOuverturePronostic();

        }
    );

}