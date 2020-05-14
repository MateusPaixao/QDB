const Methods = {
  init() {
    Methods.lightOffCookie();
    Methods.lightOff();
    Methods.contrastButton();
    Methods.startAcessibilidade();
  },

  lightOffCookie() {
      const getCookie = (cname) => {
        var name = cname + '=';
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
        return '';
      }
    if (getCookie('lightoff') == 'true') {
      $('html').addClass('_light-off');
    }
    return true;
  },
  contrastButton() {
const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
},
    var _li = $('li.menu-lightoff');
    _li
      .not('.lightoffActive')
      .on('click', function() {
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
  },

  lightOff() {
    const getCookie = (cname) => {
      var name = cname + '=';
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
      return '';
    }
const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
},
    if (/lightoff/.test(document.location.search) || getCookie('lightoff') == 'true') {
      $('html').addClass('_light-off');
      $('li.menu-lightoff').addClass('lightoffActive');
      setCookie('lightoff', true, 1);
    }
  },

  cookieHandOn() {
    const getCookie = (cname) => {
      var name = cname + '=';
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
      return '';
    }
    setCookie('HandTalkBox', 1, 1);
    dataLayer.push({
      event: 'HandTalkBox'
    });
  },

  cookieHandOff() {
const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
    setCookie('HandTalkBox', 2, 1);
  },

  startAcessibilidade() {
    $('.__hand-talk a').on('click', function() {
      $('.__hand-talk a').removeClass('activeHand');
      $(this).addClass('activeHand');
      var idHand = $(this).attr('id');
      if (idHand == '__enable-hand') {
        Methods.cookieHandOn();
      } else {
        Methods.cookieHandOff();
        $('.ht-right').hide();
      }
    });
  }
};

export default {
  init: Methods.init
};
