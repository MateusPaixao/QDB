import PeopleInPage from './_peopleInPage.jsx'
import StockLeft from './_stockLeft.jsx'

const Methods = {
    init(){
        // PeopleInPage();
    },
    setPeopleInPage(num, minV){
        PeopleInPage.init(num, minV);
    },
    setStockLeft(stock){
        StockLeft.init(stock);
    }
}

export default {
    init: Methods.init,
    setPeopleInPage: Methods.setPeopleInPage,
    setStockLeft: Methods.setStockLeft
}