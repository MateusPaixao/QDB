// import General from "../../../General/general-index"
import CacheSelector from './cache-selector'
import Vitrine from "../General/Vitrine/VitrineContainer.jsx"

const Methods = {
    init(){
        Methods.buildVitrines();
        Methods.SmartResearch();
    },
    buildVitrines(){
        const Placeholder = CacheSelector.$globals.placeholder;

        let idCollection = Math.floor(Math.random() * 5000), 
        Collection = [],
        Item = {},
        Content = Placeholder.querySelectorAll(".vitrine-content");

        for(let i = 0; i < Content.length; i++){
            Item.Product = Content[i].dataset.productid;
            Item.SkuHighlight = Content[i].dataset.sku;
            Collection.push(Item);
            Item = {}
        }
        console.log(Placeholder.nextSibling);
        Placeholder.nextSibling.setAttribute("id", "collection" + idCollection);
        Vitrine.build(idCollection, Collection, false);
    },
    SmartResearch(){
        const contentProducts = CacheSelector.$globals.contentProducts;
        let btnSR = document.createElement('button');
        btnSR.classList.add("smartResearch","set--smartResearch");
        btnSR.textContent = "ver mais produtos";
        contentProducts.appendChild(btnSR);
    }
}

export default {
    init: Methods.init
}