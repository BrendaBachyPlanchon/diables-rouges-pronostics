console.log("💬 communaute.js chargé");

let zoneEcriture =
    document.getElementById("zone-ecriture-commentaire");

let champCommentaire =
    document.getElementById("nouveau-commentaire");

let boutonCommentaire =
    document.getElementById("envoyer-commentaire");

let messageCommentaire =
    document.getElementById("message-commentaire");

console.log("📝 Zone commentaire :", zoneEcriture);
console.log("✏️ Champ commentaire :", champCommentaire);
console.log("🔘 Bouton commentaire :", boutonCommentaire);

boutonCommentaire.addEventListener("click", function() {

    let texte = champCommentaire.value.trim();

    console.log("📝 Commentaire saisi :", texte);

});

async function verifierSupporterConnecte() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    if (error) {

        console.error(
            "❌ Erreur récupération utilisateur :",
            error
        );

        return;
    }

    if (!user) {

        console.log(
            "ℹ️ Aucun supporter connecté."
        );

        return;
    }

    console.log(
        "🆔 Supporter connecté :",
        user.id
    );

}

verifierSupporterConnecte();