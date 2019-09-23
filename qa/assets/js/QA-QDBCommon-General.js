!function o(s,i,a){function c(r,e){if(!i[r]){if(!s[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(l)return l(r,!0);throw new Error("Cannot find module '"+r+"'")}var n=i[r]={exports:{}};s[r][0].call(n.exports,function(e){var t=s[r][1][e];return c(t||e)},n,n.exports,o,s,i,a)}return i[r].exports}for(var l="function"==typeof require&&require,e=0;e<a.length;e++)c(a[e]);return c}({1:[function(e,t,r){var n,o;n=this,o=function(a){"use strict";var t="URLSearchParams"in self,r="Symbol"in self&&"iterator"in Symbol,c="FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),n="FormData"in self,o="ArrayBuffer"in self;if(o)var s=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],i=ArrayBuffer.isView||function(e){return e&&-1<s.indexOf(Object.prototype.toString.call(e))};function l(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function u(e){return"string"!=typeof e&&(e=String(e)),e}function e(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return r&&(e[Symbol.iterator]=function(){return e}),e}function d(t){this.map={},t instanceof d?t.forEach(function(e,t){this.append(t,e)},this):Array.isArray(t)?t.forEach(function(e){this.append(e[0],e[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function m(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function p(r){return new Promise(function(e,t){r.onload=function(){e(r.result)},r.onerror=function(){t(r.error)}})}function f(e){var t=new FileReader,r=p(t);return t.readAsArrayBuffer(e),r}function h(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function b(){return this.bodyUsed=!1,this._initBody=function(e){(this._bodyInit=e)?"string"==typeof e?this._bodyText=e:c&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:n&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:t&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():o&&c&&function(e){return e&&DataView.prototype.isPrototypeOf(e)}(e)?(this._bodyArrayBuffer=h(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):o&&(ArrayBuffer.prototype.isPrototypeOf(e)||i(e))?this._bodyArrayBuffer=h(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},c&&(this.blob=function(){var e=m(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?m(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(f)}),this.text=function(){var e=m(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,r=p(t);return t.readAsText(e),r}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},n&&(this.formData=function(){return this.text().then(y)}),this.json=function(){return this.text().then(JSON.parse)},this}d.prototype.append=function(e,t){e=l(e),t=u(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},d.prototype.delete=function(e){delete this.map[l(e)]},d.prototype.get=function(e){return e=l(e),this.has(e)?this.map[e]:null},d.prototype.has=function(e){return this.map.hasOwnProperty(l(e))},d.prototype.set=function(e,t){this.map[l(e)]=u(t)},d.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},d.prototype.keys=function(){var r=[];return this.forEach(function(e,t){r.push(t)}),e(r)},d.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),e(t)},d.prototype.entries=function(){var r=[];return this.forEach(function(e,t){r.push([t,e])}),e(r)},r&&(d.prototype[Symbol.iterator]=d.prototype.entries);var w=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function g(e,t){var r=(t=t||{}).body;if(e instanceof g){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new d(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new d(t.headers)),this.method=function(e){var t=e.toUpperCase();return-1<w.indexOf(t)?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function y(e){var o=new FormData;return e.trim().split("&").forEach(function(e){if(e){var t=e.split("="),r=t.shift().replace(/\+/g," "),n=t.join("=").replace(/\+/g," ");o.append(decodeURIComponent(r),decodeURIComponent(n))}}),o}function v(e,t){t=t||{},this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new d(t.headers),this.url=t.url||"",this._initBody(e)}g.prototype.clone=function(){return new g(this,{body:this._bodyInit})},b.call(g.prototype),b.call(v.prototype),v.prototype.clone=function(){return new v(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),url:this.url})},v.error=function(){var e=new v(null,{status:0,statusText:""});return e.type="error",e};var _=[301,302,303,307,308];v.redirect=function(e,t){if(-1===_.indexOf(t))throw new RangeError("Invalid status code");return new v(null,{status:t,headers:{location:e}})},a.DOMException=self.DOMException;try{new a.DOMException}catch(e){a.DOMException=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack},a.DOMException.prototype=Object.create(Error.prototype),a.DOMException.prototype.constructor=a.DOMException}function x(s,i){return new Promise(function(r,e){var t=new g(s,i);if(t.signal&&t.signal.aborted)return e(new a.DOMException("Aborted","AbortError"));var n=new XMLHttpRequest;function o(){n.abort()}n.onload=function(){var e={status:n.status,statusText:n.statusText,headers:function(e){var o=new d;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var t=e.split(":"),r=t.shift().trim();if(r){var n=t.join(":").trim();o.append(r,n)}}),o}(n.getAllResponseHeaders()||"")};e.url="responseURL"in n?n.responseURL:e.headers.get("X-Request-URL");var t="response"in n?n.response:n.responseText;r(new v(t,e))},n.onerror=function(){e(new TypeError("Network request failed"))},n.ontimeout=function(){e(new TypeError("Network request failed"))},n.onabort=function(){e(new a.DOMException("Aborted","AbortError"))},n.open(t.method,t.url,!0),"include"===t.credentials?n.withCredentials=!0:"omit"===t.credentials&&(n.withCredentials=!1),"responseType"in n&&c&&(n.responseType="blob"),t.headers.forEach(function(e,t){n.setRequestHeader(t,e)}),t.signal&&(t.signal.addEventListener("abort",o),n.onreadystatechange=function(){4===n.readyState&&t.signal.removeEventListener("abort",o)}),n.send(void 0===t._bodyInit?null:t._bodyInit)})}x.polyfill=!0,self.fetch||(self.fetch=x,self.Headers=d,self.Request=g,self.Response=v),a.Headers=d,a.Request=g,a.Response=v,a.fetch=x,Object.defineProperty(a,"__esModule",{value:!0})},"object"==typeof r&&void 0!==t?o(r):"function"==typeof define&&define.amd?define(["exports"],o):o(n.WHATWGFetch={})},{}],2:[function(e,t,r){"use strict";var n,o=e("./modules/General/general-index");((n=o)&&n.__esModule?n:{default:n}).default.init()},{"./modules/General/general-index":4}],3:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),e("whatwg-fetch");var n={getBrowserVendor:function(){return navigator.vendor.match(/google/i)?"chrome/blink":navigator.vendor.match(/apple/i)?"safari/webkit":navigator.userAgent.match(/firefox\//i)?"firefox/gecko":navigator.userAgent.match(/edge\//i)?"edge/edgehtml":navigator.userAgent.match(/trident\//i)?"ie/trident":navigator.userAgent+"\n"+navigator.vendor},Polyfill:function(){Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');var r=Object(this),n=r.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var o=t,s=0;s<n;){var i=r[s];if(e.call(o,i,s,r))return i;s++}}})},isInViewport:function(){var e=document.querySelectorAll("source, img");if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e,t){e.forEach(function(e){0<e.intersectionRatio&&(n(e.target),t.unobserve(e.target))})},{root:null,rootMargin:"0px",threshold:.5});e.forEach(function(e){return t.observe(e)})}else for(var r=0;r<document.querySelectorAll("source, img").length;r++)n(document.querySelectorAll("source, img")[r]);function n(e){e.dataset&&e.dataset.src&&(e.src=e.dataset.src),e.dataset&&e.dataset.srcset&&(e.srcset=e.dataset.srcset)}},getCookie:function(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]+)"));if(t)return t[2]}};r.default={Polyfill:n.Polyfill,BrowserVendor:n.getBrowserVendor,isInViewport:n.isInViewport,GetCookie:n.getCookie}},{"whatwg-fetch":1}],4:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=e("../../global/global-index"),_=(n=o)&&n.__esModule?n:{default:n};var s,i={init:function(){i.ServiceWorker(),i.General(),i.TopBanner(),_.default.isInViewport(),i.SendNewsletter(),"ie/trident"==_.default.BrowserVendor()&&_.default.Polyfill()},Region:(s=function(){Region.init(),document.querySelector(".--openRegiao").addEventListener("click",function(){document.querySelector(".modalRegional").classList.remove("hidden")}),document.querySelector(".modalRegional__overlay").addEventListener("click",function(){document.querySelector(".modalRegional").classList.add("hidden")})},a.toString=function(){return s.toString()},a),ServiceWorker:function(){var e,t,r=_.default.GetCookie("SWExpiration");"serviceWorker"in navigator&&(null==r?(document.cookie="SWExpiration="+((new Date).getTime()+18e5),window.addEventListener("load",function(){navigator.serviceWorker.register("/files/service-worker.js",{scope:"/"}).then(function(e){console.log("%cServiceWorker registration successful with scope:"+e.scope+" 💯",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;')},function(e){console.log("%cServiceWorker registration failed: "+e+" 🥺🥺",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#FC2626; color: #FDFDFD;')})})):(e=r,t=Date.now()-18e5,console.log(t),console.log(e),t<e?console.log("%cClient is under cache of Service Worker 💯",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;'):(document.cookie="SWExpiration="+((new Date).getTime()+18e5),caches.delete("dynamicCache").then(function(e){console.log("%cDeleted dynamicCache",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;')}),caches.delete("staticCache").then(function(e){console.log("%cDeleted staticCache",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#5FCC47; color: #FDFDFD;')}),navigator.serviceWorker.register("/files/service-worker.js",{scope:"/"}).then(function(e){e.update(),console.log("%cUpdated Service Worker",'font-family:"sans-serif"; padding: 10px; border-radius: 5px; background:#09DDED; color: #FDFDFD;')}))))},TopBanner:function(){function e(){var e=document.querySelector(".w-counter--bg").textContent;if(document.querySelector(".w-counter").style.backgroundColor=e,null!=document.querySelector(".w-counter--container")){var t=document.createElement("span");t.classList.add("w-counter--container--counterbar");var r=document.createElement("span");r.classList.add("w-counter--bar"),document.querySelector(".w-counter--container").appendChild(t),document.querySelector(".w-counter--container--counterbar").appendChild(r),document.querySelector(".w-counter--container--counterbar").style.backgroundColor=e,document.querySelector(".w-counter--container").classList.remove("hide-important");var n=document.querySelector(".w-counter--end").textContent;(n=n.split("/"))[2]=n[2].split(" "),n=n[2][0]+"/"+n[0]+"/"+n[1]+" "+n[2][1];var l=new Date(n),u=1e3,d=60*u,m=60*d,p=24*m,f=0;f=setInterval(function(){var e=new Date,t=l-e;if(t<=0)return clearInterval(f),document.querySelector(".w-counter--container").classList.add("hidden"),void(null!=document.querySelector(".w-counter--cupom")&&(document.querySelector(".w-counter--cupom").classList.remove("hidden"),document.querySelector(".w-counter-copy").classList.remove("hidden")));Math.floor(t/p);var r=Math.floor(t/36e5),n=Math.floor(t%m/d),o=Math.floor(t%d/u),s=document.querySelector(".w-counter--hour"),i=document.querySelector(".w-counter--minutes"),a=document.querySelector(".w-counter--seconds"),c=(document.querySelector(".w-counter--info"),e.getTime()/l.getTime()*100);document.querySelector(".w-counter--bar").style.width=c+"%",s.innerHTML=r<10?"0"+r:r,i.innerHTML=n<10?"0"+n:n,a.innerHTML=o<10?"0"+o:o},1e3)}}setTimeout(function(){null!=document.querySelector(".w-counter-copy")&&function(){var t=document.querySelector(".w-counter-copy"),r=document.querySelector(".w-counter--cupom");t.addEventListener("click",function(e){e.preventDefault,r.select(),document.execCommand("copy"),t.textContent="COPIADO",t.classList.add("btn-success"),setTimeout(function(){t.textContent="COPIAR",t.classList.remove("btn-success")},3e3)})}(),null!=document.querySelector(".w-counter")&&("safari/webkit"==_.default.BrowserVendor()?setTimeout(function(){e()},3e3):e())},500)},SendNewsletter:function(){window.onload=function(){document.querySelector("#nl_form #submit_button").addEventListener("click",function(e){e.preventDefault();var t=new Date,r=""+t.getFullYear()+"-"+((t.getMonth()<=10?"0":"")+(t.getMonth()+1))+"-"+((t.getDate()<10?"0":"")+t.getDate())+" "+((t.getHours()<10?"0":"")+t.getHours())+":"+((t.getMinutes()<10?"0":"")+t.getMinutes())+":"+((t.getSeconds()<10?"0":"")+t.getSeconds()),n=JSON.stringify({origin:"ECOMM",campaign:"NEWSLETTER",date:r,name:null,email:document.querySelector("#nl_email").value,acceptEmail:!0}),o=0==document.querySelector("input[name='validation-field']").value;if(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(document.querySelector("#nl_email").value)&&o){var s=new XMLHttpRequest;s.open("POST","/api/dataentities/PS/documents",!0),s.setRequestHeader("accept","application/vnd.vtex.ds.v10+json"),s.setRequestHeader("content-type","application/json"),s.send(n),s.addEventListener("load",function(e){document.querySelector("#nl_form .form-success").style.display="block",document.querySelector("#nl_form .form-controls").remove(),document.querySelector("#nl_form #submit_button").remove()}),s.addEventListener("error",function(e){document.querySelector("#nl_form .form-error").style.display="block"})}})}},General:function(){var t=[{text:"Entre ou cadastre-se",link:"https://www.quemdisseberenice.com.br/account/"},{text:"Boca",menu:[{text:"Boca",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"http://www.quemdisseberenice.com.br/maquiagem/boca",class:["__bold"]},{text:"Pincel",link:"https://www.quemdisseberenice.com.br/maquiagem/boca/pincel"},{text:"Batom líquido",link:"https://www.quemdisseberenice.com.br/maquiagem/boca/batom-liquido"},{text:"Batom",link:"https://www.quemdisseberenice.com.br/maquiagem/boca/batom?PS=24&O=OrderByBestDiscountDESC"},{text:"Gloss",link:"http://www.quemdisseberenice.com.br/maquiagem/boca/gloss/"},{text:"Lápis boca",link:"https://www.quemdisseberenice.com.br/maquiagem/boca/lapis-boca/"},{text:"Cuidados p/ os lábios",link:"https://www.quemdisseberenice.com.br/maquiagem/boca/cuidado-labial"}]},{text:"Olhos",menu:[{text:"Olhos",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"https://www.quemdisseberenice.com.br/maquiagem/olhos",class:["__bold"]},{text:"Paleta",link:"https://www.quemdisseberenice.com.br/maquiagem/olhos/paleta"},{text:"Cuidados p/ a área dos olhos",link:"https://www.quemdisseberenice.com.br/maquiagem/olhos/creme-para-area-dos-olhos"},{text:"Máscara para cílios",link:"https://www.quemdisseberenice.com.br/maquiagem/olhos/mascara/"},{text:"Delineador",link:"https://www.quemdisseberenice.com.br/maquiagem/olhos/delineador/"},{text:"Lápis",link:"https://www.quemdisseberenice.com.br/maquiagem/olhos/lapis/"},{text:"Sombra",link:"https://www.quemdisseberenice.com.br/maquiagem/olhos/sombra/"},{text:"Primer",link:"https://www.quemdisseberenice.com.br/maquiagem/olhos/primer/"},{text:"Pigmento e Gliter",link:"http://busca.quemdisseberenice.com.br/busca?q=glitter+e+pigmentos"}]},{text:"Sobrancelhas",menu:[{text:"Sobrancelhas",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"https://www.quemdisseberenice.com.br/maquiagem/sobrancelhas",class:["__bold"]},{text:"Paleta",link:"https://www.quemdisseberenice.com.br/maquiagem/sobrancelhas/paleta"},{text:"Lápis e caneta",link:"https://www.quemdisseberenice.com.br/maquiagem/sobrancelhas/caneta"},{text:"Gel",link:"https://www.quemdisseberenice.com.br/maquiagem/sobrancelhas/gel"},{text:"Pinça",link:"https://www.quemdisseberenice.com.br/maquiagem/sobrancelhas/pinca"},{text:"Pincel",link:"https://www.quemdisseberenice.com.br/maquiagem/sobrancelhas/pincel"}]},{text:"Rosto",menu:[{text:"Rosto",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto",class:["__bold"]},{text:"Hidratante Facial",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/hidratante-facial"},{text:"Base",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/base/"},{text:"Pó facial",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/po-facial/"},{text:"Blush",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/blush/"},{text:"Corretivo",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/corretivo/"},{text:"Iluminador",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/iluminador/"},{text:"Bronze",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/bronze/"},{text:"Primer",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/primer/"},{text:"BB e CC Creme",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/bb-e-cc-creme"},{text:"Contorno",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/contorno-facial"},{text:"Demaquilante",link:"https://www.quemdisseberenice.com.br/maquiagem/rosto/demaquilante/"}]},{text:"Unhas",menu:[{text:"Unhas",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"http://www.quemdisseberenice.com.br/unhas",class:["__bold"]},{text:"Esmaltes",link:"http://www.quemdisseberenice.com.br/unhas/esmaltes"},{text:"Cuidados com as unhas",link:"http://busca.quemdisseberenice.com.br/busca?q=cuidado+para+unhas"}]},{text:"Perfumaria",menu:[{text:"Perfumaria",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"https://www.quemdisseberenice.com.br/perfumaria/",class:["__bold"]},{text:"Perfumaria",link:"https://www.quemdisseberenice.com.br/perfumaria/"},{text:"Corpo e banho",link:"https://www.quemdisseberenice.com.br/corpo-e-banho/"}]},{text:"Cabelos",menu:[{text:"Cabelos",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"https://www.quemdisseberenice.com.br/cabelos/",class:["__bold"]},{text:"Coloração",link:"https://www.quemdisseberenice.com.br/cabelos/pra-colorir"},{text:"Estilização",link:"https://www.quemdisseberenice.com.br/cabelos/pra-estilizar"},{text:"Cuidados c/ os cabelos",link:"https://www.quemdisseberenice.com.br/cabelos/pra-por-e-tirar"}]},{text:"Acessórios",menu:[{text:"Acessórios",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"https://www.quemdisseberenice.com.br/acessorios-para-maquiagem/",class:["__bold"]},{text:"Para os cílios",link:"https://www.quemdisseberenice.com.br/acessorios-para-maquiagem/para-os-cilios"},{text:"Pinceis e Esponjas",link:"https://www.quemdisseberenice.com.br/acessorios-para-maquiagem/pinceis-e-esponjas"},{text:"Nécessaire e Organizadores",link:"https://www.quemdisseberenice.com.br/acessorios-para-maquiagem/necessaire-e-organizadores"},{text:"Espelhos",link:"https://www.quemdisseberenice.com.br/acessorios-para-maquiagem/espelhos/"}]},{text:"Kits e presentes",menu:[{text:"Kits e presentes",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"https://www.quemdisseberenice.com.br/kits-e-presentes",class:["__bold"]},{text:"Kits",link:"https://www.quemdisseberenice.com.br/kits-e-presentes/kits"},{text:"Caixas para presente",link:"https://www.quemdisseberenice.com.br/kits-e-presentes/embalagens-pra-presente"}]},{text:"Dicas",menu:[{text:"Dicas",class:["__arrow-left","__close-submenu"]},{text:"Ver tudo",link:"https://www.quemdisseberenice.com.br/tutoriais-dicas-de-beleza",class:["__bold"]},{text:"Sobrancelha",link:"https://www.quemdisseberenice.com.br/maquiagem-para-sobrancelhas"},{text:"Base",link:"https://www.quemdisseberenice.com.br/qual-a-melhor-base"},{text:"Batom",link:"https://www.quemdisseberenice.com.br/escolha-o-seu-batom"},{text:"Máscara",link:"https://www.quemdisseberenice.com.br/guia-mascara-pra-cilios"},{text:"Paletas de Sombras",link:"https://www.quemdisseberenice.com.br/paletas-de-sombras"},{text:"Base Cushion",link:"https://www.quemdisseberenice.com.br/nova-base-cushion"},{text:"Monte sua Paleta de Sombras",link:"https://www.quemdisseberenice.com.br/monte-sua-paleta-de-sombras"},{text:"Família Instamatte",link:"https://www.quemdisseberenice.com.br/familia-instamatte"}]},{text:"Promoções",link:"https://www.quemdisseberenice.com.br/promocao",class:["__light-turquoise"]},{text:"Lançamentos",class:["__light-turquoise"],link:"https://www.quemdisseberenice.com.br/lancamentos"},{text:"Clube das berês",class:["__light-turquoise"],link:"https://www.quemdisseberenice.com.br/clube-das-beres"},{text:"Retorna Berê",class:["__light-turquoise"],link:"https://www.quemdisseberenice.com.br/retorna-bere"},{text:"Ajuda",class:["__dark"],link:"https://www.quemdisseberenice.com.br/institucional/atendimento"}];String.prototype.accentsTidy=function(){var e=this.trim();return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace(/,/g," ")).replace(/\s+/g," ")).replace(/(\s|&|\?)/g,"-")).replace(/\u00e7/g,"c")).replace(/\u00f1/g,"n")).replace(/\u00c7/g,"C")).replace(/\u00d1/g,"N")).replace(/[\u00c3\u00c2\u00c1\u00c0\u00c4]/g,"A")).replace(/[\u00c9\u00c8\u00cb]/g,"E")).replace(/[\u00cd\u00cc\u00cf]/g,"I")).replace(/[\u00d5\u00d4\u00d3\u00d2\u00d6]/g,"O")).replace(/[\u00da\u00d9]/g,"U")).replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g,"a")).replace(/[\u00e8\u00e9\u00ea\u00eb]/g,"e")).replace(/[\u00ec\u00ed\u00ee\u00ef]/g,"i")).replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g,"o")).replace(/[\u00f9\u00fa\u00fb\u00fc]/g,"u")};e=jQuery,window,document;var e,f,o,h,s,i,r=(jQuery,window,document,function(e){return function n(e,o){return(o=o||[]).push("<ul>"),e.forEach(function(e){if(e.off)return!0;var t="<a>",r="<li>";e.link&&(t='<a href="'+e.link+'">'),e.class&&e.class instanceof Array&&(r='<li class="'+e.class.join(" ")+'">'),o.push(r+t+e.text+"</a>"),e.menu&&n(e.menu,o),o.push("</li>")}),o.push("</ul>"),o.join("")}(e)});f=jQuery,o=window,document,h={cart:"<div class='mr-minicart'>{%CART%}</div>",promo:'<div class="mr-shipping"><div class="mr-shipping-lbl-container"><span class="mr-shipping-lbl">{%PROMOMSG%}</span></div><div class="mr-shipping-pb-container" {%PROMOBAR%}><span class="mr-progress-bar"><small {%PROMOSTYLE%}></small></span></div> </div>',footer:"<div class='mr-footer'>{%FOOTER%}</div>",totals:"<div class='mr-totals'><div class='mr-total mr-discounts'><span class='mr-lbl'>Descontos:</span><span class='mr-discount-val'>{%DISCOUNT%}</span></div><div class='mr-total'><span class='mr-lbl'>Total:</span><span class='mr-total-val'>{%TOTAL%}</span></div><div class='mr-goto-cart'><a href='/checkout/#/cart'>Fechar pedido</a></div></div>",list:"<div class='mr-prod-list-wrapper'><div class='mr-prod-list'>{%ITEMS%}</div></div>",item:"<div class='mr-prod-item'><a class='mr-link' href='{%LINK%}'><span class='mr-img'><img src='{%IMG%}'/></span><span class='mr-prod-brand'>{%BRAND%}</span><span class='mr-prod-name'>{%NAME%}</span><span class='mr-prod-qty'>Qtde: <small>{%QTY%}</small></span><span class='mr-prod-price'><em>{%PRICE%}</em></span></a><a class='mr-rm __close-icon-black' {%REMOVE%}>X</a></div>",emptyCart:'<div class="mr-empty"><div class="mr-msg">Não há produtos em sua sacola.</div><div class="mr-suggestions"></div></div>'},f.fn.mProdsList=function(e){return function(e,t){var r,m=e,p=(f({},t),{qtyProds:0,discounts:0,totalPrice:0,items:[],on_off_class:"cart-show",formatMoney:function(e,t,r,n){var o=e;t=isNaN(t=Math.abs(t))?2:t,r=null==r?".":r,n=null==n?",":n;var s=o<0?"-":"",i=parseInt(o=Math.abs(+o||0).toFixed(t))+"",a=3<(a=i.length)?a%3:0;return s+(a?i.substr(0,a)+n:"")+i.substr(a).replace(/(\d{3})(?=\d)/g,"$1"+n)+(t?r+Math.abs(o-i).toFixed(t).slice(2):"")},init:function(){return p.get.vtexjs()&&p.get.items(),!0},set:{events:function(){var e="click.Minicart";return f(m).find(".close").unbind(e).bind(e,function(){f("html").removeClass(p.on_off_class)}),!0},hasProds:function(){return 0<(m.data("items")||0)?f("html").addClass("cart-has-products"):f("html").removeClass("cart-has-products"),!0}},get:{vtexjs:(r=function(){return"object"===("undefined"==typeof vtexjs?"undefined":v(vtexjs))||f.getScript("http://io.vtex.com.br/vtex.js/2.3.0/vtex.js",function(){p.init()}),!0},n.toString=function(){return r.toString()},n),items:function(){return"undefined"!=typeof vtexjs&&(vtexjs.checkout.getOrderForm().then(function(e){o.order=e,p.items=e.items,p.discounts=e.totalizers&&0<e.totalizers.length&&null!=e.totalizers[1]&&e.totalizers[1].hasOwnProperty("id")&"Discounts"==e.totalizers[1].id&&0!=_orderForm.totalizers[1].value?e.totalizers[1].value:0,p.totalPrice=e.totalizers&&0<e.totalizers.length&&e.totalizers[0].value?e.totalizers[0].value:0,m.data("total",p.totalPrice/100*1),p.mount()}),!0)},money:function(e){return"R$ "+p.formatMoney(e,2,",",".")},promo:function(){var e=f("._mini-cart-data script").text().split("\n");if(e.length<3)return{msg:"",value:0,percentage:0,style:""};var t=e[1],r=1*e[0]*100;if(!isFinite(r))return!1;var n=Math.round(p.totalPrice/r*100),o=r>=p.totalPrice?(r-p.totalPrice)/100:0;0<o&&(t=t.replace(/{%VALOR%}/,p.get.money(o)));var s='style="width:'+n+'%;"';return 100<=n&&(t=e[2]),{msg:t,value:r,percentage:n,style:s}}},mount:function(){var e="",t="",r=0;if(0<p.items.length){var n=p.items.length-1;for(var o in p.items.reverse())if(p.items.hasOwnProperty(o)){var s=p.get.money(p.items[o].price/100);r+=1*p.items[o].quantity,t=(t=h.item.replace(/{%LINK%}/,p.items[o].detailUrl).replace(/{%IMG%}/,p.items[o].imageUrl).replace(/{%BRAND%}/,p.items[o].additionalInfo.brandName).replace(/{%NAME%}/,p.items[o].name).replace(/{%QTY%}/,p.items[o].quantity).replace(/{%PRICE%}/,s)).replace(/mr-prod-item/,"mr-prod-item _mr-prod-item-"+n),e+=t=p.items[o].isGift?t.replace(/mr-prod-item/,"mr-prod-item _gift").replace(/{%REMOVE%}/,'onclick="mProdsList.gift('+n+');"'):t.replace(/{%REMOVE%}/,'onclick="mProdsList.del(this,'+n+');"'),n--}var i=h.list.replace("{%ITEMS%}",e),a=p.get.promo(),c="";a&&isFinite(a.value)&&0<a.value&&(c+=h.promo.replace("{%PROMOMSG%}",a.msg).replace("{%PROMOSTYLE%}",a.style),100<=a.percentage&&(c=c.replace("{%PROMOBAR%}",'style="display:none;"')));var l="R$"+(p.totalPrice/100+p.discounts/100).toFixed(2).replace(".",","),u="-R$"+(p.discounts/100).toFixed(2).replace(".",",").replace("-","");c+=h.totals.replace("{%TOTAL%}",l).replace("{%DISCOUNT%}",u),i+=h.footer.replace("{%FOOTER%}",c),m.removeClass("__cart-empty __cart-loading")}else i=h.emptyCart,m.removeClass("__cart-loading"),m.addClass("__cart-empty");i=h.cart.replace("{%CART%}",i);var d=f(i);return d.find(".mr-prod-item:not('._gift')").wrapAll('<div class="mr-prod-items"></div>'),d.find("._gift").wrapAll('<div class="mr-gifts"></div>'),d.find(".mr-gifts").prepend('<div class="mr-gifts-lbl">Você ganhou!</div>'),m.data("items",r),m.html(d),p.set.hasProds(),p.set.events(),!0},del:function(e,r){return"undefined"!=typeof vtexjs&&(f(e).parent().addClass("__mr-deleting"),vtexjs.checkout.getOrderForm().then(function(e){var t=e.items[r];return t.index=r,vtexjs.checkout.removeItems([t])}).done(function(e){p.refresh(),p.set.hasProds()}),!0)},gift:function(e){return!0},refresh:function(){return p.init(),!0}});function n(){return r.apply(this,arguments)}p.init(t),o.mProdsList={init:p.init,refresh:p.refresh,items:function(){return m.data("items")},total:function(){return m.data("total")},del:p.del,gift:p.gift}}(this,e)},s=jQuery,i=window,document,s.fn.mMinicart=function(e){var t=s(this),r=s.extend({descontos:".mr-discount-val",items:".amount-items-em",total:".total-cart-em"},e),n={init:function(){return t.mProdsList(),!0},refresh:function(){return mProdsList.refresh(),s(r.descontos).text(mProdsList.discounts()),s(r.items).text(mProdsList.items()),s(r.total).text(mProdsList.total()),!0}};n.init(),i.mMinicart={refresh:n.refresh,items:function(){return mProdsList.items()},total:function(){return mProdsList.total()}}};var n,a,c,l,u,d,m,p,b,w=(n=jQuery,window,document,a={mainContainer:".SuperMenu",speed:200,padding:0,onOffClass:"__menu-show",init:function(){return a.set.events.all(),a.set.hasChildren(),!0},set:{events:{all:function(){return a.set.events.menu(),a.set.events.openMenu(),a.set.events.closeMenu(),!0},menu:function(){var e="click.Interface";return n("._super-menu a").off(e).on(e,function(){var e=n(this);0<e.siblings().length&&(n("._super-menu .__super-menu-last").removeClass("__super-menu-last"),e.addClass("__super-menu-last"),n(".__super-menu-on").removeClass("__super-menu-on"),e.parent().addClass("__super-menu-on"),n("._super-menu-options").html(e.clone(!1)),a.set.events.menuSelected(),n(a.mainContainer).parent().addClass("__submenu-show")),n("._super-menu").scrollTop(0),n(".SidebarLeft").scrollTop(0)}),n("._super-menu .__close-submenu").off("click.Interface").on("click.Interface",function(e){a.close.submenu()}),!0},menuSelected:function(){var e="click.Interface";return n("._super-menu-options a").not(".__act").addClass("__act").off(e).on(e,a.close.submenu),!0},openMenu:function(){return n("html").off("open.SuperMenu").on("open.SuperMenu",function(e){n("html").hasClass(a.onOffClass)?a.close.menu():a.open.menu()}),!0},closeMenu:function(){return n("html").off("close.SuperMenu").on("close.SuperMenu",function(e){a.close.menu()}),!0}},hasChildren:function(){return n("._super-menu a").each(function(e,t){0<n(t).siblings().length&&n(t).addClass("__hasChildren")}),!0}},open:{menu:function(){return n("html").addClass(a.onOffClass),!0}},close:{menu:function(){return n("html").removeClass(a.onOffClass),n(".__super-menu-last").removeClass("__super-menu-last"),n(".__super-menu-on").removeClass("__super-menu-on"),a.close.submenu(),!0},submenu:function(){n("._super-menu-options > *");n(".__submenu-show").removeClass("__submenu-show"),n(".__super-menu-on").removeClass("__super-menu-on")}}});function g(){return!function(){var r=!1;return c(dataLayer).each(function(e,t){t.visitorLoginState&&(r=t.visitorLoginState)}),r}()?c("html").removeClass("__user-logged"):c("html").addClass("__user-logged"),!0}c=jQuery,l=window,u=document,b={_menuContainer:".SuperMenu ._super-menu",init:function(){return b.menu.mount()&&b.set.events(),!0},set:{events:function(){return b.set.menu.open(),b.set.menu.close(),!0},menu:{open:function(){return c("._menu-cat").off("click.Menu").on("click.Menu",function(e){e.preventDefault(),c("html").trigger("open.SuperMenu")}),!0},close:function(){return c("._super-menu-close").off("click.Menu").on("click.Menu",function(){c("html").trigger("close.SuperMenu")}),!0}}},menu:{mount:function(){if("function"!=typeof r)return!1;var e=r(t);return c(b._menuContainer).html(e),!0}}},c("header._header").length<0||(/utm_source=newheader/.test(u.location.search)&&c("header.header").remove(),c("html").addClass("_d-top"),c("input.search-btn").addClass("_d-search"),c("._header").removeClass("_d-top"),g(),c("html").off("close.AllFloats").on("close.AllFloats",function(e){c("html").trigger("close.SuperMenu"),c("html").trigger("close.MiniCart"),c("._top-bar .__on").removeClass("__on")}),p=c('<div class="__overlay"></div>'),0<c("body .__overlay").length&&(p=c("body .__overlay")),p.html('<div class="__overlay-bkg"></div>'),p.off("click.Interface").on("click.Interface",function(e){c("html").trigger("close.AllFloats")}),c("body").filter(function(){return c(".__overlay").length<=0}).append(p),b.init(),w.init(),c("html").off("open.MiniCart").on("open.MiniCart",function(e){e.preventDefault(),"function"==typeof c.fn.mMinicart&&(c("._minicartBody").mMinicart(),c("html").addClass("__cart-show"))}),c("html").off("close.MiniCart").on("close.MiniCart",function(e){c("html").removeClass("__cart-show")}),c(".__cart-link").off("click.Cart").on("click.Cart",function(e){e.preventDefault(),c("html").trigger("open.MiniCart")}),c(".__close-cart").off("click.Cart").on("click.Cart",function(e){e.preventDefault(),c("html").trigger("close.MiniCart")}),(m=c("._banner-promo")).length<=0||m.off("click.BannerPromo").on("click.BannerPromo",function(e){c("html").addClass("__promo-banner-off")}),c("._sidebarleft-links").each(function(e,t){c(t).find("> *:first").off("click.Interface").on("click.Interface",function(e){c(this).parent().toggleClass("__links-show")})}),c("._top-bar-links > * > a").off("click.Interface").on("click.Interface",function(e){e.preventDefault(),e.stopPropagation();var t=c(this).parent().hasClass("__on");c("._top-bar-links > *").removeClass("__on"),t||c(this).parent().addClass("__on")}),c(l).off("click.Interface_TL").on("click.Interface_TL",function(e){c("._top-bar-links > *").removeClass("__on")}),0<(d=c("._banner-promo").children().length)&&c("._banner-promo").addClass("_on"),1<d&&c("._banner-promo").addClass("_animated"),c(l).off("scroll").on("scroll",function(){30<c(l).scrollTop()?(c("html").removeClass("_d-top"),c("input.search-btn").removeClass("_d-search")):(c("html").addClass("_d-top"),c("input.search-btn").addClass("_d-search"),c("._header-search-bar").removeClass("activeHeaderSearch"))}),vtexjs.checkout.getOrderForm().done(function(e){l._orderForm=e;var r=0;c(e.items).each(function(e,t){t.isGift||(r+=t.quantity)}),isFinite(r)&&c(".__cart-link a span").text(r)})),$(document).ready(function(){$("input.search-btn").on("click",function(){$(this).hasClass("_d-search")?$("._header-search-bar").removeClass("activeHeaderSearch"):(event.preventDefault(),$("._header-search-bar").toggleClass("activeHeaderSearch"),$(".search-field").focus())}),$(window).width()<768&&$("input.search-btn").on("click",function(){$("._header-search-bar").toggleClass("activeHeaderSearchMOB")})}),$(window).on("load",function(){var e=$("._header-search-bar"),t=$(".ac-container"),r=$(".ac-overlay"),n=$("body");e.append(t),e.on("click",function(){t.addClass("lr-search-visible"),r.addClass("lr-search-visible")}),r.on("click",function(){if("safari/webkit"==_.default.BrowserVendor())try{t.removeClass("lr-search-visible"),r.removeClass("lr-search-visible"),console.log("search off working on ios")}catch(e){console.log(e)}else n.hasClass("nm-noscroll")&&(t.removeClass("lr-search-visible"),r.removeClass("lr-search-visible"))})}),window.getAllElementsWithAttribute=function(e){for(var t=[],r=document.getElementsByTagName("*"),n=0,o=r.length;n<o;n++)null!==r[n].getAttribute(e)&&t.push(r[n]);return t},window.isInViewport=function(e){var t=e.getBoundingClientRect();return 0<=t.top&&0<=t.left&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)};var y=0;window.onscroll=function(){!function(){if("1150"<=window.innerWidth&&(document.querySelector("body").style.marginTop=document.querySelector("._header").clientHeight+"px"),window.pageYOffset>=document.querySelector("._header").clientHeight){document.querySelector("._header").style.position="fixed";var e=window.pageYOffset;window.innerWidth<="768"&&(document.querySelector("._header").style.top=e<y?0:-document.querySelector("._header").clientHeight+"px"),y=e}else"1150"<=window.innerWidth?(document.querySelector("._header").style.position="fixed",document.querySelector("body").style.marginTop!=document.querySelector("._header").clientHeight&&setTimeout(function(){document.querySelector("body").style.marginTop=document.querySelector("._header").clientHeight+"px"},100)):document.querySelector("._header").style.position="initial"}()}}};function a(){return s.apply(this,arguments)}r.default={init:i.init,vitrine:i.Vitrine,getBrowserVendor:i.getBrowserVendor}},{"../../global/global-index":3}]},{},[2]);