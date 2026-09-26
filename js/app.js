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

cargar();