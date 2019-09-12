// const Methods = {
//     init() {
//         Methods.allMinicartInit();
//     },
//     allMinicartInit() {

//         /*accentsTidy*/
//         String.prototype.accentsTidy = function () {
//             var a = this.trim();
//             a = a.replace(/,/g, " ");
//             a = a.replace(/\s+/g, " ");
//             a = a.replace(/(\s|&|\?)/g, "-");
//             a = a.replace(/\u00e7/g, "c");
//             a = a.replace(/\u00f1/g, "n");
//             a = a.replace(/\u00c7/g, "C");
//             a = a.replace(/\u00d1/g, "N");
//             a = a.replace(/[\u00c3\u00c2\u00c1\u00c0\u00c4]/g, "A");
//             a = a.replace(/[\u00c9\u00c8\u00cb]/g, "E");
//             a = a.replace(/[\u00cd\u00cc\u00cf]/g, "I");
//             a = a.replace(/[\u00d5\u00d4\u00d3\u00d2\u00d6]/g, "O");
//             a = a.replace(/[\u00da\u00d9]/g, "U");
//             a = a.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g, "a");
//             a = a.replace(/[\u00e8\u00e9\u00ea\u00eb]/g, "e");
//             a = a.replace(/[\u00ec\u00ed\u00ee\u00ef]/g, "i");
//             a = a.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g, "o");
//             a = a.replace(/[\u00f9\u00fa\u00fb\u00fc]/g, "u");
//             return a
//         };
//         var runOnViewportScroll = (function (Cb, Namespace, Multiplier) {
//             'use strict'
//             return function (Cb, Namespace, Multiplier) {
//                 if ("function" !== typeof Cb || "undefined" === typeof Namespace) {
//                     return false;
//                 }
//                 // viewport height * m = how much to scroll before run
//                 var m = Multiplier || 1;
//                 var ns = 'scroll.' + Namespace;
//                 var vph = Math.floor($(window).height() * m);
//                 var f = function () {
//                     var wst = $(window).scrollTop();
//                     wst > vph &&
//                         $(window).off(ns) &&
//                         "function" === typeof Cb && Cb();
//                 };
//                 $(window).off(ns).on(ns, f);
//             };
//         })();

