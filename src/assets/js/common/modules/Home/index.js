// import React from 'react';

import BuildCounter from './Components/CounterProduct';
import { BuildBanners } from './Components/Hero';
import BuildInfoBar from './Components/InfoBar';
import { BuildPaineisBeleza } from './Components/Paineis';
import BuildBannerCollection from './Components/BannerCollection';
import BuildTopProducts from './Components/TopProducts';
// FOI ADIADA A SUBIDA DO MODAL NA INFOBAR
// import BuildModal_infoBar from './Components/InfoBar/modal_infoBar'
import { getBannerRetorna } from './Components/BannerRetorna';
import { isInViewport } from '../../global/global-index';

const Methods = {
  init() {
    BuildBanners();
    BuildInfoBar.init();
    BuildPaineisBeleza();
    BuildTopProducts.init();
    BuildBannerCollection.init();

    isInViewport();
    BuildCounter.init(); // BUG NO I.E e IOS quebrando thread, manter em ultimo
    // window.innerWidth < 768 ? BuildModal_infoBar.init() : "";
    window.innerWidth > 768 ? getBannerRetorna() : '';
  }
};

export default {
  init: Methods.init
};
