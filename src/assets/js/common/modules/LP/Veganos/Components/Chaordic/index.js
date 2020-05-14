import React from 'react';
import Vitrine from '../../../../General/Vitrine';

const TopSell = () => {
  const [colRecommend, setcolRecommend] = React.useState([]);
  const idCollection = Math.floor(Math.random() * 5000);

  React.useEffect(() => {
    if (colRecommend.length > 0) {
      console.log('id' + idCollection);
      Vitrine.build(idCollection, colRecommend, true, '4.2');
    }
  }, [colRecommend]);

  React.useEffect(() => {
    getChaordic();
  }, []);

  const getChaordic = () => {
    let url = new URL('https://recs.chaordicsystems.com/v0/products/recommendations'),
      params = {
        apiKey: 'qdb-vtex',
        secretKey: 'rz4YYCNFlWAnPdogRpLdRw==',
        deviceId: 'dev001',
        productFormat: 'complete',
        type: 'Similar',
        source: window.innerWidth > 992 ? 'desktop' : 'mobile',
        productId: 270
      };

    url.search = new URLSearchParams(params);

    fetch(url, {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .then(col => {
        if (col.displays != undefined) {
          let Collection = [];

          col.displays[0].recommendations.map(p => {
            let Item = {};
            Item.Product = p.id;
            // console.log(p.skus.find(el => el.status == "available"));
            Item.SkuHighlight = p.skus.find(el => el.status == 'available').sku;
            Collection.push(Item);
          });
          setcolRecommend(Collection);
        }
      });
  };

  return colRecommend.length > 0 ? (
    <div className="chaordicCollection recommendations">
      <div className="shell">
        <h2 className="chaordicCollection__title section__title">Mais Vendidos</h2>
        <div id={`collection${idCollection}`} className="chaordicCollection__collection"></div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default TopSell;
