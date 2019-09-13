// import Region from "./Regional/PriceContainer.jsx";
import Header from "./Header/_header-index";
import Minicart from './Minicart/_minicart-index';

const Methods = {
    init(){
        Header.init();
        Minicart.init();
    },
}

export default {
    init: Methods.init
}