//         var getSearchQuery = function () {
//             return document.location.search.replace(/\?/, '').split(/&/).map(function (d) {
//                 var dt = d.split(/=/);
//                 var obj = {};
//                 obj[dt[0]] = dt[1];
//                 return obj;
//             });
//         };
//         // var getUtmSource = function(){ var q = getSearchQuery(); if(q.length>0){ return q.reduce(function(d){ if(!!d.utm_source) return "" }); } return []; };
//         /** 201810290916 */
//         var Utls = function (e, h, k, l) {
//             return function () {
//                 var c = this;
//                 c.getSkus = function (a) {
//                     var b = e.Deferred();
//                     if ("undefined" === a) return b.reject("Missing product id."), b.promise();
//                     if (c.getSkus.data[a]) return b.resolve(c.getSkus.data[a]), b.promise();
//                     vtexjs.catalog.getProductWithVariations(a).fail(function (d) {
//                         c.getSkus.data[a] = [];
//                         b.reject("Product id not found.")
//                     }).done(function (d) {
//                         c.getSkus.data[a] = {
//                             id: d.productId,
//                             name: d.name,
//                             skus: d.skus.slice(),
//                             salesChannel: d.salesChannel,
//                             available: d.available
//                         };
//                         b.resolve(c.getSkus.data[a])
//                     });
//                     return b.promise()
//                 };
//                 c.getSkus.data = {};
//                 c.getSkuList = function (a) {
//                     if ("undefined" === a || "undefined" !== a && !(a instanceof Array)) return a = new Promise(function (a, c) {
//                         c("Missing list of product id. eg. [1, 45, 83].")
//                     }), Promise.all([a]);
//                     var b = [],
//                         d = {};
//                     e.each(a, function (a, f) {
//                         var g = new Promise(function (a, b) {
//                             c.getSkuList.data[f] ? a(c.getSkuList.data) : c.getSkus(f).then(function (b) {
//                                 d[f] = e.extend({}, b);
//                                 c.getSkuList.data = e.extend({}, d, c.getSkuList.data);
//                                 a(c.getSkuList.data)
//                             }, function (a) {
//                                 b("Product id not found.")
//                             })
//                         });
//                         b.push(g)
//                     });
//                     return Promise.all(b)
//                 };
//                 c.getSkuList.data = {};
//                 c.getInfo = function (a) {
//                     var b = e.Deferred();
//                     if ("undefined" === a) return b.reject("Missing product id."), b.promise();
//                     var d = "/api/catalog_system/pub/products/search/?fq=productId:" + a;
//                     if (c.getInfo.data[a]) return b.resolve(c.getInfo.data[a]), b.promise();
//                     e.ajax({
//                         url: d,
//                         success: function (d) {
//                             c.getInfo.data[a] = d;
//                             b.resolve(c.getInfo.data[a])
//                         },
//                         error: function (d) {
//                             c.getInfo.data[a] = [];
//                             b.reject("Product id not found.")
//                         }
//                     });
//                     return b.promise()
//                 };
//                 c.getInfo.data = {};
//                 c.addProducts =
//                     function (a) {
//                         var b = e.Deferred();
//                         if ("undefined" === a || "undefined" !== a && !(a instanceof Array)) return b.reject("Missing array of objects. eg. [{ id: 1 }, { id: 2, quantity: 2 }]"), b.promise();
//                         var c = [];
//                         e.each(a, function (a, b) {
//                             var d = Object.assign({
//                                 id: 0,
//                                 quantity: 1,
//                                 seller: 1
//                             }, b);
//                             c.push(d)
//                         });
//                         vtexjs.checkout.addToCart(c).fail(function (a) {
//                             b.reject(a)
//                         }).done(function (a) {
//                             b.resolve(a)
//                         });
//                         return b.promise()
//                     };
//                 "undefined" !== typeof console && "undefined" !== typeof console.log && (c.__log = console.log);
//                 return !0
//             }
//         }(jQuery, window,
//             document);
//         /** insert scripts that should run in all pages */
//         var CreateMenu = (function ($, window, document, undefined) {
//             "use strict";
//             var mountMenu = function (arr, html) {
//                 if (!html) {
//                     html = [];
//                 }
//                 html.push('<ul>');
//                 arr.forEach(function (menu) {
//                     if (menu.off) return true;
//                     var menuLink = '<a>',
//                         li = '<li>',
//                         menuLinkClosingTag = "</a>";
//                     if (menu.link) {
//                         menuLink = '<a href="' + menu.link + '">';
//                     }
//                     if (menu.class && menu.class instanceof Array) {
//                         li = '<li class="' + menu.class.join(" ") + '">';
//                     }
//                     html.push(li + menuLink + menu.text + menuLinkClosingTag);
//                     if (menu.menu) {
//                         mountMenu(menu.menu, html);
//                     }
//                     html.push('</li>');
//                 });
//                 html.push('</ul>');
//                 return html.join("");
//             };
//             var CreateMenu = function (Data) {
//                 var menuHtml = mountMenu(Data);
//                 return menuHtml;
//             };
//             return CreateMenu;
//         })(jQuery, window, document);
//         /*mini cart list of products*/
//         (function ($, window, document, undefined) {
//             var _mProdsTemplate = {
//                 cart: "<div class='mr-minicart'>{%CART%}</div>",
//                 promo: "<div class=\"mr-shipping\"><div class=\"mr-shipping-lbl-container\"><span class=\"mr-shipping-lbl\">{%PROMOMSG%}</span></div><div class=\"mr-shipping-pb-container\" {%PROMOBAR%}><span class=\"mr-progress-bar\"><small {%PROMOSTYLE%}></small></span></div> </div>",
//                 footer: "<div class='mr-footer'>{%FOOTER%}</div>",
//                 totals: "<div class='mr-totals'>" +
//                     "<div class='mr-total mr-discounts'><span class='mr-lbl'>Descontos:</span><span class='mr-discount-val'>{%DISCOUNT%}</span></div>" +
//                     "<div class='mr-total'><span class='mr-lbl'>Total:</span><span class='mr-total-val'>{%TOTAL%}</span></div>" +
//                     "<div class='mr-goto-cart'><a href='/checkout/#/cart'>Fechar pedido</a></div>" +
//                     "</div>",
//                 list: "<div class='mr-prod-list-wrapper'><div class='mr-prod-list'>{%ITEMS%}</div></div>",
//                 item: "<div class='mr-prod-item'>" +
//                     "<a class='mr-link' href='{%LINK%}'>" +
//                     "<span class='mr-img'><img src='{%IMG%}'/></span>" +
//                     "<span class='mr-prod-brand'>{%BRAND%}</span>" +
//                     "<span class='mr-prod-name'>{%NAME%}</span>" +
//                     "<span class='mr-prod-qty'>Qtde: <small>{%QTY%}</small></span>" +
//                     "<span class='mr-prod-price'><em>{%PRICE%}</em></span>" +
//                     "</a>" +
//                     "<a class='mr-rm __close-icon-black' {%REMOVE%}>X</a>" +
//                     "</div>",
//                 emptyCart: "<div class=\"mr-empty\"><div class=\"mr-msg\">Não há produtos em sua sacola.</div><div class=\"mr-suggestions\"></div></div>"
//             };

