import React, { createContext, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GKForm_logic from './brain/GKForm_logic/main';

// Creamos el contexto
const ContextoForm = createContext();

const GKForm = ({ className, onSubmit, style, children }) => {
  const [valorContextoForm, setValorContextoForm] = useState([]);

  const elementosRefs = useRef([]);
  const elementosGK = useRef(new Set());
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      elementosRefs.current.forEach((ref) => {
        if (ref) {
          if (ref.children.length > 0) {
            if (ref.attributes['data-gatekeeper-element']) {
              elementosGK.current.add(ref);
            } else {
              let elementosGkInternos = ref.querySelectorAll('[data-gatekeeper-element]');
              elementosGkInternos.forEach((el) => elementosGK.current.add(el));
            }
          } else {
            if (ref.attributes['data-gatekeeper-element']) {
              elementosGK.current.add(ref);
            }
          }
        }
      });

      // Convertimos el Set a un array antes de enviarlo al brain
      const elementosGKArry = Array.from(elementosGK.current);
      console.log('Agregarle a cada elemento una etiqueta data-parent', elementosGKArry);
      GKForm_logic(elementosGKArry, onSubmit);

      isFirstRun.current = false; // Aseguramos que no se vuelva a ejecutar
    }

    // Este log para verificar valorContextoForm
    console.log(valorContextoForm);

  }, [onSubmit, valorContextoForm]); // Lista de dependencias vacía

  const childrenWithRefs = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, { ref: (el) => (elementosRefs.current[index] = el) });
  });

  return (
    <ContextoForm.Provider value={{ valorContextoForm, setValorContextoForm }}>
      <form className={className} style={style}>
        {childrenWithRefs}
      </form>
    </ContextoForm.Provider>
  );
};

GKForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  style: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { ContextoForm };
export default GKForm;
