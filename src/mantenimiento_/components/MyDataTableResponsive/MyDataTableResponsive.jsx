/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import "../MyDataTableResponsive/MyDataTableResponsive.css";
import { sliceObjectByIndex } from "./funcs/sliceObjectByIndex";

//Importando imagenes
import dropdownIcon from "../MyDataTableResponsive/icons/dropdown.svg";
import oneDrop from "../MyDataTableResponsive/icons/one-drop.svg";
import oneDropOpen from "../MyDataTableResponsive/icons/one-drop-open.svg";

function MyDataTableResponsive({ datosHeader, datosBody}) {


 
  const [filasAbarcara, setFilasAbarcara] = useState(datosHeader.length);
  const [displayDatosBody, setDisplayedDatosBody] = useState(datosBody);
  const [datosBody_completed, setDatosBody_completed] = useState(datosBody);
  const [displayDatosHeader, setDisplayDatosHeader] = useState(datosHeader);
  const [displayDatosHeaderLast, setDisplayDatosHeaderLast] = useState(datosHeader);
  const [desbordamiento, setDesbordamiento] = useState(false);
  const [dimensionesRompimiento, setDimensionesRompimiento] = useState([]);
  const [botonesDropDawn, setBotonesDropDawn] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [lastWidth, setLastWidth] = useState(window.innerWidth);

  const contenedorTablaRef = useRef();
  const tablaRef = useRef();
  

 //Efecto para cuando los datos de entrada cambien, se recargen los datos del flujo
 useEffect(() => {
  
  setDisplayedDatosBody(datosBody);
  //console.log("ssss")

  setDisplayDatosHeader(datosHeader)
 
 }, [datosBody,datosHeader])
 

   
 //?----------------EFECTO PARA CUANDO LA PANTALLA DECRECE IR ELIMINANDO LOS CAMPOS start ---------
  const eliminarCamposDesbordamiento = () => {
    // Reducir los datos del arreglo cabecera
    const displayDatosHeaderCopy = [...displayDatosHeader];
    displayDatosHeaderCopy.pop();
    setDisplayDatosHeader(displayDatosHeaderCopy);

    // Reducir los objetos del arreglo
  if(displayDatosBody !=undefined){
    const arregloDeObjetosTemporal = displayDatosBody.map((objeto) => {
      const keys = Object.keys(objeto);
      keys.pop(); // Eliminar y obtener la última clave
      const nuevoObjeto = {};
      for (const clave of keys) {
        nuevoObjeto[clave] = objeto[clave];
      }
      return nuevoObjeto;
    });
    setDisplayedDatosBody(arregloDeObjetosTemporal);
  }
  else{
    //console.log("No se estan mostrando datos")
    setDisplayedDatosBody([]);
  }
    
   
    
  };

  useEffect(() => {
    const comprobarDesbordamiento = () => {
      const anchoContenedor = contenedorTablaRef.current.clientWidth;
      const anchoTabla = tablaRef.current.clientWidth;
      setDesbordamiento(anchoTabla > anchoContenedor);

      const anchoVentana = window.innerWidth;

      if (desbordamiento) {
        if (displayDatosHeader.length > 1) {
          //console.log(displayDatosBody)
          eliminarCamposDesbordamiento();
          const dimensionesRompimientoTemporal = [...dimensionesRompimiento];
          dimensionesRompimientoTemporal.push(anchoVentana);
          setDimensionesRompimiento(dimensionesRompimientoTemporal);
          setBotonesDropDawn(true);
          
        }
      }
    };

    comprobarDesbordamiento();
    window.addEventListener("resize", comprobarDesbordamiento);

    return () => {
      window.removeEventListener("resize", comprobarDesbordamiento);
    };
  }, [
    displayDatosHeader,
    displayDatosBody,
    eliminarCamposDesbordamiento,
    desbordamiento,
    dimensionesRompimiento,
  ]); // Agregado dimensionesRompimiento
 //?----------------EFECTO PARA CUANDO LA PANTALLA DECRECE IR ELIMINANDO LOS CAMPOS end ---------


  //?----------------EFECTO PARA CUANDO LA PANTALLA CRECE IR AGREGANDO LOS CAMPOS start ---------
  const filtroInput = useRef()

  
  useEffect(() => {
    const handleResize = () => {
      
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);

      if (newWidth > lastWidth) {
        //console.log("La pantalla crecio")
        if (datosHeader.length > displayDatosHeader.length) {
           
          const diferenciaLongitud = datosHeader.length - displayDatosHeader.length;
          const anchoContenedor = contenedorTablaRef.current.clientWidth;
          const anchoTabla = tablaRef.current.clientWidth;

          if (!desbordamiento && anchoContenedor > anchoTabla + 30  ) {
            //console.log('Se debe imprimir datos!')
            let datosHeaderTemporal = [...displayDatosHeader];
            for (let i = 0; i < diferenciaLongitud; i++) {
              //Por cada dato hay que imprimir en la tabla
              let conteo = displayDatosHeader.length + i;

              datosHeaderTemporal.push(datosHeader[conteo]); //Esto estara reverse!!
     
              //--------------------------Zona de reasignacion de arreglo de objetos start------
            

              if(displayDatosBody.length>0){
         
              let claves = Object.keys(datosBody[0]);
            
              const claveCapturar = claves[conteo];
            
              displayDatosBody.map((objeto, index) => {
                
                //=====

                let dato = datosBody[index][claveCapturar];

                let nuevasPropiedades = {}
                if(typeof(dato)=="object"){
                    nuevasPropiedades = { [claveCapturar]:dato };
                }else{
                    nuevasPropiedades = { [claveCapturar]: `${dato}` };
                }
                
                
               
                Object.assign(objeto, nuevasPropiedades);

                //=====

                //console.log(datosHeaderTemporal)

       
              });
            }
         // //console.log(displayDatosBody)

              //--------------------------Zona de reasignacion de arreglo de objetos end------
            }
            //console.log(datosHeaderTemporal)
            setDisplayDatosHeader(datosHeaderTemporal);
            setDisplayDatosHeaderLast(datosHeaderTemporal);
            datosHeaderTemporal = [];

            if(displayDatosHeaderLast.length === datosHeader.length){
            
             // setDisplayedDatosBody(datosBody);
            }
            
          } else {
            // //console.log('No se puede porque hay desbordamiento o porque no hay espacio sufienciente')
          }
        } else {

          // //console.log("Los datos son iguales -- creo")


        }
      }

      setLastWidth(newWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [lastWidth, desbordamiento]);
  //?----------------EFECTO PARA CUANDO LA PANTALLA CRECE IR AGREGANDO LOS CAMPOS END ---------





  useEffect(() => {
    if (displayDatosHeader.length === datosHeader.length) {
      setBotonesDropDawn(false);
      cerrarVentanita()
    }
  }, [displayDatosHeader]);

  //-------------------- Expandir la Columna tipo Accordeon start --------------
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);

  const toggleRow = (index) => {

   
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
      getBodyDataByIndex(index);
    }

    if (expandedRowIndex === index) {
      // Si la fila ya está expandida, colapsarla
      setExpandedRowIndex(null);
    } else {
      // Si la fila no está expandida, expandirla
      setExpandedRowIndex(index);
    }
  };

  //-------------------- Expandir la Columna tipo Accordeon end --------------

  //--------------------Funcion para buscar los datos del body con respecto a un index start---------
  const [detalleColumnaAccordeon, setDetalleColumnaAccordeon] = useState([]);

  const getBodyDataByIndex = (index) => {
   
    const DatosMostradosPage = datosBody_completed.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);




    //====================Capturar los Objects key de arreglo body start =======
    //const claves = Object.keys(datosBody[index]);
    const claves = Object.keys(datosBody_completed[index]);

    //====================Capturar los Objects key de arreglo body end =======

    let resultadoIteraciones = [];
    const longitudActual = displayDatosHeader.length;
    const diferencias = datosHeader.length - longitudActual;
    

    //Imprimir las categorias restantes
    for (let i = 0; i < diferencias; i++) {
      const categoria = datosHeader[longitudActual + i];

      const key = claves[longitudActual + i];
      const valorCategoria = DatosMostradosPage[index][key]; //! Aqui se puede solucinar facilmente

      
      const objeto = new Object();
      objeto.clave = categoria;
      objeto.detalle = valorCategoria;


   
      resultadoIteraciones.push(objeto);

    }

    setDetalleColumnaAccordeon(resultadoIteraciones);

  };
  //--------------------Funcion para buscar los datos del body con respecto a un index end---------

  //---------------------Efecto para cuando cambio la dimension de la ventana y se necesita mostrar los datos en la ventanita start -----

  const cerrarVentanita =()=>{
    setExpandedRow(null);
    setExpandedRowIndex(null);
  }


  useEffect(() => {
    const ajustarDatosVentanita = () => {
        cerrarVentanita()
    };
    window.addEventListener("resize", ajustarDatosVentanita);
  }, []);

  //---------------------Efecto para cuando cambio la dimension de la ventana y se necesita mostrar los datos en la ventanita end -----




  //--------------------Paginacion start-------------------------------
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10); // Cantidad de elementos por página

  //--------------------Paginacion end-------------------------------



  // --------------------Paginación ágil start-----------------------
  const getPageNumbers = () => {
    const totalPages = Math.ceil(displayDatosBody.length / itemsPerPage);
    const maxVisiblePages = 10;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      const startPage = Math.max(currentPage - halfVisiblePages, 1);
      const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

      const pageNumbers = [];

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }

      return pageNumbers;
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === '...') return;

    setCurrentPage(pageNumber);

    //? Cerrar la columna expandida:
      setExpandedRowIndex(null);
      setExpandedRow(null);

  };

  // --------------------Paginación ágil end-----------------------




