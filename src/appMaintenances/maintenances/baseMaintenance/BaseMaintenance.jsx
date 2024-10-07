/* eslint-disable no-unused-vars */
import '../../core/maintenances.css';
import { useCallback, useEffect, useState } from "react";

import { BodyTableStructure, headerTableStructure } from './models/StructureDataTable';
import { FIND_ALL_SERVICE } from './controllers/baseController';
import Smoothgrid from '../../core/components/smoothgrid/Smoothgrid';
import { Smoothmodal } from '../../core/components/smoothmodal/Smoothmodal';
import { MaintenanceForm } from './components/MaintenanceForm';

function BaseMaintenance() {
    const [headerTableContent, setHeaderContent] = useState(headerTableStructure);
    const [bodyTableContent, setBodyTableContent] = useState([]);
    const [sharedSelectedData, setSharedSelectedData] = useState([]);

    // Modal state
    const [isOpen, setIsOpen] = useState(false);

    // Función para abrir el modal con datos seleccionados
    const openModalWithSelectedData = (event, selectedData) => {
        event.stopPropagation();  
        setSharedSelectedData(selectedData);  
    };

    // Función para alternar el modal
    const toggleModal = useCallback(() => {
        setSharedSelectedData([])
        setIsOpen(prevIsOpen => !prevIsOpen);
    }, []);

    // Abrir el modal cuando haya datos seleccionados
    useEffect(() => {
        if (sharedSelectedData && (sharedSelectedData.length > 0 || Object.keys(sharedSelectedData).length > 0)) {
            setIsOpen(true);
        }
    }, [sharedSelectedData]);

    // Solicitud inicial para cargar los datos de la tabla
    useEffect(() => {
        const initialRequestFunction = async () => {
            const response = await FIND_ALL_SERVICE();

            // Formatear los datos con la función de estructura
            const formattedData = BodyTableStructure(response, openModalWithSelectedData);
            setBodyTableContent(formattedData);
        };

        initialRequestFunction();
    }, []);

    return (
        <>
            <p>Loading skeletons...</p>
            
            {/* Botón para agregar nuevo registro */}
            <div className="cont-btn-add-new-maint">
                <button onClick={toggleModal}>Add New</button>
            </div>

            {/* Tabla de mantenimientos */}
            <div className="cont-table-maint">
                <Smoothgrid headerData={headerTableContent} bodyData={bodyTableContent} />
            </div>

            {/* Modal */}
            <Smoothmodal closeModal={toggleModal} isOpen={isOpen}>
                <div className="form-content">
                    <span className="smooth_modal_close" onClick={toggleModal}>&times;</span>
                    <MaintenanceForm data={sharedSelectedData} />
                </div>
            </Smoothmodal>
        </>
    );
}

export default BaseMaintenance;
