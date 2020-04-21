import React from 'react';

const Return = () => {
  const [status, setStatus] = React.useState(false);
  const [handle, setHandle] = React.useState('+');

  React.useEffect(() => {
    status == false ? setHandle('+') : setHandle('-');
  }, [status]);

  const handleStatus = () => {
    setStatus(!status);
  };

  return (
    <div className={`info__returnContainer container shell setOpen--${status}`}>
      <h2 className="info__title" onClick={() => handleStatus()}>
        Trocas e devoluções
      </h2>
      <span className="info__handle" onClick={() => handleStatus()}>
        {handle}
      </span>

      <h3 className="info__subtitle">O produto chegou e não era o que você esperava?</h3>
      <p className="info__returnContainer__content">
        Se você se arrepender da compra, a gente troca qual quer produto por outro igual ou de mesmo
        valor em até 7 dias após a entrega.
      </p>
      <p className="info__returnContainer__content">
        Se ele tiver algum defeito aparente, o prazo é de 30 dias, contados da data de entrega. E,
        no caso de defeito não aparente, o prazo é de 30 dias contados da identificação do problema.
      </p>
      <p className="info__returnContainer__content">
        Vale lembrar: as entregas acontecem de segunda a sexta, das 9h às 18h
      </p>
      <p className="info__returnContainer__content">
        Pra trocar, é só <a href="tel:08007266482">ligar</a> ou{' '}
        <a href="/institucional/faleconosco">mandar um e-mail</a> para gente.
      </p>

      <p className="info__returnContainer__content__ctaText">
        Clique no botão abaixo e entre em contato com um atendente. Iremos te auxiliar da melhor
        maneira
      </p>

      <a href="/institucional/atendimento" className="info__returnContainer__content__cta">
        Atendimento
      </a>
    </div>
  );
};

export default Return;
