const days = {
    es: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
};

let currentLang = "es";

document.getElementById("switch-lang").addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    updateTableHeaders();
    cargarCalendario();
});

function updateTableHeaders() {
    const table = document.getElementById("schedule-table");
    const headers = table.getElementsByTagName("th");
    days[currentLang].forEach((day, i) => {
        headers[i].textContent = day;
    });
}

function cargarCalendario() {
    fetch(currentLang + '.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('calendario');
            let htmlContent = '<ul>';
            data.forEach(item => {
                htmlContent += `<li>${item.name}</li>`;
            });
            htmlContent += '</ul>';
            container.innerHTML = htmlContent;
        })
        .catch(error => console.error('Error cargando el JSON:', error));
}

// Inicializar al cargar la página
updateTableHeaders();
cargarCalendario();