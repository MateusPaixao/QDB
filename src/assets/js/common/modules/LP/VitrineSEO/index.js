import React from 'react';
import ReactDOM from 'react-dom';

import { isInViewport } from '../../../global/global-index';
import Breadcrumbs from '../../General/Breadcrumbs';
import Banner from '../../Components/BannerText';
import Filter from '../../Components/Filter';
import SmartResearch from '../../Components/Filter/smartResearch';

const Methods = {
  init() {
    Methods.BuildPage();
    isInViewport();
  },

  BuildPage() {
    class SEO extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          loaded: true,
          order: '',
          showSmart: true,
          from: 24
        };
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
        const collection = document.querySelector('.collection-number').textContent;

        return (
          <>
            <Breadcrumbs />
            <Banner />
            <Filter
              showSmartResearch={this.state.showSmart}
              handleSmartResearch={this.handleSmartResearch.bind(this)}
              handleOrder={this.handleOrder.bind(this)}
              info={this.state.info}
              search={collection}
            />
            <SmartResearch
              handleSmartResearch={this.handleSmartResearch.bind(this)}
              show={this.state.showSmart}
              order={this.state.order}
              from={this.state.from}
              search={collection}
            />
          </>
        );
      }
    }

    ReactDOM.render(<SEO />, document.getElementById('render--seo'));
  }
};

export default {
  init: Methods.init
};