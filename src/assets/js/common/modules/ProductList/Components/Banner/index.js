import React from 'react';

const Banner = () => {
  let bannerCategoriaTopo = document.querySelector('.bannerCategoriaTopo').textContent;
  let bannerCategoriaTitulo = document.querySelector('.tituloCategoria').textContent;
  let bannerCategoriaDescricao = document.querySelector('.descricaoCategoria').textContent;

  return (
    <div className="category_banner_wrapper">
      <div className="category_banner shell">
        <div className="box-banner">
          <a>
            <img
              src={bannerCategoriaTopo.substring(
                bannerCategoriaTopo.lastIndexOf('src') + 5,
                bannerCategoriaTopo.lastIndexOf('?')
              )}
            />
          </a>
        </div>

        <div className="category_banner_texto">
          <h1 className="content__title">
            {bannerCategoriaTitulo.substring(
              bannerCategoriaTitulo.lastIndexOf('"<h2>') + 5,
              bannerCategoriaTitulo.lastIndexOf('</h2>')
            )}
          </h1>

          <p className="content__text">
            {bannerCategoriaDescricao.substring(
              bannerCategoriaDescricao.lastIndexOf('"<p>') + 4,
              bannerCategoriaDescricao.lastIndexOf('</p>')
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
