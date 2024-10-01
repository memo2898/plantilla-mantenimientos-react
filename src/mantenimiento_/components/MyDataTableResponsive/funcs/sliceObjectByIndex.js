export function sliceObjectByIndex(obj, startIndex, endIndex) {
    const slicedObj = {};
    const keys = Object.keys(obj);
    
    // Manejar índices negativos
    if (startIndex < 0) {
      startIndex = keys.length + startIndex;
    }
    if (endIndex < 0) {
      endIndex = keys.length + endIndex;
    }
  
    for (let i = startIndex; i <= endIndex; i++) {
      const key = keys[i];
      slicedObj[key] = obj[key];
    }
  
    return slicedObj;
  }

  /*
  const originalObj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };
  
  const sliced = sliceObjectByIndex(originalObj, -3, -2);
  console.log(sliced); // Resultado: { b: 2, c: 3 }
  */