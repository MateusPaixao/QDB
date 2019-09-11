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
        document.querySelectorAll(".bannerCollection .--collectionPlaceholder").forEach((collection)=>{
            let vitrine = collection.nextSibling;
            vitrine.setAttribute("id", "collection-" + collection.textContent);
            vitrine.setAttribute("data-collection", collection.textContent);
            General.vitrine(vitrine.dataset.collection, true, "2.2");
        });
    }
}

export default {
    init: Methods.init
}