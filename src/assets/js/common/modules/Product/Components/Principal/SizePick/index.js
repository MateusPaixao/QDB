import React from 'react';

export const SizePick = ({ Product, Sku, handleSku }) => {
  const setAvaliable = sku => {
    let avaliable =
      sku.sellers[0].commertialOffer.AvailableQuantity == 0 ||
      sku.sellers[0].commertialOffer.Price == 0 ||
      sku.sellers[0].commertialOffer.ListPrice == 0
        ? false
        : true;
    return avaliable;
  };

  const setDiscount = sku => {
    let discount = sku.sellers[0].commertialOffer.Price - sku.sellers[0].commertialOffer.ListPrice;
    discount = Math.round((discount * 100) / sku.sellers[0].commertialOffer.ListPrice);
    return discount;
  };
  return (
    <div className="principal__sizeContainer">
      <div className="principal__sizes">
        <ul className="principal__sizes__list">
          {Product.items.slice(0, 3).map((sku, i) => (
            <li
              className={`principal__sizes__list__size ${
                sku.itemId == Sku.itemId ? `set--active` : ''
              } set--avaliable-${setAvaliable(sku)}`}
              data-name={sku['Escolha o Volume']}
              data-sku={sku.itemId}
              onClick={() => handleSku(sku.itemId)}
              key={i}
            >
              <span
                className="principal__sizes__list__size__item"
                {...(setDiscount(sku) != 0 && { 'data-discount': `${setDiscount(sku)}%` })}
              >
                {sku['Escolha o Volume']}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
