$( document ).ready(function() {
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
$(".twentytwenty-container").twentytwenty({
    default_offset_pct: 0.69,
    orientation: 'horizontal',
    no_overlay: false
});   
