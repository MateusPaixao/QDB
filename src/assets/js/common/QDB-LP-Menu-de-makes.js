import '../../scss/common/QDB-LP-Menu-de-makes.scss'

function checkDevice(){
	let isMobile;
	if(window.innerWidth > 768){
		isMobile = 3;
	}
	else{
		isMobile = 1.5;
	}
	$('.makeup--container__content--slick').slick({
		adaptiveHeight: true,
		arrows: true,
		draggable: true,
		slidesToShow: isMobile,
		infinite: false
	})

}
checkDevice();
