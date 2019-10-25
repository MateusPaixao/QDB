import CheckoutFull from './_minicart-main';
import {bag} from './bag/_bagMain';

const Methods = {
    init(){
        // CheckoutFull.init(); 
        bag.init();
    }
}

export default {
    init: Methods.init
}