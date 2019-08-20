Methods = {
    init() {
        Methods.checkboxChange();
        Methods.copyToClip();
        Methods.geraBanner();
    },
    geraBanner: () => {
        const generate = document.querySelector('.generate');
        const submitBtn = document.querySelector('.submit');
        const contadorCheck = document.querySelector('.contador');
        const cupom = document.querySelector('.cupom');
        
        submitBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            let urlHref = document.querySelector('.url').value;
            let texto = document.querySelector('.texto').value;
            let cor = document.querySelector('.cor').value;
            let cupomText = document.querySelector('.cupomText').value;

            let dataFinal = document.querySelector('.dataFim').value;
            dataFinal = dataFinal.split('T')
            let diaMesAno = dataFinal[0].split('-')
            diaMesAno = `${diaMesAno[1]}/${diaMesAno[2]}/${diaMesAno[0]}`
            let dataHora = `${diaMesAno} ${dataFinal[1]}:00`



            let finalUrl = ` <a  class="w-counter--redirect" href="${urlHref}">
            <div class='w-counter topbanner' style="background-color: ${cor}">
                <span class='w-counter--bg hidden' data-color="${cor}">${cor}</span>
                    <p class="w-counter--text texto">${texto}</p> 
                </div>
            </a>`

            if (contadorCheck.checked && cupom.checked) {
                let finalUrlContador =
                    `<a class="w-counter--redirect" href="${urlHref}">
    <div class='w-counter topbanner' style="background-color: ${cor}">
        <span class='w-counter--bg hidden' data-color="${cor}">${cor}</span>
        <span class='w-counter--end hidden' data-final="${dataHora}" >${dataHora}</span>
        
        <div class="w-counter--slick">
            <p class="w-counter--text texto">${texto}</p>
            <div class="w-counter--container topbanner">    
                <input value="${cupomText}" class="w-counter--cupom" />
                <span class="w-counter-copy"> Copiar </span>
                <div class="w-counter--container hide-important">
                    <b class='w-counter--container--counter hidden'><span class='w-counter--day'>0</span><span class="w-counter--info"> dias </span></b>
                    <b class='w-counter--container--counter'><span class='w-counter--hour'>0</span><span class="w-counter--info">h</span></b>
                    <b class='w-counter--container--counter'><span class='w-counter--minutes'>0</span><span class="w-counter--info">m</span></b> 
                    <b class='w-counter--container--counter'><span class='w-counter--seconds'>0</span><span class="w-counter--info">s</span></b>
                </div>
            </div>
        </div>
    </div>
    </a>`
                finalUrl = finalUrlContador;
            } else if (contadorCheck.checked && !cupom.checked) {
                let finalUrlContador =
                    `<a class="w-counter--redirect" href="${urlHref}">
    <div class='w-counter topbanner' style="background-color: ${cor}">
        <span class='w-counter--bg hidden' data-color="${cor}">${cor}</span>
        <span class='w-counter--end hidden' data-final="${dataHora}" >${dataHora}</span>
        <div class="w-counter--slick">
            <p class="w-counter--text texto">${texto}</p>
            <div class="w-counter--container hide-important">
               <b class='w-counter--container--counter hidden'><span class='w-counter--day'>0</span><span class="w-counter--info"> dias</span></b>
                <b class='w-counter--container--counter'><span class='w-counter--hour'>0</span><span class="w-counter--info">h</span></b>
                <b class='w-counter--container--counter'><span class='w-counter--minutes'>0</span><span class="w-counter--info">m</span></b> 
                <b class='w-counter--container--counter'><span class='w-counter--seconds'>0</span><span class="w-counter--info">s</span></b>
            </div>
        </div>
    </div>
    </a>`
                finalUrl = finalUrlContador;
            } else if (!contadorCheck.checked && cupom.checked) {
                let finalUrlContador =
                    `<a class="w-counter--redirect" href="${urlHref}">
    <div class='w-counter topbanner' style="background-color: ${cor}">
        <span class='w-counter--bg hidden' data-color="${cor}">${cor}</span>
        <div class="w-counter--slick">
            <p class="w-counter--text texto">${texto}</p>
            <input value="${cupomText}" class="w-counter--cupom" />
            <span class="w-counter-copy"> Copiar </span>
        </div>
    </div>
    </a>`
                finalUrl = finalUrlContador;
            }

            generate.textContent = finalUrl;

        })
    },
    checkboxChange: () => {
        const contadorCheck = document.querySelector('.contador');
        const contadorContainer = document.querySelector('.container-contador')
        const cupomCheck = document.querySelector('.cupom');
        const cupomContainer = document.querySelector('.container-cupom')
        contadorCheck.addEventListener('change', function () {
            if (contadorCheck.checked) {
                contadorContainer.classList.remove('hidden');
            } else {
                contadorContainer.classList.add('hidden');
            }
        })
        cupomCheck.addEventListener('change', function () {
            if (cupomCheck.checked) {
                cupomContainer.classList.remove('hidden');
            } else {
                cupomContainer.classList.add('hidden');
            }
        })

    },
    getImage: () => {
        
    },
    copyToClip: () => {
        const btn = document.querySelector('.copy');
        btn.addEventListener('click', function () {
            const copyText = document.querySelector('.generate')
            copyText.select();
            document.execCommand("copy")
            btn.value = "Copiado!";
            setTimeout(() => {
                btn.value = "Copiar";
            }, 2000);
        })
    }

}
document.addEventListener("DOMContentLoaded", Methods.init);