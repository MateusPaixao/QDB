import CacheSelector from '../cache-selector';


const Methods = {
    init() {
        Methods.openCloseMenu();
        Methods.openCloseList();
    },
    openCloseMenu() {
        CacheSelector.header.menuHamContainer.addEventListener('click', (el) => {
            if(el.target == CacheSelector.header.menuHamContainer || el.target == CacheSelector.header.menuHamText){
                CacheSelector.header.menuHam.classList.toggle('is--active');
                CacheSelector.header.menuList.classList.toggle('js--menu-close');
                el.target.classList.add('is--active');
            }
            else{
                el.preventDefault
            }
        })
    },
    openCloseList() {
        CacheSelector.header.menuItem.addEventListener('click', (el) => {
            el.target.classList.toggle('is--active');
            CacheSelector.header.menuItem.classList.remove('is--active');
        })
    }
}

export default {
    init: Methods.init
}
