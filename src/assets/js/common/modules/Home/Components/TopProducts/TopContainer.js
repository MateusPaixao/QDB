// import General from "../../../General/general-index"
import Vitrine from "../../../General/Vitrine/VitrineContainer.jsx"

const Methods = {
    init(){
        Methods.buildVitrines();
    },
    buildVitrines(){ 
        let idCollection = Math.floor(Math.random() * 5000), 
        Collection = [],
        Placeholder = document.querySelector(".topProducts .collectionPlaceholder"),
        Content = Placeholder.querySelectorAll(".topProducts .collectionPlaceholder .vitrine-content");

        for(let i = 0; i < Content.length; i++){
            let Item = {};
            Item.Product = Content[i].dataset.productid;
            Item.SkuHighlight = Content[i].dataset.sku;
            Collection.push(Item);
        }

        Placeholder.innerHTML = "";
        let Col = "collection" + idCollection
        console.log("collection" + idCollection)
        Placeholder.nextSibling.setAttribute("id", Col);
        
        Vitrine.build(idCollection, Collection, true, "4.2");
        // document.querySelector(".topProducts .--collectionPlaceholder").innerHTML = Collection;
        // console.log(Collection);
    }
}

export default {
    init: Methods.init
}