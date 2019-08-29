import Glider from "../../global/vendor/glider-slider/glider.min.js"
import Vitrine from "./Vitrine/VitrineContainer.jsx"
// import { Builder } from "node-vibrant";

const Methods = {
    init(){
        Vitrine.init
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
                        draggable: false,
                        arrows: {
                            prev: '.glider-prev',
                            next: '.glider-next'
                        },
                        settings: {
                        slidesToShow: 4.5,
                        slidesToScroll: 1,
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