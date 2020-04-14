import React from 'react';
import ReactDOM from 'react-dom';

import Breadcrumbs from '../../General/Breadcrumbs';
import About from './Components/About';
import Info from './Components/Info';

// import Banner from '../../Components/BannerText';
// import Filter from '../../Components/Filter';
// import SmartResearch from '../../Components/Filter/smartResearch';

const ApoieMaquiadores = () => {
  return (
    <>
      <Breadcrumbs />
      <About />
      <Info />
    </>
  );
};

const BuildPage = () => {
  ReactDOM.render(<ApoieMaquiadores />, document.getElementById('render--apoie'));
};

export default BuildPage;
