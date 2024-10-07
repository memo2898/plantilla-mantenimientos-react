/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useCallback, useEffect, useState } from 'react';
import './Smoothgrid.css';
import { paginarDatos } from './func/paginarDatos.js';
import { filtrarDatos } from './func/filtrarInput.js';
import TableSmoothGrid from './components/TableSmoothGrid.jsx';
import BotonesNavegacion from './components/BotonesNavegacion.jsx';
import InfoPaginacion from './components/InfoPaginacion.jsx';

function Smoothgrid({ headerData, bodyData }) {

    
    // VARIABLES DE LOS DATOS:
    const [headerOriginal, setHeaderOriginal] = useState(headerData);
    const [bodyOriginal, setBodyOriginal] = useState(bodyData);
    const [headerDisplay, setHeaderDisplay] = useState(headerOriginal);
    const [bodyDisplay, setBodyDisplay] = useState([]); // Estos son los datos de la pagina elegida

    // VARIABLES DE LAS PAGINAS:
    const [datosPorPagina, setDatosPorPagina] = useState(10); // Cantidad de datos por pagina
    const [datosPaginados, setDatosPaginados] = useState([]);
    const [datosPaginadosSuprimidos, setDatosPaginadosSuprimidos] = useState([]);

    const [cantidadPaginas, setCantidadPaginas] = useState(0);
    
    const [paginaActual, setPaginaActual] = useState(0); // Por defecto es la pagina 0, es decir, la primera
    const [paginaActualSuprimidos, setPaginaActualSuprimidos] = useState(0);
    // VARIABLES DEL FILTRADO:
    const [palabraClaveAFiltrar, setPalabraClave] = useState("");

    // DIMENSIONES de las COLUMNAS A MOSTRAR:
    const [columnasMostrar, setColumnasMostrar] = useState(headerOriginal.length);
    const [columnasSuprimidas, setColumnasSuprimidas] = useState(headerOriginal.length);
    

   
    
    // Actualizar bodyOriginal y headerOriginal cuando cambian las props
    useEffect(() => {
        setHeaderOriginal(headerData);
        setBodyOriginal(bodyData);
    }, [headerData, bodyData]);

    // FUNCION DE EMPAQUETADO DE DATOS:
    const EmpaquetandoDatos = useCallback(() => {
        // Seleccionando fuente de datos a paginar
        let fuente_de_datos = palabraClaveAFiltrar === "" ? bodyOriginal : filtrarDatos(palabraClaveAFiltrar, bodyOriginal);
    
        // Paginando los datos:
        const datosPaginadosResult = paginarDatos(fuente_de_datos, datosPorPagina);
    
        // Actualizando estado
        setDatosPaginados(datosPaginadosResult);
        setCantidadPaginas(datosPaginadosResult.length);
        
        // Asegurarse de que la página actual es válida
        if (paginaActual >= datosPaginadosResult.length) {
            setPaginaActual(datosPaginadosResult.length > 0 ? datosPaginadosResult.length - 1 : 0);
        }

        setBodyDisplay(datosPaginadosResult[paginaActual] || []); // Prevenir errores si paginaActual no tiene datos
    
    }, [palabraClaveAFiltrar, bodyOriginal, paginaActual, datosPorPagina]);
    
    useEffect(() => {
        // Empaquetamos los datos:
        EmpaquetandoDatos();
    }, [EmpaquetandoDatos]);

    const ejecutarFiltrado = (e) => {
        setPaginaActual(0);
        setPalabraClave(e.target.value);
    };
 
    const handlerPagina = (paginaEscogida) => {
        setPaginaActual(paginaEscogida - 1);
    };
    

    const setColumnasMostrarHandler = (numeroVisualizar)=>{
        setColumnasMostrar(numeroVisualizar)
    }

    return (
        <div className='smootgrid-container'>
        
            {/* Contenedor de los controles superiores start */}
            <div className="cont-ctrls-top-smoothgrid">
                <div className="cont-search">
                    <span>Buscar</span>
                    <input type="text" onInput={ejecutarFiltrado} />
                </div>
            </div>
            {/* Contenedor de los controles superiores end */}

            {/* Contenedor Tabla start */}
            <TableSmoothGrid 
                

                columnasMostrar={columnasMostrar}
                setColumnasMostrar={setColumnasMostrarHandler}
                headerDisplay={headerDisplay}
                bodyDisplay={bodyDisplay}
                headerOriginal={headerOriginal}
                
            />
            {/* Contenedor Tabla end */}

            {/* Contenedor Botones start */}
            <BotonesNavegacion 
                cantidadPaginas={cantidadPaginas} 
                paginaActiva={paginaActual + 1} 
                handlePaginaCambio={handlerPagina} 
            />
            {/* Contenedor Botones end */}

            <InfoPaginacion cantidadPaginas={cantidadPaginas} paginaActual={paginaActual} datosPaginados={datosPaginados} registrosPorPagina = {datosPorPagina}/>
        </div>
    );
}

export default Smoothgrid;
