/* eslint-disable no-unused-vars */
import '../../core/maintenances.css';
import { useCallback, useEffect, useState } from "react";
import { BodyTableStructure, headerTableStructure } from './models/StructureDataTable';
import { DELETE_SERVICE, FIND_ALL_SERVICE } from './controllers/baseController';
import Smoothgrid from '../../core/components/smoothgrid/Smoothgrid';
import { Smoothmodal } from '../../core/components/smoothmodal/Smoothmodal';
import { MaintenanceForm } from './components/MaintenanceForm';
import SnapModal from '../../core/components/snapmodal/SnapModal';
import SkeletonMaintenance from '../../core/components/skeletonMaintenances/SkeletonMaintenance';

function BaseMaintenance() {
    const [initial, setInitial] = useState(false)
    const [headerTableContent, setHeaderContent] = useState(headerTableStructure);
    const [rawData, setRawData] = useState([]);  // Datos crudos
    const [bodyTableContent, setBodyTableContent] = useState([]);  // Datos formateados
    const [sharedSelectedData, setSharedSelectedData] = useState([]);
    const [actionMode, setActionMode] = useState('create');
    const [isOpen, setIsOpen] = useState(false);  // Modal state

    const [showMessageModal, setShowMessageModal] = useState(false);

    // Función para abrir el modal con datos seleccionados
    const openModalWithSelectedData = useCallback((event, selectedData, newMode) => {
        event.stopPropagation();
        setSharedSelectedData(selectedData);
        setActionMode(newMode);
        setIsOpen(true); // Abre el modal aquí
    }, []);

    // Función para alternar el modal
    const toggleModal = useCallback(() => {
        setSharedSelectedData([]);
        setActionMode('create');
        setIsOpen(prevIsOpen => !prevIsOpen);
    }, []);

    // Solicitud inicial para cargar los datos de la tabla
    useEffect(() => {
        const initialRequestFunction = async () => {
            const response = await FIND_ALL_SERVICE();
            setRawData(response);  // Guardar los datos crudos
            setInitial(true)
        };
        initialRequestFunction();
    }, []);

    // Actualizar los datos formateados cada vez que cambien los datos crudos
    useEffect(() => {
        const formattedData = BodyTableStructure(rawData, openModalWithSelectedData);
        setBodyTableContent(formattedData);
    }, [rawData, openModalWithSelectedData]);  // Cuando cambian los datos crudos, formatear y actualizar los datos a mostrar

    // Función para agregar un nuevo elemento al arreglo crudo
    const addData = useCallback((newItem) => {
        setRawData(prevData => {
            const exists = prevData.some(item => item.id === newItem.id);
            if (exists) {
                return prevData.filter(item => item.id !== newItem.id).concat(newItem);
            }
            return [...prevData, newItem];  
        });
        //setIsOpen(false); // Cierra el modal después de agregar un nuevo dato
    }, []);
    
    
    // Función para actualizar un solo dato del arreglo crudo
    const updateSingleData = useCallback((id, updatedData) => {
        setRawData(prevData =>
            prevData.map(item => 
                item.id === id 
                    ? { ...item, ...updatedData }  // Actualizar solo el dato crudo correspondiente
                    : item
            )
        );
    }, []);

    // Función para eliminar un dato del arreglo crudo
    const deleteData = useCallback((id) => {
        setRawData(prevData => prevData.filter(item => item.id !== id));
    }, []);

    // Función para realizar la acción de eliminar
    const doDeleteAction = useCallback(async (id) => {
        console.log('Abrir loader');
        await DELETE_SERVICE(id);
        deleteData(id);
        console.log('cerrar loader');
        toggleModal();

        setSnapModalData({ type:"success" , message:"Record deleted successfully"})
        setShowMessageModal(true)


    }, [deleteData, toggleModal]);

    const [snapModalData, setSnapModalData] = useState({})
    return (
        <>
        {!initial?
        <>
            <SkeletonMaintenance/>
        </>:<>
            

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
                    {actionMode === "create" || actionMode === "update" ? (
                        <>
                            <span className="smooth_modal_close" onClick={toggleModal}>&times;</span>
                            <MaintenanceForm 
                                data={sharedSelectedData} 
                                actionMode={actionMode} 
                                addData={addData} 
                                updateSingleData={updateSingleData} 
                                toggleModal={toggleModal} 
                                setSnapModalData={setSnapModalData}
                                setShowMessageModal={setShowMessageModal}
                          
                            />
                        </>
                    ) : (
                        <>
                            <span>Are you sure you want to delete this record?</span>
                            <button onClick={() => { doDeleteAction(sharedSelectedData.id) }}>Delete</button>
                        </>
                    )}
                </div>
            </Smoothmodal>




            {/**Alert message */}
            {/* <button onClick={()=>{setShowMessageModal(true)}}>Abrir</button> */}

            <SnapModal
                type={snapModalData.type} 
                message={snapModalData.message}
                duration={2000} 
                onClose={() => setShowMessageModal(false)} 
                isVisible={showMessageModal} 
            />
           </>}
        </>
    );
}

export default BaseMaintenance;
