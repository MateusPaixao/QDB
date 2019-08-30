import HomeContadorProduto from './_home__product-counter';
import HomeBannerPrincipal from './_home__banner-principal';

const Methods = {
    init() {
        HomeContadorProduto.init();
        HomeBannerPrincipal.init();
    }
}

export default {
    init: Methods.init
}