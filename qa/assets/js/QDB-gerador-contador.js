!function(t){var e={};function o(r){if(e[r])return e[r].exports;var c=e[r]={i:r,l:!1,exports:{}};return t[r].call(c.exports,c,c.exports,o),c.l=!0,c.exports}o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var c in t)o.d(r,c,function(e){return t[e]}.bind(null,c));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=90)}({90:function(t,e,o){"use strict";o.r(e);o(91);var r=document.querySelector(".w-gerador--fetch"),c=document.querySelector(".w-gerador--generate"),n={init:function(){n.copyOutput(),r.addEventListener("click",(function(){document.querySelector(".w-gerador--load").classList.remove("hidden"),null!=document.querySelector(".w-error")&&document.querySelector(".w-error").remove(),n.getProductInfos()})),c.addEventListener("click",n.generateAttributes)},copyOutput:function(){var t=document.querySelector(".w-gerador--copy");t.addEventListener("click",(function(){document.querySelector(".w-gerador--output").select(),document.execCommand("copy"),t.value="Copiado!",setTimeout((function(){t.value="Copiar"}),2e3)}))},generateAttributes:function(){var t={idProduto:document.querySelector(".w-gerador--text.idproduto").value,idSku:document.querySelector(".w-gerador--text.idsku").value,cor:document.querySelector(".w-gerador--color.color").value,titulo:document.querySelector(".w-gerador--text.title").value,color:document.querySelector(".w-gerador--color").value,texto:document.querySelector(".w-gerador--text.text").value,tituloSad:document.querySelector(".w-gerador--text.title-sad").value,textoSad:document.querySelector(".w-gerador--text.text-sad").value,tituloOut:document.querySelector(".w-gerador--text.title-out").value,textoOut:document.querySelector(".w-gerador--text.text-out").value,dataInicial:document.querySelector(".w-gerador--text.time-inicial").value,dataFinal:document.querySelector(".w-gerador--text.time-final").value};t.dataFinal=t.dataFinal.split("T");var e=t.dataFinal[0].split("-");e="".concat(e[1],"/").concat(e[2],"/").concat(e[0]);var o="".concat(e," ").concat(t.dataFinal[1],":00"),r=document.querySelector(".w-gerador--output"),c='<input type="hidden" class="w-gerador--datas" data-inicio="'.concat(t.dataInicial,'" data-fim="').concat(o,'" data-product="').concat(t.idProduto,'" data-sku="').concat(t.idSku,'"/>'),n='<div class="w-product--container">\n        '.concat(c,'\n        <article class="w-product--counter">\n            <div class="w-promo-text">\n                <p class="w-product--title" style="color: ').concat(t.cor,'">').concat(t.titulo,'</p>\n                <p class="w-product--text" style="color: ').concat(t.cor,'">').concat(t.texto,'</p>\n            </div>\n            <div class="w-promo-text-sad hidden">\n                <p class="w-product--title" style="color: ').concat(t.cor,'">').concat(t.tituloSad,'</p>\n                <p class="w-product--text" style="color: ').concat(t.cor,'">').concat(t.textoSad,'</p>\n            </div>\n            <div class="w-promo-text-out hidden">\n                <p class="w-product--title" style="color: ').concat(t.cor,'">').concat(t.tituloOut,'</p>\n                <p class="w-product--text" style="color: ').concat(t.cor,'">').concat(t.textoOut,'</p>\n            </div>\n            <div class="w-product--contador">\n                <div class="w-product--contador--timer">\n                    <span class="w-product--contador--timer--time --hours" style="color: ').concat(t.cor,'">0</span>\n                    <small class="w-product--contador--timer--small hora" style="color: ').concat(t.cor,'">horas</small>\n                </div>\n                <div class="w-product--contador--timer">\n                    <span class="w-product--contador--time --minutes" style="color: ').concat(t.cor,'">0</span>\n                    <small class="w-product--contador--timer--small min" style="color: ').concat(t.cor,'">minutos</small>\n                </div>\n                <div class="w-product--contador--timer">\n                    <span class="w-product--contador--time --segundos" style="color: ').concat(t.cor,'">0</span>\n                    <small class="w-product--contador--timer--small seg" style="color: ').concat(t.cor,'">segundos</small>\n                </div>\n            </div>\n        </article>\n        <article class="w-product--infos">\n        <div class="w-product--wrapper">\n            <div class="w-product--wrapper--relative">\n                <span style="background-color: ').concat(t.color,'" class="w-product--wrapper--flag">-0%</span>\n                <a class="w-product--link" href="">\n                    <img src="" class="w-product--wrapper--img">\n                </a>\n            </div>\n            <div class="w-product--wrapper--infos">\n                <p class="w-product--wrapper--infos--rate"></p>\n                <a class="w-product--link" href="">\n                    <p class="w-product--wrapper--infos--title"></p>\n                </a>\n                <p style="color: ').concat(t.color,'" class="w-product--wrapper--infos--old-price"></p>\n                <p style="color: ').concat(t.color,'" class="w-product--wrapper--infos--new-price"></p>\n                <p class="w-product--wrapper--infos--parcelamento"></p>\n                <button class="w-product--wrapper--infos--buy-button">Adicionar a Sacola</button>\n                </div>\n        </div>\n    </article>\n    </div>');r.textContent="".concat(n)},getProductInfos:function(){var t=document.querySelector(".w-gerador--text.idproduto").value;fetch("http://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:"+t).then((function(t){return t.json()})).then((function(t){var e=t[0].items;console.log(e);var o=document.querySelector(".w-gerador--text.idsku");for(var r in document.querySelector(".w-gerador--load").classList.add("hidden"),document.querySelectorAll(".w-gerador--label")[1].classList.remove("hidden"),o.innerHTML="",e)if(e.hasOwnProperty(r)){var c=e[r],n=document.createElement("option");n.value=c.itemId,n.style.color="#fff",n.style.padding="5px",n.textContent="[".concat(c.itemId,"] ").concat(c.name),o.append(n),c.sellers[0].commertialOffer.AvailableQuantity?n.style.backgroundColor="green":n.style.backgroundColor="red"}})).catch((function(t){document.querySelector(".w-gerador--text.idsku").innerHTML="",console.error("Erro:",t);var e=document.createElement("p");document.querySelector(".w-gerador--load").classList.add("hidden"),e.textContent="Product ID Inválido, tente novamente.",e.style.color="red",e.classList.add("w-error"),document.querySelector(".w-gerador--butons").appendChild(e)}))}};n.init()},91:function(t,e,o){}});