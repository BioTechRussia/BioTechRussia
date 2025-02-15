document.addEventListener("DOMContentLoaded", function () {
    let cookiesBox = document.querySelector(".cookiek");

    // Ellenőrizzük, hogy már el lett-e tüntetve
    if (localStorage.getItem("cookiesAccepted") === "true") {
        cookiesBox.style.display = "none";
    }

    document.getElementById("igen").addEventListener("click", function () {
        let checkbox = document.getElementById("not-robot");

        if (checkbox.checked) {
            cookiesBox.style.display = "none";
            localStorage.setItem("cookiesAccepted", "true"); // Mentés a localStorage-be
        } else {
            alert("Előbb pipáld be, hogy nem vagy ipari kém!");
        }
    });

    document.getElementById("nem").addEventListener("click", function () {
        window.open("https://www.google.com", "_self");
    });
});
// Ellenőrizzük, hogy van-e mentett változó a localStorage-ban
var myVariable = localStorage.getItem('myVariable');

// Ha nincs, akkor 0-ra állítjuk
if (myVariable === null) {
    myVariable = 0;
}

// Megjelenítjük a változó értékét
document.getElementById("number").innerText = myVariable;

// Példa a változó módosítására és mentésére
function changeVariable() {
    myVariable++;
    localStorage.setItem('myVariable', myVariable); // Új érték mentése
    document.getElementById("number").innerText = + myVariable;
}
function zeroVariable() {
    myVariable = 0;
    localStorage.setItem('myVariable', myVariable); // Új érték mentése
    document.getElementById("number").innerText = + myVariable;
}
