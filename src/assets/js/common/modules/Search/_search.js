// import General from "../../../General/general-index"
import CacheSelector from './cache-selector'
import Vitrine from "../General/Vitrine/VitrineContainer.jsx"

const Methods = {
    init(){
        Methods.setInfo();
        Methods.buildVitrines();
        Methods.SmartResearch();
    },
    setInfo(){
        document.querySelector(".total-prpduct").textContent = document.querySelector('.searchResultsTime .resultado-busca-numero .value').textContent;
        document.querySelectorAll('.breadcrumbs .bread-crumb > ul > li')[0].textContent = 'página inicial'
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
        btnSR.classList.add("contentProducts__smartResearch","set--smartResearch");

        const targetNode = document.querySelector(".contentProducts__render-collection");

        const config = { attributes: true, childList: true, subtree: true };

        const callback = function(mutationsList, observer) {
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if(targetNode.childNodes[0].childElementCount >= 24){
                        contentProducts.appendChild(btnSR);
                    }
                    observer.disconnect();
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
           
        let actualPage = 1;

        btnSR.addEventListener("click", () => {
            btnSR.classList.add("set--loading");
            actualPage++;
            let Page = document.createElement('div');
            Page.classList.add(`collectionPage-${actualPage}`,"hidden");
            let Render = document.createElement('div');
            Render.classList.add("contentProducts__render-collection");

            let url, content, preg, scripts = document.querySelectorAll("script:not([src])");
            console.log(document.querySelectorAll("script:not([src])"));
            for(let i = 0; i < scripts.length; i++){
                content=scripts[i].innerHTML;
                preg=/\/buscapagina\?.+&PageNumber=/i;
                if(content.search(/\/buscapagina\?/i)>-1)
                {
                    url=preg.exec(content);
                }
            }
            console.log(url[0] + actualPage);
            fetch(url + actualPage, {
                method: "GET",
            }).then((response) =>{
                response.text()
                .then((col) => {
                    btnSR.before(Page);
                    Page.after(Render);
                    
                    setTimeout(() => {
                        btnSR.classList.add("set--loadingMount");
                    }, 2000);

                    Page.innerHTML = col;
                    let idCollection = Math.floor(Math.random() * 10000), 
                    Collection = [],
                    Item = {},
                    Content = Page.querySelectorAll(".vitrine-content");
            
                    for(let i = 0; i < Content.length; i++){
                        Item.Product = Content[i].dataset.productid;
                        Item.SkuHighlight = Content[i].dataset.sku;
                        Collection.push(Item);
                        Item = {}
                    }

                    Page.nextSibling.setAttribute("id", "collection" + idCollection);
                    Vitrine.build(idCollection, Collection, false);

                    const PageTargetNode = document.getElementById("collection" + idCollection);

                    const PageConfig = { attributes: true, childList: true, subtree: true };

                    const callback = function(mutationsList, observer) {
                        for(let mutation of mutationsList) {
                            if (mutation.type === 'childList') {
                                console.log(Render.childNodes[0].childElementCount);
                                if(Render.childNodes[0].childElementCount < 24){
                                    btnSR.classList.add("hidden");
                                }

                                btnSR.classList.add("set--loaded");
                                setTimeout(() => {
                                    btnSR.classList.remove("set--loading", "set--loaded", "set--loadingMount");
                                }, 500);
                                observer.disconnect();
                            }
                        }
                    };
                    const PageObserver = new MutationObserver(callback);
                    PageObserver.observe(PageTargetNode, PageConfig);
                })
            })
        })
    }
}

export default {
    init: Methods.init
}