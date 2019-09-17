(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var BrowserVendor = "";
(function () {
    if (navigator.vendor.match(/google/i)) {
        BrowserVendor = 'chrome/blink';
    } else if (navigator.vendor.match(/apple/i)) {
        BrowserVendor = 'safari/webkit';
    } else if (navigator.userAgent.match(/firefox\//i)) {
        BrowserVendor = 'firefox/gecko';
    } else if (navigator.userAgent.match(/edge\//i)) {
        BrowserVendor = 'edge/edgehtml';
    } else if (navigator.userAgent.match(/trident\//i)) {
        BrowserVendor = 'ie/trident';
    } else {
        BrowserVendor = navigator.userAgent + "\n" + navigator.vendor;
    }
})();
function insertAfterr(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

(function ($, window, document, undefined) {
    var $win = $(window);
    var $doc = $(document);

    $doc.ready(function () {
        $(".topic > li > span label").click(function (e) {
            e.preventDefault();
            var id = $(this).attr("for");
            $("#" + id).click();
        });

        // #Init funcoes
        settingsProductPreco();
        settingsProductFichaTecnica();
        clubeBeresPontos($('.plugin-preco .valor-por .skuBestPrice').text());
        shareSocial('.socials-secondary a');
        selectCor();
        aviseme();
        flagProdomocao();

        trustVoxReviews.init({
            token: '7068490812e3412c47f79ff7cc2ee524ab4d961d916ae3d0567a22af167a9e67',
            url: 'https://trustvox.com.br/api/stores/4039/opinions'
        });

        // #Breadcrumbs
        $('.breadcrumbs .bread-crumb > ul > li > a').eq(0).text('página inicial');

        // #Valida se existe produto relacionado se não esconde titulo
        if ($('.slider-products.collection.collection-products-relacionados .slider-clip .pratileira').length == 0) {
            $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-products').hide();
        }

        // #Calcula Cep
        $('#product-cal-frete').on('click', function (event) {
            event.preventDefault();
            calculoCep();
        });

        var sj_0 = null;

        try {
            var sj_0 = skuJson_0;
        } catch (error) {
            sj_0 = undefined;
        }

        // Muda título da avaliação, inserindo nome do produto
        if (sj_0 != undefined) $('.section-rating h2').text('avaliações + ' + skuJson_0.name);

        // Adiciona atributo ao campo valor / SEO
        $('.product-details .product-info strong').attr('itemprop', 'price');

        // Adiciona atributo ao campo nome do produto / SEO
        $('.product-details .product-head h1').attr('itemprop', 'name');

        // #Slide produtos relacionados
        if ($('.slider-products.collection.collection-products-relacionados .slider-clip .pratileira ul'.length)) {
            productSlider($('.slider-products.collection.collection-products-relacionados .slider-clip .pratileira ul'));

            $('.slider-products.collection.collection-products-relacionados .slider-actions .slider-next').on('click', function (event) {
                event.preventDefault();
                $('.slider-products.collection.collection-products-relacionados .slider-clip .pratileira ul').trigger('owl.next');
            });

            $('.slider-products.collection.collection-products-relacionados .slider-actions .slider-prev').on('click', function (event) {
                event.preventDefault();
                $('.slider-products.collection.collection-products-relacionados .slider-clip .pratileira ul').trigger('owl.prev');
            });
        }

        // #Tab descriçãos 
        $('.tabs .tabs-nav a').on('click', function (event) {
            event.preventDefault();
            var $this = $(this).attr('href');
            $(this).parent().addClass('current').siblings().removeClass('current');

            $('.tabs .tabs-body .tab').each(function (index, item) {
                if ($(this).attr('id') == $this) {
                    $(this).addClass('active').siblings().removeClass('active');
                }
            });
        });

        // Animate ate o bloco de avaliacoes
        $('.trustvox-fluid-jump').on('click', function () {
            var body = $("html, body");

            var offsetTop = 0;

            if ($(window).width() < 768) {
                offsetTop = $('li a.avaliacoes').eq(0).offset().top;
                $('li a.avaliacoes').eq(0).addClass('active');
                $('.accordion-body.avaliacao').addClass('active');
            } else {
                offesetTop = $('#trustvox-reviews').offset().top;
            }

            body.stop().animate({ scrollTop: offsetTop }, '500');
        });

        // #Img testura no hover sku
        $('.select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label').on('hover', function (event) {
            //testurasSKU($(this));
        });

        // #Query mobile
        if ($win.width() < 768) {
            // Monta ficha tecnica mobile
            fichaTecnicaMobile();
        }

        // #Query desktop

        // if($win.width() > 768) {

        // Animação tabs
        $('body').on('click touch', '.toggle.avaliacoes', function (event) {

            event.preventDefault();
            $('html,body').animate({ scrollTop: $('.section-rating').offset().top - 20 }, 500);
        });

        // }

        var sj_0 = null;

        try {
            var sj_0 = skuJson_0;
        } catch (error) {
            sj_0 = undefined;
        }

        // Muda título da avaliação, inserindo nome do produto
        if (sj_0 != undefined) $('.section-rating h2').text('avaliações + ' + skuJson_0.name);
        // Adiciona atributo ao campo valor / SEO
        $('.product-details .product-info strong').attr('itemprop', 'price');
        // Adiciona atributo ao campo nome do produto / SEO
        $('.product-details .product-head h1').attr('itemprop', 'name');

        // Dispara modal cliente fidelidade
        setTimeout(function () {
            if ($.cookie('ClienteFidelidade') == 'true') {
                $('.background-modal-bere, .conteudo-modal-bere').hide();
            } else {
                if ($('.product-image .tags-product p.pre-venda').length > 0) {
                    $('.background-modal-bere, .conteudo-modal-bere').show();
                } else {
                    $('.background-modal-bere, .conteudo-modal-bere').hide();
                }
            }
        }, 200);

        /*cookie = new Cookie;
        if (cookie.get( 'ClienteFidelidade' )) {
            $('.background-modal-bere, .conteudo-modal-bere').hide();
        }*/
    });

    function setas_avaliacao_efeito() {

        window.setInterval(function () {

            var transform = $('.section-info .owl-wrapper').css('transform');

            if (transform == undefined) return;

            var leftel = parseInt(transform.split(',').reverse()[1]);

            //Seta esquerda
            if (transform == 'none' || leftel == 0) {
                $('.section-info .slider-prev').addClass('seta-no-effect');
            } else {
                $('.section-info .slider-prev').removeClass('seta-no-effect');
            }

            //Seta direita
            var fright = $('.section-info .owl-wrapper .owl-item').size() * parseInt($('.section-info .owl-wrapper .owl-item:last').css('width')) - parseInt($('.section-info .owl-wrapper .owl-item:last').css('width'));

            if (fright == leftel * -1 || $('.section-info .owl-wrapper .owl-item').size() == 1) {
                $('.section-info .slider-next').addClass('seta-no-effect');
            } else {
                $('.section-info .slider-next').removeClass('seta-no-effect');
            }
        }, 200);
    }

    function marginProductContent() {

        var selectCorNew = $(".select-cor-new").height();

        if (selectCorNew > 200) {

            if ($win.width() < 1008 && $win.width() > 620) {

                $(".product-details .product-content").css("margin-top", "-" + (selectCorNew / 2 - 20) + "px");
            } else {

                $(".product-details .product-content").removeAttr("style");
            }
        }
    }

    $win.on('load', function () {

        marginProductContent();

        // tamanho de box de cor
        $(window).resize(function () {

            marginProductContent();
        });

        // #Redimenciona img produto
        imgProduct();

        // #Slide avaliaçoes
        if ($('.slider-entrys .slider-clip ul').length) {
            sliderComentarios($('.slider-entrys .slider-clip ul'));

            $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-actions .slider-next').on('click', function (event) {
                event.preventDefault();
                $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides').trigger('owl.next');
            });

            $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-actions .slider-prev').on('click', function (event) {
                event.preventDefault();
                $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides').trigger('owl.prev');
            });
        }

        // #Animação avaliaçoes top
        $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides.owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item .slide strong').on('click', function (event) {
            event.preventDefault();
            $('html,body').animate({ scrollTop: $('.section-rating').offset().top }, 500);
        });

        //# Query mobile
        if ($win.width() < 768) {
            // #Animate (Por que asberes amam)
            $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides.owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item .slide strong').on('click', function (event) {
                event.preventDefault();
                $('html,body').animate({ scrollTop: $('.section-rating').offset().top }, 500);
            });

            // #Adiciona icone zoom mobile
            $('#image .image-zoom .zoomPad').prepend('<i class="ico-zoom-mobile"></i>');
        }

        //# Setinhas de avaliacao do produto efeitinho
        setas_avaliacao_efeito();
    });
})(jQuery, window, document);

/* ====================================================================== *\
    #Flag de promoçoes
\* ====================================================================== */
function flagProdomocao() {
    var htmlOfArrayOfFlags = "";
    var htmlItemOfFlag = "<li class=\"#data-class#\"> <a href=\"#\">#data-flag#</a></li>";

    var arrayFlags = [{ flag_name: 'produtos top', flag_class: 'tag produtos-top', orderId: 1 }, { flag_name: 'novidade', flag_class: 'tag novidade', orderId: 2 }, { flag_name: 'so no sote', flag_class: 'tag so-no-sote', orderId: 3 }, { flag_name: '15', flag_class: 'tag 15', orderId: 4 }, { flag_name: 'frete gratis', flag_class: 'tag frete-gratis', orderId: 5 }, { flag_name: 'tempo limitado', flag_class: 'tag tempo-limitado', orderId: 6 }, { flag_name: 'noite da beleza', flag_class: 'tag noite-da-beleza', orderId: 7 }, { flag_name: 'liquida bere', flag_class: 'tag liquida-bere', orderId: 8 }, { flag_name: 'black friday', flag_class: 'tag black-friday', orderId: 9 }, { flag_name: 'black week', flag_class: 'tag black-week', orderId: 10 }];

    if ($('body.produto .vtex-image p').length > 0) {
        var arrayFlagsVtex = [];

        $('body.produto .vtex-image p').each(function (index, item) {
            arrayFlagsVtex.push($(this).text());

            // console.log($(this).text())
        });

        for (var i = 0; i < arrayFlags.length; i++) {
            if ($.inArray(arrayFlags[i].flag_name, arrayFlagsVtex) !== -1) {
                htmlOfArrayOfFlags += htmlItemOfFlag.replace('#data-class#', arrayFlags[i].flag_class).replace('#data-flag#', arrayFlags[i].flag_name);
            }
        }

        $('.product-details .product-image').prepend('<ul class="tags"> ' + htmlOfArrayOfFlags + ' </ul>');

        if ($('.product-details .product-image .tags > li').length == 0) {
            $('.product-details .product-image .tags').hide();
        }
    }
}

/* ====================================================================== *\
    #Grid slider product
\* ====================================================================== */
function getGridSize() {
    return window.innerWidth < 480 ? 2 : window.innerWidth < 1025 ? 4 : window.innerWidth > 1024 ? 4 : 4;
}

/* ====================================================================== *\
    #Slider product
\* ====================================================================== */
function selectLocation(_location) {
    var idSku = document.location.search.replace(/.*?idsku=(\d.*?)(&.*|$)/, '$1');
    $('label[data-idsku="' + idSku + '"]').click();
}

