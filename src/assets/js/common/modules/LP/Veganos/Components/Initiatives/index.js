import React from 'react';
import Initiative from './_initiative';

const Initiatives = () => {
  return (
    <div className="containerInit shell">
      <h2 className="containerInit__title section__title">
        Conheça nossas outras iniciativas sustentáveis
      </h2>
      <div className="initiativesContainer">
        <Initiative
          img="/arquivos/produtos__veganos__recicla-min.png"
          title="Recicla quem disse, berenice?"
          url="/recicla"
        />
        <Initiative
          img="/arquivos/produtos__veganos__sustentabilidade-min.png"
          title="Sustentabilidade"
          url="/sustentabilidade"
        />
      </div>
    </div>
  );
};

export default Initiatives;
