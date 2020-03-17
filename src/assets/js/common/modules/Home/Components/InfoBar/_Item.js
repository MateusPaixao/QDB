// import PropTypes from "prop-types";
// import ReactHtmlParser from 'react-html-parser';

const Info = (props) => {
    return (
        <div
            // onMouseOver={() =>props.onMouseOver()} 
            onClick={() => props.onClick ? props.onClick() : ''} className="__container"
        >
            <span className="__icon" ></span>
            <p className="__content"></p>
            <p className="__contentMobile"></p>
        </div>
    );
}
export default Info