//             var mProdsList = function (elem, options) {
//                 var _mProdsListContainer = elem;
//                 var mProdsOpt = $({}, options);
//                 var _mProdsList = {
//                     qtyProds: 0,
//                     discounts: 0,
//                     totalPrice: 0,
//                     items: [],
//                     on_off_class: 'cart-show',
//                     formatMoney: function (number, a, d, c) {
//                         var b = number;
//                         a = isNaN(a = Math.abs(a)) ? 2 : a;
//                         d = void 0 == d ? "." : d;
//                         c = void 0 == c ? "," : c;
//                         var h = 0 > b ? "-" : "",
//                             g = parseInt(b = Math.abs(+b || 0).toFixed(a)) + "",
//                             f = 3 < (f = g.length) ? f % 3 : 0;
//                         return h + (f ? g.substr(0, f) + c : "") + g.substr(f).replace(/(\d{3})(?=\d)/g, "$1" + c) + (a ? d + Math.abs(b - g).toFixed(a).slice(2) : "")
//                     },
//                     init: function () {
//                         if (_mProdsList.get.vtexjs()) {
//                             _mProdsList.get.items();

//                         }
//                         return true;
//                     },
//                     set: {
//                         events: function () {
//                             var eventName = 'click.Minicart';
//                             $(_mProdsListContainer).find('.close').unbind(eventName).bind(eventName, function () {
//                                 $('html').removeClass(_mProdsList.on_off_class);
//                             });
//                             return true;
//                         },
//                         hasProds: function () {
//                             var qtyItems = _mProdsListContainer.data('items') || 0;
//                             if (qtyItems > 0) {
//                                 $('html').addClass('cart-has-products');
//                             } else {
//                                 $('html').removeClass('cart-has-products');
//                             }
//                             return true;
//                         }
//                     },
//                     get: {
//                         vtexjs: function () {
//                             if ("object" !== typeof (vtexjs)) {
//                                 $.getScript('http://io.vtex.com.br/vtex.js/2.3.0/vtex.js', function () {
//                                     _mProdsList.init();
//                                 });
//                             } else {
//                                 return true;
//                             }
//                             return true;
//                         },
//                         items: function () {
//                             if ("undefined" === typeof vtexjs) return false;
//                             vtexjs.checkout.getOrderForm().then(function (orderForm) {
//                                 window.order = orderForm;
//                                 _mProdsList.items = orderForm.items;
//                                 _mProdsList.discounts = orderForm.totalizers && orderForm.totalizers.length > 0 && orderForm.totalizers[1] != undefined && orderForm.totalizers[1].hasOwnProperty("id") & orderForm.totalizers[1].id == "Discounts" && _orderForm.totalizers[1].value != 0 ? orderForm.totalizers[1].value : 0;
//                                 // console.log(_mProdsList.discounts)
//                                 _mProdsList.totalPrice = orderForm.totalizers && orderForm.totalizers.length > 0 && orderForm.totalizers[0].value ? orderForm.totalizers[0].value : 0;
//                                 _mProdsListContainer.data('total', 1 * (_mProdsList.totalPrice / 100));
//                                 _mProdsList.mount();
//                             });
//                             return true;
//                         },
//                         money: function (number) {
//                             return "R$ " + _mProdsList.formatMoney(number, 2, ",", ".");
//                         },
//                         promo: function () {
//                             var cartData = $('._mini-cart-data script').text().split('\n');
//                             if (cartData.length < 3) {
//                                 return {
//                                     msg: "",
//                                     value: 0,
//                                     percentage: 0,
//                                     style: ""
//                                 };
//                             } else {
//                                 var msg = cartData[1],
//                                     val = 1 * cartData[0] * 100;
//                                 if (!isFinite(val)) {
//                                     return false;
//                                 }
//                                 var percentage = Math.round(_mProdsList.totalPrice / val * 100);
//                                 var res = val >= _mProdsList.totalPrice ? (val - _mProdsList.totalPrice) / 100 : 0;
//                                 // console.log('res',res)
//                                 if (res > 0) {
//                                     msg = msg.replace(/{%VALOR%}/, _mProdsList.get.money(res));
//                                 }
//                                 var style = "style=\"width:" + percentage + "%;\"";
//                                 if (percentage >= 100) {
//                                     msg = cartData[2];
//                                 }
//                             }
//                             return {
//                                 msg: msg,
//                                 value: val,
//                                 percentage: percentage,
//                                 style: style
//                             };
//                         }
//                     },
//                     mount: function () {
//                         var items = '',
//                             item = '';
//                         var qtyItems = 0;
//                         if (_mProdsList.items.length > 0) {
//                             var index = _mProdsList.items.length - 1;
//                             for (var i in _mProdsList.items.reverse()) {
//                                 if (_mProdsList.items.hasOwnProperty(i)) {
//                                     var price = _mProdsList.get.money(_mProdsList.items[i].price / 100);
//                                     qtyItems = qtyItems + (1 * _mProdsList.items[i].quantity);
//                                     item = _mProdsTemplate.item
//                                         .replace(/{%LINK%}/, _mProdsList.items[i].detailUrl)
//                                         .replace(/{%IMG%}/, _mProdsList.items[i].imageUrl)
//                                         .replace(/{%BRAND%}/, _mProdsList.items[i].additionalInfo.brandName)
//                                         .replace(/{%NAME%}/, _mProdsList.items[i].name)
//                                         .replace(/{%QTY%}/, _mProdsList.items[i].quantity)
//                                         .replace(/{%PRICE%}/, price);
//                                     item = item.replace(/mr-prod-item/, "mr-prod-item _mr-prod-item-" + index);
//                                     if (_mProdsList.items[i].isGift) {
//                                         item = item.replace(/mr-prod-item/, "mr-prod-item _gift")
//                                             .replace(/{%REMOVE%}/, 'onclick="mProdsList.gift(' + index + ');"');
//                                     } else {
//                                         item = item.replace(/{%REMOVE%}/, 'onclick="mProdsList.del(this,' + index + ');"');
//                                     }
//                                     items += item;
//                                     index--;
//                                 }
//                             }
//                             var cart = _mProdsTemplate.list
//                                 .replace('{%ITEMS%}', items);
//                             var promo = _mProdsList.get.promo();
//                             var footerContent = '';
//                             if (promo && isFinite(promo.value) && promo.value > 0) {
//                                 footerContent += _mProdsTemplate.promo
//                                     .replace('{%PROMOMSG%}', promo.msg)
//                                     .replace('{%PROMOSTYLE%}', promo.style);
//                                 if (promo.percentage >= 100) {
//                                     footerContent = footerContent.replace('{%PROMOBAR%}', "style=\"display:none;\"");
//                                 }
//                             }
//                             var totalValue = 'R$' + ((_mProdsList.totalPrice / 100) + (_mProdsList.discounts / 100)).toFixed(2).replace('.', ',');
//                             var discountValue = "-R$" + (_mProdsList.discounts / 100).toFixed(2).replace('.', ',').replace('-', '')

