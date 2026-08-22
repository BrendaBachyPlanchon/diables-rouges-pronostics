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

       '<div>' +

(
    commentaire.avatar
        ? '<img src="images/avatars/' +
          commentaire.avatar +
          '" width="40" height="40" style="border-radius:50%; object-fit:cover;">'
        : '👤'
) +

     '<strong> ' +
     (commentaire.pseudo || "Supporter") +
     '</strong>' +

     '</div>' +

        '<p>' +
        commentaire.commentaire +
        '</p>' +

      '<small>' +
new Date(commentaire.created_at).toLocaleString("fr-BE") +
'</small>' +

(
    commentaire.supporter_id ===
    localStorage.getItem("supporterId")
        ? '<br><button class="supprimer-commentaire" data-id="' +
          commentaire.id +
          '">🗑️ Supprimer</button>'
        : ''
) +

'</div>';

});

}

chargerCommentaires();

document.addEventListener("click", async function(e) {

    if (
        e.target.classList.contains(
            "supprimer-commentaire"
        )
    ) {

        const commentaireId =
            e.target.dataset.id;

        const confirmation =
            confirm(
                "🗑️ Veux-tu vraiment supprimer ce commentaire ?"
            );

        if (!confirmation) {

            return;
        }

        const resultat =
            await supabaseClient
                .from("commentaires")
                .delete()
                .eq("id", commentaireId);

        if (resultat.error) {

            console.error(
                "❌ Erreur suppression commentaire :",
                resultat.error
            );

            return;
        }

        console.log(
            "✅ Commentaire supprimé !"
        );

        chargerCommentaires();

    }

});