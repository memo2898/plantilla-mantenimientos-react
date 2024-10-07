/* eslint-disable react/prop-types */
import GKForm from "../../../core/components/gatekeeper/GKForm";
import GKInput from "../../../core/components/gatekeeper/GKInput";
import GKInfo from "../../../core/components/gatekeeper/GKInfo";
import GKSubmit from "../../../core/components/gatekeeper/GKSubmit";
import { useState } from "react";

export function MaintenanceForm({ data }) {
    const [generalMessage, setGeneralMessage] = useState("");

    const validationResponse = (response) => {
        console.log(response); 
        if(response.general_validation){
            setGeneralMessage("");
        } else {
            setGeneralMessage("Some wrong data");
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
