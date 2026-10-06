async function cargar() {
    // Traer datos y convertirlos en JS
    const respuesta = await fetch("data/rutina.json");
    const datos = await respuesta.json();
    
    // Para cada sección de rutina sacaremos el primer nivel
    datos.rutina.forEach(area => {

        // Filtrar y quitar el ejercicio opcional
        const ejerciciosBase = area.ejercicios.filter(o => !o.opcional);

        // Sacar el primer ejercicio de cada sección
        let ejerciciosHoy;
        if (area.modo === "solo_uno") {
            ejerciciosHoy = [area.ejercicios[0]];
        } else { // Obtener los ejercicios base sin opcional
            ejerciciosHoy = ejerciciosBase;
        }
        
        // Junta solo el area y los nombres de los ejercicios
        const ejerciciosUnidos = ejerciciosHoy.map(m => m.nombre);
        const ejerciciosTexto = ejerciciosUnidos.join(", ");
        console.log(`${area.area}: ${ejerciciosTexto}`);
    });
}

function pintarHoy() {
    // Obtener fecha de hoy
    const ahoraDia = new Date().toLocaleDateString("es-CO", { weekday: "long" });
    // Mayuscula del día
    const diaMayus = ahoraDia[0].toUpperCase() + ahoraDia.slice(1);

    // Obtener semana / Fecha de inicio, si es la primera vez, guardarla o leerla
    let inicioTexto = localStorage.getItem("fechaInicio");
    if (inicioTexto === null) {
        inicioTexto = new Date().toISOString();
        localStorage.setItem("fechaInicio", inicioTexto);
    }
    // Calcular la semana
    const inicio = new Date(inicioTexto);
    inicio.setHours(0, 0, 0, 0); // Ajustar a hora 0
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const dias = (hoy - inicio) / (1000 * 60 * 60 * 24);
    const semana = Math.min(Math.floor(dias / 7) +1, 12);

    // Obtener nombre
    const nombre = localStorage.getItem("nombre") ?? "Héroe";

    // Pintar en el HTML
    document.getElementById("hoy-fecha").textContent = `${diaMayus} · Semana ${semana} de 12`;
    document.getElementById("hoy-nombre").textContent = nombre;
}

cargar();
pintarHoy();

// Mostrar pantallas
function mostrarPantalla(id) {
    // Ocultar todas las pantallas
    document.querySelectorAll(".pantalla").forEach(p => p.hidden = true);
    // Mostrar pantalla solicitada
    document.getElementById(id).hidden = false;
    // Navegacion no se muestra en ajustes
    document.querySelector(".nav").hidden = (id === "pantalla-ajustes");
}

// Cambiar nombre en Ajustes
const campoNombre = document.getElementById("campo-nombre");

campoNombre.addEventListener("input", () => {
    const texto = campoNombre.value.trim();

    if (texto === "") {
        localStorage.removeItem("nombre");
    } else {
        localStorage.setItem("nombre", texto);
    }

    pintarHoy();
})


// Navegacion
document.getElementById("btn-ajustes").addEventListener("click", () => {
    campoNombre.value = localStorage.getItem("nombre") ?? "";
    mostrarPantalla("pantalla-ajustes");
});
    
document.getElementById("btn-volver").addEventListener("click", () => mostrarPantalla("pantalla-hoy"));