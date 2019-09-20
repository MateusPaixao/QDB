var setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
var getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
var lightOffCookie = function () {
    if (getCookie('lightoff') == "true") {
        $('html').addClass('_light-off');
    }
    return true;
};
var contrastButton = function () {
    var _li = $('li.menu-lightoff');
    _li
        .not('.lightoffActive')
        .on('click', function () {
            if (!$('html').hasClass('_light-off')) {
                $('html').addClass('_light-off');
                setCookie('lightoff', true, 1);
            } else {
                $('html').removeClass('_light-off');
                setCookie('lightoff', false, 0);
            }
        })
        .addClass('lightoffActive');
    return true;
};
var lightOff = function () {
    if (/lightoff/.test(document.location.search) || getCookie('lightoff') == 'true') {
        $('html').addClass('_light-off');
        $('li.menu-lightoff').addClass('lightoffActive');
        setCookie('lightoff', true, 1);
    }
};

// HAND TALK
var cookieHandOn = function () {
    setCookie('HandTalkBox', 1, 1);
    dataLayer.push({
        event: 'HandTalkBox'
    });
};
var cookieHandOff = function () {
    setCookie('HandTalkBox', 2, 1);
};
export var startAcessibilidade = function () {
    lightOffCookie();
    lightOff();
    contrastButton();
    $('.__hand-talk a').on('click', function () {
        $(".__hand-talk a").removeClass('activeHand');
        $(this).addClass('activeHand');
        var idHand = $(this).attr('id');
        if (idHand == '__enable-hand') {
            cookieHandOn();
        } else {
            cookieHandOff();
            $('.ht-right').hide();
        }
    });
};

$(startAcessibilidade);
