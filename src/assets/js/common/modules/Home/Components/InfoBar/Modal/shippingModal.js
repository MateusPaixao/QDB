import React from 'react';

const shippingModal = ({ modalOpen, price }) => {
  console.log('Cheguei no modal');

  return (
    <div className="modal_shipping">
      <div className="close-modal">
        <img onClick={() => modalOpen()} src="/arquivos/close-icon.png?v=1" alt="" />
      </div>

      <div className="modal-content">
        <span className="modal-content__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="37" height="32">
            <defs>
              <clipPath id="a">
                <path d="M0 0h37v32H0z" />
              </clipPath>
            </defs>
            <g data-name="Prancheta – 19" clipPath="url(#a)">
              <g
                transform="translate(4.406 2.06)"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path data-name="Retângulo 959" d="M.594 2.94h18.643v15.847H.594z" />
                <path data-name="Caminho 987" d="M18.937 8.994h4.947l3.71 3.71v6.183h-8.657z" />
                <circle
                  data-name="Elipse 43"
                  cx="3.263"
                  cy="3.263"
                  r="3.263"
                  transform="translate(3.39 18.415)"
                />
                <circle
                  data-name="Elipse 44"
                  cx="3.263"
                  cy="3.263"
                  r="3.263"
                  transform="translate(18.651 18.415)"
                />
              </g>
            </g>
          </svg>
        </span>

        <p className="modal-content__title">Ganhe frete grátis!</p>

        <p>Frete grátis nas compras a partir de {price}</p>
        <a href="https://www.quemdisseberenice.com.br/todos-produtos-site">
          <button>aproveite!</button>
        </a>
      </div>
    </div>
  );
};
export default shippingModal;
