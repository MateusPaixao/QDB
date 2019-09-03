//mapa de classes
var jsonMap = {
    "claro": new ClaroStrategy(),
    "claro-medio": new ClaroMedioStrategy()
}

//recupera todos os elementos do nível principal quiz
var mainGroup = document.querySelectorAll('[data-main-option]');
createFirstLevelStructure(mainGroup);

//função que cria instância da classe de acordo com a opção principal escolhida
function createFirstLevelStructure(mainGroup) {
    mainGroup.forEach(element => {
        element.addEventListener('click', function() {
            //variável guarda instância da opção escolhida
            var option = jsonMap[`${this.getAttribute('data-main-option')}`];
            createSecondLevelStructure(option);
        }) 
    });
}

//função que cria a segunda estrutura (subtons)
function createSecondLevelStructure(option) {
    var obj = option.getResult();
    var oldStructure = document.querySelector('[data-main-group]');
    var currentStructure = document.querySelector(`[data-subtone-group=${obj.id}]`);
    var innerElements = currentStructure.querySelectorAll('[data-subtone-option]');
    
    innerElements.forEach(element => {
        var subtoneName = element.getAttribute(['data-subtone-option']);
        var subtone = obj.subtones[`${subtoneName}`];
        //adiciona conteúdo html respectivo da opção
        element.innerHTML = `<h3>${subtone.name}</h3>
                             <p>${subtone.text}</p>`;
        element.addEventListener('click', function() {
            createThirdLevelStructure(subtone);
        })
    });

    //oldStructure.classList.add('hide');
    currentStructure.classList.remove('hide');
}

//função que cria a segunda estrutura (resultado de cores)
function createThirdLevelStructure(subtone) {
    var currentStructure = document.querySelector('#result');
    currentStructure.innerHTML = "";
    subtone.colors.forEach(element => {
        currentStructure.innerHTML += `
                                <a class="item" href="${element.url}">
                                <h3>URL: ${element.url}</h3>
                                <p>Nome: ${element.name}</p>
                                <p>${element.text}</p>
                                <img src="${element.imageURL}" />
                                
                                `
    });
    currentStructure.classList.remove('hide');
}