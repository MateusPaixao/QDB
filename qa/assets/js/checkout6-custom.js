!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=124)}({124:function(e,t,n){"use strict";n.r(t);var a={init:function(){a.checkout()},checkout:function(){var e,t=(e=jQuery,window,document,function(){var t=this;return t.getSkus=function(n){var a=e.Deferred();return"undefined"===n?(a.reject("Missing product id."),a.promise()):t.getSkus.data[n]?(a.resolve(t.getSkus.data[n]),a.promise()):(vtexjs.catalog.getProductWithVariations(n).fail((function(e){t.getSkus.data[n]=[],a.reject("Product id not found.")})).done((function(e){t.getSkus.data[n]={id:e.productId,name:e.name,skus:e.skus.slice(),salesChannel:e.salesChannel,available:e.available},a.resolve(t.getSkus.data[n])})),a.promise())},t.getSkus.data={},t.getSkuList=function(n){if("undefined"===n||"undefined"!==n&&!(n instanceof Array))return n=new Promise((function(e,t){t("Missing list of product id. eg. [1, 45, 83].")})),Promise.all([n]);var a=[],r={};return e.each(n,(function(n,o){var i=new Promise((function(n,a){t.getSkuList.data[o]?n(t.getSkuList.data):t.getSkus(o).then((function(a){r[o]=e.extend({},a),t.getSkuList.data=e.extend({},r,t.getSkuList.data),n(t.getSkuList.data)}),(function(e){a("Product id not found.")}))}));a.push(i)})),Promise.all(a)},t.getSkuList.data={},t.getInfo=function(n){var a=e.Deferred();if("undefined"===n)return a.reject("Missing product id."),a.promise();var r="/api/catalog_system/pub/products/search/?fq=productId:"+n;return t.getInfo.data[n]?(a.resolve(t.getInfo.data[n]),a.promise()):(e.ajax({url:r,success:function(e){t.getInfo.data[n]=e,a.resolve(t.getInfo.data[n])},error:function(e){t.getInfo.data[n]=[],a.reject("Product id not found.")}}),a.promise())},t.getInfo.data={},t.addProducts=function(t){var n=e.Deferred();if("undefined"===t||"undefined"!==t&&!(t instanceof Array))return n.reject("Missing array of objects. eg. [{ id: 1 }, { id: 2, quantity: 2 }]"),n.promise();var a=[];return e.each(t,(function(e,t){var n=Object.assign({id:0,quantity:1,seller:1},t);a.push(n)})),vtexjs.checkout.addToCart(a).fail((function(e){n.reject(e)})).done((function(e){n.resolve(e)})),n.promise()},"undefined"!=typeof console&&void 0!==console.log&&(t.__log=console.log),!0}),n=function(e){var t=("string"==typeof e?1*e:e).toFixed(2);return(t=(t=t.replace(/\./,"")).replace(/([0-9]{2})$/g,",$1")).length>6&&(t=t.replace(/([0-9]{3}),([0-9]{2}$)/g,".$1,$2")),t},a=function(e){var t=e.trim();return t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=t.toLowerCase()).replace(/\(|\)|\'|,/g,"")).replace(/\s+/g," ")).replace(/(\s|&|\?|\/|\||:)/g,"-")).replace(/\u00e7/g,"c")).replace(/\u00f1/g,"n")).replace(/\u00c7/g,"C")).replace(/\u00d1/g,"N")).replace(/[\u00c3\u00c2\u00c1\u00c0\u00c4]/g,"A")).replace(/[\u00c9\u00c8\u00cb]/g,"E")).replace(/[\u00cd\u00cc\u00cf]/g,"I")).replace(/[\u00d5\u00d4\u00d3\u00d2\u00d6]/g,"O")).replace(/[\u00da\u00d9]/g,"U")).replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g,"a")).replace(/[\u00e8\u00e9\u00ea\u00eb]/g,"e")).replace(/[\u00ec\u00ed\u00ee\u00ef]/g,"i")).replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g,"o")).replace(/[\u00f9\u00fa\u00fb\u00fc]/g,"u")},r=function(e,t,n,a){return function(t){var n=180;return e("html").hasClass("_mobi-on")&&(n=140),t.replace(/(.*?ids\/)(.*?)(\/.*)/g,"$1$2-"+n+"-"+n+"$3").replace(/\?.*/,"")}}(jQuery,window,document);$((function(){return $("#cart-title").wrap('<div class="_title"></div>'),$("._title").append('<div class="_more-link"><a>Escolher mais produtos</a></div>'),$('<a href="#/orderform" class="_buy-btn">Fechar pedido</div>').insertAfter(".cart-totalizers .accordion-group"),!0}));$((function(){$("body").on("click","._more-link, .more-products",(function(e){var t,n;return/\/p/.test(document.referrer)&&!/utm/.test(document.referrer)?location.href=(t="LastDepartmentUrl",(n=document.cookie.match("(^|;) ?"+t+"=([^;]*)(;|$)"))?n[2]:"/"):location.href="/",!0}))}));$(window).on("load",(function(){var e=$(".full-cart > .cart-select-gift-placeholder").eq(0);return e.length<=0&&(e=$(".full-cart .summary-template-holder .cart-select-gift-placeholder").eq(0)),$("#cartLoadedDiv").append(e),!0}));$(window).on("load",(function(){return $(".extensions-checkout-buttons-container").appendTo("._visa-btn-wrp"),!0}));$(window).on("load",(function(){$(".empty-cart-content:visible").length>0&&$("html").addClass("_empty-cart")}));var o=function(){try{var e=document.createElement("script");e.async=!0,e.src="//cdn.siteblindado.com/aw.js",e.classList.add("_siteblindado-api");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}catch(e){console.log(e)}};$(window).on("load",(function(){window.___siteblindadoTO=setTimeout((function(){!function(e){var t=document.createElement("script");t.src="//selo.siteblindado.com/aw.js",t.classList.add("_siteblindado-selo"),t.addEventListener("load",(function(){"function"==typeof e&&e()}));var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)}(o),clearTimeout(window.___siteblindadoTO)}),5e3)}));!function(e,t,n){var a=function(){var t=1e7+Math.floor(99999999*Math.random());return csdp("app","4xlyr73qs322g24mv7qt"),csdp("sessionid",t),e.vtex.deviceFingerprint=t,!0}}(window,document);var i=function(){if(!/payment/gi.test(document.location.hash))return!1;return $("html").removeClass("_show-boleto"),$(".vtex-omnishipping-1-x-SummaryItemTitle:visible").length<=0&&$("html").addClass("_show-boleto"),!0};$(window).on("load",i);var s=function(e){i(),/payment/gi.test(document.location.hash)&&$(".vtex-omnishipping-1-x-pickupAddress").length>0&&$("#payment-group-bankInvoicePaymentGroup.active").length>0&&$("a#payment-group-creditCardPaymentGroup").click(),function(){if(!/shipping/gi.test(document.location.hash))return!1;var e=document.querySelector("html"),t=document.getElementsByClassName("address-item");void 0!==t&&t.length>1&&e.classList.add("multiple-address")}()};$((function(){return!window.___checkoutEventsApplied&&($(window).on("hashchange",s),window.___checkoutEventsApplied=!0,s(),!0)})),function(e,t,n,a){console.log;var r=function(){return e(".full-cart tr.product-item").each((function(t,n){var a=e('<td class="_cart-tbl-container _cart-tbl-container'+(t||0)+'"><div class="_cart-tbl"><div class="_cart-left"><div class="_cart-title"><div class="_cart-col0">Produto</div></div><div class="_cart-body"><div class="_cart-col0 _cart-product"></div></div></div><div class="_cart-right"><div class="_cart-title"><div class="_cart-col0">Preço</div><div class="_cart-col1">Quantidade</div><div class="_cart-col2">Total</div><div class="_cart-col3">&nbsp;</div></div><div class="_cart-body"><div class="_cart-col0 _cart-pricing"></div><div class="_cart-col1 _cart-qty-container"><div class="_cart-qty"></div></div><div class="_cart-col2 _cart-final-price"></div><div class="_cart-col3 _cart-remove"></div></div></div></div></td>');e(n).filter((function(){return e(n).find("._cart-tbl").length<=0})).append(a);var r=e(n).find(".product-image img"),o=e(n).find(".product-image").html(r);e(n).find("._cart-product").html(o).append(e(n).find(".product-name")),e(n).find("._cart-qty").html(e(n).find(".quantity:first")),e(n).find("._cart-pricing").html(e(n).find(".product-price:first")),e(n).find("._cart-final-price").html(e(n).find(".quantity-price:first")),e(n).find("._cart-remove").html(e(n).find(".item-remove:first"))})),!0},o=function(){var t=e(".ask-for-geolocation");t.length>0&&(t.html("<div class='pickup-notfind'>Não encontramos pontos de retirada perto deste endereço.<br /> </div>"),setTimeout((function(){e("#shipping-option-delivery").click(),console.log("sem ponto de retirada")}),4500))};e(t).on("load",o);e((function(){return r(),e(t).on("orderFormUpdated.vtex",(function(){r(),setTimeout((function(){o()}),1e3)})),!0}));e((function(){return e(n).ready((function(){e("body").on("click",".payment-discounts-alert",(function(){e("html, body").animate({scrollTop:e(".body-order-form").offset().top},1e3)}))})),!0}))}(jQuery,window,document);var c=[{906:{activeValue:40,discountPercent:20},1910:{activeValue:80.97,discountPercent:50},1259:{activeValue:120,discountPercent:50}}],l=[];if(void 0!==c){var u=c.map((function(e){return Object.keys(e).sort().reverse()}));l.push(u);var d=function(e,t,n,a){return e.ajax({type:"GET",url:"https://www.quemdisseberenice.com.br/cart?refs="+l.join(","),data:"check",success:function(t){var n=e(t).filter("div.ofertaDeCaixa");e(".cart").append(n),e(".__lnk-buy-btn").on("click",(function(){event.preventDefault();var t={id:e(this).attr("href").match(/.*?=([\w|-]*).*/)[1],quantity:1,seller:"1"};vtexjs.checkout.addToCart([t],null,1).done((function(e){}))}))}}),d}(jQuery,window,document),p=function(){document.querySelectorAll("._prd").forEach((function(e,t,n){t=e.getAttribute("data-sku"),_priceToDiscount=e.querySelectorAll(".__p_priceoffer"),_priceFrom=_priceToDiscount[0].innerText.replace("R$ ","").replace(",","."),_percentDiscount=c[0][t].discountPercent,_sarrafoCart=c[0][t].activeValue,e.setAttribute("data-sarrafo",_sarrafoCart),_sarrafoFloat=document.createElement("span"),__msg="R$ "+_sarrafoCart.toString().replace(".",",")+" em compras",_sarrafoFloat.innerText=__msg,_sarrafoFloat.classList.add("activeValue"),_spanSarrafo=e.querySelectorAll(".activeValue"),_spanSarrafo.length<=0&&e.appendChild(_sarrafoFloat),parseFloat(vtexjs.checkout.orderForm.totalizers[0].value/100)>=_sarrafoCart&&(e.classList.remove("promoActive"),e.classList.add("promoActive")),_resultDiscount=_priceFrom/100*(_percentDiscount-100),_resultFormated=parseFloat(Math.abs(_resultDiscount)).toFixed(2),_promoApplied=_priceToDiscount[0].classList.contains("promoApplied"),_priceToDiscount.forEach((function(e,t){return 0==_promoApplied&&(e.innerText="R$ "+_resultFormated.replace(".",","),e.classList.add("promoApplied"),!0)}))}))}}$(window).on("orderFormUpdated.vtex",(function(e,t){$("._prd").removeClass("promoActive"),_cartSubtotal=parseFloat(vtexjs.checkout.orderForm.totalizers[0].value/100),_spanSarrafoTotal=120,_navBar=document.getElementsByClassName("_navBar-OfertaCaixa")[0].childNodes[0];var n=_cartSubtotal/_spanSarrafoTotal*100;_navBar.style.width=n+"%",_itemDiscount.forEach((function(e){_sarrafoCart=Number(e.dataset.sarrafo),_promoActive=e.classList.contains("promoApplied"),_cartSubtotal>=_sarrafoCart&&e.classList.add("promoActive")}))}));var f=function(e,t,r,o){return function(t,r){if(!t||!r||r&&!r.url)return!1;var o=r,i=e(t),s=o.name||"",c=o.img,l="",u="",d=1*o.price||0,p=1*o.sale||0,f=o.times||"",m="",_="",v=o.installments||0,g=o.url||"",h=o.sku||"",b=o.attachments.split(","),y='<span class="_p_price_">{%REG%}</span>\n                <span class="_p_priceoffer_"><span class="__p_by">por </span> <span class="__p_priceoffer">{%SALE%}</span></span>\n                <span class="_p_intallments">{%PRICING%}</span>',w="R$ "+n(p);g.length>0&&(g=[g,"idsku="+h].join("?")),d>0&&d>p&&(u="R$ "+n(d),l='<span class="__p_from">de </span> <span class="__p_price">{%REGVALUE%}</span>'.replace(/{%REGVALUE%}/g,u)),f.length>0&&~~f>1&&(_="R$ "+n(v),m='<span class="__p_installments"> <span class="__p_numberinstallments">{%TIMES%}x</span> de <span class="__p_installmentsvalue">{%INSTALLMENTVALUE%} </span> <span class="__p_installments-juros">sem&nbsp;juros</span>'.replace(/{%TIMES%}/g,f).replace(/{%INSTALLMENTVALUE%}/g,_)),y=(y=(y=y.replace(/{%REG%}/g,l)).replace(/{%SALE%}/g,w)).replace(/{%PRICING%}/g,m),i.find(".__lnk-img").filter((function(){return 0==e(this).find("._p-promo-labels").length})).append('<div class="_p-promo-labels"></div>');var k=[];return e.each(b,(function(e,t){t.length>0&&/flag/gi.test(t)&&(t=t.replace(/flag:/gi,""),k.push('<span class="__flag __flag-'+a(t)+'">'+t+"</span>"))})),i.find("._p-promo-labels").html(k.join("")),i.find(".__lnk-img,.__lnk-pname,.__lnk-buy-btn").attr("href",g),i.find(".__p_img img").attr("src",c),i.find(".__p_name").html(s),i.find(".__p_pricing_").html(y),!0}}(jQuery,window,document),m=function(e,t,n,r){return function(t){if(t.length<=0)return"";var n=t.split(","),r=!1;return e.each(n,(function(e,t){/flag/gi.test(t)&&!r&&(r=!0),t=t.replace(/Destaque/,"highlight"),t="__btn-"+a(t),n[e]=t})),r&&n.push("__hasflags"),n.join(" ")}}(jQuery,window,document),_=function(e,n,o,i){return function(){var n=this;n.applySelector=function(t){var a=e(t),r=a.find("._product").attr("data-prd");if(a.length<=0||a.length>0&&r.length<=0)return!1;n.getSku(r).then((function(e){n.applyVariations(a,r,e)||n.noVariation(a,r)}))},n.getSku=function(a){var r=e.Deferred(),o=a;return n.func.getInfo||(n.func=new t),n.func.getInfo(o).then((function(e){e.length>0&&(n.data[o]=e[0],r.resolve(n.data))}),(function(e){r.reject(e)})),r.promise()},n.func={},n.data={},n.applyVariations=function(t,a,r){if(!t||!a||r.length<=0||a&&r[a].items.length>0&&void 0===r[a].items[0].variations)return!1;var o=e("._selectors-styles");o.length<=0&&(o=e("<style/>").addClass("_selectors-styles"),e("head").append(o));var i,s=o.text()||"",c="__selectors-on",l=e(t),u=n.sortData(r[a]),d=a,p=n.getSelectors(u),f=p.selectors,m=f.children().length;s+=p.styles,(i=l.find("._p-sku-selection")).length<=0&&(i=e("<div/>").addClass("_p-sku-selection")),i.append(f),i.attr("data-sku-length",m),p.settings&&p.settings.type&&/cor/.test(p.settings.type)&&(!0,i.addClass("_p-sku-color"),e("body").addClass(c),e("._p-selectors")&&setTimeout((function(){e("._p-selectors").slick({infinite:!1,slidesToShow:3,slidesToScroll:3})}),110)),l.not("."+c).addClass(c).addClass(c+"-"+d).addClass("_prd-"+d).filter((function(){return e(this).find("._p-sku-selection span").length<=0})).find(".__lnk-buy-btn").before(i),o.text(s);var _=f.find(".__btn-highlight:first");return _.length<=0&&(_=f.find("span:first")),n.skuSelected(_),!0},n.noVariation=function(t){return e(t).addClass("_selector-unavailable"),!0},n.getSelectors=function(t){var o=e("<div/>").addClass("_p-selectors"),i={},s="",c=t.productName,l=t.link||"";e.each(t.items,(function(t,u){if(u.sellers&&u.sellers[0].commertialOffer.AvailableQuantity>0&&u.variations){var d=u.sellers[0].commertialOffer.Installments[0].NumberOfInstallments,p=u.sellers[0].commertialOffer.Installments[0].Value;p=p.toFixed(2);var f=e("<span/>"),_=u.variations[0]||"";_+=u.variations.length>1?" | "+u.variations[1]:"";var v=/cor/i.test(_);f.on("click.SkuSelection",(function(e){"function"==typeof n.skuSelected&&n.skuSelected(f)}));var g="",h=u[u.variations[0]];h+=u.variations.length>1?" | "+u[u.variations[1]]:"";var b="",y="";if(u.images.length>0&&(b=u.images[0].imageUrl,b=r(b)),u.images.length>1&&e.each(u.images,(function(e,t){if(/thumb/i.test(t.imageLabel))return y=t.imageUrl,y=(r(y)||"").replace(/http:/,"https:"),!1})),u.attachments){var w=u.attachments.slice(0),k=[];e.each(w,(function(e,t){k.push(t.name)})),g=k.join(",")}f.html(h),v&&(f.html("&nbsp;"),i=e.extend({},{type:"cor"}));var S="_"+a(h),j=u.sellers[0].commertialOffer.Price;j=j.toFixed(2);var x=u.sellers[0].commertialOffer.ListPrice;x=x.toFixed(2),f.attr("title",h),f.addClass(S).addClass(m(g)),f.attr("data-qty",u.sellers[0].commertialOffer.AvailableQuantity),f.attr("data-name",c),f.attr("data-url",l),f.attr("data-type",_),f.attr("data-img",b),f.attr("data-thumb",y),f.attr("data-price",x),f.attr("data-sale",j),f.attr("data-times",d),f.attr("data-installments",p),f.attr("data-sku",u.itemId),f.attr("data-attachments",g),y.length>0&&v&&(s+="."+S+":before{background-image:url("+y+")} "),o.append(f)}}));var u={selectors:o,styles:s};return i.type&&(u=e.extend(u,{settings:i})),u},n.skuSelected=function(t){if(!t||t&&t.length<=0)return!1;var n=e(t),a=n.parents("._prd");e("._on").removeClass("_on"),n.addClass("_on"),new f(a,n[0].dataset),p()},n.sortData=function(t){return!(t.items&&t.items.length<=0||t.items&&t.items.length>0&&void 0===t.items[0].variations)&&(/cor/gi.test(t.items[0].variations.join(","))&&t.items.sort((function(e,t){return e.sellers[0].commertialOffer.Price-t.sellers[0].commertialOffer.Price})),e.each(t.items,(function(e,t){t.sellers&&t.sellers[0].commertialOffer.AvailableQuantity>0&&t.variations&&t.sellers[0].commertialOffer.Installments.sort((function(e,t){return e.Value-t.Value}))})),t)}}}(jQuery,window,document);(function(e,t,n,a){var r=function(){t.___selectors||(t.___selectors=new _);var a=n.querySelectorAll("[id*=ResultItems]"),r={subtree:!0,childList:!0},o=new MutationObserver((function(n){n.forEach((function(n){if("childList"===n.type&&/_product/gi.test(n.target.className)){var a=e(n.target).parents("._prd");t.___selectors.applySelector(a)}}))}));return a.forEach((function(e){return o.observe(e,r),!0})),!0};e(t).on("load",r)})(jQuery,window,document),function(e,t,n,a){var r=function(){t.___selectors||(t.___selectors=new _),e("._prd").each((function(e,n){t.___selectors.applySelector(n)}))};e(t).on("load",r)}(jQuery,window,document)},optinClube:function(){var e=document.querySelector(".newsletter"),t=document.querySelector("#opt-in-clube");null===t&&(e.innerHTML+='\n        \n        <label class="checkbox newsletter-label">\n            <input type="checkbox" id="opt-in-clube">\n            <span class="newsletter-text">Quero fazer parte do nosso clube.</span>\n        </label>'),function(){var e={optinClube:!!t.checked},n=new Headers;n.append("Content-Type","x-www-form-urlencoded"),n.append("accept","application/vnd.vtex.ds.v10+json");var a={method:"PUT",mode:"cors",headers:n,body:JSON.stringify(e)};fetch("https://botiwall.corebiz.com.br/CL/update",a).then((function(e){return e.json()})).then((function(e){console.log(e),alert("enviado")})).catch((function(){alert("Ocorreu um erro! tente novamente")}))}()}};a.init}});