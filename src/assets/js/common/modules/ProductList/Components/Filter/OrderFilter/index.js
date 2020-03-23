import React from 'react';
import Vitrine from '../../../../General/Vitrine';

const orderFilter = ({ handleOrder, showSmartResearch, handleSmartResearch }) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [optionSelected, setOptionSelected] = React.useState('');
  const [order, setOrderFilter] = React.useState('OrderByTopSaleDESC');
  const [orderValue, setOrderValue] = React.useState('');

  const orderProducts = () => {
    const Content = document.querySelector('.contentProducts');

    let idCollection = Math.floor(Math.random() * 5000);
    let Collection = document.createElement('div');
    Collection.classList.add(
      'contentProducts__render-collection',
      'render-collection',
      'contentProducts__desktop'
    );
    Content.classList.add('shell');
    Collection.setAttribute('id', 'collection' + idCollection);
    Content.appendChild(Collection);

    let refreshButton = setInterval(() => {
      if (
        document.querySelectorAll('.cardProductContainer')[
          document.querySelectorAll('.cardProductContainer').length - 1
        ].childElementCount > 0 &&
        document.querySelectorAll('.cardProductContainer')[
          document.querySelectorAll('.cardProductContainer').length - 1
        ].childElementCount < 23
      ) {
        clearInterval(refreshButton);
        handleSmartResearch();
      } else {
        // Quando menor que 23, eu posso sumir com o botão
      }
    }, 500);

    Vitrine.build(
      idCollection,
      undefined,
      false,
      false,
      `${window.location.pathname}?O=${order}&_from=0&_to=23`
    );

    !showSmartResearch && handleSmartResearch();
  };

  const toggleOptions = () => {
    let open = document.querySelector('.setOpen-true')
    console.log(open)
    setShowOptions(!showOptions);
  };

  const setOrder = event => {
    document.querySelector('.contentProducts').innerHTML = '';
    setShowOptions(!showOptions);

    if (order == event.target.id) {
      orderProducts();
    } else {
      setOrderFilter(event.target.id);
    }
    setOrderValue(event.target.value);
    setOptionSelected(event.target.id);
  };

  const handleInput = event => {
    document.querySelector('.contentProducts').innerHTML = '';
    setShowOptions(!showOptions);
    if (order == event.currentTarget.childNodes[1].id) {
      orderProducts();
    } else {
      setOrderFilter(event.currentTarget.childNodes[1].id);
    }
    setOrderValue(event.currentTarget.childNodes[1].value);
    setOptionSelected(event.currentTarget.childNodes[1].id);
  };


  React.useEffect(() => {
    orderProducts();
    handleOrder(order);
  }, [order]);

  return (
    <React.Fragment>
      <div className={`orderFilterContainer setOpen-${showOptions}`}>
        <div className="filterContainer__fastFilter__button">
          <p>Ordernar</p>

          <div className="filterContainer__button">
            <button className="activeOrder" onClick={() => toggleOptions()}>
              {!orderValue ? 'Mais vendidos' : orderValue}
              <i className="arrow down"></i>
            </button>
          </div>

          {showOptions == true && (
            <form className="filterContainer__options" onChange={setOrder}>
              <div className="containerInput" onClick={handleInput}>
                <label>Mais vendidos</label>
                <input
                  type="radio"
                  id="OrderByTopSaleDESC"
                  value="Mais vendidos"
                  name="orcderInput"
                  checked={optionSelected === 'OrderByTopSaleDESC'}
                />
                <label htmlFor="OrderByTopSaleDESC">
                  <span>
                    <img src="/arquivos/seta-ordenacao.png" alt="" />
                  </span>
                </label>
              </div>

              <div className="containerInput" onClick={handleInput}>
                Menor preço
                <input
                  type="radio"
                  id="OrderByPriceASC"
                  value="Menor preço"
                  name="orderInput"
                  checked={optionSelected === 'OrderByPriceASC'}
                />
                <label htmlFor="OrderByPriceASC">
                  <span>
                    <img src="/arquivos/seta-ordenacao.png" alt="" />
                  </span>
                </label>
              </div>

              <div className="containerInput" onClick={handleInput}>
                Maior preço
                <input
                  type="radio"
                  id="OrderByPriceDESC"
                  value="Maior preço"
                  name="orderInput"
                  checked={optionSelected === 'OrderByPriceDESC'}
                />
                <label htmlFor="OrderByPriceDESC">
                  <span>
                    <img src="/arquivos/seta-ordenacao.png" alt="" />
                  </span>
                </label>
              </div>

              <div className="containerInput" onClick={handleInput}>
                Maiores descontos
                <input
                  type="radio"
                  id="OrderByBestDiscountDESC"
                  value="Maiores descontos"
                  name="orderInput"
                  checked={optionSelected === 'OrderByBestDiscountDESC'}
                />
                <label htmlFor="OrderByBestDiscountDESC">
                  <span>
                    <img src="/arquivos/seta-ordenacao.png" alt="" />
                  </span>
                </label>
              </div>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default orderFilter;
