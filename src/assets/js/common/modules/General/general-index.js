import Glider from "../../global/vendor/glider-slider/glider.min.js"
import Vitrine from "./Vitrine/VitrineContainer.jsx"
// import { Builder } from "node-vibrant";

const Methods = {
    init(){
        Vitrine.init
    },
    build(collection){
        Vitrine.build(collection);
        new Glider(document.querySelector('.glider'), {
            slidesToScroll: 1,
            slidesToShow: 1,
            draggable: true,
            arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
            },
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
                    settings: {
                    slidesToShow: 4.5,
                    slidesToScroll: 1,
                    }
                }
            ]
        })
    }
}

export default {
    init: Methods.init,
    vitrine: Methods.build
}