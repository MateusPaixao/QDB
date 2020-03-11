/* 23-10-2018 18-15 */
import '../../scss/common/QDB-LP-Mascaras-cilios.scss'

var damnYouIE = function () {
    var ua = window.navigator.userAgent;
    var version = ua.indexOf('MSIE ') > 0 ? 10 : ua.indexOf('Trident/') > 0 ? 11 : ua.indexOf('Edge/') > 0 ? 12 : 0;
    if (version > 0)
        $('html').addClass('ie').addClass('ie' + version);
    return true;
};

var ytPlayer = {
    elems: '._video-lnk[data-video-url]',
    init: function (ndx) {
        ytPlayer.load.script(function () {
            ytPlayer.set.events(ndx);
        });
    },
    load: {
        script: function (cb) {
            if ("undefined" != typeof window.YT && "function" == typeof window.YT.Player) {
                if ("function" == typeof cb) {
                    cb();
                }
            } else {
                if ("undefined" == typeof ytPlayer.scriptCreated) {
                    var _script = document.createElement('script');
                    _script.type = 'text/javascript';
                    _script.src = 'https://www.youtube.com/iframe_api';
                    _script.className = '_ytube-script';
                    $('head')[0].appendChild(_script);
                    ytPlayer.scriptCreated = true;
                }
                if ("undefined" == typeof ytPlayer.t) {
                    ytPlayer.t = window.setTimeout(function () {
                        ytPlayer.init();
                        window.clearTimeout(ytPlayer.t);
                    }, 3000);
                }
            }
        }
    },
    set: {
        events: function (ndx_p) {
            $(ytPlayer.elems).each(function (ndx, item) {
                $(item).addClass('__ytplayer' + ndx).attr('ndx', ndx);
            });
            $(ytPlayer.elems).not('.__ytplayer').addClass('__ytplayer').on('click.YTPlayer', function () {
                var _elem = $(this);
                var ndx = 1 * _elem.attr('ndx');
                if (_elem.find('iframe').length <= 0) {
                    ytPlayer.set.player(_elem, ndx);
                } else {
                    // $('.__ytplayer'+ndx).find('iframe').attr('width',_elem.width()).attr('height',_elem.height());
                    ytPlayer.videos[ndx].playVideo();
                }
            });
            if ("undefined" != typeof ndx_p) {
                $('.__ytplayer' + ndx_p).click();
            }
        },
        player: function (elem, ndx_) {
            var ndx = ndx_ || 0;
            var _playerElem;
            _playerElem = $(elem);
            if (_playerElem.length <= 0) return false;
            if (_playerElem.find('iframe').length > 0) return false;

            var videoid = (_playerElem.attr('data-video-url') || "").replace(/(http[s]?:\/\/|www\.|youtube\.com\/|.*youtu\.be\/|embed\/|watch\?v=|\?.*|&.*)/g, "");
            if (videoid.length <= 0) return false;

            var width = _playerElem.width();
            var height = _playerElem.find('img:first').height();
            var height_min = width * 0.588;
            height = height_min > height ? height_min : height;

            width = "80%";
            height = "600";

            var _elem = $('<div/>');
            _elem.addClass('_video-iframe');
            _playerElem.addClass('__playing').append(_elem);
            var playerOpts = {
                videoId: videoid,
                height: height,
                width: width,
                playerVars: {
                    'autoplay': 1,
                    'controls': 0,
                    'rel': 0,
                    'disablekb': 0,
                    'modestbranding': 1,
                    'showinfo': 0,
                    'html5': 1
                },
                events: {
                    'onReady': function (event) { ytPlayer.onPlayerReady(event, _playerElem, ndx); },
                    'onStateChange': function (event) { ytPlayer.onPlayerStateChange(event, _playerElem); }
                }
            };
            if ("undefined" == typeof ytPlayer.videos) { ytPlayer.videos = []; }
            ytPlayer.videos[ndx] = new window.YT.Player(_elem[0], playerOpts);

            return true;
        }
    },
    onPlayerReady: function (event, elem, ndx_) {
        // video is ready to play
        var ndx = ndx_ || 0;
        ytPlayer.videos[ndx].playVideo();
        return true;
    },
    onPlayerStateChange: function (event, elem) {
        var _playerElem = $(elem);
        if (1 === event.data || 3 === event.data) {
            // pause
            _playerElem
                .addClass('__playing');
            $(".heading-one").addClass('__slideDownTextBox');
        } else {
            /*2 === event.data = paused video*/
            // _playerElem
            $('.__playing')
                .removeClass('__playing');
            $(".heading-one").removeClass('__slideDownTextBox');
            $('html').removeClass('__show-lightbox');
        }
        return true;
    }
};

