import React, { useState } from 'react';

import { CheckSVG } from '../SVGs';
const Container = ({ Stores }) => {
  const [copy, setCopy] = useState('copiar');

  function copyCoupon(ev) {
    const couponCode = ev.target.previousElementSibling;
    couponCode.select();
    document.execCommand('copy');

    setCopy('copiado');

    setTimeout(() => {
      console.log(couponTarget);
      setCopy('copiar');
    }, 3000);
  }

  return (
    // console.log(Stores)
    Stores.map((store, i) => (
      <div className="store__container" key={i}>
        <div className="store__address">
          <p className="store__name"> {store.storeName} </p>
          <p className="store__street">
            {' '}
            {store.street} , {store.number} - {store.complement}
          </p>
          {/* <a className="store__map" target="_blank" href={store.linkMaps} rel="noopener noreferrer">
            Ver no Google Maps
          </a> */}
        </div>

        <div className="store__address">
          <p className="store__zipcode"> {store.zipcode} </p>
          <p className="store__city-state">
            {' '}
            <p className="store__city"> {store.city} </p> -{' '}
            <p className="store__state">{store.state}</p>{' '}
          </p>
          {/* <p className="store__phone"> {store.phone} </p> */}
        </div>

        {store.make && (
          <div className="store__address store__especial">
            <p className="store__hasMake">
              {/* <CheckSVG />  */}
              Cupom da loja: <input type="text" value={store.coupon} className="store__coupon" />
              <button className={`store__button ${copy}`} onClick={ev => copyCoupon(ev)}>
                {copy}
              </button>
            </p>
            {/* <a className= href="/servicos">
              Agendar make
            </a> */}
          </div>
        )}
      </div>
    ))
  );
};

export default Container;
