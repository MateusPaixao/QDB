import Topbanner from "./modules/General/TopBanner";
import '../../scss/common/QDB-gerador-topbanner.scss'

const Methods = {
    init() {
        Topbanner.init()
    }
}
document.addEventListener("DOMContentLoaded", Methods.init);