// import CheckoutFull from './_minicart-main';
import { bag } from './bag/_bagMain';
import BarraDeFrete from './components/bagBarraFrete';

const Methods = {
  init() {
    // CheckoutFull.init();
    bag.init();
    BarraDeFrete.init();
  }
};

export default {
  init: Methods.init
};
