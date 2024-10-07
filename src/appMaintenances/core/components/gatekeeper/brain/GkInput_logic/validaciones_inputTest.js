

//VVALIDANDO TEST:

export async function validar_input_TEST(testInputCollection, element) {
    let resultadoAllValidaciones = [];

    //1. Iterar la colleccion y verificar si hay algun test que aplique para este elemento
    for (const testPropiedades of testInputCollection) {
        //Si hay alguno entonces se debe hacer el test:
        if (testPropiedades.name === element.name && testPropiedades.test != undefined) {
            //Itera en los test a realizar
            const testRealizar = testPropiedades.test;
            const inputValue = element.value;
            const inputName = element.name;

            if (Array.isArray(testRealizar)) {
                for (const test of testRealizar) {
                    const resultadoValidacion = await realizarValidacion(test, inputValue, inputName);
                    resultadoAllValidaciones.push(resultadoValidacion);
                }
            }
        }
    }

    return resultadoAllValidaciones;
}

async function realizarValidacion(test, inputValue, inputName) {
    // 1. Capturar la función dentro del test y evaluar que sea tipo función 
    const testFuncion = test.func;
    const name_test = test.name_test;

    if (typeof testFuncion === "function") {
        try {
            const resultadoValidacion = await testFuncion(inputValue);
            //console.log("termino");
            let validacionResult = false;

            // Si el resultado no es True or false entonces la devuelta es false
            if (resultadoValidacion !== true && resultadoValidacion !== false) {
                validacionResult = false;
                console.error(`Error in function "${name_test}"`);
                console.error(`The function corresponding to the test "${name_test}" in the field named "${inputName}" is not returning a true or false result... The function must be adjusted to return a true or false value when performing the test.`);
            } else {
                validacionResult = resultadoValidacion;
            }

            const objeto = {
                type: name_test,
                validation: validacionResult,
            };
            
            return objeto;

        } catch (error) {
            console.error(`Error in function "${name_test}":`, error);
            return {
                type: name_test,
                validation: false,
                error: error.message
            };
        }
    } else {
        console.error(`The test function for "${name_test}" is not a valid function.`);
        return {
            type: name_test,
            validation: false,
            error: 'Test function is not valid'
        };
    }
}


