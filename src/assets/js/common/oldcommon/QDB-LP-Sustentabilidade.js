import '../../scss/common/QDB-LP-Sustentabilidade.scss'
import Vitrine from "./modules/LP/Sustentabilidade"

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
