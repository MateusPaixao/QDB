const Methods = {
    init() {
        if (document.querySelector(".w-gerador--datas") != null) {
            // Methods.fetchReviews();
            Methods.getProductInfos();
            Methods.getTopBannerColor();
            Methods.AddToCart();
        }
    },
    getProductInfos: () => {
        const idProduto = document.querySelector('.w-gerador--datas').getAttribute('data-product');
        const idSku = document.querySelector('.w-gerador--datas').getAttribute('data-sku');
        const url = '/api/catalog_system/pub/products/search/?fq=productId:' + idProduto;

        fetch(url)
            .then(res => res.json())
            .then((product) => {
                const skuList = product[0].items;

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

                            buyButton = document.querySelector('.w-product--wrapper--infos--buy-button');


                            if (sku.sellers[0].commertialOffer.AvailableQuantity <= 0) {
                                document.querySelector('.w-gerador--datas').setAttribute('data-available', 'false');
                                Methods.disableProduct();
                            } else {
                                document.querySelector('.w-gerador--datas').setAttribute('data-available', 'true');
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
        let buyButtonTxt = document.querySelector('.w-product--wrapper--infos--buy-button');
        document.querySelector('.w-product--container').classList.add('inactive');
        const checkAvailable = document.querySelector('.w-gerador--datas').getAttribute('data-available')
        if (checkAvailable == 'true') {
            buyButtonTxt.textContent = "PROMOÇÃO ENCERRADA "
            document.querySelector('.w-promo-text-sad').classList.remove('hidden');
        } else if (checkAvailable == 'false') {
            buyButtonTxt.textContent = "Indisponível";
            document.querySelector('.w-promo-text-out').classList.remove('hidden');
        }
        buyButton.style = "pointer-events: none;";
        buyButton.href = '';

        const hourCounter = document.querySelector('.w-product--contador--timer--time.--hours');
        const minuteCounter = document.querySelector('.w-product--contador--time.--minutes');
        const secondsCounter = document.querySelector('.w-product--contador--time.--segundos');

        hourCounter.innerHTML = '00';
        minuteCounter.innerHTML = '00';
        secondsCounter.innerHTML = '00';
        document.querySelector('.w-product--wrapper--infos--parcelamento').classList.add('hidden');
        document.querySelector('.w-product--wrapper--infos--old-price').classList.add('hidden');
        document.querySelector('.w-product--wrapper--infos--new-price').classList.add('hidden');
        document.querySelector('.w-promo-text').classList.add('hidden');
        document.querySelector('.w-product--wrapper--flag').classList.add('hidden');
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
        const url = "https://service.yourviews.com.br/api/v2/pub/review/ReviewShelf?productids=" + idProduto;

        fetch(url,{
            method: "GET",
            headers: {
                'YVStoreKey': '388ef2d0-c3b8-4fd6-af13-446b698d544a',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then(res => res.json())
        .then((reviews) => {
            // console.log(reviews);
        })
    },
    AddToCart: () => {
        document.querySelector(".w-product--wrapper--infos--buy-button").addEventListener("click", () => {
            let skuId = document.querySelector(".w-gerador--datas").getAttribute("data-sku");
            // console.log(skuId)
            let quantity;
            vtexjs.checkout.getOrderForm().then(function (orderForm) {
                    // console.log(orderForm);
                    if (!!orderForm.items.length) {
                        orderForm.items.map((e, i) => {
                            if (e.id == skuId) {
                                quantity = e.quantity;
                                quantity++
                                let updateItem = {
                                    index: i,
                                    quantity: quantity
                                };
                                return vtexjs.checkout.updateItems([updateItem]);
                            } else {
                                let newitem = {
                                    id: skuId,
                                    quantity: 1,
                                    seller: '1'
                                };
                                return vtexjs.checkout.addToCart([newitem]);
                            }
                        })
                    } else {
                        let newitem = {
                            id: skuId,
                            quantity: 1,
                            seller: '1'
                        };
                        return vtexjs.checkout.addToCart([newitem]);
                    }
                })
                .done(function (orderForm) {
                    // console.log(orderForm);
                    vtexjs.checkout.getOrderForm().then(function (orderForm) {
                        window._orderForm = orderForm;
                        var qty = 0;
                        $(orderForm.items).each(function (ndx, item) {
                            if (!item.isGift) {
                                qty += item.quantity;
                            }
                        });
                        if (isFinite(qty)) {
                            $('.__cart-link a span').text(qty);
                        }
                    }).done(function () {
                        $('html').trigger('open.MiniCart'); // Função em Jquery devido ao evento do Minicart em General.
                    });
                });
        });
    }
}
export default {
    init: Methods.init
}
