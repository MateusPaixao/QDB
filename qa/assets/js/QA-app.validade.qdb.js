(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('4 u={a:{\'t\':\'g/f; v=y-8\',\'z-s\':\'g/f\',\'q-r\':\'m=0-1\',\'x-k-5-p\':\'o@n.w\',\'x-k-5-J\':\'K|L;M/\'},c:{l:\'/5/h/N/e/A/\',9:\'/5/h/I/H/9/\',},d:6(7,3){4 2=b;$.C({7:7,B:\'D\',a:2.a,}).E(6(i){3(i)})},G:6(j,3){4 2=b;2.d(2.c.9+j,3)},F:6(e,3){4 2=b;2.d(2.c.l+e,3)}}',50,50,'||_this|callback|var|api|function|url||variations|headers|this|endpoints|req|sku|json|application|catalog_system|data|productId|vtex|skuDetails|resources|gmail|integracaomasterdata2015|appKey|REST|range|Type|Accept|vtexHelper|charset|com||utf|Content|stockkeepingunitbyid|type|ajax|GET|success|getSkuDetails|getVariations|products|pub|appToken|KjI|1akmLT|7x|pvt'.split('|'),0,{}))

var vtexHelper = {

    headers: {},

    endpoints: {
        skuDetails: '/api/catalog_system/pvt/sku/stockkeepingunitbyid/',
        variations: '/api/catalog_system/pub/products/variations/'
    },

    req: function req(url, callback) {

        var _this = this;

        $.ajax({
            url: url,
            type: 'GET',
            headers: _this.headers
        }).success(function (data) {
            callback(data);
        });
    },

    getVariations: function getVariations(productId, callback) {
        var _this = this;
        //_this.req(_this.endpoints.variations + productId, callback);

        $.ajax({
            url: '/api/catalog_system/pub/products/variations/' + productId,
            type: 'GET'
        }).success(function (data) {
            callback(data);
        });
    },

    getSkuDetails: function getSkuDetails(sku, callback) {
        var _this = this;
        //_this.req(_this.endpoints.skuDetails + sku, callback);

        $.ajax({
            url: 'https://botiwall.corebiz.com.br/catalog/sku',
            data: { filter: sku, filterType: 'stockkeepingunitbyid' },
            type: 'GET'
        }).success(function (data) {
            callback(data);
        });
    }
};

var ServiceClass = function ServiceClass() {

    this.getServices = function (sku, callback) {
        vtexHelper.getSkuDetails(sku, callback);
    };

    this.getServicesFromAllSkus = function (productId, callback) {

        var _this = this;

        var len = 0;
        var idx = 0;
        var obj = {};

        vtexHelper.getVariations(productId, function (res) {

            len = res.skus.length;

            recursive(idx);

            function recursive(idx) {
                if (idx < len) {
                    _this.getServices(res.skus[idx].sku, function (skuData) {
                        obj[res.skus[idx].sku] = skuData.Services;
                        obj[res.skus[idx].sku]['Associated'] = skuData.Attachments;
                        idx++;
                        recursive(idx);
                    });
                } else {
                    callback(obj);
                    // console.log('obj: ',obj);
                }
            }
        });
    };

    this.getServicesFromOneSku = function (skuId, callback) {

        var _this = this;

        var obj = {};

        _this.getServices(skuId, function (skuData) {
            obj[skuId] = skuData.Services;
            obj[skuId]['Associated'] = skuData.Attachments;
            callback(obj);
        });
    };
};

var FlagClass = function FlagClass() {
    this.html = "<div class='flag-validade'><p>#data-de-validade#<p></div>";
    this.htmlProduct = '<div class="ultima-chance flag-#sku#"><span>pra usar já</span>válido até #data-de-validade#</div>';
    this.dateToFlag = function (date) {
        return this.html.replace('#data-de-validade#', date);
    };
    this.productFlag = function (date, sku) {
        return this.htmlProduct.replace('#data-de-validade#', date).replace('#sku#', sku);
    };
};

var countSkus = function countSkus() {
    return document.querySelector('#___rc-p-sku-ids').value.split(',').length;
};

var getArrayOfAllSkus = function getArrayOfAllSkus() {
    return document.querySelector('#___rc-p-sku-ids').value.split(',');
};

var formatContent = function formatContent(data) {
    var flagProduct = new FlagClass();
    return flagProduct.productFlag(data.string, data.sku);
};

var putFlagOnScreen = function putFlagOnScreen(data, beforeIt, mainClass) {
    var content = formatContent(data);
    if ($(mainClass).length == 0) {
        $('<div class="' + mainClass.replace('.', '') + '"></div>').insertBefore(beforeIt);
        $(mainClass).append(content);
    } else {
        $(mainClass).append(content);
    }
};

