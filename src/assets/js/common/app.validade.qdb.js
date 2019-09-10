// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('4 u={a:{\'t\':\'g/f; v=y-8\',\'z-s\':\'g/f\',\'q-r\':\'m=0-1\',\'x-k-5-p\':\'o@n.w\',\'x-k-5-J\':\'K|L;M/\'},c:{l:\'/5/h/N/e/A/\',9:\'/5/h/I/H/9/\',},d:6(7,3){4 2=b;$.C({7:7,B:\'D\',a:2.a,}).E(6(i){3(i)})},G:6(j,3){4 2=b;2.d(2.c.9+j,3)},F:6(e,3){4 2=b;2.d(2.c.l+e,3)}}',50,50,'||_this|callback|var|api|function|url||variations|headers|this|endpoints|req|sku|json|application|catalog_system|data|productId|vtex|skuDetails|resources|gmail|integracaomasterdata2015|appKey|REST|range|Type|Accept|vtexHelper|charset|com||utf|Content|stockkeepingunitbyid|type|ajax|GET|success|getSkuDetails|getVariations|products|pub|appToken|KjI|1akmLT|7x|pvt'.split('|'),0,{}))

var vtexHelper = {

    headers: {},

    endpoints: {
        skuDetails: '/api/catalog_system/pvt/sku/stockkeepingunitbyid/',
        variations: '/api/catalog_system/pub/products/variations/',
    },

    req: function(url, callback){

        var _this = this;

        $.ajax({
            url: url,
            type: 'GET',
            headers: _this.headers,
        }).success(function(data){
            callback(data);
        });
    },

    getVariations: function(productId, callback){
        var _this = this;
        //_this.req(_this.endpoints.variations + productId, callback);

        $.ajax({
            url: '/api/catalog_system/pub/products/variations/' + productId,
            type: 'GET',
        }).success(function(data){
            callback(data);
        });
    },

    getSkuDetails: function(sku, callback){
        var _this = this;
        //_this.req(_this.endpoints.skuDetails + sku, callback);

        $.ajax({
            url: 'https://botiwall.corebiz.com.br/catalog/sku',
            data: {filter: sku, filterType:'stockkeepingunitbyid'},
            type: 'GET',
        }).success(function(data){
            callback(data);
        });
    }
}

var ServiceClass = function(){

    this.getServices = function(sku, callback){
        vtexHelper.getSkuDetails(sku, callback);
    };

    this.getServicesFromAllSkus = function(productId, callback){

        var _this = this;

        var len = 0;
        var idx = 0;
        var obj = {};

        vtexHelper.getVariations(productId, function(res){

            len = res.skus.length;

            recursive(idx);

            function recursive(idx){
                if(idx < len){
                    _this.getServices(res.skus[idx].sku, function(skuData){
                        obj[res.skus[idx].sku] = skuData.Services;
                        obj[res.skus[idx].sku]['Associated'] = skuData.Attachments;
                        idx++
                        recursive(idx);
                    });
                }else{
                    callback(obj);
                    // console.log('obj: ',obj);
                }
            }
        });
    };

    this.getServicesFromOneSku = function(skuId, callback){

        var _this = this;

        var obj = {};

        _this.getServices(skuId, function(skuData){
            obj[skuId] = skuData.Services;
            obj[skuId]['Associated'] = skuData.Attachments;
            callback(obj);
        });
    };
};

var FlagClass = function(){
    this.html = "<div class='flag-validade'><p>#data-de-validade#<p></div>";
    this.htmlProduct ='<div class="ultima-chance flag-#sku#"><span>pra usar já</span>válido até #data-de-validade#</div>';
    this.dateToFlag = function(date){
        return this.html.replace('#data-de-validade#', date);
    };
    this.productFlag = function(date, sku){
        return this.htmlProduct.replace('#data-de-validade#', date).replace('#sku#', sku)
    };
};

var countSkus = function(){
    return document.querySelector('#___rc-p-sku-ids').value.split(',').length;
};

var getArrayOfAllSkus = function(){
    return document.querySelector('#___rc-p-sku-ids').value.split(',');
};

var formatContent = function(data){
    var flagProduct = new FlagClass();
    return flagProduct.productFlag(data.string, data.sku);
};

