import BuildCounter from './Components/CounterProduct/CounterProductContainer';
import BuildBanners from './Components/Hero/BannerContainer.jsx';
import BuildInfoBar from './Components/InfoBar/infoBar.jsx';
import BuildPaineis from './Components/Paineis/PaineisContainer.jsx'
import BuildBannerCollection from './Components/BannerCollection/BannerContainer'
import BuildTopProducts from './Components/TopProducts/TopContainer'
import BuildModal_infoBar from './Components/InfoBar/modal_infoBar'
import {getBannerRetorna} from './Components/BannerRetorna/BannerContainer'
import {isInViewport} from '../../global/global-index'

const Methods = {
    init() {
        BuildBanners.init();
        BuildInfoBar.init();
        BuildPaineis.init();
        BuildTopProducts.init();
        BuildBannerCollection.init();
        
        isInViewport(); 
        BuildCounter.init(); // BUG NO I.E e IOS quebrando thread, manter em ultimo
        window.innerWidth < 768 ? BuildModal_infoBar.init() : "";
        window.innerWidth > 768 ? getBannerRetorna() : "";
    }
}

export default {
    init: Methods.init
}