// ==========================================
// STATUT DE CONNEXION
// ==========================================

async function afficherStatutConnexion() {

    const zone =
        document.getElementById("statut-connexion");

    if (!zone) {
        return;
    }


    // ==========================================
    // RÉCUPÉRER L'UTILISATEUR CONNECTÉ
    // ==========================================

    const {
        data: { user },
        error
    } =
        await supabaseClient.auth.getUser();


    if (error) {

        console.error(
            "❌ Erreur récupération connexion :",
            error
        );

        zone.innerHTML =
            "🔴 Vous n'êtes pas connecté";

        return;
    }


    if (!user) {

        zone.innerHTML =
            "🔴 Vous n'êtes pas connecté";

        return;
    }


    // ==========================================
    // RÉCUPÉRER LE PSEUDO DEPUIS SUPABASE
    // ==========================================

    const resultat =
        await supabaseClient
            .from("supporters")
            .select("pseudo")
            .eq(
                "supporter_id",
                user.id
            )
            .maybeSingle();


    if (resultat.error) {

        console.error(
            "❌ Erreur récupération pseudo :",
            resultat.error
        );

        zone.innerHTML =
            "🟢 Connecté : Supporter";

        return;
    }


    // ==========================================
    // RÉCUPÉRER LE PSEUDO
    // ==========================================

    let pseudo =
        "Supporter";


    if (
        resultat.data &&
        resultat.data.pseudo
    ) {

        pseudo =
            resultat.data.pseudo;


        // Sauvegarder le pseudo localement
        localStorage.setItem(
            "pseudoActuel",
            pseudo
        );

    }


    // ==========================================
    // AFFICHER LE STATUT
    // ==========================================

    zone.innerHTML =
        "🟢 Connecté : " + pseudo;


    console.log(
        "✅ Utilisateur connecté :",
        pseudo
    );

}


// ==========================================
// LANCER LE STATUT DE CONNEXION
// ==========================================

afficherStatutConnexion();