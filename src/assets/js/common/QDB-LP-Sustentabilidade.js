import Vitrine from "./modules/LP/sustentabilidade-index"

const Methods = {
    init() {
        Methods.buildVitrine();
    },
    buildVitrine: () => {
      Vitrine.init();
    }
}
// document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
// })
