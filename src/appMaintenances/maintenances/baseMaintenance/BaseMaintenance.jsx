/* eslint-disable no-unused-vars */
import '../../core/maintenances.css';
import { useCallback, useEffect, useState } from "react";

import { BodyTableStructure, headerTableStructure } from './models/StructureDataTable';
import { DELETE_SERVICE, FIND_ALL_SERVICE } from './controllers/baseController';
import Smoothgrid from '../../core/components/smoothgrid/Smoothgrid';
import { Smoothmodal } from '../../core/components/smoothmodal/Smoothmodal';
import { MaintenanceForm } from './components/MaintenanceForm';


function BaseMaintenance() {
    const [headerTableContent, setHeaderContent] = useState(headerTableStructure);
    const [rawData, setRawData] = useState([]);  // Datos crudos
    const [bodyTableContent, setBodyTableContent] = useState([]);  // Datos formateados
    const [sharedSelectedData, setSharedSelectedData] = useState([]);
    const [actionMode, setActionMode] = useState('create');



    // Modal state
    const [isOpen, setIsOpen] = useState(false);

    // Función para abrir el modal con datos seleccionados
    const openModalWithSelectedData = (event, selectedData, newMode) => {
        event.stopPropagation();
        setSharedSelectedData(selectedData);
        setActionMode(newMode);

    };
 
    // Función para alternar el modal
    const toggleModal = useCallback(() => {
        setSharedSelectedData([]);
        setActionMode('create');
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
            setRawData(response);  // Guardar los datos crudos
        };

        initialRequestFunction();
    }, []);

    // Actualizar los datos formateados cada vez que cambien los datos crudos
    useEffect(() => {
        const formattedData = BodyTableStructure(rawData, openModalWithSelectedData);
        setBodyTableContent(formattedData);
    }, [rawData]);  // Cuando cambian los datos crudos, formatear y actualizar los datos a mostrar

    // Función para cambiar todos los datos
    const updateAllData = (newData) => {
        setRawData(newData);  // Actualiza los datos crudos
    };

    // Función para actualizar un solo dato del arreglo crudo
    const updateSingleData = (id, updatedData) => {
        setRawData(prevData =>
            prevData.map(item => 
                item.id === id 
                    ? { ...item, ...updatedData }  // Actualizar solo el dato crudo correspondiente
                    : item
            )
        );
    };

    // Función para eliminar un dato del arreglo crudo
    const deleteData = (id) => {
        setRawData(prevData => prevData.filter(item => item.id !== id));
    };

    // Función para agregar un nuevo elemento al arreglo crudo
    const addData = (newItem) => {
        setRawData(prevData => [...prevData, newItem]);
    };

    const doDeleteAction = async(id)=>{
        console.log('Abrir loader')
        await DELETE_SERVICE(id)
        deleteData(id)
        console.log('cerrar loader')
        toggleModal()
    }
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

                    {actionMode=="create" || actionMode=="update"?
                   
                        <>
                            <span className="smooth_modal_close" onClick={toggleModal}>&times;</span>
                            <MaintenanceForm data={sharedSelectedData} actionMode={actionMode} addData={addData} updateSingleData={updateSingleData} toggleModal={toggleModal}/>
                    </>
                        :
                    <>
                        <span>Are you sure you want to delete this record?</span>
                        <button onClick={()=>{ doDeleteAction(sharedSelectedData.id)}}>Delete</button>
                    </>}
                </div>
            </Smoothmodal>
        </>
    );
}

export default BaseMaintenance;
