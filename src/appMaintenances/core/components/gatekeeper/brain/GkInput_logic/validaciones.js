
import { algoritmo_validacion_Cedula, validarCampoRequerido, validarInputAlpha, validarInputAlphaNumeric, validarInputCapitalized, validarInputEmail, validarInputLowercase, validarInputString, validarInputText, validarInputURL, validarInputUppercase, validarMaxLength, validarMinLength, validarNotEmpty, validarSoloNumeros, validarSoloNumeros_ComaFlotante, validarSoloNumeros_PuntoFlotante, validarSoloNumeros_separadoresMiles, validarTarjetaCredito } from "../../functions/functions.js"




export function validar_input(validaciones, elemento){
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

//* Numeric:
            if (validacion === "integer") {
                    
                const validacion = validarSoloNumeros(elemento); //True or False
                const objValidacion = crearObjetoValidacion("integer",validacion);
                validationsDetails.push(objValidacion)
            
            }
    //2.-------------------------- Integer end------------------------------

    //2.2-------------------------- Integer Punto flotante start----------------------------
            if (validacion === "float") {

                const validacion = validarSoloNumeros_PuntoFlotante(elemento); //True or False
                const objValidacion = crearObjetoValidacion("float",validacion);
                validationsDetails.push(objValidacion)
            
            }
    //2.2-------------------------- Integer Punto flotante end------------------------------
    //2.3-------------------------- Integer Coma flotante start----------------------------
            if (validacion === "commaFloat") {

                const validacion = validarSoloNumeros_ComaFlotante(elemento); //True or False
                const objValidacion = crearObjetoValidacion("commaFloat",validacion);
                validationsDetails.push(objValidacion)
            
            }
    //2.3-------------------------- Integer Coma flotante end------------------------------
    //2.4-------------------------- Integer Coma flotante start----------------------------
            if (validacion === "thousandSeparator") {
                                    
                const validacion = validarSoloNumeros_separadoresMiles(elemento); //True or False
                const objValidacion = crearObjetoValidacion("thousandSeparator",validacion);
                validationsDetails.push(objValidacion)
            
            }
    //2.4-------------------------- Integer Coma flotante end------------------------------


//* No vacio:
    //3 -------------------------- No vacío NotEmpty start ------------------------------
            if (validacion === "notEmpty") {
                
                const validacion = validarNotEmpty(elemento); //True or False
                const objValidacion = crearObjetoValidacion("notEmpty",validacion);
                validationsDetails.push(objValidacion)
            }

    //3 -------------------------- No vacío NotEmpty end ------------------------------

//* Texto:
    //4.1. --------------------------- String start -------------------------------------------
            if (validacion==="string") {
                // Quitar los event listeners existentes
                
                const validacion = validarInputString(elemento); //True or False
                const objValidacion = crearObjetoValidacion("string",validacion);
                validationsDetails.push(objValidacion)
            }
    //4.1. --------------------------- String end   -------------------------------------------
    //4.2. --------------------------- Alpha start -------------------------------------------
            if (validacion==="alpha") {
                // Quitar los event listeners existentes
                
                const validacion = validarInputAlpha(elemento); //True or False
                const objValidacion = crearObjetoValidacion("alpha",validacion);
                validationsDetails.push(objValidacion)
            }
    //4.2. --------------------------- Alpha end   -------------------------------------------
    //4.3. --------------------------- Alphanumeric start -------------------------------------------
            if (validacion==="alphaNumeric") {
                // Quitar los event listeners existentes
                
                const validacion = validarInputAlphaNumeric(elemento); //True or False
                const objValidacion = crearObjetoValidacion("alphaNumeric",validacion);
                validationsDetails.push(objValidacion)
            }
    //4.3. --------------------------- Alphanumeric end   -------------------------------------------
    //4.4. --------------------------- Text start -------------------------------------------
            if (validacion==="text") {
                // Quitar los event listeners existentes
                
                const validacion = validarInputText(elemento); //True or False
                const objValidacion = crearObjetoValidacion("text",validacion);
                validationsDetails.push(objValidacion)
            }
    //4.4. --------------------------- Text end   -------------------------------------------

    //4.5. --------------------------- Capitalizada start -------------------------------------------
            if (validacion==="capitalized") {
                // Quitar los event listeners existentes
                
                const validacion = validarInputCapitalized(elemento); //True or False
                const objValidacion = crearObjetoValidacion("capitalized",validacion);
                validationsDetails.push(objValidacion)
            }
    //4.5. --------------------------- Capitalizada end   -------------------------------------------

    //4.6. --------------------------- Minúsculas start -------------------------------------------
            if (validacion==="lowerCase") {
                // Quitar los event listeners existentes
                
                const validacion = validarInputLowercase(elemento); //True or False
                const objValidacion = crearObjetoValidacion("lowerCase",validacion);
                validationsDetails.push(objValidacion)
            }
    //4.6. --------------------------- Minúsculas end   -------------------------------------------

    //4.7. --------------------------- Minúsculas start -------------------------------------------
            if (validacion==="upperCase") {
                // Quitar los event listeners existentes
                
                const validacion = validarInputUppercase(elemento); //True or False
                const objValidacion = crearObjetoValidacion("upperCase",validacion);
                validationsDetails.push(objValidacion)
            }
    //4.7. --------------------------- Minúsculas end   -------------------------------------------

    //!!! Estos siempre devolveran true:
            if (validacion==="noCopy") {
                // Quitar los event listeners existentes
                const objValidacion = {
                    type: "noCopy",
                    validation:true
                }
                
                validationsDetails.push(objValidacion)
            }
            if (validacion==="noPaste") {
                // Quitar los event listeners existentes
                const objValidacion = {
                    type: "noPaste",
                    validation:true
                }
                
                validationsDetails.push(objValidacion)
            }


    //7. --------------------------- MaxLength start -------------------------------------------
        if (validacion.includes("maxLength")) {
            // Quitar los event listeners existentes
          
            const validacion = validarMaxLength(elemento); //True or False
            const objValidacion = crearObjetoValidacion("maxLength",validacion);
            validationsDetails.push(objValidacion)
        }
    //7. --------------------------- MaxLength end   -------------------------------------------

    //8. --------------------------- MaxLength start -------------------------------------------
        if (validacion.includes("minLength")) {
            // Quitar los event listeners existentes
          
            const validacion = validarMinLength(elemento); //True or False
            const objValidacion = crearObjetoValidacion("maxLength",validacion);
        
            validationsDetails.push(objValidacion)
        }
    //8. --------------------------- MaxLength end   -------------------------------------------

//* Email:


    //10. --------------------------- Email start -------------------------------------------
    if (validacion === "email") {
     
        // Quitar los event listeners existentes
      
        const validacion = validarInputEmail(elemento); //True or False
        const objValidacion = crearObjetoValidacion("email",validacion);
    
        validationsDetails.push(objValidacion)
    }
//10. --------------------------- Email end   -------------------------------------------
   


//* URL:

    //11. --------------------------- Email start -------------------------------------------
    if (validacion === "validURL") {
     
        // Quitar los event listeners existentes
      
        const validacion = validarInputURL(elemento); //True or False
        const objValidacion = crearObjetoValidacion("validURL",validacion);
    
        validationsDetails.push(objValidacion)
    }
//11. --------------------------- Email end   -------------------------------------------
   


//* TARJETA DE CREDITO:


    //12. --------------------------- Tarjeta de crédito start -------------------------------------------
    if (validacion === "validCreditCard") {
     
        // Quitar los event listeners existentes
      
        const validacion = validarTarjetaCredito(elemento); //True or False
        const objValidacion = crearObjetoValidacion("validCreditCard",validacion);
    
        validationsDetails.push(objValidacion)
    }
    //12. --------------------------- Tarjeta de crédito end   -------------------------------------------
   

//* CEDULA DOMINICANA:


    // --------------------------- CEDULA start -------------------------------------------
    if (validacion === "cedula_dom") {
     
        // Quitar los event listeners existentes
      
        const validacion = algoritmo_validacion_Cedula(elemento); //True or False
        const objValidacion = crearObjetoValidacion("cedula_dom",validacion);
        validationsDetails.push(objValidacion)
    }
    // --------------------------- CEDULA end   -------------------------------------------
   

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


export function validar_input_file(validaciones, elemento){
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
