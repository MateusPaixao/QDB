
import 'whatwg-fetch'

const Methods = {
    getBrowserVendor(){
        let BrowserVendor;
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
        else{
            BrowserVendor = navigator.userAgent + "\n" + navigator.vendor;
        }
        return BrowserVendor;
    },
    Polyfill(){
        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, 'find', {
              value: function(predicate) {
               // 1. Let O be ? ToObject(this value).
                if (this == null) {
                  throw new TypeError('"this" is null or not defined');
                }
          
                var o = Object(this);
          
                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;
          
                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                  throw new TypeError('predicate must be a function');
                }
          
                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];
          
                // 5. Let k be 0.
                var k = 0;
          
                // 6. Repeat, while k < len
                while (k < len) {
                  // a. Let Pk be ! ToString(k).
                  // b. Let kValue be ? Get(O, Pk).
                  // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                  // d. If testResult is true, return kValue.
                  var kValue = o[k];
                  if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                  }
                  // e. Increase k by 1.
                  k++;
                }
          
                // 7. Return undefined.
                return undefined;
              }
            });
          }
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
            for(let i = 0; i < document.querySelectorAll('source, img').length; i++){
                loadImage(document.querySelectorAll('source, img')[i]);
            }
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
    getCookie(name){
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }
}

export default {
    Polyfill: Methods.Polyfill,
    BrowserVendor: Methods.getBrowserVendor,
    isInViewport: Methods.isInViewport,
    GetCookie: Methods.getCookie
}