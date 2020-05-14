// import React from "react";
// import PropTypes from "prop-types";
import React from "react";

const Banner = props => {
    return (
        <a className="bannerHero__link" dataid="banner" href={props.Url}>
            <img
                className="bannerHero__img"
                data-src={props.Src}
                loading="lazy"
            />
        </a>
    );
};
export default Banner;