//                             footerContent += _mProdsTemplate.totals
//                                 .replace('{%TOTAL%}', totalValue)
//                                 .replace('{%DISCOUNT%}', discountValue);
//                             cart += _mProdsTemplate.footer.replace('{%FOOTER%}', footerContent);
//                             _mProdsListContainer.removeClass('__cart-empty __cart-loading');
//                         } else {
//                             cart = _mProdsTemplate.emptyCart;
//                             _mProdsListContainer.removeClass('__cart-loading');
//                             _mProdsListContainer.addClass('__cart-empty');
//                         }
//                         cart = _mProdsTemplate.cart.replace('{%CART%}', cart);
//                         var _cart = $(cart);
//                         _cart.find(".mr-prod-item:not('._gift')").wrapAll('<div class="mr-prod-items"></div>');
//                         _cart.find("._gift").wrapAll('<div class="mr-gifts"></div>');
//                         _cart.find('.mr-gifts').prepend('<div class="mr-gifts-lbl">Você ganhou!</div>');
//                         _mProdsListContainer.data('items', qtyItems);
//                         _mProdsListContainer.html(_cart);
//                         _mProdsList.set.hasProds();
//                         _mProdsList.set.events();
//                         return true;
//                     },
//                     del: function (target, ndx) {
//                         if ("undefined" === typeof vtexjs) return false;
//                         $(target).parent().addClass('__mr-deleting');
//                         vtexjs.checkout.getOrderForm().then(function (orderForm) {
//                             var item = orderForm.items[ndx];
//                             item.index = ndx;
//                             return vtexjs.checkout.removeItems([item]);
//                         }).done(function (orderForm) {
//                             _mProdsList.refresh();
//                             _mProdsList.set.hasProds();
//                         });
//                         return true;
//                     },
//                     gift: function (ndx) {
//                         // console.log('Brinde não pode ser removido.');
//                         return true;
//                     },
//                     refresh: function () {
//                         _mProdsList.init();
//                         return true;
//                     }
//                 };
//                 _mProdsList.init(options);
//                 window.mProdsList = {
//                     init: _mProdsList.init,
//                     refresh: _mProdsList.refresh,
//                     items: function () {
//                         return _mProdsListContainer.data('items');
//                     },
//                     total: function () {
//                         return _mProdsListContainer.data('total');
//                     },
//                     del: _mProdsList.del,
//                     gift: _mProdsList.gift
//                 };
//             };
//             $.fn.mProdsList = function (options) {
//                 return mProdsList(this, options);
//             };
//         })(jQuery, window, document);
//         /*mMinicart*/
//         /*set up mini cart and change values*/
//         (function ($, window, document, undefined) {
//             $.fn.mMinicart = function (options) {
//                 var _elem = $(this);
//                 var mMinicartOpts = $.extend({
//                     'descontos': '.mr-discount-val',
//                     'items': '.amount-items-em',
//                     'total': '.total-cart-em'
//                 }, options);
//                 var _mMinicart = {
//                     init: function () {
//                         _elem.mProdsList();
//                         return true;
//                     },
//                     refresh: function () {
//                         mProdsList.refresh();
//                         $(mMinicartOpts.descontos).text(mProdsList.discounts())
//                         $(mMinicartOpts.items).text(mProdsList.items());
//                         $(mMinicartOpts.total).text(mProdsList.total());

