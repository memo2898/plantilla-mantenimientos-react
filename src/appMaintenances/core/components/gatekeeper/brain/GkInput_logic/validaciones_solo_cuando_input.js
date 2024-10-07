
import {  validarInputAlpha, validarMaxLength } from "../../functions/functions.js"




export function validar_input_solo_cuando_input(validaciones, elemento){
    // eslint-disable-next-line no-unused-vars
    const validationsDetails = [];
    
    //console.log("Se deben realizar las sig validaciones:", validaciones, "Para el elemento:", elemento)


    validaciones.forEach(validacion => { 

         //4.2. --------------------------- Alpha start -------------------------------------------
         if (validacion==="alpha") {
            // Quitar los event listeners existentes
            
            const validacion = validarInputAlpha(elemento); //True or False
            const objValidacion = crearObjetoValidacion("alpha",validacion);
            validationsDetails.push(objValidacion)
        }
//4.2. --------------------------- Alpha end   -------------------------------------------
    //7. --------------------------- MaxLength start -------------------------------------------
        if (validacion.includes("maxLength")) {
            // Quitar los event listeners existentes
          
            const validacion = validarMaxLength(elemento); //True or False
            const objValidacion = crearObjetoValidacion("maxLength",validacion);
            validationsDetails.push(objValidacion)
        }
    //7. --------------------------- MaxLength end   -------------------------------------------







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