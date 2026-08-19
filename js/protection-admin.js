// ==========================================
// PROTECTION DE LA PAGE ADMINISTRATION
// ==========================================

async function verifierConnexionAdmin() {

    const ADMIN_ID =
        "5a1d2817-07a0-4eaa-8aec-d6fd3066e2be";


    // ==========================================
    // RÉCUPÉRER LA SESSION SUPABASE
    // ==========================================

    const {
        data: { session },
        error
    } = await supabaseClient.auth.getSession();


    // ==========================================
    // ERREUR OU PAS CONNECTÉ
    // ==========================================

    if (
        error ||
        !session ||
        !session.user
    ) {

        console.error(
            "❌ Aucun administrateur connecté."
        );

        alert(
            "🔒 Accès réservé à l'administrateur."
        );

        window.location.href =
            "login-admin.html";

        return;

    }


    // ==========================================
    // VÉRIFIER L'IDENTITÉ ADMINISTRATEUR
    // ==========================================

    const utilisateur =
        session.user;


    console.log(
        "🆔 Utilisateur connecté :",
        utilisateur.id
    );


    // ==========================================
    // UTILISATEUR NON ADMIN
    // ==========================================

    if (
        utilisateur.id !==
        ADMIN_ID
    ) {

        console.error(
            "❌ Accès administration refusé."
        );


        // Déconnecter la session
        await supabaseClient.auth.signOut();


        alert(
            "⛔ Accès refusé. Cette page est réservée à l'administrateur."
        );


        window.location.href =
            "index.html";


        return;

    }


    // ==========================================
    // ADMINISTRATEUR AUTORISÉ
    // ==========================================

    console.log(
        "✅ Administrateur authentifié."
    );

}


// ==========================================
// LANCER LA PROTECTION
// ==========================================

verifierConnexionAdmin();