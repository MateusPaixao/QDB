import CacheSelector from '../cache-selector';

const Methods = {
    init() {
        Methods.activeAcContainer();
    },
    activeAcContainer() {
        CacheSelector.header.formBuscaInput.addEventListener('focus', function () {
            if (document.activeElement == CacheSelector.header.formBuscaInput) {
                CacheSelector.neemu.acContainer.classList.add('is--active')
            } else {
                CacheSelector.neemu.acContainer.classList.remove('is--active');
            }
        })
    }
}

export default {
    init: Methods.init
}
