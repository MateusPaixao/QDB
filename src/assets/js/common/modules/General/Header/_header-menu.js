import CacheSelector from '../cache-selector';
import {getiPhoneModel} from '../../../global/global-index'


const Methods = {
    init() {
        Methods.openCloseMenu();
        Methods.closeMenu();
        Methods.observeScroll();
        Methods.setActiveAccordion();
        Methods.updateNumberMinicart();
        Methods.isLogged();
        Methods.marginTopMenuHeight();
        getiPhoneModel();
    },

    marginTopMenuHeight() {
        const header = CacheSelector.header.header;
        const elementToMargin = CacheSelector.$globals.body;
        let headerHeight = header.offsetHeight;
        elementToMargin.style.marginTop = `${headerHeight}px`;
        window.addEventListener('scroll', function() {
            headerHeight = header.offsetHeight;
            elementToMargin.style.marginTop = `${headerHeight}px`;
        })
    },
    openCloseMenu() {
        CacheSelector.header.menuHamContainer.addEventListener('click', (el) => {
            if (el.target == CacheSelector.header.menuHamContainer || el.target == CacheSelector.header.menuHamText) {
                el.stopPropagation;
                el.preventDefault;
                CacheSelector.header.menuHam.classList.toggle('is--active');
                CacheSelector.header.menuList.classList.toggle('js--menu-close');
                CacheSelector.$globals.body.classList.toggle('menu--open');
                el.target.classList.add('is--active');
            }
        })
    },

    closeMenu() {
        CacheSelector.header.menuClose.addEventListener('click', () => {
            CacheSelector.header.menuHam.classList.toggle('is--active');
            CacheSelector.header.menuList.classList.toggle('js--menu-close');
            CacheSelector.$globals.body.classList.toggle('menu--open');
        })
        CacheSelector.header.overlay.addEventListener('click', () => {
            CacheSelector.header.menuHam.classList.toggle('is--active');
            CacheSelector.header.menuList.classList.toggle('js--menu-close');
            CacheSelector.$globals.body.classList.toggle('menu--open');
        });
    },

    observeScroll() {
        window.addEventListener('scroll', function (ev) {
            const body = CacheSelector.$globals.body;

            this.oldScroll > this.scrollY ? body.classList.remove('scrollDown') : body.classList.add('scrollDown');
            this.oldScroll < 0 && body.classList.contains('scrollDown') ? body.classList.remove('scrollDown') : null; 
            
            this.oldScroll = this.scrollY;

            return this.scrollY
        })
    },

    setActiveAccordion() {
        const checkbox = document.querySelectorAll('.accordion-checkbox');
        for(let i = 0; i < checkbox.length; i++){
            checkbox[i].addEventListener('click', () => {
                checkbox[i].checked ? checkbox[i].parentElement.classList.add('is--open') : checkbox[i].parentElement.classList.remove('is--open');
            })
        }
    },
    
    updateNumberMinicart() {
        $(window).on('orderFormUpdated.vtex', function () {
            let itensInCart = document.querySelector('.minicart--itens');
            if(vtexjs.checkout.orderForm.items.length > 1){
                document.querySelector(".__maskBag #wave").style.transform = `translate(-50px, -${635 + vtexjs.checkout.orderForm.items.length}px)`;
            }
            itensInCart.textContent = vtexjs.checkout.orderForm.items.length;
        });
    },

    isLogged() {
        const url = "/no-cache/profileSystem/getProfile";
        const userInfos = document.querySelector('.header__clube--text');
        fetch(url)
            .then(res => res.json())
            .then((log) => {
                if(log.IsUserDefined){
                    userInfos.innerHTML = `
                        <p class="header__clube--name">
                            Olá, ${log.FirstName}
                        </p>` 
                }
                else{
                    userInfos.innerHTML =
                    `<a class="header__clube--account" href="/account"> 
                        Entre ou cadastre-se
                    </a>`
                } 
            })
    },
}

export default {
    init: Methods.init
}
