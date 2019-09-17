(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// FIDDLER

;(function ($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function () {
		//Adiciona box minha conta menu
		$('.header-bottom > .shell').prepend('<div class="box-login-menu"><div classs="shell"><div class="shell-img"><img src="/arquivos/new-tbb-img-user-not-logado.png"/></div><div class="shell-btn"><a href="/minha-conta" class="minha-conta"> MINHA CONTA <i class="ico ico-btn-shell"></i></a><a href="#" class="meus-pedidos"> MEUS PEDIDOS <i class="ico ico-btn-shell"></i></a></div></div></div>');

		// Foto login mobile topo
		$(window).on('userLogged.vtexid', function (event, obj) {
			var name = obj.name;
			var mail = obj.mail;

			try {
				$('.item-user .user-view-2 img').attr('src', 'http://www.gravatar.com/avatar/' + $.md5(mail));
			} catch (error) {
				console.error(error);
			}
		});

		// #Scroll
		if ($('.feed-primary').length) {
			moveElement($('.feed-primary'), $('.section-feeds .shell'));
		}

		// #IE9 Placeholder (Home)
		$.fn.doPlaceholders = function () {
			if ($.support.placeholder) {
				return this;
			}

			var $fields = this.filter(function () {
				return !$(this).data('didPlaceholders');
			});

			$fields.on('focus blur', function (event) {
				var placeholder = this.getAttribute('placeholder');

				if (event.type === 'focus' && placeholder === this.value) {
					this.value = '';
				} else if (event.type === 'blur' && this.value === '') {
					this.value = placeholder;
				}
			});

			$fields.each(function () {
				if (this.value === '') {
					this.value = this.getAttribute('placeholder');
				}
			});

			$fields.data('didPlaceholders', true);

			return $fields;
		};
		$.support.placeholder = function () {
			return 'placeholder' in document.createElement('input');
		}();

		if (!$.support.placeholder) {
			$('input[placeholder], textarea[placeholder]').doPlaceholders();
		}
	});

	$win.on('load', function () {
		// #Instagram.
		$('.section-feeds .feeds li').eq(2).addClass('feed-secondary');
		// #Scroll
		if ($('.nav-secondary').length) {
			moveElement($('.nav-secondary'), $('.nav'));
		}
		$('#ajaxBusy').hide();
		$('.ht-box-loader').hide();
		$('.ht-popup-bg').hide();
	});

	var sideSlick = function sideSlick() {

		var opt = {
			infinite: true,
			speed: 500,
			adaptiveHeight: true,
			adaptiveWidth: true,
			autoplay: false,
			arrows: true,
			dots: false,
			responsive: [{
				breakpoint: 500,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 3000,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}

			}]
		};
		$('.slider-products .pratileira ul').slick(opt);
		return true;
	};
	var startSlickBanners = function startSlickBanners() {
		sideSlick();
		return true;
	};
	$(startSlickBanners);
})(jQuery, window, document);

/* ====================================================================== *\
	#Grid slider product
\* ====================================================================== */
function getGridSize() {
	return window.innerWidth < 480 ? 2 : window.innerWidth < 1025 ? 4 : window.innerWidth > 1024 ? 4 : 4;
}

