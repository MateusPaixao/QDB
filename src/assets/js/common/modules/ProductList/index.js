import React from 'react';
import ReactDOM from 'react-dom';
//IMPORTS
import { isInViewport } from '../../global/global-index';
import Filter from './Components/Filter';
import SmartResearch from './Components/Filter/smartResearch';
// import Banner from './Components/Banner'
// import {buildVitrines} from './Components/Vitrine/vitrine-index.jsx';

const Methods = {
  init() {
    Methods.BuildCategoryTop();
    isInViewport();
    // buildVitrines();
  },

  BuildCategoryTop() {
    class Category extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          category: '',
          loaded: false,
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

        this.handleInfos = this.handleInfos.bind(this);
      }

      handleInfos() {
        fetch('/api/catalog_system/pub/category/tree/3/')
          .then(res => res.json())
          .then(departaments => {
            const departmentId = vtxctx.departmentyId;

            const departament = departaments.filter(dpt => dpt.id == departmentId)[0];
            const category = departament.children;
            const subCategory = departament.children.map(ctg => ctg.children);

            const info = {
              departament,
              category,
              subCategory
            };

            this.setState({ info }, () => this.setState({ loaded: true }));
          });
      }

      resizeForSubcategory() {
        let url = window.location.href.split('/');
        let body = document.querySelectorAll('.category');

        if (url.length == 6) {
          body[0].classList.add('subcategory');
          setTimeout(() => {
            let banner_sub = document.querySelectorAll('.category_banner');
            banner_sub[1].classList.add('shell');
          }, 1000);
        } else if (url.length == 5 && body.length > 0) {
          body[0].classList.add('category-new');
        }
      }

      componentDidMount() {
        this.resizeForSubcategory();
        this.handleInfos();
      }
      handleOrder(newOrder) {
        this.setState({
          order: newOrder,
          from: 24
        });
      }

      handleSmartResearch() {
        this.setState(
          {
            showSmart: false
          },
          () => console.log('Setando state', this.state.showSmart)
        );
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

    ReactDOM.render(<Category />, document.getElementById('render--category'));
  }
};

export default {
  init: Methods.init
};
