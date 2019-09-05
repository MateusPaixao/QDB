
// import React from "react";
// import PropTypes from "prop-types";

class Banner extends React.Component{
    constructor(props) {
      super(props);
    }
    render(){
      return (
        <a className="bannerHero__link" href={this.props.Url} key={i}>
            <img className="bannerHero__img" src={this.props.Src} loading="lazy" />
        </a>
      );
    }
  }
export default Banner