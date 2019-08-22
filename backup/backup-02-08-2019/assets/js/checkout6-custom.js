(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

//18_06__12_23
function validReceiver() {
  var urlShipping = window.location.href.indexOf('checkout/#/shipping') > -1;
  if (urlShipping) {
    var inputText = document.querySelector("#ship-receiverName");
    var goToPayment = document.querySelector('#btn-go-to-payment');
    inputText.addEventListener('keyup', function (_ref) {
      var currentTarget = _ref.currentTarget;

      var str = currentTarget.value;
      var lastStr = str.substr(str.length - 1);
      var isNumber = /\d/.test(lastStr);
      var newString = [].concat(_toConsumableArray(str));
      var regex = '[-=@!#$%¨&*+_´`^~;:?áÁéÉíÍóÓúÚãÃçÇ|\?,./{}"<>()]';

      var checkInputValue = inputText.value.match(regex);
      inputText.value.replace(/\d/, '');

      if (isNumber || checkInputValue) {
        alert('Números ou caracteres especiais não permitidos');
        inputText.value = inputText.value.substring(0, inputText.value.length - 1);
        return false;
      } else {
        console.log('não é numero');
      }

      goToPayment.addEventListener('click', function () {
        if (/\d/.test(inputText.value)) {
          str.replace(/\d/, '');
          console.log(str);
          inputText.value = str;
        }
      });
    });
  }
}
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.link-change-shipping vtex-omnishipping-1-x-summaryChange').on('click', validReceiver);
});
var applyMoreProducts = function applyMoreProducts() {
  $('#cart-title').wrap('<div class="_title"></div>');
  $('._title').append('<div class="_more-link"><a>Escolher mais produtos</a></div>');
  $('<a href="#/orderform" class="_buy-btn">Fechar pedido</div>').insertAfter('.cart-totalizers .accordion-group');
  return true;
};
$(applyMoreProducts);

var changeUrlButtonMoreProducts = function changeUrlButtonMoreProducts() {
  function getUrl(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : '/';
  }

  $('body').on('click', '._more-link, .more-products', function (event) {
    if (/\/p/.test(document.referrer) && !/utm/.test(document.referrer)) {
      location.href = getUrl('LastDepartmentUrl');
    } else {
      location.href = '/';
    }

    return true;
  });
};
$(changeUrlButtonMoreProducts);

/*201905281755*/
var addContinueShoppingBtn = function addContinueShoppingBtn() {
  $('.full-cart .cart').prepend('<div class="_more-prds-btns"><a href="/">Escolher mais produtos</a></div>');
  return true;
};
$(window).on('load', addContinueShoppingBtn);
var moveGiftTables = function moveGiftTables() {
  // if($(window).width()>768) return false;
  var gifts = $('.full-cart > .cart-select-gift-placeholder').eq(0);
  if (gifts.length <= 0) {
    gifts = $('.full-cart .summary-template-holder .cart-select-gift-placeholder').eq(0);
  }
  $('#cartLoadedDiv').append(gifts);
  return true;
};
$(window).on('load', moveGiftTables);
var fixVisaBtn = function fixVisaBtn() {
  $('.extensions-checkout-buttons-container').appendTo('._visa-btn-wrp');
  return true;
};
$(window).on('load', fixVisaBtn);
var checkEmptyCart = function checkEmptyCart() {
  if ($('.empty-cart-content:visible').length > 0) {
    $('html').addClass("_empty-cart");
  }
};
$(window).on('load', checkEmptyCart);
var siteblindadoSelo = function siteblindadoSelo(Cb) {
  var s = document.createElement('script');
  s.src = "//selo.siteblindado.com/aw.js";
  s.classList.add('_siteblindado-selo');
  s.addEventListener('load', function () {
    if ("function" === typeof Cb) {
      Cb();
    }
  });
  var sRef = document.getElementsByTagName('script')[0];
  sRef.parentNode.insertBefore(s, sRef);
};
var siteblindadoApi = function siteblindadoApi() {
  try {
    var apiScript = document.createElement('script');
    apiScript.async = true;
    apiScript.src = "//cdn.siteblindado.com/aw.js";
    apiScript.classList.add('_siteblindado-api');
    var scriptRef = document.getElementsByTagName('script')[0];
    scriptRef.parentNode.insertBefore(apiScript, scriptRef);
  } catch (error) {
    console.log(error);
  }
};
var startSiteblindado = function startSiteblindado() {
  window.___siteblindadoTO = setTimeout(function () {
    siteblindadoSelo(siteblindadoApi);
    clearTimeout(window.___siteblindadoTO);
  }, 5000);
};
$(window).on('load', startSiteblindado);

var applyClearsale = function (window, document, undefined) {
  var addFingerPrint = function addFingerPrint() {
    var deviceFingerprintIdCSV4 = 10000000 + Math.floor(Math.random() * 99999999);
    csdp('app', '4xlyr73qs322g24mv7qt');
    csdp('sessionid', deviceFingerprintIdCSV4);
    window.vtex.deviceFingerprint = deviceFingerprintIdCSV4;
    return true;
  };
  var clearsaleFPScript = function clearsaleFPScript(a, b, c, d, e, f, g, h) {
    a['CsdpObject'] = e;
    a[e] = a[e] || function () {
      (a[e].q = a[e].q || []).push(arguments);
    }, a[e].l = 1 * new Date();
    f = b.createElement(c), g = b.getElementsByTagName(c)[0];
    f.async = 1;
    f.src = d;
    f.classList.add('_clearsale-fingerprint');
    f.addEventListener('load', h);
    g.parentNode.insertBefore(f, g);
    return true;
  };
  var startClearsale = function startClearsale() {
    if (!/payment/ig.test(document.location.hash) || !!window.___clearsaleApplied) {
      return false;
    }
    clearsaleFPScript(window, document, 'script', '//device.clearsale.com.br/p/fp.js', 'csdp', undefined, undefined, addFingerPrint);
    window.___clearsaleApplied = true;
    return true;
  };
  return startClearsale;
}(window, document);

var showBoleto = function showBoleto() {
  if (!/payment/ig.test(document.location.hash)) {
    return false;
  }
  var className = '_show-boleto';
  $('html').removeClass(className);
  if ($('.vtex-omnishipping-1-x-SummaryItemTitle:visible').length <= 0) {
    $('html').addClass(className);
  }
  return true;
};
$(window).on('load', showBoleto);
var moreThen3Addresses = function moreThen3Addresses() {
  if (!/shipping/ig.test(document.location.hash)) {
    return false;
  }
  var html = document.querySelector("html");
  var addressList = document.getElementsByClassName('address-item');
  if (undefined !== addressList && addressList.length > 1) {
    html.classList.add("multiple-address");
  }
  return true;
};
var selectCreditCard = function selectCreditCard() {
  if (!/payment/ig.test(document.location.hash)) {
    return false;
  }
  if ($('.vtex-omnishipping-1-x-pickupAddress').length > 0 /* endereÃ§o de pickup */
  && $('#payment-group-bankInvoicePaymentGroup.active').length > 0 /* se boleto estÃ¡ selecionado */
  ) {
      $('a#payment-group-creditCardPaymentGroup').click();
    }
  return true;
};
var checkoutChanged = function checkoutChanged(e) {
  showBoleto();
  selectCreditCard();
  moreThen3Addresses();
  // applyClearsale();
};
var checkoutChangeEvents = function checkoutChangeEvents() {
  if (!!window.___checkoutEventsApplied) {
    return false;
  }
  //$(window).on('deliverySelected.vtex',checkoutChanged)
  $(window).on('hashchange', checkoutChanged);
  window.___checkoutEventsApplied = true;
  checkoutChanged();
  return true;
};
$(checkoutChangeEvents);
(function ($, window, document, undefined) {
  "use strict";

  var __log = console.log;
  var pricingTableTpl = function pricingTableTpl(p_row) {
    var row = p_row || 0;
    return '' + '<td class="_cart-tbl-container _cart-tbl-container' + row + '">' + '<div class="_cart-tbl">' + '<div class="_cart-left">' + '<div class="_cart-title">' + '<div class="_cart-col0">' + 'Produto' + '</div>' + '</div>' + '<div class="_cart-body">' + '<div class="_cart-col0 _cart-product">' + '</div>' + '</div>' + '</div>' + '<div class="_cart-right">' + '<div class="_cart-title">' + '<div class="_cart-col0">' + 'PreÃ§o' + '</div>' + '<div class="_cart-col1">' + 'Quantidade' + '</div>' + '<div class="_cart-col2">' + 'Total' + '</div>' + '<div class="_cart-col3">' + '&nbsp;' + '</div>' + '</div>' + '<div class="_cart-body">' + '<div class="_cart-col0 _cart-pricing">' + '</div>' + '<div class="_cart-col1 _cart-qty-container">' + '<div class="_cart-qty">' + '</div>' + '</div>' + '<div class="_cart-col2 _cart-final-price">' + '</div>' + '<div class="_cart-col3 _cart-remove">' + '</div>' + '</div>' + '</div>' + '</div>' + '</td>';
  };
  var fixPricingTable = function fixPricingTable() {
    $('.full-cart tr.product-item').each(function (ndx, item) {
      var _tpl = $(pricingTableTpl(ndx));
      $(item).filter(function () {
        return $(item).find('._cart-tbl').length <= 0;
      }).append(_tpl);
      var _img = $(item).find('.product-image img');
      // _img.attr('src', _img.attr('src').replace(/(.*)(-\d{2}-\d{2})(.*)/,'$1-200-200$3'));
      var _imgtd = $(item).find('.product-image').html(_img);
      /** move elements to a better place */
      $(item).find('._cart-product').html(_imgtd).append($(item).find('.product-name'));
      $(item).find('._cart-qty').html($(item).find('.quantity:first'));
      $(item).find('._cart-pricing').html($(item).find('.product-price:first'));
      $(item).find('._cart-final-price').html($(item).find('.quantity-price:first'));
      $(item).find('._cart-remove').html($(item).find('.item-remove:first'));
    });
    return true;
  };
  var pickupNotFind = function pickupNotFind() {
    var contentPickupNotFind = $('.ask-for-geolocation');
    if (contentPickupNotFind.length > 0) {
      contentPickupNotFind.html("<div class='pickup-notfind'>NÃ£o encontramos pontos de retirada perto deste endereÃ§o.<br /> </div>");
      setTimeout(function () {
        $('#shipping-option-delivery').click();
        console.log('sem ponto de retirada');
      }, 4500);
    };
  };
  $(window).on('load', pickupNotFind);
  var onCartChange = function onCartChange() {
    $(window).on('orderFormUpdated.vtex', function () {
      fixPricingTable();
      setTimeout(function () {
        pickupNotFind();
      }, 1000);
    });
    return true;
  };
  var startCartFix = function startCartFix() {
    fixPricingTable();
    onCartChange();
    return true;
  };
  $(startCartFix);
  var fixPaymentDiscountLink = function fixPaymentDiscountLink() {
    $(document).ready(function () {
      $('body').on('click', '.payment-discounts-alert', function () {
        $("html, body").animate({
          scrollTop: $('.body-order-form').offset().top
        }, 1000);
      });
    });
    return true;
  };
  $(fixPaymentDiscountLink);
})(jQuery, window, document);

// var apllyPromotion = function (sku, desconto) {
//     document.querySelectorAll('')
// };


// $(window).on('orderFormUpdated.vtex', function (event, orderForm) {
//     if (window.location.href.indexOf('cart') !== -1) {
//         if (typeof (window.parar) !== 'undefined') return;
//         total_f1 = 0;
//         $('.total-selling-price').each(function () {
//             total_f1_ = $(this).text().replace(/[^0-9]+/g, '');
//             total_f1_ = total_f1_.substr(0, total_f1_.length - 2) + '.' + total_f1_.substr(total_f1_.length - 2, total_f1_.length);
//             total_f1_ = parseFloat(total_f1_);
//             total_f1 += total_f1_;
//             console.log('total carrinho:' + total_f1);
//         });
//         valueToActive1 = parseFloat("{{valor_oferta_carrinho_40}}".replace(',', '.'));
//         valueToActive2 = parseFloat("{{valor_oferta_carrinho_80}}".replace(',', '.'));
//         valueToActive3 = parseFloat("{{valor_oferta_carrinho_120}}".replace(',', '.'));

//         var percentage = Math.round(total_f1 / valueToActive3 * 100);
//         console.log('total percentutal:' + percentage);

//     }  
// });
// var item = {
//     id: 1342,
//     quantity: 2,
//     seller: '1'
// };
// vtexjs.checkout.addToCart([item], null, 1)
// .done(function(orderForm) {
//     console.log(orderForm);
// });

/**20190605*/
// var apllyPromotion = function (sku, desconto) {
//     document.querySelectorAll('')
// };


// $(window).on('orderFormUpdated.vtex', function (event, orderForm) {
//     if (window.location.href.indexOf('cart') !== -1) {
//         if (typeof (window.parar) !== 'undefined') return;
//         total_f1 = 0;
//         $('.total-selling-price').each(function () {
//             total_f1_ = $(this).text().replace(/[^0-9]+/g, '');
//             total_f1_ = total_f1_.substr(0, total_f1_.length - 2) + '.' + total_f1_.substr(total_f1_.length - 2, total_f1_.length);
//             total_f1_ = parseFloat(total_f1_);
//             total_f1 += total_f1_;
//             console.log('total carrinho:' + total_f1);
//         });
//         valueToActive1 = parseFloat("{{valor_oferta_carrinho_40}}".replace(',', '.'));
//         valueToActive2 = parseFloat("{{valor_oferta_carrinho_80}}".replace(',', '.'));
//         valueToActive3 = parseFloat("{{valor_oferta_carrinho_120}}".replace(',', '.'));

//         var percentage = Math.round(total_f1 / valueToActive3 * 100);
//         console.log('total percentutal:' + percentage);

//     }  
// });
// var item = {
//     id: 1342,
//     quantity: 2,
//     seller: '1'
// };
// vtexjs.checkout.addToCart([item], null, 1)
// .done(function(orderForm) {
//     console.log(orderForm);
// });

