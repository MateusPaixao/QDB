import General from "../../../General/general-index"

const Methods = {
    init(){
        Methods.getInfoVitrines();
        Methods.buildVitrines();
    },
    
    getInfoVitrines: () => {
        for(let i = 0; i < document.querySelectorAll(".bannerVitrine").length; i++){
            document.querySelectorAll(".bannerCollection__info__title")[i].textContent = document.querySelectorAll(".bannerVitrine")[i].textContent.match(/(?<=banTitleInit\s+).([^\s]+).*?(?=\s+banTitleEnd)/)[0];
            document.querySelectorAll(".bannerCollection__info__banner_url")[i].href = document.querySelectorAll(".bannerVitrine")[i].textContent.match(/href\s*=\s*"(.+?)"/)[1];
            document.querySelectorAll(".bannerCollection__info__banner_img")[i].dataset.src = document.querySelectorAll(".bannerVitrine")[i].textContent.match(/src\s*=\s*"(.+?)"/)[1];
        }
    },

    buildVitrines(){
        let Placeholders = document.querySelectorAll(".bannerCollection .--collectionPlaceholder");

        Placeholders.forEach((Placeholder) => {
            let idCollection = Math.floor(Math.random() * 5000), 
            Collection = [], 
            Item = {};
            
            Placeholder.querySelectorAll(".vitrine-content").forEach((content)=>{
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
            General.vitrine(idCollection, Collection, true, "2.2");
        });
    }
}

export default {
    init: Methods.init
}