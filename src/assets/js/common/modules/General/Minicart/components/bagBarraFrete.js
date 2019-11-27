const BarraFrete = {
    init() {
        BarraFrete.refresh();
        BarraFrete.observeOrderForm();
    },
    refresh() {
        vtexjs.checkout.getOrderForm().done(function(orderForm) {
            let meuCarrinho;
            orderForm.totalizers.length > 0 && orderForm.totalizers[0].id == "Items" ? meuCarrinho = orderForm.totalizers[0].value / 100 : meuCarrinho = 0;
            let desconto;

            vtexjs.checkout.orderForm.totalizers[1] !== undefined && vtexjs.checkout.orderForm.totalizers[1].id == "Discounts" ? desconto = parseFloat(vtexjs.checkout.orderForm.totalizers[1].value / 100) : desconto = 0;
                
            const valorFrete = 79.90;
            const valueRemainingText = document.querySelector('.price__remaining');

            let carrinhoMenosDescontos = meuCarrinho + desconto;
            let valorParaTerFrete = valorFrete - carrinhoMenosDescontos;

            valorParaTerFrete <= 0 ? valueRemainingText.textContent = "0" : valueRemainingText.textContent = `R$${valorParaTerFrete.toFixed(2).replace('.',',')}`; 

            const barProgress = (carrinhoMenosDescontos / valorFrete) * 100;
            const barTrack = document.querySelector('.js--price-track');
            console.log(barProgress)
            barTrack.style = `transform: translate(${barProgress.toFixed(2)}%)`;
        });
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