//                         return true;
//                     }
//                 };
//                 _mMinicart.init();
//                 window.mMinicart = {
//                     refresh: _mMinicart.refresh,
//                     items: function () {
//                         return mProdsList.items();
//                     },
//                     total: function () {
//                         return mProdsList.total();
//                     }
//                 };
//             };
//         })(jQuery, window, document);
//         var SuperMenu = (function ($, window, document, undefined) {
//             "use strict";

//             /*menu mobile slide options to the left/right*/
//             var SuperMenu = {
//                 mainContainer: '.SuperMenu',
//                 speed: 200,
//                 padding: 0,
//                 onOffClass: '__menu-show',
//                 init: function () {
//                     SuperMenu.set.events.all();
//                     SuperMenu.set.hasChildren();
//                     return true;
//                 },
//                 set: {
//                     events: {
//                         all: function () {
//                             SuperMenu.set.events.menu();
//                             SuperMenu.set.events.openMenu();
//                             SuperMenu.set.events.closeMenu();
//                             return true;
//                         },
//                         menu: function () {
//                             var eventName = 'click.Interface';
//                             $('._super-menu a')
//                                 .off(eventName).on(eventName, function () {
//                                     var _item = $(this);
//                                     if (_item.siblings().length > 0) {
//                                         $('._super-menu .__super-menu-last')
//                                             .removeClass('__super-menu-last');
//                                         _item.addClass('__super-menu-last');
//                                         $('.__super-menu-on').removeClass('__super-menu-on');
//                                         _item.parent().addClass('__super-menu-on');
//                                         $('._super-menu-options').html(_item.clone(false));
//                                         SuperMenu.set.events.menuSelected();
//                                         $(SuperMenu.mainContainer).parent().addClass('__submenu-show');
//                                     }
//                                     $('._super-menu').scrollTop(0);
//                                     $('.SidebarLeft').scrollTop(0);
//                                 });
//                             $('._super-menu .__close-submenu').off('click.Interface').on('click.Interface', function (e) {
//                                 SuperMenu.close.submenu();
//                             });
//                             return true;
//                         },
//                         menuSelected: function () {
//                             var eventName = 'click.Interface';
//                             $('._super-menu-options a').not('.__act').addClass('__act')
//                                 .off(eventName).on(eventName, SuperMenu.close.submenu);
//                             return true;
//                         },
//                         openMenu: function () {
//                             $('html').off('open.SuperMenu').on('open.SuperMenu', function (e) {
//                                 if ($('html').hasClass(SuperMenu.onOffClass)) {
//                                     SuperMenu.close.menu();
//                                 } else {
//                                     SuperMenu.open.menu();
//                                 }
//                             });
//                             return true;
//                         },
//                         closeMenu: function () {
//                             $('html').off('close.SuperMenu').on('close.SuperMenu', function (e) {
//                                 SuperMenu.close.menu();
//                             });
//                             return true;
//                         }
//                     },
//                     hasChildren: function () {
//                         $('._super-menu a').each(function (x, i) {
//                             if ($(i).siblings().length > 0)
//                                 $(i).addClass('__hasChildren');
//                         });
//                         return true;
//                     }
//                 },
//                 open: {
//                     menu: function () {
//                         $('html').addClass(SuperMenu.onOffClass);
//                         return true;
//                     }
//                 },
//                 close: {
//                     menu: function () {
//                         $('html').removeClass(SuperMenu.onOffClass);
//                         $('.__super-menu-last').removeClass('__super-menu-last');
//                         $('.__super-menu-on').removeClass('__super-menu-on');
//                         SuperMenu.close.submenu();
//                         return true;
//                     },
//                     submenu: function () {
//                         var _item = $('._super-menu-options > *');
//                         $('.__submenu-show').removeClass('__submenu-show');
//                         $('.__super-menu-on').removeClass('__super-menu-on');
//                     }
//                 }
//             };
//             // $(SuperMenu.init);

