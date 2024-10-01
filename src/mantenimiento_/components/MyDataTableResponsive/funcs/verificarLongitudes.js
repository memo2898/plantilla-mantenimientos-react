/* eslint-disable no-unused-vars */
function verificarLongitudes(datosCabecera, datosCuerpo) {
   
    // Verifica si el número de categorías en cada objeto coincide con la longitud de datosCabecera
    for (const objeto of datosCuerpo) {
      const categorias = Object.keys(objeto); // Obtiene las categorías del objeto
      if (categorias.length !== datosCabecera.length) {
        return false; // No coincide
      }
    }
    return true; // Coincide para todos los objetos en datosCuerpo
  }

  /** //Ejemplo de uso:
   
  const coincide = verificarCoincidencia(datosCabecera, datosCuerpo);

if (coincide) {
  console.log("Las categorías coinciden con la longitud de datosCabecera.");
} else {
  console.log("Las categorías no coinciden con la longitud de datosCabecera.");
}
   */