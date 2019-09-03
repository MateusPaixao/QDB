var jsonMap = {
    "claro": new ClaroStrategy(),
    "claro-medio": new ClaroMedioStrategy()
}

const mainGroup = document.querySelectorAll('[data-main-option]');
mainGroup.forEach(element => {
    element.addEventListener('click', function() {
        var option = jsonMap[`${this.getAttribute('data-main-option')}`];
        createFirstLevelStructure(option);
    }) 
});

function createFirstLevelStructure(option) {
    var obj = option.getResult();
    var oldStructure = document.querySelector('[data-main-group]');
    var currentStructure = document.querySelector(`[data-tone-group=${obj.id}]`);
    var innerElements = currentStructure.querySelectorAll('[data-tone-option]');

    var offset = obj.offset;
    innerElements.forEach(element => {
        element.addEventListener('click', function() {
            
        })

        var tone = obj.tones[`tone${offset}`];
        element.innerHTML = `${tone.name}`;
        offset++;
    });

    oldStructure.classList.add('hide');
    currentStructure.classList.remove('hide');
}