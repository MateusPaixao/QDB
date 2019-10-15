import BuildCounter from './Components/CounterProduct/CounterProductContainer';
import BuildBanners from './Components/Hero/BannerContainer.jsx';
import BuildInfoBar from './Components/InfoBar/infoBar.jsx';
import BuildPaineis from './Components/Paineis/PaineisContainer.jsx'
import BuildBannerCollection from './Components/BannerCollection/BannerContainer'
import BuildTopProducts from './Components/TopProducts/TopContainer'
import {isInViewport} from '../../global/global-index'

const Methods = {
    init() {
        isInViewport();
        BuildBanners.init();
        BuildInfoBar.init();
        BuildPaineis.init();
        BuildTopProducts.init();
        BuildBannerCollection.init();
        BuildCounter.init(); // BUG NO I.E e IOS quebrando thread, manter em ultimo
    }
}

export default {
    init: Methods.init
}