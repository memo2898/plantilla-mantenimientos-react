import './skeletonMaintenance.css';

function SkeletonMaintenance() {
  return (
    <>
      <div className="cont-btn-skeleton">
          <div className="btn-skeleton loadingSkeleton"></div>
      </div>
      
      <div className="table-skeleton loadingSkeleton"></div>
    </>
  );
}

export default SkeletonMaintenance;