//-------------Haciendo busqueda avanzada por input start-------------
const hacerBusquedaInput = (event) => {
  
 



  //console.log("Filtrando")
    const valorEntrada = event.target.value.trim().toLowerCase();
    let datosRecopilados = [];
    let datosCompactados = [];
  
    if (valorEntrada.length === 0) {
      datosCompactados = adecuarDatosSegunCabeceras(datosBody);
      setDisplayedDatosBody(datosCompactados); // Mostrar todos los datos si la entrada está vacía
    } 
    
    else {
      datosBody.forEach((dato) => {
        for (const key in dato) {
          const value = dato[key];
          if (
            (typeof value === 'string' && value.toLowerCase().includes(valorEntrada)) ||
            (typeof value === 'number' && value.toString().toLowerCase().includes(valorEntrada))
          ) {
      
            datosRecopilados.push(dato);
            break;
          }
        }
      });


       //Ocultando ventanitas por si acaso:
    setExpandedRow(null);
    setExpandedRowIndex(null);



      setDatosBody_completed(datosRecopilados) //Datos filtrados pero con todos sus atributos
      datosCompactados = adecuarDatosSegunCabeceras(datosRecopilados);
      setDisplayedDatosBody(datosCompactados);
      datosCompactados.length>0?setCurrentPage(1):setDisplayedDatosBody([]);
      

    }
  };
  

 // Estado para almacenar los datos filtrados

 //----Funcion para quitar los datos cuyas cabeceras no esten impresas y no se rompa la tabla start---
 const adecuarDatosSegunCabeceras=(datosRecopiladosPorFiltrado) =>{
    //console.log(datosRecopiladosPorFiltrado)
    const endIndex=displayDatosHeader.length-1;
    //console.log(endIndex)

    let arregloAdecuado=[];
    datosRecopiladosPorFiltrado.map((elemento)=>{
         arregloAdecuado.push(sliceObjectByIndex(elemento,0,endIndex))
        //console.log(elemento)
    })
   
    return (arregloAdecuado)
 }
 //----Funcion para quitar los datos cuyas cabeceras no esten impresas y no se rompa la tabla end---

 //-------------Haciendo busqueda avanzada por input end-------------



  return (
     <section className="myDataTableResponsive">
<div className="cont-opciones-busqueda-mdtr">



<input
type="text" ref={filtroInput}
  
  onInput={hacerBusquedaInput}
  placeholder="Filtrar datos" className="input-busqueda"
/>

</div>
    <div
      className="table-container-datatableResponsive"
      ref={contenedorTablaRef}
    >
      <table className="table-datatableResponsive" ref={tablaRef}>
        <thead>
          <tr>
            <th
              className={botonesDropDawn === true ? "" : "invisible_dropdown"}
            >
              <span>
                <img src={dropdownIcon} alt="" className="dropdown-icon" />
              </span>
            </th>
            {displayDatosHeader.map((dato, index) => (
              <th key={index}>{dato}</th>
            ))}
          </tr>
        </thead>
        <tbody>


            
        {
        displayDatosBody.length > 0 ? (
        //--------------Imprimiendo datos en la tabla start-------------
            displayDatosBody
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item, rowIndex) => (
        
            <React.Fragment key={rowIndex}>
            
            <tr key={rowIndex}>
              
                <td
                className={
                    botonesDropDawn === true
                    ? "drop-down_opcion"
                    : "invisible_dropdown"
                }
                onClick={() => toggleRow(rowIndex)}
                >
                {expandedRowIndex === rowIndex ? (
                    <img src={oneDropOpen} alt="" className="dropdown-icon" />
                ) : (
                    <img src={oneDrop} alt="" className="dropdown-icon" />
                )}
                </td>

                {Object.values(item).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
                ))}
            </tr>
            {expandedRow === rowIndex && (
                <tr className={`accordion active`}>
                <td colSpan={filasAbarcara}>
                    {detalleColumnaAccordeon.map((element, index) => (
                    <div key={index}>
                        <div className="elemento-tabla-categoria-detalle-mdtr">
                        <span className="enfasis-bold-mtr">
                            {element.clave}:
                        </span>{" "}
                        {element.detalle}
               
                        </div>
                    </div>
                    ))}
                </td>
                </tr>
            )}
            </React.Fragment>
        ))
        //--------------Imprimiendo datos en la tabla end-------------
        ): (
            <tr>
              <td colSpan={filasAbarcara + 1}>
                <div className="fila-nodatos">
                No hay datos que mostrar en esta tabla
                </div>
               
                </td>
            </tr>
          )
  }




        </tbody>
      </table>
    </div>
{/**================================== */}
    <div className="cont-botones-navegacion">
    <button className="btn-nav-principal"
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
>

  {Math.ceil(displayDatosBody.length / itemsPerPage) > 1 ? "Anterior":""}
    
</button>
<button className="btn-nav-principal"
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage >= Math.ceil(displayDatosBody.length / itemsPerPage)}
>
    
    {Math.ceil(displayDatosBody.length / itemsPerPage) > 1 ? "Siguiente":""}
</button>
    </div>
{/**================================== */}


    <div className="botones-navegacion-sec-dtr">
        {getPageNumbers().map((pageNumber, index) => (
            <button
            key={index}
            className={`btn-navegacion-dtr${currentPage === pageNumber ? ' pag-active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
            >
            {pageNumber}
            </button>
        ))}
    </div>
       {/**Conteo de pagina */}
{ displayDatosBody.length>0?<>

  <div className="cont-conteo-paginacion">
                         <span className='texto-informativo-paginacion'>Página {currentPage}/{ Math.ceil(displayDatosBody.length / itemsPerPage) }</span>
                    </div>
                {/**Total de registros*/}
                <div className="cont-conteo-total-registros">
                         <span className='texto-informativo-paginacion'>Total de registros {displayDatosBody.length}</span>
        </div>
</>:""}
      


    </section>
  );
}

export default MyDataTableResponsive;



