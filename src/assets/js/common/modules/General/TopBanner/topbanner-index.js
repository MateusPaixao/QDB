import Global from '../../../global/global-index';
import CacheSelector from '../cache-selector'

const Methods = {
    init() {
        if (document.querySelector('.w-counter-copy') != null) {
            Methods.copiarTopBanner();
        }
        if (document.querySelector('.w-counter') != null) {
            CacheSelector.$globals.body.classList.add('has--topbanner')
            if (Global.BrowserVendor() == 'safari/webkit') {
                setTimeout(() => {
                    Methods.homeCountDown();
                }, 3000);
            } else {
                Methods.homeCountDown();
            }
            // $('.w-counter--slick').slick();
        }
    },
    homeCountDown() {
        const corBg = document.querySelector('.w-counter--bg').textContent;
        document.querySelector('.w-counter').style.backgroundColor = corBg;

        if (document.querySelector('.w-counter--container') != null) {
            let bar = document.createElement("span");
            bar.classList.add("w-counter--container--counterbar")
            let fill = document.createElement("span");
            fill.classList.add("w-counter--bar");
            document.querySelector(".w-counter--container").appendChild(bar);
            document.querySelector(".w-counter--container--counterbar").appendChild(fill);
            document.querySelector(".w-counter--container--counterbar").style.backgroundColor = corBg;

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
            const _day = _hour * 24;
            let clock = 0;

            function showRemaining() {
                let now = new Date();
                let distance = end - now;

                if (distance <= 0) {
                    clearInterval(clock);
                    document.querySelector('.w-counter--container').classList.add('hidden')
                    if (document.querySelector('.w-counter--cupom') != null) {
                        document.querySelector('.w-counter--cupom').classList.remove('hidden')
                        document.querySelector('.w-counter-copy').classList.remove('hidden')
                    }
                    return;
                }
                let days = Math.floor(distance / _day);
                let hours = Math.floor(distance / 36e5);
                let minutes = Math.floor((distance % _hour) / _minute);
                let seconds = Math.floor((distance % _minute) / _second);

                // let dayCounter = document.querySelector('.w-counter--day');
                let hourCounter = document.querySelector('.w-counter--hour');
                let minuteCounter = document.querySelector('.w-counter--minutes');
                let secondsCounter = document.querySelector('.w-counter--seconds');
                const diasText = document.querySelector('.w-counter--info')

                let width = now.getTime() / end.getTime() * 100;
                document.querySelector(".w-counter--bar").style.width = width + "%";

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
        const btnCopy = document.querySelector('.w-counter-copy');
        const cupomToCopy = document.querySelector('.w-counter--cupom');
        btnCopy.addEventListener('click', function (e) {
            e.preventDefault;
            cupomToCopy.select()
            document.execCommand('copy');
            btnCopy.textContent = "COPIADO";
            btnCopy.classList.add("btn-success");
            setTimeout(() => {
                btnCopy.textContent = "COPIAR";
                btnCopy.classList.remove("btn-success");
            }, 3000);
        })
    }
}

export default {
    init: Methods.init
}