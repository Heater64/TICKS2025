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
    const activity = ""; // Actividad fija
    const place = document.getElementById("placeSelect").value || "Sin lugar";
    const withWhat = document.getElementById("withInput").value.trim() || "Sin especificar";

    if (place && withWhat) {
        const entry = { 
            activity, 
            place, 
            withWhat, 
            date: new Date().toLocaleString() 
        };
        let history = JSON.parse(localStorage.getItem("history")) || [];
        history.push(entry);
        localStorage.setItem("history", JSON.stringify(history));
        loadHistory();
        closeTickModal();
    } else {
        alert("Por favor, completa todos los campos antes de registrar.");
    }
}


function loadHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.forEach(entry => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${entry.activity}</strong> En ${entry.place} con ${entry.withWhat} <br> <small>${entry.date}</small>`;
        historyList.appendChild(li);
    });

    // Generar resumen después de cargar el historial
    generateSummary();
}


function addTick() {
    const activity = ""; // Actividad fija
    const place = document.getElementById("placeSelect").value || "Sin lugar";
    const withWhat = document.getElementById("withInput").value.trim() || "Sin especificar";

    if (place && withWhat) {
        const entry = { 
            activity, 
            place, 
            withWhat, 
            date: new Date().toLocaleString() 
        };
        let history = JSON.parse(localStorage.getItem("history")) || [];
        history.push(entry);
        localStorage.setItem("history", JSON.stringify(history));
        loadHistory();
        closeTickModal();
    } else {
        alert("Por favor, completa todos los campos antes de registrar.");
    }
}

function generateSummary() {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    const activityCount = history.length;

    // Contadores para lugares y con qué
    const placeCount = {};
    const withCount = {};

    history.forEach(entry => {
        // Contar lugares
        if (entry.place) {
            placeCount[entry.place] = (placeCount[entry.place] || 0) + 1;
        }

        // Contar "con qué"
        if (entry.withWhat) {
            withCount[entry.withWhat] = (withCount[entry.withWhat] || 0) + 1;
        }
    });

    // Ordenar los lugares y "con qué" por frecuencia
    const sortedPlaces = Object.entries(placeCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3); // Top 3 lugares
    const sortedWiths = Object.entries(withCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3); // Top 3 "con qué"

    // Mostrar resumen en el DOM
    const summaryContainer = document.getElementById("summary");
    summaryContainer.innerHTML = `
        <h3>Resumen</h3>
        <p><strong>Total de ✅:</strong> ${activityCount}</p>
        <p><strong>Top 3 Lugares más concurridos:</strong></p>
        <ul>
            ${sortedPlaces.map(([place, count]) => `<li>${place}: ${count} veces</li>`).join("")}
        </ul>
        <p><strong>Top 3 Con qué:</strong></p>
        <ul>
            ${sortedWiths.map(([withWhat, count]) => `<li>${withWhat}: ${count} veces</li>`).join("")}
        </ul>
    `;
}

