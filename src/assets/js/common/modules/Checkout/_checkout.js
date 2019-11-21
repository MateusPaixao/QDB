const Methods = {
    init() {
        Methods.checkout();
        // Methods.optinClube();
    },

    // Necessário Modularizar
    checkout() {
        /**UTLS*/
        var Utls = function (e, h, k, l) {
            return function () {
                var c = this;
                c.getSkus = function (a) {
                    var b = e.Deferred();
                    if ("undefined" === a)
                        return b.reject("Missing product id."),
                            b.promise();
                    if (c.getSkus.data[a])
                        return b.resolve(c.getSkus.data[a]),
                            b.promise();
                    vtexjs.catalog.getProductWithVariations(a).fail(function (d) {
                        c.getSkus.data[a] = [];
                        b.reject("Product id not found.")
                    }).done(function (d) {
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
                };
                c.getSkus.data = {};
                c.getSkuList = function (a) {
                    if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
                        return a = new Promise(function (a, c) {
                                c("Missing list of product id. eg. [1, 45, 83].")
                            }),
                            Promise.all([a]);
                    var b = [],
                        d = {};
                    e.each(a, function (a, f) {
                        var g = new Promise(function (a, b) {
                            c.getSkuList.data[f] ? a(c.getSkuList.data) : c.getSkus(f).then(function (b) {
                                d[f] = e.extend({}, b);
                                c.getSkuList.data = e.extend({}, d, c.getSkuList.data);
                                a(c.getSkuList.data)
                            }, function (a) {
                                b("Product id not found.")
                            })
                        });
                        b.push(g)
                    });
                    return Promise.all(b)
                };
                c.getSkuList.data = {};
                c.getInfo = function (a) {
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
                        success: function (d) {
                            c.getInfo.data[a] = d;
                            b.resolve(c.getInfo.data[a])
                        },
                        error: function (d) {
                            c.getInfo.data[a] = [];
                            b.reject("Product id not found.")
                        }
                    });
                    return b.promise()
                };
                c.getInfo.data = {};
                c.addProducts = function (a) {
                    var b = e.Deferred();
                    if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
                        return b.reject("Missing array of objects. eg. [{ id: 1 }, { id: 2, quantity: 2 }]"),
                            b.promise();
                    var c = [];
                    e.each(a, function (a, b) {
                        var d = Object.assign({
                            id: 0,
                            quantity: 1,
                            seller: 1
                        }, b);
                        c.push(d)
                    });
                    vtexjs.checkout.addToCart(c).fail(function (a) {
                        b.reject(a)
                    }).done(function (a) {
                        b.resolve(a)
                    });
                    return b.promise()
                };
                "undefined" !== typeof console && "undefined" !== typeof console.log && (c.__log = console.log);
                return !0
            }
        }(jQuery, window, document);
        var formatBR = function (Number) {
            var number = "string" === typeof Number ? 1 * Number : Number;
            var tmp = number.toFixed(2);
            tmp = tmp.replace(/\./, "");
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            if (tmp.length > 6) {
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            return tmp;
        };
        var stringToSlug = function (e) {
            var a = e.trim();
            a = a.toLowerCase();
            a = a.replace(/\(|\)|\'|,/g, "");
            a = a.replace(/\s+/g, " ");
            a = a.replace(/(\s|&|\?|\/|\||:)/g, "-");
            a = a.replace(/\u00e7/g, "c");
            a = a.replace(/\u00f1/g, "n");
            a = a.replace(/\u00c7/g, "C");
            a = a.replace(/\u00d1/g, "N");
            a = a.replace(/[\u00c3\u00c2\u00c1\u00c0\u00c4]/g, "A");
            a = a.replace(/[\u00c9\u00c8\u00cb]/g, "E");
            a = a.replace(/[\u00cd\u00cc\u00cf]/g, "I");
            a = a.replace(/[\u00d5\u00d4\u00d3\u00d2\u00d6]/g, "O");
            a = a.replace(/[\u00da\u00d9]/g, "U");
            a = a.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g, "a");
            a = a.replace(/[\u00e8\u00e9\u00ea\u00eb]/g, "e");
            a = a.replace(/[\u00ec\u00ed\u00ee\u00ef]/g, "i");
            a = a.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g, "o");
            a = a.replace(/[\u00f9\u00fa\u00fb\u00fc]/g, "u");
            return a;
        };
        var generateImgUrl = (function ($, window, document, undefined) {
            "use strict";
            return function (ImgSrc) {
                var size = 180;
                if ($('html').hasClass('_mobi-on')) {
                    size = 140;
                }
                return ImgSrc.replace(/(.*?ids\/)(.*?)(\/.*)/g, "$1$2-" + size + "-" + size + "$3").replace(/\?.*/, "");
            };
        })(jQuery, window, document);


        var applyMoreProducts = function () {
            $('#cart-title').wrap('<div class="_title"></div>');
            $('._title').append('<div class="_more-link"><a>Escolher mais produtos</a></div>');
            $('<a href="#/orderform" class="_buy-btn">Fechar pedido</div>').insertAfter('.cart-totalizers .accordion-group');
            return true;
        }
        $(applyMoreProducts);

        var changeUrlButtonMoreProducts = function () {
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
        }
        $(changeUrlButtonMoreProducts);

        /*201905281755*/
        // var addContinueShoppingBtn = function () {
        //     $('.full-cart .cart').prepend('<div class="_more-prds-btns"><a href="/">Escolher mais produtos</a></div>');
        //     return true;
        // };
        // $(window).on('load', addContinueShoppingBtn);
        var moveGiftTables = function () {
            // if($(window).width()>768) return false;
            var gifts = $('.full-cart > .cart-select-gift-placeholder').eq(0);
            if (gifts.length <= 0) {
                gifts = $('.full-cart .summary-template-holder .cart-select-gift-placeholder').eq(0);
            }
            $('#cartLoadedDiv').append(gifts);
            return true;
        };
        $(window).on('load', moveGiftTables);
        var fixVisaBtn = function () {
            $('.extensions-checkout-buttons-container').appendTo('._visa-btn-wrp');
            return true;
        }
        $(window).on('load', fixVisaBtn);
        var checkEmptyCart = function () {
            if ($('.empty-cart-content:visible').length > 0) {
                $('html').addClass("_empty-cart");
            }
        };
        $(window).on('load', checkEmptyCart);
        var siteblindadoSelo = function (Cb) {
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
            }, 5000);
        };
        $(window).on('load', startSiteblindado);

        var applyClearsale = (function (window, document, undefined) {
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
                f.addEventListener('load', h)
                g.parentNode.insertBefore(f, g);
                return true;
            };
            var startClearsale = function () {
                if (!/payment/ig.test(document.location.hash) || !!window.___clearsaleApplied) {
                    return false;
                }
                clearsaleFPScript(window, document, 'script', '//device.clearsale.com.br/p/fp.js', 'csdp', undefined, undefined, addFingerPrint);
                window.___clearsaleApplied = true;
                return true;
            };
            return startClearsale;
        })(window, document);

        var showBoleto = function () {
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
        var moreThen3Addresses = function () {
            if (!/shipping/ig.test(document.location.hash)) {
                return false;
            }
            var html = document.querySelector("html");
            var addressList = document.getElementsByClassName('address-item');
            if (undefined !== addressList && addressList.length > 1) {
                html.classList.add("multiple-address");
            }
            return true;
        }
        var selectCreditCard = function () {
            if (!/payment/ig.test(document.location.hash)) {
                return false;
            }
            if ($('.vtex-omnishipping-1-x-pickupAddress').length > 0 /* endereço de pickup */ &&
                $('#payment-group-bankInvoicePaymentGroup.active').length > 0 /* se boleto está selecionado */
            ) {
                $('a#payment-group-creditCardPaymentGroup').click();
            }
            return true;
        };

        // CHECKOUTS CHANGES HASH
        var checkoutChanged = function (e) {
            showBoleto();
            selectCreditCard();
            moreThen3Addresses();
            // applyClearsale();
        };
        var checkoutChangeEvents = function () {
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
                if (contentPickupNotFind.length > 0) {
                    contentPickupNotFind.html("<div class='pickup-notfind'>Não encontramos pontos de retirada perto deste endereço.<br /> </div>");
                    setTimeout(function () {
                        $('#shipping-option-delivery').click();
                        console.log('sem ponto de retirada');
                    }, 4500);
                };
            };
            $(window).on('load', pickupNotFind);
            var onCartChange = function () {
                $(window).on('orderFormUpdated.vtex', function () {
                    fixPricingTable();
                    setTimeout(function () {
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
                $(document).ready(function () {
                    $('body').on('click', '.payment-discounts-alert', function () {
                        $("html, body").animate({
                            scrollTop: $('.body-order-form').offset().top
                        }, 1000);
                    });

                });
                return true;
            }
            $(fixPaymentDiscountLink);
        })(jQuery, window, document);

        // OFERTA DE CAIXA
        // PROMOTION DATA -- CADASTRAR NO GTM
        let promotionData = [{
            "906": { //Posição-idSku
                activeValue: 40.00, //valor do sarrafo(carrinho)
                discountPercent: 20.0 //porcentagem
            },
            "1910": { //Posição-idSku 
                activeValue: 80.97, //valor do sarrafo(carrinho)
                discountPercent: 50.0 //porcentagem
            },
            "1259": { //Posição-idSku
                activeValue: 120.00, //valor do sarrafo(carrinho)
                discountPercent: 50.0 //porcentagem  
            }
        }];
        let __skus = [];
        if (typeof promotionData != "undefined") {
            let productSku = promotionData.map(el => Object.keys(el).sort().reverse());
            __skus.push(productSku);
            var getProds = (function ($, window, document, undefined) {
                $.ajax({
                    type: "GET",
                    url: 'https://www.quemdisseberenice.com.br/cart?refs=' + __skus.join(','),
                    data: "check",
                    success: function (response) {
                        let resultOfertas = $(response).filter('div.ofertaDeCaixa');
                        $('.cart').append(resultOfertas);
                        $('.__lnk-buy-btn').on("click", function () {
                            event.preventDefault();
                        let __skuSelected = $(this).attr('href').match(/.*?=([\w|-]*).*/)[1];
                            //console.log(__skuSelected);
                            let item = {
                                id: __skuSelected,
                                quantity: 1,
                                seller: '1'
                            };
                            vtexjs.checkout.addToCart([item], null, 1)
                                .done(function (orderForm) {
                                    //console.log(orderForm);
                                });
                        });
                        

                    }
                });

                return getProds;
            })(jQuery, window, document);

            var applyPromotionDiscount = function () {
                let _itemDiscount = document.querySelectorAll('._prd');
                _itemDiscount.forEach(
                    function (item, _attrIdsku, _array) {
                        _attrIdsku = item.getAttribute("data-sku");
                        //console.log(_attrIdsku);
                        _priceToDiscount = item.querySelectorAll('.__p_priceoffer');
                        _priceFrom = _priceToDiscount[0].innerText.replace('R$ ', '').replace(',', '.');

                        _percentDiscount = promotionData[0][_attrIdsku].discountPercent;
                        _sarrafoCart = promotionData[0][_attrIdsku].activeValue;

                        item.setAttribute('data-sarrafo', _sarrafoCart);
                        _sarrafoFloat = document.createElement('span');
                        __msg = 'R$ ' + _sarrafoCart.toString().replace('.', ',') + ' em compras';

                        _sarrafoFloat.innerText = __msg;
                        _sarrafoFloat.classList.add('activeValue');
                        _spanSarrafo = item.querySelectorAll('.activeValue');

                        if (_spanSarrafo.length <= 0) {
                            item.appendChild(_sarrafoFloat);
                        };

                        let _cartSubtotal = parseFloat(vtexjs.checkout.orderForm.totalizers[0].value / 100);
                        if (_cartSubtotal >= _sarrafoCart) {
                            item.classList.remove("promoActive");
                            item.classList.add("promoActive");
                        };

                        _resultDiscount = (_priceFrom / 100) * (_percentDiscount - 100);
                        _resultFormated = parseFloat(Math.abs(_resultDiscount)).toFixed(2);
                        _promoApplied = _priceToDiscount[0].classList.contains('promoApplied');

                        _priceToDiscount.forEach(
                            function (item, index) {
                                if (_promoApplied == false) {
                                    item.innerText = "R$ " + _resultFormated.replace('.', ',');
                                    item.classList.add("promoApplied");
                                    return true
                                } else {
                                    return false;
                                }
                            }
                        );
                    }
                );
            };
        };

        $(window).on('orderFormUpdated.vtex', function (event, orderForm) {
            $('._prd').removeClass('promoActive');
            _cartSubtotal = parseFloat(vtexjs.checkout.orderForm.totalizers[0].value / 100);
            _spanSarrafoTotal = 120;
            _navBar = document.getElementsByClassName('_navBar-OfertaCaixa')[0].childNodes[0];
            var barWidth = (_cartSubtotal / _spanSarrafoTotal) * 100;
            _navBar.style.width = barWidth + '%';
            _itemDiscount.forEach(function (i) {
                _sarrafoCart = Number(i.dataset.sarrafo);
                _promoActive = i.classList.contains('promoApplied');
                if (_cartSubtotal >= _sarrafoCart) {
                    i.classList.add("promoActive");
                };
            });
            // console.log('alterei o order');
        });

        // SKU SLECTOR
        var swapShowcaseData = (function ($, window, document, undefined) {
            "use strict";
            return function (Elem, Data) {
                if (!Elem || !Data || !!Data && !Data.url) {
                    return false;
                }
                var data = Data,
                    _elem = $(Elem),
                    name = data.name || "",
                    imgURL = data.img,
                    reg_html = "",
                    reg_str = "",
                    reg_value = 1 * data.price || 0,
                    sale_str = "",
                    sale_value = 1 * data.sale || 0,
                    times = data.times || "",
                    installments_html = "",
                    installments_str = "",
                    installment_value = data.installments || 0,
                    url = data.url || "",
                    sku = data.sku || "",
                    attachments = data.attachments.split(','),
                    _pricing_html = `<span class="_p_price_">{%REG%}</span>
                <span class="_p_priceoffer_"><span class="__p_by">por </span> <span class="__p_priceoffer">{%SALE%}</span></span>
                <span class="_p_intallments">{%PRICING%}</span>`;
                var sale_str = "R$ " + formatBR(sale_value);
                if (url.length > 0) {
                    url = [url, "idsku=" + sku].join('?');
                }
                if (reg_value > 0 && reg_value > sale_value) {
                    reg_str = "R$ " + formatBR(reg_value);
                    reg_html = `<span class="__p_from">de </span> <span class="__p_price">{%REGVALUE%}</span>`
                        .replace(/{%REGVALUE%}/g, reg_str);

                }
                if (times.length > 0 && (~~times) > 1) {
                    installments_str = "R$ " + formatBR(installment_value);
                    installments_html = `<span class="__p_installments"> <span class="__p_numberinstallments">{%TIMES%}x</span> de <span class="__p_installmentsvalue">{%INSTALLMENTVALUE%} </span> <span class="__p_installments-juros">sem&nbsp;juros</span>`
                        .replace(/{%TIMES%}/g, times).replace(/{%INSTALLMENTVALUE%}/g, installments_str);
                }
                _pricing_html = _pricing_html.replace(/{%REG%}/g, reg_html);
                _pricing_html = _pricing_html.replace(/{%SALE%}/g, sale_str);
                _pricing_html = _pricing_html.replace(/{%PRICING%}/g, installments_html);

                _elem.find('.__lnk-img').filter(function () {
                    return $(this).find('._p-promo-labels').length == 0;
                }).append('<div class="_p-promo-labels"></div>');

                var labels = [];
                $.each(attachments, function (ndx, item) {
                    if (item.length > 0 && /flag/ig.test(item)) {
                        item = item.replace(/flag:/ig, "");
                        labels.push('<span class="__flag __flag-' + stringToSlug(item) + '">' + item + '</span>');
                    }
                });
                _elem.find('._p-promo-labels').html(labels.join(""));

                _elem.find('.__lnk-img,.__lnk-pname,.__lnk-buy-btn').attr('href', url);
                //_elem.attr('data-sku',sku);
                _elem.find('.__p_img img').attr('src', imgURL);
                _elem.find('.__p_name').html(name);
                _elem.find('.__p_pricing_').html(_pricing_html);
                //console.log(_elem);
                // !!applyDiscountFlag&&applyDiscountFlag(_elem); // apply discount flag
                return true;
            }
        })(jQuery, window, document);
        var getAttClasses = (function ($, window, document, undefined) {
            "use strict";
            return function (Att) {
                if (Att.length <= 0) {
                    return "";
                }
                var atts = Att.split(',');
                var hasFlags = false;
                $.each(atts, function (ndx, att) {
                    if (/flag/ig.test(att) && !hasFlags) {
                        hasFlags = true;
                    }
                    att = att.replace(/Destaque/, "highlight");
                    att = "__btn-" + stringToSlug(att);
                    atts[ndx] = att;
                });
                if (hasFlags) atts.push("__hasflags");
                return atts.join(" ");
            }
        })(jQuery, window, document);
        var AddSkuSelector = (function ($, window, document, undefined) {
            return function () {
                var self = this,
                    classMarker = "__selectors-applied";
                self.applySelector = function (Elem) {
                    var _elem = $(Elem);
                    var prodId = _elem.find('._product').attr('data-prd');
                    //console.log(prodId);
                    if (_elem.length <= 0 || _elem.length > 0 && prodId.length <= 0) {
                        return false;
                    }
                    self.getSku(prodId).then(function (Data) {
                        if (!self.applyVariations(_elem, prodId, Data)) {
                            self.noVariation(_elem, prodId);
                        }
                    });
                };
                self.getSku = function (ProdId) {
                    var dfd = $.Deferred();
                    var prodId = ProdId;
                    if (!self.func.getInfo) { // check if undefined
                        self.func = new Utls();
                    }
                    self.func.getInfo(prodId).then(function (Data) {
                        if (Data.length > 0) {
                            self.data[prodId] = Data[0];
                            dfd.resolve(self.data);
                        }
                    }, function (error) {
                        // error
                        dfd.reject(error);
                    });
                    return dfd.promise();
                };
                self.func = {};
                self.data = {};
                self.applyVariations = function (Elem, ProdId, Data) {
                    if (!Elem ||
                        !ProdId ||
                        Data.length <= 0 ||
                        !!ProdId && Data[ProdId].items.length > 0 && undefined === Data[ProdId].items[0].variations
                    ) {
                        return false;
                    }
                    var _style = $('._selectors-styles');
                    if (_style.length <= 0) {
                        _style = $('<style/>').addClass('_selectors-styles');
                        $('head').append(_style);
                    }
                    var styles = _style.text() || "";
                    var marker = "__selectors-on";
                    var _elem = $(Elem);
                    // var data = Data[ProdId];
                    var data = self.sortData(Data[ProdId]);
                    var id = ProdId;
                    var _selectorData = self.getSelectors(data);
                    var _selectors = _selectorData['selectors'];
                    var selector_length = _selectors.children().length;
                    var hasColor = false;
                    styles += _selectorData['styles'];

                    var _div;
                    _div = _elem.find('._p-sku-selection');
                    if (_div.length <= 0) {
                        _div = $('<div/>').addClass('_p-sku-selection');
                    }
                    _div.append(_selectors);
                    _div.attr('data-sku-length', selector_length);
                    // _div.addClass('_on').attr('data-sku-length',selector_length);
                    if (!!_selectorData.settings && !!_selectorData.settings.type && /cor/.test(_selectorData.settings.type)) {
                        hasColor = true;
                        _div.addClass('_p-sku-color');
                        $('body').addClass(marker);
                        if ($('._p-selectors')) {
                            setTimeout(() => {
                                $('._p-selectors').slick({
                                    infinite: false,
                                    slidesToShow: 3,
                                    slidesToScroll: 3
                                });
                            }, 110);
                        };
                    }
                    _elem
                        .not('.' + marker)
                        .addClass(marker).addClass(marker + '-' + id).addClass('_prd-' + id)
                        .filter(function () {
                            return $(this).find('._p-sku-selection span').length <= 0;
                        })
                        .find('.__lnk-buy-btn')
                        .before(_div);
                    _style.text(styles);

                    var _firstSelected = _selectors.find('.__btn-highlight:first');
                    if (_firstSelected.length <= 0) {
                        _firstSelected = _selectors.find('span:first');

                    }

                    self.skuSelected(_firstSelected);
                    return true;
                };
                self.noVariation = function (Elem) {
                    $(Elem).addClass('_selector-unavailable');
                    return true;
                };
                self.getSelectors = function (Data) {
                    var _container = $('<div/>').addClass('_p-selectors');
                    var settings = {},
                        styles = "";
                    var name = Data.productName;
                    var url = Data.link || "";
                    $.each(Data.items, function (ndx, item) {
                        if (!!item.sellers && item.sellers[0].commertialOffer.AvailableQuantity > 0 && !!item.variations) {
                            var times = item.sellers[0].commertialOffer.Installments[0].NumberOfInstallments;
                            var installments = item.sellers[0].commertialOffer.Installments[0].Value;
                            installments = installments.toFixed(2);
                            var _elem = $('<span/>');
                            var type = item.variations[0] || "";
                            type += item.variations.length > 1 ? " | " + item.variations[1] : "";
                            var hasColor = /cor/i.test(type);
                            _elem.on('click.SkuSelection', function (e) {
                                if ("function" === typeof self.skuSelected) {
                                    self.skuSelected(_elem);
                                }
                            });
                            var attachments = "";

                            var pname = item[item.variations[0]];
                            pname += item.variations.length > 1 ? " | " + item[item.variations[1]] : "";
                            var imgURL = "",
                                thumbURL = "";
                            if (item.images.length > 0) {
                                imgURL = item.images[0].imageUrl;
                                imgURL = generateImgUrl(imgURL);
                            }
                            if (item.images.length > 1) {
                                $.each(item.images, function (ndx, img) {
                                    if (/thumb/i.test(img.imageLabel)) {
                                        thumbURL = img.imageUrl;
                                        thumbURL = (generateImgUrl(thumbURL) || "").replace(/http:/, "https:");
                                        return false;
                                    }
                                });
                            }
                            // var highlight = false;
                            if (!!item.attachments) {
                                var att = item.attachments.slice(0);
                                var flags = [];
                                $.each(att, function (ndx, item) {
                                    // if(!highlight) {
                                    //     highlight = /destaque/ig.test(item.name);
                                    // }
                                    flags.push(item.name);
                                });
                                attachments = flags.join(',');
                            }
                            _elem.html(pname);
                            if (hasColor) {
                                _elem.html("&nbsp;");
                                settings = $.extend({}, {
                                    type: "cor"
                                });
                            }
                            var className = '_' + stringToSlug(pname);
                            // if(highlight) { className += " __btn-highlight"; }
                            var sale = item.sellers[0].commertialOffer.Price;
                            sale = sale.toFixed(2);
                            var price = item.sellers[0].commertialOffer.ListPrice;
                            price = price.toFixed(2);
                            _elem.attr('title', pname);
                            // _elem.addClass(className);
                            _elem.addClass(className).addClass(getAttClasses(attachments));
                            _elem.attr('data-qty', item.sellers[0].commertialOffer.AvailableQuantity);
                            _elem.attr('data-name', name);
                            _elem.attr('data-url', url);
                            _elem.attr('data-type', type);
                            _elem.attr('data-img', imgURL);
                            _elem.attr('data-thumb', thumbURL);
                            _elem.attr('data-price', price); // regular price
                            _elem.attr('data-sale', sale); // price on sale = cheaper
                            _elem.attr('data-times', times);
                            _elem.attr('data-installments', installments);
                            _elem.attr('data-sku', item.itemId);
                            _elem.attr('data-attachments', attachments);
                            if (thumbURL.length > 0 && hasColor) {
                                styles += "." + className + ":before{background-image:url(" + thumbURL + ")} ";
                                // $(_elem).css({"background-image":"url("+thumbURL+")"});
                            }
                            _container.append(_elem);
                        }
                    });
                    var result = {
                        selectors: _container,
                        styles: styles
                    };
                    if (!!settings.type) {
                        result = $.extend(result, {
                            settings: settings
                        });
                    }
                    return result;
                };
                self.skuSelected = function (Elem) {
                    if (!Elem || !!Elem && Elem.length <= 0) {
                        return false;
                    }
                    var _elem = $(Elem);
                    var _prd = _elem.parents('._prd');

                    //_elem.parent().find('._on').removeClass('_on'); // deactivate all skus
                    $('._on').removeClass('_on');
                    //console.log(_elem.parent().parent().find('._on'));
                    _elem.addClass('_on'); // select this sku
                    new swapShowcaseData(_prd, _elem[0].dataset);
                    applyPromotionDiscount();
                };
                self.sortData = function (Data) {
                    if (!!Data.items && Data.items.length <= 0 ||
                        !!Data.items && Data.items.length > 0 &&
                        undefined === Data.items[0].variations
                    ) {
                        return false;
                    }
                    var hasColor = /cor/ig.test(Data.items[0].variations.join(","));
                    // sort, first if there is a "Destaque", second if there is "flag", third by product price
                    if (hasColor) {
                        Data.items.sort(function (a, b) {
                            return a.sellers[0].commertialOffer.Price - b.sellers[0].commertialOffer.Price;
                        });
                    }
                    // sort installments
                    $.each(Data.items, function (ndx, item) {
                        if (!!item.sellers && item.sellers[0].commertialOffer.AvailableQuantity > 0 && !!item.variations) {
                            item.sellers[0].commertialOffer.Installments.sort(function (a, b) {
                                return a.Value - b.Value;
                            });
                        }
                    });
                    return Data;
                };
            }
        })(jQuery, window, document);
        var applySelectorsOnMutation = (function ($, window, document, undefined) {
            var applySelectorsOnMutation = function () {
                if (!window.___selectors) {
                    window.___selectors = new AddSkuSelector();
                }
                var target = document.querySelectorAll('[id*=ResultItems]');
                var config = {
                    subtree: true,
                    childList: true
                };
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        if ("childList" === mutation.type && /_product/ig.test(mutation.target.className)) {
                            var _prd = $(mutation.target).parents('._prd');
                            window.___selectors.applySelector(_prd);
                        }
                    });
                });
                target.forEach(function (t) {
                    observer.observe(t, config);
                    return true;
                });
                return true;
            };
            $(window).on('load', applySelectorsOnMutation);
            return applySelectorsOnMutation;
        })(jQuery, window, document);
        var addSkus = (function ($, window, document, undefined) {
            var applyAllSelectors = function () {
                if (!window.___selectors) {
                    window.___selectors = new AddSkuSelector();
                }
                $('._prd').each(function (ndx, item) {
                    window.___selectors.applySelector(item);
                });
            };
            $(window).on('load', applyAllSelectors);
            return applyAllSelectors;
        })(jQuery, window, document);
        // END: SKU SLECTOR
    },
    optinClube(){
        const checkboxContainer = document.querySelector('.newsletter');
        const optin = `
        
        <label class="checkbox newsletter-label">
            <input type="checkbox" id="opt-in-clube">
            <span class="newsletter-text">Quero fazer parte do nosso clube.</span>
        </label>`

        const optinCheckbox = document.querySelector("#opt-in-clube");
            optinCheckbox === null ? checkboxContainer.innerHTML += optin : null;

        function sendOptinMasterData(){
            // const goToPayment = document.querySelector('#go-to-payment');
            // goToPayment.addEventListener('click', (ev) => {
                // ev.preventDefault();
                const userOptinClube = {
                    "optinClube": optinCheckbox.checked ? true : false
                };
                const header = new Headers();
                header.append('Content-Type', 'x-www-form-urlencoded');
                header.append('accept', 'application/vnd.vtex.ds.v10+json');
                // header.append(table, "CL");
                // const url = 'qbbr.vtexcommercestable.com.br/api/dataentities/CL/documents';
                const url = 'https://botiwall.corebiz.com.br/CL/update'
                const vtexHeaderConfig = {
                    method: 'PUT',
                    mode: 'cors',
                    headers: header,
                    body: JSON.stringify(userOptinClube)
                };
                fetch(url, vtexHeaderConfig)
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data)
                        alert('enviado');     
                    }).catch(() => {
                        alert('Ocorreu um erro! tente novamente');
                    });
            // });
        }
        sendOptinMasterData();
    }
}

export default {
    init: Methods.init
}
