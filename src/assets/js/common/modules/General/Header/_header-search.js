import CacheSelector from '../cache-selector';

const Methods = {
    init(){
        Methods.appendSugestoes();
    },
    appendSugestoes() {
        CacheSelector.header.formBuscaInput.on('focus', () => {
            CacheSelector.neemu.acContainer.parents(CacheSelector.header.formBuscaInput)?console.log('heheh'):CacheSelector.header.formBusca.append(CacheSelector.neemu.acContainer)
            
        })
    }
}

export default {
    init: Methods.init
}