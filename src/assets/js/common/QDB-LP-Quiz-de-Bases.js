class ClaroStrategy {
    getResult() {
        var obj = {
            "id": "claro",
            "name" : "Claro", 
            "imageURL" : "/arquivos/quiz-claro.png",
            "subtones" : { 
                    "quente" : {
                        "name" : "Quente",
                        "imageURL" : "/arquivos/01Q.png",
                        "colors" : [
                            {
                                "name" : "01Q",
                                "imageURL" : "/arquivos/01Q.png",                                
                                "url" : "/claro-quente-01Q",
                                "products" : 
                                    {
                                        "super-mate" : "01Q",
                                        "alta-cobertura" : "01Q",
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
                            }
                        ]
                    }, 
            }
        };
        return obj;
    }
}
class ClaroMedioStrategy {
    getResult() {
        var obj = {
            "id": "claro-medio",
            "name" : "Claro M�dio",
            "imageURL" : "/arquivos/quiz-claro-medio.png",
            "subtones" : { 
                    "quente" : {
                        "name" : "Quente",
                        "imageURL" : "/arquivos/03Q.png",
                        "colors" : [
                            {
                                "name" : "02Q",
                                "imageURL" : "/arquivos/02Q.png",                                
                                "url" : "/claro-medio-quente-02Q",
                                "products" : 
                                    {
                                        "super-mate" : "02Q",
                                        "alta-cobertura" : "02Q",
                                        "corretivo-aqua" : "2",
                                        "super-fuida" : "02Q",
                                        "aqua" : "02Q",
                                        "bb-creme" : "02Q"
                                    }
                            },
                            {
                                "name" : "03Q",
                                "imageURL" : "/arquivos/03Q.png",                                
                                "url" : "/claro-medio-quente-03Q",
                                "products" : 
                                    {
                                        "super-mate" : "03Q",
                                        "alta-cobertura" : "03Q",
                                        "corretivo-aqua" : "2",
                                        "super-fuida" : "03Q",
                                        "aqua" : "03Q",
                                        "bb-creme" : "02Q"
                                    }
                            }
                        ]
                    },
                    "frio" : {
                        "name" : "Frio",
                        "imageURL" : "/arquivos/03F.png",
                        "colors" : [
                            {
                                "name" : "02F",
                                "imageURL" : "/arquivos/02F.png",                                
                                "url" : "claro-medio-frio-02F",
                                "products" : 
                                    {
                                        "super-mate" : "02F",
                                        "alta-cobertura" : "02F",
                                        "corretivo-aqua" : "2",
                                        "super-fuida" : "02Q",
                                        "aqua" : "02Q",
                                        "bb-creme" : "02Q"
                                    }
                            },
                            {
                                "name" : "03F",
                                "imageURL" : "/arquivos/03F.png",                                
                                "url" : "/claro-medio-frio-03F",
                                "products" : 
                                    {
                                        "super-mate" : "03F",
                                        "alta-cobertura" : "03F",
                                        "corretivo-aqua" : "2",
                                        "super-fuida" : "03F",
                                        "aqua" : "03F",
                                        "bb-creme" : "02Q"
                                    }
                            }
                        ]
                    }
            }
        };
        return obj;
    }
}
class MedioStrategy {
    getResult() {
        var obj = {
            "id": "medio",
            "name" : "Médio",
            "imageURL" : "/arquivos/quiz-medio.png",
            "subtones" : { 
                    "quente" : {
                        "name" : "Quente",
                        "imageURL" : "/arquivos/06Q.png",
                        "colors" : [
                            {
                                "name" : "04Q",
                                "imageURL" : "/arquivos/04Q.png",                                
                                "url" : "/medio-quente-04Q",
                                "products" : 
                                    {
                                        "super-mate" : "04Q",
                                        "alta-cobertura" : "04Q",
                                        "corretivo-aqua" : "5",
                                        "super-fuida" : "04Q",
                                        "aqua" : "04Q",
                                        "bb-creme" : "03Q"
                                    }
                            },
                            {
                                "name" : "05Q",
                                "imageURL" : "/arquivos/05Q.png",                                
                                "url" : "/medio-quente-05Q",
                                "products" : 
                                    {
                                        "super-mate" : "05Q",
                                        "alta-cobertura" : "05Q",
                                        "corretivo-aqua" : "4",
                                        "super-fuida" : "04Q",
                                        "aqua" : "04N",
                                        "bb-creme" : "03Q"
                                    }
                            },
                            {
                                "name" : "06Q",
                                "imageURL" : "/arquivos/06Q.png",                                
                                "url" : "/medio-quente-06Q",
                                "products" : 
                                    {
                                        "super-mate" : "06Q",
                                        "alta-cobertura" : "06Q",
                                        "corretivo-aqua" : "7",
                                        "super-fuida" : "07N",
                                        "aqua" : "06Q",
                                        "bb-creme" : "10N"
                                    }
                            },
                            {
                                "name" : "07Q",
                                "imageURL" : "/arquivos/07Q.png",                                
                                "url" : "/medio-quente-07Q",
                                "products" : 
                                    {
                                        "super-mate" : "07Q",
                                        "alta-cobertura" : "07Q",
                                        "corretivo-aqua" : "9",
                                        "super-fuida" : "09Q",
                                        "aqua" : "07Q",
                                        "bb-creme" : "09Q"
                                    }
                            }
                        ]
                    },
                    "neutro" : {
                        "name" : "Neutro",
                        "imageURL" : "/arquivos/04N.png",
                        "colors" : [
                            {
                                "name" : "04N",
                                "imageURL" : "/arquivos/04N.png",                                
                                "url" : "/medio-neutro-04N",
                                "products" : 
                                    {
                                        "super-mate" : "04N",
                                        "alta-cobertura" : "04N",
                                        "corretivo-aqua" : "5",
                                        "super-fuida" : "04Q",
                                        "aqua" : "04N",
                                        "bb-creme" : "09Q"
                                    }
                            },
                            {
                                "name" : "06N",
                                "imageURL" : "/arquivos/06N.png",                                
                                "url" : "/medio-neutro-06N",
                                "products" : 
                                    {
                                        "super-mate" : "06N",
                                        "alta-cobertura" : "06N",
                                        "corretivo-aqua" : "7",
                                        "super-fuida" : "07N",
                                        "aqua" : "06N",
                                        "bb-creme" : "09Q"
                                    }
                            },
                            {
                                "name" : "07N",
                                "imageURL" : "/arquivos/07N.png",                                
                                "url" : "/medio-neutro-07N",
                                "products" : 
                                    {
                                        "super-mate" : "07N",
                                        "alta-cobertura" : "07N",
                                        "corretivo-aqua" : "8",
                                        "super-fuida" : "07N",
                                        "aqua" : "07N",
                                        "bb-creme" : "09Q"
                                    }
                            }
                        ]
                    }, 
                    "frio" : {
                        "name" : "Frio",
                        "imageURL" : "/arquivos/04F.png",
                        "colors" : [
                            {
                                "name" : "04F",
                                "imageURL" : "/arquivos/04F.png",                                
                                "url" : "/medio-frio-04F",
                                "products" : 
                                    {
                                        "super-mate" : "04F",
                                        "alta-cobertura" : "04F",
                                        "corretivo-aqua" : "5",
                                        "super-fuida" : "04Q",
                                        "aqua" : "04F",
                                        "bb-creme" : "03Q"
                                    }
                            }
                        ]
                    }, 
            }
        };
        return obj;
    }
}
class MedioEscuroStrategy {
    getResult() {
        var obj = {
            "id": "medio-escuro",
            "name" : "Médio Escuro",
            "imageURL" : "/arquivos/quiz-medio-escuro.png",
            "subtones" : { 
                    "quente" : {
                        "name" : "Quente",
                        "imageURL" : "/arquivos/09Q.png",
                        "colors" : [
                            {
                                "name" : "09Q",
                                "imageURL" : "/arquivos/09Q.png",                                
                                "url" : "/medio-escuro-quente-09Q",
                                "products" : 
                                    {
                                        "super-mate" : "09Q",
                                        "alta-cobertura" : "09Q",
                                        "corretivo-aqua" : "9",
                                        "super-fuida" : "09Q",
                                        "aqua" : "09Q",
                                        "bb-creme" : "09Q"
                                    }
                            },
                            {
                                "name" : "10Q",
                                "imageURL" : "/arquivos/10.png",                                
                                "url" : "/medio-escuro-quente-10Q",
                                "products" : 
                                    {
                                        "super-mate" : "1OQ",
                                        "alta-cobertura" : "10Q",
                                        "corretivo-aqua" : "9",
                                        "super-fuida" : "10N",
                                        "aqua" : "10Q",
                                        "bb-creme" : "09Q"
                                    }
                            },
                            {
                                "name" : "12Q",
                                "imageURL" : "/arquivos/12Q.png",                                
                                "url" : "/medio-escuro-quente-12Q",
                                "products" : 
                                    {
                                        "super-mate" : "12Q",
                                        "alta-cobertura" : "12Q",
                                        "corretivo-aqua" : "11",
                                        "super-fuida" : "12Q",
                                        "aqua" : "12Q",
                                        "bb-creme" : "13Q"
                                    }
                            }
                        ]
                    },
                    "neutro" : {
                        "name" : "Neutro",
                        "imageURL" : "/arquivos/10N.png",
                        "colors" : [
                            {
                                "name" : "08N",
                                "imageURL" : "/arquivos/08N.png",                                
                                "url" : "/medio-escuro-neutro-08N",
                                "products" : 
                                    {
                                        "super-mate" : "08N",
                                        "alta-cobertura" : "08N",
                                        "corretivo-aqua" : "6",
                                        "super-fuida" : "07N",
                                        "aqua" : "08N",
                                        "bb-creme" : "09Q"
                                    }
                            },
                            {
                                "name" : "10N",
                                "imageURL" : "/arquivos/10N.png",                                
                                "url" : "/medio-escuro-neutro-10N",
                                "products" : 
                                    {
                                        "super-mate" : "10N",
                                        "alta-cobertura" : "10N",
                                        "corretivo-aqua" : "9",
                                        "super-fuida" : "10N",
                                        "aqua" : "10Q",
                                        "bb-creme" : "10N"
                                    }
                            },
                            {
                                "name" : "11N",
                                "imageURL" : "/arquivos/11N.png",                                
                                "url" : "/medio-escuro-neutro-11N",
                                "products" : 
                                    {
                                        "super-mate" : "11N",
                                        "alta-cobertura" : "11N",
                                        "corretivo-aqua" : "9",
                                        "super-fuida" : "09Q",
                                        "aqua" : "10Q",
                                        "bb-creme" : "09Q"
                                    }
                            }
                        ]
                    }
            }
        };
        return obj;
    }
}
class EscuroStrategy {
    getResult() {
        var obj = {
            "id": "escuro",
            "name" : "Escuro",
            "imageURL" : "/arquivos/quiz-escuro.png",
            "subtones" : { 
                    "quente" : {
                        "name" : "Quente",
                        "imageURL" : "/arquivos/15Q.png",
                        "colors" : [
                            {
                                "name" : "13Q",
                                "imageURL" : "/arquivos/13Q.png",                                
                                "url" : "escuro-quente-13Q",
                                "products" : 
                                    {
                                        "super-mate" : "13Q",
                                        "alta-cobertura" : "13Q",
                                        "corretivo-aqua" : "11",
                                        "super-fuida" : "15Q",
                                        "aqua" : "13Q",
                                        "bb-creme" : "13Q"
                                    }
                            },
                            {
                                "name" : "14Q",
                                "imageURL" : "/arquivos/14Q.png",                                
                                "url" : "/escuro-quente-14Q",
                                "products" : 
                                    {
                                        "super-mate" : "14Q",
                                        "alta-cobertura" : "14Q",
                                        "corretivo-aqua" : "11",
                                        "super-fuida" : "15Q",
                                        "aqua" : "14Q",
                                        "bb-creme" : "13Q"
                                    }
                            },
                            {
                                "name" : "15Q",
                                "imageURL" : "/arquivos/15Q.png",                                
                                "url" : "/escuro-quente-15Q",
                                "products" : 
                                    {
                                        "super-mate" : "15Q",
                                        "alta-cobertura" : "15Q",
                                        "corretivo-aqua" : "12",
                                        "super-fuida" : "15Q",
                                        "aqua" : "15Q",
                                        "bb-creme" : "15Q"
                                    }
                            },
                            {
                                "name" : "16Q",
                                "imageURL" : "/arquivos/16Q.png",                                
                                "url" : "/escuro-quente-16Q",
                                "products" : 
                                    {
                                        "super-mate" : "16Q",
                                        "alta-cobertura" : "16Q",
                                        "corretivo-aqua" : "12",
                                        "super-fuida" : "15Q",
                                        "aqua" : "15Q",
                                        "bb-creme" : "15Q"
                                    }
                            }
                        ]
                    },
                    "neutro" : {
                        "name" : "Neutro",
                        "imageURL" : "/arquivos/14N.png",
                        "colors" : [
                            {
                                "name" : "14N",
                                "imageURL" : "/arquivos/14N.png",                                
                                "url" : "/escuro-neutro-14N",
                                "products" : 
                                    {
                                        "super-mate" : "14N",
                                        "alta-cobertura" : "14N",
                                        "corretivo-aqua" : "11",
                                        "super-fuida" : "14N",
                                        "aqua" : "14N",
                                        "bb-creme" : "13Q"
                                    }
                            }
                        ]
                    }
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
//variável para controle de steps
var stepsControl = document.querySelector("[steps-control]");

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
    stepsControl.setAttribute("steps-control", slideIndex);
}

var goToSlide2 = document.querySelector('.go-to-slide-2');
goToSlide2.addEventListener('click', function() {
    currentSlide(2);
});

var goToPrevStep = document.querySelector('#prev-step-btn');
goToPrevStep.addEventListener('click', function() {
    plusSlides(-1);
});

//mapa de classes
var jsonMap = {
    "claro": new ClaroStrategy(),
    "claro-medio": new ClaroMedioStrategy(),
    "medio": new MedioStrategy(),
    "medio-escuro": new MedioEscuroStrategy(),
    "escuro": new EscuroStrategy()
}

//recupera todos os elementos do nível principal quiz
var mainGroup = document.querySelectorAll('[data-main-option]');
createSecondLevelStructure(mainGroup);

//função que cria instância da classe mapeada de acordo com a opção principal escolhida
function createSecondLevelStructure(mainGroup) {
    mainGroup.forEach(element => {
        element.addEventListener('click', function() {
            //variável guarda instância da opção escolhida
            var option = jsonMap[`${this.getAttribute('data-main-option')}`];
            var obj = option.getResult();
            //pede criação do terceiro nível passando a opção
            createThirdLevelStructure(obj);
        }) 
    });
}

//função que cria o terceiro step (subtons)
function createThirdLevelStructure(obj) {
    //obtem estrutura a ser preenchida
    var currentStructure = document.querySelector(`[data-subtone-group=${obj.id}]`);
    var innerElements = currentStructure.querySelectorAll('[data-subtone-option]');

    clearThirdStep();
    //percorre subtons
    innerElements.forEach(element => {
        var subtoneName = element.getAttribute(['data-subtone-option']);
        //obtem objeto do subtom
        var subtone = obj.subtones[`${subtoneName}`];
        //adiciona conteúdo html respectivo da opção
        element.innerHTML = `<h3>${subtone.name}</h3>
                            <img src="${subtone.imageURL}" />`;
        element.classList.remove('hide');
        element.addEventListener('click', function() {
            //pede criação do quarto nível passando obj subtom escolhido
            createFourthLevelStructure(subtone);
        })
    });
    currentStructure.classList.remove('hide');
    currentSlide(3);
}

//função que cria o quarto step (resultado de cores)
function createFourthLevelStructure(subtone) {
    var currentStructure = document.querySelector('#result');
    currentStructure.innerHTML = "";
    //percorre cores sugeridas para o subtom
    subtone.colors.forEach(element => {
        currentStructure.innerHTML += `
                                <a class="result-item" href="${element.url}">
                                <h3>URL: ${element.url}</h3>
                                <p>Nome: ${element.name}</p>
                                <img src="${element.imageURL}" />
                                `
    });
    currentStructure.classList.remove('hide');
    currentSlide(4);
}

//reinicializa terceiro step;
function clearThirdStep(){
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