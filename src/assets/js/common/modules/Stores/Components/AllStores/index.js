import React from 'react';

import { BrazilSVG } from '../SVGs';

const AllStores = () => {
  //   const storeQuantity = document.querySelectorAll('.store__container').length;
  return (
    <div className="all-stores">
      <BrazilSVG />
      <p className="all-stores__text">Já somos 239 lojas no Brasil</p>
    </div>
  );
};

export default AllStores;
