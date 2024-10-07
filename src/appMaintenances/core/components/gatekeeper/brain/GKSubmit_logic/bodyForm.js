export function buildBodyForm(allInputs) {
    if (!Array.isArray(allInputs)) {
        console.error("Entrada inválida: allInputs debe ser un array");
        return;
    }

    const objetoForm = {};
    // 1. Recorrer cada input
    allInputs.forEach(input => {
        // Relación clave valor
        // 1. determinar el nombre de la clave
        const clave = input["input_name"].length > 0 ? input["input_name"] : input["input_order"];
        // 2. determinar el valor procesando las validaciones
        const valorProcesado = processValidationDetails(input);
        objetoForm[clave] = valorProcesado;
    });
    
    return objetoForm;
}



function processValidationDetails(input) {
    let processedValue = input.value;

    const { validations_details } = input;

    if (!Array.isArray(validations_details)) {
        console.warn("validations_details faltante o inválido en input:", input);
        return processedValue;
    }

    validations_details.forEach(detail => {
        if (!detail || typeof detail !== 'object') {
            console.warn("Detalle de validación inválido, se omite:", detail);
            return;
        }

        const { type } = detail;

        switch (type) {
            case 'integer':
                    processedValue.length==0? processedValue=0:processedValue = parseInt(processedValue, 10);
                break;
            case 'string':
                    processedValue = String(processedValue);
                break;
            case 'float':
                    processedValue.length==0? processedValue=0:processedValue = parseFloat(processedValue, 10);
                break;
            // Agrega más casos según los tipos de validación que necesites manejar
            default:
                // Manejo de tipos desconocidos, si es necesario
                break;
        }
    });

    ///console.log(`Tipo de dato después de procesar: ${typeof processedValue}`);
    return processedValue;
}
