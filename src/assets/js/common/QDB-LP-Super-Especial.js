const Methods = {
  init() {
    Methods.productsSlick();
    Methods.twentyBanner();
    Methods.getProductBannerInfo();
    //Methods.hideEmptySections();
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
  hideEmptySections : () => {
    var section = document.querySelectorAll(".section-visibility");
    section.forEach((element) => {
      if (element.innerHTML = "") {
        element.parentNode.remove();
      }
    })
  }
}
document.addEventListener('DOMContentLoaded', () => {
  Methods.init();
})
