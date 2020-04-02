//IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';

import { isInViewport } from '../../../global/global-index';
import Breadcrumbs from '../../General/Breadcrumbs';
import Banner from './Components/Banner';
import Chaordic from './Components/Chaordic';
import Initiatives from './Components/Initiatives';
import Filter from './Components/Filter';
import SmartResearch from './Components/Filter/smartResearch.js';
// import {buildVitrines} from './Components/Vitrine/vitrine-index.jsx';

const Methods = {
  init() {
    Methods.BuildPage();
    isInViewport();
    console.log('teste');
    // buildVitrines();
  },

  BuildPage() {
    class Vegan extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          loaded: true,
          order: '',
          showSmart: true,
          from: 24
        };

        // this.handleInfos = this.handleInfos.bind(this);
      }

      // resizeForSubcategory() {
      //   let url = window.location.href.split('/');
      //   let body = document.querySelectorAll('.category');
      //   if (url.length == 6) {
      //     body[0].classList.add('subcategory');
      //   } else if (url.length == 5) {
      //     body[0].classList.add('category-new');
      //   }
      // }

      componentDidMount() {
        // this.resizeForSubcategory()
        // this.handleInfos()
      }
      handleOrder(newOrder) {
        this.setState({
          order: newOrder,
          from: 24
        });
      }

      handleSmartResearch(value) {
        this.setState({
          showSmart: value
        });
      }

      render() {
        return (
          <>
            <Breadcrumbs />
            <Banner />
            <Chaordic />
            <Initiatives />
            <Filter
              showSmartResearch={this.state.showSmart}
              handleSmartResearch={this.handleSmartResearch.bind(this)}
              handleOrder={this.handleOrder.bind(this)}
              info={this.state.info}
            />
            <SmartResearch
              handleSmartResearch={this.handleSmartResearch.bind(this)}
              show={this.state.showSmart}
              order={this.state.order}
              from={this.state.from}
            />
          </>
        );
      }
    }

    ReactDOM.render(<Vegan />, document.getElementById('render--vegan'));
  }
};

export default {
  init: Methods.init
};
