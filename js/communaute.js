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

boutonCommentaire.addEventListener("click", async function() {

    let texte = champCommentaire.value.trim();

    if (!texte) {

        console.log("⚠️ Aucun commentaire saisi");

        return;
    }

    const {
        data: { user },
        error: authError
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {

        console.error(
            "❌ Aucun supporter connecté"
        );

        return;
    }

    let supporterId = user.id;

    let pseudo =
        localStorage.getItem("pseudoActuel") ||
        "Supporter";

    let avatar =
        localStorage.getItem("avatarSupporter") ||
        null;

    console.log(
        "💬 Enregistrement commentaire pour :",
        pseudo
    );

    const resultat =
        await supabaseClient
            .from("commentaires")
            .insert({

                supporter_id: supporterId,
                pseudo: pseudo,
                avatar: avatar,
                commentaire: texte

            });

    if (resultat.error) {

        console.error(
            "❌ Erreur enregistrement commentaire :",
            resultat.error
        );

        return;
    }

    console.log(
        "✅ Commentaire enregistré dans Supabase !"
    );

    champCommentaire.value = "";

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

async function chargerCommentaires() {

    const resultat =
        await supabaseClient
            .from("commentaires")
            .select("*")
            .order("created_at", {
                ascending: false
            });

    if (resultat.error) {

        console.error(
            "❌ Erreur chargement commentaires :",
            resultat.error
        );

        return;
    }

   let zoneCommentaires =
    document.getElementById("zone-commentaires");

if (!zoneCommentaires) {
    return;
}

zoneCommentaires.innerHTML = "";

resultat.data.forEach(function(commentaire) {

    zoneCommentaires.innerHTML +=

        '<div class="carte">' +

        '<strong>👤 ' +
        (commentaire.pseudo || "Supporter") +
        '</strong>' +

        '<p>' +
        commentaire.commentaire +
        '</p>' +

        '</div>';

});

}

chargerCommentaires();