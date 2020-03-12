// import React from "react";
// import PropTypes from "prop-types";
import React from 'react';
// Fix
const Banner = props => {
  return (
    <a className="bannerHero__link" href={props.Url}>
      <img className="bannerHero__img" src={props.Src} loading="lazy" />
    </a>
  );
};
export default Banner;