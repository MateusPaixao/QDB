import oldScripts from './_departament-old';
import SmartResearch from './_vtex-smartResearch'
import BuildSearch from './_category'
import {isInViewport} from '../../global/global-index'
const Methods = {
    init() {
        isInViewport();
        BuildSearch.init();
        // oldScripts.init();
        // SmartResearch.init();
    }
}
export default {
    init: Methods.init
}