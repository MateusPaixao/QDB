import CacheSelector from '../cache-selector';

const Methods = {
    init() {
        Methods.activeAcContainer();
    },
    activeAcContainer() {
        
        let acContainer = document.querySelector('.ac-container');

        console.log(acContainer);
    },
}

export default {
    init: Methods.init
}
