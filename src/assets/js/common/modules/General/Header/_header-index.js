import Menu from './_header-menu';
import Busca from './_header-search';
import {getBanners} from './_header-nav';

const Methods = {
    init(){
        Menu.init();   
        Busca.init();
        window.innerWidth > 768 ? getBanners() : "";
    }
}

export default {
    init: Methods.init
}