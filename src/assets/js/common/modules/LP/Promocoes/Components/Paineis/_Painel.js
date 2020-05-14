// import React from "react";
// import PropTypes from "prop-types";
import React from 'react';

const Banner = props => {
  return (
    <a className="paineisBeleza__link" dataid="painel" href={props.Url}>
      <img className="paineisBeleza__img" src={props.Src} loading="lazy" />
    </a>
  );
};
export default Banner;
