import React from 'react';
import Vitrine from '../../../General/Vitrine';

const SmartResearch = ({ order, from, show, handleSmartResearch }) => {
  const [queryFrom, setFrom] = React.useState(from);

  React.useEffect(() => {
    setFrom(from);
  }, [order]);

  // let a = setInterval((
  //     document.querySelectorAll(".cardProductContainer")[document.querySelectorAll(".cardProductContainer").length]
  // ), 500)

  const showMore = e => {
    setFrom(queryFrom + 23);
    e.classList.add('set--loading');

    const Content = document.querySelector('.contentProducts');

    let idCollection = Math.floor(Math.random() * 5000);
    let Collection = document.createElement('div');
    Collection.classList.add('contentProducts__render-collection', 'render-collection');
    Collection.setAttribute('id', 'collection' + idCollection);
    Content.appendChild(Collection);
    e.classList.add('set--loadingMount');
    // console.log(`${window.location.pathname}?O=${order}&_from=${from}&_to=${from + 23}`);
    console.log(
      'TAmanho => ',
      document.querySelectorAll('.cardProductContainer')[
        document.querySelectorAll('.cardProductContainer').length - 1
      ].childElementCount
    );
    e.classList.add('set--loaded');

    let refreshButton = setInterval(() => {
      if (
        document.querySelectorAll('.cardProductContainer')[
          document.querySelectorAll('.cardProductContainer').length - 1
        ].childElementCount > 0 &&
        document.querySelectorAll('.cardProductContainer')[
          document.querySelectorAll('.cardProductContainer').length - 1
        ].childElementCount < 23
      ) {
        clearInterval(refreshButton);
        handleSmartResearch();
      } else {
        // Quando menor que 23, eu posso sumir com o botão
      }
    }, 500);

    setTimeout(() => {
      e.classList.remove('set--loading', 'set--loaded', 'set--loadingMount');
      if (window.showSmartResearch == undefined || window.showSmartResearch == true) {
        Vitrine.build(
          idCollection,
          undefined,
          false,
          false,
          `${window.location.pathname}?O=${order}&_from=${queryFrom}&_to=${queryFrom + 23}`
        );
      } else {
        console.log('AQUI VEM');
        handleSmartResearch();
      }
    }, 500);
  };

  return (
    <React.Fragment>
      <div className="contentProducts"></div>
      <button
        onClick={e => showMore(e.currentTarget)}
        className={`contentProducts__smartResearch set--smartResearch ${!show && 'hidden'}`}
      />
    </React.Fragment>
  );
};

export default SmartResearch;