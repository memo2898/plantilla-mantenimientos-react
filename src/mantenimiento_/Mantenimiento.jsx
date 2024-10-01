/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { GET_ALL_EXAMPLES } from "../servicios/ExampleService"
import MyDataTableResponsive from "./components/MyDataTableResponsive/MyDataTableResponsive"
import { ModelarDataTable } from "./functions/READ/ModelarDataTable"


function Mantenimiento() {

    //Funciones by servicio:
        const SERVICIO_GET_ALL_PRINCIPAL= GET_ALL_EXAMPLES
        const SERVICIO_GET_ONE_PRINCIPAL=()=>{}
        const SERVICIO_POST_PRINCIPAL=()=>{}
        const SERVICIO_PATCH_PRINCIPAL=()=>{}
        const SERVICIO_DELETE_PRINCIPAL=()=>{}
    
    
    // Cabecera de header:
    
    const [header_table_content, setHeader_content] = useState(['Name','Lastname', 'Opciones']);
    const [body_table_content, setBody_table_content] = useState([]);



    useEffect(()=>{
        const initialRequestFunction = async ()=>{
            const response = await SERVICIO_GET_ALL_PRINCIPAL()
       
            //Modelar respuesta!
            const datosModelados = ModelarDataTable(response)
            setBody_table_content(datosModelados)
        }

        initialRequestFunction()
    },[])
    


  return (
    <>
    <p>Skeletons mientras cargando ...</p>
    

    <p>Boton para insertar nuevo</p>
    <p>Tabla con los datos</p>

    <MyDataTableResponsive datosHeader={header_table_content} datosBody={body_table_content}/>

    </>
  )
}

export default Mantenimiento