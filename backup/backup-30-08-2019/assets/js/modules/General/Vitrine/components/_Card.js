"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _propTypes=require("prop-types"),_propTypes2=_interopRequireDefault(_propTypes);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var Input=function(e){var t=e.label,r=e.text,p=e.type,a=e.id,u=e.value,i=e.handleChange;return React.createElement("div",{className:"form-group"},React.createElement("label",{htmlFor:t},r),React.createElement("input",{type:p,className:"form-control",id:a,value:u,onChange:i,required:!0}))},Card=function(e){e.SkuId;return React.createElement("div",{className:""})};Input.propTypes={label:_propTypes2.default.string.isRequired,text:_propTypes2.default.string.isRequired,type:_propTypes2.default.string.isRequired,id:_propTypes2.default.string.isRequired,value:_propTypes2.default.string.isRequired,handleChange:_propTypes2.default.func.isRequired},exports.default=Input;