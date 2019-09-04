import CacheSelector from '../cache-selector';
const selector = CacheSelector;

const Methods = {
    init(){
        Methods.openCloseMenu();
    },
    openCloseMenu(){
        selector.header.menuClosed.addEventListener('click', () => {
            selector.header.menuList.classList.toggle('is--active');
        })
    }

}