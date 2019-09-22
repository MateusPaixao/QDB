const Methods = {
  init() {
    Methods.productsSlick();
    Methods.twentyBanner();
    Methods.getProductBannerInfo();
    Methods.getProductReview();
    //Methods.hideEmptySections();
    //Methods.buildVitrines();
  },
  productsSlick: () => {
    $(document).ready(function () {
      $(".slick-products-list").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          }
        ]
      });
    });
  },
  twentyBanner: () => {
    $(".twentytwenty-container").twentytwenty({
      default_offset_pct: 0.69,
      orientation: 'horizontal',
      no_overlay: false
    });
  },
  getProductBannerInfo: () => {
    const productElements = document.querySelectorAll(".panel-product");

    productElements.forEach((element) => {
      const productID = element.querySelector('.product-id').textContent.split(";")[0];
      const productSKU = element.querySelector('.product-id').textContent.split(";")[1];
      
      var title = element.querySelector('.title');
      var description = element.querySelector('.description');
      var discount = element.querySelector('.discount');
      var installment = element.querySelector('.installment');
      var oldPrice = element.querySelector('.old-price');
      var newPrice = element.querySelector('.new-price');
      var button = element.querySelector('.button');
      
      const url = 'https://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:' + productID;
      fetch(url)
        .then(res => res.json())
        .then((product) => {
          const skuList = product[0].items;
          for (var i in skuList) {
            var sku = skuList[i];
            if (skuList.hasOwnProperty(i) && (sku.itemId == productSKU)) {
              //prices
              var listPrice = sku.sellers[0].commertialOffer.ListPrice;
              var bestPrice = sku.sellers[0].commertialOffer.Price;
              var percent = parseInt(100 - ((bestPrice / listPrice) * 100));
              
              //set html content
              title.innerHTML = product[0].productName;
              description.innerHTML = product[0]['porque a gente ama'][0];
              newPrice.innerHTML = `R$ ${bestPrice.toFixed(2).replace('.',',')}`;
              oldPrice.innerHTML = listPrice != bestPrice ? `R$ ${listPrice.toFixed(2).replace('.',',')}` : "";
              discount.innerHTML = percent > 0 ? percent + "%" : discount.remove();
              button.setAttribute("href", `/${product[0].linkText}/p`);

              //installment
              installment.innerHTML = Math.max.apply(Math, sku.sellers[0].commertialOffer.Installments.map(function (o) {
                return o.NumberOfInstallments;
                })) + "x de R$" + Math.min.apply(Math, sku.sellers[0].commertialOffer.Installments.map(function (o) {
                    return o.Value;
                })).toFixed(2).toString().replace(".", ",") + " sem juros";
                
            }
          }
        })
    });
  },
  getProductReview: () => {
    
    new Promise((resolve, reject) => {
      var panelRating = document.querySelector('.panel-rating');
      var productID = document.querySelector('.rating-container .product-id');
      var title = panelRating.querySelector('.title');
      var text = panelRating.querySelector('.text');
      var author = panelRating.querySelector('.author');
      var button = panelRating.querySelector('.button');

      let request = new XMLHttpRequest();
      let url = `https://service.yourviews.com.br/api/v2/pub/review/Summary?productid=${productID}&page=1&count=10`;
      request.open('GET', url);
      request.setRequestHeader('YVStoreKey','388ef2d0-c3b8-4fd6-af13-446b698d544a'); 
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onreadystatechange = () => {
          if (request.readyState === 4) {
              resolve(JSON.parse(request.response));
              var obj = JSON.parse(request.response);
              text.innerHTML = obj.Element.TopOpinions[0].Opinion;
              console.log(obj.Element.TopOpinions[0].Opinion);
          }
      }
      request.send();
    })
  },
  hideEmptySections : () => {
    var section = document.querySelectorAll(".section-visibility");
    section.forEach((element) => {
      if (element.innerHTML = "") {
        element.parentNode.remove();
      }
    })
  },
  buildVitrines : () => {
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
document.addEventListener('DOMContentLoaded', () => {
  Methods.init();
})
