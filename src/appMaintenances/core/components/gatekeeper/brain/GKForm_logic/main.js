import GKSubmit_logic from '../GKSubmit_logic/main_GKSubmit.js';
import { find_Outpus_from_input } from '../GKInfo_logic/main_GKInfo.js';
import GKInput_logic from '../GkInput_logic/main_GKInput.js'
import GKSelect_logic from '../GKSelect_logic/main_GKSelect.js';

export default function GKForm_logic(elementosGK, onSubmit, valorContextoForm) {


//-- Aislando elementos con uso dependendiente start:
      const elementosGKInfo = findAll_GKElement_type(elementosGK,"info");
     const inputsGK = findAll_GKElement_type(elementosGK,"input");
     const FormResultsGK = findAll_GKElement_type(elementosGK,"form_result");
     const selectsGK = findAll_GKElement_type(elementosGK,"select");
//-- Aislando elementos con uso dependendiente end

// -- Recorrer elementos principales para colocarle las acciones start:
  elementosGK.forEach(elemento => {

    if (elemento.attributes["data-gatekeeper-element"]) {
      const elementoGK = elemento;


      const tipoGKElement = elemento.attributes["data-gatekeeper-element"];
      const valor = tipoGKElement.value;

      //? Si es Input
      if (valor === "input") {
        //console.log("importar Logica de input") 
        //Encontrar los elementos OUTPUT de este elemento Input:
          const objeto_INPUT_OUTPUT= find_Outpus_from_input(elementoGK, elementosGKInfo);

        //Enviar el elementoGk y sus elementos OUTPUT a la logica:
          GKInput_logic( elementoGK,objeto_INPUT_OUTPUT, valorContextoForm); //? Esto es para input TEXT
      }

      //? Si es btn submit
      if (valor === "submit_button") {
       
        
            const devolviendo = async () => {
            //!Devolver data
            //onSubmit(elementosGK);

            await GKSubmit_logic(onSubmit, elementosGK,inputsGK,FormResultsGK,valorContextoForm,selectsGK)
            };

            if (!elementoGK.getAttribute("data-event-listener-added")) {
                    elementoGK.addEventListener("click", devolviendo);
                    elementoGK.setAttribute("data-event-listener-added", "true");
            }
      }

      //? Si es Select
      if (valor === "select") {

        //Info es dependiente de Inputs ... Por eso no hay codigo aquí.
        //console.log("importar Logica de info")
         //Encontrar los elementos OUTPUT de este elemento Input:
         const objeto_INPUT_OUTPUT= find_Outpus_from_input(elementoGK, elementosGKInfo);
         
         //Enviar el elementoGk y sus elementos OUTPUT a la logica:
          GKSelect_logic( elementoGK,objeto_INPUT_OUTPUT, valorContextoForm);


      }
      //? Si es Info
      if (valor === "info") {
        //Info es dependiente de Inputs ... Por eso no hay codigo aquí.
        //console.log("importar Logica de info")
      }
      //? Si es Result
      if (valor === "result") {
        //console.log("importar Logica de result")
      }
    }
  });

// -- Recorrer elementos principales para colocarle las acciones end
}

//---å
export function findAll_GKElement_type(elementosGK, type){

  /**
   * Recibe todos los elementos
   * Recibe el tipo de elemento a buscar
   * Devuelve todos los elementos  de ese tipo
   */

  const elementosGKType = []
  elementosGK.forEach(elemento => {

    if (elemento.attributes["data-gatekeeper-element"]) {
      const elementoGK = elemento;
      const tipoGKElement = elemento.attributes["data-gatekeeper-element"];
      const valor = tipoGKElement.value;

     

      //? Si es Info
      if (valor === type) {
        //Info es dependiente de Inputs ... Por eso no hay codigo aquí.
        //console.log("importar Logica de info")
        elementosGKType.push(elementoGK)
      }
     
    }
  });

  return elementosGKType
}