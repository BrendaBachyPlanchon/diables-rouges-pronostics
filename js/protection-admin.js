let adminConnecte = localStorage.getItem("adminConnecte");


if (adminConnecte !== "oui") {

    alert("🔒 Accès réservé à l'administrateur");

    window.location.href = "login-admin.html";

}