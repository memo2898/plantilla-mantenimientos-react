let bookCovers = [
    { id: 1, imageUrl: 'cover1.jpg' },
    { id: 2, imageUrl: 'cover2.jpg' },
    { id: 3, imageUrl: 'cover3.jpg' },
    { id: 4, imageUrl: 'cover4.jpg' },
    { id: 5, imageUrl: 'cover5.jpg' }
];

export async function GET_ALL_COVERS(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(bookCovers);
        }, 2000);
    });
}

export async function GET_ONE_COVER(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const cover = bookCovers.find(c => c.id === id);
            if (cover) {
                resolve(cover);
            } else {
                reject(new Error('Cover not found'));
            }
        }, 2000);
    });
}

export async function POST_COVER(body){
    return new Promise((resolve) => {
        setTimeout(() => {
            const newCover = { id: bookCovers.length + 1, ...body };
            bookCovers.push(newCover);
            resolve(newCover);
        }, 2000);
    });
}

export async function PATCH_COVER(id, body){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const coverIndex = bookCovers.findIndex(c => c.id === id);
            if (coverIndex !== -1) {
                bookCovers[coverIndex] = { ...bookCovers[coverIndex], ...body };
                resolve(bookCovers[coverIndex]);
            } else {
                reject(new Error('Cover not found'));
            }
        }, 2000);
    });
}

export async function DELETE_COVER(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const coverIndex = bookCovers.findIndex(c => c.id === id);
            if (coverIndex !== -1) {
                const deletedCover = bookCovers.splice(coverIndex, 1);
                resolve(deletedCover[0]);
            } else {
                reject(new Error('Cover not found'));
            }
        }, 2000);
    });
}
