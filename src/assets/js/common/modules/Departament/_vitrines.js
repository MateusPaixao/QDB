// import General from "../../../General/general-index"
import Vitrine from "../General/Vitrine/VitrineContainer.jsx"

const Methods = {
    init(){
        Methods.buildVitrines();
    },
    buildVitrines(){
        let Placeholders = document.querySelectorAll(".filters-body .collectionPlaceholder");

        for(let p = 0; p < Placeholders.length; p++){
            let idCollection = Math.floor(Math.random() * 5000), 
            Collection = [],
            Item = {},
            Content = Placeholders[p].querySelectorAll(".vitrine-content");

            for(let i = 0; i < Content.length; i++){
                Item.Product = Content[i].dataset.productid;
                Item.SkuHighlight = Content[i].dataset.sku;
                Collection.push(Item);
                Item = {}
            }

            Placeholders[p].nextSibling.setAttribute("id", "collection" + idCollection);
            Vitrine.build(idCollection, Collection, false);
        };
    }
}

export default {
    init: Methods.init
}