var putFlagOnScreen = function(data, beforeIt, mainClass){
    var content = formatContent(data);
    if($(mainClass).length == 0){
        $('<div class="' + mainClass.replace('.', '') + '"></div>').insertBefore(beforeIt);
        $(mainClass).append(content);
    }else{
        $(mainClass).append(content);
    }
};

var expirationDateSku = function(attachments){
    
    this.attachments = attachments;

    this.hasExpiration = function(){
        var has = false;
        for(var sku in obj){
            if(obj[sku].Associated[0] != undefined){
                if(JSON.stringify(obj[sku].Associated[0]).indexOf('validade') > -1){
                    has = true;
                }
            }
        }
        return has;
    };

    this.formatDate = function(){
        var array = strDate.split('-');
        var month = array[1];
        var year = array[2];

        var objRef = {
            'jan': 'Janeiro',
            'fev': 'Fevereiro',
            'mar': 'Março',
            'abr': 'Abril',
            'mai': 'Maio',
            'jun': 'Junho',
            'jul': 'Julho',
            'ago': 'Agosto',
            'set': 'Setembro',
            'out': 'Outubro',
            'nov': 'Novembro',
            'dez': 'Dezembro'
        };

        var string = objRef[month] + " de " + "20" + year;

        console.info({ month: objRef[month], year: "20" + year, string: string });

        return { month: objRef[month], year: "20" + year, string: string };
    };
};

var formatValidade = function(attachments){

    var flag = new FlagClass();

    var skuInfo = {};

    attachments = attachments.filter(function(a){ return (a.Name.indexOf('validade') > -1) });

    console.log('bolo',attachments)

    if(attachments[0] != undefined){
        var validade = attachments;
        console.log('validade>', validade)
        if(validade.length > 0) { 
            skuInfo['validade'] = expirationDate.formatDate(validade[0].Name);
            skuInfo['validade']['html'] = flag.dateToFlag(expirationDate.formatDate(validade[0].Name).string);
        }
    }
    console.log('skuInfo[validade]',skuInfo['validade'])
    console.log('skuInfo[validade][html]',skuInfo['validade']['html'])
    return validade;
};

var expirationDate = {

    attachments: null,

    init: function(obj, callback){
        if(this.hasExpiration(obj)){
            for(key in obj){
                this.attachments = obj[key].Associated;
            }
        }
        this.delegates(callback);
    },

    delegates: function(callback){
        var attachments = this.attachments;
        $('.buy-button').on('click', function(e){
            e.preventDefault();
            callback(attachments);
        });
    },

    hasExpiration: function(obj){
        var has = false;
        for(var sku in obj){
            if(obj[sku].Associated[0] != undefined){
                if(JSON.stringify(obj[sku].Associated[0]).indexOf('validade') > -1){
                    has = true;
                }
            }
        }
        return has;
    },

    formatDate: function(strDate){
        var array = strDate.split('-');
        var month = array[1];
        var year = array[2];

        var objRef = {
            'jan': 'Janeiro',
            'fev': 'Fevereiro',
            'mar': 'MarÃ§o',
            'abr': 'Abril',
            'mai': 'Maio',
            'jun': 'Junho',
            'jul': 'Julho',
            'ago': 'Agosto',
            'set': 'Setembro',
            'out': 'Outubro',
            'nov': 'Novembro',
            'dez': 'Dezembro'
        };

        var string = objRef[month] + " de " + "20" + year;

        return { month: objRef[month], year: "20" + year, string: string };
    }
};

var createModal = function(e){
    if(window.validade != null){
        e.preventDefault();
        var data = { showModal : true, validade: window.validade };

        var methods = {
            open: function(){
                this.validade = window.validade;
                this.showModal = true;
            },

            close: function(){
                this.showModal = false;
            },

            buy: function(){
                var url = document.querySelector('.buy-button').href;
                location.href = url;
            },

            back: function(){
                this.showModal = false;
            }
        }

        if(window.buyModal == null){
            window.buyModal = new ModalValidade('tbbqa', '#vue-app', data, methods);
            window.buyModal.init();   
            // console.log("----------");
            // console.log(window.buyModal);
            // console.log("----------");
        }else{
            window.buyModal.app.validade = window.validade;
            window.buyModal.app.showModal = true;
        }
    }
};

