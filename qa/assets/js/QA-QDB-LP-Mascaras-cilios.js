(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* 23-10-2018 18-15 */

var damnYouIE = function damnYouIE() {
    var ua = window.navigator.userAgent;
    var version = ua.indexOf('MSIE ') > 0 ? 10 : ua.indexOf('Trident/') > 0 ? 11 : ua.indexOf('Edge/') > 0 ? 12 : 0;
    if (version > 0) $('html').addClass('ie').addClass('ie' + version);
    return true;
};

var ytPlayer = {
    elems: '._video-lnk[data-video-url]',
    init: function init(ndx) {
        ytPlayer.load.script(function () {
            ytPlayer.set.events(ndx);
        });
    },
    load: {
        script: function script(cb) {
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
        events: function events(ndx_p) {
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
        player: function player(elem, ndx_) {
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
                    'onReady': function onReady(event) {
                        ytPlayer.onPlayerReady(event, _playerElem, ndx);
                    },
                    'onStateChange': function onStateChange(event) {
                        ytPlayer.onPlayerStateChange(event, _playerElem);
                    }
                }
            };
            if ("undefined" == typeof ytPlayer.videos) {
                ytPlayer.videos = [];
            }
            ytPlayer.videos[ndx] = new window.YT.Player(_elem[0], playerOpts);

            return true;
        }
    },
    onPlayerReady: function onPlayerReady(event, elem, ndx_) {
        // video is ready to play
        var ndx = ndx_ || 0;
        ytPlayer.videos[ndx].playVideo();
        return true;
    },
    onPlayerStateChange: function onPlayerStateChange(event, elem) {
        var _playerElem = $(elem);
        if (1 === event.data || 3 === event.data) {
            // pause
            _playerElem.addClass('__playing');
            $(".heading-one").addClass('__slideDownTextBox');
        } else {
            /*2 === event.data = paused video*/
            // _playerElem
            $('.__playing').removeClass('__playing');
            $(".heading-one").removeClass('__slideDownTextBox');
            $('html').removeClass('__show-lightbox');
        }
        return true;
    }
};

/*set up hero banner carousel*/
var setVideos = function setVideos() {
    var video_url = ($('.special-page-data .video-url').text() || "").trim();
    $('.video-box ._video').addClass('_video-lnk').attr('data-video-url', video_url);
    return true;
};

var setOverlay = function setOverlay() {
    var overlay = '<div class="__overlay"></div>';
    $('body').filter(function () {
        return $('.mylightbox').length <= 0;
    }).append(overlay);
    return 1;
};

var setLightbox = function setLightbox() {
    var lightbox = '<div class="mylightbox lb-anchor"><div class="_lightbox-wrapper"><div class="_lightbox"><div class="lb-header"><div class="close-btn"></div></div><div class="lb-body"></div></div></div></div>';
    lightbox = '<div class="mylightbox lb-anchor"><div class="_lightbox-wrapper"><div class="_lightbox"><div class="lb-header"><div class="close-btn"></div></div><div class="lb-body"><img src="http://tbb.vteximg.com.br/arquivos/julia-roberts-video-box.jpg" alt="" /></div></div></div></div>';
    $('body').filter(function () {
        return $('.mylightbox').length <= 0;
    }).append(lightbox);
    $('.mylightbox .close-btn').not('.__act').addClass('__act').bind('click.myLightbox', function () {
        var ndx = ($('.mylightbox .lb-body iframe') || { ndx: 0 }).attr('ndx');
        if ("undefined" != typeof ytPlayer.videos && ytPlayer.videos.length > 0) {
            ytPlayer.videos[ndx].pauseVideo();
        }
        $('html').removeClass('__show-lightbox');
    });
    return 1;
};

var setVideoLightbox = function setVideoLightbox(elem_p) {
    $(elem_p).not('.__act').addClass('__act').bind('click.myLightbox', function () {
        setVideos(this);
        var ndx = 1 * $(this).attr('ndx') || 0;
        ytPlayer.init(ndx);
        $('html').addClass('__show-lightbox');
    });
    return 1;
};

var setVideoURL = function setVideoURL() {
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

var createElement = function createElement(element_p, obj_p, content_p) {
    var styleElem = document.createElement(element_p);
    $.extend(styleElem, { className: '__styles' });
    $.extend(styleElem, obj_p);
    var content = content_p || "";
    $(styleElem).html(content_p);
    return styleElem;
};

var setTopBoxSettings = function setTopBoxSettings() {
    var style_class = ".heading-one";
    var _elem = $('.heading-one');
    if (_elem.length <= 0) return false;

    var _settings = _elem.html().trim().replace(/\n/, '');
    _settings = _settings.replace(/(?:^|[\s]*?)(<!--.*?-->)([\s\S\n]*)/mig, '$1');

    var bk_color_regex = /^.*?bk-color:[\s]?[#]?([a-f0-9]{6,8})(?:$|[,]?.*)/mig;
    var color_regex = /^.*?[^-]color:[\s]?[#]?([a-f0-9]{6,8})(?:$|[,]?.*)/mig;

    var bk_color = '',
        color = '';

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

var setPanels = function setPanels() {
    var _elems = $('.panels-data').children().clone();
    var _container = $('<div/>');
    var styles = "",
        bt_bk_color = "",
        bt_color = "";
    var _div = $('<div/>');
    _elems.each(function (x, i) {
        var style_class = "._panels";
        var _elem = $(i);
        var bk_color = _elem.attr('background-color'),
            color = _elem.attr('color');
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
                    _div.append(j).css({ 'background-color': $(j).attr('background-color') });
                } else {
                    _div.append(j);
                }
            } else {
                _div = $('<div/>');
                _div.addClass('__text-panel').css({ 'background-color': $(j).attr('background-color') });
                $(j).addClass('__texts').removeAttr('background-color').css({ 'width': $(j).attr('width') });
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
    $('.section-panels').filter(function () {
        return $(this).find('._panels').children().length > 0;
    }).addClass('__panels-on');
    return 1;
};

var fixLineBreaks = function fixLineBreaks() {
    $('.heading-one >p').html($('.heading-one >p').text().replace(/\n/g, "<br/>\n"));
    return true;
};

var setCarouselElems = function setCarouselElems() {
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

var setCarousel = function setCarousel() {
    var className = '_swap_';
    var owl = [];
    $('.section-carousel').each(function (x, i) {
        owl[0] = $(i).find('ul').owlCarousel({
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
        }).addClass('owl-carousel');
        owl[0].on('change.owl.carousel', function () {
            var _this = $(this);
            if (_this.hasClass(className)) {
                _this.removeClass(className);
            } else {
                _this.addClass(className);
            }
        });
    });
    return true;
};

var setBannerOn = function setBannerOn() {
    if ($('.section-video').find('img').length <= 0) return 0;
    $('html').addClass('__banner-on');
    return 1;
};

var setPanelPicOn = function setPanelPicOn() {
    if ($('.pic-panel-text').children().length <= 0) return 0;
    $('html').addClass('show-pic-panel');
    return 1;
};

var setManual = function setManual() {
    var _elems = $('._informative-texts > div').not('.intro');
    _elems.each(function (x, i) {
        $(i).addClass('_text-on').find('h2,h3').not('._clickable').addClass('_clickable').prepend('<i></i>').on('click.Manual', function () {
            if ($(this).parent().hasClass('show-text')) $(this).parent().removeClass('show-text');else $(this).parent().addClass('show-text');
        });
    });
};

var setIntroNavBtns = function setIntroNavBtns() {
    if ($('.page-intro-nav').children() > 0) {
        $('.page-intro-nav').addClass('_nav-on');
    }
};

var setBeforeAndAfterPics = function setBeforeAndAfterPics() {
    if ("undefined" == typeof $.fn.twentytwenty) return false;
    $('._panels .__img, .pic-panel-img').filter(function () {
        return $(this).find('img').length > 1;
    }).twentytwenty();
    return true;
};

var fixCarouselNavigation = function fixCarouselNavigation() {
    $('.nav-carousel').prepend($('.nav-carousel').prev());
    return true;
};

var carouselMobile = function carouselMobile() {
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
};

var breadCrumbie = function breadCrumbie() {
    var link1 = $('.data-bd .link-1').text();
    var link2 = $('.data-bd .link-2').text();

    var nome1 = $('.data-bd .text-1').text();
    var nome2 = $('.data-bd .text-2').text();

    $('.bread-crumb ul li .bd-1-link').attr('href', link1);
    $('.bread-crumb ul li .bd-2-link').attr('href', link2);
    $('.bread-crumb ul li .bd-1-link').text(nome1);
    $('.bread-crumb ul li .bd-2-link').text(nome2);
};

var changeToDesktopImage = function changeToDesktopImage() {
    var $window = $(window).width();
    if ($window >= 940) {
        console.log($window);
        $("html").addClass("show-imagem-desktop");
    } else {
        $("html").removeClass("show-imagem-desktop");
    }
};

var applyTwenty = function applyTwenty() {
    $(".twentytwenty-container").twentytwenty({
        default_offset_pct: 0.69,
        orientation: 'horizontal',
        no_overlay: false
    });
};
var onResize = function onResize() {
    $(window).resize(changeToDesktopImage);
};
var slickCarousel = function slickCarousel() {
    $('.slick-wrapper').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToScroll: 1,
        arrows: true,
        responsive: [{
            breakpoint: 3000,
            settings: {
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 3
            }
        }, {
            breakpoint: 768,
            settings: {
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 1
            }
        }]
    });
};

var startSpecialPage = function startSpecialPage() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZjZlYTg0NjYuanMiXSwibmFtZXMiOlsiZGFtbllvdUlFIiwidWEiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ2ZXJzaW9uIiwiaW5kZXhPZiIsIiQiLCJhZGRDbGFzcyIsInl0UGxheWVyIiwiZWxlbXMiLCJpbml0IiwibmR4IiwibG9hZCIsInNjcmlwdCIsInNldCIsImV2ZW50cyIsImNiIiwiWVQiLCJQbGF5ZXIiLCJzY3JpcHRDcmVhdGVkIiwiX3NjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJzcmMiLCJjbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsInQiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwibmR4X3AiLCJlYWNoIiwiaXRlbSIsImF0dHIiLCJub3QiLCJvbiIsIl9lbGVtIiwiZmluZCIsImxlbmd0aCIsInBsYXllciIsInZpZGVvcyIsInBsYXlWaWRlbyIsImNsaWNrIiwiZWxlbSIsIm5keF8iLCJfcGxheWVyRWxlbSIsInZpZGVvaWQiLCJyZXBsYWNlIiwid2lkdGgiLCJoZWlnaHQiLCJoZWlnaHRfbWluIiwiYXBwZW5kIiwicGxheWVyT3B0cyIsInZpZGVvSWQiLCJwbGF5ZXJWYXJzIiwib25SZWFkeSIsImV2ZW50Iiwib25QbGF5ZXJSZWFkeSIsIm9uU3RhdGVDaGFuZ2UiLCJvblBsYXllclN0YXRlQ2hhbmdlIiwiZGF0YSIsInJlbW92ZUNsYXNzIiwic2V0VmlkZW9zIiwidmlkZW9fdXJsIiwidGV4dCIsInRyaW0iLCJzZXRPdmVybGF5Iiwib3ZlcmxheSIsImZpbHRlciIsInNldExpZ2h0Ym94IiwibGlnaHRib3giLCJiaW5kIiwicGF1c2VWaWRlbyIsInNldFZpZGVvTGlnaHRib3giLCJlbGVtX3AiLCJzZXRWaWRlb1VSTCIsInZpZGVvX3JlZ2V4IiwiUmVnRXhwIiwicGxheV9yZWdleCIsImltZ19yZWdleCIsInNldHRpbmdzIiwiaHRtbCIsInRlc3QiLCJ4IiwiaSIsInBsYXkiLCJpbWciLCJlbGVtZW50X3AiLCJvYmpfcCIsImNvbnRlbnRfcCIsInN0eWxlRWxlbSIsImV4dGVuZCIsImNvbnRlbnQiLCJzZXRUb3BCb3hTZXR0aW5ncyIsInN0eWxlX2NsYXNzIiwiX3NldHRpbmdzIiwiYmtfY29sb3JfcmVnZXgiLCJjb2xvcl9yZWdleCIsImJrX2NvbG9yIiwiY29sb3IiLCJzdHlsZXMiLCJzdHlsZSIsInNldFBhbmVscyIsIl9lbGVtcyIsImNoaWxkcmVuIiwiY2xvbmUiLCJfY29udGFpbmVyIiwiYnRfYmtfY29sb3IiLCJidF9jb2xvciIsIl9kaXYiLCJfc3ViZWxlbXMiLCJfZGl2X3BhbmVsIiwieSIsImoiLCJ0YWdOYW1lIiwiY3NzIiwicmVtb3ZlQXR0ciIsImZpeExpbmVCcmVha3MiLCJzZXRDYXJvdXNlbEVsZW1zIiwiaW5kZXgiLCJkdF9lbGVtcyIsInB1c2giLCJfbGkiLCJocmVmIiwiX2EiLCJfcGFuZWwiLCJuZHh4IiwiaXRlbW0iLCJfaW1nIiwic2V0Q2Fyb3VzZWwiLCJvd2wiLCJvd2xDYXJvdXNlbCIsIm5hdiIsImxvb3AiLCJuYXZDb250YWluZXIiLCJyZXNwb25zaXZlIiwiaXRlbXMiLCJfdGhpcyIsImhhc0NsYXNzIiwic2V0QmFubmVyT24iLCJzZXRQYW5lbFBpY09uIiwic2V0TWFudWFsIiwicHJlcGVuZCIsInBhcmVudCIsInNldEludHJvTmF2QnRucyIsInNldEJlZm9yZUFuZEFmdGVyUGljcyIsImZuIiwidHdlbnR5dHdlbnR5IiwiZml4Q2Fyb3VzZWxOYXZpZ2F0aW9uIiwicHJldiIsImNhcm91c2VsTW9iaWxlIiwibWFyZ2luIiwicmVzcG9uc2l2ZUNsYXNzIiwiYnJlYWRDcnVtYmllIiwibGluazEiLCJsaW5rMiIsIm5vbWUxIiwibm9tZTIiLCJjaGFuZ2VUb0Rlc2t0b3BJbWFnZSIsIiR3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwiYXBwbHlUd2VudHkiLCJkZWZhdWx0X29mZnNldF9wY3QiLCJvcmllbnRhdGlvbiIsIm5vX292ZXJsYXkiLCJvblJlc2l6ZSIsInJlc2l6ZSIsInNsaWNrQ2Fyb3VzZWwiLCJzbGljayIsImNlbnRlck1vZGUiLCJjZW50ZXJQYWRkaW5nIiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJicmVha3BvaW50Iiwic2xpZGVzVG9TaG93Iiwic3RhcnRTcGVjaWFsUGFnZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBQ0EsSUFBSUEsWUFBWSxTQUFTQSxTQUFULEdBQXFCO0FBQ2pDLFFBQUlDLEtBQUtDLE9BQU9DLFNBQVAsQ0FBaUJDLFNBQTFCO0FBQ0EsUUFBSUMsVUFBVUosR0FBR0ssT0FBSCxDQUFXLE9BQVgsSUFBc0IsQ0FBdEIsR0FBMEIsRUFBMUIsR0FBK0JMLEdBQUdLLE9BQUgsQ0FBVyxVQUFYLElBQXlCLENBQXpCLEdBQTZCLEVBQTdCLEdBQWtDTCxHQUFHSyxPQUFILENBQVcsT0FBWCxJQUFzQixDQUF0QixHQUEwQixFQUExQixHQUErQixDQUE5RztBQUNBLFFBQUlELFVBQVUsQ0FBZCxFQUFpQkUsRUFBRSxNQUFGLEVBQVVDLFFBQVYsQ0FBbUIsSUFBbkIsRUFBeUJBLFFBQXpCLENBQWtDLE9BQU9ILE9BQXpDO0FBQ2pCLFdBQU8sSUFBUDtBQUNILENBTEQ7O0FBT0EsSUFBSUksV0FBVztBQUNYQyxXQUFPLDZCQURJO0FBRVhDLFVBQU0sU0FBU0EsSUFBVCxDQUFjQyxHQUFkLEVBQW1CO0FBQ3JCSCxpQkFBU0ksSUFBVCxDQUFjQyxNQUFkLENBQXFCLFlBQVk7QUFDN0JMLHFCQUFTTSxHQUFULENBQWFDLE1BQWIsQ0FBb0JKLEdBQXBCO0FBQ0gsU0FGRDtBQUdILEtBTlU7QUFPWEMsVUFBTTtBQUNGQyxnQkFBUSxTQUFTQSxNQUFULENBQWdCRyxFQUFoQixFQUFvQjtBQUN4QixnQkFBSSxlQUFlLE9BQU9mLE9BQU9nQixFQUE3QixJQUFtQyxjQUFjLE9BQU9oQixPQUFPZ0IsRUFBUCxDQUFVQyxNQUF0RSxFQUE4RTtBQUMxRSxvQkFBSSxjQUFjLE9BQU9GLEVBQXpCLEVBQTZCO0FBQ3pC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LG1CQUFtQixTQUFTQSxnQkFBVCxHQUE0QjtBQUMvQ2pMO0FBQ0FtRTtBQUNBRztBQUNBTTtBQUNBLFFBQUliLFdBQUosRUFBaUI7QUFDYnRELGlCQUFTRSxJQUFUO0FBQ0g7QUFDRG1GO0FBQ0FTO0FBQ0FxQztBQUNBLFFBQUlyQixrQkFBSixFQUF3QjtBQUNwQlc7QUFDSDtBQUNEWTtBQUNBRztBQUNBQztBQUNBRztBQUNBUjtBQUNBVTtBQUNBRztBQUNBSztBQUNBO0FBQ0FVO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsQ0F6QkQ7O0FBMkJBbEssRUFBRUwsTUFBRixFQUFVVyxJQUFWLENBQWUsWUFBWTtBQUN2Qk4sTUFBRSx5QkFBRixFQUE2QjZJLFlBQTdCO0FBQ0gsQ0FGRDs7QUFJQTdJLEVBQUUwSyxnQkFBRjtBQUNBMUssRUFBRUwsTUFBRixFQUFVVyxJQUFWLENBQWUwSixRQUFmIiwiZmlsZSI6ImZha2VfZjZlYTg0NjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qIDIzLTEwLTIwMTggMTgtMTUgKi9cbnZhciBkYW1uWW91SUUgPSBmdW5jdGlvbiBkYW1uWW91SUUoKSB7XG4gICAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgdmFyIHZlcnNpb24gPSB1YS5pbmRleE9mKCdNU0lFICcpID4gMCA/IDEwIDogdWEuaW5kZXhPZignVHJpZGVudC8nKSA+IDAgPyAxMSA6IHVhLmluZGV4T2YoJ0VkZ2UvJykgPiAwID8gMTIgOiAwO1xuICAgIGlmICh2ZXJzaW9uID4gMCkgJCgnaHRtbCcpLmFkZENsYXNzKCdpZScpLmFkZENsYXNzKCdpZScgKyB2ZXJzaW9uKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbnZhciB5dFBsYXllciA9IHtcbiAgICBlbGVtczogJy5fdmlkZW8tbG5rW2RhdGEtdmlkZW8tdXJsXScsXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChuZHgpIHtcbiAgICAgICAgeXRQbGF5ZXIubG9hZC5zY3JpcHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgeXRQbGF5ZXIuc2V0LmV2ZW50cyhuZHgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGxvYWQ6IHtcbiAgICAgICAgc2NyaXB0OiBmdW5jdGlvbiBzY3JpcHQoY2IpIHtcbiAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiB3aW5kb3cuWVQgJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiB3aW5kb3cuWVQuUGxheWVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiID09IHR5cGVvZiB5dFBsYXllci5zY3JpcHRDcmVhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9zY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgICAgICAgICAgICBfc2NyaXB0LnNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpJztcbiAgICAgICAgICAgICAgICAgICAgX3NjcmlwdC5jbGFzc05hbWUgPSAnX3l0dWJlLXNjcmlwdCc7XG4gICAgICAgICAgICAgICAgICAgICQoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChfc2NyaXB0KTtcbiAgICAgICAgICAgICAgICAgICAgeXRQbGF5ZXIuc2NyaXB0Q3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiID09IHR5cGVvZiB5dFBsYXllci50KSB7XG4gICAgICAgICAgICAgICAgICAgIHl0UGxheWVyLnQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5dFBsYXllci5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHl0UGxheWVyLnQpO1xuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldDoge1xuICAgICAgICBldmVudHM6IGZ1bmN0aW9uIGV2ZW50cyhuZHhfcCkge1xuICAgICAgICAgICAgJCh5dFBsYXllci5lbGVtcykuZWFjaChmdW5jdGlvbiAobmR4LCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgJChpdGVtKS5hZGRDbGFzcygnX195dHBsYXllcicgKyBuZHgpLmF0dHIoJ25keCcsIG5keCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoeXRQbGF5ZXIuZWxlbXMpLm5vdCgnLl9feXRwbGF5ZXInKS5hZGRDbGFzcygnX195dHBsYXllcicpLm9uKCdjbGljay5ZVFBsYXllcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2VsZW0gPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBuZHggPSAxICogX2VsZW0uYXR0cignbmR4Jyk7XG4gICAgICAgICAgICAgICAgaWYgKF9lbGVtLmZpbmQoJ2lmcmFtZScpLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHl0UGxheWVyLnNldC5wbGF5ZXIoX2VsZW0sIG5keCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnLl9feXRwbGF5ZXInK25keCkuZmluZCgnaWZyYW1lJykuYXR0cignd2lkdGgnLF9lbGVtLndpZHRoKCkpLmF0dHIoJ2hlaWdodCcsX2VsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICB5dFBsYXllci52aWRlb3NbbmR4XS5wbGF5VmlkZW8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBuZHhfcCkge1xuICAgICAgICAgICAgICAgICQoJy5fX3l0cGxheWVyJyArIG5keF9wKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwbGF5ZXI6IGZ1bmN0aW9uIHBsYXllcihlbGVtLCBuZHhfKSB7XG4gICAgICAgICAgICB2YXIgbmR4ID0gbmR4XyB8fCAwO1xuICAgICAgICAgICAgdmFyIF9wbGF5ZXJFbGVtO1xuICAgICAgICAgICAgX3BsYXllckVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgaWYgKF9wbGF5ZXJFbGVtLmxlbmd0aCA8PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoX3BsYXllckVsZW0uZmluZCgnaWZyYW1lJykubGVuZ3RoID4gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgdmlkZW9pZCA9IChfcGxheWVyRWxlbS5hdHRyKCdkYXRhLXZpZGVvLXVybCcpIHx8IFwiXCIpLnJlcGxhY2UoLyhodHRwW3NdPzpcXC9cXC98d3d3XFwufHlvdXR1YmVcXC5jb21cXC98Lip5b3V0dVxcLmJlXFwvfGVtYmVkXFwvfHdhdGNoXFw/dj18XFw/Lip8Ji4qKS9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmICh2aWRlb2lkLmxlbmd0aCA8PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciB3aWR0aCA9IF9wbGF5ZXJFbGVtLndpZHRoKCk7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gX3BsYXllckVsZW0uZmluZCgnaW1nOmZpcnN0JykuaGVpZ2h0KCk7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0X21pbiA9IHdpZHRoICogMC41ODg7XG4gICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHRfbWluID4gaGVpZ2h0ID8gaGVpZ2h0X21pbiA6IGhlaWdodDtcblxuICAgICAgICAgICAgd2lkdGggPSBcIjgwJVwiO1xuICAgICAgICAgICAgaGVpZ2h0ID0gXCI2MDBcIjtcblxuICAgICAgICAgICAgdmFyIF9lbGVtID0gJCgnPGRpdi8+Jyk7XG4gICAgICAgICAgICBfZWxlbS5hZGRDbGFzcygnX3ZpZGVvLWlmcmFtZScpO1xuICAgICAgICAgICAgX3BsYXllckVsZW0uYWRkQ2xhc3MoJ19fcGxheWluZycpLmFwcGVuZChfZWxlbSk7XG4gICAgICAgICAgICB2YXIgcGxheWVyT3B0cyA9IHtcbiAgICAgICAgICAgICAgICB2aWRlb0lkOiB2aWRlb2lkLFxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdhdXRvcGxheSc6IDEsXG4gICAgICAgICAgICAgICAgICAgICdjb250cm9scyc6IDAsXG4gICAgICAgICAgICAgICAgICAgICdyZWwnOiAwLFxuICAgICAgICAgICAgICAgICAgICAnZGlzYWJsZWtiJzogMCxcbiAgICAgICAgICAgICAgICAgICAgJ21vZGVzdGJyYW5kaW5nJzogMSxcbiAgICAgICAgICAgICAgICAgICAgJ3Nob3dpbmZvJzogMCxcbiAgICAgICAgICAgICAgICAgICAgJ2h0bWw1JzogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICdvblJlYWR5JzogZnVuY3Rpb24gb25SZWFkeShldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeXRQbGF5ZXIub25QbGF5ZXJSZWFkeShldmVudCwgX3BsYXllckVsZW0sIG5keCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdvblN0YXRlQ2hhbmdlJzogZnVuY3Rpb24gb25TdGF0ZUNoYW5nZShldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeXRQbGF5ZXIub25QbGF5ZXJTdGF0ZUNoYW5nZShldmVudCwgX3BsYXllckVsZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiID09IHR5cGVvZiB5dFBsYXllci52aWRlb3MpIHtcbiAgICAgICAgICAgICAgICB5dFBsYXllci52aWRlb3MgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHl0UGxheWVyLnZpZGVvc1tuZHhdID0gbmV3IHdpbmRvdy5ZVC5QbGF5ZXIoX2VsZW1bMF0sIHBsYXllck9wdHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25QbGF5ZXJSZWFkeTogZnVuY3Rpb24gb25QbGF5ZXJSZWFkeShldmVudCwgZWxlbSwgbmR4Xykge1xuICAgICAgICAvLyB2aWRlbyBpcyByZWFkeSB0byBwbGF5XG4gICAgICAgIHZhciBuZHggPSBuZHhfIHx8IDA7XG4gICAgICAgIHl0UGxheWVyLnZpZGVvc1tuZHhdLnBsYXlWaWRlbygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIG9uUGxheWVyU3RhdGVDaGFuZ2U6IGZ1bmN0aW9uIG9uUGxheWVyU3RhdGVDaGFuZ2UoZXZlbnQsIGVsZW0pIHtcbiAgICAgICAgdmFyIF9wbGF5ZXJFbGVtID0gJChlbGVtKTtcbiAgICAgICAgaWYgKDEgPT09IGV2ZW50LmRhdGEgfHwgMyA9PT0gZXZlbnQuZGF0YSkge1xuICAgICAgICAgICAgLy8gcGF1c2VcbiAgICAgICAgICAgIF9wbGF5ZXJFbGVtLmFkZENsYXNzKCdfX3BsYXlpbmcnKTtcbiAgICAgICAgICAgICQoXCIuaGVhZGluZy1vbmVcIikuYWRkQ2xhc3MoJ19fc2xpZGVEb3duVGV4dEJveCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLyoyID09PSBldmVudC5kYXRhID0gcGF1c2VkIHZpZGVvKi9cbiAgICAgICAgICAgIC8vIF9wbGF5ZXJFbGVtXG4gICAgICAgICAgICAkKCcuX19wbGF5aW5nJykucmVtb3ZlQ2xhc3MoJ19fcGxheWluZycpO1xuICAgICAgICAgICAgJChcIi5oZWFkaW5nLW9uZVwiKS5yZW1vdmVDbGFzcygnX19zbGlkZURvd25UZXh0Qm94Jyk7XG4gICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ19fc2hvdy1saWdodGJveCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn07XG5cbi8qc2V0IHVwIGhlcm8gYmFubmVyIGNhcm91c2VsKi9cbnZhciBzZXRWaWRlb3MgPSBmdW5jdGlvbiBzZXRWaWRlb3MoKSB7XG4gICAgdmFyIHZpZGVvX3VybCA9ICgkKCcuc3BlY2lhbC1wYWdlLWRhdGEgLnZpZGVvLXVybCcpLnRleHQoKSB8fCBcIlwiKS50cmltKCk7XG4gICAgJCgnLnZpZGVvLWJveCAuX3ZpZGVvJykuYWRkQ2xhc3MoJ192aWRlby1sbmsnKS5hdHRyKCdkYXRhLXZpZGVvLXVybCcsIHZpZGVvX3VybCk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG52YXIgc2V0T3ZlcmxheSA9IGZ1bmN0aW9uIHNldE92ZXJsYXkoKSB7XG4gICAgdmFyIG92ZXJsYXkgPSAnPGRpdiBjbGFzcz1cIl9fb3ZlcmxheVwiPjwvZGl2Pic7XG4gICAgJCgnYm9keScpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkKCcubXlsaWdodGJveCcpLmxlbmd0aCA8PSAwO1xuICAgIH0pLmFwcGVuZChvdmVybGF5KTtcbiAgICByZXR1cm4gMTtcbn07XG5cbnZhciBzZXRMaWdodGJveCA9IGZ1bmN0aW9uIHNldExpZ2h0Ym94KCkge1xuICAgIHZhciBsaWdodGJveCA9ICc8ZGl2IGNsYXNzPVwibXlsaWdodGJveCBsYi1hbmNob3JcIj48ZGl2IGNsYXNzPVwiX2xpZ2h0Ym94LXdyYXBwZXJcIj48ZGl2IGNsYXNzPVwiX2xpZ2h0Ym94XCI+PGRpdiBjbGFzcz1cImxiLWhlYWRlclwiPjxkaXYgY2xhc3M9XCJjbG9zZS1idG5cIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwibGItYm9keVwiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2Pic7XG4gICAgbGlnaHRib3ggPSAnPGRpdiBjbGFzcz1cIm15bGlnaHRib3ggbGItYW5jaG9yXCI+PGRpdiBjbGFzcz1cIl9saWdodGJveC13cmFwcGVyXCI+PGRpdiBjbGFzcz1cIl9saWdodGJveFwiPjxkaXYgY2xhc3M9XCJsYi1oZWFkZXJcIj48ZGl2IGNsYXNzPVwiY2xvc2UtYnRuXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImxiLWJvZHlcIj48aW1nIHNyYz1cImh0dHA6Ly90YmIudnRleGltZy5jb20uYnIvYXJxdWl2b3MvanVsaWEtcm9iZXJ0cy12aWRlby1ib3guanBnXCIgYWx0PVwiXCIgLz48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nO1xuICAgICQoJ2JvZHknKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJCgnLm15bGlnaHRib3gnKS5sZW5ndGggPD0gMDtcbiAgICB9KS5hcHBlbmQobGlnaHRib3gpO1xuICAgICQoJy5teWxpZ2h0Ym94IC5jbG9zZS1idG4nKS5ub3QoJy5fX2FjdCcpLmFkZENsYXNzKCdfX2FjdCcpLmJpbmQoJ2NsaWNrLm15TGlnaHRib3gnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZHggPSAoJCgnLm15bGlnaHRib3ggLmxiLWJvZHkgaWZyYW1lJykgfHwgeyBuZHg6IDAgfSkuYXR0cignbmR4Jyk7XG4gICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiB5dFBsYXllci52aWRlb3MgJiYgeXRQbGF5ZXIudmlkZW9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHl0UGxheWVyLnZpZGVvc1tuZHhdLnBhdXNlVmlkZW8oKTtcbiAgICAgICAgfVxuICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ19fc2hvdy1saWdodGJveCcpO1xuICAgIH0pO1xuICAgIHJldHVybiAxO1xufTtcblxudmFyIHNldFZpZGVvTGlnaHRib3ggPSBmdW5jdGlvbiBzZXRWaWRlb0xpZ2h0Ym94KGVsZW1fcCkge1xuICAgICQoZWxlbV9wKS5ub3QoJy5fX2FjdCcpLmFkZENsYXNzKCdfX2FjdCcpLmJpbmQoJ2NsaWNrLm15TGlnaHRib3gnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFZpZGVvcyh0aGlzKTtcbiAgICAgICAgdmFyIG5keCA9IDEgKiAkKHRoaXMpLmF0dHIoJ25keCcpIHx8IDA7XG4gICAgICAgIHl0UGxheWVyLmluaXQobmR4KTtcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdfX3Nob3ctbGlnaHRib3gnKTtcbiAgICB9KTtcbiAgICByZXR1cm4gMTtcbn07XG5cbnZhciBzZXRWaWRlb1VSTCA9IGZ1bmN0aW9uIHNldFZpZGVvVVJMKCkge1xuICAgIHZhciBfZWxlbSA9ICQoJy52aWRlby1ib3ggPiBkaXYnKTtcbiAgICBpZiAoX2VsZW0ubGVuZ3RoIDw9IDApIHJldHVybiBmYWxzZTtcblxuICAgIHZhciB2aWRlb19yZWdleCA9IG5ldyBSZWdFeHAoJy4qPyg/OnZpZGVvLXVybDpcXFxccyopKFtcXFxcd10uKj8pKD86JHxbLF0/XFxcXHMuKiknLCAnbWlnJyk7XG4gICAgdmFyIHBsYXlfcmVnZXggPSBuZXcgUmVnRXhwKCcuKj8oPzpwbGF5OlxcXFxzKikoW1xcXFx3XS4qPykoPzokfFssXT9cXFxccy4qKScsICdtaWcnKTtcbiAgICB2YXIgaW1nX3JlZ2V4ID0gbmV3IFJlZ0V4cCgnLio/KD86dmlkZW8taW1nOlxcXFxzKikoW1xcXFx3XS4qPykoPzokfFssXT9cXFxccy4qKScsICdtaWcnKTtcbiAgICB2YXIgc2V0dGluZ3MgPSBfZWxlbS5odG1sKCkudHJpbSgpLnJlcGxhY2UoL1xcbi9taWcsICcnKTtcbiAgICB2YXIgdmlkZW9fdXJsID0gc2V0dGluZ3M7XG5cbiAgICBpZiAodmlkZW9fcmVnZXgudGVzdCh2aWRlb191cmwpKSB7XG4gICAgICAgIHZpZGVvX3VybCA9IHNldHRpbmdzLnJlcGxhY2UodmlkZW9fcmVnZXgsIFwiJDFcIik7XG4gICAgICAgIF9lbGVtLmVhY2goZnVuY3Rpb24gKHgsIGkpIHtcbiAgICAgICAgICAgICQoaSkuYXR0cignbmR4JywgeCkuYXR0cignZGF0YS12aWRlby11cmwnLCB2aWRlb191cmwpLmFkZENsYXNzKCdfX3ZpZGVvLW9uJyk7XG4gICAgICAgICAgICBpZiAocGxheV9yZWdleC50ZXN0KHNldHRpbmdzKSkge1xuICAgICAgICAgICAgICAgIHZhciBwbGF5ID0gc2V0dGluZ3MucmVwbGFjZShwbGF5X3JlZ2V4LCAnJDEnKTtcbiAgICAgICAgICAgICAgICAkKGkpLmF0dHIoJ2RhdGEtcGxheScsIHBsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGltZ19yZWdleC50ZXN0KHNldHRpbmdzKSkge1xuICAgICAgICAgICAgICAgIHZhciBpbWcgPSBzZXR0aW5ncy5yZXBsYWNlKGltZ19yZWdleCwgJyQxJyk7XG4gICAgICAgICAgICAgICAgJChpKS5hdHRyKCdkYXRhLWltZycsIGltZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRWaWRlb0xpZ2h0Ym94KGkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWxlbWVudF9wLCBvYmpfcCwgY29udGVudF9wKSB7XG4gICAgdmFyIHN0eWxlRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudF9wKTtcbiAgICAkLmV4dGVuZChzdHlsZUVsZW0sIHsgY2xhc3NOYW1lOiAnX19zdHlsZXMnIH0pO1xuICAgICQuZXh0ZW5kKHN0eWxlRWxlbSwgb2JqX3ApO1xuICAgIHZhciBjb250ZW50ID0gY29udGVudF9wIHx8IFwiXCI7XG4gICAgJChzdHlsZUVsZW0pLmh0bWwoY29udGVudF9wKTtcbiAgICByZXR1cm4gc3R5bGVFbGVtO1xufTtcblxudmFyIHNldFRvcEJveFNldHRpbmdzID0gZnVuY3Rpb24gc2V0VG9wQm94U2V0dGluZ3MoKSB7XG4gICAgdmFyIHN0eWxlX2NsYXNzID0gXCIuaGVhZGluZy1vbmVcIjtcbiAgICB2YXIgX2VsZW0gPSAkKCcuaGVhZGluZy1vbmUnKTtcbiAgICBpZiAoX2VsZW0ubGVuZ3RoIDw9IDApIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBfc2V0dGluZ3MgPSBfZWxlbS5odG1sKCkudHJpbSgpLnJlcGxhY2UoL1xcbi8sICcnKTtcbiAgICBfc2V0dGluZ3MgPSBfc2V0dGluZ3MucmVwbGFjZSgvKD86XnxbXFxzXSo/KSg8IS0tLio/LS0+KShbXFxzXFxTXFxuXSopL21pZywgJyQxJyk7XG5cbiAgICB2YXIgYmtfY29sb3JfcmVnZXggPSAvXi4qP2JrLWNvbG9yOltcXHNdP1sjXT8oW2EtZjAtOV17Niw4fSkoPzokfFssXT8uKikvbWlnO1xuICAgIHZhciBjb2xvcl9yZWdleCA9IC9eLio/W14tXWNvbG9yOltcXHNdP1sjXT8oW2EtZjAtOV17Niw4fSkoPzokfFssXT8uKikvbWlnO1xuXG4gICAgdmFyIGJrX2NvbG9yID0gJycsXG4gICAgICAgIGNvbG9yID0gJyc7XG5cbiAgICBia19jb2xvciA9IF9zZXR0aW5ncy5yZXBsYWNlKGJrX2NvbG9yX3JlZ2V4LCAnJDEnKTtcbiAgICBjb2xvciA9IF9zZXR0aW5ncy5yZXBsYWNlKGNvbG9yX3JlZ2V4LCAnJDEnKTtcblxuICAgIHZhciBzdHlsZXMgPSBcIlwiO1xuICAgIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBia19jb2xvciAmJiBia19jb2xvci5sZW5ndGggPiAwIHx8IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGNvbG9yICYmIGNvbG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGJrX2NvbG9yICYmIGJrX2NvbG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcyArIFwiLmhlYWRpbmctb25lIHtcXG5cIjsgLy8gb3BlbiBicmFja2V0XG4gICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyAnYmFja2dyb3VuZC1jb2xvcjogIycgKyBia19jb2xvciArICc7ICcgKyBcIlxcblwiO1xuICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzICsgXCJcXG4gfVxcblwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBjb2xvciAmJiBjb2xvci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyBcIi5oZWFkaW5nLW9uZSAqIFwiO1xuICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzICsgXCIge1xcblwiOyAvLyBvcGVuIGJyYWNrZXRcbiAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcyArICdjb2xvcjogIycgKyBjb2xvciArICc7ICcgKyBcIlxcblwiO1xuICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzICsgXCJcXG4gfVxcblwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHN0eWxlID0gY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7IGNsYXNzTmFtZTogJ3RvcC1ib3gtc2V0dGluZ3MnIH0sIHN0eWxlcyk7XG4gICAgJCgnaGVhZCcpLmFwcGVuZChzdHlsZSk7XG5cbiAgICBfZWxlbS5hZGRDbGFzcygnX190ZXh0LW9uJyk7XG4gICAgcmV0dXJuIDE7XG59O1xuXG52YXIgc2V0UGFuZWxzID0gZnVuY3Rpb24gc2V0UGFuZWxzKCkge1xuICAgIHZhciBfZWxlbXMgPSAkKCcucGFuZWxzLWRhdGEnKS5jaGlsZHJlbigpLmNsb25lKCk7XG4gICAgdmFyIF9jb250YWluZXIgPSAkKCc8ZGl2Lz4nKTtcbiAgICB2YXIgc3R5bGVzID0gXCJcIixcbiAgICAgICAgYnRfYmtfY29sb3IgPSBcIlwiLFxuICAgICAgICBidF9jb2xvciA9IFwiXCI7XG4gICAgdmFyIF9kaXYgPSAkKCc8ZGl2Lz4nKTtcbiAgICBfZWxlbXMuZWFjaChmdW5jdGlvbiAoeCwgaSkge1xuICAgICAgICB2YXIgc3R5bGVfY2xhc3MgPSBcIi5fcGFuZWxzXCI7XG4gICAgICAgIHZhciBfZWxlbSA9ICQoaSk7XG4gICAgICAgIHZhciBia19jb2xvciA9IF9lbGVtLmF0dHIoJ2JhY2tncm91bmQtY29sb3InKSxcbiAgICAgICAgICAgIGNvbG9yID0gX2VsZW0uYXR0cignY29sb3InKTtcbiAgICAgICAgdmFyIF9zdWJlbGVtcyA9ICQoaSkuY2hpbGRyZW4oKTtcbiAgICAgICAgdmFyIF9kaXZfcGFuZWwgPSAkKCc8ZGl2Lz4nKTtcbiAgICAgICAgX2Rpdl9wYW5lbC5hZGRDbGFzcygnX19wYW5lbCcpLmFkZENsYXNzKCdfX3BhbmVsJyArIHgpO1xuICAgICAgICBpZiAoeCAlIDIgPT0gMCkge1xuICAgICAgICAgICAgX2Rpdl9wYW5lbC5hZGRDbGFzcygnb2RkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfZGl2X3BhbmVsLmFkZENsYXNzKCdldmVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgX3N1YmVsZW1zLmVhY2goZnVuY3Rpb24gKHksIGopIHtcbiAgICAgICAgICAgIGlmICgvaW1nL2kudGVzdCgkKGopWzBdLnRhZ05hbWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9kaXYuZmluZCgnaW1nJykubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgX2RpdiA9ICQoJzxkaXYvPicpO1xuICAgICAgICAgICAgICAgICAgICBfZGl2LmFkZENsYXNzKCdfX2ltZycpO1xuICAgICAgICAgICAgICAgICAgICBfZGl2LmFwcGVuZChqKS5jc3MoeyAnYmFja2dyb3VuZC1jb2xvcic6ICQoaikuYXR0cignYmFja2dyb3VuZC1jb2xvcicpIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9kaXYuYXBwZW5kKGopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2RpdiA9ICQoJzxkaXYvPicpO1xuICAgICAgICAgICAgICAgIF9kaXYuYWRkQ2xhc3MoJ19fdGV4dC1wYW5lbCcpLmNzcyh7ICdiYWNrZ3JvdW5kLWNvbG9yJzogJChqKS5hdHRyKCdiYWNrZ3JvdW5kLWNvbG9yJykgfSk7XG4gICAgICAgICAgICAgICAgJChqKS5hZGRDbGFzcygnX190ZXh0cycpLnJlbW92ZUF0dHIoJ2JhY2tncm91bmQtY29sb3InKS5jc3MoeyAnd2lkdGgnOiAkKGopLmF0dHIoJ3dpZHRoJykgfSk7XG4gICAgICAgICAgICAgICAgX2Rpdi5hcHBlbmQoaik7XG4gICAgICAgICAgICAgICAgYnRfYmtfY29sb3IgPSAkKGopLmZpbmQoJy5idCcpLmF0dHIoJ2JhY2tncm91bmQtY29sb3InKTtcbiAgICAgICAgICAgICAgICBidF9jb2xvciA9ICQoaikuZmluZCgnLmJ0JykuYXR0cignY29sb3InKTtcbiAgICAgICAgICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgYnRfYmtfY29sb3IgJiYgYnRfYmtfY29sb3IubGVuZ3RoID4gMCB8fCBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBidF9jb2xvciAmJiBidF9jb2xvci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBidF9ia19jb2xvciAmJiBidF9ia19jb2xvci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyBcIi5fX3BhbmVsXCIgKyB4ICsgXCIgLmJ0IHtcXG5cIjsgLy8gb3BlbiBicmFja2V0XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyAnYmFja2dyb3VuZC1jb2xvcjogJyArIGJ0X2JrX2NvbG9yICsgJzsgJyArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyBcIlxcbiB9XFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGJ0X2NvbG9yICYmIGJ0X2NvbG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcyArIFwiLl9fcGFuZWxcIiArIHggKyBcIiAuYnQgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyBcIiB7XFxuXCI7IC8vIG9wZW4gYnJhY2tldFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzICsgJ2NvbG9yOiAnICsgYnRfY29sb3IgKyAnOyAnICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcyArIFwiXFxuIH1cXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9kaXZfcGFuZWwuYXBwZW5kKF9kaXYpO1xuICAgICAgICB9KTtcbiAgICAgICAgX2NvbnRhaW5lci5hcHBlbmQoX2Rpdl9wYW5lbCk7XG5cbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGJrX2NvbG9yICYmIGJrX2NvbG9yLmxlbmd0aCA+IDAgfHwgXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgY29sb3IgJiYgY29sb3IubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGJrX2NvbG9yICYmIGJrX2NvbG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyBcIi5fX3BhbmVsXCIgKyB4ICsgXCIge1xcblwiOyAvLyBvcGVuIGJyYWNrZXRcbiAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyAnYmFja2dyb3VuZC1jb2xvcjogJyArIGJrX2NvbG9yICsgJzsgJyArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzICsgXCJcXG4gfVxcblwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGNvbG9yICYmIGNvbG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyBcIi5fX3BhbmVsXCIgKyB4ICsgXCIgLl9fdGV4dHMgKiBcIjtcbiAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyBcIi5fX3BhbmVsXCIgKyB4ICsgXCIgLl9fdGV4dHMgaDEsIFwiO1xuICAgICAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcyArIFwiLl9fcGFuZWxcIiArIHggKyBcIiAuX190ZXh0cyBoMiwgXCI7XG4gICAgICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzICsgXCIuX19wYW5lbFwiICsgeCArIFwiIC5fX3RleHRzIGgzLCBcIjtcbiAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyBcIi5fX3BhbmVsXCIgKyB4ICsgXCIgLl9fdGV4dHMgaDQsIFwiO1xuICAgICAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcyArIFwiLl9fcGFuZWxcIiArIHggKyBcIiAuX190ZXh0cyBwIFwiO1xuICAgICAgICAgICAgICAgIHN0eWxlcyA9IHN0eWxlcyArIFwiIHtcXG5cIjsgLy8gb3BlbiBicmFja2V0XG4gICAgICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzICsgJ2NvbG9yOiAnICsgY29sb3IgKyAnOyAnICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMgKyBcIlxcbiB9XFxuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgc3R5bGUgPSBjcmVhdGVFbGVtZW50KCdzdHlsZScsIHsgY2xhc3NOYW1lOiAncGFuZWxzLXNldHRpbmdzJyB9LCBzdHlsZXMpO1xuICAgICQoJ2hlYWQnKS5hcHBlbmQoc3R5bGUpO1xuXG4gICAgJCgnLnNlY3Rpb24tcGFuZWxzIC5fcGFuZWxzJykuaHRtbChfY29udGFpbmVyLmNoaWxkcmVuKCkpO1xuICAgICQoJy5zZWN0aW9uLXBhbmVscycpLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMpLmZpbmQoJy5fcGFuZWxzJykuY2hpbGRyZW4oKS5sZW5ndGggPiAwO1xuICAgIH0pLmFkZENsYXNzKCdfX3BhbmVscy1vbicpO1xuICAgIHJldHVybiAxO1xufTtcblxudmFyIGZpeExpbmVCcmVha3MgPSBmdW5jdGlvbiBmaXhMaW5lQnJlYWtzKCkge1xuICAgICQoJy5oZWFkaW5nLW9uZSA+cCcpLmh0bWwoJCgnLmhlYWRpbmctb25lID5wJykudGV4dCgpLnJlcGxhY2UoL1xcbi9nLCBcIjxici8+XFxuXCIpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbnZhciBzZXRDYXJvdXNlbEVsZW1zID0gZnVuY3Rpb24gc2V0Q2Fyb3VzZWxFbGVtcygpIHtcbiAgICB2YXIgZGF0YSA9IFtdO1xuICAgICQoJy5jYXJvdXNlbC1kYXRhJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGR0X2VsZW1zKSB7XG4gICAgICAgIHZhciBlbGVtcyA9ICQoZHRfZWxlbXMpLmNoaWxkcmVuKCk7XG4gICAgICAgIGlmIChlbGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBkYXRhLnB1c2goZWxlbXMgfHwgW10pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZHRfZWxlbXMpIHtcbiAgICAgICAgdmFyIF9lbGVtcyA9ICQoJzx1bC8+Jyk7XG4gICAgICAgIF9lbGVtcy5hZGRDbGFzcygnb3dsLWNhcm91c2VsLXYyJyk7XG4gICAgICAgICQoZHRfZWxlbXMpLmVhY2goZnVuY3Rpb24gKG5keCwgaXRlbSkge1xuICAgICAgICAgICAgdmFyIF9saSA9ICQoJzxsaS8+Jyk7XG4gICAgICAgICAgICB2YXIgaHJlZiA9ICQoaXRlbSkuYXR0cignaHJlZicpIHx8ICcnO1xuICAgICAgICAgICAgdmFyIF9hID0gJCgnPGEvPicpO1xuICAgICAgICAgICAgaWYgKGhyZWYubGVuZ3RoID4gMCkgX2EuYXR0cignaHJlZicsIGhyZWYpO1xuICAgICAgICAgICAgdmFyIF9wYW5lbCA9ICQoJzxkaXYgY2xhc3M9XCJwYW5lbFwiPjwvZGl2PicpO1xuICAgICAgICAgICAgJChpdGVtKS5jaGlsZHJlbigpLmNsb25lKCkuZWFjaChmdW5jdGlvbiAobmR4eCwgaXRlbW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoL2ltZy9pLnRlc3QoJChpdGVtbSlbMF0udGFnTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pbWcgPSAkKCc8ZGl2IGNsYXNzPVwiX2ltZ1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBfaW1nLmFwcGVuZChpdGVtbSk7XG4gICAgICAgICAgICAgICAgICAgIF9wYW5lbC5hcHBlbmQoX2ltZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3BhbmVsLmFwcGVuZChpdGVtbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfYS5hcHBlbmQoX3BhbmVsKTtcbiAgICAgICAgICAgIF9saS5hcHBlbmQoX2EpO1xuICAgICAgICAgICAgX2VsZW1zLmFwcGVuZChfbGkpO1xuICAgICAgICB9KTtcbiAgICAgICAgJCgnLl9fY2Fyb3VzZWwnICsgaW5kZXgpLmZpbmQoJy5jYXJvdXNlbC13cmFwcGVyJykuaHRtbChfZWxlbXMpO1xuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ19fY2Fyb3VzZWwnICsgaW5kZXggKyAnLW9uJyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG52YXIgc2V0Q2Fyb3VzZWwgPSBmdW5jdGlvbiBzZXRDYXJvdXNlbCgpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gJ19zd2FwXyc7XG4gICAgdmFyIG93bCA9IFtdO1xuICAgICQoJy5zZWN0aW9uLWNhcm91c2VsJykuZWFjaChmdW5jdGlvbiAoeCwgaSkge1xuICAgICAgICBvd2xbMF0gPSAkKGkpLmZpbmQoJ3VsJykub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgICAgbmF2OiB0cnVlLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIC8vIG1hcmdpbjogMjUsXG4gICAgICAgICAgICBuYXZDb250YWluZXI6ICcuc2VjdGlvbi1jYXJvdXNlbCcgKyB4ICsgJyAubmF2LWNhcm91c2VsJyxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHtcbiAgICAgICAgICAgICAgICAwOiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA4MDA6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDEyMDA6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKTtcbiAgICAgICAgb3dsWzBdLm9uKCdjaGFuZ2Uub3dsLmNhcm91c2VsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5oYXNDbGFzcyhjbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG52YXIgc2V0QmFubmVyT24gPSBmdW5jdGlvbiBzZXRCYW5uZXJPbigpIHtcbiAgICBpZiAoJCgnLnNlY3Rpb24tdmlkZW8nKS5maW5kKCdpbWcnKS5sZW5ndGggPD0gMCkgcmV0dXJuIDA7XG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdfX2Jhbm5lci1vbicpO1xuICAgIHJldHVybiAxO1xufTtcblxudmFyIHNldFBhbmVsUGljT24gPSBmdW5jdGlvbiBzZXRQYW5lbFBpY09uKCkge1xuICAgIGlmICgkKCcucGljLXBhbmVsLXRleHQnKS5jaGlsZHJlbigpLmxlbmd0aCA8PSAwKSByZXR1cm4gMDtcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ3Nob3ctcGljLXBhbmVsJyk7XG4gICAgcmV0dXJuIDE7XG59O1xuXG52YXIgc2V0TWFudWFsID0gZnVuY3Rpb24gc2V0TWFudWFsKCkge1xuICAgIHZhciBfZWxlbXMgPSAkKCcuX2luZm9ybWF0aXZlLXRleHRzID4gZGl2Jykubm90KCcuaW50cm8nKTtcbiAgICBfZWxlbXMuZWFjaChmdW5jdGlvbiAoeCwgaSkge1xuICAgICAgICAkKGkpLmFkZENsYXNzKCdfdGV4dC1vbicpLmZpbmQoJ2gyLGgzJykubm90KCcuX2NsaWNrYWJsZScpLmFkZENsYXNzKCdfY2xpY2thYmxlJykucHJlcGVuZCgnPGk+PC9pPicpLm9uKCdjbGljay5NYW51YWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnc2hvdy10ZXh0JykpICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3Nob3ctdGV4dCcpO2Vsc2UgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnc2hvdy10ZXh0Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxudmFyIHNldEludHJvTmF2QnRucyA9IGZ1bmN0aW9uIHNldEludHJvTmF2QnRucygpIHtcbiAgICBpZiAoJCgnLnBhZ2UtaW50cm8tbmF2JykuY2hpbGRyZW4oKSA+IDApIHtcbiAgICAgICAgJCgnLnBhZ2UtaW50cm8tbmF2JykuYWRkQ2xhc3MoJ19uYXYtb24nKTtcbiAgICB9XG59O1xuXG52YXIgc2V0QmVmb3JlQW5kQWZ0ZXJQaWNzID0gZnVuY3Rpb24gc2V0QmVmb3JlQW5kQWZ0ZXJQaWNzKCkge1xuICAgIGlmIChcInVuZGVmaW5lZFwiID09IHR5cGVvZiAkLmZuLnR3ZW50eXR3ZW50eSkgcmV0dXJuIGZhbHNlO1xuICAgICQoJy5fcGFuZWxzIC5fX2ltZywgLnBpYy1wYW5lbC1pbWcnKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJCh0aGlzKS5maW5kKCdpbWcnKS5sZW5ndGggPiAxO1xuICAgIH0pLnR3ZW50eXR3ZW50eSgpO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxudmFyIGZpeENhcm91c2VsTmF2aWdhdGlvbiA9IGZ1bmN0aW9uIGZpeENhcm91c2VsTmF2aWdhdGlvbigpIHtcbiAgICAkKCcubmF2LWNhcm91c2VsJykucHJlcGVuZCgkKCcubmF2LWNhcm91c2VsJykucHJldigpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbnZhciBjYXJvdXNlbE1vYmlsZSA9IGZ1bmN0aW9uIGNhcm91c2VsTW9iaWxlKCkge1xuICAgICQoXCIucHJhdGVsZWlyYS52aXRyaW5lIHVsXCIpLmFkZENsYXNzKFwib3dsLWNhcm91c2VsXCIpO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2Nykge1xuICAgICAgICAkKFwiLnByYXRlbGVpcmEgdWwub3dsLWNhcm91c2VsXCIpLm93bENhcm91c2VsKHtcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBtYXJnaW46IDEwLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZUNsYXNzOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZToge1xuICAgICAgICAgICAgICAgIDA6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDIsXG4gICAgICAgICAgICAgICAgICAgIG5hdjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDYwMDoge1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogMyxcbiAgICAgICAgICAgICAgICAgICAgbmF2OiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxudmFyIGJyZWFkQ3J1bWJpZSA9IGZ1bmN0aW9uIGJyZWFkQ3J1bWJpZSgpIHtcbiAgICB2YXIgbGluazEgPSAkKCcuZGF0YS1iZCAubGluay0xJykudGV4dCgpO1xuICAgIHZhciBsaW5rMiA9ICQoJy5kYXRhLWJkIC5saW5rLTInKS50ZXh0KCk7XG5cbiAgICB2YXIgbm9tZTEgPSAkKCcuZGF0YS1iZCAudGV4dC0xJykudGV4dCgpO1xuICAgIHZhciBub21lMiA9ICQoJy5kYXRhLWJkIC50ZXh0LTInKS50ZXh0KCk7XG5cbiAgICAkKCcuYnJlYWQtY3J1bWIgdWwgbGkgLmJkLTEtbGluaycpLmF0dHIoJ2hyZWYnLCBsaW5rMSk7XG4gICAgJCgnLmJyZWFkLWNydW1iIHVsIGxpIC5iZC0yLWxpbmsnKS5hdHRyKCdocmVmJywgbGluazIpO1xuICAgICQoJy5icmVhZC1jcnVtYiB1bCBsaSAuYmQtMS1saW5rJykudGV4dChub21lMSk7XG4gICAgJCgnLmJyZWFkLWNydW1iIHVsIGxpIC5iZC0yLWxpbmsnKS50ZXh0KG5vbWUyKTtcbn07XG5cbnZhciBjaGFuZ2VUb0Rlc2t0b3BJbWFnZSA9IGZ1bmN0aW9uIGNoYW5nZVRvRGVza3RvcEltYWdlKCkge1xuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgaWYgKCR3aW5kb3cgPj0gOTQwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCR3aW5kb3cpO1xuICAgICAgICAkKFwiaHRtbFwiKS5hZGRDbGFzcyhcInNob3ctaW1hZ2VtLWRlc2t0b3BcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJzaG93LWltYWdlbS1kZXNrdG9wXCIpO1xuICAgIH1cbn07XG5cbnZhciBhcHBseVR3ZW50eSA9IGZ1bmN0aW9uIGFwcGx5VHdlbnR5KCkge1xuICAgICQoXCIudHdlbnR5dHdlbnR5LWNvbnRhaW5lclwiKS50d2VudHl0d2VudHkoe1xuICAgICAgICBkZWZhdWx0X29mZnNldF9wY3Q6IDAuNjksXG4gICAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgIG5vX292ZXJsYXk6IGZhbHNlXG4gICAgfSk7XG59O1xudmFyIG9uUmVzaXplID0gZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgJCh3aW5kb3cpLnJlc2l6ZShjaGFuZ2VUb0Rlc2t0b3BJbWFnZSk7XG59O1xudmFyIHNsaWNrQ2Fyb3VzZWwgPSBmdW5jdGlvbiBzbGlja0Nhcm91c2VsKCkge1xuICAgICQoJy5zbGljay13cmFwcGVyJykuc2xpY2soe1xuICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMHB4JyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW3tcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMwMDAsXG4gICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzBweCcsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMHB4JyxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICB9KTtcbn07XG5cbnZhciBzdGFydFNwZWNpYWxQYWdlID0gZnVuY3Rpb24gc3RhcnRTcGVjaWFsUGFnZSgpIHtcbiAgICBkYW1uWW91SUUoKTtcbiAgICBzZXRPdmVybGF5KCk7XG4gICAgc2V0TGlnaHRib3goKTtcbiAgICBzZXRWaWRlb1VSTCgpO1xuICAgIGlmIChzZXRWaWRlb3MoKSkge1xuICAgICAgICB5dFBsYXllci5pbml0KCk7XG4gICAgfVxuICAgIHNldFRvcEJveFNldHRpbmdzKCk7XG4gICAgc2V0UGFuZWxzKCk7XG4gICAgc2V0QmFubmVyT24oKTtcbiAgICBpZiAoc2V0Q2Fyb3VzZWxFbGVtcygpKSB7XG4gICAgICAgIHNldENhcm91c2VsKCk7XG4gICAgfVxuICAgIHNldE1hbnVhbCgpO1xuICAgIHNldEludHJvTmF2QnRucygpO1xuICAgIHNldEJlZm9yZUFuZEFmdGVyUGljcygpO1xuICAgIGZpeENhcm91c2VsTmF2aWdhdGlvbigpO1xuICAgIHNldFBhbmVsUGljT24oKTtcbiAgICBjYXJvdXNlbE1vYmlsZSgpO1xuICAgIGJyZWFkQ3J1bWJpZSgpO1xuICAgIGNoYW5nZVRvRGVza3RvcEltYWdlKCk7XG4gICAgLy9hcHBseVR3ZW50eSgpO1xuICAgIHNsaWNrQ2Fyb3VzZWwoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcudHdlbnR5dHdlbnR5LWNvbnRhaW5lcicpLnR3ZW50eXR3ZW50eSgpO1xufSk7XG5cbiQoc3RhcnRTcGVjaWFsUGFnZSk7XG4kKHdpbmRvdykubG9hZChvblJlc2l6ZSk7Il19
},{}]},{},[1])