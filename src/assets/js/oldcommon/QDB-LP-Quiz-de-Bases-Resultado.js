import '../../scss/common/QDB-LP-Quiz-de-Bases-Resultado.scss'

const Methods = {
    init(){
        Methods.setResults();
        Methods.FillTextContents();
        Methods.copyToClip();
    },
    setResults() {
        const urlString = window.location.href;
        const url = new URL(urlString);
        
        const option = url.searchParams.get("option");
        const supermate = url.searchParams.get("supermate");
        const altacobertura = url.searchParams.get("altacobertura");
        const corretivoaqua = url.searchParams.get("corretivoaqua");
        const superfluida = url.searchParams.get("superfluida");
        const aqua = url.searchParams.get("aqua");
        const bbcreme = url.searchParams.get("bbcreme");
        
        var nameDOM = document.querySelector('#color-name');
        nameDOM.innerHTML = option;
        
        var imageDOM = document.querySelector('#quiz-image');
        imageDOM.innerHTML = `<img src='/arquivos/quizresultado${option}.png'/>`;
        
        var supermateDOM = document.querySelector('#quiz-supermate');
        supermateDOM.innerHTML = `${supermate}`;
        
        var altacoberturaDOM = document.querySelector('#quiz-altacobertura');
        altacoberturaDOM.innerHTML = `${altacobertura}`;
        
        var corretivoaquaDOM = document.querySelector('#quiz-corretivoaqua');
        corretivoaquaDOM.innerHTML = `${corretivoaqua}`;
        
        var superfluidaDOM = document.querySelector('#quiz-superfluida');
        superfluidaDOM.innerHTML = `${superfluida}`;
        
        var aquaDOM = document.querySelector('#quiz-aqua');
        aquaDOM.innerHTML = `${aqua}`;
        
        var bbcremeDOM = document.querySelector('#quiz-bbcreme');
        bbcremeDOM.innerHTML = `${bbcreme}`;
    },
    
    
    FillTextContents() {
        const guarde = document.querySelector('.guarde-text');
        guarde.innerText = `Esse foi meu resultado de tom de base no quiz da Quem disse, Berenice? ${window.location.href}`; 
    
        const indique = document.querySelector('.indique-text');
        indique.innerText = `Faça o teste para saber seu tom de base na Quem disse, Berenice? https://www.quemdisseberenice.com.br/como-descobrir-o-seu-tom-de-base/`; 
    },
    copyToClip() {
        const guardeBtn = document.querySelector('.guarde');
        guardeBtn.addEventListener('click', function () {
            const copyGuarde = document.querySelector('.guarde-text')
            copyGuarde.select();
            document.execCommand("copy")
            guardeBtn.textContent = "Copiado!";
            setTimeout(() => {
                guardeBtn.textContent = "Guarde seu resultado";
            }, 2000);
        })
    
        const indiqueBtn = document.querySelector('.indique');
        indiqueBtn.addEventListener('click', function () {
            const copyText = document.querySelector('.indique-text')
            copyText.select();
            document.execCommand("copy")
            indiqueBtn.textContent = "Copiado!";
            setTimeout(() => {
                indiqueBtn.textContent = "Indique este teste";
            }, 2000);
        })
    }
}


document.addEventListener('DOMContentLoaded', Methods.init);