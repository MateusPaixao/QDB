// import Region from "./Regional/PriceContainer.jsx";
import Header from "./Header/_header-index";
import Minicart from './Minicart/_minicart-index';
// import Acessibilidade from './Acessibilidade/_acessibilidade-index';
import PriceContainer from "./Regional/PriceContainer.jsx";
import Global from "../../global/global-index"

const Methods = {
    init(){
        Header.init();
        Minicart.init();
        // Acessibilidade.init();
        PriceContainer.init();
        // Methods.Region();
        Methods.ServiceWorker();
        // Methods.General();
        Methods.TopBanner();
        Methods.Skeleton();
        Global.isInViewport();
        Methods.SendNewsletter();
        if(Global.BrowserVendor() == "ie/trident"){
            Global.Polyfill();
        }
    },

    // Vitrine(idCollection, collection, slider, itemsPerPage){
    //     Vitrine.build(idCollection, collection, slider, itemsPerPage);
    // },
    Skeleton(){
        document.querySelectorAll(".set--skeleton").forEach(function(skeleton){
            setTimeout(() => {
                skeleton.classList.remove("set--skeleton");
                skeleton.style.opacity = 0;
                setTimeout(() => {
                    skeleton.style.opacity = 1;
                }, 500);
            }, 3500);
        });
    },
    // Region(){
    //     Region.init();

    //     document.querySelector(".--openRegiao").addEventListener("click", () => {
    //         document.querySelector(".modalRegional").classList.remove("hidden");
    //     });
    //     document.querySelector(".modalRegional__overlay").addEventListener("click", () => {
    //         document.querySelector(".modalRegional").classList.add("hidden");
    //     });
    // },
    ServiceWorker(){
        const HOUR = 1000 * 60 * 30;
        const lessThanOneHourAgo = (date) => {
            const anHourAgo = Date.now() - HOUR;
            console.log(anHourAgo);
            console.log(date)
            return date > anHourAgo;
        }
        let cookieSWExpiration = Global.GetCookie("SWExpiration");

        if ('serviceWorker' in navigator) {
            if(cookieSWExpiration == undefined){
                document.cookie = "SWExpiration=" + (new Date().getTime() + HOUR);
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/files/service-worker.js', { scope: '/' }).then(function(registration) {
                    // Registration was successful
                    console.log('%cServiceWorker registration successful with scope:' + registration.scope + ' 💯', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;');
                    }, function(err) {
                    // registration failed :(
                    console.log('%cServiceWorker registration failed: ' + err + " 🥺🥺", 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FC2626; color: #FDFDFD;');
                    });
                });
            }else if(!lessThanOneHourAgo(cookieSWExpiration)){
                document.cookie = "SWExpiration=" + (new Date().getTime() + HOUR);
                caches.delete('dynamicCache').then(function(boolean) {
                    console.log('%cDeleted dynamicCache', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;');
                });
                caches.delete('staticCache').then(function(boolean) {
                    console.log('%cDeleted staticCache', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;');
                });
                navigator.serviceWorker.register('/files/service-worker.js', { scope: '/' }).then(function(registration) {
                    registration.update();
                    console.log('%cUpdated Service Worker', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#09DDED; color: #FDFDFD;');
                });
            }else{
                console.log("%cClient is under cache of Service Worker 💯", 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;');
            }
        }
    },
    TopBanner(){
        function homeCountDown(){
            const corBg = document.querySelector('.w-counter--bg').textContent; 
            document.querySelector('.w-counter').style.backgroundColor = corBg;

            
            if(document.querySelector('.w-counter--container') != null){
                // COUNTERBAR
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
                        if(document.querySelector('.w-counter--cupom') != null){
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
        };
        function copiarTopBanner() {
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


        setTimeout(function() {
            if(document.querySelector('.w-counter-copy') != null){
                copiarTopBanner();
            }
            if(document.querySelector('.w-counter') != null){
                if(Global.BrowserVendor() == 'safari/webkit'){
                    setTimeout(() => {
                        homeCountDown();
                    }, 3000);
                }
                else{
                    homeCountDown();
                }
                // $('.w-counter--slick').slick();
            }
        }, 500);
    },
    SendNewsletter(){
        window.onload = function sendNLForm() {
            //Form newsleter
            var btn = document.querySelector('#nl_form #submit_button');    
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                //get data 2019-09-17 15:42:31
                var date = new Date();
                var year = `${date.getFullYear()}`;
                var month = `${(date.getMonth()<=10?'0':'')}` + `${date.getMonth()+1}`;
                var day = `${(date.getDate()<10?'0':'')}` + `${date.getDate()}`;
                var hours = `${(date.getHours()<10?'0':'')}` + `${date.getHours()}`;
                var minutes = `${(date.getMinutes()<10?'0':'')}` + `${date.getMinutes()}`;
                var seconds = `${(date.getSeconds()<10?'0':'')}` + `${date.getSeconds()}`;
                var fullDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                var jsonData = JSON.stringify({
                    'origin': 'ECOMM',
                    'campaign': 'NEWSLETTER',
                    'date': fullDate,
                    'name': null,
                    'email': document.querySelector('#nl_email').value,
                    'acceptEmail': true
                });
                
                //set form validation
                var filtroEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                var validUser = document.querySelector("input[name='validation-field']").value == 0;
                var validEmail =  filtroEmail.test(document.querySelector('#nl_email').value);
        
                if (validEmail && validUser) {
                    var XHR = new XMLHttpRequest();
                    // XHR.open('POST', '//api.vtexcrm.com.br/' + jsnomeLoja + '/dataentities/PS/documents');
                    XHR.open('POST', '/api/dataentities/PS/documents', true);
                    // Add the required HTTP header
                    XHR.setRequestHeader('accept', 'application/vnd.vtex.ds.v10+json');
                    XHR.setRequestHeader('content-type', 'application/json');
                    XHR.send(jsonData);
                    //successful
                    XHR.addEventListener('load', function (event) {
                        document.querySelector('#nl_form .form-success').style.display = 'block';
                        document.querySelector('#nl_form .form-controls').remove();
                        document.querySelector('#nl_form #submit_button').remove();
                    });
                    //error
                    XHR.addEventListener('error', function (event) {
                        document.querySelector('#nl_form .form-error').style.display = 'block';
                    });
                }
            });
        }
    }
}

export default {
    init: Methods.init,
    vitrine: Methods.Vitrine
}