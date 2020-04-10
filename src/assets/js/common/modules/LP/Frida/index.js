import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Breadcrumbs from '../../General/Breadcrumbs';
import Hero from './Components/Hero';
import Product from './Components/Product';
import Load from '../../Components/LoadingPage';
import Banner from './Components/Banner';
import About from './Components/About';

// import Banner from '../../Components/BannerText';
// import Filter from '../../Components/Filter';
// import SmartResearch from '../../Components/Filter/smartResearch';

const FridaKahlo = () => {
  const [Loaded, setLoaded] = useState(false);
  return (
    <>
      {Loaded == true ? (
        <Load />
      ) : (
        <>
          <Breadcrumbs />
          <Banner />
          <Product ProductID="1626" />
          <Hero />
          <Product ProductID="1622" />
          <Product ProductID="1621" />
          <About />
        </>
      )}
    </>
  );
};

const BuildPage = () => {
  ReactDOM.render(<FridaKahlo />, document.getElementById('render--frida'));
};

export default BuildPage;
