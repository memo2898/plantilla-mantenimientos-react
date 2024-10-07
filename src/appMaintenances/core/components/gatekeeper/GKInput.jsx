/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// GKInput.js
// eslint-disable-next-line no-unused-vars
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// GKInput.js
// eslint-disable-next-line no-unused-vars
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { ContextoForm } from './GKForm'; // Asegúrate de importar correctamente el contexto
import { generateUUID } from './functions/special_functions';

const GKInput = forwardRef(({ type, name, value, onChange, autocomplete, validations, test, ...props }, ref) => {
  const { valorContextoForm, setValorContextoForm } = useContext(ContextoForm);

  const [nameInput, setNameInput] = useState(() => {
    return name === undefined || name.trim().length === 0 ? `inputUUID-${generateUUID()}` : name;
  });

  useEffect(() => {
    // Aquí guardaremos los test:
    const valorGuardar = {
      name: nameInput,
      test: test,
      element: "input",
      type: type
    };

    if (nameInput.trim().length > 0) {
      // Evitar duplicados basados en el nombre del input
      setValorContextoForm((prevValorContextoForm) => {
  
        let testInputCollection = [...prevValorContextoForm.testInputCollection];
        

        // Verificar si ya existe un input con el mismo nombre
        const exists = testInputCollection.some(input => input.name === nameInput);

        if (!exists) {
        
          testInputCollection.push(valorGuardar);
        } else {
         
          // Eliminar el duplicado si ya existe
          testInputCollection = testInputCollection.filter(input => input.name !== nameInput);
          // Agregar el nuevo valor
          testInputCollection.push(valorGuardar);
        }

    

        // Retornar el nuevo estado actualizado
        return {
          ...prevValorContextoForm,
          testInputCollection: testInputCollection
        };
      });
    }
  }, [nameInput, test, setValorContextoForm]);

  return (
    <input
      ref={ref}
      type={type}
      name={nameInput}
      defaultValue={value}
      data-gatekeeper-element="input"
      data-gatekeeper-validations={validations}
      autoComplete={autocomplete}
      onChange={onChange}
      {...props} // Pasar todas las props adicionales al input
    />
  );
});

export default GKInput;
