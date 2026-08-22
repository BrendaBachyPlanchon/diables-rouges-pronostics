// ==========================================
// GESTION DES ACTUALITÉS - ADMINISTRATION
// ==========================================

let boutonAjouterActualite =
    document.getElementById(
        "ajouter-actualite-admin"
    );


if (boutonAjouterActualite) {

    boutonAjouterActualite.addEventListener(
        "click",
        async function() {

            try {

                // ==========================================
                // RÉCUPÉRER LES CHAMPS
                // ==========================================

                let titre =
                    document.getElementById(
                        "titre-actualite-admin"
                    ).value.trim();


                let contenu =
                    document.getElementById(
                        "contenu-actualite-admin"
                    ).value.trim();


                let categorie =
                    document.getElementById(
                        "categorie-actualite-admin"
                    ).value;


                let image =
                    document.getElementById(
                        "image-actualite-admin"
                    ).value.trim();


                let publiee =
                    document.getElementById(
                        "publiee-actualite-admin"
                    ).checked;


                // ==========================================
                // VÉRIFICATION
                // ==========================================

                if (!titre) {

                    alert(
                        "⚠️ Veuillez indiquer un titre."
                    );

                    return;

                }


                if (!contenu) {

                    alert(
                        "⚠️ Veuillez écrire le contenu."
                    );

                    return;

                }


                if (!categorie) {

                    alert(
                        "⚠️ Veuillez choisir une catégorie."
                    );

                    return;

                }


                // ==========================================
                // ENREGISTRER DANS SUPABASE
                // ==========================================

                let insertion =
                    await supabaseClient
                        .from("actualites")
                        .insert([

                            {

                                titre:
                                    titre,

                                contenu:
                                    contenu,

                                categorie:
                                    categorie,

                                image:
                                    image,

                                publiee:
                                    publiee

                            }

                        ]);


                // ==========================================
                // VÉRIFIER L'ERREUR
                // ==========================================

                if (insertion.error) {

                    console.error(
                        "❌ Erreur ajout actualité :",
                        insertion.error
                    );

                    alert(
                        "❌ Impossible de publier l'actualité."
                    );

                    return;

                }


                // ==========================================
                // SUCCÈS
                // ==========================================

                console.log(
                    "✅ Actualité enregistrée dans Supabase !"
                );


                alert(
                    "✅ Actualité publiée avec succès !"
                );


                // ==========================================
                // VIDER LE FORMULAIRE
                // ==========================================

                document.getElementById(
                    "titre-actualite-admin"
                ).value = "";


                document.getElementById(
                    "contenu-actualite-admin"
                ).value = "";


                document.getElementById(
                    "categorie-actualite-admin"
                ).value = "";


                document.getElementById(
                    "image-actualite-admin"
                ).value = "";


                document.getElementById(
                    "publiee-actualite-admin"
                ).checked = true;


            }

            catch (erreur) {

                console.error(
                    "❌ Erreur complète actualité :",
                    erreur
                );

                alert(
                    "❌ Une erreur est survenue."
                );

            }

        }
    );

}