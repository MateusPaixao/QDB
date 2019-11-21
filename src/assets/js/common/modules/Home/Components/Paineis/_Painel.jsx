
// import React from "react";
// import PropTypes from "prop-types";

const Banner = (props) => {
    return (
      <a className="paineisBeleza__link" href={props.Url} >
          <img className="paineisBeleza__img" data-src={props.Src} loading="lazy" />
      </a>
    );
}
export default Banner