/**20190605*/
// var Utls = function(e, h, k, l) {
//     return function() {
//         var c = this;
//         c.getSkus = function(a) {
//             var b = e.Deferred();
//             if ("undefined" === a)
//                 return b.reject("Missing product id."),
//                 b.promise();
//             if (c.getSkus.data[a])
//                 return b.resolve(c.getSkus.data[a]),
//                 b.promise();
//             vtexjs.catalog.getProductWithVariations(a).fail(function(d) {
//                 c.getSkus.data[a] = [];
//                 b.reject("Product id not found.")
//             }).done(function(d) {
//                 c.getSkus.data[a] = {
//                     id: d.productId,
//                     name: d.name,
//                     skus: d.skus.slice(),
//                     salesChannel: d.salesChannel,
//                     available: d.available
//                 };
//                 b.resolve(c.getSkus.data[a])
//             });
//             return b.promise()
//         }
//         ;
//         c.getSkus.data = {};
//         c.getSkuList = function(a) {
//             if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
//                 return a = new Promise(function(a, c) {
//                     c("Missing list of product id. eg. [1, 45, 83].")
//                 }
//                 ),
//                 Promise.all([a]);
//             var b = []
//               , d = {};
//             e.each(a, function(a, f) {
//                 var g = new Promise(function(a, b) {
//                     c.getSkuList.data[f] ? a(c.getSkuList.data) : c.getSkus(f).then(function(b) {
//                         d[f] = e.extend({}, b);
//                         c.getSkuList.data = e.extend({}, d, c.getSkuList.data);
//                         a(c.getSkuList.data)
//                     }, function(a) {
//                         b("Product id not found.")
//                     })
//                 }
//                 );
//                 b.push(g)
//             });
//             return Promise.all(b)
//         }
//         ;
//         c.getSkuList.data = {};
//         c.getInfo = function(a) {
//             var b = e.Deferred();
//             if ("undefined" === a)
//                 return b.reject("Missing product id."),
//                 b.promise();
//             var d = "/api/catalog_system/pub/products/search/?fq=productId:" + a;
//             if (c.getInfo.data[a])
//                 return b.resolve(c.getInfo.data[a]),
//                 b.promise();
//             e.ajax({
//                 url: d, 
//                 success: function(d) {
//                     c.getInfo.data[a] = d;
//                     b.resolve(c.getInfo.data[a])
//                 },
//                 error: function(d) {
//                     c.getInfo.data[a] = [];
//                     b.reject("Product id not found.")
//                 }
//             });
//             return b.promise()
//         }
//         ;
//         c.getInfo.data = {};
//         c.addProducts = function(a) {
//             var b = e.Deferred();
//             if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
//                 return b.reject("Missing array of objects. eg. [{ id: 1 }, { id: 2, quantity: 2 }]"),
//                 b.promise();
//             var c = [];
//             e.each(a, function(a, b) {
//                 var d = Object.assign({
//                     id: 0,
//                     quantity: 1,
//                     seller: 1
//                 }, b);
//                 c.push(d)
//             });
//             vtexjs.checkout.addToCart(c).fail(function(a) {
//                 b.reject(a)
//             }).done(function(a) {
//                 b.resolve(a)
//             });
//             return b.promise()
//         }
//         ;
//         "undefined" !== typeof console && "undefined" !== typeof console.log && (c.__log = console.log);
//         return !0
//     }
// }(jQuery, window, document);
// var formatBR = function (Number) { var number = "string"===typeof Number?1*Number:Number; var tmp = number.toFixed(2); tmp = tmp.replace(/\./, ""); tmp = tmp.replace(/([0-9]{2})$/g, ",$1"); if (tmp.length > 6) { tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2"); } return tmp; };
// var stringToSlug = function (e) { var a = e.trim(); a = a.toLowerCase(); a = a.replace(/\(|\)|\'|,/g, ""); a = a.replace(/\s+/g, " "); a = a.replace(/(\s|&|\?|\/|\||:)/g, "-"); a = a.replace(/\u00e7/g, "c"); a = a.replace(/\u00f1/g, "n"); a = a.replace(/\u00c7/g, "C"); a = a.replace(/\u00d1/g, "N"); a = a.replace(/[\u00c3\u00c2\u00c1\u00c0\u00c4]/g, "A"); a = a.replace(/[\u00c9\u00c8\u00cb]/g, "E"); a = a.replace(/[\u00cd\u00cc\u00cf]/g, "I"); a = a.replace(/[\u00d5\u00d4\u00d3\u00d2\u00d6]/g, "O"); a = a.replace(/[\u00da\u00d9]/g, "U"); a = a.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g, "a"); a = a.replace(/[\u00e8\u00e9\u00ea\u00eb]/g, "e"); a = a.replace(/[\u00ec\u00ed\u00ee\u00ef]/g, "i"); a = a.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g, "o"); a = a.replace(/[\u00f9\u00fa\u00fb\u00fc]/g, "u"); return a; };
// var generateImgUrl = (function ($,window,document,undefined){
//     "use strict";
//     return function (ImgSrc) {
//         var size = 180;
//         if($('html').hasClass('_mobi-on')) {
//             size = 140;
//         }
//         return ImgSrc.replace(/(.*?ids\/)(.*?)(\/.*)/g,"$1$2-"+size+"-"+size+"$3").replace(/\?.*/,"");
//     };
// })(jQuery,window,document);
// /**11-02-2019 - 17:20 */
// var promotionData = [
//     { idSku: "906",
//         activeValue: 40.00,
//         discountPercent: 26.50
//     },
//     { idSku: "1910",
//         activeValue: 42.00,
//         discountPercent: 22.50
//     },
//     { idSku: "1259",
//         activeValue: 43.00, //valor do sarrafo(carrinho)
//         discountPercent: 23.50 //porcentagem
//     }
// ];
// __skus = [];
// promotionData.forEach(function(e){
// 	__skus.push(e.idSku);
// });
// var getProds = function () {
//     $.ajax({
//         type: "GET",
//         url: 'https://www.quemdisseberenice.com.br/cart?refs=' + __skus.join(','),
//         data: "check",
//         success: function(response){
//             resultOfertas = $(response).filter('div.ofertaDeCaixa');
// 			$('.cart').append(resultOfertas);
// 			$('.__lnk-buy-btn').on("click", function () {
// 				event.preventDefault();
// 				var __skuSelected = $(this).attr('href').match(/.*?=([\w|-]*).*/)[1];
// 				//console.log(__skuSelected);
// 				var item = {
// 					id: __skuSelected,
// 					quantity: 1,
// 					seller: '1'
// 				};
// 				vtexjs.checkout.addToCart([item], null, 1)
// 				.done(function(orderForm) {
// 					console.log(orderForm);
// 				});
// 			});    
//         }
// 	});
// };
// getProds();
// var swapShowcaseData = (function ($,window,document,undefined) {
//     "use strict";
//     return function (Elem,Data) {
//         if(!Elem||!Data||!!Data&&!Data.url) { return false; }
//         var data = Data, _elem = $(Elem), 
//             name = data.name||"", imgURL = data.img, 
//             reg_html = "", reg_str = "", reg_value = 1*data.price||0, sale_str = "", sale_value = 1*data.sale||0, 
//             times = data.times||"", installments_html = "", installments_str = "", installment_value = data.installments||0, url = data.url||"", 
//             sku = data.sku||"", attachments = data.attachments.split(','), 
//             _pricing_html = `<span class="_p_price_">{%REG%}</span>
//                 <span class="_p_priceoffer_"><span class="__p_by">por </span> <span class="__p_priceoffer">{%SALE%}</span></span>
//                 <span class="_p_intallments">{%PRICING%}</span>`;
//         var sale_str = "R$ " + formatBR(sale_value);
//         if(url.length>0) {
//             url = [url, "idsku=" + sku].join('?');
//         }
//         if(reg_value>0 && reg_value>sale_value) {
//             reg_str = "R$ "+formatBR(reg_value);
//             reg_html = `<span class="__p_from">de </span> <span class="__p_price">{%REGVALUE%}</span>`
//             .replace(/{%REGVALUE%}/g,reg_str);
//         }
//         if(times.length>0&&(~~times)>1) {
//             installments_str = "R$ "+formatBR(installment_value);
//             installments_html = `<span class="__p_installments"> <span class="__p_numberinstallments">{%TIMES%}x</span> de <span class="__p_installmentsvalue">{%INSTALLMENTVALUE%} </span> <span class="__p_installments-juros">sem&nbsp;juros</span>`
//             .replace(/{%TIMES%}/g,times).replace(/{%INSTALLMENTVALUE%}/g,installments_str);
//         }        
//         _pricing_html = _pricing_html.replace(/{%REG%}/g,reg_html);
//         _pricing_html = _pricing_html.replace(/{%SALE%}/g,sale_str);
//         _pricing_html = _pricing_html.replace(/{%PRICING%}/g,installments_html);

//         _elem.find('.__lnk-img').filter(function () {
//             return $(this).find('._p-promo-labels').length==0;
//         }).append('<div class="_p-promo-labels"></div>');

//         var labels = [];
//         $.each(attachments,function (ndx,item) {
//             if(item.length>0&&/flag/ig.test(item)){
//                 item = item.replace(/flag:/ig,"");
//                 labels.push('<span class="__flag __flag-'+stringToSlug(item)+'">'+item+'</span>');
//             }
//         });
//         _elem.find('._p-promo-labels').html(labels.join(""));

//         _elem.find('.__lnk-img,.__lnk-pname,.__lnk-buy-btn').attr('href',url);
//         _elem.find('.__p_img img').attr('src',imgURL);
//         _elem.find('.__p_name').html(name);
//         _elem.find('.__p_pricing_').html(_pricing_html);

//         //!!applyDiscountFlag&&applyDiscountFlag(_elem); // apply discount flag
//         return true;
//     }
// })(jQuery,window,document);
// var getAttClasses = (function ($,window,document,undefined) {
//     "use strict";
//     return function (Att) {
//         if(Att.length<=0) { return ""; }
//         var atts = Att.split(',');
//         var hasFlags = false;
//         $.each(atts,function (ndx,att) {
//             if(/flag/ig.test(att)&&!hasFlags){
//                 hasFlags = true;
//             }
//             att = att.replace(/Destaque/,"highlight");
//             att = "__btn-"+stringToSlug(att);
//             atts[ndx] = att;
//         });
//         if(hasFlags) atts.push("__hasflags");
//         return atts.join(" ");
//     }
// })(jQuery,window,document);
// var AddSkuSelector = (function ($,window,document,undefined) {
//     return function () {
//         var self = this, classMarker = "__selectors-applied";
//         self.applySelector = function (Elem) {
//             var _elem = $(Elem);
//             var prodId = _elem.find('._product').attr('data-prd');
//             console.log(prodId);
//             if(_elem.length<=0 || _elem.length>0 && prodId.length<=0){ return false; }
//             self.getSku(prodId).then(function (Data) {
//                 if(!self.applyVariations(_elem,prodId,Data)){
//                     self.noVariation(_elem,prodId);
//                 }
//             });
//         };
//         self.getSku = function (ProdId) {
//             var dfd = $.Deferred();
//             var prodId = ProdId;
//             if(!self.func.getInfo) { // check if undefined
//                 self.func = new Utls();
//             }
//             self.func.getInfo(prodId).then(function (Data) {
//                 if(Data.length>0) {
//                     self.data[prodId] = Data[0];
//                     dfd.resolve(self.data);
//                 }
//             },function (error) {
//                 // error
//                 dfd.reject(error);
//             });
//             return dfd.promise();
//         };
//         self.func = {};
//         self.data = {};
//         self.applyVariations = function (Elem,ProdId,Data) {
//             if( !Elem 
//                 || !ProdId
//                 || Data.length<=0 
//                 || !!ProdId && Data[ProdId].items.length>0 && undefined===Data[ProdId].items[0].variations
//             ) {
//                 return false;
//             }
//             var _style = $('._selectors-styles');
//             if(_style.length<=0) {
//                 _style = $('<style/>').addClass('_selectors-styles');
//                 $('head').append(_style);
//             }
//             var styles = _style.text()||"";
//             var marker = "__selectors-on";
//             var _elem = $(Elem);
//             // var data = Data[ProdId];
//             var data = self.sortData(Data[ProdId]);
//             var id = ProdId;
//             var _selectorData = self.getSelectors(data);
//             var _selectors = _selectorData['selectors'];
//             var selector_length = _selectors.children().length;
//             var hasColor = false;
//             styles += _selectorData['styles'];

//             var _div;
//                 _div = _elem.find('._p-sku-selection');
//             if(_div.length<=0) {
//                 _div = $('<div/>').addClass('_p-sku-selection'); 
//             }
//             _div.append(_selectors);
//             _div.attr('data-sku-length',selector_length);
//             // _div.addClass('_on').attr('data-sku-length',selector_length);
//             if(!!_selectorData.settings&&!!_selectorData.settings.type&&/cor/.test(_selectorData.settings.type)){
//                 hasColor = true;
// 				_div.addClass('_p-sku-color');
// 				$('body').addClass(marker);
// 				if($('._p-selectors')){
// 					setTimeout(() => {
// 						$('._p-selectors').slick({
// 							infinite: false,
// 							slidesToShow: 3,
// 							slidesToScroll: 3
// 						});
// 					}, 110);
// 				};
//             }
//             _elem
//                 .not('.'+marker)
//                 .addClass(marker).addClass(marker+'-'+id).addClass('_prd-'+id)
//                 .filter(function () {
//                     return $(this).find('._p-sku-selection span').length<=0;
//                 })
//                 .find('.__lnk-buy-btn')
//                 .before(_div);
// 			_style.text(styles);

//             var _firstSelected = _selectors.find('.__btn-highlight:first');
//             if(_firstSelected.length<=0){
// 				_firstSelected = _selectors.find('span:first');

// 			}

//             self.skuSelected(_firstSelected);
//             return true;
//         };
//         self.noVariation = function (Elem) {
//             $(Elem).addClass('_selector-unavailable');
//             return true;
//         };
//         self.getSelectors = function (Data) {
//             var _container = $('<div/>').addClass('_p-selectors');
//             var settings = {}, styles = "";
//             var name = Data.productName;
//             var url = Data.link||"";
//             $.each(Data.items,function (ndx,item) {
//                 if(!!item.sellers&&item.sellers[0].commertialOffer.AvailableQuantity>0&&!!item.variations) {
//                     var times = item.sellers[0].commertialOffer.Installments[0].NumberOfInstallments;
//                     var installments = item.sellers[0].commertialOffer.Installments[0].Value;
//                         installments = installments.toFixed(2);
//                     var _elem = $('<span/>');
//                     var type = item.variations[0]||"";
//                         type += item.variations.length>1?" | "+item.variations[1]:"";
//                     var hasColor = /cor/i.test(type);
//                     _elem.on('click.SkuSelection',function(e) {
//                         if("function"===typeof self.skuSelected) {
//                             self.skuSelected(_elem);
//                         }
//                     });
//                     var attachments = "";

//                     var pname = item[item.variations[0]];
//                         pname += item.variations.length>1?" | "+item[item.variations[1]]:"";
//                     var imgURL = "", thumbURL = "";
//                     if(item.images.length>0) {
//                         imgURL = item.images[0].imageUrl;
//                         imgURL = generateImgUrl(imgURL);
//                     }
//                     if(item.images.length>1) {
//                         $.each(item.images,function (ndx,img) {
//                             if(/thumb/i.test(img.imageLabel)) {
//                                 thumbURL = img.imageUrl;
//                                 thumbURL = (generateImgUrl(thumbURL)||"").replace(/http:/,"https:");
//                                 return false;
//                             }
//                         });
//                     }
//                     // var highlight = false;
//                     if(!!item.attachments){
//                         var att = item.attachments.slice(0);
//                         var flags = [];
//                         $.each(att,function (ndx,item) {
//                             // if(!highlight) {
//                             //     highlight = /destaque/ig.test(item.name);
//                             // }
//                             flags.push(item.name);
//                         });
//                         attachments = flags.join(',');
//                     }
//                     _elem.html(pname);
//                     if(hasColor){
//                         _elem.html("&nbsp;");
//                         settings = $.extend({},{ type: "cor" });
//                     } 
//                     var className = '_'+stringToSlug(pname);
//                     // if(highlight) { className += " __btn-highlight"; }
//                     var sale = item.sellers[0].commertialOffer.Price;
//                         sale = sale.toFixed(2);
//                     var price = item.sellers[0].commertialOffer.ListPrice;
//                         price = price.toFixed(2);
//                     _elem.attr('title',pname);
//                     // _elem.addClass(className);
//                     _elem.addClass(className).addClass(getAttClasses(attachments));
//                     _elem.attr('data-qty',item.sellers[0].commertialOffer.AvailableQuantity);
//                     _elem.attr('data-name',name);
//                     _elem.attr('data-url',url);
//                     _elem.attr('data-type',type);
//                     _elem.attr('data-img',imgURL);
//                     _elem.attr('data-thumb',thumbURL);
//                     _elem.attr('data-price',price); // regular price
//                     _elem.attr('data-sale',sale); // price on sale = cheaper
//                     _elem.attr('data-times',times);
//                     _elem.attr('data-installments',installments);
//                     _elem.attr('data-sku',item.itemId);
//                     _elem.attr('data-attachments',attachments);
//                     if(thumbURL.length>0&&hasColor) {
//                         styles += "." + className + ":before{background-image:url("+thumbURL+")} ";
//                         // $(_elem).css({"background-image":"url("+thumbURL+")"});
//                     }
// 					_container.append(_elem);
//                 }
//             }); 
//             var result = { selectors: _container, styles: styles };
//             if(!!settings.type){
//                 result = $.extend(result,{ settings: settings });
//             }
//             return result;
//         };
//         self.skuSelected = function (Elem) {
//             if(!Elem||!!Elem&&Elem.length<=0) { return false; }
//             var _elem = $(Elem);
//             var _prd = _elem.parents('._prd');

