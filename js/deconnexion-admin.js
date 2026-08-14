async function deconnexionAdmin() {

    await supabaseClient.auth.signOut();

    alert("🚪 Vous êtes déconnecté");

    window.location.href = "login-admin.html";

}