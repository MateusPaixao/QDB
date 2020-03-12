import Banners from './Banners';
import Promocoes from './Vitrine';
import TopChaordic from './Chaordic';

const Methods = {
  init() {
    Banners.init();
    Promocoes.init();
    TopChaordic.init();
  }
};

export default {
  init: Methods.init
};
// Fix
