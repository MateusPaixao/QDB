// import Siema from "../../../global/vendor/siema-slider/siema.min.js"
import Card from "./components/_Card.jsx"
// import 'promise-polyfill/src/polyfill';

const Methods = {
  init(){
    // Methods.Form();
    // Methods.BuildCard(idProduct, idSku);
  },
  BuildVitrine(idCollection, collection, slider, itemsPP){
    class CardContainer extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          Products: [],
          Vitrine: "sliderVitrine-" + idCollection,
          HasSlider: slider,
          PerPage: itemsPP
        };

        this.mountProducts = this.mountProducts.bind(this);
        this.slider = this.slider.bind(this);
        this.isInViewport = this.isInViewport.bind(this);
      }

      componentDidMount(){
        let queryString = "?";
        for(let i = 0; i < collection.length; i++){
          queryString += "&fq=productId:" + collection[i].Product
        }
        fetch("/api/catalog_system/pub/products/search/" + queryString, {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).then(response => {
          return response.json();
        })
        .then((col) => {
          this.mountProducts(col);
        })
        // return new Promise((resolve, reject) => {
        //     let request = new XMLHttpRequest();
        //     request.open('GET', "/api/catalog_system/pub/products/search/" + queryString);
        //     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        //     request.onreadystatechange = () => {
        //         if (request.readyState === 4) {
        //             resolve(JSON.parse(request.response));
        //             // console.log(JSON.parse(request.response));
        //         }
        //     };

        //     request.send();
        // }).then((col) => {
        //   this.mountProducts(col);
        // })
      }
  
      isInViewport(){
        let images = document.querySelectorAll('.cardProduct__pictureContainer__picture, .cardProduct__config__list__item img');
        
        if ('IntersectionObserver' in window) {
            // IntersectionObserver Supported
            let config = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.5
                };
            
            let observer = new IntersectionObserver(onChange, config);
            images.forEach(img => observer.observe(img));
        
            function onChange(changes, observer) {
                changes.forEach(change => {
                if (change.intersectionRatio > 0) {
                    // Stop watching and load the image
                    loadImage(change.target);
                    observer.unobserve(change.target);
                }
                });
            }
        
        } else {
            // IntersectionObserver NOT Supported
            for(let i = 0; i < document.querySelectorAll('source, img').length; i++){
              loadImage(document.querySelectorAll('source, img')[i]);
            }
        }
        
        function loadImage(image) {
            // image.classList.add('fade-in');
            if(image.dataset && image.dataset.src) {
                image.src = image.dataset.src;
            }
            
            if(image.dataset && image.dataset.srcset) {
                image.srcset = image.dataset.srcset;
            }
        }
      }
      slider(vitrine, iPerPage){
        const slideVitrines = new Siema({
          selector: "." + vitrine,
          duration: 200,
          easing: 'ease-out',
          perPage: {
            300: 1.2,
            768: 2.2,
            992: iPerPage
          },
          onInit: printSlideIndex,
          onChange: printSlideIndex
        })

        function printSlideIndex() {
          for(let i = 0; i < this.innerElements.length; i++){
              const addOrRemove = i === Math.ceil(this.currentSlide) ? 'add' : 'remove';
              this.innerElements[i].classList[addOrRemove]('active');
          };
        }

        Siema.prototype.addArrows = function () {
          var _this = this;
      
          // make buttons & append them inside Siema's container
          _this.prevArrow = document.createElement('button');
          _this.prevArrow.classList.add("prev");
          _this.nextArrow = document.createElement('button');
          _this.nextArrow.classList.add("next");
          _this.prevArrow.textContent = '⯇';
          _this.nextArrow.textContent = '⯈';
          
          let arrowsControl = document.createElement("span");
          arrowsControl.classList.add("controls__arrows");
          _this.selector.appendChild(arrowsControl);
      
          arrowsControl.appendChild(_this.prevArrow);
          arrowsControl.appendChild(_this.nextArrow);

          // event handlers on buttons
          _this.prevArrow.addEventListener('click', function () {
              return _this.prev();
          });
          _this.nextArrow.addEventListener('click', function () {
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
        for(let i = 0; i < Products.length; i++){
          ids.push(Products[i].productId);
        }
        new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let url = "https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productids=" + ids.join(",");
            request.open('GET', url);
            request.setRequestHeader('YVStoreKey','388ef2d0-c3b8-4fd6-af13-446b698d544a'); 
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    resolve(JSON.parse(request.response));
                }
            }
            request.send();
        }).then((Reviews) => {
            let ProductsFull = [];

            const sortReviewInNest = (a, b) => {
              return a.ProductId - b.ProductId;
            }
            const sortProductInNest = (a, b) => {
              return a.productId - b.productId;
            }

            let sortedReviews = Reviews.Element.sort(sortReviewInNest),
            sortedProducts = Products.sort(sortProductInNest);
            // Remove Duplicate Reviews - IEBUG don't work
            // let uniqueReviews = Array.from(new Set(sortedReviews.map(a => a.ProductId)))
            // .map(id => {
            //   return sortedReviews.find(a => a.ProductId === id)
            // });
            for(let i = 0; i < sortedReviews.length; i++){
              if(sortedProducts[i] != undefined){
                let Product = {};
                Product.info = sortedProducts[i];
                Product.review = sortedReviews[i];
                Product.skuHighlight = collection.find(o => o.Product == sortedProducts[i].productId).SkuHighlight;
                ProductsFull.push(Product);
              }
            }

            // console.log(ProductsFull)
            this.setState({
              Products: ProductsFull
            }, ()=>{
              if(this.state.HasSlider == true){
                this.slider(this.state.Vitrine, this.state.PerPage);
              }
              this.isInViewport();
              console.log(this.state.Products);
            })
        })
      }
      render() {
        const Cards = () => {
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
            </React.Fragment>
          )
        }

        return <Cards />
      }
    }
    
    ReactDOM.render(
      <CardContainer />,
      document.getElementById('collection' + idCollection)
    );
  }
}

export default {
  init: Methods.init,
  build: Methods.BuildVitrine
};