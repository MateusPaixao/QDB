import React from 'react';

import OrderFilter from './OrderFilter';
import FastFilter from './FastFilter';
import FastFilterMobile from './FastFilter/fastFilterMobile.js';
import Breadcrumbs from '../../../General/Breadcrumbs';
import Banner from '../Banner';

const filter = props => {
  const { departament } = props.info;

  return (
    <React.Fragment>
      <Breadcrumbs />
      <Banner />
      <div className="filterAlignContainer">
        <div className="filterContainer shell">
          <FastFilter departament={departament} />
          <FastFilterMobile departament={departament} />

          <OrderFilter
            showSmartResearch={props.showSmartResearch}
            handleSmartResearch={props.handleSmartResearch}
            handleOrder={props.handleOrder}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default filter;
