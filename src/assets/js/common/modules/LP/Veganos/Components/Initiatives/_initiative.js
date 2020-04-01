import React from 'react';

const Initiative = ({ img, title, url }) => (
  <div className="initiative">
    <img src={img} className="initiative__img" />
    <h3 className="initiative__title">{title}</h3>
    <a href={url} className="initiative__link">
      Conhecer
    </a>
  </div>
);

export default Initiative;
