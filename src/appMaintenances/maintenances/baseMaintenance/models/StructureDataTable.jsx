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
                    <button className="btn btn-primary" onClick={(event) => openModalWithSelectedData(event, item)}>
                        Update
                    </button>
                    <button className="btn btn-primary" onClick={() => { alert(`Delete ${item.id}`) }}>
                        Delete
                    </button>
                </div>
            )
        });
    });

    return bodyTableStructure;
}
