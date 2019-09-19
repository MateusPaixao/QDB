// import Region from "./Regional/PriceContainer.jsx";
import Header from "./Header/_header-index";
import Minicart from './Minicart/_minicart-index';
import PriceContainer from "./Regional/PriceContainer.jsx";

const Methods = {
    init(){
        Header.init();
        Minicart.init();
        // PriceContainer.init();
    },
}

export default {
    init: Methods.init
}