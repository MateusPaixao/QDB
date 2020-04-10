import React from 'react';

const Banner = () => (
  <picture>
    <source media="(min-width: 768px)" srcSet="/arquivos/lp-frida-banner.png" />
    <img
      className="banner"
      src="/arquivos/lp-frida-banner-m.jpg"
      alt="Frida Kahlo - Edição Limitada Coleção"
    />
  </picture>
);

export default Banner;