//             return SuperMenu;
//         })(jQuery, window, document);
//         (function ($, window, document, undefined) {
//             "use strict";
//             var updateItemsMiniCart = function () {
//                 vtexjs.checkout.getOrderForm().done(function (orderForm) {
//                     window._orderForm = orderForm;
//                     var qty = 0;
//                     $(orderForm.items).each(function (ndx, item) {
//                         if (!item.isGift) {
//                             qty += item.quantity;
//                         }
//                     });
//                     if (isFinite(qty)) {
//                         $('.__cart-link a span').text(qty);
//                     }
//                 });

//                 return true;
//             };

//             function showCouponActive() {
//                 const title = document.querySelector('.__cartTitle')
//                 const couponActive = vtexjs.checkout.orderForm.marketingData.coupon;
//                 if (couponActive != null) {
//                     title.textContent = `Cupom ativo: ${couponActive}`
//                 }
//             }
//             var isLogged = function () {
//                 var logged = false;
//                 $(dataLayer).each(function (ndx, item) {
//                     if (!!item.visitorLoginState) {
//                         logged = item.visitorLoginState;
//                     }
//                 });
//                 return logged;
//             };
//             var loggedOnOff = function () {
//                 if (isLogged()) {
//                     $('html').addClass('__user-logged');
//                 } else {
//                     $('html').removeClass('__user-logged');
//                 }
//                 return true;
//             };
//             var getBannerPromoHeight = function () {
//                 var _bannerPromo = $('._banner-promo');
//                 if (_bannerPromo.length <= 0) return 0;
//                 return _bannerPromo.outerHeight();
//             };
//             var slideStripBannerOnOff = function () {
//                 var bc = $('._banner-promo').children().length;
//                 if (bc > 0) {
//                     $('._banner-promo').addClass('_on');
//                 }
//                 if (bc > 1) {
//                     $('._banner-promo').addClass('_animated');
//                 }
//                 return true;
//             };
//             var setTopLinksOnOff = function () {
//                 $('._top-bar-links > * > a').off('click.Interface').on('click.Interface', function (e) {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     var same = $(this).parent().hasClass('__on');
//                     $('._top-bar-links > *').removeClass('__on');
//                     if (!same) {
//                         $(this).parent().addClass('__on');
//                     }
//                 });
//                 $(window).off('click.Interface_TL').on('click.Interface_TL', function (e) {
//                     $('._top-bar-links > *').removeClass('__on');
//                 });
//                 return true;
//             };
//             var setLinksOnOff = function () {
//                 $('._sidebarleft-links').each(function (ndx, item) {
//                     $(item).find('> *:first').off('click.Interface').on('click.Interface', function (e) {
//                         $(this).parent().toggleClass('__links-show');
//                     });
//                 });
//                 return true;
//             };
//             var setBannerPromo = function () {
//                 var _bannerPromo = $('._banner-promo');
//                 if (_bannerPromo.length <= 0) return false;
//                 _bannerPromo.off('click.BannerPromo').on('click.BannerPromo', function (e) {
//                     $('html').addClass('__promo-banner-off');
//                 });
//                 return true;
//             };
//             var miniCartEvents = function () {
//                 $('html').off('open.MiniCart').on('open.MiniCart', function (e) {
//                     e.preventDefault();

