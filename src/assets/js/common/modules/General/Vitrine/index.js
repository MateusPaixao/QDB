// import Siema from "../../../global/vendor/siema-slider/siema.min.js"
import React from 'react';
import ReactDOM from 'react-dom';
import Siema from 'siema';
import Card, { LoadCard } from './components/_Card';
// import { object } from "prop-types";
// import 'promise-polyfill/src/polyfill';

const Methods = {
  init() {
    // Methods.Form();
    // Methods.BuildCard(idProduct, idSku);
  },
  BuildVitrine(idCollection, collection, slider, itemsPP, query) {
    // let showSmartResearch;
    class CardContainer extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          Products: [],
          Vitrine: 'sliderVitrine-' + idCollection,
          HasSlider: slider,
          PerPage: itemsPP,
          Loaded: false
        };

        this.mountProducts = this.mountProducts.bind(this);
        this.slider = this.slider.bind(this);
        this.isInViewport = this.isInViewport.bind(this);
      }

      componentDidMount() {
        if (this.state.HasSlider == true) {
          this.slider(this.state.Vitrine, this.state.PerPage);
        }
        let queryString = '?';
        if (collection != undefined) {
          for (let i = 0; i < collection.length; i++) {
            queryString += '&fq=productId:' + collection[i].Product;
          }
        } else {
          query != undefined ? (queryString = query) : '';
        }
        queryString = queryString.replace('&O=OrderByRatingDESC', '');
        console.log(queryString);
        fetch('/api/catalog_system/pub/products/search' + queryString, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => {
            return response.json();
          })
          .then(col => {
            this.mountProducts(col);
          });
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

      isInViewport() {
        let images = document.querySelectorAll(
          '.cardProduct__pictureContainer__picture, .cardProduct__config__list__item img'
        );

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
          for (let i = 0; i < document.querySelectorAll('source, img').length; i++) {
            loadImage(document.querySelectorAll('source, img')[i]);
          }
        }

        function loadImage(image) {
          // image.classList.add('fade-in');
          if (image.dataset && image.dataset.src) {
            image.src = image.dataset.src;
          }

          if (image.dataset && image.dataset.srcset) {
            image.srcset = image.dataset.srcset;
          }
        }
      }
      slider(vitrine, iPerPage) {
        const slideVitrines = new Siema({
          selector: '.' + vitrine,
          duration: 200,
          easing: 'ease-out',
          perPage: {
            300: 1.2,
            768: 2.2,
            992: iPerPage
          },
          onInit: printSlideIndex,
          onChange: printSlideIndex
        });

        function printSlideIndex() {
          for (let i = 0; i < this.innerElements.length; i++) {
            const addOrRemove = i === Math.ceil(this.currentSlide) ? 'add' : 'remove';
            this.innerElements[i].classList[addOrRemove]('active');
          }
        }

        Siema.prototype.addArrows = function() {
          var _this = this;

          // make buttons & append them inside Siema's container
          _this.prevArrow = document.createElement('button');
          _this.prevArrow.classList.add('prev');
          _this.nextArrow = document.createElement('button');
          _this.nextArrow.classList.add('next');
          _this.prevArrow.textContent = '⯇';
          _this.nextArrow.textContent = '⯈';

          let arrowsControl = document.createElement('span');
          arrowsControl.classList.add('controls__arrows');
          _this.selector.appendChild(arrowsControl);

          arrowsControl.appendChild(_this.prevArrow);
          arrowsControl.appendChild(_this.nextArrow);

          // event handlers on buttons
          _this.prevArrow.addEventListener('click', function() {
            return _this.prev();
          });
          _this.nextArrow.addEventListener('click', function() {
            return _this.next();
          });
        };

        slideVitrines.addArrows();

        window.addEventListener('resize', () => {
          slideVitrines.addArrows();
        });
      }

      mountProducts(Products) {
        console.log(Products);
        window.showSmartResearch = Products.length < 24 ? false : true;
        console.log(window.showSmartResearch);
        let ids = [];
        for (let i = 0; i < Products.length; i++) {
          ids.push(Products[i].productId);
        }
        new Promise(resolve => {
          let request = new XMLHttpRequest();
          let url =
            'https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productids=' +
            ids.join(',');
          request.open('GET', url);
          request.setRequestHeader('YVStoreKey', '388ef2d0-c3b8-4fd6-af13-446b698d544a');
          request.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded; charset=UTF-8'
          );
          request.onreadystatechange = () => {
            if (request.readyState === 4) {
              resolve(JSON.parse(request.response));
            }
          };
          request.send();
        }).then(Reviews => {
          let ProductsFull = [];

          const getSort = (type, ProductInfo) => {
            let SkuToHighlight = ProductInfo.items[0].itemId;
            const defaultSort = () => {
              SkuToHighlight = ProductInfo.items.find(
                Sku =>
                  Sku.sellers[0].commertialOffer.AvailableQuantity != 0 ||
                  Sku.sellers[0].commertialOffer.Price != 0 ||
                  Sku.sellers[0].commertialOffer.ListPrice != 0
              );
              SkuToHighlight = SkuToHighlight != undefined ? SkuToHighlight : ProductInfo.items[0];
              return collection != undefined
                ? collection.find(o => o.Product == ProductInfo.productId).SkuHighlight
                : SkuToHighlight;
            };

            const PriceAsc = () => {
              SkuToHighlight = ProductInfo.items.find(
                Sku =>
                  Sku.sellers[0].commertialOffer.Price ==
                  Math.min.apply(
                    Math,
                    ProductInfo.items.map(function(o) {
                      return o.sellers[0].commertialOffer.Price != 0
                        ? o.sellers[0].commertialOffer.Price
                        : 99999;
                    })
                  )
              );
              console.log(SkuToHighlight);
              SkuToHighlight = SkuToHighlight != undefined ? SkuToHighlight : ProductInfo.items[0];
              return collection != undefined
                ? collection.find(o => o.Product == ProductInfo.productId).SkuHighlight
                : SkuToHighlight;
            };

            const PriceDesc = () => {
              console.log(query);
              console.log(ProductInfo);
              SkuToHighlight = ProductInfo.items.find(
                Sku =>
                  Sku.sellers[0].commertialOffer.Price ==
                  Math.min.apply(
                    Math,
                    ProductInfo.items.map(function(o) {
                      console.log(o.sellers[0].commertialOffer.Price);
                      return o.sellers[0].commertialOffer.Price != 0
                        ? o.sellers[0].commertialOffer.Price
                        : 9999;
                    })
                  )
              );
              console.log(SkuToHighlight);
              SkuToHighlight = SkuToHighlight != undefined ? SkuToHighlight : ProductInfo.items[0];
              console.log(SkuToHighlight.itemId);
              return collection != undefined
                ? collection.find(o => o.Product == ProductInfo.productId).SkuHighlight
                : SkuToHighlight;
            };

            const BestDiscounts = () => {
              SkuToHighlight = ProductInfo.items.find(
                Sku =>
                  Sku.sellers[0].commertialOffer.Price ==
                  Math.min.apply(
                    Math,
                    ProductInfo.items.map(function(o) {
                      return o.sellers[0].commertialOffer.Price !=
                        o.sellers[0].commertialOffer.ListPrice
                        ? o.sellers[0].commertialOffer.Price
                        : 99999;
                    })
                  )
              );
              SkuToHighlight = SkuToHighlight != undefined ? SkuToHighlight : ProductInfo.items[0];
              return collection != undefined
                ? collection.find(o => o.Product == ProductInfo.productId).SkuHighlight
                : SkuToHighlight.itemId;
            };

            switch (type) {
              case 'OrderByTopSaleDESC':
                console.log(type);
                defaultSort();
                break;
              case 'OrderByPriceASC':
                console.log(type);
                PriceAsc();
                break;
              case 'OrderByPriceDESC':
                console.log(type);
                PriceDesc();
                break;
              case 'OrderByBestDiscountDESC':
                console.log(type);
                BestDiscounts();
                break;
              default:
                console.log('Expect Default: ' + type);
                defaultSort();
                break;
            }

            return SkuToHighlight.itemId;
          };
          Products.map(ProductInfo =>
            Reviews.Element.map(Review => {
              if (ProductInfo.productId == Review.ProductId) {
                let Product = {};
                Product.info = ProductInfo;
                Product.review = Reviews.HasErrors == false ? Review : undefined;
                Product.skuHighlight = getSort(
                  /\O=(.*?)&_/.exec(query) == null ? 'default' : /\O=(.*?)&_/.exec(query)[1],
                  ProductInfo,
                  Reviews.HasErrors == false ? Review : undefined
                );

                ProductsFull.push(Product);
              }
            })
          );

          // const sortReviewInNest = (a, b) => {
          //   return a.review.Rating + b.review.Rating;
          // };
          // const sortProductInNest = (a, b) => {
          //   return a.productId - b.productId;
          // };

          if (/\O=(.*?)&_/.exec(query) != null) {
            if (/\O=(.*?)&_/.exec(query)[1] == 'OrderByRatingDESC') {
              ProductsFull = ProductsFull.sort(function sortReviewInNest(a, b) {
                return b.review.Rating - a.review.Rating;
              });
              console.log(ProductsFull);
            }
          }
          // let sortedProducts = Products.sort(sortProductInNest);

          // if(Reviews.HasErrors == false){
          // let sortedReviews = Reviews.Element.sort(sortReviewInNest)

          // } else {
          // for(let i = 0; i < sortedProducts.length; i++){
          //   if(sortedProducts[i] != undefined){
          //     let Product = {};
          //     Product.info = sortedProducts[i];
          //     Product.review = undefined;
          //     Product.skuHighlight = collection.find(o => o.Product == sortedProducts[i].productId).SkuHighlight;
          //     ProductsFull.push(Product);
          //   }
          // }
          // }
          // Remove Duplicate Reviews - IEBUG don't work
          // let uniqueReviews = Array.from(new Set(sortedReviews.map(a => a.ProductId)))
          // .map(id => {
          //   return sortedReviews.find(a => a.ProductId === id)
          // });

          // console.log(ProductsFull)
          this.setState(
            {
              Products: ProductsFull
            },
            () => {
              if (this.state.HasSlider == true) {
                this.slider(this.state.Vitrine, this.state.PerPage);
              }
              this.isInViewport();
              console.log(this.state.Products);
            }
          );
        });
      }
      render() {
        const Cards = () => {
          let cards = [];
          this.state.Products.map((Product, index) => {
            cards.push(<Card {...Product} key={collection + Product.info.productId + index} />);
          });
          return (
            <React.Fragment>
              {this.state.Products.length == 0 && (
                <div
                  className={`cardProductContainer slider-${this.state.HasSlider} ${this.state.Vitrine}`}
                >
                  <LoadCard />
                  <LoadCard />
                  <LoadCard />
                  <LoadCard />
                  <LoadCard />
                  <LoadCard />
                  <LoadCard />
                  <LoadCard />
                </div>
              )}
              <div
                className={`cardProductContainer slider-${this.state.HasSlider} ${this.state.Vitrine}`}
              >
                {cards}
              </div>
            </React.Fragment>
          );
        };

        return <Cards />;
      }
    }

    ReactDOM.render(<CardContainer />, document.getElementById('collection' + idCollection));
  }
};

export default {
  init: Methods.init,
  build: Methods.BuildVitrine
};
