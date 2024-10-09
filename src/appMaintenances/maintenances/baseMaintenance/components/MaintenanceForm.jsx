/* eslint-disable react/prop-types */
import GKForm from "../../../core/components/gatekeeper/GKForm";
import GKInput from "../../../core/components/gatekeeper/GKInput";
import GKInfo from "../../../core/components/gatekeeper/GKInfo";
import GKSubmit from "../../../core/components/gatekeeper/GKSubmit";
import { useState } from "react";
import { CREATE_SERVICE, UPDATE_SERVICE } from "../controllers/baseController";

export function MaintenanceForm({ data, actionMode, addData, updateSingleData,toggleModal}) {
    const [generalMessage, setGeneralMessage] = useState("");

    const validationResponse = async (response) => {
        setGeneralMessage("");
        if(!response.general_validation){
            setGeneralMessage("Some wrong data");
            return;
        } 


        console.log(response); 
        let BODY = response.form_body;

        if(actionMode ==='create'){
            delete BODY.id;
            console.log('Llamar el servicio de crear')
            console.log('Mostrar el loader')
            const respuesta = await CREATE_SERVICE(BODY);
            addData(respuesta)
            console.log('Ocultar el loader')
            console.log('Mostrar el mensaje de exito en el mensajito emergente')
            console.log('Cerrar el modal')
        }

        if(actionMode ==='update'){
            console.log('Llamar el servicio de actualizar')
            console.log('Mostrar el loader')
            const respuesta = await UPDATE_SERVICE(data.id , BODY);
            updateSingleData(data.id, respuesta)

            console.log('Ocultar el loader')
            console.log('Mostrar el mensaje de exito en el mensajito emergente')
            toggleModal()
        }


        
        

    };

    return (
        <>
            <GKForm onSubmit={validationResponse}>
                {/*-- Item: Name --*/}
                <div className='form-item'>
                    <h4>Name:</h4>
                    <GKInput 
                        type="text" 
                        name="name" 
                        validations={["string", "required"]} 
                        autocomplete="off" 
                        value={data.name || ""}
                    />
                    <GKInfo 
                        listen="name"  
                        validations={[
                            { name_option: "string", message_true: "", message_false: "Debe ingresar un string válido" },
                            { name_option: "required", message_true: "", message_false: "Campo requerido" }
                        ]}
                    />
                </div>
                
                {/*-- Item: Lastname --*/}
                <div className='form-item'>
                    <h4>Lastname:</h4>
                    <GKInput 
                        type="text" 
                        name="lastname" 
                        validations={["string", "required"]} 
                        autocomplete="off" 
                        value={data.lastname || ""}
                    />
                    <GKInfo 
                        listen="lastname"  
                        validations={[
                            { name_option: "string", message_true: "", message_false: "Debe ingresar un string válido" },
                            { name_option: "required", message_true: "", message_false: "Campo requerido" }
                        ]}
                    />
                </div>

                <div className="cont-general-menssage">
                    <span>{generalMessage}</span>
                </div>
                <div className="cont-btn-form">
                    <GKSubmit type="button">Send</GKSubmit>
                </div>
            </GKForm>
        </>
    );
}
