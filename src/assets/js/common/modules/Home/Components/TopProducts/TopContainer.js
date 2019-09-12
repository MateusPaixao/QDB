import General from "../../../General/general-index"

const Methods = {
    init(){
        Methods.buildVitrines();
    },
    buildVitrines(){
        let idCollection = Math.floor(Math.random() * 5000), 
        Collection = [], 
        Item = {}, 
        Placeholder = document.querySelector(".topProducts .--collectionPlaceholder");

        Placeholder.querySelectorAll(".topProducts .--collectionPlaceholder .vitrine-content").forEach((content)=>{
            Item.Product = content.dataset.productid;
            Item.SkuHighlight = content.dataset.sku;
            Collection.push(Item);
            Item = {};
            // let vitrine = collection.nextSibling;
            // vitrine.setAttribute("id", "collection-" + collection.textContent);
            // vitrine.setAttribute("data-collection", product);
            // General.vitrine(vitrine.dataset.collection, true, "4.2");
        });
        Placeholder.innerHTML = "";
        Placeholder.nextSibling.setAttribute("id", "collection-" + idCollection);
        General.vitrine(idCollection, Collection, true, "4.2");
        // document.querySelector(".topProducts .--collectionPlaceholder").innerHTML = Collection;
        // console.log(Collection);
    }
}

export default {
    init: Methods.init
}