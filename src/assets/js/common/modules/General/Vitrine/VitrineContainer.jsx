// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Card from "./components/_Card.jsx"

const Methods = {
  init(){
    // Methods.Form();
    // Methods.BuildCard(idProduct, idSku);
  },
  BuildVitrine(collection){
    class CardContainer extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          id: 270
        };
      }
      Collection(){
        
      }
      render() {
        return (
          <Card
              idProduct={idProduct}
              idSku={idSku}
              // Product={...vProd}
              key={idSku}
              // handleChange={this.handleChange}
            />
        )
      }
    }
    
    ReactDOM.render(
      <CardContainer />,
      document.getElementById('app-' + idProduct)
    );
  }
}

export default {
  init: Methods.init,
  build: Methods.BuildVitrine
};