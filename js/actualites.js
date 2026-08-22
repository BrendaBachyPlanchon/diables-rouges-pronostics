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


        console.log(
            "📰 Actualités :",
            actualites
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