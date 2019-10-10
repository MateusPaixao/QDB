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
        Minicart.init();
        TopBanner.init();
        PriceContainer.init();
        Methods.ServiceWorker();
        Methods.Skeleton();
        isInViewport();
        Methods.SendNewsletter();
        if(getBrowserVendor == "ie/trident"){
            Polyfill();
        }
        // Acessibilidade.init();
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