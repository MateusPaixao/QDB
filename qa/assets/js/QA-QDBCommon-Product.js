!function a(i,s,n){function l(o,e){if(!s[o]){if(!i[o]){var t="function"==typeof require&&require;if(!e&&t)return t(o,!0);if(c)return c(o,!0);throw new Error("Cannot find module '"+o+"'")}var r=s[o]={exports:{}};i[o][0].call(r.exports,function(e){var t=i[o][1][e];return l(t||e)},r,r.exports,a,i,s,n)}return s[o].exports}for(var c="function"==typeof require&&require,e=0;e<n.length;e++)l(n[e]);return l}({1:[function(e,t,o){"use strict";var r,a,i,s,n,u="";function f(e,t){t.parentNode.insertBefore(e,t.nextSibling)}function l(){var e=r(".select-cor-new").height();200<e&&(n.width()<1008&&620<n.width()?r(".product-details .product-content").css("margin-top","-"+(e/2-20)+"px"):r(".product-details .product-content").removeAttr("style"))}u=navigator.vendor.match(/google/i)?"chrome/blink":navigator.vendor.match(/apple/i)?"safari/webkit":navigator.userAgent.match(/firefox\//i)?"firefox/gecko":navigator.userAgent.match(/edge\//i)?"edge/edgehtml":navigator.userAgent.match(/trident\//i)?"ie/trident":navigator.userAgent+"\n"+navigator.vendor,r=jQuery,a=window,i=document,n=r(a),r(i).ready(function(){r(".topic > li > span label").click(function(e){e.preventDefault();var t=r(this).attr("for");r("#"+t).click()}),p(),function(){var e=$("#spnRatingProdutoTop").text();$(".evaluation-rate-result").text(e+" avaliaÃ§Ãµes"),$(".product-head .product-evaluation > span").css("width",e+"%");var t=$(".value-field.Modo-de-Uso").text();$(".tabs .tab-content .specification-modo-usar > p").text(t);var o=$(".value-field.Imagem-descricao").eq(0).text();null==o||""==o||null==o?($(".section-tabs .tab-content").css("width","100%"),$(".section-tabs .tab-image img").parent().remove()):$(".tabs .tab-image").append('<img src="'+o+'" height="637" width="407"/>');var r=$(".specification-modo-usar > p").text();""!=r&&null!=r&&null!=r||$("#tab1 .tab-content h3").eq(1).hide();var a=$("#tab2 > p").text();null!=a&&""!=a&&null!=a||($("#tab2").hide(),$(".tabs .tabs-nav li").eq(1).hide());var i=$(".value-field.Precaucoes-de-Uso").text();null==i||""==i||null==i?($("#tab2").hide(),$(".tabs .tabs-nav li").eq(3).hide()):$("#tab4 > p").append(i);var s=$(".value-field.se-joga-nesse-produto").html();null==s||""==s||null==s?($(".product-details .product-content strong").hide(),$(".section-product").css("margin-bottom","170px"),$(".product-details .product-content").css("padding-top","5px")):$(".product-content .list-bullets").append(s);var n=$(".value-field.porque-a-gente-ama").html()||"";n&&$(".section-entry .list-hearts").append("<li> <p>"+n+"</p></li>");var l=$("td.value-field.Ficha-Tecnica").html();null==l||""==l||null==l?($("#tab2").hide(),$(".tabs .tabs-nav li").eq(2).hide()):$(".tabs-body #tab3").append('<div class="fichat-tecnica">'+l+"<div/>")}(),function(e){var t=20*e.replace("R$","").replace(",",".");"undefined"!=t?$(".product-tag .product-clube-pontos").text(parseInt(t)+" pontos"):$(".product-details .product-tag").hide()}(r(".plugin-preco .valor-por .skuBestPrice").text()),function(e){var t,o,r,a,i,s=window.location.href;null!=skuJson&&(t=skuJson.name),o="http://www.facebook.com/sharer/sharer.php?u="+s+"&title="+t,r="http://twitter.com/intent/tweet?status="+t+"+"+s,a="http://pinterest.com/pin/create/bookmarklet/?media=[MEDIA]&url="+s+"&is_video=false&description="+t,i="https://plus.google.com/share?url="+s,$(e).click(function(){switch($(this).attr("class")){case"facebook":window.open(o,"_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=0, width=400, height=400");break;case"twitter":window.open(r,"_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=0, width=600, height=600");break;case"pinterest":window.open(a,"_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=0, width=600, height=600");break;case"googleplus":window.open(i,"_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=0, width=600, height=600")}return!1})}(".socials-secondary a"),function(){$(".slider-colors").prepend('<div class="select-cor-new"></div>'),$(".product-details .product-head").append('<div class="cor-select"><p></p></div>');var e=$(".select.skuList.item-dimension-Escolhaacor .group_0").clone();$(".select-cor-new").append(e),$(".select-cor-new span input").each(function(e,t){$(this).remove()}),new c(".select-cor-new"),$(".slider-colors .slider-next").live("mousedown",function(){$(".slider-colors .owl-item:last").animate({opacity:.2},160,function(){$(".slider-colors .owl-item:last").animate({opacity:1},160)})});var t=document.querySelectorAll(".product-disabled.item_unavailable"),o=document.querySelector(".select-cor-new > span > label :last-child");if(0<$(".select-cor-new > span > label").length)if("edge/edgehtml"==u||"ie/trident"==u)for(var r=0;r<t.length;r++)t[r].insertAfterr(t[r],o);else document.querySelectorAll(".product-disabled.item_unavailable").forEach(function(e){$(e).insertAfter($(".select-cor-new > span > label :last-child"))});0<$(".select-cor-new > span > label").length&&768<$(window).width()?($(".select-cor-new").before("<div class='big-select-cor-new'></div>"),$(".select-cor-new").append('<div class="ver-todas-as-cores">VER TODAS AS CORES</div>'),window.setTimeout(function(){var e=$(".product-image .thumbs img[src*=thumb_]").last().attr("src");$(".big-select-cor-new").append($(".select-cor-new label").first().clone()),e&&$(".big-select-cor-new label").css("background","url("+e.replace("55-55","200-200")+")")},2e3)):0<$(".select-cor-new > span > label").length&&$(window).width()<=768||($(".select-cor-new").addClass("owl-not-slider"),$(".slider-colors .slider-actions").hide()),$(".select-cor-new label").live("click",function(){$(".big-select-cor-new label").remove(),$(this).clone().prependTo($(".big-select-cor-new"))}),$(".ver-todas-as-cores").live("click",function(){$(this).hasClass("abrir")?($(this).removeClass("abrir"),$(".select-cor-new label").show().css("height","50px"),$(this).text("OCULTAR")):($(this).addClass("abrir"),$(this).text("VER TODAS AS CORES"),$(".select-cor-new label").each(function(e){18<=e&&$(this).hide(),12<=e&&e<=18&&$(this).css("height","25px")}))}),$(".select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label, .slider-colors .select-cor-new span label").on("click",function(e){e.preventDefault(),$(".slider-colors .select-cor-new span label.current").removeClass("current"),$(".select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label").removeClass("current"),$(this).addClass("current"),$("#"+$(this).attr("for")).click(),p(),v(),setTimeout(function(){d()},1e3)}),$(".product-details .product-body .slider-colors .slider-actions .slider-next .ico-prev-sku").on("click",function(e){e.preventDefault(),$(".select-cor-new span").trigger("owl.next")}),$(".product-details .product-body .slider-colors .slider-actions .slider-prev .ico-next-sku").on("click",function(e){e.preventDefault(),$(".select-cor-new span").trigger("owl.prev")}),$(".product-details .product-body .slider-colors .slider-actions .slider-next,.product-details .product-body .slider-colors .slider-actions .slider-prev").on("click",function(e){return!1}),$(".select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label, .slider-colors .select-cor-new span label").on("click",function(e){var t=$(this).attr("title");$(".cor-select > p").html("cor: "+t.split("--")[0])}),$(".select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label").on("click",function(e){$(".product-details .product-content").removeClass("product-indisponivel"),$(".section-product").removeClass("product-indisponivel"),v($(this))})}(),v(),function(){var e="",t=[{flag_name:"produtos top",flag_class:"tag produtos-top",orderId:1},{flag_name:"novidade",flag_class:"tag novidade",orderId:2},{flag_name:"so no sote",flag_class:"tag so-no-sote",orderId:3},{flag_name:"15",flag_class:"tag 15",orderId:4},{flag_name:"frete gratis",flag_class:"tag frete-gratis",orderId:5},{flag_name:"tempo limitado",flag_class:"tag tempo-limitado",orderId:6},{flag_name:"noite da beleza",flag_class:"tag noite-da-beleza",orderId:7},{flag_name:"liquida bere",flag_class:"tag liquida-bere",orderId:8},{flag_name:"black friday",flag_class:"tag black-friday",orderId:9},{flag_name:"black week",flag_class:"tag black-week",orderId:10}];if(0<$("body.produto .vtex-image p").length){var o=[];$("body.produto .vtex-image p").each(function(e,t){o.push($(this).text())});for(var r=0;r<t.length;r++)-1!==$.inArray(t[r].flag_name,o)&&(e+='<li class="#data-class#"> <a href="#">#data-flag#</a></li>'.replace("#data-class#",t[r].flag_class).replace("#data-flag#",t[r].flag_name));$(".product-details .product-image").prepend('<ul class="tags"> '+e+" </ul>"),0==$(".product-details .product-image .tags > li").length&&$(".product-details .product-image .tags").hide()}}(),h.init({token:"7068490812e3412c47f79ff7cc2ee524ab4d961d916ae3d0567a22af167a9e67",url:"https://trustvox.com.br/api/stores/4039/opinions"}),r(".breadcrumbs .bread-crumb > ul > li > a").eq(0).text("página inicial"),0==r(".slider-products.collection.collection-products-relacionados .slider-clip .pratileira").length&&r(".produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-products").hide(),r("#product-cal-frete").on("click",function(e){e.preventDefault(),$(".overlay-cep").fadeIn(),$("#claculo-frete").fadeIn(),$(".overlay-cep").on("click",function(e){e.preventDefault(),$(this).fadeOut(),$("#claculo-frete").fadeOut()}),$(".overlay-cep").on("click",function(e){e.preventDefault(),$(this).fadeOut(),$("#buscar-cep").fadeOut()}),$(".ico-close-calc-cep").on("click",function(){$(".table-info table").html(""),$("#claculo-frete").fadeOut(),$(".overlay-cep").fadeOut()}),$(".ico-close-busca-cep").on("click",function(e){$(this).fadeOut(),$("#buscar-cep").fadeOut(),$(".overlay-cep").fadeOut()}),$("input[name=field-cep]").mask("00000-000",{reverse:!0}),$(".form-controls .btn.btn-toggle").on("click",function(e){e.preventDefault(),0<$(".table-info tr").length&&$(".table-info tr").remove();var t=$(".form-steps #field-cep").val(),o=t;if(""==t||null==t||null==t)0==$(".error-cep-vazio").length&&$("#claculo-frete .form-steps form .form-step.current .form-body .form-inner .form-row").append('<div class="error-cep-vazio"><i class="ico ico-erro-frete"></i> <p> Ops! o campo cep não pode estar em branco. <br/> digite o cep e tente novamente </p> </div>');else{$(".error-cep-vazio").length&&$(".error-cep-vazio").remove();var r=[{id:-1<$(".buy-button").attr("href").indexOf("javascript")?$("#___rc-p-sku-ids").val().split(",")[0]:$(".buy-button").attr("href").split("?")[1].split("&")[0].split("sku=")[1],quantity:1,seller:1}];vtexjs.checkout.simulateShipping(r,o,"BRA").done(function(e){if($(".table-info").slideDown(),2<$("#claculo-frete .table-info tr").length){$("#claculo-frete .table-info tr").each(function(e,t){$(this).remove()}),$(".table-info table").append("<tr><th>tipo</th><th>prazo</th><th>valor</th></tr>");for(var t=0;t<e.logisticsInfo[0].slas.length;t++)e.logisticsInfo[0].slas[t].pickupStoreInfo.isPickupStore?$(".table-info table").append("<tr><td> Retirada "+e.logisticsInfo[0].slas[t].pickupStoreInfo.friendlyName+" </td><td> até "+e.logisticsInfo[0].slas[t].shippingEstimate.replace("bd","")+" dias uteis</td><td>R$ "+m(e.logisticsInfo[0].slas[t].price)+" </td></tr>"):$(".table-info table").append("<tr><td> "+e.logisticsInfo[0].slas[t].name+" </td><td> até "+e.logisticsInfo[0].slas[t].shippingEstimate.replace("bd","")+" dias uteis</td><td>R$ "+m(e.logisticsInfo[0].slas[t].price)+" </td></tr>")}else for($(".table-info table").append("<tr><th>tipo</th><th>prazo</th><th>valor</th></tr>"),t=0;t<e.logisticsInfo[0].slas.length;t++)e.logisticsInfo[0].slas[t].pickupStoreInfo.isPickupStore?$(".table-info table").append("<tr><td> Retirada "+e.logisticsInfo[0].slas[t].pickupStoreInfo.friendlyName+" </td><td> até "+e.logisticsInfo[0].slas[t].shippingEstimate.replace("bd","")+" dias uteis</td><td>R$ "+m(e.logisticsInfo[0].slas[t].price)+" </td></tr>"):$(".table-info table").append("<tr><td> "+e.logisticsInfo[0].slas[t].name+" </td><td> até "+e.logisticsInfo[0].slas[t].shippingEstimate.replace("bd","")+" dias uteis</td><td>R$ "+m(e.logisticsInfo[0].slas[t].price)+" </td></tr>")})}}),$(".form-steps .form-inner-secondary .btn").on("click",function(e){e.preventDefault(),function(e,t,o){""==e||null==e||null==e||""==t||null==t||null==t||""==o||null==o||null==o?0==$(".cols.cep-result").length&&$("#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-group .form-row").eq(2).append('<div class="cols cep-result"> <p> Preencha os campos corretamente </p> </div>'):($(".cols.cep-result").length&&$(".cols.cep-result").remove(),$.ajax({url:window.location.protocol+"//viacep.com.br/ws/"+o+"/"+t+"/"+e+"/json/",type:"GET",dataType:"json",cache:!1,success:function(e){if(null==e||""==e||null==e)0==$("#buscar-cep .form-step .form-inner-secondary .form-group .form-row .error-cep-vazio").length&&($("#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-group .form-row").eq(2).append('<div class="error-cep-vazio"><i class="ico ico-erro-frete"></i> <p> ops! não encontramos o cep informado. <br/> verifique se o cep esta correto :( </p> </div>'),$("#buscar-cep .form-steps .form-step .form-body .form-inner-secondary").css("min-height","610px"));else{var t=e[0].cep;$("#buscar-cep").fadeOut(),$("#buscar-cep .form-steps .form-step .form-body .form-inner-secondary").css("min-height","500px"),$("#claculo-frete").fadeIn(),$("#field-cep").val(t),$(".btn.btn-toggle").click()}}}))}($("#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-row .form-controls #field-endereco").val(),$("#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-row .form-controls #field-cidade").val(),$("#buscar-cep .form-steps form .form-step.current .form-body .form-inner-secondary .form-row .form-controls #field-estado").val())}),$(".form-steps .toggle:not(.btn)").on("click",function(e){e.preventDefault(),$("#claculo-frete").fadeOut(),$("#buscar-cep").fadeIn(),$(".form-steps .form-inner-secondary").fadeIn()})});var t=null;try{t=skuJson_0}catch(e){t=s}t!=s&&r(".section-rating h2").text("avaliações + "+skuJson_0.name),r(".product-details .product-info strong").attr("itemprop","price"),r(".product-details .product-head h1").attr("itemprop","name"),r(".slider-products.collection.collection-products-relacionados .slider-clip .pratileira ul".length)&&(function(e){e.owlCarousel({items:4,autoplay:!1,nav:!1,slideBy:window.innerWidth<480?2:(window.innerWidth<1025||window.innerWidth,4),mouseDrag:!1,loop:!0,rewindNav:!0})}(r(".slider-products.collection.collection-products-relacionados .slider-clip .pratileira ul")),r(".slider-products.collection.collection-products-relacionados .slider-actions .slider-next").on("click",function(e){e.preventDefault(),r(".slider-products.collection.collection-products-relacionados .slider-clip .pratileira ul").trigger("owl.next")}),r(".slider-products.collection.collection-products-relacionados .slider-actions .slider-prev").on("click",function(e){e.preventDefault(),r(".slider-products.collection.collection-products-relacionados .slider-clip .pratileira ul").trigger("owl.prev")})),r(".tabs .tabs-nav a").on("click",function(e){e.preventDefault();var o=r(this).attr("href");r(this).parent().addClass("current").siblings().removeClass("current"),r(".tabs .tabs-body .tab").each(function(e,t){r(this).attr("id")==o&&r(this).addClass("active").siblings().removeClass("active")})}),r(".trustvox-fluid-jump").on("click",function(){var e=r("html, body"),t=0;r(a).width()<768?(t=r("li a.avaliacoes").eq(0).offset().top,r("li a.avaliacoes").eq(0).addClass("active"),r(".accordion-body.avaliacao").addClass("active")):offesetTop=r("#trustvox-reviews").offset().top,e.stop().animate({scrollTop:t},"500")}),r(".select-cor-new .owl-carousel.owl-theme .owl-wrapper-outer .owl-wrapper .owl-item label").on("hover",function(e){}),n.width()<768&&function(){var e=$("#tab1").html(),t=$("#tab2").html(),o=$("#tab3").html(),r=$("#tab4").html(),a=$(".section-rating .shell-trustvox").html(),i=$(".tab-image").html();$(".tabs .tabs-nav li").eq(0).append('<div class="accordion-body descripton"> '+e+" </div>"),$(".tabs .tabs-nav li").eq(1).append('<div class="accordion-body ficaDica"> '+t+" </div>"),$(".tabs .tabs-nav li").eq(2).append('<div class="accordion-body fichaTecnica"> '+o+" </div>"),$(".tabs .tabs-nav li").eq(3).append('<div class="accordion-body precaucoesUso"> '+r+" </div>"),$(".tabs .tabs-nav li").eq(4).append('<div class="accordion-body avaliacao"> '+a+" </div>"),$(".tabs .tabs-nav li").eq(0).find(".productDescription").append('<div class="mobile-img-descricao"> '+i+" </div>"),$(window).width()<=420&&($(".tabs .tabs-nav li").eq(0).addClass("current"),$(".tabs .tabs-nav li a").eq(0).addClass("active"),$(".tabs .tabs-nav li div").eq(0).addClass("active"));var s=$(".section-tabs").clone();$(".section-product").append(s),$(".section-tabs").eq(0).addClass("description-top"),$(".tabs .tabs-nav li > a").on("click",function(e){return $(this).toggleClass("active"),$(this).next(".accordion-body").toggleClass("active"),!1})}(),r("body").on("click touch",".toggle.avaliacoes",function(e){e.preventDefault(),r("html,body").animate({scrollTop:r(".section-rating").offset().top-20},500)}),t=null;try{t=skuJson_0}catch(e){t=s}t!=s&&r(".section-rating h2").text("avaliações + "+skuJson_0.name),r(".product-details .product-info strong").attr("itemprop","price"),r(".product-details .product-head h1").attr("itemprop","name"),setTimeout(function(){"true"==r.cookie("ClienteFidelidade")?r(".background-modal-bere, .conteudo-modal-bere").hide():0<r(".product-image .tags-product p.pre-venda").length?r(".background-modal-bere, .conteudo-modal-bere").show():r(".background-modal-bere, .conteudo-modal-bere").hide()},200)}),n.on("load",function(){l(),r(a).resize(function(){l()}),d(),r(".slider-entrys .slider-clip ul").length&&(function(e){e.owlCarousel({items:1,autoplay:!1,nav:!1,slideBy:1,mouseDrag:!1,loop:!1,rewindNav:!1,itemsTablet:[768,1]})}(r(".slider-entrys .slider-clip ul")),r(".produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-actions .slider-next").on("click",function(e){e.preventDefault(),r(".produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides").trigger("owl.next")}),r(".produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-actions .slider-prev").on("click",function(e){e.preventDefault(),r(".produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides").trigger("owl.prev")})),r(".produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides.owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item .slide strong").on("click",function(e){e.preventDefault(),r("html,body").animate({scrollTop:r(".section-rating").offset().top},500)}),n.width()<768&&(r(".produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides.owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item .slide strong").on("click",function(e){e.preventDefault(),r("html,body").animate({scrollTop:r(".section-rating").offset().top},500)}),r("#image .image-zoom .zoomPad").prepend('<i class="ico-zoom-mobile"></i>')),a.setInterval(function(){var e=r(".section-info .owl-wrapper").css("transform");if(e!=s){var t=parseInt(e.split(",").reverse()[1]);"none"==e||0==t?r(".section-info .slider-prev").addClass("seta-no-effect"):r(".section-info .slider-prev").removeClass("seta-no-effect"),r(".section-info .owl-wrapper .owl-item").size()*parseInt(r(".section-info .owl-wrapper .owl-item:last").css("width"))-parseInt(r(".section-info .owl-wrapper .owl-item:last").css("width"))==-1*t||1==r(".section-info .owl-wrapper .owl-item").size()?r(".section-info .slider-next").addClass("seta-no-effect"):r(".section-info .slider-next").removeClass("seta-no-effect")}},200)});var c=function e(t){var d=t,p=e;if(p.objSkusInfo={skuList:[]},$(d).length){$(d).find("label").length;var o,r,a=[];if(null==skuJson)return!1;$.each(skuJson.skus,function(e,t){r=/^[0-9\,]{0,}[m|v|p|g|ml]{1,}$/g,t.values[0]&&(t.values[0].match(r)?(o=t.values.length-1)<0&&(o=0):(o=t.values.length-2)<0&&(o=0),-1==a.indexOf(t.values[o])&&(a.push(t.values[o]),p.objSkusInfo.skuList.push({id:t.sku,name:t.values[o],thumb:"",texture:""}),function(s,n){var l,c,e="/produto/sku/"+s;$.getJSON(e,function(e){l=e;try{var t=l[0].Images.length;if(void 0!==t)for(var o=0;o<t;o++){var r=0,i="";c=l[0].Images[o].length;for(var a=0;a<c;a++){if(null==l[0].Images[o][a].Name){r=1,i=l[0].Images[o][a].Path;break}if("thumb"==l[0].Images[o][a].Name.toLowerCase()){r=1,i=l[0].Images[o][a].Path;break}}1==r&&($.each(p.objSkusInfo.skuList,function(e,t){t.id==s&&(p.objSkusInfo.skuList[e].thumb=i)}),$(d).find("label").each(function(){if(n==$(this).text()){$(this).css("background","url('"+i.replace("65-65/","200-200/").replace("292-292/","200-200/")+"') center center no-repeat"),$(this).attr("title",$(this).text()),$(this).attr("data-background",i.replace("65-65/","200-200/").replace("144-292/","200-200/")),$(this).attr("data-idSku",""+l[0].Id),0==l[0].SkuSellersInformation[0].AvailableQuantity&&$(this).addClass("product-disabled");var a=$(this);$.get("/produto/sku/"+s,function(e){if(e[0].Availability){var t=e[0].Price,o=e[0].ListPrice;if(t<o){var r=parseInt(100-t/o*100);0==a.find(".flag-discount-percent").length&&a.append('<div class="flag-discount-percent percent-'+r+'">- '+r+" %</div>")}}else a.addClass("item_unavailable")})}}))}}catch(e){}}).done(function(){setTimeout(function(){if("edge/edgehtml"==u||"ie/trident"==u){for(var e=document.querySelectorAll(".select-cor-new .product-disabled,.select-cor-new .item_unavailable"),t=document.querySelectorAll(".select-cor-new .flag-discount-percent"),o=document.querySelector(".select-cor-new > span > label:last-child"),r=document.querySelector(".select-cor-new > span label:first-child"),a=0;a<e.length;a++)f(e[a],o);for(a=0;a<t.length;a++)f(t[a].parent("label"),o),t[a].insertBefore(r)}else document.querySelectorAll(".select-cor-new .product-disabled,.select-cor-new .item_unavailable").forEach(function(e){$(e).insertAfter($(".select-cor-new > span > label:last-child"))}),document.querySelectorAll(".select-cor-new .flag-discount-percent").forEach(function(e){$(e).parent("label").insertAfter($(".select-cor-new > span label:last-child")),$(e).parent("label").insertBefore($(".select-cor-new > span label:first-child"))})},2e3),function(){var e=document.location.search.replace(/.*?idsku=(\d.*?)(&.*|$)/,"$1");$('label[data-idsku="'+e+'"]').click()}(window.location.href)})}(t.sku,t.values[o])))})}};function d(){$("#show .thumbs li #botaoZoom img").each(function(e,t){var o=$(this).attr("src").replace("-55-55","-200-200");$(this).attr("src",o)});var e="";if(0<$("#show #include #image .image-zoom .zoomPad #image-main").length&&(e=$("#show #include #image .image-zoom .zoomPad #image-main").attr("src")),null!=e&&""!=e){var t=e.replace("-292-292","-1000-1000");$("#show #include #image .image-zoom .zoomPad #image-main").attr("src",t)}}function p(){var e=$(".plugin-preco .valor-por .skuBestPrice").text(),t=$(".descricao-preco .valor-de .skuListPrice").text(),o=$(".plugin-preco .descricao-preco .valor-dividido .skuBestInstallmentNumber").text(),r=$(".plugin-preco .descricao-preco .valor-dividido .skuBestInstallmentValue").text();$(".product-details .product-info .product-preco-por").text(e),$(".product-details .product-info .product-preco-de").text(t),$(".product-details .product-info .product-parcelamento").text(o+" de "+r+" sem juros"),"R$ 0,00"==t&&$("del.product-preco-de").hide()}function m(e){var t=e+"";return 6<(t=t.replace(/([0-9]{2})$/g,",$1")).length&&(t=t.replace(/([0-9]{3}),([0-9]{2}$)/g,".$1,$2")),t}function v(){$(".notifyme-title-div .notifymetitle.notifyme-title").html("<div class='rw-indisponivel'><h3>Produto indisponível :( </h3><h4 class='rw-indisponivel--price'> R$"+parseFloat(dataLayer[0].productListPriceTo).toFixed(2).replace(".",",")+"</h4></div>"),0==dataLayer[0].productListPriceTo&&$(".rw-indisponivel--price").addClass("hidden"),setTimeout(function(){"block"==$(".notifyme.sku-notifyme").css("display")?($(".product-details .product-body .product-actions").addClass("product-disabled-hide"),$("#product-cal-frete").hide(),$(".product-details .product-info .product-preco-por").hide(),$(".product-details .product-tag").hide(),$(".product-details .product-info .product-parcelamento").hide(),$(".product-details .product-content").addClass("product-indisponivel"),$(".section-product").addClass("product-indisponivel"),0==$(".new-aviseme").length?$(".product-actions").prepend('<div class="new-aviseme active"> <input class="product-aviseme" placeholder="seu email aqui"/> <input type="button" class="btn-send-aviseme" value="me avise!"/></div>'):$(".new-aviseme").addClass("active"),$("#notifymeClientName").val("Quem disse berenice"),$(".new-aviseme .product-aviseme").on("keyup",function(e){var t=$(".new-aviseme .product-aviseme").val();$("#notifymeClientEmail").val(t)}),$(".new-aviseme  .btn-send-aviseme").on("click",function(e){var t=$(".new-aviseme .product-aviseme").val();if(!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(t))return $(".new-aviseme .product-aviseme").attr("placeholder","entre com um email valido"),$(".new-aviseme .product-aviseme").css({color:"red",border:"1px solid red"}),!1;$(".new-aviseme .product-aviseme").css({color:"#b1b1b1",border:"1px solid #b1b1b1"}),$("#notifymeButtonOK").click(),$(".product-actions").append('<span class="success-aviseme"> cadastro realizado com sucesso</span>')})):($(".product-actions .new-aviseme").removeClass("active"),$("#product-cal-frete").show(),$(".product-details .product-info .product-preco-por").show(),$(".product-details .product-tag").show(),$(".product-details .product-info .product-parcelamento").show(),$(".product-details .product-body .product-actions").removeClass("product-disabled-hide"),0<$(".success-aviseme").length&&$(".success-aviseme").hide())},1e3)}var h={headers:{},array:["#nota#","#avaliacao#","#nome#"],config:{token:"",url:""},item:'<li class="slide"><h4>avaliação <strong>#nota#</strong></h4><p>#avaliacao#</p><p style="text-transform: none !important;">#nome#</p><strong><span>v</span>er todas as avaliações</strong></li>',init:function(e){this.config=e;var t={url:"http://trustvox.com.br/widget/opinions?code="+parseInt($("#___rc-p-id").val())+"&store_id=4039",headers:{accept:"application/vnd.trustvox-v2+json"}};$(".slider-entrys ul.slides").html(""),this.requestReviews(t)},requestReviews:function(e){var s=this;$.ajax(e).done(function(e){for(var t=[],o="",r=0;r<e.items.length;r++){t=[(1*e.items[r].rate).toFixed(1),'"'+e.items[r].opinion+'"',e.items[r].user.name.split(" ")[0]];for(var a=s.item,i=0;i<s.array.length;i++)a=a.replace(s.array[i],t[i]);void 0!==e.items[r].opinion&&"undefined"!=e.items[r].opinion&&(1*e.items[r].rate<4||(o+=a))}0==e.items.length?($(".slider-entrys ul.slides").append('<li class="slide not-coments"><p> ainda não temos comentários </p><p> a gente acredita que as avaliaçoes têm ser <br> verdadeiras. por isso, você só vai poder opinar <br> depois que comprar e testar o produto </p></li>'),$(".cols .col.col-1of2 .slider-entrys .slider-actions").hide(),$(".produto .wrapper .wrapper-inner .container .main .main-inner .shell .section-info .cols .col .slider-entrys .slider-clip .slides").removeClass("owl-carousel")):$(".slider-entrys ul.slides").append(o)})}};$(function(){document.querySelector(".select-cor-new .group_0")&&(document.querySelector(".product-buy-button .buy-button").innerHTML="Adicionar a Sacola",document.querySelector(".product-buy-button .buy-button").addEventListener("click",function(t){t.preventDefault();var a=document.querySelector(".select-cor-new .group_0 .current").getAttribute("data-idsku");null==a?a=new URL(window.location.href).searchParams.get("idsku"):console.log("Sku Indefinido"),t.srcElement.innerHTML="Adicionando...",t.srcElement.style.opacity=".7",t.srcElement.style.pointerEvents="none";var i=void 0;vtexjs.checkout.getOrderForm().then(function(e){if(!e.items.length){var t={id:a,quantity:1,seller:"1"};return vtexjs.checkout.addToCart([t])}e.items.map(function(e,t){if(e.id==a){i=e.quantity;var o={index:t,quantity:++i};return vtexjs.checkout.updateItems([o])}var r={id:a,quantity:1,seller:"1"};return vtexjs.checkout.addToCart([r])})}).done(function(e){vtexjs.checkout.getOrderForm().then(function(e){window._orderForm=e;var o=0;$(e.items).each(function(e,t){t.isGift||(o+=t.quantity)}),isFinite(o)&&$(".__cart-link a span").text(o)}).done(function(){t.srcElement.innerHTML="Adicionar a Sacola",t.srcElement.style.opacity="1",t.srcElement.style.pointerEvents="auto",$("html").trigger("open.MiniCart")})})}))})},{}]},{},[1]);