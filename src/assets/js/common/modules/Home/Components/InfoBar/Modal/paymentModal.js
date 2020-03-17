import React from 'react'

const paymentModal = ({ modalOpen }) => {

    return (
        <div className="modal_shipping">
            <div className="close-modal">
                <img onClick={() => modalOpen()} src="/arquivos/close-icon.png?v=1" alt="" />
            </div>

            <div className="modal-content">
                <span className="__icon"><svg xmlns="http://www.w3.org/2000/svg" width="37" height="32"><defs><clipPath id="a"><path d="M0 0h37v32H0z"></path></clipPath></defs><g data-name="Prancheta – 17" clipPath="url(#a)"><path d="M34 24.105V7.895A2.719 2.719 0 0031.5 5h-25A2.719 2.719 0 004 7.895v16.21A2.719 2.719 0 006.5 27h25a2.719 2.719 0 002.5-2.895zM6.5 6.158h25A1.632 1.632 0 0133 7.895v1.158H5V7.895a1.632 1.632 0 011.5-1.737zM5 10.211h28v3.473H5zm1.5 15.631A1.632 1.632 0 015 24.105v-9.263h28v9.263a1.632 1.632 0 01-1.5 1.737z" fill="#000"></path></g></svg></span>

                <p>
                    Pague como quiser
            </p>

                <p>
                    Tudo em até 10x sem juros e parcela mínima de R$ 15.
            </p>

                <a href="https://www.quemdisseberenice.com.br/todos-produtos-site">
                    <button>
                        aproveite!
                </button>
                </a>

            </div>
        </div>
    );
}
export default paymentModal