import CacheSelector from '../cache-selector';


const Methods = {
    init() {
        Methods.openCloseMenu();
        Methods.menuAccordion();
        Methods.closeMenu();
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
    menuAccordion() {
        CacheSelector.header.menuAccordion.forEach((menu) => {
            menu.addEventListener('click', (el) => {
                el.stopPropagation;
                if (el.target.getAttribute('data-accordion') == 'false') {
                    el.target.setAttribute('data-accordion', 'true');
                } else {
                    el.target.setAttribute('data-accordion', 'false');
                }
            })
        })
    },
    heroBannerMarginTop() {
        CacheSelector.home.bannerHero.style.marginTop = `${CacheSelector.header.header.offsetHeight}px`;
    }
}

export default {
    init: Methods.init
}
