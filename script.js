document.addEventListener("DOMContentLoaded", () => {
    loadPlaces();
    loadHistory();
});

function showTickModal() {
    document.getElementById("tickModal").style.display = "flex";
}

function closeTickModal() {
    document.getElementById("tickModal").style.display = "none";
}

function addPlace() {
    const newPlace = document.getElementById("newPlace").value.trim();
    if (newPlace) {
        let places = JSON.parse(localStorage.getItem("places")) || [];
        places.push(newPlace);
        localStorage.setItem("places", JSON.stringify(places));
        loadPlaces();
        document.getElementById("newPlace").value = "";
    }
}

function loadPlaces() {
    const placeSelect = document.getElementById("placeSelect");
    placeSelect.innerHTML = "";
    let places = JSON.parse(localStorage.getItem("places")) || [];
    places.forEach(place => {
        let option = document.createElement("option");
        option.value = place;
        option.textContent = place;
        placeSelect.appendChild(option);
    });
}

function addTick() {
    const place = document.getElementById("placeSelect").value;
    const withWhat = document.getElementById("withInput").value.trim();
    if (place && withWhat) {
        const entry = { place, withWhat, date: new Date().toLocaleString() };
        let history = JSON.parse(localStorage.getItem("history")) || [];
        history.push(entry);
        localStorage.setItem("history", JSON.stringify(history));
        loadHistory();
        closeTickModal();
    }
}

function loadHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";  // Limpiar la lista antes de recargarla
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.forEach(entry => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${entry.place}</strong> con ${entry.withWhat} <br> <small>${entry.date}</small>`;
        li.style.opacity = 1;  // Asegurarse de que la opacidad sea 1 cuando se añade el nuevo elemento
        li.style.transform = 'translateY(0)';  // Evitar el desplazamiento
        historyList.appendChild(li);
    });
}
