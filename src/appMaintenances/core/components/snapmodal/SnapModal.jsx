/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import './snapmodal.css';
import close_ico from './assets/close_ico.svg';
import error_ico from './assets/error_ico.svg';
import success_ico from './assets/success_ico.svg';
import info_ico from './assets/info_ico.svg';
import warning_ico from './assets/warning_ico.svg';

function SnapModal({ type, message, duration = 3000, onClose, isVisible }) {
  const [isOpening, setIsOpening] = useState(false); // Controlar la animación de entrada
  const [isClosing, setIsClosing] = useState(false); // Controlar la animación de salida
  const [showModal, setShowModal] = useState(false); // Controla si el modal está visible o no
  const [icoOption, setIcoOption] = useState('');

  // Determinar el ícono según el tipo
  useEffect(() => {
    const iconMap = {
      error: error_ico,
      success: success_ico,
      info: info_ico,
      warning: warning_ico,
    };
    setIcoOption(iconMap[type] || info_ico); // Por defecto, info
  }, [type]);

  // Función para cerrar el modal
  const closeModal = useCallback(() => {
    setIsClosing(true); // Activar la animación de salida
    setTimeout(() => {
      setShowModal(false); // Ocultar el modal completamente después de la animación de salida
      setIsClosing(false); // Resetear el estado de cierre
      onClose && onClose(); // Llamar a la función de cierre
    }, 300); // Debe coincidir con la duración de la transición de salida
  }, [onClose]);

  // Manejar el estado de apertura y cierre del modal
  useEffect(() => {
    if (isVisible) {
      setShowModal(true); // Mostrar el modal
      setIsOpening(true); // Activar la animación de entrada
      setIsClosing(false); // Asegurarse de que no esté cerrándose
      const openTimer = setTimeout(() => {
        setIsOpening(false); // Desactivar animación de entrada después de la duración de la animación
      }, 300); // Duración de la animación de entrada

      const closeTimer = setTimeout(() => {
        closeModal(); // Cerrar el modal después de la duración completa
      }, duration); // Espera la duración completa antes de cerrarse

      return () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
      };
    } else {
      // Si `isVisible` cambia a false, cerrar el modal
      if (showModal) {
        closeModal();
      }
    }
  }, [isVisible, closeModal, duration, showModal]);

  const closeWindow = () => {
    closeModal(); // Llama a la función de cierre cuando se hace clic en el botón de cerrar
  };

  return (
    <>
      {showModal && ( // Solo renderiza si showModal es true
        <div className={`snapmodal-container ${isOpening ? 'opening' : isClosing ? 'closing' : 'show'} ${type}`}>
          {/* Left Side */}
          <div className="left-side-spm">
            <div className="cont-ico-spm">
              <img src={icoOption} alt={`${type} icon`} className='ico-spm' />
            </div>
            <p className='message-spm'>{message}</p>
          </div>

          {/* Middle Side */}
          <div className="meddle-side-spm">
            <span className="line-div"></span>
          </div>

          {/* Right Side */}
          <div className="rigth-side-spm">
            <img src={close_ico} alt="Close" className="close-btn-spm" onClick={closeWindow} />
          </div>
        </div>
      )}
    </>
  );
}

export default SnapModal;
