import CacheSelector from '../cache-selector';

const Methods = {
    init(){
        Methods.appendSugestoes();
    },
    appendSugestoes() {
        CacheSelector.header.formBusca.appendChild(CacheSelector.neemu.acContainer);
    }
}

export default {
    init: Methods.init
}