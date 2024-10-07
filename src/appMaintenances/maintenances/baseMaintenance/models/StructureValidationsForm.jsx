import { GET_ALL_EXAMPLES } from "../../../../servicios/ExampleService";



export const formStructure = [
    {
        element:'input',
        type:'text',
        name:'',
        validations:[
            {
                type:'integer',
                message_true:"",
                message_false:""
            }
        ]
    },
    {
        element: 'select',
        name: 'dropdownField', // Obligatorio
        asyncOptions: async () => {
            // Lógica para obtener las opciones de manera asíncrona
            const data = await GET_ALL_EXAMPLES();
            return data.map(option => ({
                value: option.id, 
                label: option.name 
            }));
        },
        validations: [
            {
                type: 'required',
                message_true: "Seleccionado correctamente",
                message_false: "Este campo es obligatorio"
            }
        ]
    }
];


export const triggers =[
    {
        afterCreate:[],
        beforeCreate:[]
    }
]

