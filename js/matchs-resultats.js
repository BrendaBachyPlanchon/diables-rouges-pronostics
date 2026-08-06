function afficherMatchsResultats() {

    let tableau = document.getElementById("table-resultats");

    if (!tableau) return;

    let matchsAdmin = JSON.parse(localStorage.getItem("matchsAdmin")) || [];

    matchsAdmin.forEach(function(match) {

        tableau.innerHTML +=

        "<tr>" +

        "<td>" + match.equipe1 + " - " + match.equipe2 + "</td>" +

        "<td>" + match.date + "</td>" +

        "<td>" + match.heure + "</td>" +

        "<td>" + match.competition + "</td>" +

        "<td>⏳ À venir</td>" +

        "</tr>";

    });

}

afficherMatchsResultats();