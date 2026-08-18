// ==========================================
// FERMETURE AUTOMATIQUE DES PRONOSTICS
// VERSION SUPABASE
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

        bouton.innerText =
            "⚽ Sélectionner un match";

        return;
    }


    // ==========================================
    // VÉRIFIER QUE SUPABASE EST DISPONIBLE
    // ==========================================

    if (
        typeof supabaseClient === "undefined"
    ) {

        console.error(
            "❌ Supabase n'est pas disponible"
        );

        return;
    }


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


            let matchs =
                resultat.data || [];


            console.log(
                "✅ Vérification fermeture chargée depuis Supabase :",
                matchs.length
            );


            // ==========================================
            // TROUVER LE MATCH SÉLECTIONNÉ
            // ==========================================

            let match =
                matchs.find(function(match) {

                    let nomMatch =
                        String(match.equipe1).trim() +
                        " - " +
                        String(match.equipe2).trim();


                    return (
                        nomMatch.toLowerCase() ===
                        matchChoisi.toLowerCase()
                    );

                });


            if (!match) {

                console.warn(
                    "⚠️ Match introuvable pour fermeture :",
                    matchChoisi
                );

                return;
            }


            // ==========================================
            // INFORMATIONS DU MATCH
            // ==========================================

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
            // MATCH TERMINÉ OU EN COURS
            // ==========================================

            if (
                match.statut === "Terminé" ||
                match.statut === "En cours"
            ) {

                bouton.disabled = true;

                bouton.innerText =
                    "🔒 Pronostics clôturés";

                bouton.style.opacity =
                    "0.6";

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
            // VÉRIFIER DATE ET HEURE
            // ==========================================

            let dateMatch =
                new Date(
                    match.date +
                    "T" +
                    match.heure
                ).getTime();


            let maintenant =
                new Date().getTime();


            // ==========================================
            // DATE DÉPASSÉE
            // ==========================================

            if (
                dateMatch <= maintenant
            ) {

                bouton.disabled = true;

                bouton.innerText =
                    "🔒 Pronostics clôturés";

                bouton.style.opacity =
                    "0.6";

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

            bouton.style.opacity =
                "1";

            bouton.style.cursor =
                "pointer";


            console.log(
                "🟢 Pronostics ouverts pour :",
                match.equipe1,
                "-",
                match.equipe2
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
    document.getElementById(
        "choix-match"
    );


if (selectMatchFermeture) {

    selectMatchFermeture.addEventListener(
        "change",
        function() {

            verifierOuverturePronostic();

        }
    );

}