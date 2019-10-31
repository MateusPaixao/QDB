import 'whatwg-fetch'

export function getiPhoneModel() {
    // Create a canvas element which can be used to retrieve information about the GPU.
    var canvas = document.createElement("canvas");
    if (canvas) {
        var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (context) {
            var info = context.getExtension("WEBGL_debug_renderer_info");
            if (info) {
                var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
                console.log('GPU DEVICE: ', renderer);
            }
        }
    }

    // iPhone X
    if ((window.screen.height / window.screen.width == 812 / 375) && (window.devicePixelRatio == 3)) {
        document.body.classList.add('iphone');
        return "iPhone X";
        // iPhone 6+/6s+/7+ and 8+
    } else if ((window.screen.height / window.screen.width == 736 / 414) && (window.devicePixelRatio == 3)) {
        switch (renderer) {
            default:
                return "iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus";
            case "Apple A8 GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone 6 Plus";
            case "Apple A9 GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone 6s Plus";
            case "Apple A10 GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone 7 Plus";
            case "Apple A11 GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone 8 Plus";
            case "Apple GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone Default";
        }
        // iPhone 6+/6s+/7+ and 8+ in zoom mode
    } else if ((window.screen.height / window.screen.width == 667 / 375) && (window.devicePixelRatio == 3)) {
        switch (renderer) {
            default:
                return "iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus (display zoom)";
            case "Apple A8 GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone 6 Plus (display zoom)";
            case "Apple A9 GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone 6s Plus (display zoom)";
            case "Apple A10 GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone 7 Plus (display zoom)";
            case "Apple A11 GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone 8 Plus (display zoom)";
            case "Apple GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone Default";
        }
        // iPhone 6/6s/7 and 8
    } else if ((window.screen.height / window.screen.width == 667 / 375) && (window.devicePixelRatio == 2)) {
        switch (renderer) {
            default:
                return "iPhone 6, 6s, 7 or 8";
            case "Apple A8 GPU":
                return "iPhone 6";
            case "Apple A9 GPU":
                document.body.classList.add('iphone');
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                return "iPhone 6s";
            case "Apple A10 GPU":
                document.body.classList.add('iphone');
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                return "iPhone 7";
            case "Apple A11 GPU":
                document.body.classList.add('iphone');
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                return "iPhone 8";
            case "Apple GPU":
                window.onload = () => {
                    window.scrollBy(0, 1);
                }
                document.body.classList.add('iphone');
                return "iPhone Default";
        }
        // iPhone 5/5C/5s/SE or 6/6s/7 and 8 in zoom mode
    } else if ((window.screen.height / window.screen.width == 1.775) && (window.devicePixelRatio == 2)) {
        switch (renderer) {
            default:
                // window.onload = () => {
                //     window.scrollBy(0, 1);
                // }
                // document.body.classList.add('iphone');
                return "iPhone 5, 5C, 5S, SE or 6, 6s, 7 and 8 (display zoom)";
            case "PowerVR SGX 543":
                return "iPhone 5 or 5c";
            case "Apple A7 GPU":
                return "iPhone 5s";
            case "Apple A8 GPU":
                return "iPhone 6 (display zoom)";
            case "Apple A9 GPU":
                return "iPhone SE or 6s (display zoom)";
            case "Apple A10 GPU":
                return "iPhone 7 (display zoom)";
            case "Apple A11 GPU":
                return "iPhone 8 (display zoom)";
        }
        // iPhone 4/4s
    } else if ((window.screen.height / window.screen.width == 1.5) && (window.devicePixelRatio == 2)) {
        switch (renderer) {
            default:
                return "iPhone 4 or 4s";
            case "PowerVR SGX 535":
                return "iPhone 4";
            case "PowerVR SGX 543":
                return "iPhone 4s";
        }
        // iPhone 1/3G/3GS
    } else if ((window.screen.height / window.screen.width == 1.5) && (window.devicePixelRatio == 1)) {
        switch (renderer) {
            default:
                return "iPhone 1, 3G or 3GS";
            case "ALP0298C05":
                return "iPhone 3GS";
            case "S5L8900":
                return "iPhone 1, 3G";
        }
    } else {
        return "Not an iPhone";
    }
}
export function verifyIos() {

    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // Get the device pixel ratio
    var ratio = window.devicePixelRatio || 1;
    // Define the users device screen dimensions
    var screen = {
        width: window.screen.width * ratio,
        height: window.screen.height * ratio
    };
    // iPhone 6s, 7S, 8S Detection
    if (iOS && screen.height == 2001 && screen.height === 1125) {
        document.querySelector("body").classList.add('iphone');
        window.onload = () => {
            window.scrollBy(0, 1);
        }
    }
    // iPhone X Detection
    if (iOS && screen.width == 1125 && screen.height === 2436) {
        document.querySelector("body").classList.add('iphone');
        window.onload = () => {
            window.scrollBy(0, 1);
        }
    }
}
export function getBrowserVendor() {
    let BrowserVendor;
    if (navigator.vendor.match(/google/i)) {
        BrowserVendor = 'chrome/blink';
    } else if (navigator.vendor.match(/apple/i)) {
        BrowserVendor = 'safari/webkit';
    } else if (navigator.userAgent.match(/firefox\//i)) {
        BrowserVendor = 'firefox/gecko';
    } else if (navigator.userAgent.match(/edge\//i)) {
        BrowserVendor = 'edge/edgehtml';
    } else if (navigator.userAgent.match(/trident\//i)) {
        BrowserVendor = 'ie/trident';
    } else {
        BrowserVendor = navigator.userAgent + "\n" + navigator.vendor;
    }
    return BrowserVendor;
}
export function Polyfill() {
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (predicate) {
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

    if (!Object.entries)
        Object.entries = function (obj) {
            var ownProps = Object.keys(obj),
                i = ownProps.length,
                resArray = new Array(i); // preallocate the Array
            while (i--)
                resArray[i] = [ownProps[i], obj[ownProps[i]]];

            return resArray;
        };
}
export function isInViewport() {
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
        for (let i = 0; i < document.querySelectorAll('source, img').length; i++) {
            loadImage(document.querySelectorAll('source, img')[i]);
        }
    }

    function loadImage(image) {
        // image.classList.add('fade-in');
        if (image.dataset && image.dataset.src) {
            image.src = image.dataset.src;
        }

        if (image.dataset && image.dataset.img) {
            image.src = image.dataset.img;
        }

        if (image.dataset && image.dataset.srcset) {
            image.srcset = image.dataset.srcset;
        }
    }
}
export function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}
export function setVitrineDataImg() {
    function setImg(){
        for(var i = 0; i < document.querySelectorAll(".imgsrc").length; i++){
            var imgSource = document.querySelectorAll(".imgsrc")[i].innerHTML;
            var imgSrc = imgSource.substring(
                        imgSource.lastIndexOf('src="') + 5, 
                        imgSource.lastIndexOf('?v=')
                    );
            document.querySelectorAll(".imgsrc")[i].nextSibling.nextSibling.setAttribute('data-src', imgSrc);
        }
    }
    // loadImg = function() {
    //     setImg();
    //     var imginview = getAllElementsWithAttribute('data-img');
    //     for(var i=0; i < imginview.length; i++){
    //         imginview[i].src = imginview[i].dataset.img;
    //     }
    //     var ievitrineimg = document.querySelectorAll(".product .product-image img");
    //     for(var i=0; i < ievitrineimg.length; i++){
    //         ievitrineimg[i].style.left = 0;
    //         ievitrineimg[i].style.position = "relative";
    //         ievitrineimg[i].style.transform = "none";
    //         document.querySelectorAll(".product p, .product .product-content h2, .product .product-content h3")[i].style.height = "initial";
    //     }
    // };
    window.onmousemove = function () {
        setImg();
    };
    window.onscroll = function (){
        setImg();
    }

    // Solução para IOS
    // $(document).on("scrollstop",function(){
    //     setImg();
    // });
    // $('body').on({
    //     'touchmove': function() { 
    //         setImg();
    //     }
    // });
}
