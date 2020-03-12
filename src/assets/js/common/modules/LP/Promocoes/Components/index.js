//IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';
import { isInViewport, getCookie } from '../../../../global/global-index';
import Filter from './Filter';
import SmartResearch from './Filter/smartResearch.js';

const Methods = {
  init() {
    Methods.BuildCategoryTop();
    isInViewport();
  },

  BuildCategoryTop() {
    class Category extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          category: '',
          loaded: true,
          department: '',
          order: '',
          info: {
            department: {},
            category: {},
            subcategory: {}
          },
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

      handleSmartResearch() {
        this.setState({
          showSmart: !this.state.showSmart
        });
      }

      render() {
        return (
          <React.Fragment>
            {this.state.loaded == true && (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </React.Fragment>
        );
      }
    }

    ReactDOM.render(<Category />, document.getElementById('render--list'));
  }
};

export default {
  init: Methods.init
};
