// ==========================================
// AUTHENTIFICATION DES SUPPORTERS
// VERSION SUPABASE AUTH
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const emailInput =
        document.getElementById("email-supporter");

    const motDePasseInput =
        document.getElementById("motdepasse-supporter");

    const boutonVoirMotDePasse =
        document.getElementById("voir-mot-de-passe");

    const boutonConnexion =
        document.getElementById("connexion-supporter");

    const boutonInscription =
        document.getElementById("inscription-supporter");

    const boutonDeconnexion =
        document.getElementById("deconnexion-supporter");

    const messageAuth =
        document.getElementById("message-auth");


    if (
        !emailInput ||
        !motDePasseInput ||
        !boutonConnexion ||
        !boutonInscription ||
        !boutonDeconnexion
    ) {

        console.error(
            "❌ Éléments de connexion supporter introuvables."
        );

        return;

    }

     // ==========================================
    // AFFICHER / MASQUER LE MOT DE PASSE
    // ==========================================

if (boutonVoirMotDePasse) {

    boutonVoirMotDePasse.addEventListener(
        "click",
        function() {

            if (
                motDePasseInput.type ===
                "password"
            ) {

                motDePasseInput.type =
                    "text";

                boutonVoirMotDePasse.innerText =
                    "🙈";

            } else {

                motDePasseInput.type =
                    "password";

                boutonVoirMotDePasse.innerText =
                    "👁️";

            }

        }
    );

}

    // ==========================================
    // AFFICHER L'ÉTAT DE CONNEXION
    // ==========================================

    async function verifierConnexion() {

        const resultat =
            await supabaseClient.auth.getUser();


        if (resultat.error) {

            console.error(
                "❌ Erreur vérification connexion :",
                resultat.error
            );

            afficherDeconnecte();

            return;

        }


        const user =
            resultat.data.user;


        if (!user) {

            afficherDeconnecte();

            return;

        }


        console.log(
            "✅ Supporter connecté :",
            user.email
        );


        localStorage.setItem(
            "supporterId",
            user.id
        );


        afficherConnecte(user);

    }


    // ==========================================
    // AFFICHER CONNECTÉ
    // ==========================================

    function afficherConnecte(user) {

        messageAuth.innerHTML =
            "✅ <b>Tu es connecté !</b><br>" +
            "Compte : " +
            user.email;


        emailInput.style.display =
            "none";

        motDePasseInput.style.display =
            "none";

        boutonConnexion.style.display =
            "none";

        boutonInscription.style.display =
            "none";

        boutonDeconnexion.style.display =
            "inline-block";

    }


    // ==========================================
    // AFFICHER DÉCONNECTÉ
    // ==========================================

    function afficherDeconnecte() {

        messageAuth.innerHTML =
            "Connecte-toi ou crée ton compte pour participer aux pronostics.";


        emailInput.style.display =
            "inline-block";

        motDePasseInput.style.display =
            "inline-block";

        boutonConnexion.style.display =
            "inline-block";

        boutonInscription.style.display =
            "inline-block";

        boutonDeconnexion.style.display =
            "none";

    }


    // ==========================================
    // CRÉER LE PROFIL SUPPORTER
    // ==========================================

    async function creerProfilSupporter(user, pseudoChoisi) {

        const supporterId =
            user.id;


       let pseudo =
    pseudoChoisi ||
    localStorage.getItem(
        "pseudoActuel"
    ) ||
    "Supporter";


        let avatar =
            localStorage.getItem(
                "avatarSupporter"
            ) || "avatar1.png";


        const recherche =
            await supabaseClient
                .from("supporters")
                .select("supporter_id")
                .eq(
                    "supporter_id",
                    supporterId
                )
                .maybeSingle();


        if (recherche.error) {

            console.error(
                "❌ Erreur recherche profil supporter :",
                recherche.error
            );

            return false;

        }


        if (!recherche.data) {

            const insertion =
                await supabaseClient
                    .from("supporters")
                    .insert({

                        supporter_id:
                            supporterId,

                        pseudo:
                            pseudo,

                        avatar:
                            avatar

                    });


            if (insertion.error) {

                console.error(
                    "❌ Erreur création profil supporter :",
                    insertion.error
                );

                return false;

            }


            console.log(
                "✅ Profil supporter créé !"
            );

        }


        localStorage.setItem(
            "supporterId",
            supporterId
        );


        return true;

    }


    // ==========================================
    // CONNEXION
    // ==========================================

    boutonConnexion.addEventListener(
        "click",
        async function () {

            const email =
                emailInput.value.trim();

            const password =
                motDePasseInput.value;


            if (!email || !password) {

                alert(
                    "⚠️ Veuillez indiquer votre adresse e-mail et votre mot de passe."
                );

                return;

            }


            boutonConnexion.disabled =
                true;


            messageAuth.innerText =
                "🔐 Connexion en cours...";


            const resultat =
                await supabaseClient.auth.signInWithPassword({

                    email:
                        email,

                    password:
                        password

                });


            boutonConnexion.disabled =
                false;


            if (resultat.error) {

                console.error(
                    "❌ Erreur connexion :",
                    resultat.error
                );


                messageAuth.innerHTML =
                    "❌ " +
                    resultat.error.message;


                return;

            }


            const user =
                resultat.data.user;


            const profilOK =
                await creerProfilSupporter(
                    user
                );


            if (!profilOK) {

                alert(
                    "⚠️ Connexion réussie, mais impossible de charger ton profil supporter."
                );

                return;

            }


            alert(
                "✅ Connexion réussie !"
            );


            afficherConnecte(user);


            // Recharger les informations du profil
            if (
                typeof afficherProfil ===
                "function"
            ) {

                afficherProfil();

            }

        }
    );


    // ==========================================
    // INSCRIPTION
    // ==========================================

    boutonInscription.addEventListener(
        "click",
        async function () {

             const pseudoInput =
                 document.getElementById("pseudo-supporter");

             const pseudo =
                  pseudoInput
                      ? pseudoInput.value.trim()
                      : "";

           const email =
    emailInput.value.trim();

const password =
    motDePasseInput.value;


// ==========================================
// VÉRIFIER LES INFORMATIONS
// ==========================================

if (!pseudo || !email || !password) {

    alert(
        "⚠️ Veuillez indiquer ton pseudo, ton adresse e-mail et ton mot de passe."
    );

    return;

}


if (pseudo.length < 2) {

    alert(
        "⚠️ Ton pseudo doit contenir au moins 2 caractères."
    );

    return;

}


if (password.length < 6) {

    alert(
        "⚠️ Le mot de passe doit contenir au moins 6 caractères."
    );

    return;

}


// ==========================================
// MÉMORISER LE PSEUDO
// ==========================================

localStorage.setItem(
    "pseudoActuel",
    pseudo
);

            boutonInscription.disabled =
                true;


            messageAuth.innerText =
                "🆕 Création de ton compte...";


            const resultat =
                await supabaseClient.auth.signUp({

                    email:
                        email,

                    password:
                        password

                });


            boutonInscription.disabled =
                false;


            if (resultat.error) {

                console.error(
                    "❌ Erreur inscription :",
                    resultat.error
                );


                messageAuth.innerHTML =
                    "❌ " +
                    resultat.error.message;


                return;

            }


            console.log(
                "✅ Compte Supabase créé :",
                resultat.data.user
            );


            // ==========================================
            // EMAIL DE CONFIRMATION
            // ==========================================

            if (
                !resultat.data.session
            ) {

                messageAuth.innerHTML =
                    "📧 <b>Compte créé !</b><br><br>" +
                    "Un e-mail de confirmation vient de t'être envoyé.<br>" +
                    "Clique sur le lien reçu pour confirmer ton adresse e-mail, " +
                    "puis reviens ici pour te connecter.";

                alert(
                    "📧 Ton compte a été créé ! Vérifie ton e-mail pour confirmer ton adresse."
                );

                return;

            }


            // ==========================================
            // SI LA CONFIRMATION N'EST PAS REQUISE
            // ==========================================

            const user =
                resultat.data.user;


           const profilOK =
    await creerProfilSupporter(
        user,
        pseudo
    );


            if (!profilOK) {

                alert(
                    "⚠️ Compte créé, mais impossible de créer ton profil supporter."
                );

                return;

            }


            afficherConnecte(user);


            if (
                typeof afficherProfil ===
                "function"
            ) {

                afficherProfil();

            }


            alert(
                "✅ Ton compte supporter est créé !"
            );

        }
    );


    // ==========================================
    // DÉCONNEXION
    // ==========================================

    boutonDeconnexion.addEventListener(
        "click",
        async function () {

            const resultat =
                await supabaseClient.auth.signOut();


            if (resultat.error) {

                console.error(
                    "❌ Erreur déconnexion :",
                    resultat.error
                );

                alert(
                    "❌ Impossible de se déconnecter."
                );

                return;

            }


            localStorage.removeItem(
                "supporterId"
            );


            afficherDeconnecte();


            alert(
                "👋 Tu es maintenant déconnecté."
            );

        }
    );


    // ==========================================
    // SURVEILLER LES CHANGEMENTS DE SESSION
    // ==========================================

    supabaseClient.auth.onAuthStateChange(
        function (event, session) {

            console.log(
                "🔐 Auth Supabase :",
                event
            );


            if (session && session.user) {

                localStorage.setItem(
                    "supporterId",
                    session.user.id
                );

                afficherConnecte(
                    session.user
                );

            } else {

                localStorage.removeItem(
                    "supporterId"
                );

                afficherDeconnecte();

            }

        }
    );


    // ==========================================
    // VÉRIFICATION AU CHARGEMENT
    // ==========================================

    verifierConnexion();

});