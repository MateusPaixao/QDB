import CacheSelector from '../cache-selector';

const Methods = {
    init() {
        Methods.activeAcContainer();
    },
    activeAcContainer() {
            const acContainer = document.querySelector('.ac-container');
            const input = CacheSelector.header.formBuscaInput;
            // Methods.addCloseButton();
            // window.addEventListener('click', function () {
            //     input === document.activeElement ? acContainer.classList.add('is--active') : acContainer.classList.remove('is--active')
            // })
            document.querySelector(".header__search").addEventListener('click', function() {
                setTimeout(() => {
                    Methods.addCloseButton();
                }, 1000);
            })
    },
    addCloseButton() {
        if(!document.querySelector(".ac-container .close--container")){
            const acContainer = document.querySelector('.ac-container');
            const btnClose = document.createElement('span');
            btnClose.textContent = "X";
            btnClose.classList.add('close--container');
    
            acContainer.appendChild(btnClose);
            console.log(btnClose);
    
            btnClose.addEventListener('click', function(){
                document.querySelector(".ac-overlay").style.display = "none";
            });
        }
    }
}

export default {
    init: Methods.init
}
