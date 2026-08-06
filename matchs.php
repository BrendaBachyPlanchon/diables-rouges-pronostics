<?php

header("Content-Type: application/json; charset=utf-8");

$chemin = __DIR__ . "/matchs.json";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $donnees = file_get_contents("php://input");

    if ($donnees !== false && trim($donnees) !== "") {

        json_decode($donnees);

        if (json_last_error() === JSON_ERROR_NONE) {

            file_put_contents($chemin, $donnees);

            echo json_encode([
                "success" => true,
                "message" => "Matchs enregistrés"
            ]);

            exit;

        }

    }

    echo json_encode([
        "success" => false,
        "message" => "Données invalides"
    ]);

    exit;
}


if (!file_exists($chemin)) {

    file_put_contents($chemin, "[]");

}


echo file_get_contents($chemin);

?>