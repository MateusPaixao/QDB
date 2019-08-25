import Hero from "./components/hero-banner.jsx"
import HomeContadorProduto from './__home__product-counter';
import HomeBannerPrincipal from './__home__banner-principal';

const Methods = {
    init() {
        HomeContadorProduto.init();
        HomeBannerPrincipal.init();
    }
}

export default {
    init: Methods.init
}