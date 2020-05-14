import React from 'react';
import Vitrine from '../../../General/Vitrine';

export const Recommend = ({ Product }) => {
  const [colRecommend, setcolRecommend] = React.useState([]);

  React.useEffect(() => {
    if (colRecommend.length > 0) {
      Vitrine.build('Recommendations', colRecommend, true, '4.2');
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
        productId: Product.productId
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
      <div className="container">
        <h2 className="chaordicCollection__title">Isso também pode te interessar</h2>
        <div id="collectionRecommendations" className="chaordicCollection__collection"></div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
