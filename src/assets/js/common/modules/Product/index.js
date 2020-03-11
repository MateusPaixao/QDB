import React from 'react';
import ReactDOM from 'react-dom';

import Principal from './Components/Principal';
import Info from './Components/Info';
import { Recommend } from './Components/Chaordic';
import { isInViewport, getCookie } from '../../global/global-index';
import Breadcrumbs from '../General/Breadcrumbs';

const Methods = {
  init() {
    Methods.BuildProduct();
    isInViewport();
  },
  BuildProduct() {
    class Product extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          Product: [],
          Sku: [],
          Reviews: [],
          Pop: Math.floor(Math.random() * (30 + 5)) + 15,
          Loaded: false,
          ReviewOpen: false
        };
        this.getProduct = this.getProduct.bind(this);
        this.getReviews = this.getReviews.bind(this);
        this.handleSku = this.handleSku.bind(this);
        this.handleReviews = this.handleReviews.bind(this);
        this.setTracking = this.setTracking.bind(this);
      }

      handleReviews() {
        this.setState({
          ReviewOpen: !this.state.ReviewOpen
        });
      }

      setTracking() {
        const TrackingCookie = getCookie('LinxTracking');
        TrackingCookie &&
          TrackingCookie != '' &&
          fetch(TrackingCookie).then(res => {
            console.log(res);
            console.log('Linx OK');
          });
      }

      getProduct() {
        new Promise(resolve => {
          let request = new XMLHttpRequest(),
            url = '/api/catalog_system/pub/products/search' + window.location.pathname;

          request.open('GET', url);
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
          request.onreadystatechange = () => {
            if (request.readyState === 4) {
              resolve(JSON.parse(request.response));
            }
          };
          request.send();
        }).then(product => {
          console.log(product[0]);
          this.setState(
            {
              Product: product,
              Sku:
                new URL(window.location.href).searchParams.get('idsku') != null
                  ? product[0].items.find(
                      sku => sku.itemId == new URL(window.location.href).searchParams.get('idsku')
                    )
                  : product[0].items[0]
            },
            () => {
              console.log(this.state.Product);
              this.getReviews(this.state.Product[0].productId);
            }
          );
        });
      }

      getReviews(ProductId) {
        new Promise(resolve => {
          let request = new XMLHttpRequest(),
            url =
              'https://service.yourviews.com.br/api/v2/pub/review/Summary?productid=' +
              ProductId +
              '&order=3&count=5';

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
        })
          .then(reviews => {
            this.setState(
              {
                Reviews: reviews,
                Loaded: true
              },
              () => {
                console.log(this.state.Reviews);

                let el = document.createElement('script');
                el.type = 'application/ld+json';

                el.text = JSON.stringify({
                  '@context': 'https://schema.org/',
                  '@type': 'Product',
                  name: this.state.Sku.nameComplete,
                  image: [
                    this.state.Sku.images.map(
                      SkuImg => SkuImg.imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]
                    )
                  ],
                  description: this.state.Product[0].metaTagDescription,
                  sku: this.state.Sku.itemId,
                  brand: {
                    '@type': 'Thing',
                    name: this.state.Product[0]['Apresentação DMP']
                  },
                  offers: {
                    '@type': 'Offer',
                    url: this.state.Product[0].link.replace(
                      'qbbr.vtexcommercestable.com.br',
                      'quemdisseberenice.com.br'
                    ),
                    priceCurrency: 'BRL',
                    price: this.state.Sku.sellers[0].commertialOffer.Price.toFixed(2),
                    availability: 'https://schema.org/InStock',
                    seller: {
                      '@type': 'Organization',
                      name: 'quem disse, berenice'
                    }
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue:
                      this.state.Reviews.Element != null
                        ? Math.round(this.state.Reviews.Element.Rating)
                        : 0,
                    reviewCount:
                      this.state.Reviews.Element != null
                        ? this.state.Reviews.Element.TotalRatings
                        : 0
                  },
                  review:
                    this.state.Reviews.Element != null
                      ? this.state.Reviews.Element.TopOpinions.map(o => ({
                          '@type': 'Review',
                          description: o.Opinion,
                          reviewRating: {
                            '@type': 'Rating',
                            bestRating: '5',
                            ratingValue: o.Rate.toString(),
                            worstRating: '1'
                          },
                          author: {
                            '@type': 'Person',
                            name: ''
                          }
                        }))
                      : {}
                });

                document.querySelector('body').appendChild(el);
              }
            );
          })
          .catch(() => {
            let reviews = {
              Element: ''
            };
            this.setState(
              {
                Reviews: reviews,
                Loaded: true
              },
              () => {
                console.log(this.state.Reviews);

                let el = document.createElement('script');
                el.type = 'application/ld+json';

                el.text = JSON.stringify({
                  '@context': 'https://schema.org/',
                  '@type': 'Product',
                  name: this.state.Sku.nameComplete,
                  image: [
                    this.state.Sku.images.map(
                      SkuImg => SkuImg.imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]
                    )
                  ],
                  description: this.state.Product.metaTagDescription,
                  sku: this.state.Sku.itemId,
                  brand: {
                    '@type': 'Thing',
                    name: this.state.Product['Apresentação DMP']
                  },
                  offers: {
                    '@type': 'Offer',
                    url: this.state.Product.link,
                    priceCurrency: 'BRL',
                    price: this.state.Sku.sellers[0].commertialOffer.Price.toFixed(2),
                    availability: 'https://schema.org/InStock',
                    seller: {
                      '@type': 'Organization',
                      name: 'quem disse, berenice'
                    }
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue:
                      this.state.Reviews.Element != null
                        ? Math.round(this.state.Reviews.Element.Rating)
                        : 0,
                    reviewCount:
                      this.state.Reviews.Element != null
                        ? this.state.Reviews.Element.TotalRatings
                        : 0
                  },
                  review:
                    this.state.Reviews.Element != null
                      ? [
                          this.state.Reviews.Element.TopOpinions.map(o => ({
                            '@type': 'Review',
                            description: o.Opinion,
                            reviewRating: {
                              '@type': 'Rating',
                              bestRating: '5',
                              ratingValue: o.Rate.toString(),
                              worstRating: '1'
                            },
                            author: {
                              '@type': 'Person',
                              name: ''
                            }
                          }))
                        ]
                      : {}
                });

                document.querySelector('body').appendChild(el);
              }
            );
          });
        document.title = `${this.state.Product[0].productName} - quem disse berenice?`;
      }

      handleSku(e, skuToChange) {
        // console.log(e);
        this.setState(
          {
            Sku: this.state.Product[0].items.find(sku => sku.itemId == skuToChange),
            Pop: e.dataset.pop
          },
          () => {
            console.log(
              `%cSku updated to ${this.state.Sku.itemId} 🔄`,
              'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#83ACE2; color: #FDFDFD;'
            );
          }
        );
      }

      componentDidMount() {
        this.getProduct();
        this.setTracking();
      }

      render() {
        const LoadComponent = ({ heightSize }) => (
          <div className="set--loading" style={{ height: heightSize }}>
            <span className="loader_in">
              <div className="in">
                <svg
                  className="svg--logo-principal cssmask loading mask-ok"
                  xmlns="http://www.w3.org/2000/svg"
                  width="170"
                  height="43.418"
                >
                  <g data-name="logo versao principal" fill="#000">
                    <g data-name="Grupo 8">
                      <path
                        data-name="Caminho 32"
                        d="M50.014 38.913a3.149 3.149 0 00.749-2.206 3.056 3.056 0 00-.791-2.206 2.5 2.5 0 00-1.956-.832 2.645 2.645 0 00-2.039.874 3.056 3.056 0 00-.791 2.206 3.923 3.923 0 00.208 1.249 2.47 2.47 0 00.583.957 2.965 2.965 0 00.916.624 3.178 3.178 0 001.124.208 2.619 2.619 0 002-.874m1.373-8.365a6.053 6.053 0 011.873 1.373 6.656 6.656 0 011.249 2.123 8.2 8.2 0 01.458 2.705 6.979 6.979 0 01-1.706 4.828 5.573 5.573 0 01-4.37 1.831 4.372 4.372 0 01-3.662-1.623h-.083v1.373h-3.916V23.806h4.12v7.866h.083a4.653 4.653 0 013.662-1.623 5.538 5.538 0 012.289.5"
                      />
                      <path
                        data-name="Caminho 33"
                        d="M60.544 33.878a2.5 2.5 0 00-.874 1.5l4.828-.042a2.838 2.838 0 00-.458-1.082 2.161 2.161 0 00-.791-.708 2.428 2.428 0 00-1.082-.25 2.56 2.56 0 00-1.623.583m7.866 3.954h-8.74a2.436 2.436 0 001.04 1.623 3.434 3.434 0 002 .583 3.936 3.936 0 003.121-1.54l2.16 2.45a6.348 6.348 0 01-2.331 1.79 8 8 0 01-3.371.666 7.053 7.053 0 01-2.664-.5 6.232 6.232 0 01-2.123-1.373 7.014 7.014 0 01-1.415-2.123 7.269 7.269 0 01-.5-2.705 7.053 7.053 0 01.5-2.664 6.232 6.232 0 011.373-2.123 6.051 6.051 0 012.081-1.373 6.691 6.691 0 012.622-.5 6.812 6.812 0 013.329.832 5.874 5.874 0 012.289 2.331 6.974 6.974 0 01.832 3.371 7.75 7.75 0 00-.208 1.249"
                      />
                      <path
                        data-name="Caminho 34"
                        d="M77.773 30.049v4.412c-.25 0-.583-.042-.957-.042a3.34 3.34 0 00-1.623.375 2.2 2.2 0 00-1 1.04 3.449 3.449 0 00-.333 1.5v5.785h-4.119v-12.82h4.12v1.706h.042a5.331 5.331 0 011.082-1.082 6.074 6.074 0 011.249-.666 3.938 3.938 0 011.373-.208h.166"
                      />
                      <path
                        data-name="Caminho 35"
                        d="M82.685 33.878a2.5 2.5 0 00-.874 1.5l4.828-.042a2.838 2.838 0 00-.458-1.082 2.161 2.161 0 00-.791-.708 2.428 2.428 0 00-1.082-.25 2.751 2.751 0 00-1.623.583m7.866 3.954h-8.74a2.436 2.436 0 001.04 1.623 3.434 3.434 0 002 .583 3.936 3.936 0 003.121-1.54l2.16 2.45a6.348 6.348 0 01-2.331 1.79 8 8 0 01-3.371.666 7.053 7.053 0 01-2.664-.5 6.232 6.232 0 01-2.123-1.373 7.013 7.013 0 01-1.415-2.123 7.269 7.269 0 01-.5-2.705 7.053 7.053 0 01.5-2.664 6.232 6.232 0 011.373-2.123 6.051 6.051 0 012.081-1.373 6.691 6.691 0 012.622-.5 6.812 6.812 0 013.329.832 5.874 5.874 0 012.289 2.331 6.975 6.975 0 01.832 3.371c-.083.333-.125.749-.208 1.249"
                      />
                      <path
                        data-name="Caminho 36"
                        d="M101.788 30.34a4.009 4.009 0 011.457.874 3.824 3.824 0 01.957 1.665 8.943 8.943 0 01.333 2.539v7.7h-4.12v-6.66a4.522 4.522 0 00-.25-1.665 1.394 1.394 0 00-.666-.832 2.308 2.308 0 00-1.165-.25 2.543 2.543 0 00-1.249.333 2.242 2.242 0 00-.832 1 3.977 3.977 0 00-.291 1.665v6.45h-4.121v-12.86h4.12v1.54h.042a4.9 4.9 0 011.748-1.332 5.683 5.683 0 014.037-.166"
                      />
                      <path
                        data-name="Caminho 37"
                        d="M106.449 30.298h4.079v12.86h-4.079zm.208-2.206a2.241 2.241 0 01-.749-1.706 2.542 2.542 0 01.333-1.249 2.188 2.188 0 01.916-.832 2.675 2.675 0 011.29-.291 2.618 2.618 0 011.831.666 2.241 2.241 0 01.749 1.706 2.122 2.122 0 01-.749 1.706 2.549 2.549 0 01-1.831.666 2.516 2.516 0 01-1.79-.666"
                      />
                      <path
                        data-name="Caminho 38"
                        d="M115.23 42.576a5.916 5.916 0 01-2.372-2.372 6.812 6.812 0 01-.874-3.5 7.031 7.031 0 01.874-3.5 6.409 6.409 0 012.456-2.372 7.694 7.694 0 013.579-.832 7.388 7.388 0 013.121.666 6.555 6.555 0 012.455 1.914l-2.747 2.331a3.275 3.275 0 00-2.664-1.249 2.725 2.725 0 00-2.081.832 2.891 2.891 0 00-.791 2.164 3.924 3.924 0 00.208 1.249 2.471 2.471 0 00.583.957 3.56 3.56 0 00.916.624 2.836 2.836 0 001.207.208 3.36 3.36 0 002.622-1.165l2.83 2.455a6.015 6.015 0 01-2.372 1.706 8.19 8.19 0 01-3.413.666 6.744 6.744 0 01-3.538-.791"
                      />
                      <path
                        data-name="Caminho 39"
                        d="M129.714 33.878a2.5 2.5 0 00-.874 1.5l4.828-.042a2.838 2.838 0 00-.458-1.082 2.161 2.161 0 00-.791-.708 2.428 2.428 0 00-1.082-.25 2.75 2.75 0 00-1.623.583m7.866 3.954h-8.74a2.594 2.594 0 001.04 1.623 3.433 3.433 0 002 .583 3.936 3.936 0 003.121-1.54l2.16 2.45a6.348 6.348 0 01-2.331 1.79 8 8 0 01-3.371.666 7.053 7.053 0 01-2.664-.5 6.232 6.232 0 01-2.123-1.373 7.014 7.014 0 01-1.415-2.123 7.269 7.269 0 01-.5-2.705 7.053 7.053 0 01.5-2.664 6.232 6.232 0 011.373-2.123 6.052 6.052 0 012.081-1.373 6.691 6.691 0 012.622-.5 6.812 6.812 0 013.329.832 5.874 5.874 0 012.289 2.331 6.974 6.974 0 01.832 3.371c-.083.333-.125.749-.208 1.249"
                      />
                      <path
                        data-name="Caminho 40"
                        d="M139.66 42.698a2.2 2.2 0 01-.707-1.706 2.264 2.264 0 01.707-1.665 2.453 2.453 0 011.748-.708 2.428 2.428 0 011.706.708 2.176 2.176 0 01.708 1.665 2.357 2.357 0 01-.708 1.706 2.428 2.428 0 01-1.706.708 2.384 2.384 0 01-1.748-.708m-.125-7.2a2.029 2.029 0 01.042-.5c.042-.166.042-.333.083-.458a1.743 1.743 0 01.166-.416 2.62 2.62 0 00.166-.375.983.983 0 01.25-.375 1.365 1.365 0 00.25-.333c.083-.083.166-.208.291-.333a1.82 1.82 0 00.291-.333l.333-.333a1.821 1.821 0 00.291-.333 4.174 4.174 0 00.458-.5c.125-.125.25-.291.416-.5s.291-.416.375-.541a2.09 2.09 0 00.208-.541 1.517 1.517 0 00.083-.583 1.837 1.837 0 00-.416-1.207 1.681 1.681 0 00-1.249-.416 2.174 2.174 0 00-.874.166 2.878 2.878 0 00-.791.416 3.128 3.128 0 00-.666.624l-2.87-2.615a6.137 6.137 0 012.414-1.748 7.44 7.44 0 013.163-.666 7.738 7.738 0 011.748.208 5.7 5.7 0 011.581.624 5.248 5.248 0 011.29 1.04 4.17 4.17 0 01.832 1.457 5.688 5.688 0 01.291 1.956 4.78 4.78 0 01-.166 1.373 4.476 4.476 0 01-.541 1.207 11.536 11.536 0 01-.708.957 8.647 8.647 0 01-.874.874c-.125.083-.291.291-.583.541s-.458.416-.583.541a5 5 0 00-.416.458q-.25.312-.375.5a1.108 1.108 0 00-.125.5l-.083 1.04h-3.621z"
                      />
                    </g>
                    <path
                      data-name="Caminho 41"
                      d="M25.918 24.804l2.705-2.705A9.3 9.3 0 0015.475 8.948l-3.25 3.246c-.042.042-.083.042-.125.083L.281 24.138a.93.93 0 000 1.332l15.232 15.232a9.3 9.3 0 0013.152-13.151z"
                    />
                    <path
                      data-name="Caminho 42"
                      d="M48.184 15.607a2.53 2.53 0 001-1.082 3.526 3.526 0 000-3.163 2.63 2.63 0 00-2.455-1.457 2.576 2.576 0 00-1.956.832 3.056 3.056 0 00-.793 2.206 3.221 3.221 0 00.749 2.206 2.576 2.576 0 001.956.832 2.859 2.859 0 001.5-.375m5.327-9.114v18.063h-4.12v-6.451h-.042a4.328 4.328 0 01-3.454 1.5 6.032 6.032 0 01-3.121-.832 5.862 5.862 0 01-2.166-2.329 7.723 7.723 0 01-.749-3.5 8.2 8.2 0 01.458-2.7 5.973 5.973 0 011.249-2.123 5.6 5.6 0 011.872-1.377 5.449 5.449 0 012.331-.5 4.653 4.653 0 013.662 1.623h.042V6.493z"
                    />
                    <path
                      data-name="Caminho 43"
                      d="M67.619 6.492v12.86h-4.12v-1.46h-.083a4.575 4.575 0 01-3.621 1.706q-4.62 0-4.62-5.494V6.492h4.12v6.617a4.149 4.149 0 00.458 2.206 1.721 1.721 0 001.5.666 1.936 1.936 0 001.622-.789 3.655 3.655 0 00.624-2.289V6.492z"
                    />
                    <path
                      data-name="Caminho 44"
                      d="M73.779 10.072a2.5 2.5 0 00-.874 1.5l4.828-.042a2.838 2.838 0 00-.458-1.082 2.162 2.162 0 00-.791-.708 2.428 2.428 0 00-1.082-.25 2.75 2.75 0 00-1.623.583m7.866 3.954h-8.74a2.436 2.436 0 001.04 1.623 3.434 3.434 0 002 .583 3.936 3.936 0 003.121-1.54l2.16 2.45a6.348 6.348 0 01-2.331 1.79 8 8 0 01-3.371.666 7.053 7.053 0 01-2.664-.5 6.232 6.232 0 01-2.123-1.373 7.013 7.013 0 01-1.415-2.123 7.269 7.269 0 01-.5-2.705 7.053 7.053 0 01.504-2.655 6.231 6.231 0 011.373-2.123 6.052 6.052 0 012.081-1.373 6.691 6.691 0 012.622-.5 6.812 6.812 0 013.329.832A5.874 5.874 0 0181.02 9.41a6.974 6.974 0 01.832 3.371c-.083.333-.125.749-.208 1.249"
                    />
                    <path
                      data-name="Caminho 45"
                      d="M100.706 6.576a3.712 3.712 0 011.415.957 4.358 4.358 0 01.957 1.748 9.253 9.253 0 01.333 2.58v7.491h-4.079v-6.533c0-1.914-.624-2.913-1.873-2.913a1.84 1.84 0 00-1.54.791 3.4 3.4 0 00-.583 2.206v6.451H91.26v-6.535c0-1.914-.624-2.913-1.873-2.913a1.879 1.879 0 00-1.582.749 3.4 3.4 0 00-.624 2.206v6.451H83.06V6.496h4.12v1.457h.083a5.3 5.3 0 011.665-1.249 4.6 4.6 0 011.956-.416 3.979 3.979 0 013.662 1.831h.083a5.316 5.316 0 014.328-1.831 4.182 4.182 0 011.748.291"
                    />
                    <path
                      data-name="Caminho 46"
                      d="M119.101 15.149a2.99 2.99 0 00.791-2.206 3.288 3.288 0 00-.375-1.581 2.63 2.63 0 00-2.455-1.457 2.576 2.576 0 00-1.956.832 3.056 3.056 0 00-.791 2.206 3.056 3.056 0 00.791 2.206 2.575 2.575 0 001.956.832 2.76 2.76 0 002.039-.832M123.845 0v19.352h-3.912v-1.373h-.042a4.426 4.426 0 01-3.662 1.623 6.168 6.168 0 01-2.455-.5 5.839 5.839 0 01-1.914-1.332 5.973 5.973 0 01-1.249-2.123 8.221 8.221 0 010-5.41 5.973 5.973 0 011.249-2.123 5.6 5.6 0 011.873-1.373 5.449 5.449 0 012.331-.5 4.653 4.653 0 013.662 1.623h.042V0z"
                    />
                    <path
                      data-name="Caminho 47"
                      d="M125.885 6.492h4.079v12.86h-4.079zm.25-2.206a2.241 2.241 0 01-.749-1.706 2.543 2.543 0 01.333-1.249 2.188 2.188 0 01.916-.832 3.259 3.259 0 011.289-.291 2.618 2.618 0 011.831.666 2.241 2.241 0 01.749 1.706 2.122 2.122 0 01-.749 1.706 2.549 2.549 0 01-1.831.666 2.45 2.45 0 01-1.79-.666"
                    />
                    <path
                      data-name="Caminho 48"
                      d="M131.045 17.688l1.956-2.747a4.926 4.926 0 003.371 1.457 2.519 2.519 0 00.624-.083.606.606 0 00.375-.25.671.671 0 00.125-.375c0-.166-.125-.333-.416-.5a7.066 7.066 0 00-1.54-.583 5.94 5.94 0 01-.916-.333c-.291-.125-.541-.25-.832-.375a5.9 5.9 0 01-.749-.458 4 4 0 01-.624-.583 2.733 2.733 0 01-.5-.708 2.826 2.826 0 01-.291-.832 4.107 4.107 0 01-.125-1 3.779 3.779 0 01.624-2.164 3.947 3.947 0 011.748-1.411 5.751 5.751 0 012.455-.5 8.424 8.424 0 011.79.166 7.1 7.1 0 011.581.541 9.658 9.658 0 011.5.916l-1.956 2.955a4.339 4.339 0 00-1.457-1 3.336 3.336 0 00-1.457-.333 1 1 0 00-.624.166.471.471 0 00-.291.5q0 .25.375.5a6.565 6.565 0 001.29.583c.333.125.583.208.832.291.208.083.458.166.708.291s.5.208.666.291.375.208.583.333.375.25.5.333a3.752 3.752 0 00.416.375 3.178 3.178 0 01.333.458 2.549 2.549 0 01.208.5 3.469 3.469 0 01.166.624 3.807 3.807 0 01.042.708 4.241 4.241 0 01-.333 1.665 3.28 3.28 0 01-.957 1.29 4.311 4.311 0 01-1.623.874 7.581 7.581 0 01-2.289.333 7.726 7.726 0 01-5.286-1.914"
                    />
                    <path
                      data-name="Caminho 49"
                      d="M141.741 17.688l1.956-2.747a4.926 4.926 0 003.371 1.457 2.519 2.519 0 00.624-.083.606.606 0 00.375-.25.671.671 0 00.125-.375c0-.166-.125-.333-.416-.5a7.068 7.068 0 00-1.54-.583 5.939 5.939 0 01-.916-.333c-.291-.125-.541-.25-.832-.375a5.907 5.907 0 01-.749-.458 4 4 0 01-.624-.583 2.734 2.734 0 01-.5-.708 2.826 2.826 0 01-.291-.832 4.1 4.1 0 01-.125-1 3.779 3.779 0 01.624-2.164 3.947 3.947 0 011.748-1.411 5.751 5.751 0 012.455-.5 8.424 8.424 0 011.79.166 7.1 7.1 0 011.581.541 9.66 9.66 0 011.5.916l-1.956 2.955a4.338 4.338 0 00-1.457-1 3.336 3.336 0 00-1.457-.333 1 1 0 00-.624.166.471.471 0 00-.291.5q0 .25.375.5a6.565 6.565 0 001.29.583c.333.125.583.208.832.291.208.083.458.166.708.291s.5.208.666.291.375.208.583.333.375.25.5.333a3.757 3.757 0 00.416.375 3.171 3.171 0 01.333.458 2.542 2.542 0 01.208.5 3.459 3.459 0 01.166.624 3.807 3.807 0 01.042.708 4.241 4.241 0 01-.333 1.665 3.28 3.28 0 01-.957 1.29 4.311 4.311 0 01-1.623.874 8.191 8.191 0 01-7.574-1.581"
                    />
                    <path
                      data-name="Caminho 50"
                      d="M157.598 10.072a2.5 2.5 0 00-.874 1.5l4.828-.042a2.838 2.838 0 00-.458-1.082 2.162 2.162 0 00-.791-.708 2.428 2.428 0 00-1.082-.25 2.75 2.75 0 00-1.623.583m7.866 3.954h-8.74a2.436 2.436 0 001.04 1.623 3.433 3.433 0 002 .583 3.936 3.936 0 003.121-1.54l2.16 2.45a6.348 6.348 0 01-2.331 1.79 8 8 0 01-3.371.666 7.053 7.053 0 01-2.664-.5 6.231 6.231 0 01-2.123-1.373 7.013 7.013 0 01-1.415-2.123 7.269 7.269 0 01-.5-2.705 7.053 7.053 0 01.504-2.655 6.232 6.232 0 011.373-2.123 6.052 6.052 0 012.081-1.373 6.691 6.691 0 012.622-.5 6.812 6.812 0 013.329.832 5.874 5.874 0 012.289 2.331 6.974 6.974 0 01.832 3.371c-.083.333-.125.749-.208 1.249"
                    />
                    <path
                      data-name="Caminho 51"
                      d="M168.876 22.307l1.04-3.5a1.788 1.788 0 00.083-.5 1.6 1.6 0 00-.5-1.207 1.875 1.875 0 00-1.29-.458 2.268 2.268 0 00-.916.208 1.781 1.781 0 00-.666.583 1.4 1.4 0 00-.208.708l-.456 4.166z"
                    />
                  </g>
                </svg>
              </div>
            </span>
          </div>
        );
        return (
          <div>
            {this.state.Loaded == true ? (
              <React.Fragment>
                <Breadcrumbs />
                <div className="container">
                  <Principal
                    Product={this.state.Product[0]}
                    Sku={this.state.Sku}
                    Reviews={this.state.Reviews.Element}
                    handleSku={this.handleSku}
                    onPage={this.state.Pop}
                    handleReviews={this.handleReviews}
                  />
                </div>
                <Info
                  Product={this.state.Product[0]}
                  Sku={this.state.Sku}
                  Reviews={this.state.Reviews.Element}
                  ReviewOpen={this.state.ReviewOpen}
                  handleReviews={this.handleReviews}
                />
                <Recommend Product={this.state.Product[0]} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Breadcrumbs />
                <LoadComponent heightSize="30em" />
                <h1 className="seo__h1">
                  {document.querySelector('.hidden .productName').textContent}
                </h1>
              </React.Fragment>
            )}
          </div>
        );
      }
    }

    ReactDOM.render(<Product />, document.getElementById('render--product'));
  }
};

export default {
  init: Methods.init
};
