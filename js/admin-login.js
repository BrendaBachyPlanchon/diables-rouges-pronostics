async function connexionAdmin() {

    const email = document.getElementById("email").value;
    const motDePasse = document.getElementById("motdepasse").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: motDePasse
    });

    if (error) {
        alert("❌ Email ou mot de passe incorrect");
        console.error(error);
        return;
    }

    // Connexion réussie
   
    window.location.href = "admin.html";
}

function voirMotDePasse() {

    const champ = document.getElementById("motdepasse");

    if (champ.type === "password") {
        champ.type = "text";
    } else {
        champ.type = "password";
    }

}