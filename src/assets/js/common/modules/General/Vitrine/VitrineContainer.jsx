// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Siema from "../../../global/vendor/siema-slider/siema.min.js"
import Card from "./components/_Card.jsx"

const Methods = {
  init(){
    // Methods.Form();
    // Methods.BuildCard(idProduct, idSku);
  },
  BuildVitrine(collection, slider){
    class CardContainer extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          Products: [],
          Vitrine: "--sliderVitrine-" + collection
        };

        this.mountProducts = this.mountProducts.bind(this);
        this.slider = this.slider.bind(this);
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
          this.mountProducts(col);
        }).then(() => {
          setTimeout(() => {
            this.slider(this.state.Vitrine);
          }, 1000);
        })
      }

      slider(vitrine){
        const slideVitrines = new Siema({
          selector: "." + vitrine,
          duration: 200,
          easing: 'ease-out',
          perPage: 2,
          startIndex: 0,
          draggable: true,
          multipleDrag: true,
          threshold: 20,
          loop: true,
          rtl: false
        })

        
        Siema.prototype.addArrows = function () {
          var _this = this;
      
          // make buttons & append them inside Siema's container
          this.prevArrow = document.createElement('button');
          this.prevArrow.classList.add("--prev");
          this.nextArrow = document.createElement('button');
          this.nextArrow.classList.add("--next");
          this.prevArrow.textContent = '⯇';
          this.nextArrow.textContent = '⯈';
          
          let arrowsControl = document.createElement("span");
          arrowsControl.classList.add("vitrine__controls--arrows");
          this.selector.appendChild(arrowsControl);
      
          arrowsControl.appendChild(this.prevArrow);
          arrowsControl.appendChild(this.nextArrow);

          // event handlers on buttons
          this.prevArrow.addEventListener('click', function () {
              return _this.prev();
          });
          this.nextArrow.addEventListener('click', function () {
              return _this.next();
          });
        };
        
        slideVitrines.addArrows();

        window.addEventListener('resize', () => {
            slideVitrines.addArrows();
        });
      }

      mountProducts(Products){
        let ids = [];
        for(let product of Products){
          ids.push(product.productId);
        }
        new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let url = "https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productids=" + ids.join(",");
            request.open('GET', url);
            request.setRequestHeader('YVStoreKey','388ef2d0-c3b8-4fd6-af13-446b698d544a'); 
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Access-Control-Allow-Origin', '*');
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    resolve(JSON.parse(request.response));
                }
            }
            request.send();
        }).then((Reviews) => {
            let ProductsFull = [];
            // for (let i = 0; i < reviews.Element.length; i++) {
            //   tempData.push( reviews.Element[i] );
            // }
            // reviews = tempData;
            const sortReviewInNest = (a, b) => {
              return a.ProductId - b.ProductId;
            }
            const sortProductInNest = (a, b) => {
              return a.productId - b.productId;
            }
            let sortedReviews = Reviews.Element.sort(sortReviewInNest),
            sortedProducts = Products.sort(sortProductInNest);

            // Remove Duplicate Reviews
            let uniqueReviews = Array.from(new Set(sortedReviews.map(a => a.ProductId)))
            .map(id => {
              return sortedReviews.find(a => a.ProductId === id)
            });

            for(let i = 0; i < uniqueReviews.length; i++){
              let Product = {};
              Product.info = sortedProducts[i];
              Product.review = uniqueReviews[i];
              ProductsFull.push(Product);
            }
            console.log(ProductsFull);

            this.setState({
              Products: ProductsFull
            })
            // r.Element.map((review, index) =>{
            //     function countRating(){
            //         let stars='';
            //         for(let i = 1; i <= review.Rating; i++){
            //             stars += `<svg viewBox="0 0 18 21" width="18" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.605 14.394L0 10.48s2.528-2.836 3.605-3.913l5.014-5.013a5.326 5.326 0 0 1 7.523 0 5.321 5.321 0 0 1 0 7.521l-1.406 1.405 1.406 1.405a5.321 5.321 0 0 1 0 7.521 5.327 5.327 0 0 1-7.523 0l-5.014-5.013z" fill="#67605F"/></svg>`
            //         }
            //         return stars;
            //     }
            //     html += 
            //     `<li class="review">
            //         <span class="_rate">
            //         ${countRating()}
            //         </span>
            //         <p class="_comment">“` + review.Review + `” -` + review.User.Name.split(" ")[0] + `</p>
            //     </li>`
            // });
            // el.innerHTML = html.replace("undefined", "");
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
              <Card {...Product} key={collection + Product.info.productId + index} />
            );
          })
          return (
            <React.Fragment>
              <div className={"cardProductContainer " + this.state.Vitrine}>
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