import React from 'react';
import { AllReplace } from '../../../../../global/global-index';

export const AllColors = ({ Product, Sku, handleSku, showAll, handleShowAll }) => {
  AllReplace();
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
  const checkLoad = e => {
    e.querySelector('img').complete ? e.classList.remove('loading') : '';
  };

  return (
    <React.Fragment>
      <div className={`generalOverlay setOpen-${showAll}`} onClick={() => handleShowAll()} />
      <div className={`principal__allColorsContainer setOpen-${showAll}`}>
        <div className="principal__allColors">
          <span className="principal__allColors__title">
            <svg viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.605 14.3939L0.000112059 10.4811C0.000112059 10.4811 2.52795 7.64509 3.605 6.5683L8.61914 1.55536C10.6899 -0.514936 14.0647 -0.521828 16.142 1.55494C18.215 3.62749 18.2191 6.99901 16.1416 9.07601L14.7362 10.4811L16.1416 11.8862C18.2191 13.9632 18.215 17.3347 16.142 19.4073C14.0647 21.484 10.6899 21.4772 8.61913 19.4069L3.605 14.3939Z"
              />
            </svg>
            Cores
          </span>
          <span className="principal__allColors__close" onClick={() => handleShowAll()}>
            X
          </span>
          <ul className="principal__allColors__list">
            {Product.items.map((sku, i) => (
              <li
                className={`principal__allColors__list__color ${
                  sku.itemId == Sku.itemId ? `set--active` : ''
                }`}
                data-name={sku['Escolha a Cor']}
                data-pop={Math.floor(Math.random() * (30 + 5)) + 15}
                data-sku={sku.itemId}
                onClick={e => handleSku(e.currentTarget, sku.itemId)}
                onLoad={e => checkLoad(e.currentTarget)}
                key={i}
              >
                <span
                  className={`principal__allColors__list__color__item set--avaliable-${setAvaliable(
                    sku
                  )}`}
                  {...(setDiscount(sku) != 0 && { 'data-discount': `${setDiscount(sku)}%` })}
                >
                  {// Maybe refactor this redundant part
                  sku.images.filter(o => {
                    if (o.imageLabel === 'thumb') {
                      return o;
                    }
                  }).length > 0 && (
                    <img
                      src={sku.images
                        .filter(o => {
                          if (o.imageLabel === 'thumb') {
                            return o;
                          }
                        })[0]
                        .imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]
                        .allReplace({ '#width#': '1', '#height#': '1', '~': '' })}
                      loading="lazy"
                      alt={sku['Escolha a Cor']}
                    />
                  )}
                  <p className="principal__allColors__list__color__item__name">
                    {sku['Escolha a Cor']}
                  </p>
                  <svg viewBox="0 0 54 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.884 0.975634C46.5825 1.019 45.3492 1.56832 44.4465 2.50688C34.8688 12.1053 27.5545 20.1219 18.6653 29.1944L9.19652 21.1944C8.69408 20.7696 8.11276 20.4481 7.48586 20.2483C6.85896 20.0485 6.19879 19.9744 5.5432 20.0301C4.8876 20.0859 4.24944 20.2705 3.6653 20.5733C3.08116 20.8761 2.56251 21.2912 2.13907 21.7948C1.71563 22.2985 1.39572 22.8807 1.19766 23.5081C0.999607 24.1356 0.927304 24.7959 0.984893 25.4513C1.04248 26.1068 1.22883 26.7444 1.53327 27.3277C1.83771 27.911 2.25424 28.4286 2.75902 28.8506L15.759 39.8506C16.7155 40.6563 17.9392 41.0743 19.1887 41.0223C20.4382 40.9702 21.6229 40.4518 22.509 39.5694C33.279 28.7763 40.9456 20.1556 51.509 9.56938C52.2345 8.86814 52.731 7.96385 52.933 6.97527C53.1351 5.98669 53.0333 4.96008 52.6412 4.03038C52.249 3.10069 51.5848 2.31137 50.7357 1.76616C49.8867 1.22095 48.8926 0.945408 47.884 0.975634V0.975634Z" />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
