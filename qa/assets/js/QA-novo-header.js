!function o(i,a,s){function c(n,e){if(!a[n]){if(!i[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);throw new Error("Cannot find module '"+n+"'")}var r=a[n]={exports:{}};i[n][0].call(r.exports,function(e){var t=i[n][1][e];return c(t||e)},r,r.exports,o,i,a,s)}return a[n].exports}for(var l="function"==typeof require&&require,e=0;e<s.length;e++)c(s[e]);return c}({1:[function(e,t,n){var r,o;r=this,o=function(s){"use strict";var t="URLSearchParams"in self,n="Symbol"in self&&"iterator"in Symbol,c="FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),r="FormData"in self,o="ArrayBuffer"in self;if(o)var i=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],a=ArrayBuffer.isView||function(e){return e&&-1<i.indexOf(Object.prototype.toString.call(e))};function l(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function u(e){return"string"!=typeof e&&(e=String(e)),e}function e(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return n&&(e[Symbol.iterator]=function(){return e}),e}function d(t){this.map={},t instanceof d?t.forEach(function(e,t){this.append(t,e)},this):Array.isArray(t)?t.forEach(function(e){this.append(e[0],e[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function f(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function p(n){return new Promise(function(e,t){n.onload=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function m(e){var t=new FileReader,n=p(t);return t.readAsArrayBuffer(e),n}function h(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function y(){return this.bodyUsed=!1,this._initBody=function(e){(this._bodyInit=e)?"string"==typeof e?this._bodyText=e:c&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:r&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:t&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():o&&c&&function(e){return e&&DataView.prototype.isPrototypeOf(e)}(e)?(this._bodyArrayBuffer=h(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):o&&(ArrayBuffer.prototype.isPrototypeOf(e)||a(e))?this._bodyArrayBuffer=h(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},c&&(this.blob=function(){var e=f(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?f(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(m)}),this.text=function(){var e=f(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,n=p(t);return t.readAsText(e),n}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},r&&(this.formData=function(){return this.text().then(b)}),this.json=function(){return this.text().then(JSON.parse)},this}d.prototype.append=function(e,t){e=l(e),t=u(t);var n=this.map[e];this.map[e]=n?n+", "+t:t},d.prototype.delete=function(e){delete this.map[l(e)]},d.prototype.get=function(e){return e=l(e),this.has(e)?this.map[e]:null},d.prototype.has=function(e){return this.map.hasOwnProperty(l(e))},d.prototype.set=function(e,t){this.map[l(e)]=u(t)},d.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},d.prototype.keys=function(){var n=[];return this.forEach(function(e,t){n.push(t)}),e(n)},d.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),e(t)},d.prototype.entries=function(){var n=[];return this.forEach(function(e,t){n.push([t,e])}),e(n)},n&&(d.prototype[Symbol.iterator]=d.prototype.entries);var v=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function g(e,t){var n=(t=t||{}).body;if(e instanceof g){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new d(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,n||null==e._bodyInit||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new d(t.headers)),this.method=function(e){var t=e.toUpperCase();return-1<v.indexOf(t)?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function b(e){var o=new FormData;return e.trim().split("&").forEach(function(e){if(e){var t=e.split("="),n=t.shift().replace(/\+/g," "),r=t.join("=").replace(/\+/g," ");o.append(decodeURIComponent(n),decodeURIComponent(r))}}),o}function _(e,t){t=t||{},this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new d(t.headers),this.url=t.url||"",this._initBody(e)}g.prototype.clone=function(){return new g(this,{body:this._bodyInit})},y.call(g.prototype),y.call(_.prototype),_.prototype.clone=function(){return new _(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),url:this.url})},_.error=function(){var e=new _(null,{status:0,statusText:""});return e.type="error",e};var w=[301,302,303,307,308];_.redirect=function(e,t){if(-1===w.indexOf(t))throw new RangeError("Invalid status code");return new _(null,{status:t,headers:{location:e}})},s.DOMException=self.DOMException;try{new s.DOMException}catch(e){s.DOMException=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack},s.DOMException.prototype=Object.create(Error.prototype),s.DOMException.prototype.constructor=s.DOMException}function S(i,a){return new Promise(function(n,e){var t=new g(i,a);if(t.signal&&t.signal.aborted)return e(new s.DOMException("Aborted","AbortError"));var r=new XMLHttpRequest;function o(){r.abort()}r.onload=function(){var e={status:r.status,statusText:r.statusText,headers:function(e){var o=new d;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var t=e.split(":"),n=t.shift().trim();if(n){var r=t.join(":").trim();o.append(n,r)}}),o}(r.getAllResponseHeaders()||"")};e.url="responseURL"in r?r.responseURL:e.headers.get("X-Request-URL");var t="response"in r?r.response:r.responseText;n(new _(t,e))},r.onerror=function(){e(new TypeError("Network request failed"))},r.ontimeout=function(){e(new TypeError("Network request failed"))},r.onabort=function(){e(new s.DOMException("Aborted","AbortError"))},r.open(t.method,t.url,!0),"include"===t.credentials?r.withCredentials=!0:"omit"===t.credentials&&(r.withCredentials=!1),"responseType"in r&&c&&(r.responseType="blob"),t.headers.forEach(function(e,t){r.setRequestHeader(t,e)}),t.signal&&(t.signal.addEventListener("abort",o),r.onreadystatechange=function(){4===r.readyState&&t.signal.removeEventListener("abort",o)}),r.send(void 0===t._bodyInit?null:t._bodyInit)})}S.polyfill=!0,self.fetch||(self.fetch=S,self.Headers=d,self.Request=g,self.Response=_),s.Headers=d,s.Request=g,s.Response=_,s.fetch=S,Object.defineProperty(s,"__esModule",{value:!0})},"object"==typeof n&&void 0!==t?o(n):"function"==typeof define&&define.amd?define(["exports"],o):o(r.WHATWGFetch={})},{}],2:[function(e,t,n){"use strict";var r,o=e("./modules/General/general-index"),i=(r=o)&&r.__esModule?r:{default:r};document.addEventListener("DOMContentLoaded",i.default.init)},{"./modules/General/general-index":13}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),e("whatwg-fetch");var r={getBrowserVendor:function(){return navigator.vendor.match(/google/i)?"chrome/blink":navigator.vendor.match(/apple/i)?"safari/webkit":navigator.userAgent.match(/firefox\//i)?"firefox/gecko":navigator.userAgent.match(/edge\//i)?"edge/edgehtml":navigator.userAgent.match(/trident\//i)?"ie/trident":navigator.userAgent+"\n"+navigator.vendor},Polyfill:function(){Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),r=n.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var o=t,i=0;i<r;){var a=n[i];if(e.call(o,a,i,n))return a;i++}}})},isInViewport:function(){var e=document.querySelectorAll("source, img");if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e,t){e.forEach(function(e){0<e.intersectionRatio&&(r(e.target),t.unobserve(e.target))})},{root:null,rootMargin:"0px",threshold:.5});e.forEach(function(e){return t.observe(e)})}else for(var n=0;n<document.querySelectorAll("source, img").length;n++)r(document.querySelectorAll("source, img")[n]);function r(e){e.dataset&&e.dataset.src&&(e.src=e.dataset.src),e.dataset&&e.dataset.srcset&&(e.srcset=e.dataset.srcset)}},getCookie:function(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]+)"));if(t)return t[2]}};n.default={Polyfill:r.Polyfill,BrowserVendor:r.getBrowserVendor,isInViewport:r.isInViewport,GetCookie:r.getCookie}},{"whatwg-fetch":1}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=i(e("./_header-menu")),o=i(e("./_header-search"));function i(e){return e&&e.__esModule?e:{default:e}}var a={init:function(){r.default.init(),o.default.init()}};n.default={init:a.init}},{"./_header-menu":5,"./_header-search":6}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r,o=e("../cache-selector"),i=(r=o)&&r.__esModule?r:{default:r};var a={init:function(){a.openCloseMenu(),a.closeMenu(),a.observeScroll(),a.setActiveAccordion(),a.updateNumberMinicart(),a.isLogged(),a.marginTopMenuHeight()},marginTopMenuHeight:function(){var e=i.default.header.header,t=i.default.$globals.body,n=e.offsetHeight;t.style.marginTop=n+"px",window.addEventListener("scroll",function(){n=e.offsetHeight,t.style.marginTop=n+"px"})},openCloseMenu:function(){i.default.header.menuHamContainer.addEventListener("click",function(e){e.target!=i.default.header.menuHamContainer&&e.target!=i.default.header.menuHamText||(e.stopPropagation,e.preventDefault,i.default.header.menuHam.classList.toggle("is--active"),i.default.header.menuList.classList.toggle("js--menu-close"),i.default.$globals.body.classList.toggle("menu--open"),e.target.classList.add("is--active"))})},closeMenu:function(){i.default.header.menuClose.addEventListener("click",function(){i.default.header.menuHam.classList.toggle("is--active"),i.default.header.menuList.classList.toggle("js--menu-close"),i.default.$globals.body.classList.toggle("menu--open")})},observeScroll:function(){window.addEventListener("scroll",function(e){var t=i.default.$globals.body;return this.oldScroll>this.scrollY?t.classList.remove("scrollDown"):t.classList.add("scrollDown"),0==this.oldScroll&&t.classList.contains("scrollDown")&&t.classList.remove("scrollDown"),this.oldScroll=this.scrollY,this.scrollY})},setActiveAccordion:function(){document.querySelectorAll(".accordion-checkbox").forEach(function(e){e.addEventListener("click",function(){e.checked?e.parentElement.classList.add("is--open"):e.parentElement.classList.remove("is--open")})})},updateNumberMinicart:function(){$(window).on("orderFormUpdated.vtex",function(){var e=document.querySelector(".minicart--itens");1<vtexjs.checkout.orderForm.items.length&&(document.querySelector(".__maskBag #wave").style.transform="translate(-50px, -"+(635+vtexjs.checkout.orderForm.items.length)+"px)"),e.textContent=vtexjs.checkout.orderForm.items.length})},isLogged:function(){var t=document.querySelector(".header__clube--text");fetch("/no-cache/profileSystem/getProfile").then(function(e){return e.json()}).then(function(e){e.IsUserDefined?t.innerHTML='\n                        <p class="header__clube--name">\n                            Olá, '+e.FirstName+"\n                        </p>":t.innerHTML='<a class="header__clube--account" href="/account"> \n                        Entre ou cadastre-se\n                    </a>'})}};n.default={init:a.init}},{"../cache-selector":12}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r,o=e("../cache-selector"),i=(r=o)&&r.__esModule?r:{default:r};var a={init:function(){},activeAcContainer:function(){window.onload=function(){var e=document.querySelector(".ac-container"),t=i.default.header.formBuscaInput;window.addEventListener("click",function(){t===document.activeElement?e.classList.add("is--active"):e.classList.remove("is--active")})}},addCloseButton:function(){console.log("HEHEHEH");var e=document.querySelector(".ac-container"),t=document.createElement("span");t.classList.add("close--container"),e.appendChild(t),console.log(t.parentElement)}};n.default={init:a.init}},{"../cache-selector":12}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r,o=e("./_minicart-main"),i=(r=o)&&r.__esModule?r:{default:r};var a={init:function(){i.default.init()}};n.default={init:a.init}},{"./_minicart-main":8}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r={init:function(){r.miniCartMount(),r.miniCartApplyValues(),r.miniCartUpdate()},miniCartMount:function(){var m,o,h;m=jQuery,o=window,document,h={cart:"<div class='mr-minicart'>{%CART%}</div>",promo:'<div class="mr-shipping"><div class="mr-shipping-lbl-container"><span class="mr-shipping-lbl">{%PROMOMSG%}</span></div><div class="mr-shipping-pb-container" {%PROMOBAR%}><span class="mr-progress-bar"><small {%PROMOSTYLE%}></small></span></div> </div>',footer:"<div class='mr-footer'>{%FOOTER%}</div>",totals:"<div class='mr-totals'><div class='mr-total mr-discounts'><span class='mr-lbl'>Descontos:</span><span class='mr-discount-val'>{%DISCOUNT%}</span></div><div class='mr-total'><span class='mr-lbl'>Total:</span><span class='mr-total-val'>{%TOTAL%}</span></div><div class='mr-goto-cart'><a href='/checkout/#/cart'>Fechar pedido</a></div></div>",list:"<div class='mr-prod-list-wrapper'><div class='mr-prod-list'>{%ITEMS%}</div></div>",item:"<div class='mr-prod-item'><a class='mr-link' href='{%LINK%}'><span class='mr-img'><img src='{%IMG%}'/></span><span class='mr-prod-brand'>{%BRAND%}</span><span class='mr-prod-name'>{%NAME%}</span><span class='mr-prod-qty'>Qtde: <small>{%QTY%}</small></span><span class='mr-prod-price'><em>{%PRICE%}</em></span></a><a class='mr-rm __close-icon-black' {%REMOVE%}>X</a></div>",emptyCart:'<div class="mr-empty"><div class="mr-msg">Não há produtos em sua sacola.</div><div class="mr-suggestions"></div></div>'},m.fn.mProdsList=function(e){return function(e,t){var n,f=e,p=(m({},t),{qtyProds:0,discounts:0,totalPrice:0,items:[],on_off_class:"cart-show",formatMoney:function(e,t,n,r){var o=e;t=isNaN(t=Math.abs(t))?2:t,n=null==n?".":n,r=null==r?",":r;var i=o<0?"-":"",a=parseInt(o=Math.abs(+o||0).toFixed(t))+"",s=3<(s=a.length)?s%3:0;return i+(s?a.substr(0,s)+r:"")+a.substr(s).replace(/(\d{3})(?=\d)/g,"$1"+r)+(t?n+Math.abs(o-a).toFixed(t).slice(2):"")},init:function(){return p.get.vtexjs()&&p.get.items(),!0},set:{events:function(){var e="click.Minicart";return m(f).find(".close").unbind(e).bind(e,function(){m("html").removeClass(p.on_off_class)}),!0},hasProds:function(){return 0<(f.data("items")||0)?m("html").addClass("cart-has-products"):m("html").removeClass("cart-has-products"),!0}},get:{vtexjs:(n=function(){return"object"===("undefined"==typeof vtexjs?"undefined":i(vtexjs))||m.getScript("http://io.vtex.com.br/vtex.js/2.3.0/vtex.js",function(){p.init()}),!0},r.toString=function(){return n.toString()},r),items:function(){return"undefined"!=typeof vtexjs&&(vtexjs.checkout.getOrderForm().then(function(e){o.order=e,p.items=e.items,p.discounts=e.totalizers&&0<e.totalizers.length&&null!=e.totalizers[1]&&e.totalizers[1].hasOwnProperty("id")&"Discounts"==e.totalizers[1].id&&0!=_orderForm.totalizers[1].value?e.totalizers[1].value:0,p.totalPrice=e.totalizers&&0<e.totalizers.length&&e.totalizers[0].value?e.totalizers[0].value:0,f.data("total",p.totalPrice/100*1),p.mount()}),!0)},money:function(e){return"R$ "+p.formatMoney(e,2,",",".")},promo:function(){var e=m("._mini-cart-data script").text().split("\n");if(e.length<3)return{msg:"",value:0,percentage:0,style:""};var t=e[1],n=1*e[0]*100;if(!isFinite(n))return!1;var r=Math.round(p.totalPrice/n*100),o=n>=p.totalPrice?(n-p.totalPrice)/100:0;0<o&&(t=t.replace(/{%VALOR%}/,p.get.money(o)));var i='style="width:'+r+'%;"';return 100<=r&&(t=e[2]),{msg:t,value:n,percentage:r,style:i}}},mount:function(){var e="",t="",n=0;if(0<p.items.length){var r=p.items.length-1;for(var o in p.items.reverse())if(p.items.hasOwnProperty(o)){var i=p.get.money(p.items[o].price/100);n+=1*p.items[o].quantity,t=(t=h.item.replace(/{%LINK%}/,p.items[o].detailUrl).replace(/{%IMG%}/,p.items[o].imageUrl).replace(/{%BRAND%}/,p.items[o].additionalInfo.brandName).replace(/{%NAME%}/,p.items[o].name).replace(/{%QTY%}/,p.items[o].quantity).replace(/{%PRICE%}/,i)).replace(/mr-prod-item/,"mr-prod-item _mr-prod-item-"+r),e+=t=p.items[o].isGift?t.replace(/mr-prod-item/,"mr-prod-item _gift").replace(/{%REMOVE%}/,'onclick="mProdsList.gift('+r+');"'):t.replace(/{%REMOVE%}/,'onclick="mProdsList.del(this,'+r+');"'),r--}var a=h.list.replace("{%ITEMS%}",e),s=p.get.promo(),c="";s&&isFinite(s.value)&&0<s.value&&(c+=h.promo.replace("{%PROMOMSG%}",s.msg).replace("{%PROMOSTYLE%}",s.style),100<=s.percentage&&(c=c.replace("{%PROMOBAR%}",'style="display:none;"')));var l="R$"+(p.totalPrice/100+p.discounts/100).toFixed(2).replace(".",","),u="-R$"+(p.discounts/100).toFixed(2).replace(".",",").replace("-","");c+=h.totals.replace("{%TOTAL%}",l).replace("{%DISCOUNT%}",u),a+=h.footer.replace("{%FOOTER%}",c),f.removeClass("__cart-empty __cart-loading")}else a=h.emptyCart,f.removeClass("__cart-loading"),f.addClass("__cart-empty");a=h.cart.replace("{%CART%}",a);var d=m(a);return d.find(".mr-prod-item:not('._gift')").wrapAll('<div class="mr-prod-items"></div>'),d.find("._gift").wrapAll('<div class="mr-gifts"></div>'),d.find(".mr-gifts").prepend('<div class="mr-gifts-lbl">Você ganhou!</div>'),f.data("items",n),f.html(d),p.set.hasProds(),p.set.events(),!0},del:function(e,n){return"undefined"!=typeof vtexjs&&(m(e).parent().addClass("__mr-deleting"),vtexjs.checkout.getOrderForm().then(function(e){var t=e.items[n];return t.index=n,vtexjs.checkout.removeItems([t])}).done(function(e){p.refresh(),p.set.hasProds()}),!0)},gift:function(e){return!0},refresh:function(){return p.init(),!0}});function r(){return n.apply(this,arguments)}p.init(t),o.mProdsList={init:p.init,refresh:p.refresh,items:function(){return f.data("items")},total:function(){return f.data("total")},del:p.del,gift:p.gift}}(this,e)}},miniCartApplyValues:function(){var o,i;o=jQuery,i=window,document,o.fn.mMinicart=function(e){var t=o(this),n=o.extend({descontos:".mr-discount-val",items:".amount-items-em",total:".total-cart-em"},e),r={init:function(){return t.mProdsList(),!0},refresh:function(){return mProdsList.refresh(),o(n.descontos).text(mProdsList.discounts()),o(n.items).text(mProdsList.items()),o(n.total).text(mProdsList.total()),!0}};r.init(),i.mMinicart={refresh:r.refresh,items:function(){return mProdsList.items()},total:function(){return mProdsList.total()}}}},miniCartUpdate:function(){function e(){return!function(){var n=!1;return r(dataLayer).each(function(e,t){t.visitorLoginState&&(n=t.visitorLoginState)}),n}()?r("html").removeClass("__user-logged"):r("html").addClass("__user-logged"),!0}var r,t,n,o,i,a;r=jQuery,t=window,n=document,r("header._header").length<0||(/utm_source=newheader/.test(n.location.search)&&r("header.header").remove(),r("html").addClass("_d-top"),r("input.search-btn").addClass("_d-search"),r("._header").removeClass("_d-top"),e(),r("html").off("close.AllFloats").on("close.AllFloats",function(e){r("html").trigger("close.MiniCart"),r("._top-bar .__on").removeClass("__on")}),a=r('<div class="__overlay"></div>'),0<r("body .__overlay").length&&(a=r("body .__overlay")),a.html('<div class="__overlay-bkg"></div>'),a.off("click.Interface").on("click.Interface",function(e){r("html").trigger("close.AllFloats")}),r("body").filter(function(){return r(".__overlay").length<=0}).append(a),r("html").off("open.MiniCart").on("open.MiniCart",function(e){e.preventDefault(),"function"==typeof r.fn.mMinicart&&(r("._minicartBody").mMinicart(),r("html").addClass("__cart-show"))}),r("html").off("close.MiniCart").on("close.MiniCart",function(e){r("html").removeClass("__cart-show")}),r(".__cart-link").off("click.Cart").on("click.Cart",function(e){e.preventDefault(),r("html").trigger("open.MiniCart")}),r(".__close-cart").off("click.Cart").on("click.Cart",function(e){e.preventDefault(),r("html").trigger("close.MiniCart")}),(i=r("._banner-promo")).length<=0||i.off("click.BannerPromo").on("click.BannerPromo",function(e){r("html").addClass("__promo-banner-off")}),r("._sidebarleft-links").each(function(e,t){r(t).find("> *:first").off("click.Interface").on("click.Interface",function(e){r(this).parent().toggleClass("__links-show")})}),r("._top-bar-links > * > a").off("click.Interface").on("click.Interface",function(e){e.preventDefault(),e.stopPropagation();var t=r(this).parent().hasClass("__on");r("._top-bar-links > *").removeClass("__on"),t||r(this).parent().addClass("__on")}),r(t).off("click.Interface_TL").on("click.Interface_TL",function(e){r("._top-bar-links > *").removeClass("__on")}),0<(o=r("._banner-promo").children().length)&&r("._banner-promo").addClass("_on"),1<o&&r("._banner-promo").addClass("_animated"),r(t).off("scroll").on("scroll",function(){30<r(t).scrollTop()?(r("html").removeClass("_d-top"),r("input.search-btn").removeClass("_d-search")):(r("html").addClass("_d-top"),r("input.search-btn").addClass("_d-search"),r("._header-search-bar").removeClass("activeHeaderSearch"))}),vtexjs.checkout.getOrderForm().done(function(e){t._orderForm=e;var n=0;r(e.items).each(function(e,t){t.isGift||(n+=t.quantity)}),isFinite(n)&&r(".__cart-link a span").text(n)}))}};n.default={init:r.init}},{}],9:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e};function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i,a=e("./components/_PriceSelect.jsx"),s=(i=a)&&i.__esModule?i:{default:i};var c={init:function(){c.setRegion()},setRegion:function(){var e=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,React.Component),r(n,[{key:"render",value:function(){return React.createElement(s.default,null)}}]),n);function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.state={Session:"",Region:""},t}768<window.innerWidth?ReactDOM.render(React.createElement(e,null),document.getElementById("regiao")):ReactDOM.render(React.createElement(e,null),document.getElementById("regiao-mobile"))}};n.default={init:c.init}},{"./components/_PriceSelect.jsx":10}],10:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e};function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,React.Component),r(a,[{key:"getLocation",value:function(){function e(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]+)"));if(t)return t[2]}if(null!=e("vtexRegion"))return this.setState({Session:e("vtex_session"),Region:e("vtexRegion").split(",")[0],LatLng:e("vtexRegion").split(",")[1]});document.querySelector(".header__region").classList.add("--active"),setTimeout(function(){document.querySelector(".header__region").classList.remove("--active")},5e3)}},{key:"setPosition",value:function(e,o){var i=this;return new Promise(function(e,t){var n=new XMLHttpRequest,r={public:{country:{value:"BRA"},postalCode:{value:o}}};n.open("POST","/api/sessions/"+i.state.Session),n.setRequestHeader("Content-Type","application/json"),n.onreadystatechange=function(){4===n.readyState&&(e(JSON.parse(n.response)),console.log("Location Up"))},n.send(JSON.stringify(r))}).then(function(){document.cookie="vtexRegion="+e+","+o}).catch(function(){i.setState({Region:"Sudeste",LatLng:"04551000"}),document.cookie="vtexRegion=Sudeste,04551000"})}},{key:"componentDidMount",value:function(){this.getLocation()}},{key:"handleChange",value:function(e){var t=this;this.setState({Region:e.split(",")[0],LatLng:e.split(",")[1]},function(){t.setPosition(t.state.Region,t.state.LatLng)})}},{key:"render",value:function(){var t=this;return React.createElement(React.Fragment,null,React.createElement("select",{className:"header__region__selection",value:this.state.Region+","+this.state.LatLng,id:"selectRegiao",onChange:function(e){return t.handleChange(e.target.value)}},this.state.Regions.map(function(e){return React.createElement("option",{className:"header__region__selection--option",value:e,key:e.split(",")[1]}," ",e.split(",")[0]," ")})))}}]),a);function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={LatLng:"04551000",Region:"Sudeste",Regions:["Norte,66000000","Nordeste,41000000","Centro Oeste,70000000","Sudeste,04551000","Sul,80000000"]},t.getLocation=t.getLocation.bind(t),t.setPosition=t.setPosition.bind(t),t.handleChange=t.handleChange.bind(t),t}n.default=i},{}],11:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=i(e("../../../global/global-index")),o=i(e("../cache-selector"));function i(e){return e&&e.__esModule?e:{default:e}}var a={init:function(){null!=document.querySelector(".w-counter-copy")&&a.copiarTopBanner(),null!=document.querySelector(".w-counter")&&(o.default.$globals.body.classList.add("has--topbanner"),"safari/webkit"==r.default.BrowserVendor()?setTimeout(function(){a.homeCountDown()},3e3):a.homeCountDown())},homeCountDown:function(){var e=document.querySelector(".w-counter--bg").textContent;if(document.querySelector(".w-counter").style.backgroundColor=e,null!=document.querySelector(".w-counter--container")){var t=document.createElement("span");t.classList.add("w-counter--container--counterbar");var n=document.createElement("span");n.classList.add("w-counter--bar"),document.querySelector(".w-counter--container").appendChild(t),document.querySelector(".w-counter--container--counterbar").appendChild(n),document.querySelector(".w-counter--container--counterbar").style.backgroundColor=e,document.querySelector(".w-counter--container").classList.remove("hide-important");var r=document.querySelector(".w-counter--end").textContent;(r=r.split("/"))[2]=r[2].split(" "),r=r[2][0]+"/"+r[0]+"/"+r[1]+" "+r[2][1];var l=new Date(r),u=1e3,d=60*u,f=60*d,p=24*f,m=0;m=setInterval(function(){var e=new Date,t=l-e;if(t<=0)return clearInterval(m),document.querySelector(".w-counter--container").classList.add("hidden"),void(null!=document.querySelector(".w-counter--cupom")&&(document.querySelector(".w-counter--cupom").classList.remove("hidden"),document.querySelector(".w-counter-copy").classList.remove("hidden")));Math.floor(t/p);var n=Math.floor(t/36e5),r=Math.floor(t%f/d),o=Math.floor(t%d/u),i=document.querySelector(".w-counter--hour"),a=document.querySelector(".w-counter--minutes"),s=document.querySelector(".w-counter--seconds"),c=(document.querySelector(".w-counter--info"),e.getTime()/l.getTime()*100);document.querySelector(".w-counter--bar").style.width=c+"%",i.innerHTML=n<10?"0"+n:n,a.innerHTML=r<10?"0"+r:r,s.innerHTML=o<10?"0"+o:o},1e3)}},copiarTopBanner:function(){var t=document.querySelector(".w-counter-copy"),n=document.querySelector(".w-counter--cupom");t.addEventListener("click",function(e){e.preventDefault,n.select(),document.execCommand("copy"),t.textContent="COPIADO",t.classList.add("btn-success"),setTimeout(function(){t.textContent="COPIAR",t.classList.remove("btn-success")},3e3)})}};n.default={init:a.init}},{"../../../global/global-index":3,"../cache-selector":12}],12:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={$globals:{body:document.querySelector("body")},header:{header:document.querySelector(".header"),menuHam:document.querySelector(".header__menu-hamburguer"),menuHamContainer:document.querySelector(".header__menu-hamburguer-container"),menuList:document.querySelector(".header__menu-container"),menuHamText:document.querySelector(".header__menu-hamburguer--text"),menuAccordion:document.querySelectorAll("[data-accordion]"),menuClose:document.querySelector(".js--close-menu"),formBusca:document.querySelector(".header__search"),formBuscaInput:document.querySelector(".header__search--input")},body:{containerGroup:document.querySelector(".container-group")},neemu:{acContainer:document.querySelector(".ac-container")}}},{}],13:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=c(e("./Header/_header-index")),o=c(e("../../global/global-index")),i=c(e("./Minicart/_minicart-index")),a=c(e("./Regional/PriceContainer.jsx")),s=c(e("./TopBanner/topbanner-index"));function c(e){return e&&e.__esModule?e:{default:e}}var l={init:function(){r.default.init(),i.default.init(),s.default.init(),a.default.init(),l.ServiceWorker(),l.Skeleton(),o.default.isInViewport(),l.SendNewsletter(),"ie/trident"==o.default.BrowserVendor()&&o.default.Polyfill()},Skeleton:function(){document.querySelectorAll(".set--skeleton").forEach(function(e){setTimeout(function(){e.classList.remove("set--skeleton"),e.style.opacity=0,setTimeout(function(){e.style.opacity=1},500)},3500)})},ServiceWorker:function(){var e,t,n=o.default.GetCookie("SWExpiration");"serviceWorker"in navigator&&(null==n?(document.cookie="SWExpiration="+((new Date).getTime()+18e5),window.addEventListener("load",function(){navigator.serviceWorker.register("/files/service-worker.js",{scope:"/"}).then(function(e){console.log("%cServiceWorker registration successful with scope:"+e.scope+" 💯",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;')},function(e){console.log("%cServiceWorker registration failed: "+e+" 🥺🥺",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FC2626; color: #FDFDFD;')})})):(e=n,t=Date.now()-18e5,console.log(t),console.log(e),t<e?console.log("%cClient is under cache of Service Worker 💯",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;'):(document.cookie="SWExpiration="+((new Date).getTime()+18e5),caches.delete("dynamicCache").then(function(e){console.log("%cDeleted dynamicCache",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;')}),caches.delete("staticCache").then(function(e){console.log("%cDeleted staticCache",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;')}),navigator.serviceWorker.register("/files/service-worker.js",{scope:"/"}).then(function(e){e.update(),console.log("%cUpdated Service Worker",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#09DDED; color: #FDFDFD;')}))))},SendNewsletter:function(){window.onload=function(){document.querySelector("#nl_form #submit_button").addEventListener("click",function(e){e.preventDefault();var t=new Date,n=""+t.getFullYear()+"-"+((t.getMonth()<=10?"0":"")+(t.getMonth()+1))+"-"+((t.getDate()<10?"0":"")+t.getDate())+" "+((t.getHours()<10?"0":"")+t.getHours())+":"+((t.getMinutes()<10?"0":"")+t.getMinutes())+":"+((t.getSeconds()<10?"0":"")+t.getSeconds()),r=JSON.stringify({origin:"ECOMM",campaign:"NEWSLETTER",date:n,name:null,email:document.querySelector("#nl_email").value,acceptEmail:!0}),o=0==document.querySelector("input[name='validation-field']").value;if(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(document.querySelector("#nl_email").value)&&o){var i=new XMLHttpRequest;i.open("POST","/api/dataentities/PS/documents",!0),i.setRequestHeader("accept","application/vnd.vtex.ds.v10+json"),i.setRequestHeader("content-type","application/json"),i.send(r),i.addEventListener("load",function(e){document.querySelector("#nl_form .form-success").style.display="block",document.querySelector("#nl_form .form-controls").remove(),document.querySelector("#nl_form #submit_button").remove()}),i.addEventListener("error",function(e){document.querySelector("#nl_form .form-error").style.display="block"})}})}}};n.default={init:l.init}},{"../../global/global-index":3,"./Header/_header-index":4,"./Minicart/_minicart-index":7,"./Regional/PriceContainer.jsx":9,"./TopBanner/topbanner-index":11}]},{},[2]);