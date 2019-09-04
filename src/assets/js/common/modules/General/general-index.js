import Region from "./Regional/PriceContainer.jsx";
import Header from "./Header/_header-index";
// import { Builder } from "node-vibrant";

const Methods = {
    init(){
        // Vitrine.init
        Header.init();
        Region.init();
    },
}

export default {
    init: Methods.init
}