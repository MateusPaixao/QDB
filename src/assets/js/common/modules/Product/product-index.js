// import Features from './Components/Features/features.jsx'
// import setPeopleInPage from './Components/Features/_peopleInPage.jsx'

const Methods = {
    init(){
        // Methods.GetProduct();
        // Features.init();
        Methods.oldProduct();
        Methods.exclusiveOnEcommerce();
    },
    GetProduct() {
        fetch("/api/catalog_system/pub/products/search" + window.location.pathname)
            .then(response => response.json())
            .then(Product => {
                // console.log(Product[0]);
                let skuId = [...document.querySelectorAll(".select-cor-new .group_0 label")].find(label => label.classList.contains("current")) != undefined ? skuId = document.querySelector(".select-cor-new .group_0 .current").getAttribute("data-idsku") : skuId = new URL(window.location.href).searchParams.get("idsku");
                // console.log("skuid ", skuId);
                let Sku = Product[0].items.find(e => e.itemId == skuId);
                console.log(Sku);
                // window.innerWidth < 768 ? document.querySelector(".product-buy-button").after(document.querySelector("#people-seeing--render")) : "";
                // Sku.sellers[0].commertialOffer.Price - Sku.sellers[0].commertialOffer.ListPrice != 0 ? Features.setPeopleInPage(30, 15) : Features.setPeopleInPage(5, 1);
                // Sku.sellers[0].commertialOffer.AvailableQuantity <= 10 ? Features.setStockLeft(Sku.sellers[0].commertialOffer.AvailableQuantity) : "";
            })
    },
    oldProduct() {
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

        let AddToCart = () => {
            document.querySelector(".product-buy-button .buy-button").innerHTML = 'Adicionar a Sacola';
            document.querySelector(".product-buy-button .buy-button").addEventListener("click", function (el) {
                el.preventDefault();
                let skuId = "";
                skuId = [...document.querySelectorAll(".select-cor-new .group_0 label")].find(label => label.classList.contains("current")) != undefined ? skuId = document.querySelector(".select-cor-new .group_0 .current").getAttribute("data-idsku") : skuId = new URL(window.location.href).searchParams.get("idsku");
                if(skuId == null || skuId == undefined){
                    fetch("/api/catalog_system/pub/products/search" + window.location.pathname)
                    .then(response => response.json())
                    .then((Product) =>{
                        skuId = Product[0].items[0].itemId;
                    })
                }
                // console.log(skuId);
                el.srcElement.innerHTML = "Adicionando...";
                el.srcElement.style.opacity = ".7";
                el.srcElement.style.pointerEvents = "none";
                let quantity;
                vtexjs.checkout.getOrderForm().then(function (orderForm) {
                        // console.log(orderForm);
                        if (!!orderForm.items.length) {
                            orderForm.items.map((e, i) => {
                                if (e.id == skuId) {
                                    quantity = e.quantity;
                                    quantity++
                                    let updateItem = {
                                        index: i,
                                        quantity: quantity
                                    };
                                    return vtexjs.checkout.updateItems([updateItem]);
                                } else {
                                    let newitem = {
                                        id: skuId,
                                        quantity: 1,
                                        seller: '1'
                                    };
                                    return vtexjs.checkout.addToCart([newitem]);
                                }
                            })
                        } else {
                            let newitem = {
                                id: skuId,
                                quantity: 1,
                                seller: '1'
                            };
                            return vtexjs.checkout.addToCart([newitem]);
                        }
                    })
                    .done(function (orderForm) {
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
        }

        (function ($, window, document, undefined) {
            var $win = $(window);
            var $doc = $(document);
            fetch("/api/catalog_system/pub/products/search" + window.location.pathname, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                return response.json();
            }).then((prod) => {
                window.cProduct = prod[0];
                console.log(window.cProduct);
                $doc.ready(function () {
                    $(".topic > li > span label").click(function (e) {
                        e.preventDefault();
                        var id = $(this).attr("for");
                        $("#" + id).click();
                    });

                    if ($(".select-cor-new .group_0")) {
                        AddToCart();
                    }
                    // #Init funcoes
                    let sku = [...document.querySelectorAll(".select-cor-new .group_0 label")].find(label => label.classList.contains("current")) != undefined ? document.querySelector(".select-cor-new .group_0 .current").getAttribute("data-idsku") : new URL(window.location.href).searchParams.get("idsku");
                    if(sku == null || sku == undefined){
                        fetch("/api/catalog_system/pub/products/search" + window.location.pathname)
                        .then(response => response.json())
                        .then((Product) =>{
                            sku = Product[0].items[0].itemId;
                            settingsProductPreco(sku);
                        })
                    }else{
                        settingsProductPreco(sku);
                    }
                    settingsProductFichaTecnica();  
                    clubeBeresPontos($('.plugin-preco .valor-por .skuBestPrice').text());
                    shareSocial('.socials-secondary a');
                    selectCor();
                    aviseme();
                    flagProdomocao();

                    trustVoxReviews.init({
                        token: '7068490812e3412c47f79ff7cc2ee524ab4d961d916ae3d0567a22af167a9e67',
                        url: 'https://trustvox.com.br/api/stores/4039/opinions',
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

                        body.stop().animate({
                            scrollTop: offsetTop
                        }, '500');
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
                        $('html,body').animate({
                            scrollTop: $('.section-rating').offset().top - 20
                        }, 500);

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
            })

            function setas_avaliacao_efeito() {

                window.setInterval(function () {

                    var transform = $('.section-info .owl-wrapper').css('transform')

                    if (transform == undefined) return;

                    var leftel = parseInt(transform.split(',').reverse()[1]);

                    //Seta esquerda
                    if (transform == 'none' || leftel == 0) {
                        $('.section-info .slider-prev').addClass('seta-no-effect');
                    } else {
                        $('.section-info .slider-prev').removeClass('seta-no-effect');
                    }

                    //Seta direita
                    var fright = ($('.section-info .owl-wrapper .owl-item').size() * parseInt($('.section-info .owl-wrapper .owl-item:last').css('width'))) - parseInt($('.section-info .owl-wrapper .owl-item:last').css('width'));

                    if (fright == (leftel * -1) || $('.section-info .owl-wrapper .owl-item').size() == 1) {
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

                        $(".product-details .product-content").css("margin-top", "-" + ((selectCorNew / 2) - 20) + "px");

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
                    $('html,body').animate({
                        scrollTop: $('.section-rating').offset().top
                    }, 500);
                });

                //# Query mobile
                if ($win.width() < 768) {
                    // #Animate (Por que asberes amam)
                    $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides.owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item .slide strong').on('click', function (event) {
                        event.preventDefault();
                        $('html,body').animate({
                            scrollTop: $('.section-rating').offset().top
                        }, 500);
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

            var arrayFlags = [{
                    flag_name: 'produtos top',
                    flag_class: 'tag produtos-top',
                    orderId: 1
                },
                {
                    flag_name: 'novidade',
                    flag_class: 'tag novidade',
                    orderId: 2
                },
                {
                    flag_name: 'so no sote',
                    flag_class: 'tag so-no-sote',
                    orderId: 3
                },
                {
                    flag_name: '15',
                    flag_class: 'tag 15',
                    orderId: 4
                },
                {
                    flag_name: 'frete gratis',
                    flag_class: 'tag frete-gratis',
                    orderId: 5
                },
                {
                    flag_name: 'tempo limitado',
                    flag_class: 'tag tempo-limitado',
                    orderId: 6
                },
                {
                    flag_name: 'noite da beleza',
                    flag_class: 'tag noite-da-beleza',
                    orderId: 7
                },
                {
                    flag_name: 'liquida bere',
                    flag_class: 'tag liquida-bere',
                    orderId: 8
                },
                {
                    flag_name: 'black friday',
                    flag_class: 'tag black-friday',
                    orderId: 9
                },
                {
                    flag_name: 'black week',
                    flag_class: 'tag black-week',
                    orderId: 10
                },
            ];

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
            return (window.innerWidth < 480) ? 2 :
                (window.innerWidth < 1025) ? 4 :
                (window.innerWidth > 1024) ? 4 : 4;
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
        var DataSkuManager = function (selectorGroup) {
            var selector = selectorGroup;
            var _owner = DataSkuManager;
            var pathDataSku = "/produto/sku/";
            _owner.objSkusInfo = {
                skuList: []
            };

            if ($(selector).length) {
                var lengthSkus = $(selector).find("label").length;
                var arrSkuList = [];
                var cont;
                var regex;

                if (skuJson == undefined) return false;

                $.each(skuJson.skus, function (index, value) {
                    // regex = /^[0-9\,]{0,}[m|v|p|g|ml]{1,}$/g;
                    if (value.values[0]) {
                        if (arrSkuList.indexOf(value.values[0]) == -1) {
                            arrSkuList.push(value.values[0]);
                            // console.log(arrSkuList.indexOf(value.values[0]));
                            _owner.objSkusInfo.skuList.push({
                                id: value.sku,
                                name: value.values[0],
                                thumb: '',
                                texture: ''
                            });
                            callSkuJsonAndMountThumbs(value.sku, value.values[0]);
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
                                totalIMG = objSucess[0]["Images"][i].length
                                for (var c = 0; c < totalIMG; c++) {
                                    if (objSucess[0]["Images"][i][c]["Name"] == null) {
                                        archiveTypeId = 1
                                        urlThumbSku = objSucess[0]["Images"][i][c]["Path"];
                                        break;
                                    }
                                    if (objSucess[0]["Images"][i][c]["Name"].toLowerCase() == "thumb") {
                                        archiveTypeId = 1
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
                                                        var percent = parseInt(100 - ((bestPrice / listPrice) * 100));
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

                    setTimeout(() => {
                        if (BrowserVendor == 'edge/edgehtml' || BrowserVendor == 'ie/trident') {
                            var coresNaoDisponiveis = document.querySelectorAll(".select-cor-new .product-disabled,.select-cor-new .item_unavailable");
                            var produtosComDesconto = document.querySelectorAll(".select-cor-new .flag-discount-percent");
                            var inserirDepois = document.querySelector('.select-cor-new > span > label:last-child')
                            var inserirAntes = document.querySelector('.select-cor-new > span label:first-child')
                            for (var i = 0; i < coresNaoDisponiveis.length; i++) {
                                insertAfterr(coresNaoDisponiveis[i], inserirDepois)
                            }
                            for (var i = 0; i < produtosComDesconto.length; i++) {
                                insertAfterr(produtosComDesconto[i].parent("label"), inserirDepois)
                                produtosComDesconto[i].insertBefore(inserirAntes);
                            }
                        } else {
                            $(".select-cor-new .product-disabled,.select-cor-new .item_unavailable").each(element => {
                                $(element).insertAfter($('.select-cor-new > span > label:last-child'))
                                // console.log("colors unavaliable");
                            });
                            $(".select-cor-new .flag-discount-percent").each(element => {
                                $(element).parent("label").insertAfter($('.select-cor-new > span label:last-child'));
                                $(element).parent("label").insertBefore($('.select-cor-new > span label:first-child'));
                                // console.log("discount first");
                            });
                        }
                    }, 2000);
                    selectLocation(window.location.href);
                });
            }
        }

        /* ====================================================================== *\
            #Replace img produto
        \* ====================================================================== */
        function imgProduct() {
            $('#show .thumbs li #botaoZoom img').each(function (index, item) {
                var src = $(this).attr('src').replace('-55-55', '-200-200')
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
        function settingsProductPreco(sku) {
            let Sku = window.cProduct.items.find(i => i.itemId == sku);
            if (Sku.sellers[0].commertialOffer.ListPrice == Sku.sellers[0].commertialOffer.Price) {
                $('del.product-preco-de').hide();
            } else {
                $('del.product-preco-de').show();
            }
            var precoDe = "R$" + Sku.sellers[0].commertialOffer.ListPrice.toFixed(2).toString().replace(".", ",");
            var precoPor = "R$" + Sku.sellers[0].commertialOffer.Price.toFixed(2).toString().replace(".", ",")
            // var precoPor = $('.plugin-preco .valor-por .skuBestPrice').text();
            // var precoDe = $('.descricao-preco .valor-de .skuListPrice').text();
            // var parcelaQd = "até " + Math.max.apply(Math, this.state.Sku.sellers[0].commertialOffer.Installments.map(function(o) { return o.NumberOfInstallments; })) + "x de R$" + Math.min.apply(Math, this.state.Sku.sellers[0].commertialOffer.Installments.map(function(o) { return o.Value; })).toFixed(2).toString().replace(".", ",") + " sem juros";
            // var parcelaTotal = $('.plugin-preco .descricao-preco .valor-dividido .skuBestInstallmentValue').text();

            $('.product-details .product-info .product-preco-de').text(precoDe);
            $('.product-details .product-info .product-preco-por').text(precoPor);
            $('.product-details .product-info .product-parcelamento').text("até " + Math.max.apply(Math, Sku.sellers[0].commertialOffer.Installments.map(function (o) {
                return o.NumberOfInstallments;
            })) + "x de R$" + Math.min.apply(Math, Sku.sellers[0].commertialOffer.Installments.map(function (o) {
                return o.Value;
            })).toFixed(2).toString().replace(".", ",") + " sem juros");
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
            var porqueAgenteAmaTextoPadrão = ""
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
                        id: ($('.buy-button').attr('href').indexOf('javascript') > -1) ? $('#___rc-p-sku-ids').val().split(',')[0] : $('.buy-button').attr('href').split('?')[1].split('&')[0].split('sku=')[1],
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
                    success: function (data) {
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
                    },
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
                rewindNav: true,
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
                itemsTablet: [768, 1],
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
            if (tmp.length > 6)
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
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
            $('.select-cor-new').append($selectCor)


            // #Limpa input clone
            $('.select-cor-new span input').each(function (index, item) {
                $(this).remove();
            });


            // #Monta seletor de sku
            var dataskumanager = new DataSkuManager(".select-cor-new");

            /* Funcao de ajustes do carrossel das bolas de cores */
            var ajusteCarroselColors = function () {

                if ($(window).width() <= 800) return;

                $('.product-details .product-body .slider-colors .slider-actions .slider-prev').css('left', '-30px');
                $('.product-details .product-body .slider-colors .slider-actions .slider-next').css('padding-left', '25px');
                $('.slider-colors').css('margin-left', '-87px');

            }

            /* Ultima bola de cores efeito, pois o afterMove nao dispara no ultimo item (quando nao tem acao) */
            $('.slider-colors .slider-next').live('mousedown', function () {

                $('.slider-colors .owl-item:last').animate({
                    opacity: 0.2
                }, 160, function () {
                    $('.slider-colors .owl-item:last').animate({
                        opacity: 1
                    }, 160);
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
            const productsIndisponiveis = document.querySelectorAll(".product-disabled.item_unavailable");
            const inserirDepois2 = document.querySelector('.select-cor-new > span > label :last-child');
            if ($('.select-cor-new > span > label').length > 0) {
                if (BrowserVendor == 'edge/edgehtml' || BrowserVendor == 'ie/trident') {
                    for (let i = 0; i < productsIndisponiveis.length; i++) {
                        productsIndisponiveis[i].insertAfterr(productsIndisponiveis[i], inserirDepois2)
                    }
                } else {
                    $(".product-disabled.item_unavailable").each(element => {
                        $(element).insertAfter($('.select-cor-new > span > label :last-child'))
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
                    if (img_thumb_inicial)
                        $('.big-select-cor-new label').css('background', 'url(' + img_thumb_inicial.replace('55-55', '200-200') + ')');
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
                $('.select-cor-new').addClass('owl-not-slider')
                $(".slider-colors .slider-actions").hide()
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
                let sku = [...document.querySelectorAll(".select-cor-new .group_0 label")].find(label => label.classList.contains("current")) != undefined ? document.querySelector(".select-cor-new .group_0 .current").getAttribute("data-idsku") : new URL(window.location.href).searchParams.get("idsku");
                if(sku == null || sku == undefined){
                    fetch("/api/catalog_system/pub/products/search" + window.location.pathname)
                    .then(response => response.json())
                    .then((Product) =>{
                        sku = Product[0].items[0].itemId;
                        settingsProductPreco(sku);
                    })
                }else{
                    settingsProductPreco(sku);
                }
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
                    var email = $('.new-aviseme .product-aviseme').val()
                    $('#notifymeClientEmail').val(email);
                });

                $('.new-aviseme  .btn-send-aviseme').on('click', function (event) {
                    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    var email = $('.new-aviseme .product-aviseme').val();

                    if (!filtro.test(email)) {
                        $('.new-aviseme .product-aviseme').attr('placeholder', 'entre com um email valido');
                        $('.new-aviseme .product-aviseme').css({
                            'color': 'red',
                            'border': '1px solid red'
                        });
                        return false;
                    } else {
                        $('.new-aviseme .product-aviseme').css({
                            'color': '#b1b1b1',
                            'border': '1px solid #b1b1b1'
                        });
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
            var $imgDescricao = $('.tab-image').html()

            $('.tabs .tabs-nav li').eq(0).append('<div class="accordion-body descripton"> ' + $descriao + ' </div>');
            $('.tabs .tabs-nav li').eq(1).append('<div class="accordion-body ficaDica"> ' + $ficaDica + ' </div>');
            $('.tabs .tabs-nav li').eq(2).append('<div class="accordion-body fichaTecnica"> ' + $fichaTecnica + ' </div>');
            $('.tabs .tabs-nav li').eq(3).append('<div class="accordion-body precaucoesUso"> ' + $precaucoesUso + ' </div>');
            $('.tabs .tabs-nav li').eq(4).append('<div class="accordion-body avaliacao"> ' + $avaliacao + ' </div>');
            $('.tabs .tabs-nav li').eq(0).find('.productDescription').append('<div class="mobile-img-descricao"> ' + $imgDescricao + ' </div>')


            if ($(window).width() <= 420) {
                $('.tabs .tabs-nav li').eq(0).addClass('current');
                $('.tabs .tabs-nav li a').eq(0).addClass('active');
                $('.tabs .tabs-nav li div').eq(0).addClass('active');
            }

            var $descriptionClone = $('.section-tabs').clone();

            $('.section-product').append($descriptionClone);
            $('.section-tabs').eq(0).addClass('description-top')

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
                _this.append('<div class="slide-tooltip"><img src="' + img + '" height="144" width="167" alt=""><p> ' + title + ' </p> <div class="product-disabled-thumb"><p>cor indisponivel</p></div> </div>')
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
                url: '',
            },
            item: '<li class="slide"><h4>' +
                'avaliação ' +
                '<strong>#nota#</strong></h4><p>' +
                '#avaliacao#' + '</p><p style="text-transform: none !important;">#nome#</p><strong><span>v</span>er todas as avaliações' +
                '</strong></li>',
            init: function (config) {
                this.config = config;
                var code = parseInt($('#___rc-p-id').val());
                var settings = {
                    url: "http://trustvox.com.br/widget/opinions?code=" + code + "&store_id=4039",
                    headers: {
                        "accept": "application/vnd.trustvox-v2+json"
                    }
                }
                $('.slider-entrys ul.slides').html("");
                this.requestReviews(settings);
            },
            requestReviews: function (settings) {
                var _self = this;
                $.ajax(settings).done(function (data) {
                    var arrayContent = [];
                    var htmlContent = "";
                    for (var i = 0; i < data.items.length; i++) {
                        arrayContent = [(data.items[i].rate * 1).toFixed(1), '"' + data.items[i].opinion + '"', data.items[i].user.name.split(' ')[0]]
                        var itemModified = _self.item;

                        for (var j = 0; j < _self.array.length; j++) {
                            itemModified = itemModified.replace(_self.array[j], arrayContent[j]);
                        }

                        if (typeof (data.items[i].opinion) == 'undefined' || data.items[i].opinion == 'undefined') continue;
                        if ((data.items[i].rate * 1) < 4) continue;

                        htmlContent += itemModified;
                    }
                    if (data.items.length == 0) {
                        $('.slider-entrys ul.slides').append('<li class="slide not-coments"><p> ainda não temos comentários </p><p> a gente acredita que as avaliaçoes têm ser <br> verdadeiras. por isso, você só vai poder opinar <br> depois que comprar e testar o produto </p></li>');
                        $('.cols .col.col-1of2 .slider-entrys .slider-actions').hide();
                        $('.produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides').removeClass('owl-carousel')
                    } else {
                        $('.slider-entrys ul.slides').append(htmlContent);
                    }
                })
            }
        }
    },
    exclusiveOnEcommerce() {
        let product = window.location.pathname;
        let url = `/api/catalog_system/pub/products/search/${product}`

        function createFlag() {
            const appendReference = document.querySelector('.product-tag');
            const span = document.createElement('span');
            span.classList.add('exclusivo')
            span.textContent = "Promoção exclusiva do site";
            appendReference.after(span)
        }

        fetch(url)
            .then(res => res.json())
            .then((productInfo) => {
                productInfo[0].productClusters[862] !== undefined ? createFlag() : null;
            })
    }
}

export default {
    init: Methods.init
}
