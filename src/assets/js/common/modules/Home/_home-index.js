<<<<<<< HEAD:src/assets/js/common/modules/Home/_home-index.js
import HomeContadorProduto from './_home__product-counter';
import HomeBannerPrincipal from './_home__banner-principal';
=======
import BuildCounter from './Components/CounterProduct/CounterProductContainer';
import BuildBanners from './Components/Hero/BannerContainer.jsx';
import BuildInfoBar from './Components/InfoBar/infoBar.jsx';
import BuildPaineis from './Components/Paineis/PaineisContainer.jsx'
import BuildBannerCollection from './Components/BannerCollection/BannerContainer'
import BuildTopProducts from './Components/TopProducts/TopContainer'
>>>>>>> feature/melhorias_home:src/assets/js/common/modules/Home/home-index.js

const Methods = {
    init() {
        BuildBanners.init();
        BuildInfoBar.init();
        BuildPaineis.init();
        BuildCounter.init();
        BuildTopProducts.init();
        BuildBannerCollection.init();
    }
}

export default {
    init: Methods.init
}