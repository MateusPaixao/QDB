import React from 'react';
import ReactDOM from 'react-dom';

import Container from './ContainerLojas';
import AllStores from './AllStores';
import { Filter, InputFilter } from './Filter';
import { Title } from './Title';

const Methods = {
  init() {
    Methods.buildTitle();
    Methods.buildFilter();
    // Methods.ReactFilter();
    Methods.buildStores();
  },

  buildTitle() {
    class BuildTitle extends React.Component {
      render() {
        return (
          <>
            <Title />
            <AllStores />
          </>
        );
      }
    }
    ReactDOM.render(<BuildTitle />, document.getElementById('render--title'));
  },

  buildStores() {
    class BuildStores extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          Stores: [],
          isLoaded: false,
          hasError: false
        };
      }
      componentDidMount() {
        const Header = new Headers();
        Header.append('REST-Range', 'resources=0-500');

        const vtexHeaderConfig = {
          method: 'GET',
          mode: 'cors',
          headers: Header
        };

        const url =
          'https://api.vtexcrm.com.br/qbbr/dataentities/NN/search?_fields=storeName,city,make,phone,state,street,zone,zipcode,number,complement,linkMaps&_sort=state';
        fetch(url, vtexHeaderConfig)
          .then(res => res.json())
          .then(data => {
            this.setState(
              {
                Stores: data,
                isLoaded: !this.state.isLoaded
              },
              () => {
                console.log(this.state.Stores);
              }
            );
          })
          .catch(err => {
            console.log('Erro', err);
            this.setState({
              hasError: true
            });
          });
      }
      render() {
        return this.state.hasError == false ? (
          !this.state.isLoaded ? (
            <div className="stores__loading">Loading...</div>
          ) : (
            <Container Stores={this.state.Stores} />
          )
        ) : (
          <div className="stores__error">Algo aconteceu, tente recarregar a página</div>
        );
      }
    }
    ReactDOM.render(<BuildStores />, document.getElementById('render--stores'));
  },

  buildFilter() {
    class BuildFilter extends React.Component {
      render() {
        return <InputFilter />;
      }
    }
    ReactDOM.render(<BuildFilter />, document.getElementById('render--filter'));
    Filter();
  }
};

export default {
  init: Methods.init
};
