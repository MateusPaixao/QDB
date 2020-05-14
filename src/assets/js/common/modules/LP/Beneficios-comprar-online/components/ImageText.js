import React from 'react';

const ImageText = props => {
  return (
    <div className="container-a">
      <p className="container__number">{props.number}</p>
      <div className="container__text">
        <h2 className="container__text-title">{props.title}</h2>
        <p className="container__text-p">{props.text}</p>
        <a className={'content__link ' + props.class} href={props.link}>
          {props.more}
        </a>
      </div>
    </div>
  );
};

export default ImageText;
