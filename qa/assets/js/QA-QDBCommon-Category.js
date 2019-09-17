(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function ($, window, document, undefined) {
    var $win = $(window);
    var $doc = $(document);

    $doc.ready(function () {
        getCategoryInformation();
        thumbsBanners();

        // #Remove <li> criada pela vtex
        $('.helperComplement').remove();

        // #Troca H3 por H2 na pÃ¡gina de dep e categoria
        $('body.departament .section-products h3, body.category .section-products h3').replaceWith(function () {
            return $('<h2/>', {
                html: this.innerHTML
            });
        });

        // #Trocar paragrÃ¡fo(P) por H2 no nome do produto na pratileira
        $('body.departament .product .product-content p, body.category .product .product-content p').replaceWith(function () {
            return $('<h3/>', {
                html: this.innerHTML
            });
        });

        // #Select ordenaÃ§Ã£o por preÃ§o 
        $('.breadcrumbs .bread-crumb > ul > li').eq(0).text('página inicial');

        // #Soma quantidade total de produtos na categoria 
        $(".filters .filters-head p .total-prpduct").text($('.searchResultsTime .resultado-busca-numero .value').eq(0).text());

        // #Adiciona nome da categoria 
        $('.nav-quaternary .nav-title').text(vtxctx.categoryName);

        // #Select ordenaÃ§Ã£o por preÃ§o 
        if ($('.form-controls.custom-select.custom-select-secondary select').length == 0) {
            var select = $('.sub .resultado-busca-filtro .orderBy select').eq(0).clone();
            $('.form-controls.custom-select.custom-select-secondary').append(select);
        }

        // #Chamada Smart Research

        if ($('body').hasClass('category')) {
            $(".menu-departamento input[type='checkbox']").vtexSmartResearch({
                pageLimit: 1,
                shelfCallback: function shelfCallback() {

                    //return;
                    // #Adiciona img produto
                    $('.product .product-image > img').addClass('fix-product background');
                    //fixProduct();


                    var imageTag;
                    var linkSku;
                    var coresSelecionadas = [];

                    $('.slector-cor input:checkbox:checked').each(function () {
                        var $this = $(this);
                        coresSelecionadas.push($this.attr('value'));
                    });

                    //Laco que percorre os produtos trazidos do filtro de cores da vtex, e verifica se tem sku com aquela cor(s).
                    $('.p-none-color').remove();

                    if (window.location.href.indexOf('/maquiagem/boca/batom') > -1 && coresSelecionadas.length > 0) {

                        console.clear();
                        console.log('coresSelecionadas ', coresSelecionadas);

                        numero_produtos = $(this.shelfClass + '.vitrine > ul > li').not('.helperComplement').size();
                        $('.p-none-color').remove();
                        numerador = 0;

                        $(this.shelfClass + '.vitrine > ul > li').not('.helperComplement').each(function () {

                            var $this = $(this);
                            var idproduto = $(this).find('.product .product-skus .idproduto').val();

                            $.get('/api/catalog_system/pub/products/search/?fq=productId:' + idproduto, function (data) {

                                console.warn('Iniciando leitura do produto ', idproduto);

                                id_sku = 0;
                                tag = 0;
                                numerador++;

                                for (i in data[0].items) {

                                    if (typeof data[0].items[i]["Escolha a Cor"] == 'undefined') continue;
                                    cor_sku = data[0].items[i]["Escolha a Cor"][0];

                                    for (i2 in coresSelecionadas) {
                                        cor_combo = coresSelecionadas[i2];

                                        //console.log(cor_combo,typeof(cor_combo))
                                        if (typeof cor_combo == 'string') {

                                            console.log("buscando", cor_combo, " em ", cor_sku);

                                            if (cor_sku.indexOf(cor_combo) > -1) {

                                                tag = data[0].items[i].images[0].imageTag;
                                                id_sku = data[0].items[i].itemId;

                                                tag = tag.replace('~', window.location.origin);
                                                tag = tag.replace('#width#', '292').replace('#width#', '292');
                                                tag = tag.replace('#height#', '292').replace('#height#', '292');

                                                console.warn('Encontrou um sku com essa cor -> ', id_sku, " Imagem dela: ", tag);
                                            }
                                        }
                                    }
                                }

                                if (id_sku) {
                                    //Muda a Imagem para o sku da cor
                                    $this.find('.product-image img').first().replaceWith(tag);

                                    //Mudar sku do link tmb (para ao clicar, ir para o sku correto ja)
                                    id_sku_this = $this.find('.product-link').attr('href').split('idsku=')[1];
                                    if (typeof id_sku_this !== 'undefined') {
                                        $this.find('.product-link').attr('href', $this.find('.product-link').attr('href').replace(id_sku_this, id_sku));
                                    }
                                } else {
                                    console.warn("Produto escondido: ", idproduto);
                                    $this.hide();
                                }

                                //Aviso que nenhum produto foi encontrado para essa cor
                                if (numerador == numero_produtos) {
                                    if ($('.filters-body .pratileira > ul > li:visible').size() == 0) {
                                        no_mensagem = coresSelecionadas.length == 1 ? "Ops! nÃ£o conseguimos achar nenhum produto para a cor selecionada" : "Ops! nÃ£o conseguimos achar nenhum produto para as cores selecionadas";
                                        window.setTimeout(function () {
                                            $('.filters-body .vitrine:visible:first').prepend("<p class='p-none-color' style='margin-bottom: 47px;font-weight:bold;text-align:center;'>" + no_mensagem + "</p>");
                                        }, 500);
                                    }
                                }
                            });
                        });
                    }
                },
                callback: function callback() {
                    filterCategory();

                    // #AnimaÃ§Ã£o menu categoria desktop
                    if ($win.width() > 1024) {
                        $('.custom-select .custom-select-text').on('click', function (event) {
                            $(this).next('div').slideToggle();
                        });
                    }

                    // #Menu categoria tablet/mobile
                    if ($win.width() < 1025) {
                        menuCategoryMobile();

                        $('.custom-select-secondary.fake > a').on('click', function (event) {
                            event.preventDefault();
                            $('.wrapper-menu').addClass('active');
                            $('.overlay-category').addClass('active');
                        });

                        $('.overlay-category').on('click', function (event) {
                            $(this).removeClass('active');
                            $('.wrapper-menu').removeClass('active');
                        });

                        $('.wrapper-menu .custom-select .custom-select-text').on('click', function (event) {
                            $(this).next('div').toggleClass('active');
                            $(this).toggleClass('active');
                            $(this).parent().parent().toggleClass('active');
                        });
                    }
                }
            });
        }
    });

    $win.on('load', function () {
        // #Full background ico top
        $('.nav-quaternary.nav-black ul li > i > img').each(function (index, item) {
            var src = $(this).attr('src');
            $(this).parent().css({ 'backgroundImage': 'url(' + src + ')' });
        });

        // #Hover icones categorias e departamentos
        $('.nav-quaternary.nav-black ul li').hover(function () {
            var background = $(this).find('i').attr('style');
            var backgroundHover = background.replace('departamento', 'categoria');
            $(this).find('i').attr('style', backgroundHover);
        }, function () {
            var background = $(this).find('i').attr('style');
            var backgroundHover = background.replace('categoria', 'departamento');
            $(this).find('i').attr('style', backgroundHover);
        });

        //# hasClass capartamento
        if ($('body').hasClass('departament')) {
            // #Slider produto (produtos top) 
            if ($('.section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul').length) {
                productSlider($('.section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul'));

                $('.section-products.category-colletion-produtos-top .shell .section-content .slider-products .slider-actions .slider-next').on('click', function (event) {
                    event.preventDefault();
                    $('.section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul').trigger('owl.next');
                });

                $('.section-products.category-colletion-produtos-top .shell .section-content .slider-products .slider-actions .slider-prev').on('click', function (event) {
                    event.preventDefault();
                    $('.section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul').trigger('owl.prev');
                });
            }

            // #Slider peoduto (os mais vendidos) 
            if ($('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul').length) {
                productSlider($('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul'));

                $('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-actions .slider-next').on('click', function (event) {
                    event.preventDefault();
                    $('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul').trigger('owl.next');
                });

                $('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-actions .slider-prev').on('click', function (event) {
                    event.preventDefault();
                    $('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul').trigger('owl.prev');
                });
            }

            // #Slider peoduto (os melhores precinhos pra vocÃª) 
            if ($('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul').length) {
                productSlider($('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul'));

                $('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-actions .slider-next').on('click', function (event) {
                    event.preventDefault();
                    $('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul').trigger('owl.next');
                });

                $('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-actions .slider-prev').on('click', function (event) {
                    event.preventDefault();
                    $('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul').trigger('owl.prev');
                });
            }

            // #Slider (ainda tÃ¡ em dÃºvida?) - SeÃ§Ã£o 1
            if ($('.section-makeup .section-body .slider-makeup').eq(0)) {
                bannerFilterSlider($('.slider-makeup .slides').eq(0));
            }

            // #Slider (ainda tÃ¡ em dÃºvida?) - SeÃ§Ã£o 1
            if ($('.section-makeup .section-body .slider-makeup').eq(1)) {
                bannerFilterSlider($('.slider-makeup .slides').eq(1));
            }

            // #Slider (dÃ¡ uma olhadinha nessas dicas) - SeÃ§Ã£o 1
            if ($('.section-makeup .section-body .slider-makeup').eq(2)) {
                bannerFilterSlider($('.section-makeup .section-body .slider-makeup .slides').eq(2));
            }

            // #Slider (dÃ¡ uma olhadinha nessas dicas) - SeÃ§Ã£o 2
            if ($('.section-makeup .section-body .slider-makeup').eq(3)) {
                bannerFilterSlider($('.section-makeup .section-body .slider-makeup .slides').eq(3));
            }

            // #Slider Banner mouse over
            makeSlidersMoveOnMouseMove();

            // #Slider sub categorias
            if ($win.width() <= 420) {
                $('.nav-quaternary.nav-black .shell ul').owlCarousel({
                    items: 1,
                    autoplay: false,
                    nav: false,
                    slideBy: 4,
                    mouseDrag: true,
                    loop: true,
                    rewindNav: true,
                    itemsMobile: [420, 2]
                });

                $('.nav-quaternary.nav-black .shell ul').append('<div class="slider-actions departament-top"><a href="#" class="slider-prev"><i class="ico"></i></a><a href="#" class="slider-next"><i class="ico"></i></a></div>');

                $('.slider-actions.departament-top .slider-next i.ico').on('click', function (event) {
                    event.preventDefault();
                    $('.nav-quaternary.nav-black .shell ul').trigger('owl.next');
                });

                $('.slider-actions.departament-top .slider-prev i.ico').on('click', function (event) {
                    event.preventDefault();
                    $('.nav-quaternary.nav-black .shell ul').trigger('owl.prev');
                });
            }
        }
    });
})(jQuery, window, document);

