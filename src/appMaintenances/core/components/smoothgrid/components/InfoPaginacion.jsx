/* eslint-disable react/prop-types */

function InfoPaginacion({ cantidadPaginas, paginaActual, datosPaginados, registrosPorPagina }) {
    // Calcular el total de registros.
    const totalRegistros = datosPaginados.reduce((total, pagina) => total + pagina.length, 0);

    // Determinar el rango de registros mostrados en la página actual.
    const inicio = paginaActual * registrosPorPagina + 1; // Asumiendo que hay 10 registros por página.
    const fin = Math.min(inicio + registrosPorPagina - 1, totalRegistros); // Asegurarse de que no supere el total.

    return (
        <>
        {totalRegistros> 0?
        <div className="InfoPaginacion-content">
            

            <span className="text-filter-smoothgrid">
                Mostrando {inicio} a {fin} de {totalRegistros} registros
            </span>

            <span className="texto-informativo-paginacion">
                Página {paginaActual + 1}/{cantidadPaginas}
            </span>
        </div>
        :""}
        </>
    );
}

export default InfoPaginacion;
