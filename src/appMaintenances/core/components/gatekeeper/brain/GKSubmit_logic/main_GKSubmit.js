
import { accionarInfoGK, find_Outpus_from_input } from "../GKInfo_logic/main_GKInfo"
import { re_validacionSelectsGK } from "../GKSelect_logic/re_validacion";
import { validar_select } from "../GKSelect_logic/validaciones";
import { validar_input, validar_input_file } from "../GkInput_logic/validaciones";
import { validar_input_TEST } from "../GkInput_logic/validaciones_inputTest";
import { buildBodyForm } from "./bodyForm";
import { re_validacionInputsGK } from "./re_validacion";


export default async function GKSubmit_logic(onSubmit, elementosGK, inputsGK,FormResultsGK,valorContextoForm, selectsGK){

 

//?1. LOGICA PARA LOS INPUTS:
    const re_validacionInputsAll= await revalidarInputs(inputsGK,elementosGK,valorContextoForm)
    const inputsGeneralValidation = re_validacionInputsAll.every((item) => item.input_general_validation === true); //! Esto quiza cambie en el futuro

   
    
//?2. LOGICA PARA LOS SELECTS:
    const re_validacionSelectsAll = revalidarSelects(selectsGK,elementosGK);
    const selectsGeneralValidation = re_validacionSelectsAll.every((item) => item.input_general_validation === true);

//? Armando resultados finales:

let general_validation= true;
if(!inputsGeneralValidation || !selectsGeneralValidation){
    general_validation= false;
}

let input_details = [...re_validacionInputsAll, ...re_validacionSelectsAll]
//Agregando indice a cada elemento:
input_details.forEach((detail, index)=>{
    detail.input_order=detail.input_order+index;
})

 //? Construir el form_body
            


        const objetoRespuesta ={
            form_body:buildBodyForm(input_details),
            general_validation:general_validation,
            input_details:input_details
        }


    
       
        //? Verificar si existe algun GKResult para imprimir en el DOM la respuesta general de la validacion
        FormResultsGK.forEach((formResult)=>{
            const infoTrue = formResult.getAttribute("data-validation-true") || "";
            const infoFalse = formResult.getAttribute("data-validation-false")||"";

            if(general_validation){
                formResult.innerText=infoTrue
                formResult.classList.add("gk_result_g_true")
                formResult.classList.remove("gk_result_g_false")
               
            }else{
                formResult.innerText=infoFalse
                formResult.classList.remove("gk_result_g_true")
                formResult.classList.add("gk_result_g_false")
            }
            
        })




        //Devolver respuesta al programador: YUPIIIIII
        onSubmit(objetoRespuesta)

       
}

async function revalidarInputs(inputsGK, elementosGK, valorContextoForm) {
    
    const re_validacionInputsAll = [];

    // Usamos for...of para iterar sobre inputsGK
    // eslint-disable-next-line no-unused-vars
    for (const [index, inputGK] of inputsGK.entries()) {
        // Re validar los campos y traer la info de la re validacion
        const objeto_INPUT_OUTPUT = find_Outpus_from_input(inputGK, elementosGK);

        if (inputGK.getAttribute(["data-gatekeeper-validations"])) {
            const validaciones_plain = inputGK.getAttribute(["data-gatekeeper-validations"]);
            const validaciones = validaciones_plain.split(",");

            const tipoInput = inputGK.type;
            const inputsStandard = ["text","password","number"]

            
            let validationsDetails = []

            //? Si son input standard:
            if(inputsStandard.includes(tipoInput)){   
                validationsDetails = validar_input(validaciones, inputGK); //Capturar las validaciones del input 
            }

            //? Si es input file:
            if(tipoInput=="file"){
                validationsDetails = validar_input_file(validaciones, inputGK);
            }

            
            const coleccionTest = valorContextoForm.testInputCollection;
            const TestValidationsDetails = await validar_input_TEST(coleccionTest, inputGK); // Capturar las validaciones del input que se añadieron por test
        

            let validationsMerge = [];
            if (TestValidationsDetails.length > 0) {
                validationsMerge = [...TestValidationsDetails, ...validationsDetails];
            } else {
                validationsMerge = validationsDetails;
            }

            accionarInfoGK(objeto_INPUT_OUTPUT, validationsMerge); // Accionamos los inputs
            const respuesta = re_validacionInputsGK(objeto_INPUT_OUTPUT, validationsMerge); // Traemos la info de la re validacion
            re_validacionInputsAll.push(respuesta);
        }
    }

    // Devolver las respuestas de revalidación
    return re_validacionInputsAll;
}


function revalidarSelects(selectsGK,elementosGK){
    const re_validacionSelectsAll = []
    //1. Para cada elemento inputGK de elementosGK hacer:
    selectsGK.forEach((selectGK )=> {
       //1. Re validar los campos y traer la info de la re validacion
       const objeto_INPUT_OUTPUT= find_Outpus_from_input(selectGK, elementosGK);
       if(selectGK.getAttribute(["data-gatekeeper-validations"])){
           const validaciones_plain = selectGK.getAttribute(["data-gatekeeper-validations"]);
           const validaciones = validaciones_plain.split(",");
           const validationsDetails = validar_select(validaciones, selectGK)
   
         
        
       
   
           accionarInfoGK(objeto_INPUT_OUTPUT,validationsDetails); //Accionamos los inputs
           const respuesta = re_validacionSelectsGK(objeto_INPUT_OUTPUT,validationsDetails)//Traemos la info de la re validacion
           re_validacionSelectsAll.push(respuesta)
       
       }
   

   
   });

   return re_validacionSelectsAll
}