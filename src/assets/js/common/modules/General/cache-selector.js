/*  Cacheamento de elementos para o DOM nao ser percorrido toda vez que precisar dar um querySelector,
 Ganha pontos no google e melhora performance :D */

export default {
    header: {
        header: document.querySelector('.header'),
        menuHam: document.querySelector('.header__menu-hamburguer'),
        menuHamContainer: document.querySelector('.header__menu-hamburguer-container'),
        menuList: document.querySelector('.header__menu-container'),
        menuHamText: document.querySelector('.header__menu-hamburguer--text'),
        menuAccordion: document.querySelectorAll('[data-accordion]'),
        menuClose: document.querySelector('.js--close-menu'),
        formBusca: document.querySelector('.header__search'),
    },
    neemu: {
        acContainer: document.querySelector('.ac-container'),
    }
}
