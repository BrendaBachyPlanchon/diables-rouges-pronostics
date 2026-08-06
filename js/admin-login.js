function connexionAdmin() {

    let motDePasse = document.getElementById("motdepasse").value;


    let motDePasseAdmin = "Diables2026";


    if (motDePasse === motDePasseAdmin) {

        localStorage.setItem("adminConnecte", "oui");

        window.location.href = "admin.html";

    } else {

        alert("❌ Mot de passe incorrect");

    }

}