/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// GKInput.js
// eslint-disable-next-line no-unused-vars
import React, { forwardRef, useEffect, useState } from 'react';
const GKInfo = forwardRef(({ listen, validations, ...props }, ref) => {
  const [cadenaTrue, setCadenaTrue] = useState("");
  const [cadenaFalse, setCadenaFalse] = useState("");

  useEffect(() => {
    const cadenaExtraidaTrue = obtenerCadena(validations, "message_true");
    setCadenaTrue(cadenaExtraidaTrue);
    const cadenaExtraidaFalse = obtenerCadena(validations, "message_false");
    setCadenaFalse(cadenaExtraidaFalse);
  }, [validations]);

  return (
    <>
      {listen === undefined ? (
        <span>Listen undefined</span>
      ) : (
        <ul
          ref={ref}
          {...props}
          data-gatekeeper-element="info"
          data-gatekeeper-listen={listen}
          data-message-validation-true={cadenaTrue}
          data-message-validation-false={cadenaFalse}
        />
      )}
    </>
  );
});

export default GKInfo;

const isObjeto = (variable) => {
  return typeof variable === 'object' && !Array.isArray(variable) && variable !== null;
};

const isArreglo = (variable) => {
  return Array.isArray(variable);
};

const obtenerCadena = (arregloVal, tipoMensaje) => {
  if (isArreglo(arregloVal)) {
    let cadena = "";
    arregloVal.forEach((element) => {
      if (isObjeto(element) && element.name_option && element[tipoMensaje] !== undefined) {
        cadena += `${element.name_option}:{${element[tipoMensaje]}}, `;
      }
    });
    return cadena.trim(); // Eliminar espacio extra al final
  } else {
    return "";
  }
};
