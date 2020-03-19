import React from 'react';

import { CheckSVG } from '../SVGs';
const Container = ({ Stores }) => {
  React.useEffect(() => { }, []);

  return (
    // console.log(Stores)
    Stores.map(store => (
      <div className="store__container">
        <div className="store__address">
          <p className="store__name"> {store.storeName} </p>
          <p className="store__street">
            {' '}
            {store.street} , {store.number} - {store.complement}
          </p>
          <a className="store__map" target="_blank" href={store.linkMaps}>
            Ver no Google Maps
          </a>
        </div>

        <div className="store__address">
          <p className="store__zipcode"> {store.zipcode} </p>
          <p className="store__city-state">
            {' '}
            <p className="store__city"> {store.city} </p> -{' '}
            <p className="store__state">{store.state}</p>{' '}
          </p>
          <p className="store__phone"> {store.phone} </p>
        </div>

        {store.make && (
          <div className="store__address">
            <p className="store__hasMake">
              {' '}
              {/* <CheckSVG />  */}
              <b className="store__percent">%</b> Cupom da loja: <b className="store__coupon"> {store.coupon} </b>
            </p>
            {/* <a className="store__agendar" href="/servicos">
              Agendar make
            </a> */}
          </div>
        )}
      </div>
    ))
  );
};

export default Container;
