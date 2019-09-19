const Methods = {
  init() {
    Methods.productsSlick();
    Methods.twentyBanner();
    Methods.getProductBannerInfo();
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
    var productElements = document.querySelectorAll(".panel-product .product-id");

    productElements.forEach((element) => {
      const productId = element.textContent;
      const url = 'https://qbbr.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?fq=productId:' + productId;

      fetch(url)
        .then(res => res.json())
        .then((product) => {
          console.log(product[0].productTitle);
        })
    });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  Methods.init();
})
