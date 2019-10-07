import Vitrine from './modules/General/Vitrine/VitrineContainer.jsx';

const Methods = {
  init() {
    Methods.productsSlick();
    Methods.twentyBanner();
    Methods.getProductBannerInfo();
    Methods.getProductReview();
    Methods.hideEmptySections();
    Methods.buildVitrines();
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
    var elExists = document.querySelector('.banner-before-after .img-before span');
    if(typeof(elExist) != 'undefined' && elExist != null){
      var imgBefore = document.createElement('img');
      imgBefore.setAttribute('src', document.querySelector('.banner-before-after .img-before span').innerHTML);
      document.querySelector('.twentytwenty-container').appendChild(imgBefore);

      var imgAfter = document.createElement('img');
      imgAfter.setAttribute('src', document.querySelector('.banner-before-after .img-after span').innerHTML);
      document.querySelector('.twentytwenty-container').appendChild(imgAfter);
    }
       
    document.addEventListener('readystatechange', event => { 
      if (event.target.readyState === "complete") {
        $(".twentytwenty-container").twentytwenty({
          default_offset_pct: 0.69,
          orientation: 'horizontal'
        });
        $(window).trigger('resize');
      }
    });
  },
  getProductBannerInfo: () => {
    var productElements = document.querySelectorAll(".panel-product");

    productElements.forEach((element) => {
      var productID = element.querySelector('.product-id').textContent.split(";")[0];
      var productSKU = element.querySelector('.product-id').textContent.split(";")[1];
      
      var title = element.querySelector('.title');
      var description = element.querySelector('.description');
      var discount = element.querySelector('.discount');
      var installment = element.querySelector('.installment');
      var oldPrice = element.querySelector('.old-price');
      var newPrice = element.querySelector('.new-price');
      var button = element.querySelector('.button');
      
      var url = 'https://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:' + productID;
      fetch(url)
        .then(res => res.json())
        .then((product) => {
          var skuList = product[0].items;
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
    var productID = document.querySelector('.rating-container .product-id').textContent;
    var panelRating = document.querySelector('.panel-rating');
    var title = panelRating.querySelector('.title');
    var ratingImg = panelRating.querySelectorAll('.rating img');
    var text = panelRating.querySelector('.text');
    var author = panelRating.querySelector('.author');
    var button = panelRating.querySelector('.button');
    
    new Promise((resolve, reject) => {
      //get review info
      let request = new XMLHttpRequest();
      let urlReview = `https://service.yourviews.com.br/api/v2/pub/review/get?productid=${productID}&page=1&count=10 `;
      request.open('GET', urlReview);
      request.setRequestHeader('YVStoreKey','388ef2d0-c3b8-4fd6-af13-446b698d544a'); 
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
              resolve(JSON.parse(request.response));
              var obj = JSON.parse(request.response);
              text.innerHTML = obj.Element[0].Review;
              author.innerHTML = obj.Element[0].UserName;
              var rating =  obj.Element[0].Rating;
              for (var i = 0; i < rating; i++) {
                ratingImg[i].style.display = "inline-block";
              }
          }
      }
      request.send();
    })

    //get product info
    var urlProduct = 'https://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:' + productID;
    fetch(urlProduct)
      .then(res => res.json())
      .then((product) => {
        title.innerHTML = product[0].productName;
        button.setAttribute("href", `/${product[0].linkText}/p`);
    })
  },
  hideEmptySections : () => {
    var section = document.querySelectorAll(".section-visibility");
    section.forEach((element) => {
      if (element.innerHTML == "") {
        element.closest('.section-block').style.display = "none";
      }
    })
  },
  buildVitrines : () => {
    let idCollection = Math.floor(Math.random() * 5000), 
    Collection = [],
    Placeholder = document.querySelector(".collectionPlaceholder"),
    Content = Placeholder.querySelectorAll(".collectionPlaceholder .vitrine-content");

    for (let i = 0; i < Content.length; i++) {
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
  }
}
document.addEventListener('DOMContentLoaded', () => {
  Methods.init();
})
