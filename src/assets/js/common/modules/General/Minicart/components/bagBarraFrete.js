import {
    getCookie
} from '../../../../global/global-index';

const BarraFrete = {
    init() {
        BarraFrete.refresh();
        BarraFrete.observeOrderForm();
    },
    refresh() {
        
        function barFilled() {
            var freteBarCompleted = document.querySelector('.price__text-success');
            var freteBarUncompleted = document.querySelector('.price__text-content');

            freteBarCompleted.classList.remove('hidden');
            freteBarUncompleted.classList.add('hidden');
        }
        function barUnfilled() {
            var freteBarCompleted = document.querySelector('.price__text-success');
            var freteBarUncompleted = document.querySelector('.price__text-content');

            freteBarCompleted.classList.add('hidden');
            freteBarUncompleted.classList.remove('hidden');
        }

        // let cookieValorFrete = getCookie('ValorFrete');
        try {
            vtexjs.checkout.getOrderForm().done(function (orderForm) {
                let meuCarrinho;
                let desconto;
                
                // orderForm.totalizers.length > 0 && orderForm.totalizers[0].id == "Items" ? meuCarrinho = orderForm.totalizers[0].value / 100 : meuCarrinho = 0;
                
                if(orderForm.totalizers.length > 0 && orderForm.totalizers[0].id == "Items"){
                    meuCarrinho = orderForm.totalizers[0].value / 100
                }
                else{
                    meuCarrinho = 0;
                }

                // vtexjs.checkout.orderForm.totalizers[1] !== undefined && vtexjs.checkout.orderForm.totalizers[1].id == "Discounts" ? desconto = parseFloat(vtexjs.checkout.orderForm.totalizers[1].value / 100) : desconto = 0;

                if(vtexjs.checkout.orderForm.totalizers[1] !== undefined && vtexjs.checkout.orderForm.totalizers[1].id == "Discounts"){
                    desconto = parseFloat(vtexjs.checkout.orderForm.totalizers[1].value / 100)
                }
                else{
                    desconto = 0;
                }
                let valorFrete = window.valorFrete.Frete;
                let valueRemainingText = document.querySelector('.price__remaining');

                let carrinhoMenosDescontos = meuCarrinho + desconto;
                let valorParaTerFrete = valorFrete - carrinhoMenosDescontos;
                
                valueRemainingText.textContent = `R$${valorParaTerFrete.toFixed(2)}`
                // valorParaTerFrete <= 0 ? barFilled() : barUnfilled();
                if(valorParaTerFrete <= 0) {
                    barFilled();
                }
                else {
                    barUnfilled();
                }

                let barProgress = (carrinhoMenosDescontos / valorFrete) * 100;
                let barTrack = document.querySelector('.js--price-track');

                barTrack.style = `transform: translate(${barProgress.toFixed(2)}%)`;
            });
        }
        catch(err){
            console.log('Erro na função de Barra de frete minicart',err);
        } 
        

        // function listenerShipping() {
        //     window.valorFrete.registerListener(function (val) {
        //         document.cookie = "ValorFrete=" + val;
        //         executeShippingBar(val);
        //         console.log('LISTENER SHIPPING')
        //     });
        // }

        // cookieValorFrete != undefined ? executeShippingBar(cookieValorFrete) : listenerShipping();

    },
    observeOrderForm() {
        $(window).on('checkoutRequestEnd.vtex', function (ev) {
            BarraFrete.refresh();
        });
    }

}
export default {
    init: BarraFrete.init
}
