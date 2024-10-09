/* eslint-disable react-refresh/only-export-components */

export const headerTableStructure = ['Name', 'Lastname', 'Options'];

export function BodyTableStructure(receivedData, openModalWithSelectedData) {
    const bodyTableStructure = [];

    receivedData.forEach(item => {
        bodyTableStructure.push({
            name: item.name,
            lastname: item.lastname,
            options: (
                <div>
                   
                    <button className="btn btn-primary" onClick={(event) => openModalWithSelectedData(event, item, 'update')}>
                        Update
                    </button>
                    <button className="btn btn-primary" onClick={(event) => openModalWithSelectedData(event, item, 'delete')}>
                        Delete
                    </button>
                </div>
            )
        });
    });

    return bodyTableStructure;
}
