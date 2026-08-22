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

    console.log("🖱️ Bouton commentaire cliqué");

});