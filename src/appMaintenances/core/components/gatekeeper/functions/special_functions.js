

export function getQuerySelector(element) {
    /**
     * Esta funcion recibe un elemento y devuelve su selector
     */
    if (!(element instanceof Element)) {
        throw new Error('Argument must be an instance of Element.');
    }

    // Recursivamente construir el selector del elemento
    function getElementSelector(el) {
        if (!el || el.nodeType !== 1) return '';

        let selector = el.tagName.toLowerCase();

        if (el.id) {
            selector += `#${el.id}`;
        } else if (el.className) {
            selector += `.${Array.from(el.classList).join('.')}`;
        } else {
            const siblings = Array.from(el.parentNode.children);
            const index = siblings.indexOf(el) + 1;
            selector += `:nth-child(${index})`;
        }

        return selector;
    }

    let path = [];
    let currentElement = element;

    while (currentElement) {
        path.unshift(getElementSelector(currentElement));
        currentElement = currentElement.parentElement;
    }

    return path.join(' > ');
}


  // Función para generar un UUID versión 4
  export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
