/* eslint-disable react/prop-types */
import './Smoothmodal.css';

export function Smoothmodal({ closeModal, children, isOpen }) {
  // Si no está abierto, retorna null para no renderizar nada
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`smooth-modal-default ${isOpen ? 'fade-in' : 'fade-out'}`} onClick={closeModal}>
      <div className="smooth_modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
