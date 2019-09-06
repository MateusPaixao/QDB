
// import React from "react";
// import PropTypes from "prop-types";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const Info = (props) => {
    return (
        <div className="__container">
            <span className="__icon" >{ ReactHtmlParser(props.Icon) }</span>
            <p className="__content">{ ReactHtmlParser(props.Text) }</p>
        </div>
    );
}
export default Info