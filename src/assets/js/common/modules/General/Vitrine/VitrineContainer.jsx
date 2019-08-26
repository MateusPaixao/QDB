import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from "./components/_Card.jsx"

const Methods = {
  init(){
    // Methods.Form();
    Methods.BuildCard();
  },
  BuildCard(){
    class CardContainer extends Component {
      constructor() {
        super();
        this.state = {
          ids: [270]
        };
      }
      Product(id, sku) {
        this.setState({ ProductId: id });
        this.setState({ idSku: sku });
      }
      render() {
        // this.Product("270", "1450");
        // const { idSku } = "270",
        // { ProductId } = "1450";
        let ids = this.state.ids,
        cards = [];
        for (let i = 0; i < ids.length; i++){
          cards.push(
          <Card
            ProductId={this.state.ids[0]}
            idSku="1450"
            key={ids[i].toString()}
            // handleChange={this.handleChange}
          />);
        }
        return (
          cards
        );
      }
    }
    
    ReactDOM.render(
      <CardContainer />,
      document.getElementById('app-1251')
    );
  }
}

export default {
  init: Methods.init
};