!function n(i,a,s){function l(o,e){if(!a[o]){if(!i[o]){var t="function"==typeof require&&require;if(!e&&t)return t(o,!0);if(c)return c(o,!0);throw new Error("Cannot find module '"+o+"'")}var r=a[o]={exports:{}};i[o][0].call(r.exports,function(e){var t=i[o][1][e];return l(t||e)},r,r.exports,n,i,a,s)}return a[o].exports}for(var c="function"==typeof require&&require,e=0;e<s.length;e++)l(s[e]);return l}({1:[function(e,t,o){var r,n;r=this,n=function(s){"use strict";var t="URLSearchParams"in self,o="Symbol"in self&&"iterator"in Symbol,l="FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),r="FormData"in self,n="ArrayBuffer"in self;if(n)var i=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],a=ArrayBuffer.isView||function(e){return e&&-1<i.indexOf(Object.prototype.toString.call(e))};function c(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function u(e){return"string"!=typeof e&&(e=String(e)),e}function e(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return o&&(e[Symbol.iterator]=function(){return e}),e}function d(t){this.map={},t instanceof d?t.forEach(function(e,t){this.append(t,e)},this):Array.isArray(t)?t.forEach(function(e){this.append(e[0],e[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function p(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function h(o){return new Promise(function(e,t){o.onload=function(){e(o.result)},o.onerror=function(){t(o.error)}})}function f(e){var t=new FileReader,o=h(t);return t.readAsArrayBuffer(e),o}function m(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function y(){return this.bodyUsed=!1,this._initBody=function(e){(this._bodyInit=e)?"string"==typeof e?this._bodyText=e:l&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:r&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:t&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():n&&l&&function(e){return e&&DataView.prototype.isPrototypeOf(e)}(e)?(this._bodyArrayBuffer=m(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):n&&(ArrayBuffer.prototype.isPrototypeOf(e)||a(e))?this._bodyArrayBuffer=m(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},l&&(this.blob=function(){var e=p(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?p(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(f)}),this.text=function(){var e=p(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,o=h(t);return t.readAsText(e),o}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),o=new Array(t.length),r=0;r<t.length;r++)o[r]=String.fromCharCode(t[r]);return o.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},r&&(this.formData=function(){return this.text().then(b)}),this.json=function(){return this.text().then(JSON.parse)},this}d.prototype.append=function(e,t){e=c(e),t=u(t);var o=this.map[e];this.map[e]=o?o+", "+t:t},d.prototype.delete=function(e){delete this.map[c(e)]},d.prototype.get=function(e){return e=c(e),this.has(e)?this.map[e]:null},d.prototype.has=function(e){return this.map.hasOwnProperty(c(e))},d.prototype.set=function(e,t){this.map[c(e)]=u(t)},d.prototype.forEach=function(e,t){for(var o in this.map)this.map.hasOwnProperty(o)&&e.call(t,this.map[o],o,this)},d.prototype.keys=function(){var o=[];return this.forEach(function(e,t){o.push(t)}),e(o)},d.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),e(t)},d.prototype.entries=function(){var o=[];return this.forEach(function(e,t){o.push([t,e])}),e(o)},o&&(d.prototype[Symbol.iterator]=d.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function v(e,t){var o=(t=t||{}).body;if(e instanceof v){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new d(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,o||null==e._bodyInit||(o=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new d(t.headers)),this.method=function(e){var t=e.toUpperCase();return-1<g.indexOf(t)?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function b(e){var n=new FormData;return e.trim().split("&").forEach(function(e){if(e){var t=e.split("="),o=t.shift().replace(/\+/g," "),r=t.join("=").replace(/\+/g," ");n.append(decodeURIComponent(o),decodeURIComponent(r))}}),n}function w(e,t){t=t||{},this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new d(t.headers),this.url=t.url||"",this._initBody(e)}v.prototype.clone=function(){return new v(this,{body:this._bodyInit})},y.call(v.prototype),y.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),url:this.url})},w.error=function(){var e=new w(null,{status:0,statusText:""});return e.type="error",e};var x=[301,302,303,307,308];w.redirect=function(e,t){if(-1===x.indexOf(t))throw new RangeError("Invalid status code");return new w(null,{status:t,headers:{location:e}})},s.DOMException=self.DOMException;try{new s.DOMException}catch(e){s.DOMException=function(e,t){this.message=e,this.name=t;var o=Error(e);this.stack=o.stack},s.DOMException.prototype=Object.create(Error.prototype),s.DOMException.prototype.constructor=s.DOMException}function P(i,a){return new Promise(function(o,e){var t=new v(i,a);if(t.signal&&t.signal.aborted)return e(new s.DOMException("Aborted","AbortError"));var r=new XMLHttpRequest;function n(){r.abort()}r.onload=function(){var e={status:r.status,statusText:r.statusText,headers:function(e){var n=new d;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var t=e.split(":"),o=t.shift().trim();if(o){var r=t.join(":").trim();n.append(o,r)}}),n}(r.getAllResponseHeaders()||"")};e.url="responseURL"in r?r.responseURL:e.headers.get("X-Request-URL");var t="response"in r?r.response:r.responseText;o(new w(t,e))},r.onerror=function(){e(new TypeError("Network request failed"))},r.ontimeout=function(){e(new TypeError("Network request failed"))},r.onabort=function(){e(new s.DOMException("Aborted","AbortError"))},r.open(t.method,t.url,!0),"include"===t.credentials?r.withCredentials=!0:"omit"===t.credentials&&(r.withCredentials=!1),"responseType"in r&&l&&(r.responseType="blob"),t.headers.forEach(function(e,t){r.setRequestHeader(t,e)}),t.signal&&(t.signal.addEventListener("abort",n),r.onreadystatechange=function(){4===r.readyState&&t.signal.removeEventListener("abort",n)}),r.send(void 0===t._bodyInit?null:t._bodyInit)})}P.polyfill=!0,self.fetch||(self.fetch=P,self.Headers=d,self.Request=v,self.Response=w),s.Headers=d,s.Request=v,s.Response=w,s.fetch=P,Object.defineProperty(s,"__esModule",{value:!0})},"object"==typeof o&&void 0!==t?n(o):"function"==typeof define&&define.amd?define(["exports"],n):n(r.WHATWGFetch={})},{}],2:[function(e,t,o){"use strict";var r,n=e("./modules/Departament/departament-index");((r=n)&&r.__esModule?r:{default:r}).default.init()},{"./modules/Departament/departament-index":6}],3:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.getiPhoneModel=function(){var e=document.createElement("canvas");if(e){var t=e.getContext("webgl")||e.getContext("experimental-webgl");if(t){var o=t.getExtension("WEBGL_debug_renderer_info");if(o){var r=t.getParameter(o.UNMASKED_RENDERER_WEBGL);console.log("GPU DEVICE: ",r)}}}{if(window.screen.height/window.screen.width==812/375&&3==window.devicePixelRatio)return document.body.classList.add("iphone"),"iPhone X";if(window.screen.height/window.screen.width==736/414&&3==window.devicePixelRatio)switch(r){default:return"iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus";case"Apple A8 GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone 6 Plus";case"Apple A9 GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone 6s Plus";case"Apple A10 GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone 7 Plus";case"Apple A11 GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone 8 Plus";case"Apple GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone Default"}else if(window.screen.height/window.screen.width==667/375&&3==window.devicePixelRatio)switch(r){default:return"iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus (display zoom)";case"Apple A8 GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone 6 Plus (display zoom)";case"Apple A9 GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone 6s Plus (display zoom)";case"Apple A10 GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone 7 Plus (display zoom)";case"Apple A11 GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone 8 Plus (display zoom)";case"Apple GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone Default"}else if(window.screen.height/window.screen.width==667/375&&2==window.devicePixelRatio)switch(r){default:return"iPhone 6, 6s, 7 or 8";case"Apple A8 GPU":return"iPhone 6";case"Apple A9 GPU":return document.body.classList.add("iphone"),window.onload=function(){window.scrollBy(0,1)},"iPhone 6s";case"Apple A10 GPU":return document.body.classList.add("iphone"),window.onload=function(){window.scrollBy(0,1)},"iPhone 7";case"Apple A11 GPU":return document.body.classList.add("iphone"),window.onload=function(){window.scrollBy(0,1)},"iPhone 8";case"Apple GPU":return window.onload=function(){window.scrollBy(0,1)},document.body.classList.add("iphone"),"iPhone Default"}else if(window.screen.height/window.screen.width==1.775&&2==window.devicePixelRatio)switch(r){default:return"iPhone 5, 5C, 5S, SE or 6, 6s, 7 and 8 (display zoom)";case"PowerVR SGX 543":return"iPhone 5 or 5c";case"Apple A7 GPU":return"iPhone 5s";case"Apple A8 GPU":return"iPhone 6 (display zoom)";case"Apple A9 GPU":return"iPhone SE or 6s (display zoom)";case"Apple A10 GPU":return"iPhone 7 (display zoom)";case"Apple A11 GPU":return"iPhone 8 (display zoom)"}else if(window.screen.height/window.screen.width==1.5&&2==window.devicePixelRatio)switch(r){default:return"iPhone 4 or 4s";case"PowerVR SGX 535":return"iPhone 4";case"PowerVR SGX 543":return"iPhone 4s"}else{if(window.screen.height/window.screen.width!=1.5||1!=window.devicePixelRatio)return"Not an iPhone";switch(r){default:return"iPhone 1, 3G or 3GS";case"ALP0298C05":return"iPhone 3GS";case"S5L8900":return"iPhone 1, 3G"}}}},o.verifyIos=function(){var e=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,t=window.devicePixelRatio||1,o={width:window.screen.width*t,height:window.screen.height*t};e&&2001==o.height&&1125===o.height&&(document.querySelector("body").classList.add("iphone"),window.onload=function(){window.scrollBy(0,1)});e&&1125==o.width&&2436===o.height&&(document.querySelector("body").classList.add("iphone"),window.onload=function(){window.scrollBy(0,1)})},o.getBrowserVendor=function(){var e=void 0;e=navigator.vendor.match(/google/i)?"chrome/blink":navigator.vendor.match(/apple/i)?"safari/webkit":navigator.userAgent.match(/firefox\//i)?"firefox/gecko":navigator.userAgent.match(/edge\//i)?"edge/edgehtml":navigator.userAgent.match(/trident\//i)?"ie/trident":navigator.userAgent+"\n"+navigator.vendor;return e},o.Polyfill=function(){Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');var o=Object(this),r=o.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var n=t,i=0;i<r;){var a=o[i];if(e.call(n,a,i,o))return a;i++}}});Object.entries||(Object.entries=function(e){for(var t=Object.keys(e),o=t.length,r=new Array(o);o--;)r[o]=[t[o],e[t[o]]];return r})},o.isInViewport=function(){var e=document.querySelectorAll("source, img");if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e,t){e.forEach(function(e){0<e.intersectionRatio&&(r(e.target),t.unobserve(e.target))})},{root:null,rootMargin:"0px",threshold:.5});e.forEach(function(e){return t.observe(e)})}else for(var o=0;o<document.querySelectorAll("source, img").length;o++)r(document.querySelectorAll("source, img")[o]);function r(e){e.dataset&&e.dataset.src&&(e.src=e.dataset.src),e.dataset&&e.dataset.img&&(e.src=e.dataset.img),e.dataset&&e.dataset.srcset&&(e.srcset=e.dataset.srcset)}},o.getCookie=function(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]+)"));if(t)return t[2]},o.setVitrineDataImg=function(){function e(){for(var e=0;e<document.querySelectorAll(".imgsrc").length;e++){var t=document.querySelectorAll(".imgsrc")[e].innerHTML,o=t.substring(t.lastIndexOf('src="')+5,t.lastIndexOf("?v="));document.querySelectorAll(".imgsrc")[e].nextSibling.nextSibling.setAttribute("data-src",o)}}window.onmousemove=function(){e()},window.onscroll=function(){e()}},e("whatwg-fetch")},{"whatwg-fetch":1}],4:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r={init:function(){r.oldFunctions()},oldFunctions:function(){var n,a,e,t;function o(t){if(0<t.length){var e=$(t.selector+"> div").clone();$(".form-controls.custom-select.slector-hoje-quero").append(e),$(".form-controls.custom-select.slector-hoje-quero > div > label").on("click",function(){var e=$(this).index();$(t.selector+" > div > label[index="+e+"] input").attr("checked","checked"),$(t.selector+"  > div > label[index="+e+"] input").change()})}else $("#slector-hoje-quero").addClass("category-filter-null")}function r(t){if(0<t.length){var e=$(t.selector+"> div").clone();$(".form-controls.custom-select.slector-preco").append(e),$(".form-controls.custom-select.slector-preco > div > label").on("click",function(){var e=$(this).index();$(t.selector+" > div > label[index="+e+"] input").attr("checked","checked"),$(t.selector+"  > div > label[index="+e+"] input").change()})}else $("#slector-preco").addClass("category-filter-null")}function s(t){if(0<t.length){var e=$(t.selector+"> div").clone();$(".form-controls.custom-select.slector-cor").append(e),$(".form-controls.custom-select.slector-cor > div > label").on("click",function(){var e=$(this).index();$(this).is(":checked")?$(t.selector+" > div > label[index="+e+"] input").attr("checked","checked"):$(t.selector+" > div > label[index="+e+"] input").removeAttr("checked"),$(t.selector+"  > div > label[index="+e+"] input").change()})}else $("#slector-cor").addClass("category-filter-null")}function l(e){e.owlCarousel({items:4,autoplay:!1,nav:!1,slideBy:window.innerWidth<480?2:(window.innerWidth<1025||window.innerWidth,4),mouseDrag:!1,loop:!0,rewindNav:!0,itemsTablet:[768,3],itemsMobile:[420,2]})}function c(e){e.owlCarousel({items:5,autoplay:!1,nav:!1,mouseDrag:!1,loop:!0,rewindNav:!1,itemsTablet:[768,3.3]})}function u(e){for(var t=0;t<e.children.length;t++)$("body").hasClass("departament")?$(".nav-quaternary > .shell > ul").append('<li data-id-cateory="'+e.children[t].id+'" data-name-category="'+e.children[t].name+'"> <i class="ico-departament-filter"> <img src="/arquivos/ico_departamento_'+e.children[t].id+'.png"/> </i> <h2><a href="'+e.children[t].url+'" rel="v:url">'+e.children[t].name+"</a></h2> </li>"):$("body").hasClass("category")&&$(".nav-quaternary > .shell > ul").append('<li data-id-cateory="'+e.children[t].id+'" data-name-category="'+e.children[t].name+'">  <h2><a href="'+e.children[t].url+'">'+e.children[t].name+"</a></h2></li>")}n=jQuery,a=window,e=document,t=n(a),n(e).ready(function(){if($.ajax({url:"/api/catalog_system/pub/category/tree/3/",type:"GET",dataType:"json",contentType:"application/json; charset=utf-8",success:function(e){!function e(t){for(var o=0;o<t.length;o++)if(t[o].id==vtxctx.categoryId)u(t[o]);else if(o==t.length-1)for(var r=0;r<t.length;r++)e(t[r].children)}(e)},error:function(e){console.log(e)}}),function(){var o=$(".banner-category-01 > .box-banner a > img").attr("src"),r=$(".banner-category-01 > .box-banner a > img").attr("href"),n=$(".banner-category-02 > .box-banner a > img").attr("src"),i=$(".banner-category-02 > .box-banner a > img").attr("href"),a=$(".banner-category-03 > .box-banner a > img").attr("src"),s=$(".banner-category-03 > .box-banner a > img").attr("href");$(".pratileira .pratileira ul li").each(function(e,t){0==e&&null!=o&&$(this).before('<li><div class="img-category-list fist"><img src="'+o+'" height="398" width="298"/><a href="'+r+'" class="meta-category"> eu quero ! </a></div></li>'),9==e&&null!=n&&$(this).before('<li><div class="img-category-list"><img src="'+n+'" height="398" width="298"/><a href="'+i+'" class="meta-category"> se joga !</a></div></li>'),15==e&&null!=a&&$(this).before('<li><div class="img-category-list"><img src="'+a+'" height="398" width="298"/><a href="'+s+'" class="meta-category"> vem ver !</a></div></li>')})}(),n(".helperComplement").remove(),n("body.departament .section-products h3, body.category .section-products h3").replaceWith(function(){return n("<h2/>",{html:this.innerHTML})}),n("body.departament .product .product-content p, body.category .product .product-content p").replaceWith(function(){return n("<h3/>",{html:this.innerHTML})}),n(".breadcrumbs .bread-crumb > ul > li").eq(0).text("página inicial"),n(".filters .filters-head p .total-prpduct").text(n(".searchResultsTime .resultado-busca-numero .value").eq(0).text()),n(".nav-quaternary .nav-title").text(vtxctx.categoryName),0==n(".form-controls.custom-select.custom-select-secondary select").length){var e=n(".sub .resultado-busca-filtro .orderBy select").eq(0).clone();n(".form-controls.custom-select.custom-select-secondary").append(e)}n("body").hasClass("category")&&n(".menu-departamento input[type='checkbox']").vtexSmartResearch({pageLimit:1,shelfCallback:function(){n(".product .product-image > img").addClass("fix-product background");var r=[];n(".slector-cor input:checkbox:checked").each(function(){var e=n(this);r.push(e.attr("value"))}),n(".p-none-color").remove(),-1<a.location.href.indexOf("/maquiagem/boca/batom")&&0<r.length&&(console.clear(),console.log("coresSelecionadas ",r),numero_produtos=n(this.shelfClass+".vitrine > ul > li").not(".helperComplement").size(),n(".p-none-color").remove(),numerador=0,n(this.shelfClass+".vitrine > ul > li").not(".helperComplement").each(function(){var t=n(this),o=n(this).find(".product .product-skus .idproduto").val();n.get("/api/catalog_system/pub/products/search/?fq=productId:"+o,function(e){for(i in console.warn("Iniciando leitura do produto ",o),id_sku=0,tag=0,numerador++,e[0].items)if(void 0!==e[0].items[i]["Escolha a Cor"])for(i2 in cor_sku=e[0].items[i]["Escolha a Cor"][0],r)cor_combo=r[i2],"string"==typeof cor_combo&&(console.log("buscando",cor_combo," em ",cor_sku),-1<cor_sku.indexOf(cor_combo)&&(tag=e[0].items[i].images[0].imageTag,id_sku=e[0].items[i].itemId,tag=tag.replace("~",a.location.origin),tag=tag.replace("#width#","292").replace("#width#","292"),tag=tag.replace("#height#","292").replace("#height#","292"),console.warn("Encontrou um sku com essa cor -> ",id_sku," Imagem dela: ",tag)));id_sku?(t.find(".product-image img").first().replaceWith(tag),id_sku_this=t.find(".product-link").attr("href").split("idsku=")[1],"undefined"!=typeof id_sku_this&&t.find(".product-link").attr("href",t.find(".product-link").attr("href").replace(id_sku_this,id_sku))):(console.warn("Produto escondido: ",o),t.hide()),numerador==numero_produtos&&0==n(".filters-body .pratileira > ul > li:visible").size()&&(no_mensagem=1==r.length?"Ops! nÃ£o conseguimos achar nenhum produto para a cor selecionada":"Ops! nÃ£o conseguimos achar nenhum produto para as cores selecionadas",a.setTimeout(function(){n(".filters-body .vitrine:visible:first").prepend("<p class='p-none-color' style='margin-bottom: 47px;font-weight:bold;text-align:center;'>"+no_mensagem+"</p>")},500))})}))},callback:function(){!function(){switch(vtxctx.departmentName){case"Perfumaria":!function(t){if(0<t.length){var e=$(t.selector+"> div").clone();$("#slector-familia-olfativa .form-controls.custom-select").append(e),$("#slector-familia-olfativa .form-controls.custom-select > div > label").on("click",function(){var e=$(this).index();$(t.selector+" > div > label[index="+e+"] input").attr("checked","checked"),$(t.selector+"  > div > label[index="+e+"] input").change()})}else $("#slector-familia-olfativa").addClass("category-filter-null")}($(".refino.filtro_familia-olfativa")),o($(".refino.filtro_hoje-eu-quero")),$("#slector-familia-olfativa").show(),$("#slector-hoje-quero").show();break;case"Unhas":s($(".refino.filtro_escolha-a-cor")),s($(".refino.filtro_cor")),o($(".refino.filtro_hoje-eu-quero")),$("#slector-hoje-quero").show(),$("#slector-cor").show();break;case"AcessÃ³rios":case"Corpo e Banho":r($(".refino.filtro_faixa-de-preco")),o($(".refino.filtro_hoje-eu-quero")),$("#slector-hoje-quero").show(),$("#slector-preco").show();break;case"Maquiagem":s($(".refino.filtro_cor")),o($(".refino.filtro_hoje-eu-quero")),r($(".refino.filtro_faixa-de-preco")),$("#slector-hoje-quero").show(),$("#slector-preco").show(),$("#slector-cor").show()}}(),1024<t.width()&&n(".custom-select .custom-select-text").on("click",function(e){n(this).next("div").slideToggle()}),t.width()<1025&&($("body.category").prepend('<div class="wrapper-menu"> </div>'),$("body.category").prepend('<span class="overlay-category"> </span>'),$(".wrapper-menu").append($("#filters")),n(".custom-select-secondary.fake > a").on("click",function(e){e.preventDefault(),n(".wrapper-menu").addClass("active"),n(".overlay-category").addClass("active")}),n(".overlay-category").on("click",function(e){n(this).removeClass("active"),n(".wrapper-menu").removeClass("active")}),n(".wrapper-menu .custom-select .custom-select-text").on("click",function(e){n(this).next("div").toggleClass("active"),n(this).toggleClass("active"),n(this).parent().parent().toggleClass("active")}))}})}),t.on("load",function(){n(".nav-quaternary.nav-black ul li > i > img").each(function(e,t){var o=n(this).attr("src");n(this).parent().css({backgroundImage:"url("+o+")"})}),n(".nav-quaternary.nav-black ul li").hover(function(){var e=n(this).find("i").attr("style").replace("departamento","categoria");n(this).find("i").attr("style",e)},function(){var e=n(this).find("i").attr("style").replace("categoria","departamento");n(this).find("i").attr("style",e)}),n("body").hasClass("departament")&&(n(".section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul").length&&(l(n(".section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul")),n(".section-products.category-colletion-produtos-top .shell .section-content .slider-products .slider-actions .slider-next").on("click",function(e){e.preventDefault(),n(".section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul").trigger("owl.next")}),n(".section-products.category-colletion-produtos-top .shell .section-content .slider-products .slider-actions .slider-prev").on("click",function(e){e.preventDefault(),n(".section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul").trigger("owl.prev")})),n(".section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul").length&&(l(n(".section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul")),n(".section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-actions .slider-next").on("click",function(e){e.preventDefault(),n(".section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul").trigger("owl.next")}),n(".section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-actions .slider-prev").on("click",function(e){e.preventDefault(),n(".section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul").trigger("owl.prev")})),n(".section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul").length&&(l(n(".section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul")),n(".section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-actions .slider-next").on("click",function(e){e.preventDefault(),n(".section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul").trigger("owl.next")}),n(".section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-actions .slider-prev").on("click",function(e){e.preventDefault(),n(".section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul").trigger("owl.prev")})),n(".section-makeup .section-body .slider-makeup").eq(0)&&c(n(".slider-makeup .slides").eq(0)),n(".section-makeup .section-body .slider-makeup").eq(1)&&c(n(".slider-makeup .slides").eq(1)),n(".section-makeup .section-body .slider-makeup").eq(2)&&c(n(".section-makeup .section-body .slider-makeup .slides").eq(2)),n(".section-makeup .section-body .slider-makeup").eq(3)&&c(n(".section-makeup .section-body .slider-makeup .slides").eq(3)),$(".slider-makeup").each(function(e){$(this).hover(function(){$(this).on("mousemove",function(e){$(this).find(".owl-wrapper").css("transform","translate3d("+e.pageX/1.6654*-1+"px, 0px, 0px)")})})}),t.width()<=420&&(n(".nav-quaternary.nav-black .shell ul").owlCarousel({items:1,autoplay:!1,nav:!1,slideBy:4,mouseDrag:!0,loop:!0,rewindNav:!0,itemsMobile:[420,2]}),n(".nav-quaternary.nav-black .shell ul").append('<div class="slider-actions departament-top"><a href="#" class="slider-prev"><i class="ico"></i></a><a href="#" class="slider-next"><i class="ico"></i></a></div>'),n(".slider-actions.departament-top .slider-next i.ico").on("click",function(e){e.preventDefault(),n(".nav-quaternary.nav-black .shell ul").trigger("owl.next")}),n(".slider-actions.departament-top .slider-prev i.ico").on("click",function(e){e.preventDefault(),n(".nav-quaternary.nav-black .shell ul").trigger("owl.prev")})))})}};o.default={init:r.init}},{}],5:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U=e("../../global/global-index"),r={init:function(){r.SmartResearch(),console.log("Research Ready")},SmartResearch:function(){var E=!1;"function"!=typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var t={"ç":"c","æ":"ae","œ":"oe","á":"a","é":"e","í":"i","ó":"o","ú":"u","à":"a","è":"e","ì":"i","ò":"o","ù":"u","ä":"a","ë":"e","ï":"i","ö":"o","ü":"u","ÿ":"y","â":"a","ê":"e","î":"i","ô":"o","û":"u","å":"a","ã":"a","ø":"o","õ":"o",u:"u","Á":"A","É":"E","Í":"I","Ó":"O","Ú":"U","Ê":"E","Ô":"O","Ü":"U","Ã":"A","Õ":"O","À":"A","Ç":"C"};return this.replace(/[\u00e0-\u00fa]/g,function(e){return void 0!==t[e]?t[e]:e})}),"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),jQuery.fn.vtexSmartResearch=function(e){function n(e,t){"object"==("undefined"==typeof console?"undefined":T(console))&&console.log("[Smart Research - "+(t||"Erro")+"] "+e)}var o=jQuery(this),t={pageLimit:500,loadContent:".pratileira[id^=ResultItems]",shelfClass:".pratileira",filtersMenu:".search-multiple-navigator",linksMenu:".search-single-navigator1",menuDepartament:".navigation .menu-departamento",mergeMenu:!0,insertMenuAfter:".search-multiple-navigator h3:first",emptySearchElem:jQuery('<div class="vtexsr-emptySearch"></div>'),elemLoading:'<div id="scrollLoading">Carregando ... </div>',returnTopText:'<span class="text">voltar ao</span><span class="text2">TOPO</span>',emptySearchMsg:"<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>",filterErrorMsg:"Houve um erro ao tentar filtrar a página!",searchUrl:null,usePopup:!1,showLinks:!0,popupAutoCloseSeconds:3,filterScrollTop:function(e){return e.top-20},callback:function(){},getShelfHeight:function(e){return e.scrollTop()+e.height()},shelfCallback:function(){},ajaxCallback:function(){setTimeout(function(){$(".products:eq(0) .pratileira.vitrine ul li").length<=14?$(".pager.bottom").hide():$(".pager.bottom").show()},1e3)},emptySearchCallback:function(){},authorizeScroll:function(){return!0},authorizeUpdate:function(){return!0},labelCallback:function(e){}},a=jQuery.extend(t,e),r=("undefined"==typeof console||T(console),jQuery("")),i=jQuery(a.elemLoading),s=2,l=!0,c=jQuery(window),u=(jQuery(document),jQuery("html,body")),d=jQuery("body"),p="",h="",f="",m=!1,y=jQuery(a.loadContent),g=jQuery(a.filtersMenu),v={requests:0,filters:0,isEmpty:!1},b={},w={getUrl:function(e){return e||!1?p.replace(/PageNumber=[0-9]*/,"PageNumber="+s):(f+h).replace(/PageNumber=[0-9]*/,"PageNumber="+_)},getSearchUrl:function(){var e,t,o;return jQuery("script:not([src])").each(function(){if(t=jQuery(this)[0].innerHTML,o=/\/buscapagina\?.+&PageNumber=/i,-1<t.search(/\/buscapagina\?/i))return e=o.exec(t),!1}),void 0!==e&&void 0!==e[0]?e[0]:(n("Não foi possível localizar a url de busca da página.\n Tente adicionar o .js ao final da página. \n[Método: getSearchUrl]"),"")},scrollToTop:function(){var e=d.find("#returnToTop");e.length<1&&(e=jQuery('<div id="returnToTop"><a href="#">'+a.returnTopText+'<span class="arrowToTop"></span></a></div>'),d.append(e));var t=c.height();c.bind("resize",function(){t=c.height()}),c.bind("scroll",function(){c.scrollTop()>t?e.stop(!0).fadeTo(300,1,function(){e.show()}):e.stop(!0).fadeTo(300,0,function(){e.hide()})}),e.bind("click",function(){return u.animate({scrollTop:0},"slow"),!1})},infinitScroll:function(e){var t,r,o;o=(d.find(".pager:first").attr("id")||"").split("_").pop(),t=null!==a.pageLimit?a.pageLimit:window["pagecount_"+o],r=!0,void 0===t&&(t=99999999),e&&0==E&&(E=!0,$("a.vejamais-vtexresearch").bind("click",function(e){e.preventDefault();jQuery(this);if(m||!l||!a.authorizeScroll(v))return!1;if(r){var o=y.find(a.shelfClass).filter(":last");o.after(i),r=!1,j=jQuery.ajax({url:w.getUrl(!0),success:function(e){e.trim().length<1?(l=!1,$("a.vejamais-vtexresearch").remove(),n("Não existem mais resultados a partir da página: "+(s-1),"Aviso")):o.after(e),r=!0,i.remove(),v.requests++,a.ajaxCallback(v);var t=setInterval(function(){(0,U.isInViewport)(),0==document.querySelectorAll("img[src^='https://qbbr.vteximg.com.br/arquivos/QDBLoad.gif'").length&&clearInterval(t)},1e3)}}),s++}}))}};if(p=f=null!==a.searchUrl?a.searchUrl:w.getSearchUrl(),l&&0==$("a.vejamais-vtexresearch").length&&$("<a class='vejamais-vtexresearch' href='#'>ver mais produtos</a>").insertAfter(".pager.bottom"),o.length<1)return n("Nenhuma opção de filtro encontrada","Aviso"),a.showLinks&&jQuery(a.linksMenu).css("visibility","visible").show(),$(d).hasClass("resultado-busca")?w.infinitScroll(!0):w.infinitScroll(!1),w.scrollToTop(),o;if(y.length<1)return n("Elemento para destino da requisição não foi encontrado \n ("+y.selector+")"),!1;g.length<1&&n("O menu de filtros não foi encontrado \n ("+g.selector+")");document.location.href;var x=jQuery(a.linksMenu),P=jQuery('<div class="vtexSr-overlay"></div>'),A=jQuery(a.menuDepartament),k=y.offset(),_=1,S=null,j=null;a.emptySearchElem.append(a.emptySearchMsg),y.before(P);var C={exec:function(){C.setFilterMenu(),C.fieldsetFormat(),o.each(function(){var e=jQuery(this),t=e.parent();e.is(":checked")&&(h+="&"+(e.attr("rel")||""),t.addClass("sr_selected")),C.adjustText(e),t.append('<span class="sr_box"></span><span class="sr_box2"></span>'),e.bind("change",function(){C.inputAction(),e.is(":checked")?C.addFilter(e):C.removeFilter(e),v.filters=o.filter(":checked").length})}),""!==h&&C.addFilter(r)},mergeMenu:function(){if(!a.mergeMenu)return!1;var e=A;e.insertAfter(a.insertMenuAfter),C.departamentMenuFormat(e)},mergeMenuList:function(){var t=0;g.find("h3,h4").each(function(){var e=x.find("h3,h4").eq(t).next("ul");e.insertAfter(jQuery(this)),C.departamentMenuFormat(e),t++})},departamentMenuFormat:function(e){e.find("a").each(function(){var e=jQuery(this);e.text(C.removeCounter(e.text()))})},fieldsetFormat:function(){b.fieldsetCount=0,b.tmpCurrentLabel={},g.find("fieldset").each(function(){var n=jQuery(this),e=n.find("label"),i="filtro_"+(n.find("h5:first").text()||"").toLowerCase().replaceSpecialChars().replace(/\s/g,"-");b[i]={},e.length<1?n.hide():(n.addClass(i),e.each(function(e){var t=jQuery(this),o=t.find("input").val()||"",r="sr_"+o.toLowerCase().replaceSpecialChars().replace(/\s/g,"-");b.tmpCurrentLabel={fieldsetParent:[n,i],elem:t},b[i][e.toString()]={className:r,title:o},t.addClass(r).attr({title:o,index:e}),a.labelCallback(b)}),b.fieldsetCount++)})},inputAction:function(){null!==j&&j.abort(),null!==S&&S.abort(),s=2,l=!0},addFilter:function(e){h+="&"+(e.attr("rel")||""),P.fadeTo(300,.6),p=w.getUrl(),S=jQuery.ajax({url:p,success:C.filterAjaxSuccess,error:C.filterAjaxError}),e.parent().addClass("sr_selected")},removeFilter:function(e){var t=e.attr("rel")||"";P.fadeTo(300,.6),""!==t&&(h=h.replace("&"+t,"")),p=w.getUrl(),S=jQuery.ajax({url:p,success:C.filterAjaxSuccess,error:C.filterAjaxError}),e.parent().removeClass("sr_selected")},filterAjaxSuccess:function(e){var t=jQuery(e);P.fadeTo(300,0,function(){jQuery(this).hide()}),C.updateContent(t),v.requests++,a.ajaxCallback(v),u.animate({scrollTop:a.filterScrollTop(k||{top:0,left:0})},600)},filterAjaxError:function(){P.fadeTo(300,0,function(){jQuery(this).hide()}),alert(a.filterErrorMsg),n("Houve um erro ao tentar fazer a requisição da página com filtros.")},updateContent:function(e){if(m=!0,!a.authorizeUpdate(v))return!1;var t=e.filter(a.shelfClass),o=y.find(a.shelfClass);(0<o.length?o:a.emptySearchElem).slideUp(600,function(){jQuery(this).remove(),a.usePopup?d.find(".boxPopUp2").vtexPopUp2():a.emptySearchElem.remove(),0<t.length?(t.hide(),y.append(t),a.shelfCallback(),t.slideDown(600,function(){m=!1}),v.isEmpty=!1):(v.isEmpty=!0,a.usePopup?a.emptySearchElem.addClass("freeContent autoClose ac_"+a.popupAutoCloseSeconds).vtexPopUp2().stop(!0).show():(y.append(a.emptySearchElem),a.emptySearchElem.show().css("height","auto").fadeTo(300,.2,function(){a.emptySearchElem.fadeTo(300,1)})),a.emptySearchCallback(v))})},adjustText:function(e){var t=e.parent(),o=t.text();o=C.removeCounter(o),t.text(o).prepend(e)},removeCounter:function(e){return e.replace(/\([0-9]+\)/gi,function(e){return""})},setFilterMenu:function(){0<g.length&&(x.hide(),g.show())}};d.hasClass("departamento")?C.mergeMenu():(d.hasClass("categoria")||d.hasClass("resultado-busca"))&&C.mergeMenuList(),C.exec(),w.infinitScroll(!0),w.scrollToTop(),a.callback(),g.css("visibility","visible")},$(function(){var e={emptySearchMsg:'<div class="noFilterResults"><div class="ico-noFilterResults"></div><p>Não encontramos produtos que atenda a todos os filtros escolhidos.</p><span>DICA: Use combinações de filtros diferentes ou seja menos específico nas seleções.</span></div>',shelfCallback:function(){$(".quickViewLink").vtexPopUp2()}};$("body").hasClass("home")?$(".menuLeft .search-multiple-navigator input[type='checkbox']").vtexSmartResearch({emptySearchMsg:e.emptySearchMsg,searchUrl:"/buscapagina?PS=16&sl=ef3fcb99-de72-4251-aa57-71fe5b6e149f &cc=4&sm=0&PageNumber=",loadContent:".search_results",shelfCallback:function(){$(".quickViewLink").vtexPopUp2()},ajaxCallback:function(e){0<e.filters&&!1===e.isEmpty?$(".search_results").removeAttr("style"):$(".search_results").css({position:"absolute",left:"-9999em"}).children().slideUp(600)},authorizeScroll:function(e){return 0<e.filters},getShelfHeight:function(e){return e.offset().top+e.height()}}):$(".menuLeft .search-multiple-navigator input[type='checkbox']").vtexSmartResearch(e)})}};o.default={init:r.init}},{"../../global/global-index":3}],6:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r=i(e("./_departament-old")),n=i(e("./_vtex-smartResearch"));function i(e){return e&&e.__esModule?e:{default:e}}var a={init:function(){r.default.init(),n.default.init()}};o.default={init:a.init}},{"./_departament-old":4,"./_vtex-smartResearch":5}]},{},[2]);