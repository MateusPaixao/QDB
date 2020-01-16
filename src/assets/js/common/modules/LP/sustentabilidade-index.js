import Vitrine from '../General/Vitrine/VitrineContainer.jsx'

const Methods = {
  init(){
    Methods.buildVitrines(),
    Methods.toggleClass(),
    Methods.resizeProducts()
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
        console.log(col)
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
        console.log(Col)
        Placeholder.nextSibling.setAttribute("id", Col);

        Vitrine.build(idCollection, Collection, true, "2.2");
    });
  },

  toggleClass(){
        // const faq = document.getElementsByClassName("glossary__item")
        // for (var i = 0; i < faq.length; i++) {
        //     faq[i].addEventListener("click", function() {
        //         for (var i = 0; i < faq.length; i++) {
        //             faq[i].className = faq[i].className.replace(" active", "");      
        //             faq[i].className = faq[i].className.replace(" icon-none", "");               
        //         }
        //         this.className += " active icon-none";
        //         // var splt = this.className.split(' ')

        //         // if(splt[1] == 'active'){
        //         //     // this.className = " icon-none"
        //         //     this.classList.remove("active");
        //         //     this.classList.remove("icon-none");
        //         //     console.log('abri dnv')
        //         // }
        //     });
        // }


        $('.glossary__item').on('click', function(){
            $(this).toggleClass("active icon-none")
        })

        //toggle class Jquery
    },
}

export default {
  init: Methods.init

}


