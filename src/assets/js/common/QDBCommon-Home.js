import Home from "./modules/Home/home-index"

const Methods = {
    init() {
        // Methods.principalBannerSlick();
        Methods.buildHome();
    },
    buildHome: () => {
        Home.init();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
})
