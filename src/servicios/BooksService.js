let books = [
    { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', coverId: 1 },
    { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', coverId: 2 },
    { id: 3, title: 'La casa de los espíritus', author: 'Isabel Allende', coverId: 3 },
    { id: 4, title: 'Rayuela', author: 'Julio Cortázar', coverId: 4 },
    { id: 5, title: '1984', author: 'George Orwell', coverId: 5 }
];

export async function GET_ALL_BOOKS(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(books);
        }, 2000);
    });
}

export async function GET_ONE_BOOK(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const book = books.find(b => b.id === id);
            if (book) {
                resolve(book);
            } else {
                reject(new Error('Book not found'));
            }
        }, 2000);
    });
}

export async function POST_BOOK(body){
    return new Promise((resolve) => {
        setTimeout(() => {
            const newBook = { id: books.length + 1, ...body };
            books.push(newBook);
            resolve(newBook);
        }, 2000);
    });
}

export async function PATCH_BOOK(id, body){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const bookIndex = books.findIndex(b => b.id === id);
            if (bookIndex !== -1) {
                books[bookIndex] = { ...books[bookIndex], ...body };
                resolve(books[bookIndex]);
            } else {
                reject(new Error('Book not found'));
            }
        }, 2000);
    });
}

export async function DELETE_BOOK(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const bookIndex = books.findIndex(b => b.id === id);
            if (bookIndex !== -1) {
                const deletedBook = books.splice(bookIndex, 1);
                resolve(deletedBook[0]);
            } else {
                reject(new Error('Book not found'));
            }
        }, 2000);
    });
}
