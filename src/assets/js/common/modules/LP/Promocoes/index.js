import Banners from './Banners';
import TopChaordic from './Chaordic/topProducts';
import Filter from './Components';

const Methods = {
  init() {
    Banners.init();
    // Promocoes.init();
    TopChaordic.init();
    Filter.init();
  }
};

export default {
  init: Methods.init
};
