import General from "../../../General/general-index"

const Methods = {
    init(){
        Methods.buildVitrines();
    },
    buildVitrines(){
        document.querySelectorAll(".topProducts .--collectionPlaceholder").forEach((collection)=>{
            let vitrine = collection.nextSibling;
            vitrine.setAttribute("id", "collection-" + collection.textContent);
            vitrine.setAttribute("data-collection", collection.textContent);
            General.vitrine(vitrine.dataset.collection, true, "4.2");
        });
    }
}

export default {
    init: Methods.init
}