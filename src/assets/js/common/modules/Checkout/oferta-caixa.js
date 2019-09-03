// OFERTA DE CAIXA
// PROMOTION DATA -- CADASTRAR NO GTM
var promotionData = [{   
    "906": { //Posição-idSku
        activeValue: 40.00, //valor do sarrafo(carrinho)
        discountPercent: 20.0 //porcentagem
    },
    "1910": { //Posição-idSku 
        activeValue: 80.99, //valor do sarrafo(carrinho)
        discountPercent: 50.0 //porcentagem
    },
    "1259": { //Posição-idSku
        activeValue: 120.00, //valor do sarrafo(carrinho)
        discountPercent: 50.0 //porcentagem  
    } 
}];  
__skus = []; 
    if(typeof promotionData != "undefined"){
        var productSku =  promotionData.map(el => Object.keys(el).sort().reverse());
        __skus.push(productSku);
        var getProds = (function ($,window,document,undefined) {
            $.ajax({
                type: "GET",
                url: 'https://www.quemdisseberenice.com.br/cart?refs=' + __skus.join(','),
                data: "check",
                success: function(response){
                    resultOfertas = $(response).filter('div.ofertaDeCaixa');
                    $('.cart').append(resultOfertas);
                    $('.__lnk-buy-btn').on("click", function () {
                        event.preventDefault();
                        var __skuSelected = $(this).attr('href').match(/.*?=([\w|-]*).*/)[1];
                        //console.log(__skuSelected);
                        var item = {
                            id: __skuSelected,
                            quantity: 1,
                            seller: '1'
                        };
                        vtexjs.checkout.addToCart([item], null, 1)
                        .done(function(orderForm) {
                            //console.log(orderForm);
                        });
                    });    
                    _itemDiscount = document.querySelectorAll('._prd');
                    
                }
            });
            
            return getProds;
        })(jQuery,window,document);
         
        var applyPromotionDiscount = function () {
             
            _itemDiscount.forEach( 
                function(item, _attrIdsku, _array) { 
                    _attrIdsku = item.getAttribute("data-sku");
                    //console.log(_attrIdsku);
                    _priceToDiscount = item.querySelectorAll('.__p_priceoffer');
                    _priceFrom = _priceToDiscount[0].innerText.replace('R$ ','').replace(',', '.');
                    
                    _percentDiscount = promotionData[0][_attrIdsku].discountPercent;
                    _sarrafoCart = promotionData[0][_attrIdsku].activeValue;
                    
                    item.setAttribute('data-sarrafo', _sarrafoCart);
                    _sarrafoFloat = document.createElement('span');
                    __msg = 'R$ '+ _sarrafoCart.toString().replace('.',',') + ' em compras'; 

                    _sarrafoFloat.innerText = __msg;
                    _sarrafoFloat.classList.add('activeValue');
                    _spanSarrafo = item.querySelectorAll('.activeValue');
                     
                    if(_spanSarrafo.length <= 0){
                        item.appendChild(_sarrafoFloat); 
                    };
                    
                    _cartSubtotal = parseFloat(vtexjs.checkout.orderForm.totalizers[0].value / 100);
                    if(_cartSubtotal >= _sarrafoCart){
                        item.classList.remove("promoActive"); 
                        item.classList.add("promoActive"); 
                    };
        
                    _resultDiscount = (_priceFrom/100)*(_percentDiscount-100); 
                    _resultFormated = parseFloat(Math.abs(_resultDiscount)).toFixed(2);
                    _promoApplied = _priceToDiscount[0].classList.contains('promoApplied');
                    
                    _priceToDiscount.forEach(
                        function (item, index) { 
                            if(_promoApplied == false){
                                item.innerText = "R$ "+_resultFormated.replace('.',',');
                                item.classList.add("promoApplied"); 
                                return true
                            }
                            else {
                                return false;    
                            }
                        }
                    );  
                } 
            );  
        };  
    };  
    
    $(window).on('orderFormUpdated.vtex', function(event, orderForm) {
        $('._prd').removeClass('promoActive');
        _cartSubtotal = parseFloat(vtexjs.checkout.orderForm.totalizers[0].value / 100);
        _spanSarrafoTotal = 120; 
        _navBar = document.getElementsByClassName('_navBar-OfertaCaixa')[0].childNodes[0]; 
        var barWidth = (_cartSubtotal / _spanSarrafoTotal) * 100; 
        _navBar.style.width = barWidth+'%';
        _itemDiscount.forEach(function (i) {
            _sarrafoCart = Number(i.dataset.sarrafo);
            _promoActive = i.classList.contains('promoApplied');
            if(_cartSubtotal >= _sarrafoCart){
                i.classList.add("promoActive");
            };
        });
        // console.log('alterei o order');
    });
