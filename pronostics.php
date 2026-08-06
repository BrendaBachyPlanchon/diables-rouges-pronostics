<?php

header("Content-Type: application/json; charset=utf-8");

$chemin = __DIR__ . "/pronostics.json";


// ==========================================
// CREER LE FICHIER S'IL N'EXISTE PAS
// ==========================================

if (!file_exists($chemin)) {
    file_put_contents($chemin, "[]");
}


// ==========================================
// ENREGISTRER UN NOUVEAU PRONOSTIC
// ==========================================

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $donnees = file_get_contents("php://input");

    if ($donnees === false || trim($donnees) === "") {

        echo json_encode([
            "success" => false,
            "message" => "Aucune donnée reçue"
        ]);

        exit;
    }


    $nouveauPronostic = json_decode($donnees, true);


    if (
        json_last_error() !== JSON_ERROR_NONE ||
        !is_array($nouveauPronostic)
    ) {

        echo json_encode([
            "success" => false,
            "message" => "Données invalides"
        ]);

        exit;
    }


    // ==========================================
    // VERIFIER LES INFORMATIONS OBLIGATOIRES
    // ==========================================

    if (
        !isset($nouveauPronostic["supporterId"]) ||
        !isset($nouveauPronostic["match"]) ||
        !isset($nouveauPronostic["joueur"])
    ) {

        echo json_encode([
            "success" => false,
            "message" => "Informations du supporter manquantes"
        ]);

        exit;
    }


    $supporterId = trim($nouveauPronostic["supporterId"]);
    $pseudo = trim($nouveauPronostic["joueur"]);

    if ($supporterId === "" || $pseudo === "") {

        echo json_encode([
            "success" => false,
            "message" => "Le pseudo est obligatoire"
        ]);

        exit;
    }


    // ==========================================
    // NORMALISER LE PSEUDO
    // ==========================================

    $pseudoNormalise = mb_strtolower(
        $pseudo,
        "UTF-8"
    );


    // ==========================================
    // CHARGER LES PRONOSTICS EXISTANTS
    // ==========================================

    $pronostics = json_decode(
        file_get_contents($chemin),
        true
    );

    if (!is_array($pronostics)) {
        $pronostics = [];
    }


    // ==========================================
    // VERIFIER LE SUPPORTER
    // ==========================================

    foreach ($pronostics as $ancien) {

        if (
            isset($ancien["supporterId"]) &&
            $ancien["supporterId"] === $supporterId
        ) {

            $ancienPseudo =
                isset($ancien["joueur"])
                ? trim($ancien["joueur"])
                : "";

            $ancienPseudoNormalise =
                mb_strtolower(
                    $ancienPseudo,
                    "UTF-8"
                );


            // ==========================================
            // UN SUPPORTER = UN SEUL PSEUDO
            // ==========================================

            if (
                $ancienPseudoNormalise !==
                $pseudoNormalise
            ) {

                echo json_encode([
                    "success" => false,
                    "message" =>
                        "🔒 Ton supporter est déjà associé au pseudo \"" .
                        $ancienPseudo .
                        "\". Tu ne peux pas utiliser un autre pseudo."
                ]);

                exit;
            }

        }

    }


    // ==========================================
    // VERIFIER SI LE PSEUDO EST DEJA UTILISE
    // ==========================================

    foreach ($pronostics as $ancien) {

        if (!isset($ancien["joueur"])) {
            continue;
        }


        $ancienPseudo =
            trim($ancien["joueur"]);


        $ancienPseudoNormalise =
            mb_strtolower(
                $ancienPseudo,
                "UTF-8"
            );


        if (
            $ancienPseudoNormalise ===
            $pseudoNormalise
        ) {

            // Le pseudo appartient déjà à ce supporter
            if (
                isset($ancien["supporterId"]) &&
                $ancien["supporterId"] === $supporterId
            ) {

                continue;

            }


            // Le pseudo appartient à quelqu'un d'autre
            echo json_encode([
                "success" => false,
                "message" =>
                    "❌ Ce pseudo est déjà utilisé. Choisis un autre pseudo."
            ]);

            exit;
        }

    }


    // ==========================================
    // VERIFIER SI LE MATCH EST DEJA PRONOSTIQUE
    // ==========================================

    foreach ($pronostics as $ancien) {

        if (
            isset($ancien["supporterId"]) &&
            isset($ancien["match"]) &&
            $ancien["supporterId"] === $supporterId &&
            $ancien["match"] === $nouveauPronostic["match"]
        ) {

            echo json_encode([
                "success" => false,
                "message" =>
                    "Tu as déjà pronostiqué ce match."
            ]);

            exit;
        }

    }


    // ==========================================
    // NETTOYER LE PSEUDO AVANT ENREGISTREMENT
    // ==========================================

    $nouveauPronostic["joueur"] = $pseudo;


    // ==========================================
    // AJOUTER LE NOUVEAU PRONOSTIC
    // ==========================================

    $pronostics[] = $nouveauPronostic;


    file_put_contents(
        $chemin,
        json_encode(
            $pronostics,
            JSON_PRETTY_PRINT |
            JSON_UNESCAPED_UNICODE
        )
    );


    echo json_encode([
        "success" => true,
        "message" => "Pronostic enregistré"
    ]);

    exit;
}


// ==========================================
// AFFICHER LES PRONOSTICS
// ==========================================

echo file_get_contents($chemin);

?>
