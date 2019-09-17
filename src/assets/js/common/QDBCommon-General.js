// import "./global/vendor/compatibility/fetch"
// import React from "../../../../node_modules/react/cjs/react.production.min.js"
// import ReactDOM from "../../../../node_modules/react-dom/cjs/react-dom.production.min.js"
import General from "./modules/General/general-index"

General.init();

// $(document).ready(function(){
//     loadImg(); // adicionado para carregar no load as imagens iniciais(); // adicionado para carregar no load as imagens iniciais
//     if(BrowserVendor == 'safari/webkit' || BrowserVendor == 'edge/edgehtml' || BrowserVendor == 'ie/trident'){
//         setVitrineDataImg();
//         console.log("Set OnLoad IE / Safari");
//         var imginview = getAllElementsWithAttribute('data-img');
//         for(var i = 0; i <= imginview.length; i++){
//             imginview[i].src = imginview[i].dataset.img;
//         }
//     }

// });