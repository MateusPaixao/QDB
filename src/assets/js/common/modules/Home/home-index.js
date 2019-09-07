import HomeContadorProduto from './__home__product-counter';
import BuildBanners from './Components/Hero/BannerContainer.jsx';
import BuildInfoBar from './Components/InfoBar/infoBar.jsx';
import BuildPaineis from './Components/Paineis/PaineisContainer.jsx'

const Methods = {
    init() {
        BuildBanners.init();
        BuildInfoBar.init();
        BuildPaineis.init();
        HomeContadorProduto.init();
    }
}

export default {
    init: Methods.init
}