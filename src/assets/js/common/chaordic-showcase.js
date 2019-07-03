/**201904101843*/
(function($, window, document, undefined) {
    'use strict';
    /* ------------------------------------------------------------ *\
        #Monta Carousel
    \* ------------------------------------------------------------ */
    var applyCarousel = function (p_elem, p_opts) {
        if ($('._no-carousel').length>0 && $(window).width() < 769) {
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
            slidesToShow: 1
        };
        opts = $.extend({
            lazyLoad: 'ondemand',
            infinite: false,
            touchThreshold: 60,
            arrows: true,
            prevArrow: '<span class="_prev slick-prev"></span>',
            nextArrow: '<span class="_next slick-next"></span>',
            dots: true
        }, opts_responsive, opts);
        $(_elem).slick(opts);
        if (!opts.vertical) {
            $(_elem).prepend(_appendArrows);
        }
        // "object"===typeof yv&&"object"===typeof yv.load&&yv.load.start();
        return true;        
    };
    
    var $product = '<div class="_product" :class="`_product-${product.id}`" ' +
            ':data-prd="product.id" :data-index="index"> ' +
            '<a :data-prd="product.id" :data-index="index" ' +
                ':data-shelf="showcase.info.shelf" ' +
                ':data-feature="showcase.info.feature" ' +
                ':data-page="showcase.info.page" ' +
                ':data-price="product.price" ' +
                ':data-oldprice="product.oldPrice" ' +
                ':href="product.url.fixURL()" ' +
                ':data-tracking-url="product.trackingUrl" ' +
                'class="__lnk-img" ' +
                '@click="productClicked({ id: product.id, name: product.name, showcase: showcase.info.showcase, page: showcase.info.page, feature: showcase.info.feature, shelfIndex: index, shelf: showcase.info.shelf, url: product.url.fixURL(), trackingUrl: product.trackingUrl,  })"' +
                '>' +
                '<span class="__p_img" :data-image-src="getImage(product)" >' +
                    '<img :data-lazy="getImage(product)" src="https://tbb.vteximg.com.br/arquivos/_img-transparent.gif" :alt="product.name" :title="product.name" />' +
                '</span>' +
            '</a>' +

            '<div class="yv-review-quickreview" :value="product.id"></div>' +

            '<a :data-prd="product.id" :data-index="index" '+
            ':data-shelf="showcase.info.shelf" '+
            ':data-feature="showcase.info.feature" '+
            ':data-page="showcase.info.page" '+
            ':data-price="product.price" '+
            ':data-oldprice="product.oldPrice" '+
            ':href="product.url.fixURL()" '+
            ':data-tracking-url="product.trackingUrl" '+
            'class="__lnk-pname"' +
            '>' +
                '<span class="_p_details">' +
                    '<span class="__p_brand">' +
                        '{{ product.brand }}' +
                    '</span>' +
                    '<h3 class="__p_name">' +
                        '{{ product.name }}' +
                    '</h3>' +
                '</span>' +
            '</a>' +

            
            '<span class="__p_pricing_buy_btn_" v-if="checkStatus(product)">' +
                '<span class="__p_pricing_">' +
                    '<span class="_p_price_">' +
                        '<span class="__p_from" v-if="hasBestPrice(product)">de </span>' +
                        '<span class="__p_price" v-if="hasBestPrice(product)">{{ product.oldPrice.formatMoney() }}</span>' +
                    '</span>' +
                    '<span class="_p_priceoffer_" v-if="checkRegularPrice(product.price)">' +
                        '<span class="__p_by" v-if="hasBestPrice(product)">por </span>' +
                        '<span class="__p_priceoffer">{{ product.price.formatMoney() }}</span>' +
                    '</span>' +
                    '<span class="_p_intallments">' +
                        '<span class="__p_installments" v-if="hasInstallments(product.installment)" >' +
                            '<span class="__p_numberinstallments">{{ product.installment.count }}x</span> de ' +
                            '<span class="__p_installmentsvalue">{{ formatPrice(product.installment.price) }} </span>' +
                            '<span class="__p_installments-juros">sem&nbsp;juros</span>' +
                        '</span>' +
                    '</span>' +
                '</span>' +

                '<a :data-prd="product.id" :data-index="index" ' +
                ':data-shelf="showcase.info.shelf" ' +
                ':data-feature="showcase.info.feature" ' +
                ':data-page="showcase.info.page" ' +
                ':data-price="product.price" ' +
                ':data-oldprice="product.oldPrice" ' +
                ':href="product.url.fixURL()" ' +
                ':data-tracking-url="product.trackingUrl" '+
                'class="__lnk-buy-btn"' +
                '>' +
                    '<a class="btn_comprar" href="$uri?idsku=$product.productVariantId"> COMPRAR' +
                        '<svg class="heart" width="14" height="16" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                            '<path d="M6.90286 4.80886L6.54931 5.16242L6.90286 5.51597L7.59493 6.20804C8.42246 7.03557 8.42092 8.37962 7.59514 9.2054C6.76794 10.0326 5.42268 10.0301 4.59778 9.2052L2.13594 6.74336L0.675534 5.15783C0.785307 5.03582 0.917379 4.88951 1.05875 4.7339C1.43757 4.31692 1.87337 3.84404 2.12868 3.58874L4.59778 1.11964C5.42268 0.294739 6.76794 0.292239 7.59514 1.11943C8.42092 1.94521 8.42246 3.28926 7.59493 4.11679L6.90286 4.80886Z" stroke="#686162"/>' +
                        '</svg>' +
                    '</a>'+
                '</a>' +

                '<span class="_flags-wrapper">' +
                    '<span class="_percentage" v-if="checkPercentage(product.percentage)" >' +
                        '<span class="__percentage">{{ product.percentage }}% compraram</span>' +
                    '</span>' +
                    '<span class="_flags">' +
                        '<span v-if="checkDiscount(product.discount)" class="__priceOff priceOff"><span>-{{ product.discount }}%</span></span>' +
                    '</span>' +
                '</span>' +

            '</span>' +
            '<span class="__p_outstock" v-else>Produto não disponível</span>' +
        '</div>';

    var $product_refs = '' +
        '<div class="_chaordic-refs" v-if="refs.length>0" >' +
            '<div class="_chaordic-control" v-if="refs.length>0">' +
                '<h2 v-html=showcase.info.subtitle class="_chaordic-control-title" ></h2>' +
                '<a v-if=!showcase.info.vertical @click="switchProd()" class="__switch-btn"></a>' +
            '</div>' +
            '<div class="_chaordic-refs-container" >' +
                '<a v-if=!showcase.info.vertical @click="switchProd()" class="__switch-btn"></a>' +
                '<div class="_chaordic-refs-products">' +
                    '<div class="_ref-prd _prd" data-showcase="references" v-for="(product, index) in refs" ' +
                    ':class="getCatClass(product)" ' +
                    ' >' +
                        $product +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    var $product_showcase = '' +
        '<div class="_chaordic-showcase" v-if="products.length>0">' +
            '<div class="_chaordic-title"><h2 v-html=showcase.info.title></h2></div>' +
            '<div class="_chaordic-showcase-container">' +
                '<div :class="[getShowcaseClass(products)]" >' +
                    '<div class="_prd" v-for="(product, index) in products" ' +
                        ':class="getCatClass(product)" ' +
                        'data-showcase="recommendations" ' +
                        ' >' +
                        $product +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    var $product_kits = '' +
        '<div class="_chaordic-kits" v-if="kits.length>0">' +
            '<div class="_chaordic-kit" ' +
                ':class="[getKitClass(product)]" ' +
                'v-for="(product, index) in kits" >' +
                '<div class="_chaordic-kit-btns">' +
                    '<div class="_chaordic-kit-switch _chaordic-btn" @click="switchKitProd(index)" v-if="product.active" >Trocar</div>' +
                    '<div class="_chaordic-kit-on-off">' +
                        '<div class="_chaordic-kit-on _chaordic-btn" @click="removeKitProd(index)" v-if="product.active">Remover</div>' +
                        '<div class="_chaordic-kit-off _chaordic-btn" @click="bringBackKitProd(index)" v-else>Trazer de volta</div>' +
                    '</div>' +
                '</div>' +
                '<div class="_chaordic-kit-products">' +
                    '<div class="_prd" data-showcase="recommendations" ' +
                        ':class="getCatClass(product)" ' +
                        '>' +
                            $product +
                    '</div>' +
                '</div>'+
            '</div>'+
        '</div>';
    var $product_kit_totals = '' +
        '<div class="_chaordic-kit-totals" v-if="kits.length>0">' +
            '<div class="_chaordic-kit-summary">' +
                '<div class="_kit-title" v-if="kit_totals.title" v-html=kit_totals.title></div>' +
                '<div class="_kit-price-regular" v-if="kit_totals.regular>0" v-html=formatPrice(kit_totals.regular)></div>' +
                '<div class="_kit-price-sale" v-if="kit_totals.sale" v-html=formatPrice(kit_totals.sale)></div>' +
                '<div class="_kit-button" v-if="kit_totals.button" ><a @click="buyProducts()">{{ kit_totals. button }}</a></div>' +
            '</div>' +
        '</div>';
    var $showcase = '';
        $showcase = '<div class="__vitrines _chaordic-info _chaordic-wrapper" ' +
            'v-if="products.length>0||kits.length>0" ' +
            'data-showcase="recommendations" ' +
            ':class="[showcase.info.refs_on, convert2class(showcase.info.feature), loadingClass(_loading)]" ' +
            ':data-chaordic-index="showcase.index" ' +
            ':data-impression-url="showcase.info.impressionUrl" ' +
            ':data-page="showcase.info.page" ' +
            ':data-name="showcase.info.name" ' +
            ':data-feature="showcase.info.feature" ' +
            ':data-shelf="showcase.info.shelf" ' +
            ' >' +
            // '<div class="_chaordic-header">' +
            //     '<div class="_chaordic-control" v-if="refs.length>0">' +
            //         '<span v-html=showcase.info.subtitle class="_chaordic-control-title" ></span>' +
            //         '<a v-if=!showcase.info.vertical @click="switchProd()" class="__switch-btn"></a>' +
            //     '</div>' +
            //     '<div class="_chaordic-title"><h2 v-html=showcase.info.title></h2></div>' +
            // '</div>' +
            '<div class="_filters" v-if="filters.length>1" >' +
                '<a @click="customFilter(\'all\')" ' +
                ':class="{__selected:category == \'all\'}" ' +
                ' >Ver todos</a>' +
                '<a v-for="(filter, index) in filters" ' +
                    '@click="customFilter(filter)" ' +
                    ':class="{__selected:category == filter}" ' +
                    ' >' +
                    '{{ filter }}' +
                '</a>' +
            '</div>' +
            '<div class="_chaordic-showcase-wrapper">' +
                /* insert here product with switch */
                $product_refs +
                $product_showcase +
                $product_kits +
                $product_kit_totals +
            '</div>' +
        '</div>';
    /** Helper functions */
    String.prototype.fixPath = function () {
        return this.replace(/200-200/,"164-164").replace(/.*?\//, "/");
    };
    String.prototype.fixURL = function () {
        return this.replace(/^.*?[^:\/]\/[\/]*/, "/");
    };
    var addDiscountData = function (p_data) {
        var data = p_data;
        $.each(data,function(ndx,level) {
            $.each(level,function(ndx0,level_elems){
                $.each(level_elems,function(ndx1,level_elem){
                    if(ndx1=="displays"){
                        $.each(level_elem,function (ndx2,level_data) {
                            $.each(level_data.recommendations,function (ndx2,product) {
                                var _regularPrice = product.oldPrice||product.price;
                                var _price = product.price;
                                var _discount = 0;
                                if(_regularPrice>0) {
                                    _discount = 1*(Math.floor((100 - (_price / _regularPrice * 100)))).toFixed(2);
                                }
                                product.savings = 1*(_regularPrice - _price).toFixed(2);
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
    var addSkus = function (p_data,cb) {
        var dfd = $.Deferred();
        var data = p_data;
        var utls = new Utls;
        var productIdList = [];
        var loop = function (skuList) {
            $.each(data, function (key, level) { /* level displays */
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
            var utls = new Utls;
            utls.getSkuList(productIdList)
                .then(function (skuResults) {
                    var skuList = {};
                    $.each(skuResults,function (ndx,item) {
                        skuList = $.extend(skuList,item);
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
    var getChaordicCredentials = function (productId) {
        // U7J8E6XyqrIsC8bv4p3JbQ%3D%3D
        var isDesktop = $(window).width()>1024;
        var secretKey = 'rz4YYCNFlWAnPdogRpLdRw==';
            secretKey = encodeURIComponent(secretKey);
        var url = '', query = '',
            url_base = 'https://recs.chaordicsystems.com/v0/pages/recommendations',
            cookie_name = 'chaordic_browserId';
        var deviceId = getCookie(cookie_name)||'dev001';
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
        if(isDesktop) {
            config_extra = $.extend(config_extra,{ source: 'desktop' });
        } else {
            $('html').addClass('_mobi-on');
        }
        if(!!productId&&productId.length>0) {
            url_base = 'https://recs.chaordicsystems.com/v0/products/recommendations';
            var config_extra = {
                type: 'similar',
                productId: productId
            };
        }
        config = $.extend(config,config_extra);
        if(document.location.pathname.length>1) {
            config.url = document.location.origin + document.location.pathname;
            var pageType = {
                'other': 'other',
                'departamento': 'category', 'departament': 'category', 'dept': 'category', 'categoria': 'subcategory', 'category': 'subcategory', 'cat': 'subcategory'
            };
            config.name = pageType[($('body').attr('id')||"other")];
            var attrChaordicMeta = $('[chaordic_special]').attr('chaordic_special')||"";
            if(attrChaordicMeta.length>0) {
                config.name = attrChaordicMeta;
            } 
            if("undefined"!==typeof chaordic_special&&"undefined"!==typeof chaordic_special.page&&
                "undefined"!==typeof chaordic_special.page.name) {
                config.name = chaordic_special.page.name;
            }
        }
        var query = decodeURIComponent($.param(config));
        url = url_base + '?' + query;
        return { config: config, url: url };
    };
    var loadChaordicData = function (productId,onSuccess,type) {
        if($('._top,._middle,._bottom').length<=0) {return false;}
        var chaordic_special = window.chaordic_special||{};
        var type = type||"Similar";
        var credentials = getChaordicCredentials(productId);
        credentials.type = type;
        credentials.chaordic_special = chaordic_special;
        var mountChaordicShowcases = function (chaordicData) {
            var _chaordicData = chaordicData;
            mountChaordic(_chaordicData, credentials);
            return true;
        };
        var success = function(chaordicData){
            if(!!chaordic_special.extras){
                $.each(chaordic_special.extras.displays,function (ndx,showcase) {
                    var displays_length = chaordic_special.extras.displays.length-1;
                    var level = 'top';
                    var display_index = showcase.index||0;
                    if(!!showcase.feature&&showcase.feature==="FrequentlyBoughtTogether"&&"function"===typeof Utls) {
                        /** compre junto */
                        delete(window.___loadingChaordic);
                        level = showcase.level||level;
                        loadChaordicData(showcase.sku,function (extrasData) {
                            extrasData.columns = !!showcase.columns&&showcase.columns>0?showcase.columns:2;
                            extrasData.feature = "FrequentlyBoughtTogether";
                            extrasData.title = showcase.title||"Compre junto";
                            chaordicData[level].splice(display_index,0,extrasData);
                            if(ndx==displays_length) { 
                                mountChaordicShowcases(chaordicData); 
                            }
                        });
                    } else if(!!showcase.feature&&showcase.feature==="Similar") {
                        /** similares */
                        delete(window.___loadingChaordic);
                        level = showcase.level||level;
                        loadChaordicData(showcase.sku,function (extrasData) {
                            extrasData.feature = "Similar";
                            extrasData.title = showcase.title||"Produtos similares";
                            chaordicData[level].splice(display_index,0,extrasData);
                            if(ndx==displays_length) { 
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
        if(!!onSuccess&&'function'===typeof onSuccess){
            success = onSuccess;
        }
        if(!window.___loadingChaordic) {
            $.ajax({
                    url: credentials.url,
                    cache: true,
                    dataType: 'json'
                })
                .success(success) /*only if response 200*/
                .always(function () {
                    delete(window.___loadingChaordic);
                }); 
            window.___loadingChaordic = true;
        }
        return true;
    };
    var fixLazy = function(){
        var _img = $('.section-chaordic ._ref-prd img[src*="_img-transparent.gif"]');
        var src = _img.attr('data-lazy');
        _img.attr("src",src);
    };
    /** Chaordic mount showcases */
    var mountChaordic = function (p_chaordicData,p_settings) {
        var settings = p_settings;
        var verticalShowcases = ['HistoryPersonalized'];
        var filtersOffShowcases = ['HistoryPersonalized','New4You','ViewPersonalized','CartPersonalized','PurchasePersonalized','MostPopular','Offers','Featured','Push'];
        var specialShowcase = ['FrequentlyBoughtTogether'];
        var getProductsSkus = ['FrequentlyBoughtTogether'];
        var doNotRender = ['HistoryPersonalized'];
        var chaordicData = p_chaordicData||{};
        var columns = 2;
        var page = settings.pageType||"other";
        var chaordic_special = settings.chaordic_special||{};
        var specialSetsAvailable = "undefined"!==typeof chaordic_special.extras&&"undefined"!==typeof chaordic_special.extras.special&&
            "undefined"!==typeof chaordic_special.extras.special.pages&&chaordic_special.extras.special.pages.length>0;
        window.vues = [];
        chaordicData = addDiscountData(chaordicData);
        $.each(chaordicData, function (label,levels) {
            var index = 0;
            $.each(levels, function (ndx,level) {
                var feature = level.feature;
                if($.inArray(feature,doNotRender)>=0) { return false; }
                var carouselOff = false;
                var vertical = $.inArray(feature,verticalShowcases)>=0?true:false;
                var filtersOff = $.inArray(feature,filtersOffShowcases)>=0?true:false;
                var specialShowcaseOn = $.inArray(feature,specialShowcase)>=0?true:false;
                var getProductsSkusOn = $.inArray(feature,getProductsSkus)>=0?true:false;
                if(specialSetsAvailable&&"undefined"!==typeof chaordic_special.extras.special.pages) {
                    $.each(chaordic_special.extras.special.pages,function (ndx,page) {
                        if(feature==page.feature) {
                            carouselOff = !page.carousel||false;
                            filtersOff = !page.menu||false;
                        }
                    });
                }
                if(specialShowcaseOn){
                    columns = !!level.columns&&level.columns>0?level.columns:2;
                }
                var slides = 4;
                var carousel_vert_opts = {};
                var carousel_opts = {};
                var refs = level.displays[0].references;
                var refs_price = { regular: 0, sale: 0 };
                var refs_length = refs.length;
                var refs_on = '';
                if(refs_length>0) {
                    var refs_price = { regular: refs[0].oldPrice, sale: refs[0].price };
                    refs_on = '_refs-on' + ((refs_length>1)?' _switch-btn-on':'');
                    slides = slides - 1;
                }
                // if(getProductsSkusOn) {
                    // level.displays[0] = addSkus(level.displays[0]);
                // }
                if(vertical) {
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
                carousel_opts = $.extend(carousel_opts,{
                    slidesToShow: slides,
                    slidesToScroll: slides,
                    arrows: true,
                    dots: false,
                    responsive: [
                        {
                            breakpoint: 880,
                            settings: {
                                slidesToShow: slides-1,
                                slidesToScroll: slides-1,
                                arrows: true,
                                dots: true
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 2, 
                                slidesToScroll: 2,
                                arrows: true,
                                dots: true
                            }
                        }
                    ]
                });
                var showcase_container = '.__'+label+index+'__';
                $('._'+label).append('<div class="'+showcase_container.substr(1)+'"><chaordic></chaordic></div>');
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
                
                "function"===typeof Vue&&Vue.component('chaordic', {
                    template: $showcase,
                    data: function() {
                        return dataSet
                    },
                    created: function() {
                        this._loading = false;
                        this.setShowcaseInfo();
                        this.setFilters();
                        this.setRefs();
                        if(!specialShowcaseOn) {
                            this.setProducts();
                        } 
                        else if(specialShowcaseOn&&level.displays[0].references instanceof Array&&"available"===level.displays[0].references[0].status) {
                            // level.displays[0] = addSkus(level.displays[0]);
                            // if(this.setKits()) {
                            //     this.setKitsSummary();
                            // }
                        }
                        if(!vertical) {
                            this.switchProd();
                        } else {
                            this.mountCarouselVertical(showcase_container+' ._chaordic-refs ._chaordic-refs-products',carousel_vert_opts);
                        }
                        return true;
                    },
                    methods: {
                        setShowcaseInfo: function() {
                            this.showcase = {
                                index: index,
                                info: {
                                    showcase: vertical ? "references" : "recommendations",
                                    page: page,
                                    title: level.subtitle||level.title,
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
                        setFilters: function() {
                            if(filtersOff) {
                                this.filters = [];
                                return false;
                            }
                            var products = level.displays[0].recommendations;
                            var filters = [];
                            $.each(products,function (ndx,product) {
                                if("undefined"!==typeof product.categories
                                    &&product.categories.length>2
                                    &&"undefined"!==typeof product.categories[2].id
                                    &&$.inArray(product.categories[2].id,filters)<0){
                                        filters.push(product.categories[2].id);
                                    } // here
                            });
                            if(filters.length>1)
                                this.filters = filters;
                            return true;
                        },
                        setProducts: function() {
                            this.mountChaordic(level.displays[0].recommendations);
                            return true;
                        },
                        setRefs: function () {
                            this.refs = refs;
                            return true;
                        },
                        setKits: function (p_data) {
                            var data = p_data||level.displays[0].recommendations;
                            var new_data = [];
                            if(getProductsSkusOn) {
                                $.each(data,function (ndx,datum) {
                                    if(!datum.skus){
                                        new_data.push(datum)
                                    }
                                });
                            }
                            this.kits = new_data.splice(0,columns);
                            this.kits_remaining = new_data.slice();
                            this.kit_totals = {
                                title: "Valor dos itens",
                                regular: "R$ 0,00",
                                price: "R$ 0,00",
                                button: 'Comprar'
                            };
                            return true;
                        },
                        setKitsSummary: function () {
                            var refs = this.refs;
                            var kits = this.kits;
                            var prices = refs_price;
                            var kits_length = 1;
                            prices.regular = refs[0].oldPrice||0;
                            prices.sale = refs[0].price||0;
                            $.each(kits,function (index,kit) {
                                if(kit.active){
                                    prices.regular += kit.oldPrice||0;
                                    prices.sale += kit.price||0;
                                    kits_length++;
                                }
                            });
                            var title = kits_length<=1?"Valor de "+ kits_length +" "+"item":"Valor dos "+ kits_length +" "+"itens";
                            var button = kits_length<=1?'Comprar':'Comprar junto';
                            var kit_totals = {
                                title: title,
                                sale: prices.sale,
                                button: button
                            }
                            if(prices.regular>0) {
                                kit_totals = $.extend(kit_totals,{ regular: prices.regular });
                            }
                            this.kit_totals = kit_totals;
                            return true;
                        },
                        buyProducts: function(){
                            var skus = [];
                            skus.push(this.refs[0].id);
                            $.each(this.kits,function (ndx,kit) {
                                if(kit.active) {
                                    skus.push(kit.id);
                                }
                            });
                            //add2cart(skus);
                            return true;
                        },
                        getShowcaseClass: function (product) {
                            var classes = ["_-showcase-list-_"];
                            if(carouselOff) {
                                classes.push("_-no-carousel-_");
                            } else {
                                classes.push("_-carousel-_");
                            }
                            return classes.join(' ');
                        },
                        getKitClass: function (product) {
                            if(product.active)
                                return '_kit-on';
                            return '_kit-off';
                        },
                        switchKitProd: function(column) {
                            var kits_remaining = this.kits_remaining.slice();
                            var kits = this.kits.slice();
                            var new_kit = kits_remaining.shift();
                            kits_remaining.push(kits.splice(column,1)[0]);
                            kits.splice(column,0,new_kit);
                            this.kits = kits;
                            this.kits_remaining = kits_remaining;
                            this.setKitsSummary();
                            return true;
                        },
                        removeKitProd: function(column) {
                            this.kits[column].active = !this.kits[column].active;
                            this.setKitsSummary();
                            return true;
                        },
                        bringBackKitProd: function(column) {
                            this.kits[column].active = !this.kits[column].active;
                            this.setKitsSummary();
                            return true;
                        },
                        unmountCarousel: function() {
                            // $(showcase_container).find('._-carousel-_ .slick-nav').remove();
                            $(showcase_container).find('._-carousel-_').slick('unslick');
                            return true;
                        },
                        mountCarousel: function (p_elem,p_opts) {
                            // console.log('carouselOff',carouselOff)
                            if(carouselOff) {
                                return false;
                            }
                            var opts = p_opts || {};
                            this.$nextTick(function (e) {
                                applyCarousel(p_elem,opts);
                            });
                            return true;
                        },
                        mountCarouselVertical: function (p_elem,p_opts) {
                            var opts = p_opts || {};
                            this.$nextTick(function (e) {
                                applyCarousel(p_elem,opts);
                            });
                            return true;
                        },
                        mountChaordic: function(data) {
                            this.products = data;
                            this.all_data = data;
                            this.mountCarousel(showcase_container+' ._-carousel-_',carousel_opts);
                            return true;
                        },
                        switchProd: function () {
                            this._loading = !this._loading;
                            var refs = this.refs;
                            var refs_length = refs.length;
                            if(refs_length<=1) {
                                /* nothing to do */
                                return true;
                            }
                            var ref = refs.shift();
                            var id = refs[0].id;
                            refs.push(ref);
                            this.refs = refs;
                            loadChaordicData(id,function (chaordicResults) {
                                this.unmountCarousel();
                                this.products = chaordicResults.displays[0].recommendations;
                                this.mountCarousel(showcase_container+' ._-carousel-_',carousel_opts);
                                this._loading = !this._loading;
                            }.bind(this));
                            return true;
                        },
                        customFilter: function(p_filter) {
                            this.category = p_filter||"";
                            this.filteredChaordic();
                            return true;
                        },
                        filteredChaordic: function() {
                            this.unmountCarousel();
                            var filter = this.category;
                            if('all'===filter) {
                                this.products = this.all_data.slice();
                                this.mountCarousel(showcase_container+' ._-carousel-_',carousel_opts);
                                return true;
                            }
                            var filtered_data = [];
                            var data = this.all_data.slice();
                            $.each(data,function (ndx,item) {
                                if(item.categories[2].id==filter) {
                                    filtered_data.push(item);
                                }
                            });
                            data = filtered_data;
                            this.products = data;
                            this.mountCarousel(showcase_container+' ._-carousel-_',carousel_opts);
                            return true;
                        },
                        checkStatus: function (arg) {
                            return arg.status=="available";
                        },
                        getImage: function (p_product) {
                            var product = p_product;
                            var image = product.images['1000x1000'];
                            var size = "250";
                                size = "180";
                            if($('html').hasClass('_mobi-on')) {
                                size = "140";
                            }
                            // image = image.replace(/.*?(\/arquivos.*\/ids\/\d*)(.*)(\/.*)/, "$1-"+imgsize+"$3");
                            image = image.replace(/(.*?ids\/\d*-)(.*?)(\/.*)/ig, "$1" + size + "-" + size + "$3").replace(/\?.*/, "");
                            if(/vteximg/ig.test(image)) {
                                image = ['https://',image].join('/').replace(/([^:])([/]{2,})/gm,'$1/');
                            } else {
                                image = ['https://qbbr.vteximg.com.br',image].join('/').replace(/([^:])([/]{2,})/gm,'$1/');
                            }
                            image = image.replace(/\?.*/,'');
                            return image;
                        },
                        hasBestPrice: function (arg) {
                            var v = "undefined"!==typeof arg
                                && "undefined"!==typeof arg.oldPrice
                                && null!==arg.oldPrice 
                                && arg.oldPrice > arg.price
                                || "number"==typeof arg.oldPrice&&arg<10000
                                ;
                            return v;
                        },
                        checkRegularPrice: function (arg) {
                            return !("object"==typeof arg&&null==arg || "number"==typeof arg&&arg>10000);
                        },
                        hasInstallments: function (arg) {
                            if("object"==typeof arg&&arg==null) return false;
                            return true;
                        },
                        formatPrice: function (pvalue) { 
                            var value = pvalue;
                            if("string"===typeof(value)){
                                value = 1*value.replace(/R\$/g,"").replace(/\,/,".").trim(); 
                            }
                            return value.formatMoney();
                        },
                        checkDiscount: function (arg) {
                            return "undefined" !== typeof arg && arg > 0;
                        },
                        checkPercentage: function (arg) {
                            return "undefined" !== typeof arg && arg > 0;
                        },
                        getSku: function (product) {
                            return product.sku;
                        },
                        getSkuName: function (product) {
                            var name = product.name||product.skuname;
                            return name;
                        },
                        showSkus: function (product) {
                            return false;
                            // var productLength = "object"===typeof product.skus&&product.skus.length>0;
                            // return productLength;
                        },
                        getSkuClass: function (product) {
                            var skus = product.skus||0;
                            if(skus.length>1)
                                return '_skus-many';
                            if(skus.length==1)
                                return '_sku-one';
                            return '_no-skus';
                        },
                        getCatClass: function (item) {
                            var cat = "";
                            if(!!item.categories&&item.categories.length>2){
                                cat = item.categories[2].id;
                                cat = "_"+cat.accentsTidy();
                            }
                            return cat;
                        },
                        getTitle: function (product) {
                            return product.name;
                        },
                        getAlt: function (product) {
                            return "Produto: "+product.name;
                        },
                        convert2class: function (arg) {
                            if(arg.length<=0) return "";
                            var className = "_"+arg.accentsTidy();
                            return className;
                        },
                        loadingClass: function(arg){
                            if(!arg){
                                return "__rotate";
                            }
                            return "";
                        },
                        productClicked: function (Obj) {                            
                            // var url2go = Obj.url;
                            var category = "Vitrine Chaordic Clique";
                            var url = Obj.trackingUrl;
                            var index = Obj.index||0;
                            var page = Obj.page||"other";
                            var showcase = Obj.showcase||"recommendations";
                            var shelf = Obj.shelf||"top";
                            var feature = Obj.feature||"";
                            var sku = Obj.id||"0";
                            var name = Obj.name;
                            var label = [shelf,feature,sku,name].join('|');
                        
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
                            sessionStorage.setItem(
                                'chaordic_meta_data',
                                JSON.stringify(_sessionStorage)
                            );
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
                    mounted: function () {
                        var skuList = {};
                        if(getProductsSkusOn&&level.displays[0].references instanceof Array&&"available"===level.displays[0].references[0].status){
                            addSkus(level.displays[0]).then(function (p_skuList) {
                                skuList = p_skuList;
                                // level.displays[0] = skuList;
                                // this.$nextTick(function () {
                                    // Vue.set(this.refs,skus,skuList.references.skus);
                                    // this.kits = skuList.recommendations;
                                    // if(this.setKits()) {
                                        // }
                                        this.refs = skuList.references;
                                        this.kits = skuList.recommendations.splice(0,columns);
                                        this.kits_remaining = skuList.recommendations;
                                        this.setKitsSummary();
                                // });
                            }.bind(this));
                        }
                        return true;
                    }
                });
                "function"===typeof Vue&&window.vues.push(new Vue({el: showcase_container}));
                index++;
            });
        });
        // "function"===typeof window.setChaordicFuncEvents&&window.setChaordicFuncEvents();
        $('html').trigger('chaordicEvents');
        fixLazy();
        return true;
    };
    var startChaordic = function () {
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
if("undefined"!==typeof(console)&&"undefined"!==typeof(console.clear)){console.clear=function(){return '-';}}
var getCookie = function(cname) {var n = cname + "="; var d = decodeURIComponent(document.cookie);var ca = d.split(';'); for(var i = 0; i <ca.length; i++) {var c = ca[i]; while (c.charAt(0) == ' ') { c = c.substring(1); } if (c.indexOf(n) == 0) { return c.substring(n.length, c.length); }} return "";};
/*accentsTidy*/
String.prototype.accentsTidy=function(e){var e=e||"-";var a=this.toLowerCase().trim();a=a.replace(new RegExp(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g),"a"),a=a.replace(new RegExp(/\u00e6/g),"ae"),a=a.replace(new RegExp(/\u00e7/g),"c"),a=a.replace(new RegExp(/[\u00e8\u00e9\u00ea\u00eb\u0026]/g),"e"),a=a.replace(new RegExp(/[\u00ec\u00ed\u00ee\u00ef]/g),"i"),a=a.replace(new RegExp(/\u00f1/g),"n"),a=a.replace(new RegExp(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g),"o"),a=a.replace(new RegExp(/\u0153/g),"oe"),a=a.replace(new RegExp(/[\u00f9\u00fa\u00fb\u00fc]/g),"u"),a=a.replace(new RegExp(/[\u00fd\u00ff]/g),"y"),a=a.replace(new RegExp(/\s/g),e);var f="-";if(e!="-")f='';a=a.replace(new RegExp(/\W/g),f); return a};Array.prototype.remove=function(){for(var a,b=arguments,c=b.length,d;c&&this.length;)for(a=b[--c];-1!=(d=this.indexOf(a));)this.splice(d,1);return this};Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){b=b||0;for(var c=this.length;b<c;){if(this[b]===a)return b;++b}return-1});
/* FormatMoney */
Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {places = !isNaN(places = Math.abs(places)) ? places : 2; symbol = symbol !== undefined ? symbol : "R$ "; thousand = thousand || "."; decimal = decimal || ","; var number = this, negative = number < 0 ? "-" : "", i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0; return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : ""); };
/** Is visible? */
(function(a){function h(){var e=window.innerHeight,d=document.compatMode;if(d||!a.support.boxModel)e="CSS1Compat"==d?document.documentElement.clientHeight:document.body.clientHeight;return e}a(window).scroll(function(){var e=h(),d=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,b=[];a.each(a.cache,function(){this.events&&this.events.inview&&b.push(this.handle.elem)});b.length&&a(b).each(function(){var c=a(this),b=c.offset().top,f=c.height(),g=c.data("inview")||!1;d>b+f||d+e<b?g&&(c.data("inview",!1),c.trigger("inview",[!1])):d<b+f&&!g&&(c.data("inview",!0),c.trigger("inview",[!0]))})});a(function(){a(window).scroll()})})(jQuery);
var yvapiScript = function () {var _yvs = document.createElement("script");_yvs.type = "text/javascript"; _yvs.async = true; _yvs.id = "yvsrc";_yvs.src = "//service.yourviews.com.br/script/98b7ade8-0fea-4dce-b401-ae793f3a3ad2/yvapi.js";_yvs.className = "yvapi-script";$('head').filter(function () { return $('head .yvapi-script').length<=0; }).append(_yvs);return true;};
/** log */
var __log = function () { if("object"==typeof console&&"function"===typeof console.log&&arguments.length>0){ console.log(arguments); return true; } return false; };

(function($, window, document, undefined) {
    'use strict';
    window.loadShowcaseImage = function (item,src) {
        var img = new Image();
        img.addEventListener('load',function () {
            $(item).html(img);
        });
        img.addEventListener('error',function () {
            $(item).filter(function () {
                return $(this).find('img').length<=0;
            }).append('<img src="/arquivos/img-250x250-00000000.png" />');
            $(item).addClass('__img-not-found');
        });
        img.src = src;
    };
    window.setDataImageSrc = function () {
        $('._showcase-lazy').find('.__p_img').each(function (ndx,item) {
            var _item = $(item);
            var url = _item.html().replace(/\n/,"").replace(/<!.*(http.*?)\"[\S\s]*/,"$1").trim();
            _item.attr('data-image-src',url);
        });
        return true;
    };
    window.loadShowcasePics = function (showcase) {
        if(setDataImageSrc()){
            $(showcase).not('.__images-loaded').find('.__p_img').each(function (ndx,item) {
                var url = $(item).attr('data-image-src')||"";
                if(url.length>0) {
                    loadShowcaseImage(item,url);
                }
            });
            $(showcase).addClass('__images-loaded');
        }
        return true;
    };
    window.chaordicTracking = function(){
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
            $('[data-impression-url]').each(function (ndx,item) {
                $(item).not('.__impression-on').addClass('__impression-on')
                    .on('inview',function (event, visible) {
                        if(visible) {
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
            var shelf = item.dataset.shelf||"top";
            var page = item.dataset.page||"other";
            var feature = item.dataset.feature||"";
            var action = document.location.pathname;
            var label = shelf + "|" + feature + "|" + item.dataset.showcase;
            var _item = $(item);
            if(_item.length<=0) return false;
            var url = _item.attr('data-impression-url')||"";
            if(url.length>0){
                if(!_item.attr('data-impression-triggered')){
                    _item.attr('data-impression-triggered','true');
                    var jqxhr = $.get(url,function () {
                        /* success */
                        self.__log('[Chaordic] '+_selfC.categories['event'], action, label);
                    });
                    self.GASendEvent(_selfC.categories["event"], action, label);
                }
            }
            return true;
        };
        self.chaordicTrackingUrl = function () {
            var _selfT = this;
            $('[data-tracking-url]').not('.__track-on').addClass('__track-on')
                .on('click.chaordicTrackingUrl',function (e) {
                    e.preventDefault();
                    var _this = $(this);
                    var url2go = _this.attr('href');
                    _selfT.productClicked(_this,function () {
                        __log('url2go callback');
                        window.location = url2go;
                    });
                });
            return true;
        };
        self.productClicked = function(_this,cb){
            var _selfP = this;
            var url = _this.attr('data-tracking-url');
            var url2go = _this.attr('href');
            var name = _this.find('.__p_name').text()||"";
            var sku = _this.attr('data-prd')||"0";
            var index = _this.attr('data-index')||0;
            var shelf = _this.attr('data-shelf')||"top";
            var feature = _this.attr('data-feature')||"";
            var page = _this.attr('data-page')||"other";
            var showcase = _this.parents('._prd').attr('data-showcase');
                showcase = showcase||"recommendations";
            var label = [shelf,feature,sku,name].join('|');

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
            sessionStorage.setItem(
                'chaordic_meta_data',
                JSON.stringify(_selfP._sessionStorage)
            );
            _selfP.GATracking();
            if("function"===typeof cb){
                cb();
            }
            return true;
        };
        self.GATracking = function () {
            var _selfGA = this;
            if("undefined"!==typeof _selfGA._sessionStorage
                &&"undefined"!==typeof _selfGA._sessionStorage['category']
                &&"undefined"!==typeof _selfGA._sessionStorage['action']
                &&"undefined"!==typeof _selfGA._sessionStorage['label']){
                    /** GA tracking */
                    var category = _selfGA._sessionStorage['category'];
                    var action = _selfGA._sessionStorage['action'];
                    var label = _selfGA._sessionStorage['label'];
                    _selfGA.__log('[GA] Tracking Triggered.');
                    _selfGA.GASendEvent(category, action, label);
                    return true;
            }
        };
        self.GASendEvent = function(category, action, label) {
            var _selfGAS = this;
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
                'event': 'event',
                'eventCategory': category,
                'eventAction': action,
                'eventLabel': label
            });
            self.__log('[GA] dataLayer.push: '+([category, action, label].join(', ')));
            return true;
        };
        self.__log = function () {
            if("object"==typeof console&&"function"===typeof console.log&&arguments.length>0){
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
        "function"===typeof (new window.chaordicTracking).isVisible&&(new window.chaordicTracking).isVisible();
        // "function"===typeof (new window.chaordicTracking).chaordicTrackingUrl&&(new window.chaordicTracking).chaordicTrackingUrl();
        return true;
    };
    window.chaordiEvents = function () {
        $('html').off('chaordicEvents').on('chaordicEvents',function (e) {
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