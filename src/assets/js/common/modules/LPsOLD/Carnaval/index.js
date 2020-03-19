import React from 'react';
import ReactDOM from 'react-dom';
import VideoContainer from './Components/VideoContainer';
import ProductContainer from './Components/ProductContainer';
import MakeContainer from './Components/MakeContainer';
import { isInViewport } from '../../../global/global-index';

// Fix
const Methods = {
  init() {
    Methods.LPCarnaval();
    isInViewport();
  },
  LPCarnaval() {
    class Carnaval extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      componentDidMount() {
        console.log('LP Montada');
      }

      render() {
        return (
          <div>
            <VideoContainer />
            <ProductContainer />
            <MakeContainer />
          </div>
        );
      }
    }

    ReactDOM.render(<Carnaval />, document.getElementById('render--page'));
  }
};

export default {
  init: Methods.init
};
