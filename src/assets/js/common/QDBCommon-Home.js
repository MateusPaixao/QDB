import Home from "./modules/Home/home-index"
import General from "./modules/General/general-index"
import Siema from "./global/vendor/siema-slider/siema.min.js"

// import HomeIndex from './modules/Home/home-index';

// document.addEventListener('DOMContentLoaded', HomeIndex.init);

const Methods = {
    init() {
        // Methods.principalBannerSlick();
        Methods.buildHome();
        Methods.buildVitrines();
        Methods.buildBanners();
        Methods.getInfoVitrines();
        if(document.querySelector(".w-gerador--datas") != null){
            Methods.getProductInfos();
            Methods.getTopBannerColor();
        }
    },
    buildHome: () => {
        Home.init();
    },
    getInfoVitrines: () => {
        for(let i = 0; i < document.querySelectorAll(".bannerVitrine").length; i++){
            document.querySelectorAll(".bannerCollection__info__title")[i].textContent = document.querySelectorAll(".bannerVitrine")[i].textContent.match(/(?<=banTitleInit\s+).([^\s]+).*?(?=\s+banTitleEnd)/)[0];
            document.querySelectorAll(".bannerCollection__info__banner_url")[i].href = document.querySelectorAll(".bannerVitrine")[i].textContent.match(/href\s*=\s*"(.+?)"/)[1];
            document.querySelectorAll(".bannerCollection__info__banner_img")[i].src = document.querySelectorAll(".bannerVitrine")[i].textContent.match(/src\s*=\s*"(.+?)"/)[1];
        }
    },
    buildVitrines: () => {
        document.querySelectorAll(".bannerCollection__Placeholder").forEach((collection)=>{
            let vitrine = collection.nextSibling;
            vitrine.setAttribute("id", "collection-" + collection.textContent)
            vitrine.setAttribute("data-collection", collection.textContent)

            General.vitrine(vitrine.dataset.collection);
        });

        window.onload = () =>{
            const vitrines = document.querySelectorAll('.--gliderVitrine');
    
            for(const vitrine of vitrines) {
                console.log(vitrine);
                new Siema({
                  selector: vitrine,
                  duration: 200,
                  easing: 'ease-out',
                  perPage: 2,
                  startIndex: 0,
                  draggable: true,
                  multipleDrag: true,
                  threshold: 20,
                  loop: false,
                  rtl: false
                })
            }
        }
    },

    buildBanners: () => {
        const slideBanners = new Siema({
            selector: ".bannerHero__banners",
            duration: 200,
            easing: 'ease-out',
            perPage: 1,
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 20,
            loop: false,
            rtl: false,
            onInit: () => {},
            onChange: () => {}
        });

        console.log(slideBanners);
        console.log(slideBanners.prototype.isPrototypeOf());

        Siema.prototype.addPagination = function() {
            for (let i = 0; i < this.innerElements.length; i++) {
              const btn = document.createElement('button');
              btn.textContent = i;
              btn.addEventListener('click', () => this.goTo(i));
              this.selector.appendChild(btn);
            }
        }
        // Trigger pagination creator
        slideBanners.addPagination();
    },
    getProductInfos: () => {
        const idProduto = document.querySelector('.w-gerador--datas').getAttribute('data-product');
        const idSku = document.querySelector('.w-gerador--datas').getAttribute('data-sku');
        const url = 'http://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:' + idProduto;

        fetch(url)
            .then(res => res.json())
            .then((product) => {
                const skuList = product[0].items;
                console.log('produto', product[0])
                console.log('Link:', product[0].linkText)

                for (const i in skuList) {
                    if (skuList.hasOwnProperty(i)) {
                        const sku = skuList[i];
                        if (sku.itemId == idSku) {
                            var listPrice = sku.sellers[0].commertialOffer.ListPrice;
                            var bestPrice = sku.sellers[0].commertialOffer.Price;
                            var percent = parseInt(100 - ((bestPrice / listPrice) * 100));

                            let skuImg, skuTitle, oldPrice, newPrice, desconto, buyButton, productLink;

                            productLink = document.querySelectorAll('.w-product--link');
                            productLink[0].href = `/${product[0].linkText}/p`;
                            productLink[1].href = `/${product[0].linkText}/p`;

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

                            buyButton = document.querySelector('a.w-product--wrapper--infos--buy-button');
                            buyButton.href = sku.sellers[0].addToCartLink;

                            if (sku.sellers[0].commertialOffer.AvailableQuantity <= 0) {
                                Methods.disableProduct();
                            } else {
                                Methods.counterInit()
                                document.querySelector(".w-product--wrapper--infos--parcelamento").innerHTML = "até " + Math.max.apply(Math, sku.sellers[0].commertialOffer.Installments.map(function (o) {
                                    return o.NumberOfInstallments;
                                })) + "x de R$" + Math.min.apply(Math, sku.sellers[0].commertialOffer.Installments.map(function (o) {
                                    return o.Value;
                                })).toFixed(2).toString().replace(".", ",") + " sem juros";
                            }
                        }
                    }
                }
            })
    },

    counterInit: () => {

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
                Methods.disableProduct();
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

    disableProduct: () => {
        let buyButton = document.querySelector('.w-product--wrapper--infos--buy-button');
        let buyButtonTxt = document.querySelector('.w-product--wrapper--infos--buy-button button');
        document.querySelector('.w-product--container').classList.add('inactive');
        buyButtonTxt.textContent = "Indisponível"
        buyButton.style = "pointer-events: none;";
        buyButton.href = '';

        let hourCounter = document.querySelector('.w-product--contador--timer--time.--hours');
        let minuteCounter = document.querySelector('.w-product--contador--time.--minutes');
        let secondsCounter = document.querySelector('.w-product--contador--time.--segundos');

        hourCounter.innerHTML = '00';
        minuteCounter.innerHTML = '00';
        secondsCounter.innerHTML = '00';

        document.querySelector('.w-product--wrapper--infos--old-price').classList.add('hidden');
        document.querySelector('.w-product--wrapper--infos--new-price').classList.add('hidden');
        document.querySelector('.w-product--wrapper--flag').classList.add('hidden');
        document.querySelector('.w-promo-text').classList.add('hidden');
        document.querySelector('.w-promo-text-sad').classList.remove('hidden');
    },

    getTopBannerColor: () => {
        const hasTopBanner = document.querySelector('.w-counter--bg') != null;
        let topBannerColor;
        if (hasTopBanner) {
            topBannerColor = document.querySelector('.w-counter--bg').getAttribute('data-color');
        } else {
            topBannerColor = "red";
        }

        let cronometro = document.querySelector('.w-product--contador');
        cronometro.style = `color:${topBannerColor};`

        let discountFlag = document.querySelector('.w-product--wrapper--flag');
        discountFlag.style = `background-color:${topBannerColor}`;

        let oldPrice = document.querySelector('.w-product--wrapper--infos--old-price');
        oldPrice.style = `color:${topBannerColor}`;

        let newPrice = document.querySelector('.w-product--wrapper--infos--new-price');
        newPrice.style = `color:${topBannerColor}`;

        let buyButton = document.querySelector('.w-product--wrapper--infos--buy-button');
        buyButton.style = `background-color:${topBannerColor}`;

    },

    fetchReviews: () => {
        const idProduto = document.querySelector('.w-gerador--datas').getAttribute('data-product');
        const storeKey = "388ef2d0-c3b8-4fd6-af13-446b698d544a"
        const url = "https://service.yourviews.com.br/api/" + storeKey + "/review/reviewshelf?productIds=" + idProduto;

        fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic Mzg4ZWYyZDAtYzNiOC00ZmQ2LWFmMTMtNDQ2YjY5OGQ1NDRhOjU2N2Q0MjVmLTA1MGQtNGY1NC05MWUxLTMzODgwZmFjZmRkMw==',
                    'Access-Control-Allow-Origin': '*'
                })
            })
            .then(res => res.json())
            .then((res) => {
                console.log('data', res);
                let html;

                res.Element.map((review, index) => {

                    function countRating() {

                        let stars = '';

                        for (let i = 1; i <= review.Rating; i++) {

                            stars += `<svg viewBox="0 0 18 21" width="18" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.605 14.394L0 10.48s2.528-2.836 3.605-3.913l5.014-5.013a5.326 5.326 0 0 1 7.523 0 5.321 5.321 0 0 1 0 7.521l-1.406 1.405 1.406 1.405a5.321 5.321 0 0 1 0 7.521 5.327 5.327 0 0 1-7.523 0l-5.014-5.013z" fill="#67605F"/></svg>`

                        }
                        return stars;

                    }

                    html +=

                        `<li class="review">
                        <span class="_rate">
                            ${countRating()}
                        </span>
                    </li>`
                    // console.log(html)

                });
                const el = document.querySelector('.w-product--wrapper--infos--rate');
                el.innerHTML = html.replace('undefined', '');
            })
    },

    getReviews: () => {

        new Promise((resolve, reject) => {

            let request = new XMLHttpRequest();
            const idProduto = document.querySelector('.w-gerador--datas').getAttribute('data-product');
            const storeKey = "388ef2d0-c3b8-4fd6-af13-446b698d544a"
            let url = "https://service.yourviews.com.br/api/" + storeKey + "/review/reviewshelf?productIds=" + idProduto;

            request.open('GET', url);

            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('mode', 'cors');
            request.setRequestHeader('Authorization', 'Basic Mzg4ZWYyZDAtYzNiOC00ZmQ2LWFmMTMtNDQ2YjY5OGQ1NDRhOjU2N2Q0MjVmLTA1MGQtNGY1NC05MWUxLTMzODgwZmFjZmRkMw==');

            request.setRequestHeader('Access-Control-Allow-Origin', '*');

            request.onreadystatechange = () => {

                if (request.readyState === 4) {

                    resolve(JSON.parse('oieeeee', request.response));

                }

            }

            console.log('request', request)

            request.send();

        }).then((res) => {
            console.log(res)
            let html;

            res.Element.map((review, index) => {

                function countRating() {

                    let stars = '';

                    for (let i = 1; i <= review.Rating; i++) {

                        stars += `<svg viewBox="0 0 18 21" width="18" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.605 14.394L0 10.48s2.528-2.836 3.605-3.913l5.014-5.013a5.326 5.326 0 0 1 7.523 0 5.321 5.321 0 0 1 0 7.521l-1.406 1.405 1.406 1.405a5.321 5.321 0 0 1 0 7.521 5.327 5.327 0 0 1-7.523 0l-5.014-5.013z" fill="#67605F"/></svg>`

                    }
                    return stars;

                }

                html +=

                    `<li class="review">
                        <span class="_rate">
                            ${countRating()}
                        </span>
                    </li>`
                // console.log(html)

            });
            const el = document.querySelector('.w-product--wrapper--infos--rate');
            el.innerHTML = html.replace('undefined', '');

        });
    }
}

Methods.init();