// 			//_elem.parent().find('._on').removeClass('_on'); // deactivate all skus
// 			$('._on').removeClass('_on');
// 			//console.log(_elem.parent().parent().find('._on'));
//             _elem.addClass('_on'); // select this sku
//             new swapShowcaseData(_prd,_elem[0].dataset);
//         };
//         self.sortData = function (Data) {
//             if( !!Data.items && Data.items.length<=0 
//                 || !!Data.items && Data.items.length>0
//                     && undefined===Data.items[0].variations
//             ) {
//                 return false;
//             }
//             var hasColor = /cor/ig.test(Data.items[0].variations.join(","));
//             // sort, first if there is a "Destaque", second if there is "flag", third by product price
//             if(hasColor) {
//                 Data.items.sort(function (a,b) {
//                     return a.sellers[0].commertialOffer.Price - b.sellers[0].commertialOffer.Price;
//                 });
//             }
//             // sort installments
//             $.each(Data.items,function (ndx,item) {
//                 if(!!item.sellers&&item.sellers[0].commertialOffer.AvailableQuantity>0&&!!item.variations) {
//                     item.sellers[0].commertialOffer.Installments.sort(function (a,b) {
//                         return a.Value - b.Value;
//                     });
//                 }
//             });
//             return Data;
//         };
//     }
// })(jQuery,window,document);
// var applySelectorsOnMutation = (function ($,window,document,undefined) {
//     var applySelectorsOnMutation = function (){
//         if(!window.___selectors){
//             window.___selectors = new AddSkuSelector();
//         }
//         var target = document.querySelectorAll('[id*=ResultItems]');
//         var config = { subtree: true, childList: true };
//         var observer = new MutationObserver(function (mutations) {
//             mutations.forEach(function (mutation) {
//                 if("childList"===mutation.type&&/_product/ig.test(mutation.target.className)){
//                     var _prd = $(mutation.target).parents('._prd');
//                     window.___selectors.applySelector(_prd);
//                 }
//             });
//         });
//         target.forEach(function (t){
//             observer.observe(t, config);
//             return true;
//         });
//         return true;
//     };
// $(window).on('load',applySelectorsOnMutation);
// 	return applySelectorsOnMutation;
// })(jQuery,window,document);
// var addSkus = (function ($,window,document,undefined) {
//     var applyAllSelectors = function () {
//         if(!window.___selectors){
//             window.___selectors = new AddSkuSelector();
//         }
//         $('._prd').each(function (ndx,item) {
//             window.___selectors.applySelector(item);
//         });
//     };
//     $(window).on('load',applyAllSelectors);
//     return applyAllSelectors;
// })(jQuery,window,document);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMjQ5MjI4YjYuanMiXSwibmFtZXMiOlsiX3RvQ29uc3VtYWJsZUFycmF5IiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImFycjIiLCJsZW5ndGgiLCJmcm9tIiwidmFsaWRSZWNlaXZlciIsInVybFNoaXBwaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5kZXhPZiIsImlucHV0VGV4dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImdvVG9QYXltZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9yZWYiLCJjdXJyZW50VGFyZ2V0Iiwic3RyIiwidmFsdWUiLCJsYXN0U3RyIiwic3Vic3RyIiwiaXNOdW1iZXIiLCJ0ZXN0IiwibmV3U3RyaW5nIiwiY29uY2F0IiwicmVnZXgiLCJjaGVja0lucHV0VmFsdWUiLCJtYXRjaCIsInJlcGxhY2UiLCJhbGVydCIsInN1YnN0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJvbiIsImFwcGx5TW9yZVByb2R1Y3RzIiwiJCIsIndyYXAiLCJhcHBlbmQiLCJpbnNlcnRBZnRlciIsImNoYW5nZVVybEJ1dHRvbk1vcmVQcm9kdWN0cyIsImdldFVybCIsImtleSIsImtleVZhbHVlIiwiY29va2llIiwiZXZlbnQiLCJyZWZlcnJlciIsImFkZENvbnRpbnVlU2hvcHBpbmdCdG4iLCJwcmVwZW5kIiwibW92ZUdpZnRUYWJsZXMiLCJnaWZ0cyIsImVxIiwiZml4VmlzYUJ0biIsImFwcGVuZFRvIiwiY2hlY2tFbXB0eUNhcnQiLCJhZGRDbGFzcyIsInNpdGVibGluZGFkb1NlbG8iLCJDYiIsInMiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiY2xhc3NMaXN0IiwiYWRkIiwic1JlZiIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsInNpdGVibGluZGFkb0FwaSIsImFwaVNjcmlwdCIsImFzeW5jIiwic2NyaXB0UmVmIiwiZXJyb3IiLCJzdGFydFNpdGVibGluZGFkbyIsIl9fX3NpdGVibGluZGFkb1RPIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImFwcGx5Q2xlYXJzYWxlIiwidW5kZWZpbmVkIiwiYWRkRmluZ2VyUHJpbnQiLCJkZXZpY2VGaW5nZXJwcmludElkQ1NWNCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNzZHAiLCJ2dGV4IiwiZGV2aWNlRmluZ2VycHJpbnQiLCJjbGVhcnNhbGVGUFNjcmlwdCIsImEiLCJiIiwiYyIsImQiLCJlIiwiZiIsImciLCJoIiwicSIsInB1c2giLCJhcmd1bWVudHMiLCJsIiwiRGF0ZSIsInN0YXJ0Q2xlYXJzYWxlIiwiaGFzaCIsIl9fX2NsZWFyc2FsZUFwcGxpZWQiLCJzaG93Qm9sZXRvIiwiY2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3MiLCJtb3JlVGhlbjNBZGRyZXNzZXMiLCJodG1sIiwiYWRkcmVzc0xpc3QiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwic2VsZWN0Q3JlZGl0Q2FyZCIsImNsaWNrIiwiY2hlY2tvdXRDaGFuZ2VkIiwiY2hlY2tvdXRDaGFuZ2VFdmVudHMiLCJfX19jaGVja291dEV2ZW50c0FwcGxpZWQiLCJfX2xvZyIsInByaWNpbmdUYWJsZVRwbCIsInBfcm93Iiwicm93IiwiZml4UHJpY2luZ1RhYmxlIiwiZWFjaCIsIm5keCIsIml0ZW0iLCJfdHBsIiwiZmlsdGVyIiwiZmluZCIsIl9pbWciLCJfaW1ndGQiLCJwaWNrdXBOb3RGaW5kIiwiY29udGVudFBpY2t1cE5vdEZpbmQiLCJvbkNhcnRDaGFuZ2UiLCJzdGFydENhcnRGaXgiLCJmaXhQYXltZW50RGlzY291bnRMaW5rIiwicmVhZHkiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxTQUFTQSxrQkFBVCxDQUE0QkMsR0FBNUIsRUFBaUM7QUFBRSxNQUFJQyxNQUFNQyxPQUFOLENBQWNGLEdBQWQsQ0FBSixFQUF3QjtBQUFFLFNBQUssSUFBSUcsSUFBSSxD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmYWtlXzI0OTIyOGI2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuLy8xOF8wNl9fMTJfMjNcbmZ1bmN0aW9uIHZhbGlkUmVjZWl2ZXIoKSB7XG4gIHZhciB1cmxTaGlwcGluZyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJ2NoZWNrb3V0LyMvc2hpcHBpbmcnKSA+IC0xO1xuICBpZiAodXJsU2hpcHBpbmcpIHtcbiAgICB2YXIgaW5wdXRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwLXJlY2VpdmVyTmFtZVwiKTtcbiAgICB2YXIgZ29Ub1BheW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWdvLXRvLXBheW1lbnQnKTtcbiAgICBpbnB1dFRleHQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIGN1cnJlbnRUYXJnZXQgPSBfcmVmLmN1cnJlbnRUYXJnZXQ7XG5cblxuICAgICAgdmFyIHN0ciA9IGN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgICB2YXIgbGFzdFN0ciA9IHN0ci5zdWJzdHIoc3RyLmxlbmd0aCAtIDEpO1xuICAgICAgdmFyIGlzTnVtYmVyID0gL1xcZC8udGVzdChsYXN0U3RyKTtcbiAgICAgIHZhciBuZXdTdHJpbmcgPSBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHN0cikpO1xuICAgICAgdmFyIHJlZ2V4ID0gJ1stPUAhIyQlwqgmKitfwrRgXn47Oj/DocOBw6nDicOtw43Ds8OTw7rDmsOjw4PDp8OHfFxcPywuL3t9XCI8PigpXSc7XG5cbiAgICAgIHZhciBjaGVja0lucHV0VmFsdWUgPSBpbnB1dFRleHQudmFsdWUubWF0Y2gocmVnZXgpO1xuICAgICAgaW5wdXRUZXh0LnZhbHVlLnJlcGxhY2UoL1xcZC8sICcnKTtcblxuICAgICAgaWYgKGlzTnVtYmVyIHx8IGNoZWNrSW5wdXRWYWx1ZSkge1xuICAgICAgICBhbGVydCgnTsO6bWVyb3Mgb3UgY2FyYWN0ZXJlcyBlc3BlY2lhaXMgbsOjbyBwZXJtaXRpZG9zJyk7XG4gICAgICAgIGlucHV0VGV4dC52YWx1ZSA9IGlucHV0VGV4dC52YWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRUZXh0LnZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnbsOjbyDDqSBudW1lcm8nKTtcbiAgICAgIH1cblxuICAgICAgZ29Ub1BheW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgvXFxkLy50ZXN0KGlucHV0VGV4dC52YWx1ZSkpIHtcbiAgICAgICAgICBzdHIucmVwbGFjZSgvXFxkLywgJycpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHN0cik7XG4gICAgICAgICAgaW5wdXRUZXh0LnZhbHVlID0gc3RyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmstY2hhbmdlLXNoaXBwaW5nIHZ0ZXgtb21uaXNoaXBwaW5nLTEteC1zdW1tYXJ5Q2hhbmdlJykub24oJ2NsaWNrJywgdmFsaWRSZWNlaXZlcik7XG59KTtcbnZhciBhcHBseU1vcmVQcm9kdWN0cyA9IGZ1bmN0aW9uIGFwcGx5TW9yZVByb2R1Y3RzKCkge1xuICAkKCcjY2FydC10aXRsZScpLndyYXAoJzxkaXYgY2xhc3M9XCJfdGl0bGVcIj48L2Rpdj4nKTtcbiAgJCgnLl90aXRsZScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIl9tb3JlLWxpbmtcIj48YT5Fc2NvbGhlciBtYWlzIHByb2R1dG9zPC9hPjwvZGl2PicpO1xuICAkKCc8YSBocmVmPVwiIy9vcmRlcmZvcm1cIiBjbGFzcz1cIl9idXktYnRuXCI+RmVjaGFyIHBlZGlkbzwvZGl2PicpLmluc2VydEFmdGVyKCcuY2FydC10b3RhbGl6ZXJzIC5hY2NvcmRpb24tZ3JvdXAnKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuJChhcHBseU1vcmVQcm9kdWN0cyk7XG5cbnZhciBjaGFuZ2VVcmxCdXR0b25Nb3JlUHJvZHVjdHMgPSBmdW5jdGlvbiBjaGFuZ2VVcmxCdXR0b25Nb3JlUHJvZHVjdHMoKSB7XG4gIGZ1bmN0aW9uIGdldFVybChrZXkpIHtcbiAgICB2YXIga2V5VmFsdWUgPSBkb2N1bWVudC5jb29raWUubWF0Y2goJyhefDspID8nICsga2V5ICsgJz0oW147XSopKDt8JCknKTtcbiAgICByZXR1cm4ga2V5VmFsdWUgPyBrZXlWYWx1ZVsyXSA6ICcvJztcbiAgfVxuXG4gICQoJ2JvZHknKS5vbignY2xpY2snLCAnLl9tb3JlLWxpbmssIC5tb3JlLXByb2R1Y3RzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKC9cXC9wLy50ZXN0KGRvY3VtZW50LnJlZmVycmVyKSAmJiAhL3V0bS8udGVzdChkb2N1bWVudC5yZWZlcnJlcikpIHtcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSBnZXRVcmwoJ0xhc3REZXBhcnRtZW50VXJsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xufTtcbiQoY2hhbmdlVXJsQnV0dG9uTW9yZVByb2R1Y3RzKTtcblxuLyoyMDE5MDUyODE3NTUqL1xudmFyIGFkZENvbnRpbnVlU2hvcHBpbmdCdG4gPSBmdW5jdGlvbiBhZGRDb250aW51ZVNob3BwaW5nQnRuKCkge1xuICAkKCcuZnVsbC1jYXJ0IC5jYXJ0JykucHJlcGVuZCgnPGRpdiBjbGFzcz1cIl9tb3JlLXByZHMtYnRuc1wiPjxhIGhyZWY9XCIvXCI+RXNjb2xoZXIgbWFpcyBwcm9kdXRvczwvYT48L2Rpdj4nKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuJCh3aW5kb3cpLm9uKCdsb2FkJywgYWRkQ29udGludWVTaG9wcGluZ0J0bik7XG52YXIgbW92ZUdpZnRUYWJsZXMgPSBmdW5jdGlvbiBtb3ZlR2lmdFRhYmxlcygpIHtcbiAgLy8gaWYoJCh3aW5kb3cpLndpZHRoKCk+NzY4KSByZXR1cm4gZmFsc2U7XG4gIHZhciBnaWZ0cyA9ICQoJy5mdWxsLWNhcnQgPiAuY2FydC1zZWxlY3QtZ2lmdC1wbGFjZWhvbGRlcicpLmVxKDApO1xuICBpZiAoZ2lmdHMubGVuZ3RoIDw9IDApIHtcbiAgICBnaWZ0cyA9ICQoJy5mdWxsLWNhcnQgLnN1bW1hcnktdGVtcGxhdGUtaG9sZGVyIC5jYXJ0LXNlbGVjdC1naWZ0LXBsYWNlaG9sZGVyJykuZXEoMCk7XG4gIH1cbiAgJCgnI2NhcnRMb2FkZWREaXYnKS5hcHBlbmQoZ2lmdHMpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG4kKHdpbmRvdykub24oJ2xvYWQnLCBtb3ZlR2lmdFRhYmxlcyk7XG52YXIgZml4VmlzYUJ0biA9IGZ1bmN0aW9uIGZpeFZpc2FCdG4oKSB7XG4gICQoJy5leHRlbnNpb25zLWNoZWNrb3V0LWJ1dHRvbnMtY29udGFpbmVyJykuYXBwZW5kVG8oJy5fdmlzYS1idG4td3JwJyk7XG4gIHJldHVybiB0cnVlO1xufTtcbiQod2luZG93KS5vbignbG9hZCcsIGZpeFZpc2FCdG4pO1xudmFyIGNoZWNrRW1wdHlDYXJ0ID0gZnVuY3Rpb24gY2hlY2tFbXB0eUNhcnQoKSB7XG4gIGlmICgkKCcuZW1wdHktY2FydC1jb250ZW50OnZpc2libGUnKS5sZW5ndGggPiAwKSB7XG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKFwiX2VtcHR5LWNhcnRcIik7XG4gIH1cbn07XG4kKHdpbmRvdykub24oJ2xvYWQnLCBjaGVja0VtcHR5Q2FydCk7XG52YXIgc2l0ZWJsaW5kYWRvU2VsbyA9IGZ1bmN0aW9uIHNpdGVibGluZGFkb1NlbG8oQ2IpIHtcbiAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgcy5zcmMgPSBcIi8vc2Vsby5zaXRlYmxpbmRhZG8uY29tL2F3LmpzXCI7XG4gIHMuY2xhc3NMaXN0LmFkZCgnX3NpdGVibGluZGFkby1zZWxvJyk7XG4gIHMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgQ2IpIHtcbiAgICAgIENiKCk7XG4gICAgfVxuICB9KTtcbiAgdmFyIHNSZWYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIHNSZWYucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocywgc1JlZik7XG59O1xudmFyIHNpdGVibGluZGFkb0FwaSA9IGZ1bmN0aW9uIHNpdGVibGluZGFkb0FwaSgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXBpU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgYXBpU2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBhcGlTY3JpcHQuc3JjID0gXCIvL2Nkbi5zaXRlYmxpbmRhZG8uY29tL2F3LmpzXCI7XG4gICAgYXBpU2NyaXB0LmNsYXNzTGlzdC5hZGQoJ19zaXRlYmxpbmRhZG8tYXBpJyk7XG4gICAgdmFyIHNjcmlwdFJlZiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICBzY3JpcHRSZWYucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYXBpU2NyaXB0LCBzY3JpcHRSZWYpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufTtcbnZhciBzdGFydFNpdGVibGluZGFkbyA9IGZ1bmN0aW9uIHN0YXJ0U2l0ZWJsaW5kYWRvKCkge1xuICB3aW5kb3cuX19fc2l0ZWJsaW5kYWRvVE8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzaXRlYmxpbmRhZG9TZWxvKHNpdGVibGluZGFkb0FwaSk7XG4gICAgY2xlYXJUaW1lb3V0KHdpbmRvdy5fX19zaXRlYmxpbmRhZG9UTyk7XG4gIH0sIDUwMDApO1xufTtcbiQod2luZG93KS5vbignbG9hZCcsIHN0YXJ0U2l0ZWJsaW5kYWRvKTtcblxudmFyIGFwcGx5Q2xlYXJzYWxlID0gZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICB2YXIgYWRkRmluZ2VyUHJpbnQgPSBmdW5jdGlvbiBhZGRGaW5nZXJQcmludCgpIHtcbiAgICB2YXIgZGV2aWNlRmluZ2VycHJpbnRJZENTVjQgPSAxMDAwMDAwMCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDk5OTk5OTk5KTtcbiAgICBjc2RwKCdhcHAnLCAnNHhseXI3M3FzMzIyZzI0bXY3cXQnKTtcbiAgICBjc2RwKCdzZXNzaW9uaWQnLCBkZXZpY2VGaW5nZXJwcmludElkQ1NWNCk7XG4gICAgd2luZG93LnZ0ZXguZGV2aWNlRmluZ2VycHJpbnQgPSBkZXZpY2VGaW5nZXJwcmludElkQ1NWNDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgdmFyIGNsZWFyc2FsZUZQU2NyaXB0ID0gZnVuY3Rpb24gY2xlYXJzYWxlRlBTY3JpcHQoYSwgYiwgYywgZCwgZSwgZiwgZywgaCkge1xuICAgIGFbJ0NzZHBPYmplY3QnXSA9IGU7XG4gICAgYVtlXSA9IGFbZV0gfHwgZnVuY3Rpb24gKCkge1xuICAgICAgKGFbZV0ucSA9IGFbZV0ucSB8fCBbXSkucHVzaChhcmd1bWVudHMpO1xuICAgIH0sIGFbZV0ubCA9IDEgKiBuZXcgRGF0ZSgpO1xuICAgIGYgPSBiLmNyZWF0ZUVsZW1lbnQoYyksIGcgPSBiLmdldEVsZW1lbnRzQnlUYWdOYW1lKGMpWzBdO1xuICAgIGYuYXN5bmMgPSAxO1xuICAgIGYuc3JjID0gZDtcbiAgICBmLmNsYXNzTGlzdC5hZGQoJ19jbGVhcnNhbGUtZmluZ2VycHJpbnQnKTtcbiAgICBmLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBoKTtcbiAgICBnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGYsIGcpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICB2YXIgc3RhcnRDbGVhcnNhbGUgPSBmdW5jdGlvbiBzdGFydENsZWFyc2FsZSgpIHtcbiAgICBpZiAoIS9wYXltZW50L2lnLnRlc3QoZG9jdW1lbnQubG9jYXRpb24uaGFzaCkgfHwgISF3aW5kb3cuX19fY2xlYXJzYWxlQXBwbGllZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjbGVhcnNhbGVGUFNjcmlwdCh3aW5kb3csIGRvY3VtZW50LCAnc2NyaXB0JywgJy8vZGV2aWNlLmNsZWFyc2FsZS5jb20uYnIvcC9mcC5qcycsICdjc2RwJywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGFkZEZpbmdlclByaW50KTtcbiAgICB3aW5kb3cuX19fY2xlYXJzYWxlQXBwbGllZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIHJldHVybiBzdGFydENsZWFyc2FsZTtcbn0od2luZG93LCBkb2N1bWVudCk7XG5cbnZhciBzaG93Qm9sZXRvID0gZnVuY3Rpb24gc2hvd0JvbGV0bygpIHtcbiAgaWYgKCEvcGF5bWVudC9pZy50ZXN0KGRvY3VtZW50LmxvY2F0aW9uLmhhc2gpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBjbGFzc05hbWUgPSAnX3Nob3ctYm9sZXRvJztcbiAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XG4gIGlmICgkKCcudnRleC1vbW5pc2hpcHBpbmctMS14LVN1bW1hcnlJdGVtVGl0bGU6dmlzaWJsZScpLmxlbmd0aCA8PSAwKSB7XG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKGNsYXNzTmFtZSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuJCh3aW5kb3cpLm9uKCdsb2FkJywgc2hvd0JvbGV0byk7XG52YXIgbW9yZVRoZW4zQWRkcmVzc2VzID0gZnVuY3Rpb24gbW9yZVRoZW4zQWRkcmVzc2VzKCkge1xuICBpZiAoIS9zaGlwcGluZy9pZy50ZXN0KGRvY3VtZW50LmxvY2F0aW9uLmhhc2gpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBodG1sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIik7XG4gIHZhciBhZGRyZXNzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZHJlc3MtaXRlbScpO1xuICBpZiAodW5kZWZpbmVkICE9PSBhZGRyZXNzTGlzdCAmJiBhZGRyZXNzTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgaHRtbC5jbGFzc0xpc3QuYWRkKFwibXVsdGlwbGUtYWRkcmVzc1wiKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgc2VsZWN0Q3JlZGl0Q2FyZCA9IGZ1bmN0aW9uIHNlbGVjdENyZWRpdENhcmQoKSB7XG4gIGlmICghL3BheW1lbnQvaWcudGVzdChkb2N1bWVudC5sb2NhdGlvbi5oYXNoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoJCgnLnZ0ZXgtb21uaXNoaXBwaW5nLTEteC1waWNrdXBBZGRyZXNzJykubGVuZ3RoID4gMCAvKiBlbmRlcmXDg8KnbyBkZSBwaWNrdXAgKi9cbiAgJiYgJCgnI3BheW1lbnQtZ3JvdXAtYmFua0ludm9pY2VQYXltZW50R3JvdXAuYWN0aXZlJykubGVuZ3RoID4gMCAvKiBzZSBib2xldG8gZXN0w4PCoSBzZWxlY2lvbmFkbyAqL1xuICApIHtcbiAgICAgICQoJ2EjcGF5bWVudC1ncm91cC1jcmVkaXRDYXJkUGF5bWVudEdyb3VwJykuY2xpY2soKTtcbiAgICB9XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBjaGVja291dENoYW5nZWQgPSBmdW5jdGlvbiBjaGVja291dENoYW5nZWQoZSkge1xuICBzaG93Qm9sZXRvKCk7XG4gIHNlbGVjdENyZWRpdENhcmQoKTtcbiAgbW9yZVRoZW4zQWRkcmVzc2VzKCk7XG4gIC8vIGFwcGx5Q2xlYXJzYWxlKCk7XG59O1xudmFyIGNoZWNrb3V0Q2hhbmdlRXZlbnRzID0gZnVuY3Rpb24gY2hlY2tvdXRDaGFuZ2VFdmVudHMoKSB7XG4gIGlmICghIXdpbmRvdy5fX19jaGVja291dEV2ZW50c0FwcGxpZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8kKHdpbmRvdykub24oJ2RlbGl2ZXJ5U2VsZWN0ZWQudnRleCcsY2hlY2tvdXRDaGFuZ2VkKVxuICAkKHdpbmRvdykub24oJ2hhc2hjaGFuZ2UnLCBjaGVja291dENoYW5nZWQpO1xuICB3aW5kb3cuX19fY2hlY2tvdXRFdmVudHNBcHBsaWVkID0gdHJ1ZTtcbiAgY2hlY2tvdXRDaGFuZ2VkKCk7XG4gIHJldHVybiB0cnVlO1xufTtcbiQoY2hlY2tvdXRDaGFuZ2VFdmVudHMpO1xuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIF9fbG9nID0gY29uc29sZS5sb2c7XG4gIHZhciBwcmljaW5nVGFibGVUcGwgPSBmdW5jdGlvbiBwcmljaW5nVGFibGVUcGwocF9yb3cpIHtcbiAgICB2YXIgcm93ID0gcF9yb3cgfHwgMDtcbiAgICByZXR1cm4gJycgKyAnPHRkIGNsYXNzPVwiX2NhcnQtdGJsLWNvbnRhaW5lciBfY2FydC10YmwtY29udGFpbmVyJyArIHJvdyArICdcIj4nICsgJzxkaXYgY2xhc3M9XCJfY2FydC10YmxcIj4nICsgJzxkaXYgY2xhc3M9XCJfY2FydC1sZWZ0XCI+JyArICc8ZGl2IGNsYXNzPVwiX2NhcnQtdGl0bGVcIj4nICsgJzxkaXYgY2xhc3M9XCJfY2FydC1jb2wwXCI+JyArICdQcm9kdXRvJyArICc8L2Rpdj4nICsgJzwvZGl2PicgKyAnPGRpdiBjbGFzcz1cIl9jYXJ0LWJvZHlcIj4nICsgJzxkaXYgY2xhc3M9XCJfY2FydC1jb2wwIF9jYXJ0LXByb2R1Y3RcIj4nICsgJzwvZGl2PicgKyAnPC9kaXY+JyArICc8L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJfY2FydC1yaWdodFwiPicgKyAnPGRpdiBjbGFzcz1cIl9jYXJ0LXRpdGxlXCI+JyArICc8ZGl2IGNsYXNzPVwiX2NhcnQtY29sMFwiPicgKyAnUHJlw4PCp28nICsgJzwvZGl2PicgKyAnPGRpdiBjbGFzcz1cIl9jYXJ0LWNvbDFcIj4nICsgJ1F1YW50aWRhZGUnICsgJzwvZGl2PicgKyAnPGRpdiBjbGFzcz1cIl9jYXJ0LWNvbDJcIj4nICsgJ1RvdGFsJyArICc8L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJfY2FydC1jb2wzXCI+JyArICcmbmJzcDsnICsgJzwvZGl2PicgKyAnPC9kaXY+JyArICc8ZGl2IGNsYXNzPVwiX2NhcnQtYm9keVwiPicgKyAnPGRpdiBjbGFzcz1cIl9jYXJ0LWNvbDAgX2NhcnQtcHJpY2luZ1wiPicgKyAnPC9kaXY+JyArICc8ZGl2IGNsYXNzPVwiX2NhcnQtY29sMSBfY2FydC1xdHktY29udGFpbmVyXCI+JyArICc8ZGl2IGNsYXNzPVwiX2NhcnQtcXR5XCI+JyArICc8L2Rpdj4nICsgJzwvZGl2PicgKyAnPGRpdiBjbGFzcz1cIl9jYXJ0LWNvbDIgX2NhcnQtZmluYWwtcHJpY2VcIj4nICsgJzwvZGl2PicgKyAnPGRpdiBjbGFzcz1cIl9jYXJ0LWNvbDMgX2NhcnQtcmVtb3ZlXCI+JyArICc8L2Rpdj4nICsgJzwvZGl2PicgKyAnPC9kaXY+JyArICc8L2Rpdj4nICsgJzwvdGQ+JztcbiAgfTtcbiAgdmFyIGZpeFByaWNpbmdUYWJsZSA9IGZ1bmN0aW9uIGZpeFByaWNpbmdUYWJsZSgpIHtcbiAgICAkKCcuZnVsbC1jYXJ0IHRyLnByb2R1Y3QtaXRlbScpLmVhY2goZnVuY3Rpb24gKG5keCwgaXRlbSkge1xuICAgICAgdmFyIF90cGwgPSAkKHByaWNpbmdUYWJsZVRwbChuZHgpKTtcbiAgICAgICQoaXRlbSkuZmlsdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQoaXRlbSkuZmluZCgnLl9jYXJ0LXRibCcpLmxlbmd0aCA8PSAwO1xuICAgICAgfSkuYXBwZW5kKF90cGwpO1xuICAgICAgdmFyIF9pbWcgPSAkKGl0ZW0pLmZpbmQoJy5wcm9kdWN0LWltYWdlIGltZycpO1xuICAgICAgLy8gX2ltZy5hdHRyKCdzcmMnLCBfaW1nLmF0dHIoJ3NyYycpLnJlcGxhY2UoLyguKikoLVxcZHsyfS1cXGR7Mn0pKC4qKS8sJyQxLTIwMC0yMDAkMycpKTtcbiAgICAgIHZhciBfaW1ndGQgPSAkKGl0ZW0pLmZpbmQoJy5wcm9kdWN0LWltYWdlJykuaHRtbChfaW1nKTtcbiAgICAgIC8qKiBtb3ZlIGVsZW1lbnRzIHRvIGEgYmV0dGVyIHBsYWNlICovXG4gICAgICAkKGl0ZW0pLmZpbmQoJy5fY2FydC1wcm9kdWN0JykuaHRtbChfaW1ndGQpLmFwcGVuZCgkKGl0ZW0pLmZpbmQoJy5wcm9kdWN0LW5hbWUnKSk7XG4gICAgICAkKGl0ZW0pLmZpbmQoJy5fY2FydC1xdHknKS5odG1sKCQoaXRlbSkuZmluZCgnLnF1YW50aXR5OmZpcnN0JykpO1xuICAgICAgJChpdGVtKS5maW5kKCcuX2NhcnQtcHJpY2luZycpLmh0bWwoJChpdGVtKS5maW5kKCcucHJvZHVjdC1wcmljZTpmaXJzdCcpKTtcbiAgICAgICQoaXRlbSkuZmluZCgnLl9jYXJ0LWZpbmFsLXByaWNlJykuaHRtbCgkKGl0ZW0pLmZpbmQoJy5xdWFudGl0eS1wcmljZTpmaXJzdCcpKTtcbiAgICAgICQoaXRlbSkuZmluZCgnLl9jYXJ0LXJlbW92ZScpLmh0bWwoJChpdGVtKS5maW5kKCcuaXRlbS1yZW1vdmU6Zmlyc3QnKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIHZhciBwaWNrdXBOb3RGaW5kID0gZnVuY3Rpb24gcGlja3VwTm90RmluZCgpIHtcbiAgICB2YXIgY29udGVudFBpY2t1cE5vdEZpbmQgPSAkKCcuYXNrLWZvci1nZW9sb2NhdGlvbicpO1xuICAgIGlmIChjb250ZW50UGlja3VwTm90RmluZC5sZW5ndGggPiAwKSB7XG4gICAgICBjb250ZW50UGlja3VwTm90RmluZC5odG1sKFwiPGRpdiBjbGFzcz0ncGlja3VwLW5vdGZpbmQnPk7Dg8KjbyBlbmNvbnRyYW1vcyBwb250b3MgZGUgcmV0aXJhZGEgcGVydG8gZGVzdGUgZW5kZXJlw4PCp28uPGJyIC8+IDwvZGl2PlwiKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjc2hpcHBpbmctb3B0aW9uLWRlbGl2ZXJ5JykuY2xpY2soKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbSBwb250byBkZSByZXRpcmFkYScpO1xuICAgICAgfSwgNDUwMCk7XG4gICAgfTtcbiAgfTtcbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgcGlja3VwTm90RmluZCk7XG4gIHZhciBvbkNhcnRDaGFuZ2UgPSBmdW5jdGlvbiBvbkNhcnRDaGFuZ2UoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdvcmRlckZvcm1VcGRhdGVkLnZ0ZXgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmaXhQcmljaW5nVGFibGUoKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwaWNrdXBOb3RGaW5kKCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgdmFyIHN0YXJ0Q2FydEZpeCA9IGZ1bmN0aW9uIHN0YXJ0Q2FydEZpeCgpIHtcbiAgICBmaXhQcmljaW5nVGFibGUoKTtcbiAgICBvbkNhcnRDaGFuZ2UoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgJChzdGFydENhcnRGaXgpO1xuICB2YXIgZml4UGF5bWVudERpc2NvdW50TGluayA9IGZ1bmN0aW9uIGZpeFBheW1lbnREaXNjb3VudExpbmsoKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICcucGF5bWVudC1kaXNjb3VudHMtYWxlcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCgnLmJvZHktb3JkZXItZm9ybScpLm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICAkKGZpeFBheW1lbnREaXNjb3VudExpbmspO1xufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcblxuLy8gdmFyIGFwbGx5UHJvbW90aW9uID0gZnVuY3Rpb24gKHNrdSwgZGVzY29udG8pIHtcbi8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcnKVxuLy8gfTtcblxuXG4vLyAkKHdpbmRvdykub24oJ29yZGVyRm9ybVVwZGF0ZWQudnRleCcsIGZ1bmN0aW9uIChldmVudCwgb3JkZXJGb3JtKSB7XG4vLyAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJ2NhcnQnKSAhPT0gLTEpIHtcbi8vICAgICAgICAgaWYgKHR5cGVvZiAod2luZG93LnBhcmFyKSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbi8vICAgICAgICAgdG90YWxfZjEgPSAwO1xuLy8gICAgICAgICAkKCcudG90YWwtc2VsbGluZy1wcmljZScpLmVhY2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdG90YWxfZjFfID0gJCh0aGlzKS50ZXh0KCkucmVwbGFjZSgvW14wLTldKy9nLCAnJyk7XG4vLyAgICAgICAgICAgICB0b3RhbF9mMV8gPSB0b3RhbF9mMV8uc3Vic3RyKDAsIHRvdGFsX2YxXy5sZW5ndGggLSAyKSArICcuJyArIHRvdGFsX2YxXy5zdWJzdHIodG90YWxfZjFfLmxlbmd0aCAtIDIsIHRvdGFsX2YxXy5sZW5ndGgpO1xuLy8gICAgICAgICAgICAgdG90YWxfZjFfID0gcGFyc2VGbG9hdCh0b3RhbF9mMV8pO1xuLy8gICAgICAgICAgICAgdG90YWxfZjEgKz0gdG90YWxfZjFfO1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdGFsIGNhcnJpbmhvOicgKyB0b3RhbF9mMSk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICB2YWx1ZVRvQWN0aXZlMSA9IHBhcnNlRmxvYXQoXCJ7e3ZhbG9yX29mZXJ0YV9jYXJyaW5ob180MH19XCIucmVwbGFjZSgnLCcsICcuJykpO1xuLy8gICAgICAgICB2YWx1ZVRvQWN0aXZlMiA9IHBhcnNlRmxvYXQoXCJ7e3ZhbG9yX29mZXJ0YV9jYXJyaW5ob184MH19XCIucmVwbGFjZSgnLCcsICcuJykpO1xuLy8gICAgICAgICB2YWx1ZVRvQWN0aXZlMyA9IHBhcnNlRmxvYXQoXCJ7e3ZhbG9yX29mZXJ0YV9jYXJyaW5ob18xMjB9fVwiLnJlcGxhY2UoJywnLCAnLicpKTtcblxuLy8gICAgICAgICB2YXIgcGVyY2VudGFnZSA9IE1hdGgucm91bmQodG90YWxfZjEgLyB2YWx1ZVRvQWN0aXZlMyAqIDEwMCk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCd0b3RhbCBwZXJjZW50dXRhbDonICsgcGVyY2VudGFnZSk7XG5cbi8vICAgICB9ICBcbi8vIH0pO1xuLy8gdmFyIGl0ZW0gPSB7XG4vLyAgICAgaWQ6IDEzNDIsXG4vLyAgICAgcXVhbnRpdHk6IDIsXG4vLyAgICAgc2VsbGVyOiAnMSdcbi8vIH07XG4vLyB2dGV4anMuY2hlY2tvdXQuYWRkVG9DYXJ0KFtpdGVtXSwgbnVsbCwgMSlcbi8vIC5kb25lKGZ1bmN0aW9uKG9yZGVyRm9ybSkge1xuLy8gICAgIGNvbnNvbGUubG9nKG9yZGVyRm9ybSk7XG4vLyB9KTtcblxuLyoqMjAxOTA2MDUqL1xuLy8gdmFyIGFwbGx5UHJvbW90aW9uID0gZnVuY3Rpb24gKHNrdSwgZGVzY29udG8pIHtcbi8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcnKVxuLy8gfTtcblxuXG4vLyAkKHdpbmRvdykub24oJ29yZGVyRm9ybVVwZGF0ZWQudnRleCcsIGZ1bmN0aW9uIChldmVudCwgb3JkZXJGb3JtKSB7XG4vLyAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJ2NhcnQnKSAhPT0gLTEpIHtcbi8vICAgICAgICAgaWYgKHR5cGVvZiAod2luZG93LnBhcmFyKSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbi8vICAgICAgICAgdG90YWxfZjEgPSAwO1xuLy8gICAgICAgICAkKCcudG90YWwtc2VsbGluZy1wcmljZScpLmVhY2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdG90YWxfZjFfID0gJCh0aGlzKS50ZXh0KCkucmVwbGFjZSgvW14wLTldKy9nLCAnJyk7XG4vLyAgICAgICAgICAgICB0b3RhbF9mMV8gPSB0b3RhbF9mMV8uc3Vic3RyKDAsIHRvdGFsX2YxXy5sZW5ndGggLSAyKSArICcuJyArIHRvdGFsX2YxXy5zdWJzdHIodG90YWxfZjFfLmxlbmd0aCAtIDIsIHRvdGFsX2YxXy5sZW5ndGgpO1xuLy8gICAgICAgICAgICAgdG90YWxfZjFfID0gcGFyc2VGbG9hdCh0b3RhbF9mMV8pO1xuLy8gICAgICAgICAgICAgdG90YWxfZjEgKz0gdG90YWxfZjFfO1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdGFsIGNhcnJpbmhvOicgKyB0b3RhbF9mMSk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICB2YWx1ZVRvQWN0aXZlMSA9IHBhcnNlRmxvYXQoXCJ7e3ZhbG9yX29mZXJ0YV9jYXJyaW5ob180MH19XCIucmVwbGFjZSgnLCcsICcuJykpO1xuLy8gICAgICAgICB2YWx1ZVRvQWN0aXZlMiA9IHBhcnNlRmxvYXQoXCJ7e3ZhbG9yX29mZXJ0YV9jYXJyaW5ob184MH19XCIucmVwbGFjZSgnLCcsICcuJykpO1xuLy8gICAgICAgICB2YWx1ZVRvQWN0aXZlMyA9IHBhcnNlRmxvYXQoXCJ7e3ZhbG9yX29mZXJ0YV9jYXJyaW5ob18xMjB9fVwiLnJlcGxhY2UoJywnLCAnLicpKTtcblxuLy8gICAgICAgICB2YXIgcGVyY2VudGFnZSA9IE1hdGgucm91bmQodG90YWxfZjEgLyB2YWx1ZVRvQWN0aXZlMyAqIDEwMCk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCd0b3RhbCBwZXJjZW50dXRhbDonICsgcGVyY2VudGFnZSk7XG5cbi8vICAgICB9ICBcbi8vIH0pO1xuLy8gdmFyIGl0ZW0gPSB7XG4vLyAgICAgaWQ6IDEzNDIsXG4vLyAgICAgcXVhbnRpdHk6IDIsXG4vLyAgICAgc2VsbGVyOiAnMSdcbi8vIH07XG4vLyB2dGV4anMuY2hlY2tvdXQuYWRkVG9DYXJ0KFtpdGVtXSwgbnVsbCwgMSlcbi8vIC5kb25lKGZ1bmN0aW9uKG9yZGVyRm9ybSkge1xuLy8gICAgIGNvbnNvbGUubG9nKG9yZGVyRm9ybSk7XG4vLyB9KTtcblxuLyoqMjAxOTA2MDUqL1xuLy8gdmFyIFV0bHMgPSBmdW5jdGlvbihlLCBoLCBrLCBsKSB7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICB2YXIgYyA9IHRoaXM7XG4vLyAgICAgICAgIGMuZ2V0U2t1cyA9IGZ1bmN0aW9uKGEpIHtcbi8vICAgICAgICAgICAgIHZhciBiID0gZS5EZWZlcnJlZCgpO1xuLy8gICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IGEpXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGIucmVqZWN0KFwiTWlzc2luZyBwcm9kdWN0IGlkLlwiKSxcbi8vICAgICAgICAgICAgICAgICBiLnByb21pc2UoKTtcbi8vICAgICAgICAgICAgIGlmIChjLmdldFNrdXMuZGF0YVthXSlcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gYi5yZXNvbHZlKGMuZ2V0U2t1cy5kYXRhW2FdKSxcbi8vICAgICAgICAgICAgICAgICBiLnByb21pc2UoKTtcbi8vICAgICAgICAgICAgIHZ0ZXhqcy5jYXRhbG9nLmdldFByb2R1Y3RXaXRoVmFyaWF0aW9ucyhhKS5mYWlsKGZ1bmN0aW9uKGQpIHtcbi8vICAgICAgICAgICAgICAgICBjLmdldFNrdXMuZGF0YVthXSA9IFtdO1xuLy8gICAgICAgICAgICAgICAgIGIucmVqZWN0KFwiUHJvZHVjdCBpZCBub3QgZm91bmQuXCIpXG4vLyAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKGQpIHtcbi8vICAgICAgICAgICAgICAgICBjLmdldFNrdXMuZGF0YVthXSA9IHtcbi8vICAgICAgICAgICAgICAgICAgICAgaWQ6IGQucHJvZHVjdElkLFxuLy8gICAgICAgICAgICAgICAgICAgICBuYW1lOiBkLm5hbWUsXG4vLyAgICAgICAgICAgICAgICAgICAgIHNrdXM6IGQuc2t1cy5zbGljZSgpLFxuLy8gICAgICAgICAgICAgICAgICAgICBzYWxlc0NoYW5uZWw6IGQuc2FsZXNDaGFubmVsLFxuLy8gICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGU6IGQuYXZhaWxhYmxlXG4vLyAgICAgICAgICAgICAgICAgfTtcbi8vICAgICAgICAgICAgICAgICBiLnJlc29sdmUoYy5nZXRTa3VzLmRhdGFbYV0pXG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIHJldHVybiBiLnByb21pc2UoKVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIDtcbi8vICAgICAgICAgYy5nZXRTa3VzLmRhdGEgPSB7fTtcbi8vICAgICAgICAgYy5nZXRTa3VMaXN0ID0gZnVuY3Rpb24oYSkge1xuLy8gICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IGEgfHwgXCJ1bmRlZmluZWRcIiAhPT0gYSAmJiAhKGEgaW5zdGFuY2VvZiBBcnJheSkpXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihhLCBjKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGMoXCJNaXNzaW5nIGxpc3Qgb2YgcHJvZHVjdCBpZC4gZWcuIFsxLCA0NSwgODNdLlwiKVxuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICApLFxuLy8gICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFthXSk7XG4vLyAgICAgICAgICAgICB2YXIgYiA9IFtdXG4vLyAgICAgICAgICAgICAgICwgZCA9IHt9O1xuLy8gICAgICAgICAgICAgZS5lYWNoKGEsIGZ1bmN0aW9uKGEsIGYpIHtcbi8vICAgICAgICAgICAgICAgICB2YXIgZyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKGEsIGIpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgYy5nZXRTa3VMaXN0LmRhdGFbZl0gPyBhKGMuZ2V0U2t1TGlzdC5kYXRhKSA6IGMuZ2V0U2t1cyhmKS50aGVuKGZ1bmN0aW9uKGIpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRbZl0gPSBlLmV4dGVuZCh7fSwgYik7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjLmdldFNrdUxpc3QuZGF0YSA9IGUuZXh0ZW5kKHt9LCBkLCBjLmdldFNrdUxpc3QuZGF0YSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBhKGMuZ2V0U2t1TGlzdC5kYXRhKVxuLy8gICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihhKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBiKFwiUHJvZHVjdCBpZCBub3QgZm91bmQuXCIpXG4vLyAgICAgICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICAgICAgICAgYi5wdXNoKGcpXG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChiKVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIDtcbi8vICAgICAgICAgYy5nZXRTa3VMaXN0LmRhdGEgPSB7fTtcbi8vICAgICAgICAgYy5nZXRJbmZvID0gZnVuY3Rpb24oYSkge1xuLy8gICAgICAgICAgICAgdmFyIGIgPSBlLkRlZmVycmVkKCk7XG4vLyAgICAgICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiA9PT0gYSlcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gYi5yZWplY3QoXCJNaXNzaW5nIHByb2R1Y3QgaWQuXCIpLFxuLy8gICAgICAgICAgICAgICAgIGIucHJvbWlzZSgpO1xuLy8gICAgICAgICAgICAgdmFyIGQgPSBcIi9hcGkvY2F0YWxvZ19zeXN0ZW0vcHViL3Byb2R1Y3RzL3NlYXJjaC8/ZnE9cHJvZHVjdElkOlwiICsgYTtcbi8vICAgICAgICAgICAgIGlmIChjLmdldEluZm8uZGF0YVthXSlcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gYi5yZXNvbHZlKGMuZ2V0SW5mby5kYXRhW2FdKSxcbi8vICAgICAgICAgICAgICAgICBiLnByb21pc2UoKTtcbi8vICAgICAgICAgICAgIGUuYWpheCh7XG4vLyAgICAgICAgICAgICAgICAgdXJsOiBkLCBcbi8vICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGMuZ2V0SW5mby5kYXRhW2FdID0gZDtcbi8vICAgICAgICAgICAgICAgICAgICAgYi5yZXNvbHZlKGMuZ2V0SW5mby5kYXRhW2FdKVxuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgYy5nZXRJbmZvLmRhdGFbYV0gPSBbXTtcbi8vICAgICAgICAgICAgICAgICAgICAgYi5yZWplY3QoXCJQcm9kdWN0IGlkIG5vdCBmb3VuZC5cIilcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIHJldHVybiBiLnByb21pc2UoKVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIDtcbi8vICAgICAgICAgYy5nZXRJbmZvLmRhdGEgPSB7fTtcbi8vICAgICAgICAgYy5hZGRQcm9kdWN0cyA9IGZ1bmN0aW9uKGEpIHtcbi8vICAgICAgICAgICAgIHZhciBiID0gZS5EZWZlcnJlZCgpO1xuLy8gICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IGEgfHwgXCJ1bmRlZmluZWRcIiAhPT0gYSAmJiAhKGEgaW5zdGFuY2VvZiBBcnJheSkpXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGIucmVqZWN0KFwiTWlzc2luZyBhcnJheSBvZiBvYmplY3RzLiBlZy4gW3sgaWQ6IDEgfSwgeyBpZDogMiwgcXVhbnRpdHk6IDIgfV1cIiksXG4vLyAgICAgICAgICAgICAgICAgYi5wcm9taXNlKCk7XG4vLyAgICAgICAgICAgICB2YXIgYyA9IFtdO1xuLy8gICAgICAgICAgICAgZS5lYWNoKGEsIGZ1bmN0aW9uKGEsIGIpIHtcbi8vICAgICAgICAgICAgICAgICB2YXIgZCA9IE9iamVjdC5hc3NpZ24oe1xuLy8gICAgICAgICAgICAgICAgICAgICBpZDogMCxcbi8vICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IDEsXG4vLyAgICAgICAgICAgICAgICAgICAgIHNlbGxlcjogMVxuLy8gICAgICAgICAgICAgICAgIH0sIGIpO1xuLy8gICAgICAgICAgICAgICAgIGMucHVzaChkKVxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICB2dGV4anMuY2hlY2tvdXQuYWRkVG9DYXJ0KGMpLmZhaWwoZnVuY3Rpb24oYSkge1xuLy8gICAgICAgICAgICAgICAgIGIucmVqZWN0KGEpXG4vLyAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKGEpIHtcbi8vICAgICAgICAgICAgICAgICBiLnJlc29sdmUoYSlcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgcmV0dXJuIGIucHJvbWlzZSgpXG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgO1xuLy8gICAgICAgICBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgY29uc29sZSAmJiBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgY29uc29sZS5sb2cgJiYgKGMuX19sb2cgPSBjb25zb2xlLmxvZyk7XG4vLyAgICAgICAgIHJldHVybiAhMFxuLy8gICAgIH1cbi8vIH0oalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcbi8vIHZhciBmb3JtYXRCUiA9IGZ1bmN0aW9uIChOdW1iZXIpIHsgdmFyIG51bWJlciA9IFwic3RyaW5nXCI9PT10eXBlb2YgTnVtYmVyPzEqTnVtYmVyOk51bWJlcjsgdmFyIHRtcCA9IG51bWJlci50b0ZpeGVkKDIpOyB0bXAgPSB0bXAucmVwbGFjZSgvXFwuLywgXCJcIik7IHRtcCA9IHRtcC5yZXBsYWNlKC8oWzAtOV17Mn0pJC9nLCBcIiwkMVwiKTsgaWYgKHRtcC5sZW5ndGggPiA2KSB7IHRtcCA9IHRtcC5yZXBsYWNlKC8oWzAtOV17M30pLChbMC05XXsyfSQpL2csIFwiLiQxLCQyXCIpOyB9IHJldHVybiB0bXA7IH07XG4vLyB2YXIgc3RyaW5nVG9TbHVnID0gZnVuY3Rpb24gKGUpIHsgdmFyIGEgPSBlLnRyaW0oKTsgYSA9IGEudG9Mb3dlckNhc2UoKTsgYSA9IGEucmVwbGFjZSgvXFwofFxcKXxcXCd8LC9nLCBcIlwiKTsgYSA9IGEucmVwbGFjZSgvXFxzKy9nLCBcIiBcIik7IGEgPSBhLnJlcGxhY2UoLyhcXHN8JnxcXD98XFwvfFxcfHw6KS9nLCBcIi1cIik7IGEgPSBhLnJlcGxhY2UoL1xcdTAwZTcvZywgXCJjXCIpOyBhID0gYS5yZXBsYWNlKC9cXHUwMGYxL2csIFwiblwiKTsgYSA9IGEucmVwbGFjZSgvXFx1MDBjNy9nLCBcIkNcIik7IGEgPSBhLnJlcGxhY2UoL1xcdTAwZDEvZywgXCJOXCIpOyBhID0gYS5yZXBsYWNlKC9bXFx1MDBjM1xcdTAwYzJcXHUwMGMxXFx1MDBjMFxcdTAwYzRdL2csIFwiQVwiKTsgYSA9IGEucmVwbGFjZSgvW1xcdTAwYzlcXHUwMGM4XFx1MDBjYl0vZywgXCJFXCIpOyBhID0gYS5yZXBsYWNlKC9bXFx1MDBjZFxcdTAwY2NcXHUwMGNmXS9nLCBcIklcIik7IGEgPSBhLnJlcGxhY2UoL1tcXHUwMGQ1XFx1MDBkNFxcdTAwZDNcXHUwMGQyXFx1MDBkNl0vZywgXCJPXCIpOyBhID0gYS5yZXBsYWNlKC9bXFx1MDBkYVxcdTAwZDldL2csIFwiVVwiKTsgYSA9IGEucmVwbGFjZSgvW1xcdTAwZTBcXHUwMGUxXFx1MDBlMlxcdTAwZTNcXHUwMGU0XFx1MDBlNV0vZywgXCJhXCIpOyBhID0gYS5yZXBsYWNlKC9bXFx1MDBlOFxcdTAwZTlcXHUwMGVhXFx1MDBlYl0vZywgXCJlXCIpOyBhID0gYS5yZXBsYWNlKC9bXFx1MDBlY1xcdTAwZWRcXHUwMGVlXFx1MDBlZl0vZywgXCJpXCIpOyBhID0gYS5yZXBsYWNlKC9bXFx1MDBmMlxcdTAwZjNcXHUwMGY0XFx1MDBmNVxcdTAwZjZdL2csIFwib1wiKTsgYSA9IGEucmVwbGFjZSgvW1xcdTAwZjlcXHUwMGZhXFx1MDBmYlxcdTAwZmNdL2csIFwidVwiKTsgcmV0dXJuIGE7IH07XG4vLyB2YXIgZ2VuZXJhdGVJbWdVcmwgPSAoZnVuY3Rpb24gKCQsd2luZG93LGRvY3VtZW50LHVuZGVmaW5lZCl7XG4vLyAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uIChJbWdTcmMpIHtcbi8vICAgICAgICAgdmFyIHNpemUgPSAxODA7XG4vLyAgICAgICAgIGlmKCQoJ2h0bWwnKS5oYXNDbGFzcygnX21vYmktb24nKSkge1xuLy8gICAgICAgICAgICAgc2l6ZSA9IDE0MDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICByZXR1cm4gSW1nU3JjLnJlcGxhY2UoLyguKj9pZHNcXC8pKC4qPykoXFwvLiopL2csXCIkMSQyLVwiK3NpemUrXCItXCIrc2l6ZStcIiQzXCIpLnJlcGxhY2UoL1xcPy4qLyxcIlwiKTtcbi8vICAgICB9O1xuLy8gfSkoalF1ZXJ5LHdpbmRvdyxkb2N1bWVudCk7XG4vLyAvKioxMS0wMi0yMDE5IC0gMTc6MjAgKi9cbi8vIHZhciBwcm9tb3Rpb25EYXRhID0gW1xuLy8gICAgIHsgaWRTa3U6IFwiOTA2XCIsXG4vLyAgICAgICAgIGFjdGl2ZVZhbHVlOiA0MC4wMCxcbi8vICAgICAgICAgZGlzY291bnRQZXJjZW50OiAyNi41MFxuLy8gICAgIH0sXG4vLyAgICAgeyBpZFNrdTogXCIxOTEwXCIsXG4vLyAgICAgICAgIGFjdGl2ZVZhbHVlOiA0Mi4wMCxcbi8vICAgICAgICAgZGlzY291bnRQZXJjZW50OiAyMi41MFxuLy8gICAgIH0sXG4vLyAgICAgeyBpZFNrdTogXCIxMjU5XCIsXG4vLyAgICAgICAgIGFjdGl2ZVZhbHVlOiA0My4wMCwgLy92YWxvciBkbyBzYXJyYWZvKGNhcnJpbmhvKVxuLy8gICAgICAgICBkaXNjb3VudFBlcmNlbnQ6IDIzLjUwIC8vcG9yY2VudGFnZW1cbi8vICAgICB9XG4vLyBdO1xuLy8gX19za3VzID0gW107XG4vLyBwcm9tb3Rpb25EYXRhLmZvckVhY2goZnVuY3Rpb24oZSl7XG4vLyBcdF9fc2t1cy5wdXNoKGUuaWRTa3UpO1xuLy8gfSk7XG4vLyB2YXIgZ2V0UHJvZHMgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgJC5hamF4KHtcbi8vICAgICAgICAgdHlwZTogXCJHRVRcIixcbi8vICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cucXVlbWRpc3NlYmVyZW5pY2UuY29tLmJyL2NhcnQ/cmVmcz0nICsgX19za3VzLmpvaW4oJywnKSxcbi8vICAgICAgICAgZGF0YTogXCJjaGVja1wiLFxuLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XG4vLyAgICAgICAgICAgICByZXN1bHRPZmVydGFzID0gJChyZXNwb25zZSkuZmlsdGVyKCdkaXYub2ZlcnRhRGVDYWl4YScpO1xuLy8gXHRcdFx0JCgnLmNhcnQnKS5hcHBlbmQocmVzdWx0T2ZlcnRhcyk7XG4vLyBcdFx0XHQkKCcuX19sbmstYnV5LWJ0bicpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuLy8gXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gXHRcdFx0XHR2YXIgX19za3VTZWxlY3RlZCA9ICQodGhpcykuYXR0cignaHJlZicpLm1hdGNoKC8uKj89KFtcXHd8LV0qKS4qLylbMV07XG4vLyBcdFx0XHRcdC8vY29uc29sZS5sb2coX19za3VTZWxlY3RlZCk7XG4vLyBcdFx0XHRcdHZhciBpdGVtID0ge1xuLy8gXHRcdFx0XHRcdGlkOiBfX3NrdVNlbGVjdGVkLFxuLy8gXHRcdFx0XHRcdHF1YW50aXR5OiAxLFxuLy8gXHRcdFx0XHRcdHNlbGxlcjogJzEnXG4vLyBcdFx0XHRcdH07XG4vLyBcdFx0XHRcdHZ0ZXhqcy5jaGVja291dC5hZGRUb0NhcnQoW2l0ZW1dLCBudWxsLCAxKVxuLy8gXHRcdFx0XHQuZG9uZShmdW5jdGlvbihvcmRlckZvcm0pIHtcbi8vIFx0XHRcdFx0XHRjb25zb2xlLmxvZyhvcmRlckZvcm0pO1xuLy8gXHRcdFx0XHR9KTtcbi8vIFx0XHRcdH0pOyAgICBcbi8vICAgICAgICAgfVxuLy8gXHR9KTtcbi8vIH07XG4vLyBnZXRQcm9kcygpO1xuLy8gdmFyIHN3YXBTaG93Y2FzZURhdGEgPSAoZnVuY3Rpb24gKCQsd2luZG93LGRvY3VtZW50LHVuZGVmaW5lZCkge1xuLy8gICAgIFwidXNlIHN0cmljdFwiO1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiAoRWxlbSxEYXRhKSB7XG4vLyAgICAgICAgIGlmKCFFbGVtfHwhRGF0YXx8ISFEYXRhJiYhRGF0YS51cmwpIHsgcmV0dXJuIGZhbHNlOyB9XG4vLyAgICAgICAgIHZhciBkYXRhID0gRGF0YSwgX2VsZW0gPSAkKEVsZW0pLCBcbi8vICAgICAgICAgICAgIG5hbWUgPSBkYXRhLm5hbWV8fFwiXCIsIGltZ1VSTCA9IGRhdGEuaW1nLCBcbi8vICAgICAgICAgICAgIHJlZ19odG1sID0gXCJcIiwgcmVnX3N0ciA9IFwiXCIsIHJlZ192YWx1ZSA9IDEqZGF0YS5wcmljZXx8MCwgc2FsZV9zdHIgPSBcIlwiLCBzYWxlX3ZhbHVlID0gMSpkYXRhLnNhbGV8fDAsIFxuLy8gICAgICAgICAgICAgdGltZXMgPSBkYXRhLnRpbWVzfHxcIlwiLCBpbnN0YWxsbWVudHNfaHRtbCA9IFwiXCIsIGluc3RhbGxtZW50c19zdHIgPSBcIlwiLCBpbnN0YWxsbWVudF92YWx1ZSA9IGRhdGEuaW5zdGFsbG1lbnRzfHwwLCB1cmwgPSBkYXRhLnVybHx8XCJcIiwgXG4vLyAgICAgICAgICAgICBza3UgPSBkYXRhLnNrdXx8XCJcIiwgYXR0YWNobWVudHMgPSBkYXRhLmF0dGFjaG1lbnRzLnNwbGl0KCcsJyksIFxuLy8gICAgICAgICAgICAgX3ByaWNpbmdfaHRtbCA9IGA8c3BhbiBjbGFzcz1cIl9wX3ByaWNlX1wiPnslUkVHJX08L3NwYW4+XG4vLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJfcF9wcmljZW9mZmVyX1wiPjxzcGFuIGNsYXNzPVwiX19wX2J5XCI+cG9yIDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJfX3BfcHJpY2VvZmZlclwiPnslU0FMRSV9PC9zcGFuPjwvc3Bhbj5cbi8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIl9wX2ludGFsbG1lbnRzXCI+eyVQUklDSU5HJX08L3NwYW4+YDtcbi8vICAgICAgICAgdmFyIHNhbGVfc3RyID0gXCJSJCBcIiArIGZvcm1hdEJSKHNhbGVfdmFsdWUpO1xuLy8gICAgICAgICBpZih1cmwubGVuZ3RoPjApIHtcbi8vICAgICAgICAgICAgIHVybCA9IFt1cmwsIFwiaWRza3U9XCIgKyBza3VdLmpvaW4oJz8nKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZihyZWdfdmFsdWU+MCAmJiByZWdfdmFsdWU+c2FsZV92YWx1ZSkge1xuLy8gICAgICAgICAgICAgcmVnX3N0ciA9IFwiUiQgXCIrZm9ybWF0QlIocmVnX3ZhbHVlKTtcbi8vICAgICAgICAgICAgIHJlZ19odG1sID0gYDxzcGFuIGNsYXNzPVwiX19wX2Zyb21cIj5kZSA8L3NwYW4+IDxzcGFuIGNsYXNzPVwiX19wX3ByaWNlXCI+eyVSRUdWQUxVRSV9PC9zcGFuPmBcbi8vICAgICAgICAgICAgIC5yZXBsYWNlKC97JVJFR1ZBTFVFJX0vZyxyZWdfc3RyKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZih0aW1lcy5sZW5ndGg+MCYmKH5+dGltZXMpPjEpIHtcbi8vICAgICAgICAgICAgIGluc3RhbGxtZW50c19zdHIgPSBcIlIkIFwiK2Zvcm1hdEJSKGluc3RhbGxtZW50X3ZhbHVlKTtcbi8vICAgICAgICAgICAgIGluc3RhbGxtZW50c19odG1sID0gYDxzcGFuIGNsYXNzPVwiX19wX2luc3RhbGxtZW50c1wiPiA8c3BhbiBjbGFzcz1cIl9fcF9udW1iZXJpbnN0YWxsbWVudHNcIj57JVRJTUVTJX14PC9zcGFuPiBkZSA8c3BhbiBjbGFzcz1cIl9fcF9pbnN0YWxsbWVudHN2YWx1ZVwiPnslSU5TVEFMTE1FTlRWQUxVRSV9IDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJfX3BfaW5zdGFsbG1lbnRzLWp1cm9zXCI+c2VtJm5ic3A7anVyb3M8L3NwYW4+YFxuLy8gICAgICAgICAgICAgLnJlcGxhY2UoL3slVElNRVMlfS9nLHRpbWVzKS5yZXBsYWNlKC97JUlOU1RBTExNRU5UVkFMVUUlfS9nLGluc3RhbGxtZW50c19zdHIpO1xuLy8gICAgICAgICB9ICAgICAgICBcbi8vICAgICAgICAgX3ByaWNpbmdfaHRtbCA9IF9wcmljaW5nX2h0bWwucmVwbGFjZSgveyVSRUclfS9nLHJlZ19odG1sKTtcbi8vICAgICAgICAgX3ByaWNpbmdfaHRtbCA9IF9wcmljaW5nX2h0bWwucmVwbGFjZSgveyVTQUxFJX0vZyxzYWxlX3N0cik7XG4vLyAgICAgICAgIF9wcmljaW5nX2h0bWwgPSBfcHJpY2luZ19odG1sLnJlcGxhY2UoL3slUFJJQ0lORyV9L2csaW5zdGFsbG1lbnRzX2h0bWwpO1xuXG4vLyAgICAgICAgIF9lbGVtLmZpbmQoJy5fX2xuay1pbWcnKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICQodGhpcykuZmluZCgnLl9wLXByb21vLWxhYmVscycpLmxlbmd0aD09MDtcbi8vICAgICAgICAgfSkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiX3AtcHJvbW8tbGFiZWxzXCI+PC9kaXY+Jyk7XG5cbi8vICAgICAgICAgdmFyIGxhYmVscyA9IFtdO1xuLy8gICAgICAgICAkLmVhY2goYXR0YWNobWVudHMsZnVuY3Rpb24gKG5keCxpdGVtKSB7XG4vLyAgICAgICAgICAgICBpZihpdGVtLmxlbmd0aD4wJiYvZmxhZy9pZy50ZXN0KGl0ZW0pKXtcbi8vICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC9mbGFnOi9pZyxcIlwiKTtcbi8vICAgICAgICAgICAgICAgICBsYWJlbHMucHVzaCgnPHNwYW4gY2xhc3M9XCJfX2ZsYWcgX19mbGFnLScrc3RyaW5nVG9TbHVnKGl0ZW0pKydcIj4nK2l0ZW0rJzwvc3Bhbj4nKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIF9lbGVtLmZpbmQoJy5fcC1wcm9tby1sYWJlbHMnKS5odG1sKGxhYmVscy5qb2luKFwiXCIpKTtcblxuLy8gICAgICAgICBfZWxlbS5maW5kKCcuX19sbmstaW1nLC5fX2xuay1wbmFtZSwuX19sbmstYnV5LWJ0bicpLmF0dHIoJ2hyZWYnLHVybCk7XG4vLyAgICAgICAgIF9lbGVtLmZpbmQoJy5fX3BfaW1nIGltZycpLmF0dHIoJ3NyYycsaW1nVVJMKTtcbi8vICAgICAgICAgX2VsZW0uZmluZCgnLl9fcF9uYW1lJykuaHRtbChuYW1lKTtcbi8vICAgICAgICAgX2VsZW0uZmluZCgnLl9fcF9wcmljaW5nXycpLmh0bWwoX3ByaWNpbmdfaHRtbCk7XG5cbi8vICAgICAgICAgLy8hIWFwcGx5RGlzY291bnRGbGFnJiZhcHBseURpc2NvdW50RmxhZyhfZWxlbSk7IC8vIGFwcGx5IGRpc2NvdW50IGZsYWdcbi8vICAgICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgfVxuLy8gfSkoalF1ZXJ5LHdpbmRvdyxkb2N1bWVudCk7XG4vLyB2YXIgZ2V0QXR0Q2xhc3NlcyA9IChmdW5jdGlvbiAoJCx3aW5kb3csZG9jdW1lbnQsdW5kZWZpbmVkKSB7XG4vLyAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uIChBdHQpIHtcbi8vICAgICAgICAgaWYoQXR0Lmxlbmd0aDw9MCkgeyByZXR1cm4gXCJcIjsgfVxuLy8gICAgICAgICB2YXIgYXR0cyA9IEF0dC5zcGxpdCgnLCcpO1xuLy8gICAgICAgICB2YXIgaGFzRmxhZ3MgPSBmYWxzZTtcbi8vICAgICAgICAgJC5lYWNoKGF0dHMsZnVuY3Rpb24gKG5keCxhdHQpIHtcbi8vICAgICAgICAgICAgIGlmKC9mbGFnL2lnLnRlc3QoYXR0KSYmIWhhc0ZsYWdzKXtcbi8vICAgICAgICAgICAgICAgICBoYXNGbGFncyA9IHRydWU7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBhdHQgPSBhdHQucmVwbGFjZSgvRGVzdGFxdWUvLFwiaGlnaGxpZ2h0XCIpO1xuLy8gICAgICAgICAgICAgYXR0ID0gXCJfX2J0bi1cIitzdHJpbmdUb1NsdWcoYXR0KTtcbi8vICAgICAgICAgICAgIGF0dHNbbmR4XSA9IGF0dDtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIGlmKGhhc0ZsYWdzKSBhdHRzLnB1c2goXCJfX2hhc2ZsYWdzXCIpO1xuLy8gICAgICAgICByZXR1cm4gYXR0cy5qb2luKFwiIFwiKTtcbi8vICAgICB9XG4vLyB9KShqUXVlcnksd2luZG93LGRvY3VtZW50KTtcbi8vIHZhciBBZGRTa3VTZWxlY3RvciA9IChmdW5jdGlvbiAoJCx3aW5kb3csZG9jdW1lbnQsdW5kZWZpbmVkKSB7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBjbGFzc01hcmtlciA9IFwiX19zZWxlY3RvcnMtYXBwbGllZFwiO1xuLy8gICAgICAgICBzZWxmLmFwcGx5U2VsZWN0b3IgPSBmdW5jdGlvbiAoRWxlbSkge1xuLy8gICAgICAgICAgICAgdmFyIF9lbGVtID0gJChFbGVtKTtcbi8vICAgICAgICAgICAgIHZhciBwcm9kSWQgPSBfZWxlbS5maW5kKCcuX3Byb2R1Y3QnKS5hdHRyKCdkYXRhLXByZCcpO1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZElkKTtcbi8vICAgICAgICAgICAgIGlmKF9lbGVtLmxlbmd0aDw9MCB8fCBfZWxlbS5sZW5ndGg+MCAmJiBwcm9kSWQubGVuZ3RoPD0wKXsgcmV0dXJuIGZhbHNlOyB9XG4vLyAgICAgICAgICAgICBzZWxmLmdldFNrdShwcm9kSWQpLnRoZW4oZnVuY3Rpb24gKERhdGEpIHtcbi8vICAgICAgICAgICAgICAgICBpZighc2VsZi5hcHBseVZhcmlhdGlvbnMoX2VsZW0scHJvZElkLERhdGEpKXtcbi8vICAgICAgICAgICAgICAgICAgICAgc2VsZi5ub1ZhcmlhdGlvbihfZWxlbSxwcm9kSWQpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBzZWxmLmdldFNrdSA9IGZ1bmN0aW9uIChQcm9kSWQpIHtcbi8vICAgICAgICAgICAgIHZhciBkZmQgPSAkLkRlZmVycmVkKCk7XG4vLyAgICAgICAgICAgICB2YXIgcHJvZElkID0gUHJvZElkO1xuLy8gICAgICAgICAgICAgaWYoIXNlbGYuZnVuYy5nZXRJbmZvKSB7IC8vIGNoZWNrIGlmIHVuZGVmaW5lZFxuLy8gICAgICAgICAgICAgICAgIHNlbGYuZnVuYyA9IG5ldyBVdGxzKCk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBzZWxmLmZ1bmMuZ2V0SW5mbyhwcm9kSWQpLnRoZW4oZnVuY3Rpb24gKERhdGEpIHtcbi8vICAgICAgICAgICAgICAgICBpZihEYXRhLmxlbmd0aD4wKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YVtwcm9kSWRdID0gRGF0YVswXTtcbi8vICAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmUoc2VsZi5kYXRhKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9LGZ1bmN0aW9uIChlcnJvcikge1xuLy8gICAgICAgICAgICAgICAgIC8vIGVycm9yXG4vLyAgICAgICAgICAgICAgICAgZGZkLnJlamVjdChlcnJvcik7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBzZWxmLmZ1bmMgPSB7fTtcbi8vICAgICAgICAgc2VsZi5kYXRhID0ge307XG4vLyAgICAgICAgIHNlbGYuYXBwbHlWYXJpYXRpb25zID0gZnVuY3Rpb24gKEVsZW0sUHJvZElkLERhdGEpIHtcbi8vICAgICAgICAgICAgIGlmKCAhRWxlbSBcbi8vICAgICAgICAgICAgICAgICB8fCAhUHJvZElkXG4vLyAgICAgICAgICAgICAgICAgfHwgRGF0YS5sZW5ndGg8PTAgXG4vLyAgICAgICAgICAgICAgICAgfHwgISFQcm9kSWQgJiYgRGF0YVtQcm9kSWRdLml0ZW1zLmxlbmd0aD4wICYmIHVuZGVmaW5lZD09PURhdGFbUHJvZElkXS5pdGVtc1swXS52YXJpYXRpb25zXG4vLyAgICAgICAgICAgICApIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB2YXIgX3N0eWxlID0gJCgnLl9zZWxlY3RvcnMtc3R5bGVzJyk7XG4vLyAgICAgICAgICAgICBpZihfc3R5bGUubGVuZ3RoPD0wKSB7XG4vLyAgICAgICAgICAgICAgICAgX3N0eWxlID0gJCgnPHN0eWxlLz4nKS5hZGRDbGFzcygnX3NlbGVjdG9ycy1zdHlsZXMnKTtcbi8vICAgICAgICAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKF9zdHlsZSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB2YXIgc3R5bGVzID0gX3N0eWxlLnRleHQoKXx8XCJcIjtcbi8vICAgICAgICAgICAgIHZhciBtYXJrZXIgPSBcIl9fc2VsZWN0b3JzLW9uXCI7XG4vLyAgICAgICAgICAgICB2YXIgX2VsZW0gPSAkKEVsZW0pO1xuLy8gICAgICAgICAgICAgLy8gdmFyIGRhdGEgPSBEYXRhW1Byb2RJZF07XG4vLyAgICAgICAgICAgICB2YXIgZGF0YSA9IHNlbGYuc29ydERhdGEoRGF0YVtQcm9kSWRdKTtcbi8vICAgICAgICAgICAgIHZhciBpZCA9IFByb2RJZDtcbi8vICAgICAgICAgICAgIHZhciBfc2VsZWN0b3JEYXRhID0gc2VsZi5nZXRTZWxlY3RvcnMoZGF0YSk7XG4vLyAgICAgICAgICAgICB2YXIgX3NlbGVjdG9ycyA9IF9zZWxlY3RvckRhdGFbJ3NlbGVjdG9ycyddO1xuLy8gICAgICAgICAgICAgdmFyIHNlbGVjdG9yX2xlbmd0aCA9IF9zZWxlY3RvcnMuY2hpbGRyZW4oKS5sZW5ndGg7XG4vLyAgICAgICAgICAgICB2YXIgaGFzQ29sb3IgPSBmYWxzZTtcbi8vICAgICAgICAgICAgIHN0eWxlcyArPSBfc2VsZWN0b3JEYXRhWydzdHlsZXMnXTtcblxuLy8gICAgICAgICAgICAgdmFyIF9kaXY7XG4vLyAgICAgICAgICAgICAgICAgX2RpdiA9IF9lbGVtLmZpbmQoJy5fcC1za3Utc2VsZWN0aW9uJyk7XG4vLyAgICAgICAgICAgICBpZihfZGl2Lmxlbmd0aDw9MCkge1xuLy8gICAgICAgICAgICAgICAgIF9kaXYgPSAkKCc8ZGl2Lz4nKS5hZGRDbGFzcygnX3Atc2t1LXNlbGVjdGlvbicpOyBcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIF9kaXYuYXBwZW5kKF9zZWxlY3RvcnMpO1xuLy8gICAgICAgICAgICAgX2Rpdi5hdHRyKCdkYXRhLXNrdS1sZW5ndGgnLHNlbGVjdG9yX2xlbmd0aCk7XG4vLyAgICAgICAgICAgICAvLyBfZGl2LmFkZENsYXNzKCdfb24nKS5hdHRyKCdkYXRhLXNrdS1sZW5ndGgnLHNlbGVjdG9yX2xlbmd0aCk7XG4vLyAgICAgICAgICAgICBpZighIV9zZWxlY3RvckRhdGEuc2V0dGluZ3MmJiEhX3NlbGVjdG9yRGF0YS5zZXR0aW5ncy50eXBlJiYvY29yLy50ZXN0KF9zZWxlY3RvckRhdGEuc2V0dGluZ3MudHlwZSkpe1xuLy8gICAgICAgICAgICAgICAgIGhhc0NvbG9yID0gdHJ1ZTtcbi8vIFx0XHRcdFx0X2Rpdi5hZGRDbGFzcygnX3Atc2t1LWNvbG9yJyk7XG4vLyBcdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcyhtYXJrZXIpO1xuLy8gXHRcdFx0XHRpZigkKCcuX3Atc2VsZWN0b3JzJykpe1xuLy8gXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuLy8gXHRcdFx0XHRcdFx0JCgnLl9wLXNlbGVjdG9ycycpLnNsaWNrKHtcbi8vIFx0XHRcdFx0XHRcdFx0aW5maW5pdGU6IGZhbHNlLFxuLy8gXHRcdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDMsXG4vLyBcdFx0XHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAzXG4vLyBcdFx0XHRcdFx0XHR9KTtcbi8vIFx0XHRcdFx0XHR9LCAxMTApO1xuLy8gXHRcdFx0XHR9O1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgX2VsZW1cbi8vICAgICAgICAgICAgICAgICAubm90KCcuJyttYXJrZXIpXG4vLyAgICAgICAgICAgICAgICAgLmFkZENsYXNzKG1hcmtlcikuYWRkQ2xhc3MobWFya2VyKyctJytpZCkuYWRkQ2xhc3MoJ19wcmQtJytpZClcbi8vICAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQodGhpcykuZmluZCgnLl9wLXNrdS1zZWxlY3Rpb24gc3BhbicpLmxlbmd0aDw9MDtcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIC5maW5kKCcuX19sbmstYnV5LWJ0bicpXG4vLyAgICAgICAgICAgICAgICAgLmJlZm9yZShfZGl2KTtcbi8vIFx0XHRcdF9zdHlsZS50ZXh0KHN0eWxlcyk7XG5cbi8vICAgICAgICAgICAgIHZhciBfZmlyc3RTZWxlY3RlZCA9IF9zZWxlY3RvcnMuZmluZCgnLl9fYnRuLWhpZ2hsaWdodDpmaXJzdCcpO1xuLy8gICAgICAgICAgICAgaWYoX2ZpcnN0U2VsZWN0ZWQubGVuZ3RoPD0wKXtcbi8vIFx0XHRcdFx0X2ZpcnN0U2VsZWN0ZWQgPSBfc2VsZWN0b3JzLmZpbmQoJ3NwYW46Zmlyc3QnKTtcblxuLy8gXHRcdFx0fVxuXG4vLyAgICAgICAgICAgICBzZWxmLnNrdVNlbGVjdGVkKF9maXJzdFNlbGVjdGVkKTtcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBzZWxmLm5vVmFyaWF0aW9uID0gZnVuY3Rpb24gKEVsZW0pIHtcbi8vICAgICAgICAgICAgICQoRWxlbSkuYWRkQ2xhc3MoJ19zZWxlY3Rvci11bmF2YWlsYWJsZScpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHNlbGYuZ2V0U2VsZWN0b3JzID0gZnVuY3Rpb24gKERhdGEpIHtcbi8vICAgICAgICAgICAgIHZhciBfY29udGFpbmVyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ19wLXNlbGVjdG9ycycpO1xuLy8gICAgICAgICAgICAgdmFyIHNldHRpbmdzID0ge30sIHN0eWxlcyA9IFwiXCI7XG4vLyAgICAgICAgICAgICB2YXIgbmFtZSA9IERhdGEucHJvZHVjdE5hbWU7XG4vLyAgICAgICAgICAgICB2YXIgdXJsID0gRGF0YS5saW5rfHxcIlwiO1xuLy8gICAgICAgICAgICAgJC5lYWNoKERhdGEuaXRlbXMsZnVuY3Rpb24gKG5keCxpdGVtKSB7XG4vLyAgICAgICAgICAgICAgICAgaWYoISFpdGVtLnNlbGxlcnMmJml0ZW0uc2VsbGVyc1swXS5jb21tZXJ0aWFsT2ZmZXIuQXZhaWxhYmxlUXVhbnRpdHk+MCYmISFpdGVtLnZhcmlhdGlvbnMpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWVzID0gaXRlbS5zZWxsZXJzWzBdLmNvbW1lcnRpYWxPZmZlci5JbnN0YWxsbWVudHNbMF0uTnVtYmVyT2ZJbnN0YWxsbWVudHM7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YWxsbWVudHMgPSBpdGVtLnNlbGxlcnNbMF0uY29tbWVydGlhbE9mZmVyLkluc3RhbGxtZW50c1swXS5WYWx1ZTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbGxtZW50cyA9IGluc3RhbGxtZW50cy50b0ZpeGVkKDIpO1xuLy8gICAgICAgICAgICAgICAgICAgICB2YXIgX2VsZW0gPSAkKCc8c3Bhbi8+Jyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gaXRlbS52YXJpYXRpb25zWzBdfHxcIlwiO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSArPSBpdGVtLnZhcmlhdGlvbnMubGVuZ3RoPjE/XCIgfCBcIitpdGVtLnZhcmlhdGlvbnNbMV06XCJcIjtcbi8vICAgICAgICAgICAgICAgICAgICAgdmFyIGhhc0NvbG9yID0gL2Nvci9pLnRlc3QodHlwZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIF9lbGVtLm9uKCdjbGljay5Ta3VTZWxlY3Rpb24nLGZ1bmN0aW9uKGUpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKFwiZnVuY3Rpb25cIj09PXR5cGVvZiBzZWxmLnNrdVNlbGVjdGVkKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5za3VTZWxlY3RlZChfZWxlbSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgICAgICAgICB2YXIgYXR0YWNobWVudHMgPSBcIlwiO1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIHZhciBwbmFtZSA9IGl0ZW1baXRlbS52YXJpYXRpb25zWzBdXTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHBuYW1lICs9IGl0ZW0udmFyaWF0aW9ucy5sZW5ndGg+MT9cIiB8IFwiK2l0ZW1baXRlbS52YXJpYXRpb25zWzFdXTpcIlwiO1xuLy8gICAgICAgICAgICAgICAgICAgICB2YXIgaW1nVVJMID0gXCJcIiwgdGh1bWJVUkwgPSBcIlwiO1xuLy8gICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmltYWdlcy5sZW5ndGg+MCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaW1nVVJMID0gaXRlbS5pbWFnZXNbMF0uaW1hZ2VVcmw7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpbWdVUkwgPSBnZW5lcmF0ZUltZ1VybChpbWdVUkwpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uaW1hZ2VzLmxlbmd0aD4xKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goaXRlbS5pbWFnZXMsZnVuY3Rpb24gKG5keCxpbWcpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigvdGh1bWIvaS50ZXN0KGltZy5pbWFnZUxhYmVsKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYlVSTCA9IGltZy5pbWFnZVVybDtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJVUkwgPSAoZ2VuZXJhdGVJbWdVcmwodGh1bWJVUkwpfHxcIlwiKS5yZXBsYWNlKC9odHRwOi8sXCJodHRwczpcIik7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAvLyB2YXIgaGlnaGxpZ2h0ID0gZmFsc2U7XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmKCEhaXRlbS5hdHRhY2htZW50cyl7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ID0gaXRlbS5hdHRhY2htZW50cy5zbGljZSgwKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmbGFncyA9IFtdO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGF0dCxmdW5jdGlvbiAobmR4LGl0ZW0pIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZighaGlnaGxpZ2h0KSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGhpZ2hsaWdodCA9IC9kZXN0YXF1ZS9pZy50ZXN0KGl0ZW0ubmFtZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdzLnB1c2goaXRlbS5uYW1lKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudHMgPSBmbGFncy5qb2luKCcsJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgX2VsZW0uaHRtbChwbmFtZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmKGhhc0NvbG9yKXtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIF9lbGVtLmh0bWwoXCImbmJzcDtcIik7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LHsgdHlwZTogXCJjb3JcIiB9KTtcbi8vICAgICAgICAgICAgICAgICAgICAgfSBcbi8vICAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdfJytzdHJpbmdUb1NsdWcocG5hbWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICAvLyBpZihoaWdobGlnaHQpIHsgY2xhc3NOYW1lICs9IFwiIF9fYnRuLWhpZ2hsaWdodFwiOyB9XG4vLyAgICAgICAgICAgICAgICAgICAgIHZhciBzYWxlID0gaXRlbS5zZWxsZXJzWzBdLmNvbW1lcnRpYWxPZmZlci5QcmljZTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGUgPSBzYWxlLnRvRml4ZWQoMik7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZhciBwcmljZSA9IGl0ZW0uc2VsbGVyc1swXS5jb21tZXJ0aWFsT2ZmZXIuTGlzdFByaWNlO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UgPSBwcmljZS50b0ZpeGVkKDIpO1xuLy8gICAgICAgICAgICAgICAgICAgICBfZWxlbS5hdHRyKCd0aXRsZScscG5hbWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICAvLyBfZWxlbS5hZGRDbGFzcyhjbGFzc05hbWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICBfZWxlbS5hZGRDbGFzcyhjbGFzc05hbWUpLmFkZENsYXNzKGdldEF0dENsYXNzZXMoYXR0YWNobWVudHMpKTtcbi8vICAgICAgICAgICAgICAgICAgICAgX2VsZW0uYXR0cignZGF0YS1xdHknLGl0ZW0uc2VsbGVyc1swXS5jb21tZXJ0aWFsT2ZmZXIuQXZhaWxhYmxlUXVhbnRpdHkpO1xuLy8gICAgICAgICAgICAgICAgICAgICBfZWxlbS5hdHRyKCdkYXRhLW5hbWUnLG5hbWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICBfZWxlbS5hdHRyKCdkYXRhLXVybCcsdXJsKTtcbi8vICAgICAgICAgICAgICAgICAgICAgX2VsZW0uYXR0cignZGF0YS10eXBlJyx0eXBlKTtcbi8vICAgICAgICAgICAgICAgICAgICAgX2VsZW0uYXR0cignZGF0YS1pbWcnLGltZ1VSTCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIF9lbGVtLmF0dHIoJ2RhdGEtdGh1bWInLHRodW1iVVJMKTtcbi8vICAgICAgICAgICAgICAgICAgICAgX2VsZW0uYXR0cignZGF0YS1wcmljZScscHJpY2UpOyAvLyByZWd1bGFyIHByaWNlXG4vLyAgICAgICAgICAgICAgICAgICAgIF9lbGVtLmF0dHIoJ2RhdGEtc2FsZScsc2FsZSk7IC8vIHByaWNlIG9uIHNhbGUgPSBjaGVhcGVyXG4vLyAgICAgICAgICAgICAgICAgICAgIF9lbGVtLmF0dHIoJ2RhdGEtdGltZXMnLHRpbWVzKTtcbi8vICAgICAgICAgICAgICAgICAgICAgX2VsZW0uYXR0cignZGF0YS1pbnN0YWxsbWVudHMnLGluc3RhbGxtZW50cyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIF9lbGVtLmF0dHIoJ2RhdGEtc2t1JyxpdGVtLml0ZW1JZCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIF9lbGVtLmF0dHIoJ2RhdGEtYXR0YWNobWVudHMnLGF0dGFjaG1lbnRzKTtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYodGh1bWJVUkwubGVuZ3RoPjAmJmhhc0NvbG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMgKz0gXCIuXCIgKyBjbGFzc05hbWUgKyBcIjpiZWZvcmV7YmFja2dyb3VuZC1pbWFnZTp1cmwoXCIrdGh1bWJVUkwrXCIpfSBcIjtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vICQoX2VsZW0pLmNzcyh7XCJiYWNrZ3JvdW5kLWltYWdlXCI6XCJ1cmwoXCIrdGh1bWJVUkwrXCIpXCJ9KTtcbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gXHRcdFx0XHRcdF9jb250YWluZXIuYXBwZW5kKF9lbGVtKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9KTsgXG4vLyAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geyBzZWxlY3RvcnM6IF9jb250YWluZXIsIHN0eWxlczogc3R5bGVzIH07XG4vLyAgICAgICAgICAgICBpZighIXNldHRpbmdzLnR5cGUpe1xuLy8gICAgICAgICAgICAgICAgIHJlc3VsdCA9ICQuZXh0ZW5kKHJlc3VsdCx7IHNldHRpbmdzOiBzZXR0aW5ncyB9KTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHNlbGYuc2t1U2VsZWN0ZWQgPSBmdW5jdGlvbiAoRWxlbSkge1xuLy8gICAgICAgICAgICAgaWYoIUVsZW18fCEhRWxlbSYmRWxlbS5sZW5ndGg8PTApIHsgcmV0dXJuIGZhbHNlOyB9XG4vLyAgICAgICAgICAgICB2YXIgX2VsZW0gPSAkKEVsZW0pO1xuLy8gICAgICAgICAgICAgdmFyIF9wcmQgPSBfZWxlbS5wYXJlbnRzKCcuX3ByZCcpO1xuXG4vLyBcdFx0XHQvL19lbGVtLnBhcmVudCgpLmZpbmQoJy5fb24nKS5yZW1vdmVDbGFzcygnX29uJyk7IC8vIGRlYWN0aXZhdGUgYWxsIHNrdXNcbi8vIFx0XHRcdCQoJy5fb24nKS5yZW1vdmVDbGFzcygnX29uJyk7XG4vLyBcdFx0XHQvL2NvbnNvbGUubG9nKF9lbGVtLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5fb24nKSk7XG4vLyAgICAgICAgICAgICBfZWxlbS5hZGRDbGFzcygnX29uJyk7IC8vIHNlbGVjdCB0aGlzIHNrdVxuLy8gICAgICAgICAgICAgbmV3IHN3YXBTaG93Y2FzZURhdGEoX3ByZCxfZWxlbVswXS5kYXRhc2V0KTtcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgc2VsZi5zb3J0RGF0YSA9IGZ1bmN0aW9uIChEYXRhKSB7XG4vLyAgICAgICAgICAgICBpZiggISFEYXRhLml0ZW1zICYmIERhdGEuaXRlbXMubGVuZ3RoPD0wIFxuLy8gICAgICAgICAgICAgICAgIHx8ICEhRGF0YS5pdGVtcyAmJiBEYXRhLml0ZW1zLmxlbmd0aD4wXG4vLyAgICAgICAgICAgICAgICAgICAgICYmIHVuZGVmaW5lZD09PURhdGEuaXRlbXNbMF0udmFyaWF0aW9uc1xuLy8gICAgICAgICAgICAgKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgdmFyIGhhc0NvbG9yID0gL2Nvci9pZy50ZXN0KERhdGEuaXRlbXNbMF0udmFyaWF0aW9ucy5qb2luKFwiLFwiKSk7XG4vLyAgICAgICAgICAgICAvLyBzb3J0LCBmaXJzdCBpZiB0aGVyZSBpcyBhIFwiRGVzdGFxdWVcIiwgc2Vjb25kIGlmIHRoZXJlIGlzIFwiZmxhZ1wiLCB0aGlyZCBieSBwcm9kdWN0IHByaWNlXG4vLyAgICAgICAgICAgICBpZihoYXNDb2xvcikge1xuLy8gICAgICAgICAgICAgICAgIERhdGEuaXRlbXMuc29ydChmdW5jdGlvbiAoYSxiKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhLnNlbGxlcnNbMF0uY29tbWVydGlhbE9mZmVyLlByaWNlIC0gYi5zZWxsZXJzWzBdLmNvbW1lcnRpYWxPZmZlci5QcmljZTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIC8vIHNvcnQgaW5zdGFsbG1lbnRzXG4vLyAgICAgICAgICAgICAkLmVhY2goRGF0YS5pdGVtcyxmdW5jdGlvbiAobmR4LGl0ZW0pIHtcbi8vICAgICAgICAgICAgICAgICBpZighIWl0ZW0uc2VsbGVycyYmaXRlbS5zZWxsZXJzWzBdLmNvbW1lcnRpYWxPZmZlci5BdmFpbGFibGVRdWFudGl0eT4wJiYhIWl0ZW0udmFyaWF0aW9ucykge1xuLy8gICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGxlcnNbMF0uY29tbWVydGlhbE9mZmVyLkluc3RhbGxtZW50cy5zb3J0KGZ1bmN0aW9uIChhLGIpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhLlZhbHVlIC0gYi5WYWx1ZTtcbi8vICAgICAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICByZXR1cm4gRGF0YTtcbi8vICAgICAgICAgfTtcbi8vICAgICB9XG4vLyB9KShqUXVlcnksd2luZG93LGRvY3VtZW50KTtcbi8vIHZhciBhcHBseVNlbGVjdG9yc09uTXV0YXRpb24gPSAoZnVuY3Rpb24gKCQsd2luZG93LGRvY3VtZW50LHVuZGVmaW5lZCkge1xuLy8gICAgIHZhciBhcHBseVNlbGVjdG9yc09uTXV0YXRpb24gPSBmdW5jdGlvbiAoKXtcbi8vICAgICAgICAgaWYoIXdpbmRvdy5fX19zZWxlY3RvcnMpe1xuLy8gICAgICAgICAgICAgd2luZG93Ll9fX3NlbGVjdG9ycyA9IG5ldyBBZGRTa3VTZWxlY3RvcigpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWQqPVJlc3VsdEl0ZW1zXScpO1xuLy8gICAgICAgICB2YXIgY29uZmlnID0geyBzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUgfTtcbi8vICAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuLy8gICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4vLyAgICAgICAgICAgICAgICAgaWYoXCJjaGlsZExpc3RcIj09PW11dGF0aW9uLnR5cGUmJi9fcHJvZHVjdC9pZy50ZXN0KG11dGF0aW9uLnRhcmdldC5jbGFzc05hbWUpKXtcbi8vICAgICAgICAgICAgICAgICAgICAgdmFyIF9wcmQgPSAkKG11dGF0aW9uLnRhcmdldCkucGFyZW50cygnLl9wcmQnKTtcbi8vICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll9fX3NlbGVjdG9ycy5hcHBseVNlbGVjdG9yKF9wcmQpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgdGFyZ2V0LmZvckVhY2goZnVuY3Rpb24gKHQpe1xuLy8gICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0LCBjb25maWcpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcbi8vICAgICB9O1xuLy8gJCh3aW5kb3cpLm9uKCdsb2FkJyxhcHBseVNlbGVjdG9yc09uTXV0YXRpb24pO1xuLy8gXHRyZXR1cm4gYXBwbHlTZWxlY3RvcnNPbk11dGF0aW9uO1xuLy8gfSkoalF1ZXJ5LHdpbmRvdyxkb2N1bWVudCk7XG4vLyB2YXIgYWRkU2t1cyA9IChmdW5jdGlvbiAoJCx3aW5kb3csZG9jdW1lbnQsdW5kZWZpbmVkKSB7XG4vLyAgICAgdmFyIGFwcGx5QWxsU2VsZWN0b3JzID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZighd2luZG93Ll9fX3NlbGVjdG9ycyl7XG4vLyAgICAgICAgICAgICB3aW5kb3cuX19fc2VsZWN0b3JzID0gbmV3IEFkZFNrdVNlbGVjdG9yKCk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgJCgnLl9wcmQnKS5lYWNoKGZ1bmN0aW9uIChuZHgsaXRlbSkge1xuLy8gICAgICAgICAgICAgd2luZG93Ll9fX3NlbGVjdG9ycy5hcHBseVNlbGVjdG9yKGl0ZW0pO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9O1xuLy8gICAgICQod2luZG93KS5vbignbG9hZCcsYXBwbHlBbGxTZWxlY3RvcnMpO1xuLy8gICAgIHJldHVybiBhcHBseUFsbFNlbGVjdG9ycztcbi8vIH0pKGpRdWVyeSx3aW5kb3csZG9jdW1lbnQpOyJdfQ==
},{}]},{},[1])