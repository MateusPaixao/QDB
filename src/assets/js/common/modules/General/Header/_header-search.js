import CacheSelector from '../cache-selector';

const Methods = {
    init() {
        Methods.activeAcContainer();
    },
    activeAcContainer() {
        window.onload = function(){
            const acContainer = document.querySelector('.ac-container');
            const input = CacheSelector.header.formBuscaInput;
            Methods.addCloseButton();
            window.addEventListener('click', function(){
                input === document.activeElement ? acContainer.classList.add('is--active') : acContainer.classList.remove('is--active')
            })
        }
    },
    addCloseButton() {
        console.log('HEHEHEH')
        const acContainer = document.querySelector('.ac-container');
        const btnClose = document.createElement('span');
            btnClose.classList.add('close--container');

            acContainer.appendChild(btnClose);
            console.log(btnClose.parentElement);
    }
}

export default {
    init: Methods.init
}
