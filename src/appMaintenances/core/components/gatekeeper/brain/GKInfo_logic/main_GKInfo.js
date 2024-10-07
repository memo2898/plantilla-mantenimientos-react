export function accionarInfoGK(objeto_INPUT_OUTPUT,validationsDetails){



    /**
     * Recibe el objeto objeto_INPUT_OUTPUT que contiene el elemento de entrada y los elementos de salida info de salida
     * Recibe los detalles de la validacion de ese input
     */

   // Si ambos datos recibidos son distintos a Undefined entonces:
   if(objeto_INPUT_OUTPUT !== undefined && validationsDetails !== undefined){


        // eslint-disable-next-line no-unused-vars
        const elementoINPUT = objeto_INPUT_OUTPUT.elemento_input;
        const elementosOUTPUT = objeto_INPUT_OUTPUT.elementos_output;
 

        //console.log(validationsDetails)
        
        //1. Por cada elemento de salida hacer
        for (const elementoOUTPUT of elementosOUTPUT) {

            //1 Capturar los mensajes True y False que están en el DOM
           
            const mensajes =  mensajesEnElemento(elementoOUTPUT);
     

            let conjuntoLiDOM=""
            //2 Por cada detalle de validacion capturar su mensaje correspondiente
            for (const detalleValidacion of validationsDetails) {
            
                
                //console.log(detalleValidacion)

                //Por cada mensaje
                for (const mensaje of mensajes) {
                        // Verificar que este detalle de validacion esté en la lista de los mensajes
                    if(detalleValidacion.type === mensaje.type && detalleValidacion.validation === mensaje.estado){
                        //console.log(mensaje.message) 
                        let clase= mensaje.estado==true? "gkinfo_true" : "gkinfo_false";
                      
                        conjuntoLiDOM+=`<li class="${clase}">${mensaje.message}</li>`
                    
                    }
                }
                

                elementoOUTPUT.innerHTML=conjuntoLiDOM
                
            }
         
            
        }

    

   }
   
}
function mensajesEnElemento(elemento) {
    const mensajes = [];

    // Capturar los mensajes de data-message-validation-true y data-message-validation-false
    const mensajeTrue = elemento.getAttribute('data-message-validation-true');
    const mensajeFalse = elemento.getAttribute('data-message-validation-false');

    // Función para parsear los mensajes y añadirlos al array mensajes
    function parseMensajes(mensajeStr, estado) {
        const regex = /(\w+):\{([^}]+)\}/g;
        let match;
        while ((match = regex.exec(mensajeStr)) !== null) {
            mensajes.push({
                type: match[1],
                message: match[2],
                estado: estado
            });
        }
    }

    // Parsear y añadir los mensajes true y false
    parseMensajes(mensajeTrue, true);
    parseMensajes(mensajeFalse, false);

    return mensajes;
}




export function find_Outpus_from_input(elementINPUT, elementosGK){

    //console.log(elementINPUT, elementosGK)
    /**
     * ESTA FUNCION DEVUELVE LAS SALIDAS DE UN ELEMENTO DE ENTRADA
     * Recibe todos los elementosGK {Para conveniencia es mucho mejor enviar solo los elementos OUTPUTS}
     * Recibe el elemento input
     */

    const objeto_output_input={
        elemento_input:elementINPUT,
        elementos_output:"Los elementos de salida"
    }

    
    let elementName = elementINPUT.name;
    

    //Medidores
    let elementTieneName = true;
    let elementsTienenDatos = true;
    let elementos_output_encontrados=[];

    //1. Si no tiene nombre, entonces no hay elementos de salida:
        if(elementName === undefined || elementName.length===0){
            elementTieneName= false;
        }
    //2. Si los elementosGK estan vacios entonces no hay elementos de salida:
        if(elementosGK.length===0){
            elementsTienenDatos= false;
        }


    if(!elementTieneName || !elementsTienenDatos){

        objeto_output_input.elementos_output=[] 
    }
    else{
        //3. Si tiene nombre y los elementosGK tienen datos entonces, encontrar los elementos de salida:
        
       
        elementosGK.forEach(element => {
            //Verificar que tenga el atributo que escucha data-gatekeeper-listen
            const atributoListen = element.getAttribute("data-gatekeeper-listen");
            if(atributoListen!=undefined && atributoListen.length>0){

                if(atributoListen === elementName){
            
                    elementos_output_encontrados.push(element)
                }
                
            }
        });



        objeto_output_input.elementos_output=elementos_output_encontrados;
    } 

   


    return objeto_output_input
}