//                     if ("function" === typeof $.fn.mMinicart) {
//                         $('._minicartBody').mMinicart();
//                         $('html').addClass('__cart-show');

//                     }
//                 });
//                 $('html').off('close.MiniCart').on('close.MiniCart', function (e) {
//                     $('html').removeClass('__cart-show');
//                 });
//                 $('.__cart-link').off('click.Cart').on('click.Cart', function (e) {
//                     e.preventDefault();
//                     $('html').trigger('open.MiniCart');
//                     // showCouponActive();

//                 });
//                 $('.__close-cart').off('click.Cart').on('click.Cart', function (e) {
//                     e.preventDefault();
//                     $('html').trigger('close.MiniCart');
//                 });
//                 return true;
//             };
//             var superMenuStart = {
//                 _menuContainer: '.SuperMenu ._super-menu',
//                 init: function () {
//                     if (superMenuStart.menu.mount()) {
//                         superMenuStart.set.events();
//                     }
//                     return true;
//                 },
//                 set: {
//                     events: function () {
//                         superMenuStart.set.menu.open();
//                         superMenuStart.set.menu.close();
//                         return true;
//                     },
//                     menu: {
//                         open: function () {
//                             $('._menu-cat').off('click.Menu').on('click.Menu', function (e) {
//                                 e.preventDefault();
//                                 $('html').trigger('open.SuperMenu');
//                             });
//                             return true;
//                         },
//                         close: function () {
//                             $('._super-menu-close').off('click.Menu').on('click.Menu', function () {
//                                 $('html').trigger('close.SuperMenu');
//                             });
//                             return true;
//                         }
//                     }
//                 },
//                 menu: {
//                     mount: function () {
//                         if ("function" !== typeof CreateMenu) return false;
//                         var menu = CreateMenu(menuData);
//                         $(superMenuStart._menuContainer).html(menu);
//                         return true;
//                     }
//                 }
//             };
//             var addListenerToAllFloats = function () {
//                 $('html').off('close.AllFloats').on('close.AllFloats', function (e) {
//                     $('html').trigger('close.SuperMenu');
//                     $('html').trigger('close.MiniCart');
//                     $('._top-bar .__on').removeClass('__on');
//                 });
//             };
//             var addOverlay = function () {
//                 var _overlay = $('<div class="__overlay"></div>');
//                 if ($('body .__overlay').length > 0) _overlay = $('body .__overlay');
//                 _overlay.html('<div class="__overlay-bkg"></div>');
//                 _overlay.off('click.Interface')
//                     .on('click.Interface', function (e) {
//                         $('html').trigger('close.AllFloats');
//                     });
//                 $('body').filter(function () {
//                     return $('.__overlay').length <= 0
//                 }).append(_overlay);
//                 return true;
//             };
//             var fixTopHeader = function () {
//                 $('html').addClass('_d-top');
//                 $('input.search-btn').addClass('_d-search');
//                 $('._header').removeClass('_d-top');
//                 return true;
//             };
//             var collapseHeaderOnOff = function () {
//                 $(window).off('scroll').on('scroll', function () {

