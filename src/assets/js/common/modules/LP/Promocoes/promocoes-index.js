import Promocoes from './Vitrine/_promocoes'
import TopChaordic from './Chaordic/topProducts'
import Search from '../../Search/search-index'

const Methods = {
    init(){
        Search.init();
        Promocoes.init();
        TopChaordic.init();
    }
}

export default {
    init: Methods.init
}