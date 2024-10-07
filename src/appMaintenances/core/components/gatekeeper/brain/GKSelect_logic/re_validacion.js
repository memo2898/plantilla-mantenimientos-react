export function re_validacionSelectsGK(objeto_INPUT_OUTPUT,validationsDetails){


    /**
     * Recibe el objeto objeto_INPUT_OUTPUT que contiene el elemento de entrada y los elementos de salida info de salida
     * Recibe los detalles de la validacion de ese input
     */

   // Si ambos datos recibidos son distintos a Undefined entonces:
   if(objeto_INPUT_OUTPUT !== undefined && validationsDetails !== undefined){


        // eslint-disable-next-line no-unused-vars
        const elementoINPUT = objeto_INPUT_OUTPUT.elemento_input;


 const devolverObjeto={
    input_name:elementoINPUT.name,
    input_order:"select",
    value: elementoINPUT.value,
    input_general_validation: comprobarValidacionDetailsGeneral(validationsDetails),
    validations_details: validationsDetails
 }


    
return devolverObjeto
   }
   
}

function comprobarValidacionDetailsGeneral(validationsDetails){




    let validationGeneral = true;

    for (let i = 0; i < validationsDetails.length; i++) {
        const validacion = validationsDetails[i].validation;
        
        if(validacion==false){
            validationGeneral = false;
            break
        }

        
        
    }
    return validationGeneral;

}