/* ====================================================================== *\
	#Clone elementos
\* ====================================================================== */
function moveElement($target, $newContainer) {
	var $clone = $target.clone();
	$newContainer.append($clone);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMzA4ZGE3NzUuanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwiJHdpbiIsIiRkb2MiLCJyZWFkeSIsInByZXBlbmQiLCJvbiIsImV2ZW50Iiwib2JqIiwibmFtZSIsIm1haWwiLCJhdHRyIiwibWQ1IiwiZXJyb3IiLCJjb25zb2xlIiwibGVuZ3RoIiwibW92ZUVsZW1lbnQiLCJmbiIsImRvUGxhY2Vob2xkZXJzIiwic3VwcG9ydCIsInBsYWNlaG9sZGVyIiwiJGZpZWxkcyIsImZpbHRlciIsImRhdGEiLCJnZXRBdHRyaWJ1dGUiLCJ0eXBlIiwidmFsdWUiLCJlYWNoIiwiY3JlYXRlRWxlbWVudCIsImVxIiwiYWRkQ2xhc3MiLCJoaWRlIiwic2lkZVNsaWNrIiwib3B0IiwiaW5maW5pdGUiLCJzcGVlZCIsImFkYXB0aXZlSGVpZ2h0IiwiYWRhcHRpdmVXaWR0aCIsImF1dG9wbGF5IiwiYXJyb3dzIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNsaWNrIiwic3RhcnRTbGlja0Jhbm5lcnMiLCJqUXVlcnkiLCJnZXRHcmlkU2l6ZSIsImlubmVyV2lkdGgiLCIkdGFyZ2V0IiwiJG5ld0NvbnRhaW5lciIsIiRjbG9uZSIsImNsb25lIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQSxDQUFDLENBQUMsVUFBVUEsQ0FBVixFQUFhQyxNQUFiLEVBQXFCQyxRQUFyQixFQUErQkMsU0FBL0IsRUFBMEM7QUFDM0MsS0FBSUMsT0FBT0osRUFBRUMsTUFBRixDQUFYO0FBQ0EsS0FBSUksT0FBT0wsRUFBRUUsUUFBRixDQUFYOztBQUVBRyxNQUFLQyxLQUFMLENBQVcsWUFBWTtBQUN0QjtBQUNBTixJQUFFLHlCQUFGLEVBQTZCTyxPQUE3QixDQUFxQywrVkFBckM7O0FBRUE7QUFDQVAsSUFBRUMsTUFBRixF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T1RDLFNBQU0sS0FQRztBQVFUQyxlQUFZLENBQUM7QUFDWkMsZ0JBQVksR0FEQTtBQUVaQyxjQUFVO0FBQ1RDLG1CQUFjLENBREw7QUFFVEMscUJBQWdCO0FBRlA7QUFGRSxJQUFELEVBTVQ7QUFDRkgsZ0JBQVksSUFEVjtBQUVGQyxjQUFVO0FBQ1RDLG1CQUFjLENBREw7QUFFVEMscUJBQWdCO0FBRlA7O0FBRlIsSUFOUztBQVJILEdBQVY7QUF1QkEvQyxJQUFFLGlDQUFGLEVBQXFDZ0QsS0FBckMsQ0FBMkNiLEdBQTNDO0FBQ0EsU0FBTyxJQUFQO0FBQ0EsRUEzQkQ7QUE0QkEsS0FBSWMsb0JBQW9CLFNBQVNBLGlCQUFULEdBQTZCO0FBQ3BEZjtBQUNBLFNBQU8sSUFBUDtBQUNBLEVBSEQ7QUFJQWxDLEdBQUVpRCxpQkFBRjtBQUNBLENBN0dBLEVBNkdFQyxNQTdHRixFQTZHVWpELE1BN0dWLEVBNkdrQkMsUUE3R2xCOztBQStHRDs7O0FBR0EsU0FBU2lELFdBQVQsR0FBdUI7QUFDdEIsUUFBT2xELE9BQU9tRCxVQUFQLEdBQW9CLEdBQXBCLEdBQTBCLENBQTFCLEdBQThCbkQsT0FBT21ELFVBQVAsR0FBb0IsSUFBcEIsR0FBMkIsQ0FBM0IsR0FBK0JuRCxPQUFPbUQsVUFBUCxHQUFvQixJQUFwQixHQUEyQixDQUEzQixHQUErQixDQUFuRztBQUNBOztBQUVEOzs7QUFHQSxTQUFTbEMsV0FBVCxDQUFxQm1DLE9BQXJCLEVBQThCQyxhQUE5QixFQUE2QztBQUM1QyxLQUFJQyxTQUFTRixRQUFRRyxLQUFSLEVBQWI7QUFDQUYsZUFBY0csTUFBZCxDQUFxQkYsTUFBckI7QUFDQSIsImZpbGUiOiJmYWtlXzMwOGRhNzc1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBGSURETEVSXG47KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblx0dmFyICR3aW4gPSAkKHdpbmRvdyk7XG5cdHZhciAkZG9jID0gJChkb2N1bWVudCk7XG5cblx0JGRvYy5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0Ly9BZGljaW9uYSBib3ggbWluaGEgY29udGEgbWVudVxuXHRcdCQoJy5oZWFkZXItYm90dG9tID4gLnNoZWxsJykucHJlcGVuZCgnPGRpdiBjbGFzcz1cImJveC1sb2dpbi1tZW51XCI+PGRpdiBjbGFzc3M9XCJzaGVsbFwiPjxkaXYgY2xhc3M9XCJzaGVsbC1pbWdcIj48aW1nIHNyYz1cIi9hcnF1aXZvcy9uZXctdGJiLWltZy11c2VyLW5vdC1sb2dhZG8ucG5nXCIvPjwvZGl2PjxkaXYgY2xhc3M9XCJzaGVsbC1idG5cIj48YSBocmVmPVwiL21pbmhhLWNvbnRhXCIgY2xhc3M9XCJtaW5oYS1jb250YVwiPiBNSU5IQSBDT05UQSA8aSBjbGFzcz1cImljbyBpY28tYnRuLXNoZWxsXCI+PC9pPjwvYT48YSBocmVmPVwiI1wiIGNsYXNzPVwibWV1cy1wZWRpZG9zXCI+IE1FVVMgUEVESURPUyA8aSBjbGFzcz1cImljbyBpY28tYnRuLXNoZWxsXCI+PC9pPjwvYT48L2Rpdj48L2Rpdj48L2Rpdj4nKTtcblxuXHRcdC8vIEZvdG8gbG9naW4gbW9iaWxlIHRvcG9cblx0XHQkKHdpbmRvdykub24oJ3VzZXJMb2dnZWQudnRleGlkJywgZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcblx0XHRcdHZhciBuYW1lID0gb2JqLm5hbWU7XG5cdFx0XHR2YXIgbWFpbCA9IG9iai5tYWlsO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHQkKCcuaXRlbS11c2VyIC51c2VyLXZpZXctMiBpbWcnKS5hdHRyKCdzcmMnLCAnaHR0cDovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLycgKyAkLm1kNShtYWlsKSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vICNTY3JvbGxcblx0XHRpZiAoJCgnLmZlZWQtcHJpbWFyeScpLmxlbmd0aCkge1xuXHRcdFx0bW92ZUVsZW1lbnQoJCgnLmZlZWQtcHJpbWFyeScpLCAkKCcuc2VjdGlvbi1mZWVkcyAuc2hlbGwnKSk7XG5cdFx0fVxuXG5cdFx0Ly8gI0lFOSBQbGFjZWhvbGRlciAoSG9tZSlcblx0XHQkLmZuLmRvUGxhY2Vob2xkZXJzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCQuc3VwcG9ydC5wbGFjZWhvbGRlcikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblxuXHRcdFx0dmFyICRmaWVsZHMgPSB0aGlzLmZpbHRlcihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiAhJCh0aGlzKS5kYXRhKCdkaWRQbGFjZWhvbGRlcnMnKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkZmllbGRzLm9uKCdmb2N1cyBibHVyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZhciBwbGFjZWhvbGRlciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpO1xuXG5cdFx0XHRcdGlmIChldmVudC50eXBlID09PSAnZm9jdXMnICYmIHBsYWNlaG9sZGVyID09PSB0aGlzLnZhbHVlKSB7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZSA9ICcnO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdibHVyJyAmJiB0aGlzLnZhbHVlID09PSAnJykge1xuXHRcdFx0XHRcdHRoaXMudmFsdWUgPSBwbGFjZWhvbGRlcjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCRmaWVsZHMuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh0aGlzLnZhbHVlID09PSAnJykge1xuXHRcdFx0XHRcdHRoaXMudmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCRmaWVsZHMuZGF0YSgnZGlkUGxhY2Vob2xkZXJzJywgdHJ1ZSk7XG5cblx0XHRcdHJldHVybiAkZmllbGRzO1xuXHRcdH07XG5cdFx0JC5zdXBwb3J0LnBsYWNlaG9sZGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuICdwbGFjZWhvbGRlcicgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHR9KCk7XG5cblx0XHRpZiAoISQuc3VwcG9ydC5wbGFjZWhvbGRlcikge1xuXHRcdFx0JCgnaW5wdXRbcGxhY2Vob2xkZXJdLCB0ZXh0YXJlYVtwbGFjZWhvbGRlcl0nKS5kb1BsYWNlaG9sZGVycygpO1xuXHRcdH1cblx0fSk7XG5cblx0JHdpbi5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcblx0XHQvLyAjSW5zdGFncmFtLlxuXHRcdCQoJy5zZWN0aW9uLWZlZWRzIC5mZWVkcyBsaScpLmVxKDIpLmFkZENsYXNzKCdmZWVkLXNlY29uZGFyeScpO1xuXHRcdC8vICNTY3JvbGxcblx0XHRpZiAoJCgnLm5hdi1zZWNvbmRhcnknKS5sZW5ndGgpIHtcblx0XHRcdG1vdmVFbGVtZW50KCQoJy5uYXYtc2Vjb25kYXJ5JyksICQoJy5uYXYnKSk7XG5cdFx0fVxuXHRcdCQoJyNhamF4QnVzeScpLmhpZGUoKTtcblx0XHQkKCcuaHQtYm94LWxvYWRlcicpLmhpZGUoKTtcblx0XHQkKCcuaHQtcG9wdXAtYmcnKS5oaWRlKCk7XG5cdH0pO1xuXG5cdHZhciBzaWRlU2xpY2sgPSBmdW5jdGlvbiBzaWRlU2xpY2soKSB7XG5cblx0XHR2YXIgb3B0ID0ge1xuXHRcdFx0aW5maW5pdGU6IHRydWUsXG5cdFx0XHRzcGVlZDogNTAwLFxuXHRcdFx0YWRhcHRpdmVIZWlnaHQ6IHRydWUsXG5cdFx0XHRhZGFwdGl2ZVdpZHRoOiB0cnVlLFxuXHRcdFx0YXV0b3BsYXk6IGZhbHNlLFxuXHRcdFx0YXJyb3dzOiB0cnVlLFxuXHRcdFx0ZG90czogZmFsc2UsXG5cdFx0XHRyZXNwb25zaXZlOiBbe1xuXHRcdFx0XHRicmVha3BvaW50OiA1MDAsXG5cdFx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAyLFxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAyXG5cdFx0XHRcdH1cblx0XHRcdH0sIHtcblx0XHRcdFx0YnJlYWtwb2ludDogMzAwMCxcblx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDIsXG5cdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDJcblx0XHRcdFx0fVxuXG5cdFx0XHR9XVxuXHRcdH07XG5cdFx0JCgnLnNsaWRlci1wcm9kdWN0cyAucHJhdGlsZWlyYSB1bCcpLnNsaWNrKG9wdCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cdHZhciBzdGFydFNsaWNrQmFubmVycyA9IGZ1bmN0aW9uIHN0YXJ0U2xpY2tCYW5uZXJzKCkge1xuXHRcdHNpZGVTbGljaygpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXHQkKHN0YXJ0U2xpY2tCYW5uZXJzKTtcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxcXHJcblx0I0dyaWQgc2xpZGVyIHByb2R1Y3RcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIGdldEdyaWRTaXplKCkge1xuXHRyZXR1cm4gd2luZG93LmlubmVyV2lkdGggPCA0ODAgPyAyIDogd2luZG93LmlubmVyV2lkdGggPCAxMDI1ID8gNCA6IHdpbmRvdy5pbm5lcldpZHRoID4gMTAyNCA/IDQgOiA0O1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICpcXFxyXG5cdCNDbG9uZSBlbGVtZW50b3NcclxuXFwqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIG1vdmVFbGVtZW50KCR0YXJnZXQsICRuZXdDb250YWluZXIpIHtcblx0dmFyICRjbG9uZSA9ICR0YXJnZXQuY2xvbmUoKTtcblx0JG5ld0NvbnRhaW5lci5hcHBlbmQoJGNsb25lKTtcbn0iXX0=
},{}]},{},[1])