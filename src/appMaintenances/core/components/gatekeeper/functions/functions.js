//*1. Requerido:

     //  ----------------VALIDAR INPUT REQUERIDO START--------------- */
    export function validarCampoRequerido(input) {
        // Verificar si el valor del input no está vacío
        if (input.value.trim().length > 0) {
            return true;
        } else {
            return false;
        }
    }
    //  ----------------VALIDAR INPUT REQUERIDO END--------------- */

//*2. Numericos:

    //  ----------------RESTRINGIR INPUT SOLO NUMEROS START--------------- */
    
        export function restringirSoloNumeros(event) {
            //?Permite numeros enteros Positivos y enteros negativos
            // Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();
        
            // Obtener el valor actual del input
            let inputText = event.target.value;
        
            //Separar en dos segmentos
            let inputTextSeparado = inputText.split("-");

            //Si hay dos segmentos es porque hubo signo de menos entonces:
            if(inputTextSeparado.length>=2){        
                let segundoSegmento = inputTextSeparado[1];
                inputText = "-" + segundoSegmento.replace(/(?!^-)-|[^0-9-]/g, '');
        
                event.target.value = inputText;
            }
            else{
                        // Filtrar caracteres no numéricos permitiendo un signo negativo al principio
                    inputText = inputText.replace(/(?!^-)-|[^0-9-]/g, '');
                    // Asegurarse de que solo hay un signo negativo al principio
                    inputText = inputText.replace(/^-{2,}/, '-').replace(/-(?!\d)/g, '');
                
                    // Asignar el nuevo valor al input directamente
                    event.target.value = inputText;
            }
            

        
        }
    
        // ----------------RESTRINGIR INPUT SOLO NUMEROS END--------------- */


        // ----------------VALIDAR INPUT SOLO NUMEROS START--------------- */
        export function validarSoloNumeros(input) {
            //? Valida si es entero positivo y entero negativo
                    if(input.value.length>0){
                    let valor=input.value;
                    // Define a regular expression to match only digits
                    var regex = /^-?\d+$/;
                    
                
                    // Test the input against the regular expression
                    if (regex.test(valor)) {
                        
                    return true;
                    } else {
                
                    return false;
                    }
                }
                else{
                    return true;
                }
        }
        //----------------VALIDAR INPUT SOLO NUMEROS END--------------- */


        //  ----------------RESTRINGIR INPUT SOLO NUMEROS CON PUNTO (.) FLOTANTE START--------------- */
        export function restringirSoloNumeros_PuntoFlotante(event) {
            // Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();

            // Obtener el valor actual del input
            let inputText = event.target.value;

            
             

            //Separar en segmentos para permitir el signo de negativo(-)
            let inputTextSeparado = inputText.split("-");

            //Si hay dos segmentos es porque hubo signo de menos entonces:
            if(inputTextSeparado.length>=2){        
                let segundoSegmento = inputTextSeparado[1];
                inputText = "-" + segundoSegmento.replace(/[^0-9.]/g, '');
             
                if(inputText==="-."){
                    inputText="-0.1";
                }

              

                const partes = segundoSegmento.split('.');
             if (partes.length > 2) {
                 inputText = "-" + partes[0] + '.' + partes.slice(1).join('');
             }
             event.target.value = inputText;

            }
            else{
                inputText = inputText.replace(/[^0-9.]/g, '');

                if(inputText==="."){
                    inputText="0.1";
                }

                  // // Permitir solo un punto decimal
             const partes = inputText.split('.');
             if (partes.length > 2) {
                 inputText = partes[0] + '.' + partes.slice(1).join('');
             }
            

            // Asignar el nuevo valor al input directamente
            event.target.value = inputText;
            }



            


            
          
        }
        //  ----------------RESTRINGIR INPUT SOLO NUMEROS CON PUNTO (.) FLOTANTE END--------------- */

        //----------------VALIDAR INPUT SOLO NUMEROS CON PUNTO (.) FLOTANTE START START--------------- */
        export function validarSoloNumeros_PuntoFlotante(input) {
            if (input.value.length > 0) {
                let valor = input.value;
                // Define una expresión regular para coincidir solo con dígitos y puntos
                //var regex = /^[0-9]*\.?[0-9]*$/;
                var regex = /^-?\d+(\.\d+)?$/;
                
                // Prueba el valor del input contra la expresión regular
                if (regex.test(valor)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        
        }
        //----------------VALIDAR INPUT SOLO NUMEROS CON PUNTO (.) FLOTANTE START END--------------- */

        //  ----------------RESTRINGIR INPUT SOLO NUMEROS CON COMA (.) FLOTANTE START--------------- */

    
        export function restringirSoloNumeros_ComaFlotante(event) {

            // Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();

            // Obtener el valor actual del input
            let inputText = event.target.value;

            
             

            //Separar en segmentos para permitir el signo de negativo(-)
            let inputTextSeparado = inputText.split("-");

            //Si hay dos segmentos es porque hubo signo de menos entonces:
            if(inputTextSeparado.length>=2){        
                let segundoSegmento = inputTextSeparado[1];
                inputText = "-" + segundoSegmento.replace(/[^0-9,]/g, '');
             
                if(inputText==="-,"){
                    inputText="-0,1";
                }

              

                const partes = segundoSegmento.split(',');
             if (partes.length > 2) {
                 inputText = "-" + partes[0] + ',' + partes.slice(1).join('');
             }
             event.target.value = inputText;

            }
            else{
                inputText = inputText.replace(/[^0-9,]/g, '');

                if(inputText===","){
                    inputText="0,1";
                }

                  // // Permitir solo un punto decimal
             const partes = inputText.split(',');
             if (partes.length > 2) {
                 inputText = partes[0] + ',' + partes.slice(1).join('');
             }
            


            // Asignar el nuevo valor al input directamente
            event.target.value = inputText;
            }



            


        }
        
        //  ----------------RESTRINGIR INPUT SOLO NUMEROS CON COMA (.) FLOTANTE END--------------- */

        //----------------VALIDAR INPUT SOLO NUMEROS CON COMA (.) FLOTANTE START START--------------- */
        export function validarSoloNumeros_ComaFlotante(input) {
            if (input.value.length > 0) {
                let valor = input.value;
                // Define una expresión regular para coincidir solo con dígitos y puntos
                //var regex = /^[0-9]*,?[0-9]*$/;
                var regex = /^-?\d+(,\d+)?$/;
                
                // Prueba el valor del input contra la expresión regular
                if (regex.test(valor)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        
        }
        //----------------VALIDAR INPUT SOLO NUMEROS CON COMA (.) FLOTANTE START END--------------- */




        //  ----------------RESTRINGIR INPUT SOLO NUMEROS SEPARADORES DE MILES  START--------------- */
        export function restringirSoloNumeros_separadoresMiles(event) {
            // Obtener el valor actual del campo
            let valor = event.target.value;
            
            //Reemplazar letras
            valor = valor.replace(/[a-zA-Z]/g, '');
          
            // Si inicia con un punto ".", cambiarlo por "0.1"
            if (valor.startsWith('.')) {
                valor = '0.1' ;
            }

            // Si inicia con un punto ",", cambiarlo por "0"
            if (valor.startsWith(',')) {
                valor = '0' ;
            }
           

            //Si encuentra la cadena ",." elimina el punto
            if (valor.includes(',.')) {
                valor = valor.replace(',.', ',');
            }

            //Si encuentra la cadena ".," elimina el punto
            if (valor.includes('.,')) {
                valor = valor.replace('.,', '.');
            }

            //Si encuentra la cadena ".." elimina el punto
            if (valor.includes('..')) {
                valor = valor.replace('..', '.');
            }

            //Si encuentra la cadena ",," elimina el punto
            if (valor.includes(',,')) {
                valor = valor.replace(',,', '');
            }

            //Solo deja el primer punto de la coincidencia
            if (/\./.test(valor)) {
                //@@@@
                let puntoEncontrado = false;
                let nuevoValor = '';
            
                for (let i = 0; i < valor.length; i++) {
                    if (valor[i] === '.') {
                        if (!puntoEncontrado) {
                            nuevoValor += '.';
                            puntoEncontrado = true;
                        }
                    } else {
                        nuevoValor += valor[i];
                    }
                }
            
                valor = nuevoValor;
                //@@@@
            } 
            

            //Si no hay puntos decimales aplicar el localeString:
            if (!/\./.test(valor)) {
                //Divide cada 3 valores separados por coma
                valor = valor.replace(/,/g, '');
                valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }else{
                //1. dividir en dos segmentos separados por el punto
                let segmentos = valor.split('.');
                let segmento1= segmentos[0];
                let segmento2= segmentos[1];
                //2. al segmento 1 hacerle la transformacion
                segmento1 = segmento1.replace(/,/g, '');
                segmento1 = segmento1.replace(/\B(?=(\d{3})+(?!\d))/g, ",");


                if (segmento2.includes(',')) {
                    segmento2 = segmento2.replace(',', '');
                }

                //3. unir los segmentos y presentar
                valor = segmento1+"."+segmento2

              
            }


            //No permitir coma despues del punto:


            //Quitar todos los caracteres especiales excepto (,)(.)(-)
            valor = valor.replace(/[^0-9(),.-]/g, '');
            

             // Asegurarse de que solo hay un signo negativo al principio
            

           


            //Quitar 
            // Actualizar el valor del campo con las modificaciones
            event.target.value =  sanitizeString(valor);
        }
        function sanitizeString(str) {
            // Permite el símbolo "-" solo al principio
            if (str[0] === "-") {
                // Reemplaza todos los símbolos "-" excepto el primero
                return str[0] + str.slice(1).replace(/-/g, '');
            } else {
                // Reemplaza todos los símbolos "-"
                return str.replace(/-/g, '');
            }
        }
        //  ----------------RESTRINGIR INPUT SOLO NUMEROS SEPARADORES DE MILES  END--------------- */

        //----------------VALIDAR INPUT SOLO NUMEROS SEPARADORES DE MILES START--------------- */
        export function validarSoloNumeros_separadoresMiles(input) {
            if (input.value.length > 0) {
                let valor = input.value;
        
                //==================
                let validadorGeneral = true;
                let val_segmentos_numericos = true;
                let val_segmentos_flotantes = true;
                //1. Separar segmentos por (,)
                    let segmentos= valor.split(",")
                    //Comprobar que cada segmento sea numerico

                        for (let i = 0; i < segmentos.length; i++) {
                            const segmento = segmentos[i];
                            var regex = /^-?\d+(\.\d+)?$/;
                                
                            // Prueba el valor del input contra la expresión regular
                            if (regex.test(segmento)) {
                                val_segmentos_numericos= true
                                //return true;
                            } else {
                                val_segmentos_numericos= false
                                break;
                            // return false;
                            }
                        }

                        //console.log(val_segmentos_numericos)

                //2. Separar segmentos por (.)
                    let segmentos_float= valor.split(".")
                    //Si tiene mas de 2 segmentos: devuelve negativo
                    if (segmentos_float.length > 2) {
                        val_segmentos_flotantes = false;
                    }

                    if (segmentos_float.length == 2) {
                        //Evaluar segmento 2:
                        const segmentoEvaluar = segmentos_float[1];
                      
                        //Este segmento solo puede contener numeros
                    let regex_solonum=  /^[0-9\b]+$/;

                    if (regex_solonum.test(segmentoEvaluar)) {
                            val_segmentos_flotantes= true
                                //return true;
                            } else {
                                val_segmentos_flotantes= false
                            
                            // return false;
                            }
                    }

                    if (segmentos_float.length == 1){
                        val_segmentos_flotantes= true;
                    }
                    //console.log(segmentos_float)

                    

                //2. Comprobar si tiene algun (-) //No permitir mas de uno



                if(val_segmentos_numericos===false || val_segmentos_flotantes=== false){
                    validadorGeneral= false;
                

                }
                return validadorGeneral
                //==================




                
            } else {
                return true;
            }

        }
        //----------------VALIDAR INPUT SOLO NUMEROS SEPARADORES DE MILES  END--------------- */

//*3. No vacío:
        //----------------VALIDAR INPUT NO VACIO START--------------- */
        export function validarNotEmpty(input){

            if (input.value.trim().length > 0) {
                return true;
            }
            else{
                return false;
            }
        }

        //----------------VALIDAR INPUT NO VACIO END--------------- */

//*4. Texto:

        //----------------RESTRINGIR INPUT STRING START--------------- */
        export const inputString = (event) => {
            //? String (Mayus, Minus, Mayus con tilde, Minus con tilde y caracteres especiales) No números.
            
            //  Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();
          
            // Obtener el valor actual del input
            let inputText = event.target.value;
          
            // Filtrar caracteres no alfabéticos utilizando una expresión regular
           // inputText = inputText.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
           inputText = inputText.replace(/[0-9]/g, '');

          
            // Asignar el nuevo valor al input directamente
            event.target.value = inputText;
          };
        //----------------RESTRINGIR INPUT STRING END--------------- */

        //----------------VALIDAR INPUT STRING START--------------- */
        export function validarInputString(input) {
            // String (Mayus, Minus, Mayus con tilde, Minus con tilde y caracteres especiales) No números.
            if (input.value.length > 0) {
                let valor = input.value;
                
                // Define una expresión regular que permita letras, espacios y caracteres especiales, pero no números
                var regex = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s\W]*$/;
        
                // Prueba el valor del input contra la expresión regular
                if (regex.test(valor)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        
        //----------------VALIDAR INPUT STRING END--------------- */



        //----------------RESTRINGIR INPUT ALPHA START--------------- */
        export const inputAlpha = (event) => {
            //?  Alpha | Alfabéticos (Solo letras)(Mayus, Minus, Mayus con tilde, Minus con tilde y permitir el espacio)
            
            //  Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();
          
            // Obtener el valor actual del input
            let inputText = event.target.value;
          
            // Filtrar caracteres no alfabéticos utilizando una expresión regular
            inputText = inputText.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
          

          
            // Asignar el nuevo valor al input directamente
            event.target.value = inputText;
          };
        //----------------RESTRINGIR INPUT ALPHA END--------------- */

        //----------------VALIDAR INPUT ALPHA START--------------- */
        export function validarInputAlpha(input) {
            //?  Alpha | Alfabéticos (Solo letras)(Mayus, Minus, Mayus con tilde, Minus con tilde y permitir el espacio)

            if (input.value.length > 0) {
                let valor = input.value;
                
                // Define una expresión regular que permita letras, espacios y caracteres especiales, pero no números
                var regex = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]*$/;
        
                // Prueba el valor del input contra la expresión regular
                if (regex.test(valor)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        
        //----------------VALIDAR INPUT ALPHA END--------------- */





        //----------------RESTRINGIR INPUT ALPHANUMERIC START--------------- */
        export const inputAlphaNumeric = (event) => {
            //?   AlphaNumeric | (Mayus, Minus, Mayus con tilde, Minus con tilde , numeros, espacio)
            
            //  Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();
          
            // Obtener el valor actual del input
            let inputText = event.target.value;
          
            // Filtrar caracteres no alfabéticos utilizando una expresión regular
            inputText = inputText.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s]/g, '');          

          
            // Asignar el nuevo valor al input directamente
            event.target.value = inputText;
          };
        //----------------RESTRINGIR INPUT ALPHANUMERIC END--------------- */

        //----------------VALIDAR INPUT ALPHANUMERIC START--------------- */
        export function validarInputAlphaNumeric(input) {
            //?   AlphaNumeric | (Mayus, Minus, Mayus con tilde, Minus con tilde , numeros, espacio)

            if (input.value.length > 0) {
                let valor = input.value;
                
                // Define una expresión regular que permita letras, espacios y caracteres especiales, pero no números
                var regex = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9\s]*$/;
        
                // Prueba el valor del input contra la expresión regular
                if (regex.test(valor)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        
        //----------------VALIDAR INPUT ALPHANUMERIC END--------------- */





        //----------------RESTRINGIR INPUT TEXT START--------------- */
        export const inputText = (event) => {
            //?   text deja pasar todo
            
            //  Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();
          
            // Obtener el valor actual del input
            let inputText = event.target.value;
          
            //inputText = inputText.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s]/g, '');          

          
            // Asignar el nuevo valor al input directamente
            event.target.value = inputText;
          };
        //----------------RESTRINGIR INPUT TEXT END--------------- */

        //----------------VALIDAR INPUT TEXT START--------------- */
        export function validarInputText(input) {
            //?   Text deja pasar todo

            if (input.value.length > 0) {
                // let valor = input.value;
                
                // // Define una expresión regular que permita letras, espacios y caracteres especiales, pero no números
                // var regex = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ0-9\s]*$/;
        
                // // Prueba el valor del input contra la expresión regular
                // if (regex.test(valor)) {
                //     return true;
                // } else {
                //     return false;
                // }

                return true
            } else {
                return true;
            }
        }
        
        //----------------VALIDAR INPUT TEXT END--------------- */





        //----------------RESTRINGIR INPUT CAPITALIZED START--------------- */
        export const inputCapitalized = (event) => {
            // Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();
        
            // Obtener el valor actual del input
            let inputText = event.target.value;

            // Capitalizar la primera letra de cada palabra
            inputText = inputText.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

            // Asignar el nuevo valor al input directamente
            event.target.value = inputText;
        };
        //----------------RESTRINGIR INPUT CAPITALIZED END--------------- */

        //----------------VALIDAR INPUT CAPITALIZED START--------------- */
        export function validarInputCapitalized(input) {
            if (input.value.length > 0) {
                // Obtener el valor del input
                let valor = input.value;

                valor = valor.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());//! chivo

                // Verificar que cada palabra esté capitalizada
                var regex = /^([A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*\s?)*[A-ZÁÉÍÓÚÜÑ]?$/;

                // Prueba el valor del input contra la expresión regular
                if (regex.test(valor)) {
                    return true;
                } else {
            
                    return false;
                }
            } else {
                return true;
            }
        }
        //----------------VALIDAR INPUT CAPITALIZED END--------------- */




        //----------------RESTRINGIR INPUT LOWERCASE START--------------- */
        export const inputLowercase = (event) => {
            // Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();

            // Obtener el valor actual del input
            let inputText = event.target.value;

            // Convertir el texto a minúsculas
            inputText = inputText.toLowerCase();

            // Asignar el nuevo valor al input directamente
            event.target.value = inputText;
        };
        //----------------RESTRINGIR INPUT LOWERCASE END--------------- */

        //----------------VALIDAR INPUT LOWERCASE START--------------- */
        export function validarInputLowercase(input) {
            if (input.value.length > 0) {
                // Obtener el valor del input
                let valor = input.value;
                


                // Verificar que todo el texto esté en minúsculas
                var regex = /^([a-záéíóúüñ0-9\s])*$/;

                // Prueba el valor del input contra la expresión regular
                if (regex.test(valor)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        //----------------VALIDAR INPUT LOWERCASE END--------------- */




        //----------------RESTRINGIR INPUT UPPERCASE START--------------- */
        export const inputUppercase = (event) => {
            // Prevenir que se ejecute el comportamiento por defecto del input
            event.preventDefault();

            // Obtener el valor actual del input
            let inputText = event.target.value;

            // Convertir el texto a mayúsculas
            inputText = inputText.toUpperCase();

            // Asignar el nuevo valor al input directamente
            event.target.value = inputText;
        };
        //----------------RESTRINGIR INPUT UPPERCASE END--------------- */

        //----------------VALIDAR INPUT UPPERCASE START--------------- */
        export function validarInputUppercase(input) {
            if (input.value.length > 0) {
                // Obtener el valor del input
                let valor = input.value;

                // Verificar que todo el texto esté en mayúsculas
                var regex = /^([A-ZÁÉÍÓÚÜÑ0-9\s])*$/;

                // Prueba el valor del input contra la expresión regular
                if (regex.test(valor)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        //----------------VALIDAR INPUT UPPERCASE END--------------- */

//* MaxLength y MinLength:

        //----------------RESTRINGIR INPUT MAXLENGTH START--------------- */
        export const inputMaxLength = (event) => {
            // Obtener el elemento de input
            let input = event.target;

            // Obtener el atributo "data-gatekeeper-validations"
            let atributo = input.getAttribute("data-gatekeeper-validations");

            // Extraer el número dentro de maxLength usando una expresión regular
            let maxLengthMatch = atributo.match(/maxLength=\{(\d+)\}/);

            // Si se encuentra el maxLength, usarlo; de lo contrario, usar 8 por defecto
            let maxLength = maxLengthMatch ? parseInt(maxLengthMatch[1], 10) : 8;

            // Obtener el valor actual del input
            let inputText = input.value;

            // Verificar si el texto del input tiene más caracteres que maxLength
            if (inputText.length > maxLength) {
                // Si es así, truncar el texto a los primeros maxLength caracteres
                inputText = inputText.slice(0, maxLength);
            }

            // Asignar el nuevo valor al input directamente
            input.value = inputText;
        };
        //----------------RESTRINGIR INPUT MAXLENGTH END--------------- */


        //----------------VALIDAR INPUT MAXLENGTH START--------------- */
        export const validarMaxLength = (input) => {
            // Obtener el elemento de input

            // Obtener el atributo "data-gatekeeper-validations"
            let atributo = input.getAttribute("data-gatekeeper-validations");

            // Extraer el número dentro de maxLength usando una expresión regular
            let maxLengthMatch = atributo.match(/maxLength=\{(\d+)\}/);

            // Si se encuentra el maxLength, usarlo; de lo contrario, usar 8 por defecto
            let maxLength = maxLengthMatch ? parseInt(maxLengthMatch[1], 10) : 8;

            // Obtener el valor actual del input
            let inputText = input.value;

            // Verificar si el texto del input tiene más caracteres que maxLength
            return inputText.length === 0 || inputText.length <= maxLength;
        };
        //----------------VALIDAR INPUT MAXLENGTH END--------------- */






        //----------------RESTRINGIR INPUT MINLENGTH START--------------- */
        export const inputMinLength = (event) => {
            // Obtener el elemento de input
            let input = event.target;

            // Obtener el atributo "data-gatekeeper-validations"
            let atributo = input.getAttribute("data-gatekeeper-validations");

            // Extraer el número dentro de minLength usando una expresión regular
            let minLengthMatch = atributo.match(/minLength=\{(\d+)\}/);

            // Si se encuentra el minLength, usarlo; de lo contrario, usar 0 por defecto
            let minLength = minLengthMatch ? parseInt(minLengthMatch[1], 10) : 0;

            // Obtener el valor actual del input
            let inputText = input.value;

            // Verificar si el texto del input tiene menos caracteres que minLength
            if (inputText.length < minLength) {
                // Si es así, no permitir que se eliminen caracteres por debajo del minLength
                event.preventDefault();
            }
        };
        //----------------RESTRINGIR INPUT MINLENGTH END--------------- */

        //----------------VALIDAR INPUT MINLENGTH START--------------- */
        export const validarMinLength = (input) => {
            // Obtener el atributo "data-gatekeeper-validations"
            let atributo = input.getAttribute("data-gatekeeper-validations");

            // Extraer el número dentro de minLength usando una expresión regular
            let minLengthMatch = atributo.match(/minLength=\{(\d+)\}/);

            // Si se encuentra el minLength, usarlo; de lo contrario, usar 0 por defecto
            let minLength = minLengthMatch ? parseInt(minLengthMatch[1], 10) : 0;

            // Obtener el valor actual del input
            let inputText = input.value;

            // Verificar si el texto del input tiene menos caracteres que minLength
            return inputText.length >= minLength;
        };
        //----------------VALIDAR INPUT MINLENGTH END--------------- */



//* Email:


        //----------------VALIDAR INPUT EMAIL START--------------- */
        export function validarInputEmail(input) {
        
                // Obtener el valor del input
                let valor = input.value;

            
                // Verificar que cada palabra esté capitalizada
                // eslint-disable-next-line no-useless-escape
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                // Prueba el valor del input contra la expresión regular
                if (regex.test(valor)) {
                    return true;
                } else {
            
                    return false;
                }
            
        }
        //----------------VALIDAR INPUT EMAIL END--------------- */

//* URL:

//----------------VALIDAR INPUT URL START---------------
export function validarInputURL(input) {
    
    // Obtener el valor del input
    let valor = input.value;

    // Expresión regular para validar una URL que comienza con http o https
    var regex = /^(https?:\/\/)?(([a-zA-Z0-9\-_]+\.)+([a-zA-Z]{2,})|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/.*)?$/;

    // Prueba el valor del input contra la expresión regular
    if (regex.test(valor)) {
        return true;
    } else {
        return false;
    }

}
//----------------VALIDAR INPUT URL END---------------

//----------------VALIDAR TARJETA DE CREDITO START---------------
export function validarTarjetaCredito(input) {
      // Obtener el valor del input
      let valor = input.value;
    
    // Eliminar espacios o guiones del número de tarjeta
        valor = valor.replace(/\D/g, '');
    
    // Expresión regular para validar el formato del número de tarjeta (Visa, MasterCard, Amex, etc.)
    var regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    
    // Verificar el formato
    if (!regex.test(valor)) {
        return false;
    }

    // Validar usando el algoritmo de Luhn
    let suma = 0;
    let alternar = false;

    for (let i = valor.length - 1; i >= 0; i--) {
        let digito = parseInt(valor.charAt(i), 10);

        if (alternar) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }

        suma += digito;
        alternar = !alternar;
    }

    // Si la suma es divisible por 10, el número de tarjeta es válido
    return (suma % 10 === 0);
}
//----------------VALIDAR TARJETA DE CREDITO END---------------



//----------------VALIDAR SQL START---------------


// eslint-disable-next-line no-unused-vars
function validateInput(input) {
    // Limitar la longitud de la entrada
    if (input.length > 100) {
        console.warn("Entrada demasiado larga:", input);
        return false;
    }

    // Lista blanca de caracteres permitidos (a-z, A-Z, 0-9, espacios, y algunos símbolos comunes)
    const regex = /^[a-zA-Z0-9\s\-_@.]+$/;

    // Lista negra de patrones SQL peligrosos
    const blacklistedPatterns = [
        /\bSELECT\b/i, /\bINSERT\b/i, /\bUPDATE\b/i, /\bDELETE\b/i, /\bDROP\b/i, /\bUNION\b/i, /\bALTER\b/i,
        /\bCREATE\b/i, /\bTRUNCATE\b/i, /\bREPLACE\b/i, /\bGRANT\b/i, /\bREVOKE\b/i, /\bRENAME\b/i,
        /\bDESCRIBE\b/i, /\bSHOW\b/i, /--/, /;/, /\bOR\b/i, /\bAND\b/i
    ];

    // Comprobar si el input contiene patrones peligrosos
    const containsBlacklistedPattern = blacklistedPatterns.some(pattern => pattern.test(input));

    if (containsBlacklistedPattern) {
        console.warn("Entrada sospechosa detectada (patrón SQL):", input);
        return false;
    }

    // Si el input coincide con la expresión regular y no contiene patrones peligrosos, es seguro
    if (regex.test(input)) {
        return true;
    } else {
        console.warn("Entrada sospechosa detectada (caracteres inválidos):", input);
        return false;
    }
}


//----------------VALIDAR SQL END---------------



//----------------RESTRINGIR CEDULA DOMINICANA START---------------

export function formatear_cedula(event) {
    var valor = event.target.value;
    
    // Remover caracteres no numéricos
    var regex = /[^0-9]/g;
    valor = valor.replace(regex, "");
    
    // Formatear cadena
    const segmento1 = valor.slice(0, 3);
    const segmento2 = valor.slice(3, 10);
    const segmento3 = valor.slice(10, 11);
    
    var cadenaFormateada = "";
    
    if (segmento1.length > 0) {
      cadenaFormateada += segmento1;
      
      if (segmento2.length > 0) {
        cadenaFormateada += "-" + segmento2;
        
        if (segmento3.length > 0) {
          cadenaFormateada += "-" + segmento3;
        }
      }
    }
    
    event.target.value = cadenaFormateada;
    
    return cadenaFormateada;
  }

//----------------RESTRINGIR CEDULA DOMINICANA END-----------------


//----------------VALIDAR CEDULA DOMINICANA START-----------------
//algoritmo_validacion_Cedula(valor.replaceAll("-",""));
export  function algoritmo_validacion_Cedula(input) {

    let valor = input.value;
    valor = valor.replace(/\D/g, '');

    let cedula = valor;

    let verificador = 0;
    let digito = 0;
    let digitoVerificador = 0;
    let digitoImpar = 0;
    let sumaPar = 0;
    let sumaImpar = 0;
    const longitud = cedula.length;
  
    try {
      if (longitud === 11) {
        digitoVerificador = parseInt(cedula.substring(10, 11));
  
        for (let i = 9; i >= 0; i--) {
          digito = parseInt(cedula.substring(i, i + 1));
  
          if (i % 2 !== 0) {
            digitoImpar = digito * 2;
  
            if (digitoImpar >= 10) {
              digitoImpar -= 9;
            }
  
            sumaImpar += digitoImpar;
          } else {
            sumaPar += digito;
          }
        }
  
        verificador = 10 - ((sumaPar + sumaImpar) % 10);
  
        if ((verificador === 10 && digitoVerificador === 0) || verificador === digitoVerificador) {
          return true;
        }
      } else {
        ////console.log("La cédula debe contener once(11) dígitos");
        return false
      }
    } catch (error) {
      ////console.log("No se pudo validar la cédula");
      return false;
    }
  
    return false;
  }
//----------------VALIDAR CEDULA DOMINICANA END-----------------








