import Siema from "./global/vendor/siema-slider/siema.min.js"

function setOptionsCarousel() {
	const options = new Siema({
		perPage: {
			0: 1,
			420: 2,
			768: 3
		}
	});
	
	const prev = document.querySelector('.options-carousel__controls .prev');
	const next = document.querySelector('.options-carousel__controls .next');
	prev.addEventListener('click', () => options.prev());
	next.addEventListener('click', () => options.next());
}

function setSchedulingModal() {
	const modal = document.querySelector('.modal-scheduling');
	const optionContainer = modal.querySelector('.modal-scheduling__main__content');

	document.querySelectorAll('.options-section__item__button').forEach(item => {
		item.addEventListener('click', event => {
			event.preventDefault();
			optionContainer.innerHTML = item.closest('.options-section__item').outerHTML;
			modal.classList.add('show');
		});
	});
	document.querySelectorAll('.modal-scheduling__close').forEach(item => {
		item.addEventListener('click', event => {
			modal.classList.remove('show');
		});
	});

}

setOptionsCarousel();
setSchedulingModal();
