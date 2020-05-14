import React from 'react';
import { AllReplace } from '../../../../../global/global-index';

export const ColorPick = ({ Product, Sku, handleSku, handleShowAll }) => {
  AllReplace();

  const Skus = [];
  const [SkuList, setSkuList] = React.useState([]);

  const setAvaliable = sku => {
    let avaliable =
      sku.sellers[0].commertialOffer.AvailableQuantity == 0 ||
      sku.sellers[0].commertialOffer.Price == 0 ||
      sku.sellers[0].commertialOffer.ListPrice == 0
        ? false
        : true;
    return avaliable;
  };

  // console.log(Product.items.filter(sku => sku.sellers[0].commertialOffer.Price - sku.sellers[0].commertialOffer.ListPrice))
  // console.log(Product.items.filter(sku => sku.sellers[0].commertialOffer.Price == sku.sellers[0].commertialOffer.ListPrice && sku.sellers[0].commertialOffer.AvailableQuantity > 0))
  // console.log(Product.items.filter(sku => sku.sellers[0].commertialOffer.AvailableQuantity == 0 || sku.sellers[0].commertialOffer.Price == 0 || sku.sellers[0].commertialOffer.ListPrice == 0))

  Skus.push(
    Product.items.filter(
      sku => sku.sellers[0].commertialOffer.Price - sku.sellers[0].commertialOffer.ListPrice
    )
  );
  Skus.push(
    Product.items.filter(
      sku =>
        sku.sellers[0].commertialOffer.Price == sku.sellers[0].commertialOffer.ListPrice &&
        sku.sellers[0].commertialOffer.AvailableQuantity > 0
    )
  );
  Skus.push(
    Product.items.filter(
      sku =>
        sku.sellers[0].commertialOffer.AvailableQuantity == 0 ||
        sku.sellers[0].commertialOffer.Price == 0 ||
        sku.sellers[0].commertialOffer.ListPrice == 0
    )
  );

  const setDiscount = sku => {
    let discount = sku.sellers[0].commertialOffer.Price - sku.sellers[0].commertialOffer.ListPrice;
    discount = Math.round((discount * 100) / sku.sellers[0].commertialOffer.ListPrice);
    return discount;
  };
  const checkLoad = e => {
    e.querySelector('img').complete ? e.classList.remove('loading') : '';
  };

  // const centerScroll = () => {
  //     let list = document.querySelector('ul.principal__colors__list');
  //     let active = document.querySelector('.principal__colors__list__color.set--active');

  //     // list.scrollLeft = (active.offsetWidth - list.offsetWidth) / 2;

  //     list.scrollLeft = (active.offsetLeft + active.offsetWidth / 2) + (list.scrollLeft - list.scrollWidth / 2);
  // }

  React.useEffect(() => {
    setSkuList(Skus);
    // console.log(SkuList);
  }, []);

  // React.useEffect(() => {
  //     // centerScroll();
  // }, [SkuList])

  return (
    <div className="principal__colorsContainer">
      <div className="principal__colors">
        <span className="principal__colors__count">
          {Product.items.length > 0 ? `${Product.items.length} cores disponíveis` : null}
        </span>
        <span className="principal__colors__more" onClick={() => handleShowAll()}>
          Ver todas as cores
        </span>
        <ul className="principal__colors__list">
          {SkuList.flat().length > 0 &&
            SkuList.flat().map((sku, i) => (
              <li
                className={`principal__colors__list__color loading ${
                  sku.itemId == Sku.itemId ? `set--active` : ''
                } set--avaliable-${setAvaliable(sku)}`}
                data-name={sku['Escolha a Cor']}
                data-pop={Math.floor(Math.random() * (30 + 5)) + 15}
                data-sku={sku.itemId}
                onClick={e => handleSku(e.currentTarget, sku.itemId)}
                onLoad={e => checkLoad(e.currentTarget)}
                qty={SkuList.flat().length}
                key={i}
              >
                <span
                  className="principal__colors__list__color__item"
                  {...(setDiscount(sku) != 0 && { 'data-discount': `${setDiscount(sku)}%` })}
                >
                  {sku.images.filter(o => {
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
                </span>
                <svg viewBox="0 0 54 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M47.884 0.975634C46.5825 1.019 45.3492 1.56832 44.4465 2.50688C34.8688 12.1053 27.5545 20.1219 18.6653 29.1944L9.19652 21.1944C8.69408 20.7696 8.11276 20.4481 7.48586 20.2483C6.85896 20.0485 6.19879 19.9744 5.5432 20.0301C4.8876 20.0859 4.24944 20.2705 3.6653 20.5733C3.08116 20.8761 2.56251 21.2912 2.13907 21.7948C1.71563 22.2985 1.39572 22.8807 1.19766 23.5081C0.999607 24.1356 0.927304 24.7959 0.984893 25.4513C1.04248 26.1068 1.22883 26.7444 1.53327 27.3277C1.83771 27.911 2.25424 28.4286 2.75902 28.8506L15.759 39.8506C16.7155 40.6563 17.9392 41.0743 19.1887 41.0223C20.4382 40.9702 21.6229 40.4518 22.509 39.5694C33.279 28.7763 40.9456 20.1556 51.509 9.56938C52.2345 8.86814 52.731 7.96385 52.933 6.97527C53.1351 5.98669 53.0333 4.96008 52.6412 4.03038C52.249 3.10069 51.5848 2.31137 50.7357 1.76616C49.8867 1.22095 48.8926 0.945408 47.884 0.975634V0.975634Z" />
                </svg>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
