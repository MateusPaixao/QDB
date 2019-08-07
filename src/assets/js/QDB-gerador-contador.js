const searchSku = document.querySelector('.w-gerador--fetch');
const Methods = {
    init() {
        Methods.copyOutput();
        searchSku.addEventListener('click', Methods.getProductInfos);
    },
    copyOutput() {
        const btn = document.querySelector('.w-gerador--copy');
        btn.addEventListener('click', function () {
            const output = document.querySelector('.w-gerador--output')
            output.select();
            document.execCommand("copy")
            btn.value = "Copiado!";

            setTimeout(() => {
                btn.value = "Copiar";
            }, 2000);
        })
    },
    generateAttributes(imgSku,nomeSku,precoSkuDe,precoSkuPor) {
        const Attributes = {
            titulo: document.querySelector('.w-gerador--text.title').value,
            texto: document.querySelector('.w-gerador--text.text').value,
            dataInicial: document.querySelector('.w-gerador--text.time-inicial').value,
            dataFinal: document.querySelector('.w-gerador--text.time-final').value
        }
        const outputText = document.querySelector('.w-gerador--output');
        const attributesReturn = `<span data-inicio="${Attributes.dataInicial}" data-fim="${Attributes.dataFinal}">`
        const htmlGenerate = `<div class="w-product--container">
        ${attributesReturn}
        <article class="w-product--counter">
            <p class="w-product--title">${Attributes.titulo}</p>
            <p class="w-product--text">${Attributes.texto}</p>
            <div class="w-product--contador">
                <span class="w-product--contador--hours">0</span>
                <span class="w-product--contador--minutes">0</span>
                <span class="w-product--counter--seconds">0</span>
            </div>
        </article>
        <article class="w-product--infos">
            <div class="w-product--wrapper">
                <img src="${imgSku}" class="w-product--wrapper--img">
                <p class="w-product--wrapper--title">${nomeSku}</p>
                <p class="w-product--old-price">${precoSkuDe}</p>
                <p class="w-product--wrapper--new-price">${precoSkuPor}</p>
                <p class="w-product--wrapper--parcelamento"></p>
                <button class="w-product--wrapper--buy-button">Comprar</button>
            </div>
        </article>
    </div>`
            outputText.textContent = `${htmlGenerate}`
    },
    getProductInfos() {
        const idProduto = document.querySelector('.w-gerador--text.idproduto').value;
        const url = 'http://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:' + idProduto;
        fetch(url)
            .then(res => res.json())
            .then((product) => {
                const skuList = product[0].items;
                const selectionSku = document.querySelector('.w-gerador--text.idsku');
                document.querySelectorAll('.w-gerador--label')[1].classList.remove('hidden');
                for (const i in skuList) {
                    if (skuList.hasOwnProperty(i)) {
                        const sku = skuList[i];
                        let option = document.createElement('option');
                        option.value = sku.itemId;
                        option.textContent = sku.itemId;
                        selectionSku.append(option);
                        document.querySelector('.w-gerador--generate').addEventListener('click', () => {
                            if (sku.itemId == selectionSku.value) {
                                const qtdSku = sku.sellers[0].commertialOffer.AvailableQuantity;
                                const imgSku = sku.images[0].imageUrl;
                                const nomeSku = sku.name;
                                const precoSkuDe = sku.sellers[0].commertialOffer.PriceWithoutDiscount;
                                const precoSkuPor = sku.sellers[0].commertialOffer.Price;
                                
                                Methods.generateAttributes(imgSku,nomeSku,precoSkuDe,precoSkuPor)
                            }
                        })
                    }
                }
            })
    }
}
Methods.init();
