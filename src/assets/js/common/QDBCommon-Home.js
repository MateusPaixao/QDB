// import HomeIndex from './modules/Home/home-index';

// document.addEventListener('DOMContentLoaded', HomeIndex.init);

const Methods = {
    init() {
        Methods.homeCountDown();
        Methods.getProductInfos();
        Methods.getTopBannerColor()
        Methods.getReviews(document.querySelector('.w-gerador--datas').getAttribute('data-product'));
    },
    getProductInfos: () => {
        const idProduto = document.querySelector('.w-gerador--datas').getAttribute('data-product');
        const idSku = document.querySelector('.w-gerador--datas').getAttribute('data-sku');
        const url = 'http://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:' + idProduto;
        fetch(url)
            .then(res => res.json())
            .then((product) => {
                const skuList = product[0].items;
                console.log(skuList)

                for (const i in skuList) {
                    if (skuList.hasOwnProperty(i)) {
                        const sku = skuList[i];
                        if(sku.itemId == idSku){
                            var listPrice = sku.sellers[0].commertialOffer.ListPrice;
                            var bestPrice = sku.sellers[0].commertialOffer.Price;
                            var percent = parseInt(100 - ((bestPrice / listPrice) * 100));


                            console.log("porcentagem de desconto: ", percent)
                            let skuImg, skuTitle, oldPrice, newPrice, parcelamento, desconto;

                            skuImg = document.querySelector('.w-product--wrapper--img');
                            skuImg.src = sku.images[0].imageUrl;

                            skuTitle = document.querySelector('.w-product--wrapper--infos--title');
                            skuTitle.textContent = sku.name;

                            oldPrice = document.querySelector('.w-product--wrapper--infos--old-price');
                            oldPrice.textContent = `R$ ${listPrice.toFixed(2).replace('.',',')}`;

                            newPrice = document.querySelector('.w-product--wrapper--infos--new-price');
                            newPrice.textContent = `R$ ${bestPrice.toFixed(2).replace('.',',')}`;

                            desconto = document.querySelector('.w-product--wrapper--flag');
                            desconto.textContent = `-${percent}%`
                        }
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
            let hourCounter = document.querySelector('.w-product--contador--timer--time.--hours');
            let minuteCounter = document.querySelector('.w-product--contador--time.--minutes');
            let secondsCounter = document.querySelector('.w-product--contador--time.--segundos');

            // dayCounter.innerHTML = days;
            // diasText.textContent = days == 1 ? 'dia' : 'dias';
            hourCounter.innerHTML = hours < 10 ? '0' + hours : hours;
            minuteCounter.innerHTML = minutes < 10 ? '0' + minutes : minutes;
            secondsCounter.innerHTML = seconds < 10 ? '0' + seconds : seconds;
        }

        clock = setInterval(showRemaining, 1000);
    },
    getTopBannerColor: () => {
        const hasTopBanner = document.querySelector('.w-counter--bg') != null;

        if(hasTopBanner){
            let topBannerColor = document.querySelector('.w-counter--bg').getAttribute('data-color');
            
            let cronometro = document.querySelector('.w-product--contador');
            cronometro.style = `color:${topBannerColor};`
            
            // let discountFlag = document.querySelector('.w-product--wrapper--flag');
            // discountFlag.style = `background-color:${topBannerColor}`;
    
            let oldPrice = document.querySelector('.w-product--wrapper--infos--old-price');
            oldPrice.style = `color:${topBannerColor}`;
    
            let newPrice = document.querySelector('.w-product--wrapper--infos--new-price');
            newPrice.style = `color:${topBannerColor}`;
    
            let buyButton = document.querySelector('.w-product--wrapper--infos--buy-button');
            buyButton.style = `background-color:${topBannerColor}`;

            let desconto = document.querySelector('.w-product--wrapper--flag');
            desconto.style = `background-color: ${topBannerColor}`;
        }
        
    },
    getReviews: (el, idProduct) => {

        new Promise((resolve, reject) => {

            let request = new XMLHttpRequest();

            let url = "https://service.yourviews.com.br/api/388ef2d0-c3b8-4fd6-af13-446b698d544a/review/?productId=" + idProduct + "&orderBy=3&count=1";

            request.open('GET', url);

            request.setRequestHeader('Content-Type', 'application/json');

            request.setRequestHeader('Authorization', 'Basic Mzg4ZWYyZDAtYzNiOC00ZmQ2LWFmMTMtNDQ2YjY5OGQ1NDRhOjU2N2Q0MjVmLTA1MGQtNGY1NC05MWUxLTMzODgwZmFjZmRkMw==');

            request.setRequestHeader('Access-Control-Allow-Origin', '*');

            request.onreadystatechange = () => {

                if (request.readyState === 4) {

                    resolve(request.response);

                }

            }

            request.send();

        }).then((request) => {

            let html;

            console.log(request);

            request.Element.map((review, index) =>{

                function countRating(){

                    let stars='';

                    for(let i = 1; i <= review.Rating; i++){

                        stars += `<svg viewBox="0 0 18 21" width="18" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.605 14.394L0 10.48s2.528-2.836 3.605-3.913l5.014-5.013a5.326 5.326 0 0 1 7.523 0 5.321 5.321 0 0 1 0 7.521l-1.406 1.405 1.406 1.405a5.321 5.321 0 0 1 0 7.521 5.327 5.327 0 0 1-7.523 0l-5.014-5.013z" fill="#67605F"/></svg>`

                    }

                    return stars;

                }

                html +=

                `<li class="review">

                    <span class="_rate">

                    ${countRating()}

                    </span>

                    <p class="_comment">“` + review.Review + `” -` + review.User.Name.split(" ")[0] + `</p>

                </li>`

            });

            el.innerHTML = html.replace("undefined", "");

        });

    }
}
Methods.init();