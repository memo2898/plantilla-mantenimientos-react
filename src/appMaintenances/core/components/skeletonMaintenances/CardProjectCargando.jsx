import './SkeletonCardsProjects.css'

function CardProjectCargando() {
  return (
    <div className='itemCardProjectCargando'>
        <div className="cont-img-cardProjectCargando loadingSkeleton"></div>

        <div className="cont-texto-superior-cargando">
            <div className="linea-texto-superior "></div>
            <div className="linea-texto-superior "></div>
            <div className="linea-texto-superior"></div>
            <div className="linea-texto-superior"></div>
        </div>

        <div className="cont-botonesCargando">
            <div className="circuloBTN "></div>
            <div className="circuloBTN "></div>
        </div>
       
    </div>
  )
}

export default CardProjectCargando