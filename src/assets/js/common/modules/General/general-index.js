import Glider from "../../global/vendor/glider-slider/glider.min.js"
import Vitrine from "./Vitrine/VitrineContainer.jsx"
// import { Builder } from "node-vibrant";

const Methods = {
    init(){
        Vitrine.init
    },
    build(collection){
        Vitrine.build(collection);
        window.addEventListener('load', function(){
            new Glider(document.querySelector('.glider'), {
                slidesToScroll: 1,
                slidesToShow: 4.5,
                draggable: true,
                arrows: {
                    prev: '.glider-prev',
                    next: '.glider-next'
                }
            })
        });
    }
}

export default {
    init: Methods.init,
    vitrine: Methods.build
}