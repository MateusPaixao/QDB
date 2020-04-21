import React from 'react';
import ReactDOM from 'react-dom';

import Breadcrumbs from '../../General/Breadcrumbs';
import Hero from './Components/Hero';
import Product from './Components/Product';
import Banner from './Components/Banner';
import About from './Components/About';
import Shipping from './Components/Shipping';
import Return from './Components/Return';

// import Banner from '../../Components/BannerText';
// import Filter from '../../Components/Filter';
// import SmartResearch from '../../Components/Filter/smartResearch';

const FridaKahlo = () => {
  return (
    <>
      <Breadcrumbs />
      <Banner />
      <Product ProductID="1626" Colecao={true} />
      <Hero />
      <Product ProductID="1622" Colecao={false} />
      <span className="bar shell"></span>
      <Product ProductID="1621" Colecao={false} />
      <About />
      <div className="more__info">
        <Shipping />
        <Return />
      </div>
    </>
  );
};

const BuildPage = () => {
  ReactDOM.render(<FridaKahlo />, document.getElementById('render--frida'));
};

export default BuildPage;
