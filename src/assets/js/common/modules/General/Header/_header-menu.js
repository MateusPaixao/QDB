import CacheSelector from '../cache-selector';


const Methods = {
    init() {
        Methods.openCloseMenu();
        Methods.closeMenu();
        Methods.observeScroll();
        Methods.setActiveAccordion();
        Methods.updateNumberMinicart();
    },
    openCloseMenu() {
        CacheSelector.header.menuHamContainer.addEventListener('click', (el) => {
            if (el.target == CacheSelector.header.menuHamContainer || el.target == CacheSelector.header.menuHamText) {
                CacheSelector.header.menuHam.classList.toggle('is--active');
                CacheSelector.header.menuList.classList.toggle('js--menu-close');
                CacheSelector.$globals.body.classList.toggle('menu--open');
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
        window.addEventListener('scroll', function (ev) {
            const body = document.querySelector('body');

            this.oldScroll > this.scrollY ? body.classList.remove('scrollDown') : body.classList.add('scrollDown');
            this.oldScroll = this.scrollY;

            return this.scrollY
        })
    },
    setActiveAccordion() {
        const checkbox = document.querySelectorAll('.accordion-checkbox');
        checkbox.forEach((checkbox) => {
            checkbox.addEventListener('click', () => {
                checkbox.checked ? checkbox.parentElement.classList.add('is--open') : checkbox.parentElement.classList.remove('is--open')
            })
        })
    },
    updateNumberMinicart() {
        $(window).on('orderFormUpdated.vtex', function() {
            let itensInCart = document.querySelector('.minicart--itens');
            itensInCart.textContent = vtexjs.checkout.orderForm.items.length;
         });
    }
}

export default {
    init: Methods.init
}
