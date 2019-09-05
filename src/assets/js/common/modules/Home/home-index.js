import HomeContadorProduto from './__home__product-counter';
import BuildBanners from './Components/Hero/BannerContainer.jsx';

const Methods = {
    init() {
        BuildBanners.init();
        HomeContadorProduto.init();
    }
}

export default {
    init: Methods.init
}