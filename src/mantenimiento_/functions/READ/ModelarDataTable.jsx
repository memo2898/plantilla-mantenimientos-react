
/**
 * Esta funcion da formato al arreglo de objeto recibido por el servicio get
 */
export function ModelarDataTable(datosRecibidos){


    let arreglo = [];
    datosRecibidos.forEach(dato => {
     
        arreglo.push({
            name:dato.name,
            lastname:dato.lastname,
            opciones:
            <>
                <button className="btn btn-primary" onClick={()=>{alert(`Actualizar ${dato.id}`)}}>Actualizar</button>
                <button className="btn btn-primary" onClick={()=>{alert(`Eliminar ${dato.id}`)}}>Eliminar</button>
            </>
        })
    });

    return arreglo;
}   