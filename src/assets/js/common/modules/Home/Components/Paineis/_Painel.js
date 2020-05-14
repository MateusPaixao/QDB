
import React from "react";
// import PropTypes from "prop-types";
import { slugify } from '../../../../global/global-index'

const Banner = ({ Url, Src, Alt, Index }) => {
  let onPromoClick = () => {
    return null;
  };

  if (Alt.replace(/[^0-9]/g, '') != "" || Alt.replace(/[^0-9]/g, '') != null) {
    onPromoClick = (e) => {
      e.preventDefault();
      // if(e.button == 0 || e.button == 1 || e.button == 2){
      dataLayer.push({
        'event': 'promotionClick',
        'eventCategory': 'enhanced-ecommerce',
        'eventAction': 'promotion-click',
        'eventLabel': '',
        'ecommerce': {
          'promoClick': {
            'promotions': [{
              'id': Src.match(/ids\/(.*)\//)[1],
              'name': slugify(Alt),
              'creative': 'body',
              'position': Index
            }]
          }
        },
        'eventCallback': function () {
          console.log(dataLayer);
          window.location = Url;
        }
      });
      // }
    }
  }

  return (
    <a className="paineisBeleza__link"
      href={Url}
      onClick={(e) => onPromoClick(e)}
      onContextMenu={(e) => onPromoClick(e)}
    >
      <img className="paineisBeleza__img" data-src={Src} alt={Alt} loading="lazy" />
    </a>
  );
}
export default Banner