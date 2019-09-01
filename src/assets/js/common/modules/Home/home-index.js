import HomeContadorProduto from './__home__product-counter';
import BuildBanners from './Components/BannerPrincipal.jsx';

const Methods = {
    init() {
        BuildBanners.init();
        HomeContadorProduto.init();
    }
}

export default {
    init: Methods.init
}