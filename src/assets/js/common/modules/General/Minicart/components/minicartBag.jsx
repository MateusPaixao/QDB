import React from 'react';
import ReactDOM from 'react-dom';

const Methods = {
  init() {
    Methods.buildBag();
  },
  buildBag() {
    class Bag extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          Qty: 0
        };
        this.updateNumberMinicart = this.updateNumberMinicart.bind(this);
      }
      updateNumberMinicart() {
        console.log('ué');
        this.setState(
          {
            Qty: vtexjs.checkout.orderForm.items.length
          },
          () => {
            console.log(this.state.Qty);
          }
        );
      }
      componentDidMount() {
        window.onload = function() {
          this.updateNumberMinicart();
        };
      }
      render() {
        return (
          <React.Fragment>
            <div className="header__options--item__cartBag">
              <svg
                className="__maskBag"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-5 -4 91 99"
                preserveAspectRatio="xMidYMax slice"
              >
                <defs>
                  <mask id="mask" x="0" y="0" width="76" height="76">
                    <defs>
                      <path
                        id="wave"
                        className="__wave"
                        fill="#000"
                        d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
                                s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                      ></path>
                    </defs>
                    <g>
                      <use xlinkHref="#wave" opacity=".3" transform="translate(-278.824 184.568)">
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="translate"
                          dur="10s"
                          calcMode="spline"
                          values="270 230; -334 180; 270 230"
                          keyTimes="0; .5; 1"
                          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </use>
                      <use xlinkHref="#wave" opacity=".6" transform="translate(-76.0591 226.219)">
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="translate"
                          dur="8s"
                          calcMode="spline"
                          values="-270 230;243 220;-270 230"
                          keyTimes="0; .6; 1"
                          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </use>
                      <use xlinkHref="#wave" opacty=".9" transform="translate(-0.145789 229.969)">
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="translate"
                          dur="6s"
                          calcMode="spline"
                          values="0 230;-140 200;0 230"
                          keyTimes="0; .4; 1"
                          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </use>
                    </g>
                  </mask>
                </defs>
                <path
                  mask="url(#mask)"
                  d="M70.5 24.4h-15v-4.9C55.5 8.8 47.1.2 36.9.2 26.7.2 18.3 8.8 18.3 19.5v4.9h-15C2 24.4.9 25.5.9 26.8v59.9c0 4 3.2 7.2 7.2 7.2h57.5c4 0 7.2-3.2 7.2-7.2V26.8c.1-1.4-.9-2.4-2.3-2.4zm-46.1-5C24.4 12.1 30 6.1 37 6.1s12.6 6 12.6 13.3v4.9H24.4v-4.9z"
                ></path>
              </svg>
              <svg
                className="__bag"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -4 80 99"
              >
                <path d="M70.5 24.4h-15v-4.9C55.5 8.8 47.1.2 36.9.2 26.7.2 18.3 8.8 18.3 19.5v4.9h-15C2 24.4.9 25.5.9 26.8v59.9c0 4 3.2 7.2 7.2 7.2h57.5c4 0 7.2-3.2 7.2-7.2V26.8c.1-1.4-.9-2.4-2.3-2.4zm-46.1-5C24.4 12.1 30 6.1 37 6.1s12.6 6 12.6 13.3v4.9H24.4v-4.9z"></path>
              </svg>
              <p className="minicart--itens">{this.state.Qty}</p>
            </div>
          </React.Fragment>
        );
      }
    }
    ReactDOM.render(<Bag />, document.getElementById('render--minicartBag'));
  }
};

export default {
  init: Methods.init
};
