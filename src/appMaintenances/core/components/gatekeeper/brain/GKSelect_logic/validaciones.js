import { validarCampoRequerido, validarNotEmpty } from "../../functions/functions";

export function validar_select(validaciones, elemento){
    
    // eslint-disable-next-line no-unused-vars
    const validationsDetails = [];
    
    //console.log("Se deben realizar las sig validaciones:", validaciones, "Para el elemento:", elemento)


    validaciones.forEach(validacion => { 
    //1.-------------------------- Required start------------------------------
            if (validacion === "required") {
                            
                const validacion = validarCampoRequerido(elemento); //True or False
                const objValidacion = crearObjetoValidacion("required",validacion);
                validationsDetails.push(objValidacion)
            
            }
    //1.-------------------------- Required end------------------------------
    //2.-------------------------- Integer start------------------------------

//* No vacio:
    //3 -------------------------- No vacío NotEmpty start ------------------------------
            if (validacion === "notEmpty") {
                const validacion = validarNotEmpty(elemento); //True or False
                const objValidacion = crearObjetoValidacion("notEmpty",validacion);
                validationsDetails.push(objValidacion)
            }

    //3 -------------------------- No vacío NotEmpty end ------------------------------
   

        })







        
 


return validationsDetails;
}



function crearObjetoValidacion(tipo_validacion, validacion){

    const objetoValidacion ={
        type: tipo_validacion,
        validation: validacion,


    }
    return objetoValidacion
}

