!function n(s,c,i){function o(r,e){if(!c[r]){if(!s[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(l)return l(r,!0);throw new Error("Cannot find module '"+r+"'")}var a=c[r]={exports:{}};s[r][0].call(a.exports,function(e){var t=s[r][1][e];return o(t||e)},a,a.exports,n,s,c,i)}return c[r].exports}for(var l="function"==typeof require&&require,e=0;e<i.length;e++)o(i[e]);return o}({1:[function(e,t,r){"use strict";var a,n=e("./modules/General/Vitrine/VitrineContainer.jsx"),i=(a=n)&&a.__esModule?a:{default:a};var s={init:function(){s.productsSlick(),s.twentyBanner(),s.getProductBannerInfo(),s.getProductReview(),s.hideEmptySections(),s.buildVitrines()},productsSlick:function(){$(document).ready(function(){$(".slick-products-list").slick({dots:!0,infinite:!0,slidesToShow:3,slidesToScroll:2,responsive:[{breakpoint:550,settings:{slidesToShow:2,slidesToScroll:2,infinite:!0,dots:!0}}]})})},twentyBanner:function(){var e=768<window.outerWidth?document.querySelector(".banner-before-after.desk"):document.querySelector(".banner-before-after.mob"),t=e.querySelector(".img-before span");if(void 0!==t&&null!=t){var r=document.createElement("img");r.setAttribute("src",e.querySelector(".img-before span").innerHTML),e.querySelector(".twentytwenty-container").appendChild(r);var a=document.createElement("img");a.setAttribute("src",e.querySelector(".img-after span").innerHTML),e.querySelector(".twentytwenty-container").appendChild(a)}document.addEventListener("readystatechange",function(e){"complete"===e.target.readyState&&($(".twentytwenty-container").twentytwenty({default_offset_pct:.69,orientation:"horizontal"}),$(window).trigger("resize"))})},getProductBannerInfo:function(){document.querySelectorAll(".panel-product").forEach(function(e){var t=e.querySelector(".product-id").textContent.split(";")[0],i=e.querySelector(".product-id").textContent.split(";")[1],o=e.querySelector(".title"),l=e.querySelector(".description"),u=e.querySelector(".discount"),d=e.querySelector(".installment"),m=e.querySelector(".old-price"),f=e.querySelector(".new-price"),p=e.querySelector(".button");fetch("https://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:"+t).then(function(e){return e.json()}).then(function(e){var t=e[0].items;for(var r in t){var a=t[r];if(t.hasOwnProperty(r)&&a.itemId==i){var n=a.sellers[0].commertialOffer.ListPrice,s=a.sellers[0].commertialOffer.Price,c=parseInt(100-s/n*100);o.innerHTML=e[0].productName,l.innerHTML=e[0]["porque a gente ama"][0],f.innerHTML="R$ "+s.toFixed(2).replace(".",","),m.innerHTML=n!=s?"R$ "+n.toFixed(2).replace(".",","):"",u.innerHTML=0<c?c+"%":u.remove(),p.setAttribute("href","/"+e[0].linkText+"/p"),d.innerHTML=Math.max.apply(Math,a.sellers[0].commertialOffer.Installments.map(function(e){return e.NumberOfInstallments}))+"x de R$"+Math.min.apply(Math,a.sellers[0].commertialOffer.Installments.map(function(e){return e.Value})).toFixed(2).toString().replace(".",",")+" sem juros"}}})})},getProductReview:function(){var r=document.querySelector(".rating-container .product-id").textContent,e=document.querySelector(".panel-rating"),t=e.querySelector(".title"),s=e.querySelectorAll(".rating img"),c=e.querySelector(".text"),i=e.querySelector(".author"),a=e.querySelector(".button");new Promise(function(a,e){var n=new XMLHttpRequest,t="https://service.yourviews.com.br/api/v2/pub/review/get?productid="+r+"&page=1&count=10 ";n.open("GET",t),n.setRequestHeader("YVStoreKey","388ef2d0-c3b8-4fd6-af13-446b698d544a"),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),n.onreadystatechange=function(){if(4===n.readyState){a(JSON.parse(n.response));var e=JSON.parse(n.response);c.innerHTML=e.Element[0].Review,i.innerHTML=e.Element[0].UserName;for(var t=e.Element[0].Rating,r=0;r<t;r++)s[r].style.display="inline-block"}},n.send()}),fetch("https://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:"+r).then(function(e){return e.json()}).then(function(e){t.innerHTML=e[0].productName,a.setAttribute("href","/"+e[0].linkText+"/p")})},hideEmptySections:function(){document.querySelectorAll(".section-visibility").forEach(function(e){""==e.innerHTML&&(e.closest(".section-block").style.display="none")})},buildVitrines:function(){for(var e=Math.floor(5e3*Math.random()),t=[],r=document.querySelector(".collectionPlaceholder"),a=r.querySelectorAll(".collectionPlaceholder .vitrine-content"),n=0;n<a.length;n++){var s={};s.Product=a[n].dataset.productid,s.SkuHighlight=a[n].dataset.sku,t.push(s)}r.innerHTML="";var c="collection"+e;console.log("collection"+e),r.nextSibling.setAttribute("id",c),i.default.build(e,t,!0,"4.2")}};document.addEventListener("DOMContentLoaded",function(){s.init()})},{"./modules/General/Vitrine/VitrineContainer.jsx":2}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},i=function(e,t,r){return t&&a(e.prototype,t),r&&a(e,r),e};function a(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var n,s=e("./components/_Card.jsx"),l=(n=s)&&n.__esModule?n:{default:n};var o={init:function(){},BuildVitrine:function(r,o,a,n){var e=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(s,React.Component),i(s,[{key:"componentDidMount",value:function(){for(var t=this,e="?",r=0;r<o.length;r++)e+="&fq=productId:"+o[r].Product;fetch("/api/catalog_system/pub/products/search/"+e,{method:"GET",headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){return e.json()}).then(function(e){t.mountProducts(e)})}},{key:"isInViewport",value:function(){var e=document.querySelectorAll(".cardProduct__pictureContainer__picture, .cardProduct__config__list__item img");if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e,t){e.forEach(function(e){0<e.intersectionRatio&&(a(e.target),t.unobserve(e.target))})},{root:null,rootMargin:"0px",threshold:.5});e.forEach(function(e){return t.observe(e)})}else for(var r=0;r<document.querySelectorAll("source, img").length;r++)a(document.querySelectorAll("source, img")[r]);function a(e){e.dataset&&e.dataset.src&&(e.src=e.dataset.src),e.dataset&&e.dataset.srcset&&(e.srcset=e.dataset.srcset)}}},{key:"slider",value:function(e,t){var r=new Siema({selector:"."+e,duration:200,easing:"ease-out",perPage:{300:1.2,768:2.2,992:t},onInit:a,onChange:a});function a(){for(var e=0;e<this.innerElements.length;e++){var t=e===Math.ceil(this.currentSlide)?"add":"remove";this.innerElements[e].classList[t]("active")}}Siema.prototype.addArrows=function(){var e=this;e.prevArrow=document.createElement("button"),e.prevArrow.classList.add("prev"),e.nextArrow=document.createElement("button"),e.nextArrow.classList.add("next"),e.prevArrow.textContent="⯇",e.nextArrow.textContent="⯈";var t=document.createElement("span");t.classList.add("controls__arrows"),e.selector.appendChild(t),t.appendChild(e.prevArrow),t.appendChild(e.nextArrow),e.prevArrow.addEventListener("click",function(){return e.prev()}),e.nextArrow.addEventListener("click",function(){return e.next()})},r.addArrows(),window.addEventListener("resize",function(){r.addArrows()})}},{key:"mountProducts",value:function(c){for(var i=this,n=[],e=0;e<c.length;e++)n.push(c[e].productId);new Promise(function(e,t){var r=new XMLHttpRequest,a="https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productids="+n.join(",");r.open("GET",a),r.setRequestHeader("YVStoreKey","388ef2d0-c3b8-4fd6-af13-446b698d544a"),r.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),r.onreadystatechange=function(){4===r.readyState&&e(JSON.parse(r.response))},r.send()}).then(function(e){for(var r=[],a=e.Element.sort(function(e,t){return e.ProductId-t.ProductId}),n=c.sort(function(e,t){return e.productId-t.productId}),t=function(t){if(null!=n[t]){var e={};e.info=n[t],e.review=a[t],e.skuHighlight=o.find(function(e){return e.Product==n[t].productId}).SkuHighlight,r.push(e)}},s=0;s<a.length;s++)t(s);i.setState({Products:r},function(){1==i.state.HasSlider&&i.slider(i.state.Vitrine,i.state.PerPage),i.isInViewport(),console.log(i.state.Products)})})}},{key:"render",value:function(){var e=this;return React.createElement(function(){var r=[];return e.state.Products.map(function(e,t){r.push(React.createElement(l.default,c({},e,{key:o+e.info.productId+t})))}),React.createElement(React.Fragment,null,React.createElement("div",{className:"cardProductContainer slider-"+e.state.HasSlider+" "+e.state.Vitrine},r))},null)}}]),s);function s(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,e));return t.state={Products:[],Vitrine:"sliderVitrine-"+r,HasSlider:a,PerPage:n},t.mountProducts=t.mountProducts.bind(t),t.slider=t.slider.bind(t),t.isInViewport=t.isInViewport.bind(t),t}ReactDOM.render(React.createElement(e,null),document.getElementById("collection"+r))}};r.default={init:o.init,build:o.BuildVitrine}},{"./components/_Card.jsx":3}],3:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},n=function(e,t,r){return t&&s(e.prototype,t),r&&s(e,r),e};function s(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var c=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(i,React.Component),n(i,[{key:"setAvaliable",value:function(){var e=this,t=!0;return 0!=this.state.Sku.sellers[0].commertialOffer.AvailableQuantity&&0!=this.state.Sku.sellers[0].commertialOffer.Price&&0!=this.state.Sku.sellers[0].commertialOffer.ListPrice||(t=!1),this.setState({Avaliable:t},function(){e.setDiscount()})}},{key:"setDiscount",value:function(){var e=void 0;return 1==this.state.Avaliable?0!=(e=this.state.Sku.sellers[0].commertialOffer.Price-this.state.Sku.sellers[0].commertialOffer.ListPrice)&&(e=Math.round(100*e/this.state.Sku.sellers[0].commertialOffer.ListPrice)):(e=0,this.setState({RawPrice:this.props.info.items.find(function(e){return 0!=e.sellers[0].commertialOffer.ListPrice?e.sellers[0].commertialOffer.ListPrice.toFixed(2).toString().replace(".",","):""})})),this.setState({Discount:e})}},{key:"setBeforePrice",value:function(){var e=void 0;return this.state.Sku.sellers[0].commertialOffer.ListPrice!=this.state.Sku.sellers[0].commertialOffer.Price&&0!=this.state.Sku.sellers[0].commertialOffer.AvailableQuantity||(e=!1),this.setState({haveBefore:e})}},{key:"toggleHover",value:function(){this.setState({Hover:!this.state.Hover})}},{key:"openConfig",value:function(){this.setState({openConfig:!this.state.openConfig})}},{key:"getImgSku",value:function(e,t){var r=void 0;return 0<(r=e.images.filter(function(e){if("thumb"===e.imageLabel||"Thumb"===e.imageLabel)return e})).length?r[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({"#width#":t,"#height#":t,"~":""}):"noImg"}},{key:"mountConfig",value:function(){function t(r){a.setState({Sku:a.props.info.items.find(function(e){return e.itemId==r.dataset.sku})},function(){console.log(a.props.info),a.setBeforePrice(),a.setAvaliable(),a.setState({SelectedSkuThumb:a.getImgSku(a.state.Sku,"10px")}),r.parentElement.querySelector(".cardProduct__config__list__item.selected").classList.remove("selected");for(var e=0;e<r.parentElement.querySelectorAll(".cardProduct__config__list__item").length;e++){var t=r.parentElement.querySelectorAll(".cardProduct__config__list__item")[e];t.dataset.sku==a.state.Sku.itemId&&t.classList.add("selected")}})}var a=this;return React.createElement("div",{className:"cardProduct__config"},null!=this.props.info.items[0]["Escolha a Cor"]?React.createElement(React.Fragment,null,this.props.info.items.map(function(e){return e.itemId==a.props.skuHighlight&&React.createElement("span",{className:"cardProduct__config__selected",style:{backgroundImage:"url("+a.state.SelectedSkuThumb+")",backgroundPosition:"center",backgroundSize:"5000%"}},React.createElement("p",{className:"cardProduct__config__selected__name"},a.state.Sku["Escolha a Cor"]))}),React.createElement("div",{className:"cardProduct__config__type"},React.createElement("span",{className:"cardProduct__config__type__colors"}),React.createElement("p",{className:"cardProduct__config__type__title"},"Escolha a Cor")),React.createElement("ul",{className:"cardProduct__config__list"},this.props.info.items.map(function(e){return React.createElement("li",{className:"cardProduct__config__list__item __color \n                  sku--"+e.itemId+"\n                  "+(e.itemId==a.props.skuHighlight?"selected":"")+" \n                  "+(0==e.sellers[0].commertialOffer.AvailableQuantity||0==e.sellers[0].commertialOffer.Price||0==e.sellers[0].commertialOffer.ListPrice?"set--avaliable-false":"set--avaliable-true")+"\n                  "+(Math.round(100*(e.sellers[0].commertialOffer.Price-e.sellers[0].commertialOffer.ListPrice)/e.sellers[0].commertialOffer.ListPrice)<0?"set--discount":"")+"\n                  ","data-name":e["Escolha a Cor"],"data-discount":0==e.sellers[0].commertialOffer.AvailableQuantity||0==e.sellers[0].commertialOffer.Price||0==e.sellers[0].commertialOffer.ListPrice?"":Math.round(100*(e.sellers[0].commertialOffer.Price-e.sellers[0].commertialOffer.ListPrice)/e.sellers[0].commertialOffer.ListPrice),"data-sku":e.itemId,onClick:function(e){return t(e.currentTarget)}},React.createElement("img",{className:e.itemId==a.props.skuHighlight?"selected":"","data-src":a.getImgSku(e,"40px"),alt:e["Escolha a Cor"],loading:"lazy"}))}))):React.createElement(React.Fragment,null,this.props.info.items.map(function(e){return e.itemId==a.props.skuHighlight&&React.createElement("span",{className:"cardProduct__config__selected __volume"},React.createElement("p",{className:"cardProduct__config__selected__name"},a.state.Sku["Escolha o Volume"]))}),React.createElement("div",{className:"cardProduct__config__type"},React.createElement("span",{className:"cardProduct__config__type__bulk"}),React.createElement("p",{className:"cardProduct__config__type__title"},"Escolha o Volume")),React.createElement("ul",{className:"cardProduct__config__list"},this.props.info.items.map(function(e){return React.createElement("li",{className:"cardProduct__config__list__item __volume \n              sku--"+e.itemId+"\n              "+(e.itemId==a.props.skuHighlight?"selected":"")+"\n              "+(0==e.sellers[0].commertialOffer.AvailableQuantity||0==e.sellers[0].commertialOffer.Price||0==e.sellers[0].commertialOffer.ListPrice?"set--avaliable-false":"set--avaliable-true")+"\n              "+(Math.round(100*(e.sellers[0].commertialOffer.Price-e.sellers[0].commertialOffer.ListPrice)/e.sellers[0].commertialOffer.ListPrice)<0?"set--discount":"")+"\n              ","data-name":e["Escolha o Volume"],"data-sku":e.itemId,"data-discount":0==e.sellers[0].commertialOffer.AvailableQuantity||0==e.sellers[0].commertialOffer.Price||0==e.sellers[0].commertialOffer.ListPrice?"":Math.round(100*(e.sellers[0].commertialOffer.Price-e.sellers[0].commertialOffer.ListPrice)/e.sellers[0].commertialOffer.ListPrice),onClick:function(e){return t(e.currentTarget)}},e["Escolha o Volume"])}))))}},{key:"OpenLetMeKnow",value:function(){this.setState({letMeKnow:!0})}},{key:"CloseLetMeKnow",value:function(e){var t=this;this.setState({letMeKnow:!1},function(){e.parentElement.querySelector(".form-group.group-email").classList.remove("set--sended"),e.parentElement.querySelector(".form-group.group-email ._form-email").value="",e.parentElement.querySelector(".cardProduct__sendMe__steps__title").innerHTML='Saiba quando <b class="cardProduct__sendMe__steps__title__product">'+t.state.Sku.name+"</b> ficar disponível",e.parentElement.querySelector(".sendMe-action").classList.add("set--send"),e.parentElement.querySelector(".sendMe-action").innerHTML='<svg class="cardProduct--letMeKnow__mail" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.098 0h17.698c1.692 0 2.993 1.301 2.993 2.993v10.671c0 1.692-1.301 3.123-2.993 3.123H3.098c-1.692 0-2.994-1.431-2.994-3.123V2.994C.104 1.3 1.406 0 3.098 0zM2.057 1.822l8.328 6.897c.781.65 2.212.65 3.123 0l8.329-6.897c-.26-.26-.65-.52-1.041-.52H3.098c-.39 0-.781.26-1.041.52zm20.43 1.301L14.42 9.76c-1.431 1.171-3.643 1.171-4.945 0L1.406 3.123v10.541c0 .911.78 1.692 1.692 1.692h17.698c.91 0 1.692-.78 1.692-1.692V3.124z" fill="#FDFDFD"/></svg> Enviar'})}},{key:"unAvaliable",value:function(){function t(e){""==e.value||null==e.value?(e.parentElement.querySelector("small").innerHTML="*Obrigatório.",e.parentElement.classList.add("has-warning"),e.parentElement.querySelector("small").classList.remove("hidden")):null!=e.value&&r.test(e.value)?(e.parentElement.classList.remove("has-error","has-warning"),e.parentElement.querySelector("small").classList.add("hidden")):(e.parentElement.querySelector("small").innerHTML="Verifique se você digitou corretamente o e-mail.",e.parentElement.classList.add("has-error"),e.parentElement.querySelector("small").classList.remove("hidden"))}var s=this,r=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return React.createElement("div",{className:"cardProduct__sendMe"},React.createElement("span",{className:"cardProduct__sendMe__close set--close",onClick:function(e){return s.CloseLetMeKnow(e.currentTarget)}},"x"),React.createElement("div",{className:"cardProduct__sendMe__steps"},React.createElement("p",{className:"cardProduct__sendMe__steps__title"},"Saiba quando ",React.createElement("b",{className:"cardProduct__sendMe__steps__title__product"},this.state.Sku.name)," ficar disponível"),React.createElement("div",{class:"form-group group-email"},React.createElement("input",{id:"field-email",class:"field _form-email",type:"text",name:"email",required:"required",placeholder:"",onFocus:function(e){return function(e){e.setAttribute("placeholder","ex: seuemail@exemplo.com"),e.parentElement.classList.remove("has-error","has-warning"),e.parentElement.querySelector("small").classList.add("hidden")}(e.currentTarget)},onBlur:function(e){return function(e){e.setAttribute("placeholder",""),t(e)}(e.currentTarget)},onChange:function(e){return function(e){r.test(e.value)?(e.parentElement.parentElement.querySelector(".sendMe-action").classList.remove("set--forbidden"),e.parentElement.parentElement.querySelector(".sendMe-action").classList.add("set--send")):(e.parentElement.parentElement.querySelector(".sendMe-action").classList.add("set--forbidden"),e.parentElement.parentElement.querySelector(".sendMe-action").classList.remove("set--send"))}(e.currentTarget)}}),React.createElement("label",{class:"control-label",for:"email"},"E-mail"),React.createElement("i",{class:"input-bar"}),React.createElement("small",{class:"hidden"},"E-mail obrigatório")),React.createElement("button",{class:"sendMe-action set--forbidden",onClick:function(e){return function(n){n.classList.contains("set--send")?(t(n.parentElement.querySelector('.form-group.group-email input[name="email"]')),n.parentElement.querySelector(".group-email").classList.contains("has-error")||n.parentElement.querySelector(".group-email").classList.contains("has-warning")?n.parentElement.querySelector(".form-group.group-email").classList.remove("set--sending"):(n.parentElement.querySelector(".form-group.group-email").classList.add("set--sending"),n.classList.remove("set--send"),n.innerHTML='<svg class="mailsvg" viewBox="0 0 40 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M19.0976 0H36.7959C38.4877 0 39.7891 1.30135 39.7891 2.9931V13.6642C39.7891 15.3559 38.4877 16.7874 36.7959 16.7874H19.0976C17.4058 16.7874 16.1045 15.3559 16.1045 13.6642V2.9931C16.1045 1.30135 17.4058 0 19.0976 0ZM18.0565 1.82189L26.3852 8.71904C27.166 9.36972 28.5974 9.36972 29.5084 8.71904L37.837 1.82189C37.5768 1.56162 37.1864 1.30135 36.7959 1.30135H19.0976C18.7072 1.30135 18.3168 1.56162 18.0565 1.82189ZM38.4877 3.12324L30.4193 9.76012C28.9879 10.9313 26.7756 10.9313 25.4742 9.76012L17.4058 3.12324V13.6642C17.4058 14.5751 18.1867 15.3559 19.0976 15.3559H36.7959C37.7069 15.3559 38.4877 14.5751 38.4877 13.6642V3.12324Z" fill="#FDFDFD"/>\n            <path d="M6.47428 12.7533C5.69347 12.7533 5.69347 13.9245 6.47428 13.9245H13.6317C14.4125 13.9245 14.4125 12.7533 13.6317 12.7533H6.47428Z" fill="#FDFDFD"/>\n            <path d="M6.99484 9.23962C6.34417 9.23962 6.34417 10.4108 6.99484 10.4108H13.6317C14.4125 10.4108 14.4125 9.23962 13.6317 9.23962H6.99484Z" fill="#FDFDFD"/>\n            <path d="M4.65236 10.4108C5.43317 10.4108 5.43317 9.23962 4.65236 9.23962H2.96061C2.1798 9.23962 2.1798 10.4108 2.96061 10.4108H4.65236Z" fill="#FDFDFD"/>\n            <path d="M0.488006 6.37663C-0.162669 6.37663 -0.162669 7.54785 0.488006 7.54785H13.6316C14.4124 7.54785 14.4124 6.37663 13.6316 6.37663H0.488006Z" fill="#FDFDFD"/>\n            <path d="M5.69303 2.86301C4.91222 2.86301 4.91222 4.03422 5.69303 4.03422H7.25465C8.03546 4.03422 8.03546 2.86301 7.25465 2.86301H5.69303Z" fill="#FDFDFD"/>\n            <path d="M13.631 4.03422C14.4118 4.03422 14.4118 2.86301 13.631 2.86301H9.33658C8.55577 2.86301 8.55577 4.03422 9.33658 4.03422H13.631Z" fill="#FDFDFD"/>\n            </svg>\n            Enviando',new Promise(function(e,t){var r=new XMLHttpRequest,a="notifymeClientName=Quem+disse+berenice&notifymeClientEmail="+n.parentElement.querySelector('.form-group.group-email input[name="email"]').value+"&notifymeIdSku="+s.state.Sku.itemId;console.log(a),r.open("POST","https://www.quemdisseberenice.com.br/no-cache/AviseMe.aspx"),r.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),r.onreadystatechange=function(){4===r.readyState&&e(r.response)},r.send(a)}).then(function(e){n.parentElement.querySelector(".form-group.group-email").classList.add("set--sended"),n.parentElement.querySelector(".form-group.group-email").classList.remove("set--sending"),n.parentElement.querySelector(".cardProduct__sendMe__steps__title").innerHTML='<svg class="confirmation set--fill" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path class="confirmation__circle" d="M41 0C18.4 0 0 18.4 0 41C0 63.6 18.4 82 41 82C63.6 82 82 63.6 82 41C82 18.4 63.6 0 41 0ZM41 80C19.5 80 2 62.5 2 41C2 19.5 19.5 2 41 2C62.5 2 80 19.5 80 41C80 62.5 62.5 80 41 80Z"/>\n                <path class="confirmation__icon" d="M61.4998 26.2L33.8998 53.7L20.4998 40.3C20.0998 39.9 19.4998 39.9 19.0998 40.3C18.6998 40.7 18.6998 41.3 19.0998 41.7L33.1998 55.8C33.3998 56 33.6998 56.1 33.8998 56.1C34.0998 56.1 34.3998 56 34.5998 55.8L62.8998 27.5C63.2998 27.1 63.2998 26.5 62.8998 26.1C62.4998 25.7 61.8998 25.8 61.4998 26.2Z"/>\n                </svg>\n\n                Tudo certo, você será notificado assim que <b class="cardProduct__sendMe__steps__title__product">'+s.state.Sku.name+"</b> ficar disponível!",n.textContent="Ok, entendi"}).catch(function(e){n.innerHTML='<svg  class="cardProduct--letMeKnow__mail" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.098 0h17.698c1.692 0 2.993 1.301 2.993 2.993v10.671c0 1.692-1.301 3.123-2.993 3.123H3.098c-1.692 0-2.994-1.431-2.994-3.123V2.994C.104 1.3 1.406 0 3.098 0zM2.057 1.822l8.328 6.897c.781.65 2.212.65 3.123 0l8.329-6.897c-.26-.26-.65-.52-1.041-.52H3.098c-.39 0-.781.26-1.041.52zm20.43 1.301L14.42 9.76c-1.431 1.171-3.643 1.171-4.945 0L1.406 3.123v10.541c0 .911.78 1.692 1.692 1.692h17.698c.91 0 1.692-.78 1.692-1.692V3.124z" fill="#FDFDFD"/></svg> Enviar',n.parentElement.querySelector(".form-group.group-email").classList.remove("--sending"),n.classList.add("set--send"),n.innerHTML='<svg class="cardProduct--letMeKnow__mail" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.098 0h17.698c1.692 0 2.993 1.301 2.993 2.993v10.671c0 1.692-1.301 3.123-2.993 3.123H3.098c-1.692 0-2.994-1.431-2.994-3.123V2.994C.104 1.3 1.406 0 3.098 0zM2.057 1.822l8.328 6.897c.781.65 2.212.65 3.123 0l8.329-6.897c-.26-.26-.65-.52-1.041-.52H3.098c-.39 0-.781.26-1.041.52zm20.43 1.301L14.42 9.76c-1.431 1.171-3.643 1.171-4.945 0L1.406 3.123v10.541c0 .911.78 1.692 1.692 1.692h17.698c.91 0 1.692-.78 1.692-1.692V3.124z" fill="#FDFDFD"/></svg> Enviar'}))):(s.CloseLetMeKnow(n),n.parentElement.querySelector(".form-group.group-email").classList.remove("set--sended"),n.parentElement.querySelector(".form-group.group-email ._form-email").value="",n.parentElement.querySelector(".cardProduct__sendMe__steps__title").innerHTML='Saiba quando <b class="cardProduct__sendMe__steps__title__product">'+s.state.Sku.name+"</b> ficar disponível",n.classList.add("set--send"),n.innerHTML='<svg class="cardProduct--letMeKnow__mail" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.098 0h17.698c1.692 0 2.993 1.301 2.993 2.993v10.671c0 1.692-1.301 3.123-2.993 3.123H3.098c-1.692 0-2.994-1.431-2.994-3.123V2.994C.104 1.3 1.406 0 3.098 0zM2.057 1.822l8.328 6.897c.781.65 2.212.65 3.123 0l8.329-6.897c-.26-.26-.65-.52-1.041-.52H3.098c-.39 0-.781.26-1.041.52zm20.43 1.301L14.42 9.76c-1.431 1.171-3.643 1.171-4.945 0L1.406 3.123v10.541c0 .911.78 1.692 1.692 1.692h17.698c.91 0 1.692-.78 1.692-1.692V3.124z" fill="#FDFDFD"/></svg> Enviar')}(e.currentTarget)}},React.createElement("svg",{className:"cardProduct--letMeKnow__mail",viewBox:"0 0 24 17",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M3.098 0h17.698c1.692 0 2.993 1.301 2.993 2.993v10.671c0 1.692-1.301 3.123-2.993 3.123H3.098c-1.692 0-2.994-1.431-2.994-3.123V2.994C.104 1.3 1.406 0 3.098 0zM2.057 1.822l8.328 6.897c.781.65 2.212.65 3.123 0l8.329-6.897c-.26-.26-.65-.52-1.041-.52H3.098c-.39 0-.781.26-1.041.52zm20.43 1.301L14.42 9.76c-1.431 1.171-3.643 1.171-4.945 0L1.406 3.123v10.541c0 .911.78 1.692 1.692 1.692h17.698c.91 0 1.692-.78 1.692-1.692V3.124z",fill:"#FDFDFD"}))," Enviar")))}},{key:"addToCart",value:function(e){var t=this,a=this;e.classList.contains("status--standBy")&&(e.innerHTML='<div class="status--adding__text">ADICIONANDO</div>\n      <span class="status--adding__dots"></span>\n      <span class="status--adding__actions"></span>',e.classList.add("status--request"),e.classList.remove("status--standBy"),this.setState({Adding:!0},function(){new Promise(function(r,e){vtexjs.checkout.getOrderForm().then(function(e){console.log(e),e.items.length?e.items.map(function(e,r){e.id==t.state.Sku.itemId?a.setState({Qty:e.quantity+1},function(){var e=a.state.Qty,t={index:r,quantity:e};return vtexjs.checkout.updateItems([t])}):a.setState({Qty:1},function(){var e={id:t.state.Sku.itemId,quantity:"1",seller:"1"};return vtexjs.checkout.addToCart([e])})}):a.setState({Qty:1},function(){var e={id:t.state.Sku.itemId,quantity:a.state.Qty,seller:"1"};return vtexjs.checkout.addToCart([e])})}).done(function(t){vtexjs.checkout.getOrderForm().then(function(e){window._orderForm=e;for(var t=0;t<e.items.length;t++)console.log(e.items[t])}).done(function(){r(console.log(t));var e=document.querySelector(".header__options--item__cartBag");e.classList.add("set--highlightFill"),setTimeout(function(){e.classList.remove("set--highlightFill")},2e3)})})}).then(function(){e.classList.add("status--adding"),setTimeout(function(){setTimeout(function(){t.setState({Adding:!1},function(){e.classList.add("status--remove"),e.classList.remove("status--request"),setTimeout(function(){e.classList="cardProduct--addToCart status--standBy"},800),e.innerHTML='<svg class="cardProduct--addToCart__bag" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z" /></svg><p class="cardProduct--addToCart__cta">Adicionar a Sacola</p>'})},5e3),e.classList.add("status--added"),e.querySelector(".status--adding__text").innerHTML=a.state.Sku.name+" foi adicionado!",e.querySelector(".status--adding__dots").innerHTML='<span class="status--adding__dots__qty">'+a.state.Qty+'</span>\n              <img class="status--adding__dots__img" src="'+a.state.Sku.images[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({"#width#":"150","#height#":"150","~":""})+'" alt="'+a.state.Sku.name+'" />\n              <svg class="circle-dots" viewBox="0 0 95 95"><circle cx="48" cy="48" r="46" class="circle time-count"></circle></svg>',e.querySelector(".status--adding__actions").innerHTML='<a href="/checkout/#/cart">\n                  <span class="status--adding__actions__cart">Fechar Pedido</span>\n                </a>'},1500)})}))}},{key:"componentDidMount",value:function(){this.setBeforePrice(),this.setAvaliable(),this.setState({SelectedSkuThumb:this.getImgSku(this.state.Sku,"10px")})}},{key:"render",value:function(){var r=this;return String.prototype.allReplace=function(e){var t=this;for(var r in e)t=t.replace(new RegExp(r,"g"),e[r]);return t},React.createElement("div",{className:"cardProduct cardProduct-"+this.props.info.productId+" avaliable-"+this.state.Avaliable+" change-"+this.state.openConfig+" letMeKnow-"+this.state.letMeKnow,"data-prod":this.props.info.productId},null!=this.props.info.items[0].variations&&1<this.props.info.items.length&&React.createElement(React.Fragment,null,React.createElement("span",{className:"cardProduct--change",onClick:function(e){return r.openConfig()}},React.createElement("span",{className:"cardProduct--change__dots"}),React.createElement("p",{className:"cardProduct--change__close"},React.createElement("svg",{width:"16",height:"8",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M15.354 4.354a.5.5 0 0 0 0-.708L12.172.464a.5.5 0 1 0-.708.708L14.293 4l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182zM0 4.5h15v-1H0v1z"})))),this.mountConfig(),React.createElement("div",{className:"set--overlay",onClick:function(e){return r.openConfig()}})),React.createElement("div",{className:"cardProduct__flags"},React.createElement(React.Fragment,null,0!=r.state.Discount&&1==r.state.Avaliable&&React.createElement("span",{className:"cardProduct__flag __discount"},React.createElement("p",{className:"cardProduct__flag__content"},r.state.Discount+"%")),r.state.Sku.sellers[0].commertialOffer.Price.toFixed(2)>r.state.FreeShipping&&React.createElement("span",{className:"cardProduct__flag __frete"},React.createElement("p",{className:"cardProduct__flag__content"},"Frete Grátis")),0!=r.state.Avaliable&&Object.entries(r.state.clusterHighlights).map(function(e){return React.createElement("span",{className:"cardProduct__flag __"+e[1].replace("ç","c").replace(" ","")},React.createElement("p",{className:"cardProduct__flag__content"},e[1]))}))),React.createElement("a",a({},0==this.state.Adding?{href:"/"+this.props.info.linkText+"/p?idsku="+this.state.Sku.itemId}:{href:"/checkout/#/cart"},{className:"cardProduct__link"}),React.createElement("div",{className:"cardProduct__pictureContainer"},React.createElement("img",{className:"cardProduct__pictureContainer__picture","data-src":this.state.Sku.images[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({"#width#":"150","#height#":"150","~":""}),loading:"lazy"}),0<this.props.review.TotalRatings&&React.createElement("div",{className:"cardProduct__pictureContainer__review"},React.createElement("ul",{className:"cardProduct__pictureContainer__review__rating"},function(){var e=[],t=1;for(t=1;t<=r.props.review.Rating;t++)e.push(React.createElement("svg",{className:"cardProduct__review__rating__ratingStar",viewBox:"0 0 88 84",width:"88",height:"84",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{"clip-rule":"evenodd",d:"M43.91.047a2 2 0 0 0-1.819 1.384l-9.42 29.194-30.667-.06a2 2 0 0 0-1.177 3.62l24.85 17.983-9.541 29.164a2 2 0 0 0 3.08 2.238l24.779-18.083 24.79 18.084a2 2 0 0 0 3.078-2.239l-9.541-29.164 24.85-17.982a2 2 0 0 0-1.176-3.621l-30.669.06-9.43-29.195A2 2 0 0 0 43.911.047z",fill:"#67605F"})));for(;t>r.props.review.Rating&&t<=5;)e.push(React.createElement("svg",{className:"cardProduct__review__rating__ratingStar set--outline",viewBox:"0 0 88 84",width:"88",height:"84",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{"clip-rule":"evenodd",d:"M43.91.047a2 2 0 0 0-1.819 1.384l-9.42 29.194-30.667-.06a2 2 0 0 0-1.177 3.62l24.85 17.983-9.541 29.164a2 2 0 0 0 3.08 2.238l24.779-18.083 24.79 18.084a2 2 0 0 0 3.078-2.239l-9.541-29.164 24.85-17.982a2 2 0 0 0-1.176-3.621l-30.669.06-9.43-29.195A2 2 0 0 0 43.911.047z",stroke:"#67605F"}))),t++;return e}()),React.createElement("span",{className:"cardProduct__pictureContainer__review__qtd"},this.props.review.TotalRatings," avaliações"))),React.createElement("div",{className:"cardProduct__info"},React.createElement("p",{className:"cardProduct__info__name"},this.state.Sku.name)),0!=this.state.Avaliable?React.createElement("div",{className:"cardProduct__price"},0!=this.state.haveBefore&&React.createElement("p",{className:"cardProduct__price__before"},"R$"+this.state.Sku.sellers[0].commertialOffer.ListPrice.toFixed(2).toString().replace(".",",")),React.createElement("p",{className:"cardProduct__price__actual"},"R$"+this.state.Sku.sellers[0].commertialOffer.Price.toFixed(2).toString().replace(".",",")),React.createElement("p",{className:"cardProduct__price__installment"},"até "+Math.max.apply(Math,this.state.Sku.sellers[0].commertialOffer.Installments.map(function(e){return e.NumberOfInstallments}))+"x de R$"+Math.min.apply(Math,this.state.Sku.sellers[0].commertialOffer.Installments.map(function(e){return e.Value})).toFixed(2).toString().replace(".",",")+" sem juros")):React.createElement("div",{className:"cardProduct__price"})),0!=this.state.Avaliable?React.createElement("span",{className:"cardProduct--addToCart status--standBy",onClick:function(e){return r.addToCart(e.currentTarget)}},React.createElement("svg",{className:"cardProduct--addToCart__bag",width:"20",height:"24",viewBox:"0 0 20 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z"})),React.createElement("p",{className:"cardProduct--addToCart__cta sku--"+this.state.Sku.itemId},"Adicionar à Sacola")):React.createElement(React.Fragment,null,this.unAvaliable(),React.createElement("span",{className:"cardProduct--letMeKnow status--standBy",onClick:function(e){return r.OpenLetMeKnow()}},React.createElement("svg",{className:"cardProduct--letMeKnow__mail",width:"24",height:"17",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M3.098 0h17.698c1.692 0 2.993 1.301 2.993 2.993v10.671c0 1.692-1.301 3.123-2.993 3.123H3.098c-1.692 0-2.994-1.431-2.994-3.123V2.994C.104 1.3 1.406 0 3.098 0zM2.057 1.822l8.328 6.897c.781.65 2.212.65 3.123 0l8.329-6.897c-.26-.26-.65-.52-1.041-.52H3.098c-.39 0-.781.26-1.041.52zm20.43 1.301L14.42 9.76c-1.431 1.171-3.643 1.171-4.945 0L1.406 3.123v10.541c0 .911.78 1.692 1.692 1.692h17.698c.91 0 1.692-.78 1.692-1.692V3.124z",fill:"#FDFDFD"})),React.createElement("p",{className:"cardProduct--letMeKnow__cta sku--"+this.state.Sku.itemId},"Avise-me quando chegar"))))}}]),i);function i(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e));return t.state={Sku:t.props.info.items.find(function(e){return e.itemId==t.props.skuHighlight}),SelectedSkuThumb:"",FreeShipping:1e3,clusterHighlights:0===Object.entries(t.props.info.clusterHighlights).length&&t.props.info.clusterHighlights.constructor===Object?{}:t.props.info.clusterHighlights,Avaliable:!0,haveBefore:!1,Hover:!1,openConfig:!1,letMeKnow:!1,Adding:!1,Qty:1},t.setAvaliable=t.setAvaliable.bind(t),t.setDiscount=t.setDiscount.bind(t),t.setBeforePrice=t.setBeforePrice.bind(t),t.setBeforePrice=t.setBeforePrice.bind(t),t.toggleHover=t.toggleHover.bind(t),t.mountConfig=t.mountConfig.bind(t),t.addToCart=t.addToCart.bind(t),t.openConfig=t.openConfig.bind(t),t.getImgSku=t.getImgSku.bind(t),t.OpenLetMeKnow=t.OpenLetMeKnow.bind(t),t.CloseLetMeKnow=t.CloseLetMeKnow.bind(t),t}r.default=c},{}]},{},[1]);