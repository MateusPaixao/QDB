!function r(i,a,u){function c(n,e){if(!a[n]){if(!i[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(s)return s(n,!0);throw new Error("Cannot find module '"+n+"'")}var o=a[n]={exports:{}};i[n][0].call(o.exports,function(e){var t=i[n][1][e];return c(t||e)},o,o.exports,r,i,a,u)}return a[n].exports}for(var s="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,t,n){"use strict";var o,r=e("./modules/General/general-index"),i=(o=r)&&o.__esModule?o:{default:o};document.addEventListener("DOMContentLoaded",i.default.init)},{"./modules/General/general-index":7}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o,r=e("./_header-menu"),i=(o=r)&&o.__esModule?o:{default:o};var a={init:function(){i.default.init()}};n.default={init:a.init}},{"./_header-menu":3}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o,r=e("../cache-selector"),i=(o=r)&&o.__esModule?o:{default:o};var a={init:function(){a.openCloseMenu(),a.openCloseList()},openCloseMenu:function(){i.default.header.menuHamContainer.addEventListener("click",function(e){e.target==i.default.header.menuHamContainer||e.target==i.default.header.menuHamText?(i.default.header.menuHam.classList.toggle("is--active"),i.default.header.menuList.classList.toggle("js--menu-close"),e.target.classList.add("is--active")):e.preventDefault})},openCloseList:function(){i.default.header.menuItem.addEventListener("click",function(e){e.target.classList.toggle("is--active"),i.default.header.menuItem.classList.remove("is--active")})}};n.default={init:a.init}},{"../cache-selector":6}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i,a=e("./components/_PriceSelect.jsx"),u=(i=a)&&i.__esModule?i:{default:i};var c={init:function(){c.setRegion()},setRegion:function(){var e=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,React.Component),o(n,[{key:"render",value:function(){return React.createElement(u.default,null)}}]),n);function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.state={Session:"",Region:""},t}ReactDOM.render(React.createElement(e,null),document.getElementById("regiao"))}};n.default={init:c.init}},{"./components/_PriceSelect.jsx":5}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,React.Component),o(a,[{key:"getLocation",value:function(){function e(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]+)"));if(t)return t[2]}if(null!=e("vtexRegion"))return this.setState({Session:e("vtex_session"),Region:e("vtexRegion").split(",")[0],LatLng:e("vtexRegion").split(",")[1]});document.querySelector(".header__region").classList.add("--active"),setTimeout(function(){document.querySelector(".header__region").classList.remove("--active")},5e3)}},{key:"setPosition",value:function(e,r){var i=this;return new Promise(function(e,t){var n=new XMLHttpRequest,o={public:{country:{value:"BRA"},geoCoordinates:{value:r}}};n.open("POST","/api/sessions/"+i.state.Session),n.setRequestHeader("Content-Type","application/json"),n.onreadystatechange=function(){4===n.readyState&&(e(JSON.parse(n.response)),console.log("Location Up"))},n.send(JSON.stringify(o))}).then(function(){document.cookie="vtexRegion="+e+","+r}).catch(function(){i.setState({Region:"Sudeste",LatLng:"04551000"}),document.cookie="vtexRegion=Sudeste,04551000"})}},{key:"componentDidMount",value:function(){this.getLocation()}},{key:"handleChange",value:function(e){var t=this;this.setState({Region:e.split(",")[0],LatLng:e.split(",")[1]},function(){t.setPosition(t.state.Region,t.state.LatLng)})}},{key:"render",value:function(){var t=this;return React.createElement(React.Fragment,null,React.createElement("select",{className:"header__region__selection",value:this.state.Region+","+this.state.LatLng,onChange:function(e){return t.handleChange(e.target.value)}},this.state.Regions.map(function(e){return React.createElement("option",{className:"header__region__selection--option",value:e,key:e.split(",")[1]}," ",e.split(",")[0]," ")})))}}]),a);function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={LatLng:"04551000",Region:"Sudeste",Regions:["Norte,66000000","Nordeste,41000000","Centro Oeste,70000000","Sudeste,04551000","Sul,80000000"]},t.getLocation=t.getLocation.bind(t),t.setPosition=t.setPosition.bind(t),t.handleChange=t.handleChange.bind(t),t}n.default=i},{}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={header:{menuHam:document.querySelector(".header__menu-hamburguer"),menuHamContainer:document.querySelector(".header__menu-hamburguer-container"),menuList:document.querySelector(".header__menu-container"),menuHamText:document.querySelector(".header__menu-hamburguer--text"),menuItem:document.querySelector(".header__menu")}}},{}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=i(e("./Regional/PriceContainer.jsx")),r=i(e("./Header/_header-index"));function i(e){return e&&e.__esModule?e:{default:e}}var a={init:function(){r.default.init(),o.default.init()}};n.default={init:a.init}},{"./Header/_header-index":2,"./Regional/PriceContainer.jsx":4}]},{},[1]);