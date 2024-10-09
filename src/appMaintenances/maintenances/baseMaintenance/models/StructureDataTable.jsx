/* eslint-disable react-refresh/only-export-components */
import pencil from '../../../core/assets/SVG/pencil.svg'
import trash from '../../../core/assets/SVG/trash.svg'
export const headerTableStructure = ['Titulo', 'Autor','ID Cover', 'Options'];

export function BodyTableStructure(receivedData, openModalWithSelectedData) {
    const bodyTableStructure = [];

    receivedData.forEach(item => {
        bodyTableStructure.push({
            title: item.title,
            author: item.author,
            coverId: item.coverId,
            options: (
                <div className='cont-btns-maintenance'>

                    <button className="btn-maintenance btn-update" onClick={(event) => openModalWithSelectedData(event, item, 'update')}>
                        <img src={pencil}  className="ico-btn" />
                    </button>

                    <button className="btn-maintenance btn-delete" onClick={(event) => openModalWithSelectedData(event, item, 'delete')}>
                        <img src={trash}  className="ico-btn" />
                    </button>

                </div>
            )
        });
    });

    return bodyTableStructure;
}
