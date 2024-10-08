let examples = [
    { id: 1, name: 'Manuel', lastname: 'Maldonado' },
    { id: 2, name: 'Ana', lastname: 'Gómez' },
    { id: 3, name: 'Pedro', lastname: 'Rodríguez' },
    { id: 4, name: 'Luisa', lastname: 'Fernández' },
    { id: 5, name: 'Carlos', lastname: 'Martínez' },
    { id: 6, name: 'María', lastname: 'Hernández' },
    { id: 7, name: 'Jorge', lastname: 'Pérez' },
    { id: 8, name: 'Elena', lastname: 'García' },
    { id: 9, name: 'Sofía', lastname: 'López' },
    { id: 10, name: 'David', lastname: 'Sánchez' },
    { id: 11, name: 'Gabriela', lastname: 'Jiménez' },
    { id: 12, name: 'Diego', lastname: 'Morales' },
    { id: 13, name: 'Lucía', lastname: 'Torres' },
    { id: 14, name: 'Mateo', lastname: 'Ramos' },
    { id: 15, name: 'Valeria', lastname: 'Ruiz' },
    { id: 16, name: 'Martín', lastname: 'Díaz' },
    { id: 17, name: 'Isabel', lastname: 'Castro' },
    { id: 18, name: 'Emilio', lastname: 'Ortiz' },
    { id: 19, name: 'Daniela', lastname: 'Mendoza' },
    { id: 20, name: 'Felipe', lastname: 'Silva' },
   
];


export async function GET_ALL_EXAMPLES(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(examples);
        }, 2000);
    });
}

export async function GET_ONE_EXAMPLES(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const example = examples.find(ex => ex.id === id);
            if (example) {
                resolve(example);
            } else {
                reject(new Error('Example not found'));
            }
        }, 2000);
    });
}

export async function POST_EXAMPLES(body){
    return new Promise((resolve) => {
        setTimeout(() => {
            const newExample = { id: examples.length + 1, ...body };
            examples.push(newExample);
          
            resolve(newExample);
        }, 2000);
    });
}

export async function PATCH_EXAMPLES(id, body){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exampleIndex = examples.findIndex(ex => ex.id === id);
            if (exampleIndex !== -1) {
                examples[exampleIndex] = { ...examples[exampleIndex], ...body };
        
                resolve(examples[exampleIndex]);
            } else {
                reject(new Error('Example not found'));
            }
        }, 2000);
    });
}

export async function DELETE_EXAMPLES(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exampleIndex = examples.findIndex(ex => ex.id === id);
            if (exampleIndex !== -1) {
                const deletedExample = examples.splice(exampleIndex, 1);
                resolve(deletedExample[0]);
            } else {
                reject(new Error('Example not found'));
            }
        }, 2000);
    });
}
