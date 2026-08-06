// Compte à rebours dynamique

function calculerPoints(pronosticBelgique, pronosticAdversaire, resultatBelgique, resultatAdversaire) {

    if (
        pronosticBelgique == resultatBelgique &&
        pronosticAdversaire == resultatAdversaire
    ) {
        return 3;
    }


    let pronosticGagnant =
    pronosticBelgique > pronosticAdversaire ? "Belgique" :
    pronosticBelgique < pronosticAdversaire ? "Adversaire" :
    "Nul";


    let resultatGagnant =
    resultatBelgique > resultatAdversaire ? "Belgique" :
    resultatBelgique < resultatAdversaire ? "Adversaire" :
    "Nul";


    if (pronosticGagnant == resultatGagnant) {
        return 1;
    }


    return 0;

}

// Changement automatique du match

function effacerPronostics() {

    localStorage.removeItem("pronostics");

    alert("✅ Les anciens pronostics ont été supprimés");

    location.reload();

}

// Menu mobile

let boutonMenu = document.getElementById("bouton-menu");
let menuNavigation = document.querySelector("nav");

if (boutonMenu) {

    boutonMenu.addEventListener("click", function() {

        menuNavigation.classList.toggle("menu-ouvert");

    });

}// Sous-menu Plus

let boutonPlus = document.querySelector(".plus-mobile");
let menuPlus = document.getElementById("menu-plus");

if (boutonPlus) {

    boutonPlus.addEventListener("click", function() {

        menuPlus.classList.toggle("ouvert");

    });

}