!function a(o,i,c){function s(n,e){if(!i[n]){if(!o[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);throw new Error("Cannot find module '"+n+"'")}var r=i[n]={exports:{}};o[n][0].call(r.exports,function(e){var t=o[n][1][e];return s(t||e)},r,r.exports,a,o,i,c)}return i[n].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)s(c[e]);return s}({1:[function(e,t,n){"use strict";var r,a=e("./modules/General/general-index");((r=a)&&r.__esModule?r:{default:r}).default.init()},{"./modules/General/general-index":6}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e};function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o,i=e("./components/_PriceSelect.jsx"),c=(o=i)&&o.__esModule?o:{default:o};var s={init:function(){s.setRegion()},setRegion:function(){var e=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,React.Component),r(n,[{key:"render",value:function(){return React.createElement(c.default,null)}}]),n);function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.state={Session:"",Region:""},t}ReactDOM.render(React.createElement(e,null),document.getElementById("regiao"))}};n.default={init:s.init}},{"./components/_PriceSelect.jsx":3}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e};function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(i,React.Component),r(i,[{key:"getLocation",value:function(){function e(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]+)"));if(t)return t[2]}if(null!=e("vtexRegion"))return this.setState({Session:e("vtex_session"),Region:e("vtexRegion").split(",")[0],LatLng:e("vtexRegion").split(",")[1]});document.querySelector(".header__region").classList.add("--active"),setTimeout(function(){document.querySelector(".header__region").classList.remove("--active")},5e3)}},{key:"setPosition",value:function(e,a){var o=this;return new Promise(function(e,t){var n=new XMLHttpRequest,r={public:{country:{value:"BRA"},postalCode:{value:a}}};n.open("POST","/api/sessions/"+o.state.Session),n.setRequestHeader("Content-Type","application/json"),n.onreadystatechange=function(){4===n.readyState&&(e(JSON.parse(n.response)),console.log("Location Up"))},n.send(JSON.stringify(r))}).then(function(){document.cookie="vtexRegion="+e+","+a}).catch(function(){o.setState({Region:"Sudeste",LatLng:"04551000"}),document.cookie="vtexRegion=Sudeste,04551000"})}},{key:"componentDidMount",value:function(){this.getLocation()}},{key:"handleChange",value:function(e){var t=this;this.setState({Region:e.split(",")[0],LatLng:e.split(",")[1]},function(){t.setPosition(t.state.Region,t.state.LatLng)})}},{key:"render",value:function(){var t=this;return React.createElement(React.Fragment,null,React.createElement("select",{className:"header__region__selection",value:this.state.Region+","+this.state.LatLng,onChange:function(e){return t.handleChange(e.target.value)}},this.state.Regions.map(function(e){return React.createElement("option",{className:"header__region__selection--option",value:e,key:e.split(",")[1]}," ",e.split(",")[0]," ")})))}}]),i);function i(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e));return t.state={LatLng:"04551000",Region:"Sudeste",Regions:["Norte,66000000","Nordeste,41000000","Centro Oeste,70000000","Sudeste,04551000","Sul,80000000"]},t.getLocation=t.getLocation.bind(t),t.setPosition=t.setPosition.bind(t),t.handleChange=t.handleChange.bind(t),t}n.default=o},{}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i,c=e("./components/_Card.jsx"),s=(i=c)&&i.__esModule?i:{default:i};var l={init:function(){},BuildVitrine:function(r){var e=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,React.Component),o(n,[{key:"componentDidMount",value:function(){var t=this;return new Promise(function(e,t){var n=new XMLHttpRequest;n.open("GET","/api/catalog_system/pub/products/search/?fq=H:"+r),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded;"),n.onreadystatechange=function(){4===n.readyState&&e(JSON.parse(n.response))},n.send()}).then(function(e){t.setState({Products:e})})}},{key:"render",value:function(){var e=this;return React.createElement(function(){var n=[];return e.state.Products.map(function(e,t){n.push(React.createElement(s.default,a({},e,{key:r+e.productId+t})))}),React.createElement(React.Fragment,null,React.createElement("div",{className:"cardProductContainer --gliderVitrine"},n))},null)}}]),n);function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.state={Products:[]},t}ReactDOM.render(React.createElement(e,null),document.getElementById("collection-"+r))}};n.default={init:l.init,build:l.BuildVitrine}},{"./components/_Card.jsx":5}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e};function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(i,React.Component),r(i,[{key:"setAvaliable",value:function(){var e=!0;return 0!=this.state.Sku.sellers[0].commertialOffer.AvailableQuantity&&0!=this.state.Sku.sellers[0].commertialOffer.Price&&0!=this.state.Sku.sellers[0].commertialOffer.ListPrice||(e=!1),this.setState({Avaliable:e})}},{key:"setDiscount",value:function(){var e=void 0;return 1==this.state.Avaliable&&0!=(e=this.state.Sku.sellers[0].commertialOffer.Price-this.state.Sku.sellers[0].commertialOffer.ListPrice)&&(e=Math.round(100*e/this.state.Sku.sellers[0].commertialOffer.ListPrice)),this.setState({Discount:e})}},{key:"setBeforePrice",value:function(){if(this.state.Sku.sellers[0].commertialOffer.ListPrice==this.state.Sku.sellers[0].commertialOffer.Price||0==this.state.Sku.sellers[0].commertialOffer.AvailableQuantity)return!1}},{key:"getReviews",value:function(n,e,t){var a=this;new Promise(function(e,t){var n=new XMLHttpRequest,r="https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productids="+a.props.productId;n.open("GET",r),n.setRequestHeader("YVStoreKey","388ef2d0-c3b8-4fd6-af13-446b698d544a"),n.setRequestHeader("Content-Type","application/json"),n.setRequestHeader("Access-Control-Allow-Origin","*"),n.onreadystatechange=function(){4===n.readyState&&e(JSON.parse(n.response))},n.send()}).then(function(e){var t=void 0;console.log(e),e.Element.map(function(n,e){t+='<li class="review">\n                <span class="_rate">\n                '+function(){for(var e="",t=1;t<=n.Rating;t++)e+='<svg viewBox="0 0 18 21" width="18" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.605 14.394L0 10.48s2.528-2.836 3.605-3.913l5.014-5.013a5.326 5.326 0 0 1 7.523 0 5.321 5.321 0 0 1 0 7.521l-1.406 1.405 1.406 1.405a5.321 5.321 0 0 1 0 7.521 5.327 5.327 0 0 1-7.523 0l-5.014-5.013z" fill="#67605F"/></svg>';return e}()+'\n                </span>\n                <p class="_comment">“'+n.Review+"” -"+n.User.Name.split(" ")[0]+"</p>\n            </li>"}),n.innerHTML=t.replace("undefined","")})}},{key:"addToCart",value:function(t){var a=this;t.innerHTML="Adicionando...",t.style.opacity=".7",vtexjs.checkout.getOrderForm().then(function(e){if(console.log(e),!e.items.length){var t={id:a.state.Sku.itemId,quantity:qtd.value,seller:"1"};return vtexjs.checkout.addToCart([t])}e.items.map(function(e,t){if(e.id==a.state.Sku.itemId){var n={index:t,quantity:1+e.quantity};return vtexjs.checkout.updateItems([n])}var r={id:a.state.Sku.itemId,quantity:"1",seller:"1"};return vtexjs.checkout.addToCart([r])})}).done(function(e){console.log(e),vtexjs.checkout.getOrderForm().then(function(e){window._orderForm=e,document.querySelector(".__cart-link a span").textContent=document.querySelector(".__cart-link a span").textContent++}).done(function(){t.innerHTML='<svg className="cardProduct--addToCart__bag" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z" /></svg><p className="cardProduct--addToCart__cta">Adicionar a Sacola</p>',t.style.opacity="1"})})}},{key:"render",value:function(){var t=this;return String.prototype.allReplace=function(e){var t=this;for(var n in e)t=t.replace(new RegExp(n,"g"),e[n]);return t},React.createElement("div",{className:"cardProduct avaliable-"+this.state.Avaliable,"data-prod":this.props.productId},React.createElement("span",{className:"cardProduct--change"}),React.createElement("a",{href:"/"+this.props.linkText,className:"cardProduct__link"},React.createElement("span",{className:"cardProduct__discount"},0!=this.state.Discount?this.state.Discount:""),React.createElement("div",{className:"cardProduct__pictureContainer"},React.createElement("ul",{className:"cardProduct__pictureContainer__rating"}),React.createElement("img",{className:"cardProduct__pictureContainer__picture",src:this.state.Sku.images[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({"#width#":"150","#height#":"150","~":""}),loading:"lazy"})),React.createElement("div",{className:"cardProduct__info"},React.createElement("p",{className:"cardProduct__info__name"},this.props.productName,React.createElement("svg",{className:"cardProduct__info--favorite",width:"23",height:"19",viewBox:"0 0 23 19",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M11.1503 3.53732L11.5 3.87959L11.8497 3.53732L13.3914 2.02851C15.4757 -0.0113849 18.8643 -0.00747146 20.9442 2.02806C23.022 4.06158 23.0154 7.36215 20.9437 9.38962L15.4508 14.7654L11.4951 18.3313C11.4434 18.286 11.3866 18.2361 11.3253 18.1823C11.0157 17.9102 10.5906 17.5356 10.1287 17.1249C9.20159 16.3006 8.1373 15.341 7.55654 14.7726L2.05628 9.38962C-0.0153681 7.36215 -0.0219969 4.06158 2.05583 2.02806C4.13571 -0.00747146 7.52425 -0.0113849 9.60859 2.02851L11.1503 3.53732Z"})))),React.createElement("div",{className:"cardProduct__price"},React.createElement("p",{className:"cardProduct__price__before _before-"+this.setBeforePrice()},"R$"+this.state.Sku.sellers[0].commertialOffer.ListPrice.toFixed(2).toString().replace(".",",")),React.createElement("p",{className:"cardProduct__price__actual"},"R$"+this.state.Sku.sellers[0].commertialOffer.Price.toFixed(2).toString().replace(".",",")),React.createElement("p",{className:"cardProduct__price__installment"},"até "+Math.max.apply(Math,this.state.Sku.sellers[0].commertialOffer.Installments.map(function(e){return e.NumberOfInstallments}))+"x de R$"+Math.min.apply(Math,this.state.Sku.sellers[0].commertialOffer.Installments.map(function(e){return e.Value})).toFixed(2).toString().replace(".",",")+" sem juros"))),React.createElement("span",{className:"cardProduct--addToCart",onClick:function(e){return t.addToCart(e.currentTarget)}},React.createElement("svg",{className:"cardProduct--addToCart__bag",width:"20",height:"24",viewBox:"0 0 20 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z"})),React.createElement("p",{className:"cardProduct--addToCart__cta"},"Adicionar a Sacola")))}}]),i);function i(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e));return t.state={Sku:t.props.items[0],Avaliable:!0},t.setAvaliable=t.setAvaliable.bind(t),t.setDiscount=t.setDiscount.bind(t),t.setBeforePrice=t.setBeforePrice.bind(t),t.addToCart=t.addToCart.bind(t),t}n.default=o},{}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=o(e("./Vitrine/VitrineContainer.jsx")),a=o(e("./Regional/PriceContainer.jsx"));function o(e){return e&&e.__esModule?e:{default:e}}var i={init:function(){a.default.init()},build:function(e){r.default.build(e)}};n.default={init:i.init,vitrine:i.build}},{"./Regional/PriceContainer.jsx":2,"./Vitrine/VitrineContainer.jsx":4}]},{},[1]);
