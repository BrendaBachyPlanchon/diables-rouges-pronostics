// ==========================================
// ACTUALITÉS
// ==========================================

async function chargerActualites() {

    console.log("📰 Chargement des actualités...");

    try {

        const resultat =
            await supabaseClient
                .from("actualites")
                .select("*")
                .eq("publiee", true)
                .order("created_at", {
                    ascending: false
                });


        if (resultat.error) {

            console.error(
                "❌ Erreur chargement actualités :",
                resultat.error
            );

            return;

        }


        const actualites =
            resultat.data || [];


        console.log(
            "✅ Actualités chargées depuis Supabase :",
            actualites.length
        );


        // ==========================================
        // ZONES D'AFFICHAGE
        // ==========================================

        const zoneDiables =
            document.getElementById(
                "actualites-diables"
            );


        const zoneRedFlames =
            document.getElementById(
                "actualites-red-flames"
            );


        const zoneJeunes =
            document.getElementById(
                "actualites-jeunes"
            );


        // ==========================================
        // AFFICHER LES ACTUALITÉS
        // ==========================================

        actualites.forEach(function(actualite) {

            let carte =
                document.createElement("div");

            carte.className =
                "carte actualite";


           let datePublication = "";

if (actualite.created_at) {

    let date =
        new Date(
            actualite.created_at
        );

    datePublication =
        date.toLocaleDateString(
            "fr-BE",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        ) +
        " à " +
        date.toLocaleTimeString(
            "fr-BE",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


carte.innerHTML =

    "<h3>" +
    (
        actualite.titre ||
        ""
    ) +
    "</h3>" +

    "<p class='date-actualite'>" +
    "📅 Publié le " +
    datePublication +
    "</p>" +

    "<div class='contenu-actualite'>" +
    (
        actualite.contenu ||
        ""
    ) +
    "</div>";


            // ==========================================
            // CHOISIR LA BONNE CATÉGORIE
            // ==========================================

            if (
                actualite.categorie ===
                "Diables Rouges"
            ) {

                if (zoneDiables) {

                    zoneDiables.appendChild(
                        carte
                    );

                }

            }

            else if (
                actualite.categorie ===
                "Red Flames"
            ) {

                if (zoneRedFlames) {

                    zoneRedFlames.appendChild(
                        carte
                    );

                }

            }

            else if (
                actualite.categorie ===
                "Équipes nationales jeunes"
            ) {

                if (zoneJeunes) {

                    zoneJeunes.appendChild(
                        carte
                    );

                }

            }

        });


        console.log(
            "✅ Actualités affichées sur la page"
        );

    }

    catch (erreur) {

        console.error(
            "❌ Erreur complète actualités :",
            erreur
        );

    }

}


// ==========================================
// DÉMARRAGE
// ==========================================

window.addEventListener(
    "load",
    function() {

        chargerActualites();

    }
);