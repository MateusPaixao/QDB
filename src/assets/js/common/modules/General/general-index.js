import Vitrine from "./Vitrine/VitrineContainer.jsx"
import { Builder } from "node-vibrant";

const Methods = {
    init(){
        Vitrine.init
    },
    build(collection){
        Vitrine.build(collection);
    }
}

export default {
    init: Methods.init,
    vitrine: Methods.build
}