// FIDDLER
;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		//Adiciona box minha conta menu
		$('.header-bottom > .shell').prepend('<div class="box-login-menu"><div classs="shell"><div class="shell-img"><img src="/arquivos/new-tbb-img-user-not-logado.png"/></div><div class="shell-btn"><a href="/minha-conta" class="minha-conta"> MINHA CONTA <i class="ico ico-btn-shell"></i></a><a href="#" class="meus-pedidos"> MEUS PEDIDOS <i class="ico ico-btn-shell"></i></a></div></div></div>');

		// Foto login mobile topo
		$(window).on('userLogged.vtexid', function(event, obj){
		    var name = obj.name;
		    var mail = obj.mail;

		    try {
		        $('.item-user .user-view-2 img').attr('src', 'http://www.gravatar.com/avatar/' + $.md5(mail));
		    }catch(error) {
		        console.error(error);
		    }
		});

		// #Scroll
		if ($('.feed-primary').length) {
			moveElement($('.feed-primary'), $('.section-feeds .shell'));
		}


		// #IE9 Placeholder (Home)
		$.fn.doPlaceholders = function() {
		    if ($.support.placeholder) {
		        return this;
		    }

		    var $fields = this.filter(function () {
		        return !$(this).data('didPlaceholders');
		    });

		    $fields.on('focus blur', function(event) {
		        var placeholder = this.getAttribute('placeholder');

		        if (event.type === 'focus' && placeholder === this.value) {
		            this.value = '';
		        } else if (event.type === 'blur' && this.value === '') {
		            this.value = placeholder;
		        }
		    });

		    $fields.each(function() {
		        if (this.value === '') {
		            this.value = this.getAttribute('placeholder');
		        }
		    });

		    $fields.data('didPlaceholders', true);

		    return $fields;
		}
		$.support.placeholder = (function() {
		    return 'placeholder' in document.createElement('input');
		})();

		if (!$.support.placeholder) {
		    $('input[placeholder], textarea[placeholder]').doPlaceholders();
		}  
	});

	$win.on('load', function(){
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

	var sideSlick = function () {
		
		var opt = {
			infinite: true,
			speed: 500,
			adaptiveHeight: true,
			adaptiveWidth: true,
			autoplay: false,
			arrows: true,
            dots: false,
			responsive: [
				{
				breakpoint: 500,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
				},
				{
				breakpoint: 3000,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}

				}
			]
		};
		$('.slider-products .pratileira ul')
			.slick(opt);
		return true;
	};
	var startSlickBanners = function () {
		sideSlick();
		return true;
	}
	$(startSlickBanners);
	
})(jQuery, window, document);

/* ====================================================================== *\
	#Grid slider product
\* ====================================================================== */
function getGridSize() {
    return (window.innerWidth < 480) ? 2 :
	(window.innerWidth < 1025) ? 4:
    (window.innerWidth > 1024) ? 4 : 4;
}

/* ====================================================================== *\
	#Clone elementos
\* ====================================================================== */
function moveElement($target, $newContainer) {
	var $clone = $target.clone();
	$newContainer.append($clone);
}