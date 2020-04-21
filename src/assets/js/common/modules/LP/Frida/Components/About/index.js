import React from 'react';
// import HoverEffect from './hover';

const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutContainer__banner"></div>
      <div className="aboutContainer__content">
        {/* <h2 className="title">
          <strong className="highlight">
            <a className="highlight__link" href="#">
              Frida Kahlo (1907-1954)
              <img src="/arquivos/lp-frida-about.jpg" />
            </a>
          </strong>
        </h2> */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/arquivos/lp-frida-about-desk.jpg" />
          <img
            className="banner"
            src="/arquivos/lp-frida-about-mob.png"
            alt="Frida Kahlo - Edição Limitada Coleção"
          />
        </picture>
        <p className="content">
          <h2 className="title">Por que essa coleção foi inspirada na Frida Kahlo?</h2>
          Frida Kahlo foi uma artista mexicana conhecida por seus autorretratos e fotografias. Frida
          faz de sua história, inspiração. Decidimos homenageá-la, para homenagear também todas as
          mulheres que, assim como Frida, acreditam na liberdade de poder ser quem é.
        </p>
      </div>
      {/* <HoverEffect /> */}
    </div>
  );
};

export default About;
