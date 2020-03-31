import PaymentModal from './Modal/paymentModal';
import ShippingModal from './Modal/shippingModal';
import React from 'react';
import ReactDOM from 'react-dom';

const Methods = {
  InfoBar() {
    class Bar extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          paymentModalOpen: false,
          shippingModalOpen: false,
          Infos: [
            {
              Content: '',
              ContentMobile: 'Frete',
              Icon:
                '<svg xmlns="http://www.w3.org/2000/svg" width="37" height="32"><defs><clipPath id="a"><path d="M0 0h37v32H0z"/></clipPath></defs><g data-name="Prancheta – 15" clipPath="url(#a)"><g transform="translate(4.406 2.06)" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" fill="none"><path data-name="Retângulo 959" d="M.594 2.94h18.643v15.847H.594z"/><path data-name="Caminho 987" d="M18.937 8.994h4.947l3.71 3.71v6.183h-8.657z"/><circle data-name="Elipse 43" cx="3.263" cy="3.263" r="3.263" transform="translate(3.39 18.415)"/><circle data-name="Elipse 44" cx="3.263" cy="3.263" r="3.263" transform="translate(18.651 18.415)"/></g></g></svg>'
            },
            {
              Content: 'Troque pontos por produtos no nosso clube',
              ContentMobile: 'Nosso clube',
              Icon:
                '<svg xmlns="http://www.w3.org/2000/svg" width="37" height="32"><defs><clipPath id="a"><path d="M0 0h37v32H0z"/></clipPath></defs><g data-name="Prancheta – 16" clipPath="url(#a)"><path data-name="Caminho 1000" d="M29.933 13.306a1.374 1.374 0 00-.439-.643 1.354 1.354 0 00-.72-.3l-6.389-.694-2.633-5.856a1.369 1.369 0 00-2-.592 1.4 1.4 0 00-.507.592l-2.63 5.858-6.389.694a1.377 1.377 0 00-.775 2.389l4.758 4.313-1.311 6.279a1.38 1.38 0 00.537 1.392 1.341 1.341 0 00.733.26 1.388 1.388 0 00.758-.179l5.572-3.193 5.576 3.193a1.378 1.378 0 001.491-.081 1.358 1.358 0 00.473-.617 1.375 1.375 0 00.064-.775l-1.312-6.284 4.759-4.312a1.389 1.389 0 00.409-.664 1.424 1.424 0 00-.026-.779zm-.958.809l-4.937 4.479a.437.437 0 00-.128.2.422.422 0 000 .23l1.363 6.522a.5.5 0 01-.026.294.541.541 0 01-.179.234.508.508 0 01-.277.1.53.53 0 01-.29-.068l-5.784-3.334a.408.408 0 00-.213-.055.453.453 0 00-.213.055l-5.793 3.311a.53.53 0 01-.29.068.5.5 0 01-.277-.1.511.511 0 01-.179-.234.532.532 0 01-.026-.294l1.372-6.533a.42.42 0 00-.132-.426l-4.94-4.449a.508.508 0 01-.149-.545.521.521 0 01.162-.243.51.51 0 01.259-.114l6.628-.72a.45.45 0 00.2-.081.412.412 0 00.136-.17l2.752-6.08a.551.551 0 01.192-.226.521.521 0 01.571 0 .494.494 0 01.192.226l2.735 6.08a.412.412 0 00.136.17.45.45 0 00.2.081l6.628.72a.5.5 0 01.264.115.521.521 0 01.162.243.53.53 0 01.017.294.543.543 0 01-.137.25z" fill="#fff"/></g></svg>'
            },
            {
              Content: 'tudo em até 10x sem juros e parcela mínima de R$ 15',
              ContentMobile: 'Parcelas',
              Icon:
                '<svg xmlns="http://www.w3.org/2000/svg" width="37" height="32"><defs><clipPath id="a"><path d="M0 0h37v32H0z"/></clipPath></defs><g data-name="Prancheta – 17" clipPath="url(#a)"><path d="M34 24.105V7.895A2.719 2.719 0 0031.5 5h-25A2.719 2.719 0 004 7.895v16.21A2.719 2.719 0 006.5 27h25a2.719 2.719 0 002.5-2.895zM6.5 6.158h25A1.632 1.632 0 0133 7.895v1.158H5V7.895a1.632 1.632 0 011.5-1.737zM5 10.211h28v3.473H5zm1.5 15.631A1.632 1.632 0 015 24.105v-9.263h28v9.263a1.632 1.632 0 01-1.5 1.737z" fill="#fff"/></g></svg>'
            },
            {
              Content: 'Faça sua make na loja e receba 100% do valor em produtos',
              ContentMobile: 'Agende "<br>" sua make',
              Icon:
                '<svg xmlns="http://www.w3.org/2000/svg" width="37" height="32"><defs><clipPath id="a"><path d="M0 0h37v32H0z"/></clipPath></defs><g fill="#fff" data-name="Prancheta – 18" clipPath="url(#a)"><path data-name="Caminho 989" d="M14.65 15.283h-.275V13.35a.447.447 0 00-.473-.415h-.037V8.981a.413.413 0 00-.262-.371L9.942 7.005a.531.531 0 00-.46.018.406.406 0 00-.224.353v5.56h-.041a.447.447 0 00-.473.415v1.933h-.269a.447.447 0 00-.473.415v10.887a.447.447 0 00.473.415h6.178a.447.447 0 00.473-.415V15.698a.447.447 0 00-.476-.415zm-4.446-7.236l2.715 1.19v3.7h-2.715zm-.514 5.718h3.742v1.518H9.691zm4.485 12.409h-5.23V16.113h5.23z"/><path data-name="Caminho 990" d="M30.535 23H15.463a.456.456 0 100 .912h14.335l-.106.217a3.545 3.545 0 01-3.172 1.959H15.463a.456.456 0 100 .912h11.055a4.479 4.479 0 004.008-2.476l.426-.87a.449.449 0 00-.025-.44.466.466 0 00-.392-.214z"/><path data-name="Caminho 991" d="M12.069 8.478a9.519 9.519 0 1112.563 14.3.473.473 0 10.607.726 10.465 10.465 0 10-13.813-15.72.473.473 0 10.643.694z"/></g></svg>'
            }
          ]
        };

        this.getShippingInfo = this.getShippingInfo.bind(this);
        // this.setInfos = this.setInfos.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.togglePaymentModal = this.togglePaymentModal.bind(this);
        this.checkUrlParams = this.checkUrlParams.bind(this);
      }

      componentDidMount() {
        this.getShippingInfo();
        // this.setInfos();
        this.checkUrlParams();
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

      setInfos() {
        // this.state.Infos.map(info => {
        //     let items = []
        //     // items.push(
        //     //     <Info Icon={info.Icon} Text={info.Content} TextMobile={info.ContentMobile}/>
        //     // )
        // })
      }

      toggleModal() {
        console.log('CLiquei pra abrir');
        this.setState({ shippingModalOpen: !this.state.shippingModalOpen });
      }

      togglePaymentModal() {
        this.setState({ paymentModalOpen: !this.state.paymentModalOpen });
      }

      render() {
        const { Infos } = this.state;

        return (
          <React.Fragment>
            <div className="__container" onClick={() => this.toggleModal()}>
              <span className="__icon firstIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="32">
                  <defs>
                    <clipPath id="a">
                      <path d="M0 0h37v32H0z" />
                    </clipPath>
                  </defs>
                  <g data-name="Prancheta – 15" clipPath="url(#a)">
                    <g
                      transform="translate(4.406 2.06)"
                      stroke="#fff"
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
              </span>
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

            <a href="/nosso-clube">
              <div className="__container">
                <span className="__icon secondIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="32">
                    <defs>
                      <clipPath id="a">
                        <path d="M0 0h37v32H0z" />
                      </clipPath>
                    </defs>
                    <g data-name="Prancheta – 16" clipPath="url(#a)">
                      <path
                        data-name="Caminho 1000"
                        d="M29.933 13.306a1.374 1.374 0 00-.439-.643 1.354 1.354 0 00-.72-.3l-6.389-.694-2.633-5.856a1.369 1.369 0 00-2-.592 1.4 1.4 0 00-.507.592l-2.63 5.858-6.389.694a1.377 1.377 0 00-.775 2.389l4.758 4.313-1.311 6.279a1.38 1.38 0 00.537 1.392 1.341 1.341 0 00.733.26 1.388 1.388 0 00.758-.179l5.572-3.193 5.576 3.193a1.378 1.378 0 001.491-.081 1.358 1.358 0 00.473-.617 1.375 1.375 0 00.064-.775l-1.312-6.284 4.759-4.312a1.389 1.389 0 00.409-.664 1.424 1.424 0 00-.026-.779zm-.958.809l-4.937 4.479a.437.437 0 00-.128.2.422.422 0 000 .23l1.363 6.522a.5.5 0 01-.026.294.541.541 0 01-.179.234.508.508 0 01-.277.1.53.53 0 01-.29-.068l-5.784-3.334a.408.408 0 00-.213-.055.453.453 0 00-.213.055l-5.793 3.311a.53.53 0 01-.29.068.5.5 0 01-.277-.1.511.511 0 01-.179-.234.532.532 0 01-.026-.294l1.372-6.533a.42.42 0 00-.132-.426l-4.94-4.449a.508.508 0 01-.149-.545.521.521 0 01.162-.243.51.51 0 01.259-.114l6.628-.72a.45.45 0 00.2-.081.412.412 0 00.136-.17l2.752-6.08a.551.551 0 01.192-.226.521.521 0 01.571 0 .494.494 0 01.192.226l2.735 6.08a.412.412 0 00.136.17.45.45 0 00.2.081l6.628.72a.5.5 0 01.264.115.521.521 0 01.162.243.53.53 0 01.017.294.543.543 0 01-.137.25z"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                </span>
                <p className="__content">{Infos[1].Content}</p>
                <p className="__contentMobile">{Infos[1].ContentMobile}</p>
              </div>
            </a>

            <div className="__container" onClick={() => this.togglePaymentModal()}>
              <span className="__icon thirdIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="32">
                  <defs>
                    <clipPath id="a">
                      <path d="M0 0h37v32H0z" />
                    </clipPath>
                  </defs>
                  <g data-name="Prancheta – 17" clipPath="url(#a)">
                    <path
                      d="M34 24.105V7.895A2.719 2.719 0 0031.5 5h-25A2.719 2.719 0 004 7.895v16.21A2.719 2.719 0 006.5 27h25a2.719 2.719 0 002.5-2.895zM6.5 6.158h25A1.632 1.632 0 0133 7.895v1.158H5V7.895a1.632 1.632 0 011.5-1.737zM5 10.211h28v3.473H5zm1.5 15.631A1.632 1.632 0 015 24.105v-9.263h28v9.263a1.632 1.632 0 01-1.5 1.737z"
                      fill="#fff"
                    />
                  </g>
                </svg>
              </span>
              <p className="__content">{Infos[2].Content}</p>
              <p className="__contentMobile">{Infos[2].ContentMobile}</p>
            </div>

            <a href="/servicos">
              <div className="__container">
                <span className="__icon fourthIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="32">
                    <defs>
                      <clipPath id="a">
                        <path d="M0 0h37v32H0z" />
                      </clipPath>
                    </defs>
                    <g fill="#fff" data-name="Prancheta – 18" clipPath="url(#a)">
                      <path
                        data-name="Caminho 989"
                        d="M14.65 15.283h-.275V13.35a.447.447 0 00-.473-.415h-.037V8.981a.413.413 0 00-.262-.371L9.942 7.005a.531.531 0 00-.46.018.406.406 0 00-.224.353v5.56h-.041a.447.447 0 00-.473.415v1.933h-.269a.447.447 0 00-.473.415v10.887a.447.447 0 00.473.415h6.178a.447.447 0 00.473-.415V15.698a.447.447 0 00-.476-.415zm-4.446-7.236l2.715 1.19v3.7h-2.715zm-.514 5.718h3.742v1.518H9.691zm4.485 12.409h-5.23V16.113h5.23z"
                      />
                      <path
                        data-name="Caminho 990"
                        d="M30.535 23H15.463a.456.456 0 100 .912h14.335l-.106.217a3.545 3.545 0 01-3.172 1.959H15.463a.456.456 0 100 .912h11.055a4.479 4.479 0 004.008-2.476l.426-.87a.449.449 0 00-.025-.44.466.466 0 00-.392-.214z"
                      />
                      <path
                        data-name="Caminho 991"
                        d="M12.069 8.478a9.519 9.519 0 1112.563 14.3.473.473 0 10.607.726 10.465 10.465 0 10-13.813-15.72.473.473 0 10.643.694z"
                      />
                    </g>
                  </svg>
                </span>
                <p className="__content">{Infos[3].Content}</p>
                <p className="__contentMobile">
                  Agende <br /> sua make
                </p>
              </div>
            </a>

            {this.state.shippingModalOpen == true && (
              <div onClick={() => this.toggleModal()} className="overlayModal">
                <ShippingModal modalOpen={this.toggleModal} price={this.state.Infos[0].Content} />
              </div>
            )}
            {this.state.paymentModalOpen == true && (
              <div onClick={() => this.togglePaymentModal()} className="overlayModal">
                <PaymentModal modalOpen={this.togglePaymentModal} />
              </div>
            )}
          </React.Fragment>
        );
      }
    }

    ReactDOM.render(<Bar />, document.getElementById('infoBar__render'));
  }
};

export default {
  init: Methods.InfoBar
};