/*set up hero banner carousel*/
var setVideos = function () {
    var video_url = ($('.special-page-data .video-url').text() || "").trim();
    $('.video-box ._video').addClass('_video-lnk').attr('data-video-url', video_url);
    return true;
}

var setOverlay = function () {
    var overlay = '<div class="__overlay"></div>';
    $('body')
        .filter(function () { return $('.mylightbox').length <= 0; })
        .append(overlay);
    return 1;
};

var setLightbox = function () {
    var lightbox = '<div class="mylightbox lb-anchor"><div class="_lightbox-wrapper"><div class="_lightbox"><div class="lb-header"><div class="close-btn"></div></div><div class="lb-body"></div></div></div></div>';
    lightbox = '<div class="mylightbox lb-anchor"><div class="_lightbox-wrapper"><div class="_lightbox"><div class="lb-header"><div class="close-btn"></div></div><div class="lb-body"><img src="http://tbb.vteximg.com.br/arquivos/julia-roberts-video-box.jpg" alt="" /></div></div></div></div>';
    $('body')
        .filter(function () { return $('.mylightbox').length <= 0; })
        .append(lightbox);
    $('.mylightbox .close-btn').not('.__act').addClass('__act').bind('click.myLightbox', function () {
        var ndx = ($('.mylightbox .lb-body iframe') || { ndx: 0 }).attr('ndx');
        if ("undefined" != typeof ytPlayer.videos && ytPlayer.videos.length > 0) {
            ytPlayer.videos[ndx].pauseVideo();
        }
        $('html').removeClass('__show-lightbox');
    });
    return 1;
};

var setVideoLightbox = function (elem_p) {
    $(elem_p).not('.__act').addClass('__act')
        .bind('click.myLightbox', function () {
            setVideos(this);
            var ndx = 1 * $(this).attr('ndx') || 0;
            ytPlayer.init(ndx);
            $('html').addClass('__show-lightbox');
        });
    return 1;
};

var setVideoURL = function () {
    var _elem = $('.video-box > div');
    if (_elem.length <= 0) return false;

    var video_regex = new RegExp('.*?(?:video-url:\\s*)([\\w].*?)(?:$|[,]?\\s.*)', 'mig');
    var play_regex = new RegExp('.*?(?:play:\\s*)([\\w].*?)(?:$|[,]?\\s.*)', 'mig');
    var img_regex = new RegExp('.*?(?:video-img:\\s*)([\\w].*?)(?:$|[,]?\\s.*)', 'mig');
    var settings = _elem.html().trim().replace(/\n/mig, '');
    var video_url = settings;

    if (video_regex.test(video_url)) {
        video_url = settings.replace(video_regex, "$1");
        _elem.each(function (x, i) {
            $(i).attr('ndx', x).attr('data-video-url', video_url).addClass('__video-on');
            if (play_regex.test(settings)) {
                var play = settings.replace(play_regex, '$1');
                $(i).attr('data-play', play);
            }
            if (img_regex.test(settings)) {
                var img = settings.replace(img_regex, '$1');
                $(i).attr('data-img', img);
            }
            setVideoLightbox(i);
        });
    }
    return true;
};

var createElement = function (element_p, obj_p, content_p) {
    var styleElem = document.createElement(element_p);
    $.extend(styleElem, { className: '__styles' });
    $.extend(styleElem, obj_p);
    var content = content_p || "";
    $(styleElem).html(content_p);
    return styleElem;
};

