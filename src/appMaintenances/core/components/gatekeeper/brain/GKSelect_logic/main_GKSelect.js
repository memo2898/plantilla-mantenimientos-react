import { accionarInfoGK } from "../GKInfo_logic/main_GKInfo";
import { validar_select } from "./validaciones";

// eslint-disable-next-line no-unused-vars
export default function GKSelect_logic( element, objeto_INPUT_OUTPUT, valorContextoForm){

   

    if(element.getAttribute(["data-gatekeeper-validations"])){
   

        const validaciones_plain = element.getAttribute(["data-gatekeeper-validations"]);
        const validaciones = validaciones_plain.split(",");



            //2. Agregar validador con evento
            element.addEventListener("blur", ()=>{
                const validationsDetails = validar_select(validaciones, element); //Capturar las validaciones del Select 
                accionarInfoGK(objeto_INPUT_OUTPUT,validationsDetails) //? Este es el OUTPUT de la validaciones
                
            })
    
    }
    


}