/* ====================================================================== *\
    #Grid slider product
\* ====================================================================== */
function getGridSize() {
    return window.innerWidth < 480 ? 2 : window.innerWidth < 1025 ? 4 : window.innerWidth > 1024 ? 4 : 4;
}

/* ====================================================================== *\
    #Menu categoria mobile
\* ====================================================================== */
function menuCategoryMobile() {
    $('body.category').prepend('<div class="wrapper-menu"> </div>');
    $('body.category').prepend('<span class="overlay-category"> </span>');
    $('.wrapper-menu').append($('#filters'));
}

/* ====================================================================== *\
    #Adiciona banners 
\* ====================================================================== */
function thumbsBanners() {
    var imgCategory01 = $('.banner-category-01 > .box-banner a > img').attr('src');
    var hrefCategory01 = $('.banner-category-01 > .box-banner a > img').attr('href');

    var imgCategory02 = $('.banner-category-02 > .box-banner a > img').attr('src');
    var hrefCategory02 = $('.banner-category-02 > .box-banner a > img').attr('href');

    var imgCategory03 = $('.banner-category-03 > .box-banner a > img').attr('src');
    var hrefCategory03 = $('.banner-category-03 > .box-banner a > img').attr('href');

    $('.pratileira .pratileira ul li').each(function (index, item) {
        if (index == 0) {
            if (imgCategory01 != undefined) {
                $(this).before('<li><div class="img-category-list fist"><img src="' + imgCategory01 + '" height="398" width="298"/><a href="' + hrefCategory01 + '" class="meta-category"> eu quero ! </a></div></li>');
            }
        }
        if (index == 9) {
            if (imgCategory02 != undefined) {
                $(this).before('<li><div class="img-category-list"><img src="' + imgCategory02 + '" height="398" width="298"/><a href="' + hrefCategory02 + '" class="meta-category"> se joga !</a></div></li>');
            }
        }
        if (index == 15) {
            if (imgCategory03 != undefined) {
                $(this).before('<li><div class="img-category-list"><img src="' + imgCategory03 + '" height="398" width="298"/><a href="' + hrefCategory03 + '" class="meta-category"> vem ver !</a></div></li>');
            }
        }
    });
}

/* ====================================================================== *\
    #Verifica categorias para setar filtros
\* ====================================================================== */
function filterCategory() {
    var _categoryName = vtxctx.departmentName;
    switch (_categoryName) {
        case "Perfumaria":
            filtroFamiliaOfativa($('.refino.filtro_familia-olfativa'));
            filtroHojeQuero($('.refino.filtro_hoje-eu-quero'));
            $('#slector-familia-olfativa').show();
            $('#slector-hoje-quero').show();
            break;
        case "Unhas":
            filtroCor($('.refino.filtro_escolha-a-cor'));
            filtroCor($('.refino.filtro_cor'));
            filtroHojeQuero($('.refino.filtro_hoje-eu-quero'));
            $('#slector-hoje-quero').show();
            $('#slector-cor').show();
            break;
        case "AcessÃ³rios":
            filtroPreco($('.refino.filtro_faixa-de-preco'));
            filtroHojeQuero($('.refino.filtro_hoje-eu-quero'));
            $('#slector-hoje-quero').show();
            $('#slector-preco').show();
            break;
        case "Corpo e Banho":
            filtroPreco($('.refino.filtro_faixa-de-preco'));
            filtroHojeQuero($('.refino.filtro_hoje-eu-quero'));
            $('#slector-hoje-quero').show();
            $('#slector-preco').show();
            break;
        case "Maquiagem":
            filtroCor($('.refino.filtro_cor'));
            filtroHojeQuero($('.refino.filtro_hoje-eu-quero'));
            filtroPreco($('.refino.filtro_faixa-de-preco'));
            $('#slector-hoje-quero').show();
            $('#slector-preco').show();
            $('#slector-cor').show();
            break;
        default:
    }
}

/* ====================================================================== *\
    #Monta filtro hoje eu quero
\* ====================================================================== */
function filtroMarca($selector) {
    if ($selector.length > 0) {
        var $cloneMarcas = $('' + $selector.selector + '> div').clone();
        $('.form-controls.custom-select.slector-marca').append($cloneMarcas);

        $('.form-controls.custom-select.slector-marca > div > label').on('click', function () {
            var index = $(this).index();
            $('' + $selector.selector + ' > div > label[index=' + index + '] input').attr('checked', 'checked');
            $('' + $selector.selector + '  > div > label[index=' + index + '] input').change();
        });
    } else {
        $('#slector-marca').addClass('category-filter-null');
    }
}

/* ====================================================================== *\
    #Monta filtro hoje eu quero
\* ====================================================================== */
function filtroHojeQuero($selector) {
    if ($selector.length > 0) {
        var $cloneHojeQuero = $('' + $selector.selector + '> div').clone();
        $('.form-controls.custom-select.slector-hoje-quero').append($cloneHojeQuero);

        $('.form-controls.custom-select.slector-hoje-quero > div > label').on('click', function () {
            var index = $(this).index();
            $('' + $selector.selector + ' > div > label[index=' + index + '] input').attr('checked', 'checked');
            $('' + $selector.selector + '  > div > label[index=' + index + '] input').change();
        });
    } else {
        $('#slector-hoje-quero').addClass('category-filter-null');
    }
}

/* ====================================================================== *\
    #Monta filtro preÃ§o
\* ====================================================================== */
function filtroPreco($selector) {
    if ($selector.length > 0) {
        var $clonePreco = $('' + $selector.selector + '> div').clone();
        $('.form-controls.custom-select.slector-preco').append($clonePreco);

        $('.form-controls.custom-select.slector-preco > div > label').on('click', function () {
            var index = $(this).index();
            $('' + $selector.selector + ' > div > label[index=' + index + '] input').attr('checked', 'checked');
            $('' + $selector.selector + '  > div > label[index=' + index + '] input').change();
        });
    } else {
        $('#slector-preco').addClass('category-filter-null');
    }
}

/* ====================================================================== *\
    #Monta filtro familia ofativa
\* ====================================================================== */
function filtroFamiliaOfativa($selector) {
    if ($selector.length > 0) {
        var $cloneCor = $('' + $selector.selector + '> div').clone();
        $('#slector-familia-olfativa .form-controls.custom-select').append($cloneCor);

        $('#slector-familia-olfativa .form-controls.custom-select > div > label').on('click', function () {
            var index = $(this).index();
            $('' + $selector.selector + ' > div > label[index=' + index + '] input').attr('checked', 'checked');
            $('' + $selector.selector + '  > div > label[index=' + index + '] input').change();
        });
    } else {
        $('#slector-familia-olfativa').addClass('category-filter-null');
    }
}

/* ====================================================================== *\
    #Monta filtro cor
\* ====================================================================== */

function filtroCor($selector) {
    if ($selector.length > 0) {
        var $cloneCor = $('' + $selector.selector + '> div').clone();
        $('.form-controls.custom-select.slector-cor').append($cloneCor);

        $('.form-controls.custom-select.slector-cor > div > label').on('click', function () {
            var index = $(this).index();

            if ($(this).is(':checked')) {
                $('' + $selector.selector + ' > div > label[index=' + index + '] input').attr('checked', 'checked');
            } else {
                $('' + $selector.selector + ' > div > label[index=' + index + '] input').removeAttr('checked');
            }

            //Trigger no da vtex
            $('' + $selector.selector + '  > div > label[index=' + index + '] input').change();
        });
    } else {
        $('#slector-cor').addClass('category-filter-null');
    }
}

/* ====================================================================== *\
    #Slider banners filtros
\* ====================================================================== */
function makeSlidersMoveOnMouseMove() {
    $('.slider-makeup').each(function (i) {
        $(this).hover(function () {
            $(this).on('mousemove', function (e) {
                $(this).find('.owl-wrapper').css('transform', 'translate3d(' + e.pageX / 1.6654 * -1 + 'px, 0px, 0px)');
            });
        });
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
        itemsTablet: [768, 3],
        itemsMobile: [420, 2]
    });
}

/* ====================================================================== *\
    #Slider banners filtros
\* ====================================================================== */
function bannerFilterSlider($selector) {
    $selector.owlCarousel({
        items: 5,
        autoplay: false,
        nav: false,
        mouseDrag: false,
        loop: true,
        rewindNav: false,
        itemsTablet: [768, 3.3]
    });
}

/* ====================================================================== *\
    #Get recusividade categoria
\* ====================================================================== */
function getCategoryInformation() {
    $.ajax({
        url: '/api/catalog_system/pub/category/tree/3/',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function success(data) {
            recursiveCategory(data);
        },
        error: function error(_error) {
            console.log(_error);
        }
    });
}

