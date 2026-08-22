// ==========================================
// STATUT DE CONNEXION
// ==========================================

async function afficherStatutConnexion() {

    const zone =
        document.getElementById("statut-connexion");

    if (!zone) {
        return;
    }

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

    let pseudo =
        localStorage.getItem("pseudoActuel") ||
        "Supporter";

    zone.innerHTML =
        "🟢 Connecté : " + pseudo;

    console.log(
        "✅ Utilisateur connecté :",
        pseudo
    );
}

afficherStatutConnexion();