import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
function BotonesNavegacion({ cantidadPaginas, paginaActiva, handlePaginaCambio }) {
  const [paginaSeleccionada, setPaginaSeleccionada] = useState(paginaActiva);

  // Sincronizar el estado local con la prop `paginaActiva` del componente padre
  useEffect(() => {
    setPaginaSeleccionada(paginaActiva);
  }, [paginaActiva]);

  const renderizarBotonesPaginacion = () => {
    const botones = [];
    const mostrarPuntosSuspensivos = cantidadPaginas > 10;

    for (let i = 1; i <= cantidadPaginas; i++) {
      if (
        !mostrarPuntosSuspensivos ||
        i === 1 ||
        i === cantidadPaginas ||
        (i >= paginaSeleccionada - 3 && i <= paginaSeleccionada + 3)
      ) {
        botones.push(
          <button
            key={i}
            className={i === paginaSeleccionada ? "smoothgrid-btn-activo" : ""}
            onClick={() => cambiarPagina(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === paginaSeleccionada - 4 && paginaSeleccionada > 6) ||
        (i === paginaSeleccionada + 4 && paginaSeleccionada < cantidadPaginas - 6)
      ) {
        botones.push(
          <button key={`dots-${i}`} disabled>
            ...
          </button>
        );
      }
    }

    return botones;
  };

  const cambiarPagina = (pagina) => {
    setPaginaSeleccionada(pagina);
    handlePaginaCambio(pagina); // Llamar la función de cambio de página del componente padre
  };

  return (
    <div className="controles-navegacion">
      {renderizarBotonesPaginacion()}
    </div>
  );
}

export default BotonesNavegacion;
