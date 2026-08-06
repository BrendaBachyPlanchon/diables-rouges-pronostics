<?php

$actualites = [
    [
        "titre" => "Actualités des Diables Rouges",
        "date" => date("d/m/Y"),
        "source" => "Source à venir",
        "lien" => "#"
    ]
];

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Actualités - Diables Rouges Pronostics</title>
</head>

<body>

<h1>📰 Actualités des Diables Rouges</h1>

<?php foreach ($actualites as $actualite): ?>

    <article>
        <h2><?= htmlspecialchars($actualite["titre"]) ?></h2>

        <p>
            📅 <?= htmlspecialchars($actualite["date"]) ?>
            — 📰 Source : <?= htmlspecialchars($actualite["source"]) ?>
        </p>

        <a href="<?= htmlspecialchars($actualite["lien"]) ?>" target="_blank">
            Lire l'article original
        </a>
    </article>

<?php endforeach; ?>

</body>
</html>