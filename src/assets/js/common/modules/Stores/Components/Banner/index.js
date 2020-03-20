import React from 'react';
import { Info, Wave } from './_svg';
import InfoContent from './_info';
// import Breadcrumbs from '../../../General/Breadcrumbs';

const Banner = () => {
  return (
    <>
      {/* <Breadcrumbs /> */}
      <section className="bannerContainer">
        <div className="bannerContainer__left">
          <h1 className="title">Para ficarmos perto, mesmo que de longe</h1>
          <p className="content">
            Escolha sua loja preferida para ganhar <strong>10% de desconto + frete grátis</strong> e
            parte das vendas será repassada para a loja selecionada!
          </p>
        </div>
        <div className="bannerContainer__right">
          <img className="bannerOver" src="/arquivos/NossasLojas-Saude-InfoBG.png" />
          <Info className="banner" />
        </div>
      </section>

      <section className="infosContainer">
        <InfoContent number="1." content="Encontre a sua loja favorita." />
        <InfoContent number="2." content="Copie o cupom de desconto dela." />
        <InfoContent number="3." content="Use seu benefício e ajude nossas lojas." />
        <Wave className="infosContainer__wave" />
      </section>
    </>
  );
};

export default Banner;
