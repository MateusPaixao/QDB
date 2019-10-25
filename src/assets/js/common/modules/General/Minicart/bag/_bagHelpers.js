export default {

  bonus(cupom){
    if(cupom.indexOf('/') != -1){
      return  cupom.split('/').map(price => {
        return `<span class="bag-bottom__bonus-item ico">${price}</span>`
      }).join('');
    }else if(cupom){
      return `<span class="bag-bottom__bonus-item ico">${cupom}</span>`
    }else{
      return "";
    }
  },

  getSku(skuList){
    if(skuList.skus.length == 1){
      return skuList.skus[0]
    }
    else{
      let cor = document.querySelector('.skuList input:checked').dataset.value
      return skuList.skus.filter( (sku)=> sku.values.includes(cor))[0];
    }
  },

  createOptions(stock,current) {
    return stock.map((index) => {
      if (current != index) {
        return `<option value=${index}>${index}</option>`
      }else {
        return `<option selected value=${current}>${current}</option>`
      }
    }).join('');
  },

  precify( { price, listPrice, quantity } ) {
    if (price !== listPrice) {
      return `<span class="bag-shelf__item-info-price-discount js--bag-old-price">
        ${((listPrice * quantity ) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
      <span class="bag-shelf__item-info-price-sell js--bag-best-price">
        ${((price * quantity )/ 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>`;
    }
    return (( price * quantity ) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  },

  discountify(oldPrices,bestPrices){
    let oldPrice =  oldPrices.map(element => parseFloat(element.textContent.replace("R\u0024", "").replace(",","").replace(".","")) /100).reduce((totals , discount) => totals + discount,0)
    let bestPrice = bestPrices.map(element => parseFloat(element.textContent.replace("R\u0024", "").replace(",","").replace(".","")) /100).reduce((totals , discount) => totals + discount,0)

    return (bestPrice - oldPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  }
}