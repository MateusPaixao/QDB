import CacheSelector from '../cache-selector';

const Methods = {
    init(){
        Methods.appendSugestoes();
    },
    appendSugestoes() {
        CacheSelector.header.formBusca.append(CacheSelector.neemu.acContainer);
        console.log('foi')
    }
}

export default {
    init: Methods.init
}