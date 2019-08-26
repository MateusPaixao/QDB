/**UTLS*/
var Utls = function(e, h, k, l) {
    return function() {
        var c = this;
        c.getSkus = function(a) {
            var b = e.Deferred();
            if ("undefined" === a)
                return b.reject("Missing product id."),
                b.promise();
            if (c.getSkus.data[a])
                return b.resolve(c.getSkus.data[a]),
                b.promise();
            vtexjs.catalog.getProductWithVariations(a).fail(function(d) {
                c.getSkus.data[a] = [];
                b.reject("Product id not found.")
            }).done(function(d) {
                c.getSkus.data[a] = {
                    id: d.productId,
                    name: d.name,
                    skus: d.skus.slice(),
                    salesChannel: d.salesChannel,
                    available: d.available
                };
                b.resolve(c.getSkus.data[a])
            });
            return b.promise()
        }
        ;
        c.getSkus.data = {};
        c.getSkuList = function(a) {
            if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
                return a = new Promise(function(a, c) {
                    c("Missing list of product id. eg. [1, 45, 83].")
                }
                ),
                Promise.all([a]);
            var b = []
              , d = {};
            e.each(a, function(a, f) {
                var g = new Promise(function(a, b) {
                    c.getSkuList.data[f] ? a(c.getSkuList.data) : c.getSkus(f).then(function(b) {
                        d[f] = e.extend({}, b);
                        c.getSkuList.data = e.extend({}, d, c.getSkuList.data);
                        a(c.getSkuList.data)
                    }, function(a) {
                        b("Product id not found.")
                    })
                }
                );
                b.push(g)
            });
            return Promise.all(b)
        }
        ;
        c.getSkuList.data = {};
        c.getInfo = function(a) {
            var b = e.Deferred();
            if ("undefined" === a)
                return b.reject("Missing product id."),
                b.promise();
            var d = "/api/catalog_system/pub/products/search/?fq=productId:" + a;
            if (c.getInfo.data[a])
                return b.resolve(c.getInfo.data[a]),
                b.promise();
            e.ajax({
                url: d, 
                success: function(d) {
                    c.getInfo.data[a] = d;
                    b.resolve(c.getInfo.data[a])
                },
                error: function(d) {
                    c.getInfo.data[a] = [];
                    b.reject("Product id not found.")
                }
            });
            return b.promise()
        }
        ;
        c.getInfo.data = {};
        c.addProducts = function(a) {
            var b = e.Deferred();
            if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
                return b.reject("Missing array of objects. eg. [{ id: 1 }, { id: 2, quantity: 2 }]"),
                b.promise();
            var c = [];
            e.each(a, function(a, b) {
                var d = Object.assign({
                    id: 0,
                    quantity: 1,
                    seller: 1
                }, b);
                c.push(d)
            });
            vtexjs.checkout.addToCart(c).fail(function(a) {
                b.reject(a)
            }).done(function(a) {
                b.resolve(a)
            });
            return b.promise()
        }
        ;
        "undefined" !== typeof console && "undefined" !== typeof console.log && (c.__log = console.log);
        return !0
    }
}(jQuery, window, document);
var formatBR = function (Number) { var number = "string"===typeof Number?1*Number:Number; var tmp = number.toFixed(2); tmp = tmp.replace(/\./, ""); tmp = tmp.replace(/([0-9]{2})$/g, ",$1"); if (tmp.length > 6) { tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2"); } return tmp; };
var stringToSlug = function (e) { var a = e.trim(); a = a.toLowerCase(); a = a.replace(/\(|\)|\'|,/g, ""); a = a.replace(/\s+/g, " "); a = a.replace(/(\s|&|\?|\/|\||:)/g, "-"); a = a.replace(/\u00e7/g, "c"); a = a.replace(/\u00f1/g, "n"); a = a.replace(/\u00c7/g, "C"); a = a.replace(/\u00d1/g, "N"); a = a.replace(/[\u00c3\u00c2\u00c1\u00c0\u00c4]/g, "A"); a = a.replace(/[\u00c9\u00c8\u00cb]/g, "E"); a = a.replace(/[\u00cd\u00cc\u00cf]/g, "I"); a = a.replace(/[\u00d5\u00d4\u00d3\u00d2\u00d6]/g, "O"); a = a.replace(/[\u00da\u00d9]/g, "U"); a = a.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g, "a"); a = a.replace(/[\u00e8\u00e9\u00ea\u00eb]/g, "e"); a = a.replace(/[\u00ec\u00ed\u00ee\u00ef]/g, "i"); a = a.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g, "o"); a = a.replace(/[\u00f9\u00fa\u00fb\u00fc]/g, "u"); return a; };
var generateImgUrl = (function ($,window,document,undefined){
    "use strict";
    return function (ImgSrc) {
        var size = 180;
        if($('html').hasClass('_mobi-on')) {
            size = 140;
        }
        return ImgSrc.replace(/(.*?ids\/)(.*?)(\/.*)/g,"$1$2-"+size+"-"+size+"$3").replace(/\?.*/,"");
    };
})(jQuery,window,document);


var applyMoreProducts = function () {
    $('#cart-title').wrap('<div class="_title"></div>');
    $('._title').append('<div class="_more-link"><a>Escolher mais produtos</a></div>');
	$('<a href="#/orderform" class="_buy-btn">Fechar pedido</div>').insertAfter('.cart-totalizers .accordion-group');
	return true;
}
$(applyMoreProducts);

var changeUrlButtonMoreProducts = function() {
	function getUrl(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : '/';
    }

	$('body').on('click', '._more-link, .more-products', function(event) {
		if(/\/p/.test(document.referrer) && !/utm/.test(document.referrer)) {
			location.href = getUrl('LastDepartmentUrl');
		} else {
			location.href = '/';	
		}

		return true;
	});
}
$(changeUrlButtonMoreProducts);

/*201905281755*/
var addContinueShoppingBtn = function(){
	$('.full-cart .cart').prepend('<div class="_more-prds-btns"><a href="/">Escolher mais produtos</a></div>');
  return true;
};
$(window).on('load',addContinueShoppingBtn);
var moveGiftTables = function(){
    // if($(window).width()>768) return false;
	var gifts = $('.full-cart > .cart-select-gift-placeholder').eq(0);
	if(gifts.length<=0){
		gifts = $('.full-cart .summary-template-holder .cart-select-gift-placeholder').eq(0);
	}
    $('#cartLoadedDiv').append(gifts);
    return true;
};
$(window).on('load',moveGiftTables);
var fixVisaBtn = function () {    
    $('.extensions-checkout-buttons-container').appendTo('._visa-btn-wrp');
    return true;
}
$(window).on('load',fixVisaBtn);
var checkEmptyCart = function () {
	if($('.empty-cart-content:visible').length>0){
		$('html').addClass("_empty-cart");
	}
};
$(window).on('load',checkEmptyCart);
var siteblindadoSelo = function (Cb) {
    var s = document.createElement('script');
    s.src = "//selo.siteblindado.com/aw.js";
    s.classList.add('_siteblindado-selo');
    s.addEventListener('load',function () {
        if ("function" === typeof Cb) {
            Cb();
        }        
    });
    var sRef = document.getElementsByTagName('script')[0];
    sRef.parentNode.insertBefore(s,sRef);
};
var siteblindadoApi = function () {
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
var startSiteblindado = function () {
    window.___siteblindadoTO = setTimeout(function () {
        siteblindadoSelo(siteblindadoApi);
        clearTimeout(window.___siteblindadoTO);
    },5000);
};
$(window).on('load',startSiteblindado);

var applyClearsale = (function (window,document,undefined) {
    var addFingerPrint = function () {
        var deviceFingerprintIdCSV4 = 10000000 + Math.floor(Math.random() * 99999999);
        csdp('app', '4xlyr73qs322g24mv7qt');
        csdp('sessionid', deviceFingerprintIdCSV4);
        window.vtex.deviceFingerprint = deviceFingerprintIdCSV4;
        return true;
    };
    var clearsaleFPScript = function (a, b, c, d, e, f, g, h) {
        a['CsdpObject'] = e;
        a[e] = a[e] || function () {
            (a[e].q = a[e].q || []).push(arguments)
        }, a[e].l = 1 * new Date();
        f = b.createElement(c), g = b.getElementsByTagName(c)[0];
        f.async = 1;
        f.src = d;
        f.classList.add('_clearsale-fingerprint')
        f.addEventListener('load',h)
        g.parentNode.insertBefore(f, g);
        return true;
    };
    var startClearsale = function () {
        if(!/payment/ig.test(document.location.hash)||!!window.___clearsaleApplied) { return false; }
        clearsaleFPScript(window, document, 'script', '//device.clearsale.com.br/p/fp.js', 'csdp', undefined, undefined, addFingerPrint);
        window.___clearsaleApplied = true;
        return true;
    };
    return startClearsale;
})(window,document);

var showBoleto = function () {
    if(!/payment/ig.test(document.location.hash)) { return false; }
    var className = '_show-boleto';
    $('html').removeClass(className);
    if ($('.vtex-omnishipping-1-x-SummaryItemTitle:visible').length<=0) {
        $('html').addClass(className);
	}
	return true;
};
$(window).on('load',showBoleto);
var moreThen3Addresses = function () {
    if(!/shipping/ig.test(document.location.hash)) { return false; }
    var html = document.querySelector("html");
    var addressList = document.getElementsByClassName('address-item');
    if ( undefined !== addressList && addressList.length > 1) {
        html.classList.add("multiple-address");
    }
    return true;
}
var selectCreditCard = function(){
    if(!/payment/ig.test(document.location.hash)) { return false; }
	if ($('.vtex-omnishipping-1-x-pickupAddress').length>0 /* endereço de pickup */
		&& $('#payment-group-bankInvoicePaymentGroup.active').length > 0 /* se boleto está selecionado */
		) {
        $('a#payment-group-creditCardPaymentGroup').click();
    }
    return true;
};

// CHECKOUTS CHANGES HASH
var checkoutChanged = function(e){
  	showBoleto();
    selectCreditCard();
    moreThen3Addresses();
  	// applyClearsale();
};
var checkoutChangeEvents = function () {
    if(!!window.___checkoutEventsApplied) { return false; }
    //$(window).on('deliverySelected.vtex',checkoutChanged)
    $(window).on('hashchange',checkoutChanged);
    window.___checkoutEventsApplied = true;
    checkoutChanged();
    return true;
};
$(checkoutChangeEvents);
// END: CHECKOUTS CHANGES HASH

(function ($, window, document, undefined) {
	"use strict";
	var __log = console.log;
	var pricingTableTpl = function (p_row) {
		var row = p_row || 0;
		return '' +
			'<td class="_cart-tbl-container _cart-tbl-container' + row + '">' +
				'<div class="_cart-tbl">' +
					'<div class="_cart-left">' +
						'<div class="_cart-title">' +
							'<div class="_cart-col0">' +
								'Produto' +
							'</div>' +
						'</div>' +
						'<div class="_cart-body">' +
							'<div class="_cart-col0 _cart-product">' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="_cart-right">' +
						'<div class="_cart-title">' +
							'<div class="_cart-col0">' +
								'Preço' +
							'</div>' +
							'<div class="_cart-col1">' +
								'Quantidade' +
							'</div>' +
							'<div class="_cart-col2">' +
								'Total' +
							'</div>' +
							'<div class="_cart-col3">' +
								'&nbsp;' +
							'</div>' +
						'</div>' +
						'<div class="_cart-body">' +
							'<div class="_cart-col0 _cart-pricing">' +
							'</div>' +
							'<div class="_cart-col1 _cart-qty-container">' +
								'<div class="_cart-qty">' +
								'</div>' +
							'</div>' +
							'<div class="_cart-col2 _cart-final-price">' +
							'</div>' +
							'<div class="_cart-col3 _cart-remove">' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</td>';
	};
	var fixPricingTable = function () {
		$('.full-cart tr.product-item').each(function (ndx, item) {
			var _tpl = $(pricingTableTpl(ndx));
			$(item).filter(function () {
				return $(item).find('._cart-tbl').length <= 0;
			}).append(_tpl);
			var _img = $(item).find('.product-image img');
			// _img.attr('src', _img.attr('src').replace(/(.*)(-\d{2}-\d{2})(.*)/,'$1-200-200$3'));
			var _imgtd = $(item).find('.product-image').html(_img);
			/** move elements to a better place */
			$(item).find('._cart-product')
				.html(_imgtd)
				.append($(item).find('.product-name'));
			$(item).find('._cart-qty').html($(item).find('.quantity:first'));
			$(item).find('._cart-pricing').html($(item).find('.product-price:first'));
			$(item).find('._cart-final-price').html($(item).find('.quantity-price:first'));
			$(item).find('._cart-remove').html($(item).find('.item-remove:first'));
		});
		return true;
	};
	var pickupNotFind = function () {
		var contentPickupNotFind = $('.ask-for-geolocation');
		if(contentPickupNotFind.length > 0){
			contentPickupNotFind.html("<div class='pickup-notfind'>Não encontramos pontos de retirada perto deste endereço.<br /> </div>");
			setTimeout(function() {
				$('#shipping-option-delivery').click();
					console.log('sem ponto de retirada');
			}, 4500);
		};
	};
	$(window).on('load',pickupNotFind);
	var onCartChange = function () {
		$(window).on('orderFormUpdated.vtex', function () {
			fixPricingTable();
			setTimeout(function() {
				pickupNotFind();
			}, 1000);
		});
		return true;
	};
	var startCartFix = function () {
		fixPricingTable();
		onCartChange();
		return true;
	};
	$(startCartFix);
    var fixPaymentDiscountLink = function () {
		$(document).ready(function() {
      		$('body').on('click', '.payment-discounts-alert',function() {
		 		$("html, body").animate({ 
                  scrollTop: $('.body-order-form').offset().top 
                }, 1000);
			});	
			
      	});	      	
	  return true;
	}
	$(fixPaymentDiscountLink);       
})(jQuery, window, document);