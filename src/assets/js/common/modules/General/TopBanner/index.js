// import Global from '../../../global/global-index';
import CacheSelector from '../cache-selector';
import { getBrowserVendor } from '../../../global/global-index';
import Siema from 'siema';

const Methods = {
  init() {
    if (document.querySelector('.w-counter-copy') != null) {
      Methods.copiarTopBanner();
    }
    if (document.querySelector('.w-counter') != null) {
      CacheSelector.$globals.body.classList.add('has--topbanner');
      if (getBrowserVendor() == 'safari/webkit') {
        setTimeout(() => {
          Methods.homeCountDown();
        }, 3000);
      } else {
        Methods.homeCountDown();
      }
      // $('.w-counter--slick').slick();
    }
    Methods.flip();
  },
  homeCountDown() {
    const corBg = document.querySelector('.w-counter--bg').textContent;
    document.querySelector('.w-counter').style.backgroundColor = corBg;

    if (document.querySelector('.w-counter--container') != null) {
      let bar = document.createElement('span');
      bar.classList.add('w-counter--container--counterbar');
      let fill = document.createElement('span');
      fill.classList.add('w-counter--bar');
      document.querySelector('.w-counter--container').appendChild(bar);
      document.querySelector('.w-counter--container--counterbar').appendChild(fill);
      document.querySelector('.w-counter--container--counterbar').style.backgroundColor = corBg;

      document.querySelector('.w-counter--container').classList.remove('hide-important');
      let dateFim = document.querySelector('.w-counter--end').textContent;
      dateFim = dateFim.split('/');
      dateFim[2] = dateFim[2].split(' ');
      dateFim = `${dateFim[2][0]}/${dateFim[0]}/${dateFim[1]} ${dateFim[2][1]}`;
      // console.log(dateFim);
      const end = new Date(dateFim);

      const _second = 1000;
      const _minute = _second * 60;
      const _hour = _minute * 60;
      //   const _day = _hour * 24;
      let clock = 0;

      function showRemaining() {
        let now = new Date();
        let distance = end - now;

        if (distance <= 0) {
          clearInterval(clock);
          document.querySelector('.w-counter--container').classList.add('hidden');
          if (document.querySelector('.w-counter--cupom') != null) {
            document.querySelector('.w-counter--cupom').classList.remove('hidden');
            document.querySelector('.w-counter-copy').classList.remove('hidden');
          }
          return;
        }
        // let days = Math.floor(distance / _day);
        let hours = Math.floor(distance / 36e5);
        let minutes = Math.floor((distance % _hour) / _minute);
        let seconds = Math.floor((distance % _minute) / _second);

        // let dayCounter = document.querySelector('.w-counter--day');
        let hourCounter = document.querySelector('.w-counter--hour');
        let minuteCounter = document.querySelector('.w-counter--minutes');
        let secondsCounter = document.querySelector('.w-counter--seconds');
        // const diasText = document.querySelector('.w-counter--info');

        let width = (now.getTime() / end.getTime()) * 100;
        document.querySelector('.w-counter--bar').style.width = width + '%';

        // dayCounter.innerHTML = days;
        // diasText.textContent = days == 1 ? 'dia' : 'dias';
        hourCounter.innerHTML = hours < 10 ? '0' + hours : hours;
        minuteCounter.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        secondsCounter.innerHTML = seconds < 10 ? '0' + seconds : seconds;
      }

      clock = setInterval(showRemaining, 1000);
    }
  },
  copiarTopBanner() {
    const btnCopy = document.querySelectorAll('.w-counter-copy');
    btnCopy.forEach(btn => {
      const cupomToCopy = btn.previousSibling.previousSibling;
      btn.addEventListener('click', function(e) {
        e.preventDefault;
        cupomToCopy.select();
        document.execCommand('copy');
        btn.textContent = 'COPIADO';
        btn.classList.add('btn-success');
        setTimeout(() => {
          btn.textContent = 'COPIAR';
          btn.classList.remove('btn-success');
        }, 3000);
      });
    });
  },
  flip() {
    const flipContainer = document.querySelector('.flip');
    const flipBanner = document.querySelector('.flip-banner');

    flipContainer.childElementCount > 0 ? flipBanner.classList.add('is--active') : null;

    function startFlip() {
      const flip = new Siema({
        selector: '.flip',
        duration: 300,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: false,
        rtl: false,
        onChange: clearAutoplay
      });
      const next = document.querySelector('.siemaNext');
      const prev = document.querySelector('.siemaPrev');

      next.addEventListener('click', () => {
        clearInterval(autoplay);
        flip.currentSlide == flip.innerElements.length - 1 ? flip.goTo(0) : flip.next();
      });
      prev.addEventListener('click', () => {
        clearInterval(autoplay);
        flip.currentSlide == 0 ? flip.goTo(flip.innerElements.length - 1) : flip.prev();
      });

      let autoplay = setInterval(function() {
        flip.currentSlide == flip.innerElements.length - 1 ? flip.goTo(0) : flip.next();
      }, 4000);

      function clearAutoplay() {
        clearInterval(autoplay);
        autoplay = setInterval(function() {
          flip.currentSlide == flip.innerElements.length - 1 ? flip.goTo(0) : flip.next();
        }, 4000);
      }
    }
    function hideArrows() {
      const next = document.querySelector('.siemaNext');
      const prev = document.querySelector('.siemaPrev');

      next.classList.add('hidden');
      prev.classList.add('hidden');
    }
    flipContainer.childElementCount > 1 ? startFlip() : hideArrows();
  }
};

export default {
  init: Methods.init
};
