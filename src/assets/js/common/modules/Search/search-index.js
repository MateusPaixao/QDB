import oldScripts from './_search-old';
import SmartResearch from './_vtex-smartResearch'
import BuildSearch from './_search'
import {isInViewport} from '../../global/global-index'
const Methods = {
    init() {
        isInViewport();
        // BuildSearch.init();
        oldScripts.init();
        SmartResearch.init();
    }
}
export default {
    init: Methods.init
}