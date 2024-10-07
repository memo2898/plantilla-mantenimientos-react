import { formatear_cedula, inputAlpha, inputAlphaNumeric, inputCapitalized, inputLowercase, inputMaxLength, inputMinLength, inputString, inputText, inputUppercase, restringirSoloNumeros, restringirSoloNumeros_ComaFlotante, restringirSoloNumeros_PuntoFlotante, restringirSoloNumeros_separadoresMiles} from "../../functions/functions.js"
import { accionarInfoGK, find_Outpus_from_input } from "../GKInfo_logic/main_GKInfo.js";





//Funcion para validar condiciones
//Funcion para restringirs segun condiciones
export function restringir_input(restricciones, elemento){
    //console.log(restricciones)
    //console.log(elemento)

    restricciones.forEach(restriccion => {
//console.log("restricciones y elementos",restricciones, elemento)

   
//* Numeric:
        //2.-------------------------- Integer start------------------------------
            if (restriccion==="integer") {
            
                // Quitar los event listeners existentes
                elemento.removeEventListener('input', restringirSoloNumeros);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', restringirSoloNumeros);
            
            }
        //2.-------------------------- Integer end------------------------------

        //2.2-------------------------- Integer Punto flotante start----------------------------
            if (restriccion==="float") {
                
                // Quitar los event listeners existentes
                elemento.removeEventListener('input', restringirSoloNumeros_PuntoFlotante);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', restringirSoloNumeros_PuntoFlotante);
            
            }
        //2.2-------------------------- Integer Punto flotante end------------------------------
        //2.3-------------------------- Integer Coma flotante start----------------------------
            if (restriccion==="commaFloat") {
                
                // Quitar los event listeners existentes
                elemento.removeEventListener('input', restringirSoloNumeros_ComaFlotante);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', restringirSoloNumeros_ComaFlotante);
            
            }
        //2.3-------------------------- Integer Coma flotante end------------------------------
        //2.4-------------------------- Integer Coma flotante start----------------------------
            if (restriccion==="thousandSeparator") {
                
                // Quitar los event listeners existentes
                elemento.removeEventListener('input', restringirSoloNumeros_separadoresMiles);
                // Asignar nuevos event listeners
               
                elemento.addEventListener('input', restringirSoloNumeros_separadoresMiles);
            
            }
        //2.4-------------------------- Integer Coma flotante end------------------------------

//* Texto:
    //4.1. --------------------------- String start -------------------------------------------
            if (restriccion==="string") {
                // Quitar los event listeners existentes
                
                elemento.removeEventListener('input', inputString);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', inputString);
            }
    //4.1. --------------------------- String end   -------------------------------------------
    //4.2. --------------------------- Alpha start -------------------------------------------
            if (restriccion==="alpha") {
                // Quitar los event listeners existentes
                
                elemento.removeEventListener('input', inputAlpha);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', inputAlpha);
            }
    //4.2. --------------------------- Alpha end   -------------------------------------------
    //4.3. --------------------------- Alphanumeric start -------------------------------------------
            if (restriccion==="alphaNumeric") {
                // Quitar los event listeners existentes
                
                elemento.removeEventListener('input', inputAlphaNumeric);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', inputAlphaNumeric);
            }
    //4.3. --------------------------- Alphanumeric end   -------------------------------------------

    //4.4. --------------------------- Text start -------------------------------------------
            if (restriccion==="text") {
                // Quitar los event listeners existentes
                
                elemento.removeEventListener('input', inputText);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', inputText);
            }
    //4.4. --------------------------- Text end   -------------------------------------------

    //4.5. --------------------------- Capitalizada start -------------------------------------------
            if (restriccion==="capitalized") {
                // Quitar los event listeners existentes
                
                elemento.removeEventListener('input', inputCapitalized);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', inputCapitalized);
            }
    //4.5. --------------------------- Capitalizada end   -------------------------------------------


    //4.6. --------------------------- Minúsculas start -------------------------------------------
            if (restriccion==="lowerCase") {
                // Quitar los event listeners existentes
                
                elemento.removeEventListener('input', inputLowercase);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', inputLowercase);
            }
    //4.6. --------------------------- Minúsculas end   -------------------------------------------

    //4.7. --------------------------- Minúsculas start -------------------------------------------
            if (restriccion==="upperCase") {
                // Quitar los event listeners existentes
                
                elemento.removeEventListener('input', inputUppercase);
                // Asignar nuevos event listeners
                elemento.addEventListener('input', inputUppercase);
            }
    //4.7. --------------------------- Minúsculas end   -------------------------------------------

//*No Copiar y no pegar

 

    //5. --------------------------- No pegar start -------------------------------------------
    if (restriccion === "noCopy") {
        const noCopyHandler= (event) =>{
            event.preventDefault();
            const inputGK = event.currentTarget;
            const elementosGK= document.querySelectorAll('[data-gatekeeper-element]');
            const objeto_INPUT_OUTPUT= find_Outpus_from_input(inputGK, elementosGK);
            if(inputGK.getAttribute(["data-gatekeeper-validations"])){

                const validationsDetailsFalse =[{
                    type: "noCopy",
                    validation:false
                }]

                accionarInfoGK(objeto_INPUT_OUTPUT,validationsDetailsFalse); 
                setTimeout(()=>{
                    const validationsDetailsFalse =[{
                        type: "noCopy",
                        validation:true
                    }]
    
                    accionarInfoGK(objeto_INPUT_OUTPUT,validationsDetailsFalse); 
                },2000)

            }


        }


        // Quitar los event listeners existentes para no pegar
        elemento.removeEventListener('copy', noCopyHandler);
        // Asignar nuevos event listeners para no pegar
        elemento.addEventListener('copy', noCopyHandler);
    }
    //5. --------------------------- No pegar end   -------------------------------------------
    //6. --------------------------- No pegar start -------------------------------------------
    if (restriccion === "noPaste") {
        const noPasteHandler= (event) =>{
            event.preventDefault();
            const inputGK = event.currentTarget;
            const elementosGK= document.querySelectorAll('[data-gatekeeper-element]');
            const objeto_INPUT_OUTPUT= find_Outpus_from_input(inputGK, elementosGK);
            if(inputGK.getAttribute(["data-gatekeeper-validations"])){

                const validationsDetailsFalse =[{
                    type: "noPaste",
                    validation:false
                }]

                accionarInfoGK(objeto_INPUT_OUTPUT,validationsDetailsFalse); 
                setTimeout(()=>{
                    const validationsDetailsFalse =[{
                        type: "noPaste",
                        validation:true
                    }]
    
                    accionarInfoGK(objeto_INPUT_OUTPUT,validationsDetailsFalse); 
                },2000)

               

            
            }


        }


        // Quitar los event listeners existentes para no pegar
        elemento.removeEventListener('paste', noPasteHandler);
        // Asignar nuevos event listeners para no pegar
        elemento.addEventListener('paste', noPasteHandler);
    }
    //6. --------------------------- No pegar end   -------------------------------------------


//* MaxLength y MinLength
    //7. --------------------------- Minúsculas start -------------------------------------------
    if (restriccion.includes("maxLength")) {
     

        //? Hay que agregar un evento cuando input extra

        // Quitar los event listeners existentes
        
        elemento.removeEventListener('input', inputMaxLength);
        // Asignar nuevos event listeners
        elemento.addEventListener('input', inputMaxLength);


     
    }
    //7. --------------------------- Minúsculas end   -------------------------------------------
    //8. --------------------------- Minúsculas start -------------------------------------------
    if (restriccion.includes("minLength")) {
     
        // Quitar los event listeners existentes
        
        elemento.removeEventListener('input', inputMinLength);
        // Asignar nuevos event listeners
        elemento.addEventListener('input', inputMinLength);
    }
    //8. --------------------------- Minúsculas end   -------------------------------------------




    //cedula_dom

//* Cedula Dominicana

// --------------------------- Cédula Dominicana start -------------------------------------------
if (restriccion === "cedula_dom") {
     
    // Quitar los event listeners existentes
    
    elemento.removeEventListener('input', formatear_cedula);
    // Asignar nuevos event listeners
    elemento.addEventListener('input', formatear_cedula);
}
// --------------------------- Cédula Dominicana end   -------------------------------------------




    });
}
