import CacheSelector from '../cache-selector';
import { getiPhoneModel } from '../../../global/global-index';
import { TweenLite } from 'gsap';

const Methods = {
  init() {
    Methods.openCloseMenu();
    Methods.closeMenu();
    Methods.scrollDownOnLoad();
    Methods.observeScroll();
    Methods.setActiveAccordion();
    Methods.updateNumberMinicart();
    Methods.isLogged();
    Methods.marginTopMenuHeight();
    Methods.SVGHoverEffect();
    getiPhoneModel();
  },

  scrollDownOnLoad() {
    if (window.location.pathname.includes('p/p') && window.innerWidth < 768) {
      document.querySelector('body').classList.add('scrollDown');
    }
  },

  SVGHoverEffect() {
    function toBase64(url, callback) {
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL('image/png');
        callback(dataURL);
        canvas = null;
      };

      img.src = url;
    }

    var xlink = 'http://www.w3.org/1999/xlink';
    var imgUrl = '/arquivos/ripple.png';

    toBase64(imgUrl, function(data) {
      var isSafari = /constructor/i.test(window.HTMLElement);
      var isFF = !!navigator.userAgent.match(/firefox/i);

      if (isSafari == true) {
        document.querySelector('body').classList.add('safari');
      }

      var bt = document.querySelector('#btnAqua');
      var turb = document.querySelector('#filter-ripple-1 feImage');
      var dm = document.querySelector('#filter-ripple-1 feDisplacementMap');

      turb.setAttributeNS(xlink, 'href', data);

      setInterval(() => {
        TweenLite.set(turb, {
          attr: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          }
        });
        TweenLite.to(turb, 3, { attr: { x: '-=300', y: '-=300', width: 600, height: 600 } });
        TweenLite.fromTo(dm, 2, { attr: { scale: 30 } }, { attr: { scale: 0 } });
      }, 10000);

      bt.addEventListener('mouseover', function(e) {
        console.log('Yau');
        TweenLite.set(turb, {
          attr: {
            x: isFF ? e.offsetX : e.offsetX + 10,
            y: isFF ? e.offsetY : e.offsetY + 10,
            width: 0,
            height: 0
          }
        });
        TweenLite.to(turb, 3, { attr: { x: '-=300', y: '-=300', width: 600, height: 600 } });
        TweenLite.fromTo(dm, 2, { attr: { scale: 30 } }, { attr: { scale: 0 } });
      });
    });
  },
  // SVGHoverEffect() {
  //   var bt = document.querySelectorAll('#btnAqua')[0];
  //   var turbVal = { val: 0.000001 };
  //   var turb = document.querySelectorAll('#filter-glitch-3 feTurbulence')[0];
  //   var btTl = new TimelineLite({
  //     paused: true,
  //     onUpdate: function() {
  //       turb.setAttribute('baseFrequency', '0.00001 ' + turbVal.val); // Firefox bug is value is 0
  //     },
  //     onStart: function() {
  //       bt.style.filter = 'url(#filter-glitch-3)';
  //     },
  //     onComplete: function() {
  //       bt.style.filter = 'none';
  //     }
  //   });

  //   btTl.to(turbVal, 0.4, { val: 0.4 });
  //   btTl.to(turbVal, 0.2, { val: 0.000001 });

  //   bt.addEventListener('click', function() {
  //     btTl.restart();
  //   });
  // },

  marginTopMenuHeight() {
    setTimeout(function() {
      const header = CacheSelector.header.header;
      const elementToMargin = CacheSelector.$globals.body;
      let headerHeight = header.offsetHeight;
      elementToMargin.style.marginTop = `${headerHeight}px`;
      window.addEventListener('scroll', function() {
        headerHeight = header.offsetHeight;
        elementToMargin.style.marginTop = `${headerHeight}px`;
      });
    }, 1000);
  },
  openCloseMenu() {
    CacheSelector.header.menuHamContainer.addEventListener('click', el => {
      if (
        el.target == CacheSelector.header.menuHamContainer ||
        el.target == CacheSelector.header.menuHamText
      ) {
        el.preventDefault;
        CacheSelector.header.menuHam.classList.add('is--active');
        CacheSelector.header.menuList.classList.remove('js--menu-close');
        CacheSelector.$globals.body.classList.add('menu--open');
        el.target.classList.add('is--active');
        el.stopPropagation;
      }
    });
  },

  closeMenu() {
    CacheSelector.header.menuClose.addEventListener('click', () => {
      CacheSelector.header.menuHam.classList.remove('is--active');
      CacheSelector.header.menuList.classList.add('js--menu-close');
      CacheSelector.$globals.body.classList.remove('menu--open');
    });
    CacheSelector.header.overlay.addEventListener('click', () => {
      CacheSelector.header.menuHam.classList.remove('is--active');
      CacheSelector.header.menuList.classList.add('js--menu-close');
      CacheSelector.$globals.body.classList.remove('menu--open');
    });
  },

  observeScroll() {
    window.addEventListener('scroll', function() {
      const body = CacheSelector.$globals.body;

      if (!window.location.pathname.includes('p/p')) {
        if (window.innerWidth < 768) {
          window.scrollY < 200
            ? body.classList.remove('scrollDown')
            : body.classList.add('scrollDown');
        } else {
          this.oldScroll > this.scrollY
            ? body.classList.remove('scrollDown')
            : body.classList.add('scrollDown');
          this.oldScroll < 0 && body.classList.contains('scrollDown')
            ? body.classList.remove('scrollDown')
            : null;

          this.oldScroll = this.scrollY;

          return this.scrollY;
        }
      } else {
        if (window.innerWidth > 768) {
          this.oldScroll > this.scrollY
            ? body.classList.remove('scrollDown')
            : body.classList.add('scrollDown');
          this.oldScroll < 0 && body.classList.contains('scrollDown')
            ? body.classList.remove('scrollDown')
            : null;

          this.oldScroll = this.scrollY;

          return this.scrollY;
        }
      }
    });
  },

  setActiveAccordion() {
    const checkbox = document.querySelectorAll('.accordion-checkbox');
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].addEventListener('click', () => {
        checkbox[i].checked
          ? checkbox[i].parentElement.classList.add('is--open')
          : checkbox[i].parentElement.classList.remove('is--open');
      });
    }
  },

  updateNumberMinicart() {
    $(window).on('orderFormUpdated.vtex', function() {
      let itensInCart = document.querySelector('.minicart--itens');
      if (vtexjs.checkout.orderForm.items.length > 1) {
        document.querySelector('.__maskBag #wave').style.transform = `translate(-50px, -${635 +
          vtexjs.checkout.orderForm.items.length}px)`;
      }
      itensInCart.textContent = vtexjs.checkout.orderForm.items.length;
    });
  },

  isLogged() {
    const url = '/no-cache/profileSystem/getProfile';
    const userInfos = document.querySelector('.header__clube--text');
    fetch(url)
      .then(res => res.json())
      .then(log => {
        if (log.IsUserDefined) {
          log.FirstName != null
            ? (userInfos.innerHTML += `<p class="header__clube--name"> Olá, ${log.FirstName}</p>`)
            : (userInfos.innerHTML += `<p class="header__clube--name"> Olá!`);
          localStorage.getItem('saldoClube') != null
            ? (userInfos.innerHTML += `<p class="_saldoclube">Saldo Clube: <span class="_price">R$ <b>${localStorage.getItem(
                'saldoClube'
              )}</b></p>`)
            : '';
          // if(getCookie("saldoClube") != undefined){

          // }
        } else {
          userInfos.innerHTML = `<a class="header__clube--account" href="/account"> 
                        Entre ou cadastre-se
                    </a>`;
        }
      });
  }
};

export default {
  init: Methods.init
};

// window.setTimeout(function(){
//     var bodyClass = document.body.getAttribute('class');
//     document.body.setAttribute('class',bodyClass+' iphone');
// },3000);
