import React from 'react';
// Fix
const Banner = () => {
  let bannerTopo = document.querySelector('.bannerTopo').textContent;
  let bannerTitulo = document.querySelector('.titulo').textContent;
  let bannerDescricao = document.querySelector('.descricao').textContent;

  return (
    <div className="banner">
      <div className="box-banner">
        <a>
          <img
            src={bannerTopo.substring(
              bannerTopo.lastIndexOf('src') + 5,
              bannerTopo.lastIndexOf('?')
            )}
          />
        </a>
      </div>
      <div className="content">
        <h1 className="content__title">
          {bannerTitulo.substring(
            bannerTitulo.lastIndexOf('"<h2>') + 5,
            bannerTitulo.lastIndexOf('</h2>')
          )}
        </h1>

        <p className="content__text">
          {bannerDescricao.substring(
            bannerDescricao.lastIndexOf('"<p>') + 4,
            bannerDescricao.lastIndexOf('</p>')
          )}
        </p>
      </div>
    </div>
  );
};

export default Banner;
