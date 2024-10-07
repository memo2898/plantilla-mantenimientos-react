import { accionarInfoGK } from "../GKInfo_logic/main_GKInfo";
import { restringir_input } from "./restricciones";
import { validar_input, validar_input_file } from "./validaciones";
import { validar_input_TEST } from "./validaciones_inputTest";
import { validar_input_solo_cuando_input } from "./validaciones_solo_cuando_input";


export default function GKInput_logic( element, objeto_INPUT_OUTPUT, valorContextoForm){

    /**
     * Recibe el elemento el cual se le aplicará las validaciones y restricciones
     * Opcional...Recibe {objeto_INPUT_OUTPUT} Este es el objeto que contiene los elementos de salida de este input
     */

    
if(element.getAttribute(["data-gatekeeper-validations"])){


    //1. Capturar la info necesaria de los atributos
    const validaciones_plain = element.getAttribute(["data-gatekeeper-validations"]);
    const validaciones = validaciones_plain.split(",");

    const tipoInput = element.type;
    const inputsStandard = ["text","password","number"]

        
            
            //2. Agregar validador con evento
                element.addEventListener("blur", async ()=>{

                    let validationsDetails = []


                    //? Si son input standard:
                    if(inputsStandard.includes(tipoInput)){   
                        validationsDetails = validar_input(validaciones, element); //Capturar las validaciones del input 
                    }

                    //? Si es input file:
                        if(tipoInput=="file"){
                            validationsDetails = validar_input_file(validaciones, element);
                        }




                    const coleccionTest = valorContextoForm.testInputCollection
                    const TestValidationsDetails = await validar_input_TEST(coleccionTest, element); //Capturar las validaciones del input que se añadieron por test


                    let validationsMerge=[];
                    if(TestValidationsDetails.length>0){
                        validationsMerge = [...TestValidationsDetails, ...validationsDetails]

                    }else{
                        validationsMerge = validationsDetails
                    }

                    //?Combinar ambos arreglos:
                        //here


                    accionarInfoGK(objeto_INPUT_OUTPUT,validationsMerge) //? Este es el OUTPUT de la validaciones
                    
                })
            //2.2 Validaciones que se deben ejecutar cuando se digita en el campo de texto:
                element.addEventListener("input", ()=>{
                    
                    const validationsDetails = validar_input_solo_cuando_input(validaciones, element)
                    accionarInfoGK(objeto_INPUT_OUTPUT,validationsDetails) //? Este es el OUTPUT de la validaciones
                    
                })
      

            //1. Restringir input
                restringir_input(validaciones, element)


            



       
        }

        
        
    
}


