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

// HTML elemek kiválasztása
const colorType = document.getElementById("colorType");
const colorPicker1 = document.getElementById("colorPicker1");
const colorPicker2 = document.getElementById("colorPicker2");
const polo = document.querySelector(".polo");
const size = document.getElementById("size");
const poloButton = document.querySelector(".poloButton");


// Oldal betöltésekor töltse be az elmentett értékeket
window.onload = function () {
    // Betöltjük az elmentett értékeket
    const savedType = localStorage.getItem("poloColorType") || "solid";
    const savedColor1 = localStorage.getItem("poloColor1") || "#ffffff";
    const savedColor2 = localStorage.getItem("poloColor2") || "#000000";
    const savedSize = localStorage.getItem("savedSize") || "m";
    const savedLogoState = localStorage.getItem("logoChecked");

    // Beállítjuk a kiválasztott típus és színek értékét
    colorType.value = savedType;
    colorPicker1.value = savedColor1;
    colorPicker2.value = savedColor2;
    size.value = savedSize;

    // A logó checkbox állapotát is beállítjuk
    const logoCheckbox = document.getElementById("logoCheckbox");
    const logoDiv = document.querySelector(".overlay-image");
    if (savedLogoState === "true") {
        logoCheckbox.checked = true;
        logoDiv.style.display = "block";
    } else {
        logoCheckbox.checked = false;
        logoDiv.style.display = "none";
    }

    // Megfelelő nézetet és hátteret állít be
    updateUI();

    // Betöltjük a mentett .overlay-image width-et
    const savedWidth = localStorage.getItem("overlayImageWidth");
    if (savedWidth) {
        document.querySelector(".overlay-image").style.width = savedWidth + "px";
    }

    // Betöltjük a mentett osztályt
    const savedClass = localStorage.getItem("overlayImageClass");
    if (savedClass) {
        document.querySelector(".overlay-image").classList.add(savedClass);
    }
};

// Színtípus változás eseményfigyelő
colorType.addEventListener("change", function () {
    updateUI();
    saveToLocalStorage();
});

// Színek élő frissítése
colorPicker1.addEventListener("input", updateBackground);
colorPicker2.addEventListener("input", updateBackground);

// Színek mentése csak akkor, ha a felhasználó kikattint a színválasztóból
colorPicker1.addEventListener("change", saveToLocalStorage);
colorPicker2.addEventListener("change", saveToLocalStorage);
size.addEventListener("change", saveToLocalStorage);

// UI frissítése a választás alapján
function updateUI() {
    if (colorType.value === "solid") {
        colorPicker1.style.display = "inline-block";
        colorPicker2.style.display = "none";
    } else {
        colorPicker1.style.display = "inline-block";
        colorPicker2.style.display = "inline-block";
    }
    updateBackground();
}

// Háttér frissítése
function updateBackground() {
    if (colorType.value === "solid") {
        polo.style.background = colorPicker1.value;
    } else {
        polo.style.background = `linear-gradient(to bottom, ${colorPicker1.value}, ${colorPicker2.value})`;
    }
}

// Értékek mentése LocalStorage-be
function saveToLocalStorage() {
    localStorage.setItem("poloColorType", colorType.value);
    localStorage.setItem("poloColor1", colorPicker1.value);
    localStorage.setItem("poloColor2", colorPicker2.value);
    localStorage.setItem("savedSize", size.value);
}

// Ellenőrizzük, hogy van-e mentett érték a localStorage-ban
const logoCheckbox = document.getElementById("logoCheckbox");
const logoDiv = document.querySelector(".overlay-image");

// A checkbox állapotának változása
logoCheckbox.addEventListener("change", function () {
    let element = document.querySelector(".overlay-image");
    element.style.width = "30%";

    if (logoCheckbox.checked) {
        logoDiv.style.display = "block";
        localStorage.setItem("logoChecked", "true"); // Elmentjük az állapotot
    } else {
        logoDiv.style.display = "none";
        localStorage.setItem("logoChecked", "false"); // Elmentjük az állapotot
    }
});

poloButton.addEventListener("click", function () {
    poloButton.classList.add("activeButton"); // Add active class
    poloButton.innerText = "Hozzáadva"; // Change button text
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // 3 másodperc múlva eltávolítjuk az activeButton osztályt és visszaállítjuk a gomb szövegét
    setTimeout(async function () {
        poloButton.classList.remove("activeButton"); // Remove active class
        await sleep(500);
        poloButton.innerText = "KOSÁRBA"; // Restore original button text
    }, 3000); // 3000ms = 3 másodperc
});

document.getElementById("increase").addEventListener("click", function () {
    // Az elem szélességének lekérése
    let element = document.querySelector(".overlay-image");
    let currentWidth = element.offsetWidth;

    // Új szélesség kiszámítása, növelve 5%-kal
    if (currentWidth <= 150) {
        let newWidth = currentWidth * 1.05;
        element.style.width = newWidth + "px";

        // Mentjük a szélességet a localStorage-ba
        localStorage.setItem("overlayImageWidth", newWidth);
    }
});

document.getElementById("decrease").addEventListener("click", function () {
    // Az elem szélességének lekérése
    let element = document.querySelector(".overlay-image");
    let currentWidth = element.offsetWidth;

    // Új szélesség kiszámítása, csökkentve 5%-kal
    if (currentWidth >= 60) {
        let newWidth = currentWidth * 0.95;
        element.style.width = newWidth + "px";

        // Mentjük a szélességet a localStorage-ba
        localStorage.setItem("overlayImageWidth", newWidth);
    }
});
document.addEventListener("DOMContentLoaded", function () {
	const carousel = document.querySelector("#carouselExample");

	carousel.addEventListener("slide.bs.carousel", function (event) {
		const nextSlide = event.relatedTarget;
		nextSlide.style.filter = "blur(3px)";
		setTimeout(() => {
			nextSlide.style.filter = "blur(0px)";
		}, 300);
	});
});
document.getElementById("deleteButton").addEventListener("click", function () {
    const elements = document.querySelectorAll(".secondary-container");
    const hr = document.querySelectorAll(".hr");
    const div = document.querySelectorAll(".transform-div");
    const container = document.querySelectorAll(".container-fluid");
    elements.forEach(el => el.style.display = "none");
    hr.forEach(el => el.style.width = "100%");
    div.forEach(el => el.classList.remove("col-sm-8"));
    div.forEach(el => el.classList.toggle("col-sm-12"));
    container.forEach(el => el.classList.remove("container-fluid"));
    container.forEach(el => el.classList.toggle("container"));
    open = document.getElementById("open");
    open.style.display = "block";
});

document.getElementById("open").addEventListener("click", function () {
    const elements = document.querySelectorAll(".secondary-container");
    const hr = document.querySelectorAll(".hr");
    const div = document.querySelectorAll(".transform-div");
    const container = document.querySelectorAll(".container");
    elements.forEach(el => el.style.display = "block");
    hr.forEach(el => el.style.width = "67%");
    div.forEach(el => el.classList.remove("col-sm-12"));
    div.forEach(el => el.classList.toggle("col-sm-8"));
    container.forEach(el => el.classList.remove("container"));
    container.forEach(el => el.classList.toggle("container-fluid"));
    open = document.getElementById("open");
    open.style.display = "none";
});