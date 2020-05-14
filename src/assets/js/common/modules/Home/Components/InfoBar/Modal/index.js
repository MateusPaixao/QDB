import React from 'react';

const Modal = ({ modalOpen, icon, title, content, hasCTA, link }) => {
  return (
    <div className="modal">
      <div className="close-modal" onClick={() => modalOpen()}>
        X
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
