function deconnexionAdmin() {

    localStorage.removeItem("adminConnecte");

    alert("🚪 Vous êtes déconnecté");

    window.location.href = "login-admin.html";

}