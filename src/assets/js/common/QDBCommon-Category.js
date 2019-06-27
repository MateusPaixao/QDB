(function($, window, document, undefined) {
    var $win = $(window);
    var $doc = $(document);

    $doc.ready(function() {
        getCategoryInformation();
        thumbsBanners();

        // #Remove <li> criada pela vtex
        $('.helperComplement').remove();

        // #Troca H3 por H2 na pÃ¡gina de dep e categoria
        $('body.departament .section-products h3, body.category .section-products h3').replaceWith(function(){
            return $('<h2/>', {
                html: this.innerHTML
            });
        });

        // #Trocar paragrÃ¡fo(P) por H2 no nome do produto na pratileira
        $('body.departament .product .product-content p, body.category .product .product-content p').replaceWith(function(){
            return $('<h3/>', {
                html: this.innerHTML
            });
        });

        // #Select ordenaÃ§Ã£o por preÃ§o 
        $('.breadcrumbs .bread-crumb > ul > li').eq(0).text('pÃ¡gina inicial')
 

        // #Soma quantidade total de produtos na categoria 
        $(".filters .filters-head p .total-prpduct").text($('.searchResultsTime .resultado-busca-numero .value').eq(0).text());


        // #Adiciona nome da categoria 
        $('.nav-quaternary .nav-title').text(vtxctx.categoryName);


        // #Select ordenaÃ§Ã£o por preÃ§o 
        if ($('.form-controls.custom-select.custom-select-secondary select').length == 0){
            var select = $('.sub .resultado-busca-filtro .orderBy select').eq(0).clone();
            $('.form-controls.custom-select.custom-select-secondary').append(select);
        }
        

        // #Chamada Smart Research
		
        if($('body').hasClass('category')) {
            $(".menu-departamento input[type='checkbox']").vtexSmartResearch({
                pageLimit:1,
                shelfCallback:function(){
					
					//return;
                    // #Adiciona img produto
                    $('.product .product-image > img').addClass('fix-product background');
                    //fixProduct();


                    var imageTag;
                    var linkSku;
                    var coresSelecionadas = [];
					
                    $('.slector-cor input:checkbox:checked').each(function() {
                        var $this = $(this);
                        coresSelecionadas.push($this.attr('value'));
                    });
					
					//Laco que percorre os produtos trazidos do filtro de cores da vtex, e verifica se tem sku com aquela cor(s).
					$('.p-none-color').remove();
					
					if(window.location.href.indexOf('/maquiagem/boca/batom') > -1 && coresSelecionadas.length > 0){
						
						
						console.clear();
						console.log('coresSelecionadas ', coresSelecionadas);
						
						
						numero_produtos = $(this.shelfClass + '.vitrine > ul > li').not('.helperComplement').size();
						$('.p-none-color').remove();
						numerador = 0;
						
						$(this.shelfClass + '.vitrine > ul > li').not('.helperComplement').each(function() {

							var $this = $(this);
							var idproduto = $(this).find('.product .product-skus .idproduto').val();
							
							
							$.get('/api/catalog_system/pub/products/search/?fq=productId:' + idproduto, function(data) {
									
								console.warn('Iniciando leitura do produto ',idproduto);
								
								id_sku = 0;
								tag = 0;
								numerador++;
							
								for(i in data[0].items) {
									
									if(typeof(data[0].items[i]["Escolha a Cor"]) == 'undefined') continue;
									cor_sku = data[0].items[i]["Escolha a Cor"][0];
									
									for(i2 in coresSelecionadas) {
										cor_combo = coresSelecionadas[i2];
										
										//console.log(cor_combo,typeof(cor_combo))
										if(typeof(cor_combo) == 'string') {
											
											console.log("buscando",cor_combo," em ",cor_sku);
											
											if(cor_sku.indexOf(cor_combo) > -1) {
												
												tag = (data[0].items[i].images[0].imageTag);
												id_sku = (data[0].items[i].itemId);
												
												tag = (tag.replace('~',window.location.origin));
												tag = (tag.replace('#width#','292').replace('#width#','292'));
												tag = (tag.replace('#height#','292').replace('#height#','292'));
												
												console.warn('Encontrou um sku com essa cor -> ',id_sku," Imagem dela: ",tag)
												
											}
											
										}
									}
								}
									
								if(id_sku){
									//Muda a Imagem para o sku da cor
									$this.find('.product-image img').first().replaceWith(tag);
									
									//Mudar sku do link tmb (para ao clicar, ir para o sku correto ja)
									id_sku_this = $this.find('.product-link').attr('href').split('idsku=')[1];
									if(typeof(id_sku_this) !== 'undefined') {
										$this.find('.product-link').attr('href',$this.find('.product-link').attr('href').replace(id_sku_this,id_sku));
									}
								} else {
									console.warn("Produto escondido: ",idproduto)
									$this.hide();
								}
								
								//Aviso que nenhum produto foi encontrado para essa cor
								if(numerador == numero_produtos) {
									if($('.filters-body .pratileira > ul > li:visible').size() == 0) {
										no_mensagem = coresSelecionadas.length == 1 ? "Ops! nÃ£o conseguimos achar nenhum produto para a cor selecionada" : "Ops! nÃ£o conseguimos achar nenhum produto para as cores selecionadas";
										window.setTimeout(function(){$('.filters-body .vitrine:visible:first').prepend("<p class='p-none-color' style='margin-bottom: 47px;font-weight:bold;text-align:center;'>"+no_mensagem+"</p>")},500);
									}
								}
								
								
							});
							
							
						});
					}
					
                },
                callback: function(){
                    filterCategory();

                    // #AnimaÃ§Ã£o menu categoria desktop
                    if($win.width() > 1024) {   
                        $('.custom-select .custom-select-text').on('click', function(event) {
                            $(this).next('div').slideToggle();
                        });
                    }

                    // #Menu categoria tablet/mobile
                    if($win.width() < 1025) {
                        menuCategoryMobile();

                        $('.custom-select-secondary.fake > a').on('click', function(event) {
                            event.preventDefault();
                            $('.wrapper-menu').addClass('active');
                            $('.overlay-category').addClass('active');
                        });

                        $('.overlay-category').on('click', function(event) {
                            $(this).removeClass('active');
                            $('.wrapper-menu').removeClass('active');
                        });

                        $('.wrapper-menu .custom-select .custom-select-text').on('click', function(event) {
                            $(this).next('div').toggleClass('active');
                            $(this).toggleClass('active');
                            $(this).parent().parent().toggleClass('active');
                        });
                    }
                }
            });
        }
    });

    $win.on('load', function(){
        // #Full background ico top
        $('.nav-quaternary.nav-black ul li > i > img').each(function (index,item) {
            var src = $(this).attr('src');
            $(this).parent().css({ 'backgroundImage': 'url(' + src + ')' });
        });


        // #Hover icones categorias e departamentos
        $('.nav-quaternary.nav-black ul li').hover(function() {
            var background = $(this).find('i').attr('style');
            var backgroundHover = background.replace('departamento','categoria');
            $(this).find('i').attr('style',backgroundHover); 
        }, function() {
            var background = $(this).find('i').attr('style');
            var backgroundHover = background.replace('categoria','departamento');
            $(this).find('i').attr('style',backgroundHover);
        });

        //# hasClass capartamento
        if ($('body').hasClass('departament')){
            // #Slider produto (produtos top) 
            if($('.section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul').length){
                productSlider($('.section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul'));

                $('.section-products.category-colletion-produtos-top .shell .section-content .slider-products .slider-actions .slider-next').on('click', function(event) {
                event.preventDefault();
                $('.section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul').trigger('owl.next');
                });

                $('.section-products.category-colletion-produtos-top .shell .section-content .slider-products .slider-actions .slider-prev').on('click', function(event) {
                event.preventDefault();
                $('.section-products.category-colletion-produtos-top .slider-products .slider-clip .pratileira ul').trigger('owl.prev');
                }); 
            }


            // #Slider peoduto (os mais vendidos) 
            if($('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul').length){
                productSlider($('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul')) 

                $('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-actions .slider-next').on('click', function(event) {
                event.preventDefault();
                $('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul').trigger('owl.next');
                });

                $('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-actions .slider-prev').on('click', function(event) {
                    event.preventDefault();
                    $('.section-products.category-colletion-mais-vendidos .shell .section-content .slider-products .slider-clip .pratileira ul').trigger('owl.prev');
                }); 
            }


            // #Slider peoduto (os melhores precinhos pra vocÃª) 
            if($('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul').length){
                productSlider($('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul'));   

                $('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-actions .slider-next').on('click', function(event) {
                    event.preventDefault();
                    $('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul').trigger('owl.next');
                });

                $('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-actions .slider-prev').on('click', function(event) {
                    event.preventDefault();
                    $('.section-products.category-colletion-melhores-precinhos .shell .section-content .slider-products .slider-clip .pratileira ul').trigger('owl.prev');
                }); 
            }


            // #Slider (ainda tÃ¡ em dÃºvida?) - SeÃ§Ã£o 1
            if($('.section-makeup .section-body .slider-makeup').eq(0)){
                bannerFilterSlider($('.slider-makeup .slides').eq(0));
            }


            // #Slider (ainda tÃ¡ em dÃºvida?) - SeÃ§Ã£o 1
            if($('.section-makeup .section-body .slider-makeup').eq(1)){
                bannerFilterSlider($('.slider-makeup .slides').eq(1))
            }

           
            // #Slider (dÃ¡ uma olhadinha nessas dicas) - SeÃ§Ã£o 1
            if($('.section-makeup .section-body .slider-makeup').eq(2)){
                bannerFilterSlider($('.section-makeup .section-body .slider-makeup .slides').eq(2));
            }    


            // #Slider (dÃ¡ uma olhadinha nessas dicas) - SeÃ§Ã£o 2
            if($('.section-makeup .section-body .slider-makeup').eq(3)){
                bannerFilterSlider($('.section-makeup .section-body .slider-makeup .slides').eq(3));
            }


            // #Slider Banner mouse over
            makeSlidersMoveOnMouseMove();


            // #Slider sub categorias
            if($win.width() <= 420) {
                $('.nav-quaternary.nav-black .shell ul').owlCarousel({
                    items: 1,
                    autoplay: false,
                    nav: false,
                    slideBy: 4,
                    mouseDrag: true,
                    loop: true,
                    rewindNav: true,
                    itemsMobile : [420, 2],
                });

                $('.nav-quaternary.nav-black .shell ul').append('<div class="slider-actions departament-top"><a href="#" class="slider-prev"><i class="ico"></i></a><a href="#" class="slider-next"><i class="ico"></i></a></div>');
            
                $('.slider-actions.departament-top .slider-next i.ico').on('click', function(event) {
                    event.preventDefault();
                    $('.nav-quaternary.nav-black .shell ul').trigger('owl.next');
                });

                $('.slider-actions.departament-top .slider-prev i.ico').on('click', function(event) {
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
function getGridSize(){
    return (window.innerWidth < 480) ? 2 :
    (window.innerWidth < 1025) ? 4:
    (window.innerWidth > 1024) ? 4 : 4;
}

/* ====================================================================== *\
    #Menu categoria mobile
\* ====================================================================== */
function menuCategoryMobile(){
    $('body.category').prepend('<div class="wrapper-menu"> </div>');
    $('body.category').prepend('<span class="overlay-category"> </span>');
    $('.wrapper-menu').append($('#filters'))
}

/* ====================================================================== *\
    #Adiciona banners 
\* ====================================================================== */
function thumbsBanners(){
    var imgCategory01 = $('.banner-category-01 > .box-banner a > img').attr('src');
    var hrefCategory01 = $('.banner-category-01 > .box-banner a > img').attr('href');

    var imgCategory02 = $('.banner-category-02 > .box-banner a > img').attr('src');
    var hrefCategory02 = $('.banner-category-02 > .box-banner a > img').attr('href');

    var imgCategory03 = $('.banner-category-03 > .box-banner a > img').attr('src');
    var hrefCategory03 = $('.banner-category-03 > .box-banner a > img').attr('href');

    $('.pratileira .pratileira ul li').each(function (index, item) {
        if (index == 0){
            if(imgCategory01 != undefined){
                $(this).before('<li><div class="img-category-list fist"><img src="'+ imgCategory01 + '" height="398" width="298"/><a href="' + hrefCategory01 + '" class="meta-category"> eu quero ! </a></div></li>');
            }
        }
        if (index == 9){
            if(imgCategory02 != undefined){
                $(this).before('<li><div class="img-category-list"><img src="'+ imgCategory02 + '" height="398" width="298"/><a href="' + hrefCategory02 + '" class="meta-category"> se joga !</a></div></li>');
            }
        }
        if (index == 15){
            if(imgCategory03 != undefined){
                $(this).before('<li><div class="img-category-list"><img src="'+ imgCategory03 + '" height="398" width="298"/><a href="' + hrefCategory03 + '" class="meta-category"> vem ver !</a></div></li>');
            }
        }
    });
}

/* ====================================================================== *\
    #Verifica categorias para setar filtros
\* ====================================================================== */
function filterCategory(){
    var _categoryName = vtxctx.departmentName;
    switch(_categoryName){
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
function filtroMarca($selector){
    if($selector.length > 0){
        var $cloneMarcas = $(''+ $selector.selector + '> div').clone();
        $('.form-controls.custom-select.slector-marca').append($cloneMarcas);

        $('.form-controls.custom-select.slector-marca > div > label').on('click', function(){
            var index = $(this).index();
            $('' + $selector.selector + ' > div > label[index=' + index  + '] input').attr('checked','checked');
            $('' + $selector.selector + '  > div > label[index=' + index  + '] input').change();
        });
    }
    else{
        $('#slector-marca').addClass('category-filter-null');  
    }
}

/* ====================================================================== *\
    #Monta filtro hoje eu quero
\* ====================================================================== */
function filtroHojeQuero($selector){
    if($selector.length > 0){
        var $cloneHojeQuero = $(''+ $selector.selector + '> div').clone();
        $('.form-controls.custom-select.slector-hoje-quero').append($cloneHojeQuero);

        $('.form-controls.custom-select.slector-hoje-quero > div > label').on('click', function(){
            var index = $(this).index();
            $('' + $selector.selector + ' > div > label[index=' + index  + '] input').attr('checked','checked');
            $('' + $selector.selector + '  > div > label[index=' + index  + '] input').change();
        });
    }
    else{
        $('#slector-hoje-quero').addClass('category-filter-null');  
    }  
}

/* ====================================================================== *\
    #Monta filtro preÃ§o
\* ====================================================================== */
function filtroPreco($selector){
    if($selector.length > 0){
        var $clonePreco = $(''+ $selector.selector + '> div').clone();
        $('.form-controls.custom-select.slector-preco').append($clonePreco);

        $('.form-controls.custom-select.slector-preco > div > label').on('click', function(){
            var index = $(this).index();
            $('' + $selector.selector + ' > div > label[index=' + index  + '] input').attr('checked','checked');
            $('' + $selector.selector + '  > div > label[index=' + index  + '] input').change();
        });
    }
    else{
        $('#slector-preco').addClass('category-filter-null');  
    }
}

/* ====================================================================== *\
    #Monta filtro familia ofativa
\* ====================================================================== */
function filtroFamiliaOfativa($selector){
    if($selector.length > 0){
        var $cloneCor = $(''+ $selector.selector + '> div').clone();
        $('#slector-familia-olfativa .form-controls.custom-select').append($cloneCor);

        $('#slector-familia-olfativa .form-controls.custom-select > div > label').on('click', function(){
            var index = $(this).index();
            $('' + $selector.selector + ' > div > label[index=' + index  + '] input').attr('checked','checked');
            $('' + $selector.selector + '  > div > label[index=' + index  + '] input').change();
        });
    }
    else{
        $('#slector-familia-olfativa').addClass('category-filter-null');  
    }
}

/* ====================================================================== *\
    #Monta filtro cor
\* ====================================================================== */

function filtroCor($selector){
    if($selector.length > 0){
        var $cloneCor = $(''+ $selector.selector + '> div').clone();
        $('.form-controls.custom-select.slector-cor').append($cloneCor);

        $('.form-controls.custom-select.slector-cor > div > label').on('click', function(){
            var index = $(this).index();
			
			if($(this).is(':checked')) {
				$('' + $selector.selector + ' > div > label[index=' + index  + '] input').attr('checked','checked');
			} else {
				$('' + $selector.selector + ' > div > label[index=' + index  + '] input').removeAttr('checked');
			}
			
			//Trigger no da vtex
            $('' + $selector.selector + '  > div > label[index=' + index  + '] input').change();
        });
    }
    else{
        $('#slector-cor').addClass('category-filter-null');  
    }
}

/* ====================================================================== *\
    #Slider banners filtros
\* ====================================================================== */
function makeSlidersMoveOnMouseMove() {
    $('.slider-makeup').each(function(i){
        $(this).hover(function(){
            $(this).on('mousemove', function(e){
               $(this).find('.owl-wrapper').css('transform', 'translate3d(' + (e.pageX / 1.6654) * -1 + 'px, 0px, 0px)');
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
        itemsTablet : [768, 3],
        itemsMobile : [420, 2],
    });
}

/* ====================================================================== *\
    #Slider banners filtros
\* ====================================================================== */
function bannerFilterSlider($selector){
   $selector.owlCarousel({
        items: 5,
        autoplay: false,
        nav: false,
        mouseDrag: false,
        loop: true,
        rewindNav: false,
        itemsTablet : [768, 3.3],
   });
}

/* ====================================================================== *\
    #Get recusividade categoria
\* ====================================================================== */
function getCategoryInformation(){
    $.ajax({
        url: '/api/catalog_system/pub/category/tree/3/',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(data){
            recursiveCategory(data)
        },
        error: function(error){
            console.log(error);
        },
    });
}

/* ====================================================================== *\
    #Recusividade categoria
\* ====================================================================== */
function recursiveCategory(category){
    for (var i = 0; i < category.length; i++) {
        if(category[i].id == vtxctx.categoryId){ 
            setChildrensInformation(category[i]);
        }else if(i == category.length - 1){
            for (var j = 0; j < category.length; j++) {
               recursiveCategory(category[j].children)
            }
        }
    }
}

/* ====================================================================== *\
    #Seta sub categorias no topo
\* ====================================================================== */
function setChildrensInformation(category){
    for (var i = 0; i < category.children.length; i++){
        if($('body').hasClass('departament')){
            $('.nav-quaternary > .shell > ul').append('<li data-id-cateory="' + category.children[i].id + '" data-name-category="' + category.children[i].name + '"> <i class="ico-departament-filter"> <img src="/arquivos/ico_departamento_' + category.children[i].id + '.png"/> </i> <h2><a href="' + category.children[i].url + '" rel="v:url">' + category.children[i].name + '</a></h2> </li>')
        } else if($('body').hasClass('category')){
            $('.nav-quaternary > .shell > ul').append('<li data-id-cateory="' + category.children[i].id + '" data-name-category="' + category.children[i].name + '">  <h2><a href="' + category.children[i].url + '">' + category.children[i].name + '</a></h2></li>')
        }
    }
}