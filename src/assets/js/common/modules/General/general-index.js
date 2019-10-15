// import Acessibilidade from './Acessibilidade/_acessibilidade-index';
import Header from "./Header/_header-index";
import Footer from "./Footer/_footer-index";
// import Global from "../../global/global-index"
import Minicart from './Minicart/_minicart-index';
import PriceContainer from "./Regional/PriceContainer.jsx";
import TopBanner from "./TopBanner/topbanner-index";
import {getCookie, getBrowserVendor, isInViewport,Polyfill} from "../../global/global-index";

const Methods = {
    init(){
        Footer.init();
        Header.init();
        TopBanner.init();
        PriceContainer.init();
        Methods.ServiceWorker();
        Methods.Skeleton();
        isInViewport();
        Methods.SendNewsletter();
        if(getBrowserVendor() == "ie/trident"){
            Polyfill();
        }
        Minicart.init();
        // Acessibilidade.init();
    },

    // Vitrine(idCollection, collection, slider, itemsPerPage){
    //     Vitrine.build(idCollection, collection, slider, itemsPerPage);
    // },
    Skeleton(){
        let skeleton = document.querySelectorAll(".set--skeleton");
        for(let i = 0; i < skeleton.length; i++){
            setTimeout(() => {
                skeleton[i].classList.remove("set--skeleton");
                skeleton[i].style.opacity = 0;
                setTimeout(() => {
                    skeleton[i].style.opacity = 1;
                }, 500);
            }, 3500);
        }
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
        let cookieSWExpiration = getCookie("SWExpiration");

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
    Accessibility(){
        // Refatorar
        $( document ).ready(function() { $(".__hand-talk").css("display", "block"); });
        var setCookie = function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        };
        var getCookie = function(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if(c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };
        var lightOffCookie = function () {
            if (getCookie('lightoff') == "true"){
                $('html').addClass('_light-off'); 
            }
            return true;
        };
        var contrastButton = function () {
            var _li = $('li.menu-lightoff');
            _li
            .not('.lightoffActive')
            .on('click', function () {
                if(!$('html').hasClass('_light-off')){
                    $('html').addClass('_light-off');
                    setCookie('lightoff', true, 1);
                }
                else {
                    $('html').removeClass('_light-off');
                    setCookie('lightoff', false, 0);
                }
            })
            .addClass('lightoffActive');
            return true;
        };
        var lightOff = function(){
            if(/lightoff/.test(document.location.search) || getCookie('lightoff') == 'true'){ 
                $('html').addClass('_light-off');
                $('li.menu-lightoff').addClass('lightoffActive');
                setCookie('lightoff', true, 1);
            }
        };
        
        // HAND TALK
        var cookieHandOn = function (){
            setCookie('HandTalkBox', 1, 1);
             dataLayer.push({event:'HandTalkBox'});
        };
        var cookieHandOff = function (){
            setCookie('HandTalkBox', 2, 1);
        };
        var startAcessibilidade = function () {
            lightOffCookie();
            lightOff();
            contrastButton();
            $('.__hand-talk a').on('click', function () {
                $(".__hand-talk a").removeClass('activeHand');
                $(this).addClass('activeHand');
                var idHand = $(this).attr('id');
                if(idHand == '__enable-hand'){
                    cookieHandOn();
                }else {
                    cookieHandOff();
                    $('.ht-right').hide();
                }
            });
        };
        $(startAcessibilidade);
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
    init: Methods.init
}