//                     var _top = $(window).scrollTop();
//                     if (_top > 30) {
//                         $('html').removeClass('_d-top');
//                         $('input.search-btn').removeClass('_d-search');
//                     } else {
//                         $('html').addClass('_d-top');
//                         $('input.search-btn').addClass('_d-search');
//                         $('._header-search-bar').removeClass('activeHeaderSearch')
//                     }
//                 });
//                 return true;
//             };
//             var blackfridayUTM = function () {
//                 if (/blackfriday/.test(getUtmSource().utm_source)) $('html').addClass('_black-friday');
//                 return true;
//             };

//             var startHomeScripts = function () {
//                 if ($('header._header').length < 0) return false; // no header, nothing to do
//                 if (/utm_source=newheader/.test(document.location.search)) {
//                     $('header.header').remove();
//                 } // remover esta linha em produ��o
//                 fixTopHeader();
//                 loggedOnOff();
//                 addListenerToAllFloats();
//                 addOverlay();
//                 superMenuStart.init();
//                 SuperMenu.init();
//                 miniCartEvents();
//                 setBannerPromo();
//                 setLinksOnOff();
//                 setTopLinksOnOff();
//                 slideStripBannerOnOff();
//                 collapseHeaderOnOff();
//                 updateItemsMiniCart();
//                 // blackfridayUTM();

//                 return true;
//             };

//             startHomeScripts();

//             return {
//                 closeAllFloats: function (e) {
//                     $('html').trigger('close.AllFloats');
//                 }
//             };

//         })(jQuery, window, document);

//     }
// }

// export default {
//     init: Methods.init
// }
