const searchSku = document.querySelector('.w-gerador--fetch');
const btnGerador = document.querySelector('.w-gerador--generate');
const Methods = {
    init() {
        Methods.copyOutput();
        searchSku.addEventListener('click', Methods.getProductInfos);
        btnGerador.addEventListener('click', Methods.generateAttributes)
    },
    copyOutput: () => {
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
    generateAttributes: () => {
        const Attributes = {
            idProduto: document.querySelector('.w-gerador--text.idproduto').value,
            idSku: document.querySelector('.w-gerador--text.idsku').value,
            titulo: document.querySelector('.w-gerador--text.title').value,
            texto: document.querySelector('.w-gerador--text.text').value,
            dataInicial: document.querySelector('.w-gerador--text.time-inicial').value,
            dataFinal: document.querySelector('.w-gerador--text.time-final').value
        }
        const outputText = document.querySelector('.w-gerador--output');
        const attributesReturn = `<input type="hidden" class="w-gerador--datas" data-inicio="${Attributes.dataInicial}" data-fim="${Attributes.dataFinal}" data-product="${Attributes.idProduto}" data-sku="${Attributes.idSku}"/>`
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
                <img src="" class="w-product--wrapper--img">
                <p class="w-product--wrapper--title"></p>
                <p class="w-product--old-price"></p>
                <p class="w-product--wrapper--new-price"></p>
                <p class="w-product--wrapper--parcelamento"></p>
                <button class="w-product--wrapper--buy-button">Comprar</button>
            </div>
        </article>
    </div>`
            outputText.textContent = `${htmlGenerate}`
    },
    getProductInfos: () => {
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
                    }
                }
            })
    }
}
Methods.init();
