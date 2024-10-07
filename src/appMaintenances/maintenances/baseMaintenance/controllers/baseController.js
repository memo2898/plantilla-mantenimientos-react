import { GET_ALL_EXAMPLES, GET_ONE_EXAMPLES, POST_EXAMPLES, PATCH_EXAMPLES, DELETE_EXAMPLES } from "../../../../servicios/ExampleService";



    export const FIND_ALL_SERVICE = GET_ALL_EXAMPLES; 
    export const FIND_ONE_SERVICE = () => GET_ONE_EXAMPLES;
    export const CREATE_SERVICE = () => POST_EXAMPLES;
    export const UPDATE_SERVICE = () => PATCH_EXAMPLES;
    export const DELETE_SERVICE = () => DELETE_EXAMPLES;
