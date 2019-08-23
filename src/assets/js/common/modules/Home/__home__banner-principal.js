const Methods = {
    init() {
        Methods.principalBannerSlick();
    },
    principalBannerSlick: () => {
        const options = {
            dots: true,
            arrows: false,
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 10000
        }
        const slickDesktop = $('.w-lazy-banner--desktop');
        const bannersDesktopLength = $('.w-lazy-banner--desktop .box-banner').length; 
        const slickMobile = $('.w-lazy-banner--mobile');
        const bannersmobileLength = $('.w-lazy-banner--mobile .box-banner').length; 
        if(window.innerWidth <= 600 && bannersmobileLength > 1){
            slickMobile.slick(options);
            slickMobile.addClass('is--active');
        }
        else if(window.innerWidth >= 601 && bannersDesktopLength > 1){
            slickDesktop.slick(options);
            slickDesktop.addClass('is--active');
        }
    },
}

export default {
    init: Methods.init
}