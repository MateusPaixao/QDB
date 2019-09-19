"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Methods={init:function(){null!=document.querySelector(".w-gerador--datas")&&(Methods.getProductInfos(),Methods.getTopBannerColor())},getProductInfos:function(){var e=document.querySelector(".w-gerador--datas").getAttribute("data-product"),u=document.querySelector(".w-gerador--datas").getAttribute("data-sku");fetch("http://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:"+e).then(function(e){return e.json()}).then(function(e){var t=e[0].items;for(var r in console.log("produto",e[0]),console.log("Link:",e[0].linkText),t)if(t.hasOwnProperty(r)){var o=t[r];if(o.itemId==u){var n=o.sellers[0].commertialOffer.ListPrice,c=o.sellers[0].commertialOffer.Price,a=parseInt(100-c/n*100),d=void 0;(d=document.querySelectorAll(".w-product--link"))[0].href="/"+e[0].linkText+"/p",d[1].href="/"+e[0].linkText+"/p",document.querySelector(".w-product--wrapper--img").src=o.images[0].imageUrl,document.querySelector(".w-product--wrapper--infos--title").textContent=o.name,document.querySelector(".w-product--wrapper--infos--old-price").textContent="R$ "+n.toFixed(2).replace(".",","),document.querySelector(".w-product--wrapper--infos--new-price").textContent="R$ "+c.toFixed(2).replace(".",","),document.querySelector(".w-product--wrapper--flag").textContent="-"+a+"%",document.querySelector("a.w-product--wrapper--infos--buy-button").href=o.sellers[0].addToCartLink,o.sellers[0].commertialOffer.AvailableQuantity<=0?Methods.disableProduct():(Methods.counterInit(),document.querySelector(".w-product--wrapper--infos--parcelamento").innerHTML="até "+Math.max.apply(Math,o.sellers[0].commertialOffer.Installments.map(function(e){return e.NumberOfInstallments}))+"x de R$"+Math.min.apply(Math,o.sellers[0].commertialOffer.Installments.map(function(e){return e.Value})).toFixed(2).toString().replace(".",",")+" sem juros")}}})},counterInit:function(){document.querySelector(".w-gerador--datas").getAttribute("data-inicio");var e=document.querySelector(".w-gerador--datas").getAttribute("data-fim"),u=new Date(e),i=0;i=setInterval(function(){var e=new Date,t=u-e;if(t<=0)return Methods.disableProduct(),void clearInterval(i);Math.floor(t/864e5);var r=Math.floor(t/36e5),o=Math.floor(t%36e5/6e4),n=Math.floor(t%6e4/1e3),c=document.querySelector(".w-product--contador--timer--time.--hours"),a=document.querySelector(".w-product--contador--time.--minutes"),d=document.querySelector(".w-product--contador--time.--segundos");c.innerHTML=r<10?"0"+r:r,a.innerHTML=o<10?"0"+o:o,d.innerHTML=n<10?"0"+n:n},1e3)},disableProduct:function(){var e=document.querySelector(".w-product--wrapper--infos--buy-button");document.querySelector(".w-product--wrapper--infos--buy-button button").textContent="Indisponível",e.style="pointer-events: none;",e.href="",document.querySelector(".w-product--wrapper--infos--old-price").classList.add("hidden"),document.querySelector(".w-product--wrapper--infos--new-price").classList.add("hidden"),document.querySelector(".w-product--wrapper--flag").classList.add("hidden"),document.querySelector(".w-promo-text").classList.add("hidden"),document.querySelector(".w-promo-text-sad").classList.remove("hidden")},getTopBannerColor:function(){var e=void 0;e=null!=document.querySelector(".w-counter--bg")?document.querySelector(".w-counter--bg").getAttribute("data-color"):"red",document.querySelector(".w-product--contador").style="color:"+e+";",document.querySelector(".w-product--wrapper--flag").style="background-color:"+e,document.querySelector(".w-product--wrapper--infos--old-price").style="color:"+e,document.querySelector(".w-product--wrapper--infos--new-price").style="color:"+e,document.querySelector(".w-product--wrapper--infos--buy-button").style="background-color:"+e},fetchReviews:function(){var e=document.querySelector(".w-gerador--datas").getAttribute("data-product");fetch("https://service.yourviews.com.br/api/388ef2d0-c3b8-4fd6-af13-446b698d544a/review/reviewshelf?productIds="+e,{method:"GET",mode:"cors",headers:new Headers({"Content-Type":"application/json",Authorization:"Basic Mzg4ZWYyZDAtYzNiOC00ZmQ2LWFmMTMtNDQ2YjY5OGQ1NDRhOjU2N2Q0MjVmLTA1MGQtNGY1NC05MWUxLTMzODgwZmFjZmRkMw==","Access-Control-Allow-Origin":"*"})}).then(function(e){return e.json()}).then(function(e){console.log("data",e);var t=void 0;e.Element.map(function(r,e){t+='<li class="review">\n                        <span class="_rate">\n                            '+function(){for(var e="",t=1;t<=r.Rating;t++)e+='<svg viewBox="0 0 18 21" width="18" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.605 14.394L0 10.48s2.528-2.836 3.605-3.913l5.014-5.013a5.326 5.326 0 0 1 7.523 0 5.321 5.321 0 0 1 0 7.521l-1.406 1.405 1.406 1.405a5.321 5.321 0 0 1 0 7.521 5.327 5.327 0 0 1-7.523 0l-5.014-5.013z" fill="#67605F"/></svg>';return e}()+"\n                        </span>\n                    </li>"}),document.querySelector(".w-product--wrapper--infos--rate").innerHTML=t.replace("undefined","")})},getReviews:function(){new Promise(function(e,t){var r=new XMLHttpRequest,o="https://service.yourviews.com.br/api/388ef2d0-c3b8-4fd6-af13-446b698d544a/review/reviewshelf?productIds="+document.querySelector(".w-gerador--datas").getAttribute("data-product");r.open("GET",o),r.setRequestHeader("Content-Type","application/json"),r.setRequestHeader("mode","cors"),r.setRequestHeader("Authorization","Basic Mzg4ZWYyZDAtYzNiOC00ZmQ2LWFmMTMtNDQ2YjY5OGQ1NDRhOjU2N2Q0MjVmLTA1MGQtNGY1NC05MWUxLTMzODgwZmFjZmRkMw=="),r.setRequestHeader("Access-Control-Allow-Origin","*"),r.onreadystatechange=function(){4===r.readyState&&e(JSON.parse("oieeeee",r.response))},console.log("request",r),r.send()}).then(function(e){console.log(e);var t=void 0;e.Element.map(function(r,e){t+='<li class="review">\n                        <span class="_rate">\n                            '+function(){for(var e="",t=1;t<=r.Rating;t++)e+='<svg viewBox="0 0 18 21" width="18" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.605 14.394L0 10.48s2.528-2.836 3.605-3.913l5.014-5.013a5.326 5.326 0 0 1 7.523 0 5.321 5.321 0 0 1 0 7.521l-1.406 1.405 1.406 1.405a5.321 5.321 0 0 1 0 7.521 5.327 5.327 0 0 1-7.523 0l-5.014-5.013z" fill="#67605F"/></svg>';return e}()+"\n                        </span>\n                    </li>"}),document.querySelector(".w-product--wrapper--infos--rate").innerHTML=t.replace("undefined","")})}};exports.default={init:Methods.init};