class ClaroStrategy {
    
    getResult() {
        var obj = {
            "id": "claro",
            "name" : "Claro", //Como aparece no site
            "imageURL" : "/arquivos/quiz-claro.png",
            "subtones" : { //objetos do segundo nível
                    "quente" : {
                        "name" : "Quente",
                        "imageURL" : "/arquivos/01Q.png",
                        "colors" : [
                            {
                                "name" : "00N",
                                "imageURL" : "/arquivos/00N.png",                                
                                "url" : "/claro-quente-00N",
                                "products" : 
                                    {
                                        "super-mate" : "00N",
                                        "alta-cobertura" : "00N",
                                        "corretivo-aqua" : "1",
                                        "super-fuida" : "01F",
                                        "aqua" : "01F",
                                        "bb-creme" : "01F"
                                    }
                            },
                            {
                                "name" : "01Q",
                                "imageURL" : "/arquivos/01Q.png",                                
                                "url" : "/claro-quente-01Q",
                                "products" : 
                                    {
                                        "super-mate" : "00Q",
                                        "alta-cobertura" : "00Q",
                                        "corretivo-aqua" : "2",
                                        "super-fuida" : "02Q",
                                        "aqua" : "01Q",
                                        "bb-creme" : "01F"
                                    }
                            }
                        ]
                    },
                    "neutro" : {
                        "name" : "Neutro",
                        "imageURL" : "/arquivos/00N.png",
                        "colors" : [
                             {
                                "name" : "00N",
                                "imageURL" : "/arquivos/00N.png",
                                "url" : "/claro-neutro-00N",
                                "products" : 
                                    {
                                        "super-mate" : "00N",
                                        "alta-cobertura" : "00N",
                                        "corretivo-aqua" : "1",
                                        "super-fuida" : "01F",
                                        "aqua" : "01F",
                                        "bb-creme" : "01F"
                                    }
                            },
                            {
                                "name" : "01N",
                                "imageURL" : "/arquivos/01N.png",
                                "url" : "/claro-neutro-01N",
                                "products" : 
                                    {
                                        "super-mate" : "01N",
                                        "alta-cobertura" : "01N",
                                        "corretivo-aqua" : "2",
                                        "super-fuida" : "01F",
                                        "aqua" : "01N",
                                        "bb-creme" : "01F"
                                    }
                            }
                        ]
                    }, 
                    "frio" : {
                        "name" : "Frio",
                        "imageURL" : "/arquivos/01F.png",
                        "colors" : [
                            {
                                "name" : "01F",
                                "imageURL" : "/arquivos/01F.png",
                                "url" : "/claro-frio-01F",
                                "products" : 
                                    {
                                        "super-mate" : "01F",
                                        "alta-cobertura" : "01F",
                                        "corretivo-aqua" : "1",
                                        "super-fuida" : "01F",
                                        "aqua" : "01F",
                                        "bb-creme" : "01F"
                                    }
                            },
                            {
                                "name" : "00N",
                                "imageURL" : "/arquivos/00N.png",
                                "url" : "/claro-frio-00N",
                                "products" : 
                                    {
                                        "super-mate" : "01N",
                                        "alta-cobertura" : "01N",
                                        "corretivo-aqua" : "1",
                                        "super-fuida" : "01F",
                                        "aqua" : "01F",
                                        "bb-creme" : "01F"
                                    }
                            }
                        ]
                    }, 
            }
        };
        return obj;
    }
}

//modal
var modal = document.getElementById("modal-quiz");
var btn = document.getElementById("modal-quiz-btn");

var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
modal.style.display = "block";
}
span.onclick = function() {
modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//slide
var slideIndex = 1;
showSlides(slideIndex);

// controla botão "anterior"
function plusSlides(n) {
    showSlides(slideIndex += n);
}

//controla passagem de steps
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide-quiz");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

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