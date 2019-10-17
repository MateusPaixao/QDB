import oldScripts from './_departament-old';
// import SmartResearch from './_vtex-smartResearch'
import BuildVitrines from './_vitrines'
import {isInViewport} from '../../global/global-index'
const Methods = {
    init() {
        isInViewport();
        BuildVitrines.init();
        oldScripts.init();
        // SmartResearch.init();
    }
}
export default {
    init: Methods.init
}