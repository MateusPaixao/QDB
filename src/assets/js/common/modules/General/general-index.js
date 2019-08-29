import Glider from "../../global/vendor/glider-slider/glider.min.js"
import Vitrine from "./Vitrine/VitrineContainer.jsx"
import Region from "./Regional/PriceContainer.jsx"
// import { Builder } from "node-vibrant";

const Methods = {
    init(){
        // Vitrine.init
        Region.init();
    },
    build(collection){
        Vitrine.build(collection);
        window.onload = function(){
            new Glider(document.querySelector('.glider'), {
                slidesToScroll: 1,
                slidesToShow: 1,
                draggable: true,
                responsive: [
                    {
                        // screens greater than >= 775px
                        breakpoint: 768,
                        settings: {
                        slidesToShow: 'auto',
                        slidesToScroll: 'auto',
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                        slidesToShow: 4.5,
                        slidesToScroll: 1,
                            arrows: {
                                prev: '.glider-prev',
                                next: '.glider-next'
                            },
                        }
                    }
                ]
            })
        }
    }
}

export default {
    init: Methods.init,
    vitrine: Methods.build
}