/* ====================================================================== *\
    #Monta img seletor de sku
\* ====================================================================== */
var DataSkuManager = function DataSkuManager(selectorGroup) {
    var selector = selectorGroup;
    var _owner = DataSkuManager;
    var pathDataSku = "/produto/sku/";
    _owner.objSkusInfo = { skuList: [] };

    if ($(selector).length) {
        var lengthSkus = $(selector).find("label").length;
        var arrSkuList = [];
        var cont;
        var regex;

        if (skuJson == undefined) return false;

        $.each(skuJson.skus, function (index, value) {
            regex = /^[0-9\,]{0,}[m|v|p|g|ml]{1,}$/g;
            if (value.values[0]) {
                if (!value.values[0].match(regex)) {
                    cont = value.values.length - 2;
                    if (cont < 0) {
                        cont = 0;
                    }
                } else {
                    cont = value.values.length - 1;
                    if (cont < 0) {
                        cont = 0;
                    }
                }
                if (arrSkuList.indexOf(value.values[cont]) == -1) {
                    arrSkuList.push(value.values[cont]);
                    _owner.objSkusInfo.skuList.push({
                        id: value.sku,
                        name: value.values[cont],
                        thumb: '',
                        texture: ''
                    });
                    callSkuJsonAndMountThumbs(value.sku, value.values[cont]);
                }
            }
        });
    }

    function callSkuJsonAndMountThumbs(intIdSku, skuName) {
        var urlJSONSkuInfos = pathDataSku + intIdSku;
        var objSucess;
        var totalIMG;
        $.getJSON(urlJSONSkuInfos, function (data) {
            objSucess = data;
            try {
                var totalImages = objSucess[0]["Images"].length;
                if (typeof totalImages != "undefined") {
                    for (var i = 0; i < totalImages; i++) {
                        var indexImages = 0;
                        var archiveTypeId = 0;
                        var urlThumbSku = "";
                        totalIMG = objSucess[0]["Images"][i].length;
                        for (var c = 0; c < totalIMG; c++) {
                            if (objSucess[0]["Images"][i][c]["Name"] == null) {
                                archiveTypeId = 1;
                                urlThumbSku = objSucess[0]["Images"][i][c]["Path"];
                                break;
                            }
                            if (objSucess[0]["Images"][i][c]["Name"].toLowerCase() == "thumb") {
                                archiveTypeId = 1;
                                urlThumbSku = objSucess[0]["Images"][i][c]["Path"];
                                break;
                            }
                        }

                        if (archiveTypeId == 1) {
                            $.each(_owner.objSkusInfo.skuList, function (index, value) {
                                if (value.id == intIdSku) {
                                    _owner.objSkusInfo.skuList[index].thumb = urlThumbSku;
                                }
                            });

                            $(selector).find("label").each(function () {
                                if (skuName == $(this).text()) {
                                    $(this).css("background", "url('" + urlThumbSku.replace("65-65/", "200-200/").replace("292-292/", "200-200/") + "') center center no-repeat");
                                    $(this).attr('title', $(this).text());
                                    $(this).attr('data-background', urlThumbSku.replace("65-65/", "200-200/").replace("144-292/", "200-200/"));
                                    $(this).attr('data-idSku', '' + objSucess[0].Id + '');

                                    if (objSucess[0].SkuSellersInformation[0].AvailableQuantity == 0) {
                                        $(this).addClass('product-disabled');
                                    }

                                    var $corLabel = $(this);

                                    $.get('/produto/sku/' + intIdSku, function (data) {
                                        if (!data[0].Availability) {
                                            $corLabel.addClass('item_unavailable');
                                        } else {
                                            var bestPrice = data[0].Price;
                                            var listPrice = data[0].ListPrice;

                                            // variavel para controlar a funcionalidade
                                            var ligar = true;

                                            if (listPrice > bestPrice && ligar) {
                                                var percent = parseInt(100 - bestPrice / listPrice * 100);
                                                //percent = 100 - percent;
                                                if ($corLabel.find('.flag-discount-percent').length == 0) {
                                                    $corLabel.append('<div class="flag-discount-percent percent-' + percent + '">- ' + percent + ' %</div>');
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            } catch (error) {
                // console.warn(error);
            }
        }).done(function () {

            setTimeout(function () {
                if (BrowserVendor == 'edge/edgehtml' || BrowserVendor == 'ie/trident') {
                    var coresNaoDisponiveis = document.querySelectorAll(".select-cor-new .product-disabled,.select-cor-new .item_unavailable");
                    var produtosComDesconto = document.querySelectorAll(".select-cor-new .flag-discount-percent");
                    var inserirDepois = document.querySelector('.select-cor-new > span > label:last-child');
                    var inserirAntes = document.querySelector('.select-cor-new > span label:first-child');
                    for (var i = 0; i < coresNaoDisponiveis.length; i++) {
                        insertAfterr(coresNaoDisponiveis[i], inserirDepois);
                    }
                    for (var i = 0; i < produtosComDesconto.length; i++) {
                        insertAfterr(produtosComDesconto[i].parent("label"), inserirDepois);
                        produtosComDesconto[i].insertBefore(inserirAntes);
                    }
                } else {
                    document.querySelectorAll(".select-cor-new .product-disabled,.select-cor-new .item_unavailable").forEach(function (element) {
                        $(element).insertAfter($('.select-cor-new > span > label:last-child'));
                        // console.log("colors unavaliable");
                    });
                    document.querySelectorAll(".select-cor-new .flag-discount-percent").forEach(function (element) {
                        $(element).parent("label").insertAfter($('.select-cor-new > span label:last-child'));
                        $(element).parent("label").insertBefore($('.select-cor-new > span label:first-child'));
                        // console.log("discount first");
                    });
                }
            }, 2000);
            selectLocation(window.location.href);
        });
    }
};

/* ====================================================================== *\
    #Replace img produto
\* ====================================================================== */
function imgProduct() {
    $('#show .thumbs li #botaoZoom img').each(function (index, item) {
        var src = $(this).attr('src').replace('-55-55', '-200-200');
        $(this).attr('src', src);
    });

    var imgPrincipalSrc = "";

    if ($('#show #include #image .image-zoom .zoomPad #image-main').length > 0) {
        imgPrincipalSrc = $('#show #include #image .image-zoom .zoomPad #image-main').attr('src');
    }

    // console.info(imgPrincipalSrc);

    if (imgPrincipalSrc != undefined && imgPrincipalSrc != "") {
        var srcImg = imgPrincipalSrc.replace('-292-292', '-1000-1000');
        $('#show #include #image .image-zoom .zoomPad #image-main').attr('src', srcImg);
    }
}

/* ====================================================================== *\
    #Settings produto
\* ====================================================================== */
function settingsProductPreco() {
    var precoPor = $('.plugin-preco .valor-por .skuBestPrice').text();
    var precoDe = $('.descricao-preco .valor-de .skuListPrice').text();
    var parcelaQd = $('.plugin-preco .descricao-preco .valor-dividido .skuBestInstallmentNumber').text();
    var parcelaTotal = $('.plugin-preco .descricao-preco .valor-dividido .skuBestInstallmentValue').text();

    $('.product-details .product-info .product-preco-por').text(precoPor);
    $('.product-details .product-info .product-preco-de').text(precoDe);
    $('.product-details .product-info .product-parcelamento').text(parcelaQd + ' de ' + parcelaTotal + ' sem juros');

    if (precoDe == "R$ 0,00") {
        $('del.product-preco-de').hide();
    }
}

/* ====================================================================== *\
    #Monta ficha tecnica e produtos 
\* ====================================================================== */
function settingsProductFichaTecnica() {
    // #Avaliaçoes 
    var avaliacao = $('#spnRatingProdutoTop').text();
    $('.evaluation-rate-result').text(avaliacao + ' avaliaÃ§Ãµes');
    $('.product-head .product-evaluation > span').css('width', '' + avaliacao + '%');

    // #Modo de uso 
    var modoUso = $('.value-field.Modo-de-Uso').text();
    $('.tabs .tab-content .specification-modo-usar > p').text(modoUso);

    // #Img ficha tecnica 
    var imgDescricao = $('.value-field.Imagem-descricao').eq(0).text();

    if (imgDescricao == null || imgDescricao == "" || imgDescricao == undefined) {
        $('.section-tabs .tab-content').css('width', '100%');
        $('.section-tabs .tab-image img').parent().remove();
    } else {
        $('.tabs .tab-image').append('<img src="' + imgDescricao + '" height="637" width="407"/>');
    }

    // #Precauçoes de Uso
    var modoUsar = $('.specification-modo-usar > p').text();
    if (modoUsar == "" || modoUsar == null || modoUsar == undefined) {
        $('#tab1 .tab-content h3').eq(1).hide();
    }

    // #Fica dica
    var ficaDica = $('#tab2 > p').text();
    if (ficaDica == null || ficaDica == "" || ficaDica == undefined) {
        $('#tab2').hide();
        $('.tabs .tabs-nav li').eq(1).hide();
    }

    // #Precaçoes de uso
    var precaucoesUso = $('.value-field.Precaucoes-de-Uso').text();
    if (precaucoesUso == null || precaucoesUso == "" || precaucoesUso == undefined) {
        $('#tab2').hide();
        $('.tabs .tabs-nav li').eq(3).hide();
    } else {
        $('#tab4 > p').append(precaucoesUso);
    }

    // #Se joga nesse produto
    var sejaNesseProduto = $('.value-field.se-joga-nesse-produto').html();
    if (sejaNesseProduto == null || sejaNesseProduto == "" || sejaNesseProduto == undefined) {
        $('.product-details .product-content strong').hide();
        $('.section-product').css('margin-bottom', '170px');
        $('.product-details .product-content').css('padding-top', '5px');
    } else {
        $('.product-content .list-bullets').append(sejaNesseProduto);
    }

    // #Por que agente ama
    var porqueAgenteAmaTextoPadrão = "";
    var porqueAgenteAma = $('.value-field.porque-a-gente-ama').html() || porqueAgenteAmaTextoPadrão;

    if (porqueAgenteAma) {

        $('.section-entry .list-hearts').append('<li> <p>' + porqueAgenteAma + '</p></li>');
    }

    // #Ficha tecnica
    var fichaTecnica = $('td.value-field.Ficha-Tecnica').html();
    if (fichaTecnica == null || fichaTecnica == "" || fichaTecnica == undefined) {
        $('#tab2').hide();
        $('.tabs .tabs-nav li').eq(2).hide();
    } else {
        $('.tabs-body #tab3').append('<div class="fichat-tecnica">' + fichaTecnica + '<div/>');
    }
}

/* ====================================================================== *\
    #Calculo de cep 
\* ====================================================================== */
function calculoCep() {
    $('.overlay-cep').fadeIn();
    $('#claculo-frete').fadeIn();

    $('.overlay-cep').on('click', function (event) {
        event.preventDefault();
        $(this).fadeOut();
        $('#claculo-frete').fadeOut();
    });

    $('.overlay-cep').on('click', function (event) {
        event.preventDefault();
        $(this).fadeOut();
        $('#buscar-cep').fadeOut();
    });

    $('.ico-close-calc-cep').on('click', function () {
        $('.table-info table').html("");
        $('#claculo-frete').fadeOut();
        $('.overlay-cep').fadeOut();
    });

    $('.ico-close-busca-cep').on('click', function (event) {
        $(this).fadeOut();
        $('#buscar-cep').fadeOut();
        $('.overlay-cep').fadeOut();
    });

    $("input[name=field-cep]").mask('00000-000', {
        reverse: true
    });

    $('.form-controls .btn.btn-toggle').on('click', function (event) {
        event.preventDefault();

        if ($('.table-info tr').length > 0) {
            $('.table-info tr').remove();
        }

        var cep = $('.form-steps #field-cep').val();
        var postalCode = cep;
        var country = 'BRA';

        if (cep == "" || cep == null || cep == undefined) {
            if ($('.error-cep-vazio').length == 0) {
                $('#claculo-frete .form-steps form .form-step.current .form-body .form-inner .form-row').append('<div class="error-cep-vazio"><i class="ico ico-erro-frete"></i> <p> Ops! o campo cep não pode estar em branco. <br/> digite o cep e tente novamente </p> </div>');
            }
        } else {
            if ($('.error-cep-vazio').length) {
                $('.error-cep-vazio').remove();
            }

            var items = [{
                id: $('.buy-button').attr('href').indexOf('javascript') > -1 ? $('#___rc-p-sku-ids').val().split(',')[0] : $('.buy-button').attr('href').split('?')[1].split('&')[0].split('sku=')[1],
                quantity: 1,
                seller: 1
            }];

            vtexjs.checkout.simulateShipping(items, postalCode, country).done(function (result) {
                // console.log(result)
                $('.table-info').slideDown();
                if ($('#claculo-frete .table-info tr').length > 2) {
                    // for (var i = 0; i < $('#claculo-frete .table-info tr').length; i++){
                    $('#claculo-frete .table-info tr').each(function (index, item) {
                        $(this).remove();
                    });
                    // }
                    $('.table-info table').append('<tr><th>tipo</th><th>prazo</th><th>valor</th></tr>');
                    for (var i = 0; i < result.logisticsInfo[0].slas.length; i++) {
                        if (!result.logisticsInfo[0].slas[i].pickupStoreInfo.isPickupStore) {
                            $('.table-info table').append('<tr><td> ' + result.logisticsInfo[0].slas[i].name + ' </td><td> até ' + result.logisticsInfo[0].slas[i].shippingEstimate.replace('bd', '') + ' dias uteis</td><td>R$ ' + formatReal(result.logisticsInfo[0].slas[i].price) + ' </td></tr>');
                        } else {
                            // console.log(result.logisticsInfo[0].slas[i].pickupStoreInfo.friendlyName);
                            $('.table-info table').append('<tr><td> Retirada ' + result.logisticsInfo[0].slas[i].pickupStoreInfo.friendlyName + ' </td><td> até ' + result.logisticsInfo[0].slas[i].shippingEstimate.replace('bd', '') + ' dias uteis</td><td>R$ ' + formatReal(result.logisticsInfo[0].slas[i].price) + ' </td></tr>');
                        }
                    }
                } else {
                    $('.table-info table').append('<tr><th>tipo</th><th>prazo</th><th>valor</th></tr>');
                    for (var i = 0; i < result.logisticsInfo[0].slas.length; i++) {
                        if (!result.logisticsInfo[0].slas[i].pickupStoreInfo.isPickupStore) {
                            $('.table-info table').append('<tr><td> ' + result.logisticsInfo[0].slas[i].name + ' </td><td> até ' + result.logisticsInfo[0].slas[i].shippingEstimate.replace('bd', '') + ' dias uteis</td><td>R$ ' + formatReal(result.logisticsInfo[0].slas[i].price) + ' </td></tr>');
                        } else {
                            // console.log(result.logisticsInfo[0].slas[i].pickupStoreInfo.friendlyName);
                            $('.table-info table').append('<tr><td> Retirada ' + result.logisticsInfo[0].slas[i].pickupStoreInfo.friendlyName + ' </td><td> até ' + result.logisticsInfo[0].slas[i].shippingEstimate.replace('bd', '') + ' dias uteis</td><td>R$ ' + formatReal(result.logisticsInfo[0].slas[i].price) + ' </td></tr>');
                        }
                    }
                }
            });
        }
    });

    // #Não sei meu cep
    $('.form-steps .form-inner-secondary .btn').on('click', function (event) {
        event.preventDefault();
        naoSeiMeuCep($('#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-row .form-controls #field-endereco').val(), $('#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-row .form-controls #field-cidade').val(), $('#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-row .form-controls #field-estado').val());
    });

    $('.form-steps .toggle:not(.btn)').on('click', function (event) {
        event.preventDefault();
        $('#claculo-frete').fadeOut();
        $('#buscar-cep').fadeIn();
        $('.form-steps .form-inner-secondary').fadeIn();
    });
}

/* ====================================================================== *\
    #Não sei meu cep
\* ====================================================================== */
function naoSeiMeuCep(endereco, cidade, estado) {
    if (endereco == "" || endereco == null || endereco == undefined || cidade == "" || cidade == null || cidade == undefined || estado == "" || estado == null || estado == undefined) {
        if ($('.cols.cep-result').length == 0) {
            $('#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-group .form-row').eq(2).append('<div class="cols cep-result"> <p> Preencha os campos corretamente </p> </div>');
        }
    } else {
        if ($('.cols.cep-result').length) {
            $('.cols.cep-result').remove();
        }

        $.ajax({
            url: window.location.protocol + '//viacep.com.br/ws/' + estado + '/' + cidade + '/' + endereco + '/json/',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function success(data) {
                if (data == null || data == "" || data == undefined) {
                    if ($('#buscar-cep .form-step .form-inner-secondary .form-group .form-row .error-cep-vazio').length == 0) {
                        $('#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-group .form-row').eq(2).append('<div class="error-cep-vazio"><i class="ico ico-erro-frete"></i> <p> ops! não encontramos o cep informado. <br/> verifique se o cep esta correto :( </p> </div>');
                        $('#buscar-cep .form-steps .form-step .form-body .form-inner-secondary').css('min-height', '610px');
                    }
                } else {
                    var cepEncontrado = data[0].cep;
                    $('#buscar-cep').fadeOut();
                    $('#buscar-cep .form-steps .form-step .form-body .form-inner-secondary').css('min-height', '500px');
                    $('#claculo-frete').fadeIn();
                    $('#field-cep').val(cepEncontrado);
                    $('.btn.btn-toggle').click();
                }
            }
        });
    }
}

/* ====================================================================== *\
    #Compartilhar produto nas redes sociais
\* ====================================================================== */
function shareSocial(element) {
    var productname, urlFace, urlTwitter, urlPint, urlgoogle, item;
    var url = window.location.href;

    if (skuJson != undefined) {
        productname = skuJson.name;
    }

    urlFace = "http://www.facebook.com/sharer/sharer.php?u=" + url + "&title=" + productname;
    urlTwitter = "http://twitter.com/intent/tweet?status=" + productname + "+" + url;
    urlPint = "http://pinterest.com/pin/create/bookmarklet/?media=[MEDIA]&url=" + url + "&is_video=false&description=" + productname;
    urlgoogle = "https://plus.google.com/share?url=" + url;

    $(element).click(function () {
        item = $(this).attr('class');
        switch (item) {
            case "facebook":
                window.open(urlFace, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=0, width=400, height=400");
                break;
            case "twitter":
                window.open(urlTwitter, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=0, width=600, height=600");
                break;
            case "pinterest":
                window.open(urlPint, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=0, width=600, height=600");
                break;
            case "googleplus":
                window.open(urlgoogle, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=0, width=600, height=600");
                break;
        }
        return false;
    });
}

/* ====================================================================== *\
    #Slider product
\* ====================================================================== */
function productSlider($selector) {
    $selector.owlCarousel({
        items: 4,
        autoplay: false,
        nav: false,
        slideBy: getGridSize(),
        mouseDrag: false,
        loop: true,
        rewindNav: true
    });
}

/* ====================================================================== *\
    #Slider comentarios trust vox
\* ====================================================================== */
function sliderComentarios($selector) {
    $selector.owlCarousel({
        items: 1,
        autoplay: false,
        nav: false,
        slideBy: 1,
        mouseDrag: false,
        loop: false,
        rewindNav: false,
        itemsTablet: [768, 1]
    });
}

/* ====================================================================== *\
    #Pontuação por produto clube das beres
\* ====================================================================== */
function clubeBeresPontos(pontos) {
    var total = pontos.replace('R$', '').replace(',', '.');
    var pontuacaoProduct = total * 20;

    if (pontuacaoProduct != "undefined") {
        $('.product-tag .product-clube-pontos').text(parseInt(pontuacaoProduct) + " pontos");
    } else {
        $('.product-details .product-tag').hide();
    }
}

/* ====================================================================== *\
    #Formata moeda
\* ====================================================================== */
function formatReal(int) {
    var tmp = int + '';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    return tmp;
}

/* ====================================================================== *\
    #New seletor sku
\* ====================================================================== */
function selectCor() {
    $('.slider-colors').prepend('<div class="select-cor-new"></div>');
    $('.product-details .product-head').append('<div class="cor-select"><p></p></div>');

    // #Clone seletor sku vtex
    var $selectCor = $('.select.skuList.item-dimension-Escolhaacor .group_0').clone();

    // #Append clone
    $('.select-cor-new').append($selectCor);

    // #Limpa input clone
    $('.select-cor-new span input').each(function (index, item) {
        $(this).remove();
    });

    // #Monta seletor de sku
    var dataskumanager = new DataSkuManager(".select-cor-new");

    /* Funcao de ajustes do carrossel das bolas de cores */
    var ajusteCarroselColors = function ajusteCarroselColors() {

        if ($(window).width() <= 800) return;

        $('.product-details .product-body .slider-colors .slider-actions .slider-prev').css('left', '-30px');
        $('.product-details .product-body .slider-colors .slider-actions .slider-next').css('padding-left', '25px');
        $('.slider-colors').css('margin-left', '-87px');
    };

    /* Ultima bola de cores efeito, pois o afterMove nao dispara no ultimo item (quando nao tem acao) */
    $('.slider-colors .slider-next').live('mousedown', function () {

        $('.slider-colors .owl-item:last').animate({
            opacity: 0.2
        }, 160, function () {
            $('.slider-colors .owl-item:last').animate({ opacity: 1 }, 160);
        });
    });

    // #Monta slider seletor

    // if ($('.select-cor-new > span > label').length > 7 &&  $(window).width() > 768){

    // $('.select-cor-new span').owlCarousel({
    // items: 9,
    // slideBy: 0.25,
    // nav: true,
    // mouseDrag: true,
    // loop: true,
    // rewindNav: false
    // });

    // ajusteCarroselColors();

    // }else if ($('.select-cor-new > span > label').length > 4 && $(window).width() <= 768){
    // $('.select-cor-new span').owlCarousel({
    // items: 7,
    // slideBy: 1,
    // nav: true,
    // mouseDrag: true,
    // loop: true,
    // itemsTablet : [768, 8],
    // itemsMobile : [420, 7],
    // });
    // }else{
    // $('.select-cor-new').addClass('owl-not-slider')
    // $(".slider-colors .slider-actions").hide()
    // }

    // #Monta slider seletor

    //Apenas para o batom mate, subir a nova paleta de cores (pois sera validado com esse produto inicialmente).
    var productsIndisponiveis = document.querySelectorAll(".product-disabled.item_unavailable");
    var inserirDepois2 = document.querySelector('.select-cor-new > span > label :last-child');
    if ($('.select-cor-new > span > label').length > 0) {
        if (BrowserVendor == 'edge/edgehtml' || BrowserVendor == 'ie/trident') {
            for (var i = 0; i < productsIndisponiveis.length; i++) {
                productsIndisponiveis[i].insertAfterr(productsIndisponiveis[i], inserirDepois2);
            }
        } else {
            document.querySelectorAll(".product-disabled.item_unavailable").forEach(function (element) {
                $(element).insertAfter($('.select-cor-new > span > label :last-child'));
            });
        }
    }
    if ($('.select-cor-new > span > label').length > 0 && $(window).width() > 768) {

        //$('.select-cor-new').clone().removeClass('select-cor-new').addClass('big-select-cor-new').insertBefore('.select-cor-new');

        $('.select-cor-new').before("<div class='big-select-cor-new'></div>");
        $('.select-cor-new').append('<div class="ver-todas-as-cores">VER TODAS AS CORES</div>');

        window.setTimeout(function () {
            var img_thumb_inicial = $('.product-image .thumbs img[src*=thumb_]').last().attr('src');
            $('.big-select-cor-new').append($('.select-cor-new label').first().clone());
            if (img_thumb_inicial) $('.big-select-cor-new label').css('background', 'url(' + img_thumb_inicial.replace('55-55', '200-200') + ')');
        }, 2000);
    } else if ($('.select-cor-new > span > label').length > 0 && $(window).width() <= 768) {

        // $('.select-cor-new').before("<div class='big-select-cor-new'></div>");
        // $('.select-cor-new').append('<div class="ver-todas-as-cores abrir">VER TODAS AS CORES</div>');

        // if($(window).width() <= 550) {
        // 	if($('.select-cor-new label').size() >= 12) {
        // 		$('.select-cor-new label').each(function(index) {
        // 			if(index >= 18) $(this).hide();
        // 			if(index >= 12 && index <= 18) $(this).css('height','25px');
        // 		});
        // 	}
        // }

        // window.setTimeout(function(){
        // 	$('.big-select-cor-new').append($('.select-cor-new label').first().clone());
        // },2000);

    } else {
        $('.select-cor-new').addClass('owl-not-slider');
        $(".slider-colors .slider-actions").hide();
    }

    //Eventos
    $('.select-cor-new label').live('click', function () {
        $('.big-select-cor-new label').remove();
        $(this).clone().prependTo($('.big-select-cor-new'));
    });

    $('.ver-todas-as-cores').live('click', function () {
        if ($(this).hasClass('abrir')) {
            $(this).removeClass('abrir');
            $('.select-cor-new label').show().css('height', '50px');
            $(this).text('OCULTAR');
        } else {
            $(this).addClass('abrir');
            $(this).text('VER TODAS AS CORES');
            $('.select-cor-new label').each(function (index) {
                if (index >= 18) $(this).hide();
                if (index >= 12 && index <= 18) $(this).css('height', '25px');
            });
        }
    });

    // #Delegate clique seletor de cor da vtex
    $('.select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label, .slider-colors .select-cor-new span label').on('click', function (event) {
        event.preventDefault();

        $('.slider-colors .select-cor-new span label.current').removeClass('current');
        $('.select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label').removeClass('current');

        $(this).addClass('current');
        $('#' + $(this).attr('for')).click();
        settingsProductPreco();
        aviseme();

        setTimeout(function () {
            imgProduct();
        }, 1000);
    });

    // #Trigger seletor next sku cor
    $('.product-details .product-body .slider-colors .slider-actions .slider-next .ico-prev-sku').on('click', function (event) {
        event.preventDefault();
        $('.select-cor-new span').trigger('owl.next');
    });

    // #Trigger seletor prev sku cor
    $('.product-details .product-body .slider-colors .slider-actions .slider-prev .ico-next-sku').on('click', function (event) {
        event.preventDefault();
        $('.select-cor-new span').trigger('owl.prev');
    });

    // #Return false 
    $('.product-details .product-body .slider-colors .slider-actions .slider-next,.product-details .product-body .slider-colors .slider-actions .slider-prev').on('click', function (event) {
        return false;
    });

    // #Adiciona nome da testura  no click do sku
    $('.select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label, .slider-colors .select-cor-new span label').on('click', function (event) {
        var titleCor = $(this).attr('title');
        $('.cor-select > p').html('cor: ' + titleCor.split('--')[0]);
    });

    // #Produto indisponivel
    $('.select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label').on('click', function (event) {
        $('.product-details .product-content').removeClass('product-indisponivel');
        $('.section-product').removeClass('product-indisponivel');
        aviseme($(this));
    });
}
/* ====================================================================== *\
    #Produto indisponivel
\* ====================================================================== */
function aviseme($this) {
    $('.notifyme-title-div .notifymetitle.notifyme-title').html("<div class='rw-indisponivel'><h3>Produto indisponível :( </h3><h4 class='rw-indisponivel--price'> R$" + parseFloat(dataLayer[0].productListPriceTo).toFixed(2).replace('.', ',') + "</h4></div>");
    if (dataLayer[0].productListPriceTo == 0) {
        $('.rw-indisponivel--price').addClass('hidden');
    }
    setTimeout(function () {
        if ($('.notifyme.sku-notifyme').css('display') == 'block') {
            $('.product-details .product-body .product-actions').addClass('product-disabled-hide');
            $('#product-cal-frete').hide();
            $('.product-details .product-info .product-preco-por').hide();
            $('.product-details .product-tag').hide();
            $('.product-details .product-info .product-parcelamento').hide();
            $('.product-details .product-content').addClass('product-indisponivel');
            $('.section-product').addClass('product-indisponivel');

            if ($('.new-aviseme').length == 0) {
                $('.product-actions').prepend('<div class="new-aviseme active"> <input class="product-aviseme" placeholder="seu email aqui"/> <input type="button" class="btn-send-aviseme" value="me avise!"/></div>');
            } else {
                $('.new-aviseme').addClass('active');
            }

            $('#notifymeClientName').val('Quem disse berenice');

            $('.new-aviseme .product-aviseme').on('keyup', function (event) {
                var email = $('.new-aviseme .product-aviseme').val();
                $('#notifymeClientEmail').val(email);
            });

            $('.new-aviseme  .btn-send-aviseme').on('click', function (event) {
                var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                var email = $('.new-aviseme .product-aviseme').val();

                if (!filtro.test(email)) {
                    $('.new-aviseme .product-aviseme').attr('placeholder', 'entre com um email valido');
                    $('.new-aviseme .product-aviseme').css({ 'color': 'red', 'border': '1px solid red' });
                    return false;
                } else {
                    $('.new-aviseme .product-aviseme').css({ 'color': '#b1b1b1', 'border': '1px solid #b1b1b1' });
                }

                $('#notifymeButtonOK').click();
                $('.product-actions').append('<span class="success-aviseme"> cadastro realizado com sucesso</span>');
            });
        } else {
            $('.product-actions .new-aviseme').removeClass('active');
            $('#product-cal-frete').show();
            $('.product-details .product-info .product-preco-por').show();
            $('.product-details .product-tag').show();
            $('.product-details .product-info .product-parcelamento').show();

            $('.product-details .product-body .product-actions').removeClass('product-disabled-hide');

            if ($('.success-aviseme').length > 0) {
                $('.success-aviseme').hide();
            }
        }
    }, 1000);
}

/* ====================================================================== *\
    #Ficha tecnica mobile
\* ====================================================================== */
function fichaTecnicaMobile() {
    var $descriao = $('#tab1').html();
    var $ficaDica = $('#tab2').html();
    var $fichaTecnica = $('#tab3').html();
    var $precaucoesUso = $('#tab4').html();
    var $avaliacao = $('.section-rating .shell-trustvox').html();
    var $imgDescricao = $('.tab-image').html();

    $('.tabs .tabs-nav li').eq(0).append('<div class="accordion-body descripton"> ' + $descriao + ' </div>');
    $('.tabs .tabs-nav li').eq(1).append('<div class="accordion-body ficaDica"> ' + $ficaDica + ' </div>');
    $('.tabs .tabs-nav li').eq(2).append('<div class="accordion-body fichaTecnica"> ' + $fichaTecnica + ' </div>');
    $('.tabs .tabs-nav li').eq(3).append('<div class="accordion-body precaucoesUso"> ' + $precaucoesUso + ' </div>');
    $('.tabs .tabs-nav li').eq(4).append('<div class="accordion-body avaliacao"> ' + $avaliacao + ' </div>');
    $('.tabs .tabs-nav li').eq(0).find('.productDescription').append('<div class="mobile-img-descricao"> ' + $imgDescricao + ' </div>');

    if ($(window).width() <= 420) {
        $('.tabs .tabs-nav li').eq(0).addClass('current');
        $('.tabs .tabs-nav li a').eq(0).addClass('active');
        $('.tabs .tabs-nav li div').eq(0).addClass('active');
    }

    var $descriptionClone = $('.section-tabs').clone();

    $('.section-product').append($descriptionClone);
    $('.section-tabs').eq(0).addClass('description-top');

    $('.tabs .tabs-nav li > a').on('click', function (event) {
        $(this).toggleClass('active');

        $(this).next('.accordion-body').toggleClass('active');
        return false;
    });
}

/* ====================================================================== *\
    #Testuras img sku
\* ====================================================================== */
function testurasSKU(_this) {
    var title = _this.attr('title');
    var img = _this.attr('data-background');
    if (_this.find('.slide-tooltip').length == 0) {
        _this.append('<div class="slide-tooltip"><img src="' + img + '" height="144" width="167" alt=""><p> ' + title + ' </p> <div class="product-disabled-thumb"><p>cor indisponivel</p></div> </div>');
    }

    // console.log(_this)

    $('.select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label .slide-tooltip').removeClass('hover-tooltip');
    $(_this).find('.slide-tooltip').addClass('hover-tooltip');

    // console.log(title,img)
}

/* ====================================================================== *\
    #TrustVox comentarios
\* ====================================================================== */
var trustVoxReviews = {
    headers: {},
    array: ["#nota#", "#avaliacao#", "#nome#"],
    config: {
        token: '',
        url: ''
    },
    item: '<li class="slide"><h4>' + 'avaliação ' + '<strong>#nota#</strong></h4><p>' + '#avaliacao#' + '</p><p style="text-transform: none !important;">#nome#</p><strong><span>v</span>er todas as avaliações' + '</strong></li>',
    init: function init(config) {
        this.config = config;
        var code = parseInt($('#___rc-p-id').val());
        var settings = {
            url: "http://trustvox.com.br/widget/opinions?code=" + code + "&store_id=4039",
            headers: { "accept": "application/vnd.trustvox-v2+json" }
        };
        $('.slider-entrys ul.slides').html("");
        this.requestReviews(settings);
    },
    requestReviews: function requestReviews(settings) {
        var _self = this;
        $.ajax(settings).done(function (data) {
            var arrayContent = [];
            var htmlContent = "";
            for (var i = 0; i < data.items.length; i++) {
                arrayContent = [(data.items[i].rate * 1).toFixed(1), '"' + data.items[i].opinion + '"', data.items[i].user.name.split(' ')[0]];
                var itemModified = _self.item;

                for (var j = 0; j < _self.array.length; j++) {
                    itemModified = itemModified.replace(_self.array[j], arrayContent[j]);
                }

                if (typeof data.items[i].opinion == 'undefined' || data.items[i].opinion == 'undefined') continue;
                if (data.items[i].rate * 1 < 4) continue;

                htmlContent += itemModified;
            }
            if (data.items.length == 0) {
                $('.slider-entrys ul.slides').append('<li class="slide not-coments"><p> ainda não temos comentários </p><p> a gente acredita que as avaliaçoes têm ser <br> verdadeiras. por isso, você só vai poder opinar <br> depois que comprar e testar o produto </p></li>');
                $('.cols .col.col-1of2 .slider-entrys .slider-actions').hide();
                $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides').removeClass('owl-carousel');
            } else {
                $('.slider-entrys ul.slides').append(htmlContent);
            }
        });
    }
};

var AddToCart = function AddToCart() {
    document.querySelector(".product-buy-button .buy-button").innerHTML = 'Adicionar a Sacola';
    document.querySelector(".product-buy-button .buy-button").addEventListener("click", function (el) {
        el.preventDefault();
        var skuId = "";
        new URL(window.location.href).searchParams.get("idsku") == null ? skuId = document.querySelector(".select-cor-new .group_0 .current").getAttribute("data-idsku") : skuId = new URL(window.location.href).searchParams.get("idsku");
        // console.log(skuId);
        el.srcElement.innerHTML = "Adicionando...";
        el.srcElement.style.opacity = ".7";
        el.srcElement.style.pointerEvents = "none";
        var quantity = void 0;
        vtexjs.checkout.getOrderForm().then(function (orderForm) {
            // console.log(orderForm);
            if (!!orderForm.items.length) {
                orderForm.items.map(function (e, i) {
                    if (e.id == skuId) {
                        quantity = e.quantity;
                        quantity++;
                        var updateItem = {
                            index: i,
                            quantity: quantity
                        };
                        return vtexjs.checkout.updateItems([updateItem]);
                    } else {
                        var newitem = {
                            id: skuId,
                            quantity: 1,
                            seller: '1'
                        };
                        return vtexjs.checkout.addToCart([newitem]);
                    }
                });
            } else {
                var newitem = {
                    id: skuId,
                    quantity: 1,
                    seller: '1'
                };
                return vtexjs.checkout.addToCart([newitem]);
            }
        }).done(function (orderForm) {
            // console.log(orderForm);
            vtexjs.checkout.getOrderForm().then(function (orderForm) {
                window._orderForm = orderForm;
                var qty = 0;
                $(orderForm.items).each(function (ndx, item) {
                    if (!item.isGift) {
                        qty += item.quantity;
                    }
                });
                if (isFinite(qty)) {
                    $('.__cart-link a span').text(qty);
                }
            }).done(function () {
                el.srcElement.innerHTML = 'Adicionar a Sacola';
                el.srcElement.style.opacity = '1';
                el.srcElement.style.pointerEvents = "auto";
                $('html').trigger('open.MiniCart'); // Função em Jquery devido ao evento do Minicart em General.
                // setTimeout(() => {
                //     $('html').trigger('close.MiniCart'); // Função em Jquery devido ao evento do Minicart em General.
                // }, 10000);
            });
        });
    });
};
$(function () {
    if (document.querySelector(".select-cor-new .group_0")) {
        AddToCart();
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMzQyNDVmYzguanMiXSwibmFtZXMiOlsiQnJvd3NlclZlbmRvciIsIm5hdmlnYXRvciIsInZlbmRvciIsIm1hdGNoIiwidXNlckFnZW50IiwiaW5zZXJ0QWZ0ZXJyIiwibmV3Tm9kZSIsInJlZmVyZW5jZU5vZGUiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCIkIiwid2luZG93IiwiZG9jdW1lbnQiLCJ1bmRlZmluZWQiLCIkd2luIiwiJGRvYyIsInJlYWR5IiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJpZCIsImF0dHIiLCJzZXR0aW5nc1Byb2R1Y3RQcmVjbyIsInNldHRpbmdzUHJvZHVjdEZpY2hhVGVjbmljYSIsImNsdWJlQmVyZXNQb250b3MiLCJ0ZXh0Iiwic2hhcmVTb2NpYWwiLCJzZWxlY3RDb3IiLCJhdmlzZW1lIiwiZmxhZ1Byb2RvbW9jYW8iLCJ0cnVzdFZveFJldmlld3MiLCJpbml0IiwidG9rZW4iLCJ1cmwiLCJlcSIsImxlbmd0aCIsImhpZGUiLCJvbiIsImV2ZW50IiwiY2FsY3Vsb0NlcCIsInNqXzAiLCJza3VKc29uXzAiLCJlcnJvciIsIm5hbWUiLCJwcm9kdWN0U2xpZGVyIiwidHJpZ2dlciIsIiR0aGlzIiwicGFyZW50IiwiYWRkQ2xhc3MiLCJzaWJsaW5ncyIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImluZGV4IiwiaXRlbSIsImJvZHkiLCJvZmZzZXRUb3AiLCJ3aWR0aCIsIm9mZnNldCIsInRvcCIsIm9mZmVzZXRUb3AiLCJzdG9wIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImZpY2hhVGVjbmljYU1vYmlsZSIsInNldFRpbWVvdXQiLCJjb29raWUiLCJzaG93Iiwic2V0YXNfYXZhbGlhY2FvX2VmZWl0byIsInNldEludGVydmFsIiwidHJhbnNmb3JtIiwiY3NzIiwibGVmdGVsIiwicGFyc2VJbnQiLCJzcGxpdCIsInJldmVyc2UiLCJmcmlnaHQiLCJzaXplIiwibWFyZ2luUHJvZHVjdENvbnRlbnQiLCJzZWxlY3RDb3JOZXciLCJoZWlnaHQiLCJyZW1vdmVBdHRyIiwicmVzaXplIiwiaW1nUHJvZHVjdCIsInNsaWRlckNvbWVudGFyaW9zIiwicHJlcGVuZCIsImpRdWVyeSIsImh0bWxPZkFycmF5T2ZGbGFncyIsImh0bWxJdGVtT2ZGbGFnIiwiYXJyYXlGbGFncyIsImZsYWdfbmFtZSIsImZsYWdfY2xhc3MiLCJvcmRlcklkIiwiYXJyYXlGbGFnc1Z0ZXgiLCJwdXNoIiwiaSIsImluQXJyYXkiLCJyZXBsYWNlIiwiZ2V0R3JpZFNpemUiLCJpbm5lcldpZHRoIiwic2VsZWN0TG9jYXRpb24iLCJfbG9jYXRpb24iLCJpZFNrdSIsImxvY2F0aW9uIiwic2VhcmNoIiwiRGF0YVNrdU1hbmFnZXIiLCJzZWxlY3Rvckdyb3VwIiwic2VsZWN0b3IiLCJfb3duZXIiLCJwYXRoRGF0YVNrdSIsIm9ialNrdXNJbmZvIiwic2t1TGlzdCIsImxlbmd0aFNrdXMiLCJmaW5kIiwiYXJyU2t1TGlzdCIsImNvbnQiLCJyZWdleCIsInNrdUpzb24iLCJza3VzIiwidmFsdWUiLCJ2YWx1ZXMiLCJpbmRleE9mIiwic2t1IiwidGh1bWIiLCJ0ZXh0dXJlIiwiY2FsbFNrdUpzb25BbmRNb3VudFRodW1icyIsImludElkU2t1Iiwic2t1TmFtZSIsInVybEpTT05Ta3VJbmZvcyIsIm9ialN1Y2VzcyIsInRvdGFsSU1HIiwiZ2V0SlNPTiIsImRhdGEiLCJ0b3RhbEltYWdlcyIsImluZGV4SW1hZ2VzIiwiYXJjaGl2ZVR5cGVJZCIsInVybFRodW1iU2t1IiwiYyIsInRvTG93ZXJDYXNlIiwiSWQiLCJTa3VTZWxsZXJzSW5mb3JtYXRpb24iLCJBdmFpbGFibGVRdWFudGl0eSIsIiRjb3JMYWJlbCIsImdldCIsIkF2YWlsYWJpbGl0eSIsImJlc3RQcmljZSIsIlByaWNlIiwibGlzdFByaWNlIiwiTGlzdFByaWNlIiwibGlnYXIiLCJwZXJjZW50IiwiYXBwZW5kIiwiZG9uZSIsImNvcmVzTmFvRGlzcG9uaXZlaXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJvZHV0b3NDb21EZXNjb250byIsImluc2VyaXJEZXBvaXMiLCJxdWVyeVNlbGVjdG9yIiwiaW5zZXJpckFudGVzIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJpbnNlcnRBZnRlciIsImhyZWYiLCJzcmMiLCJpbWdQcmluY2lwYWxTcmMiLCJzcmNJbWciLCJwcmVjb1BvciIsInByZWNvRGUiLCJwYXJjZWxhUWQiLCJwYXJjZWxhVG90YWwiLCJhdmFsaWFjYW8iLCJtb2RvVXNvIiwiaW1nRGVzY3JpY2FvIiwicmVtb3ZlIiwibW9kb1VzYXIiLCJmaWNhRGljYSIsInByZWNhdWNvZXNVc28iLCJzZWphTmVzc2VQcm9kdXRvIiwiaHRtbCIsInBvcnF1ZUFnZW50ZUFtYVRleHRvUGFkcsOjbyIsInBvcnF1ZUFnZW50ZUFtYSIsImZpY2hhVGVjbmljYSIsImZhZGVJbiIsImZhZGVPdXQiLCJtYXNrIiwiY2VwIiwidmFsIiwicG9zdGFsQ29kZSIsImNvdW50cnkiLCJpdGVtcyIsInF1YW50aXR5Iiwic2VsbGVyIiwidnRleGpzIiwiY2hlY2tvdXQiLCJzaW11bGF0ZVNoaXBwaW5nIiwicmVzdWx0Iiwic2xpZGVEb3duIiwibG9naXN0aWNzSW5mbyIsInNsYXMiLCJwaWNrdXBTdG9yZUluZm8iLCJpc1BpY2t1cFN0b3JlIiwic2hpcHBpbmdFc3RpbWF0ZSIsImZvcm1hdFJlYWwiLCJwcmljZSIsImZyaWVuZGx5TmFtZSIsIm5hb1NlaU1ldUNlcCIsImVuZGVyZWNvIiwiY2lkYWRlIiwiZXN0YWRvIiwiYWpheCIsInByb3RvY29sIiwidHlwZSIsImRhdGFUeXBlIiwiY2FjaGUiLCJzdWNjZXNzIiwiY2VwRW5jb250cmFkbyIsInByb2R1Y3RuYW1lIiwidXJsRmFjZSIsInVybFR3aXR0ZXIiLCJ1cmxQaW50IiwidXJsZ29vZ2xlIiwib3BlbiIsIiRzZWxlY3RvciIsIm93bENhcm91c2VsIiwiYXV0b3BsYXkiLCJuYXYiLCJzbGlkZUJ5IiwibW91c2VEcmFnIiwibG9vcCIsInJld2luZE5hdiIsIml0ZW1zVGFibGV0IiwicG9udG9zIiwidG90YWwiLCJwb250dWFjYW9Qcm9kdWN0IiwiaW50IiwidG1wIiwiJHNlbGVjdENvciIsImNsb25lIiwiZGF0YXNrdW1hbmFnZXIiLCJhanVzdGVDYXJyb3NlbENvbG9ycyIsImxpdmUiLCJvcGFjaXR5IiwicHJvZHVjdHNJbmRpc3Bvbml2ZWlzIiwiaW5zZXJpckRlcG9pczIiLCJiZWZvcmUiLCJpbWdfdGh1bWJfaW5pY2lhbCIsImxhc3QiLCJmaXJzdCIsInByZXBlbmRUbyIsImhhc0NsYXNzIiwidGl0bGVDb3IiLCJwYXJzZUZsb2F0IiwiZGF0YUxheWVyIiwicHJvZHVjdExpc3RQcmljZVRvIiwidG9GaXhlZCIsImVtYWlsIiwiZmlsdHJvIiwidGVzdCIsIiRkZXNjcmlhbyIsIiRmaWNhRGljYSIsIiRmaWNoYVRlY25pY2EiLCIkcHJlY2F1Y29lc1VzbyIsIiRhdmFsaWFjYW8iLCIkaW1nRGVzY3JpY2FvIiwiJGRlc2NyaXB0aW9uQ2xvbmUiLCJ0b2dnbGVDbGFzcyIsIm5leHQiLCJ0ZXN0dXJhc1NLVSIsIl90aGlzIiwidGl0bGUiLCJpbWciLCJoZWFkZXJzIiwiYXJyYXkiLCJjb25maWciLCJjb2RlIiwic2V0dGluZ3MiLCJyZXF1ZXN0UmV2aWV3cyIsIl9zZWxmIiwiYXJyYXlDb250ZW50IiwiaHRtbENvbnRlbnQiLCJyYXRlIiwib3BpbmlvbiIsInVzZXIiLCJpdGVtTW9kaWZpZWQiLCJqIiwiQWRkVG9DYXJ0IiwiaW5uZXJIVE1MIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVsIiwic2t1SWQiLCJVUkwiLCJzZWFyY2hQYXJhbXMiLCJnZXRBdHRyaWJ1dGUiLCJzcmNFbGVtZW50Iiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwiZ2V0T3JkZXJGb3JtIiwidGhlbiIsIm9yZGVyRm9ybSIsIm1hcCIsInVwZGF0ZUl0ZW0iLCJ1cGRhdGVJdGVtcyIsIm5ld2l0ZW0iLCJhZGRUb0NhcnQiLCJfb3JkZXJGb3JtIiwicXR5IiwibmR4IiwiaXNH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LEVBQW1CO0FBQ2Z0UyxzQkFBRSxxQkFBRixFQUF5QmUsSUFBekIsQ0FBOEJ1UixHQUE5QjtBQUNIO0FBQ0osYUFYRCxFQVdHekosSUFYSCxDQVdRLFlBQVk7QUFDaEJ3SSxtQkFBR0ssVUFBSCxDQUFjUCxTQUFkLEdBQTBCLG9CQUExQjtBQUNBRSxtQkFBR0ssVUFBSCxDQUFjQyxLQUFkLENBQW9CckQsT0FBcEIsR0FBOEIsR0FBOUI7QUFDQStDLG1CQUFHSyxVQUFILENBQWNDLEtBQWQsQ0FBb0JDLGFBQXBCLEdBQW9DLE1BQXBDO0FBQ0E1UixrQkFBRSxNQUFGLEVBQVVtQyxPQUFWLENBQWtCLGVBQWxCLEVBSmdCLENBSW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNILGFBbkJEO0FBb0JILFNBbkREO0FBb0RILEtBN0REO0FBOERILENBaEVEO0FBaUVBbkMsRUFBRSxZQUFZO0FBQ1YsUUFBSUUsU0FBU2dKLGFBQVQsQ0FBdUIsMEJBQXZCLENBQUosRUFBd0Q7QUFDcERnSTtBQUNIO0FBQ0osQ0FKRCIsImZpbGUiOiJmYWtlXzM0MjQ1ZmM4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQnJvd3NlclZlbmRvciA9IFwiXCI7XG4oZnVuY3Rpb24gKCkge1xuICAgIGlmIChuYXZpZ2F0b3IudmVuZG9yLm1hdGNoKC9nb29nbGUvaSkpIHtcbiAgICAgICAgQnJvd3NlclZlbmRvciA9ICdjaHJvbWUvYmxpbmsnO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLnZlbmRvci5tYXRjaCgvYXBwbGUvaSkpIHtcbiAgICAgICAgQnJvd3NlclZlbmRvciA9ICdzYWZhcmkvd2Via2l0JztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2ZpcmVmb3hcXC8vaSkpIHtcbiAgICAgICAgQnJvd3NlclZlbmRvciA9ICdmaXJlZm94L2dlY2tvJztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2VkZ2VcXC8vaSkpIHtcbiAgICAgICAgQnJvd3NlclZlbmRvciA9ICdlZGdlL2VkZ2VodG1sJztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3RyaWRlbnRcXC8vaSkpIHtcbiAgICAgICAgQnJvd3NlclZlbmRvciA9ICdpZS90cmlkZW50JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBCcm93c2VyVmVuZG9yID0gbmF2aWdhdG9yLnVzZXJBZ2VudCArIFwiXFxuXCIgKyBuYXZpZ2F0b3IudmVuZG9yO1xuICAgIH1cbn0pKCk7XG5mdW5jdGlvbiBpbnNlcnRBZnRlcnIobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICAgIHJlZmVyZW5jZU5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZS5uZXh0U2libGluZyk7XG59XG5cbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICAgdmFyICR3aW4gPSAkKHdpbmRvdyk7XG4gICAgdmFyICRkb2MgPSAkKGRvY3VtZW50KTtcblxuICAgICRkb2MucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiLnRvcGljID4gbGkgPiBzcGFuIGxhYmVsXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJmb3JcIik7XG4gICAgICAgICAgICAkKFwiI1wiICsgaWQpLmNsaWNrKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICNJbml0IGZ1bmNvZXNcbiAgICAgICAgc2V0dGluZ3NQcm9kdWN0UHJlY28oKTtcbiAgICAgICAgc2V0dGluZ3NQcm9kdWN0RmljaGFUZWNuaWNhKCk7XG4gICAgICAgIGNsdWJlQmVyZXNQb250b3MoJCgnLnBsdWdpbi1wcmVjbyAudmFsb3ItcG9yIC5za3VCZXN0UHJpY2UnKS50ZXh0KCkpO1xuICAgICAgICBzaGFyZVNvY2lhbCgnLnNvY2lhbHMtc2Vjb25kYXJ5IGEnKTtcbiAgICAgICAgc2VsZWN0Q29yKCk7XG4gICAgICAgIGF2aXNlbWUoKTtcbiAgICAgICAgZmxhZ1Byb2RvbW9jYW8oKTtcblxuICAgICAgICB0cnVzdFZveFJldmlld3MuaW5pdCh7XG4gICAgICAgICAgICB0b2tlbjogJzcwNjg0OTA4MTJlMzQxMmM0N2Y3OWZmN2NjMmVlNTI0YWI0ZDk2MWQ5MTZhZTNkMDU2N2EyMmFmMTY3YTllNjcnLFxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly90cnVzdHZveC5jb20uYnIvYXBpL3N0b3Jlcy80MDM5L29waW5pb25zJ1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyAjQnJlYWRjcnVtYnNcbiAgICAgICAgJCgnLmJyZWFkY3J1bWJzIC5icmVhZC1jcnVtYiA+IHVsID4gbGkgPiBhJykuZXEoMCkudGV4dCgncMOhZ2luYSBpbmljaWFsJyk7XG5cbiAgICAgICAgLy8gI1ZhbGlkYSBzZSBleGlzdGUgcHJvZHV0byByZWxhY2lvbmFkbyBzZSBuw6NvIGVzY29uZGUgdGl0dWxvXG4gICAgICAgIGlmICgkKCcuc2xpZGVyLXByb2R1Y3RzLmNvbGxlY3Rpb24uY29sbGVjdGlvbi1wcm9kdWN0cy1yZWxhY2lvbmFkb3MgLnNsaWRlci1jbGlwIC5wcmF0aWxlaXJhJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICQoJy5wcm9kdXRvIC53cmFwcGVyIC53cmFwcGVyLWlubmVyIC5jb250YWluZXIgLm1haW4gLm1haW4taW5uZXIgLnNoZWxsIC5zZWN0aW9uLXByb2R1Y3RzJykuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gI0NhbGN1bGEgQ2VwXG4gICAgICAgICQoJyNwcm9kdWN0LWNhbC1mcmV0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNhbGN1bG9DZXAoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHNqXzAgPSBudWxsO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgc2pfMCA9IHNrdUpzb25fMDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNqXzAgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNdWRhIHTDrXR1bG8gZGEgYXZhbGlhw6fDo28sIGluc2VyaW5kbyBub21lIGRvIHByb2R1dG9cbiAgICAgICAgaWYgKHNqXzAgIT0gdW5kZWZpbmVkKSAkKCcuc2VjdGlvbi1yYXRpbmcgaDInKS50ZXh0KCdhdmFsaWHDp8O1ZXMgKyAnICsgc2t1SnNvbl8wLm5hbWUpO1xuXG4gICAgICAgIC8vIEFkaWNpb25hIGF0cmlidXRvIGFvIGNhbXBvIHZhbG9yIC8gU0VPXG4gICAgICAgICQoJy5wcm9kdWN0LWRldGFpbHMgLnByb2R1Y3QtaW5mbyBzdHJvbmcnKS5hdHRyKCdpdGVtcHJvcCcsICdwcmljZScpO1xuXG4gICAgICAgIC8vIEFkaWNpb25hIGF0cmlidXRvIGFvIGNhbXBvIG5vbWUgZG8gcHJvZHV0byAvIFNFT1xuICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWhlYWQgaDEnKS5hdHRyKCdpdGVtcHJvcCcsICduYW1lJyk7XG5cbiAgICAgICAgLy8gI1NsaWRlIHByb2R1dG9zIHJlbGFjaW9uYWRvc1xuICAgICAgICBpZiAoJCgnLnNsaWRlci1wcm9kdWN0cy5jb2xsZWN0aW9uLmNvbGxlY3Rpb24tcHJvZHVjdHMtcmVsYWNpb25hZG9zIC5zbGlkZXItY2xpcCAucHJhdGlsZWlyYSB1bCcubGVuZ3RoKSkge1xuICAgICAgICAgICAgcHJvZHVjdFNsaWRlcigkKCcuc2xpZGVyLXByb2R1Y3RzLmNvbGxlY3Rpb24uY29sbGVjdGlvbi1wcm9kdWN0cy1yZWxhY2lvbmFkb3MgLnNsaWRlci1jbGlwIC5wcmF0aWxlaXJhIHVsJykpO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXByb2R1Y3RzLmNvbGxlY3Rpb24uY29sbGVjdGlvbi1wcm9kdWN0cy1yZWxhY2lvbmFkb3MgLnNsaWRlci1hY3Rpb25zIC5zbGlkZXItbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlci1wcm9kdWN0cy5jb2xsZWN0aW9uLmNvbGxlY3Rpb24tcHJvZHVjdHMtcmVsYWNpb25hZG9zIC5zbGlkZXItY2xpcCAucHJhdGlsZWlyYSB1bCcpLnRyaWdnZXIoJ293bC5uZXh0Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCgnLnNsaWRlci1wcm9kdWN0cy5jb2xsZWN0aW9uLmNvbGxlY3Rpb24tcHJvZHVjdHMtcmVsYWNpb25hZG9zIC5zbGlkZXItYWN0aW9ucyAuc2xpZGVyLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICQoJy5zbGlkZXItcHJvZHVjdHMuY29sbGVjdGlvbi5jb2xsZWN0aW9uLXByb2R1Y3RzLXJlbGFjaW9uYWRvcyAuc2xpZGVyLWNsaXAgLnByYXRpbGVpcmEgdWwnKS50cmlnZ2VyKCdvd2wucHJldicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAjVGFiIGRlc2NyacOnw6NvcyBcbiAgICAgICAgJCgnLnRhYnMgLnRhYnMtbmF2IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2N1cnJlbnQnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdjdXJyZW50Jyk7XG5cbiAgICAgICAgICAgICQoJy50YWJzIC50YWJzLWJvZHkgLnRhYicpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAkdGhpcykge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQW5pbWF0ZSBhdGUgbyBibG9jbyBkZSBhdmFsaWFjb2VzXG4gICAgICAgICQoJy50cnVzdHZveC1mbHVpZC1qdW1wJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGJvZHkgPSAkKFwiaHRtbCwgYm9keVwiKTtcblxuICAgICAgICAgICAgdmFyIG9mZnNldFRvcCA9IDA7XG5cbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkge1xuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9ICQoJ2xpIGEuYXZhbGlhY29lcycpLmVxKDApLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAkKCdsaSBhLmF2YWxpYWNvZXMnKS5lcSgwKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJCgnLmFjY29yZGlvbi1ib2R5LmF2YWxpYWNhbycpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2ZmZXNldFRvcCA9ICQoJyN0cnVzdHZveC1yZXZpZXdzJykub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBib2R5LnN0b3AoKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBvZmZzZXRUb3AgfSwgJzUwMCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyAjSW1nIHRlc3R1cmEgbm8gaG92ZXIgc2t1XG4gICAgICAgICQoJy5zZWxlY3QtY29yLW5ldyAub3dsLWNhcm91c2VsLm93bC10aGVtZSAub3dsLXdyYXBwZXItb3V0ZXIgLm93bC13cmFwcGVyIC5vd2wtaXRlbSBsYWJlbCcpLm9uKCdob3ZlcicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy90ZXN0dXJhc1NLVSgkKHRoaXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gI1F1ZXJ5IG1vYmlsZVxuICAgICAgICBpZiAoJHdpbi53aWR0aCgpIDwgNzY4KSB7XG4gICAgICAgICAgICAvLyBNb250YSBmaWNoYSB0ZWNuaWNhIG1vYmlsZVxuICAgICAgICAgICAgZmljaGFUZWNuaWNhTW9iaWxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAjUXVlcnkgZGVza3RvcFxuXG4gICAgICAgIC8vIGlmKCR3aW4ud2lkdGgoKSA+IDc2OCkge1xuXG4gICAgICAgIC8vIEFuaW1hw6fDo28gdGFic1xuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrIHRvdWNoJywgJy50b2dnbGUuYXZhbGlhY29lcycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogJCgnLnNlY3Rpb24tcmF0aW5nJykub2Zmc2V0KCkudG9wIC0gMjAgfSwgNTAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHZhciBzal8wID0gbnVsbDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHNqXzAgPSBza3VKc29uXzA7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzal8wID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTXVkYSB0w610dWxvIGRhIGF2YWxpYcOnw6NvLCBpbnNlcmluZG8gbm9tZSBkbyBwcm9kdXRvXG4gICAgICAgIGlmIChzal8wICE9IHVuZGVmaW5lZCkgJCgnLnNlY3Rpb24tcmF0aW5nIGgyJykudGV4dCgnYXZhbGlhw6fDtWVzICsgJyArIHNrdUpzb25fMC5uYW1lKTtcbiAgICAgICAgLy8gQWRpY2lvbmEgYXRyaWJ1dG8gYW8gY2FtcG8gdmFsb3IgLyBTRU9cbiAgICAgICAgJCgnLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC1pbmZvIHN0cm9uZycpLmF0dHIoJ2l0ZW1wcm9wJywgJ3ByaWNlJyk7XG4gICAgICAgIC8vIEFkaWNpb25hIGF0cmlidXRvIGFvIGNhbXBvIG5vbWUgZG8gcHJvZHV0byAvIFNFT1xuICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWhlYWQgaDEnKS5hdHRyKCdpdGVtcHJvcCcsICduYW1lJyk7XG5cbiAgICAgICAgLy8gRGlzcGFyYSBtb2RhbCBjbGllbnRlIGZpZGVsaWRhZGVcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJC5jb29raWUoJ0NsaWVudGVGaWRlbGlkYWRlJykgPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgJCgnLmJhY2tncm91bmQtbW9kYWwtYmVyZSwgLmNvbnRldWRvLW1vZGFsLWJlcmUnKS5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgkKCcucHJvZHVjdC1pbWFnZSAudGFncy1wcm9kdWN0IHAucHJlLXZlbmRhJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuYmFja2dyb3VuZC1tb2RhbC1iZXJlLCAuY29udGV1ZG8tbW9kYWwtYmVyZScpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKCcuYmFja2dyb3VuZC1tb2RhbC1iZXJlLCAuY29udGV1ZG8tbW9kYWwtYmVyZScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgLypjb29raWUgPSBuZXcgQ29va2llO1xyXG4gICAgICAgIGlmIChjb29raWUuZ2V0KCAnQ2xpZW50ZUZpZGVsaWRhZGUnICkpIHtcclxuICAgICAgICAgICAgJCgnLmJhY2tncm91bmQtbW9kYWwtYmVyZSwgLmNvbnRldWRvLW1vZGFsLWJlcmUnKS5oaWRlKCk7XHJcbiAgICAgICAgfSovXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZXRhc19hdmFsaWFjYW9fZWZlaXRvKCkge1xuXG4gICAgICAgIHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSAkKCcuc2VjdGlvbi1pbmZvIC5vd2wtd3JhcHBlcicpLmNzcygndHJhbnNmb3JtJyk7XG5cbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm0gPT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBsZWZ0ZWwgPSBwYXJzZUludCh0cmFuc2Zvcm0uc3BsaXQoJywnKS5yZXZlcnNlKClbMV0pO1xuXG4gICAgICAgICAgICAvL1NldGEgZXNxdWVyZGFcbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm0gPT0gJ25vbmUnIHx8IGxlZnRlbCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNlY3Rpb24taW5mbyAuc2xpZGVyLXByZXYnKS5hZGRDbGFzcygnc2V0YS1uby1lZmZlY3QnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLnNlY3Rpb24taW5mbyAuc2xpZGVyLXByZXYnKS5yZW1vdmVDbGFzcygnc2V0YS1uby1lZmZlY3QnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9TZXRhIGRpcmVpdGFcbiAgICAgICAgICAgIHZhciBmcmlnaHQgPSAkKCcuc2VjdGlvbi1pbmZvIC5vd2wtd3JhcHBlciAub3dsLWl0ZW0nKS5zaXplKCkgKiBwYXJzZUludCgkKCcuc2VjdGlvbi1pbmZvIC5vd2wtd3JhcHBlciAub3dsLWl0ZW06bGFzdCcpLmNzcygnd2lkdGgnKSkgLSBwYXJzZUludCgkKCcuc2VjdGlvbi1pbmZvIC5vd2wtd3JhcHBlciAub3dsLWl0ZW06bGFzdCcpLmNzcygnd2lkdGgnKSk7XG5cbiAgICAgICAgICAgIGlmIChmcmlnaHQgPT0gbGVmdGVsICogLTEgfHwgJCgnLnNlY3Rpb24taW5mbyAub3dsLXdyYXBwZXIgLm93bC1pdGVtJykuc2l6ZSgpID09IDEpIHtcbiAgICAgICAgICAgICAgICAkKCcuc2VjdGlvbi1pbmZvIC5zbGlkZXItbmV4dCcpLmFkZENsYXNzKCdzZXRhLW5vLWVmZmVjdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuc2VjdGlvbi1pbmZvIC5zbGlkZXItbmV4dCcpLnJlbW92ZUNsYXNzKCdzZXRhLW5vLWVmZmVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcmdpblByb2R1Y3RDb250ZW50KCkge1xuXG4gICAgICAgIHZhciBzZWxlY3RDb3JOZXcgPSAkKFwiLnNlbGVjdC1jb3ItbmV3XCIpLmhlaWdodCgpO1xuXG4gICAgICAgIGlmIChzZWxlY3RDb3JOZXcgPiAyMDApIHtcblxuICAgICAgICAgICAgaWYgKCR3aW4ud2lkdGgoKSA8IDEwMDggJiYgJHdpbi53aWR0aCgpID4gNjIwKSB7XG5cbiAgICAgICAgICAgICAgICAkKFwiLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC1jb250ZW50XCIpLmNzcyhcIm1hcmdpbi10b3BcIiwgXCItXCIgKyAoc2VsZWN0Q29yTmV3IC8gMiAtIDIwKSArIFwicHhcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgJChcIi5wcm9kdWN0LWRldGFpbHMgLnByb2R1Y3QtY29udGVudFwiKS5yZW1vdmVBdHRyKFwic3R5bGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkd2luLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIG1hcmdpblByb2R1Y3RDb250ZW50KCk7XG5cbiAgICAgICAgLy8gdGFtYW5obyBkZSBib3ggZGUgY29yXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBtYXJnaW5Qcm9kdWN0Q29udGVudCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyAjUmVkaW1lbmNpb25hIGltZyBwcm9kdXRvXG4gICAgICAgIGltZ1Byb2R1Y3QoKTtcblxuICAgICAgICAvLyAjU2xpZGUgYXZhbGlhw6dvZXNcbiAgICAgICAgaWYgKCQoJy5zbGlkZXItZW50cnlzIC5zbGlkZXItY2xpcCB1bCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgc2xpZGVyQ29tZW50YXJpb3MoJCgnLnNsaWRlci1lbnRyeXMgLnNsaWRlci1jbGlwIHVsJykpO1xuXG4gICAgICAgICAgICAkKCcucHJvZHV0byAud3JhcHBlciAud3JhcHBlci1pbm5lciAuY29udGFpbmVyIC5tYWluIC5tYWluLWlubmVyIC5zaGVsbCAuc2VjdGlvbi1pbmZvIC5jb2xzIC5jb2wgLnNsaWRlci1lbnRyeXMgLnNsaWRlci1hY3Rpb25zIC5zbGlkZXItbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJCgnLnByb2R1dG8gLndyYXBwZXIgLndyYXBwZXItaW5uZXIgLmNvbnRhaW5lciAubWFpbiAubWFpbi1pbm5lciAuc2hlbGwgLnNlY3Rpb24taW5mbyAuY29scyAuY29sIC5zbGlkZXItZW50cnlzIC5zbGlkZXItY2xpcCAuc2xpZGVzJykudHJpZ2dlcignb3dsLm5leHQnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKCcucHJvZHV0byAud3JhcHBlciAud3JhcHBlci1pbm5lciAuY29udGFpbmVyIC5tYWluIC5tYWluLWlubmVyIC5zaGVsbCAuc2VjdGlvbi1pbmZvIC5jb2xzIC5jb2wgLnNsaWRlci1lbnRyeXMgLnNsaWRlci1hY3Rpb25zIC5zbGlkZXItcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJCgnLnByb2R1dG8gLndyYXBwZXIgLndyYXBwZXItaW5uZXIgLmNvbnRhaW5lciAubWFpbiAubWFpbi1pbm5lciAuc2hlbGwgLnNlY3Rpb24taW5mbyAuY29scyAuY29sIC5zbGlkZXItZW50cnlzIC5zbGlkZXItY2xpcCAuc2xpZGVzJykudHJpZ2dlcignb3dsLnByZXYnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gI0FuaW1hw6fDo28gYXZhbGlhw6dvZXMgdG9wXG4gICAgICAgICQoJy5wcm9kdXRvIC53cmFwcGVyIC53cmFwcGVyLWlubmVyIC5jb250YWluZXIgLm1haW4gLm1haW4taW5uZXIgLnNoZWxsIC5zZWN0aW9uLWluZm8gLmNvbHMgLmNvbCAuc2xpZGVyLWVudHJ5cyAuc2xpZGVyLWNsaXAgLnNsaWRlcy5vd2wtY2Fyb3VzZWwgLm93bC13cmFwcGVyLW91dGVyIC5vd2wtd3JhcHBlciAub3dsLWl0ZW0gLnNsaWRlIHN0cm9uZycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQoJy5zZWN0aW9uLXJhdGluZycpLm9mZnNldCgpLnRvcCB9LCA1MDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyMgUXVlcnkgbW9iaWxlXG4gICAgICAgIGlmICgkd2luLndpZHRoKCkgPCA3NjgpIHtcbiAgICAgICAgICAgIC8vICNBbmltYXRlIChQb3IgcXVlIGFzYmVyZXMgYW1hbSlcbiAgICAgICAgICAgICQoJy5wcm9kdXRvIC53cmFwcGVyIC53cmFwcGVyLWlubmVyIC5jb250YWluZXIgLm1haW4gLm1haW4taW5uZXIgLnNoZWxsIC5zZWN0aW9uLWluZm8gLmNvbHMgLmNvbCAuc2xpZGVyLWVudHJ5cyAuc2xpZGVyLWNsaXAgLnNsaWRlcy5vd2wtY2Fyb3VzZWwgLm93bC13cmFwcGVyLW91dGVyIC5vd2wtd3JhcHBlciAub3dsLWl0ZW0gLnNsaWRlIHN0cm9uZycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogJCgnLnNlY3Rpb24tcmF0aW5nJykub2Zmc2V0KCkudG9wIH0sIDUwMCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gI0FkaWNpb25hIGljb25lIHpvb20gbW9iaWxlXG4gICAgICAgICAgICAkKCcjaW1hZ2UgLmltYWdlLXpvb20gLnpvb21QYWQnKS5wcmVwZW5kKCc8aSBjbGFzcz1cImljby16b29tLW1vYmlsZVwiPjwvaT4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIyBTZXRpbmhhcyBkZSBhdmFsaWFjYW8gZG8gcHJvZHV0byBlZmVpdGluaG9cbiAgICAgICAgc2V0YXNfYXZhbGlhY2FvX2VmZWl0bygpO1xuICAgIH0pO1xufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNGbGFnIGRlIHByb21vw6dvZXNcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGZsYWdQcm9kb21vY2FvKCkge1xuICAgIHZhciBodG1sT2ZBcnJheU9mRmxhZ3MgPSBcIlwiO1xuICAgIHZhciBodG1sSXRlbU9mRmxhZyA9IFwiPGxpIGNsYXNzPVxcXCIjZGF0YS1jbGFzcyNcXFwiPiA8YSBocmVmPVxcXCIjXFxcIj4jZGF0YS1mbGFnIzwvYT48L2xpPlwiO1xuXG4gICAgdmFyIGFycmF5RmxhZ3MgPSBbeyBmbGFnX25hbWU6ICdwcm9kdXRvcyB0b3AnLCBmbGFnX2NsYXNzOiAndGFnIHByb2R1dG9zLXRvcCcsIG9yZGVySWQ6IDEgfSwgeyBmbGFnX25hbWU6ICdub3ZpZGFkZScsIGZsYWdfY2xhc3M6ICd0YWcgbm92aWRhZGUnLCBvcmRlcklkOiAyIH0sIHsgZmxhZ19uYW1lOiAnc28gbm8gc290ZScsIGZsYWdfY2xhc3M6ICd0YWcgc28tbm8tc290ZScsIG9yZGVySWQ6IDMgfSwgeyBmbGFnX25hbWU6ICcxNScsIGZsYWdfY2xhc3M6ICd0YWcgMTUnLCBvcmRlcklkOiA0IH0sIHsgZmxhZ19uYW1lOiAnZnJldGUgZ3JhdGlzJywgZmxhZ19jbGFzczogJ3RhZyBmcmV0ZS1ncmF0aXMnLCBvcmRlcklkOiA1IH0sIHsgZmxhZ19uYW1lOiAndGVtcG8gbGltaXRhZG8nLCBmbGFnX2NsYXNzOiAndGFnIHRlbXBvLWxpbWl0YWRvJywgb3JkZXJJZDogNiB9LCB7IGZsYWdfbmFtZTogJ25vaXRlIGRhIGJlbGV6YScsIGZsYWdfY2xhc3M6ICd0YWcgbm9pdGUtZGEtYmVsZXphJywgb3JkZXJJZDogNyB9LCB7IGZsYWdfbmFtZTogJ2xpcXVpZGEgYmVyZScsIGZsYWdfY2xhc3M6ICd0YWcgbGlxdWlkYS1iZXJlJywgb3JkZXJJZDogOCB9LCB7IGZsYWdfbmFtZTogJ2JsYWNrIGZyaWRheScsIGZsYWdfY2xhc3M6ICd0YWcgYmxhY2stZnJpZGF5Jywgb3JkZXJJZDogOSB9LCB7IGZsYWdfbmFtZTogJ2JsYWNrIHdlZWsnLCBmbGFnX2NsYXNzOiAndGFnIGJsYWNrLXdlZWsnLCBvcmRlcklkOiAxMCB9XTtcblxuICAgIGlmICgkKCdib2R5LnByb2R1dG8gLnZ0ZXgtaW1hZ2UgcCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGFycmF5RmxhZ3NWdGV4ID0gW107XG5cbiAgICAgICAgJCgnYm9keS5wcm9kdXRvIC52dGV4LWltYWdlIHAnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xuICAgICAgICAgICAgYXJyYXlGbGFnc1Z0ZXgucHVzaCgkKHRoaXMpLnRleHQoKSk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCQodGhpcykudGV4dCgpKVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5RmxhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgkLmluQXJyYXkoYXJyYXlGbGFnc1tpXS5mbGFnX25hbWUsIGFycmF5RmxhZ3NWdGV4KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBodG1sT2ZBcnJheU9mRmxhZ3MgKz0gaHRtbEl0ZW1PZkZsYWcucmVwbGFjZSgnI2RhdGEtY2xhc3MjJywgYXJyYXlGbGFnc1tpXS5mbGFnX2NsYXNzKS5yZXBsYWNlKCcjZGF0YS1mbGFnIycsIGFycmF5RmxhZ3NbaV0uZmxhZ19uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5wcm9kdWN0LWRldGFpbHMgLnByb2R1Y3QtaW1hZ2UnKS5wcmVwZW5kKCc8dWwgY2xhc3M9XCJ0YWdzXCI+ICcgKyBodG1sT2ZBcnJheU9mRmxhZ3MgKyAnIDwvdWw+Jyk7XG5cbiAgICAgICAgaWYgKCQoJy5wcm9kdWN0LWRldGFpbHMgLnByb2R1Y3QtaW1hZ2UgLnRhZ3MgPiBsaScpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWltYWdlIC50YWdzJykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI0dyaWQgc2xpZGVyIHByb2R1Y3RcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGdldEdyaWRTaXplKCkge1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCA8IDQ4MCA/IDIgOiB3aW5kb3cuaW5uZXJXaWR0aCA8IDEwMjUgPyA0IDogd2luZG93LmlubmVyV2lkdGggPiAxMDI0ID8gNCA6IDQ7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjU2xpZGVyIHByb2R1Y3RcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIHNlbGVjdExvY2F0aW9uKF9sb2NhdGlvbikge1xuICAgIHZhciBpZFNrdSA9IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKC8uKj9pZHNrdT0oXFxkLio/KSgmLip8JCkvLCAnJDEnKTtcbiAgICAkKCdsYWJlbFtkYXRhLWlkc2t1PVwiJyArIGlkU2t1ICsgJ1wiXScpLmNsaWNrKCk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjTW9udGEgaW1nIHNlbGV0b3IgZGUgc2t1XHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgRGF0YVNrdU1hbmFnZXIgPSBmdW5jdGlvbiBEYXRhU2t1TWFuYWdlcihzZWxlY3Rvckdyb3VwKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gc2VsZWN0b3JHcm91cDtcbiAgICB2YXIgX293bmVyID0gRGF0YVNrdU1hbmFnZXI7XG4gICAgdmFyIHBhdGhEYXRhU2t1ID0gXCIvcHJvZHV0by9za3UvXCI7XG4gICAgX293bmVyLm9ialNrdXNJbmZvID0geyBza3VMaXN0OiBbXSB9O1xuXG4gICAgaWYgKCQoc2VsZWN0b3IpLmxlbmd0aCkge1xuICAgICAgICB2YXIgbGVuZ3RoU2t1cyA9ICQoc2VsZWN0b3IpLmZpbmQoXCJsYWJlbFwiKS5sZW5ndGg7XG4gICAgICAgIHZhciBhcnJTa3VMaXN0ID0gW107XG4gICAgICAgIHZhciBjb250O1xuICAgICAgICB2YXIgcmVnZXg7XG5cbiAgICAgICAgaWYgKHNrdUpzb24gPT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgJC5lYWNoKHNrdUpzb24uc2t1cywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgcmVnZXggPSAvXlswLTlcXCxdezAsfVttfHZ8cHxnfG1sXXsxLH0kL2c7XG4gICAgICAgICAgICBpZiAodmFsdWUudmFsdWVzWzBdKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZS52YWx1ZXNbMF0ubWF0Y2gocmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnQgPSB2YWx1ZS52YWx1ZXMubGVuZ3RoIC0gMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnQgPSB2YWx1ZS52YWx1ZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXJyU2t1TGlzdC5pbmRleE9mKHZhbHVlLnZhbHVlc1tjb250XSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyU2t1TGlzdC5wdXNoKHZhbHVlLnZhbHVlc1tjb250XSk7XG4gICAgICAgICAgICAgICAgICAgIF9vd25lci5vYmpTa3VzSW5mby5za3VMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHZhbHVlLnNrdSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHZhbHVlLnZhbHVlc1tjb250XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRodW1iOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmU6ICcnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjYWxsU2t1SnNvbkFuZE1vdW50VGh1bWJzKHZhbHVlLnNrdSwgdmFsdWUudmFsdWVzW2NvbnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGxTa3VKc29uQW5kTW91bnRUaHVtYnMoaW50SWRTa3UsIHNrdU5hbWUpIHtcbiAgICAgICAgdmFyIHVybEpTT05Ta3VJbmZvcyA9IHBhdGhEYXRhU2t1ICsgaW50SWRTa3U7XG4gICAgICAgIHZhciBvYmpTdWNlc3M7XG4gICAgICAgIHZhciB0b3RhbElNRztcbiAgICAgICAgJC5nZXRKU09OKHVybEpTT05Ta3VJbmZvcywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIG9ialN1Y2VzcyA9IGRhdGE7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbEltYWdlcyA9IG9ialN1Y2Vzc1swXVtcIkltYWdlc1wiXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b3RhbEltYWdlcyAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxJbWFnZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4SW1hZ2VzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmNoaXZlVHlwZUlkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmxUaHVtYlNrdSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbElNRyA9IG9ialN1Y2Vzc1swXVtcIkltYWdlc1wiXVtpXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRvdGFsSU1HOyBjKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3VjZXNzWzBdW1wiSW1hZ2VzXCJdW2ldW2NdW1wiTmFtZVwiXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyY2hpdmVUeXBlSWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmxUaHVtYlNrdSA9IG9ialN1Y2Vzc1swXVtcIkltYWdlc1wiXVtpXVtjXVtcIlBhdGhcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3VjZXNzWzBdW1wiSW1hZ2VzXCJdW2ldW2NdW1wiTmFtZVwiXS50b0xvd2VyQ2FzZSgpID09IFwidGh1bWJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmNoaXZlVHlwZUlkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsVGh1bWJTa3UgPSBvYmpTdWNlc3NbMF1bXCJJbWFnZXNcIl1baV1bY11bXCJQYXRoXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmNoaXZlVHlwZUlkID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goX293bmVyLm9ialNrdXNJbmZvLnNrdUxpc3QsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmlkID09IGludElkU2t1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfb3duZXIub2JqU2t1c0luZm8uc2t1TGlzdFtpbmRleF0udGh1bWIgPSB1cmxUaHVtYlNrdTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChzZWxlY3RvcikuZmluZChcImxhYmVsXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2t1TmFtZSA9PSAkKHRoaXMpLnRleHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwidXJsKCdcIiArIHVybFRodW1iU2t1LnJlcGxhY2UoXCI2NS02NS9cIiwgXCIyMDAtMjAwL1wiKS5yZXBsYWNlKFwiMjkyLTI5Mi9cIiwgXCIyMDAtMjAwL1wiKSArIFwiJykgY2VudGVyIGNlbnRlciBuby1yZXBlYXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3RpdGxlJywgJCh0aGlzKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWJhY2tncm91bmQnLCB1cmxUaHVtYlNrdS5yZXBsYWNlKFwiNjUtNjUvXCIsIFwiMjAwLTIwMC9cIikucmVwbGFjZShcIjE0NC0yOTIvXCIsIFwiMjAwLTIwMC9cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWlkU2t1JywgJycgKyBvYmpTdWNlc3NbMF0uSWQgKyAnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWNlc3NbMF0uU2t1U2VsbGVyc0luZm9ybWF0aW9uWzBdLkF2YWlsYWJsZVF1YW50aXR5ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdwcm9kdWN0LWRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkY29yTGFiZWwgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldCgnL3Byb2R1dG8vc2t1LycgKyBpbnRJZFNrdSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGFbMF0uQXZhaWxhYmlsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb3JMYWJlbC5hZGRDbGFzcygnaXRlbV91bmF2YWlsYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZXN0UHJpY2UgPSBkYXRhWzBdLlByaWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGlzdFByaWNlID0gZGF0YVswXS5MaXN0UHJpY2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyaWF2ZWwgcGFyYSBjb250cm9sYXIgYSBmdW5jaW9uYWxpZGFkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGlnYXIgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0UHJpY2UgPiBiZXN0UHJpY2UgJiYgbGlnYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gcGFyc2VJbnQoMTAwIC0gYmVzdFByaWNlIC8gbGlzdFByaWNlICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcGVyY2VudCA9IDEwMCAtIHBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGNvckxhYmVsLmZpbmQoJy5mbGFnLWRpc2NvdW50LXBlcmNlbnQnKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb3JMYWJlbC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJmbGFnLWRpc2NvdW50LXBlcmNlbnQgcGVyY2VudC0nICsgcGVyY2VudCArICdcIj4tICcgKyBwZXJjZW50ICsgJyAlPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKEJyb3dzZXJWZW5kb3IgPT0gJ2VkZ2UvZWRnZWh0bWwnIHx8IEJyb3dzZXJWZW5kb3IgPT0gJ2llL3RyaWRlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3Jlc05hb0Rpc3Bvbml2ZWlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3QtY29yLW5ldyAucHJvZHVjdC1kaXNhYmxlZCwuc2VsZWN0LWNvci1uZXcgLml0ZW1fdW5hdmFpbGFibGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9kdXRvc0NvbURlc2NvbnRvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3QtY29yLW5ldyAuZmxhZy1kaXNjb3VudC1wZXJjZW50XCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zZXJpckRlcG9pcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtY29yLW5ldyA+IHNwYW4gPiBsYWJlbDpsYXN0LWNoaWxkJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnNlcmlyQW50ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0LWNvci1uZXcgPiBzcGFuIGxhYmVsOmZpcnN0LWNoaWxkJyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29yZXNOYW9EaXNwb25pdmVpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0QWZ0ZXJyKGNvcmVzTmFvRGlzcG9uaXZlaXNbaV0sIGluc2VyaXJEZXBvaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHV0b3NDb21EZXNjb250by5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0QWZ0ZXJyKHByb2R1dG9zQ29tRGVzY29udG9baV0ucGFyZW50KFwibGFiZWxcIiksIGluc2VyaXJEZXBvaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHV0b3NDb21EZXNjb250b1tpXS5pbnNlcnRCZWZvcmUoaW5zZXJpckFudGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0LWNvci1uZXcgLnByb2R1Y3QtZGlzYWJsZWQsLnNlbGVjdC1jb3ItbmV3IC5pdGVtX3VuYXZhaWxhYmxlXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJCgnLnNlbGVjdC1jb3ItbmV3ID4gc3BhbiA+IGxhYmVsOmxhc3QtY2hpbGQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNvbG9ycyB1bmF2YWxpYWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0LWNvci1uZXcgLmZsYWctZGlzY291bnQtcGVyY2VudFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnBhcmVudChcImxhYmVsXCIpLmluc2VydEFmdGVyKCQoJy5zZWxlY3QtY29yLW5ldyA+IHNwYW4gbGFiZWw6bGFzdC1jaGlsZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50KFwibGFiZWxcIikuaW5zZXJ0QmVmb3JlKCQoJy5zZWxlY3QtY29yLW5ldyA+IHNwYW4gbGFiZWw6Zmlyc3QtY2hpbGQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRpc2NvdW50IGZpcnN0XCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIHNlbGVjdExvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNSZXBsYWNlIGltZyBwcm9kdXRvXHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBpbWdQcm9kdWN0KCkge1xuICAgICQoJyNzaG93IC50aHVtYnMgbGkgI2JvdGFvWm9vbSBpbWcnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xuICAgICAgICB2YXIgc3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKS5yZXBsYWNlKCctNTUtNTUnLCAnLTIwMC0yMDAnKTtcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdzcmMnLCBzcmMpO1xuICAgIH0pO1xuXG4gICAgdmFyIGltZ1ByaW5jaXBhbFNyYyA9IFwiXCI7XG5cbiAgICBpZiAoJCgnI3Nob3cgI2luY2x1ZGUgI2ltYWdlIC5pbWFnZS16b29tIC56b29tUGFkICNpbWFnZS1tYWluJykubGVuZ3RoID4gMCkge1xuICAgICAgICBpbWdQcmluY2lwYWxTcmMgPSAkKCcjc2hvdyAjaW5jbHVkZSAjaW1hZ2UgLmltYWdlLXpvb20gLnpvb21QYWQgI2ltYWdlLW1haW4nKS5hdHRyKCdzcmMnKTtcbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmluZm8oaW1nUHJpbmNpcGFsU3JjKTtcblxuICAgIGlmIChpbWdQcmluY2lwYWxTcmMgIT0gdW5kZWZpbmVkICYmIGltZ1ByaW5jaXBhbFNyYyAhPSBcIlwiKSB7XG4gICAgICAgIHZhciBzcmNJbWcgPSBpbWdQcmluY2lwYWxTcmMucmVwbGFjZSgnLTI5Mi0yOTInLCAnLTEwMDAtMTAwMCcpO1xuICAgICAgICAkKCcjc2hvdyAjaW5jbHVkZSAjaW1hZ2UgLmltYWdlLXpvb20gLnpvb21QYWQgI2ltYWdlLW1haW4nKS5hdHRyKCdzcmMnLCBzcmNJbWcpO1xuICAgIH1cbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNTZXR0aW5ncyBwcm9kdXRvXHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBzZXR0aW5nc1Byb2R1Y3RQcmVjbygpIHtcbiAgICB2YXIgcHJlY29Qb3IgPSAkKCcucGx1Z2luLXByZWNvIC52YWxvci1wb3IgLnNrdUJlc3RQcmljZScpLnRleHQoKTtcbiAgICB2YXIgcHJlY29EZSA9ICQoJy5kZXNjcmljYW8tcHJlY28gLnZhbG9yLWRlIC5za3VMaXN0UHJpY2UnKS50ZXh0KCk7XG4gICAgdmFyIHBhcmNlbGFRZCA9ICQoJy5wbHVnaW4tcHJlY28gLmRlc2NyaWNhby1wcmVjbyAudmFsb3ItZGl2aWRpZG8gLnNrdUJlc3RJbnN0YWxsbWVudE51bWJlcicpLnRleHQoKTtcbiAgICB2YXIgcGFyY2VsYVRvdGFsID0gJCgnLnBsdWdpbi1wcmVjbyAuZGVzY3JpY2FvLXByZWNvIC52YWxvci1kaXZpZGlkbyAuc2t1QmVzdEluc3RhbGxtZW50VmFsdWUnKS50ZXh0KCk7XG5cbiAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWluZm8gLnByb2R1Y3QtcHJlY28tcG9yJykudGV4dChwcmVjb1Bvcik7XG4gICAgJCgnLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC1pbmZvIC5wcm9kdWN0LXByZWNvLWRlJykudGV4dChwcmVjb0RlKTtcbiAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWluZm8gLnByb2R1Y3QtcGFyY2VsYW1lbnRvJykudGV4dChwYXJjZWxhUWQgKyAnIGRlICcgKyBwYXJjZWxhVG90YWwgKyAnIHNlbSBqdXJvcycpO1xuXG4gICAgaWYgKHByZWNvRGUgPT0gXCJSJCAwLDAwXCIpIHtcbiAgICAgICAgJCgnZGVsLnByb2R1Y3QtcHJlY28tZGUnKS5oaWRlKCk7XG4gICAgfVxufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI01vbnRhIGZpY2hhIHRlY25pY2EgZSBwcm9kdXRvcyBcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIHNldHRpbmdzUHJvZHVjdEZpY2hhVGVjbmljYSgpIHtcbiAgICAvLyAjQXZhbGlhw6dvZXMgXG4gICAgdmFyIGF2YWxpYWNhbyA9ICQoJyNzcG5SYXRpbmdQcm9kdXRvVG9wJykudGV4dCgpO1xuICAgICQoJy5ldmFsdWF0aW9uLXJhdGUtcmVzdWx0JykudGV4dChhdmFsaWFjYW8gKyAnIGF2YWxpYcODwqfDg8K1ZXMnKTtcbiAgICAkKCcucHJvZHVjdC1oZWFkIC5wcm9kdWN0LWV2YWx1YXRpb24gPiBzcGFuJykuY3NzKCd3aWR0aCcsICcnICsgYXZhbGlhY2FvICsgJyUnKTtcblxuICAgIC8vICNNb2RvIGRlIHVzbyBcbiAgICB2YXIgbW9kb1VzbyA9ICQoJy52YWx1ZS1maWVsZC5Nb2RvLWRlLVVzbycpLnRleHQoKTtcbiAgICAkKCcudGFicyAudGFiLWNvbnRlbnQgLnNwZWNpZmljYXRpb24tbW9kby11c2FyID4gcCcpLnRleHQobW9kb1Vzbyk7XG5cbiAgICAvLyAjSW1nIGZpY2hhIHRlY25pY2EgXG4gICAgdmFyIGltZ0Rlc2NyaWNhbyA9ICQoJy52YWx1ZS1maWVsZC5JbWFnZW0tZGVzY3JpY2FvJykuZXEoMCkudGV4dCgpO1xuXG4gICAgaWYgKGltZ0Rlc2NyaWNhbyA9PSBudWxsIHx8IGltZ0Rlc2NyaWNhbyA9PSBcIlwiIHx8IGltZ0Rlc2NyaWNhbyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgJCgnLnNlY3Rpb24tdGFicyAudGFiLWNvbnRlbnQnKS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgJCgnLnNlY3Rpb24tdGFicyAudGFiLWltYWdlIGltZycpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy50YWJzIC50YWItaW1hZ2UnKS5hcHBlbmQoJzxpbWcgc3JjPVwiJyArIGltZ0Rlc2NyaWNhbyArICdcIiBoZWlnaHQ9XCI2MzdcIiB3aWR0aD1cIjQwN1wiLz4nKTtcbiAgICB9XG5cbiAgICAvLyAjUHJlY2F1w6dvZXMgZGUgVXNvXG4gICAgdmFyIG1vZG9Vc2FyID0gJCgnLnNwZWNpZmljYXRpb24tbW9kby11c2FyID4gcCcpLnRleHQoKTtcbiAgICBpZiAobW9kb1VzYXIgPT0gXCJcIiB8fCBtb2RvVXNhciA9PSBudWxsIHx8IG1vZG9Vc2FyID09IHVuZGVmaW5lZCkge1xuICAgICAgICAkKCcjdGFiMSAudGFiLWNvbnRlbnQgaDMnKS5lcSgxKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgLy8gI0ZpY2EgZGljYVxuICAgIHZhciBmaWNhRGljYSA9ICQoJyN0YWIyID4gcCcpLnRleHQoKTtcbiAgICBpZiAoZmljYURpY2EgPT0gbnVsbCB8fCBmaWNhRGljYSA9PSBcIlwiIHx8IGZpY2FEaWNhID09IHVuZGVmaW5lZCkge1xuICAgICAgICAkKCcjdGFiMicpLmhpZGUoKTtcbiAgICAgICAgJCgnLnRhYnMgLnRhYnMtbmF2IGxpJykuZXEoMSkuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vICNQcmVjYcOnb2VzIGRlIHVzb1xuICAgIHZhciBwcmVjYXVjb2VzVXNvID0gJCgnLnZhbHVlLWZpZWxkLlByZWNhdWNvZXMtZGUtVXNvJykudGV4dCgpO1xuICAgIGlmIChwcmVjYXVjb2VzVXNvID09IG51bGwgfHwgcHJlY2F1Y29lc1VzbyA9PSBcIlwiIHx8IHByZWNhdWNvZXNVc28gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICQoJyN0YWIyJykuaGlkZSgpO1xuICAgICAgICAkKCcudGFicyAudGFicy1uYXYgbGknKS5lcSgzKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnI3RhYjQgPiBwJykuYXBwZW5kKHByZWNhdWNvZXNVc28pO1xuICAgIH1cblxuICAgIC8vICNTZSBqb2dhIG5lc3NlIHByb2R1dG9cbiAgICB2YXIgc2VqYU5lc3NlUHJvZHV0byA9ICQoJy52YWx1ZS1maWVsZC5zZS1qb2dhLW5lc3NlLXByb2R1dG8nKS5odG1sKCk7XG4gICAgaWYgKHNlamFOZXNzZVByb2R1dG8gPT0gbnVsbCB8fCBzZWphTmVzc2VQcm9kdXRvID09IFwiXCIgfHwgc2VqYU5lc3NlUHJvZHV0byA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgJCgnLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC1jb250ZW50IHN0cm9uZycpLmhpZGUoKTtcbiAgICAgICAgJCgnLnNlY3Rpb24tcHJvZHVjdCcpLmNzcygnbWFyZ2luLWJvdHRvbScsICcxNzBweCcpO1xuICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWNvbnRlbnQnKS5jc3MoJ3BhZGRpbmctdG9wJywgJzVweCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5wcm9kdWN0LWNvbnRlbnQgLmxpc3QtYnVsbGV0cycpLmFwcGVuZChzZWphTmVzc2VQcm9kdXRvKTtcbiAgICB9XG5cbiAgICAvLyAjUG9yIHF1ZSBhZ2VudGUgYW1hXG4gICAgdmFyIHBvcnF1ZUFnZW50ZUFtYVRleHRvUGFkcsOjbyA9IFwiXCI7XG4gICAgdmFyIHBvcnF1ZUFnZW50ZUFtYSA9ICQoJy52YWx1ZS1maWVsZC5wb3JxdWUtYS1nZW50ZS1hbWEnKS5odG1sKCkgfHwgcG9ycXVlQWdlbnRlQW1hVGV4dG9QYWRyw6NvO1xuXG4gICAgaWYgKHBvcnF1ZUFnZW50ZUFtYSkge1xuXG4gICAgICAgICQoJy5zZWN0aW9uLWVudHJ5IC5saXN0LWhlYXJ0cycpLmFwcGVuZCgnPGxpPiA8cD4nICsgcG9ycXVlQWdlbnRlQW1hICsgJzwvcD48L2xpPicpO1xuICAgIH1cblxuICAgIC8vICNGaWNoYSB0ZWNuaWNhXG4gICAgdmFyIGZpY2hhVGVjbmljYSA9ICQoJ3RkLnZhbHVlLWZpZWxkLkZpY2hhLVRlY25pY2EnKS5odG1sKCk7XG4gICAgaWYgKGZpY2hhVGVjbmljYSA9PSBudWxsIHx8IGZpY2hhVGVjbmljYSA9PSBcIlwiIHx8IGZpY2hhVGVjbmljYSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgJCgnI3RhYjInKS5oaWRlKCk7XG4gICAgICAgICQoJy50YWJzIC50YWJzLW5hdiBsaScpLmVxKDIpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcudGFicy1ib2R5ICN0YWIzJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZmljaGF0LXRlY25pY2FcIj4nICsgZmljaGFUZWNuaWNhICsgJzxkaXYvPicpO1xuICAgIH1cbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNDYWxjdWxvIGRlIGNlcCBcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGNhbGN1bG9DZXAoKSB7XG4gICAgJCgnLm92ZXJsYXktY2VwJykuZmFkZUluKCk7XG4gICAgJCgnI2NsYWN1bG8tZnJldGUnKS5mYWRlSW4oKTtcblxuICAgICQoJy5vdmVybGF5LWNlcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKHRoaXMpLmZhZGVPdXQoKTtcbiAgICAgICAgJCgnI2NsYWN1bG8tZnJldGUnKS5mYWRlT3V0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcub3ZlcmxheS1jZXAnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5mYWRlT3V0KCk7XG4gICAgICAgICQoJyNidXNjYXItY2VwJykuZmFkZU91dCgpO1xuICAgIH0pO1xuXG4gICAgJCgnLmljby1jbG9zZS1jYWxjLWNlcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLnRhYmxlLWluZm8gdGFibGUnKS5odG1sKFwiXCIpO1xuICAgICAgICAkKCcjY2xhY3Vsby1mcmV0ZScpLmZhZGVPdXQoKTtcbiAgICAgICAgJCgnLm92ZXJsYXktY2VwJykuZmFkZU91dCgpO1xuICAgIH0pO1xuXG4gICAgJCgnLmljby1jbG9zZS1idXNjYS1jZXAnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgJCh0aGlzKS5mYWRlT3V0KCk7XG4gICAgICAgICQoJyNidXNjYXItY2VwJykuZmFkZU91dCgpO1xuICAgICAgICAkKCcub3ZlcmxheS1jZXAnKS5mYWRlT3V0KCk7XG4gICAgfSk7XG5cbiAgICAkKFwiaW5wdXRbbmFtZT1maWVsZC1jZXBdXCIpLm1hc2soJzAwMDAwLTAwMCcsIHtcbiAgICAgICAgcmV2ZXJzZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgJCgnLmZvcm0tY29udHJvbHMgLmJ0bi5idG4tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCQoJy50YWJsZS1pbmZvIHRyJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCgnLnRhYmxlLWluZm8gdHInKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjZXAgPSAkKCcuZm9ybS1zdGVwcyAjZmllbGQtY2VwJykudmFsKCk7XG4gICAgICAgIHZhciBwb3N0YWxDb2RlID0gY2VwO1xuICAgICAgICB2YXIgY291bnRyeSA9ICdCUkEnO1xuXG4gICAgICAgIGlmIChjZXAgPT0gXCJcIiB8fCBjZXAgPT0gbnVsbCB8fCBjZXAgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoJCgnLmVycm9yLWNlcC12YXppbycpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NsYWN1bG8tZnJldGUgLmZvcm0tc3RlcHMgZm9ybSAuZm9ybS1zdGVwLmN1cnJlbnQgLmZvcm0tYm9keSAuZm9ybS1pbm5lciAuZm9ybS1yb3cnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJlcnJvci1jZXAtdmF6aW9cIj48aSBjbGFzcz1cImljbyBpY28tZXJyby1mcmV0ZVwiPjwvaT4gPHA+IE9wcyEgbyBjYW1wbyBjZXAgbsOjbyBwb2RlIGVzdGFyIGVtIGJyYW5jby4gPGJyLz4gZGlnaXRlIG8gY2VwIGUgdGVudGUgbm92YW1lbnRlIDwvcD4gPC9kaXY+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoJCgnLmVycm9yLWNlcC12YXppbycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5lcnJvci1jZXAtdmF6aW8nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gW3tcbiAgICAgICAgICAgICAgICBpZDogJCgnLmJ1eS1idXR0b24nKS5hdHRyKCdocmVmJykuaW5kZXhPZignamF2YXNjcmlwdCcpID4gLTEgPyAkKCcjX19fcmMtcC1za3UtaWRzJykudmFsKCkuc3BsaXQoJywnKVswXSA6ICQoJy5idXktYnV0dG9uJykuYXR0cignaHJlZicpLnNwbGl0KCc/JylbMV0uc3BsaXQoJyYnKVswXS5zcGxpdCgnc2t1PScpWzFdLFxuICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxuICAgICAgICAgICAgICAgIHNlbGxlcjogMVxuICAgICAgICAgICAgfV07XG5cbiAgICAgICAgICAgIHZ0ZXhqcy5jaGVja291dC5zaW11bGF0ZVNoaXBwaW5nKGl0ZW1zLCBwb3N0YWxDb2RlLCBjb3VudHJ5KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgJCgnLnRhYmxlLWluZm8nKS5zbGlkZURvd24oKTtcbiAgICAgICAgICAgICAgICBpZiAoJCgnI2NsYWN1bG8tZnJldGUgLnRhYmxlLWluZm8gdHInKS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgJCgnI2NsYWN1bG8tZnJldGUgLnRhYmxlLWluZm8gdHInKS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgICQoJyNjbGFjdWxvLWZyZXRlIC50YWJsZS1pbmZvIHRyJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICQoJy50YWJsZS1pbmZvIHRhYmxlJykuYXBwZW5kKCc8dHI+PHRoPnRpcG88L3RoPjx0aD5wcmF6bzwvdGg+PHRoPnZhbG9yPC90aD48L3RyPicpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5sb2dpc3RpY3NJbmZvWzBdLnNsYXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmxvZ2lzdGljc0luZm9bMF0uc2xhc1tpXS5waWNrdXBTdG9yZUluZm8uaXNQaWNrdXBTdG9yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YWJsZS1pbmZvIHRhYmxlJykuYXBwZW5kKCc8dHI+PHRkPiAnICsgcmVzdWx0LmxvZ2lzdGljc0luZm9bMF0uc2xhc1tpXS5uYW1lICsgJyA8L3RkPjx0ZD4gYXTDqSAnICsgcmVzdWx0LmxvZ2lzdGljc0luZm9bMF0uc2xhc1tpXS5zaGlwcGluZ0VzdGltYXRlLnJlcGxhY2UoJ2JkJywgJycpICsgJyBkaWFzIHV0ZWlzPC90ZD48dGQ+UiQgJyArIGZvcm1hdFJlYWwocmVzdWx0LmxvZ2lzdGljc0luZm9bMF0uc2xhc1tpXS5wcmljZSkgKyAnIDwvdGQ+PC90cj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0LmxvZ2lzdGljc0luZm9bMF0uc2xhc1tpXS5waWNrdXBTdG9yZUluZm8uZnJpZW5kbHlOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGFibGUtaW5mbyB0YWJsZScpLmFwcGVuZCgnPHRyPjx0ZD4gUmV0aXJhZGEgJyArIHJlc3VsdC5sb2dpc3RpY3NJbmZvWzBdLnNsYXNbaV0ucGlja3VwU3RvcmVJbmZvLmZyaWVuZGx5TmFtZSArICcgPC90ZD48dGQ+IGF0w6kgJyArIHJlc3VsdC5sb2dpc3RpY3NJbmZvWzBdLnNsYXNbaV0uc2hpcHBpbmdFc3RpbWF0ZS5yZXBsYWNlKCdiZCcsICcnKSArICcgZGlhcyB1dGVpczwvdGQ+PHRkPlIkICcgKyBmb3JtYXRSZWFsKHJlc3VsdC5sb2dpc3RpY3NJbmZvWzBdLnNsYXNbaV0ucHJpY2UpICsgJyA8L3RkPjwvdHI+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKCcudGFibGUtaW5mbyB0YWJsZScpLmFwcGVuZCgnPHRyPjx0aD50aXBvPC90aD48dGg+cHJhem88L3RoPjx0aD52YWxvcjwvdGg+PC90cj4nKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubG9naXN0aWNzSW5mb1swXS5zbGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5sb2dpc3RpY3NJbmZvWzBdLnNsYXNbaV0ucGlja3VwU3RvcmVJbmZvLmlzUGlja3VwU3RvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGFibGUtaW5mbyB0YWJsZScpLmFwcGVuZCgnPHRyPjx0ZD4gJyArIHJlc3VsdC5sb2dpc3RpY3NJbmZvWzBdLnNsYXNbaV0ubmFtZSArICcgPC90ZD48dGQ+IGF0w6kgJyArIHJlc3VsdC5sb2dpc3RpY3NJbmZvWzBdLnNsYXNbaV0uc2hpcHBpbmdFc3RpbWF0ZS5yZXBsYWNlKCdiZCcsICcnKSArICcgZGlhcyB1dGVpczwvdGQ+PHRkPlIkICcgKyBmb3JtYXRSZWFsKHJlc3VsdC5sb2dpc3RpY3NJbmZvWzBdLnNsYXNbaV0ucHJpY2UpICsgJyA8L3RkPjwvdHI+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdC5sb2dpc3RpY3NJbmZvWzBdLnNsYXNbaV0ucGlja3VwU3RvcmVJbmZvLmZyaWVuZGx5TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRhYmxlLWluZm8gdGFibGUnKS5hcHBlbmQoJzx0cj48dGQ+IFJldGlyYWRhICcgKyByZXN1bHQubG9naXN0aWNzSW5mb1swXS5zbGFzW2ldLnBpY2t1cFN0b3JlSW5mby5mcmllbmRseU5hbWUgKyAnIDwvdGQ+PHRkPiBhdMOpICcgKyByZXN1bHQubG9naXN0aWNzSW5mb1swXS5zbGFzW2ldLnNoaXBwaW5nRXN0aW1hdGUucmVwbGFjZSgnYmQnLCAnJykgKyAnIGRpYXMgdXRlaXM8L3RkPjx0ZD5SJCAnICsgZm9ybWF0UmVhbChyZXN1bHQubG9naXN0aWNzSW5mb1swXS5zbGFzW2ldLnByaWNlKSArICcgPC90ZD48L3RyPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vICNOw6NvIHNlaSBtZXUgY2VwXG4gICAgJCgnLmZvcm0tc3RlcHMgLmZvcm0taW5uZXItc2Vjb25kYXJ5IC5idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbmFvU2VpTWV1Q2VwKCQoJyNidXNjYXItY2VwIC5mb3JtLXN0ZXBzIGZvcm0gLmZvcm0tc3RlcC5jdXJyZW50IC5mb3JtLWJvZHkgLmZvcm0taW5uZXItc2Vjb25kYXJ5IC5mb3JtLXJvdyAuZm9ybS1jb250cm9scyAjZmllbGQtZW5kZXJlY28nKS52YWwoKSwgJCgnI2J1c2Nhci1jZXAgLmZvcm0tc3RlcHMgZm9ybSAuZm9ybS1zdGVwLmN1cnJlbnQgLmZvcm0tYm9keSAuZm9ybS1pbm5lci1zZWNvbmRhcnkgLmZvcm0tcm93IC5mb3JtLWNvbnRyb2xzICNmaWVsZC1jaWRhZGUnKS52YWwoKSwgJCgnI2J1c2Nhci1jZXAgLmZvcm0tc3RlcHMgZm9ybSAuZm9ybS1zdGVwLmN1cnJlbnQgLmZvcm0tYm9keSAuZm9ybS1pbm5lci1zZWNvbmRhcnkgLmZvcm0tcm93IC5mb3JtLWNvbnRyb2xzICNmaWVsZC1lc3RhZG8nKS52YWwoKSk7XG4gICAgfSk7XG5cbiAgICAkKCcuZm9ybS1zdGVwcyAudG9nZ2xlOm5vdCguYnRuKScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjY2xhY3Vsby1mcmV0ZScpLmZhZGVPdXQoKTtcbiAgICAgICAgJCgnI2J1c2Nhci1jZXAnKS5mYWRlSW4oKTtcbiAgICAgICAgJCgnLmZvcm0tc3RlcHMgLmZvcm0taW5uZXItc2Vjb25kYXJ5JykuZmFkZUluKCk7XG4gICAgfSk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjTsOjbyBzZWkgbWV1IGNlcFxyXG5cXCogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZnVuY3Rpb24gbmFvU2VpTWV1Q2VwKGVuZGVyZWNvLCBjaWRhZGUsIGVzdGFkbykge1xuICAgIGlmIChlbmRlcmVjbyA9PSBcIlwiIHx8IGVuZGVyZWNvID09IG51bGwgfHwgZW5kZXJlY28gPT0gdW5kZWZpbmVkIHx8IGNpZGFkZSA9PSBcIlwiIHx8IGNpZGFkZSA9PSBudWxsIHx8IGNpZGFkZSA9PSB1bmRlZmluZWQgfHwgZXN0YWRvID09IFwiXCIgfHwgZXN0YWRvID09IG51bGwgfHwgZXN0YWRvID09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoJCgnLmNvbHMuY2VwLXJlc3VsdCcpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAkKCcjYnVzY2FyLWNlcCAuZm9ybS1zdGVwcyBmb3JtIC5mb3JtLXN0ZXAuY3VycmVudCAuZm9ybS1ib2R5IC5mb3JtLWlubmVyLXNlY29uZGFyeSAuZm9ybS1ncm91cCAuZm9ybS1yb3cnKS5lcSgyKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjb2xzIGNlcC1yZXN1bHRcIj4gPHA+IFByZWVuY2hhIG9zIGNhbXBvcyBjb3JyZXRhbWVudGUgPC9wPiA8L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgkKCcuY29scy5jZXAtcmVzdWx0JykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcuY29scy5jZXAtcmVzdWx0JykucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy92aWFjZXAuY29tLmJyL3dzLycgKyBlc3RhZG8gKyAnLycgKyBjaWRhZGUgKyAnLycgKyBlbmRlcmVjbyArICcvanNvbi8nLFxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCB8fCBkYXRhID09IFwiXCIgfHwgZGF0YSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoJyNidXNjYXItY2VwIC5mb3JtLXN0ZXAgLmZvcm0taW5uZXItc2Vjb25kYXJ5IC5mb3JtLWdyb3VwIC5mb3JtLXJvdyAuZXJyb3ItY2VwLXZhemlvJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNidXNjYXItY2VwIC5mb3JtLXN0ZXBzIGZvcm0gLmZvcm0tc3RlcC5jdXJyZW50IC5mb3JtLWJvZHkgLmZvcm0taW5uZXItc2Vjb25kYXJ5IC5mb3JtLWdyb3VwIC5mb3JtLXJvdycpLmVxKDIpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImVycm9yLWNlcC12YXppb1wiPjxpIGNsYXNzPVwiaWNvIGljby1lcnJvLWZyZXRlXCI+PC9pPiA8cD4gb3BzISBuw6NvIGVuY29udHJhbW9zIG8gY2VwIGluZm9ybWFkby4gPGJyLz4gdmVyaWZpcXVlIHNlIG8gY2VwIGVzdGEgY29ycmV0byA6KCA8L3A+IDwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2J1c2Nhci1jZXAgLmZvcm0tc3RlcHMgLmZvcm0tc3RlcCAuZm9ybS1ib2R5IC5mb3JtLWlubmVyLXNlY29uZGFyeScpLmNzcygnbWluLWhlaWdodCcsICc2MTBweCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNlcEVuY29udHJhZG8gPSBkYXRhWzBdLmNlcDtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2J1c2Nhci1jZXAnKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNidXNjYXItY2VwIC5mb3JtLXN0ZXBzIC5mb3JtLXN0ZXAgLmZvcm0tYm9keSAuZm9ybS1pbm5lci1zZWNvbmRhcnknKS5jc3MoJ21pbi1oZWlnaHQnLCAnNTAwcHgnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NsYWN1bG8tZnJldGUnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2ZpZWxkLWNlcCcpLnZhbChjZXBFbmNvbnRyYWRvKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bi5idG4tdG9nZ2xlJykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNDb21wYXJ0aWxoYXIgcHJvZHV0byBuYXMgcmVkZXMgc29jaWFpc1xyXG5cXCogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZnVuY3Rpb24gc2hhcmVTb2NpYWwoZWxlbWVudCkge1xuICAgIHZhciBwcm9kdWN0bmFtZSwgdXJsRmFjZSwgdXJsVHdpdHRlciwgdXJsUGludCwgdXJsZ29vZ2xlLCBpdGVtO1xuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgIGlmIChza3VKc29uICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9kdWN0bmFtZSA9IHNrdUpzb24ubmFtZTtcbiAgICB9XG5cbiAgICB1cmxGYWNlID0gXCJodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PVwiICsgdXJsICsgXCImdGl0bGU9XCIgKyBwcm9kdWN0bmFtZTtcbiAgICB1cmxUd2l0dGVyID0gXCJodHRwOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3N0YXR1cz1cIiArIHByb2R1Y3RuYW1lICsgXCIrXCIgKyB1cmw7XG4gICAgdXJsUGludCA9IFwiaHR0cDovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9ib29rbWFya2xldC8/bWVkaWE9W01FRElBXSZ1cmw9XCIgKyB1cmwgKyBcIiZpc192aWRlbz1mYWxzZSZkZXNjcmlwdGlvbj1cIiArIHByb2R1Y3RuYW1lO1xuICAgIHVybGdvb2dsZSA9IFwiaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPVwiICsgdXJsO1xuXG4gICAgJChlbGVtZW50KS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0ZW0gPSAkKHRoaXMpLmF0dHIoJ2NsYXNzJyk7XG4gICAgICAgIHN3aXRjaCAoaXRlbSkge1xuICAgICAgICAgICAgY2FzZSBcImZhY2Vib29rXCI6XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsRmFjZSwgXCJfYmxhbmtcIiwgXCJ0b29sYmFyPXllcywgc2Nyb2xsYmFycz15ZXMsIHJlc2l6YWJsZT15ZXMsIHRvcD0wLCBsZWZ0PTAsIHdpZHRoPTQwMCwgaGVpZ2h0PTQwMFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0d2l0dGVyXCI6XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsVHdpdHRlciwgXCJfYmxhbmtcIiwgXCJ0b29sYmFyPXllcywgc2Nyb2xsYmFycz15ZXMsIHJlc2l6YWJsZT15ZXMsIHRvcD0wLCBsZWZ0PTAsIHdpZHRoPTYwMCwgaGVpZ2h0PTYwMFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwaW50ZXJlc3RcIjpcbiAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih1cmxQaW50LCBcIl9ibGFua1wiLCBcInRvb2xiYXI9eWVzLCBzY3JvbGxiYXJzPXllcywgcmVzaXphYmxlPXllcywgdG9wPTAsIGxlZnQ9MCwgd2lkdGg9NjAwLCBoZWlnaHQ9NjAwXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImdvb2dsZXBsdXNcIjpcbiAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih1cmxnb29nbGUsIFwiX2JsYW5rXCIsIFwidG9vbGJhcj15ZXMsIHNjcm9sbGJhcnM9eWVzLCByZXNpemFibGU9eWVzLCB0b3A9MCwgbGVmdD0wLCB3aWR0aD02MDAsIGhlaWdodD02MDBcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI1NsaWRlciBwcm9kdWN0XHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBwcm9kdWN0U2xpZGVyKCRzZWxlY3Rvcikge1xuICAgICRzZWxlY3Rvci5vd2xDYXJvdXNlbCh7XG4gICAgICAgIGl0ZW1zOiA0LFxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIG5hdjogZmFsc2UsXG4gICAgICAgIHNsaWRlQnk6IGdldEdyaWRTaXplKCksXG4gICAgICAgIG1vdXNlRHJhZzogZmFsc2UsXG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIHJld2luZE5hdjogdHJ1ZVxuICAgIH0pO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI1NsaWRlciBjb21lbnRhcmlvcyB0cnVzdCB2b3hcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIHNsaWRlckNvbWVudGFyaW9zKCRzZWxlY3Rvcikge1xuICAgICRzZWxlY3Rvci5vd2xDYXJvdXNlbCh7XG4gICAgICAgIGl0ZW1zOiAxLFxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIG5hdjogZmFsc2UsXG4gICAgICAgIHNsaWRlQnk6IDEsXG4gICAgICAgIG1vdXNlRHJhZzogZmFsc2UsXG4gICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICByZXdpbmROYXY6IGZhbHNlLFxuICAgICAgICBpdGVtc1RhYmxldDogWzc2OCwgMV1cbiAgICB9KTtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNQb250dWHDp8OjbyBwb3IgcHJvZHV0byBjbHViZSBkYXMgYmVyZXNcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGNsdWJlQmVyZXNQb250b3MocG9udG9zKSB7XG4gICAgdmFyIHRvdGFsID0gcG9udG9zLnJlcGxhY2UoJ1IkJywgJycpLnJlcGxhY2UoJywnLCAnLicpO1xuICAgIHZhciBwb250dWFjYW9Qcm9kdWN0ID0gdG90YWwgKiAyMDtcblxuICAgIGlmIChwb250dWFjYW9Qcm9kdWN0ICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgJCgnLnByb2R1Y3QtdGFnIC5wcm9kdWN0LWNsdWJlLXBvbnRvcycpLnRleHQocGFyc2VJbnQocG9udHVhY2FvUHJvZHVjdCkgKyBcIiBwb250b3NcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC10YWcnKS5oaWRlKCk7XG4gICAgfVxufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI0Zvcm1hdGEgbW9lZGFcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGZvcm1hdFJlYWwoaW50KSB7XG4gICAgdmFyIHRtcCA9IGludCArICcnO1xuICAgIHRtcCA9IHRtcC5yZXBsYWNlKC8oWzAtOV17Mn0pJC9nLCBcIiwkMVwiKTtcbiAgICBpZiAodG1wLmxlbmd0aCA+IDYpIHRtcCA9IHRtcC5yZXBsYWNlKC8oWzAtOV17M30pLChbMC05XXsyfSQpL2csIFwiLiQxLCQyXCIpO1xuICAgIHJldHVybiB0bXA7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjTmV3IHNlbGV0b3Igc2t1XHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBzZWxlY3RDb3IoKSB7XG4gICAgJCgnLnNsaWRlci1jb2xvcnMnKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwic2VsZWN0LWNvci1uZXdcIj48L2Rpdj4nKTtcbiAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWhlYWQnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjb3Itc2VsZWN0XCI+PHA+PC9wPjwvZGl2PicpO1xuXG4gICAgLy8gI0Nsb25lIHNlbGV0b3Igc2t1IHZ0ZXhcbiAgICB2YXIgJHNlbGVjdENvciA9ICQoJy5zZWxlY3Quc2t1TGlzdC5pdGVtLWRpbWVuc2lvbi1Fc2NvbGhhYWNvciAuZ3JvdXBfMCcpLmNsb25lKCk7XG5cbiAgICAvLyAjQXBwZW5kIGNsb25lXG4gICAgJCgnLnNlbGVjdC1jb3ItbmV3JykuYXBwZW5kKCRzZWxlY3RDb3IpO1xuXG4gICAgLy8gI0xpbXBhIGlucHV0IGNsb25lXG4gICAgJCgnLnNlbGVjdC1jb3ItbmV3IHNwYW4gaW5wdXQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gI01vbnRhIHNlbGV0b3IgZGUgc2t1XG4gICAgdmFyIGRhdGFza3VtYW5hZ2VyID0gbmV3IERhdGFTa3VNYW5hZ2VyKFwiLnNlbGVjdC1jb3ItbmV3XCIpO1xuXG4gICAgLyogRnVuY2FvIGRlIGFqdXN0ZXMgZG8gY2Fycm9zc2VsIGRhcyBib2xhcyBkZSBjb3JlcyAqL1xuICAgIHZhciBhanVzdGVDYXJyb3NlbENvbG9ycyA9IGZ1bmN0aW9uIGFqdXN0ZUNhcnJvc2VsQ29sb3JzKCkge1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA4MDApIHJldHVybjtcblxuICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWJvZHkgLnNsaWRlci1jb2xvcnMgLnNsaWRlci1hY3Rpb25zIC5zbGlkZXItcHJldicpLmNzcygnbGVmdCcsICctMzBweCcpO1xuICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWJvZHkgLnNsaWRlci1jb2xvcnMgLnNsaWRlci1hY3Rpb25zIC5zbGlkZXItbmV4dCcpLmNzcygncGFkZGluZy1sZWZ0JywgJzI1cHgnKTtcbiAgICAgICAgJCgnLnNsaWRlci1jb2xvcnMnKS5jc3MoJ21hcmdpbi1sZWZ0JywgJy04N3B4Jyk7XG4gICAgfTtcblxuICAgIC8qIFVsdGltYSBib2xhIGRlIGNvcmVzIGVmZWl0bywgcG9pcyBvIGFmdGVyTW92ZSBuYW8gZGlzcGFyYSBubyB1bHRpbW8gaXRlbSAocXVhbmRvIG5hbyB0ZW0gYWNhbykgKi9cbiAgICAkKCcuc2xpZGVyLWNvbG9ycyAuc2xpZGVyLW5leHQnKS5saXZlKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCgnLnNsaWRlci1jb2xvcnMgLm93bC1pdGVtOmxhc3QnKS5hbmltYXRlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuMlxuICAgICAgICB9LCAxNjAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJy5zbGlkZXItY29sb3JzIC5vd2wtaXRlbTpsYXN0JykuYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMTYwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyAjTW9udGEgc2xpZGVyIHNlbGV0b3JcblxuICAgIC8vIGlmICgkKCcuc2VsZWN0LWNvci1uZXcgPiBzcGFuID4gbGFiZWwnKS5sZW5ndGggPiA3ICYmICAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCl7XG5cbiAgICAvLyAkKCcuc2VsZWN0LWNvci1uZXcgc3BhbicpLm93bENhcm91c2VsKHtcbiAgICAvLyBpdGVtczogOSxcbiAgICAvLyBzbGlkZUJ5OiAwLjI1LFxuICAgIC8vIG5hdjogdHJ1ZSxcbiAgICAvLyBtb3VzZURyYWc6IHRydWUsXG4gICAgLy8gbG9vcDogdHJ1ZSxcbiAgICAvLyByZXdpbmROYXY6IGZhbHNlXG4gICAgLy8gfSk7XG5cbiAgICAvLyBhanVzdGVDYXJyb3NlbENvbG9ycygpO1xuXG4gICAgLy8gfWVsc2UgaWYgKCQoJy5zZWxlY3QtY29yLW5ldyA+IHNwYW4gPiBsYWJlbCcpLmxlbmd0aCA+IDQgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KXtcbiAgICAvLyAkKCcuc2VsZWN0LWNvci1uZXcgc3BhbicpLm93bENhcm91c2VsKHtcbiAgICAvLyBpdGVtczogNyxcbiAgICAvLyBzbGlkZUJ5OiAxLFxuICAgIC8vIG5hdjogdHJ1ZSxcbiAgICAvLyBtb3VzZURyYWc6IHRydWUsXG4gICAgLy8gbG9vcDogdHJ1ZSxcbiAgICAvLyBpdGVtc1RhYmxldCA6IFs3NjgsIDhdLFxuICAgIC8vIGl0ZW1zTW9iaWxlIDogWzQyMCwgN10sXG4gICAgLy8gfSk7XG4gICAgLy8gfWVsc2V7XG4gICAgLy8gJCgnLnNlbGVjdC1jb3ItbmV3JykuYWRkQ2xhc3MoJ293bC1ub3Qtc2xpZGVyJylcbiAgICAvLyAkKFwiLnNsaWRlci1jb2xvcnMgLnNsaWRlci1hY3Rpb25zXCIpLmhpZGUoKVxuICAgIC8vIH1cblxuICAgIC8vICNNb250YSBzbGlkZXIgc2VsZXRvclxuXG4gICAgLy9BcGVuYXMgcGFyYSBvIGJhdG9tIG1hdGUsIHN1YmlyIGEgbm92YSBwYWxldGEgZGUgY29yZXMgKHBvaXMgc2VyYSB2YWxpZGFkbyBjb20gZXNzZSBwcm9kdXRvIGluaWNpYWxtZW50ZSkuXG4gICAgdmFyIHByb2R1Y3RzSW5kaXNwb25pdmVpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvZHVjdC1kaXNhYmxlZC5pdGVtX3VuYXZhaWxhYmxlXCIpO1xuICAgIHZhciBpbnNlcmlyRGVwb2lzMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtY29yLW5ldyA+IHNwYW4gPiBsYWJlbCA6bGFzdC1jaGlsZCcpO1xuICAgIGlmICgkKCcuc2VsZWN0LWNvci1uZXcgPiBzcGFuID4gbGFiZWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChCcm93c2VyVmVuZG9yID09ICdlZGdlL2VkZ2VodG1sJyB8fCBCcm93c2VyVmVuZG9yID09ICdpZS90cmlkZW50Jykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9kdWN0c0luZGlzcG9uaXZlaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0c0luZGlzcG9uaXZlaXNbaV0uaW5zZXJ0QWZ0ZXJyKHByb2R1Y3RzSW5kaXNwb25pdmVpc1tpXSwgaW5zZXJpckRlcG9pczIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0LWRpc2FibGVkLml0ZW1fdW5hdmFpbGFibGVcIikuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJCgnLnNlbGVjdC1jb3ItbmV3ID4gc3BhbiA+IGxhYmVsIDpsYXN0LWNoaWxkJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCQoJy5zZWxlY3QtY29yLW5ldyA+IHNwYW4gPiBsYWJlbCcpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcblxuICAgICAgICAvLyQoJy5zZWxlY3QtY29yLW5ldycpLmNsb25lKCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdC1jb3ItbmV3JykuYWRkQ2xhc3MoJ2JpZy1zZWxlY3QtY29yLW5ldycpLmluc2VydEJlZm9yZSgnLnNlbGVjdC1jb3ItbmV3Jyk7XG5cbiAgICAgICAgJCgnLnNlbGVjdC1jb3ItbmV3JykuYmVmb3JlKFwiPGRpdiBjbGFzcz0nYmlnLXNlbGVjdC1jb3ItbmV3Jz48L2Rpdj5cIik7XG4gICAgICAgICQoJy5zZWxlY3QtY29yLW5ldycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cInZlci10b2Rhcy1hcy1jb3Jlc1wiPlZFUiBUT0RBUyBBUyBDT1JFUzwvZGl2PicpO1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWdfdGh1bWJfaW5pY2lhbCA9ICQoJy5wcm9kdWN0LWltYWdlIC50aHVtYnMgaW1nW3NyYyo9dGh1bWJfXScpLmxhc3QoKS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICAgICQoJy5iaWctc2VsZWN0LWNvci1uZXcnKS5hcHBlbmQoJCgnLnNlbGVjdC1jb3ItbmV3IGxhYmVsJykuZmlyc3QoKS5jbG9uZSgpKTtcbiAgICAgICAgICAgIGlmIChpbWdfdGh1bWJfaW5pY2lhbCkgJCgnLmJpZy1zZWxlY3QtY29yLW5ldyBsYWJlbCcpLmNzcygnYmFja2dyb3VuZCcsICd1cmwoJyArIGltZ190aHVtYl9pbmljaWFsLnJlcGxhY2UoJzU1LTU1JywgJzIwMC0yMDAnKSArICcpJyk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgIH0gZWxzZSBpZiAoJCgnLnNlbGVjdC1jb3ItbmV3ID4gc3BhbiA+IGxhYmVsJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcblxuICAgICAgICAvLyAkKCcuc2VsZWN0LWNvci1uZXcnKS5iZWZvcmUoXCI8ZGl2IGNsYXNzPSdiaWctc2VsZWN0LWNvci1uZXcnPjwvZGl2PlwiKTtcbiAgICAgICAgLy8gJCgnLnNlbGVjdC1jb3ItbmV3JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwidmVyLXRvZGFzLWFzLWNvcmVzIGFicmlyXCI+VkVSIFRPREFTIEFTIENPUkVTPC9kaXY+Jyk7XG5cbiAgICAgICAgLy8gaWYoJCh3aW5kb3cpLndpZHRoKCkgPD0gNTUwKSB7XG4gICAgICAgIC8vIFx0aWYoJCgnLnNlbGVjdC1jb3ItbmV3IGxhYmVsJykuc2l6ZSgpID49IDEyKSB7XG4gICAgICAgIC8vIFx0XHQkKCcuc2VsZWN0LWNvci1uZXcgbGFiZWwnKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIC8vIFx0XHRcdGlmKGluZGV4ID49IDE4KSAkKHRoaXMpLmhpZGUoKTtcbiAgICAgICAgLy8gXHRcdFx0aWYoaW5kZXggPj0gMTIgJiYgaW5kZXggPD0gMTgpICQodGhpcykuY3NzKCdoZWlnaHQnLCcyNXB4Jyk7XG4gICAgICAgIC8vIFx0XHR9KTtcbiAgICAgICAgLy8gXHR9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyBcdCQoJy5iaWctc2VsZWN0LWNvci1uZXcnKS5hcHBlbmQoJCgnLnNlbGVjdC1jb3ItbmV3IGxhYmVsJykuZmlyc3QoKS5jbG9uZSgpKTtcbiAgICAgICAgLy8gfSwyMDAwKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5zZWxlY3QtY29yLW5ldycpLmFkZENsYXNzKCdvd2wtbm90LXNsaWRlcicpO1xuICAgICAgICAkKFwiLnNsaWRlci1jb2xvcnMgLnNsaWRlci1hY3Rpb25zXCIpLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvL0V2ZW50b3NcbiAgICAkKCcuc2VsZWN0LWNvci1uZXcgbGFiZWwnKS5saXZlKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLmJpZy1zZWxlY3QtY29yLW5ldyBsYWJlbCcpLnJlbW92ZSgpO1xuICAgICAgICAkKHRoaXMpLmNsb25lKCkucHJlcGVuZFRvKCQoJy5iaWctc2VsZWN0LWNvci1uZXcnKSk7XG4gICAgfSk7XG5cbiAgICAkKCcudmVyLXRvZGFzLWFzLWNvcmVzJykubGl2ZSgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhYnJpcicpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhYnJpcicpO1xuICAgICAgICAgICAgJCgnLnNlbGVjdC1jb3ItbmV3IGxhYmVsJykuc2hvdygpLmNzcygnaGVpZ2h0JywgJzUwcHgnKTtcbiAgICAgICAgICAgICQodGhpcykudGV4dCgnT0NVTFRBUicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWJyaXInKTtcbiAgICAgICAgICAgICQodGhpcykudGV4dCgnVkVSIFRPREFTIEFTIENPUkVTJyk7XG4gICAgICAgICAgICAkKCcuc2VsZWN0LWNvci1uZXcgbGFiZWwnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAxOCkgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDEyICYmIGluZGV4IDw9IDE4KSAkKHRoaXMpLmNzcygnaGVpZ2h0JywgJzI1cHgnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAjRGVsZWdhdGUgY2xpcXVlIHNlbGV0b3IgZGUgY29yIGRhIHZ0ZXhcbiAgICAkKCcuc2VsZWN0LWNvci1uZXcgLm93bC1jYXJvdXNlbC5vd2wtdGhlbWUgLm93bC13cmFwcGVyLW91dGVyIC5vd2wtd3JhcHBlciAub3dsLWl0ZW0gbGFiZWwsIC5zbGlkZXItY29sb3JzIC5zZWxlY3QtY29yLW5ldyBzcGFuIGxhYmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJCgnLnNsaWRlci1jb2xvcnMgLnNlbGVjdC1jb3ItbmV3IHNwYW4gbGFiZWwuY3VycmVudCcpLnJlbW92ZUNsYXNzKCdjdXJyZW50Jyk7XG4gICAgICAgICQoJy5zZWxlY3QtY29yLW5ldyAub3dsLWNhcm91c2VsLm93bC10aGVtZSAub3dsLXdyYXBwZXItb3V0ZXIgLm93bC13cmFwcGVyIC5vd2wtaXRlbSBsYWJlbCcpLnJlbW92ZUNsYXNzKCdjdXJyZW50Jyk7XG5cbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnY3VycmVudCcpO1xuICAgICAgICAkKCcjJyArICQodGhpcykuYXR0cignZm9yJykpLmNsaWNrKCk7XG4gICAgICAgIHNldHRpbmdzUHJvZHVjdFByZWNvKCk7XG4gICAgICAgIGF2aXNlbWUoKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGltZ1Byb2R1Y3QoKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG5cbiAgICAvLyAjVHJpZ2dlciBzZWxldG9yIG5leHQgc2t1IGNvclxuICAgICQoJy5wcm9kdWN0LWRldGFpbHMgLnByb2R1Y3QtYm9keSAuc2xpZGVyLWNvbG9ycyAuc2xpZGVyLWFjdGlvbnMgLnNsaWRlci1uZXh0IC5pY28tcHJldi1za3UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnLnNlbGVjdC1jb3ItbmV3IHNwYW4nKS50cmlnZ2VyKCdvd2wubmV4dCcpO1xuICAgIH0pO1xuXG4gICAgLy8gI1RyaWdnZXIgc2VsZXRvciBwcmV2IHNrdSBjb3JcbiAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWJvZHkgLnNsaWRlci1jb2xvcnMgLnNsaWRlci1hY3Rpb25zIC5zbGlkZXItcHJldiAuaWNvLW5leHQtc2t1Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5zZWxlY3QtY29yLW5ldyBzcGFuJykudHJpZ2dlcignb3dsLnByZXYnKTtcbiAgICB9KTtcblxuICAgIC8vICNSZXR1cm4gZmFsc2UgXG4gICAgJCgnLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC1ib2R5IC5zbGlkZXItY29sb3JzIC5zbGlkZXItYWN0aW9ucyAuc2xpZGVyLW5leHQsLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC1ib2R5IC5zbGlkZXItY29sb3JzIC5zbGlkZXItYWN0aW9ucyAuc2xpZGVyLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLy8gI0FkaWNpb25hIG5vbWUgZGEgdGVzdHVyYSAgbm8gY2xpY2sgZG8gc2t1XG4gICAgJCgnLnNlbGVjdC1jb3ItbmV3IC5vd2wtY2Fyb3VzZWwub3dsLXRoZW1lIC5vd2wtd3JhcHBlci1vdXRlciAub3dsLXdyYXBwZXIgLm93bC1pdGVtIGxhYmVsLCAuc2xpZGVyLWNvbG9ycyAuc2VsZWN0LWNvci1uZXcgc3BhbiBsYWJlbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgdGl0bGVDb3IgPSAkKHRoaXMpLmF0dHIoJ3RpdGxlJyk7XG4gICAgICAgICQoJy5jb3Itc2VsZWN0ID4gcCcpLmh0bWwoJ2NvcjogJyArIHRpdGxlQ29yLnNwbGl0KCctLScpWzBdKTtcbiAgICB9KTtcblxuICAgIC8vICNQcm9kdXRvIGluZGlzcG9uaXZlbFxuICAgICQoJy5zZWxlY3QtY29yLW5ldyAub3dsLWNhcm91c2VsLm93bC10aGVtZSAub3dsLXdyYXBwZXItb3V0ZXIgLm93bC13cmFwcGVyIC5vd2wtaXRlbSBsYWJlbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWNvbnRlbnQnKS5yZW1vdmVDbGFzcygncHJvZHVjdC1pbmRpc3Bvbml2ZWwnKTtcbiAgICAgICAgJCgnLnNlY3Rpb24tcHJvZHVjdCcpLnJlbW92ZUNsYXNzKCdwcm9kdWN0LWluZGlzcG9uaXZlbCcpO1xuICAgICAgICBhdmlzZW1lKCQodGhpcykpO1xuICAgIH0pO1xufVxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNQcm9kdXRvIGluZGlzcG9uaXZlbFxyXG5cXCogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZnVuY3Rpb24gYXZpc2VtZSgkdGhpcykge1xuICAgICQoJy5ub3RpZnltZS10aXRsZS1kaXYgLm5vdGlmeW1ldGl0bGUubm90aWZ5bWUtdGl0bGUnKS5odG1sKFwiPGRpdiBjbGFzcz0ncnctaW5kaXNwb25pdmVsJz48aDM+UHJvZHV0byBpbmRpc3BvbsOtdmVsIDooIDwvaDM+PGg0IGNsYXNzPSdydy1pbmRpc3Bvbml2ZWwtLXByaWNlJz4gUiRcIiArIHBhcnNlRmxvYXQoZGF0YUxheWVyWzBdLnByb2R1Y3RMaXN0UHJpY2VUbykudG9GaXhlZCgyKS5yZXBsYWNlKCcuJywgJywnKSArIFwiPC9oND48L2Rpdj5cIik7XG4gICAgaWYgKGRhdGFMYXllclswXS5wcm9kdWN0TGlzdFByaWNlVG8gPT0gMCkge1xuICAgICAgICAkKCcucnctaW5kaXNwb25pdmVsLS1wcmljZScpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKCcubm90aWZ5bWUuc2t1LW5vdGlmeW1lJykuY3NzKCdkaXNwbGF5JykgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgJCgnLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC1ib2R5IC5wcm9kdWN0LWFjdGlvbnMnKS5hZGRDbGFzcygncHJvZHVjdC1kaXNhYmxlZC1oaWRlJyk7XG4gICAgICAgICAgICAkKCcjcHJvZHVjdC1jYWwtZnJldGUnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWluZm8gLnByb2R1Y3QtcHJlY28tcG9yJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC10YWcnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LWluZm8gLnByb2R1Y3QtcGFyY2VsYW1lbnRvJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLnByb2R1Y3QtZGV0YWlscyAucHJvZHVjdC1jb250ZW50JykuYWRkQ2xhc3MoJ3Byb2R1Y3QtaW5kaXNwb25pdmVsJyk7XG4gICAgICAgICAgICAkKCcuc2VjdGlvbi1wcm9kdWN0JykuYWRkQ2xhc3MoJ3Byb2R1Y3QtaW5kaXNwb25pdmVsJyk7XG5cbiAgICAgICAgICAgIGlmICgkKCcubmV3LWF2aXNlbWUnKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICQoJy5wcm9kdWN0LWFjdGlvbnMnKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwibmV3LWF2aXNlbWUgYWN0aXZlXCI+IDxpbnB1dCBjbGFzcz1cInByb2R1Y3QtYXZpc2VtZVwiIHBsYWNlaG9sZGVyPVwic2V1IGVtYWlsIGFxdWlcIi8+IDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tc2VuZC1hdmlzZW1lXCIgdmFsdWU9XCJtZSBhdmlzZSFcIi8+PC9kaXY+Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5uZXctYXZpc2VtZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnI25vdGlmeW1lQ2xpZW50TmFtZScpLnZhbCgnUXVlbSBkaXNzZSBiZXJlbmljZScpO1xuXG4gICAgICAgICAgICAkKCcubmV3LWF2aXNlbWUgLnByb2R1Y3QtYXZpc2VtZScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9ICQoJy5uZXctYXZpc2VtZSAucHJvZHVjdC1hdmlzZW1lJykudmFsKCk7XG4gICAgICAgICAgICAgICAgJCgnI25vdGlmeW1lQ2xpZW50RW1haWwnKS52YWwoZW1haWwpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJy5uZXctYXZpc2VtZSAgLmJ0bi1zZW5kLWF2aXNlbWUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsdHJvID0gL14oW1xcdy1dKyg/OlxcLltcXHctXSspKilAKCg/OltcXHctXStcXC4pKlxcd1tcXHctXXswLDY2fSlcXC4oW2Etel17Miw2fSg/OlxcLlthLXpdezJ9KT8pJC9pO1xuICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9ICQoJy5uZXctYXZpc2VtZSAucHJvZHVjdC1hdmlzZW1lJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpbHRyby50ZXN0KGVtYWlsKSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcubmV3LWF2aXNlbWUgLnByb2R1Y3QtYXZpc2VtZScpLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ2VudHJlIGNvbSB1bSBlbWFpbCB2YWxpZG8nKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLm5ldy1hdmlzZW1lIC5wcm9kdWN0LWF2aXNlbWUnKS5jc3MoeyAnY29sb3InOiAncmVkJywgJ2JvcmRlcic6ICcxcHggc29saWQgcmVkJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5uZXctYXZpc2VtZSAucHJvZHVjdC1hdmlzZW1lJykuY3NzKHsgJ2NvbG9yJzogJyNiMWIxYjEnLCAnYm9yZGVyJzogJzFweCBzb2xpZCAjYjFiMWIxJyB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkKCcjbm90aWZ5bWVCdXR0b25PSycpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgJCgnLnByb2R1Y3QtYWN0aW9ucycpLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJzdWNjZXNzLWF2aXNlbWVcIj4gY2FkYXN0cm8gcmVhbGl6YWRvIGNvbSBzdWNlc3NvPC9zcGFuPicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcucHJvZHVjdC1hY3Rpb25zIC5uZXctYXZpc2VtZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICQoJyNwcm9kdWN0LWNhbC1mcmV0ZScpLnNob3coKTtcbiAgICAgICAgICAgICQoJy5wcm9kdWN0LWRldGFpbHMgLnByb2R1Y3QtaW5mbyAucHJvZHVjdC1wcmVjby1wb3InKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcucHJvZHVjdC1kZXRhaWxzIC5wcm9kdWN0LXRhZycpLnNob3coKTtcbiAgICAgICAgICAgICQoJy5wcm9kdWN0LWRldGFpbHMgLnByb2R1Y3QtaW5mbyAucHJvZHVjdC1wYXJjZWxhbWVudG8nKS5zaG93KCk7XG5cbiAgICAgICAgICAgICQoJy5wcm9kdWN0LWRldGFpbHMgLnByb2R1Y3QtYm9keSAucHJvZHVjdC1hY3Rpb25zJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3QtZGlzYWJsZWQtaGlkZScpO1xuXG4gICAgICAgICAgICBpZiAoJCgnLnN1Y2Nlc3MtYXZpc2VtZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkKCcuc3VjY2Vzcy1hdmlzZW1lJykuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgMTAwMCk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjRmljaGEgdGVjbmljYSBtb2JpbGVcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGZpY2hhVGVjbmljYU1vYmlsZSgpIHtcbiAgICB2YXIgJGRlc2NyaWFvID0gJCgnI3RhYjEnKS5odG1sKCk7XG4gICAgdmFyICRmaWNhRGljYSA9ICQoJyN0YWIyJykuaHRtbCgpO1xuICAgIHZhciAkZmljaGFUZWNuaWNhID0gJCgnI3RhYjMnKS5odG1sKCk7XG4gICAgdmFyICRwcmVjYXVjb2VzVXNvID0gJCgnI3RhYjQnKS5odG1sKCk7XG4gICAgdmFyICRhdmFsaWFjYW8gPSAkKCcuc2VjdGlvbi1yYXRpbmcgLnNoZWxsLXRydXN0dm94JykuaHRtbCgpO1xuICAgIHZhciAkaW1nRGVzY3JpY2FvID0gJCgnLnRhYi1pbWFnZScpLmh0bWwoKTtcblxuICAgICQoJy50YWJzIC50YWJzLW5hdiBsaScpLmVxKDApLmFwcGVuZCgnPGRpdiBjbGFzcz1cImFjY29yZGlvbi1ib2R5IGRlc2NyaXB0b25cIj4gJyArICRkZXNjcmlhbyArICcgPC9kaXY+Jyk7XG4gICAgJCgnLnRhYnMgLnRhYnMtbmF2IGxpJykuZXEoMSkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvZHkgZmljYURpY2FcIj4gJyArICRmaWNhRGljYSArICcgPC9kaXY+Jyk7XG4gICAgJCgnLnRhYnMgLnRhYnMtbmF2IGxpJykuZXEoMikuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvZHkgZmljaGFUZWNuaWNhXCI+ICcgKyAkZmljaGFUZWNuaWNhICsgJyA8L2Rpdj4nKTtcbiAgICAkKCcudGFicyAudGFicy1uYXYgbGknKS5lcSgzKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJhY2NvcmRpb24tYm9keSBwcmVjYXVjb2VzVXNvXCI+ICcgKyAkcHJlY2F1Y29lc1VzbyArICcgPC9kaXY+Jyk7XG4gICAgJCgnLnRhYnMgLnRhYnMtbmF2IGxpJykuZXEoNCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvZHkgYXZhbGlhY2FvXCI+ICcgKyAkYXZhbGlhY2FvICsgJyA8L2Rpdj4nKTtcbiAgICAkKCcudGFicyAudGFicy1uYXYgbGknKS5lcSgwKS5maW5kKCcucHJvZHVjdERlc2NyaXB0aW9uJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibW9iaWxlLWltZy1kZXNjcmljYW9cIj4gJyArICRpbWdEZXNjcmljYW8gKyAnIDwvZGl2PicpO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQyMCkge1xuICAgICAgICAkKCcudGFicyAudGFicy1uYXYgbGknKS5lcSgwKS5hZGRDbGFzcygnY3VycmVudCcpO1xuICAgICAgICAkKCcudGFicyAudGFicy1uYXYgbGkgYScpLmVxKDApLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCgnLnRhYnMgLnRhYnMtbmF2IGxpIGRpdicpLmVxKDApLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9XG5cbiAgICB2YXIgJGRlc2NyaXB0aW9uQ2xvbmUgPSAkKCcuc2VjdGlvbi10YWJzJykuY2xvbmUoKTtcblxuICAgICQoJy5zZWN0aW9uLXByb2R1Y3QnKS5hcHBlbmQoJGRlc2NyaXB0aW9uQ2xvbmUpO1xuICAgICQoJy5zZWN0aW9uLXRhYnMnKS5lcSgwKS5hZGRDbGFzcygnZGVzY3JpcHRpb24tdG9wJyk7XG5cbiAgICAkKCcudGFicyAudGFicy1uYXYgbGkgPiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICQodGhpcykubmV4dCgnLmFjY29yZGlvbi1ib2R5JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjVGVzdHVyYXMgaW1nIHNrdVxyXG5cXCogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZnVuY3Rpb24gdGVzdHVyYXNTS1UoX3RoaXMpIHtcbiAgICB2YXIgdGl0bGUgPSBfdGhpcy5hdHRyKCd0aXRsZScpO1xuICAgIHZhciBpbWcgPSBfdGhpcy5hdHRyKCdkYXRhLWJhY2tncm91bmQnKTtcbiAgICBpZiAoX3RoaXMuZmluZCgnLnNsaWRlLXRvb2x0aXAnKS5sZW5ndGggPT0gMCkge1xuICAgICAgICBfdGhpcy5hcHBlbmQoJzxkaXYgY2xhc3M9XCJzbGlkZS10b29sdGlwXCI+PGltZyBzcmM9XCInICsgaW1nICsgJ1wiIGhlaWdodD1cIjE0NFwiIHdpZHRoPVwiMTY3XCIgYWx0PVwiXCI+PHA+ICcgKyB0aXRsZSArICcgPC9wPiA8ZGl2IGNsYXNzPVwicHJvZHVjdC1kaXNhYmxlZC10aHVtYlwiPjxwPmNvciBpbmRpc3Bvbml2ZWw8L3A+PC9kaXY+IDwvZGl2PicpO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKF90aGlzKVxuXG4gICAgJCgnLnNlbGVjdC1jb3ItbmV3IC5vd2wtY2Fyb3VzZWwub3dsLXRoZW1lIC5vd2wtd3JhcHBlci1vdXRlciAub3dsLXdyYXBwZXIgLm93bC1pdGVtIGxhYmVsIC5zbGlkZS10b29sdGlwJykucmVtb3ZlQ2xhc3MoJ2hvdmVyLXRvb2x0aXAnKTtcbiAgICAkKF90aGlzKS5maW5kKCcuc2xpZGUtdG9vbHRpcCcpLmFkZENsYXNzKCdob3Zlci10b29sdGlwJyk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh0aXRsZSxpbWcpXG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjVHJ1c3RWb3ggY29tZW50YXJpb3NcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciB0cnVzdFZveFJldmlld3MgPSB7XG4gICAgaGVhZGVyczoge30sXG4gICAgYXJyYXk6IFtcIiNub3RhI1wiLCBcIiNhdmFsaWFjYW8jXCIsIFwiI25vbWUjXCJdLFxuICAgIGNvbmZpZzoge1xuICAgICAgICB0b2tlbjogJycsXG4gICAgICAgIHVybDogJydcbiAgICB9LFxuICAgIGl0ZW06ICc8bGkgY2xhc3M9XCJzbGlkZVwiPjxoND4nICsgJ2F2YWxpYcOnw6NvICcgKyAnPHN0cm9uZz4jbm90YSM8L3N0cm9uZz48L2g0PjxwPicgKyAnI2F2YWxpYWNhbyMnICsgJzwvcD48cCBzdHlsZT1cInRleHQtdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XCI+I25vbWUjPC9wPjxzdHJvbmc+PHNwYW4+djwvc3Bhbj5lciB0b2RhcyBhcyBhdmFsaWHDp8O1ZXMnICsgJzwvc3Ryb25nPjwvbGk+JyxcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGNvbmZpZykge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdmFyIGNvZGUgPSBwYXJzZUludCgkKCcjX19fcmMtcC1pZCcpLnZhbCgpKTtcbiAgICAgICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly90cnVzdHZveC5jb20uYnIvd2lkZ2V0L29waW5pb25zP2NvZGU9XCIgKyBjb2RlICsgXCImc3RvcmVfaWQ9NDAzOVwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBcImFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL3ZuZC50cnVzdHZveC12Mitqc29uXCIgfVxuICAgICAgICB9O1xuICAgICAgICAkKCcuc2xpZGVyLWVudHJ5cyB1bC5zbGlkZXMnKS5odG1sKFwiXCIpO1xuICAgICAgICB0aGlzLnJlcXVlc3RSZXZpZXdzKHNldHRpbmdzKTtcbiAgICB9LFxuICAgIHJlcXVlc3RSZXZpZXdzOiBmdW5jdGlvbiByZXF1ZXN0UmV2aWV3cyhzZXR0aW5ncykge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoc2V0dGluZ3MpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBhcnJheUNvbnRlbnQgPSBbXTtcbiAgICAgICAgICAgIHZhciBodG1sQ29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhcnJheUNvbnRlbnQgPSBbKGRhdGEuaXRlbXNbaV0ucmF0ZSAqIDEpLnRvRml4ZWQoMSksICdcIicgKyBkYXRhLml0ZW1zW2ldLm9waW5pb24gKyAnXCInLCBkYXRhLml0ZW1zW2ldLnVzZXIubmFtZS5zcGxpdCgnICcpWzBdXTtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbU1vZGlmaWVkID0gX3NlbGYuaXRlbTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgX3NlbGYuYXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbU1vZGlmaWVkID0gaXRlbU1vZGlmaWVkLnJlcGxhY2UoX3NlbGYuYXJyYXlbal0sIGFycmF5Q29udGVudFtqXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLml0ZW1zW2ldLm9waW5pb24gPT0gJ3VuZGVmaW5lZCcgfHwgZGF0YS5pdGVtc1tpXS5vcGluaW9uID09ICd1bmRlZmluZWQnKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pdGVtc1tpXS5yYXRlICogMSA8IDQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaHRtbENvbnRlbnQgKz0gaXRlbU1vZGlmaWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuaXRlbXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyLWVudHJ5cyB1bC5zbGlkZXMnKS5hcHBlbmQoJzxsaSBjbGFzcz1cInNsaWRlIG5vdC1jb21lbnRzXCI+PHA+IGFpbmRhIG7Do28gdGVtb3MgY29tZW50w6FyaW9zIDwvcD48cD4gYSBnZW50ZSBhY3JlZGl0YSBxdWUgYXMgYXZhbGlhw6dvZXMgdMOqbSBzZXIgPGJyPiB2ZXJkYWRlaXJhcy4gcG9yIGlzc28sIHZvY8OqIHPDsyB2YWkgcG9kZXIgb3BpbmFyIDxicj4gZGVwb2lzIHF1ZSBjb21wcmFyIGUgdGVzdGFyIG8gcHJvZHV0byA8L3A+PC9saT4nKTtcbiAgICAgICAgICAgICAgICAkKCcuY29scyAuY29sLmNvbC0xb2YyIC5zbGlkZXItZW50cnlzIC5zbGlkZXItYWN0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKCcucHJvZHV0byAud3JhcHBlciAud3JhcHBlci1pbm5lciAuY29udGFpbmVyIC5tYWluIC5tYWluLWlubmVyIC5zaGVsbCAuc2VjdGlvbi1pbmZvIC5jb2xzIC5jb2wgLnNsaWRlci1lbnRyeXMgLnNsaWRlci1jbGlwIC5zbGlkZXMnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5zbGlkZXItZW50cnlzIHVsLnNsaWRlcycpLmFwcGVuZChodG1sQ29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbnZhciBBZGRUb0NhcnQgPSBmdW5jdGlvbiBBZGRUb0NhcnQoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9kdWN0LWJ1eS1idXR0b24gLmJ1eS1idXR0b25cIikuaW5uZXJIVE1MID0gJ0FkaWNpb25hciBhIFNhY29sYSc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9kdWN0LWJ1eS1idXR0b24gLmJ1eS1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBlbC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgc2t1SWQgPSBcIlwiO1xuICAgICAgICBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5zZWFyY2hQYXJhbXMuZ2V0KFwiaWRza3VcIikgPT0gbnVsbCA/IHNrdUlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3QtY29yLW5ldyAuZ3JvdXBfMCAuY3VycmVudFwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkc2t1XCIpIDogc2t1SWQgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5zZWFyY2hQYXJhbXMuZ2V0KFwiaWRza3VcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNrdUlkKTtcbiAgICAgICAgZWwuc3JjRWxlbWVudC5pbm5lckhUTUwgPSBcIkFkaWNpb25hbmRvLi4uXCI7XG4gICAgICAgIGVsLnNyY0VsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiLjdcIjtcbiAgICAgICAgZWwuc3JjRWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgIHZhciBxdWFudGl0eSA9IHZvaWQgMDtcbiAgICAgICAgdnRleGpzLmNoZWNrb3V0LmdldE9yZGVyRm9ybSgpLnRoZW4oZnVuY3Rpb24gKG9yZGVyRm9ybSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cob3JkZXJGb3JtKTtcbiAgICAgICAgICAgIGlmICghIW9yZGVyRm9ybS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvcmRlckZvcm0uaXRlbXMubWFwKGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmlkID09IHNrdUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eSA9IGUucXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHk6IHF1YW50aXR5XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZ0ZXhqcy5jaGVja291dC51cGRhdGVJdGVtcyhbdXBkYXRlSXRlbV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld2l0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHNrdUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGxlcjogJzEnXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZ0ZXhqcy5jaGVja291dC5hZGRUb0NhcnQoW25ld2l0ZW1dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3aXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHNrdUlkLFxuICAgICAgICAgICAgICAgICAgICBxdWFudGl0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgc2VsbGVyOiAnMSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiB2dGV4anMuY2hlY2tvdXQuYWRkVG9DYXJ0KFtuZXdpdGVtXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKG9yZGVyRm9ybSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cob3JkZXJGb3JtKTtcbiAgICAgICAgICAgIHZ0ZXhqcy5jaGVja291dC5nZXRPcmRlckZvcm0oKS50aGVuKGZ1bmN0aW9uIChvcmRlckZvcm0pIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuX29yZGVyRm9ybSA9IG9yZGVyRm9ybTtcbiAgICAgICAgICAgICAgICB2YXIgcXR5ID0gMDtcbiAgICAgICAgICAgICAgICAkKG9yZGVyRm9ybS5pdGVtcykuZWFjaChmdW5jdGlvbiAobmR4LCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5pc0dpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF0eSArPSBpdGVtLnF1YW50aXR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRmluaXRlKHF0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLl9fY2FydC1saW5rIGEgc3BhbicpLnRleHQocXR5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBlbC5zcmNFbGVtZW50LmlubmVySFRNTCA9ICdBZGljaW9uYXIgYSBTYWNvbGEnO1xuICAgICAgICAgICAgICAgIGVsLnNyY0VsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgICAgICBlbC5zcmNFbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcbiAgICAgICAgICAgICAgICAkKCdodG1sJykudHJpZ2dlcignb3Blbi5NaW5pQ2FydCcpOyAvLyBGdW7Dp8OjbyBlbSBKcXVlcnkgZGV2aWRvIGFvIGV2ZW50byBkbyBNaW5pY2FydCBlbSBHZW5lcmFsLlxuICAgICAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICAkKCdodG1sJykudHJpZ2dlcignY2xvc2UuTWluaUNhcnQnKTsgLy8gRnVuw6fDo28gZW0gSnF1ZXJ5IGRldmlkbyBhbyBldmVudG8gZG8gTWluaWNhcnQgZW0gR2VuZXJhbC5cbiAgICAgICAgICAgICAgICAvLyB9LCAxMDAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuJChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0LWNvci1uZXcgLmdyb3VwXzBcIikpIHtcbiAgICAgICAgQWRkVG9DYXJ0KCk7XG4gICAgfVxufSk7Il19
},{}]},{},[1])