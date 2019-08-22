(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/*mini cart list of products*/
(function ($, window, document, undefined) {
    var _mProdsTemplate = {
        cart: "<div class='mr-minicart'>{%CART%}</div>",
        promo: "<div class=\"mr-shipping\"><div class=\"mr-shipping-lbl-container\"><span class=\"mr-shipping-lbl\">{%PROMOMSG%}</span></div><div class=\"mr-shipping-pb-container\" {%PROMOBAR%}><span class=\"mr-progress-bar\"><small {%PROMOSTYLE%}></small></span></div> </div>",
        footer: "<div class='mr-footer'>{%FOOTER%}</div>",
        totals: "<div class='mr-totals'>" + "<div class='mr-total'><span class='mr-lbl'>Total:</span><span class='mr-total-val'>{%TOTAL%}</span></div>" + "<div class='mr-goto-cart'><a href='/checkout/#/cart'>Fechar pedido</a></div>" + "</div>",
        list: "<div class='mr-prod-list-wrapper'><div class='mr-prod-list'>{%ITEMS%}</div></div>",
        item: "<div class='mr-prod-item'>" + "<a class='mr-link' href='{%LINK%}'>" + "<span class='mr-img'><img src='{%IMG%}'/></span>" + "<span class='mr-prod-brand'>{%BRAND%}</span>" + "<span class='mr-prod-name'>{%NAME%}</span>" + "<span class='mr-prod-qty'>Qtde: <small>{%QTY%}</small></span>" + "<span class='mr-prod-price'><em>{%PRICE%}</em></span>" + "</a>" + "<a class='mr-rm __close-icon-black' {%REMOVE%}>X</a>" + "</div>",
        emptyCart: "<div class=\"mr-empty\"><div class=\"mr-msg\">Não há produtos em sua sacola.</div><div class=\"mr-suggestions\"></div></div>"
    };

    var mProdsList = function mProdsList(elem, options) {
        var _mProdsListContainer = elem;
        var mProdsOpt = $({}, options);
        var _mProdsList = {
            qtyProds: 0,
            totalPrice: 0,
            items: [],
            on_off_class: 'cart-show',
            formatMoney: function formatMoney(number, a, d, c) {
                var b = number;
                a = isNaN(a = Math.abs(a)) ? 2 : a;
                d = void 0 == d ? "." : d;
                c = void 0 == c ? "," : c;
                var h = 0 > b ? "-" : "",
                    g = parseInt(b = Math.abs(+b || 0).toFixed(a)) + "",
                    f = 3 < (f = g.length) ? f % 3 : 0;
                return h + (f ? g.substr(0, f) + c : "") + g.substr(f).replace(/(\d{3})(?=\d)/g, "$1" + c) + (a ? d + Math.abs(b - g).toFixed(a).slice(2) : "");
            },
            init: function init() {
                if (_mProdsList.get.vtexjs()) {
                    _mProdsList.get.items();
                }
                return true;
            },
            set: {
                events: function events() {
                    var eventName = 'click.Minicart';
                    $(_mProdsListContainer).find('.close').unbind(eventName).bind(eventName, function () {
                        $('html').removeClass(_mProdsList.on_off_class);
                    });
                    return true;
                },
                hasProds: function hasProds() {
                    var qtyItems = _mProdsListContainer.data('items') || 0;
                    if (qtyItems > 0) {
                        $('html').addClass('cart-has-products');
                    } else {
                        $('html').removeClass('cart-has-products');
                    }
                    return true;
                }
            },
            get: {
                vtexjs: function (_vtexjs) {
                    function vtexjs() {
                        return _vtexjs.apply(this, arguments);
                    }

                    vtexjs.toString = function () {
                        return _vtexjs.toString();
                    };

                    return vtexjs;
                }(function () {
                    if ("object" !== (typeof vtexjs === "undefined" ? "undefined" : _typeof(vtexjs))) {
                        $.getScript('http://io.vtex.com.br/vtex.js/2.3.0/vtex.js', function () {
                            _mProdsList.init();
                        });
                    } else {
                        return true;
                    }
                    return true;
                }),
                items: function items() {
                    if ("undefined" === typeof vtexjs) return false;
                    vtexjs.checkout.getOrderForm().then(function (orderForm) {
                        window.order = orderForm;
                        _mProdsList.items = orderForm.items;
                        _mProdsList.totalPrice = orderForm.totalizers && orderForm.totalizers.length > 0 && orderForm.totalizers[0].value ? orderForm.totalizers[0].value : 0;
                        _mProdsListContainer.data('total', 1 * (_mProdsList.totalPrice / 100));
                        _mProdsList.mount();
                    });
                    return true;
                },
                money: function money(number) {
                    return "R$ " + _mProdsList.formatMoney(number, 2, ",", ".");
                },
                promo: function promo() {
                    var cartData = $('._mini-cart-data script').text().split('\n');
                    if (cartData.length < 3) {
                        return {
                            msg: "",
                            value: 0,
                            percentage: 0,
                            style: ""
                        };
                    } else {
                        var msg = cartData[1],
                            val = 1 * cartData[0] * 100;
                        if (!isFinite(val)) {
                            return false;
                        }
                        var percentage = Math.round(_mProdsList.totalPrice / val * 100);
                        var res = val >= _mProdsList.totalPrice ? (val - _mProdsList.totalPrice) / 100 : 0;
                        if (res > 0) {
                            msg = msg.replace(/{%VALOR%}/, _mProdsList.get.money(res));
                        }
                        var style = "style=\"width:" + percentage + "%;\"";
                        if (percentage >= 100) {
                            msg = cartData[2];
                        }
                    }
                    return {
                        msg: msg,
                        value: val,
                        percentage: percentage,
                        style: style
                    };
                }
            },
            mount: function mount() {
                var items = '',
                    item = '';
                var qtyItems = 0;
                if (_mProdsList.items.length > 0) {
                    var index = _mProdsList.items.length - 1;
                    for (var i in _mProdsList.items.reverse()) {
                        if (_mProdsList.items.hasOwnProperty(i)) {
                            var price = _mProdsList.get.money(_mProdsList.items[i].price / 100);
                            qtyItems = qtyItems + 1 * _mProdsList.items[i].quantity;
                            item = _mProdsTemplate.item.replace(/{%LINK%}/, _mProdsList.items[i].detailUrl).replace(/{%IMG%}/, _mProdsList.items[i].imageUrl).replace(/{%BRAND%}/, _mProdsList.items[i].additionalInfo.brandName).replace(/{%NAME%}/, _mProdsList.items[i].name).replace(/{%QTY%}/, _mProdsList.items[i].quantity).replace(/{%PRICE%}/, price);
                            item = item.replace(/mr-prod-item/, "mr-prod-item _mr-prod-item-" + index);
                            if (_mProdsList.items[i].isGift) {
                                item = item.replace(/mr-prod-item/, "mr-prod-item _gift").replace(/{%REMOVE%}/, 'onclick="mProdsList.gift(' + index + ');"');
                            } else {
                                item = item.replace(/{%REMOVE%}/, 'onclick="mProdsList.del(this,' + index + ');"');
                            }
                            items += item;
                            index--;
                        }
                    }
                    var cart = _mProdsTemplate.list.replace('{%ITEMS%}', items);
                    var promo = _mProdsList.get.promo();
                    var footerContent = '';
                    if (promo && isFinite(promo.value) && promo.value > 0) {
                        footerContent += _mProdsTemplate.promo.replace('{%PROMOMSG%}', promo.msg).replace('{%PROMOSTYLE%}', promo.style);
                        if (promo.percentage >= 100) {
                            footerContent = footerContent.replace('{%PROMOBAR%}', "style=\"display:none;\"");
                        }
                    }
                    footerContent += _mProdsTemplate.totals.replace('{%TOTAL%}', _mProdsList.get.money(_mProdsList.totalPrice / 100));
                    cart += _mProdsTemplate.footer.replace('{%FOOTER%}', footerContent);
                    _mProdsListContainer.removeClass('__cart-empty __cart-loading');
                } else {
                    cart = _mProdsTemplate.emptyCart;
                    _mProdsListContainer.removeClass('__cart-loading');
                    _mProdsListContainer.addClass('__cart-empty');
                }
                cart = _mProdsTemplate.cart.replace('{%CART%}', cart);
                var _cart = $(cart);
                _cart.find(".mr-prod-item:not('._gift')").wrapAll('<div class="mr-prod-items"></div>');
                _cart.find("._gift").wrapAll('<div class="mr-gifts"></div>');
                _cart.find('.mr-gifts').prepend('<div class="mr-gifts-lbl">Você ganhou!</div>');
                _mProdsListContainer.data('items', qtyItems);
                _mProdsListContainer.html(_cart);
                _mProdsList.set.hasProds();
                _mProdsList.set.events();
                return true;
            },
            del: function del(target, ndx) {
                if ("undefined" === typeof vtexjs) return false;
                $(target).parent().addClass('__mr-deleting');
                vtexjs.checkout.getOrderForm().then(function (orderForm) {
                    var item = orderForm.items[ndx];
                    item.index = ndx;
                    return vtexjs.checkout.removeItems([item]);
                }).done(function (orderForm) {
                    _mProdsList.refresh();
                    _mProdsList.set.hasProds();
                });
                return true;
            },
            gift: function gift(ndx) {
                console.log('Brinde não pode ser removido.');
                return true;
            },
            refresh: function refresh() {
                _mProdsList.init();
                return true;
            }
        };
        _mProdsList.init(options);
        window.mProdsList = {
            init: _mProdsList.init,
            refresh: _mProdsList.refresh,
            items: function items() {
                return _mProdsListContainer.data('items');
            },
            total: function total() {
                return _mProdsListContainer.data('total');
            },
            del: _mProdsList.del,
            gift: _mProdsList.gift
        };
    };
    $.fn.mProdsList = function (options) {
        return mProdsList(this, options);
    };
})(jQuery, window, document);
/*mMinicart*/
/*set up mini cart and change values*/
(function ($, window, document, undefined) {
    $.fn.mMinicart = function (options) {
        var _elem = $(this);
        var mMinicartOpts = $.extend({
            'items': '.amount-items-em',
            'total': '.total-cart-em'
        }, options);
        var _mMinicart = {
            init: function init() {
                _elem.mProdsList();
                return true;
            },
            refresh: function refresh() {
                mProdsList.refresh();
                $(mMinicartOpts.items).text(mProdsList.items());
                $(mMinicartOpts.total).text(mProdsList.total());
                return true;
            }
        };
        _mMinicart.init();
        window.mMinicart = {
            refresh: _mMinicart.refresh,
            items: function items() {
                return mProdsList.items();
            },
            total: function total() {
                return mProdsList.total();
            }
        };
    };
})(jQuery, window, document);
$('._minicartBody').mMinicart();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYTgwMDI0NDcuanMiXSwibmFtZXMiOlsiX3R5cGVvZiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwib2JqIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCIkIiwid2luZG93IiwiZG9jdW1lbnQiLCJ1bmRlZmluZWQiLCJfbVByb2RzVGVtcGxhdGUiLCJjYXJ0IiwicHJvbW8iLCJmb290ZXIiLCJ0b3RhbHMiLCJsaXN0IiwiaXRlbSIsImVtcHR5Q2FydCIsIm1Qcm9kc0xpc3QiLCJlbGVtIiwib3B0aW9ucyIsIl9tUHJvZHNMaXN0Q29udGFpbmVyIiwibVByb2RzT3B0IiwiX21Qcm9kc0xpc3QiLCJxdHlQcm9kcyIsInRvdGFsUHJpY2UiLCJpdGVtcyIsIm9uX29mZl9jbGFzcyIsImZvcm1hdE1vbmV5IiwibnVtYmVyIiwiYSIsImQiLCJjIiwiYiIsImlzTmFOIiwiTWF0aCIsImFicyIsImgiLCJnIiwicGFyc2VJbnQiLCJ0b0ZpeGVkIiwiZiIsImxlbmd0aCIsInN1YnN0ciIsInJlcGxhY2UiLCJzbGljZSIsImluaXQiLCJnZXQiLCJ2dGV4anMiLCJzZXQiLCJldmVudHMiLCJldmVudE5hbWUiLCJmaW5kIiwidW5iaW5kIiwiYmluZCIsInJlbW92ZUNsYXNzIiwiaGFzUHJvZHMiLCJxdHlJdGVtcyIsImRhdGEiLCJhZGRDbGFzcyIsIl92dGV4anMiLCJhcHBseSIsImFyZ3VtZW50cyIsInRvU3RyaW5nIiwiZ2V0U2NyaXB0IiwiY2hlY2tvdXQiLCJnZXRPcmRlckZvcm0iLCJ0aGVuIiwib3JkZXJGb3JtIiwib3JkZXIiLCJ0b3RhbGl6ZXJzIiwidmFsdWUiLCJtb3VudCIsIm1vbmV5IiwiY2FydERhdGEiLCJ0ZXh0Iiwic3BsaXQiLCJtc2ciLCJwZXJjZW50YWdlIiwic3R5bGUiLCJ2YWwiLCJpc0Zpbml0ZSIsInJvdW5kIiwicmVzIiwiaW5kZXgiLCJpIiwicmV2ZXJzZSIsImhhc093blByb3BlcnR5IiwicHJpY2UiLCJxdWFudGl0eSIsImRldGFpbFVybCIsImltYWdlVXJsIiwiYWRkaXRpb25hbEluZm8iLCJicmFuZE5hbWUiLCJuYW1lIiwiaXNHaWZ0IiwiZm9vdGVyQ29udGVudCIsIl9jYXJ0Iiwid3JhcEFsbCIsInByZXBlbmQiLCJodG1sIiwiZGVsIiwidGFyZ2V0IiwibmR4IiwicGFyZW50IiwicmVtb3ZlSXRlbXMiLCJkb25lIiwicmVmcmVzaCIsImdpZnQiLCJjb25zb2xlIiwibG9nIiwidG90YWwiLCJmbiIsImpRdWVyeSIsIm1NaW5pY2FydCIsIl9lbGVtIiwibU1pbmljYXJ0T3B0cyIsImV4dGVuZCIsIl9tTWluaWNhcnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUEsSUFBSUEsVUFBVSxPQUFPQyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDLFNBQU9BLE9BQU9DLFFBQWQsTUFBMkIsUUFBM0QsR0FBc0UsVUFBVUMsR0FBVixFQUFlO0FBQUUsa0JBQWNBLEdBQWQsMENBQWNBLEdBQWQ7QUFBb0IsQ0FBM0csR0FBOEcsVUFBVUEsR0FBVixFQUFlO0FBQUUsV0FBT0EsT0FBTyxPQUFPRixNQUFQLEtBQWtCLFVBQXpCLElBQXVDRSxJQUFJQyxXQUFKLEtBQW9CSCxNQUEzRCxJQUFxRUUsUUFBUUYsT0FBT0ksU0FBcEYsR0FBZ0csUUFBaEcsVUFBa0hGLEdBQWxILDBDQUFrSEEsR0FBbEgsQ0FBUDtBQUErSCxDQUE1UTs7QUFFQTtBQUNBLENBQUMsVUFBVUcsQ0FBVixFQUFhQyxNQUFiLEVBQXFCQyxRQUFyQixFQUErQkMsU0FBL0IsRUFBMEM7QUFDdkMsUUFBSUMsa0JBQWtCO0FBQ2xCQyxjQUFNLHlDQURZO0FBRWxCQyxlQUFPLHNRQUZXO0FBR2xCQyxnQkFBUSx5Q0FIVTtBQUlsQkMsZ0JBQVEsNEJBQTRCLDJHQUE1QixHQUEwSSw4RUFBMUksR0FBMk4sUUFKak47QUFLbEJDLGNBQU0sbUZBTFk7QUFNbEJDLGNBQU0sK0JBQStCLHFDQUEvQixHQUF1RSxrREFBdkUsR0FBNEgsOENBQTVILEdBQTZLLDRDQUE3SyxHQUE0TiwrREFBNU4s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dkIsQ0FBNEJ6RCxXQUFXUSxLQUFYLEVBQTVCO0FBQ0FwQixrQkFBRThHLGNBQWNMLEtBQWhCLEVBQXVCcEMsSUFBdkIsQ0FBNEJ6RCxXQUFXNkYsS0FBWCxFQUE1QjtBQUNBLHVCQUFPLElBQVA7QUFDSDtBQVZZLFNBQWpCO0FBWUFPLG1CQUFXeEUsSUFBWDtBQUNBdkMsZUFBTzJHLFNBQVAsR0FBbUI7QUFDZlAscUJBQVNXLFdBQVdYLE9BREw7QUFFZmpGLG1CQUFPLFNBQVNBLEtBQVQsR0FBaUI7QUFDcEIsdUJBQU9SLFdBQVdRLEtBQVgsRUFBUDtBQUNILGFBSmM7QUFLZnFGLG1CQUFPLFNBQVNBLEtBQVQsR0FBaUI7QUFDcEIsdUJBQU83RixXQUFXNkYsS0FBWCxFQUFQO0FBQ0g7QUFQYyxTQUFuQjtBQVNILEtBNUJEO0FBNkJILENBOUJELEVBOEJHRSxNQTlCSCxFQThCVzFHLE1BOUJYLEVBOEJtQkMsUUE5Qm5CO0FBK0JBRixFQUFFLGdCQUFGLEVBQW9CNEcsU0FBcEIiLCJmaWxlIjoiZmFrZV9hODAwMjQ0Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbi8qbWluaSBjYXJ0IGxpc3Qgb2YgcHJvZHVjdHMqL1xuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgICB2YXIgX21Qcm9kc1RlbXBsYXRlID0ge1xuICAgICAgICBjYXJ0OiBcIjxkaXYgY2xhc3M9J21yLW1pbmljYXJ0Jz57JUNBUlQlfTwvZGl2PlwiLFxuICAgICAgICBwcm9tbzogXCI8ZGl2IGNsYXNzPVxcXCJtci1zaGlwcGluZ1xcXCI+PGRpdiBjbGFzcz1cXFwibXItc2hpcHBpbmctbGJsLWNvbnRhaW5lclxcXCI+PHNwYW4gY2xhc3M9XFxcIm1yLXNoaXBwaW5nLWxibFxcXCI+eyVQUk9NT01TRyV9PC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1yLXNoaXBwaW5nLXBiLWNvbnRhaW5lclxcXCIgeyVQUk9NT0JBUiV9PjxzcGFuIGNsYXNzPVxcXCJtci1wcm9ncmVzcy1iYXJcXFwiPjxzbWFsbCB7JVBST01PU1RZTEUlfT48L3NtYWxsPjwvc3Bhbj48L2Rpdj4gPC9kaXY+XCIsXG4gICAgICAgIGZvb3RlcjogXCI8ZGl2IGNsYXNzPSdtci1mb290ZXInPnslRk9PVEVSJX08L2Rpdj5cIixcbiAgICAgICAgdG90YWxzOiBcIjxkaXYgY2xhc3M9J21yLXRvdGFscyc+XCIgKyBcIjxkaXYgY2xhc3M9J21yLXRvdGFsJz48c3BhbiBjbGFzcz0nbXItbGJsJz5Ub3RhbDo8L3NwYW4+PHNwYW4gY2xhc3M9J21yLXRvdGFsLXZhbCc+eyVUT1RBTCV9PC9zcGFuPjwvZGl2PlwiICsgXCI8ZGl2IGNsYXNzPSdtci1nb3RvLWNhcnQnPjxhIGhyZWY9Jy9jaGVja291dC8jL2NhcnQnPkZlY2hhciBwZWRpZG88L2E+PC9kaXY+XCIgKyBcIjwvZGl2PlwiLFxuICAgICAgICBsaXN0OiBcIjxkaXYgY2xhc3M9J21yLXByb2QtbGlzdC13cmFwcGVyJz48ZGl2IGNsYXNzPSdtci1wcm9kLWxpc3QnPnslSVRFTVMlfTwvZGl2PjwvZGl2PlwiLFxuICAgICAgICBpdGVtOiBcIjxkaXYgY2xhc3M9J21yLXByb2QtaXRlbSc+XCIgKyBcIjxhIGNsYXNzPSdtci1saW5rJyBocmVmPSd7JUxJTkslfSc+XCIgKyBcIjxzcGFuIGNsYXNzPSdtci1pbWcnPjxpbWcgc3JjPSd7JUlNRyV9Jy8+PC9zcGFuPlwiICsgXCI8c3BhbiBjbGFzcz0nbXItcHJvZC1icmFuZCc+eyVCUkFORCV9PC9zcGFuPlwiICsgXCI8c3BhbiBjbGFzcz0nbXItcHJvZC1uYW1lJz57JU5BTUUlfTwvc3Bhbj5cIiArIFwiPHNwYW4gY2xhc3M9J21yLXByb2QtcXR5Jz5RdGRlOiA8c21hbGw+eyVRVFklfTwvc21hbGw+PC9zcGFuPlwiICsgXCI8c3BhbiBjbGFzcz0nbXItcHJvZC1wcmljZSc+PGVtPnslUFJJQ0UlfTwvZW0+PC9zcGFuPlwiICsgXCI8L2E+XCIgKyBcIjxhIGNsYXNzPSdtci1ybSBfX2Nsb3NlLWljb24tYmxhY2snIHslUkVNT1ZFJX0+WDwvYT5cIiArIFwiPC9kaXY+XCIsXG4gICAgICAgIGVtcHR5Q2FydDogXCI8ZGl2IGNsYXNzPVxcXCJtci1lbXB0eVxcXCI+PGRpdiBjbGFzcz1cXFwibXItbXNnXFxcIj5Ow6NvIGjDoSBwcm9kdXRvcyBlbSBzdWEgc2Fjb2xhLjwvZGl2PjxkaXYgY2xhc3M9XFxcIm1yLXN1Z2dlc3Rpb25zXFxcIj48L2Rpdj48L2Rpdj5cIlxuICAgIH07XG5cbiAgICB2YXIgbVByb2RzTGlzdCA9IGZ1bmN0aW9uIG1Qcm9kc0xpc3QoZWxlbSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgX21Qcm9kc0xpc3RDb250YWluZXIgPSBlbGVtO1xuICAgICAgICB2YXIgbVByb2RzT3B0ID0gJCh7fSwgb3B0aW9ucyk7XG4gICAgICAgIHZhciBfbVByb2RzTGlzdCA9IHtcbiAgICAgICAgICAgIHF0eVByb2RzOiAwLFxuICAgICAgICAgICAgdG90YWxQcmljZTogMCxcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgIG9uX29mZl9jbGFzczogJ2NhcnQtc2hvdycsXG4gICAgICAgICAgICBmb3JtYXRNb25leTogZnVuY3Rpb24gZm9ybWF0TW9uZXkobnVtYmVyLCBhLCBkLCBjKSB7XG4gICAgICAgICAgICAgICAgdmFyIGIgPSBudW1iZXI7XG4gICAgICAgICAgICAgICAgYSA9IGlzTmFOKGEgPSBNYXRoLmFicyhhKSkgPyAyIDogYTtcbiAgICAgICAgICAgICAgICBkID0gdm9pZCAwID09IGQgPyBcIi5cIiA6IGQ7XG4gICAgICAgICAgICAgICAgYyA9IHZvaWQgMCA9PSBjID8gXCIsXCIgOiBjO1xuICAgICAgICAgICAgICAgIHZhciBoID0gMCA+IGIgPyBcIi1cIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGcgPSBwYXJzZUludChiID0gTWF0aC5hYnMoK2IgfHwgMCkudG9GaXhlZChhKSkgKyBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmID0gMyA8IChmID0gZy5sZW5ndGgpID8gZiAlIDMgOiAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBoICsgKGYgPyBnLnN1YnN0cigwLCBmKSArIGMgOiBcIlwiKSArIGcuc3Vic3RyKGYpLnJlcGxhY2UoLyhcXGR7M30pKD89XFxkKS9nLCBcIiQxXCIgKyBjKSArIChhID8gZCArIE1hdGguYWJzKGIgLSBnKS50b0ZpeGVkKGEpLnNsaWNlKDIpIDogXCJcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgICAgICBpZiAoX21Qcm9kc0xpc3QuZ2V0LnZ0ZXhqcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9tUHJvZHNMaXN0LmdldC5pdGVtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IHtcbiAgICAgICAgICAgICAgICBldmVudHM6IGZ1bmN0aW9uIGV2ZW50cygpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9ICdjbGljay5NaW5pY2FydCc7XG4gICAgICAgICAgICAgICAgICAgICQoX21Qcm9kc0xpc3RDb250YWluZXIpLmZpbmQoJy5jbG9zZScpLnVuYmluZChldmVudE5hbWUpLmJpbmQoZXZlbnROYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoX21Qcm9kc0xpc3Qub25fb2ZmX2NsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGFzUHJvZHM6IGZ1bmN0aW9uIGhhc1Byb2RzKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXR5SXRlbXMgPSBfbVByb2RzTGlzdENvbnRhaW5lci5kYXRhKCdpdGVtcycpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdHlJdGVtcyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnY2FydC1oYXMtcHJvZHVjdHMnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnY2FydC1oYXMtcHJvZHVjdHMnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgICAgICAgdnRleGpzOiBmdW5jdGlvbiAoX3Z0ZXhqcykge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiB2dGV4anMoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Z0ZXhqcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdnRleGpzLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92dGV4anMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdnRleGpzO1xuICAgICAgICAgICAgICAgIH0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXCJvYmplY3RcIiAhPT0gKHR5cGVvZiB2dGV4anMgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZih2dGV4anMpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXRTY3JpcHQoJ2h0dHA6Ly9pby52dGV4LmNvbS5ici92dGV4LmpzLzIuMy4wL3Z0ZXguanMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX21Qcm9kc0xpc3QuaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBpdGVtczogZnVuY3Rpb24gaXRlbXMoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiID09PSB0eXBlb2YgdnRleGpzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZ0ZXhqcy5jaGVja291dC5nZXRPcmRlckZvcm0oKS50aGVuKGZ1bmN0aW9uIChvcmRlckZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcmRlciA9IG9yZGVyRm9ybTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tUHJvZHNMaXN0Lml0ZW1zID0gb3JkZXJGb3JtLml0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgX21Qcm9kc0xpc3QudG90YWxQcmljZSA9IG9yZGVyRm9ybS50b3RhbGl6ZXJzICYmIG9yZGVyRm9ybS50b3RhbGl6ZXJzLmxlbmd0aCA+IDAgJiYgb3JkZXJGb3JtLnRvdGFsaXplcnNbMF0udmFsdWUgPyBvcmRlckZvcm0udG90YWxpemVyc1swXS52YWx1ZSA6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbVByb2RzTGlzdENvbnRhaW5lci5kYXRhKCd0b3RhbCcsIDEgKiAoX21Qcm9kc0xpc3QudG90YWxQcmljZSAvIDEwMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX21Qcm9kc0xpc3QubW91bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9uZXk6IGZ1bmN0aW9uIG1vbmV5KG51bWJlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJSJCBcIiArIF9tUHJvZHNMaXN0LmZvcm1hdE1vbmV5KG51bWJlciwgMiwgXCIsXCIsIFwiLlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb21vOiBmdW5jdGlvbiBwcm9tbygpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhcnREYXRhID0gJCgnLl9taW5pLWNhcnQtZGF0YSBzY3JpcHQnKS50ZXh0KCkuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FydERhdGEubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2c6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudGFnZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBjYXJ0RGF0YVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSAxICogY2FydERhdGFbMF0gKiAxMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudGFnZSA9IE1hdGgucm91bmQoX21Qcm9kc0xpc3QudG90YWxQcmljZSAvIHZhbCAqIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzID0gdmFsID49IF9tUHJvZHNMaXN0LnRvdGFsUHJpY2UgPyAodmFsIC0gX21Qcm9kc0xpc3QudG90YWxQcmljZSkgLyAxMDAgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2cgPSBtc2cucmVwbGFjZSgveyVWQUxPUiV9LywgX21Qcm9kc0xpc3QuZ2V0Lm1vbmV5KHJlcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gXCJzdHlsZT1cXFwid2lkdGg6XCIgKyBwZXJjZW50YWdlICsgXCIlO1xcXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZXJjZW50YWdlID49IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZyA9IGNhcnREYXRhWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtc2c6IG1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50YWdlOiBwZXJjZW50YWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9ICcnO1xuICAgICAgICAgICAgICAgIHZhciBxdHlJdGVtcyA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKF9tUHJvZHNMaXN0Lml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gX21Qcm9kc0xpc3QuaXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBfbVByb2RzTGlzdC5pdGVtcy5yZXZlcnNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbVByb2RzTGlzdC5pdGVtcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmljZSA9IF9tUHJvZHNMaXN0LmdldC5tb25leShfbVByb2RzTGlzdC5pdGVtc1tpXS5wcmljZSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXR5SXRlbXMgPSBxdHlJdGVtcyArIDEgKiBfbVByb2RzTGlzdC5pdGVtc1tpXS5xdWFudGl0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gX21Qcm9kc1RlbXBsYXRlLml0ZW0ucmVwbGFjZSgveyVMSU5LJX0vLCBfbVByb2RzTGlzdC5pdGVtc1tpXS5kZXRhaWxVcmwpLnJlcGxhY2UoL3slSU1HJX0vLCBfbVByb2RzTGlzdC5pdGVtc1tpXS5pbWFnZVVybCkucmVwbGFjZSgveyVCUkFORCV9LywgX21Qcm9kc0xpc3QuaXRlbXNbaV0uYWRkaXRpb25hbEluZm8uYnJhbmROYW1lKS5yZXBsYWNlKC97JU5BTUUlfS8sIF9tUHJvZHNMaXN0Lml0ZW1zW2ldLm5hbWUpLnJlcGxhY2UoL3slUVRZJX0vLCBfbVByb2RzTGlzdC5pdGVtc1tpXS5xdWFudGl0eSkucmVwbGFjZSgveyVQUklDRSV9LywgcHJpY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UoL21yLXByb2QtaXRlbS8sIFwibXItcHJvZC1pdGVtIF9tci1wcm9kLWl0ZW0tXCIgKyBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tUHJvZHNMaXN0Lml0ZW1zW2ldLmlzR2lmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC9tci1wcm9kLWl0ZW0vLCBcIm1yLXByb2QtaXRlbSBfZ2lmdFwiKS5yZXBsYWNlKC97JVJFTU9WRSV9LywgJ29uY2xpY2s9XCJtUHJvZHNMaXN0LmdpZnQoJyArIGluZGV4ICsgJyk7XCInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC97JVJFTU9WRSV9LywgJ29uY2xpY2s9XCJtUHJvZHNMaXN0LmRlbCh0aGlzLCcgKyBpbmRleCArICcpO1wiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zICs9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FydCA9IF9tUHJvZHNUZW1wbGF0ZS5saXN0LnJlcGxhY2UoJ3slSVRFTVMlfScsIGl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb21vID0gX21Qcm9kc0xpc3QuZ2V0LnByb21vKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmb290ZXJDb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9tbyAmJiBpc0Zpbml0ZShwcm9tby52YWx1ZSkgJiYgcHJvbW8udmFsdWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb290ZXJDb250ZW50ICs9IF9tUHJvZHNUZW1wbGF0ZS5wcm9tby5yZXBsYWNlKCd7JVBST01PTVNHJX0nLCBwcm9tby5tc2cpLnJlcGxhY2UoJ3slUFJPTU9TVFlMRSV9JywgcHJvbW8uc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb21vLnBlcmNlbnRhZ2UgPj0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vdGVyQ29udGVudCA9IGZvb3RlckNvbnRlbnQucmVwbGFjZSgneyVQUk9NT0JBUiV9JywgXCJzdHlsZT1cXFwiZGlzcGxheTpub25lO1xcXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyQ29udGVudCArPSBfbVByb2RzVGVtcGxhdGUudG90YWxzLnJlcGxhY2UoJ3slVE9UQUwlfScsIF9tUHJvZHNMaXN0LmdldC5tb25leShfbVByb2RzTGlzdC50b3RhbFByaWNlIC8gMTAwKSk7XG4gICAgICAgICAgICAgICAgICAgIGNhcnQgKz0gX21Qcm9kc1RlbXBsYXRlLmZvb3Rlci5yZXBsYWNlKCd7JUZPT1RFUiV9JywgZm9vdGVyQ29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIF9tUHJvZHNMaXN0Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdfX2NhcnQtZW1wdHkgX19jYXJ0LWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYXJ0ID0gX21Qcm9kc1RlbXBsYXRlLmVtcHR5Q2FydDtcbiAgICAgICAgICAgICAgICAgICAgX21Qcm9kc0xpc3RDb250YWluZXIucmVtb3ZlQ2xhc3MoJ19fY2FydC1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIF9tUHJvZHNMaXN0Q29udGFpbmVyLmFkZENsYXNzKCdfX2NhcnQtZW1wdHknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FydCA9IF9tUHJvZHNUZW1wbGF0ZS5jYXJ0LnJlcGxhY2UoJ3slQ0FSVCV9JywgY2FydCk7XG4gICAgICAgICAgICAgICAgdmFyIF9jYXJ0ID0gJChjYXJ0KTtcbiAgICAgICAgICAgICAgICBfY2FydC5maW5kKFwiLm1yLXByb2QtaXRlbTpub3QoJy5fZ2lmdCcpXCIpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJtci1wcm9kLWl0ZW1zXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgX2NhcnQuZmluZChcIi5fZ2lmdFwiKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwibXItZ2lmdHNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICBfY2FydC5maW5kKCcubXItZ2lmdHMnKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibXItZ2lmdHMtbGJsXCI+Vm9jw6ogZ2FuaG91ITwvZGl2PicpO1xuICAgICAgICAgICAgICAgIF9tUHJvZHNMaXN0Q29udGFpbmVyLmRhdGEoJ2l0ZW1zJywgcXR5SXRlbXMpO1xuICAgICAgICAgICAgICAgIF9tUHJvZHNMaXN0Q29udGFpbmVyLmh0bWwoX2NhcnQpO1xuICAgICAgICAgICAgICAgIF9tUHJvZHNMaXN0LnNldC5oYXNQcm9kcygpO1xuICAgICAgICAgICAgICAgIF9tUHJvZHNMaXN0LnNldC5ldmVudHMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWw6IGZ1bmN0aW9uIGRlbCh0YXJnZXQsIG5keCkge1xuICAgICAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiID09PSB0eXBlb2YgdnRleGpzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLnBhcmVudCgpLmFkZENsYXNzKCdfX21yLWRlbGV0aW5nJyk7XG4gICAgICAgICAgICAgICAgdnRleGpzLmNoZWNrb3V0LmdldE9yZGVyRm9ybSgpLnRoZW4oZnVuY3Rpb24gKG9yZGVyRm9ybSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IG9yZGVyRm9ybS5pdGVtc1tuZHhdO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmluZGV4ID0gbmR4O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdnRleGpzLmNoZWNrb3V0LnJlbW92ZUl0ZW1zKFtpdGVtXSk7XG4gICAgICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAob3JkZXJGb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgIF9tUHJvZHNMaXN0LnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAgICAgX21Qcm9kc0xpc3Quc2V0Lmhhc1Byb2RzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2lmdDogZnVuY3Rpb24gZ2lmdChuZHgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQnJpbmRlIG7Do28gcG9kZSBzZXIgcmVtb3ZpZG8uJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgICAgICAgICAgICBfbVByb2RzTGlzdC5pbml0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIF9tUHJvZHNMaXN0LmluaXQob3B0aW9ucyk7XG4gICAgICAgIHdpbmRvdy5tUHJvZHNMaXN0ID0ge1xuICAgICAgICAgICAgaW5pdDogX21Qcm9kc0xpc3QuaW5pdCxcbiAgICAgICAgICAgIHJlZnJlc2g6IF9tUHJvZHNMaXN0LnJlZnJlc2gsXG4gICAgICAgICAgICBpdGVtczogZnVuY3Rpb24gaXRlbXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9tUHJvZHNMaXN0Q29udGFpbmVyLmRhdGEoJ2l0ZW1zJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG90YWw6IGZ1bmN0aW9uIHRvdGFsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfbVByb2RzTGlzdENvbnRhaW5lci5kYXRhKCd0b3RhbCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbDogX21Qcm9kc0xpc3QuZGVsLFxuICAgICAgICAgICAgZ2lmdDogX21Qcm9kc0xpc3QuZ2lmdFxuICAgICAgICB9O1xuICAgIH07XG4gICAgJC5mbi5tUHJvZHNMaXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG1Qcm9kc0xpc3QodGhpcywgb3B0aW9ucyk7XG4gICAgfTtcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7XG4vKm1NaW5pY2FydCovXG4vKnNldCB1cCBtaW5pIGNhcnQgYW5kIGNoYW5nZSB2YWx1ZXMqL1xuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgICAkLmZuLm1NaW5pY2FydCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBfZWxlbSA9ICQodGhpcyk7XG4gICAgICAgIHZhciBtTWluaWNhcnRPcHRzID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgJ2l0ZW1zJzogJy5hbW91bnQtaXRlbXMtZW0nLFxuICAgICAgICAgICAgJ3RvdGFsJzogJy50b3RhbC1jYXJ0LWVtJ1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdmFyIF9tTWluaWNhcnQgPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgICAgIF9lbGVtLm1Qcm9kc0xpc3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWZyZXNoOiBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgICAgICAgICAgICAgIG1Qcm9kc0xpc3QucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICQobU1pbmljYXJ0T3B0cy5pdGVtcykudGV4dChtUHJvZHNMaXN0Lml0ZW1zKCkpO1xuICAgICAgICAgICAgICAgICQobU1pbmljYXJ0T3B0cy50b3RhbCkudGV4dChtUHJvZHNMaXN0LnRvdGFsKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBfbU1pbmljYXJ0LmluaXQoKTtcbiAgICAgICAgd2luZG93Lm1NaW5pY2FydCA9IHtcbiAgICAgICAgICAgIHJlZnJlc2g6IF9tTWluaWNhcnQucmVmcmVzaCxcbiAgICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbiBpdGVtcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbVByb2RzTGlzdC5pdGVtcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvdGFsOiBmdW5jdGlvbiB0b3RhbCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbVByb2RzTGlzdC50b3RhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpO1xuJCgnLl9taW5pY2FydEJvZHknKS5tTWluaWNhcnQoKTsiXX0=
},{}]},{},[1])