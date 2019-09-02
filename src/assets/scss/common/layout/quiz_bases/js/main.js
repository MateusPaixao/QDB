var jsonMap = {
    "claro": new ClaroStrategy(),
    "claro-medio": new ClaroMedioStrategy()
}

const mainGroup = document.querySelectorAll('[data-main-option]');
mainGroup.forEach(element => {
    element.onclick = function() {
        var option = jsonMap[`${this.getAttribute('data-main-option')}`];
        createFirstLevelStructure(option);
    };
});

function createFirstLevelStructure(option) {
    var oldStructure = document.querySelector('[data-main-group]');
    var currentStructure = document.querySelector('');
    var obj = option.getResult();

    oldStructure.classList.add("hide");
}