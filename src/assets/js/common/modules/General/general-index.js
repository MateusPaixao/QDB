import Vitrine from "./Vitrine/VitrineContainer.jsx"
import Region from "./Regional/PriceContainer.jsx"
// import { Builder } from "node-vibrant";

const Methods = {
    init(){
        // Vitrine.init
        Methods.Region();
        Methods.ServiceWorker();
        Methods.isInViewport();
    },

    Vitrine(collection, slider, itemsPerPage){
        Vitrine.build(collection, slider, itemsPerPage);
    },

    isInViewport: () => {
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