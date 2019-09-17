(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/**201904101843*/
(function ($, window, document, undefined) {
    'use strict';
    /* ------------------------------------------------------------ *\
        #Monta Carousel
    \* ------------------------------------------------------------ */

    var applyCarousel = function applyCarousel(p_elem, p_opts) {
        if ($('._no-carousel').length > 0 && $(window).width() < 769) {
            return false;
        }
        if ("function" !== typeof $.fn.slick) {
            return false;
        }
        // return true; 
        var _elem = p_elem || '._vitrines ._-carousel-_';
        var opts = p_opts || {};
        // var navClass = '.slick-nav'+(""+Math.random()).replace(/.*\./,'_');
        // var _appendArrows = $('<div class="slick-nav '+navClass.substr(1)+'"></div>');
        var _appendArrows = $('<div class="slick-nav"></div>');
        if (!opts.vertical) {
            // opts.appendArrows = _appendArrows;
        }
        var opts_responsive = {
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 2
        };
        opts = $.extend({
            lazyLoad: 'ondemand',
            infinite: false,
            touchThreshold: 60,
            arrows: true,
            prevArrow: '<span class="_prev slick-prev"></span>',
            nextArrow: '<span class="_next slick-next"></span>',
            dots: false
        }, opts_responsive, opts);
        $(_elem).slick(opts);
        if (!opts.vertical) {
            $(_elem).prepend(_appendArrows);
        }
        // "object"===typeof yv&&"object"===typeof yv.load&&yv.load.start();
        return true;
    };

    var $product = '<div class="product" :class="`_product-${product.id}`" ' + ':data-prd="product.id" :data-index="index"> ' + '<a :data-prd="product.id" :data-index="index" ' + ':data-shelf="showcase.info.shelf" ' + ':data-feature="showcase.info.feature" ' + ':data-page="showcase.info.page" ' + ':data-price="product.price" ' + ':data-oldprice="product.oldPrice" ' + ':href="product.url.fixURL()" ' + ':data-tracking-url="product.trackingUrl" ' + 'class="__lnk-img" ' + '@click="productClicked({ id: product.id, name: product.name, showcase: showcase.info.showcase, page: showcase.info.page, feature: showcase.info.feature, shelfIndex: index, shelf: showcase.info.shelf, url: product.url.fixURL(), trackingUrl: product.trackingUrl,  })"' + '>' + '<span class="__p_img" :data-image-src="getImage(product)" >' + '<img :data-lazy="getImage(product)" src="https://tbb.vteximg.com.br/arquivos/_img-transparent.gif" :alt="product.name" :title="product.name" />' + '</span>' + '</a>' + '<like-button :entity-id="product.id" short  class="product-favorite toggle"></like-button>' + '<div class="yv-review-quickreview" :value="product.id"></div>' + '<a :data-prd="product.id" :data-index="index" ' + ':data-shelf="showcase.info.shelf" ' + ':data-feature="showcase.info.feature" ' + ':data-page="showcase.info.page" ' + ':data-price="product.price" ' + ':data-oldprice="product.oldPrice" ' + ':href="product.url.fixURL()" ' + ':data-tracking-url="product.trackingUrl" ' + 'class="__lnk-pname"' + '>' + '<span class="_p_details">' + '<span class="__p_brand">' + '{{ product.brand }}' + '</span>' + '<h3 class="__p_name">' + '{{ product.name }}' + '</h3>' + '</span>' + '</a>' + '<span class="__p_pricing_buy_btn_" v-if="checkStatus(product)">' + '<span class="__p_pricing_">' + '<span class="_p_price_">' + '<span class="__p_from" v-if="hasBestPrice(product)">de </span>' + '<span class="__p_price" v-if="hasBestPrice(product)">{{ product.oldPrice.formatMoney() }}</span>' + '</span>' + '<span class="_p_priceoffer_" v-if="checkRegularPrice(product.price)">' + '<span class="__p_by" v-if="hasBestPrice(product)">por </span>' + '<span class="__p_priceoffer">{{ product.price.formatMoney() }}</span>' + '</span>' + '<span class="_p_intallments">' + '<span class="__p_installments" v-if="hasInstallments(product.installment)" >' + '<span class="__p_numberinstallments">{{ product.installment.count }}x</span> de ' + '<span class="__p_installmentsvalue">{{ formatPrice(product.installment.price) }} </span>' + '<span class="__p_installments-juros">sem&nbsp;juros</span>' + '</span>' + '</span>' + '</span>' + '<a :data-prd="product.id" :data-index="index" ' + ':data-shelf="showcase.info.shelf" ' + ':data-feature="showcase.info.feature" ' + ':data-page="showcase.info.page" ' + ':data-price="product.price" ' + ':data-oldprice="product.oldPrice" ' + ':href="product.url.fixURL()" ' + ':data-tracking-url="product.trackingUrl" ' + 'class="__lnk-buy-btn"' + '>' + '<a class="btn_comprar" :href="product.url.fixURL()"> COMPRAR' + '<svg class="heart" width="14" height="16" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M6.90286 4.80886L6.54931 5.16242L6.90286 5.51597L7.59493 6.20804C8.42246 7.03557 8.42092 8.37962 7.59514 9.2054C6.76794 10.0326 5.42268 10.0301 4.59778 9.2052L2.13594 6.74336L0.675534 5.15783C0.785307 5.03582 0.917379 4.88951 1.05875 4.7339C1.43757 4.31692 1.87337 3.84404 2.12868 3.58874L4.59778 1.11964C5.42268 0.294739 6.76794 0.292239 7.59514 1.11943C8.42092 1.94521 8.42246 3.28926 7.59493 4.11679L6.90286 4.80886Z" stroke="#686162"/>' + '</svg>' + '</a>' + '</a>' + '<span class="_flags-wrapper">' + '<span class="_percentage" v-if="checkPercentage(product.percentage)" >' + '<span class="__percentage">{{ product.percentage }}% compraram</span>' + '</span>' + '<span class="_flags">' + '<span v-if="checkDiscount(product.discount)" class="__priceOff priceOff"><span>-{{ product.discount }}%</span></span>' + '</span>' + '</span>' + '</span>' + '<span class="__p_outstock" v-else>Produto não disponível</span>' + '</div>';

    var $product_refs = '' + '<div class="_chaordic-refs" v-if="refs.length>0" >' + '<div class="_chaordic-control" v-if="refs.length>0">' + '<h2 v-html=showcase.info.subtitle class="_chaordic-control-title" ></h2>' + '<a v-if=!showcase.info.vertical @click="switchProd()" class="__switch-btn"></a>' + '</div>' + '<div class="_chaordic-refs-container" >' + '<a v-if=!showcase.info.vertical @click="switchProd()" class="__switch-btn"></a>' + '<div class="_chaordic-refs-products">' + '<div class="_ref-prd _prd product" data-showcase="references" v-for="(product, index) in refs" ' + ':class="getCatClass(product)" ' + ' >' + $product + '</div>' + '</div>' + '</div>' + '</div>';
    var $product_showcase = '' + '<div class="_chaordic-showcase" v-if="products.length>0">' + '<div class="_chaordic-title"><h2 v-html=showcase.info.title></h2></div>' + '<div class="_chaordic-showcase-container">' + '<div :class="[getShowcaseClass(products)]" >' + '<div class="_prd" v-for="(product, index) in products" ' + ':class="getCatClass(product)" ' + 'data-showcase="recommendations" ' + ' >' + $product + '</div>' + '</div>' + '</div>' + '</div>';
    var $product_kits = '' + '<div class="_chaordic-kits" v-if="kits.length>0">' + '<div class="_chaordic-kit" ' + ':class="[getKitClass(product)]" ' + 'v-for="(product, index) in kits" >' + '<div class="_chaordic-kit-btns">' + '<div class="_chaordic-kit-switch _chaordic-btn" @click="switchKitProd(index)" v-if="product.active" >Trocar</div>' + '<div class="_chaordic-kit-on-off">' + '<div class="_chaordic-kit-on _chaordic-btn" @click="removeKitProd(index)" v-if="product.active">Remover</div>' + '<div class="_chaordic-kit-off _chaordic-btn" @click="bringBackKitProd(index)" v-else>Trazer de volta</div>' + '</div>' + '</div>' + '<div class="_chaordic-kit-products">' + '<div class="_prd" data-showcase="recommendations" ' + ':class="getCatClass(product)" ' + '>' + $product + '</div>' + '</div>' + '</div>' + '</div>';
    var $product_kit_totals = '' + '<div class="_chaordic-kit-totals" v-if="kits.length>0">' + '<div class="_chaordic-kit-summary">' + '<div class="_kit-title" v-if="kit_totals.title" v-html=kit_totals.title></div>' + '<div class="_kit-price-regular" v-if="kit_totals.regular>0" v-html=formatPrice(kit_totals.regular)></div>' + '<div class="_kit-price-sale" v-if="kit_totals.sale" v-html=formatPrice(kit_totals.sale)></div>' + '<div class="_kit-button" v-if="kit_totals.button" ><a @click="buyProducts()">{{ kit_totals. button }}</a></div>' + '</div>' + '</div>';
    var $showcase = '';
    $showcase = '<div class="__vitrines _chaordic-info _chaordic-wrapper" ' + 'v-if="products.length>0||kits.length>0" ' + 'data-showcase="recommendations" ' + ':class="[showcase.info.refs_on, convert2class(showcase.info.feature), loadingClass(_loading)]" ' + ':data-chaordic-index="showcase.index" ' + ':data-impression-url="showcase.info.impressionUrl" ' + ':data-page="showcase.info.page" ' + ':data-name="showcase.info.name" ' + ':data-feature="showcase.info.feature" ' + ':data-shelf="showcase.info.shelf" ' + ' >' +
    // '<div class="_chaordic-header">' +
    //     '<div class="_chaordic-control" v-if="refs.length>0">' +
    //         '<span v-html=showcase.info.subtitle class="_chaordic-control-title" ></span>' +
    //         '<a v-if=!showcase.info.vertical @click="switchProd()" class="__switch-btn"></a>' +
    //     '</div>' +
    //     '<div class="_chaordic-title"><h2 v-html=showcase.info.title></h2></div>' +
    // '</div>' +
    '<div class="_filters" v-if="filters.length>1" >' + '<a @click="customFilter(\'all\')" ' + ':class="{__selected:category == \'all\'}" ' + ' >Ver todos</a>' + '<a v-for="(filter, index) in filters" ' + '@click="customFilter(filter)" ' + ':class="{__selected:category == filter}" ' + ' >' + '{{ filter }}' + '</a>' + '</div>' + '<div class="_chaordic-showcase-wrapper">' +
    /* insert here product with switch */
    $product_refs + $product_showcase + $product_kits + $product_kit_totals + '</div>' + '</div>';
    /** Helper functions */
    String.prototype.fixPath = function () {
        return this.replace(/200-200/, "164-164").replace(/.*?\//, "/");
    };
    String.prototype.fixURL = function () {
        return this.replace(/^.*?[^:\/]\/[\/]*/, "/");
    };
    var addDiscountData = function addDiscountData(p_data) {
        var data = p_data;
        $.each(data, function (ndx, level) {
            $.each(level, function (ndx0, level_elems) {
                $.each(level_elems, function (ndx1, level_elem) {
                    if (ndx1 == "displays") {
                        $.each(level_elem, function (ndx2, level_data) {
                            $.each(level_data.recommendations, function (ndx2, product) {
                                var _regularPrice = product.oldPrice || product.price;
                                var _price = product.price;
                                var _discount = 0;
                                if (_regularPrice > 0) {
                                    _discount = 1 * Math.floor(100 - _price / _regularPrice * 100).toFixed(2);
                                }
                                product.savings = 1 * (_regularPrice - _price).toFixed(2);
                                product.discount = _discount;
                                product.active = true;
                                // product.url = product.url;
                                // product.url = [product.url,product.skus[0].sku].join('?idsku=');
                            });
                        });
                    }
                });
            });
        });
        return data;
    };
    var addSkus = function addSkus(p_data, cb) {
        var dfd = $.Deferred();
        var data = p_data;
        var utls = new Utls();
        var productIdList = [];
        var loop = function loop(skuList) {
            $.each(data, function (key, level) {
                /* level displays */
                $.each(level, function (key0, product) {
                    if (!skuList) {
                        if ($.inArray(product.id, productIdList) <= 0) {
                            productIdList.push(product.id);
                        }
                    } else {
                        product.skus = skuList[product.id];
                    }
                });
            });
        };
        loop();
        if (productIdList.length > 0) {
            var utls = new Utls();
            utls.getSkuList(productIdList).then(function (skuResults) {
                var skuList = {};
                $.each(skuResults, function (ndx, item) {
                    skuList = $.extend(skuList, item);
                });
                loop(skuList);
                dfd.resolve(data);
            }, function (error) {
                dfd.reject('Error:', error);
            });
        }
        return dfd.promise();
    };

    /** #Chaordic functions */
    var getChaordicCredentials = function getChaordicCredentials(productId) {
        // U7J8E6XyqrIsC8bv4p3JbQ%3D%3D
        var isDesktop = $(window).width() > 1024;
        var secretKey = 'rz4YYCNFlWAnPdogRpLdRw==';
        secretKey = encodeURIComponent(secretKey);
        var url = '',
            query = '',
            url_base = 'https://recs.chaordicsystems.com/v0/pages/recommendations',
            cookie_name = 'chaordic_browserId';
        var deviceId = getCookie(cookie_name) || 'dev001';
        var config = {
            apiKey: 'qdb-vtex',
            deviceId: deviceId,
            secretKey: secretKey // 'rz4YYCNFlWAnPdogRpLdRw%3D%3D'
        };
        var config_extra = {
            name: 'home',
            source: 'mobile',
            productFormat: 'compact'
        };
        if (isDesktop) {
            config_extra = $.extend(config_extra, { source: 'desktop' });
        } else {
            $('html').addClass('_mobi-on');
        }
        if (!!productId && productId.length > 0) {
            url_base = 'https://recs.chaordicsystems.com/v0/products/recommendations';
            var config_extra = {
                type: 'similar',
                productId: productId
            };
        }
        config = $.extend(config, config_extra);
        if (document.location.pathname.length > 1) {
            config.url = document.location.origin + document.location.pathname;
            var pageType = {
                'other': 'other',
                'departamento': 'category', 'departament': 'category', 'dept': 'category', 'categoria': 'subcategory', 'category': 'subcategory', 'cat': 'subcategory'
            };
            config.name = pageType[$('body').attr('id') || "other"];
            var attrChaordicMeta = $('[chaordic_special]').attr('chaordic_special') || "";
            if (attrChaordicMeta.length > 0) {
                config.name = attrChaordicMeta;
            }
            if ("undefined" !== typeof chaordic_special && "undefined" !== typeof chaordic_special.page && "undefined" !== typeof chaordic_special.page.name) {
                config.name = chaordic_special.page.name;
            }
        }
        var query = decodeURIComponent($.param(config));
        url = url_base + '?' + query;
        return { config: config, url: url };
    };
    var loadChaordicData = function loadChaordicData(productId, onSuccess, type) {
        if ($('._top,._middle,._bottom').length <= 0) {
            return false;
        }
        var chaordic_special = window.chaordic_special || {};
        var type = type || "Similar";
        var credentials = getChaordicCredentials(productId);
        credentials.type = type;
        credentials.chaordic_special = chaordic_special;
        var mountChaordicShowcases = function mountChaordicShowcases(chaordicData) {
            var _chaordicData = chaordicData;
            mountChaordic(_chaordicData, credentials);
            return true;
        };
        var success = function success(chaordicData) {
            if (!!chaordic_special.extras) {
                $.each(chaordic_special.extras.displays, function (ndx, showcase) {
                    var displays_length = chaordic_special.extras.displays.length - 1;
                    var level = 'top';
                    var display_index = showcase.index || 0;
                    if (!!showcase.feature && showcase.feature === "FrequentlyBoughtTogether" && "function" === typeof Utls) {
                        /** compre junto */
                        delete window.___loadingChaordic;
                        level = showcase.level || level;
                        loadChaordicData(showcase.sku, function (extrasData) {
                            extrasData.columns = !!showcase.columns && showcase.columns > 0 ? showcase.columns : 2;
                            extrasData.feature = "FrequentlyBoughtTogether";
                            extrasData.title = showcase.title || "Compre junto";
                            chaordicData[level].splice(display_index, 0, extrasData);
                            if (ndx == displays_length) {
                                mountChaordicShowcases(chaordicData);
                            }
                        });
                    } else if (!!showcase.feature && showcase.feature === "Similar") {
                        /** similares */
                        delete window.___loadingChaordic;
                        level = showcase.level || level;
                        loadChaordicData(showcase.sku, function (extrasData) {
                            extrasData.feature = "Similar";
                            extrasData.title = showcase.title || "Produtos similares";
                            chaordicData[level].splice(display_index, 0, extrasData);
                            if (ndx == displays_length) {
                                mountChaordicShowcases(chaordicData);
                            }
                        });
                    } else {
                        mountChaordicShowcases(chaordicData);
                    }
                });
            } else {
                mountChaordicShowcases(chaordicData);
            }
            return true;
        };
        if (!!onSuccess && 'function' === typeof onSuccess) {
            success = onSuccess;
        }
        if (!window.___loadingChaordic) {
            $.ajax({
                url: credentials.url,
                cache: true,
                dataType: 'json'
            }).success(success) /*only if response 200*/
            .always(function () {
                delete window.___loadingChaordic;
            });
            window.___loadingChaordic = true;
        }
        return true;
    };
    var fixLazy = function fixLazy() {
        var _img = $('.section-chaordic ._ref-prd img[src*="_img-transparent.gif"]');
        var src = _img.attr('data-lazy');
        _img.attr("src", src);
    };
    /** Chaordic mount showcases */
    var mountChaordic = function mountChaordic(p_chaordicData, p_settings) {
        var settings = p_settings;
        var verticalShowcases = ['HistoryPersonalized'];
        var filtersOffShowcases = ['HistoryPersonalized', 'New4You', 'ViewPersonalized', 'CartPersonalized', 'PurchasePersonalized', 'MostPopular', 'Offers', 'Featured', 'Push'];
        var specialShowcase = ['FrequentlyBoughtTogether'];
        var getProductsSkus = ['FrequentlyBoughtTogether'];
        var doNotRender = ['HistoryPersonalized'];
        var chaordicData = p_chaordicData || {};
        var columns = 2;
        var page = settings.pageType || "other";
        var chaordic_special = settings.chaordic_special || {};
        var specialSetsAvailable = "undefined" !== typeof chaordic_special.extras && "undefined" !== typeof chaordic_special.extras.special && "undefined" !== typeof chaordic_special.extras.special.pages && chaordic_special.extras.special.pages.length > 0;
        window.vues = [];
        chaordicData = addDiscountData(chaordicData);
        $.each(chaordicData, function (label, levels) {
            var index = 0;
            $.each(levels, function (ndx, level) {
                var feature = level.feature;
                if ($.inArray(feature, doNotRender) >= 0) {
                    return false;
                }
                var carouselOff = false;
                var vertical = $.inArray(feature, verticalShowcases) >= 0 ? true : false;
                var filtersOff = $.inArray(feature, filtersOffShowcases) >= 0 ? true : false;
                var specialShowcaseOn = $.inArray(feature, specialShowcase) >= 0 ? true : false;
                var getProductsSkusOn = $.inArray(feature, getProductsSkus) >= 0 ? true : false;
                if (specialSetsAvailable && "undefined" !== typeof chaordic_special.extras.special.pages) {
                    $.each(chaordic_special.extras.special.pages, function (ndx, page) {
                        if (feature == page.feature) {
                            carouselOff = !page.carousel || false;
                            filtersOff = !page.menu || false;
                        }
                    });
                }
                if (specialShowcaseOn) {
                    columns = !!level.columns && level.columns > 0 ? level.columns : 2;
                }
                var slides = 4;
                var carousel_vert_opts = {};
                var carousel_opts = {};
                var refs = level.displays[0].references;
                var refs_price = { regular: 0, sale: 0 };
                var refs_length = refs.length;
                var refs_on = '';
                if (refs_length > 0) {
                    var refs_price = { regular: refs[0].oldPrice, sale: refs[0].price };
                    refs_on = '_refs-on' + (refs_length > 1 ? ' _switch-btn-on' : '');
                    slides = slides - 1;
                }
                // if(getProductsSkusOn) {
                // level.displays[0] = addSkus(level.displays[0]);
                // }
                if (vertical) {
                    refs_on = '_refs-on  _vertical';
                    slides = 2;
                    carousel_vert_opts = {
                        vertical: true,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        prevArrow: '<span class="_prev slick-prev"></span>',
                        nextArrow: '<span class="_next slick-next"></span>'
                    };
                }
                carousel_opts = $.extend(carousel_opts, {
                    slidesToShow: slides,
                    slidesToScroll: slides,
                    arrows: true,
                    dots: false,
                    responsive: [{
                        breakpoint: 880,
                        settings: {
                            slidesToShow: slides - 1,
                            slidesToScroll: slides - 1,
                            arrows: true,
                            dots: false
                        }
                    }, {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: true,
                            dots: false
                        }
                    }]
                });
                var showcase_container = '.__' + label + index + '__';
                $('._' + label).append('<div class="' + showcase_container.substr(1) + '"><chaordic></chaordic></div>');
                var dataSet = {
                    category: 'all',
                    showcase: {},
                    filters: [],
                    products: [],
                    kits_remaining: [],
                    kits: [],
                    kit_totals: {},
                    refs: [],
                    all_data: [],
                    _loading: false
                };

                "function" === typeof Vue && Vue.component('chaordic', {
                    template: $showcase,
                    data: function data() {
                        return dataSet;
                    },
                    created: function created() {
                        this._loading = false;
                        this.setShowcaseInfo();
                        this.setFilters();
                        this.setRefs();
                        if (!specialShowcaseOn) {
                            this.setProducts();
                        } else if (specialShowcaseOn && level.displays[0].references instanceof Array && "available" === level.displays[0].references[0].status) {
                            // level.displays[0] = addSkus(level.displays[0]);
                            // if(this.setKits()) {
                            //     this.setKitsSummary();
                            // }
                        }
                        if (!vertical) {
                            this.switchProd();
                        } else {
                            this.mountCarouselVertical(showcase_container + ' ._chaordic-refs ._chaordic-refs-products', carousel_vert_opts);
                        }
                        return true;
                    },
                    methods: {
                        setShowcaseInfo: function setShowcaseInfo() {
                            this.showcase = {
                                index: index,
                                info: {
                                    showcase: vertical ? "references" : "recommendations",
                                    page: page,
                                    title: level.subtitle || level.title,
                                    subtitle: level.title,
                                    name: level.name,
                                    feature: level.feature,
                                    shelf: label,
                                    refs_on: refs_on,
                                    impressionUrl: level.impressionUrl,
                                    vertical: vertical
                                }
                            };
                            return true;
                        },
                        setFilters: function setFilters() {
                            if (filtersOff) {
                                this.filters = [];
                                return false;
                            }
                            var products = level.displays[0].recommendations;
                            var filters = [];
                            $.each(products, function (ndx, product) {
                                if ("undefined" !== typeof product.categories && product.categories.length > 2 && "undefined" !== typeof product.categories[2].id && $.inArray(product.categories[2].id, filters) < 0) {
                                    filters.push(product.categories[2].id);
                                } // here
                            });
                            if (filters.length > 1) this.filters = filters;
                            return true;
                        },
                        setProducts: function setProducts() {
                            this.mountChaordic(level.displays[0].recommendations);
                            return true;
                        },
                        setRefs: function setRefs() {
                            this.refs = refs;
                            return true;
                        },
                        setKits: function setKits(p_data) {
                            var data = p_data || level.displays[0].recommendations;
                            var new_data = [];
                            if (getProductsSkusOn) {
                                $.each(data, function (ndx, datum) {
                                    if (!datum.skus) {
                                        new_data.push(datum);
                                    }
                                });
                            }
                            this.kits = new_data.splice(0, columns);
                            this.kits_remaining = new_data.slice();
                            this.kit_totals = {
                                title: "Valor dos itens",
                                regular: "R$ 0,00",
                                price: "R$ 0,00",
                                button: 'Comprar'
                            };
                            return true;
                        },
                        setKitsSummary: function setKitsSummary() {
                            var refs = this.refs;
                            var kits = this.kits;
                            var prices = refs_price;
                            var kits_length = 1;
                            prices.regular = refs[0].oldPrice || 0;
                            prices.sale = refs[0].price || 0;
                            $.each(kits, function (index, kit) {
                                if (kit.active) {
                                    prices.regular += kit.oldPrice || 0;
                                    prices.sale += kit.price || 0;
                                    kits_length++;
                                }
                            });
                            var title = kits_length <= 1 ? "Valor de " + kits_length + " " + "item" : "Valor dos " + kits_length + " " + "itens";
                            var button = kits_length <= 1 ? 'Comprar' : 'Comprar junto';
                            var kit_totals = {
                                title: title,
                                sale: prices.sale,
                                button: button
                            };
                            if (prices.regular > 0) {
                                kit_totals = $.extend(kit_totals, { regular: prices.regular });
                            }
                            this.kit_totals = kit_totals;
                            return true;
                        },
                        buyProducts: function buyProducts() {
                            var skus = [];
                            skus.push(this.refs[0].id);
                            $.each(this.kits, function (ndx, kit) {
                                if (kit.active) {
                                    skus.push(kit.id);
                                }
                            });
                            //add2cart(skus);
                            return true;
                        },
                        getShowcaseClass: function getShowcaseClass(product) {
                            var classes = ["_-showcase-list-_"];
                            if (carouselOff) {
                                classes.push("_-no-carousel-_");
                            } else {
                                classes.push("_-carousel-_");
                            }
                            return classes.join(' ');
                        },
                        getKitClass: function getKitClass(product) {
                            if (product.active) return '_kit-on';
                            return '_kit-off';
                        },
                        switchKitProd: function switchKitProd(column) {
                            var kits_remaining = this.kits_remaining.slice();
                            var kits = this.kits.slice();
                            var new_kit = kits_remaining.shift();
                            kits_remaining.push(kits.splice(column, 1)[0]);
                            kits.splice(column, 0, new_kit);
                            this.kits = kits;
                            this.kits_remaining = kits_remaining;
                            this.setKitsSummary();
                            return true;
                        },
                        removeKitProd: function removeKitProd(column) {
                            this.kits[column].active = !this.kits[column].active;
                            this.setKitsSummary();
                            return true;
                        },
                        bringBackKitProd: function bringBackKitProd(column) {
                            this.kits[column].active = !this.kits[column].active;
                            this.setKitsSummary();
                            return true;
                        },
                        unmountCarousel: function unmountCarousel() {
                            // $(showcase_container).find('._-carousel-_ .slick-nav').remove();
                            $(showcase_container).find('._-carousel-_').slick('unslick');
                            return true;
                        },
                        mountCarousel: function mountCarousel(p_elem, p_opts) {
                            // console.log('carouselOff',carouselOff)
                            if (carouselOff) {
                                return false;
                            }
                            var opts = p_opts || {};
                            this.$nextTick(function (e) {
                                applyCarousel(p_elem, opts);
                            });
                            return true;
                        },
                        mountCarouselVertical: function mountCarouselVertical(p_elem, p_opts) {
                            var opts = p_opts || {};
                            this.$nextTick(function (e) {
                                applyCarousel(p_elem, opts);
                            });
                            return true;
                        },
                        mountChaordic: function mountChaordic(data) {
                            this.products = data;
                            this.all_data = data;
                            this.mountCarousel(showcase_container + ' ._-carousel-_', carousel_opts);
                            return true;
                        },
                        switchProd: function switchProd() {
                            this._loading = !this._loading;
                            var refs = this.refs;
                            var refs_length = refs.length;
                            if (refs_length <= 1) {
                                /* nothing to do */
                                return true;
                            }
                            var ref = refs.shift();
                            var id = refs[0].id;
                            refs.push(ref);
                            this.refs = refs;
                            loadChaordicData(id, function (chaordicResults) {
                                this.unmountCarousel();
                                this.products = chaordicResults.displays[0].recommendations;
                                this.mountCarousel(showcase_container + ' ._-carousel-_', carousel_opts);
                                this._loading = !this._loading;
                            }.bind(this));
                            return true;
                        },
                        customFilter: function customFilter(p_filter) {
                            this.category = p_filter || "";
                            this.filteredChaordic();
                            return true;
                        },
                        filteredChaordic: function filteredChaordic() {
                            this.unmountCarousel();
                            var filter = this.category;
                            if ('all' === filter) {
                                this.products = this.all_data.slice();
                                this.mountCarousel(showcase_container + ' ._-carousel-_', carousel_opts);
                                return true;
                            }
                            var filtered_data = [];
                            var data = this.all_data.slice();
                            $.each(data, function (ndx, item) {
                                if (item.categories[2].id == filter) {
                                    filtered_data.push(item);
                                }
                            });
                            data = filtered_data;
                            this.products = data;
                            this.mountCarousel(showcase_container + ' ._-carousel-_', carousel_opts);
                            return true;
                        },
                        checkStatus: function checkStatus(arg) {
                            return arg.status == "available";
                        },
                        getImage: function getImage(p_product) {
                            var product = p_product;
                            var image = product.images['1000x1000'];
                            var size = "250";
                            size = "180";
                            if ($('html').hasClass('_mobi-on')) {
                                size = "140";
                            }
                            // image = image.replace(/.*?(\/arquivos.*\/ids\/\d*)(.*)(\/.*)/, "$1-"+imgsize+"$3");
                            image = image.replace(/(.*?ids\/\d*-)(.*?)(\/.*)/ig, "$1" + size + "-" + size + "$3").replace(/\?.*/, "");
                            if (/vteximg/ig.test(image)) {
                                image = ['https://', image].join('/').replace(/([^:])([/]{2,})/gm, '$1/');
                            } else {
                                image = ['https://qbbr.vteximg.com.br', image].join('/').replace(/([^:])([/]{2,})/gm, '$1/');
                            }
                            image = image.replace(/\?.*/, '');
                            return image;
                        },
                        hasBestPrice: function hasBestPrice(arg) {
                            var v = "undefined" !== typeof arg && "undefined" !== typeof arg.oldPrice && null !== arg.oldPrice && arg.oldPrice > arg.price || "number" == typeof arg.oldPrice && arg < 10000;
                            return v;
                        },
                        checkRegularPrice: function checkRegularPrice(arg) {
                            return !("object" == (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) && null == arg || "number" == typeof arg && arg > 10000);
                        },
                        hasInstallments: function hasInstallments(arg) {
                            if ("object" == (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) && arg == null) return false;
                            return true;
                        },
                        formatPrice: function formatPrice(pvalue) {
                            var value = pvalue;
                            if ("string" === typeof value) {
                                value = 1 * value.replace(/R\$/g, "").replace(/\,/, ".").trim();
                            }
                            return value.formatMoney();
                        },
                        checkDiscount: function checkDiscount(arg) {
                            return "undefined" !== typeof arg && arg > 0;
                        },
                        checkPercentage: function checkPercentage(arg) {
                            return "undefined" !== typeof arg && arg > 0;
                        },
                        getSku: function getSku(product) {
                            return product.sku;
                        },
                        getSkuName: function getSkuName(product) {
                            var name = product.name || product.skuname;
                            return name;
                        },
                        showSkus: function showSkus(product) {
                            return false;
                            // var productLength = "object"===typeof product.skus&&product.skus.length>0;
                            // return productLength;
                        },
                        getSkuClass: function getSkuClass(product) {
                            var skus = product.skus || 0;
                            if (skus.length > 1) return '_skus-many';
                            if (skus.length == 1) return '_sku-one';
                            return '_no-skus';
                        },
                        getCatClass: function getCatClass(item) {
                            var cat = "";
                            if (!!item.categories && item.categories.length > 2) {
                                cat = item.categories[2].id;
                                cat = "_" + cat.accentsTidy();
                            }
                            return cat;
                        },
                        getTitle: function getTitle(product) {
                            return product.name;
                        },
                        getAlt: function getAlt(product) {
                            return "Produto: " + product.name;
                        },
                        convert2class: function convert2class(arg) {
                            if (arg.length <= 0) return "";
                            var className = "_" + arg.accentsTidy();
                            return className;
                        },
                        loadingClass: function loadingClass(arg) {
                            if (!arg) {
                                return "__rotate";
                            }
                            return "";
                        },
                        productClicked: function productClicked(Obj) {
                            // var url2go = Obj.url;
                            var category = "Vitrine Chaordic Clique";
                            var url = Obj.trackingUrl;
                            var index = Obj.index || 0;
                            var page = Obj.page || "other";
                            var showcase = Obj.showcase || "recommendations";
                            var shelf = Obj.shelf || "top";
                            var feature = Obj.feature || "";
                            var sku = Obj.id || "0";
                            var name = Obj.name;
                            var label = [shelf, feature, sku, name].join('|');

                            var _sessionStorage = {
                                index: index,
                                sku: sku,
                                name: name,
                                category: category,
                                feature: feature,
                                page: page,
                                shelf: shelf,
                                url: url,
                                showcase: showcase,
                                referer: document.location.pathname,
                                action: document.location.pathname,
                                label: label
                            };
                            sessionStorage.setItem('chaordic_meta_data', JSON.stringify(_sessionStorage));
                            window.dataLayer = window.dataLayer || [];
                            dataLayer.push({
                                'event': 'event',
                                'eventCategory': _sessionStorage.category,
                                'eventAction': _sessionStorage.action,
                                'eventLabel': _sessionStorage.label
                            });
                            return true;
                        }
                    },
                    mounted: function mounted() {
                        var skuList = {};
                        if (getProductsSkusOn && level.displays[0].references instanceof Array && "available" === level.displays[0].references[0].status) {
                            addSkus(level.displays[0]).then(function (p_skuList) {
                                skuList = p_skuList;
                                // level.displays[0] = skuList;
                                // this.$nextTick(function () {
                                // Vue.set(this.refs,skus,skuList.references.skus);
                                // this.kits = skuList.recommendations;
                                // if(this.setKits()) {
                                // }
                                this.refs = skuList.references;
                                this.kits = skuList.recommendations.splice(0, columns);
                                this.kits_remaining = skuList.recommendations;
                                this.setKitsSummary();
                                // });
                            }.bind(this));
                        }
                        return true;
                    }
                });
                "function" === typeof Vue && window.vues.push(new Vue({ el: showcase_container }));
                index++;
            });
        });
        // "function"===typeof window.setChaordicFuncEvents&&window.setChaordicFuncEvents();
        $('html').trigger('chaordicEvents');
        fixLazy();
        return true;
    };
    var startChaordic = function startChaordic() {
        /*
        window.chaordic_special = $.extend(window.chaordic_special, {
            extras: {
                special: {
                    pages: [
                        {
                            feature: "Offers",
                            menu: true,
                            carousel: false
                        }
                    ]
                },
                displays: [
                    {
                        sku: "1198",
                        feature: "Similar",
                        title: "Produtos similares",
                        subtitle: "Você visitou",
                        level: "middle",
                        columns: 2,
                        index: 0
                    },
                    {
                        sku: "1198",
                        feature: "FrequentlyBoughtTogether",
                        title: "Compre junto",
                        level: "top",
                        columns: 2,
                        index: 0
                    }
                ]
            }
        });
        */
        loadChaordicData();
        // yvapiScript();
        return true;
    };
    $(startChaordic);
    // $(window).on('load',function () {
    //     window.___loadingChaordicInterval = setInterval(function () {
    //         if("function"===typeof window.setChaordicFuncEvents){
    //             window.setChaordicFuncEvents();
    //             clearInterval(window.___loadingChaordicInterval);
    //         }
    //     },500);
    // });
    return true;
})(jQuery, window, document);

/**201812251408*/
if ("undefined" !== typeof console && "undefined" !== typeof console.clear) {
    console.clear = function () {
        return '-';
    };
}
var getCookie = function getCookie(cname) {
    var n = cname + "=";var d = decodeURIComponent(document.cookie);var ca = d.split(';');for (var i = 0; i < ca.length; i++) {
        var c = ca[i];while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }if (c.indexOf(n) == 0) {
            return c.substring(n.length, c.length);
        }
    }return "";
};
/*accentsTidy*/
String.prototype.accentsTidy = function (e) {
    var e = e || "-";var a = this.toLowerCase().trim();a = a.replace(new RegExp(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g), "a"), a = a.replace(new RegExp(/\u00e6/g), "ae"), a = a.replace(new RegExp(/\u00e7/g), "c"), a = a.replace(new RegExp(/[\u00e8\u00e9\u00ea\u00eb\u0026]/g), "e"), a = a.replace(new RegExp(/[\u00ec\u00ed\u00ee\u00ef]/g), "i"), a = a.replace(new RegExp(/\u00f1/g), "n"), a = a.replace(new RegExp(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g), "o"), a = a.replace(new RegExp(/\u0153/g), "oe"), a = a.replace(new RegExp(/[\u00f9\u00fa\u00fb\u00fc]/g), "u"), a = a.replace(new RegExp(/[\u00fd\u00ff]/g), "y"), a = a.replace(new RegExp(/\s/g), e);var f = "-";if (e != "-") f = '';a = a.replace(new RegExp(/\W/g), f);return a;
};Array.prototype.remove = function () {
    for (var a, b = arguments, c = b.length, d; c && this.length;) {
        for (a = b[--c]; -1 != (d = this.indexOf(a));) {
            this.splice(d, 1);
        }
    }return this;
};Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
    b = b || 0;for (var c = this.length; b < c;) {
        if (this[b] === a) return b;++b;
    }return -1;
});
/* FormatMoney */
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;symbol = symbol !== undefined ? symbol : "R$ ";thousand = thousand || ".";decimal = decimal || ",";var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
/** Is visible? */
(function (a) {
    function h() {
        var e = window.innerHeight,
            d = document.compatMode;if (d || !a.support.boxModel) e = "CSS1Compat" == d ? document.documentElement.clientHeight : document.body.clientHeight;return e;
    }a(window).scroll(function () {
        var e = h(),
            d = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop,
            b = [];a.each(a.cache, function () {
            this.events && this.events.inview && b.push(this.handle.elem);
        });b.length && a(b).each(function () {
            var c = a(this),
                b = c.offset().top,
                f = c.height(),
                g = c.data("inview") || !1;d > b + f || d + e < b ? g && (c.data("inview", !1), c.trigger("inview", [!1])) : d < b + f && !g && (c.data("inview", !0), c.trigger("inview", [!0]));
        });
    });a(function () {
        a(window).scroll();
    });
})(jQuery);
var yvapiScript = function yvapiScript() {
    var _yvs = document.createElement("script");_yvs.type = "text/javascript";_yvs.async = true;_yvs.id = "yvsrc";_yvs.src = "//service.yourviews.com.br/script/98b7ade8-0fea-4dce-b401-ae793f3a3ad2/yvapi.js";_yvs.className = "yvapi-script";$('head').filter(function () {
        return $('head .yvapi-script').length <= 0;
    }).append(_yvs);return true;
};
/** log */
var __log = function __log() {
    if ("object" == (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && "function" === typeof console.log && arguments.length > 0) {
        console.log(arguments);return true;
    }return false;
};

(function ($, window, document, undefined) {
    'use strict';

    window.loadShowcaseImage = function (item, src) {
        var img = new Image();
        img.addEventListener('load', function () {
            $(item).html(img);
        });
        img.addEventListener('error', function () {
            $(item).filter(function () {
                return $(this).find('img').length <= 0;
            }).append('<img src="/arquivos/img-250x250-00000000.png" />');
            $(item).addClass('__img-not-found');
        });
        img.src = src;
    };
    window.setDataImageSrc = function () {
        $('._showcase-lazy').find('.__p_img').each(function (ndx, item) {
            var _item = $(item);
            var url = _item.html().replace(/\n/, "").replace(/<!.*(http.*?)\"[\S\s]*/, "$1").trim();
            _item.attr('data-image-src', url);
        });
        return true;
    };
    window.loadShowcasePics = function (showcase) {
        if (setDataImageSrc()) {
            $(showcase).not('.__images-loaded').find('.__p_img').each(function (ndx, item) {
                var url = $(item).attr('data-image-src') || "";
                if (url.length > 0) {
                    loadShowcaseImage(item, url);
                }
            });
            $(showcase).addClass('__images-loaded');
        }
        return true;
    };
    window.chaordicTracking = function () {
        var self = this;
        self._sessionStorage = {
            category: "Vitrine Chaordic Clique",
            feature: "",
            index: 0,
            page: "other",
            referer: "",
            shelf: "",
            showcase: "",
            sku: 0,
            url: "/",
            device: "desktop"
        };
        self.categories = {
            "event": "Vitrine Chaordic Exibição",
            "click": "Vitrine Chaordic Clique"
        };
        self.isVisible = function () {
            var _selfV = this;
            $('[data-impression-url]').each(function (ndx, item) {
                $(item).not('.__impression-on').addClass('__impression-on').on('inview', function (event, visible) {
                    if (visible) {
                        _selfV.chaordicShowcaseTracking(item);
                        // window.loadShowcasePics(item);
                    }
                });
            });
            var firstShowcase = $('[data-impression-url]:first');
            // window.loadShowcasePics(firstShowcase);
        };
        self.chaordicShowcaseTracking = function (item) {
            var _selfC = this;
            var shelf = item.dataset.shelf || "top";
            var page = item.dataset.page || "other";
            var feature = item.dataset.feature || "";
            var action = document.location.pathname;
            var label = shelf + "|" + feature + "|" + item.dataset.showcase;
            var _item = $(item);
            if (_item.length <= 0) return false;
            var url = _item.attr('data-impression-url') || "";
            if (url.length > 0) {
                if (!_item.attr('data-impression-triggered')) {
                    _item.attr('data-impression-triggered', 'true');
                    var jqxhr = $.get(url, function () {
                        /* success */
                        self.__log('[Chaordic] ' + _selfC.categories['event'], action, label);
                    });
                    self.GASendEvent(_selfC.categories["event"], action, label);
                }
            }
            return true;
        };
        self.chaordicTrackingUrl = function () {
            var _selfT = this;
            $('[data-tracking-url]').not('.__track-on').addClass('__track-on').on('click.chaordicTrackingUrl', function (e) {
                e.preventDefault();
                var _this = $(this);
                var url2go = _this.attr('href');
                _selfT.productClicked(_this, function () {
                    __log('url2go callback');
                    window.location = url2go;
                });
            });
            return true;
        };
        self.productClicked = function (_this, cb) {
            var _selfP = this;
            var url = _this.attr('data-tracking-url');
            var url2go = _this.attr('href');
            var name = _this.find('.__p_name').text() || "";
            var sku = _this.attr('data-prd') || "0";
            var index = _this.attr('data-index') || 0;
            var shelf = _this.attr('data-shelf') || "top";
            var feature = _this.attr('data-feature') || "";
            var page = _this.attr('data-page') || "other";
            var showcase = _this.parents('._prd').attr('data-showcase');
            showcase = showcase || "recommendations";
            var label = [shelf, feature, sku, name].join('|');

            _selfP._sessionStorage = {
                index: index,
                sku: sku,
                name: name,
                category: _selfP.categories["click"],
                feature: feature,
                page: page,
                shelf: shelf,
                url: url,
                showcase: showcase,
                referer: document.location.pathname,
                action: document.location.pathname,
                label: label
            };
            sessionStorage.setItem('chaordic_meta_data', JSON.stringify(_selfP._sessionStorage));
            _selfP.GATracking();
            if ("function" === typeof cb) {
                cb();
            }
            return true;
        };
        self.GATracking = function () {
            var _selfGA = this;
            if ("undefined" !== typeof _selfGA._sessionStorage && "undefined" !== typeof _selfGA._sessionStorage['category'] && "undefined" !== typeof _selfGA._sessionStorage['action'] && "undefined" !== typeof _selfGA._sessionStorage['label']) {
                /** GA tracking */
                var category = _selfGA._sessionStorage['category'];
                var action = _selfGA._sessionStorage['action'];
                var label = _selfGA._sessionStorage['label'];
                _selfGA.__log('[GA] Tracking Triggered.');
                _selfGA.GASendEvent(category, action, label);
                return true;
            }
        };
        self.GASendEvent = function (category, action, label) {
            var _selfGAS = this;
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
                'event': 'event',
                'eventCategory': category,
                'eventAction': action,
                'eventLabel': label
            });
            self.__log('[GA] dataLayer.push: ' + [category, action, label].join(', '));
            return true;
        };
        self.__log = function () {
            if ("object" == (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && "function" === typeof console.log && arguments.length > 0) {
                console.log(arguments);
                return true;
            }
            return false;
        };
        return true;
    };
    window.fixPicWithoutCarousel = function () {
        $('._chaordic-refs img[data-lazy]').each(function (ndx, item) {
            $(item).attr('src', $(item).attr('data-lazy'));
        });
        return true;
    };
    window.setLazyLoading = function () {
        // "function"===typeof (new window.chaordicTracking).isVisible&&(new window.chaordicTracking).isVisible();
        return true;
    };
    window.setTrackings = function () {
        "function" === typeof new window.chaordicTracking().isVisible && new window.chaordicTracking().isVisible();
        // "function"===typeof (new window.chaordicTracking).chaordicTrackingUrl&&(new window.chaordicTracking).chaordicTrackingUrl();
        return true;
    };
    window.chaordiEvents = function () {
        $('html').off('chaordicEvents').on('chaordicEvents', function (e) {
            window.setLazyLoading();
            window.fixPicWithoutCarousel();
            window.setTrackings();
            return true;
        });
        return true;
    };
    window.setChaordicFuncEvents = function () {
        window.chaordiEvents();
        return true;
    };
    $(setChaordicFuncEvents);

    // $(window).on('load',function () {
    //     window.setChaordicFuncEvents();
    // });

    return true;
})(jQuery, window, document);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfOTE0ZWRkODUuanMiXSwibmFtZXMiOlsiX3R5cGVvZiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwib2JqIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCIkIiwid2luZG93IiwiZG9jdW1lbnQiLCJ1bmRlZmluZWQiLCJhcHBseUNhcm91c2VsIiwicF9lbGVtIiwicF9vcHRzIiwibGVuZ3RoIiwid2lkdGgiLCJmbiIsInNsaWNrIiwiX2VsZW0iLCJvcHRzIiwiX2FwcGVuZEFycm93cyIsInZlcnRpY2FsIiwib3B0c19yZXNwb25zaXZlIiwiYXJyb3dzIiwiZG90cyIsImluZmluaXRlIiwic2xpZGVzVG9TaG93IiwiZXh0ZW5kIiwibGF6eUxvYWQiLCJ0b3VjaFRocmVzaG9sZCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXBlbmQiLCIkcHJvZHVjdCIsIiRwcm9kdWN0X3JlZnMiLCIkcHJvZHVjdF9zaG93Y2FzZSIsIiRwcm9kdWN0X2tpdHMiLCIkcHJvZHVjdF9raXRfdG90YWxzIiwiJHNob3djYXNlIiwiU3RyaW5nIiwiZml4UGF0aCIsInJlcGxhY2UiLCJmaXhVUkwiLCJhZGREaXNjb3VudERhdGEiLCJwX2RhdGEiLCJkYXRhIiwiZWFjaCIsIm5keCIsImxldmVsIiwibmR4MCIsImxldmVsX2VsZW1zIiwibmR4MSIsImxldmVsX2VsZW0iLCJuZHgyIiwibGV2ZWxfZGF0YSIsInJlY29tbWVuZGF0aW9ucyIsInByb2R1Y3QiLCJfcmVndWxhclByaWNlIiwib2xkUHJpY2UiLCJwcmljZSIsIl9wcmljZSIsIl9kaXNjb3VudCIsIk1hdGgiLCJmbG9vciIsInRvRml4ZWQiLCJzYXZpbmdzIiwiZGlzY291bnQiLCJhY3RpdmUiLCJhZGRTa3VzIiwiY2IiLCJkZmQiLCJEZWZlcnJlZCIsInV0bHMiLCJVdGxzIiwicHJvZHVjdElkTGlzdCIsImxvb3AiLCJza3VMaXN0Iiwia2V5Iiwia2V5MCIsImluQXJyYXkiLCJpZCIsInB1c2giLCJza3VzIiwiZ2V0U2t1TGlzdCIsInRoZW4iLCJza3VSZXN1bHRzIiwiaXRlbSIsInJlc29sdmUiLCJlcnJvciIsInJlamVjdCIsInByb21pc2UiLCJnZXRDaGFvcmRpY0NyZWRlbnRpYWxzIiwicHJvZHVjdElkIiwiaXNEZXNrdG9wIiwic2VjcmV0S2V5IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidXJsIiwicXVlcnkiLCJ1cmxfYmFzZSIsImNvb2tpZV9uYW1lIiwiZGV2aWNlSWQiLCJnZXRDb29raWUiLCJjb25maWciLCJhcGlLZXkiLCJjb25maWdfZXh0cmEiLCJuYW1lIiwic291cmNlIiwicHJvZHVjdEZvcm1hdCIsImFkZENsYXNzIiwidHlwZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJvcmlnaW4iLCJwYWdlVHlwZSIsImF0dHIiLCJhdHRyQ2hhb3JkaWNNZXRhIiwiY2hhb3JkaWNfc3BlY2lhbCIsInBhZ2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwYXJhbSIsImxvYWRDaGFvcmRpY0RhdGEiLCJvblN1Y2Nlc3MiLCJjcmVkZW50aWFscyIsIm1vdW50Q2hhb3JkaWNTaG93Y2FzZXMiLCJjaGFvcmRpY0RhdGEiLCJfY2hhb3JkaWNEYXRhIiwibW91bnRDaGFvcmRpYyIsInN1Y2Nlc3MiLCJleHRyYXMiLCJkaXNwbGF5cyIsInNob3djYXNlIiwiZGlzcGxheXNfbGVuZ3RoIiwiZGlzcGxheV9pbmRleCIsImluZGV4IiwiZmVhdHVyZSIsIl9fX2xvYWRpbmdDaGFvcmRpYyIsInNrdSIsImV4dHJhc0RhdGEiLCJjb2x1bW5zIiwidGl0bGUiLCJzcGxpY2UiLCJhamF4IiwiY2FjaGUiLCJkYXRhVHlwZSIsImFsd2F5cyIsImZpeExhenkiLCJfaW1nIiwic3JjIiwicF9jaGFvcmRpY0RhdGEiLCJwX3NldHRpbmdzIiwic2V0dGluZ3MiLCJ2ZXJ0aWNhbFNob3djYXNlcyIsImZpbHRlcnNPZmZTaG93Y2FzZXMiLCJzcGVjaWFsU2hvd2Nhc2UiLCJnZXRQcm9kdWN0c1NrdXMiLCJkb05vdFJlbmRlciIsInNwZWNpYWxTZXRzQXZhaWxhYmxlIiwic3BlY2lhbCIsInBhZ2VzIiwidnVlcyIsImxhYmVsIiwibGV2ZWxzIiwiY2Fyb3VzZWxPZmYiLCJmaWx0ZXJzT2ZmIiwic3BlY2lhbFNob3djYXNlT24iLCJnZXRQcm9kdWN0c1NrdXNPbiIsImNhcm91c2VsIiwibWVudSIsInNsaWRlcyIsImNhcm91c2VsX3ZlcnRfb3B0cyIsImNhcm91c2VsX29wdHMiLCJyZWZzIiwicmVmZXJlbmNlcyIsInJlZnNfcHJpY2UiLCJyZWd1bGFyIiwic2FsZSIsInJlZnNfbGVuZ3RoIiwicmVmc19vbiIsInNsaWRlc1RvU2Nyb2xsIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzaG93Y2FzZV9jb250YWluZXIiLCJhcHBlbmQiLCJzdWJzdHIiLCJkYXRhU2V0IiwiY2F0ZWdvcnkiLCJmaWx0ZXJzIiwicHJvZHVjdHMiLCJraXRzX3JlbWFpbmluZyIsImtpdHMiLCJraXRfdG90YWxzIiwiYWxsX2RhdGEiLCJfbG9hZGluZyIsIlZ1ZSIsImNvbXBvbmVudCIsInRlbXBsYXRlIiwiY3JlYXRlZCIsInNldFNob3djYXNlSW5mbyIsInNldEZpbHRlcnMiLCJzZXRSZWZzIiwic2V0UHJvZHVjdHMiLCJBcnJheSIsInN0YXR1cyIsInN3aXRjaFByb2QiLCJtb3VudENhcm91c2VsVmVydGljYWwiLCJtZXRob2RzIiwiaW5mbyIsInN1YnRpdGxlIiwic2hlbGYiLCJpbXByZXNzaW9uVXJsIiwiY2F0ZWdvcmllcyIsInNldEtpdHMiLCJuZXdfZGF0YSIsImRhdHVtIiwic2xpY2UiLCJidXR0b24iLCJzZXRLaXRzU3VtbWFyeSIsInByaWNlcyIsImtpdHNfbGVuZ3RoIiwia2l0IiwiYnV5UHJvZHVjdHMiLCJnZXRTaG93Y2FzZUNsYXNzIiwiY2xhc3NlcyIsImpvaW4iLCJnZXRLaXRDbGFzcyIsInN3aXRjaEtpdFByb2QiLCJjb2x1bW4iLCJuZXdfa2l0Iiwic2hpZnQiLCJyZW1vdmVLaXRQcm9kIiwiYnJpbmdCYWNrS2l0UHJvZCIsInVubW91bnRDYXJvdXNlbCIsImZpbmQiLCJtb3VudENhcm91c2VsIiwiJG5leHRUaWNrIiwiZSIsInJlZiIsImNoYW9yZGljUmVzdWx0cyIsImJpbmQiLCJjdXN0b21GaWx0ZXIiLCJwX2ZpbHRlciIsImZpbHRlcmVkQ2hhb3JkaWMiLCJmaWx0ZXIiLCJmaWx0ZXJlZF9kYXRhIiwiY2hlY2tTdGF0dXMiLCJhcmciLCJnZXRJbWFnZSIsInBfcHJvZHVjdCIsImltYWdlIiwiaW1hZ2VzIiwic2l6ZSIsImhhc0NsYXNzIiwidGVzdCIsImhhc0Jlc3RQcmljZSIsInYiLCJjaGVja1JlZ3VsYXJQcmljZSIsImhhc0luc3RhbGxtZW50cyIsImZvcm1hdFByaWNlIiwicHZhbHVlIiwidmFsdWUiLCJ0cmltIiwiZm9ybWF0TW9uZXkiLCJjaGVja0Rpc2NvdW50IiwiY2hlY2tQZXJjZW50YWdlIiwiZ2V0U2t1IiwiZ2V0U2t1TmFtZSIsInNrdW5hbWUiLCJzaG93U2t1cyIsImdldFNrdUNsYXNzIiwiZ2V0Q2F0Q2xhc3MiLCJjYXQiLCJhY2NlbnRzVGlkeSIsImdldFRpdGxlIiwiZ2V0QWx0IiwiY29udmVydDJjbGFzcyIsImNsYXNzTmFtZSIsImxvYWRpbmdDbGFzcyIsInByb2R1Y3RDbGlja2VkIiwiT2JqIiwidHJhY2tpbmdVcmwiLCJfc2Vzc2lvblN0b3JhZ2UiLCJyZWZlcmVyIiwiYWN0aW9uIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGFMYXllciIsIm1vdW50ZWQiLCJwX3NrdUxpc3QiLCJlbCIsInRyaWdnZXIiLCJzdGFydENoYW9yZGljIiwialF1ZXJ5IiwiY29uc29sZSIsImNsZWFyIiwiY25hbWUiLCJuIiwiZCIsImNvb2tpZSIsImNhIiwic3BsaXQiLCJpIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJhIiwidG9Mb3dlckNhc2UiLCJSZWdFeHAiLCJmIiwicmVtb3ZlIiwiYiIsImFyZ3VtZW50cyIsIk51bWJlciIsInBsYWNlcyIsInN5bWJvbCIsInRob3VzYW5kIiwiZGVjaW1hbCIsImlzTmFOIiwiYWJzIiwibnVtYmVyIiwibmVnYXRpdmUiLCJwYXJzZUludCIsImoiLCJoIiwiaW5uZXJIZWlnaHQiLCJjb21wYXRNb2RlIiwic3VwcG9ydCIsImJveE1vZGVsIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50SGVpZ2h0IiwiYm9keSIsInNjcm9sbCIsInNjcm9sbFRvcCIsImV2ZW50cyIsImludmlldyIsImhhbmRsZSIsImVsZW0iLCJvZmZzZXQiLCJ0b3AiLCJoZWlnaHQiLCJnIiwieXZhcGlTY3JpcHQiLCJfeXZzIiwiY3JlYXRlRWxlbWVudCIsImFzeW5jIiwiX19sb2ciLCJsb2ciLCJsb2FkU2hvd2Nhc2VJbWFnZSIsImltZyIsIkltYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImh0bWwiLCJzZXREYXRhSW1hZ2VTcmMiLCJfaXRlbSIsImxvYWRTaG93Y2FzZVBpY3MiLCJub3QiLCJjaGFvcmRpY1RyYWNraW5nIiwic2VsZiIsImRldmljZSIsImlzVmlzaWJsZSIsIl9zZWxmViIsIm9uIiwiZXZlbnQiLCJ2aXNpYmxlIiwiY2hhb3JkaWNTaG93Y2FzZVRyYWNraW5nIiwiZmlyc3RTaG93Y2FzZSIsIl9zZWxmQyIsImRhdGFzZXQiLCJqcXhociIsImdldCIsIkdBU2VuZEV2ZW50IiwiY2hhb3JkaWNUcmFja2luZ1VybCIsIl9zZWxmVCIsInByZXZlbnREZWZhdWx0IiwiX3RoaXMiLCJ1cmwyZ28iLCJfc2VsZlAiLCJ0ZXh0IiwicGFyZW50cyIsIkdBVHJhY2tpbmciLCJfc2VsZkdBIiwiX3NlbGZHQVMiLCJmaXhQaWNXaXRob3V0Q2Fyb3VzZWwiLCJzZXRMYXp5TG9hZGluZyIsInNldFRyYWNraW5ncyIsImNoYW9yZGlFdmVudHMiLCJvZmYiLCJzZXRDaGFvcmRpY0Z1bmNFdmVudHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUEsSUFBSUEsVUFBVSxPQUFPQyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDLFNBQU9BLE9BQU9DLFFBQWQs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LEVBQVE0QixJQUFSLENBQWEsS0FBYixFQUFvQjNHLEVBQUUrRSxJQUFGLEVBQVE0QixJQUFSLENBQWEsV0FBYixDQUFwQjtBQUNILFNBRkQ7QUFHQSxlQUFPLElBQVA7QUFDSCxLQUxEO0FBTUExRyxXQUFPeVgsY0FBUCxHQUF3QixZQUFZO0FBQ2hDO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsS0FIRDtBQUlBelgsV0FBTzBYLFlBQVAsR0FBc0IsWUFBWTtBQUM5Qix1QkFBZSxPQUFPLElBQUkxWCxPQUFPOFYsZ0JBQVgsR0FBOEJHLFNBQXBELElBQWlFLElBQUlqVyxPQUFPOFYsZ0JBQVgsR0FBOEJHLFNBQTlCLEVBQWpFO0FBQ0E7QUFDQSxlQUFPLElBQVA7QUFDSCxLQUpEO0FBS0FqVyxXQUFPMlgsYUFBUCxHQUF1QixZQUFZO0FBQy9CNVgsVUFBRSxNQUFGLEVBQVU2WCxHQUFWLENBQWMsZ0JBQWQsRUFBZ0N6QixFQUFoQyxDQUFtQyxnQkFBbkMsRUFBcUQsVUFBVWhJLENBQVYsRUFBYTtBQUM5RG5PLG1CQUFPeVgsY0FBUDtBQUNBelgsbUJBQU93WCxxQkFBUDtBQUNBeFgsbUJBQU8wWCxZQUFQO0FBQ0EsbUJBQU8sSUFBUDtBQUNILFNBTEQ7QUFNQSxlQUFPLElBQVA7QUFDSCxLQVJEO0FBU0ExWCxXQUFPNlgscUJBQVAsR0FBK0IsWUFBWTtBQUN2QzdYLGVBQU8yWCxhQUFQO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsS0FIRDtBQUlBNVgsTUFBRThYLHFCQUFGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFPLElBQVA7QUFDSCxDQTdNRCxFQTZNR2hHLE1BN01ILEVBNk1XN1IsTUE3TVgsRUE2TW1CQyxRQTdNbkIiLCJmaWxlIjoiZmFrZV85MTRlZGQ4NS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4vKioyMDE5MDQxMDE4NDMqL1xuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICpcXFxyXG4gICAgICAgICNNb250YSBDYXJvdXNlbFxyXG4gICAgXFwqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgdmFyIGFwcGx5Q2Fyb3VzZWwgPSBmdW5jdGlvbiBhcHBseUNhcm91c2VsKHBfZWxlbSwgcF9vcHRzKSB7XG4gICAgICAgIGlmICgkKCcuX25vLWNhcm91c2VsJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA8IDc2OSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgIT09IHR5cGVvZiAkLmZuLnNsaWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHRydWU7IFxuICAgICAgICB2YXIgX2VsZW0gPSBwX2VsZW0gfHwgJy5fdml0cmluZXMgLl8tY2Fyb3VzZWwtXyc7XG4gICAgICAgIHZhciBvcHRzID0gcF9vcHRzIHx8IHt9O1xuICAgICAgICAvLyB2YXIgbmF2Q2xhc3MgPSAnLnNsaWNrLW5hdicrKFwiXCIrTWF0aC5yYW5kb20oKSkucmVwbGFjZSgvLipcXC4vLCdfJyk7XG4gICAgICAgIC8vIHZhciBfYXBwZW5kQXJyb3dzID0gJCgnPGRpdiBjbGFzcz1cInNsaWNrLW5hdiAnK25hdkNsYXNzLnN1YnN0cigxKSsnXCI+PC9kaXY+Jyk7XG4gICAgICAgIHZhciBfYXBwZW5kQXJyb3dzID0gJCgnPGRpdiBjbGFzcz1cInNsaWNrLW5hdlwiPjwvZGl2PicpO1xuICAgICAgICBpZiAoIW9wdHMudmVydGljYWwpIHtcbiAgICAgICAgICAgIC8vIG9wdHMuYXBwZW5kQXJyb3dzID0gX2FwcGVuZEFycm93cztcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3B0c19yZXNwb25zaXZlID0ge1xuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgIH07XG4gICAgICAgIG9wdHMgPSAkLmV4dGVuZCh7XG4gICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvdWNoVGhyZXNob2xkOiA2MCxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJzxzcGFuIGNsYXNzPVwiX3ByZXYgc2xpY2stcHJldlwiPjwvc3Bhbj4nLFxuICAgICAgICAgICAgbmV4dEFycm93OiAnPHNwYW4gY2xhc3M9XCJfbmV4dCBzbGljay1uZXh0XCI+PC9zcGFuPicsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICB9LCBvcHRzX3Jlc3BvbnNpdmUsIG9wdHMpO1xuICAgICAgICAkKF9lbGVtKS5zbGljayhvcHRzKTtcbiAgICAgICAgaWYgKCFvcHRzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICAkKF9lbGVtKS5wcmVwZW5kKF9hcHBlbmRBcnJvd3MpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFwib2JqZWN0XCI9PT10eXBlb2YgeXYmJlwib2JqZWN0XCI9PT10eXBlb2YgeXYubG9hZCYmeXYubG9hZC5zdGFydCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdmFyICRwcm9kdWN0ID0gJzxkaXYgY2xhc3M9XCJwcm9kdWN0XCIgOmNsYXNzPVwiYF9wcm9kdWN0LSR7cHJvZHVjdC5pZH1gXCIgJyArICc6ZGF0YS1wcmQ9XCJwcm9kdWN0LmlkXCIgOmRhdGEtaW5kZXg9XCJpbmRleFwiPiAnICsgJzxhIDpkYXRhLXByZD1cInByb2R1Y3QuaWRcIiA6ZGF0YS1pbmRleD1cImluZGV4XCIgJyArICc6ZGF0YS1zaGVsZj1cInNob3djYXNlLmluZm8uc2hlbGZcIiAnICsgJzpkYXRhLWZlYXR1cmU9XCJzaG93Y2FzZS5pbmZvLmZlYXR1cmVcIiAnICsgJzpkYXRhLXBhZ2U9XCJzaG93Y2FzZS5pbmZvLnBhZ2VcIiAnICsgJzpkYXRhLXByaWNlPVwicHJvZHVjdC5wcmljZVwiICcgKyAnOmRhdGEtb2xkcHJpY2U9XCJwcm9kdWN0Lm9sZFByaWNlXCIgJyArICc6aHJlZj1cInByb2R1Y3QudXJsLmZpeFVSTCgpXCIgJyArICc6ZGF0YS10cmFja2luZy11cmw9XCJwcm9kdWN0LnRyYWNraW5nVXJsXCIgJyArICdjbGFzcz1cIl9fbG5rLWltZ1wiICcgKyAnQGNsaWNrPVwicHJvZHVjdENsaWNrZWQoeyBpZDogcHJvZHVjdC5pZCwgbmFtZTogcHJvZHVjdC5uYW1lLCBzaG93Y2FzZTogc2hvd2Nhc2UuaW5mby5zaG93Y2FzZSwgcGFnZTogc2hvd2Nhc2UuaW5mby5wYWdlLCBmZWF0dXJlOiBzaG93Y2FzZS5pbmZvLmZlYXR1cmUsIHNoZWxmSW5kZXg6IGluZGV4LCBzaGVsZjogc2hvd2Nhc2UuaW5mby5zaGVsZiwgdXJsOiBwcm9kdWN0LnVybC5maXhVUkwoKSwgdHJhY2tpbmdVcmw6IHByb2R1Y3QudHJhY2tpbmdVcmwsICB9KVwiJyArICc+JyArICc8c3BhbiBjbGFzcz1cIl9fcF9pbWdcIiA6ZGF0YS1pbWFnZS1zcmM9XCJnZXRJbWFnZShwcm9kdWN0KVwiID4nICsgJzxpbWcgOmRhdGEtbGF6eT1cImdldEltYWdlKHByb2R1Y3QpXCIgc3JjPVwiaHR0cHM6Ly90YmIudnRleGltZy5jb20uYnIvYXJxdWl2b3MvX2ltZy10cmFuc3BhcmVudC5naWZcIiA6YWx0PVwicHJvZHVjdC5uYW1lXCIgOnRpdGxlPVwicHJvZHVjdC5uYW1lXCIgLz4nICsgJzwvc3Bhbj4nICsgJzwvYT4nICsgJzxsaWtlLWJ1dHRvbiA6ZW50aXR5LWlkPVwicHJvZHVjdC5pZFwiIHNob3J0ICBjbGFzcz1cInByb2R1Y3QtZmF2b3JpdGUgdG9nZ2xlXCI+PC9saWtlLWJ1dHRvbj4nICsgJzxkaXYgY2xhc3M9XCJ5di1yZXZpZXctcXVpY2tyZXZpZXdcIiA6dmFsdWU9XCJwcm9kdWN0LmlkXCI+PC9kaXY+JyArICc8YSA6ZGF0YS1wcmQ9XCJwcm9kdWN0LmlkXCIgOmRhdGEtaW5kZXg9XCJpbmRleFwiICcgKyAnOmRhdGEtc2hlbGY9XCJzaG93Y2FzZS5pbmZvLnNoZWxmXCIgJyArICc6ZGF0YS1mZWF0dXJlPVwic2hvd2Nhc2UuaW5mby5mZWF0dXJlXCIgJyArICc6ZGF0YS1wYWdlPVwic2hvd2Nhc2UuaW5mby5wYWdlXCIgJyArICc6ZGF0YS1wcmljZT1cInByb2R1Y3QucHJpY2VcIiAnICsgJzpkYXRhLW9sZHByaWNlPVwicHJvZHVjdC5vbGRQcmljZVwiICcgKyAnOmhyZWY9XCJwcm9kdWN0LnVybC5maXhVUkwoKVwiICcgKyAnOmRhdGEtdHJhY2tpbmctdXJsPVwicHJvZHVjdC50cmFja2luZ1VybFwiICcgKyAnY2xhc3M9XCJfX2xuay1wbmFtZVwiJyArICc+JyArICc8c3BhbiBjbGFzcz1cIl9wX2RldGFpbHNcIj4nICsgJzxzcGFuIGNsYXNzPVwiX19wX2JyYW5kXCI+JyArICd7eyBwcm9kdWN0LmJyYW5kIH19JyArICc8L3NwYW4+JyArICc8aDMgY2xhc3M9XCJfX3BfbmFtZVwiPicgKyAne3sgcHJvZHVjdC5uYW1lIH19JyArICc8L2gzPicgKyAnPC9zcGFuPicgKyAnPC9hPicgKyAnPHNwYW4gY2xhc3M9XCJfX3BfcHJpY2luZ19idXlfYnRuX1wiIHYtaWY9XCJjaGVja1N0YXR1cyhwcm9kdWN0KVwiPicgKyAnPHNwYW4gY2xhc3M9XCJfX3BfcHJpY2luZ19cIj4nICsgJzxzcGFuIGNsYXNzPVwiX3BfcHJpY2VfXCI+JyArICc8c3BhbiBjbGFzcz1cIl9fcF9mcm9tXCIgdi1pZj1cImhhc0Jlc3RQcmljZShwcm9kdWN0KVwiPmRlIDwvc3Bhbj4nICsgJzxzcGFuIGNsYXNzPVwiX19wX3ByaWNlXCIgdi1pZj1cImhhc0Jlc3RQcmljZShwcm9kdWN0KVwiPnt7IHByb2R1Y3Qub2xkUHJpY2UuZm9ybWF0TW9uZXkoKSB9fTwvc3Bhbj4nICsgJzwvc3Bhbj4nICsgJzxzcGFuIGNsYXNzPVwiX3BfcHJpY2VvZmZlcl9cIiB2LWlmPVwiY2hlY2tSZWd1bGFyUHJpY2UocHJvZHVjdC5wcmljZSlcIj4nICsgJzxzcGFuIGNsYXNzPVwiX19wX2J5XCIgdi1pZj1cImhhc0Jlc3RQcmljZShwcm9kdWN0KVwiPnBvciA8L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cIl9fcF9wcmljZW9mZmVyXCI+e3sgcHJvZHVjdC5wcmljZS5mb3JtYXRNb25leSgpIH19PC9zcGFuPicgKyAnPC9zcGFuPicgKyAnPHNwYW4gY2xhc3M9XCJfcF9pbnRhbGxtZW50c1wiPicgKyAnPHNwYW4gY2xhc3M9XCJfX3BfaW5zdGFsbG1lbnRzXCIgdi1pZj1cImhhc0luc3RhbGxtZW50cyhwcm9kdWN0Lmluc3RhbGxtZW50KVwiID4nICsgJzxzcGFuIGNsYXNzPVwiX19wX251bWJlcmluc3RhbGxtZW50c1wiPnt7IHByb2R1Y3QuaW5zdGFsbG1lbnQuY291bnQgfX14PC9zcGFuPiBkZSAnICsgJzxzcGFuIGNsYXNzPVwiX19wX2luc3RhbGxtZW50c3ZhbHVlXCI+e3sgZm9ybWF0UHJpY2UocHJvZHVjdC5pbnN0YWxsbWVudC5wcmljZSkgfX0gPC9zcGFuPicgKyAnPHNwYW4gY2xhc3M9XCJfX3BfaW5zdGFsbG1lbnRzLWp1cm9zXCI+c2VtJm5ic3A7anVyb3M8L3NwYW4+JyArICc8L3NwYW4+JyArICc8L3NwYW4+JyArICc8L3NwYW4+JyArICc8YSA6ZGF0YS1wcmQ9XCJwcm9kdWN0LmlkXCIgOmRhdGEtaW5kZXg9XCJpbmRleFwiICcgKyAnOmRhdGEtc2hlbGY9XCJzaG93Y2FzZS5pbmZvLnNoZWxmXCIgJyArICc6ZGF0YS1mZWF0dXJlPVwic2hvd2Nhc2UuaW5mby5mZWF0dXJlXCIgJyArICc6ZGF0YS1wYWdlPVwic2hvd2Nhc2UuaW5mby5wYWdlXCIgJyArICc6ZGF0YS1wcmljZT1cInByb2R1Y3QucHJpY2VcIiAnICsgJzpkYXRhLW9sZHByaWNlPVwicHJvZHVjdC5vbGRQcmljZVwiICcgKyAnOmhyZWY9XCJwcm9kdWN0LnVybC5maXhVUkwoKVwiICcgKyAnOmRhdGEtdHJhY2tpbmctdXJsPVwicHJvZHVjdC50cmFja2luZ1VybFwiICcgKyAnY2xhc3M9XCJfX2xuay1idXktYnRuXCInICsgJz4nICsgJzxhIGNsYXNzPVwiYnRuX2NvbXByYXJcIiA6aHJlZj1cInByb2R1Y3QudXJsLmZpeFVSTCgpXCI+IENPTVBSQVInICsgJzxzdmcgY2xhc3M9XCJoZWFydFwiIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTEgOVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPicgKyAnPHBhdGggZD1cIk02LjkwMjg2IDQuODA4ODZMNi41NDkzMSA1LjE2MjQyTDYuOTAyODYgNS41MTU5N0w3LjU5NDkzIDYuMjA4MDRDOC40MjI0NiA3LjAzNTU3IDguNDIwOTIgOC4zNzk2MiA3LjU5NTE0IDkuMjA1NEM2Ljc2Nzk0IDEwLjAzMjYgNS40MjI2OCAxMC4wMzAxIDQuNTk3NzggOS4yMDUyTDIuMTM1OTQgNi43NDMzNkwwLjY3NTUzNCA1LjE1NzgzQzAuNzg1MzA3IDUuMDM1ODIgMC45MTczNzkgNC44ODk1MSAxLjA1ODc1IDQuNzMzOUMxLjQzNzU3IDQuMzE2OTIgMS44NzMzNyAzLjg0NDA0IDIuMTI4NjggMy41ODg3NEw0LjU5Nzc4IDEuMTE5NjRDNS40MjI2OCAwLjI5NDczOSA2Ljc2Nzk0IDAuMjkyMjM5IDcuNTk1MTQgMS4xMTk0M0M4LjQyMDkyIDEuOTQ1MjEgOC40MjI0NiAzLjI4OTI2IDcuNTk0OTMgNC4xMTY3OUw2LjkwMjg2IDQuODA4ODZaXCIgc3Ryb2tlPVwiIzY4NjE2MlwiLz4nICsgJzwvc3ZnPicgKyAnPC9hPicgKyAnPC9hPicgKyAnPHNwYW4gY2xhc3M9XCJfZmxhZ3Mtd3JhcHBlclwiPicgKyAnPHNwYW4gY2xhc3M9XCJfcGVyY2VudGFnZVwiIHYtaWY9XCJjaGVja1BlcmNlbnRhZ2UocHJvZHVjdC5wZXJjZW50YWdlKVwiID4nICsgJzxzcGFuIGNsYXNzPVwiX19wZXJjZW50YWdlXCI+e3sgcHJvZHVjdC5wZXJjZW50YWdlIH19JSBjb21wcmFyYW08L3NwYW4+JyArICc8L3NwYW4+JyArICc8c3BhbiBjbGFzcz1cIl9mbGFnc1wiPicgKyAnPHNwYW4gdi1pZj1cImNoZWNrRGlzY291bnQocHJvZHVjdC5kaXNjb3VudClcIiBjbGFzcz1cIl9fcHJpY2VPZmYgcHJpY2VPZmZcIj48c3Bhbj4te3sgcHJvZHVjdC5kaXNjb3VudCB9fSU8L3NwYW4+PC9zcGFuPicgKyAnPC9zcGFuPicgKyAnPC9zcGFuPicgKyAnPC9zcGFuPicgKyAnPHNwYW4gY2xhc3M9XCJfX3Bfb3V0c3RvY2tcIiB2LWVsc2U+UHJvZHV0byBuw6NvIGRpc3BvbsOtdmVsPC9zcGFuPicgKyAnPC9kaXY+JztcblxuICAgIHZhciAkcHJvZHVjdF9yZWZzID0gJycgKyAnPGRpdiBjbGFzcz1cIl9jaGFvcmRpYy1yZWZzXCIgdi1pZj1cInJlZnMubGVuZ3RoPjBcIiA+JyArICc8ZGl2IGNsYXNzPVwiX2NoYW9yZGljLWNvbnRyb2xcIiB2LWlmPVwicmVmcy5sZW5ndGg+MFwiPicgKyAnPGgyIHYtaHRtbD1zaG93Y2FzZS5pbmZvLnN1YnRpdGxlIGNsYXNzPVwiX2NoYW9yZGljLWNvbnRyb2wtdGl0bGVcIiA+PC9oMj4nICsgJzxhIHYtaWY9IXNob3djYXNlLmluZm8udmVydGljYWwgQGNsaWNrPVwic3dpdGNoUHJvZCgpXCIgY2xhc3M9XCJfX3N3aXRjaC1idG5cIj48L2E+JyArICc8L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJfY2hhb3JkaWMtcmVmcy1jb250YWluZXJcIiA+JyArICc8YSB2LWlmPSFzaG93Y2FzZS5pbmZvLnZlcnRpY2FsIEBjbGljaz1cInN3aXRjaFByb2QoKVwiIGNsYXNzPVwiX19zd2l0Y2gtYnRuXCI+PC9hPicgKyAnPGRpdiBjbGFzcz1cIl9jaGFvcmRpYy1yZWZzLXByb2R1Y3RzXCI+JyArICc8ZGl2IGNsYXNzPVwiX3JlZi1wcmQgX3ByZCBwcm9kdWN0XCIgZGF0YS1zaG93Y2FzZT1cInJlZmVyZW5jZXNcIiB2LWZvcj1cIihwcm9kdWN0LCBpbmRleCkgaW4gcmVmc1wiICcgKyAnOmNsYXNzPVwiZ2V0Q2F0Q2xhc3MocHJvZHVjdClcIiAnICsgJyA+JyArICRwcm9kdWN0ICsgJzwvZGl2PicgKyAnPC9kaXY+JyArICc8L2Rpdj4nICsgJzwvZGl2Pic7XG4gICAgdmFyICRwcm9kdWN0X3Nob3djYXNlID0gJycgKyAnPGRpdiBjbGFzcz1cIl9jaGFvcmRpYy1zaG93Y2FzZVwiIHYtaWY9XCJwcm9kdWN0cy5sZW5ndGg+MFwiPicgKyAnPGRpdiBjbGFzcz1cIl9jaGFvcmRpYy10aXRsZVwiPjxoMiB2LWh0bWw9c2hvd2Nhc2UuaW5mby50aXRsZT48L2gyPjwvZGl2PicgKyAnPGRpdiBjbGFzcz1cIl9jaGFvcmRpYy1zaG93Y2FzZS1jb250YWluZXJcIj4nICsgJzxkaXYgOmNsYXNzPVwiW2dldFNob3djYXNlQ2xhc3MocHJvZHVjdHMpXVwiID4nICsgJzxkaXYgY2xhc3M9XCJfcHJkXCIgdi1mb3I9XCIocHJvZHVjdCwgaW5kZXgpIGluIHByb2R1Y3RzXCIgJyArICc6Y2xhc3M9XCJnZXRDYXRDbGFzcyhwcm9kdWN0KVwiICcgKyAnZGF0YS1zaG93Y2FzZT1cInJlY29tbWVuZGF0aW9uc1wiICcgKyAnID4nICsgJHByb2R1Y3QgKyAnPC9kaXY+JyArICc8L2Rpdj4nICsgJzwvZGl2PicgKyAnPC9kaXY+JztcbiAgICB2YXIgJHByb2R1Y3Rfa2l0cyA9ICcnICsgJzxkaXYgY2xhc3M9XCJfY2hhb3JkaWMta2l0c1wiIHYtaWY9XCJraXRzLmxlbmd0aD4wXCI+JyArICc8ZGl2IGNsYXNzPVwiX2NoYW9yZGljLWtpdFwiICcgKyAnOmNsYXNzPVwiW2dldEtpdENsYXNzKHByb2R1Y3QpXVwiICcgKyAndi1mb3I9XCIocHJvZHVjdCwgaW5kZXgpIGluIGtpdHNcIiA+JyArICc8ZGl2IGNsYXNzPVwiX2NoYW9yZGljLWtpdC1idG5zXCI+JyArICc8ZGl2IGNsYXNzPVwiX2NoYW9yZGljLWtpdC1zd2l0Y2ggX2NoYW9yZGljLWJ0blwiIEBjbGljaz1cInN3aXRjaEtpdFByb2QoaW5kZXgpXCIgdi1pZj1cInByb2R1Y3QuYWN0aXZlXCIgPlRyb2NhcjwvZGl2PicgKyAnPGRpdiBjbGFzcz1cIl9jaGFvcmRpYy1raXQtb24tb2ZmXCI+JyArICc8ZGl2IGNsYXNzPVwiX2NoYW9yZGljLWtpdC1vbiBfY2hhb3JkaWMtYnRuXCIgQGNsaWNrPVwicmVtb3ZlS2l0UHJvZChpbmRleClcIiB2LWlmPVwicHJvZHVjdC5hY3RpdmVcIj5SZW1vdmVyPC9kaXY+JyArICc8ZGl2IGNsYXNzPVwiX2NoYW9yZGljLWtpdC1vZmYgX2NoYW9yZGljLWJ0blwiIEBjbGljaz1cImJyaW5nQmFja0tpdFByb2QoaW5kZXgpXCIgdi1lbHNlPlRyYXplciBkZSB2b2x0YTwvZGl2PicgKyAnPC9kaXY+JyArICc8L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJfY2hhb3JkaWMta2l0LXByb2R1Y3RzXCI+JyArICc8ZGl2IGNsYXNzPVwiX3ByZFwiIGRhdGEtc2hvd2Nhc2U9XCJyZWNvbW1lbmRhdGlvbnNcIiAnICsgJzpjbGFzcz1cImdldENhdENsYXNzKHByb2R1Y3QpXCIgJyArICc+JyArICRwcm9kdWN0ICsgJzwvZGl2PicgKyAnPC9kaXY+JyArICc8L2Rpdj4nICsgJzwvZGl2Pic7XG4gICAgdmFyICRwcm9kdWN0X2tpdF90b3RhbHMgPSAnJyArICc8ZGl2IGNsYXNzPVwiX2NoYW9yZGljLWtpdC10b3RhbHNcIiB2LWlmPVwia2l0cy5sZW5ndGg+MFwiPicgKyAnPGRpdiBjbGFzcz1cIl9jaGFvcmRpYy1raXQtc3VtbWFyeVwiPicgKyAnPGRpdiBjbGFzcz1cIl9raXQtdGl0bGVcIiB2LWlmPVwia2l0X3RvdGFscy50aXRsZVwiIHYtaHRtbD1raXRfdG90YWxzLnRpdGxlPjwvZGl2PicgKyAnPGRpdiBjbGFzcz1cIl9raXQtcHJpY2UtcmVndWxhclwiIHYtaWY9XCJraXRfdG90YWxzLnJlZ3VsYXI+MFwiIHYtaHRtbD1mb3JtYXRQcmljZShraXRfdG90YWxzLnJlZ3VsYXIpPjwvZGl2PicgKyAnPGRpdiBjbGFzcz1cIl9raXQtcHJpY2Utc2FsZVwiIHYtaWY9XCJraXRfdG90YWxzLnNhbGVcIiB2LWh0bWw9Zm9ybWF0UHJpY2Uoa2l0X3RvdGFscy5zYWxlKT48L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJfa2l0LWJ1dHRvblwiIHYtaWY9XCJraXRfdG90YWxzLmJ1dHRvblwiID48YSBAY2xpY2s9XCJidXlQcm9kdWN0cygpXCI+e3sga2l0X3RvdGFscy4gYnV0dG9uIH19PC9hPjwvZGl2PicgKyAnPC9kaXY+JyArICc8L2Rpdj4nO1xuICAgIHZhciAkc2hvd2Nhc2UgPSAnJztcbiAgICAkc2hvd2Nhc2UgPSAnPGRpdiBjbGFzcz1cIl9fdml0cmluZXMgX2NoYW9yZGljLWluZm8gX2NoYW9yZGljLXdyYXBwZXJcIiAnICsgJ3YtaWY9XCJwcm9kdWN0cy5sZW5ndGg+MHx8a2l0cy5sZW5ndGg+MFwiICcgKyAnZGF0YS1zaG93Y2FzZT1cInJlY29tbWVuZGF0aW9uc1wiICcgKyAnOmNsYXNzPVwiW3Nob3djYXNlLmluZm8ucmVmc19vbiwgY29udmVydDJjbGFzcyhzaG93Y2FzZS5pbmZvLmZlYXR1cmUpLCBsb2FkaW5nQ2xhc3MoX2xvYWRpbmcpXVwiICcgKyAnOmRhdGEtY2hhb3JkaWMtaW5kZXg9XCJzaG93Y2FzZS5pbmRleFwiICcgKyAnOmRhdGEtaW1wcmVzc2lvbi11cmw9XCJzaG93Y2FzZS5pbmZvLmltcHJlc3Npb25VcmxcIiAnICsgJzpkYXRhLXBhZ2U9XCJzaG93Y2FzZS5pbmZvLnBhZ2VcIiAnICsgJzpkYXRhLW5hbWU9XCJzaG93Y2FzZS5pbmZvLm5hbWVcIiAnICsgJzpkYXRhLWZlYXR1cmU9XCJzaG93Y2FzZS5pbmZvLmZlYXR1cmVcIiAnICsgJzpkYXRhLXNoZWxmPVwic2hvd2Nhc2UuaW5mby5zaGVsZlwiICcgKyAnID4nICtcbiAgICAvLyAnPGRpdiBjbGFzcz1cIl9jaGFvcmRpYy1oZWFkZXJcIj4nICtcbiAgICAvLyAgICAgJzxkaXYgY2xhc3M9XCJfY2hhb3JkaWMtY29udHJvbFwiIHYtaWY9XCJyZWZzLmxlbmd0aD4wXCI+JyArXG4gICAgLy8gICAgICAgICAnPHNwYW4gdi1odG1sPXNob3djYXNlLmluZm8uc3VidGl0bGUgY2xhc3M9XCJfY2hhb3JkaWMtY29udHJvbC10aXRsZVwiID48L3NwYW4+JyArXG4gICAgLy8gICAgICAgICAnPGEgdi1pZj0hc2hvd2Nhc2UuaW5mby52ZXJ0aWNhbCBAY2xpY2s9XCJzd2l0Y2hQcm9kKClcIiBjbGFzcz1cIl9fc3dpdGNoLWJ0blwiPjwvYT4nICtcbiAgICAvLyAgICAgJzwvZGl2PicgK1xuICAgIC8vICAgICAnPGRpdiBjbGFzcz1cIl9jaGFvcmRpYy10aXRsZVwiPjxoMiB2LWh0bWw9c2hvd2Nhc2UuaW5mby50aXRsZT48L2gyPjwvZGl2PicgK1xuICAgIC8vICc8L2Rpdj4nICtcbiAgICAnPGRpdiBjbGFzcz1cIl9maWx0ZXJzXCIgdi1pZj1cImZpbHRlcnMubGVuZ3RoPjFcIiA+JyArICc8YSBAY2xpY2s9XCJjdXN0b21GaWx0ZXIoXFwnYWxsXFwnKVwiICcgKyAnOmNsYXNzPVwie19fc2VsZWN0ZWQ6Y2F0ZWdvcnkgPT0gXFwnYWxsXFwnfVwiICcgKyAnID5WZXIgdG9kb3M8L2E+JyArICc8YSB2LWZvcj1cIihmaWx0ZXIsIGluZGV4KSBpbiBmaWx0ZXJzXCIgJyArICdAY2xpY2s9XCJjdXN0b21GaWx0ZXIoZmlsdGVyKVwiICcgKyAnOmNsYXNzPVwie19fc2VsZWN0ZWQ6Y2F0ZWdvcnkgPT0gZmlsdGVyfVwiICcgKyAnID4nICsgJ3t7IGZpbHRlciB9fScgKyAnPC9hPicgKyAnPC9kaXY+JyArICc8ZGl2IGNsYXNzPVwiX2NoYW9yZGljLXNob3djYXNlLXdyYXBwZXJcIj4nICtcbiAgICAvKiBpbnNlcnQgaGVyZSBwcm9kdWN0IHdpdGggc3dpdGNoICovXG4gICAgJHByb2R1Y3RfcmVmcyArICRwcm9kdWN0X3Nob3djYXNlICsgJHByb2R1Y3Rfa2l0cyArICRwcm9kdWN0X2tpdF90b3RhbHMgKyAnPC9kaXY+JyArICc8L2Rpdj4nO1xuICAgIC8qKiBIZWxwZXIgZnVuY3Rpb25zICovXG4gICAgU3RyaW5nLnByb3RvdHlwZS5maXhQYXRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8yMDAtMjAwLywgXCIxNjQtMTY0XCIpLnJlcGxhY2UoLy4qP1xcLy8sIFwiL1wiKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUuZml4VVJMID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eLio/W146XFwvXVxcL1tcXC9dKi8sIFwiL1wiKTtcbiAgICB9O1xuICAgIHZhciBhZGREaXNjb3VudERhdGEgPSBmdW5jdGlvbiBhZGREaXNjb3VudERhdGEocF9kYXRhKSB7XG4gICAgICAgIHZhciBkYXRhID0gcF9kYXRhO1xuICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24gKG5keCwgbGV2ZWwpIHtcbiAgICAgICAgICAgICQuZWFjaChsZXZlbCwgZnVuY3Rpb24gKG5keDAsIGxldmVsX2VsZW1zKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGxldmVsX2VsZW1zLCBmdW5jdGlvbiAobmR4MSwgbGV2ZWxfZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmR4MSA9PSBcImRpc3BsYXlzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChsZXZlbF9lbGVtLCBmdW5jdGlvbiAobmR4MiwgbGV2ZWxfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChsZXZlbF9kYXRhLnJlY29tbWVuZGF0aW9ucywgZnVuY3Rpb24gKG5keDIsIHByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWd1bGFyUHJpY2UgPSBwcm9kdWN0Lm9sZFByaWNlIHx8IHByb2R1Y3QucHJpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcHJpY2UgPSBwcm9kdWN0LnByaWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Rpc2NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9yZWd1bGFyUHJpY2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGlzY291bnQgPSAxICogTWF0aC5mbG9vcigxMDAgLSBfcHJpY2UgLyBfcmVndWxhclByaWNlICogMTAwKS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3Quc2F2aW5ncyA9IDEgKiAoX3JlZ3VsYXJQcmljZSAtIF9wcmljZSkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdC5kaXNjb3VudCA9IF9kaXNjb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9kdWN0LnVybCA9IHByb2R1Y3QudXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm9kdWN0LnVybCA9IFtwcm9kdWN0LnVybCxwcm9kdWN0LnNrdXNbMF0uc2t1XS5qb2luKCc/aWRza3U9Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIHZhciBhZGRTa3VzID0gZnVuY3Rpb24gYWRkU2t1cyhwX2RhdGEsIGNiKSB7XG4gICAgICAgIHZhciBkZmQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgIHZhciBkYXRhID0gcF9kYXRhO1xuICAgICAgICB2YXIgdXRscyA9IG5ldyBVdGxzKCk7XG4gICAgICAgIHZhciBwcm9kdWN0SWRMaXN0ID0gW107XG4gICAgICAgIHZhciBsb29wID0gZnVuY3Rpb24gbG9vcChza3VMaXN0KSB7XG4gICAgICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24gKGtleSwgbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAvKiBsZXZlbCBkaXNwbGF5cyAqL1xuICAgICAgICAgICAgICAgICQuZWFjaChsZXZlbCwgZnVuY3Rpb24gKGtleTAsIHByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFza3VMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KHByb2R1Y3QuaWQsIHByb2R1Y3RJZExpc3QpIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWRMaXN0LnB1c2gocHJvZHVjdC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0LnNrdXMgPSBza3VMaXN0W3Byb2R1Y3QuaWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgbG9vcCgpO1xuICAgICAgICBpZiAocHJvZHVjdElkTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgdXRscyA9IG5ldyBVdGxzKCk7XG4gICAgICAgICAgICB1dGxzLmdldFNrdUxpc3QocHJvZHVjdElkTGlzdCkudGhlbihmdW5jdGlvbiAoc2t1UmVzdWx0cykge1xuICAgICAgICAgICAgICAgIHZhciBza3VMaXN0ID0ge307XG4gICAgICAgICAgICAgICAgJC5lYWNoKHNrdVJlc3VsdHMsIGZ1bmN0aW9uIChuZHgsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2t1TGlzdCA9ICQuZXh0ZW5kKHNrdUxpc3QsIGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxvb3Aoc2t1TGlzdCk7XG4gICAgICAgICAgICAgICAgZGZkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBkZmQucmVqZWN0KCdFcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGZkLnByb21pc2UoKTtcbiAgICB9O1xuXG4gICAgLyoqICNDaGFvcmRpYyBmdW5jdGlvbnMgKi9cbiAgICB2YXIgZ2V0Q2hhb3JkaWNDcmVkZW50aWFscyA9IGZ1bmN0aW9uIGdldENoYW9yZGljQ3JlZGVudGlhbHMocHJvZHVjdElkKSB7XG4gICAgICAgIC8vIFU3SjhFNlh5cXJJc0M4YnY0cDNKYlElM0QlM0RcbiAgICAgICAgdmFyIGlzRGVza3RvcCA9ICQod2luZG93KS53aWR0aCgpID4gMTAyNDtcbiAgICAgICAgdmFyIHNlY3JldEtleSA9ICdyejRZWUNORmxXQW5QZG9nUnBMZFJ3PT0nO1xuICAgICAgICBzZWNyZXRLZXkgPSBlbmNvZGVVUklDb21wb25lbnQoc2VjcmV0S2V5KTtcbiAgICAgICAgdmFyIHVybCA9ICcnLFxuICAgICAgICAgICAgcXVlcnkgPSAnJyxcbiAgICAgICAgICAgIHVybF9iYXNlID0gJ2h0dHBzOi8vcmVjcy5jaGFvcmRpY3N5c3RlbXMuY29tL3YwL3BhZ2VzL3JlY29tbWVuZGF0aW9ucycsXG4gICAgICAgICAgICBjb29raWVfbmFtZSA9ICdjaGFvcmRpY19icm93c2VySWQnO1xuICAgICAgICB2YXIgZGV2aWNlSWQgPSBnZXRDb29raWUoY29va2llX25hbWUpIHx8ICdkZXYwMDEnO1xuICAgICAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICAgICAgYXBpS2V5OiAncWRiLXZ0ZXgnLFxuICAgICAgICAgICAgZGV2aWNlSWQ6IGRldmljZUlkLFxuICAgICAgICAgICAgc2VjcmV0S2V5OiBzZWNyZXRLZXkgLy8gJ3J6NFlZQ05GbFdBblBkb2dScExkUnclM0QlM0QnXG4gICAgICAgIH07XG4gICAgICAgIHZhciBjb25maWdfZXh0cmEgPSB7XG4gICAgICAgICAgICBuYW1lOiAnaG9tZScsXG4gICAgICAgICAgICBzb3VyY2U6ICdtb2JpbGUnLFxuICAgICAgICAgICAgcHJvZHVjdEZvcm1hdDogJ2NvbXBhY3QnXG4gICAgICAgIH07XG4gICAgICAgIGlmIChpc0Rlc2t0b3ApIHtcbiAgICAgICAgICAgIGNvbmZpZ19leHRyYSA9ICQuZXh0ZW5kKGNvbmZpZ19leHRyYSwgeyBzb3VyY2U6ICdkZXNrdG9wJyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnX21vYmktb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISFwcm9kdWN0SWQgJiYgcHJvZHVjdElkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHVybF9iYXNlID0gJ2h0dHBzOi8vcmVjcy5jaGFvcmRpY3N5c3RlbXMuY29tL3YwL3Byb2R1Y3RzL3JlY29tbWVuZGF0aW9ucyc7XG4gICAgICAgICAgICB2YXIgY29uZmlnX2V4dHJhID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzaW1pbGFyJyxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25maWcgPSAkLmV4dGVuZChjb25maWcsIGNvbmZpZ19leHRyYSk7XG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25maWcudXJsID0gZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luICsgZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgICB2YXIgcGFnZVR5cGUgPSB7XG4gICAgICAgICAgICAgICAgJ290aGVyJzogJ290aGVyJyxcbiAgICAgICAgICAgICAgICAnZGVwYXJ0YW1lbnRvJzogJ2NhdGVnb3J5JywgJ2RlcGFydGFtZW50JzogJ2NhdGVnb3J5JywgJ2RlcHQnOiAnY2F0ZWdvcnknLCAnY2F0ZWdvcmlhJzogJ3N1YmNhdGVnb3J5JywgJ2NhdGVnb3J5JzogJ3N1YmNhdGVnb3J5JywgJ2NhdCc6ICdzdWJjYXRlZ29yeSdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25maWcubmFtZSA9IHBhZ2VUeXBlWyQoJ2JvZHknKS5hdHRyKCdpZCcpIHx8IFwib3RoZXJcIl07XG4gICAgICAgICAgICB2YXIgYXR0ckNoYW9yZGljTWV0YSA9ICQoJ1tjaGFvcmRpY19zcGVjaWFsXScpLmF0dHIoJ2NoYW9yZGljX3NwZWNpYWwnKSB8fCBcIlwiO1xuICAgICAgICAgICAgaWYgKGF0dHJDaGFvcmRpY01ldGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5uYW1lID0gYXR0ckNoYW9yZGljTWV0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgY2hhb3JkaWNfc3BlY2lhbCAmJiBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgY2hhb3JkaWNfc3BlY2lhbC5wYWdlICYmIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBjaGFvcmRpY19zcGVjaWFsLnBhZ2UubmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5uYW1lID0gY2hhb3JkaWNfc3BlY2lhbC5wYWdlLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHF1ZXJ5ID0gZGVjb2RlVVJJQ29tcG9uZW50KCQucGFyYW0oY29uZmlnKSk7XG4gICAgICAgIHVybCA9IHVybF9iYXNlICsgJz8nICsgcXVlcnk7XG4gICAgICAgIHJldHVybiB7IGNvbmZpZzogY29uZmlnLCB1cmw6IHVybCB9O1xuICAgIH07XG4gICAgdmFyIGxvYWRDaGFvcmRpY0RhdGEgPSBmdW5jdGlvbiBsb2FkQ2hhb3JkaWNEYXRhKHByb2R1Y3RJZCwgb25TdWNjZXNzLCB0eXBlKSB7XG4gICAgICAgIGlmICgkKCcuX3RvcCwuX21pZGRsZSwuX2JvdHRvbScpLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoYW9yZGljX3NwZWNpYWwgPSB3aW5kb3cuY2hhb3JkaWNfc3BlY2lhbCB8fCB7fTtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlIHx8IFwiU2ltaWxhclwiO1xuICAgICAgICB2YXIgY3JlZGVudGlhbHMgPSBnZXRDaGFvcmRpY0NyZWRlbnRpYWxzKHByb2R1Y3RJZCk7XG4gICAgICAgIGNyZWRlbnRpYWxzLnR5cGUgPSB0eXBlO1xuICAgICAgICBjcmVkZW50aWFscy5jaGFvcmRpY19zcGVjaWFsID0gY2hhb3JkaWNfc3BlY2lhbDtcbiAgICAgICAgdmFyIG1vdW50Q2hhb3JkaWNTaG93Y2FzZXMgPSBmdW5jdGlvbiBtb3VudENoYW9yZGljU2hvd2Nhc2VzKGNoYW9yZGljRGF0YSkge1xuICAgICAgICAgICAgdmFyIF9jaGFvcmRpY0RhdGEgPSBjaGFvcmRpY0RhdGE7XG4gICAgICAgICAgICBtb3VudENoYW9yZGljKF9jaGFvcmRpY0RhdGEsIGNyZWRlbnRpYWxzKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc3VjY2VzcyA9IGZ1bmN0aW9uIHN1Y2Nlc3MoY2hhb3JkaWNEYXRhKSB7XG4gICAgICAgICAgICBpZiAoISFjaGFvcmRpY19zcGVjaWFsLmV4dHJhcykge1xuICAgICAgICAgICAgICAgICQuZWFjaChjaGFvcmRpY19zcGVjaWFsLmV4dHJhcy5kaXNwbGF5cywgZnVuY3Rpb24gKG5keCwgc2hvd2Nhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3BsYXlzX2xlbmd0aCA9IGNoYW9yZGljX3NwZWNpYWwuZXh0cmFzLmRpc3BsYXlzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZXZlbCA9ICd0b3AnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzcGxheV9pbmRleCA9IHNob3djYXNlLmluZGV4IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXNob3djYXNlLmZlYXR1cmUgJiYgc2hvd2Nhc2UuZmVhdHVyZSA9PT0gXCJGcmVxdWVudGx5Qm91Z2h0VG9nZXRoZXJcIiAmJiBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBVdGxzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiogY29tcHJlIGp1bnRvICovXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgd2luZG93Ll9fX2xvYWRpbmdDaGFvcmRpYztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsID0gc2hvd2Nhc2UubGV2ZWwgfHwgbGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkQ2hhb3JkaWNEYXRhKHNob3djYXNlLnNrdSwgZnVuY3Rpb24gKGV4dHJhc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYXNEYXRhLmNvbHVtbnMgPSAhIXNob3djYXNlLmNvbHVtbnMgJiYgc2hvd2Nhc2UuY29sdW1ucyA+IDAgPyBzaG93Y2FzZS5jb2x1bW5zIDogMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYXNEYXRhLmZlYXR1cmUgPSBcIkZyZXF1ZW50bHlCb3VnaHRUb2dldGhlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhc0RhdGEudGl0bGUgPSBzaG93Y2FzZS50aXRsZSB8fCBcIkNvbXByZSBqdW50b1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW9yZGljRGF0YVtsZXZlbF0uc3BsaWNlKGRpc3BsYXlfaW5kZXgsIDAsIGV4dHJhc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZHggPT0gZGlzcGxheXNfbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50Q2hhb3JkaWNTaG93Y2FzZXMoY2hhb3JkaWNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghIXNob3djYXNlLmZlYXR1cmUgJiYgc2hvd2Nhc2UuZmVhdHVyZSA9PT0gXCJTaW1pbGFyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBzaW1pbGFyZXMgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3cuX19fbG9hZGluZ0NoYW9yZGljO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSBzaG93Y2FzZS5sZXZlbCB8fCBsZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRDaGFvcmRpY0RhdGEoc2hvd2Nhc2Uuc2t1LCBmdW5jdGlvbiAoZXh0cmFzRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhc0RhdGEuZmVhdHVyZSA9IFwiU2ltaWxhclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhc0RhdGEudGl0bGUgPSBzaG93Y2FzZS50aXRsZSB8fCBcIlByb2R1dG9zIHNpbWlsYXJlc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW9yZGljRGF0YVtsZXZlbF0uc3BsaWNlKGRpc3BsYXlfaW5kZXgsIDAsIGV4dHJhc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZHggPT0gZGlzcGxheXNfbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50Q2hhb3JkaWNTaG93Y2FzZXMoY2hhb3JkaWNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50Q2hhb3JkaWNTaG93Y2FzZXMoY2hhb3JkaWNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb3VudENoYW9yZGljU2hvd2Nhc2VzKGNoYW9yZGljRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCEhb25TdWNjZXNzICYmICdmdW5jdGlvbicgPT09IHR5cGVvZiBvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF3aW5kb3cuX19fbG9hZGluZ0NoYW9yZGljKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogY3JlZGVudGlhbHMudXJsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgICAgICAgIH0pLnN1Y2Nlc3Moc3VjY2VzcykgLypvbmx5IGlmIHJlc3BvbnNlIDIwMCovXG4gICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgd2luZG93Ll9fX2xvYWRpbmdDaGFvcmRpYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93Ll9fX2xvYWRpbmdDaGFvcmRpYyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICB2YXIgZml4TGF6eSA9IGZ1bmN0aW9uIGZpeExhenkoKSB7XG4gICAgICAgIHZhciBfaW1nID0gJCgnLnNlY3Rpb24tY2hhb3JkaWMgLl9yZWYtcHJkIGltZ1tzcmMqPVwiX2ltZy10cmFuc3BhcmVudC5naWZcIl0nKTtcbiAgICAgICAgdmFyIHNyYyA9IF9pbWcuYXR0cignZGF0YS1sYXp5Jyk7XG4gICAgICAgIF9pbWcuYXR0cihcInNyY1wiLCBzcmMpO1xuICAgIH07XG4gICAgLyoqIENoYW9yZGljIG1vdW50IHNob3djYXNlcyAqL1xuICAgIHZhciBtb3VudENoYW9yZGljID0gZnVuY3Rpb24gbW91bnRDaGFvcmRpYyhwX2NoYW9yZGljRGF0YSwgcF9zZXR0aW5ncykge1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSBwX3NldHRpbmdzO1xuICAgICAgICB2YXIgdmVydGljYWxTaG93Y2FzZXMgPSBbJ0hpc3RvcnlQZXJzb25hbGl6ZWQnXTtcbiAgICAgICAgdmFyIGZpbHRlcnNPZmZTaG93Y2FzZXMgPSBbJ0hpc3RvcnlQZXJzb25hbGl6ZWQnLCAnTmV3NFlvdScsICdWaWV3UGVyc29uYWxpemVkJywgJ0NhcnRQZXJzb25hbGl6ZWQnLCAnUHVyY2hhc2VQZXJzb25hbGl6ZWQnLCAnTW9zdFBvcHVsYXInLCAnT2ZmZXJzJywgJ0ZlYXR1cmVkJywgJ1B1c2gnXTtcbiAgICAgICAgdmFyIHNwZWNpYWxTaG93Y2FzZSA9IFsnRnJlcXVlbnRseUJvdWdodFRvZ2V0aGVyJ107XG4gICAgICAgIHZhciBnZXRQcm9kdWN0c1NrdXMgPSBbJ0ZyZXF1ZW50bHlCb3VnaHRUb2dldGhlciddO1xuICAgICAgICB2YXIgZG9Ob3RSZW5kZXIgPSBbJ0hpc3RvcnlQZXJzb25hbGl6ZWQnXTtcbiAgICAgICAgdmFyIGNoYW9yZGljRGF0YSA9IHBfY2hhb3JkaWNEYXRhIHx8IHt9O1xuICAgICAgICB2YXIgY29sdW1ucyA9IDI7XG4gICAgICAgIHZhciBwYWdlID0gc2V0dGluZ3MucGFnZVR5cGUgfHwgXCJvdGhlclwiO1xuICAgICAgICB2YXIgY2hhb3JkaWNfc3BlY2lhbCA9IHNldHRpbmdzLmNoYW9yZGljX3NwZWNpYWwgfHwge307XG4gICAgICAgIHZhciBzcGVjaWFsU2V0c0F2YWlsYWJsZSA9IFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBjaGFvcmRpY19zcGVjaWFsLmV4dHJhcyAmJiBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgY2hhb3JkaWNfc3BlY2lhbC5leHRyYXMuc3BlY2lhbCAmJiBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgY2hhb3JkaWNfc3BlY2lhbC5leHRyYXMuc3BlY2lhbC5wYWdlcyAmJiBjaGFvcmRpY19zcGVjaWFsLmV4dHJhcy5zcGVjaWFsLnBhZ2VzLmxlbmd0aCA+IDA7XG4gICAgICAgIHdpbmRvdy52dWVzID0gW107XG4gICAgICAgIGNoYW9yZGljRGF0YSA9IGFkZERpc2NvdW50RGF0YShjaGFvcmRpY0RhdGEpO1xuICAgICAgICAkLmVhY2goY2hhb3JkaWNEYXRhLCBmdW5jdGlvbiAobGFiZWwsIGxldmVscykge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgICAgICQuZWFjaChsZXZlbHMsIGZ1bmN0aW9uIChuZHgsIGxldmVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZlYXR1cmUgPSBsZXZlbC5mZWF0dXJlO1xuICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkoZmVhdHVyZSwgZG9Ob3RSZW5kZXIpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgY2Fyb3VzZWxPZmYgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgdmVydGljYWwgPSAkLmluQXJyYXkoZmVhdHVyZSwgdmVydGljYWxTaG93Y2FzZXMpID49IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlcnNPZmYgPSAkLmluQXJyYXkoZmVhdHVyZSwgZmlsdGVyc09mZlNob3djYXNlcykgPj0gMCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgc3BlY2lhbFNob3djYXNlT24gPSAkLmluQXJyYXkoZmVhdHVyZSwgc3BlY2lhbFNob3djYXNlKSA+PSAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBnZXRQcm9kdWN0c1NrdXNPbiA9ICQuaW5BcnJheShmZWF0dXJlLCBnZXRQcm9kdWN0c1NrdXMpID49IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWNpYWxTZXRzQXZhaWxhYmxlICYmIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBjaGFvcmRpY19zcGVjaWFsLmV4dHJhcy5zcGVjaWFsLnBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChjaGFvcmRpY19zcGVjaWFsLmV4dHJhcy5zcGVjaWFsLnBhZ2VzLCBmdW5jdGlvbiAobmR4LCBwYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZSA9PSBwYWdlLmZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJvdXNlbE9mZiA9ICFwYWdlLmNhcm91c2VsIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnNPZmYgPSAhcGFnZS5tZW51IHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNwZWNpYWxTaG93Y2FzZU9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnMgPSAhIWxldmVsLmNvbHVtbnMgJiYgbGV2ZWwuY29sdW1ucyA+IDAgPyBsZXZlbC5jb2x1bW5zIDogMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlcyA9IDQ7XG4gICAgICAgICAgICAgICAgdmFyIGNhcm91c2VsX3ZlcnRfb3B0cyA9IHt9O1xuICAgICAgICAgICAgICAgIHZhciBjYXJvdXNlbF9vcHRzID0ge307XG4gICAgICAgICAgICAgICAgdmFyIHJlZnMgPSBsZXZlbC5kaXNwbGF5c1swXS5yZWZlcmVuY2VzO1xuICAgICAgICAgICAgICAgIHZhciByZWZzX3ByaWNlID0geyByZWd1bGFyOiAwLCBzYWxlOiAwIH07XG4gICAgICAgICAgICAgICAgdmFyIHJlZnNfbGVuZ3RoID0gcmVmcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIHJlZnNfb24gPSAnJztcbiAgICAgICAgICAgICAgICBpZiAocmVmc19sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWZzX3ByaWNlID0geyByZWd1bGFyOiByZWZzWzBdLm9sZFByaWNlLCBzYWxlOiByZWZzWzBdLnByaWNlIH07XG4gICAgICAgICAgICAgICAgICAgIHJlZnNfb24gPSAnX3JlZnMtb24nICsgKHJlZnNfbGVuZ3RoID4gMSA/ICcgX3N3aXRjaC1idG4tb24nIDogJycpO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXMgPSBzbGlkZXMgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZihnZXRQcm9kdWN0c1NrdXNPbikge1xuICAgICAgICAgICAgICAgIC8vIGxldmVsLmRpc3BsYXlzWzBdID0gYWRkU2t1cyhsZXZlbC5kaXNwbGF5c1swXSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICByZWZzX29uID0gJ19yZWZzLW9uICBfdmVydGljYWwnO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXMgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXJvdXNlbF92ZXJ0X29wdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnPHNwYW4gY2xhc3M9XCJfcHJldiBzbGljay1wcmV2XCI+PC9zcGFuPicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICc8c3BhbiBjbGFzcz1cIl9uZXh0IHNsaWNrLW5leHRcIj48L3NwYW4+J1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXJvdXNlbF9vcHRzID0gJC5leHRlbmQoY2Fyb3VzZWxfb3B0cywge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IHNsaWRlcyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IHNsaWRlcyxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDg4MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiBzbGlkZXMgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiBzbGlkZXMgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA1NzYsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgc2hvd2Nhc2VfY29udGFpbmVyID0gJy5fXycgKyBsYWJlbCArIGluZGV4ICsgJ19fJztcbiAgICAgICAgICAgICAgICAkKCcuXycgKyBsYWJlbCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiJyArIHNob3djYXNlX2NvbnRhaW5lci5zdWJzdHIoMSkgKyAnXCI+PGNoYW9yZGljPjwvY2hhb3JkaWM+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFTZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvd2Nhc2U6IHt9LFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBraXRzX3JlbWFpbmluZzogW10sXG4gICAgICAgICAgICAgICAgICAgIGtpdHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBraXRfdG90YWxzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgcmVmczogW10sXG4gICAgICAgICAgICAgICAgICAgIGFsbF9kYXRhOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgX2xvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIFZ1ZSAmJiBWdWUuY29tcG9uZW50KCdjaGFvcmRpYycsIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICRzaG93Y2FzZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhU2V0O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBmdW5jdGlvbiBjcmVhdGVkKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTaG93Y2FzZUluZm8oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RmlsdGVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSZWZzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNwZWNpYWxTaG93Y2FzZU9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9kdWN0cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzcGVjaWFsU2hvd2Nhc2VPbiAmJiBsZXZlbC5kaXNwbGF5c1swXS5yZWZlcmVuY2VzIGluc3RhbmNlb2YgQXJyYXkgJiYgXCJhdmFpbGFibGVcIiA9PT0gbGV2ZWwuZGlzcGxheXNbMF0ucmVmZXJlbmNlc1swXS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXZlbC5kaXNwbGF5c1swXSA9IGFkZFNrdXMobGV2ZWwuZGlzcGxheXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKHRoaXMuc2V0S2l0cygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuc2V0S2l0c1N1bW1hcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hQcm9kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW91bnRDYXJvdXNlbFZlcnRpY2FsKHNob3djYXNlX2NvbnRhaW5lciArICcgLl9jaGFvcmRpYy1yZWZzIC5fY2hhb3JkaWMtcmVmcy1wcm9kdWN0cycsIGNhcm91c2VsX3ZlcnRfb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd2Nhc2VJbmZvOiBmdW5jdGlvbiBzZXRTaG93Y2FzZUluZm8oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Y2FzZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Y2FzZTogdmVydGljYWwgPyBcInJlZmVyZW5jZXNcIiA6IFwicmVjb21tZW5kYXRpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGxldmVsLnN1YnRpdGxlIHx8IGxldmVsLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGU6IGxldmVsLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbGV2ZWwubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmU6IGxldmVsLmZlYXR1cmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGVsZjogbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZzX29uOiByZWZzX29uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wcmVzc2lvblVybDogbGV2ZWwuaW1wcmVzc2lvblVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsOiB2ZXJ0aWNhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGaWx0ZXJzOiBmdW5jdGlvbiBzZXRGaWx0ZXJzKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJzT2ZmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0cyA9IGxldmVsLmRpc3BsYXlzWzBdLnJlY29tbWVuZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChwcm9kdWN0cywgZnVuY3Rpb24gKG5keCwgcHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIHByb2R1Y3QuY2F0ZWdvcmllcyAmJiBwcm9kdWN0LmNhdGVnb3JpZXMubGVuZ3RoID4gMiAmJiBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgcHJvZHVjdC5jYXRlZ29yaWVzWzJdLmlkICYmICQuaW5BcnJheShwcm9kdWN0LmNhdGVnb3JpZXNbMl0uaWQsIGZpbHRlcnMpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVycy5wdXNoKHByb2R1Y3QuY2F0ZWdvcmllc1syXS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gLy8gaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCA+IDEpIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UHJvZHVjdHM6IGZ1bmN0aW9uIHNldFByb2R1Y3RzKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW91bnRDaGFvcmRpYyhsZXZlbC5kaXNwbGF5c1swXS5yZWNvbW1lbmRhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlZnM6IGZ1bmN0aW9uIHNldFJlZnMoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzID0gcmVmcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRLaXRzOiBmdW5jdGlvbiBzZXRLaXRzKHBfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcF9kYXRhIHx8IGxldmVsLmRpc3BsYXlzWzBdLnJlY29tbWVuZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3X2RhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0UHJvZHVjdHNTa3VzT24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uIChuZHgsIGRhdHVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdHVtLnNrdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdfZGF0YS5wdXNoKGRhdHVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2l0cyA9IG5ld19kYXRhLnNwbGljZSgwLCBjb2x1bW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtpdHNfcmVtYWluaW5nID0gbmV3X2RhdGEuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtpdF90b3RhbHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlZhbG9yIGRvcyBpdGVuc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWd1bGFyOiBcIlIkIDAsMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IFwiUiQgMCwwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b246ICdDb21wcmFyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0S2l0c1N1bW1hcnk6IGZ1bmN0aW9uIHNldEtpdHNTdW1tYXJ5KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZzID0gdGhpcy5yZWZzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBraXRzID0gdGhpcy5raXRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmljZXMgPSByZWZzX3ByaWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBraXRzX2xlbmd0aCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VzLnJlZ3VsYXIgPSByZWZzWzBdLm9sZFByaWNlIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VzLnNhbGUgPSByZWZzWzBdLnByaWNlIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGtpdHMsIGZ1bmN0aW9uIChpbmRleCwga2l0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChraXQuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZXMucmVndWxhciArPSBraXQub2xkUHJpY2UgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlcy5zYWxlICs9IGtpdC5wcmljZSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2l0c19sZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IGtpdHNfbGVuZ3RoIDw9IDEgPyBcIlZhbG9yIGRlIFwiICsga2l0c19sZW5ndGggKyBcIiBcIiArIFwiaXRlbVwiIDogXCJWYWxvciBkb3MgXCIgKyBraXRzX2xlbmd0aCArIFwiIFwiICsgXCJpdGVuc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBraXRzX2xlbmd0aCA8PSAxID8gJ0NvbXByYXInIDogJ0NvbXByYXIganVudG8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBraXRfdG90YWxzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGU6IHByaWNlcy5zYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b246IGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByaWNlcy5yZWd1bGFyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraXRfdG90YWxzID0gJC5leHRlbmQoa2l0X3RvdGFscywgeyByZWd1bGFyOiBwcmljZXMucmVndWxhciB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5raXRfdG90YWxzID0ga2l0X3RvdGFscztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBidXlQcm9kdWN0czogZnVuY3Rpb24gYnV5UHJvZHVjdHMoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNrdXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza3VzLnB1c2godGhpcy5yZWZzWzBdLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2godGhpcy5raXRzLCBmdW5jdGlvbiAobmR4LCBraXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpdC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrdXMucHVzaChraXQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hZGQyY2FydChza3VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRTaG93Y2FzZUNsYXNzOiBmdW5jdGlvbiBnZXRTaG93Y2FzZUNsYXNzKHByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFtcIl8tc2hvd2Nhc2UtbGlzdC1fXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXJvdXNlbE9mZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJfLW5vLWNhcm91c2VsLV9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwiXy1jYXJvdXNlbC1fXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0S2l0Q2xhc3M6IGZ1bmN0aW9uIGdldEtpdENsYXNzKHByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvZHVjdC5hY3RpdmUpIHJldHVybiAnX2tpdC1vbic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdfa2l0LW9mZic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoS2l0UHJvZDogZnVuY3Rpb24gc3dpdGNoS2l0UHJvZChjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2l0c19yZW1haW5pbmcgPSB0aGlzLmtpdHNfcmVtYWluaW5nLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtpdHMgPSB0aGlzLmtpdHMuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3X2tpdCA9IGtpdHNfcmVtYWluaW5nLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2l0c19yZW1haW5pbmcucHVzaChraXRzLnNwbGljZShjb2x1bW4sIDEpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraXRzLnNwbGljZShjb2x1bW4sIDAsIG5ld19raXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2l0cyA9IGtpdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5raXRzX3JlbWFpbmluZyA9IGtpdHNfcmVtYWluaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0S2l0c1N1bW1hcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVLaXRQcm9kOiBmdW5jdGlvbiByZW1vdmVLaXRQcm9kKGNvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2l0c1tjb2x1bW5dLmFjdGl2ZSA9ICF0aGlzLmtpdHNbY29sdW1uXS5hY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRLaXRzU3VtbWFyeSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyaW5nQmFja0tpdFByb2Q6IGZ1bmN0aW9uIGJyaW5nQmFja0tpdFByb2QoY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5raXRzW2NvbHVtbl0uYWN0aXZlID0gIXRoaXMua2l0c1tjb2x1bW5dLmFjdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEtpdHNTdW1tYXJ5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5tb3VudENhcm91c2VsOiBmdW5jdGlvbiB1bm1vdW50Q2Fyb3VzZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJChzaG93Y2FzZV9jb250YWluZXIpLmZpbmQoJy5fLWNhcm91c2VsLV8gLnNsaWNrLW5hdicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoc2hvd2Nhc2VfY29udGFpbmVyKS5maW5kKCcuXy1jYXJvdXNlbC1fJykuc2xpY2soJ3Vuc2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VudENhcm91c2VsOiBmdW5jdGlvbiBtb3VudENhcm91c2VsKHBfZWxlbSwgcF9vcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Nhcm91c2VsT2ZmJyxjYXJvdXNlbE9mZilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2Fyb3VzZWxPZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IHBfb3B0cyB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRuZXh0VGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBseUNhcm91c2VsKHBfZWxlbSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRDYXJvdXNlbFZlcnRpY2FsOiBmdW5jdGlvbiBtb3VudENhcm91c2VsVmVydGljYWwocF9lbGVtLCBwX29wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IHBfb3B0cyB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRuZXh0VGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBseUNhcm91c2VsKHBfZWxlbSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRDaGFvcmRpYzogZnVuY3Rpb24gbW91bnRDaGFvcmRpYyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxfZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VudENhcm91c2VsKHNob3djYXNlX2NvbnRhaW5lciArICcgLl8tY2Fyb3VzZWwtXycsIGNhcm91c2VsX29wdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaFByb2Q6IGZ1bmN0aW9uIHN3aXRjaFByb2QoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9ICF0aGlzLl9sb2FkaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZzID0gdGhpcy5yZWZzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZzX2xlbmd0aCA9IHJlZnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWZzX2xlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIG5vdGhpbmcgdG8gZG8gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSByZWZzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gcmVmc1swXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZzLnB1c2gocmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnMgPSByZWZzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRDaGFvcmRpY0RhdGEoaWQsIGZ1bmN0aW9uIChjaGFvcmRpY1Jlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bm1vdW50Q2Fyb3VzZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGNoYW9yZGljUmVzdWx0cy5kaXNwbGF5c1swXS5yZWNvbW1lbmRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW91bnRDYXJvdXNlbChzaG93Y2FzZV9jb250YWluZXIgKyAnIC5fLWNhcm91c2VsLV8nLCBjYXJvdXNlbF9vcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9ICF0aGlzLl9sb2FkaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tRmlsdGVyOiBmdW5jdGlvbiBjdXN0b21GaWx0ZXIocF9maWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5ID0gcF9maWx0ZXIgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkQ2hhb3JkaWMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZENoYW9yZGljOiBmdW5jdGlvbiBmaWx0ZXJlZENoYW9yZGljKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5tb3VudENhcm91c2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlciA9IHRoaXMuY2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCdhbGwnID09PSBmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHRoaXMuYWxsX2RhdGEuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VudENhcm91c2VsKHNob3djYXNlX2NvbnRhaW5lciArICcgLl8tY2Fyb3VzZWwtXycsIGNhcm91c2VsX29wdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkX2RhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuYWxsX2RhdGEuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24gKG5keCwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jYXRlZ29yaWVzWzJdLmlkID09IGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRfZGF0YS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGZpbHRlcmVkX2RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VudENhcm91c2VsKHNob3djYXNlX2NvbnRhaW5lciArICcgLl8tY2Fyb3VzZWwtXycsIGNhcm91c2VsX29wdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU3RhdHVzOiBmdW5jdGlvbiBjaGVja1N0YXR1cyhhcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJnLnN0YXR1cyA9PSBcImF2YWlsYWJsZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEltYWdlOiBmdW5jdGlvbiBnZXRJbWFnZShwX3Byb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdCA9IHBfcHJvZHVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBwcm9kdWN0LmltYWdlc1snMTAwMHgxMDAwJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpemUgPSBcIjI1MFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSBcIjE4MFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKCdodG1sJykuaGFzQ2xhc3MoJ19tb2JpLW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IFwiMTQwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGltYWdlID0gaW1hZ2UucmVwbGFjZSgvLio/KFxcL2FycXVpdm9zLipcXC9pZHNcXC9cXGQqKSguKikoXFwvLiopLywgXCIkMS1cIitpbWdzaXplK1wiJDNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2UgPSBpbWFnZS5yZXBsYWNlKC8oLio/aWRzXFwvXFxkKi0pKC4qPykoXFwvLiopL2lnLCBcIiQxXCIgKyBzaXplICsgXCItXCIgKyBzaXplICsgXCIkM1wiKS5yZXBsYWNlKC9cXD8uKi8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvdnRleGltZy9pZy50ZXN0KGltYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSA9IFsnaHR0cHM6Ly8nLCBpbWFnZV0uam9pbignLycpLnJlcGxhY2UoLyhbXjpdKShbL117Mix9KS9nbSwgJyQxLycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlID0gWydodHRwczovL3FiYnIudnRleGltZy5jb20uYnInLCBpbWFnZV0uam9pbignLycpLnJlcGxhY2UoLyhbXjpdKShbL117Mix9KS9nbSwgJyQxLycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSA9IGltYWdlLnJlcGxhY2UoL1xcPy4qLywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNCZXN0UHJpY2U6IGZ1bmN0aW9uIGhhc0Jlc3RQcmljZShhcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBhcmcgJiYgXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGFyZy5vbGRQcmljZSAmJiBudWxsICE9PSBhcmcub2xkUHJpY2UgJiYgYXJnLm9sZFByaWNlID4gYXJnLnByaWNlIHx8IFwibnVtYmVyXCIgPT0gdHlwZW9mIGFyZy5vbGRQcmljZSAmJiBhcmcgPCAxMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1JlZ3VsYXJQcmljZTogZnVuY3Rpb24gY2hlY2tSZWd1bGFyUHJpY2UoYXJnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEoXCJvYmplY3RcIiA9PSAodHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYXJnKSkgJiYgbnVsbCA9PSBhcmcgfHwgXCJudW1iZXJcIiA9PSB0eXBlb2YgYXJnICYmIGFyZyA+IDEwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNJbnN0YWxsbWVudHM6IGZ1bmN0aW9uIGhhc0luc3RhbGxtZW50cyhhcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJvYmplY3RcIiA9PSAodHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYXJnKSkgJiYgYXJnID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmljZTogZnVuY3Rpb24gZm9ybWF0UHJpY2UocHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAxICogdmFsdWUucmVwbGFjZSgvUlxcJC9nLCBcIlwiKS5yZXBsYWNlKC9cXCwvLCBcIi5cIikudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuZm9ybWF0TW9uZXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0Rpc2NvdW50OiBmdW5jdGlvbiBjaGVja0Rpc2NvdW50KGFyZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgYXJnICYmIGFyZyA+IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQZXJjZW50YWdlOiBmdW5jdGlvbiBjaGVja1BlcmNlbnRhZ2UoYXJnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBhcmcgJiYgYXJnID4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRTa3U6IGZ1bmN0aW9uIGdldFNrdShwcm9kdWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3Quc2t1O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFNrdU5hbWU6IGZ1bmN0aW9uIGdldFNrdU5hbWUocHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gcHJvZHVjdC5uYW1lIHx8IHByb2R1Y3Quc2t1bmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93U2t1czogZnVuY3Rpb24gc2hvd1NrdXMocHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgcHJvZHVjdExlbmd0aCA9IFwib2JqZWN0XCI9PT10eXBlb2YgcHJvZHVjdC5za3VzJiZwcm9kdWN0LnNrdXMubGVuZ3RoPjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIHByb2R1Y3RMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0U2t1Q2xhc3M6IGZ1bmN0aW9uIGdldFNrdUNsYXNzKHByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2t1cyA9IHByb2R1Y3Quc2t1cyB8fCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza3VzLmxlbmd0aCA+IDEpIHJldHVybiAnX3NrdXMtbWFueSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNrdXMubGVuZ3RoID09IDEpIHJldHVybiAnX3NrdS1vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnX25vLXNrdXMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldENhdENsYXNzOiBmdW5jdGlvbiBnZXRDYXRDbGFzcyhpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhaXRlbS5jYXRlZ29yaWVzICYmIGl0ZW0uY2F0ZWdvcmllcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdCA9IGl0ZW0uY2F0ZWdvcmllc1syXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ID0gXCJfXCIgKyBjYXQuYWNjZW50c1RpZHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRUaXRsZTogZnVuY3Rpb24gZ2V0VGl0bGUocHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9kdWN0Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWx0OiBmdW5jdGlvbiBnZXRBbHQocHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlByb2R1dG86IFwiICsgcHJvZHVjdC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnQyY2xhc3M6IGZ1bmN0aW9uIGNvbnZlcnQyY2xhc3MoYXJnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZy5sZW5ndGggPD0gMCkgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IFwiX1wiICsgYXJnLmFjY2VudHNUaWR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nQ2xhc3M6IGZ1bmN0aW9uIGxvYWRpbmdDbGFzcyhhcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFyZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJfX3JvdGF0ZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0Q2xpY2tlZDogZnVuY3Rpb24gcHJvZHVjdENsaWNrZWQoT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHVybDJnbyA9IE9iai51cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGVnb3J5ID0gXCJWaXRyaW5lIENoYW9yZGljIENsaXF1ZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSBPYmoudHJhY2tpbmdVcmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gT2JqLmluZGV4IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhZ2UgPSBPYmoucGFnZSB8fCBcIm90aGVyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNob3djYXNlID0gT2JqLnNob3djYXNlIHx8IFwicmVjb21tZW5kYXRpb25zXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoZWxmID0gT2JqLnNoZWxmIHx8IFwidG9wXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZlYXR1cmUgPSBPYmouZmVhdHVyZSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBza3UgPSBPYmouaWQgfHwgXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBPYmoubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBbc2hlbGYsIGZlYXR1cmUsIHNrdSwgbmFtZV0uam9pbignfCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9zZXNzaW9uU3RvcmFnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza3U6IHNrdSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlOiBmZWF0dXJlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGVsZjogc2hlbGYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Y2FzZTogc2hvd2Nhc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZXI6IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2NoYW9yZGljX21ldGFfZGF0YScsIEpTT04uc3RyaW5naWZ5KF9zZXNzaW9uU3RvcmFnZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFMYXllci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V2ZW50JzogJ2V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V2ZW50Q2F0ZWdvcnknOiBfc2Vzc2lvblN0b3JhZ2UuY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdldmVudEFjdGlvbic6IF9zZXNzaW9uU3RvcmFnZS5hY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdldmVudExhYmVsJzogX3Nlc3Npb25TdG9yYWdlLmxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2t1TGlzdCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldFByb2R1Y3RzU2t1c09uICYmIGxldmVsLmRpc3BsYXlzWzBdLnJlZmVyZW5jZXMgaW5zdGFuY2VvZiBBcnJheSAmJiBcImF2YWlsYWJsZVwiID09PSBsZXZlbC5kaXNwbGF5c1swXS5yZWZlcmVuY2VzWzBdLnN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFNrdXMobGV2ZWwuZGlzcGxheXNbMF0pLnRoZW4oZnVuY3Rpb24gKHBfc2t1TGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza3VMaXN0ID0gcF9za3VMaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXZlbC5kaXNwbGF5c1swXSA9IHNrdUxpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuJG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnVlLnNldCh0aGlzLnJlZnMsc2t1cyxza3VMaXN0LnJlZmVyZW5jZXMuc2t1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMua2l0cyA9IHNrdUxpc3QucmVjb21tZW5kYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZih0aGlzLnNldEtpdHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcyA9IHNrdUxpc3QucmVmZXJlbmNlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5raXRzID0gc2t1TGlzdC5yZWNvbW1lbmRhdGlvbnMuc3BsaWNlKDAsIGNvbHVtbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtpdHNfcmVtYWluaW5nID0gc2t1TGlzdC5yZWNvbW1lbmRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0S2l0c1N1bW1hcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgVnVlICYmIHdpbmRvdy52dWVzLnB1c2gobmV3IFZ1ZSh7IGVsOiBzaG93Y2FzZV9jb250YWluZXIgfSkpO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFwiZnVuY3Rpb25cIj09PXR5cGVvZiB3aW5kb3cuc2V0Q2hhb3JkaWNGdW5jRXZlbnRzJiZ3aW5kb3cuc2V0Q2hhb3JkaWNGdW5jRXZlbnRzKCk7XG4gICAgICAgICQoJ2h0bWwnKS50cmlnZ2VyKCdjaGFvcmRpY0V2ZW50cycpO1xuICAgICAgICBmaXhMYXp5KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgdmFyIHN0YXJ0Q2hhb3JkaWMgPSBmdW5jdGlvbiBzdGFydENoYW9yZGljKCkge1xuICAgICAgICAvKlxyXG4gICAgICAgIHdpbmRvdy5jaGFvcmRpY19zcGVjaWFsID0gJC5leHRlbmQod2luZG93LmNoYW9yZGljX3NwZWNpYWwsIHtcclxuICAgICAgICAgICAgZXh0cmFzOiB7XHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZTogXCJPZmZlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJvdXNlbDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5czogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2t1OiBcIjExOThcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZTogXCJTaW1pbGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlByb2R1dG9zIHNpbWlsYXJlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJ0aXRsZTogXCJWb2PDqiB2aXNpdG91XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiBcIm1pZGRsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBza3U6IFwiMTE5OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlOiBcIkZyZXF1ZW50bHlCb3VnaHRUb2dldGhlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJDb21wcmUganVudG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IFwidG9wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgKi9cbiAgICAgICAgbG9hZENoYW9yZGljRGF0YSgpO1xuICAgICAgICAvLyB5dmFwaVNjcmlwdCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgICQoc3RhcnRDaGFvcmRpYyk7XG4gICAgLy8gJCh3aW5kb3cpLm9uKCdsb2FkJyxmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIHdpbmRvdy5fX19sb2FkaW5nQ2hhb3JkaWNJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgIGlmKFwiZnVuY3Rpb25cIj09PXR5cGVvZiB3aW5kb3cuc2V0Q2hhb3JkaWNGdW5jRXZlbnRzKXtcbiAgICAvLyAgICAgICAgICAgICB3aW5kb3cuc2V0Q2hhb3JkaWNGdW5jRXZlbnRzKCk7XG4gICAgLy8gICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh3aW5kb3cuX19fbG9hZGluZ0NoYW9yZGljSW50ZXJ2YWwpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9LDUwMCk7XG4gICAgLy8gfSk7XG4gICAgcmV0dXJuIHRydWU7XG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpO1xuXG4vKioyMDE4MTIyNTE0MDgqL1xuaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBjb25zb2xlICYmIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBjb25zb2xlLmNsZWFyKSB7XG4gICAgY29uc29sZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICctJztcbiAgICB9O1xufVxudmFyIGdldENvb2tpZSA9IGZ1bmN0aW9uIGdldENvb2tpZShjbmFtZSkge1xuICAgIHZhciBuID0gY25hbWUgKyBcIj1cIjt2YXIgZCA9IGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUpO3ZhciBjYSA9IGQuc3BsaXQoJzsnKTtmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gY2FbaV07d2hpbGUgKGMuY2hhckF0KDApID09ICcgJykge1xuICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9aWYgKGMuaW5kZXhPZihuKSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobi5sZW5ndGgsIGMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1yZXR1cm4gXCJcIjtcbn07XG4vKmFjY2VudHNUaWR5Ki9cblN0cmluZy5wcm90b3R5cGUuYWNjZW50c1RpZHkgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBlID0gZSB8fCBcIi1cIjt2YXIgYSA9IHRoaXMudG9Mb3dlckNhc2UoKS50cmltKCk7YSA9IGEucmVwbGFjZShuZXcgUmVnRXhwKC9bXFx1MDBlMFxcdTAwZTFcXHUwMGUyXFx1MDBlM1xcdTAwZTRcXHUwMGU1XS9nKSwgXCJhXCIpLCBhID0gYS5yZXBsYWNlKG5ldyBSZWdFeHAoL1xcdTAwZTYvZyksIFwiYWVcIiksIGEgPSBhLnJlcGxhY2UobmV3IFJlZ0V4cCgvXFx1MDBlNy9nKSwgXCJjXCIpLCBhID0gYS5yZXBsYWNlKG5ldyBSZWdFeHAoL1tcXHUwMGU4XFx1MDBlOVxcdTAwZWFcXHUwMGViXFx1MDAyNl0vZyksIFwiZVwiKSwgYSA9IGEucmVwbGFjZShuZXcgUmVnRXhwKC9bXFx1MDBlY1xcdTAwZWRcXHUwMGVlXFx1MDBlZl0vZyksIFwiaVwiKSwgYSA9IGEucmVwbGFjZShuZXcgUmVnRXhwKC9cXHUwMGYxL2cpLCBcIm5cIiksIGEgPSBhLnJlcGxhY2UobmV3IFJlZ0V4cCgvW1xcdTAwZjJcXHUwMGYzXFx1MDBmNFxcdTAwZjVcXHUwMGY2XS9nKSwgXCJvXCIpLCBhID0gYS5yZXBsYWNlKG5ldyBSZWdFeHAoL1xcdTAxNTMvZyksIFwib2VcIiksIGEgPSBhLnJlcGxhY2UobmV3IFJlZ0V4cCgvW1xcdTAwZjlcXHUwMGZhXFx1MDBmYlxcdTAwZmNdL2cpLCBcInVcIiksIGEgPSBhLnJlcGxhY2UobmV3IFJlZ0V4cCgvW1xcdTAwZmRcXHUwMGZmXS9nKSwgXCJ5XCIpLCBhID0gYS5yZXBsYWNlKG5ldyBSZWdFeHAoL1xccy9nKSwgZSk7dmFyIGYgPSBcIi1cIjtpZiAoZSAhPSBcIi1cIikgZiA9ICcnO2EgPSBhLnJlcGxhY2UobmV3IFJlZ0V4cCgvXFxXL2cpLCBmKTtyZXR1cm4gYTtcbn07QXJyYXkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhLCBiID0gYXJndW1lbnRzLCBjID0gYi5sZW5ndGgsIGQ7IGMgJiYgdGhpcy5sZW5ndGg7KSB7XG4gICAgICAgIGZvciAoYSA9IGJbLS1jXTsgLTEgIT0gKGQgPSB0aGlzLmluZGV4T2YoYSkpOykge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoZCwgMSk7XG4gICAgICAgIH1cbiAgICB9cmV0dXJuIHRoaXM7XG59O0FycmF5LnByb3RvdHlwZS5pbmRleE9mIHx8IChBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgYiA9IGIgfHwgMDtmb3IgKHZhciBjID0gdGhpcy5sZW5ndGg7IGIgPCBjOykge1xuICAgICAgICBpZiAodGhpc1tiXSA9PT0gYSkgcmV0dXJuIGI7KytiO1xuICAgIH1yZXR1cm4gLTE7XG59KTtcbi8qIEZvcm1hdE1vbmV5ICovXG5OdW1iZXIucHJvdG90eXBlLmZvcm1hdE1vbmV5ID0gZnVuY3Rpb24gKHBsYWNlcywgc3ltYm9sLCB0aG91c2FuZCwgZGVjaW1hbCkge1xuICAgIHBsYWNlcyA9ICFpc05hTihwbGFjZXMgPSBNYXRoLmFicyhwbGFjZXMpKSA/IHBsYWNlcyA6IDI7c3ltYm9sID0gc3ltYm9sICE9PSB1bmRlZmluZWQgPyBzeW1ib2wgOiBcIlIkIFwiO3Rob3VzYW5kID0gdGhvdXNhbmQgfHwgXCIuXCI7ZGVjaW1hbCA9IGRlY2ltYWwgfHwgXCIsXCI7dmFyIG51bWJlciA9IHRoaXMsXG4gICAgICAgIG5lZ2F0aXZlID0gbnVtYmVyIDwgMCA/IFwiLVwiIDogXCJcIixcbiAgICAgICAgaSA9IHBhcnNlSW50KG51bWJlciA9IE1hdGguYWJzKCtudW1iZXIgfHwgMCkudG9GaXhlZChwbGFjZXMpLCAxMCkgKyBcIlwiLFxuICAgICAgICBqID0gKGogPSBpLmxlbmd0aCkgPiAzID8gaiAlIDMgOiAwO3JldHVybiBzeW1ib2wgKyBuZWdhdGl2ZSArIChqID8gaS5zdWJzdHIoMCwgaikgKyB0aG91c2FuZCA6IFwiXCIpICsgaS5zdWJzdHIoaikucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csIFwiJDFcIiArIHRob3VzYW5kKSArIChwbGFjZXMgPyBkZWNpbWFsICsgTWF0aC5hYnMobnVtYmVyIC0gaSkudG9GaXhlZChwbGFjZXMpLnNsaWNlKDIpIDogXCJcIik7XG59O1xuLyoqIElzIHZpc2libGU/ICovXG4oZnVuY3Rpb24gKGEpIHtcbiAgICBmdW5jdGlvbiBoKCkge1xuICAgICAgICB2YXIgZSA9IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIGQgPSBkb2N1bWVudC5jb21wYXRNb2RlO2lmIChkIHx8ICFhLnN1cHBvcnQuYm94TW9kZWwpIGUgPSBcIkNTUzFDb21wYXRcIiA9PSBkID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA6IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O3JldHVybiBlO1xuICAgIH1hKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGUgPSBoKCksXG4gICAgICAgICAgICBkID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGIgPSBbXTthLmVhY2goYS5jYWNoZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMgJiYgdGhpcy5ldmVudHMuaW52aWV3ICYmIGIucHVzaCh0aGlzLmhhbmRsZS5lbGVtKTtcbiAgICAgICAgfSk7Yi5sZW5ndGggJiYgYShiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjID0gYSh0aGlzKSxcbiAgICAgICAgICAgICAgICBiID0gYy5vZmZzZXQoKS50b3AsXG4gICAgICAgICAgICAgICAgZiA9IGMuaGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgZyA9IGMuZGF0YShcImludmlld1wiKSB8fCAhMTtkID4gYiArIGYgfHwgZCArIGUgPCBiID8gZyAmJiAoYy5kYXRhKFwiaW52aWV3XCIsICExKSwgYy50cmlnZ2VyKFwiaW52aWV3XCIsIFshMV0pKSA6IGQgPCBiICsgZiAmJiAhZyAmJiAoYy5kYXRhKFwiaW52aWV3XCIsICEwKSwgYy50cmlnZ2VyKFwiaW52aWV3XCIsIFshMF0pKTtcbiAgICAgICAgfSk7XG4gICAgfSk7YShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGEod2luZG93KS5zY3JvbGwoKTtcbiAgICB9KTtcbn0pKGpRdWVyeSk7XG52YXIgeXZhcGlTY3JpcHQgPSBmdW5jdGlvbiB5dmFwaVNjcmlwdCgpIHtcbiAgICB2YXIgX3l2cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7X3l2cy50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtfeXZzLmFzeW5jID0gdHJ1ZTtfeXZzLmlkID0gXCJ5dnNyY1wiO195dnMuc3JjID0gXCIvL3NlcnZpY2UueW91cnZpZXdzLmNvbS5ici9zY3JpcHQvOThiN2FkZTgtMGZlYS00ZGNlLWI0MDEtYWU3OTNmM2EzYWQyL3l2YXBpLmpzXCI7X3l2cy5jbGFzc05hbWUgPSBcInl2YXBpLXNjcmlwdFwiOyQoJ2hlYWQnKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJCgnaGVhZCAueXZhcGktc2NyaXB0JykubGVuZ3RoIDw9IDA7XG4gICAgfSkuYXBwZW5kKF95dnMpO3JldHVybiB0cnVlO1xufTtcbi8qKiBsb2cgKi9cbnZhciBfX2xvZyA9IGZ1bmN0aW9uIF9fbG9nKCkge1xuICAgIGlmIChcIm9iamVjdFwiID09ICh0eXBlb2YgY29uc29sZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoY29uc29sZSkpICYmIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGNvbnNvbGUubG9nICYmIGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7cmV0dXJuIHRydWU7XG4gICAgfXJldHVybiBmYWxzZTtcbn07XG5cbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgd2luZG93LmxvYWRTaG93Y2FzZUltYWdlID0gZnVuY3Rpb24gKGl0ZW0sIHNyYykge1xuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJChpdGVtKS5odG1sKGltZyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKGl0ZW0pLmZpbHRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQodGhpcykuZmluZCgnaW1nJykubGVuZ3RoIDw9IDA7XG4gICAgICAgICAgICB9KS5hcHBlbmQoJzxpbWcgc3JjPVwiL2FycXVpdm9zL2ltZy0yNTB4MjUwLTAwMDAwMDAwLnBuZ1wiIC8+Jyk7XG4gICAgICAgICAgICAkKGl0ZW0pLmFkZENsYXNzKCdfX2ltZy1ub3QtZm91bmQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgfTtcbiAgICB3aW5kb3cuc2V0RGF0YUltYWdlU3JjID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcuX3Nob3djYXNlLWxhenknKS5maW5kKCcuX19wX2ltZycpLmVhY2goZnVuY3Rpb24gKG5keCwgaXRlbSkge1xuICAgICAgICAgICAgdmFyIF9pdGVtID0gJChpdGVtKTtcbiAgICAgICAgICAgIHZhciB1cmwgPSBfaXRlbS5odG1sKCkucmVwbGFjZSgvXFxuLywgXCJcIikucmVwbGFjZSgvPCEuKihodHRwLio/KVxcXCJbXFxTXFxzXSovLCBcIiQxXCIpLnRyaW0oKTtcbiAgICAgICAgICAgIF9pdGVtLmF0dHIoJ2RhdGEtaW1hZ2Utc3JjJywgdXJsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgd2luZG93LmxvYWRTaG93Y2FzZVBpY3MgPSBmdW5jdGlvbiAoc2hvd2Nhc2UpIHtcbiAgICAgICAgaWYgKHNldERhdGFJbWFnZVNyYygpKSB7XG4gICAgICAgICAgICAkKHNob3djYXNlKS5ub3QoJy5fX2ltYWdlcy1sb2FkZWQnKS5maW5kKCcuX19wX2ltZycpLmVhY2goZnVuY3Rpb24gKG5keCwgaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSAkKGl0ZW0pLmF0dHIoJ2RhdGEtaW1hZ2Utc3JjJykgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAodXJsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZFNob3djYXNlSW1hZ2UoaXRlbSwgdXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoc2hvd2Nhc2UpLmFkZENsYXNzKCdfX2ltYWdlcy1sb2FkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHdpbmRvdy5jaGFvcmRpY1RyYWNraW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX3Nlc3Npb25TdG9yYWdlID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnk6IFwiVml0cmluZSBDaGFvcmRpYyBDbGlxdWVcIixcbiAgICAgICAgICAgIGZlYXR1cmU6IFwiXCIsXG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIHBhZ2U6IFwib3RoZXJcIixcbiAgICAgICAgICAgIHJlZmVyZXI6IFwiXCIsXG4gICAgICAgICAgICBzaGVsZjogXCJcIixcbiAgICAgICAgICAgIHNob3djYXNlOiBcIlwiLFxuICAgICAgICAgICAgc2t1OiAwLFxuICAgICAgICAgICAgdXJsOiBcIi9cIixcbiAgICAgICAgICAgIGRldmljZTogXCJkZXNrdG9wXCJcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5jYXRlZ29yaWVzID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcIlZpdHJpbmUgQ2hhb3JkaWMgRXhpYmnDp8Ojb1wiLFxuICAgICAgICAgICAgXCJjbGlja1wiOiBcIlZpdHJpbmUgQ2hhb3JkaWMgQ2xpcXVlXCJcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3NlbGZWID0gdGhpcztcbiAgICAgICAgICAgICQoJ1tkYXRhLWltcHJlc3Npb24tdXJsXScpLmVhY2goZnVuY3Rpb24gKG5keCwgaXRlbSkge1xuICAgICAgICAgICAgICAgICQoaXRlbSkubm90KCcuX19pbXByZXNzaW9uLW9uJykuYWRkQ2xhc3MoJ19faW1wcmVzc2lvbi1vbicpLm9uKCdpbnZpZXcnLCBmdW5jdGlvbiAoZXZlbnQsIHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmVi5jaGFvcmRpY1Nob3djYXNlVHJhY2tpbmcoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cubG9hZFNob3djYXNlUGljcyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgZmlyc3RTaG93Y2FzZSA9ICQoJ1tkYXRhLWltcHJlc3Npb24tdXJsXTpmaXJzdCcpO1xuICAgICAgICAgICAgLy8gd2luZG93LmxvYWRTaG93Y2FzZVBpY3MoZmlyc3RTaG93Y2FzZSk7XG4gICAgICAgIH07XG4gICAgICAgIHNlbGYuY2hhb3JkaWNTaG93Y2FzZVRyYWNraW5nID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBfc2VsZkMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHNoZWxmID0gaXRlbS5kYXRhc2V0LnNoZWxmIHx8IFwidG9wXCI7XG4gICAgICAgICAgICB2YXIgcGFnZSA9IGl0ZW0uZGF0YXNldC5wYWdlIHx8IFwib3RoZXJcIjtcbiAgICAgICAgICAgIHZhciBmZWF0dXJlID0gaXRlbS5kYXRhc2V0LmZlYXR1cmUgfHwgXCJcIjtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IHNoZWxmICsgXCJ8XCIgKyBmZWF0dXJlICsgXCJ8XCIgKyBpdGVtLmRhdGFzZXQuc2hvd2Nhc2U7XG4gICAgICAgICAgICB2YXIgX2l0ZW0gPSAkKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKF9pdGVtLmxlbmd0aCA8PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YXIgdXJsID0gX2l0ZW0uYXR0cignZGF0YS1pbXByZXNzaW9uLXVybCcpIHx8IFwiXCI7XG4gICAgICAgICAgICBpZiAodXJsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pdGVtLmF0dHIoJ2RhdGEtaW1wcmVzc2lvbi10cmlnZ2VyZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICBfaXRlbS5hdHRyKCdkYXRhLWltcHJlc3Npb24tdHJpZ2dlcmVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpxeGhyID0gJC5nZXQodXJsLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBzdWNjZXNzICovXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9fbG9nKCdbQ2hhb3JkaWNdICcgKyBfc2VsZkMuY2F0ZWdvcmllc1snZXZlbnQnXSwgYWN0aW9uLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkdBU2VuZEV2ZW50KF9zZWxmQy5jYXRlZ29yaWVzW1wiZXZlbnRcIl0sIGFjdGlvbiwgbGFiZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBzZWxmLmNoYW9yZGljVHJhY2tpbmdVcmwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3NlbGZUID0gdGhpcztcbiAgICAgICAgICAgICQoJ1tkYXRhLXRyYWNraW5nLXVybF0nKS5ub3QoJy5fX3RyYWNrLW9uJykuYWRkQ2xhc3MoJ19fdHJhY2stb24nKS5vbignY2xpY2suY2hhb3JkaWNUcmFja2luZ1VybCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIHVybDJnbyA9IF90aGlzLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICBfc2VsZlQucHJvZHVjdENsaWNrZWQoX3RoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX19sb2coJ3VybDJnbyBjYWxsYmFjaycpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB1cmwyZ287XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBzZWxmLnByb2R1Y3RDbGlja2VkID0gZnVuY3Rpb24gKF90aGlzLCBjYikge1xuICAgICAgICAgICAgdmFyIF9zZWxmUCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgdXJsID0gX3RoaXMuYXR0cignZGF0YS10cmFja2luZy11cmwnKTtcbiAgICAgICAgICAgIHZhciB1cmwyZ28gPSBfdGhpcy5hdHRyKCdocmVmJyk7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF90aGlzLmZpbmQoJy5fX3BfbmFtZScpLnRleHQoKSB8fCBcIlwiO1xuICAgICAgICAgICAgdmFyIHNrdSA9IF90aGlzLmF0dHIoJ2RhdGEtcHJkJykgfHwgXCIwXCI7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfdGhpcy5hdHRyKCdkYXRhLWluZGV4JykgfHwgMDtcbiAgICAgICAgICAgIHZhciBzaGVsZiA9IF90aGlzLmF0dHIoJ2RhdGEtc2hlbGYnKSB8fCBcInRvcFwiO1xuICAgICAgICAgICAgdmFyIGZlYXR1cmUgPSBfdGhpcy5hdHRyKCdkYXRhLWZlYXR1cmUnKSB8fCBcIlwiO1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBfdGhpcy5hdHRyKCdkYXRhLXBhZ2UnKSB8fCBcIm90aGVyXCI7XG4gICAgICAgICAgICB2YXIgc2hvd2Nhc2UgPSBfdGhpcy5wYXJlbnRzKCcuX3ByZCcpLmF0dHIoJ2RhdGEtc2hvd2Nhc2UnKTtcbiAgICAgICAgICAgIHNob3djYXNlID0gc2hvd2Nhc2UgfHwgXCJyZWNvbW1lbmRhdGlvbnNcIjtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IFtzaGVsZiwgZmVhdHVyZSwgc2t1LCBuYW1lXS5qb2luKCd8Jyk7XG5cbiAgICAgICAgICAgIF9zZWxmUC5fc2Vzc2lvblN0b3JhZ2UgPSB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIHNrdTogc2t1LFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IF9zZWxmUC5jYXRlZ29yaWVzW1wiY2xpY2tcIl0sXG4gICAgICAgICAgICAgICAgZmVhdHVyZTogZmVhdHVyZSxcbiAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgICAgIHNoZWxmOiBzaGVsZixcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBzaG93Y2FzZTogc2hvd2Nhc2UsXG4gICAgICAgICAgICAgICAgcmVmZXJlcjogZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdjaGFvcmRpY19tZXRhX2RhdGEnLCBKU09OLnN0cmluZ2lmeShfc2VsZlAuX3Nlc3Npb25TdG9yYWdlKSk7XG4gICAgICAgICAgICBfc2VsZlAuR0FUcmFja2luZygpO1xuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGNiKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBzZWxmLkdBVHJhY2tpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3NlbGZHQSA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIF9zZWxmR0EuX3Nlc3Npb25TdG9yYWdlICYmIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBfc2VsZkdBLl9zZXNzaW9uU3RvcmFnZVsnY2F0ZWdvcnknXSAmJiBcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgX3NlbGZHQS5fc2Vzc2lvblN0b3JhZ2VbJ2FjdGlvbiddICYmIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBfc2VsZkdBLl9zZXNzaW9uU3RvcmFnZVsnbGFiZWwnXSkge1xuICAgICAgICAgICAgICAgIC8qKiBHQSB0cmFja2luZyAqL1xuICAgICAgICAgICAgICAgIHZhciBjYXRlZ29yeSA9IF9zZWxmR0EuX3Nlc3Npb25TdG9yYWdlWydjYXRlZ29yeSddO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBfc2VsZkdBLl9zZXNzaW9uU3RvcmFnZVsnYWN0aW9uJ107XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gX3NlbGZHQS5fc2Vzc2lvblN0b3JhZ2VbJ2xhYmVsJ107XG4gICAgICAgICAgICAgICAgX3NlbGZHQS5fX2xvZygnW0dBXSBUcmFja2luZyBUcmlnZ2VyZWQuJyk7XG4gICAgICAgICAgICAgICAgX3NlbGZHQS5HQVNlbmRFdmVudChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNlbGYuR0FTZW5kRXZlbnQgPSBmdW5jdGlvbiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwpIHtcbiAgICAgICAgICAgIHZhciBfc2VsZkdBUyA9IHRoaXM7XG4gICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcbiAgICAgICAgICAgIGRhdGFMYXllci5wdXNoKHtcbiAgICAgICAgICAgICAgICAnZXZlbnQnOiAnZXZlbnQnLFxuICAgICAgICAgICAgICAgICdldmVudENhdGVnb3J5JzogY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgJ2V2ZW50QWN0aW9uJzogYWN0aW9uLFxuICAgICAgICAgICAgICAgICdldmVudExhYmVsJzogbGFiZWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5fX2xvZygnW0dBXSBkYXRhTGF5ZXIucHVzaDogJyArIFtjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbF0uam9pbignLCAnKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5fX2xvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChcIm9iamVjdFwiID09ICh0eXBlb2YgY29uc29sZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoY29uc29sZSkpICYmIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGNvbnNvbGUubG9nICYmIGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICB3aW5kb3cuZml4UGljV2l0aG91dENhcm91c2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcuX2NoYW9yZGljLXJlZnMgaW1nW2RhdGEtbGF6eV0nKS5lYWNoKGZ1bmN0aW9uIChuZHgsIGl0ZW0pIHtcbiAgICAgICAgICAgICQoaXRlbSkuYXR0cignc3JjJywgJChpdGVtKS5hdHRyKCdkYXRhLWxhenknKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHdpbmRvdy5zZXRMYXp5TG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gXCJmdW5jdGlvblwiPT09dHlwZW9mIChuZXcgd2luZG93LmNoYW9yZGljVHJhY2tpbmcpLmlzVmlzaWJsZSYmKG5ldyB3aW5kb3cuY2hhb3JkaWNUcmFja2luZykuaXNWaXNpYmxlKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgd2luZG93LnNldFRyYWNraW5ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgbmV3IHdpbmRvdy5jaGFvcmRpY1RyYWNraW5nKCkuaXNWaXNpYmxlICYmIG5ldyB3aW5kb3cuY2hhb3JkaWNUcmFja2luZygpLmlzVmlzaWJsZSgpO1xuICAgICAgICAvLyBcImZ1bmN0aW9uXCI9PT10eXBlb2YgKG5ldyB3aW5kb3cuY2hhb3JkaWNUcmFja2luZykuY2hhb3JkaWNUcmFja2luZ1VybCYmKG5ldyB3aW5kb3cuY2hhb3JkaWNUcmFja2luZykuY2hhb3JkaWNUcmFja2luZ1VybCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHdpbmRvdy5jaGFvcmRpRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdodG1sJykub2ZmKCdjaGFvcmRpY0V2ZW50cycpLm9uKCdjaGFvcmRpY0V2ZW50cycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0TGF6eUxvYWRpbmcoKTtcbiAgICAgICAgICAgIHdpbmRvdy5maXhQaWNXaXRob3V0Q2Fyb3VzZWwoKTtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUcmFja2luZ3MoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICB3aW5kb3cuc2V0Q2hhb3JkaWNGdW5jRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuY2hhb3JkaUV2ZW50cygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgICQoc2V0Q2hhb3JkaWNGdW5jRXZlbnRzKTtcblxuICAgIC8vICQod2luZG93KS5vbignbG9hZCcsZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICB3aW5kb3cuc2V0Q2hhb3JkaWNGdW5jRXZlbnRzKCk7XG4gICAgLy8gfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7Il19
},{}]},{},[1])