var initValidade = function(){
    
    var produtoService = new ServiceClass();

    var productId = document.querySelector('#___rc-p-id').value;

    var flag = new FlagClass();

    window.buyModal = null;

    window.attachs = {};

    var teste = window.attachs;
    console.log(teste)
    
    window.validate = null;

    window.buyModalFn = function(){ };

    $('.buy-button').on('click', function(e){
        window.buyModalFn(e);
    });

    produtoService.getServicesFromAllSkus(productId, function(services){

        var data = null;
        var skusLen = 0;

        for(var sku in services){

            // console.log(sku, services[sku].Associated[0]);

            skusLen++;
            if(services[sku]['Associated'][0] != undefined){
                data = expirationDate.formatDate(services[sku]['Associated'][0].Name);

                data['sku'] = sku;

                // console.log("data", data);

                putFlagOnScreen(data, '.product-buy-button', '.flag-container-validade');
                
                window.attachs[sku] = data;

                window.buyModalFn = createModal;

                if(skusLen == 1){
                    window.validade = data.string;
                }else{
                    window.validade = null;
                }
            }
        }

        var skusFromPage = $('#___rc-p-sku-ids').attr('value').split(",");

        if(skusFromPage.length == 1){
            mainFunction(skusFromPage[0]);
        }
    });
};

function activeValidadeWhenReady(){
    var checkReady = setInterval(function(){
        var skuUrl = window.location.href.split('idsku=');
        var thisSku = skuUrl[1];
        thisSku = thisSku.split('&',1);
        thisSku = thisSku[0];
        var thisDivSku = document.querySelector('.flag-'+thisSku)
        // console.log(thisDivSku, ' e ', thisSku)
        if(thisDivSku != undefined){
            $('.ultima-chance').removeClass('item-active');
            $(thisDivSku).addClass('item-active');
            clearInterval(checkReady);
        }
    }, 1000);
}
// $(window).on('load', function(){
//     activeValidadeWhenReady()
// })

var mainFunction = function(sku){
    // console.log("-------------", sku);
    // console.log("validade", window.validade);
    try{
        $('.ultima-chance').removeClass('item-active');
        $('.flag-' + sku).addClass('item-active');
        if(window.attachs == undefined){
            window.validade = null;
        }else{
            if(window.attachs[sku] == undefined){
                window.validade = null;
            }else{
                window.validade = window.attachs[sku].string;
            }
        }
    }catch(err){
        console.error(err);
    }
};

var ModalValidade = function(enviroment, selector, data, methods){

    this.app = null;

    this.init = function(){

        var _this = this;
 
        var templateData = `<div class="vue-popup">
            <transition name="modal">
                <div class="vue-aux-box">
                    <div class="vue-overlay" @click="showModal = false" v-bind:class="{ 'active': showModal }"></div>
                    <div class="modal-mask" v-show="showModal" v-bind:class="{ 'fade-in-up': showModal, 'fade-out-down' : !showModal }">
                        <div class="modal-container">
                            <button class="btn-vue-modal-close" @click="showModal = false"><i class="ico-close"></i></button>

                            <!--<slot name="content"></slot>-->
                            <div>
                                <!--<h3>PSIU!</h3>-->
                                <div>
                                    <p>ei, pera! esse produto é válido até <strong>{{validade}}</strong>, tá?</p>
                                </div>
                            </div>
                            
                            <button id="modal-back" @click="back">voltar</button>
                            <button id="modal-comprar" @click="buy">continuar compra</button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>`;

        var modal = {
            template: templateData,
            data: function(){ return data },
            methods: methods
        }

        Vue.component('modal', modal);

        _this.app = new Vue({
            el: selector,
            data: data
        });
    };

    this.open = function(){
        console.info(this.app);
    };

    this.close = function(){

    };
}

$(document).ready(function(){
    try{
        initValidade();
    }catch(err){
        console.error(err);
    }
});

$(window).on('skuSelected.vtex', function(e, productId, skuObj){
    mainFunction(skuObj.sku);
});

// Correção
// $(window).on('skuSelected.vtex', function(e, productId, skuObj){ 
//     if($('.sku-notifyme').is(':visible')){ 
//         $('.wrapperPrecoSelo').hide(); 
//     }else{ 
//         $('.wrapperPrecoSelo').show(); 
//     }
// });