var expirationDateSku = function expirationDateSku(attachments) {

    this.attachments = attachments;

    this.hasExpiration = function () {
        var has = false;
        for (var sku in obj) {
            if (obj[sku].Associated[0] != undefined) {
                if (JSON.stringify(obj[sku].Associated[0]).indexOf('validade') > -1) {
                    has = true;
                }
            }
        }
        return has;
    };

    this.formatDate = function () {
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

var formatValidade = function formatValidade(attachments) {

    var flag = new FlagClass();

    var skuInfo = {};

    attachments = attachments.filter(function (a) {
        return a.Name.indexOf('validade') > -1;
    });

    console.log('bolo', attachments);

    if (attachments[0] != undefined) {
        var validade = attachments;
        console.log('validade>', validade);
        if (validade.length > 0) {
            skuInfo['validade'] = expirationDate.formatDate(validade[0].Name);
            skuInfo['validade']['html'] = flag.dateToFlag(expirationDate.formatDate(validade[0].Name).string);
        }
    }
    console.log('skuInfo[validade]', skuInfo['validade']);
    console.log('skuInfo[validade][html]', skuInfo['validade']['html']);
    return validade;
};

var expirationDate = {

    attachments: null,

    init: function init(obj, callback) {
        if (this.hasExpiration(obj)) {
            for (key in obj) {
                this.attachments = obj[key].Associated;
            }
        }
        this.delegates(callback);
    },

    delegates: function delegates(callback) {
        var attachments = this.attachments;
        $('.buy-button').on('click', function (e) {
            e.preventDefault();
            callback(attachments);
        });
    },

    hasExpiration: function hasExpiration(obj) {
        var has = false;
        for (var sku in obj) {
            if (obj[sku].Associated[0] != undefined) {
                if (JSON.stringify(obj[sku].Associated[0]).indexOf('validade') > -1) {
                    has = true;
                }
            }
        }
        return has;
    },

    formatDate: function formatDate(strDate) {
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

var createModal = function createModal(e) {
    if (window.validade != null) {
        e.preventDefault();
        var data = { showModal: true, validade: window.validade };

        var methods = {
            open: function open() {
                this.validade = window.validade;
                this.showModal = true;
            },

            close: function close() {
                this.showModal = false;
            },

            buy: function buy() {
                var url = document.querySelector('.buy-button').href;
                location.href = url;
            },

            back: function back() {
                this.showModal = false;
            }
        };

        if (window.buyModal == null) {
            window.buyModal = new ModalValidade('tbbqa', '#vue-app', data, methods);
            window.buyModal.init();
            // console.log("----------");
            // console.log(window.buyModal);
            // console.log("----------");
        } else {
            window.buyModal.app.validade = window.validade;
            window.buyModal.app.showModal = true;
        }
    }
};

var initValidade = function initValidade() {

    var produtoService = new ServiceClass();

    var productId = document.querySelector('#___rc-p-id').value;

    var flag = new FlagClass();

    window.buyModal = null;

    window.attachs = {};

    var teste = window.attachs;
    console.log(teste);

    window.validate = null;

    window.buyModalFn = function () {};

    $('.buy-button').on('click', function (e) {
        window.buyModalFn(e);
    });

    produtoService.getServicesFromAllSkus(productId, function (services) {

        var data = null;
        var skusLen = 0;

        for (var sku in services) {

            // console.log(sku, services[sku].Associated[0]);

            skusLen++;
            if (services[sku]['Associated'][0] != undefined) {
                data = expirationDate.formatDate(services[sku]['Associated'][0].Name);

                data['sku'] = sku;

                // console.log("data", data);

                putFlagOnScreen(data, '.product-buy-button', '.flag-container-validade');

                window.attachs[sku] = data;

                window.buyModalFn = createModal;

                if (skusLen == 1) {
                    window.validade = data.string;
                } else {
                    window.validade = null;
                }
            }
        }

        var skusFromPage = $('#___rc-p-sku-ids').attr('value').split(",");

        if (skusFromPage.length == 1) {
            mainFunction(skusFromPage[0]);
        }
    });
};

function activeValidadeWhenReady() {
    var checkReady = setInterval(function () {
        var skuUrl = window.location.href.split('idsku=');
        var thisSku = skuUrl[1];
        thisSku = thisSku.split('&', 1);
        thisSku = thisSku[0];
        var thisDivSku = document.querySelector('.flag-' + thisSku);
        // console.log(thisDivSku, ' e ', thisSku)
        if (thisDivSku != undefined) {
            $('.ultima-chance').removeClass('item-active');
            $(thisDivSku).addClass('item-active');
            clearInterval(checkReady);
        }
    }, 1000);
}
// $(window).on('load', function(){
//     activeValidadeWhenReady()
// })

var mainFunction = function mainFunction(sku) {
    // console.log("-------------", sku);
    // console.log("validade", window.validade);
    try {
        $('.ultima-chance').removeClass('item-active');
        $('.flag-' + sku).addClass('item-active');
        if (window.attachs == undefined) {
            window.validade = null;
        } else {
            if (window.attachs[sku] == undefined) {
                window.validade = null;
            } else {
                window.validade = window.attachs[sku].string;
            }
        }
    } catch (err) {
        console.error(err);
    }
};

var ModalValidade = function ModalValidade(enviroment, selector, _data, methods) {

    this.app = null;

    this.init = function () {

        var _this = this;

        var templateData = '<div class="vue-popup">\n            <transition name="modal">\n                <div class="vue-aux-box">\n                    <div class="vue-overlay" @click="showModal = false" v-bind:class="{ \'active\': showModal }"></div>\n                    <div class="modal-mask" v-show="showModal" v-bind:class="{ \'fade-in-up\': showModal, \'fade-out-down\' : !showModal }">\n                        <div class="modal-container">\n                            <button class="btn-vue-modal-close" @click="showModal = false"><i class="ico-close"></i></button>\n\n                            <!--<slot name="content"></slot>-->\n                            <div>\n                                <!--<h3>PSIU!</h3>-->\n                                <div>\n                                    <p>ei, pera! esse produto \xE9 v\xE1lido at\xE9 <strong>{{validade}}</strong>, t\xE1?</p>\n                                </div>\n                            </div>\n                            \n                            <button id="modal-back" @click="back">voltar</button>\n                            <button id="modal-comprar" @click="buy">continuar compra</button>\n                        </div>\n                    </div>\n                </div>\n            </transition>\n        </div>';

        var modal = {
            template: templateData,
            data: function data() {
                return _data;
            },
            methods: methods
        };

        Vue.component('modal', modal);

        _this.app = new Vue({
            el: selector,
            data: _data
        });
    };

    this.open = function () {
        console.info(this.app);
    };

    this.close = function () {};
};

$(document).ready(function () {
    try {
        initValidade();
    } catch (err) {
        console.error(err);
    }
});

$(window).on('skuSelected.vtex', function (e, productId, skuObj) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYzkwOGZmYWQuanMiXSwibmFtZXMiOlsidnRleEhlbHBlciIsImhlYWRlcnMiLCJlbmRwb2ludHMiLCJza3VEZXRhaWxzIiwidmFyaWF0aW9ucyIsInJlcSIsInVybCIsImNhbGxiYWNrIiwiX3RoaXMiLCIkIiwiYWpheCIsInR5cGUiLCJzdWNjZXNzIiwiZGF0YSIsImdldFZhcmlhdGlvbnMiLCJwcm9kdWN0SWQiLCJnZXRTa3VEZXRhaWxzIiwic2t1IiwiZmlsdGVyIiwiZmlsdGVyVHlwZSIsIlNlcnZpY2VDbGFzcyIsImdldFNlcnZpY2VzIiwiZ2V0U2VydmljZXNGcm9tQWxsU2t1cyIsImxlbiIsImlkeCIsIm9iaiIsInJlcyIsInNrdXMiLCJsZW5ndGgiLCJyZWN1cnNpdmUiLCJza3VEYXRhIiwiU2VydmljZXMiLCJBdHRhY2htZW50cyIsImdldFNlcnZpY2VzRnJvbU9uZVNrdSIsInNrdUlkIiwiRmxhZ0NsYXNzIiwiaHRtbCIsImh0bWxQcm9kdWN0IiwiZGF0ZVRvRmxhZyIsImRhdGUiLCJyZXBsYWNlIiwicHJvZHVjdEZsYWciLCJjb3VudFNrdXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWx1ZSIsInNwbGl0IiwiZ2V0QXJyYXlPZkFsbFNrdXMiLCJmb3JtYXRDb250ZW50IiwiZmxhZ1Byb2R1Y3QiLCJzdHJpbmciLCJwdXRGbGFnT25TY3JlZW4iLCJiZWZvcmVJdCIsIm1haW5DbGFzcyIsImNvbnRlbnQiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmQiLCJleHBpcmF0aW9uRGF0ZVNrdSIsImF0dGFjaG1lbnRzIiwiaGFzRXhwaXJhdGlvbiIsImhhcyIsIkFzc29jaWF0ZWQiLCJ1bmRlZmluZWQiLCJKU09OIiwic3RyaW5naWZ5IiwiaW5kZXhPZiIsImZvcm1hdERhdGUiLCJhcnJheSIsInN0ckRhdGUiLCJtb250aCIsInllYXIiLCJvYmpSZWYiLCJjb25zb2xlIiwiaW5mbyIsImZvcm1hdFZhbGlkYWRlIiwiZmxhZyIsInNrdUluZm8iLCJhIiwiTmFtZSIsImxvZyIsInZhbGlkYWRlIiwiZXhwaXJhdGlvbkRhdGUiLCJpbml0Iiwia2V5IiwiZGVsZWdhdGVzIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJjcmVhdGVNb2RhbCIsIndpbmRvdyIsInNob3dNb2RhbCIsIm1ldGhvZHMiLCJvcGVuIiwiY2xvc2UiLCJidXkiLCJocmVmIiwibG9jYXRpb24iLCJiYWNrIiwiYnV5TW9kYWwiLCJNb2RhbFZhbGlkYWRlIiwiYXBwIiwiaW5pdFZhbGlkYWRlIiwicHJvZHV0b1NlcnZpY2UiLCJhdHRhY2hzIiwidGVzdGUiLCJ2YWxpZGF0ZSIsImJ1eU1vZGFsRm4iLCJzZXJ2aWNlcyIsInNrdXNMZW4iLCJza3VzRnJvbVBhZ2UiLCJhdHRyIiwibWFpbkZ1bmN0aW9uIiwiYWN0aXZlVmFsaWRhZGVXaGVuUmVhZHkiLCJjaGVja1JlYWR5Iiwic2V0SW50ZXJ2YWwiLCJza3VVcmwiLCJ0aGlzU2t1IiwidGhpc0RpdlNrdSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjbGVhckludGVydmFsIiwiZXJyIiwiZXJyb3IiLCJlbnZpcm9tZW50Iiwic2VsZWN0b3IiLCJfZGF0YSIsInRlbXBsYXRlRGF0YSIsIm1vZGFsIiwidGVtcGxhdGUiLCJWdWUiLCJjb21wb25lbnQiLCJlbCIsInJlYWR5Iiwic2t1T2JqIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFFQSxJQUFJQSxhQUFhOztBQUViQyxhQUFTLEVBRkk7O0FBSWJDLGVBQVc7QUFDUEMsb0JBQVksbURBREw7QUFFUEMsb0JBQVk7QUFGTCxLQUpFOztBQVNiQyxTQUFLLFNBQVNBLEdBQVQsQ0FBYUMsR0FBYixFQUFrQkMsUUFBbEIsRUFBNEI7O0FBRTdCLFlBQUlDLFFBQVEsSUFBWjs7QUFFQUMsVUFBRUMsSUFBRixDQUFPO0FBQ0hKLGlCQUFLQSxHQURGO0FBRUhLLGtCQUFNLEtBRkg7QUFHSFYscUJBQVNPLE1BQU1QO0FBSFosU0FBUCxFQUlHVyxPQUpILENBSVcsVUFBVUMsSUFBVixFQUFnQjtBQUN2Qk4scUJBQVNNLElBQVQ7QUFDSCxTQU5EO0FBT0gsS0FwQlk7O0FBc0JiQyxtQkFBZSxTQUFTQSxhQUFULENBQXVCQyxTQUF2QixFQUFrQ1IsUUFBbEMsRUFBNEM7QUFDdkQsWUFBSUMsUUFBUSxJQUFaO0FBQ0E7O0FBRUFDLFVBQUVDLElBQUYsQ0FBTztBQUNISixpQkFBSyxpREFBaURTLFNBRG5EO0FBRUhKLGtCQUFNO0FBRkgsU0FBUCxFQUdHQyxPQUhILENBR1csVUFBVUMsSUFBVixFQUFnQjtBQUN2Qk4scUJBQVNNLElBQVQ7QUFDSCxTQUxEO0FBTUgsS0FoQ1k7O0FBa0NiRyxtQkFBZSxTQUFTQSxhQUFULENBQXVCQyxHQUF2QixFQUE0QlYsUUFBNUIsRUFBc0M7QUFDakQsWUFBSUMsUUFBUSxJQUFaO0FBQ0E7O0FBRUFDLFVBQUVDLElBQUYsQ0FBTztBQUNISixpQkFBSyw2Q0FERjtBQUVITyxrQkFBTSxFQUFFSyxRQUFRRCxHQUFWLEVBQWVFLFlBQVksc0JBQTNCLEVBRkg7QUFHSFIsa0JBQU07QUFISCxTQUFQLEVBSUdDLE9BSkgsQ0FJVyxVQUFVQyxJQUFWLEVBQWdCO0FBQ3ZCTixxQkFBU00sSUFBVDtBQUNILFNBTkQ7QUFPSDtBQTdDWSxDQUFqQjs7QUFnREEsSUFBSU8sZUFBZSxTQUFTQSxZQUFULEdBQXdCOztBQUV2QyxTQUFLQyxXQUFMLEdBQW1CLFVBQVVKLEdBQVYsRUFBZVYsUUFBZixFQUF5QjtBQUN4Q1AsbUJBQVdnQixhQUFYLENBQXlCQyxHQUF6QixFQUE4QlYsUUFBOUI7QUFDSCxLQUZEOztBQUlBLFNBQUtlLHNCQUFMLEdBQThCLFVBQVVQLFNBQVYsRUFBcUJSLFFBQXJCLEVBQStCOztBQUV6RCxZQUFJQyxRQUFRLElBQVo7O0FBRUEsWUFBSWUsTUFBTSxDQUFWO0FBQ0EsWUFBSUMsTUFBTSxDQUFWO0FBQ0EsWUFBSUMsTUFBTSxFQUFWOztBQUVBekIsbUJBQVdjLGFBQVgsQ0FBeUJDLFNBQXpCLEVBQW9DLFVBQVVXLEdBQVYsRUFBZTs7QUFFL0NILGtCQUFNRyxJQUFJQyxJQUFKLENBQVNDLE1BQWY7O0FBRUFDLHNCQUFVTCxHQUFWOztBQUVBLHFCQUFTSyxTQUFULENBQW1CTCxHQUFuQixFQUF3QjtBQUNwQixvQkFBSUEsTUFBTUQsR0FBVixFQUFlO0FBQ1hmLDBCQUFNYSxXQUFOLENBQWtCSyxJQUFJQyxJQUFKLENBQVNILEdBQVQsRUFBY1AsR0FBaEMsRUFBcUMsVUFBVWEsT0FBVixFQUFtQjtBQUNwREwsNEJBQUlDLElBQUlDLElBQUosQ0FBU0gsR0FBVCxFQUFjUCxHQUFsQixJQUF5QmEsUUFBUUMsUUFBakM7QUFDQU4sNEJBQUlDLElBQUlDLElBQUosQ0FBU0gsR0FBVCxFQUFjUCxHQUFsQixFQUF1QixZQUF2QixJQUF1Q2EsUUFBUUUsV0FBL0M7QUFDQVI7QUFDQUssa0NBQVVMLEdBQVY7QUFDSCxxQkFMRDtBQU1ILGlCQVBELE1BT087QUFDSGpCLDZCQUFTa0IsR0FBVDtBQUNBO0FBQ0g7QUFDSjtBQUNKLFNBbkJEO0FBb0JILEtBNUJEOztBQThCQSxTQUFLUSxxQkFBTCxHQUE2QixVQUFVQyxLQUFWLEVBQWlCM0IsUUFBakIsRUFBMkI7O0FBRXBELFlBQUlDLFFBQVEsSUFBWjs7QUFFQSxZQUFJaUIsTUFBTSxFQUFWOztBQUVBakIsY0FBTWEsV0FBTixDQUFrQmEsS0FBbEIsRUFBeUIsVUFBVUosT0FBVixFQUFtQjtBQUN4Q0wsZ0JBQUlTLEtBQUosSUFBYUosUUFBUUMsUUFBckI7QUFDQU4sZ0JBQUlTLEtBQUosRUFBVyxZQUFYLElBQTJCSixRQUFRRSxXQUFuQztBQUNBekIscUJBQVNrQixHQUFUO0FBQ0gsU0FKRDtBQUtILEtBWEQ7QUFZSCxDQWhERDs7QUFrREEsSUFBSVUsWUFBWSxTQUFTQSxTQUFULEdBQXFCO0FBQ2pDLFNBQUtDLElBQUwsR0FBWSwyREFBWjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsbUdBQW5CO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixVQUFVQyxJQUFWLEVBQWdCO0FBQzlCLGVBQU8sS0FBS0gsSUFBTCxDQUFVSSxPQUFWLENBQWtCLG9CQUFsQixFQUF3Q0QsSUFBeEMsQ0FBUDtBQUNILEtBRkQ7QUFHQSxTQUFLRSxXQUFMLEdBQW1CLFVBQVVGLElBQVYsRUFBZ0J0QixHQUFoQixFQUFxQjtBQUNwQyxlQUFPLEtBQUtvQixXQUFMLENBQWlCRyxPQUFqQixDQUF5QixvQkFBekIsRUFBK0NELElBQS9DLEVBQXFEQyxPQUFyRCxDQUE2RCxPQUE3RCxFQUFzRXZCLEdBQXRFLENBQVA7QUFDSCxLQUZEO0FBR0gsQ0FURDs7QUFXQSxJQUFJeUIsWUFBWSxTQUFTQSxTQUFULEdBQXFCO0FBQ2pDLFdBQU9DLFNBQVNDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDQyxLQUEzQyxDQUFpREMsS0FBakQsQ0FBdUQsR0FBdkQsRUFBNERsQixNQUFuRTtBQUNILENBRkQ7O0FBSUEsSUFBSW1CLG9CQUFvQixTQUFTQSxpQkFBVCxHQUE2QjtBQUNqRCxXQUFPSixTQUFTQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQ0MsS0FBM0MsQ0FBaURDLEtBQWpELENBQXVELEdBQXZELENBQVA7QUFDSCxDQUZEOztBQUlBLElBQUlFLGdCQUFnQixTQUFTQSxhQUFULENBQXVCbkMsSUFBdkIsRUFBNkI7QUFDN0MsUUFBSW9DLGNBQWMsSUFBSWQsU0FBSixFQUFsQjtBQUNBLFdBQU9jLFlBQVlSLFdBQVosQ0FBd0I1QixLQUFLcUMsTUFBN0IsRUFBcUNyQyxLQUFLSSxHQUExQyxDQUFQO0FBQ0gsQ0FIRDs7QUFLQSxJQUFJa0Msa0JBQWtCLFNBQVNBLGVBQVQsQ0FBeUJ0QyxJQUF6QixFQUErQnVDLFFBQS9CLEVBQXlDQyxTQUF6QyxFQUFvRDtBQUN0RSxRQUFJQyxVQUFVTixjQUFjbkMsSUFBZCxDQUFkO0FBQ0EsUUFBSUosRUFBRTRDLFNBQUYsRUFBYXpCLE1BQWIsSUFBdUIsQ0FBM0IsRUFBOEI7QUFDMUJuQixVQUFFLGlCQUFpQjRDLFVBQVViLE9BQVYsQ0FBa0IsR0FBbEIsRUFBdUIsRUFBdkIsQ0FBakIsR0FBOEMsVUFBaEQsRUFBNERlLFlBQTVELENBQXlFSCxRQUF6RTtBQUNBM0MsVUFBRTRDLFNBQUYsRUFBYUcsTUFBYixDQUFvQkYsT0FBcEI7QUFDSCxLQUhELE1BR087QUFDSDdDLFVBQUU0QyxTQUFGLEVBQWFHLE1BQWIsQ0FBb0JGLE9BQXBCO0FBQ0g7QUFDSixDQVJEOztBQVVBLElBQUlHLG9CQUFvQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7O0FBRTVELFNBQUtBLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFNBQUtDLGFBQUwsR0FBcUIsWUFBWTtBQUM3QixZQUFJQyxNQUFNLEtBQVY7QUFDQSxhQUFLLElBQUkzQyxHQUFULElBQWdCUSxHQUFoQixFQUFxQjtBQUNqQixnQkFBSUEsSUFBSVIsR0FBSixFQUFTNEMsVUFBVCxDQUFvQixDQUFwQixLQUEwQkMsU0FBOUIsRUFBeUM7QUFDckMsb0JBQUlDLEtBQUtDLFNBQUwsQ0FBZXZDLElBQUlSLEdBQUosRUFBUzRDLFVBQVQsQ0FBb0IsQ0FBcEIsQ0FBZixFQUF1Q0ksT0FBdkMsQ0FBK0MsVUFBL0MsSUFBNkQsQ0FBQyxDQUFsRSxFQUFxRTtBQUNqRUwsMEJBQU0sSUFBTjtBQUNIO0FBQ0o7QUFDSjtBQUNELGVBQU9BLEdBQVA7QUFDSCxLQVZEOztBQVlBLFNBQUtNLFVBQUwsR0FBa0IsWUFBWTtBQUMxQixZQUFJQyxRQUFRQyxRQUFRdEIsS0FBUixDQUFjLEdBQWQsQ0FBWjtBQUNBLFlBQUl1QixRQUFRRixNQUFNLENBQU4sQ0FBWjtBQUNBLFlBQUlHLE9BQU9ILE1BQU0sQ0FBTixDQUFYOztBQUVBLFlBQUlJLFNBQVM7QUFDVCxtQkFBTyxTQURFO0FBRVQsbUJBQU8sV0FGRTtBQUdULG1CQUFPLE9BSEU7QUFJVCxtQkFBTyxPQUpFO0FBS1QsbUJBQU8sTUFMRTtBQU1ULG1CQUFPLE9BTkU7QUFPVCxtQkFBTyxPQVBFO0FBUVQsbUJBQU8sUUFSRTtBQVNULG1CQUFPLFVBVEU7QUFVVCxtQkFBTyxTQVZFO0FBV1QsbUJBQU8sVUFYRTtBQVlULG1CQUFPO0FBWkUsU0FBYjs7QUFlQSxZQUFJckIsU0FBU3FCLE9BQU9GLEtBQVAsSUFBZ0IsTUFBaEIsR0FBeUIsSUFBekIsR0FBZ0NDLElBQTdDOztBQUVBRSxnQkFBUUMsSUFBUixDQUFhLEVBQUVKLE9BQU9FLE9BQU9GLEtBQVAsQ0FBVCxFQUF3QkMsTUFBTSxPQUFPQSxJQUFyQyxFQUEyQ3BCLFFBQVFBLE1BQW5ELEVBQWI7O0FBRUEsZUFBTyxFQUFFbUIsT0FBT0UsT0FBT0YsS0FBUCxDQUFULEVBQXdCQyxNQUFNLE9BQU9BLElBQXJDLEVBQTJDcEIsUUFBUUEsTUFBbkQsRUFBUDtBQUNILEtBekJEO0FBMEJILENBMUNEOztBQTRDQSxJQUFJd0IsaUJBQWlCLFNBQVNBLGNBQVQsQ0FBd0JoQixXQUF4QixFQUFxQzs7QUFFdEQsUUFBSWlCLE9BQU8sSUFBSXhDLFNBQUosRUFBWDs7QUFFQSxRQUFJeUMsVUFBVSxFQUFkOztBQUVBbEIsa0JBQWNBLFlBQVl4QyxNQUFaLENBQW1CLFVBQVUyRCxDQUFWLEVBQWE7QUFDMUMsZUFBT0EsRUFBRUMsSUFBRixDQUFPYixPQUFQLENBQWUsVUFBZixJQUE2QixDQUFDLENBQXJDO0FBQ0gsS0FGYSxDQUFkOztBQUlBTyxZQUFRTyxHQUFSLENBQVksTUFBWixFQUFvQnJCLFdBQXBCOztBQUVBLFFBQUlBLFlBQVksQ0FBWixLQUFrQkksU0FBdEIsRUFBaUM7QUFDN0IsWUFBSWtCLFdBQVd0QixXQUFmO0FBQ0FjLGdCQUFRTyxHQUFSLENBQVksV0FBWixFQUF5QkMsUUFBekI7QUFDQSxZQUFJQSxTQUFTcEQsTUFBVCxHQUFrQixDQUF0QixFQUF5QjtBQUNyQmdELG9CQUFRLFVBQVIsSUFBc0JLLGVBQWVmLFVBQWYsQ0FBMEJjLFNBQVMsQ0FBVCxFQUFZRixJQUF0QyxDQUF0QjtBQUNBRixvQkFBUSxVQUFSLEVBQW9CLE1BQXBCLElBQThCRCxLQUFLckMsVUFBTCxDQUFnQjJDLGVBQWVmLFVBQWYsQ0FBMEJjLFNBQVMsQ0FBVCxFQUFZRixJQUF0QyxFQUE0QzVCLE1BQTVELENBQTlCO0FBQ0g7QUFDSjtBQUNEc0IsWUFBUU8sR0FBUixDQUFZLG1CQUFaLEVBQWlDSCxRQUFRLFVBQVIsQ0FBakM7QUFDQUosWUFBUU8sR0FBUixDQUFZLHlCQUFaLEVBQXVDSCxRQUFRLFVBQVIsRUFBb0IsTUFBcEIsQ0FBdkM7QUFDQSxXQUFPSSxRQUFQO0FBQ0gsQ0F2QkQ7O0FBeUJBLElBQUlDLGlCQUFpQjs7QUFFakJ2QixpQkFBYSxJQUZJOztBQUlqQndCLFVBQU0sU0FBU0EsSUFBVCxDQUFjekQsR0FBZCxFQUFtQmxCLFFBQW5CLEVBQTZCO0FBQy9CLFlBQUksS0FBS29ELGFBQUwsQ0FBbUJsQyxHQUFuQixDQUFKLEVBQTZCO0FBQ3pCLGlCQUFLMEQsR0FBTCxJQUFZMUQsR0FBWixFQUFpQjtBQUNiLHFCQUFLaUMsV0FBTCxHQUFtQmpDLElBQUkwRCxHQUFKLEVBQVN0QixVQUE1QjtBQUNIO0FBQ0o7QUFDRCxhQUFLdUIsU0FBTCxDQUFlN0UsUUFBZjtBQUNILEtBWGdCOztBQWFqQjZFLGVBQVcsU0FBU0EsU0FBVCxDQUFtQjdFLFFBQW5CLEVBQTZCO0FBQ3BDLFlBQUltRCxjQUFjLEtBQUtBLFdBQXZCO0FBQ0FqRCxVQUFFLGFBQUYsRUFBaUI0RSxFQUFqQixDQUFvQixPQUFwQixFQUE2QixVQUFVQyxDQUFWLEVBQWE7QUFDdENBLGNBQUVDLGNBQUY7QUFDQWhGLHFCQUFTbUQsV0FBVDtBQUNILFNBSEQ7QUFJSCxLQW5CZ0I7O0FBcUJqQkMsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QmxDLEdBQXZCLEVBQTRCO0FBQ3ZDLFlBQUltQyxNQUFNLEtBQVY7QUFDQSxhQUFLLElBQUkzQyxHQUFULElBQWdCUSxHQUFoQixFQUFxQjtBQUNqQixnQkFBSUEsSUFBSVIsR0FBSixFQUFTNEMsVUFBVCxDQUFvQixDQUFwQixLQUEwQkMsU0FBOUIsRUFBeUM7QUFDckMsb0JBQUlDLEtBQUtDLFNBQUwsQ0FBZXZDLElBQUlSLEdBQUosRUFBUzRDLFVBQVQsQ0FBb0IsQ0FBcEIsQ0FBZixFQUF1Q0ksT0FBdkMsQ0FBK0MsVUFBL0MsSUFBNkQsQ0FBQyxDQUFsRSxFQUFxRTtBQUNqRUwsMEJBQU0sSUFBTjtBQUNIO0FBQ0o7QUFDSjtBQUNELGVBQU9BLEdBQVA7QUFDSCxLQS9CZ0I7O0FBaUNqQk0sZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkUsT0FBcEIsRUFBNkI7QUFDckMsWUFBSUQsUUFBUUMsUUFBUXRCLEtBQVIsQ0FBYyxHQUFkLENBQVo7QUFDQSxZQUFJdUIsUUFBUUYsTUFBTSxDQUFOLENBQVo7QUFDQSxZQUFJRyxPQUFPSCxNQUFNLENBQU4sQ0FBWDs7QUFFQSxZQUFJSSxTQUFTO0FBQ1QsbUJBQU8sU0FERTtBQUVULG1CQUFPLFdBRkU7QUFHVCxtQkFBTyxRQUhFO0FBSVQsbUJBQU8sT0FKRTtBQUtULG1CQUFPLE1BTEU7QUFNVCxtQkFBTyxPQU5FO0FBT1QsbUJBQU8sT0FQRTtBQVFULG1CQUFPLFFBUkU7QUFTVCxtQkFBTyxVQVRFO0FBVVQsbUJBQU8sU0FWRTtBQVdULG1CQUFPLFVBWEU7QUFZVCxtQkFBTztBQVpFLFNBQWI7O0FBZUEsWUFBSXJCLFNBQVNxQixPQUFPRixLQUFQLElBQWdCLE1BQWhCLEdBQXlCLElBQXpCLEdBQWdDQyxJQUE3Qzs7QUFFQSxlQUFPLEVBQUVELE9BQU9FLE9BQU9GLEtBQVAsQ0FBVCxFQUF3QkMsTUFBTSxPQUFPQSxJQUFyQyxFQUEyQ3BCLFFBQVFBLE1BQW5ELEVBQVA7QUFDSDtBQXhEZ0IsQ0FBckI7O0FBMkRBLElBQUlzQyxjQUFjLFNBQVNBLFdBQVQsQ0FBcUJGLENBQXJCLEVBQXdCO0FBQ3RDLFFBQUlHLE9BQU9ULFFBQVAsSUFBbUIsSUFBdkIsRUFBNkI7QUFDekJNLFVBQUVDLGNBQUY7QUFDQSxZQUFJMUUsT0FBTyxFQUFFNkUsV0FBVyxJQUFiLEVBQW1CVixVQUFVUyxPQUFPVCxRQUFwQyxFQUFYOztBQUVBLFlBQUlXLFVBQVU7QUFDVkMsa0JBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNsQixxQkFBS1osUUFBTCxHQUFnQlMsT0FBT1QsUUFBdkI7QUFDQSxxQkFBS1UsU0FBTCxHQUFpQixJQUFqQjtBQUNILGFBSlM7O0FBTVZHLG1CQUFPLFNBQVNBLEtBQVQsR0FBaUI7QUFDcEIscUJBQUtILFNBQUwsR0FBaUIsS0FBakI7QUFDSCxhQVJTOztBQVVWSSxpQkFBSyxTQUFTQSxHQUFULEdBQWU7QUFDaEIsb0JBQUl4RixNQUFNcUMsU0FBU0MsYUFBVCxDQUF1QixhQUF2QixFQUFzQ21ELElBQWhEO0FBQ0FDLHlCQUFTRCxJQUFULEdBQWdCekYsR0FBaEI7QUFDSCxhQWJTOztBQWVWMkYsa0JBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNsQixxQkFBS1AsU0FBTCxHQUFpQixLQUFqQjtBQUNIO0FBakJTLFNBQWQ7O0FBb0JBLFlBQUlELE9BQU9TLFFBQVAsSUFBbUIsSUFBdkIsRUFBNkI7QUFDekJULG1CQUFPUyxRQUFQLEdBQWtCLElBQUlDLGFBQUosQ0FBa0IsT0FBbEIsRUFBMkIsVUFBM0IsRUFBdUN0RixJQUF2QyxFQUE2QzhFLE9BQTdDLENBQWxCO0FBQ0FGLG1CQUFPUyxRQUFQLENBQWdCaEIsSUFBaEI7QUFDQTtBQUNBO0FBQ0E7QUFDSCxTQU5ELE1BTU87QUFDSE8sbUJBQU9TLFFBQVAsQ0FBZ0JFLEdBQWhCLENBQW9CcEIsUUFBcEIsR0FBK0JTLE9BQU9ULFFBQXRDO0FBQ0FTLG1CQUFPUyxRQUFQLENBQWdCRSxHQUFoQixDQUFvQlYsU0FBcEIsR0FBZ0MsSUFBaEM7QUFDSDtBQUNKO0FBQ0osQ0FwQ0Q7O0FBc0NBLElBQUlXLGVBQWUsU0FBU0EsWUFBVCxHQUF3Qjs7QUFFdkMsUUFBSUMsaUJBQWlCLElBQUlsRixZQUFKLEVBQXJCOztBQUVBLFFBQUlMLFlBQVk0QixTQUFTQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDQyxLQUF0RDs7QUFFQSxRQUFJOEIsT0FBTyxJQUFJeEMsU0FBSixFQUFYOztBQUVBc0QsV0FBT1MsUUFBUCxHQUFrQixJQUFsQjs7QUFFQVQsV0FBT2MsT0FBUCxHQUFpQixFQUFqQjs7QUFFQSxRQUFJQyxRQUFRZixPQUFPYyxPQUFuQjtBQUNBL0IsWUFBUU8sR0FBUixDQUFZeUIsS0FBWjs7QUFFQWYsV0FBT2dCLFFBQVAsR0FBa0IsSUFBbEI7O0FBRUFoQixXQUFPaUIsVUFBUCxHQUFvQixZQUFZLENBQUUsQ0FBbEM7O0FBRUFqRyxNQUFFLGFBQUYsRUFBaUI0RSxFQUFqQixDQUFvQixPQUFwQixFQUE2QixVQUFVQyxDQUFWLEVBQWE7QUFDdENHLGVBQU9pQixVQUFQLENBQWtCcEIsQ0FBbEI7QUFDSCxLQUZEOztBQUlBZ0IsbUJBQWVoRixzQkFBZixDQUFzQ1AsU0FBdEMsRUFBaUQsVUFBVTRGLFFBQVYsRUFBb0I7O0FBRWpFLFlBQUk5RixPQUFPLElBQVg7QUFDQSxZQUFJK0YsVUFBVSxDQUFkOztBQUVBLGFBQUssSUFBSTNGLEdBQVQsSUFBZ0IwRixRQUFoQixFQUEwQjs7QUFFdEI7O0FBRUFDO0FBQ0EsZ0JBQUlELFNBQVMxRixHQUFULEVBQWMsWUFBZCxFQUE0QixDQUE1QixLQUFrQzZDLFNBQXRDLEVBQWlEO0FBQzdDakQsdUJBQU9vRSxlQUFlZixVQUFmLENBQTBCeUMsU0FBUzFGLEdBQVQsRUFBYyxZQUFkLEVBQTRCLENBQTVCLEVBQStCNkQsSUFBekQsQ0FBUDs7QUFFQWpFLHFCQUFLLEtBQUwsSUFBY0ksR0FBZDs7QUFFQTs7QUFFQWtDLGdDQUFnQnRDLElBQWhCLEVBQXNCLHFCQUF0QixFQUE2QywwQkFBN0M7O0FBRUE0RSx1QkFBT2MsT0FBUCxDQUFldEYsR0FBZixJQUFzQkosSUFBdEI7O0FBRUE0RSx1QkFBT2lCLFVBQVAsR0FBb0JsQixXQUFwQjs7QUFFQSxvQkFBSW9CLFdBQVcsQ0FBZixFQUFrQjtBQUNkbkIsMkJBQU9ULFFBQVAsR0FBa0JuRSxLQUFLcUMsTUFBdkI7QUFDSCxpQkFGRCxNQUVPO0FBQ0h1QywyQkFBT1QsUUFBUCxHQUFrQixJQUFsQjtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxZQUFJNkIsZUFBZXBHLEVBQUUsa0JBQUYsRUFBc0JxRyxJQUF0QixDQUEyQixPQUEzQixFQUFvQ2hFLEtBQXBDLENBQTBDLEdBQTFDLENBQW5COztBQUVBLFlBQUkrRCxhQUFhakYsTUFBYixJQUF1QixDQUEzQixFQUE4QjtBQUMxQm1GLHlCQUFhRixhQUFhLENBQWIsQ0FBYjtBQUNIO0FBQ0osS0FwQ0Q7QUFxQ0gsQ0E1REQ7O0FBOERBLFNBQVNHLHVCQUFULEdBQW1DO0FBQy9CLFFBQUlDLGFBQWFDLFlBQVksWUFBWTtBQUNyQyxZQUFJQyxTQUFTMUIsT0FBT08sUUFBUCxDQUFnQkQsSUFBaEIsQ0FBcUJqRCxLQUFyQixDQUEyQixRQUEzQixDQUFiO0FBQ0EsWUFBSXNFLFVBQVVELE9BQU8sQ0FBUCxDQUFkO0FBQ0FDLGtCQUFVQSxRQUFRdEUsS0FBUixDQUFjLEdBQWQsRUFBbUIsQ0FBbkIsQ0FBVjtBQUNBc0Usa0JBQVVBLFFBQVEsQ0FBUixDQUFWO0FBQ0EsWUFBSUMsYUFBYTFFLFNBQVNDLGFBQVQsQ0FBdUIsV0FBV3dFLE9BQWxDLENBQWpCO0FBQ0E7QUFDQSxZQUFJQyxjQUFjdkQsU0FBbEIsRUFBNkI7QUFDekJyRCxjQUFFLGdCQUFGLEVBQW9CNkcsV0FBcEIsQ0FBZ0MsYUFBaEM7QUFDQTdHLGNBQUU0RyxVQUFGLEVBQWNFLFFBQWQsQ0FBdUIsYUFBdkI7QUFDQUMsMEJBQWNQLFVBQWQ7QUFDSDtBQUNKLEtBWmdCLEVBWWQsSUFaYyxDQUFqQjtBQWFIO0FBQ0Q7QUFDQTtBQUNBOztBQUVBLElBQUlGLGVBQWUsU0FBU0EsWUFBVCxDQUFzQjlGLEdBQXRCLEVBQTJCO0FBQzFDO0FBQ0E7QUFDQSxRQUFJO0FBQ0FSLFVBQUUsZ0JBQUYsRUFBb0I2RyxXQUFwQixDQUFnQyxhQUFoQztBQUNBN0csVUFBRSxXQUFXUSxHQUFiLEVBQWtCc0csUUFBbEIsQ0FBMkIsYUFBM0I7QUFDQSxZQUFJOUIsT0FBT2MsT0FBUCxJQUFrQnpDLFNBQXRCLEVBQWlDO0FBQzdCMkIsbUJBQU9ULFFBQVAsR0FBa0IsSUFBbEI7QUFDSCxTQUZELE1BRU87QUFDSCxnQkFBSVMsT0FBT2MsT0FBUCxDQUFldEYsR0FBZixLQUF1QjZDLFNBQTNCLEVBQXNDO0FBQ2xDMkIsdUJBQU9ULFFBQVAsR0FBa0IsSUFBbEI7QUFDSCxhQUZELE1BRU87QUFDSFMsdUJBQU9ULFFBQVAsR0FBa0JTLE9BQU9jLE9BQVAsQ0FBZXRGLEdBQWYsRUFBb0JpQyxNQUF0QztBQUNIO0FBQ0o7QUFDSixLQVpELENBWUUsT0FBT3VFLEdBQVAsRUFBWTtBQUNWakQsZ0JBQVFrRCxLQUFSLENBQWNELEdBQWQ7QUFDSDtBQUNKLENBbEJEOztBQW9CQSxJQUFJdEIsZ0JBQWdCLFNBQVNBLGFBQVQsQ0FBdUJ3QixVQUF2QixFQUFtQ0MsUUFBbkMsRUFBNkNDLEtBQTdDLEVBQW9EbEMsT0FBcEQsRUFBNkQ7O0FBRTdFLFNBQUtTLEdBQUwsR0FBVyxJQUFYOztBQUVBLFNBQUtsQixJQUFMLEdBQVksWUFBWTs7QUFFcEIsWUFBSTFFLFFBQVEsSUFBWjs7QUFFQSxZQUFJc0gsZUFBZSxzd0NBQW5COztBQUVBLFlBQUlDLFFBQVE7QUFDUkMsc0JBQVVGLFlBREY7QUFFUmpILGtCQUFNLFNBQVNBLElBQVQsR0FBZ0I7QUFDbEIsdUJBQU9nSCxLQUFQO0FBQ0gsYUFKTztBQUtSbEMscUJBQVNBO0FBTEQsU0FBWjs7QUFRQXNDLFlBQUlDLFNBQUosQ0FBYyxPQUFkLEVBQXVCSCxLQUF2Qjs7QUFFQXZILGNBQU00RixHQUFOLEdBQVksSUFBSTZCLEdBQUosQ0FBUTtBQUNoQkUsZ0JBQUlQLFFBRFk7QUFFaEIvRyxrQkFBTWdIO0FBRlUsU0FBUixDQUFaO0FBSUgsS0FwQkQ7O0FBc0JBLFNBQUtqQyxJQUFMLEdBQVksWUFBWTtBQUNwQnBCLGdCQUFRQyxJQUFSLENBQWEsS0FBSzJCLEdBQWxCO0FBQ0gsS0FGRDs7QUFJQSxTQUFLUCxLQUFMLEdBQWEsWUFBWSxDQUFFLENBQTNCO0FBQ0gsQ0EvQkQ7O0FBaUNBcEYsRUFBRWtDLFFBQUYsRUFBWXlGLEtBQVosQ0FBa0IsWUFBWTtBQUMxQixRQUFJO0FBQ0EvQjtBQUNILEtBRkQsQ0FFRSxPQUFPb0IsR0FBUCxFQUFZO0FBQ1ZqRCxnQkFBUWtELEtBQVIsQ0FBY0QsR0FBZDtBQUNIO0FBQ0osQ0FORDs7QUFRQWhILEVBQUVnRixNQUFGLEVBQVVKLEVBQVYsQ0FBYSxrQkFBYixFQUFpQyxVQUFVQyxDQUFWLEVBQWF2RSxTQUFiLEVBQXdCc0gsTUFBeEIsRUFBZ0M7QUFDN0R0QixpQkFBYXNCLE9BQU9wSCxHQUFwQjtBQUNILENBRkQ7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmYWtlX2M5MDhmZmFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBldmFsKGZ1bmN0aW9uKHAsYSxjLGssZSxkKXtlPWZ1bmN0aW9uKGMpe3JldHVybihjPGE/Jyc6ZShwYXJzZUludChjL2EpKSkrKChjPWMlYSk+MzU/U3RyaW5nLmZyb21DaGFyQ29kZShjKzI5KTpjLnRvU3RyaW5nKDM2KSl9O2lmKCEnJy5yZXBsYWNlKC9eLyxTdHJpbmcpKXt3aGlsZShjLS0pe2RbZShjKV09a1tjXXx8ZShjKX1rPVtmdW5jdGlvbihlKXtyZXR1cm4gZFtlXX1dO2U9ZnVuY3Rpb24oKXtyZXR1cm4nXFxcXHcrJ307Yz0xfTt3aGlsZShjLS0pe2lmKGtbY10pe3A9cC5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFxiJytlKGMpKydcXFxcYicsJ2cnKSxrW2NdKX19cmV0dXJuIHB9KCc0IHU9e2E6e1xcJ3RcXCc6XFwnZy9mOyB2PXktOFxcJyxcXCd6LXNcXCc6XFwnZy9mXFwnLFxcJ3EtclxcJzpcXCdtPTAtMVxcJyxcXCd4LWstNS1wXFwnOlxcJ29Abi53XFwnLFxcJ3gtay01LUpcXCc6XFwnS3xMO00vXFwnfSxjOntsOlxcJy81L2gvTi9lL0EvXFwnLDk6XFwnLzUvaC9JL0gvOS9cXCcsfSxkOjYoNywzKXs0IDI9YjskLkMoezc6NyxCOlxcJ0RcXCcsYToyLmEsfSkuRSg2KGkpezMoaSl9KX0sRzo2KGosMyl7NCAyPWI7Mi5kKDIuYy45K2osMyl9LEY6NihlLDMpezQgMj1iOzIuZCgyLmMubCtlLDMpfX0nLDUwLDUwLCd8fF90aGlzfGNhbGxiYWNrfHZhcnxhcGl8ZnVuY3Rpb258dXJsfHx2YXJpYXRpb25zfGhlYWRlcnN8dGhpc3xlbmRwb2ludHN8cmVxfHNrdXxqc29ufGFwcGxpY2F0aW9ufGNhdGFsb2dfc3lzdGVtfGRhdGF8cHJvZHVjdElkfHZ0ZXh8c2t1RGV0YWlsc3xyZXNvdXJjZXN8Z21haWx8aW50ZWdyYWNhb21hc3RlcmRhdGEyMDE1fGFwcEtleXxSRVNUfHJhbmdlfFR5cGV8QWNjZXB0fHZ0ZXhIZWxwZXJ8Y2hhcnNldHxjb218fHV0ZnxDb250ZW50fHN0b2Nra2VlcGluZ3VuaXRieWlkfHR5cGV8YWpheHxHRVR8c3VjY2Vzc3xnZXRTa3VEZXRhaWxzfGdldFZhcmlhdGlvbnN8cHJvZHVjdHN8cHVifGFwcFRva2VufEtqSXwxYWttTFR8N3h8cHZ0Jy5zcGxpdCgnfCcpLDAse30pKVxuXG52YXIgdnRleEhlbHBlciA9IHtcblxuICAgIGhlYWRlcnM6IHt9LFxuXG4gICAgZW5kcG9pbnRzOiB7XG4gICAgICAgIHNrdURldGFpbHM6ICcvYXBpL2NhdGFsb2dfc3lzdGVtL3B2dC9za3Uvc3RvY2trZWVwaW5ndW5pdGJ5aWQvJyxcbiAgICAgICAgdmFyaWF0aW9uczogJy9hcGkvY2F0YWxvZ19zeXN0ZW0vcHViL3Byb2R1Y3RzL3ZhcmlhdGlvbnMvJ1xuICAgIH0sXG5cbiAgICByZXE6IGZ1bmN0aW9uIHJlcSh1cmwsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IF90aGlzLmhlYWRlcnNcbiAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBnZXRWYXJpYXRpb25zOiBmdW5jdGlvbiBnZXRWYXJpYXRpb25zKHByb2R1Y3RJZCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy9fdGhpcy5yZXEoX3RoaXMuZW5kcG9pbnRzLnZhcmlhdGlvbnMgKyBwcm9kdWN0SWQsIGNhbGxiYWNrKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9jYXRhbG9nX3N5c3RlbS9wdWIvcHJvZHVjdHMvdmFyaWF0aW9ucy8nICsgcHJvZHVjdElkLFxuICAgICAgICAgICAgdHlwZTogJ0dFVCdcbiAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBnZXRTa3VEZXRhaWxzOiBmdW5jdGlvbiBnZXRTa3VEZXRhaWxzKHNrdSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy9fdGhpcy5yZXEoX3RoaXMuZW5kcG9pbnRzLnNrdURldGFpbHMgKyBza3UsIGNhbGxiYWNrKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9ib3Rpd2FsbC5jb3JlYml6LmNvbS5ici9jYXRhbG9nL3NrdScsXG4gICAgICAgICAgICBkYXRhOiB7IGZpbHRlcjogc2t1LCBmaWx0ZXJUeXBlOiAnc3RvY2trZWVwaW5ndW5pdGJ5aWQnIH0sXG4gICAgICAgICAgICB0eXBlOiAnR0VUJ1xuICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxudmFyIFNlcnZpY2VDbGFzcyA9IGZ1bmN0aW9uIFNlcnZpY2VDbGFzcygpIHtcblxuICAgIHRoaXMuZ2V0U2VydmljZXMgPSBmdW5jdGlvbiAoc2t1LCBjYWxsYmFjaykge1xuICAgICAgICB2dGV4SGVscGVyLmdldFNrdURldGFpbHMoc2t1LCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0U2VydmljZXNGcm9tQWxsU2t1cyA9IGZ1bmN0aW9uIChwcm9kdWN0SWQsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB2YXIgbGVuID0gMDtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBvYmogPSB7fTtcblxuICAgICAgICB2dGV4SGVscGVyLmdldFZhcmlhdGlvbnMocHJvZHVjdElkLCBmdW5jdGlvbiAocmVzKSB7XG5cbiAgICAgICAgICAgIGxlbiA9IHJlcy5za3VzLmxlbmd0aDtcblxuICAgICAgICAgICAgcmVjdXJzaXZlKGlkeCk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlY3Vyc2l2ZShpZHgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmdldFNlcnZpY2VzKHJlcy5za3VzW2lkeF0uc2t1LCBmdW5jdGlvbiAoc2t1RGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW3Jlcy5za3VzW2lkeF0uc2t1XSA9IHNrdURhdGEuU2VydmljZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbcmVzLnNrdXNbaWR4XS5za3VdWydBc3NvY2lhdGVkJ10gPSBza3VEYXRhLkF0dGFjaG1lbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWN1cnNpdmUoaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ29iajogJyxvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0U2VydmljZXNGcm9tT25lU2t1ID0gZnVuY3Rpb24gKHNrdUlkLCBjYWxsYmFjaykge1xuXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgICAgIF90aGlzLmdldFNlcnZpY2VzKHNrdUlkLCBmdW5jdGlvbiAoc2t1RGF0YSkge1xuICAgICAgICAgICAgb2JqW3NrdUlkXSA9IHNrdURhdGEuU2VydmljZXM7XG4gICAgICAgICAgICBvYmpbc2t1SWRdWydBc3NvY2lhdGVkJ10gPSBza3VEYXRhLkF0dGFjaG1lbnRzO1xuICAgICAgICAgICAgY2FsbGJhY2sob2JqKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cbnZhciBGbGFnQ2xhc3MgPSBmdW5jdGlvbiBGbGFnQ2xhc3MoKSB7XG4gICAgdGhpcy5odG1sID0gXCI8ZGl2IGNsYXNzPSdmbGFnLXZhbGlkYWRlJz48cD4jZGF0YS1kZS12YWxpZGFkZSM8cD48L2Rpdj5cIjtcbiAgICB0aGlzLmh0bWxQcm9kdWN0ID0gJzxkaXYgY2xhc3M9XCJ1bHRpbWEtY2hhbmNlIGZsYWctI3NrdSNcIj48c3Bhbj5wcmEgdXNhciBqw6E8L3NwYW4+dsOhbGlkbyBhdMOpICNkYXRhLWRlLXZhbGlkYWRlIzwvZGl2Pic7XG4gICAgdGhpcy5kYXRlVG9GbGFnID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbC5yZXBsYWNlKCcjZGF0YS1kZS12YWxpZGFkZSMnLCBkYXRlKTtcbiAgICB9O1xuICAgIHRoaXMucHJvZHVjdEZsYWcgPSBmdW5jdGlvbiAoZGF0ZSwgc2t1KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxQcm9kdWN0LnJlcGxhY2UoJyNkYXRhLWRlLXZhbGlkYWRlIycsIGRhdGUpLnJlcGxhY2UoJyNza3UjJywgc2t1KTtcbiAgICB9O1xufTtcblxudmFyIGNvdW50U2t1cyA9IGZ1bmN0aW9uIGNvdW50U2t1cygpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI19fX3JjLXAtc2t1LWlkcycpLnZhbHVlLnNwbGl0KCcsJykubGVuZ3RoO1xufTtcblxudmFyIGdldEFycmF5T2ZBbGxTa3VzID0gZnVuY3Rpb24gZ2V0QXJyYXlPZkFsbFNrdXMoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNfX19yYy1wLXNrdS1pZHMnKS52YWx1ZS5zcGxpdCgnLCcpO1xufTtcblxudmFyIGZvcm1hdENvbnRlbnQgPSBmdW5jdGlvbiBmb3JtYXRDb250ZW50KGRhdGEpIHtcbiAgICB2YXIgZmxhZ1Byb2R1Y3QgPSBuZXcgRmxhZ0NsYXNzKCk7XG4gICAgcmV0dXJuIGZsYWdQcm9kdWN0LnByb2R1Y3RGbGFnKGRhdGEuc3RyaW5nLCBkYXRhLnNrdSk7XG59O1xuXG52YXIgcHV0RmxhZ09uU2NyZWVuID0gZnVuY3Rpb24gcHV0RmxhZ09uU2NyZWVuKGRhdGEsIGJlZm9yZUl0LCBtYWluQ2xhc3MpIHtcbiAgICB2YXIgY29udGVudCA9IGZvcm1hdENvbnRlbnQoZGF0YSk7XG4gICAgaWYgKCQobWFpbkNsYXNzKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAkKCc8ZGl2IGNsYXNzPVwiJyArIG1haW5DbGFzcy5yZXBsYWNlKCcuJywgJycpICsgJ1wiPjwvZGl2PicpLmluc2VydEJlZm9yZShiZWZvcmVJdCk7XG4gICAgICAgICQobWFpbkNsYXNzKS5hcHBlbmQoY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJChtYWluQ2xhc3MpLmFwcGVuZChjb250ZW50KTtcbiAgICB9XG59O1xuXG52YXIgZXhwaXJhdGlvbkRhdGVTa3UgPSBmdW5jdGlvbiBleHBpcmF0aW9uRGF0ZVNrdShhdHRhY2htZW50cykge1xuXG4gICAgdGhpcy5hdHRhY2htZW50cyA9IGF0dGFjaG1lbnRzO1xuXG4gICAgdGhpcy5oYXNFeHBpcmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaGFzID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIHNrdSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmpbc2t1XS5Bc3NvY2lhdGVkWzBdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShvYmpbc2t1XS5Bc3NvY2lhdGVkWzBdKS5pbmRleE9mKCd2YWxpZGFkZScpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhcztcbiAgICB9O1xuXG4gICAgdGhpcy5mb3JtYXREYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBzdHJEYXRlLnNwbGl0KCctJyk7XG4gICAgICAgIHZhciBtb250aCA9IGFycmF5WzFdO1xuICAgICAgICB2YXIgeWVhciA9IGFycmF5WzJdO1xuXG4gICAgICAgIHZhciBvYmpSZWYgPSB7XG4gICAgICAgICAgICAnamFuJzogJ0phbmVpcm8nLFxuICAgICAgICAgICAgJ2Zldic6ICdGZXZlcmVpcm8nLFxuICAgICAgICAgICAgJ21hcic6ICdNYXLDp28nLFxuICAgICAgICAgICAgJ2Ficic6ICdBYnJpbCcsXG4gICAgICAgICAgICAnbWFpJzogJ01haW8nLFxuICAgICAgICAgICAgJ2p1bic6ICdKdW5obycsXG4gICAgICAgICAgICAnanVsJzogJ0p1bGhvJyxcbiAgICAgICAgICAgICdhZ28nOiAnQWdvc3RvJyxcbiAgICAgICAgICAgICdzZXQnOiAnU2V0ZW1icm8nLFxuICAgICAgICAgICAgJ291dCc6ICdPdXR1YnJvJyxcbiAgICAgICAgICAgICdub3YnOiAnTm92ZW1icm8nLFxuICAgICAgICAgICAgJ2Rleic6ICdEZXplbWJybydcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3RyaW5nID0gb2JqUmVmW21vbnRoXSArIFwiIGRlIFwiICsgXCIyMFwiICsgeWVhcjtcblxuICAgICAgICBjb25zb2xlLmluZm8oeyBtb250aDogb2JqUmVmW21vbnRoXSwgeWVhcjogXCIyMFwiICsgeWVhciwgc3RyaW5nOiBzdHJpbmcgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgbW9udGg6IG9ialJlZlttb250aF0sIHllYXI6IFwiMjBcIiArIHllYXIsIHN0cmluZzogc3RyaW5nIH07XG4gICAgfTtcbn07XG5cbnZhciBmb3JtYXRWYWxpZGFkZSA9IGZ1bmN0aW9uIGZvcm1hdFZhbGlkYWRlKGF0dGFjaG1lbnRzKSB7XG5cbiAgICB2YXIgZmxhZyA9IG5ldyBGbGFnQ2xhc3MoKTtcblxuICAgIHZhciBza3VJbmZvID0ge307XG5cbiAgICBhdHRhY2htZW50cyA9IGF0dGFjaG1lbnRzLmZpbHRlcihmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gYS5OYW1lLmluZGV4T2YoJ3ZhbGlkYWRlJykgPiAtMTtcbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKCdib2xvJywgYXR0YWNobWVudHMpO1xuXG4gICAgaWYgKGF0dGFjaG1lbnRzWzBdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgdmFsaWRhZGUgPSBhdHRhY2htZW50cztcbiAgICAgICAgY29uc29sZS5sb2coJ3ZhbGlkYWRlPicsIHZhbGlkYWRlKTtcbiAgICAgICAgaWYgKHZhbGlkYWRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNrdUluZm9bJ3ZhbGlkYWRlJ10gPSBleHBpcmF0aW9uRGF0ZS5mb3JtYXREYXRlKHZhbGlkYWRlWzBdLk5hbWUpO1xuICAgICAgICAgICAgc2t1SW5mb1sndmFsaWRhZGUnXVsnaHRtbCddID0gZmxhZy5kYXRlVG9GbGFnKGV4cGlyYXRpb25EYXRlLmZvcm1hdERhdGUodmFsaWRhZGVbMF0uTmFtZSkuc3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZygnc2t1SW5mb1t2YWxpZGFkZV0nLCBza3VJbmZvWyd2YWxpZGFkZSddKTtcbiAgICBjb25zb2xlLmxvZygnc2t1SW5mb1t2YWxpZGFkZV1baHRtbF0nLCBza3VJbmZvWyd2YWxpZGFkZSddWydodG1sJ10pO1xuICAgIHJldHVybiB2YWxpZGFkZTtcbn07XG5cbnZhciBleHBpcmF0aW9uRGF0ZSA9IHtcblxuICAgIGF0dGFjaG1lbnRzOiBudWxsLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChvYmosIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0V4cGlyYXRpb24ob2JqKSkge1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2htZW50cyA9IG9ialtrZXldLkFzc29jaWF0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZXMoY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZXM6IGZ1bmN0aW9uIGRlbGVnYXRlcyhjYWxsYmFjaykge1xuICAgICAgICB2YXIgYXR0YWNobWVudHMgPSB0aGlzLmF0dGFjaG1lbnRzO1xuICAgICAgICAkKCcuYnV5LWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjYWxsYmFjayhhdHRhY2htZW50cyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBoYXNFeHBpcmF0aW9uOiBmdW5jdGlvbiBoYXNFeHBpcmF0aW9uKG9iaikge1xuICAgICAgICB2YXIgaGFzID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIHNrdSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmpbc2t1XS5Bc3NvY2lhdGVkWzBdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShvYmpbc2t1XS5Bc3NvY2lhdGVkWzBdKS5pbmRleE9mKCd2YWxpZGFkZScpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhcztcbiAgICB9LFxuXG4gICAgZm9ybWF0RGF0ZTogZnVuY3Rpb24gZm9ybWF0RGF0ZShzdHJEYXRlKSB7XG4gICAgICAgIHZhciBhcnJheSA9IHN0ckRhdGUuc3BsaXQoJy0nKTtcbiAgICAgICAgdmFyIG1vbnRoID0gYXJyYXlbMV07XG4gICAgICAgIHZhciB5ZWFyID0gYXJyYXlbMl07XG5cbiAgICAgICAgdmFyIG9ialJlZiA9IHtcbiAgICAgICAgICAgICdqYW4nOiAnSmFuZWlybycsXG4gICAgICAgICAgICAnZmV2JzogJ0ZldmVyZWlybycsXG4gICAgICAgICAgICAnbWFyJzogJ01hcsODwqdvJyxcbiAgICAgICAgICAgICdhYnInOiAnQWJyaWwnLFxuICAgICAgICAgICAgJ21haSc6ICdNYWlvJyxcbiAgICAgICAgICAgICdqdW4nOiAnSnVuaG8nLFxuICAgICAgICAgICAgJ2p1bCc6ICdKdWxobycsXG4gICAgICAgICAgICAnYWdvJzogJ0Fnb3N0bycsXG4gICAgICAgICAgICAnc2V0JzogJ1NldGVtYnJvJyxcbiAgICAgICAgICAgICdvdXQnOiAnT3V0dWJybycsXG4gICAgICAgICAgICAnbm92JzogJ05vdmVtYnJvJyxcbiAgICAgICAgICAgICdkZXonOiAnRGV6ZW1icm8nXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN0cmluZyA9IG9ialJlZlttb250aF0gKyBcIiBkZSBcIiArIFwiMjBcIiArIHllYXI7XG5cbiAgICAgICAgcmV0dXJuIHsgbW9udGg6IG9ialJlZlttb250aF0sIHllYXI6IFwiMjBcIiArIHllYXIsIHN0cmluZzogc3RyaW5nIH07XG4gICAgfVxufTtcblxudmFyIGNyZWF0ZU1vZGFsID0gZnVuY3Rpb24gY3JlYXRlTW9kYWwoZSkge1xuICAgIGlmICh3aW5kb3cudmFsaWRhZGUgIT0gbnVsbCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBkYXRhID0geyBzaG93TW9kYWw6IHRydWUsIHZhbGlkYWRlOiB3aW5kb3cudmFsaWRhZGUgfTtcblxuICAgICAgICB2YXIgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGFkZSA9IHdpbmRvdy52YWxpZGFkZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb2RhbCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGJ1eTogZnVuY3Rpb24gYnV5KCkge1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV5LWJ1dHRvbicpLmhyZWY7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGJhY2s6IGZ1bmN0aW9uIGJhY2soKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAod2luZG93LmJ1eU1vZGFsID09IG51bGwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5idXlNb2RhbCA9IG5ldyBNb2RhbFZhbGlkYWRlKCd0YmJxYScsICcjdnVlLWFwcCcsIGRhdGEsIG1ldGhvZHMpO1xuICAgICAgICAgICAgd2luZG93LmJ1eU1vZGFsLmluaXQoKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvdy5idXlNb2RhbCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS1cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuYnV5TW9kYWwuYXBwLnZhbGlkYWRlID0gd2luZG93LnZhbGlkYWRlO1xuICAgICAgICAgICAgd2luZG93LmJ1eU1vZGFsLmFwcC5zaG93TW9kYWwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGluaXRWYWxpZGFkZSA9IGZ1bmN0aW9uIGluaXRWYWxpZGFkZSgpIHtcblxuICAgIHZhciBwcm9kdXRvU2VydmljZSA9IG5ldyBTZXJ2aWNlQ2xhc3MoKTtcblxuICAgIHZhciBwcm9kdWN0SWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjX19fcmMtcC1pZCcpLnZhbHVlO1xuXG4gICAgdmFyIGZsYWcgPSBuZXcgRmxhZ0NsYXNzKCk7XG5cbiAgICB3aW5kb3cuYnV5TW9kYWwgPSBudWxsO1xuXG4gICAgd2luZG93LmF0dGFjaHMgPSB7fTtcblxuICAgIHZhciB0ZXN0ZSA9IHdpbmRvdy5hdHRhY2hzO1xuICAgIGNvbnNvbGUubG9nKHRlc3RlKTtcblxuICAgIHdpbmRvdy52YWxpZGF0ZSA9IG51bGw7XG5cbiAgICB3aW5kb3cuYnV5TW9kYWxGbiA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgJCgnLmJ1eS1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB3aW5kb3cuYnV5TW9kYWxGbihlKTtcbiAgICB9KTtcblxuICAgIHByb2R1dG9TZXJ2aWNlLmdldFNlcnZpY2VzRnJvbUFsbFNrdXMocHJvZHVjdElkLCBmdW5jdGlvbiAoc2VydmljZXMpIHtcblxuICAgICAgICB2YXIgZGF0YSA9IG51bGw7XG4gICAgICAgIHZhciBza3VzTGVuID0gMDtcblxuICAgICAgICBmb3IgKHZhciBza3UgaW4gc2VydmljZXMpIHtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc2t1LCBzZXJ2aWNlc1tza3VdLkFzc29jaWF0ZWRbMF0pO1xuXG4gICAgICAgICAgICBza3VzTGVuKys7XG4gICAgICAgICAgICBpZiAoc2VydmljZXNbc2t1XVsnQXNzb2NpYXRlZCddWzBdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBleHBpcmF0aW9uRGF0ZS5mb3JtYXREYXRlKHNlcnZpY2VzW3NrdV1bJ0Fzc29jaWF0ZWQnXVswXS5OYW1lKTtcblxuICAgICAgICAgICAgICAgIGRhdGFbJ3NrdSddID0gc2t1O1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkYXRhXCIsIGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgcHV0RmxhZ09uU2NyZWVuKGRhdGEsICcucHJvZHVjdC1idXktYnV0dG9uJywgJy5mbGFnLWNvbnRhaW5lci12YWxpZGFkZScpO1xuXG4gICAgICAgICAgICAgICAgd2luZG93LmF0dGFjaHNbc2t1XSA9IGRhdGE7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuYnV5TW9kYWxGbiA9IGNyZWF0ZU1vZGFsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNrdXNMZW4gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cudmFsaWRhZGUgPSBkYXRhLnN0cmluZztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cudmFsaWRhZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBza3VzRnJvbVBhZ2UgPSAkKCcjX19fcmMtcC1za3UtaWRzJykuYXR0cigndmFsdWUnKS5zcGxpdChcIixcIik7XG5cbiAgICAgICAgaWYgKHNrdXNGcm9tUGFnZS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbWFpbkZ1bmN0aW9uKHNrdXNGcm9tUGFnZVswXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGFjdGl2ZVZhbGlkYWRlV2hlblJlYWR5KCkge1xuICAgIHZhciBjaGVja1JlYWR5ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2t1VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJ2lkc2t1PScpO1xuICAgICAgICB2YXIgdGhpc1NrdSA9IHNrdVVybFsxXTtcbiAgICAgICAgdGhpc1NrdSA9IHRoaXNTa3Uuc3BsaXQoJyYnLCAxKTtcbiAgICAgICAgdGhpc1NrdSA9IHRoaXNTa3VbMF07XG4gICAgICAgIHZhciB0aGlzRGl2U2t1ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsYWctJyArIHRoaXNTa3UpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzRGl2U2t1LCAnIGUgJywgdGhpc1NrdSlcbiAgICAgICAgaWYgKHRoaXNEaXZTa3UgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAkKCcudWx0aW1hLWNoYW5jZScpLnJlbW92ZUNsYXNzKCdpdGVtLWFjdGl2ZScpO1xuICAgICAgICAgICAgJCh0aGlzRGl2U2t1KS5hZGRDbGFzcygnaXRlbS1hY3RpdmUnKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2tSZWFkeSk7XG4gICAgICAgIH1cbiAgICB9LCAxMDAwKTtcbn1cbi8vICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7XG4vLyAgICAgYWN0aXZlVmFsaWRhZGVXaGVuUmVhZHkoKVxuLy8gfSlcblxudmFyIG1haW5GdW5jdGlvbiA9IGZ1bmN0aW9uIG1haW5GdW5jdGlvbihza3UpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS1cIiwgc2t1KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInZhbGlkYWRlXCIsIHdpbmRvdy52YWxpZGFkZSk7XG4gICAgdHJ5IHtcbiAgICAgICAgJCgnLnVsdGltYS1jaGFuY2UnKS5yZW1vdmVDbGFzcygnaXRlbS1hY3RpdmUnKTtcbiAgICAgICAgJCgnLmZsYWctJyArIHNrdSkuYWRkQ2xhc3MoJ2l0ZW0tYWN0aXZlJyk7XG4gICAgICAgIGlmICh3aW5kb3cuYXR0YWNocyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHdpbmRvdy52YWxpZGFkZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAod2luZG93LmF0dGFjaHNbc2t1XSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cudmFsaWRhZGUgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cudmFsaWRhZGUgPSB3aW5kb3cuYXR0YWNoc1tza3VdLnN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxufTtcblxudmFyIE1vZGFsVmFsaWRhZGUgPSBmdW5jdGlvbiBNb2RhbFZhbGlkYWRlKGVudmlyb21lbnQsIHNlbGVjdG9yLCBfZGF0YSwgbWV0aG9kcykge1xuXG4gICAgdGhpcy5hcHAgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHRlbXBsYXRlRGF0YSA9ICc8ZGl2IGNsYXNzPVwidnVlLXBvcHVwXCI+XFxuICAgICAgICAgICAgPHRyYW5zaXRpb24gbmFtZT1cIm1vZGFsXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2dWUtYXV4LWJveFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZ1ZS1vdmVybGF5XCIgQGNsaWNrPVwic2hvd01vZGFsID0gZmFsc2VcIiB2LWJpbmQ6Y2xhc3M9XCJ7IFxcJ2FjdGl2ZVxcJzogc2hvd01vZGFsIH1cIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1tYXNrXCIgdi1zaG93PVwic2hvd01vZGFsXCIgdi1iaW5kOmNsYXNzPVwieyBcXCdmYWRlLWluLXVwXFwnOiBzaG93TW9kYWwsIFxcJ2ZhZGUtb3V0LWRvd25cXCcgOiAhc2hvd01vZGFsIH1cIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tdnVlLW1vZGFsLWNsb3NlXCIgQGNsaWNrPVwic2hvd01vZGFsID0gZmFsc2VcIj48aSBjbGFzcz1cImljby1jbG9zZVwiPjwvaT48L2J1dHRvbj5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxzbG90IG5hbWU9XCJjb250ZW50XCI+PC9zbG90Pi0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxoMz5QU0lVITwvaDM+LS0+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPmVpLCBwZXJhISBlc3NlIHByb2R1dG8gXFx4RTkgdlxceEUxbGlkbyBhdFxceEU5IDxzdHJvbmc+e3t2YWxpZGFkZX19PC9zdHJvbmc+LCB0XFx4RTE/PC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm1vZGFsLWJhY2tcIiBAY2xpY2s9XCJiYWNrXCI+dm9sdGFyPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJtb2RhbC1jb21wcmFyXCIgQGNsaWNrPVwiYnV5XCI+Y29udGludWFyIGNvbXByYTwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvdHJhbnNpdGlvbj5cXG4gICAgICAgIDwvZGl2Pic7XG5cbiAgICAgICAgdmFyIG1vZGFsID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlRGF0YSxcbiAgICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9kYXRhO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGhvZHM6IG1ldGhvZHNcbiAgICAgICAgfTtcblxuICAgICAgICBWdWUuY29tcG9uZW50KCdtb2RhbCcsIG1vZGFsKTtcblxuICAgICAgICBfdGhpcy5hcHAgPSBuZXcgVnVlKHtcbiAgICAgICAgICAgIGVsOiBzZWxlY3RvcixcbiAgICAgICAgICAgIGRhdGE6IF9kYXRhXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyh0aGlzLmFwcCk7XG4gICAgfTtcblxuICAgIHRoaXMuY2xvc2UgPSBmdW5jdGlvbiAoKSB7fTtcbn07XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpbml0VmFsaWRhZGUoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbn0pO1xuXG4kKHdpbmRvdykub24oJ3NrdVNlbGVjdGVkLnZ0ZXgnLCBmdW5jdGlvbiAoZSwgcHJvZHVjdElkLCBza3VPYmopIHtcbiAgICBtYWluRnVuY3Rpb24oc2t1T2JqLnNrdSk7XG59KTtcblxuLy8gQ29ycmXDp8Ojb1xuLy8gJCh3aW5kb3cpLm9uKCdza3VTZWxlY3RlZC52dGV4JywgZnVuY3Rpb24oZSwgcHJvZHVjdElkLCBza3VPYmopeyBcbi8vICAgICBpZigkKCcuc2t1LW5vdGlmeW1lJykuaXMoJzp2aXNpYmxlJykpeyBcbi8vICAgICAgICAgJCgnLndyYXBwZXJQcmVjb1NlbG8nKS5oaWRlKCk7IFxuLy8gICAgIH1lbHNleyBcbi8vICAgICAgICAgJCgnLndyYXBwZXJQcmVjb1NlbG8nKS5zaG93KCk7IFxuLy8gICAgIH1cbi8vIH0pOyJdfQ==
},{}]},{},[1])