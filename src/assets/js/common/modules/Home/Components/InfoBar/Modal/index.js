import React from 'react';

const Modal = ({ modalOpen, icon, title, content, hasCTA, link }) => {
  return (
    <div className="modal_shipping">
      <div className="close-modal">
        <img onClick={() => modalOpen()} src="/arquivos/close-icon.png?v=1" alt="" />
      </div>

      <div className="modal-content">
        <span className="modal-content__icon">{icon}</span>
        <p className="modal-content__title">{title}</p>

        <p>{content}</p>
        {hasCTA == true && (
          <a href={link}>
            <button>saiba mais</button>
          </a>
        )}
      </div>
    </div>
  );
};
export default Modal;
