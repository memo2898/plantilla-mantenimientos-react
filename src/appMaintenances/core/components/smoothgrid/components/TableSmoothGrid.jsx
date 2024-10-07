/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';

// Importando imagenes
import dropdownIcon from "../icons/dropdown.svg";
import oneDrop from "../icons/one-drop.svg";
import oneDropOpen from "../icons/one-drop-open.svg";

function TableSmoothGrid({ columnasMostrar, setColumnasMostrar, headerDisplay, bodyDisplay, headerOriginal }) {
    const contenedorTablaRef = useRef();
    const tablaRef = useRef();

    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
    const [puntosQuiebre, setPuntosQuiebre] = useState([]);
    const [displayManejadores, setDisplayManejadores] = useState(false);
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);


    //ESTADOS PARA MANEJAR LAS COLUMNAS SUPRIMIDAS
    // const [headerSuprimidos, setHeaderSuprimidos] = useState([]);

    const actualizarAnchoPantalla = useCallback(() => {
        setAnchoPantalla(window.innerWidth);
    }, []);

    const ajustePorDesbordamiento = useCallback(() => {
        const anchoContenedorTabla = contenedorTablaRef.current?.clientWidth || 0;
        const anchoTabla = tablaRef.current?.clientWidth || 0;

        if (anchoTabla > anchoContenedorTabla && columnasMostrar > 1) {
            const nuevasColumnasMostrar = columnasMostrar - 1;
            setPuntosQuiebre((prev) => [...prev, anchoPantalla]);
              //Agregar la columna que se suprimio al arreglo:


            // setHeaderSuprimidos([...headerSuprimidos,headerDisplay[columnasMostrar-1]])
            // console.log(headerSuprimidos)
            setColumnasMostrar(nuevasColumnasMostrar);

           

          

            
        } else if (
            anchoTabla <= anchoContenedorTabla &&
            puntosQuiebre.length > 0 &&
            columnasMostrar < headerDisplay.length
        ) {
            const ultimoQuiebre = puntosQuiebre[puntosQuiebre.length - 1];
            if (anchoPantalla > ultimoQuiebre) {
                const nuevasColumnasMostrar = columnasMostrar + 1;
                setColumnasMostrar(nuevasColumnasMostrar);
                setPuntosQuiebre((prev) => prev.slice(0, -1));
                //quitar la columna que se restauró al arreglo:
            }
        }
    }, [anchoPantalla, columnasMostrar, headerDisplay.length, puntosQuiebre, setColumnasMostrar]);

    // const ejecutarManejadores = useCallback(() => {
    //     setDisplayManejadores(puntosQuiebre.length > 0);
    //     ajustePorDesbordamiento();
    // }, [ajustePorDesbordamiento, puntosQuiebre.length]);

    const evaluarTodasColumnasImpresas = useCallback(() => {
        const cantidadColumnasReales = headerDisplay.length;
        const columnasSuprimidas = cantidadColumnasReales - columnasMostrar;
    
        // Si no hay columnas suprimidas, se ocultan los manejadores y se cierran los acordeones
        if (columnasSuprimidas === 0) {
            setExpandedRowIndex(null); // Cierra todos los acordeones
            setDisplayManejadores(false); // Oculta los manejadores de expansión
        } else {
            // Si hay columnas suprimidas, muestra los manejadores
            setDisplayManejadores(true);
        }
    }, [columnasMostrar, headerDisplay.length]);
    
    useEffect(() => {
        const handleResize = () => {
            actualizarAnchoPantalla();
            evaluarTodasColumnasImpresas(); // Verificamos si debemos mostrar los manejadores
        };
    
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [actualizarAnchoPantalla, evaluarTodasColumnasImpresas]);
    
    useEffect(() => {
        ajustePorDesbordamiento();
        evaluarTodasColumnasImpresas(); // Verificamos si debemos mostrar los manejadores
    }, [ajustePorDesbordamiento, evaluarTodasColumnasImpresas]);
    
    const toggleRow = (rowIndex) => {
        setExpandedRowIndex((prevIndex) => (prevIndex === rowIndex ? null : rowIndex));
    };

    const elementosColumnasSuprimidas = (indexFila) => {
        const cantidadColumnasReales = headerOriginal.length;
       
    
       // const cantidadColumnasSuprimidas = cantidadColumnasReales - columnasMostrar;
        
    
        const elementoSeleccionado = bodyDisplay[indexFila];
        
    
        // Array para acumular los resultados
        const resultado = [];
    
        // Iterar sobre las columnas reales
        for (let i = 0; i < cantidadColumnasReales; i++) {
            const element = Object.values(elementoSeleccionado)[i];
    
            // Mostrando solo las columnas suprimidas
            if (i > columnasMostrar - 1) {
                const clave = headerOriginal[i];
                const valor = element;
    
                // Agregar el par clave-valor al array de resultado
                resultado.push(
                    <div key={i}><span className="clave-responsive-smoothgrid">{clave}</span>: <span className="valor-responsive-smoothgrid">{valor}</span><br /></div>
                );
            }
        }
    
        // Retornar todos los pares clave-valor como un conjunto de elementos
        return <>{resultado}</>;
    };
    
    return (
        <div className="cont-table-space-smoothgrid" ref={contenedorTablaRef}>
            {columnasMostrar > 0 ? (
                <table ref={tablaRef} className="smoothTable_cont-tabla">
                    <thead>
                        <tr>
                            {displayManejadores && (
                                <th>
                                    <img src={dropdownIcon} alt="Icono de menú desplegable" className="dropdown-icon" />
                                </th>
                            )}
                            {headerDisplay.map((elemento, index) => {
                                if (index < columnasMostrar) {
                                    return <th key={index}>{elemento}</th>;
                                }
                                return null;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {bodyDisplay.length > 0 ? (
                            bodyDisplay.map((fila, indexFila) => (
                                <React.Fragment key={indexFila}>
                                    <tr>
                                        {displayManejadores && (
                                            <td
                                                onClick={() => toggleRow(indexFila)}
                                                className={expandedRowIndex === indexFila ? "drop-down_opcion" : "invisible_dropdown"}
                                            >
                                                {expandedRowIndex === indexFila ? (
                                                    <img src={oneDropOpen} alt="Icono de fila expandida" className="dropdown-icon" />
                                                ) : (
                                                    <img src={oneDrop} alt="Icono de fila colapsada" className="dropdown-icon" />
                                                )}
                                            </td>
                                        )}
                                        {Object.values(fila)
                                            .slice(0, columnasMostrar)
                                            .map((celda, indexCelda) => (
                                                <td key={indexCelda}>{celda}</td>
                                            ))}
                                    </tr>

                                    {expandedRowIndex === indexFila && (
                                        <tr className="accordion active">
                                            <td colSpan={columnasMostrar + 1}>
                                                {/* Mostrar contenido adicional de la fila */}
                                                <div className="elemento-tabla-categoria-detalle-mdtr">
                                                    {elementosColumnasSuprimidas(indexFila)}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columnasMostrar}>
                                    <div className="cont-smoothgrid-message-table">Ningún dato para mostrar</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                "No hay columnas"
            )}
        </div>
    );
}

TableSmoothGrid.propTypes = {
    columnasMostrar: PropTypes.number.isRequired,
    setColumnasMostrar: PropTypes.func.isRequired,
    headerDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
    bodyDisplay: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableSmoothGrid;
