import Vitrine from "./Vitrine/VitrineContainer.jsx"
import Region from "./Regional/PriceContainer.jsx"
// import { Builder } from "node-vibrant";

const Methods = {
    init(){
        // Vitrine.init
        Methods.Region();
        Methods.ServiceWorker();
    },
    Vitrine(collection, slider){
        Vitrine.build(collection, slider);
    },
    Region(){
        Region.init();

        document.querySelector(".--openRegiao").addEventListener("click", () => {
            document.querySelector(".modalRegional").classList.remove("hidden");
        });
        document.querySelector(".modalRegional__overlay").addEventListener("click", () => {
            document.querySelector(".modalRegional").classList.add("hidden");
        });
    },
    ServiceWorker(){
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/files/service-worker.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
    }
}

export default {
    init: Methods.init,
    vitrine: Methods.Vitrine
}