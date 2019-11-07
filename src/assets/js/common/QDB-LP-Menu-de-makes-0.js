import Siema from "./global/vendor/siema-slider/siema.min.js"

function setOptionsCarousel() {
	const options = new Siema({
		perPage: 3
	});
	
	const prev = document.querySelector('.options-carousel__controls .prev');
	const next = document.querySelector('.options-carousel__controls .next');
	prev.addEventListener('click', () => options.prev());
	next.addEventListener('click', () => options.next());
}

setOptionsCarousel();
