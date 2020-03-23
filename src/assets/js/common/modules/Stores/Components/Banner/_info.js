import React from 'react';

const InfoContent = ({ number, content }) => (
  <div className="infosContainer__infos">
    <div className="number">{number}</div>
    <div className="content">{content}</div>
  </div>
);

export default InfoContent;
