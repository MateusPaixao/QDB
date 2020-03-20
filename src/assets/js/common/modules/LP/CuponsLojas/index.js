import React from 'react';
import ReactDOM from 'react-dom';

import Container from './Components/Container';
import { Filter, InputFilter } from './Components/Filter';

const Methods = {
  init() {
    Methods.BuildCuponsLojas();
  },

  BuildCuponsLojas() {
    class CuponsLojas extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          Stores: [],
          isLoaded: false,
          hasError: false
        };

        this.getStores = this.getStores.bind(this);
      }

      getStores() {
        const Header = new Headers();
        Header.append('REST-Range', 'resources=0-500');

        const vtexHeaderConfig = {
          method: 'GET',
          mode: 'cors',
          headers: Header
        };

        const url =
          'https://api.vtexcrm.com.br/qbbr/dataentities/NN/search?_fields=storeName,city,make,phone,state,street,zone,zipcode,number,complement,linkMaps,coupon&_sort=state';
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

      componentDidMount() {
        this.getStores();
        this.state.isLoaded && Filter();
        // this.resizeForSubcategory()
        // this.getStores()
      }

      render() {
        return this.state.hasError == false ? (
          !this.state.isLoaded ? (
            <div className="stores__loading">Carregando...</div>
          ) : (
            <>
              <InputFilter />
              <Container Stores={this.state.Stores} />
            </>
          )
        ) : (
          <div className="stores__error">Algo aconteceu, tente recarregar a página</div>
        );
      }
    }

    ReactDOM.render(<CuponsLojas />, document.getElementById('render--page'));
  }
};

export default {
  init: Methods.init
};
