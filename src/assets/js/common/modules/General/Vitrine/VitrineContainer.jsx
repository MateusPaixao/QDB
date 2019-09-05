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
          Products: []
        };
      }
      componentDidMount(){
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', "/api/catalog_system/pub/products/search/?fq=H:" + collection);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    resolve(JSON.parse(request.response));
                    // console.log(JSON.parse(request.response));
                }
            };

            request.send();
        }).then((col) => {
          this.setState({
            Products: col
          })
        });
      }
      
      render() {
        // const Slider = () => {
        //   return (
        //     <React.Fragment>
        //       <button id={"gliderPrev" + collection} role="button" aria-label="Previous" className={"glider-prev gliderPrev" + collection} >⯇</button>
        //       <button id={"gliderNext" + collection} role="button" aria-label="Next" className={"glider-next gliderNext" + collection}>⯈</button>
        //     </React.Fragment>
        //   )
        // }
        const Cards = () => {
          // console.log(this.state.Products);
          let cards = [];
          this.state.Products.map((Product, index) => {
            cards.push(
              <Card {...Product} key={collection + Product.productId + index} />
            );
          })
          return (
            <React.Fragment>
              <div className="cardProductContainer --gliderVitrine">
                {cards}
              </div>
              {/* <Slider /> */}
            </React.Fragment>
          )
        }

        return <Cards />
      }
    }
    
    ReactDOM.render(
      <CardContainer />,
      document.getElementById('collection-' + collection)
    );
  }
}

export default {
  init: Methods.init,
  build: Methods.BuildVitrine
};