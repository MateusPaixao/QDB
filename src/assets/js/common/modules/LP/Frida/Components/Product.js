import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

import Pictures from './Pictures';
import Content from './Content';
import Description from './Description';

export default function Product({ ProductID, Colecao }) {
  const [Product, setProduct] = useState([]);
  const [mainPicture, setMainPicture] = useState(null);
  const [Loaded, setLoaded] = useState(false);
  const [MaxHeight, setMaxHeight] = useState([true, true]);

  useEffect(() => {
    new Promise(resolve => {
      let request = new XMLHttpRequest(),
        url = '/api/catalog_system/pub/products/search?fq=productId:' + ProductID;

      request.open('GET', url);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(JSON.parse(request.response));
        }
      };
      request.send();
    }).then(product => {
      console.log(product);
      setProduct({ Info: product[0], Sku: product[0].items[0] });
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    console.log(Product);
  }, [Product]);

  const handleMainPicture = main => {
    setMainPicture(main);
  };

  const handleHeight = index => {
    let heights = [...MaxHeight];
    let height = { ...heights[index] };
    console.log(height);
    height = !heights[index];
    heights[index] = height;
    console.log(heights);
    setMaxHeight(heights);
  };

  const setAvaliable = sku => {
    let avaliable =
      sku.sellers[0].commertialOffer.AvailableQuantity == 0 ||
      sku.sellers[0].commertialOffer.Price == 0 ||
      sku.sellers[0].commertialOffer.ListPrice == 0
        ? 'set--unavaliable'
        : 'set--avaliable';
    return avaliable;
  };
  return (
    <>
      {Loaded == true ? (
        <div className={`principal ${setAvaliable(Product.Sku)}`}>
          <div className="principal__left">
            <Pictures
              Sku={Product.Sku}
              MainPicture={mainPicture}
              handleMainPicture={handleMainPicture}
            />
          </div>
          <div className="principal__right">
            <div className="principal__productContainer">
              <h1 className="title">{Product.Sku.nameComplete}</h1>
              <Content Product={Product.Info} Sku={Product.Sku} />
              <small className="principal__ask">
                Compre pelo
                <a href="https://wa.me/554187757336" target="_blank" rel="noopener noreferrer">
                  WhatsApp clicando aqui
                </a>
              </small>
              {/* <small className="principal__rule">*Válido para os clientes em Maceió e Natal</small> */}
            </div>
            <div className="principal__more">
              {Colecao == true ? (
                <>
                  <div className="info">
                    <h2 className="info__title">Motivos para amar a Paleta Multifuncional</h2>
                    <p className={`info__content set--max${MaxHeight[0]}`}>
                      <ul className="list">
                        <li className="item">Longa duração</li>
                        <li className="item">
                          Cores que podem ser usadas como blush, sombra e iluminador
                        </li>
                      </ul>
                    </p>
                  </div>
                  <div className="info">
                    <h2 className="info__title">Motivos para amar o Batom Mate Vervida</h2>
                    <p className={`info__content set--max${MaxHeight[0]}`}>
                      <ul className="list">
                        <li className="item">Efeito mate</li>
                        <li className="item">Alta cobertura</li>
                        <li className="item">Longa duração</li>
                        <li className="item">Proteção UVB com FPS 12</li>
                      </ul>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {window.innerWidth <= 768 ? (
                    <div className="more__info">
                      <Description Product={Product.Info} Sku={Product.Sku} />
                    </div>
                  ) : (
                    <>
                      <div className="info">
                        <h2 className="info__title">Descubra Mais</h2>
                        <p className={`info__content set--max${MaxHeight[0]}`}>
                          {ReactHtmlParser(Product.Info.description)}
                          <br />
                          <br />
                          <br />
                          {
                            <span className="seemore" onClick={() => handleHeight(0)}>
                              {MaxHeight[0] == true ? 'ler mais' : 'ler menos'}
                            </span>
                          }
                        </p>
                      </div>
                      <div className="info">
                        <h2 className="info__title">Como Usar</h2>
                        <p className={`info__content`}>
                          {ReactHtmlParser(Product.Info['Modo de Uso'])}
                          {/* {
                        <span className="seemore" onClick={() => handleHeight(1)}>
                          {MaxHeight[1] == true ? 'ler mais' : 'ler menos'}
                        </span>
                      } */}
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