var setTopBoxSettings = function () {
    var style_class = ".heading-one";
    var _elem = $('.heading-one');
    if (_elem.length <= 0) return false;

    var _settings = _elem.html().trim().replace(/\n/, '');
    _settings = _settings.replace(/(?:^|[\s]*?)(<!--.*?-->)([\s\S\n]*)/mig, '$1');

    var bk_color_regex = /^.*?bk-color:[\s]?[#]?([a-f0-9]{6,8})(?:$|[,]?.*)/mig;
    var color_regex = /^.*?[^-]color:[\s]?[#]?([a-f0-9]{6,8})(?:$|[,]?.*)/mig;

    var bk_color = '', color = '';

    bk_color = _settings.replace(bk_color_regex, '$1');
    color = _settings.replace(color_regex, '$1');

    var styles = "";
    if ("undefined" != typeof bk_color && bk_color.length > 0 || "undefined" != typeof color && color.length > 0) {
        if ("undefined" != typeof bk_color && bk_color.length > 0) {
            styles = styles + ".heading-one {\n"; // open bracket
            styles = styles + 'background-color: #' + bk_color + '; ' + "\n";
            styles = styles + "\n }\n";
        }
        if ("undefined" != typeof color && color.length > 0) {
            styles = styles + ".heading-one * ";
            styles = styles + " {\n"; // open bracket
            styles = styles + 'color: #' + color + '; ' + "\n";
            styles = styles + "\n }\n";
        }
    }

    var style = createElement('style', { className: 'top-box-settings' }, styles);
    $('head').append(style);

    _elem.addClass('__text-on');
    return 1;
};

var setPanels = function () {
    var _elems = $('.panels-data').children().clone();
    var _container = $('<div/>');
    var styles = "", bt_bk_color = "", bt_color = "";
    var _div = $('<div/>');
    _elems.each(function (x, i) {
        var style_class = "._panels";
        var _elem = $(i);
        var bk_color = _elem.attr('background-color'), color = _elem.attr('color');
        var _subelems = $(i).children();
        var _div_panel = $('<div/>');
        _div_panel.addClass('__panel').addClass('__panel' + x);
        if (x % 2 == 0) {
            _div_panel.addClass('odd');
        } else {
            _div_panel.addClass('even');
        }
        _subelems.each(function (y, j) {
            if (/img/i.test($(j)[0].tagName)) {
                if (_div.find('img').length <= 0) {
                    _div = $('<div/>');
                    _div.addClass('__img');
                    _div.append(j)
                        .css({ 'background-color': $(j).attr('background-color') });
                } else {
                    _div.append(j);
                }
            } else {
                _div = $('<div/>');
                _div.addClass('__text-panel')
                    .css({ 'background-color': $(j).attr('background-color') })
                    ;
                $(j).addClass('__texts').removeAttr('background-color')
                    .css({ 'width': $(j).attr('width') })
                    ;
                _div.append(j);
                bt_bk_color = $(j).find('.bt').attr('background-color');
                bt_color = $(j).find('.bt').attr('color');
                if ("undefined" != typeof bt_bk_color && bt_bk_color.length > 0 || "undefined" != typeof bt_color && bt_color.length > 0) {
                    if ("undefined" != typeof bt_bk_color && bt_bk_color.length > 0) {
                        styles = styles + ".__panel" + x + " .bt {\n"; // open bracket
                        styles = styles + 'background-color: ' + bt_bk_color + '; ' + "\n";
                        styles = styles + "\n }\n";
                    }
                    if ("undefined" != typeof bt_color && bt_color.length > 0) {
                        styles = styles + ".__panel" + x + " .bt ";
                        styles = styles + " {\n"; // open bracket
                        styles = styles + 'color: ' + bt_color + '; ' + "\n";
                        styles = styles + "\n }\n";
                    }
                }
            }
            _div_panel.append(_div);
        });
        _container.append(_div_panel);

        if ("undefined" != typeof bk_color && bk_color.length > 0 || "undefined" != typeof color && color.length > 0) {
            if ("undefined" != typeof bk_color && bk_color.length > 0) {
                styles = styles + ".__panel" + x + " {\n"; // open bracket
                styles = styles + 'background-color: ' + bk_color + '; ' + "\n";
                styles = styles + "\n }\n";
            }
            if ("undefined" != typeof color && color.length > 0) {
                styles = styles + ".__panel" + x + " .__texts * ";
                styles = styles + ".__panel" + x + " .__texts h1, ";
                styles = styles + ".__panel" + x + " .__texts h2, ";
                styles = styles + ".__panel" + x + " .__texts h3, ";
                styles = styles + ".__panel" + x + " .__texts h4, ";
                styles = styles + ".__panel" + x + " .__texts p ";
                styles = styles + " {\n"; // open bracket
                styles = styles + 'color: ' + color + '; ' + "\n";
                styles = styles + "\n }\n";
            }
        }
    });
    var style = createElement('style', { className: 'panels-settings' }, styles);
    $('head').append(style);

    $('.section-panels ._panels').html(_container.children());
    $('.section-panels').filter(function () { return $(this).find('._panels').children().length > 0; }).addClass('__panels-on');
    return 1;
};

var fixLineBreaks = function () {
    $('.heading-one >p').html($('.heading-one >p').text().replace(/\n/g, "<br/>\n"));
    return true;
};

var setCarouselElems = function () {
    var data = [];
    $('.carousel-data').each(function (index, dt_elems) {
        var elems = $(dt_elems).children();
        if (elems.length > 0) {
            data.push(elems || []);
        }
    });
    $(data).each(function (index, dt_elems) {
        var _elems = $('<ul/>');
        _elems.addClass('owl-carousel-v2');
        $(dt_elems).each(function (ndx, item) {
            var _li = $('<li/>');
            var href = $(item).attr('href') || '';
            var _a = $('<a/>');
            if (href.length > 0) _a.attr('href', href);
            var _panel = $('<div class="panel"></div>');
            $(item).children().clone().each(function (ndxx, itemm) {
                if (/img/i.test($(itemm)[0].tagName)) {
                    var _img = $('<div class="_img"></div>');
                    _img.append(itemm);
                    _panel.append(_img);
                } else {
                    _panel.append(itemm);
                }
            });
            _a.append(_panel);
            _li.append(_a);
            _elems.append(_li);
        });
        $('.__carousel' + index).find('.carousel-wrapper').html(_elems);
        $('html').addClass('__carousel' + index + '-on');
    });
    return true;
};

var setCarousel = function () {
    var className = '_swap_';
    var owl = [];
    $('.section-carousel').each(function (x, i) {
        owl[0] = $(i).find('ul')
            .owlCarousel({
                nav: true,
                loop: true,
                // margin: 25,
                navContainer: '.section-carousel' + x + ' .nav-carousel',
                responsive: {
                    0: {
                        items: 1
                    },
                    800: {
                        items: 2
                    },
                    1200: {
                        items: 3
                    }
                }
            })
            .addClass('owl-carousel')
            ;
        owl[0].on('change.owl.carousel', function () {
            var _this = $(this);
            if (_this.hasClass(className)) {
                _this.removeClass(className);
            }
            else {
                _this.addClass(className);
            }
        });
    });
    return true;
};

var setBannerOn = function () {
    if ($('.section-video').find('img').length <= 0) return 0;
    $('html').addClass('__banner-on');
    return 1;
};

var setPanelPicOn = function () {
    if ($('.pic-panel-text').children().length <= 0) return 0;
    $('html').addClass('show-pic-panel');
    return 1;
};

var setManual = function () {
    var _elems = $('._informative-texts > div').not('.intro');
    _elems.each(function (x, i) {
        $(i)
            .addClass('_text-on')
            .find('h2,h3').not('._clickable').addClass('_clickable').prepend('<i></i>')
            .on('click.Manual', function () {
                if ($(this).parent().hasClass('show-text'))
                    $(this).parent().removeClass('show-text')
                else
                    $(this).parent().addClass('show-text')
            });
    })
};

var setIntroNavBtns = function () {
    if ($('.page-intro-nav').children() > 0) {
        $('.page-intro-nav').addClass('_nav-on');
    }
};

var setBeforeAndAfterPics = function () {
    if ("undefined" == typeof $.fn.twentytwenty) return false;
    $('._panels .__img, .pic-panel-img')
        .filter(function () { return $(this).find('img').length > 1; })
        .twentytwenty();
    return true;
};

var fixCarouselNavigation = function () {
    $('.nav-carousel').prepend($('.nav-carousel').prev());
    return true;
};

var carouselMobile = function () {
    $(".prateleira.vitrine ul").addClass("owl-carousel");

    if ($(window).width() <= 767) {
        $(".prateleira ul.owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                    nav: false
                },
                600: {
                    items: 3,
                    nav: false
                }
            }
        });
    }
}

