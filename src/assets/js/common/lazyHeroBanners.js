(function ($, window, document, undefined) {
    var isTouchDevice = function () {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    };
    var isMobile = function () {
        return 1025 > $(window).outerWidth(); /*&&isTouchDevice();*/
    };
    var applyBanners = function () {
        var _type = isMobile() ? 'mobile' : 'desktop';
        var _container = '._hero-' + _type;
        if ($('._hero-carousel.slick-initialized').length >= $('._hero-carousel').length) {
            return false;
        }
        var _banners = $(_container + ' noscript').text().replace(/\n/g, '');
        var _nav = $('<div class="_hero-nav"></div>');
        var opt = {
            autoplay: true,
            arrows: true,
            // prevArrow: '<div class="_prev-hero"></div>',
            // nextArrow: '<div class="_next-hero"></div>',
            appendArrows: _nav,
            dots: true
        };
        $(_container + ' ._hero-carousel').not('.slick-initialized')
            .append(_banners)
            .slick(opt);
        $(_container + ' ._hero-carousel .slick-list')
            .filter(function () {
                return $(this).find('.slick-nav').length <= 0;
            })
            .after(_nav);
        return true;
    };
    var startHero = function () {
        applyBanners();
        return true;
    };
    $(startHero);
    // setTimeout(() => {
    //     $('.slick-dots li')[0].click();
    // }, 200);
})(jQuery, window, document);