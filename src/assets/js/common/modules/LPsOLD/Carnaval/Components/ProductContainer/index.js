import React from 'react';

// Fix
class productContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product1: {
        image: '/arquivos/banner-ultra-glitter-multiuso-quem-disse-berenice.png',
        mobileImage: '/arquivos/glitter-mobile.png?v=12',
        firstName: 'Ultra',
        middleName: 'Glitter',
        lastName: 'Multiuso',
        description: 'Com tecnologia inovadora, é fácil de aplicar e de retirar.',
        productId: 1590,
        link: 'https://www.quemdisseberenice.com.br/ultra-glitter-multiuso-douralix_826010/p',
        alt: 'Banner ultra glitter multiuso quem disse, Berenice?',
        title: 'ultra glitter multiuso quem disse, Berenice?'
      },
      product2: {
        image: '/arquivos/banner-locao-glitter-quem-disse-berenice.png',
        mobileImage: '/arquivos/locao-glitter-mobile.png?v=1231',
        firstName: 'Loção ',
        name: ' Glitter',
        description: 'Tá na dúvida de onde brilhar? Brilha no corpo todo.',
        productId: 1578,
        class: 'locao',
        link:
          'https://www.quemdisseberenice.com.br/locao-desodorante-hidratante-corporal-com-glitter-douradex_826006/p',
        alt: 'Banner loção glitter quem disse, Berenice?',
        title: 'loção glitter quem disse, Berenice?'
      },
      product3: {
        image: '/arquivos/sombra-refil.png',
        mobileImage: '/arquivos/sombra-mobile.png?v=1231',
        firstName: 'Sombra ',
        name: ' Refil',
        description: 'Duas novas cores vibrantes que faltavam na sua paleta.',
        productId: 1579,
        class: 'sombra',
        link: 'https://www.quemdisseberenice.com.br/sombra-refil-edicao-limitada_826005-P/p'
      }
    };
  }

  componentDidMount() {
    console.log('Product container montado');
    this.getProductInfo();
  }

  getProductInfo() {
    fetch(
      '/api/catalog_system/pub/products/search/?fq=productId:1590&fq=productId:1578&fq=productId:1579'
    )
      .then(res => res.json())
      .then(data => {
        console.clear();
        var prices = [];
        var pastPrices = [];
        data.map(price => {
          var actualPrice = price.items[0].sellers[0].commertialOffer.Price.toFixed(2)
            .toString()
            .replace('.', ',');
          var oldPrice = price.items[0].sellers[0].commertialOffer.ListPrice.toFixed(2)
            .toString()
            .replace('.', ',');

          prices.push({ price: actualPrice });
          pastPrices.push({ pastPrices: oldPrice });
        });

        console.log(pastPrices);
        this.setState({
          product1: [this.state.product1, prices[2], pastPrices[2]]
        });

        this.setState({
          product2: [this.state.product2, prices[1], pastPrices[1]]
        });

        this.setState({
          product3: [this.state.product3, prices[0], pastPrices[0]]
        });
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="productContainer">
        <div className="productContainer__text">
          <h2>Sua maquiagem de Carnaval está aqui!</h2>
          <p>
            Conheça nossos lançamentos e curta a folia com a tranquilidade de quem sabe que vai
            conseguir tirar todo o glitter do corpo.
          </p>
        </div>

        {this.state.product1.length > 1 && (
          <div className="productCard glitter">
            <div className="productCard__info">
              <div className="productCard__name">
                <h3 className="firstName">
                  {this.state.product1.length > 1 && this.state.product1[0].firstName}
                </h3>
                <span>&nbsp;</span>
                <h3>{this.state.product1[0].middleName}</h3>
                <span>&nbsp;</span>
                <h3 className="lastName">{this.state.product1[0].lastName}</h3>
              </div>
              <p>{this.state.product1[0].description}</p>
              <div className="productCard__prices">
                {this.state.product1[2].pastPrices != this.state.product1[1].price && (
                  <span className="pastPrice">R${this.state.product1[2].pastPrices}</span>
                )}
                <span>R${this.state.product1[1].price}</span>
              </div>
              <a className="productCard__button" href={this.state.product1[0].link}>
                Quero esse
              </a>
            </div>
            <div className="productCard__image">
              <img
                className="desktopImage"
                src={this.state.product1[0].image}
                alt={this.state.product1[0].alt}
                title={this.state.product1[0].title}
              />
              <img
                className="mobileImage"
                src={this.state.product1[0].mobileImage}
                alt={this.state.product1[0].alt}
                title={this.state.product1[0].title}
              />
            </div>
          </div>
        )}

        {this.state.product2.length > 1 && (
          <div className="productCard locao">
            <div className="productCard__info">
              <div className="productCard__name">
                <h3>{this.state.product2.length > 1 && this.state.product2[0].firstName}</h3>
                <span>&nbsp;</span>
                <h3>{this.state.product2[0].name}</h3>
              </div>
              <p>{this.state.product2[0].description}</p>
              <div className="productCard__prices">
                {this.state.product2[2].pastPrices != this.state.product2[1].price && (
                  <span className="pastPrice">R${this.state.product2[2].pastPrices}</span>
                )}
                <span>R${this.state.product2[1].price}</span>
              </div>
              <a className="productCard__button" href={this.state.product2[0].link}>
                Quero esse
              </a>
            </div>
            <div className="productCard__image">
              <img
                className="desktopImage"
                src={this.state.product2[0].image}
                alt={this.state.product2[0].alt}
                title={this.state.product2[0].title}
              />
              <img
                className="mobileImage"
                src={this.state.product2[0].mobileImage}
                alt={this.state.product2[0].alt}
                title={this.state.product2[0].title}
              />
            </div>
          </div>
        )}

        {this.state.product3.length > 1 && (
          <div className="productCard sombra">
            <div className="productCard__info">
              <div className="productCard__name">
                <h3>{this.state.product3.length > 1 && this.state.product3[0].firstName}</h3>
                <span>&nbsp;</span>
                <h3>{this.state.product3[0].name}</h3>
              </div>
              <p>{this.state.product3[0].description}</p>
              <div className="productCard__prices">
                {this.state.product3[2].pastPrices != this.state.product3[1].price && (
                  <span className="pastPrice">R${this.state.product2[2].pastPrices}</span>
                )}
                <span>R${this.state.product3[1].price}</span>
              </div>
              <a className="productCard__button" href={this.state.product3[0].link}>
                Quero esse
              </a>
            </div>
            <div className="productCard__image">
              <img className="desktopImage" src={this.state.product3[0].image} alt="" srcSet="" />
              <img
                className="mobileImage"
                src={this.state.product3[0].mobileImage}
                alt=""
                srcSet=""
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default productContainer;
