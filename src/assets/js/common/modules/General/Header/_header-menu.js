import CacheSelector from '../cache-selector';


const Methods = {
    init() {
        Methods.openCloseMenu();
        Methods.closeMenu();
        // Methods.observeScroll();
    },
    openCloseMenu() {
        CacheSelector.header.menuHamContainer.addEventListener('click', (el) => {
            if (el.target == CacheSelector.header.menuHamContainer || el.target == CacheSelector.header.menuHamText) {
                CacheSelector.header.menuHam.classList.toggle('is--active');
                CacheSelector.header.menuList.classList.toggle('js--menu-close');
                el.target.classList.add('is--active');
            } else {
                el.preventDefault
            }
        })
    },
    closeMenu() {
        CacheSelector.header.menuClose.addEventListener('click', () => {
            CacheSelector.header.menuHam.classList.toggle('is--active');
            CacheSelector.header.menuList.classList.toggle('js--menu-close');
        })
    },
    observeScroll() {
        window.addEventListener('scroll', (e) => {
            const body = document.querySelector('body');
            e.oldScroll > e.scrollY ? body.classList.remove('scrollDown') : body.classList.add('scrollDown');
            e.oldScroll = e.scrollY;
            console.log(this.scrollY);

        })
    }
}

export default {
    init: Methods.init
}
