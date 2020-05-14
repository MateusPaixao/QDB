import React from 'react';
import ReactDOM from 'react-dom';
import Vitrine from '../../../General/Vitrine/';
import Banner from './_Banner';

const Methods = {
  init() {
    Methods.getInfoVitrines();
    Methods.buildVitrines();
  },

  getInfoVitrines() {
    for (let i = 0; i < document.querySelectorAll('.bannerCollectionHidden').length; i++) {
      console.log(`render--collectionInfo${i + 1}`);
      ReactDOM.render(
        <Banner pos={i} />,
        document.getElementById(`render--collectionInfo${i + 1}`)
      );
    }
  },

  buildVitrines() {
    let Placeholders = document.querySelectorAll('.bannerCollection .collectionPlaceholder');

    for (let p = 0; p < Placeholders.length; p++) {
      let idCollection = Math.floor(Math.random() * 5000),
        Collection = [],
        Item = {},
        Content = Placeholders[p].querySelectorAll('.vitrine-content');

      for (let i = 0; i < Content.length; i++) {
        Item.Product = Content[i].dataset.productid;
        Item.SkuHighlight = Content[i].dataset.sku;
        Collection.push(Item);
        Item = {};
      }

      Placeholders[p].nextSibling.setAttribute('id', 'collection' + idCollection);
      Vitrine.build(idCollection, Collection, true, '2.2');
    }
  }
};

export default {
  init: Methods.init
};