// END: OFERTA DE CAIXA

// SKU SLECTOR
var swapShowcaseData = (function ($,window,document,undefined) {
    "use strict"; 
    return function (Elem,Data) {
        if(!Elem||!Data||!!Data&&!Data.url) { return false; }
        var data = Data, _elem = $(Elem), 
            name = data.name||"", imgURL = data.img, 
            reg_html = "", reg_str = "", reg_value = 1*data.price||0, sale_str = "", sale_value = 1*data.sale||0, 
            times = data.times||"", installments_html = "", installments_str = "", installment_value = data.installments||0, url = data.url||"", 
            sku = data.sku||"", attachments = data.attachments.split(','), 
            _pricing_html = `<span class="_p_price_">{%REG%}</span>
                <span class="_p_priceoffer_"><span class="__p_by">por </span> <span class="__p_priceoffer">{%SALE%}</span></span>
                <span class="_p_intallments">{%PRICING%}</span>`;
        var sale_str = "R$ " + formatBR(sale_value);
        if(url.length>0) {
            url = [url, "idsku=" + sku].join('?');
        }
        if(reg_value>0 && reg_value>sale_value) { 
            reg_str = "R$ "+formatBR(reg_value);
            reg_html = `<span class="__p_from">de </span> <span class="__p_price">{%REGVALUE%}</span>`
            .replace(/{%REGVALUE%}/g,reg_str);
            
        }
        if(times.length>0&&(~~times)>1) { 
            installments_str = "R$ "+formatBR(installment_value);
            installments_html = `<span class="__p_installments"> <span class="__p_numberinstallments">{%TIMES%}x</span> de <span class="__p_installmentsvalue">{%INSTALLMENTVALUE%} </span> <span class="__p_installments-juros">sem&nbsp;juros</span>`
            .replace(/{%TIMES%}/g,times).replace(/{%INSTALLMENTVALUE%}/g,installments_str);
        }         
        _pricing_html = _pricing_html.replace(/{%REG%}/g,reg_html);
        _pricing_html = _pricing_html.replace(/{%SALE%}/g,sale_str);
        _pricing_html = _pricing_html.replace(/{%PRICING%}/g,installments_html);
        
        _elem.find('.__lnk-img').filter(function () {
            return $(this).find('._p-promo-labels').length==0;
        }).append('<div class="_p-promo-labels"></div>');

        var labels = [];
        $.each(attachments,function (ndx,item) {
            if(item.length>0&&/flag/ig.test(item)){
                item = item.replace(/flag:/ig,"");
                labels.push('<span class="__flag __flag-'+stringToSlug(item)+'">'+item+'</span>');
            }
        });
        _elem.find('._p-promo-labels').html(labels.join(""));

        _elem.find('.__lnk-img,.__lnk-pname,.__lnk-buy-btn').attr('href',url);
        //_elem.attr('data-sku',sku);
        _elem.find('.__p_img img').attr('src',imgURL);
        _elem.find('.__p_name').html(name);
        _elem.find('.__p_pricing_').html(_pricing_html); 
        //console.log(_elem);
        // !!applyDiscountFlag&&applyDiscountFlag(_elem); // apply discount flag
        return true;
    }
})(jQuery,window,document);
var getAttClasses = (function ($,window,document,undefined) {
    "use strict";
    return function (Att) {
        if(Att.length<=0) { return ""; }
        var atts = Att.split(',');
        var hasFlags = false;
        $.each(atts,function (ndx,att) {
            if(/flag/ig.test(att)&&!hasFlags){
                hasFlags = true;
            }
            att = att.replace(/Destaque/,"highlight");
            att = "__btn-"+stringToSlug(att);
            atts[ndx] = att;
        });
        if(hasFlags) atts.push("__hasflags");
        return atts.join(" ");
    }
})(jQuery,window,document);
var AddSkuSelector = (function ($,window,document,undefined) {
    return function () {
        var self = this, classMarker = "__selectors-applied";
        self.applySelector = function (Elem) {
            var _elem = $(Elem);
            var prodId = _elem.find('._product').attr('data-prd');
            //console.log(prodId);
            if(_elem.length<=0 || _elem.length>0 && prodId.length<=0){ return false; }
            self.getSku(prodId).then(function (Data) {
                if(!self.applyVariations(_elem,prodId,Data)){
                    self.noVariation(_elem,prodId);
                }
            });
        };
        self.getSku = function (ProdId) {
            var dfd = $.Deferred();
            var prodId = ProdId;
            if(!self.func.getInfo) { // check if undefined
                self.func = new Utls();
            }
            self.func.getInfo(prodId).then(function (Data) {
                if(Data.length>0) {
                    self.data[prodId] = Data[0];
                    dfd.resolve(self.data);
                }
            },function (error) {
                // error
                dfd.reject(error);
            });
            return dfd.promise();
        };
        self.func = {};
        self.data = {};
        self.applyVariations = function (Elem,ProdId,Data) {
            if( !Elem 
                || !ProdId
                || Data.length<=0 
                || !!ProdId && Data[ProdId].items.length>0 && undefined===Data[ProdId].items[0].variations
            ) {
                return false;
            }
            var _style = $('._selectors-styles');
            if(_style.length<=0) {
                _style = $('<style/>').addClass('_selectors-styles');
                $('head').append(_style);
            } 
            var styles = _style.text()||"";
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
            if(_div.length<=0) {
                _div = $('<div/>').addClass('_p-sku-selection'); 
            }
            _div.append(_selectors);
            _div.attr('data-sku-length',selector_length);
            // _div.addClass('_on').attr('data-sku-length',selector_length);
            if(!!_selectorData.settings&&!!_selectorData.settings.type&&/cor/.test(_selectorData.settings.type)){
                hasColor = true;
				_div.addClass('_p-sku-color');
				$('body').addClass(marker);
				if($('._p-selectors')){
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
                .not('.'+marker)
                .addClass(marker).addClass(marker+'-'+id).addClass('_prd-'+id)
                .filter(function () {
                    return $(this).find('._p-sku-selection span').length<=0;
                })
                .find('.__lnk-buy-btn')
                .before(_div);
			_style.text(styles);
			
            var _firstSelected = _selectors.find('.__btn-highlight:first');
            if(_firstSelected.length<=0){
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
            var settings = {}, styles = "";
            var name = Data.productName;
            var url = Data.link||"";
            $.each(Data.items,function (ndx,item) {
                if(!!item.sellers&&item.sellers[0].commertialOffer.AvailableQuantity>0&&!!item.variations) {
                    var times = item.sellers[0].commertialOffer.Installments[0].NumberOfInstallments;
                    var installments = item.sellers[0].commertialOffer.Installments[0].Value;
                        installments = installments.toFixed(2);
                    var _elem = $('<span/>');
                    var type = item.variations[0]||"";
                        type += item.variations.length>1?" | "+item.variations[1]:"";
                    var hasColor = /cor/i.test(type);
                    _elem.on('click.SkuSelection',function(e) {
                        if("function"===typeof self.skuSelected) {
                            self.skuSelected(_elem);
                        }
                    });
                    var attachments = "";
                    
                    var pname = item[item.variations[0]];
                        pname += item.variations.length>1?" | "+item[item.variations[1]]:"";
                    var imgURL = "", thumbURL = "";
                    if(item.images.length>0) {
                        imgURL = item.images[0].imageUrl;
                        imgURL = generateImgUrl(imgURL);
                    }
                    if(item.images.length>1) {
                        $.each(item.images,function (ndx,img) {
                            if(/thumb/i.test(img.imageLabel)) {
                                thumbURL = img.imageUrl;
                                thumbURL = (generateImgUrl(thumbURL)||"").replace(/http:/,"https:");
                                return false;
                            }
                        });
                    }
                    // var highlight = false;
                    if(!!item.attachments){
                        var att = item.attachments.slice(0);
                        var flags = [];
                        $.each(att,function (ndx,item) {
                            // if(!highlight) {
                            //     highlight = /destaque/ig.test(item.name);
                            // }
                            flags.push(item.name);
                        });
                        attachments = flags.join(',');
                    }
                    _elem.html(pname);
                    if(hasColor){
                        _elem.html("&nbsp;");
                        settings = $.extend({},{ type: "cor" });
                    } 
                    var className = '_'+stringToSlug(pname);
                    // if(highlight) { className += " __btn-highlight"; }
                    var sale = item.sellers[0].commertialOffer.Price;
                        sale = sale.toFixed(2);
                    var price = item.sellers[0].commertialOffer.ListPrice;
                        price = price.toFixed(2);
                    _elem.attr('title',pname);
                    // _elem.addClass(className);
                    _elem.addClass(className).addClass(getAttClasses(attachments));
                    _elem.attr('data-qty',item.sellers[0].commertialOffer.AvailableQuantity);
                    _elem.attr('data-name',name);
                    _elem.attr('data-url',url);
                    _elem.attr('data-type',type);
                    _elem.attr('data-img',imgURL);
                    _elem.attr('data-thumb',thumbURL);
                    _elem.attr('data-price',price); // regular price
                    _elem.attr('data-sale',sale); // price on sale = cheaper
                    _elem.attr('data-times',times);
                    _elem.attr('data-installments',installments);
                    _elem.attr('data-sku',item.itemId);
                    _elem.attr('data-attachments',attachments);
                    if(thumbURL.length>0&&hasColor) {
                        styles += "." + className + ":before{background-image:url("+thumbURL+")} ";
                        // $(_elem).css({"background-image":"url("+thumbURL+")"});
                    }
					_container.append(_elem);
                }
            }); 
            var result = { selectors: _container, styles: styles };
            if(!!settings.type){
                result = $.extend(result,{ settings: settings });
            }
            return result;
        };
        self.skuSelected = function (Elem) {
            if(!Elem||!!Elem&&Elem.length<=0) { return false; }
            var _elem = $(Elem);
            var _prd = _elem.parents('._prd');

			//_elem.parent().find('._on').removeClass('_on'); // deactivate all skus
			$('._on').removeClass('_on');
			//console.log(_elem.parent().parent().find('._on'));
            _elem.addClass('_on'); // select this sku
            new swapShowcaseData(_prd,_elem[0].dataset);  
            applyPromotionDiscount();    
        };
        self.sortData = function (Data) {
            if( !!Data.items && Data.items.length<=0 
                || !!Data.items && Data.items.length>0
                    && undefined===Data.items[0].variations
            ) {
                return false;
            }
            var hasColor = /cor/ig.test(Data.items[0].variations.join(","));
            // sort, first if there is a "Destaque", second if there is "flag", third by product price
            if(hasColor) {
                Data.items.sort(function (a,b) {
                    return a.sellers[0].commertialOffer.Price - b.sellers[0].commertialOffer.Price;
                });
            }
            // sort installments
            $.each(Data.items,function (ndx,item) {
                if(!!item.sellers&&item.sellers[0].commertialOffer.AvailableQuantity>0&&!!item.variations) {
                    item.sellers[0].commertialOffer.Installments.sort(function (a,b) {
                        return a.Value - b.Value;
                    });
                }
            });
            return Data;
        };
    }
})(jQuery,window,document);
var applySelectorsOnMutation = (function ($,window,document,undefined) {
    var applySelectorsOnMutation = function (){
        if(!window.___selectors){
            window.___selectors = new AddSkuSelector();
        }
        var target = document.querySelectorAll('[id*=ResultItems]');
        var config = { subtree: true, childList: true };
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if("childList"===mutation.type&&/_product/ig.test(mutation.target.className)){
                    var _prd = $(mutation.target).parents('._prd');
                    window.___selectors.applySelector(_prd);
                }
            });
        });
        target.forEach(function (t){
            observer.observe(t, config);
            return true;
        });
        return true;
    };
$(window).on('load',applySelectorsOnMutation);
	return applySelectorsOnMutation;
})(jQuery,window,document);
var addSkus = (function ($,window,document,undefined) {
    var applyAllSelectors = function () {
        if(!window.___selectors){ 
            window.___selectors = new AddSkuSelector();
        }
        $('._prd').each(function (ndx,item) {
            window.___selectors.applySelector(item);
        });
    };
    $(window).on('load',applyAllSelectors);
    return applyAllSelectors;
})(jQuery,window,document);
// END: SKU SLECTOR