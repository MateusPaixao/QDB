"use strict";var damnYouIE=function(){var e=window.navigator.userAgent,t=0<e.indexOf("MSIE ")?10:0<e.indexOf("Trident/")?11:0<e.indexOf("Edge/")?12:0;return 0<t&&$("html").addClass("ie").addClass("ie"+t),!0},ytPlayer={elems:"._video-lnk[data-video-url]",init:function(e){ytPlayer.load.script(function(){ytPlayer.set.events(e)})},load:{script:function(e){if(void 0!==window.YT&&"function"==typeof window.YT.Player)"function"==typeof e&&e();else{if(void 0===ytPlayer.scriptCreated){var t=document.createElement("script");t.type="text/javascript",t.src="https://www.youtube.com/iframe_api",t.className="_ytube-script",$("head")[0].appendChild(t),ytPlayer.scriptCreated=!0}void 0===ytPlayer.t&&(ytPlayer.t=window.setTimeout(function(){ytPlayer.init(),window.clearTimeout(ytPlayer.t)},3e3))}}},set:{events:function(e){$(ytPlayer.elems).each(function(e,t){$(t).addClass("__ytplayer"+e).attr("ndx",e)}),$(ytPlayer.elems).not(".__ytplayer").addClass("__ytplayer").on("click.YTPlayer",function(){var e=$(this),t=1*e.attr("ndx");e.find("iframe").length<=0?ytPlayer.set.player(e,t):ytPlayer.videos[t].playVideo()}),void 0!==e&&$(".__ytplayer"+e).click()},player:function(e,t){var a,n=t||0;if((a=$(e)).length<=0)return!1;if(0<a.find("iframe").length)return!1;var i=(a.attr("data-video-url")||"").replace(/(http[s]?:\/\/|www\.|youtube\.com\/|.*youtu\.be\/|embed\/|watch\?v=|\?.*|&.*)/g,"");if(i.length<=0)return!1;var o=a.width(),l=a.find("img:first").height(),r=.588*o;l=l<r?r:l,o="80%",l="600";var s=$("<div/>");s.addClass("_video-iframe"),a.addClass("__playing").append(s);var d={videoId:i,height:l,width:o,playerVars:{autoplay:1,controls:0,rel:0,disablekb:0,modestbranding:1,showinfo:0,html5:1},events:{onReady:function(e){ytPlayer.onPlayerReady(e,a,n)},onStateChange:function(e){ytPlayer.onPlayerStateChange(e,a)}}};return void 0===ytPlayer.videos&&(ytPlayer.videos=[]),ytPlayer.videos[n]=new window.YT.Player(s[0],d),!0}},onPlayerReady:function(e,t,a){var n=a||0;return ytPlayer.videos[n].playVideo(),!0},onPlayerStateChange:function(e,t){var a=$(t);return 1===e.data||3===e.data?(a.addClass("__playing"),$(".heading-one").addClass("__slideDownTextBox")):($(".__playing").removeClass("__playing"),$(".heading-one").removeClass("__slideDownTextBox"),$("html").removeClass("__show-lightbox")),!0}},setVideos=function(){var e=($(".special-page-data .video-url").text()||"").trim();return $(".video-box ._video").addClass("_video-lnk").attr("data-video-url",e),!0},setOverlay=function(){return $("body").filter(function(){return $(".mylightbox").length<=0}).append('<div class="__overlay"></div>'),1},setLightbox=function(){return'<div class="mylightbox lb-anchor"><div class="_lightbox-wrapper"><div class="_lightbox"><div class="lb-header"><div class="close-btn"></div></div><div class="lb-body"><img src="http://tbb.vteximg.com.br/arquivos/julia-roberts-video-box.jpg" alt="" /></div></div></div></div>',$("body").filter(function(){return $(".mylightbox").length<=0}).append('<div class="mylightbox lb-anchor"><div class="_lightbox-wrapper"><div class="_lightbox"><div class="lb-header"><div class="close-btn"></div></div><div class="lb-body"><img src="http://tbb.vteximg.com.br/arquivos/julia-roberts-video-box.jpg" alt="" /></div></div></div></div>'),$(".mylightbox .close-btn").not(".__act").addClass("__act").bind("click.myLightbox",function(){var e=($(".mylightbox .lb-body iframe")||{ndx:0}).attr("ndx");void 0!==ytPlayer.videos&&0<ytPlayer.videos.length&&ytPlayer.videos[e].pauseVideo(),$("html").removeClass("__show-lightbox")}),1},setVideoLightbox=function(e){return $(e).not(".__act").addClass("__act").bind("click.myLightbox",function(){setVideos(this);var e=1*$(this).attr("ndx")||0;ytPlayer.init(e),$("html").addClass("__show-lightbox")}),1},setVideoURL=function(){var e=$(".video-box > div");if(e.length<=0)return!1;var t=new RegExp(".*?(?:video-url:\\s*)([\\w].*?)(?:$|[,]?\\s.*)","mig"),i=new RegExp(".*?(?:play:\\s*)([\\w].*?)(?:$|[,]?\\s.*)","mig"),o=new RegExp(".*?(?:video-img:\\s*)([\\w].*?)(?:$|[,]?\\s.*)","mig"),l=e.html().trim().replace(/\n/gim,""),r=l;return t.test(r)&&(r=l.replace(t,"$1"),e.each(function(e,t){if($(t).attr("ndx",e).attr("data-video-url",r).addClass("__video-on"),i.test(l)){var a=l.replace(i,"$1");$(t).attr("data-play",a)}if(o.test(l)){var n=l.replace(o,"$1");$(t).attr("data-img",n)}setVideoLightbox(t)})),!0},createElement=function(e,t,a){var n=document.createElement(e);$.extend(n,{className:"__styles"}),$.extend(n,t);return $(n).html(a),n},setTopBoxSettings=function(){var e=$(".heading-one");if(e.length<=0)return!1;var t,a,n=e.html().trim().replace(/\n/,"");t=(n=n.replace(/(?:^|[\s]*?)(<!--.*?-->)([\s\S\n]*)/gim,"$1")).replace(/^.*?bk-color:[\s]?[#]?([a-f0-9]{6,8})(?:$|[,]?.*)/gim,"$1"),a=n.replace(/^.*?[^-]color:[\s]?[#]?([a-f0-9]{6,8})(?:$|[,]?.*)/gim,"$1");var i="";(void 0!==t&&0<t.length||void 0!==a&&0<a.length)&&(void 0!==t&&0<t.length&&(i=(i+=".heading-one {\n")+"background-color: #"+t+"; \n",i+="\n }\n"),void 0!==a&&0<a.length&&(i+=".heading-one * ",i=(i+=" {\n")+"color: #"+a+"; \n",i+="\n }\n"));var o=createElement("style",{className:"top-box-settings"},i);return $("head").append(o),e.addClass("__text-on"),1},setPanels=function(){var e=$(".panels-data").children().clone(),r=$("<div/>"),s="",d="",c="",u=$("<div/>");e.each(function(a,e){var t=$(e),n=t.attr("background-color"),i=t.attr("color"),o=$(e).children(),l=$("<div/>");l.addClass("__panel").addClass("__panel"+a),a%2==0?l.addClass("odd"):l.addClass("even"),o.each(function(e,t){/img/i.test($(t)[0].tagName)?u.find("img").length<=0?((u=$("<div/>")).addClass("__img"),u.append(t).css({"background-color":$(t).attr("background-color")})):u.append(t):((u=$("<div/>")).addClass("__text-panel").css({"background-color":$(t).attr("background-color")}),$(t).addClass("__texts").removeAttr("background-color").css({width:$(t).attr("width")}),u.append(t),d=$(t).find(".bt").attr("background-color"),c=$(t).find(".bt").attr("color"),(void 0!==d&&0<d.length||void 0!==c&&0<c.length)&&(void 0!==d&&0<d.length&&(s=(s=s+".__panel"+a+" .bt {\n")+"background-color: "+d+"; \n",s+="\n }\n"),void 0!==c&&0<c.length&&(s=s+".__panel"+a+" .bt ",s=(s+=" {\n")+"color: "+c+"; \n",s+="\n }\n"))),l.append(u)}),r.append(l),(void 0!==n&&0<n.length||void 0!==i&&0<i.length)&&(void 0!==n&&0<n.length&&(s=(s=s+".__panel"+a+" {\n")+"background-color: "+n+"; \n",s+="\n }\n"),void 0!==i&&0<i.length&&(s=(s=(s=(s=(s=(s=s+".__panel"+a+" .__texts * ")+".__panel"+a+" .__texts h1, ")+".__panel"+a+" .__texts h2, ")+".__panel"+a+" .__texts h3, ")+".__panel"+a+" .__texts h4, ")+".__panel"+a+" .__texts p ",s=(s+=" {\n")+"color: "+i+"; \n",s+="\n }\n"))});var t=createElement("style",{className:"panels-settings"},s);return $("head").append(t),$(".section-panels ._panels").html(r.children()),$(".section-panels").filter(function(){return 0<$(this).find("._panels").children().length}).addClass("__panels-on"),1},fixLineBreaks=function(){return $(".heading-one >p").html($(".heading-one >p").text().replace(/\n/g,"<br/>\n")),!0},setCarouselElems=function(){var n=[];return $(".carousel-data").each(function(e,t){var a=$(t).children();0<a.length&&n.push(a||[])}),$(n).each(function(e,t){var l=$("<ul/>");l.addClass("owl-carousel-v2"),$(t).each(function(e,t){var a=$("<li/>"),n=$(t).attr("href")||"",i=$("<a/>");0<n.length&&i.attr("href",n);var o=$('<div class="panel"></div>');$(t).children().clone().each(function(e,t){if(/img/i.test($(t)[0].tagName)){var a=$('<div class="_img"></div>');a.append(t),o.append(a)}else o.append(t)}),i.append(o),a.append(i),l.append(a)}),$(".__carousel"+e).find(".carousel-wrapper").html(l),$("html").addClass("__carousel"+e+"-on")}),!0},setCarousel=function(){var a="_swap_",n=[];return $(".section-carousel").each(function(e,t){n[0]=$(t).find("ul").owlCarousel({nav:!0,loop:!0,navContainer:".section-carousel"+e+" .nav-carousel",responsive:{0:{items:1},800:{items:2},1200:{items:3}}}).addClass("owl-carousel"),n[0].on("change.owl.carousel",function(){var e=$(this);e.hasClass(a)?e.removeClass(a):e.addClass(a)})}),!0},setBannerOn=function(){return $(".section-video").find("img").length<=0?0:($("html").addClass("__banner-on"),1)},setPanelPicOn=function(){return $(".pic-panel-text").children().length<=0?0:($("html").addClass("show-pic-panel"),1)},setManual=function(){$("._informative-texts > div").not(".intro").each(function(e,t){$(t).addClass("_text-on").find("h2,h3").not("._clickable").addClass("_clickable").prepend("<i></i>").on("click.Manual",function(){$(this).parent().hasClass("show-text")?$(this).parent().removeClass("show-text"):$(this).parent().addClass("show-text")})})},setIntroNavBtns=function(){0<$(".page-intro-nav").children()&&$(".page-intro-nav").addClass("_nav-on")},setBeforeAndAfterPics=function(){return void 0!==$.fn.twentytwenty&&($("._panels .__img, .pic-panel-img").filter(function(){return 1<$(this).find("img").length}).twentytwenty(),!0)},fixCarouselNavigation=function(){return $(".nav-carousel").prepend($(".nav-carousel").prev()),!0},carouselMobile=function(){$(".prateleira.vitrine ul").addClass("owl-carousel"),$(window).width()<=767&&$(".prateleira ul.owl-carousel").owlCarousel({loop:!0,margin:10,responsiveClass:!0,responsive:{0:{items:2,nav:!1},600:{items:3,nav:!1}}})},breadCrumbie=function(){var e=$(".data-bd .link-1").text(),t=$(".data-bd .link-2").text(),a=$(".data-bd .text-1").text(),n=$(".data-bd .text-2").text();$(".bread-crumb ul li .bd-1-link").attr("href",e),$(".bread-crumb ul li .bd-2-link").attr("href",t),$(".bread-crumb ul li .bd-1-link").text(a),$(".bread-crumb ul li .bd-2-link").text(n)},changeToDesktopImage=function(){var e=$(window).width();940<=e?(console.log(e),$("html").addClass("show-imagem-desktop")):$("html").removeClass("show-imagem-desktop")},applyTwenty=function(){$(".twentytwenty-container").twentytwenty({default_offset_pct:.69,orientation:"horizontal",no_overlay:!1})},onResize=function(){$(window).resize(changeToDesktopImage)},slickCarousel=function(){$(".slick-wrapper").slick({centerMode:!0,centerPadding:"0px",slidesToScroll:1,arrows:!0,responsive:[{breakpoint:3e3,settings:{centerMode:!0,centerPadding:"0px",slidesToShow:3}},{breakpoint:768,settings:{centerMode:!0,centerPadding:"0px",slidesToShow:1}}]})},startSpecialPage=function(){return damnYouIE(),setOverlay(),setLightbox(),setVideoURL(),setVideos()&&ytPlayer.init(),setTopBoxSettings(),setPanels(),setBannerOn(),setCarouselElems()&&setCarousel(),setManual(),setIntroNavBtns(),setBeforeAndAfterPics(),fixCarouselNavigation(),setPanelPicOn(),carouselMobile(),breadCrumbie(),changeToDesktopImage(),slickCarousel(),!0};$(window).load(function(){$(".twentytwenty-container").twentytwenty()}),$(startSpecialPage),$(window).load(onResize);