import Promocoes from './Vitrine/_promocoes'
import TopChaordic from './Chaordic/topProducts'

const Methods = {
    init(){
        Promocoes.init();
        TopChaordic.init();
    }
}

export default {
    init: Methods.init
}