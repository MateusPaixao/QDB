// import General from "../../../General/general-index"
// import React from 'react';
import React from 'react';
import Vitrine from '../../../../General/Vitrine';

const Chaordic = () => {
  const [colRecommend, setcolRecommend] = React.useState([]);
  const [colTitle, setcolTitle] = React.useState('');

  React.useEffect(() => {
    if (colRecommend.length > 0) {
      Vitrine.build('Chaordic', colRecommend, true, '4.2');
    }
  }, [colRecommend]);

  React.useEffect(() => {
    getChaordic();
  }, []);

  const getChaordic = () => {
    let url = new URL('https://recs.chaordicsystems.com/v0/pages/recommendations'),
      params = {
        apiKey: 'qdb-vtex',
        secretKey: 'rz4YYCNFlWAnPdogRpLdRw==',
        deviceId: 'dev001',
        productFormat: 'complete',
        source: window.innerWidth > 992 ? 'desktop' : 'mobile',
        name: 'other'
      };

    url.search = new URLSearchParams(params);

    fetch(url, {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .then(col => {
        if (col.top[0].displays != undefined) {
          let Collection = [];

          col.top[0].displays[0].recommendations.map(p => {
            let Item = {};
            Item.Product = p.id;
            // console.log(p.skus.find(el => el.status == "available"));
            Item.SkuHighlight = p.skus.find(el => el.status == 'available').sku;
            Collection.push(Item);
          });
          setcolRecommend(Collection);
          setcolTitle(col.top[0].title);
        }
      });
  };

  return colRecommend.length > 0 ? (
    <div className="chaordicCollection recommendations">
      <div className="container">
        <h2 className="chaordicCollection__title">{colTitle}</h2>
        <div id="collectionChaordic" className="chaordicCollection__collection"></div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Chaordic;

// const Methods = {
//   init() {
//     Methods.buildVitrines();
//   },
//   buildVitrines() {
//     let idCollection = Math.floor(Math.random() * 5000),
//       Placeholder = document.querySelector('.promo__topProducts .promo__collectionPlaceholder'),
//       Collection = [],
//       url = new URL('https://recs.chaordicsystems.com/v0/pages/recommendations'),
//       params = {
//         apiKey: 'qdb-vtex',
//         secretKey: 'rz4YYCNFlWAnPdogRpLdRw==',
//         deviceId: 'dev001',
//         productFormat: 'complete',
//         source: window.innerWidth > 992 ? 'desktop' : 'mobile',
//         name: 'other'
//       };

//     url.search = new URLSearchParams(params);

//     fetch(url, {
//       method: 'GET'
//     })
//       .then(response => {
//         return response.json();
//       })
//       .then(col => {
//         console.log(col);
//         col.top[0].displays[0].recommendations.map(p => {
//           let Item = {};
//           Item.Product = p.id;
//           // console.log(p.skus.find(el => el.status == "available"));
//           Item.SkuHighlight = p.skus.find(el => el.status == 'available').sku;
//           Collection.push(Item);
//         });
//         document.querySelector('.topProducts__title').textContent = col.top[0].title;
//         // console.log(Collection);

//         Placeholder.innerHTML = '';
//         let Col = 'collection' + idCollection;
//         Placeholder.nextSibling.setAttribute('id', Col);

//         Vitrine.build(idCollection, Collection, true, '4.2');
//       });
//   }
// };

// export default {
//   init: Methods.init
// };
