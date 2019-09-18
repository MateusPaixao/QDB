import Vitrine from "../../../General/Vitrine/VitrineContainer.jsx"

const Methods = {
    init(){
        Methods.getInfoVitrines();
        Methods.buildVitrines();
    },
    
    getInfoVitrines: () => {
        for(let i = 0; i < document.querySelectorAll(".bannerVitrine").length; i++){
            let Content =  document.querySelectorAll(".bannerVitrine")[i].textContent;
            // if(General.getBrowserVendor() == 'safari/webkit'){
                let banTitle = Content.substring(
                    Content.lastIndexOf('banTitleInit') + 12, 
                    Content.lastIndexOf('banTitleEnd')
                );
                let banUrl = Content.substring(
                    Content.lastIndexOf('href="') + 6, 
                    Content.lastIndexOf('">')
                );
                let banImg = Content.substring(
                    Content.lastIndexOf('src="') + 5, 
                    Content.lastIndexOf('?v=')
                );
                document.querySelectorAll(".bannerCollection__info__title")[i].textContent = banTitle;
                document.querySelectorAll(".bannerCollection__info__banner_url")[i].href = banUrl;
                document.querySelectorAll(".bannerCollection__info__banner_img")[i].dataset.src = banImg;
            // } else{
            //     document.querySelectorAll(".bannerCollection__info__title")[i].textContent = document.querySelectorAll(".bannerVitrine")[i].textContent.match(/(?<=banTitleInit\s+).([^\s]+).*?(?=\s+banTitleEnd)/)[0];
            //     document.querySelectorAll(".bannerCollection__info__banner_url")[i].href = document.querySelectorAll(".bannerVitrine")[i].textContent.match(/href\s*=\s*"(.+?)"/)[1];
            //     document.querySelectorAll(".bannerCollection__info__banner_img")[i].dataset.src = document.querySelectorAll(".bannerVitrine")[i].textContent.match(/src\s*=\s*"(.+?)"/)[1];       
            // }
        }
    },

    buildVitrines(){
        let Placeholders = document.querySelectorAll(".bannerCollection .collectionPlaceholder");

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
            Vitrine.build(idCollection, Collection, true, "2.2");
        };
    }
}

export default {
    init: Methods.init
}