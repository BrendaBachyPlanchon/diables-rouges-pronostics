async function verifierConnexion() {

    const { data, error } = await supabaseClient.auth.getSession();

    if (!data.session) {

        alert("🔒 Accès réservé à l'administrateur");

        window.location.href = "login-admin.html";
    }

}

verifierConnexion();