var breadCrumbie = function () {
    var link1 = $('.data-bd .link-1').text();
    var link2 = $('.data-bd .link-2').text();

    var nome1 = $('.data-bd .text-1').text();
    var nome2 = $('.data-bd .text-2').text();

    $('.bread-crumb ul li .bd-1-link').attr('href', link1);
    $('.bread-crumb ul li .bd-2-link').attr('href', link2);
    $('.bread-crumb ul li .bd-1-link').text(nome1);
    $('.bread-crumb ul li .bd-2-link').text(nome2);
}

var changeToDesktopImage = function () {
    var $window = $(window).width();
    if ($window >= 940) {
        console.log($window);
        $("html").addClass("show-imagem-desktop");
    } else {
        $("html").removeClass("show-imagem-desktop");
    }
}

var applyTwenty = function () {
    $(".twentytwenty-container")
        .twentytwenty({ 
            default_offset_pct: 0.69, 
            orientation: 'horizontal', 
            no_overlay: false 
        });
};
var onResize = function () {
    $(window).resize(changeToDesktopImage);
};
var slickCarousel = function () {
    $('.slick-wrapper').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
            breakpoint: 3000,
            settings: {
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 3
            }
            },
            {
            breakpoint: 768,
            settings: {
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 1
            }
            }
        ]
    });
};

var startSpecialPage = function () {
    damnYouIE();
    setOverlay();
    setLightbox();
    setVideoURL();
    if (setVideos()) {
        ytPlayer.init();
    }
    setTopBoxSettings();
    setPanels();
    setBannerOn();
    if (setCarouselElems()) {
        setCarousel();
    }
    setManual();
    setIntroNavBtns();
    setBeforeAndAfterPics();
    fixCarouselNavigation();
    setPanelPicOn();
    carouselMobile();
    breadCrumbie();
    changeToDesktopImage();
    //applyTwenty();
    slickCarousel();
    return true;
};

$(window).load(function () {
    $('.twentytwenty-container').twentytwenty();
});  

$(startSpecialPage);
$(window).load(onResize);