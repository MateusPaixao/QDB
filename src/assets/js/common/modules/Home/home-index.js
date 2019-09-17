import BuildCounter from './Components/CounterProduct/CounterProductContainer';
import BuildBanners from './Components/Hero/BannerContainer.jsx';
import BuildInfoBar from './Components/InfoBar/infoBar.jsx';
import BuildPaineis from './Components/Paineis/PaineisContainer.jsx'
import BuildBannerCollection from './Components/BannerCollection/BannerContainer'
import BuildTopProducts from './Components/TopProducts/TopContainer'

const Methods = {
    init() {
        // BuildBanners.init();
        BuildInfoBar.init();
        BuildPaineis.init();
        // BuildCounter.init();
        BuildTopProducts.init();
        // BuildBannerCollection.init();
    }
}

export default {
    init: Methods.init
}