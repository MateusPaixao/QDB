// import modal from './QDB-LP-Quiz-de-Bases/modal';
// import slide from './QDB-LP-Quiz-de-Bases/slide';

// import Claro from './QDB-LP-Quiz-de-Bases/strategies/ClaroStrategy';
// import ClaroMedio from './QDB-LP-Quiz-de-Bases/strategies/ClaroMedioStrategy';
// //modal
// modal();
// //slide
// slide();

//mapa de classes
var jsonMap = {
    "claro": new ClaroStrategy()
}

//variável para controle de steps
var stepsControl = document.querySelector("[steps-control]");

//recupera todos os elementos do nível principal quiz
var mainGroup = document.querySelectorAll('[data-main-option]');
createFirstLevelStructure(mainGroup);

//função que cria instância da classe mapeada de acordo com a opção principal escolhida
function createFirstLevelStructure(mainGroup) {
    stepsControl.setAttribute("steps-control", "1");
    mainGroup.forEach(element => {
        element.addEventListener('click', function() {
            //variável guarda instância da opção escolhida
            var option = jsonMap[`${this.getAttribute('data-main-option')}`];
            //pede criação do segundo nível passando a opção
            createSecondLevelStructure(option);
        }) 
    });
}

//função que cria a segunda estrutura (subtons)
function createSecondLevelStructure(option) {
    stepsControl.setAttribute("steps-control", "2");
    var obj = option.getResult();
    //obtem estrutura a ser preenchida
    var currentStructure = document.querySelector(`[data-subtone-group=${obj.id}]`);
    var innerElements = currentStructure.querySelectorAll('[data-subtone-option]');

    clearSecondStep();
    //percorre subtons
    innerElements.forEach(element => {
        var subtoneName = element.getAttribute(['data-subtone-option']);
        //obtem objeto do subtom
        var subtone = obj.subtones[`${subtoneName}`];
        //adiciona conteúdo html respectivo da opção
        element.innerHTML = `<h3>${subtone.name}</h3>`;
        element.classList.remove('hide');
        element.addEventListener('click', function() {
            //pede criação do terceiro nível passando obj subtom escolhido
            createThirdLevelStructure(subtone);
        })
    });
    currentStructure.classList.remove('hide');
    currentSlide(3);
}

//função que cria a segunda estrutura (resultado de cores)
function createThirdLevelStructure(subtone) {
    stepsControl.setAttribute("steps-control", "3");
    var currentStructure = document.querySelector('#result');
    currentStructure.innerHTML = "";
    //percorre cores sugeridas para o subtom
    subtone.colors.forEach(element => {
        currentStructure.innerHTML += `
                                <a class="item" href="${element.url}">
                                <h3>URL: ${element.url}</h3>
                                <p>Nome: ${element.name}</p>
                                <img src="${element.imageURL}" />
                                `
    });
    currentStructure.classList.remove('hide');
    currentSlide(4);
}

//reinicializa segundo step;
function clearSecondStep(){
    var subtoneGroup = document.querySelectorAll('[data-subtone-group]');
    var innerElements = document.querySelectorAll('[data-subtone-option]');

    subtoneGroup.forEach(element => {
        element.classList.add('hide');
    });
    innerElements.forEach(element => {
        element.innerHTML = '';
        element.classList.add('hide');
    });
}