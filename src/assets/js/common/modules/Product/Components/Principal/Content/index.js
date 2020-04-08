import React, { useEffect, useState, useRef } from 'react';
import { getCookie } from '../../../../../global/global-index';

export const Content = ({ Product, Sku, Reviews, onPage, handleReviews }) => {
  const [addStatus, setaddStatus] = useState(false);
  const [sendStatus, setsendStatus] = useState(false);
  const [discount, setDiscount] = useState(
    Sku.sellers[0].commertialOffer.Price - Sku.sellers[0].commertialOffer.ListPrice
  );
  const [email, setEmail] = useState('');
  const BtnAddToCart = useRef(null);

  useEffect(() => {
    setDiscount(Sku.sellers[0].commertialOffer.Price - Sku.sellers[0].commertialOffer.ListPrice);
  }, [Sku]);

  const Add = () => {
    setaddStatus(true);
    return new Promise((resolve, reject) => {
      vtexjs.checkout
        .getOrderForm()
        .then(orderForm => {
          console.log(orderForm);

          let marketingData;

          if (getCookie('IPS') != undefined) {
            try {
              let IPS = getCookie('IPS');

              const params = new URLSearchParams(IPS);

              marketingData = {
                utmSource: params.get('Midia'),
                utmCampaign: params.get('Campanha'),
                utmMedium: params.get('Parceiro')
              };

              console.log(marketingData);

              vtexjs.checkout.sendAttachment('marketingData', marketingData);
            } catch (e) {
              console.log(e);
            }
          }

          // console.log(orderForm);
          if (!!orderForm.items.length) {
            orderForm.items.map((e, i) => {
              if (e.id == Sku.itemId) {
                let quantity = e.quantity + 1;
                let updateItem = {
                  index: i,
                  quantity: quantity
                };
                return vtexjs.checkout.updateItems([updateItem]);
              } else {
                let newitem = {
                  id: Sku.itemId,
                  quantity: '1',
                  seller: '1'
                };
                return vtexjs.checkout.addToCart([newitem]);
              }
            });
          } else {
            let newitem = {
              id: Sku.itemId,
              quantity: '1',
              seller: '1'
            };
            return vtexjs.checkout.addToCart([newitem]);
          }
        })
        .done(function(orderForm) {
          // Legado Minicart
          vtexjs.checkout
            .getOrderForm()
            .then(orderForm => {
              window._orderForm = orderForm;
              for (let i = 0; i < orderForm.items.length; i++) {
                // console.log(orderForm.items[i]);
              }
            })
            .done(() => {
              BtnAddToCart.current.textContent = 'O produto foi adicionado';
              setaddStatus('added');
              setTimeout(() => {
                setaddStatus(false);
                resolve(console.log(orderForm));
              }, 1000);
            });
        });
    });
  };

  // React.useEffect(() => {
  //     if(addStatus == "adding"){
  //         e.textContent = "Adicionando...";
  //     }else if(addStatus == "updated"){
  //         setTimeout(() => {
  //             e.textContent = `Adicionar à Sacola`;

  //             setaddStatus("false");
  //         }, 2000);
  //     }
  // }, [addStatus])

  // React.useEffect(() => {
  //     if(Sku.sellers[0].commertialOffer.Price - Sku.sellers[0].commertialOffer.ListPrice != 0){
  //         if(onPage > 0){
  //             // interval ? clearInterval(interval) : null;
  //             let interval = setInterval(() => {
  //                 let min= onPage - 2;
  //                 let max= onPage + 4;
  //                 setOnPage(onPage > 2 ? (Math.floor(Math.random() * (+max - +min)) + +min) : 10)
  //                 console.log(onPage);
  //             }, 8000);
  //             return onPage;
  //         }
  //     }
  // }, [Sku])

  const letMeKnowSubmit = e => {
    e.preventDefault();
    new Promise(resolve => {
      setsendStatus(true);
      let request = new XMLHttpRequest();
      let url = 'https://www.quemdisseberenice.com.br/no-cache/AviseMe.aspx';
      let params =
        'notifymeClientName=Quem+disse+berenice&notifymeClientEmail=' +
        email +
        '&notifymeIdSku=' +
        Sku.itemId;
      // console.log(params);
      request.open('POST', url);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          // document.querySelector(".--send").textContent = "Cadastrando...(2/2)";
          resolve(request.response);
        } else {
          // document.querySelector(".--send").textContent = "Erro ao Cadastrar";
        }
      };
      request.send(params);
    }).then(() => {
      setsendStatus('sent');
      setTimeout(() => {
        // console.log(r);
        setsendStatus(false);
      }, 2500);
    });
  };

  const shelfLife = () => {
    if (Sku.attachments == undefined) return null;
    let Date = null;
    try {
      Sku.attachments.forEach(attachment => {
        if (attachment.name.indexOf('validade') != -1) {
          let validade = attachment.name;

          const array = validade.split('-');
          const month = array[1];
          const year = array[2];

          const monthFormat = {
            jan: 'Janeiro',
            fev: 'Fevereiro',
            mar: 'Março',
            abr: 'Abril',
            mai: 'Maio',
            jun: 'Junho',
            jul: 'Julho',
            ago: 'Agosto',
            set: 'Setembro',
            out: 'Outubro',
            nov: 'Novembro',
            dez: 'Dezembro'
          };

          Date = `Produto com vencimento em ${monthFormat[month]}/20${year}`;
        } else {
          console.log('sem attachments');
        }
      });
    } catch (err) {
      console.log('Sem attachments', err);
    }

    return Date;
  };

  return (
    <div className="principal__contentContainer">
      {Sku.sellers[0].commertialOffer.AvailableQuantity == 0 ||
      Sku.sellers[0].commertialOffer.Price == 0 ||
      Sku.sellers[0].commertialOffer.ListPrice == 0 ? (
        <div className="principal__content unavaliable">
          {// Refatorar
          Product.items.find(
            p =>
              p.sellers[0].commertialOffer.ListPrice != 0 &&
              p.sellers[0].commertialOffer.ListPrice == p.sellers[0].commertialOffer.Price
          ) ? (
            <span className="principal__content__price">
              <p className="principal__content__price__actual">
                R$
                {Product.items
                  .find(p => p.sellers[0].commertialOffer.ListPrice != 0)
                  .sellers[0].commertialOffer.ListPrice.toFixed(2)
                  .toString()
                  .replace('.', ',')}
              </p>
              <small className="principal__content__price__installments">
                até{' '}
                {Math.max.apply(
                  Math,
                  Product.items
                    .find(
                      p =>
                        p.sellers[0].commertialOffer.ListPrice != 0 &&
                        p.sellers[0].commertialOffer.ListPrice == p.sellers[0].commertialOffer.Price
                    )
                    .sellers[0].commertialOffer.Installments.map(function(o) {
                      return o.NumberOfInstallments;
                    })
                ) +
                  'x de R$' +
                  Math.min
                    .apply(
                      Math,
                      Product.items
                        .find(
                          p =>
                            p.sellers[0].commertialOffer.ListPrice != 0 &&
                            p.sellers[0].commertialOffer.ListPrice ==
                              p.sellers[0].commertialOffer.Price
                        )
                        .sellers[0].commertialOffer.Installments.map(function(o) {
                          return o.Value;
                        })
                    )
                    .toFixed(2)
                    .toString()
                    .replace('.', ',')}{' '}
                sem juros
              </small>
            </span>
          ) : (
            // p => p.sellers[0].commertialOffer.ListPrice != 0 && p.sellers[0].commertialOffer.ListPrice == p.sellers[0].commertialOffer.Price ?
            // <span className="principal__content__price">
            //     <p className="principal__content__price__actual">R${p.sellers[0].commertialOffer.ListPrice.toFixed(2).toString().replace(".", ",")}</p>
            //     <small className="principal__content__price__installments">até {Math.max.apply(Math, p.sellers[0].commertialOffer.Installments.map(function(o) { return o.NumberOfInstallments; })) + "x de R$" + Math.min.apply(Math, p.sellers[0].commertialOffer.Installments.map(function(o) { return o.Value; }).toFixed(2).toString().replace(".", ","))} sem juros</small>
            // </span>
            // :
            <p className="principal__content__reference">Infelizmente acabou, mas já já volta</p>
          )}
          {/* <button className="principal__content__letmeknow">Me avise quando voltar</button> */}

          {Reviews != null && (
            <p className="principal__content__reviews">
              {Reviews.Rating}/5 ({Reviews.TotalRatings} avaliações)
            </p>
          )}

          <button className="principal__content__addToCart unavaliable">
            Produto Indisponível :(
          </button>
          <form className="principal__content__letMeKnow" onSubmit={e => letMeKnowSubmit(e)}>
            <h3 className="principal__content__letMeKnow__title">Avise-me quando chegar</h3>
            <div className={`principal__content__letMeKnow__sendContainer status--${sendStatus}`}>
              <input
                id="email"
                className="principal__content__letMeKnow__sendContainer__input"
                type="email"
                placeholder="Digite seu e-mail: email@email.com.br"
                onKeyUp={e => setEmail(e.target.value)}
                required
              />
              <button
                id="email"
                className={`principal__content__letMeKnow__sendContainer__send status--${sendStatus}`}
                type="submit"
                disabled={
                  email == '' ||
                  !email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\w{2,3})+$/) ||
                  sendStatus ||
                  sendStatus == 'sent'
                }
              >
                {sendStatus != 'sent' ? (
                  !sendStatus ? (
                    <svg viewBox="0 0 430 429" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M414 1L8.99997 134C-1.00003 137 -2.00003 149 6.99997 155L172 257L275 423C280 431 293 429 296 420L429 15C432 6 423 -2 414 1ZM195 251L392 53L281 390L195 251ZM376 37L179 235L39 148L376 37Z" />
                    </svg>
                  ) : (
                    // <React.Fragment>
                    `Enviando...`
                  )
                ) : (
                  /* <svg viewBox="0 0 430 429" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M414 1L8.99997 134C-1.00003 137 -2.00003 149 6.99997 155L172 257L275 423C280 431 293 429 296 420L429 15C432 6 423 -2 414 1ZM195 251L392 53L281 390L195 251ZM376 37L179 235L39 148L376 37Z"/>
                                                    </svg> */
                  // </React.Fragment>
                  `Sucesso! Você será avisado quando voltar.`
                )}
              </button>
            </div>
          </form>
          <ul className="principal__content__flags">
            {Sku.sellers[0].commertialOffer.Price.toFixed(2) > window.valorFrete.Frete && (
              <li className="flag set--freeshipping">Frete Grátis</li>
            )}
            {Object.entries(
              Object.entries(Product.clusterHighlights).length === 0 &&
                Product.clusterHighlights.constructor === Object
                ? {}
                : Product.clusterHighlights
            ).map((flag, i) => (
              <li className={`flag set--${flag[1].replace('ç', 'c')}`} key={i}>
                {flag[1]}
              </li>
            ))}
            {Object.entries(
              Object.entries(Product.productClusters).length === 0 &&
                Product.productClusters.constructor === Object
                ? {}
                : Product.productClusters
            ).map((flag, i) =>
              flag[0] == 820 ? (
                <li className={`flag set--${flag[1].replace('ç', 'c')}`} key={i}>
                  Vegano
                </li>
              ) : (
                ''
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="principal__content">
          {/* <p className="principal__content__reference">Cód.: {Product.productReference}</p> */}
          <span className="principal__content__price">
            {Sku.sellers[0].commertialOffer.ListPrice != Sku.sellers[0].commertialOffer.Price && (
              <del className="principal__content__price__before">
                R$
                {Sku.sellers[0].commertialOffer.ListPrice.toFixed(2)
                  .toString()
                  .replace('.', ',')}
              </del>
            )}
            <p className="principal__content__price__actual">
              R$
              {Sku.sellers[0].commertialOffer.Price.toFixed(2)
                .toString()
                .replace('.', ',')}
              {discount != 0 && (
                <span className="set--discount">
                  {Math.round((discount * 100) / Sku.sellers[0].commertialOffer.ListPrice)}%
                </span>
              )}
            </p>
            <small className="principal__content__price__installments">
              até{' '}
              {Math.max.apply(
                Math,
                Sku.sellers[0].commertialOffer.Installments.map(function(o) {
                  return o.NumberOfInstallments;
                })
              ) +
                'x de R$' +
                Math.min
                  .apply(
                    Math,
                    Sku.sellers[0].commertialOffer.Installments.map(function(o) {
                      return o.Value;
                    })
                  )
                  .toFixed(2)
                  .toString()
                  .replace('.', ',')}{' '}
              sem juros
            </small>
          </span>
          {Reviews != null && (
            <a
              href="#reviewsContainer"
              onClick={() => handleReviews()}
              className="principal__content__reviews"
            >
              {Reviews.Rating}/5 ({Reviews.TotalRatings} avaliações)
            </a>
          )}

          <button
            className={`principal__content__addToCart status--${addStatus} gtm-buy-button`}
            onClick={e => Add(e.currentTarget)}
            ref={BtnAddToCart}
            disabled={addStatus}
          >
            {addStatus != 'added'
              ? !addStatus
                ? 'Adicionar à Sacola'
                : 'Adicionando...'
              : 'O produto foi adicionado!'}
          </button>
          {shelfLife() != null && (
            <span className="principal__content__shelfLife">
              <svg viewBox="0 0 84 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 0C18.7106 0 16 2.7106 16 6V10H6C2.71059 10 0 12.7106 0 16V76C0 79.2894 2.71059 82 6 82H78C81.2894 82 84 79.2894 84 76V16C84 12.7106 81.2894 10 78 10H68V6C68 2.7106 65.2894 0 62 0C58.7106 0 56 2.7106 56 6V10H28V6C28 2.7106 25.2894 0 22 0V0ZM22 4C23.1426 4 24 4.8574 24 6V18C24 19.1426 23.1426 20 22 20C20.8574 20 20 19.1426 20 18V6C20 4.8574 20.8574 4 22 4ZM62 4C63.1426 4 64 4.8574 64 6V18C64 19.1426 63.1426 20 62 20C60.8574 20 60 19.1426 60 18V6C60 4.8574 60.8574 4 62 4ZM6 14H16V18C16 21.2894 18.7106 24 22 24C25.2894 24 28 21.2894 28 18V14H56V18C56 21.2894 58.7106 24 62 24C65.2894 24 68 21.2894 68 18V14H78C79.1424 14 80 14.8576 80 16V28H4V16C4 14.8576 4.85763 14 6 14ZM4 32H80V76C80 77.1424 79.1424 78 78 78H6C4.85763 78 4 77.1424 4 76V32V32Z" />
              </svg>
              {shelfLife()}
            </span>
          )}
          {Sku.sellers[0].commertialOffer.AvailableQuantity < 10 && (
            <span className="principal__content__leftInStock">
              <svg viewBox="0 0 75 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M61.5187 20.8087C61.239 20.5291 60.8827 20.3387 60.4948 20.2615C60.1069 20.1844 59.7048 20.224 59.3394 20.3753C58.974 20.5267 58.6617 20.7829 58.4419 21.1118C58.2221 21.4406 58.1048 21.8272 58.1047 22.2227C58.1047 30.6427 53.9778 36.4334 50.8431 38.8943C53.5833 22.7657 48.96 4.39869 36.7379 0.326485C36.4376 0.223859 36.1169 0.195133 35.8031 0.242742C35.4892 0.290351 35.1915 0.412892 34.9351 0.599985C34.6782 0.785544 34.469 1.02942 34.3247 1.31157C34.1804 1.59372 34.1052 1.90608 34.1051 2.22299C34.1051 14.6837 26.3122 21.4805 18.0624 28.6757C11.3789 34.5057 4.46691 40.5349 2.16611 49.7379C-1.58379 64.7318 3.21101 75.9738 16.82 84.1065C17.1825 84.323 17.6042 84.4193 18.0248 84.3815C18.4453 84.3437 18.8431 84.1737 19.1611 83.896C19.4792 83.6183 19.7012 83.247 19.7953 82.8354C19.8895 82.4238 19.8509 81.9929 19.6852 81.6046C15.7302 72.3546 18.3239 57.728 30.4135 46.3376C31.1655 51.1949 33.1674 54.6476 34.9779 57.7729C36.6556 60.6655 38.1048 63.1635 38.1048 66.222C38.1047 66.4847 38.1563 66.7448 38.2567 66.9875C38.3572 67.2303 38.5045 67.4508 38.6902 67.6366C38.876 67.8223 39.0965 67.9696 39.3393 68.0701C39.582 68.1705 39.8421 68.2221 40.1048 68.222C44.2024 68.222 47.966 65.0775 51.5909 61.5463C55.3077 69.6185 54.3272 78.6363 48.8547 83.794C48.8039 83.8312 48.4797 84.0772 48.4308 84.1183C48.1222 84.3852 47.9026 84.7401 47.8014 85.1354C47.7002 85.5307 47.7224 85.9475 47.8649 86.3299C48.0073 86.7122 48.2633 87.0419 48.5985 87.2746C48.9336 87.5073 49.332 87.632 49.74 87.6319C49.8765 87.6318 50.0126 87.618 50.1463 87.5909C61.0113 85.3331 69.6401 76.8059 73.2338 64.7787C77.81 49.4586 73.3213 32.6112 61.5187 20.8087ZM69.4014 63.6342C66.9679 71.7786 61.9719 78.089 55.5208 81.46C59.0108 74.5011 58.5344 65.1848 53.8274 57.2064C53.6724 56.9435 53.4593 56.7195 53.2044 56.5516C52.9495 56.3837 52.6596 56.2763 52.3568 56.2377C52.2732 56.2276 52.189 56.2224 52.1048 56.2221C51.5745 56.2222 51.0659 56.433 50.6908 56.808C47.7143 59.7845 44.6557 62.8431 41.9057 63.8665C41.3901 60.8565 39.9487 58.3685 38.439 55.7651C36.3082 52.0913 34.1051 48.2906 34.1051 42.2223C34.1051 41.8455 33.9988 41.4763 33.7982 41.1573C33.5976 40.8383 33.311 40.5824 32.9714 40.4191C32.6318 40.2558 32.253 40.1918 31.8786 40.2344C31.5042 40.277 31.1494 40.4244 30.8551 40.6598C16.5643 52.0913 12.4651 66.7161 14.3769 77.6085C5.71291 70.8 3.14271 62.3178 6.04501 50.7066C8.04301 42.7224 14.1874 37.3631 20.6932 31.6894C28.6188 24.7754 36.7964 17.6446 37.9624 5.28739C46.9174 10.8074 49.5834 28.0644 46.1654 41.738C46.0917 42.0328 46.0862 42.3405 46.1492 42.6378C46.2123 42.935 46.3423 43.214 46.5293 43.4535C46.7163 43.693 46.9554 43.8867 47.2286 44.02C47.5017 44.1532 47.8015 44.2224 48.1054 44.2224C52.8944 44.2224 59.9431 37.076 61.6989 26.957C65.8657 31.9848 68.7448 37.9522 70.0869 44.3428C71.4289 50.7335 71.1937 57.3549 69.4014 63.6342V63.6342Z" />
              </svg>
              Só restam {Sku.sellers[0].commertialOffer.AvailableQuantity}
            </span>
          )}
          {Sku.sellers[0].commertialOffer.Price - Sku.sellers[0].commertialOffer.ListPrice != 0 && (
            <span className="principal__content__peopleOnPage">
              <svg viewBox="0 0 100 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M49.998 4.786c20.324 0 38.212 20.653 44.049 28.167C88.21 40.47 70.321 61.12 49.998 61.12c-20.328 0-38.217-20.662-44.049-28.172 5.822-7.514 23.665-28.162 44.049-28.162zm0-4.786C22.384 0 0 32.953 0 32.953s22.384 32.952 49.998 32.952C77.616 65.905 100 32.953 100 32.953S77.616 0 49.998 0z"
                  fill="#000"
                />
                <path d="M49.998 52.036c-10.524 0-19.085-8.562-19.085-19.083 0-10.521 8.561-19.083 19.085-19.083 10.524 0 19.085 8.562 19.085 19.083 0 10.521-8.562 19.083-19.085 19.083zm0-33.38c-7.883 0-14.3 6.414-14.3 14.297 0 7.883 6.417 14.298 14.3 14.298 7.888 0 14.3-6.414 14.3-14.298s-6.412-14.297-14.3-14.297z" />
              </svg>
              {onPage} pessoas estão vendo esse produto agora.
            </span>
          )}
          <ul className="principal__content__flags">
            {Sku.sellers[0].commertialOffer.Price.toFixed(2) > window.valorFrete.Frete && (
              <li className="flag set--freeshipping">Frete Grátis</li>
            )}
            {Object.entries(
              Object.entries(Product.clusterHighlights).length === 0 &&
                Product.clusterHighlights.constructor === Object
                ? {}
                : Product.clusterHighlights
            ).map((flag, i) => (
              <li className={`flag set--${flag[1].replace('ç', 'c')}`} key={i}>
                {flag[1]}
              </li>
            ))}
            {Object.entries(
              Object.entries(Product.productClusters).length === 0 &&
                Product.productClusters.constructor === Object
                ? {}
                : Product.productClusters
            ).map((flag, i) =>
              flag[0] == 820 ? (
                <li className={`flag set--${flag[1].replace('ç', 'c')}`} key={i}>
                  Vegano
                </li>
              ) : (
                ''
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
