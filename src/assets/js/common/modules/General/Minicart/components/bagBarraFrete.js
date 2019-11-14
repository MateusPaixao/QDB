const Methods = {
    init() {
        setTimeout(() => {
            Methods.startShippingBar();
        }, 300);
    },

    startShippingBar() {
        const valorFrete = parseFloat(window.valorFrete);
        let total = vtexjs.checkout.orderForm.totalizers[0].value / 100;
        let descontos;
        const validateDiscount = vtexjs.checkout.orderForm.totalizers[1] !== undefined && vtexjs.checkout.orderForm.totalizers[1].id == "Discounts";
        validateDiscount ? descontos = parseFloat(vtexjs.checkout.orderForm.totalizers[1].value / 100) : descontos = 0;

        let totalMenosDesconto = total + descontos;
        let finalValue = valorFrete - totalMenosDesconto;

        finalValue <= 0 ? console.log("Valor final menor ou igual a 0") : console.log("Valor final maior que 0");

        Methods.createShippingBar();

        $(window).on('orderFormUpdated.vtex', function (event, orderForm) {

            if (document.querySelector('.shipping--fill') != null || document.querySelector('.shipping--fill') != undefined) {
                const total = parseFloat(vtexjs.checkout.orderForm.totalizers[0].value / 100);
                let descontos;

                validateDiscount ? descontos = parseFloat(vtexjs.checkout.orderForm.totalizers[1].value / 100) : descontos = 0;

                const totalMenosDesconto = total + descontos;
                let faltamFrete = valorFrete - totalMenosDesconto;

                
                faltamFrete <= 0 ? console.log("Frete Grátis") : console.log("Faltam para frete grátis:",faltamFrete.toFixed(2).replace('.', ','));

                Methods.updateValues();
            }
        });

    },
    createShippingBar() {
        const shippingBar = document.createElement('div');
        const shippingFill = document.createElement('span');

        shippingBar.classList.add('class', 'shipping');
        shippingFill.classList.add('class', 'shipping--fill');
        shippingBar.appendChild(shippingFill);

        const minicartHeader = document.querySelector('.bag-top__load-wrap');
        minicartHeader.appendChild(shippingBar);
    },
    updateValues() {
        const shippingContent = document.querySelector('.shipping--fill');
        let total = parseFloat(vtexjs.checkout.orderForm.totalizers[0].value / 100);
        let descontos;

        validateDiscount ? descontos = parseFloat(vtexjs.checkout.orderForm.totalizers[1].value / 100) : descontos = 0;

        let subtotalMdiscount = total + descontos;
        let freeShippingValue = parseFloat("{{valor_para_frete_gratis}}".replace(',', '.'));
        let barWidth = (subtotalMdiscount / freeShippingValue) * 100;
        shippingContent.style.width = barWidth + '%';
    }
}

export default{
    init: Methods.init
}