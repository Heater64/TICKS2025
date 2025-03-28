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
    const activity = document.getElementById("activityInput").value.trim();
    const place = document.getElementById("placeSelect").value;
    const withWhat = document.getElementById("withInput").value.trim();
    if (activity) {
        const entry = { activity, place, withWhat, date: new Date().toLocaleString() };
        let history = JSON.parse(localStorage.getItem("history")) || [];
        history.push(entry);
        localStorage.setItem("history", JSON.stringify(history));
        loadHistory();
        closeTickModal();
    }
}

function loadHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.forEach(entry => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${entry.activity}</strong> en ${entry.place} con ${entry.withWhat} <br> <small>${entry.date}</small>`;
        historyList.appendChild(li);
    });
}
