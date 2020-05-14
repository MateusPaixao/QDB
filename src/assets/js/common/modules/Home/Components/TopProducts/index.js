// import General from "../../../General/general-index"
import Vitrine from "../../../General/Vitrine"

const Methods = {
    init(){
        Methods.buildVitrines();
    },
    buildVitrines(){
        let idCollection = Math.floor(Math.random() * 5000),
        Placeholder = document.querySelector(".topProducts .collectionPlaceholder"),
        Collection = [],
        url = new URL("https://recs.chaordicsystems.com/v0/pages/recommendations"),
        params = {
            apiKey: "qdb-vtex", 
            secretKey: "rz4YYCNFlWAnPdogRpLdRw==", 
            deviceId: "dev001", 
            productFormat: "complete",
            source: window.innerWidth > 992 ? "desktop" : "mobile", 
            name: "home"
        };
        
        url.search = new URLSearchParams(params);

        fetch(url, {
            method: "GET"
        }).then(response => {
            return response.json();
        }).then((col) => {
            col.top[0].displays[0].recommendations.map((p) => {
                let Item = {};
                Item.Product = p.id;
                // console.log(p.skus.find(el => el.status == "available"));
                Item.SkuHighlight = p.skus.find(el => el.status == "available").sku;
                Collection.push(Item);
            });
            document.querySelector(".topProducts__title").textContent = col.top[0].title;
            // console.log(Collection);

            Placeholder.innerHTML = "";
            let Col = "collection" + idCollection;
            Placeholder.nextSibling.setAttribute("id", Col);
            
            Vitrine.build(idCollection, Collection, true, "4.2");
        });
    }
}

export default {
    init: Methods.init
}