import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const Description = ({ Product }) => {
  const [status, setStatus] = React.useState(false);
  const [handle, setHandle] = React.useState('+');

  React.useEffect(() => {
    status == false ? setHandle('+') : setHandle('-');
  }, [status]);

  const handleStatus = () => {
    setStatus(!status);
  };

  return (
    <div className={`info__descriptionContainer container setOpen--${status}`}>
      <h2 className="info__title" onClick={() => handleStatus()}>
        Descrição do produto
      </h2>
      <span className="info__handle" onClick={() => handleStatus()}>
        {handle}
      </span>
      <div className={`info__item info__description`}>
        <span className=" info__item__content">{ReactHtmlParser(Product.description)}</span>
      </div>
      <div className={`info__item info__howtouse`}>
        <p className=" info__item__title">Modo de Usar</p>
        <p className=" info__item__content">{ReactHtmlParser(Product['Modo de Uso'])}</p>
      </div>
      <div className={` info__item info__whywelove`}>
        <p className="info__item__content">{ReactHtmlParser(Product['porque a gente ama'])}</p>
      </div>
      <div className="info__item info__cautions">
        <p className=" info__item__title">Precauções de Uso</p>
        <p className="info__item__content">{ReactHtmlParser(Product['Precauções de Uso'])}</p>
      </div>
      <div className="info__item info__datasheet">
        <p className=" info__item__title">Ficha Técnica</p>
        <p className=" info__item__content">{ReactHtmlParser(Product['Ficha Técnica'])}</p>
      </div>
    </div>
  );
};

export default Description;
