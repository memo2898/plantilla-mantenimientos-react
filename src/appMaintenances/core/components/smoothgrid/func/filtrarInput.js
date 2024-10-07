export function filtrarDatos(palabraClave, datos) {
  
    // Función para eliminar tildes y caracteres diacríticos
    const normalizarTexto = (texto) => {
      return texto
        .toString() // Asegurar que es una cadena
        .normalize("NFD") // Descomponer caracteres con tildes
        .replace(/[\u0300-\u036f]/g, "") // Eliminar marcas diacríticas
        .toLowerCase(); // Convertir a minúsculas
    };
  
    // Normalizar palabra clave
    const palabraClaveNormalizada = normalizarTexto(palabraClave);
  
    // Filtrar los datos que coincidan con la palabra clave en alguna propiedad
    const datosFiltrados = datos.filter(item => {
      // Convertimos todas las propiedades a string, normalizamos y buscamos coincidencias
      return Object.values(item).some(valor =>
        normalizarTexto(valor).includes(palabraClaveNormalizada)
      );
    });
  
    return datosFiltrados;
  }
  