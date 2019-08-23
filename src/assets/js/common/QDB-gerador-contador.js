const searchSku = document.querySelector('.w-gerador--fetch');
const btnGerador = document.querySelector('.w-gerador--generate');
const Methods = {
    init() {
        Methods.copyOutput();
        searchSku.addEventListener('click', () => {
            document.querySelector('.w-gerador--load').classList.remove('hidden')
            Methods.getProductInfos();
        });
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
            tituloSad: document.querySelector('.w-gerador--text.title-sad').value,
            textoSad: document.querySelector('.w-gerador--text.text-sad').value,
            dataInicial: document.querySelector('.w-gerador--text.time-inicial').value,
            dataFinal: document.querySelector('.w-gerador--text.time-final').value
        }
        Attributes.dataFinal = Attributes.dataFinal.split('T');
        let diaMesAno = Attributes.dataFinal[0].split('-')
        diaMesAno = `${diaMesAno[1]}/${diaMesAno[2]}/${diaMesAno[0]}`
        let dataHora = `${diaMesAno} ${Attributes.dataFinal[1]}:00`

        const outputText = document.querySelector('.w-gerador--output');
        const attributesReturn = `<input type="hidden" class="w-gerador--datas" data-inicio="${Attributes.dataInicial}" data-fim="${dataHora}" data-product="${Attributes.idProduto}" data-sku="${Attributes.idSku}"/>`
        const htmlGenerate = `<div class="w-product--container">
        ${attributesReturn}
        <article class="w-product--counter">
            <div class="w-promo-text">
                <p class="w-product--title">${Attributes.titulo}</p>
                <p class="w-product--text">${Attributes.texto}</p>
            </div>
            <div class="w-promo-text-sad hidden">
                <p class="w-product--title">${Attributes.tituloSad}</p>
                <p class="w-product--text">${Attributes.textoSad}</p>
            </div>
            <div class="w-product--contador">
                <div class="w-product--contador--timer">
                    <span class="w-product--contador--timer--time --hours">0</span>
                    <small class="w-product--contador--timer--small hora">horas</small>
                </div>
                <div class="w-product--contador--timer">
                    <span class="w-product--contador--time --minutes">0</span>
                    <small class="w-product--contador--timer--small min">minutos</small>
                </div>
                <div class="w-product--contador--timer">
                    <span class="w-product--contador--time --segundos">0</span>
                    <small class="w-product--contador--timer--small seg">segundos</small>
                </div>
            </div>
        </article>
        <article class="w-product--infos">
        <div class="w-product--wrapper">
            <div class="w-product--wrapper--relative">
                <span class="w-product--wrapper--flag">-0%</span>
                <a class="w-product--link" href="">
                    <img src="" class="w-product--wrapper--img">
                </a>
            </div>
            <div class="w-product--wrapper--infos">
                <p class="w-product--wrapper--infos--rate"></p>
                <a class="w-product--link" href="">
                    <p class="w-product--wrapper--infos--title"></p>
                </a>
                <p class="w-product--wrapper--infos--old-price"></p>
                <p class="w-product--wrapper--infos--new-price"></p>
                <p class="w-product--wrapper--infos--parcelamento"></p>
                <a class="w-product--wrapper--infos--buy-button" href="">
                    <button>Comprar</button>
                </a>
                </div>
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
                console.log(skuList)
                const selectionSku = document.querySelector('.w-gerador--text.idsku');
                document.querySelector('.w-gerador--load').classList.add("hidden")
                document.querySelectorAll('.w-gerador--label')[1].classList.remove('hidden');
                selectionSku.innerHTML = "";
                for (const i in skuList) {
                    if (skuList.hasOwnProperty(i)) {
                        const sku = skuList[i];
                        let option = document.createElement('option');
                        option.value = sku.itemId;
                        option.style.color = "#fff";
                        option.style.padding = '5px';
                        option.textContent = `[${sku.itemId}] ${sku.name}`;
                        selectionSku.append(option);
                        if(sku.sellers[0].commertialOffer.AvailableQuantity){
                            option.style.backgroundColor = 'green';
                        }
                        else{
                            option.style.backgroundColor = 'red';
                        }
                    }
                }
            })
    },
}

Methods.init();