/* ====================================================================== *\
    #Recusividade categoria
\* ====================================================================== */
function recursiveCategory(category) {
    for (var i = 0; i < category.length; i++) {
        if (category[i].id == vtxctx.categoryId) {
            setChildrensInformation(category[i]);
        } else if (i == category.length - 1) {
            for (var j = 0; j < category.length; j++) {
                recursiveCategory(category[j].children);
            }
        }
    }
}

/* ====================================================================== *\
    #Seta sub categorias no topo
\* ====================================================================== */
function setChildrensInformation(category) {
    for (var i = 0; i < category.children.length; i++) {
        if ($('body').hasClass('departament')) {
            $('.nav-quaternary > .shell > ul').append('<li data-id-cateory="' + category.children[i].id + '" data-name-category="' + category.children[i].name + '"> <i class="ico-departament-filter"> <img src="/arquivos/ico_departamento_' + category.children[i].id + '.png"/> </i> <h2><a href="' + category.children[i].url + '" rel="v:url">' + category.children[i].name + '</a></h2> </li>');
        } else if ($('body').hasClass('category')) {
            $('.nav-quaternary > .shell > ul').append('<li data-id-cateory="' + category.children[i].id + '" data-name-category="' + category.children[i].name + '">  <h2><a href="' + category.children[i].url + '">' + category.children[i].name + '</a></h2></li>');
        }
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNDRlMGE0ZDguanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwiJHdpbiIsIiRkb2MiLCJyZWFkeSIsImdldENhdGVnb3J5SW5mb3JtYXRpb24iLCJ0aHVtYnNCYW5uZXJzIiwicmVtb3ZlIiwicmVwbGFjZVdpdGgiLCJodG1sIiwiaW5uZXJIVE1MIiwiZXEiLCJ0ZXh0IiwidnR4Y3R4IiwiY2F0ZWdvcnlOYW1lIiwibGVuZ3RoIiwic2VsZWN0IiwiY2xvbmUiLCJhcHBlbmQiLCJoYXNDbGFzcyIsInZ0ZXhTbWFydFJlc2VhcmNoIiwicGFnZUxpbWl0Iiwic2hlbGZDYWxsYmFjayIsImFkZENsYXNzIiwiaW1hZ2VUYWciLCJsaW5rU2t1IiwiY29yZXNTZWxlY2lvbmFkYXMiLCJlYWNoIiwiJHRoaXMiLCJwdXNoIiwiYXR0ciIsImxvY2F0aW9uIiwiaHJlZiIsImluZGV4T2YiLCJjb25zb2xlIiwiY2xlYXIiLCJsb2ciLCJudW1lcm9fcHJvZHV0b3MiLCJzaGVsZkNsYXNzIiwibm90Iiwic2l6ZSIsIm51bWVyYWRvciIsImlkcHJvZHV0byIsImZpbmQiLCJ2YWwiLCJnZXQiLCJkYXRhIiwid2FybiIsImlkX3NrdSIsInRhZyIsImkiLCJpdGVtcyIsImNvcl9za3UiLCJpMiIsImNvcl9jb21ibyIsImltYWdlcyIsIml0ZW1JZCIsInJlcGxhY2UiLCJvcmlnaW4iLCJmaXJzdCIsImlkX3NrdV90aGlzIiwic3BsaXQiLCJoaWRlIiwibm9fbWVuc2FnZW0iLCJzZXRUaW1lb3V0IiwicHJlcGVuZCIsImNhbGxiYWNrIiwiZmlsdGVyQ2F0ZWdvcnkiLCJ3aWR0aCIsIm9uIiwiZXZlbnQiLCJuZXh0Iiwic2xpZGVUb2dnbGUiLCJtZW51Q2F0ZWdvcnlNb2JpbGUiLCJwcmV2ZW50RGVmYXVsdCIsInJlbW92ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJwYXJlbnQiLCJpbmRleCIsIml0ZW0iLCJzcmMiLCJjc3MiLCJob3ZlciIsImJhY2tncm91bmQiLCJiYWNrZ3JvdW5kSG92ZXIiLCJwcm9kdWN0U2xpZGVyIiwidHJpZ2dlciIsImJhbm5lckZpbHRlclNsaWRlciIsIm1ha2VTbGlkZXJzTW92ZU9uTW91c2VNb3ZlIiwib3dsQ2Fyb3VzZWwiLCJhdXRvcGxheSIsIm5hdiIsInNsaWRlQnkiLCJtb3VzZURyYWciLCJsb29wIiwicmV3aW5kTmF2IiwiaXRlbXNNb2JpbGUiLCJqUXVlcnkiLCJnZXRHcmlkU2l6ZSIsImlubmVyV2lkdGgiLCJpbWdDYXRlZ29yeTAxIiwiaHJlZkNhdGVnb3J5MDEiLCJpbWdDYXRlZ29yeTAyIiwiaHJlZkNhdGVnb3J5MDIiLCJpbWdDYXRlZ29yeTAzIiwiaHJlZkNhdGVnb3J5MDMiLCJiZWZvcmUiLCJfY2F0ZWdvcnlOYW1lIiwiZGVwYXJ0bWVudE5hbWUiLCJmaWx0cm9GYW1pbGlhT2ZhdGl2YSIsImZpbHRyb0hvamVRdWVybyIsInNob3ciLCJmaWx0cm9Db3IiLCJmaWx0cm9QcmVjbyIsImZpbHRyb01hcmNhIiwiJHNlbGVjdG9yIiwiJGNsb25lTWFyY2FzIiwic2VsZWN0b3IiLCJjaGFuZ2UiLCIkY2xvbmVIb2plUXVlcm8iLCIkY2xvbmVQcmVjbyIsIiRjbG9uZUNvciIsImlzIiwicmVtb3ZlQXR0ciIsImUiLCJwYWdlWCIsIml0ZW1zVGFibGV0IiwiYWpheCIsInVybCIsInR5cGUiLCJkYXRhVHlwZSIsImNvbnRlbnRUeXBlIiwic3VjY2VzcyIsInJlY3Vyc2l2ZUNhdGVnb3J5IiwiZXJyb3IiLCJfZXJyb3IiLCJjYXRlZ29yeSIsImlkIiwiY2F0ZWdvcnlJZCIsInNldENoaWxkcmVuc0luZm9ybWF0aW9uIiwiaiIsImNoaWxkcmVuIiwibmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsQ0FBQyxVQUFVQSxDQUFWLEVBQWFDLE1BQWIsRUFBcUJDLFFBQXJCLEVBQStCQyxTQUEvQixFQUEwQztBQUN2QyxRQUFJQyxPQUFPSixFQUFFQyxNQUFGLENBQVg7QUFDQSxRQUFJSSxPQUFPTCxF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QkFBRixFQUFtQ29CLE1BQW5DLENBQTBDLDBCQUEwQnNILFNBQVNLLFFBQVQsQ0FBa0IzRixDQUFsQixFQUFxQnVGLEVBQS9DLEdBQW9ELHdCQUFwRCxHQUErRUQsU0FBU0ssUUFBVCxDQUFrQjNGLENBQWxCLEVBQXFCNEYsSUFBcEcsR0FBMkcsbUJBQTNHLEdBQWlJTixTQUFTSyxRQUFULENBQWtCM0YsQ0FBbEIsRUFBcUI4RSxHQUF0SixHQUE0SixJQUE1SixHQUFtS1EsU0FBU0ssUUFBVCxDQUFrQjNGLENBQWxCLEVBQXFCNEYsSUFBeEwsR0FBK0wsZ0JBQXpPO0FBQ0g7QUFDSjtBQUNKIiwiZmlsZSI6ImZha2VfNDRlMGE0ZDguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICAgdmFyICR3aW4gPSAkKHdpbmRvdyk7XG4gICAgdmFyICRkb2MgPSAkKGRvY3VtZW50KTtcblxuICAgICRkb2MucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXRDYXRlZ29yeUluZm9ybWF0aW9uKCk7XG4gICAgICAgIHRodW1ic0Jhbm5lcnMoKTtcblxuICAgICAgICAvLyAjUmVtb3ZlIDxsaT4gY3JpYWRhIHBlbGEgdnRleFxuICAgICAgICAkKCcuaGVscGVyQ29tcGxlbWVudCcpLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vICNUcm9jYSBIMyBwb3IgSDIgbmEgcMODwqFnaW5hIGRlIGRlcCBlIGNhdGVnb3JpYVxuICAgICAgICAkKCdib2R5LmRlcGFydGFtZW50IC5zZWN0aW9uLXByb2R1Y3RzIGgzLCBib2R5LmNhdGVnb3J5IC5zZWN0aW9uLXByb2R1Y3RzIGgzJykucmVwbGFjZVdpdGgoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQoJzxoMi8+Jywge1xuICAgICAgICAgICAgICAgIGh0bWw6IHRoaXMuaW5uZXJIVE1MXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gI1Ryb2NhciBwYXJhZ3LDg8KhZm8oUCkgcG9yIEgyIG5vIG5vbWUgZG8gcHJvZHV0byBuYSBwcmF0aWxlaXJhXG4gICAgICAgICQoJ2JvZHkuZGVwYXJ0YW1lbnQgLnByb2R1Y3QgLnByb2R1Y3QtY29udGVudCBwLCBib2R5LmNhdGVnb3J5IC5wcm9kdWN0IC5wcm9kdWN0LWNvbnRlbnQgcCcpLnJlcGxhY2VXaXRoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkKCc8aDMvPicsIHtcbiAgICAgICAgICAgICAgICBodG1sOiB0aGlzLmlubmVySFRNTFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vICNTZWxlY3Qgb3JkZW5hw4PCp8ODwqNvIHBvciBwcmXDg8KnbyBcbiAgICAgICAgJCgnLmJyZWFkY3J1bWJzIC5icmVhZC1jcnVtYiA+IHVsID4gbGknKS5lcSgwKS50ZXh0KCdww6FnaW5hIGluaWNpYWwnKTtcblxuICAgICAgICAvLyAjU29tYSBxdWFudGlkYWRlIHRvdGFsIGRlIHByb2R1dG9zIG5hIGNhdGVnb3JpYSBcbiAgICAgICAgJChcIi5maWx0ZXJzIC5maWx0ZXJzLWhlYWQgcCAudG90YWwtcHJwZHVjdFwiKS50ZXh0KCQoJy5zZWFyY2hSZXN1bHRzVGltZSAucmVzdWx0YWRvLWJ1c2NhLW51bWVybyAudmFsdWUnKS5lcSgwKS50ZXh0KCkpO1xuXG4gICAgICAgIC8vICNBZGljaW9uYSBub21lIGRhIGNhdGVnb3JpYSBcbiAgICAgICAgJCgnLm5hdi1xdWF0ZXJuYXJ5IC5uYXYtdGl0bGUnKS50ZXh0KHZ0eGN0eC5jYXRlZ29yeU5hbWUpO1xuXG4gICAgICAgIC8vICNTZWxlY3Qgb3JkZW5hw4PCp8ODwqNvIHBvciBwcmXDg8KnbyBcbiAgICAgICAgaWYgKCQoJy5mb3JtLWNvbnRyb2xzLmN1c3RvbS1zZWxlY3QuY3VzdG9tLXNlbGVjdC1zZWNvbmRhcnkgc2VsZWN0JykubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3QgPSAkKCcuc3ViIC5yZXN1bHRhZG8tYnVzY2EtZmlsdHJvIC5vcmRlckJ5IHNlbGVjdCcpLmVxKDApLmNsb25lKCk7XG4gICAgICAgICAgICAkKCcuZm9ybS1jb250cm9scy5jdXN0b20tc2VsZWN0LmN1c3RvbS1zZWxlY3Qtc2Vjb25kYXJ5JykuYXBwZW5kKHNlbGVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAjQ2hhbWFkYSBTbWFydCBSZXNlYXJjaFxuXG4gICAgICAgIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ2NhdGVnb3J5JykpIHtcbiAgICAgICAgICAgICQoXCIubWVudS1kZXBhcnRhbWVudG8gaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKS52dGV4U21hcnRSZXNlYXJjaCh7XG4gICAgICAgICAgICAgICAgcGFnZUxpbWl0OiAxLFxuICAgICAgICAgICAgICAgIHNoZWxmQ2FsbGJhY2s6IGZ1bmN0aW9uIHNoZWxmQ2FsbGJhY2soKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIC8vICNBZGljaW9uYSBpbWcgcHJvZHV0b1xuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZHVjdCAucHJvZHVjdC1pbWFnZSA+IGltZycpLmFkZENsYXNzKCdmaXgtcHJvZHVjdCBiYWNrZ3JvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vZml4UHJvZHVjdCgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlVGFnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGlua1NrdTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvcmVzU2VsZWNpb25hZGFzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnLnNsZWN0b3ItY29yIGlucHV0OmNoZWNrYm94OmNoZWNrZWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Jlc1NlbGVjaW9uYWRhcy5wdXNoKCR0aGlzLmF0dHIoJ3ZhbHVlJykpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvL0xhY28gcXVlIHBlcmNvcnJlIG9zIHByb2R1dG9zIHRyYXppZG9zIGRvIGZpbHRybyBkZSBjb3JlcyBkYSB2dGV4LCBlIHZlcmlmaWNhIHNlIHRlbSBza3UgY29tIGFxdWVsYSBjb3IocykuXG4gICAgICAgICAgICAgICAgICAgICQoJy5wLW5vbmUtY29sb3InKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignL21hcXVpYWdlbS9ib2NhL2JhdG9tJykgPiAtMSAmJiBjb3Jlc1NlbGVjaW9uYWRhcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3Jlc1NlbGVjaW9uYWRhcyAnLCBjb3Jlc1NlbGVjaW9uYWRhcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG51bWVyb19wcm9kdXRvcyA9ICQodGhpcy5zaGVsZkNsYXNzICsgJy52aXRyaW5lID4gdWwgPiBsaScpLm5vdCgnLmhlbHBlckNvbXBsZW1lbnQnKS5zaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucC1ub25lLWNvbG9yJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1lcmFkb3IgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMuc2hlbGZDbGFzcyArICcudml0cmluZSA+IHVsID4gbGknKS5ub3QoJy5oZWxwZXJDb21wbGVtZW50JykuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZHByb2R1dG8gPSAkKHRoaXMpLmZpbmQoJy5wcm9kdWN0IC5wcm9kdWN0LXNrdXMgLmlkcHJvZHV0bycpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQoJy9hcGkvY2F0YWxvZ19zeXN0ZW0vcHViL3Byb2R1Y3RzL3NlYXJjaC8/ZnE9cHJvZHVjdElkOicgKyBpZHByb2R1dG8sIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdJbmljaWFuZG8gbGVpdHVyYSBkbyBwcm9kdXRvICcsIGlkcHJvZHV0byk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRfc2t1ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJhZG9yKys7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpIGluIGRhdGFbMF0uaXRlbXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhWzBdLml0ZW1zW2ldW1wiRXNjb2xoYSBhIENvclwiXSA9PSAndW5kZWZpbmVkJykgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3Jfc2t1ID0gZGF0YVswXS5pdGVtc1tpXVtcIkVzY29saGEgYSBDb3JcIl1bMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaTIgaW4gY29yZXNTZWxlY2lvbmFkYXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JfY29tYm8gPSBjb3Jlc1NlbGVjaW9uYWRhc1tpMl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGNvcl9jb21ibyx0eXBlb2YoY29yX2NvbWJvKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvcl9jb21ibyA9PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnVzY2FuZG9cIiwgY29yX2NvbWJvLCBcIiBlbSBcIiwgY29yX3NrdSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvcl9za3UuaW5kZXhPZihjb3JfY29tYm8pID4gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnID0gZGF0YVswXS5pdGVtc1tpXS5pbWFnZXNbMF0uaW1hZ2VUYWc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZF9za3UgPSBkYXRhWzBdLml0ZW1zW2ldLml0ZW1JZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnID0gdGFnLnJlcGxhY2UoJ34nLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA9IHRhZy5yZXBsYWNlKCcjd2lkdGgjJywgJzI5MicpLnJlcGxhY2UoJyN3aWR0aCMnLCAnMjkyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWcgPSB0YWcucmVwbGFjZSgnI2hlaWdodCMnLCAnMjkyJykucmVwbGFjZSgnI2hlaWdodCMnLCAnMjkyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRW5jb250cm91IHVtIHNrdSBjb20gZXNzYSBjb3IgLT4gJywgaWRfc2t1LCBcIiBJbWFnZW0gZGVsYTogXCIsIHRhZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWRfc2t1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL011ZGEgYSBJbWFnZW0gcGFyYSBvIHNrdSBkYSBjb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5wcm9kdWN0LWltYWdlIGltZycpLmZpcnN0KCkucmVwbGFjZVdpdGgodGFnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9NdWRhciBza3UgZG8gbGluayB0bWIgKHBhcmEgYW8gY2xpY2FyLCBpciBwYXJhIG8gc2t1IGNvcnJldG8gamEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZF9za3VfdGhpcyA9ICR0aGlzLmZpbmQoJy5wcm9kdWN0LWxpbmsnKS5hdHRyKCdocmVmJykuc3BsaXQoJ2lkc2t1PScpWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpZF9za3VfdGhpcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucHJvZHVjdC1saW5rJykuYXR0cignaHJlZicsICR0aGlzLmZpbmQoJy5wcm9kdWN0LWxpbmsnKS5hdHRyKCdocmVmJykucmVwbGFjZShpZF9za3VfdGhpcywgaWRfc2t1KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJQcm9kdXRvIGVzY29uZGlkbzogXCIsIGlkcHJvZHV0byk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0F2aXNvIHF1ZSBuZW5odW0gcHJvZHV0byBmb2kgZW5jb250cmFkbyBwYXJhIGVzc2EgY29yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudW1lcmFkb3IgPT0gbnVtZXJvX3Byb2R1dG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCgnLmZpbHRlcnMtYm9keSAucHJhdGlsZWlyYSA+IHVsID4gbGk6dmlzaWJsZScpLnNpemUoKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9fbWVuc2FnZW0gPSBjb3Jlc1NlbGVjaW9uYWRhcy5sZW5ndGggPT0gMSA/IFwiT3BzISBuw4PCo28gY29uc2VndWltb3MgYWNoYXIgbmVuaHVtIHByb2R1dG8gcGFyYSBhIGNvciBzZWxlY2lvbmFkYVwiIDogXCJPcHMhIG7Dg8KjbyBjb25zZWd1aW1vcyBhY2hhciBuZW5odW0gcHJvZHV0byBwYXJhIGFzIGNvcmVzIHNlbGVjaW9uYWRhc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZpbHRlcnMtYm9keSAudml0cmluZTp2aXNpYmxlOmZpcnN0JykucHJlcGVuZChcIjxwIGNsYXNzPSdwLW5vbmUtY29sb3InIHN0eWxlPSdtYXJnaW4tYm90dG9tOiA0N3B4O2ZvbnQtd2VpZ2h0OmJvbGQ7dGV4dC1hbGlnbjpjZW50ZXI7Jz5cIiArIG5vX21lbnNhZ2VtICsgXCI8L3A+XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2soKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckNhdGVnb3J5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gI0FuaW1hw4PCp8ODwqNvIG1lbnUgY2F0ZWdvcmlhIGRlc2t0b3BcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW4ud2lkdGgoKSA+IDEwMjQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jdXN0b20tc2VsZWN0IC5jdXN0b20tc2VsZWN0LXRleHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm5leHQoJ2RpdicpLnNsaWRlVG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vICNNZW51IGNhdGVnb3JpYSB0YWJsZXQvbW9iaWxlXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luLndpZHRoKCkgPCAxMDI1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51Q2F0ZWdvcnlNb2JpbGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmN1c3RvbS1zZWxlY3Qtc2Vjb25kYXJ5LmZha2UgPiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcud3JhcHBlci1tZW51JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5vdmVybGF5LWNhdGVnb3J5JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5vdmVybGF5LWNhdGVnb3J5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLndyYXBwZXItbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcud3JhcHBlci1tZW51IC5jdXN0b20tc2VsZWN0IC5jdXN0b20tc2VsZWN0LXRleHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm5leHQoJ2RpdicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICR3aW4ub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICNGdWxsIGJhY2tncm91bmQgaWNvIHRvcFxuICAgICAgICAkKCcubmF2LXF1YXRlcm5hcnkubmF2LWJsYWNrIHVsIGxpID4gaSA+IGltZycpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XG4gICAgICAgICAgICB2YXIgc3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY3NzKHsgJ2JhY2tncm91bmRJbWFnZSc6ICd1cmwoJyArIHNyYyArICcpJyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gI0hvdmVyIGljb25lcyBjYXRlZ29yaWFzIGUgZGVwYXJ0YW1lbnRvc1xuICAgICAgICAkKCcubmF2LXF1YXRlcm5hcnkubmF2LWJsYWNrIHVsIGxpJykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGJhY2tncm91bmQgPSAkKHRoaXMpLmZpbmQoJ2knKS5hdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgdmFyIGJhY2tncm91bmRIb3ZlciA9IGJhY2tncm91bmQucmVwbGFjZSgnZGVwYXJ0YW1lbnRvJywgJ2NhdGVnb3JpYScpO1xuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpJykuYXR0cignc3R5bGUnLCBiYWNrZ3JvdW5kSG92ZXIpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZCA9ICQodGhpcykuZmluZCgnaScpLmF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZEhvdmVyID0gYmFja2dyb3VuZC5yZXBsYWNlKCdjYXRlZ29yaWEnLCAnZGVwYXJ0YW1lbnRvJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2knKS5hdHRyKCdzdHlsZScsIGJhY2tncm91bmRIb3Zlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIyBoYXNDbGFzcyBjYXBhcnRhbWVudG9cbiAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnZGVwYXJ0YW1lbnQnKSkge1xuICAgICAgICAgICAgLy8gI1NsaWRlciBwcm9kdXRvIChwcm9kdXRvcyB0b3ApIFxuICAgICAgICAgICAgaWYgKCQoJy5zZWN0aW9uLXByb2R1Y3RzLmNhdGVnb3J5LWNvbGxldGlvbi1wcm9kdXRvcy10b3AgLnNsaWRlci1wcm9kdWN0cyAuc2xpZGVyLWNsaXAgLnByYXRpbGVpcmEgdWwnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0U2xpZGVyKCQoJy5zZWN0aW9uLXByb2R1Y3RzLmNhdGVnb3J5LWNvbGxldGlvbi1wcm9kdXRvcy10b3AgLnNsaWRlci1wcm9kdWN0cyAuc2xpZGVyLWNsaXAgLnByYXRpbGVpcmEgdWwnKSk7XG5cbiAgICAgICAgICAgICAgICAkKCcuc2VjdGlvbi1wcm9kdWN0cy5jYXRlZ29yeS1jb2xsZXRpb24tcHJvZHV0b3MtdG9wIC5zaGVsbCAuc2VjdGlvbi1jb250ZW50IC5zbGlkZXItcHJvZHVjdHMgLnNsaWRlci1hY3Rpb25zIC5zbGlkZXItbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuc2VjdGlvbi1wcm9kdWN0cy5jYXRlZ29yeS1jb2xsZXRpb24tcHJvZHV0b3MtdG9wIC5zbGlkZXItcHJvZHVjdHMgLnNsaWRlci1jbGlwIC5wcmF0aWxlaXJhIHVsJykudHJpZ2dlcignb3dsLm5leHQnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoJy5zZWN0aW9uLXByb2R1Y3RzLmNhdGVnb3J5LWNvbGxldGlvbi1wcm9kdXRvcy10b3AgLnNoZWxsIC5zZWN0aW9uLWNvbnRlbnQgLnNsaWRlci1wcm9kdWN0cyAuc2xpZGVyLWFjdGlvbnMgLnNsaWRlci1wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zZWN0aW9uLXByb2R1Y3RzLmNhdGVnb3J5LWNvbGxldGlvbi1wcm9kdXRvcy10b3AgLnNsaWRlci1wcm9kdWN0cyAuc2xpZGVyLWNsaXAgLnByYXRpbGVpcmEgdWwnKS50cmlnZ2VyKCdvd2wucHJldicpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAjU2xpZGVyIHBlb2R1dG8gKG9zIG1haXMgdmVuZGlkb3MpIFxuICAgICAgICAgICAgaWYgKCQoJy5zZWN0aW9uLXByb2R1Y3RzLmNhdGVnb3J5LWNvbGxldGlvbi1tYWlzLXZlbmRpZG9zIC5zaGVsbCAuc2VjdGlvbi1jb250ZW50IC5zbGlkZXItcHJvZHVjdHMgLnNsaWRlci1jbGlwIC5wcmF0aWxlaXJhIHVsJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdFNsaWRlcigkKCcuc2VjdGlvbi1wcm9kdWN0cy5jYXRlZ29yeS1jb2xsZXRpb24tbWFpcy12ZW5kaWRvcyAuc2hlbGwgLnNlY3Rpb24tY29udGVudCAuc2xpZGVyLXByb2R1Y3RzIC5zbGlkZXItY2xpcCAucHJhdGlsZWlyYSB1bCcpKTtcblxuICAgICAgICAgICAgICAgICQoJy5zZWN0aW9uLXByb2R1Y3RzLmNhdGVnb3J5LWNvbGxldGlvbi1tYWlzLXZlbmRpZG9zIC5zaGVsbCAuc2VjdGlvbi1jb250ZW50IC5zbGlkZXItcHJvZHVjdHMgLnNsaWRlci1hY3Rpb25zIC5zbGlkZXItbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuc2VjdGlvbi1wcm9kdWN0cy5jYXRlZ29yeS1jb2xsZXRpb24tbWFpcy12ZW5kaWRvcyAuc2hlbGwgLnNlY3Rpb24tY29udGVudCAuc2xpZGVyLXByb2R1Y3RzIC5zbGlkZXItY2xpcCAucHJhdGlsZWlyYSB1bCcpLnRyaWdnZXIoJ293bC5uZXh0Jyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKCcuc2VjdGlvbi1wcm9kdWN0cy5jYXRlZ29yeS1jb2xsZXRpb24tbWFpcy12ZW5kaWRvcyAuc2hlbGwgLnNlY3Rpb24tY29udGVudCAuc2xpZGVyLXByb2R1Y3RzIC5zbGlkZXItYWN0aW9ucyAuc2xpZGVyLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNlY3Rpb24tcHJvZHVjdHMuY2F0ZWdvcnktY29sbGV0aW9uLW1haXMtdmVuZGlkb3MgLnNoZWxsIC5zZWN0aW9uLWNvbnRlbnQgLnNsaWRlci1wcm9kdWN0cyAuc2xpZGVyLWNsaXAgLnByYXRpbGVpcmEgdWwnKS50cmlnZ2VyKCdvd2wucHJldicpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAjU2xpZGVyIHBlb2R1dG8gKG9zIG1lbGhvcmVzIHByZWNpbmhvcyBwcmEgdm9jw4PCqikgXG4gICAgICAgICAgICBpZiAoJCgnLnNlY3Rpb24tcHJvZHVjdHMuY2F0ZWdvcnktY29sbGV0aW9uLW1lbGhvcmVzLXByZWNpbmhvcyAuc2hlbGwgLnNlY3Rpb24tY29udGVudCAuc2xpZGVyLXByb2R1Y3RzIC5zbGlkZXItY2xpcCAucHJhdGlsZWlyYSB1bCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RTbGlkZXIoJCgnLnNlY3Rpb24tcHJvZHVjdHMuY2F0ZWdvcnktY29sbGV0aW9uLW1lbGhvcmVzLXByZWNpbmhvcyAuc2hlbGwgLnNlY3Rpb24tY29udGVudCAuc2xpZGVyLXByb2R1Y3RzIC5zbGlkZXItY2xpcCAucHJhdGlsZWlyYSB1bCcpKTtcblxuICAgICAgICAgICAgICAgICQoJy5zZWN0aW9uLXByb2R1Y3RzLmNhdGVnb3J5LWNvbGxldGlvbi1tZWxob3Jlcy1wcmVjaW5ob3MgLnNoZWxsIC5zZWN0aW9uLWNvbnRlbnQgLnNsaWRlci1wcm9kdWN0cyAuc2xpZGVyLWFjdGlvbnMgLnNsaWRlci1uZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zZWN0aW9uLXByb2R1Y3RzLmNhdGVnb3J5LWNvbGxldGlvbi1tZWxob3Jlcy1wcmVjaW5ob3MgLnNoZWxsIC5zZWN0aW9uLWNvbnRlbnQgLnNsaWRlci1wcm9kdWN0cyAuc2xpZGVyLWNsaXAgLnByYXRpbGVpcmEgdWwnKS50cmlnZ2VyKCdvd2wubmV4dCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJCgnLnNlY3Rpb24tcHJvZHVjdHMuY2F0ZWdvcnktY29sbGV0aW9uLW1lbGhvcmVzLXByZWNpbmhvcyAuc2hlbGwgLnNlY3Rpb24tY29udGVudCAuc2xpZGVyLXByb2R1Y3RzIC5zbGlkZXItYWN0aW9ucyAuc2xpZGVyLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNlY3Rpb24tcHJvZHVjdHMuY2F0ZWdvcnktY29sbGV0aW9uLW1lbGhvcmVzLXByZWNpbmhvcyAuc2hlbGwgLnNlY3Rpb24tY29udGVudCAuc2xpZGVyLXByb2R1Y3RzIC5zbGlkZXItY2xpcCAucHJhdGlsZWlyYSB1bCcpLnRyaWdnZXIoJ293bC5wcmV2Jyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vICNTbGlkZXIgKGFpbmRhIHTDg8KhIGVtIGTDg8K6dmlkYT8pIC0gU2XDg8Knw4PCo28gMVxuICAgICAgICAgICAgaWYgKCQoJy5zZWN0aW9uLW1ha2V1cCAuc2VjdGlvbi1ib2R5IC5zbGlkZXItbWFrZXVwJykuZXEoMCkpIHtcbiAgICAgICAgICAgICAgICBiYW5uZXJGaWx0ZXJTbGlkZXIoJCgnLnNsaWRlci1tYWtldXAgLnNsaWRlcycpLmVxKDApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gI1NsaWRlciAoYWluZGEgdMODwqEgZW0gZMODwrp2aWRhPykgLSBTZcODwqfDg8KjbyAxXG4gICAgICAgICAgICBpZiAoJCgnLnNlY3Rpb24tbWFrZXVwIC5zZWN0aW9uLWJvZHkgLnNsaWRlci1tYWtldXAnKS5lcSgxKSkge1xuICAgICAgICAgICAgICAgIGJhbm5lckZpbHRlclNsaWRlcigkKCcuc2xpZGVyLW1ha2V1cCAuc2xpZGVzJykuZXEoMSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAjU2xpZGVyIChkw4PCoSB1bWEgb2xoYWRpbmhhIG5lc3NhcyBkaWNhcykgLSBTZcODwqfDg8KjbyAxXG4gICAgICAgICAgICBpZiAoJCgnLnNlY3Rpb24tbWFrZXVwIC5zZWN0aW9uLWJvZHkgLnNsaWRlci1tYWtldXAnKS5lcSgyKSkge1xuICAgICAgICAgICAgICAgIGJhbm5lckZpbHRlclNsaWRlcigkKCcuc2VjdGlvbi1tYWtldXAgLnNlY3Rpb24tYm9keSAuc2xpZGVyLW1ha2V1cCAuc2xpZGVzJykuZXEoMikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAjU2xpZGVyIChkw4PCoSB1bWEgb2xoYWRpbmhhIG5lc3NhcyBkaWNhcykgLSBTZcODwqfDg8KjbyAyXG4gICAgICAgICAgICBpZiAoJCgnLnNlY3Rpb24tbWFrZXVwIC5zZWN0aW9uLWJvZHkgLnNsaWRlci1tYWtldXAnKS5lcSgzKSkge1xuICAgICAgICAgICAgICAgIGJhbm5lckZpbHRlclNsaWRlcigkKCcuc2VjdGlvbi1tYWtldXAgLnNlY3Rpb24tYm9keSAuc2xpZGVyLW1ha2V1cCAuc2xpZGVzJykuZXEoMykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAjU2xpZGVyIEJhbm5lciBtb3VzZSBvdmVyXG4gICAgICAgICAgICBtYWtlU2xpZGVyc01vdmVPbk1vdXNlTW92ZSgpO1xuXG4gICAgICAgICAgICAvLyAjU2xpZGVyIHN1YiBjYXRlZ29yaWFzXG4gICAgICAgICAgICBpZiAoJHdpbi53aWR0aCgpIDw9IDQyMCkge1xuICAgICAgICAgICAgICAgICQoJy5uYXYtcXVhdGVybmFyeS5uYXYtYmxhY2sgLnNoZWxsIHVsJykub3dsQ2Fyb3VzZWwoe1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogMSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBuYXY6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZUJ5OiA0LFxuICAgICAgICAgICAgICAgICAgICBtb3VzZURyYWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHJld2luZE5hdjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNNb2JpbGU6IFs0MjAsIDJdXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKCcubmF2LXF1YXRlcm5hcnkubmF2LWJsYWNrIC5zaGVsbCB1bCcpLmFwcGVuZCgnPGRpdiBjbGFzcz1cInNsaWRlci1hY3Rpb25zIGRlcGFydGFtZW50LXRvcFwiPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzbGlkZXItcHJldlwiPjxpIGNsYXNzPVwiaWNvXCI+PC9pPjwvYT48YSBocmVmPVwiI1wiIGNsYXNzPVwic2xpZGVyLW5leHRcIj48aSBjbGFzcz1cImljb1wiPjwvaT48L2E+PC9kaXY+Jyk7XG5cbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyLWFjdGlvbnMuZGVwYXJ0YW1lbnQtdG9wIC5zbGlkZXItbmV4dCBpLmljbycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcubmF2LXF1YXRlcm5hcnkubmF2LWJsYWNrIC5zaGVsbCB1bCcpLnRyaWdnZXIoJ293bC5uZXh0Jyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyLWFjdGlvbnMuZGVwYXJ0YW1lbnQtdG9wIC5zbGlkZXItcHJldiBpLmljbycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcubmF2LXF1YXRlcm5hcnkubmF2LWJsYWNrIC5zaGVsbCB1bCcpLnRyaWdnZXIoJ293bC5wcmV2Jyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjR3JpZCBzbGlkZXIgcHJvZHVjdFxyXG5cXCogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZnVuY3Rpb24gZ2V0R3JpZFNpemUoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIDwgNDgwID8gMiA6IHdpbmRvdy5pbm5lcldpZHRoIDwgMTAyNSA/IDQgOiB3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQgPyA0IDogNDtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNNZW51IGNhdGVnb3JpYSBtb2JpbGVcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIG1lbnVDYXRlZ29yeU1vYmlsZSgpIHtcbiAgICAkKCdib2R5LmNhdGVnb3J5JykucHJlcGVuZCgnPGRpdiBjbGFzcz1cIndyYXBwZXItbWVudVwiPiA8L2Rpdj4nKTtcbiAgICAkKCdib2R5LmNhdGVnb3J5JykucHJlcGVuZCgnPHNwYW4gY2xhc3M9XCJvdmVybGF5LWNhdGVnb3J5XCI+IDwvc3Bhbj4nKTtcbiAgICAkKCcud3JhcHBlci1tZW51JykuYXBwZW5kKCQoJyNmaWx0ZXJzJykpO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI0FkaWNpb25hIGJhbm5lcnMgXHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiB0aHVtYnNCYW5uZXJzKCkge1xuICAgIHZhciBpbWdDYXRlZ29yeTAxID0gJCgnLmJhbm5lci1jYXRlZ29yeS0wMSA+IC5ib3gtYmFubmVyIGEgPiBpbWcnKS5hdHRyKCdzcmMnKTtcbiAgICB2YXIgaHJlZkNhdGVnb3J5MDEgPSAkKCcuYmFubmVyLWNhdGVnb3J5LTAxID4gLmJveC1iYW5uZXIgYSA+IGltZycpLmF0dHIoJ2hyZWYnKTtcblxuICAgIHZhciBpbWdDYXRlZ29yeTAyID0gJCgnLmJhbm5lci1jYXRlZ29yeS0wMiA+IC5ib3gtYmFubmVyIGEgPiBpbWcnKS5hdHRyKCdzcmMnKTtcbiAgICB2YXIgaHJlZkNhdGVnb3J5MDIgPSAkKCcuYmFubmVyLWNhdGVnb3J5LTAyID4gLmJveC1iYW5uZXIgYSA+IGltZycpLmF0dHIoJ2hyZWYnKTtcblxuICAgIHZhciBpbWdDYXRlZ29yeTAzID0gJCgnLmJhbm5lci1jYXRlZ29yeS0wMyA+IC5ib3gtYmFubmVyIGEgPiBpbWcnKS5hdHRyKCdzcmMnKTtcbiAgICB2YXIgaHJlZkNhdGVnb3J5MDMgPSAkKCcuYmFubmVyLWNhdGVnb3J5LTAzID4gLmJveC1iYW5uZXIgYSA+IGltZycpLmF0dHIoJ2hyZWYnKTtcblxuICAgICQoJy5wcmF0aWxlaXJhIC5wcmF0aWxlaXJhIHVsIGxpJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICAgIGlmIChpbWdDYXRlZ29yeTAxICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYmVmb3JlKCc8bGk+PGRpdiBjbGFzcz1cImltZy1jYXRlZ29yeS1saXN0IGZpc3RcIj48aW1nIHNyYz1cIicgKyBpbWdDYXRlZ29yeTAxICsgJ1wiIGhlaWdodD1cIjM5OFwiIHdpZHRoPVwiMjk4XCIvPjxhIGhyZWY9XCInICsgaHJlZkNhdGVnb3J5MDEgKyAnXCIgY2xhc3M9XCJtZXRhLWNhdGVnb3J5XCI+IGV1IHF1ZXJvICEgPC9hPjwvZGl2PjwvbGk+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09IDkpIHtcbiAgICAgICAgICAgIGlmIChpbWdDYXRlZ29yeTAyICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYmVmb3JlKCc8bGk+PGRpdiBjbGFzcz1cImltZy1jYXRlZ29yeS1saXN0XCI+PGltZyBzcmM9XCInICsgaW1nQ2F0ZWdvcnkwMiArICdcIiBoZWlnaHQ9XCIzOThcIiB3aWR0aD1cIjI5OFwiLz48YSBocmVmPVwiJyArIGhyZWZDYXRlZ29yeTAyICsgJ1wiIGNsYXNzPVwibWV0YS1jYXRlZ29yeVwiPiBzZSBqb2dhICE8L2E+PC9kaXY+PC9saT4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT0gMTUpIHtcbiAgICAgICAgICAgIGlmIChpbWdDYXRlZ29yeTAzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYmVmb3JlKCc8bGk+PGRpdiBjbGFzcz1cImltZy1jYXRlZ29yeS1saXN0XCI+PGltZyBzcmM9XCInICsgaW1nQ2F0ZWdvcnkwMyArICdcIiBoZWlnaHQ9XCIzOThcIiB3aWR0aD1cIjI5OFwiLz48YSBocmVmPVwiJyArIGhyZWZDYXRlZ29yeTAzICsgJ1wiIGNsYXNzPVwibWV0YS1jYXRlZ29yeVwiPiB2ZW0gdmVyICE8L2E+PC9kaXY+PC9saT4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI1ZlcmlmaWNhIGNhdGVnb3JpYXMgcGFyYSBzZXRhciBmaWx0cm9zXHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBmaWx0ZXJDYXRlZ29yeSgpIHtcbiAgICB2YXIgX2NhdGVnb3J5TmFtZSA9IHZ0eGN0eC5kZXBhcnRtZW50TmFtZTtcbiAgICBzd2l0Y2ggKF9jYXRlZ29yeU5hbWUpIHtcbiAgICAgICAgY2FzZSBcIlBlcmZ1bWFyaWFcIjpcbiAgICAgICAgICAgIGZpbHRyb0ZhbWlsaWFPZmF0aXZhKCQoJy5yZWZpbm8uZmlsdHJvX2ZhbWlsaWEtb2xmYXRpdmEnKSk7XG4gICAgICAgICAgICBmaWx0cm9Ib2plUXVlcm8oJCgnLnJlZmluby5maWx0cm9faG9qZS1ldS1xdWVybycpKTtcbiAgICAgICAgICAgICQoJyNzbGVjdG9yLWZhbWlsaWEtb2xmYXRpdmEnKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcjc2xlY3Rvci1ob2plLXF1ZXJvJykuc2hvdygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJVbmhhc1wiOlxuICAgICAgICAgICAgZmlsdHJvQ29yKCQoJy5yZWZpbm8uZmlsdHJvX2VzY29saGEtYS1jb3InKSk7XG4gICAgICAgICAgICBmaWx0cm9Db3IoJCgnLnJlZmluby5maWx0cm9fY29yJykpO1xuICAgICAgICAgICAgZmlsdHJvSG9qZVF1ZXJvKCQoJy5yZWZpbm8uZmlsdHJvX2hvamUtZXUtcXVlcm8nKSk7XG4gICAgICAgICAgICAkKCcjc2xlY3Rvci1ob2plLXF1ZXJvJykuc2hvdygpO1xuICAgICAgICAgICAgJCgnI3NsZWN0b3ItY29yJykuc2hvdygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBY2Vzc8ODwrNyaW9zXCI6XG4gICAgICAgICAgICBmaWx0cm9QcmVjbygkKCcucmVmaW5vLmZpbHRyb19mYWl4YS1kZS1wcmVjbycpKTtcbiAgICAgICAgICAgIGZpbHRyb0hvamVRdWVybygkKCcucmVmaW5vLmZpbHRyb19ob2plLWV1LXF1ZXJvJykpO1xuICAgICAgICAgICAgJCgnI3NsZWN0b3ItaG9qZS1xdWVybycpLnNob3coKTtcbiAgICAgICAgICAgICQoJyNzbGVjdG9yLXByZWNvJykuc2hvdygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJDb3JwbyBlIEJhbmhvXCI6XG4gICAgICAgICAgICBmaWx0cm9QcmVjbygkKCcucmVmaW5vLmZpbHRyb19mYWl4YS1kZS1wcmVjbycpKTtcbiAgICAgICAgICAgIGZpbHRyb0hvamVRdWVybygkKCcucmVmaW5vLmZpbHRyb19ob2plLWV1LXF1ZXJvJykpO1xuICAgICAgICAgICAgJCgnI3NsZWN0b3ItaG9qZS1xdWVybycpLnNob3coKTtcbiAgICAgICAgICAgICQoJyNzbGVjdG9yLXByZWNvJykuc2hvdygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJNYXF1aWFnZW1cIjpcbiAgICAgICAgICAgIGZpbHRyb0NvcigkKCcucmVmaW5vLmZpbHRyb19jb3InKSk7XG4gICAgICAgICAgICBmaWx0cm9Ib2plUXVlcm8oJCgnLnJlZmluby5maWx0cm9faG9qZS1ldS1xdWVybycpKTtcbiAgICAgICAgICAgIGZpbHRyb1ByZWNvKCQoJy5yZWZpbm8uZmlsdHJvX2ZhaXhhLWRlLXByZWNvJykpO1xuICAgICAgICAgICAgJCgnI3NsZWN0b3ItaG9qZS1xdWVybycpLnNob3coKTtcbiAgICAgICAgICAgICQoJyNzbGVjdG9yLXByZWNvJykuc2hvdygpO1xuICAgICAgICAgICAgJCgnI3NsZWN0b3ItY29yJykuc2hvdygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgfVxufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI01vbnRhIGZpbHRybyBob2plIGV1IHF1ZXJvXHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBmaWx0cm9NYXJjYSgkc2VsZWN0b3IpIHtcbiAgICBpZiAoJHNlbGVjdG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyICRjbG9uZU1hcmNhcyA9ICQoJycgKyAkc2VsZWN0b3Iuc2VsZWN0b3IgKyAnPiBkaXYnKS5jbG9uZSgpO1xuICAgICAgICAkKCcuZm9ybS1jb250cm9scy5jdXN0b20tc2VsZWN0LnNsZWN0b3ItbWFyY2EnKS5hcHBlbmQoJGNsb25lTWFyY2FzKTtcblxuICAgICAgICAkKCcuZm9ybS1jb250cm9scy5jdXN0b20tc2VsZWN0LnNsZWN0b3ItbWFyY2EgPiBkaXYgPiBsYWJlbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcbiAgICAgICAgICAgICQoJycgKyAkc2VsZWN0b3Iuc2VsZWN0b3IgKyAnID4gZGl2ID4gbGFiZWxbaW5kZXg9JyArIGluZGV4ICsgJ10gaW5wdXQnKS5hdHRyKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICQoJycgKyAkc2VsZWN0b3Iuc2VsZWN0b3IgKyAnICA+IGRpdiA+IGxhYmVsW2luZGV4PScgKyBpbmRleCArICddIGlucHV0JykuY2hhbmdlKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNzbGVjdG9yLW1hcmNhJykuYWRkQ2xhc3MoJ2NhdGVnb3J5LWZpbHRlci1udWxsJyk7XG4gICAgfVxufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI01vbnRhIGZpbHRybyBob2plIGV1IHF1ZXJvXHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBmaWx0cm9Ib2plUXVlcm8oJHNlbGVjdG9yKSB7XG4gICAgaWYgKCRzZWxlY3Rvci5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciAkY2xvbmVIb2plUXVlcm8gPSAkKCcnICsgJHNlbGVjdG9yLnNlbGVjdG9yICsgJz4gZGl2JykuY2xvbmUoKTtcbiAgICAgICAgJCgnLmZvcm0tY29udHJvbHMuY3VzdG9tLXNlbGVjdC5zbGVjdG9yLWhvamUtcXVlcm8nKS5hcHBlbmQoJGNsb25lSG9qZVF1ZXJvKTtcblxuICAgICAgICAkKCcuZm9ybS1jb250cm9scy5jdXN0b20tc2VsZWN0LnNsZWN0b3ItaG9qZS1xdWVybyA+IGRpdiA+IGxhYmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpO1xuICAgICAgICAgICAgJCgnJyArICRzZWxlY3Rvci5zZWxlY3RvciArICcgPiBkaXYgPiBsYWJlbFtpbmRleD0nICsgaW5kZXggKyAnXSBpbnB1dCcpLmF0dHIoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgICAgICAgJCgnJyArICRzZWxlY3Rvci5zZWxlY3RvciArICcgID4gZGl2ID4gbGFiZWxbaW5kZXg9JyArIGluZGV4ICsgJ10gaW5wdXQnKS5jaGFuZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnI3NsZWN0b3ItaG9qZS1xdWVybycpLmFkZENsYXNzKCdjYXRlZ29yeS1maWx0ZXItbnVsbCcpO1xuICAgIH1cbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNNb250YSBmaWx0cm8gcHJlw4PCp29cclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGZpbHRyb1ByZWNvKCRzZWxlY3Rvcikge1xuICAgIGlmICgkc2VsZWN0b3IubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgJGNsb25lUHJlY28gPSAkKCcnICsgJHNlbGVjdG9yLnNlbGVjdG9yICsgJz4gZGl2JykuY2xvbmUoKTtcbiAgICAgICAgJCgnLmZvcm0tY29udHJvbHMuY3VzdG9tLXNlbGVjdC5zbGVjdG9yLXByZWNvJykuYXBwZW5kKCRjbG9uZVByZWNvKTtcblxuICAgICAgICAkKCcuZm9ybS1jb250cm9scy5jdXN0b20tc2VsZWN0LnNsZWN0b3ItcHJlY28gPiBkaXYgPiBsYWJlbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcbiAgICAgICAgICAgICQoJycgKyAkc2VsZWN0b3Iuc2VsZWN0b3IgKyAnID4gZGl2ID4gbGFiZWxbaW5kZXg9JyArIGluZGV4ICsgJ10gaW5wdXQnKS5hdHRyKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICQoJycgKyAkc2VsZWN0b3Iuc2VsZWN0b3IgKyAnICA+IGRpdiA+IGxhYmVsW2luZGV4PScgKyBpbmRleCArICddIGlucHV0JykuY2hhbmdlKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNzbGVjdG9yLXByZWNvJykuYWRkQ2xhc3MoJ2NhdGVnb3J5LWZpbHRlci1udWxsJyk7XG4gICAgfVxufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI01vbnRhIGZpbHRybyBmYW1pbGlhIG9mYXRpdmFcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGZpbHRyb0ZhbWlsaWFPZmF0aXZhKCRzZWxlY3Rvcikge1xuICAgIGlmICgkc2VsZWN0b3IubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgJGNsb25lQ29yID0gJCgnJyArICRzZWxlY3Rvci5zZWxlY3RvciArICc+IGRpdicpLmNsb25lKCk7XG4gICAgICAgICQoJyNzbGVjdG9yLWZhbWlsaWEtb2xmYXRpdmEgLmZvcm0tY29udHJvbHMuY3VzdG9tLXNlbGVjdCcpLmFwcGVuZCgkY2xvbmVDb3IpO1xuXG4gICAgICAgICQoJyNzbGVjdG9yLWZhbWlsaWEtb2xmYXRpdmEgLmZvcm0tY29udHJvbHMuY3VzdG9tLXNlbGVjdCA+IGRpdiA+IGxhYmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpO1xuICAgICAgICAgICAgJCgnJyArICRzZWxlY3Rvci5zZWxlY3RvciArICcgPiBkaXYgPiBsYWJlbFtpbmRleD0nICsgaW5kZXggKyAnXSBpbnB1dCcpLmF0dHIoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgICAgICAgJCgnJyArICRzZWxlY3Rvci5zZWxlY3RvciArICcgID4gZGl2ID4gbGFiZWxbaW5kZXg9JyArIGluZGV4ICsgJ10gaW5wdXQnKS5jaGFuZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnI3NsZWN0b3ItZmFtaWxpYS1vbGZhdGl2YScpLmFkZENsYXNzKCdjYXRlZ29yeS1maWx0ZXItbnVsbCcpO1xuICAgIH1cbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNNb250YSBmaWx0cm8gY29yXHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmZ1bmN0aW9uIGZpbHRyb0Nvcigkc2VsZWN0b3IpIHtcbiAgICBpZiAoJHNlbGVjdG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyICRjbG9uZUNvciA9ICQoJycgKyAkc2VsZWN0b3Iuc2VsZWN0b3IgKyAnPiBkaXYnKS5jbG9uZSgpO1xuICAgICAgICAkKCcuZm9ybS1jb250cm9scy5jdXN0b20tc2VsZWN0LnNsZWN0b3ItY29yJykuYXBwZW5kKCRjbG9uZUNvcik7XG5cbiAgICAgICAgJCgnLmZvcm0tY29udHJvbHMuY3VzdG9tLXNlbGVjdC5zbGVjdG9yLWNvciA+IGRpdiA+IGxhYmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpO1xuXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgICQoJycgKyAkc2VsZWN0b3Iuc2VsZWN0b3IgKyAnID4gZGl2ID4gbGFiZWxbaW5kZXg9JyArIGluZGV4ICsgJ10gaW5wdXQnKS5hdHRyKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnJyArICRzZWxlY3Rvci5zZWxlY3RvciArICcgPiBkaXYgPiBsYWJlbFtpbmRleD0nICsgaW5kZXggKyAnXSBpbnB1dCcpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UcmlnZ2VyIG5vIGRhIHZ0ZXhcbiAgICAgICAgICAgICQoJycgKyAkc2VsZWN0b3Iuc2VsZWN0b3IgKyAnICA+IGRpdiA+IGxhYmVsW2luZGV4PScgKyBpbmRleCArICddIGlucHV0JykuY2hhbmdlKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNzbGVjdG9yLWNvcicpLmFkZENsYXNzKCdjYXRlZ29yeS1maWx0ZXItbnVsbCcpO1xuICAgIH1cbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNTbGlkZXIgYmFubmVycyBmaWx0cm9zXHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBtYWtlU2xpZGVyc01vdmVPbk1vdXNlTW92ZSgpIHtcbiAgICAkKCcuc2xpZGVyLW1ha2V1cCcpLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgJCh0aGlzKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLm93bC13cmFwcGVyJykuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIGUucGFnZVggLyAxLjY2NTQgKiAtMSArICdweCwgMHB4LCAwcHgpJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjU2xpZGVyIHByb2R1Y3RcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIHByb2R1Y3RTbGlkZXIoJHNlbGVjdG9yKSB7XG4gICAgJHNlbGVjdG9yLm93bENhcm91c2VsKHtcbiAgICAgICAgaXRlbXM6IDQsXG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgbmF2OiBmYWxzZSxcbiAgICAgICAgc2xpZGVCeTogZ2V0R3JpZFNpemUoKSxcbiAgICAgICAgbW91c2VEcmFnOiBmYWxzZSxcbiAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgcmV3aW5kTmF2OiB0cnVlLFxuICAgICAgICBpdGVtc1RhYmxldDogWzc2OCwgM10sXG4gICAgICAgIGl0ZW1zTW9iaWxlOiBbNDIwLCAyXVxuICAgIH0pO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI1NsaWRlciBiYW5uZXJzIGZpbHRyb3NcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGJhbm5lckZpbHRlclNsaWRlcigkc2VsZWN0b3IpIHtcbiAgICAkc2VsZWN0b3Iub3dsQ2Fyb3VzZWwoe1xuICAgICAgICBpdGVtczogNSxcbiAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICBuYXY6IGZhbHNlLFxuICAgICAgICBtb3VzZURyYWc6IGZhbHNlLFxuICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICByZXdpbmROYXY6IGZhbHNlLFxuICAgICAgICBpdGVtc1RhYmxldDogWzc2OCwgMy4zXVxuICAgIH0pO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG4gICAgI0dldCByZWN1c2l2aWRhZGUgY2F0ZWdvcmlhXHJcblxcKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBnZXRDYXRlZ29yeUluZm9ybWF0aW9uKCkge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvY2F0YWxvZ19zeXN0ZW0vcHViL2NhdGVnb3J5L3RyZWUvMy8nLFxuICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgICAgIHJlY3Vyc2l2ZUNhdGVnb3J5KGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoX2Vycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcbiAgICAjUmVjdXNpdmlkYWRlIGNhdGVnb3JpYVxyXG5cXCogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZnVuY3Rpb24gcmVjdXJzaXZlQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhdGVnb3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjYXRlZ29yeVtpXS5pZCA9PSB2dHhjdHguY2F0ZWdvcnlJZCkge1xuICAgICAgICAgICAgc2V0Q2hpbGRyZW5zSW5mb3JtYXRpb24oY2F0ZWdvcnlbaV0pO1xuICAgICAgICB9IGVsc2UgaWYgKGkgPT0gY2F0ZWdvcnkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjYXRlZ29yeS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZUNhdGVnb3J5KGNhdGVnb3J5W2pdLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqXFxcclxuICAgICNTZXRhIHN1YiBjYXRlZ29yaWFzIG5vIHRvcG9cclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIHNldENoaWxkcmVuc0luZm9ybWF0aW9uKGNhdGVnb3J5KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXRlZ29yeS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdkZXBhcnRhbWVudCcpKSB7XG4gICAgICAgICAgICAkKCcubmF2LXF1YXRlcm5hcnkgPiAuc2hlbGwgPiB1bCcpLmFwcGVuZCgnPGxpIGRhdGEtaWQtY2F0ZW9yeT1cIicgKyBjYXRlZ29yeS5jaGlsZHJlbltpXS5pZCArICdcIiBkYXRhLW5hbWUtY2F0ZWdvcnk9XCInICsgY2F0ZWdvcnkuY2hpbGRyZW5baV0ubmFtZSArICdcIj4gPGkgY2xhc3M9XCJpY28tZGVwYXJ0YW1lbnQtZmlsdGVyXCI+IDxpbWcgc3JjPVwiL2FycXVpdm9zL2ljb19kZXBhcnRhbWVudG9fJyArIGNhdGVnb3J5LmNoaWxkcmVuW2ldLmlkICsgJy5wbmdcIi8+IDwvaT4gPGgyPjxhIGhyZWY9XCInICsgY2F0ZWdvcnkuY2hpbGRyZW5baV0udXJsICsgJ1wiIHJlbD1cInY6dXJsXCI+JyArIGNhdGVnb3J5LmNoaWxkcmVuW2ldLm5hbWUgKyAnPC9hPjwvaDI+IDwvbGk+Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdjYXRlZ29yeScpKSB7XG4gICAgICAgICAgICAkKCcubmF2LXF1YXRlcm5hcnkgPiAuc2hlbGwgPiB1bCcpLmFwcGVuZCgnPGxpIGRhdGEtaWQtY2F0ZW9yeT1cIicgKyBjYXRlZ29yeS5jaGlsZHJlbltpXS5pZCArICdcIiBkYXRhLW5hbWUtY2F0ZWdvcnk9XCInICsgY2F0ZWdvcnkuY2hpbGRyZW5baV0ubmFtZSArICdcIj4gIDxoMj48YSBocmVmPVwiJyArIGNhdGVnb3J5LmNoaWxkcmVuW2ldLnVybCArICdcIj4nICsgY2F0ZWdvcnkuY2hpbGRyZW5baV0ubmFtZSArICc8L2E+PC9oMj48L2xpPicpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
},{}]},{},[1])