!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=104)}({104:function(e,t,n){"use strict";n.r(t);n(105);var r={init:function(){r.setResults(),r.FillTextContents(),r.copyToClip()},setResults:function(){var e=window.location.href,t=new URL(e),n=t.searchParams.get("option"),r=t.searchParams.get("supermate"),o=t.searchParams.get("altacobertura"),u=t.searchParams.get("corretivoaqua"),c=t.searchParams.get("superfluida"),a=t.searchParams.get("aqua"),i=t.searchParams.get("bbcreme");document.querySelector("#color-name").innerHTML=n,document.querySelector("#quiz-image").innerHTML="<img src='/arquivos/quizresultado".concat(n,".png'/>"),document.querySelector("#quiz-supermate").innerHTML="".concat(r),document.querySelector("#quiz-altacobertura").innerHTML="".concat(o),document.querySelector("#quiz-corretivoaqua").innerHTML="".concat(u),document.querySelector("#quiz-superfluida").innerHTML="".concat(c),document.querySelector("#quiz-aqua").innerHTML="".concat(a),document.querySelector("#quiz-bbcreme").innerHTML="".concat(i)},FillTextContents:function(){document.querySelector(".guarde-text").innerText="Esse foi meu resultado de tom de base no quiz da Quem disse, Berenice? ".concat(window.location.href),document.querySelector(".indique-text").innerText="Faça o teste para saber seu tom de base na Quem disse, Berenice? https://www.quemdisseberenice.com.br/como-descobrir-o-seu-tom-de-base/"},copyToClip:function(){var e=document.querySelector(".guarde");e.addEventListener("click",(function(){document.querySelector(".guarde-text").select(),document.execCommand("copy"),e.textContent="Copiado!",setTimeout((function(){e.textContent="Guarde seu resultado"}),2e3)}));var t=document.querySelector(".indique");t.addEventListener("click",(function(){document.querySelector(".indique-text").select(),document.execCommand("copy"),t.textContent="Copiado!",setTimeout((function(){t.textContent="Indique este teste"}),2e3)}))}};document.addEventListener("DOMContentLoaded",r.init)},105:function(e,t,n){}});