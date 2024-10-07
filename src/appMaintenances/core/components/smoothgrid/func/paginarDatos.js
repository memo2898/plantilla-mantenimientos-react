export function paginarDatos(datos, datosPorPagina) {
   
    
    // Calculamos cuántas páginas necesitaremos
    const cantidadIteraciones = Math.ceil(datos.length / datosPorPagina);
    
    // Creamos un array para almacenar las páginas
    const paginas = [];
    
    for (let i = 0; i < cantidadIteraciones; i++) {
        // Calculamos el índice inicial y final de los datos para cada página
        const inicio = i * datosPorPagina;
        const fin = inicio + datosPorPagina;
        
        // Extraemos los datos de la página actual
        const pagina = datos.slice(inicio, fin);
        
        // Añadimos la página al array de páginas
        paginas.push(pagina);
    }
    
    return paginas;
}
