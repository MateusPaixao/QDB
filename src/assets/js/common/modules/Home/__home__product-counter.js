const Methods = {
    init() {
        // Methods.getProductInfos();
        Methods.homeCountDown();
    },
    getProductInfos: () => {
        const idProduto = document.querySelector('.w-gerador--datas').getAttribute('data-product');
        const url = 'http://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:' + idProduto;
        fetch(url)
            .then(res => res.json())
            .then((product) => {
                const skuList = product[0].items;
                const selectionSku = document.querySelector('.w-gerador--text.idsku');
                for (const i in skuList) {
                    if (skuList.hasOwnProperty(i)) {
                        const sku = skuList[i];
                    }
                }
            })
    },
    homeCountDown: () => {

        let dateInicio = document.querySelector('.w-gerador--datas').getAttribute('data-inicio')
        let dateFim = document.querySelector('.w-gerador--datas').getAttribute('data-fim');
        const end = new Date(dateFim);

        const _second = 1000;
        const _minute = _second * 60;
        const _hour = _minute * 60;
        const _day = _hour * 24;
        let clock = 0;

        function showRemaining() {
            let now = new Date();
            let distance = end - now;

            if (distance <= 0) {
                clearInterval(clock);
                return;
            }
            let days = Math.floor(distance / _day);
            let hours = Math.floor(distance / 36e5);
            let minutes = Math.floor((distance % _hour) / _minute);
            let seconds = Math.floor((distance % _minute) / _second);

            // let dayCounter = document.querySelector('.w-counter--day');
            let hourCounter = document.querySelector('.w-product--contador--hours');
            let minuteCounter = document.querySelector('.w-product--contador--minutes');
            let secondsCounter = document.querySelector('.w-product--contador--seconds');

            // dayCounter.innerHTML = days;
            // diasText.textContent = days == 1 ? 'dia' : 'dias';
            hourCounter.innerHTML = hours < 10 ? '0' + hours : hours;
            minuteCounter.innerHTML = minutes < 10 ? '0' + minutes : minutes;
            secondsCounter.innerHTML = seconds < 10 ? '0' + seconds : seconds;
        }

        clock = setInterval(showRemaining, 1000);
    },
    getTopBannerColor: () => {
        let topBannerColor = document.querySelector('.w-counter--bg').getAttribute('data-color');
        let cronometro = document.querySelector('.w-product--contador');
        let discountFlag = document.querySelector('.w-product--wrapper--flag');
        let oldPrice = document.querySelector('w-product--old-price');
        let newPrice = document.querySelector('w-product--wrapper--new-price');
        let buyButton = document.querySelector('w-product--wrapper--buy-button')
        
    }
}
export default {
    init: Methods.init
}
