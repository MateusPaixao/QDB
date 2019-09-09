import Menu from './_header-menu';
import Busca from './_header-search';

const Methods = {
    init(){
        Menu.init();   
        Busca.init();
    }
}

export default {
    init: Methods.init
}