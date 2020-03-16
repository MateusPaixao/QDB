import React from 'react';
import Vitrine from '../../../../../General/Vitrine';

const orderFilter = ({ handleOrder, showSmartResearch, handleSmartResearch }) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [optionSelected, setOptionSelected] = React.useState('');
  const [order, setOrderFilter] = React.useState('OrderByTopSaleDESC');
  const [orderValue, setOrderValue] = React.useState('');

  const orderProducts = () => {
    const Content = document.querySelector('.contentProducts');

    console.log('ue');
    let idCollection = Math.floor(Math.random() * 5000);
    let Collection = document.createElement('div');
    Collection.classList.add('contentProducts__render-collection', 'render-collection', 'shell');
    Collection.setAttribute('id', 'collection' + idCollection);
    Content.appendChild(Collection);

    Vitrine.build(idCollection, undefined, false, false, `?fq=H:788&O=${order}&_from=0&_to=23`);

    // !showSmartResearch && handleSmartResearch();
  };

  const toggleOptions = () => {
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

  const closeModal = () => {
    setShowOptions(false);
  };

  React.useEffect(() => {
    orderProducts();
    handleOrder(order);
    // document.body.addEventListener('click', closeModal);
  }, [order]);

  return (
    <React.Fragment>
      <div className={`principal__allColorsContainer setOpen-${showOptions}`}>
        <div className="orderContainer">
          <p className="orderoption__name">Ordernar</p>

          <div className="orderContainer__button">
            <button className="activeOrder" onClick={() => toggleOptions()}>
              {!orderValue ? 'Mais vendidos' : orderValue}
              <i class="arrow down"></i>
            </button>
          </div>

          {showOptions == true && (
            <form className="orderContainer__options" onChange={setOrder}>
              <div className="containerInput" onClick={handleInput}>
                <p className="orderoption__name">Mais vendidos</p>
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
                <p className="orderoption__name">Menor preço</p>
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
                <p className="orderoption__name">Maior preço</p>
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
                <p className="orderoption__name">Maiores descontos</p>
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

              <div className="containerInput" onClick={handleInput}>
                <p className="orderoption__name">Maiores Avaliações</p>
                <input
                  type="radio"
                  id="OrderByRatingDESC"
                  value="Maiores Avaliações"
                  name="orderInput"
                  checked={optionSelected === 'OrderByRatingDESC'}
                />
                <label htmlFor="OrderByRatingDESC">
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
