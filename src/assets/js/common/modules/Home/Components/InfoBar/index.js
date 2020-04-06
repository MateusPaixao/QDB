import React from 'react';
import ReactDOM from 'react-dom';
import PaymentModal from './Modal/paymentModal';
import ShippingModal from './Modal/shippingModal';
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
              Icon: (
                <svg viewBox="0 0 512.131 512.131" xmlns="http://www.w3.org/2000/svg">
                  <path d="M326.293 497.131h-78.659c-9.705 0-17.602-7.896-17.602-17.602v-56.993h75.41c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-83.048c-3.866 0-7.063-3.023-7.274-6.853L199.123 89.681a7.513 7.513 0 00-1.026-3.418l-23.934-40.678h234.233l-20.857 35.448a7.5 7.5 0 1012.928 7.606l27.508-46.751a7.493 7.493 0 001.036-3.803v-25.17C429.011 5.793 423.217 0 416.095 0H166.464c-7.122 0-12.916 5.793-12.916 12.915v25.169c0 1.337.357 2.65 1.036 3.803l29.653 50.398 15.904 309.198c.511 9.229 6.608 16.872 14.891 19.778v58.267c0 17.977 14.625 32.602 32.602 32.602h78.659a7.5 7.5 0 100-14.999zM414.011 15v15.584H168.548V15z" />
                  <path d="M450.541 112.551a16.545 16.545 0 00-12.032-5.215H325.284c-4.542 0-8.928 1.901-12.033 5.216s-4.717 7.816-4.421 12.35L322.859 339.5a7.492 7.492 0 007.974 6.995 7.5 7.5 0 006.995-7.973l-11.622-177.78h111.382L421.404 408.29c-.548 8.387-7.562 14.957-15.967 14.957h-47.082c-8.405 0-15.419-6.57-15.967-14.957l-2.472-37.806c-.271-4.134-3.869-7.271-7.974-6.995a7.5 7.5 0 00-6.995 7.973l2.472 37.806c.779 11.919 8.302 21.937 18.681 26.433v53.533c0 12.625 10.271 22.896 22.896 22.896h25.8c12.625 0 22.896-10.271 22.896-22.896v-53.533c10.379-4.497 17.901-14.514 18.681-26.433l18.591-284.369a16.55 16.55 0 00-4.423-12.348zm-47.849 376.683c0 4.354-3.542 7.896-7.896 7.896h-25.8c-4.354 0-7.896-3.542-7.896-7.896v-50.987h41.592zm-77.467-343.493l-1.426-21.819a1.455 1.455 0 01.399-1.116 1.455 1.455 0 011.086-.471h113.225c.533 0 .885.256 1.087.471.201.215.435.583.399 1.116l-1.427 21.819zM168.548 343.494v-59.467c0-8.18-6.654-14.834-14.833-14.834h-.659v-12.632c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v12.632H97.981v-49.524c16.985-7.649 30.652-21.008 38.747-37.51a138.82 138.82 0 011.327 19.143v23.297c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-23.297c0-21.842-4.555-43.013-13.537-62.927a17.07 17.07 0 00-13.271-9.938c-5.873-.823-11.66 1.394-15.484 5.923l-10.907 12.915a71.581 71.581 0 00-16.875 46.129v75.79h-.658c-8.18 0-14.834 6.654-14.834 14.834v59.467c-6.03 2.195-10.355 7.968-10.355 14.748v27.11l-.001.019.001.019v29.374c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-21.894h91.771v83.864c0 11.245-9.149 20.394-20.395 20.394H92.527c-11.245 0-20.394-9.149-20.394-20.394v-30.008c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v30.008c0 19.516 15.878 35.394 35.394 35.394h50.982c19.517 0 35.395-15.878 35.395-35.394V358.243c0-6.78-4.326-12.554-10.356-14.749zm-57.233-186.541l10.907-12.915a2.102 2.102 0 011.951-.746c.441.062 1.245.306 1.672 1.251 1.5 3.325 2.861 6.69 4.086 10.089l-1.957 7.962c-4.178 17.003-15.119 31.451-29.994 40.192v-9.384a56.571 56.571 0 0113.335-36.449zm-28.826 127.24h71.059v58.342H82.489zm-10.355 93.679v-19.629c0-.39.316-.707.706-.707h90.357c.39 0 .707.317.707.707v19.629z" />
                </svg>
              )
            },
            {
              Content: 'Aumentamos o prazo de devolução para 30 dias',
              ContentMobile: 'Prazo de troca',
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
                  content={Infos[1].Content}
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
                  content={Infos[2].Content}
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
