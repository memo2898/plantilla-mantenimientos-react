
/**
 * Usareos indexedDB
 */




//1. Abrir la base de datos:
let dbConnections = [];

async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('GatekeeperDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('GatekeeperStore')) {
        db.createObjectStore('GatekeeperStore', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      dbConnections.push(db); // Guardar la conexión abierta
      resolve(db);
    };

    request.onerror = (event) => {
      reject('Error opening database:', event.target.errorCode);
    };
  });
}


//2. Crear (Agregar):
async function addItem(item) {
    openDatabase().then((db) => {
      const transaction = db.transaction(['GatekeeperStore'], 'readwrite');
      const store = transaction.objectStore('GatekeeperStore');
      store.add(item);
  
      transaction.oncomplete = () => {
        console.log('Item added successfully');
      };
  
      transaction.onerror = (event) => {
        console.error('Error adding item:', event.target.errorCode);
      };
    });
  }


//3. Leer:
    //All:
async function getAllItems() {
    openDatabase().then((db) => {
      const transaction = db.transaction(['GatekeeperStore'], 'readonly');
      const store = transaction.objectStore('GatekeeperStore');
      const request = store.getAll();
  
      request.onsuccess = () => {
        console.log('Items:', request.result);
      };
  
      request.onerror = (event) => {
        console.error('Error getting items:', event.target.errorCode);
      };
    });
  }
  //ById:
async function getItemById(id) {
    openDatabase().then((db) => {
      const transaction = db.transaction(['GatekeeperStore'], 'readonly');
      const store = transaction.objectStore('GatekeeperStore');
      const request = store.get(id);
  
      request.onsuccess = () => {
        console.log('Item:', request.result);
      };
  
      request.onerror = (event) => {
        console.error('Error getting item:', event.target.errorCode);
      };
    });
  }

//4. Actualizar:
async function updateItem(item) {
    openDatabase().then((db) => {
      const transaction = db.transaction(['GatekeeperStore'], 'readwrite');
      const store = transaction.objectStore('GatekeeperStore');
      store.put(item);
  
      transaction.oncomplete = () => {
        console.log('Item updated successfully');
      };
  
      transaction.onerror = (event) => {
        console.error('Error updating item:', event.target.errorCode);
      };
    });
  }

//5. Eliminar:
async function deleteItem(id) {
    openDatabase().then((db) => {
      const transaction = db.transaction(['GatekeeperStore'], 'readwrite');
      const store = transaction.objectStore('GatekeeperStore');
      store.delete(id);
  
      transaction.oncomplete = () => {
        console.log('Item deleted successfully');
      };
  
      transaction.onerror = (event) => {
        console.error('Error deleting item:', event.target.errorCode);
      };
    });
  }
  
//6. Borrar la BD:
async function closeAllConnections() {
  dbConnections.forEach(db => db.close());
  dbConnections = [];
}

async function deleteDatabase() {
  closeAllConnections();

  const request = indexedDB.deleteDatabase('GatekeeperDB');

  request.onsuccess = () => {
    console.log('Database deleted successfully');
  };

  request.onerror = (event) => {
    console.error('Error deleting database:', event.target.errorCode);
  };

  request.onblocked = () => {
    console.log('Database deletion blocked');
  };
}

  

  


//Ejemplo de uso:


await openDatabase()
// Crear un nuevo item
await addItem({ name: 'Item 1', description: 'This is item 1' });

// Leer todos los items
await getAllItems();

// Leer un item por ID
getItemById(1);

// Actualizar un item
updateItem({ id: 1, name: 'Updated Item 1', description: 'This is the updated item 1' });

// Eliminar un item
deleteItem(1);

  // Llamar a la función para borrar la base de datos
  await deleteDatabase();