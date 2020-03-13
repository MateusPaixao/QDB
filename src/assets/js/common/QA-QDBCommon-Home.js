import Home from "./modules/Home"
import '../../scss/common/QDBCommon-home.scss'

const Methods = {
    init() {
        Methods.buildHome();
    },
    buildHome: () => {
        Home.init();
    }
}
// document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
// })
