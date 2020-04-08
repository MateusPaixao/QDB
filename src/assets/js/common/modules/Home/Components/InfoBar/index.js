import React from 'react';
import ReactDOM from 'react-dom';
import PaymentModal from './Modal/paymentModal'; // ignorar e excluir
import ShippingModal from './Modal/shippingModal'; // ignorar e excluir
import Modal from './Modal';

const Methods = {
  InfoBar() {
    class Bar extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          paymentModalOpen: false,
          shippingModalOpen: false,
          modals: [false, false, false, false],
          Infos: [
            {
              Content: '',
              ContentMobile: 'Frete',
              ContentModal: '',
              Icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="32">
                  <defs>
                    <clipPath id="a">
                      <path d="M0 0h37v32H0z" />
                    </clipPath>
                  </defs>
                  <g data-name="Prancheta – 15" clipPath="url(#a)">
                    <g
                      transform="translate(4.406 2.06)"
                      stroke="#232222"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    >
                      <path data-name="Retângulo 959" d="M.594 2.94h18.643v15.847H.594z" />
                      <path
                        data-name="Caminho 987"
                        d="M18.937 8.994h4.947l3.71 3.71v6.183h-8.657z"
                      />
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
              )
            },
            {
              Content: 'Itens de pele podem ser devolvidos abertos se você errou na cor!*',
              ContentMobile: 'Devolução garantida',
              ContentModal:
                'Comprou algum produto pra pele* até o dia 15/04 e errou no tom? Você pode trocá-lo ou devolvê-lo mesmo tendo aberto a embalagem! Entre em contato com nosso SAC pelo telefone 0800 726 6482 em até 15 dias após a data de recebimento do produto.\n\nbase, pó, iluminador, corretivo, contorno, cc creme, bb creme.*',
              Icon: (
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 302 512">
                  <path
                    d="M173.21 497.004H94.57c-9.702 0-17.597-7.894-17.597-17.598v-56.978h75.391a7.497 7.497 0 007.498-7.498 7.497 7.497 0 00-7.498-7.498H69.337c-3.865 0-7.061-3.022-7.272-6.851L46.072 89.658a7.51 7.51 0 00-1.026-3.417L21.118 45.573h234.174l-20.852 35.44a7.498 7.498 0 1012.925 7.604l27.501-46.74a7.499 7.499 0 001.035-3.802V12.912c0-7.12-5.792-12.912-12.912-12.912H13.421C6.301 0 .51 5.792.51 12.912v25.162c0 1.337.357 2.65 1.035 3.802L31.19 92.261l15.9 309.119c.51 9.227 6.606 16.868 14.887 19.773v58.252c0 17.973 14.621 32.594 32.594 32.594h78.639a7.498 7.498 0 000-14.995zm87.695-482.008v15.58h-245.4v-15.58h245.4z"
                    fill="#232222"
                  />
                  <path
                    d="M297.426 112.522a16.54 16.54 0 00-12.029-5.213H172.201c-4.541 0-8.926 1.9-12.03 5.214a16.55 16.55 0 00-4.42 12.347l14.025 214.543a7.49 7.49 0 007.972 6.993 7.499 7.499 0 006.994-7.971l-11.619-177.734h111.353l-16.18 247.485c-.548 8.384-7.56 14.953-15.963 14.953h-47.07c-8.402 0-15.415-6.569-15.963-14.953l-2.471-37.797c-.271-4.133-3.868-7.269-7.972-6.993a7.498 7.498 0 00-6.993 7.971l2.471 37.796c.779 11.916 8.3 21.932 18.676 26.427v53.519c0 12.622 10.269 22.89 22.891 22.89h25.793c12.622 0 22.89-10.268 22.89-22.89V435.59c10.376-4.496 17.897-14.511 18.676-26.427l18.587-284.296a16.546 16.546 0 00-4.422-12.345zm-47.837 376.587c0 4.353-3.541 7.894-7.894 7.894h-25.793c-4.353 0-7.894-3.541-7.894-7.894v-50.974h41.581v50.974zm-77.447-343.405l-1.426-21.814c-.035-.533.197-.9.399-1.115a1.455 1.455 0 011.086-.471h113.196c.533 0 .885.256 1.087.471.201.215.434.582.398 1.115l-1.426 21.814H172.142z"
                    fill="#232222"
                  />
                </svg>
              )
            },
            {
              Content: 'Aumentamos o prazo de devolução para 30 dias',
              ContentMobile: 'Prazo de troca',
              ContentModal: 'Aumentamos o prazo de devolução para 30 dias',
              Icon: (
                <svg viewBox="0 1 512 511" xmlns="http://www.w3.org/2000/svg">
                  <path d="M506.813 111.23L307.405 1.734a10.005 10.005 0 00-9.625 0l-75.16 41.27a10.029 10.029 0 00-4.293 2.36L98.378 111.23a9.994 9.994 0 00-5.187 8.766v132.43c-20.234 6.328-38.777 17.488-54.195 32.91C-1.19 325.52-11.438 386.809 13.5 437.844c2.422 4.96 8.41 7.02 13.371 4.594 4.965-2.426 7.02-8.415 4.598-13.375-21.188-43.364-12.48-95.438 21.668-129.586 21.355-21.356 49.746-33.118 79.945-33.118s58.59 11.762 79.945 33.118c21.352 21.351 33.114 49.742 33.114 79.941s-11.762 58.59-33.118 79.945c-34.148 34.149-86.222 42.856-129.585 21.668-4.961-2.426-10.95-.367-13.372 4.594-2.425 4.965-.37 10.953 4.594 13.375a132.667 132.667 0 0058.336 13.5c34.543-.004 68.625-13.45 94.172-38.996 11.715-11.715 20.973-25.23 27.523-39.922l43.09 23.66c1.5.824 3.156 1.235 4.813 1.235s3.316-.41 4.812-1.235L506.812 347.75a10.003 10.003 0 005.188-8.766v-69.496c0-5.523-4.477-10-10-10s-10 4.477-10 10v63.578l-179.375 98.497V235.39l59.2-32.508v51.531a9.996 9.996 0 0010 10c1.655 0 3.316-.41 4.82-1.238l42.73-23.52a9.992 9.992 0 005.176-8.758v-62.46L492 136.895v52.597c0 5.524 4.477 10 10 10s10-4.476 10-10v-69.496a9.998 9.998 0 00-5.188-8.766zm-204.22-89.324l178.63 98.09-56.348 30.942-178.629-98.09zm0 196.176l-178.628-98.086 58.414-32.078 178.633 98.086zm79.192-43.484L203.156 76.512l22.313-12.254 178.633 98.086zM227.168 285.336c-25.133-25.133-58.547-38.973-94.086-38.973-6.723 0-13.363.496-19.89 1.469V136.895l179.437 98.53v196.173l-31.145-17.102c3.067-11.289 4.653-23.062 4.653-35.078 0-35.54-13.84-68.953-38.969-94.082zm187.387-60.348l-22.73 12.512v-45.598l22.73-12.48zm0 0" />
                  <path d="M502 219.441a10.08 10.08 0 00-7.07 2.93 10.073 10.073 0 00-2.93 7.07 10.07 10.07 0 002.93 7.067c1.86 1.863 4.441 2.93 7.07 2.93s5.21-1.067 7.07-2.93a10.07 10.07 0 002.93-7.067c0-2.632-1.07-5.21-2.93-7.07a10.08 10.08 0 00-7.07-2.93zm0 0M99.457 389.418a9.973 9.973 0 007.07-2.926c3.907-3.906 3.907-10.238 0-14.144l-6.925-6.93h59.101c14.336 0 26 11.664 26 26s-11.664 26-26 26h-35.02c-5.523 0-10 4.477-10 10 0 5.52 4.477 9.996 10 9.996h35.02c25.363 0 46-20.633 46-45.996s-20.637-45.996-46-45.996H99.602l6.925-6.93c3.907-3.906 3.907-10.238 0-14.144-3.902-3.903-10.234-3.903-14.14 0l-24 24c-3.903 3.906-3.903 10.238 0 14.144l24 23.996a9.968 9.968 0 007.07 2.93zm0 0M46.074 476.45a9.953 9.953 0 01-7.64-3.56l-.02-.023c-3.555-4.226-3.008-10.531 1.219-14.086 4.226-3.558 10.535-3.011 14.09 1.215 3.55 4.23 3.015 10.547-1.211 14.102a9.979 9.979 0 01-6.438 2.351zm0 0" />
                </svg>
              )
            },
            {
              Content: 'tudo em até 10x sem juros e parcela mínima de R$ 15',
              ContentMobile: 'Parcelas',
              ContentModal: 'tudo em até 10x sem juros e parcela mínima de R$ 15',
              Icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="32">
                  <defs>
                    <clipPath id="a">
                      <path d="M0 0h37v32H0z" />
                    </clipPath>
                  </defs>
                  <g data-name="Prancheta – 17" clipPath="url(#a)">
                    <path
                      d="M34 24.105V7.895A2.719 2.719 0 0031.5 5h-25A2.719 2.719 0 004 7.895v16.21A2.719 2.719 0 006.5 27h25a2.719 2.719 0 002.5-2.895zM6.5 6.158h25A1.632 1.632 0 0133 7.895v1.158H5V7.895a1.632 1.632 0 011.5-1.737zM5 10.211h28v3.473H5zm1.5 15.631A1.632 1.632 0 015 24.105v-9.263h28v9.263a1.632 1.632 0 01-1.5 1.737z"
                      fill="#232222"
                    />
                  </g>
                </svg>
              )
            }
          ]
        };

        this.getShippingInfo = this.getShippingInfo.bind(this);
        // this.setInfos = this.setInfos.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleShippingModal = this.toggleShippingModal.bind(this);
        this.togglePaymentModal = this.togglePaymentModal.bind(this);
        this.checkUrlParams = this.checkUrlParams.bind(this);
      }
      checkUrlParams() {
        const url = new URLSearchParams(window.location.search);
        if (url.has('infobar') == true) {
          document.querySelector('body').classList.add('bar2');
        }
      }

      getShippingInfo() {
        let StateInfos = this.state.Infos,
          Content = document.querySelector('.infoBar').textContent;
        StateInfos[0].Content = Content.substring(
          Content.lastIndexOf('shippingTextInit') + 127,
          Content.lastIndexOf('<a')
        );
        this.setState({
          Infos: StateInfos
        });
        console.log(this.state.Infos[0]);
      }

      _setInfos() {
        setTimeout(() => {
          for (
            let i = 0;
            i < document.querySelectorAll('.infoBar__render .__container').length;
            i++
          ) {
            document.querySelectorAll('.infoBar__render .__container .__icon')[
              i
            ].innerHTML = this.state.Infos[i].Icon;
            document.querySelectorAll('.infoBar__render .__container .__content')[
              i
            ].innerHTML = this.state.Infos[i].Content;
            document.querySelectorAll('.infoBar__render .__container .__contentMobile')[
              i
            ].innerHTML = this.state.Infos[i].ContentMobile;
          }
        }, 100);
      }

      toggleShippingModal() {
        this.setState({ shippingModalOpen: !this.state.shippingModalOpen });
      }

      togglePaymentModal() {
        this.setState({ paymentModalOpen: !this.state.paymentModalOpen });
      }

      toggleModal(index) {
        let modals = [...this.state.modals];
        let modal = { ...modals[index] };
        console.log(modal);
        console.log('Modal');
        modal = !modals[index];
        modals[index] = modal;
        console.log(modals);
        this.setState({ modals: modals });
      }

      componentDidMount() {
        this.getShippingInfo();
        // this.setInfos();
        this.checkUrlParams();
      }

      render() {
        const { Infos } = this.state;

        return (
          <>
            <div className="__container" onClick={() => this.toggleShippingModal()}>
              <span className="__icon firstIcon">{this.state.Infos[0].Icon}</span>
              <p className="__content">
                <a href="/busca/?fq=P:[109TO300]&O=OrderByBestDiscountDESC"> frete grátis </a> nas
                compras a partir de {this.state.Infos[0].Content}
                <a
                  href="/busca/?fq=P:[109TO300]&O=OrderByBestDiscountDESC"
                  className="_ctaModal"
                ></a>
              </p>
              <p className="__contentMobile">{Infos[0].ContentMobile}</p>
            </div>

            <div className="__container" onClick={() => this.toggleModal(1)}>
              <span className="__icon secondIcon">{Infos[1].Icon}</span>
              <p className="__content">{Infos[1].Content}</p>
              <p className="__contentMobile">{Infos[1].ContentMobile}</p>
            </div>

            <div className="__container" onClick={() => this.toggleModal(2)}>
              <span className="__icon thirdIcon">{Infos[2].Icon}</span>
              <p className="__content">{Infos[2].Content}</p>
              <p className="__contentMobile">{Infos[2].ContentMobile}</p>
            </div>

            <div className="__container" onClick={() => this.togglePaymentModal()}>
              <span className="__icon fourthIcon">{Infos[3].Icon}</span>
              <p className="__content">{Infos[3].Content}</p>
              <p className="__contentMobile">{Infos[3].ContentMobile}</p>
            </div>

            {this.state.modals[0] && (
              <div onClick={() => this.toggleModal(0)} className="overlayModal">
                <Modal modalOpen={this.toggleModal} />
              </div>
            )}

            {this.state.modals[1] && (
              <div onClick={() => this.toggleModal(1)} className="overlayModal">
                <Modal
                  icon={Infos[1].Icon}
                  modalOpen={this.toggleModal}
                  title={Infos[1].ContentMobile}
                  content={Infos[1].ContentModal}
                  hasCTA={false}
                />
              </div>
            )}

            {this.state.modals[2] && (
              <div onClick={() => this.toggleModal(2)} className="overlayModal">
                <Modal
                  icon={Infos[2].Icon}
                  modalOpen={this.toggleModal}
                  title={Infos[2].ContentMobile}
                  content={Infos[2].ContentModal}
                  hasCTA={true}
                  link="https://www.quemdisseberenice.com.br/institucional/trocas-e-devolucoes"
                />
              </div>
            )}

            {this.state.modals[3] && (
              <div onClick={() => this.toggleModal(3)} className="overlayModal">
                <Modal modalOpen={this.toggleModal} />
              </div>
            )}

            {this.state.shippingModalOpen == true && (
              <div onClick={() => this.toggleShippingModal()} className="overlayModal">
                <ShippingModal
                  modalOpen={this.toggleShippingModal}
                  price={this.state.Infos[0].Content}
                />
              </div>
            )}
            {this.state.paymentModalOpen == true && (
              <div onClick={() => this.togglePaymentModal()} className="overlayModal">
                <PaymentModal modalOpen={this.togglePaymentModal} />
              </div>
            )}
          </>
        );
      }
    }

    ReactDOM.render(<Bar />, document.getElementById('infoBar__render'));
  }
};

export default {
  init: Methods.InfoBar
};
