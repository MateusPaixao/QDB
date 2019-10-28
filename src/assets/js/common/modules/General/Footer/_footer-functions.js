const Methods = {
    init () {
        Methods.organizeTrusts();
    },
    organizeTrusts() {
        if(window.innerWidth < 768){
            const listPayments = document.querySelector('.list.payments'); 
            const listTrusts = document.querySelector('.list.trusts');
            listPayments.append(listTrusts)
        }
        
    }
}

export default {
    init: Methods.init
}