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
              Frida Kahlo
              <img src="/arquivos/lp-frida-about.jpg" />
            </a>
          </strong>
          A inspiração dessa coleção
        </h2> */}
        <h2 className="title">
          <picture>
            <source media="(min-width: 768px)" srcSet="/arquivos/lp-frida-about-desk.jpg" />
            <img
              className="banner"
              src="/arquivos/lp-frida-about-mob.png"
              alt="Frida Kahlo - Edição Limitada Coleção"
            />
          </picture>
        </h2>
        <p className="content">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum. ecimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker
          including verlorem ipsum loremrekkikreikr loremre sions of Lorem Ipsum.
        </p>
      </div>
      {/* <HoverEffect /> */}
    </div>
  );
};

export default About;
