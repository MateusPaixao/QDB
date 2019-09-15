import Vitrine from "./Vitrine/VitrineContainer.jsx"
// import Region from "./Regional/PriceContainer.jsx"
// import { Builder } from "node-vibrant";

const Methods = {
    init(){
        // Methods.Region();
        Methods.isInViewport();
        Methods.ServiceWorker();
    },

    Vitrine(idCollection, collection, slider, itemsPerPage){
        Vitrine.build(idCollection, collection, slider, itemsPerPage);
    },

    getBrowserVendor(){
        var BrowserVendor = "";
        if(navigator.vendor.match(/google/i)) {
            BrowserVendor = 'chrome/blink';
        }
        else if(navigator.vendor.match(/apple/i)) {
            BrowserVendor = 'safari/webkit';
        }
        else if(navigator.userAgent.match(/firefox\//i)) {
            BrowserVendor = 'firefox/gecko';
        }
        else if(navigator.userAgent.match(/edge\//i)) {
            BrowserVendor = 'edge/edgehtml';
        }
        else if(navigator.userAgent.match(/trident\//i)) {
            BrowserVendor = 'ie/trident';
        }
        else
        {
            BrowserVendor = navigator.userAgent + "\n" + navigator.vendor;
        }
        return BrowserVendor;
    },

    isInViewport(){
        let images = document.querySelectorAll('source, img');
        
        if ('IntersectionObserver' in window) {
            // IntersectionObserver Supported
            let config = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.5
                };
            
            let observer = new IntersectionObserver(onChange, config);
            images.forEach(img => observer.observe(img));
        
            function onChange(changes, observer) {
                changes.forEach(change => {
                if (change.intersectionRatio > 0) {
                    // Stop watching and load the image
                    loadImage(change.target);
                    observer.unobserve(change.target);
                }
                });
            }
        
        } else {
            // IntersectionObserver NOT Supported
            images.forEach(image => loadImage(image));
        }
        
        function loadImage(image) {
            // image.classList.add('fade-in');
            if(image.dataset && image.dataset.src) {
                image.src = image.dataset.src;
            }
            
            if(image.dataset && image.dataset.srcset) {
                image.srcset = image.dataset.srcset;
            }
        }
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
                navigator.serviceWorker.register('/files/service-worker.js', { scope: '/' }).then(function(registration) {
                // Registration was successful
                console.log('%cServiceWorker registration successful with scope:' + registration.scope + ' 💯', 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;');
                }, function(err) {
                // registration failed :(
                console.log('%cServiceWorker registration failed: ' + err + " 🥺🥺", 'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FC2626; color: #FDFDFD;');
                });
            });
        }
    }
}

export default {
    init: Methods.init,
    vitrine: Methods.Vitrine,
    getBrowserVendor: Methods.getBrowserVendor
}