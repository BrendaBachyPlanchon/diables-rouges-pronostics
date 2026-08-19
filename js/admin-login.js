// ==========================================
// CONNEXION ADMINISTRATEUR
// ==========================================

async function connexionAdmin() {

    const email =
        document.getElementById("email").value.trim();

    const motDePasse =
        document.getElementById("motdepasse").value;


    if (!email || !motDePasse) {

        alert(
            "⚠️ Veuillez indiquer votre adresse e-mail et votre mot de passe."
        );

        return;

    }


    // ==========================================
    // CONNEXION SUPABASE
    // ==========================================

    const {
        data,
        error
    } =
        await supabaseClient.auth.signInWithPassword({

            email:
                email,

            password:
                motDePasse

        });


    if (error) {

        alert(
            "❌ Email ou mot de passe incorrect"
        );

        console.error(
            error
        );

        return;

    }


    // ==========================================
    // IDENTIFIANT ADMINISTRATEUR
    // ==========================================

    const ADMIN_ID =
        "5a1d2817-07a0-4eaa-8aec-d6fd3066e2be";


    // ==========================================
    // VÉRIFIER L'UTILISATEUR CONNECTÉ
    // ==========================================

    const utilisateur =
        data.user;


    if (
        !utilisateur ||
        utilisateur.id !== ADMIN_ID
    ) {

        console.error(
            "⛔ Tentative d'accès administration refusée :",
            utilisateur
                ? utilisateur.id
                : "aucun utilisateur"
        );


        // Déconnexion immédiate
        await supabaseClient.auth.signOut();


        alert(
            "⛔ Accès refusé. Ce compte n'est pas administrateur."
        );


        return;

    }


    // ==========================================
    // ADMINISTRATEUR CONFIRMÉ
    // ==========================================

    console.log(
        "✅ Administrateur authentifié."
    );


    window.location.href =
        "admin.html";

}


// ==========================================
// AFFICHER / MASQUER LE MOT DE PASSE
// ==========================================

function voirMotDePasse() {

    const champ =
        document.getElementById(
            "motdepasse"
        );


    if (
        champ.type ===
        "password"
    ) {

        champ.type =
            "text";

    } else {

        champ.type =
            "password";

    }

}