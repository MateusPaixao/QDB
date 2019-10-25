const Methods = {
    init() {
        // Methods.flip()
    },
    flip() {
        const flipConfig = {
            selector: '.flip',
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 20,
            loop: true,
            rtl: false,
            onInit: () => {},
            onChange: () => {},
        }
        const flip = new Siema(flipConfig);
        const next = document.querySelector('.siemaNext');
        const prev = document.querySelector('.siemaPrev');
    }
}