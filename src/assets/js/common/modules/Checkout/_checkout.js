const Methods = {
    init(){
        Methods.checkout();
    },

    // Necessário Modularizar
    checkout(){
    /* // SLICK SLIDE
    // (function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)})(function(i){"use strict";var e=window.Slick||{};e=function(){function e(e,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(e),appendDots:i(e),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(e),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(e).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,"undefined"!=typeof document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=t++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}var t=0;return e}(),e.prototype.activateADA=function(){var i=this;i.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):o===!0?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),s.options.rtl===!0&&s.options.vertical===!1&&(e=-e),s.transformsEnabled===!1?s.options.vertical===!1?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):s.cssTransitions===!1?(s.options.rtl===!0&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),s.options.vertical===!1?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),s.options.vertical===!1?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this,o=t.getNavTarget();null!==o&&"object"==typeof o&&o.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};e.options.fade===!1?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(i.options.infinite===!1&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1===0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;e.options.arrows===!0&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),e.options.infinite!==!0&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(o.options.dots===!0&&o.slideCount>o.options.slidesToShow){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),e.options.centerMode!==!0&&e.options.swipeToSlide!==!0||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.options.draggable===!0&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>0){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(r.originalSettings.mobileFirst===!1?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||l===!1||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!==0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t,o=this;if(e=o.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var s in e){if(i<e[s]){i=t;break}t=e[s]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),e.options.accessibility===!0&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),e.options.accessibility===!0&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),e.options.accessibility===!0&&e.$list.off("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>0&&(i=e.$slides.children().children(),i.removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){var e=this;e.shouldClick===!1&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;t.cssTransitions===!1?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;e.cssTransitions===!1?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick","*",function(t){var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&o.is(":focus")&&(e.focussed=!0,e.autoPlay())},0)}).on("blur.slick","*",function(t){i(this);e.options.pauseOnFocus&&(e.focussed=!1,e.autoPlay())})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){var i=this;return i.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(i.options.infinite===!0)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(i.options.centerMode===!0)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),n.options.infinite===!0?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,n.options.vertical===!0&&n.options.centerMode===!0&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!==0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),n.options.centerMode===!0&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:n.options.centerMode===!0&&n.options.infinite===!0?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:n.options.centerMode===!0&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=n.options.vertical===!1?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,n.options.variableWidth===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,n.options.centerMode===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){var e=this;return e.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(e.options.infinite===!1?i=e.slideCount:(t=e.options.slidesToScroll*-1,o=e.options.slidesToScroll*-1,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o,s,n=this;return s=n.options.centerMode===!0?Math.floor(n.$list.width()/2):0,o=n.swipeLeft*-1+s,n.options.swipeToSlide===!0?(n.$slideTrack.find(".slick-slide").each(function(e,s){var r,l,d;if(r=i(s).outerWidth(),l=s.offsetLeft,n.options.centerMode!==!0&&(l+=r/2),d=l+r,o<d)return t=s,!1}),e=Math.abs(i(t).attr("data-slick-index")-n.currentSlide)||1):n.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){var t=this;t.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),t.options.accessibility===!0&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);if(i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),s!==-1){var n="slick-slide-control"+e.instanceUid+s;i("#"+n).length&&i(this).attr({"aria-describedby":n})}}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.options.focusOnChange?e.$slides.eq(s).attr({tabindex:"0"}):e.$slides.eq(s).removeAttr("tabindex");e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),i.options.accessibility===!0&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),e.options.accessibility===!0&&e.$dots.on("keydown.slick",e.keyHandler)),e.options.dots===!0&&e.options.pauseOnDotsHover===!0&&e.slideCount>e.options.slidesToShow&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),e.options.accessibility===!0&&e.$list.on("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&e.options.accessibility===!0?e.changeSlide({data:{message:e.options.rtl===!0?"next":"previous"}}):39===i.keyCode&&e.options.accessibility===!0&&e.changeSlide({data:{message:e.options.rtl===!0?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||r.$slider.attr("data-sizes"),n=document.createElement("img");n.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),r.$slider.trigger("lazyLoaded",[r,e,t])})},n.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),r.$slider.trigger("lazyLoadError",[r,e,t])},n.src=t})}var t,o,s,n,r=this;if(r.options.centerMode===!0?r.options.infinite===!0?(s=r.currentSlide+(r.options.slidesToShow/2+1),n=s+r.options.slidesToShow+2):(s=Math.max(0,r.currentSlide-(r.options.slidesToShow/2+1)),n=2+(r.options.slidesToShow/2+1)+r.currentSlide):(s=r.options.infinite?r.options.slidesToShow+r.currentSlide:r.currentSlide,n=Math.ceil(s+r.options.slidesToShow),r.options.fade===!0&&(s>0&&s--,n<=r.slideCount&&n++)),t=r.$slider.find(".slick-slide").slice(s,n),"anticipated"===r.options.lazyLoad)for(var l=s-1,d=n,a=r.$slider.find(".slick-slide"),c=0;c<r.options.slidesToScroll;c++)l<0&&(l=r.slideCount-1),t=t.add(a.eq(l)),t=t.add(a.eq(d)),l--,d++;e(t),r.slideCount<=r.options.slidesToShow?(o=r.$slider.find(".slick-slide"),e(o)):r.currentSlide>=r.slideCount-r.options.slidesToShow?(o=r.$slider.find(".slick-cloned").slice(0,r.options.slidesToShow),e(o)):0===r.currentSlide&&(o=r.$slider.find(".slick-cloned").slice(r.options.slidesToShow*-1),e(o))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){var i=this;i.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;if(!t.unslicked&&(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),t.options.accessibility===!0&&(t.initADA(),t.options.focusOnChange))){var o=i(t.$slides.get(t.currentSlide));o.attr("tabindex",0).focus()}},e.prototype.prev=e.prototype.slickPrev=function(){var i=this;i.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),r=document.createElement("img"),r.onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),l.options.adaptiveHeight===!0&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;return"boolean"==typeof i?(e=i,i=e===!0?0:o.slideCount-1):i=e===!0?--i:i,!(o.slideCount<1||i<0||i>o.slideCount-1)&&(o.unload(),t===!0?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,void o.reinit())},e.prototype.setCSS=function(i){var e,t,o=this,s={};o.options.rtl===!0&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,o.transformsEnabled===!1?o.$slideTrack.css(s):(s={},o.cssTransitions===!1?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;i.options.vertical===!1?i.options.centerMode===!0&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),i.options.centerMode===!0&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),i.options.vertical===!1&&i.options.variableWidth===!1?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):i.options.variableWidth===!0?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();i.options.variableWidth===!1&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,t.options.rtl===!0?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":"undefined"!=typeof arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),i.options.fade===!1?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=i.options.vertical===!0?"top":"left",
    "top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||i.options.useCSS===!0&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&i.animType!==!1&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&i.animType!==!1},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),n.options.centerMode===!0){var r=n.options.slidesToShow%2===0?1:0;e=Math.floor(n.options.slidesToShow/2),n.options.infinite===!0&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=n.options.infinite===!0?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(s.options.fade===!0&&(s.options.centerMode=!1),s.options.infinite===!0&&s.options.fade===!1&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=s.options.centerMode===!0?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));return s||(s=0),t.slideCount<=t.options.slidesToShow?void t.slideHandler(s,!1,!0):void t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(a.animating===!0&&a.options.waitForAnimate===!0||a.options.fade===!0&&a.currentSlide===i))return e===!1&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,a.options.infinite===!1&&a.options.centerMode===!1&&(i<0||i>a.getDotCount()*a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):a.options.infinite===!1&&a.options.centerMode===!0&&(i<0||i>a.slideCount-a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!==0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!==0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=a.getNavTarget(),l=l.slick("getSlick"),l.slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide)),a.updateDots(),a.updateArrows(),a.options.fade===!0?(t!==!0?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight()):void(t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)))},e.prototype.startLoad=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),o=Math.round(180*t/Math.PI),o<0&&(o=360-Math.abs(o)),o<=45&&o>=0?s.options.rtl===!1?"left":"right":o<=360&&o>=315?s.options.rtl===!1?"left":"right":o>=135&&o<=225?s.options.rtl===!1?"right":"left":s.options.verticalSwiping===!0?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(o.touchObject.edgeHit===!0&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(e.options.swipe===!1||"ontouchend"in document&&e.options.swipe===!1||e.options.draggable===!1&&i.type.indexOf("mouse")!==-1))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,e.options.verticalSwiping===!0&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(l.options.verticalSwiping===!0&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(l.options.rtl===!1?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),l.options.verticalSwiping===!0&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,l.options.infinite===!1&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),l.options.vertical===!1?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,l.options.verticalSwiping===!0&&(l.swipeLeft=e+o*s),l.options.fade!==!0&&l.options.touchMove!==!1&&(l.animating===!0?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;return t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow?(t.touchObject={},!1):(void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,void(t.dragging=!0))},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i,e=this;i=Math.floor(e.options.slidesToShow/2),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&!e.options.infinite&&(e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===e.currentSlide?(e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-e.options.slidesToShow&&e.options.centerMode===!1?(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-1&&e.options.centerMode===!0&&(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||"undefined"==typeof s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),"undefined"!=typeof t)return t;return o}});
    // END: SLICK SLIDE */

    /**UTLS*/
    var Utls = function(e, h, k, l) {
        return function() {
            var c = this;
            c.getSkus = function(a) {
                var b = e.Deferred();
                if ("undefined" === a)
                    return b.reject("Missing product id."),
                    b.promise();
                if (c.getSkus.data[a])
                    return b.resolve(c.getSkus.data[a]),
                    b.promise();
                vtexjs.catalog.getProductWithVariations(a).fail(function(d) {
                    c.getSkus.data[a] = [];
                    b.reject("Product id not found.")
                }).done(function(d) {
                    c.getSkus.data[a] = {
                        id: d.productId,
                        name: d.name,
                        skus: d.skus.slice(),
                        salesChannel: d.salesChannel,
                        available: d.available
                    };
                    b.resolve(c.getSkus.data[a])
                });
                return b.promise()
            }
            ;
            c.getSkus.data = {};
            c.getSkuList = function(a) {
                if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
                    return a = new Promise(function(a, c) {
                        c("Missing list of product id. eg. [1, 45, 83].")
                    }
                    ),
                    Promise.all([a]);
                var b = []
                , d = {};
                e.each(a, function(a, f) {
                    var g = new Promise(function(a, b) {
                        c.getSkuList.data[f] ? a(c.getSkuList.data) : c.getSkus(f).then(function(b) {
                            d[f] = e.extend({}, b);
                            c.getSkuList.data = e.extend({}, d, c.getSkuList.data);
                            a(c.getSkuList.data)
                        }, function(a) {
                            b("Product id not found.")
                        })
                    }
                    );
                    b.push(g)
                });
                return Promise.all(b)
            }
            ;
            c.getSkuList.data = {};
            c.getInfo = function(a) {
                var b = e.Deferred();
                if ("undefined" === a)
                    return b.reject("Missing product id."),
                    b.promise();
                var d = "/api/catalog_system/pub/products/search/?fq=productId:" + a;
                if (c.getInfo.data[a])
                    return b.resolve(c.getInfo.data[a]),
                    b.promise();
                e.ajax({
                    url: d, 
                    success: function(d) {
                        c.getInfo.data[a] = d;
                        b.resolve(c.getInfo.data[a])
                    },
                    error: function(d) {
                        c.getInfo.data[a] = [];
                        b.reject("Product id not found.")
                    }
                });
                return b.promise()
            }
            ;
            c.getInfo.data = {};
            c.addProducts = function(a) {
                var b = e.Deferred();
                if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
                    return b.reject("Missing array of objects. eg. [{ id: 1 }, { id: 2, quantity: 2 }]"),
                    b.promise();
                var c = [];
                e.each(a, function(a, b) {
                    var d = Object.assign({
                        id: 0,
                        quantity: 1,
                        seller: 1
                    }, b);
                    c.push(d)
                });
                vtexjs.checkout.addToCart(c).fail(function(a) {
                    b.reject(a)
                }).done(function(a) {
                    b.resolve(a)
                });
                return b.promise()
            }
            ;
            "undefined" !== typeof console && "undefined" !== typeof console.log && (c.__log = console.log);
            return !0
        }
    }(jQuery, window, document);
    var formatBR = function (Number) { var number = "string"===typeof Number?1*Number:Number; var tmp = number.toFixed(2); tmp = tmp.replace(/\./, ""); tmp = tmp.replace(/([0-9]{2})$/g, ",$1"); if (tmp.length > 6) { tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2"); } return tmp; };
    var stringToSlug = function (e) { var a = e.trim(); a = a.toLowerCase(); a = a.replace(/\(|\)|\'|,/g, ""); a = a.replace(/\s+/g, " "); a = a.replace(/(\s|&|\?|\/|\||:)/g, "-"); a = a.replace(/\u00e7/g, "c"); a = a.replace(/\u00f1/g, "n"); a = a.replace(/\u00c7/g, "C"); a = a.replace(/\u00d1/g, "N"); a = a.replace(/[\u00c3\u00c2\u00c1\u00c0\u00c4]/g, "A"); a = a.replace(/[\u00c9\u00c8\u00cb]/g, "E"); a = a.replace(/[\u00cd\u00cc\u00cf]/g, "I"); a = a.replace(/[\u00d5\u00d4\u00d3\u00d2\u00d6]/g, "O"); a = a.replace(/[\u00da\u00d9]/g, "U"); a = a.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g, "a"); a = a.replace(/[\u00e8\u00e9\u00ea\u00eb]/g, "e"); a = a.replace(/[\u00ec\u00ed\u00ee\u00ef]/g, "i"); a = a.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g, "o"); a = a.replace(/[\u00f9\u00fa\u00fb\u00fc]/g, "u"); return a; };
    var generateImgUrl = (function ($,window,document,undefined){
        "use strict";
        return function (ImgSrc) {
            var size = 180;
            if($('html').hasClass('_mobi-on')) {
                size = 140;
            }
            return ImgSrc.replace(/(.*?ids\/)(.*?)(\/.*)/g,"$1$2-"+size+"-"+size+"$3").replace(/\?.*/,"");
        };
    })(jQuery,window,document);


    var applyMoreProducts = function () {
        $('#cart-title').wrap('<div class="_title"></div>');
        $('._title').append('<div class="_more-link"><a>Escolher mais produtos</a></div>');
        $('<a href="#/orderform" class="_buy-btn">Fechar pedido</div>').insertAfter('.cart-totalizers .accordion-group');
        return true;
    }
    $(applyMoreProducts);

    var changeUrlButtonMoreProducts = function() {
        function getUrl(key) {
            var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : '/';
        }

        $('body').on('click', '._more-link, .more-products', function(event) {
            if(/\/p/.test(document.referrer) && !/utm/.test(document.referrer)) {
                location.href = getUrl('LastDepartmentUrl');
            } else {
                location.href = '/';	
            }

            return true;
        });
    }
    $(changeUrlButtonMoreProducts);

    /*201905281755*/
    var addContinueShoppingBtn = function(){
        $('.full-cart .cart').prepend('<div class="_more-prds-btns"><a href="/">Escolher mais produtos</a></div>');
    return true;
    };
    $(window).on('load',addContinueShoppingBtn);
    var moveGiftTables = function(){
        // if($(window).width()>768) return false;
        var gifts = $('.full-cart > .cart-select-gift-placeholder').eq(0);
        if(gifts.length<=0){
            gifts = $('.full-cart .summary-template-holder .cart-select-gift-placeholder').eq(0);
        }
        $('#cartLoadedDiv').append(gifts);
        return true;
    };
    $(window).on('load',moveGiftTables);
    var fixVisaBtn = function () {    
        $('.extensions-checkout-buttons-container').appendTo('._visa-btn-wrp');
        return true;
    }
    $(window).on('load',fixVisaBtn);
    var checkEmptyCart = function () {
        if($('.empty-cart-content:visible').length>0){
            $('html').addClass("_empty-cart");
        }
    };
    $(window).on('load',checkEmptyCart);
    var siteblindadoSelo = function (Cb) {
        var s = document.createElement('script');
        s.src = "//selo.siteblindado.com/aw.js";
        s.classList.add('_siteblindado-selo');
        s.addEventListener('load',function () {
            if ("function" === typeof Cb) {
                Cb();
            }        
        });
        var sRef = document.getElementsByTagName('script')[0];
        sRef.parentNode.insertBefore(s,sRef);
    };
    var siteblindadoApi = function () {
        try {        
            var apiScript = document.createElement('script');
            apiScript.async = true;
            apiScript.src = "//cdn.siteblindado.com/aw.js";
            apiScript.classList.add('_siteblindado-api');
            var scriptRef = document.getElementsByTagName('script')[0];
            scriptRef.parentNode.insertBefore(apiScript, scriptRef);
        } catch (error) {
            console.log(error);
        }
    };
    var startSiteblindado = function () {
        window.___siteblindadoTO = setTimeout(function () {
            siteblindadoSelo(siteblindadoApi);
            clearTimeout(window.___siteblindadoTO);
        },5000);
    };
    $(window).on('load',startSiteblindado);

    var applyClearsale = (function (window,document,undefined) {
        var addFingerPrint = function () {
            var deviceFingerprintIdCSV4 = 10000000 + Math.floor(Math.random() * 99999999);
            csdp('app', '4xlyr73qs322g24mv7qt');
            csdp('sessionid', deviceFingerprintIdCSV4);
            window.vtex.deviceFingerprint = deviceFingerprintIdCSV4;
            return true;
        };
        var clearsaleFPScript = function (a, b, c, d, e, f, g, h) {
            a['CsdpObject'] = e;
            a[e] = a[e] || function () {
                (a[e].q = a[e].q || []).push(arguments)
            }, a[e].l = 1 * new Date();
            f = b.createElement(c), g = b.getElementsByTagName(c)[0];
            f.async = 1;
            f.src = d;
            f.classList.add('_clearsale-fingerprint')
            f.addEventListener('load',h)
            g.parentNode.insertBefore(f, g);
            return true;
        };
        var startClearsale = function () {
            if(!/payment/ig.test(document.location.hash)||!!window.___clearsaleApplied) { return false; }
            clearsaleFPScript(window, document, 'script', '//device.clearsale.com.br/p/fp.js', 'csdp', undefined, undefined, addFingerPrint);
            window.___clearsaleApplied = true;
            return true;
        };
        return startClearsale;
    })(window,document);

    var showBoleto = function () {
        if(!/payment/ig.test(document.location.hash)) { return false; }
        var className = '_show-boleto';
        $('html').removeClass(className);
        if ($('.vtex-omnishipping-1-x-SummaryItemTitle:visible').length<=0) {
            $('html').addClass(className);
        }
        return true;
    };
    $(window).on('load',showBoleto);
    var moreThen3Addresses = function () {
        if(!/shipping/ig.test(document.location.hash)) { return false; }
        var html = document.querySelector("html");
        var addressList = document.getElementsByClassName('address-item');
        if ( undefined !== addressList && addressList.length > 1) {
            html.classList.add("multiple-address");
        }
        return true;
    }
    var selectCreditCard = function(){
        if(!/payment/ig.test(document.location.hash)) { return false; }
        if ($('.vtex-omnishipping-1-x-pickupAddress').length>0 /* endereço de pickup */
            && $('#payment-group-bankInvoicePaymentGroup.active').length > 0 /* se boleto está selecionado */
            ) {
            $('a#payment-group-creditCardPaymentGroup').click();
        }
        return true;
    };

    // CHECKOUTS CHANGES HASH
    var checkoutChanged = function(e){
        showBoleto();
        selectCreditCard();
        moreThen3Addresses();
        // applyClearsale();
    };
    var checkoutChangeEvents = function () {
        if(!!window.___checkoutEventsApplied) { return false; }
        //$(window).on('deliverySelected.vtex',checkoutChanged)
        $(window).on('hashchange',checkoutChanged);
        window.___checkoutEventsApplied = true;
        checkoutChanged();
        return true;
    };
    $(checkoutChangeEvents);
    // END: CHECKOUTS CHANGES HASH

    (function ($, window, document, undefined) {
        "use strict";
        var __log = console.log;
        var pricingTableTpl = function (p_row) {
            var row = p_row || 0;
            return '' +
                '<td class="_cart-tbl-container _cart-tbl-container' + row + '">' +
                    '<div class="_cart-tbl">' +
                        '<div class="_cart-left">' +
                            '<div class="_cart-title">' +
                                '<div class="_cart-col0">' +
                                    'Produto' +
                                '</div>' +
                            '</div>' +
                            '<div class="_cart-body">' +
                                '<div class="_cart-col0 _cart-product">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="_cart-right">' +
                            '<div class="_cart-title">' +
                                '<div class="_cart-col0">' +
                                    'Preço' +
                                '</div>' +
                                '<div class="_cart-col1">' +
                                    'Quantidade' +
                                '</div>' +
                                '<div class="_cart-col2">' +
                                    'Total' +
                                '</div>' +
                                '<div class="_cart-col3">' +
                                    '&nbsp;' +
                                '</div>' +
                            '</div>' +
                            '<div class="_cart-body">' +
                                '<div class="_cart-col0 _cart-pricing">' +
                                '</div>' +
                                '<div class="_cart-col1 _cart-qty-container">' +
                                    '<div class="_cart-qty">' +
                                    '</div>' +
                                '</div>' +
                                '<div class="_cart-col2 _cart-final-price">' +
                                '</div>' +
                                '<div class="_cart-col3 _cart-remove">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</td>';
        };
        var fixPricingTable = function () {
            $('.full-cart tr.product-item').each(function (ndx, item) {
                var _tpl = $(pricingTableTpl(ndx));
                $(item).filter(function () {
                    return $(item).find('._cart-tbl').length <= 0;
                }).append(_tpl);
                var _img = $(item).find('.product-image img');
                // _img.attr('src', _img.attr('src').replace(/(.*)(-\d{2}-\d{2})(.*)/,'$1-200-200$3'));
                var _imgtd = $(item).find('.product-image').html(_img);
                /** move elements to a better place */
                $(item).find('._cart-product')
                    .html(_imgtd)
                    .append($(item).find('.product-name'));
                $(item).find('._cart-qty').html($(item).find('.quantity:first'));
                $(item).find('._cart-pricing').html($(item).find('.product-price:first'));
                $(item).find('._cart-final-price').html($(item).find('.quantity-price:first'));
                $(item).find('._cart-remove').html($(item).find('.item-remove:first'));
            });
            return true;
        };
        var pickupNotFind = function () {
            var contentPickupNotFind = $('.ask-for-geolocation');
            if(contentPickupNotFind.length > 0){
                contentPickupNotFind.html("<div class='pickup-notfind'>Não encontramos pontos de retirada perto deste endereço.<br /> </div>");
                setTimeout(function() {
                    $('#shipping-option-delivery').click();
                        console.log('sem ponto de retirada');
                }, 4500);
            };
        };
        $(window).on('load',pickupNotFind);
        var onCartChange = function () {
            $(window).on('orderFormUpdated.vtex', function () {
                fixPricingTable();
                setTimeout(function() {
                    pickupNotFind();
                }, 1000);
            });
            return true;
        };
        var startCartFix = function () {
            fixPricingTable();
            onCartChange();
            return true;
        };
        $(startCartFix);
        var fixPaymentDiscountLink = function () {
            $(document).ready(function() {
                $('body').on('click', '.payment-discounts-alert',function() {
                    $("html, body").animate({ 
                    scrollTop: $('.body-order-form').offset().top 
                    }, 1000);
                });	
                
            });	      	
        return true;
        }
        $(fixPaymentDiscountLink);       
    })(jQuery, window, document);


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
    }
}

export default {
    init: Methods.init
}