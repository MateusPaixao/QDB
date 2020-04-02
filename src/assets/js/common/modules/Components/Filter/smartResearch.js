import React from 'react';
import Vitrine from '../../General/Vitrine';

const SmartResearch = ({ order, from, show, handleSmartResearch, search }) => {
  const [queryFrom, setFrom] = React.useState(from);

  React.useEffect(() => {
    setFrom(from);
  }, [order]);

  //   let a = setInterval(
  //     document.querySelectorAll('.cardProductContainer')[
  //       document.querySelectorAll('.cardProductContainer').length
  //     ],
  //     500
  //   );

  const showMore = e => {
    setFrom(queryFrom + 23);
    e.classList.add('set--loading');

    const Content = document.querySelector('.contentProducts');

    let idCollection = Math.floor(Math.random() * 5000);
    let Collection = document.createElement('div');
    Collection.classList.add('contentProducts__render-collection', 'render-collection', 'shell');
    Collection.setAttribute('id', 'collection' + idCollection);
    Content.appendChild(Collection);
    e.classList.add('set--loadingMount');
    // console.log(`${window.location.pathname}?O=${order}&_from=${from}&_to=${from + 23}`);
    e.classList.add('set--loaded');

    console.log(document.querySelectorAll('.cardProductContainer'));

    if (document.querySelectorAll('.cardProductContainer') != undefined) {
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
          handleSmartResearch(false);
        } else {
          // Quando menor que 23, eu posso sumir com o botão
        }
      }, 500);
    }

    setTimeout(() => {
      e.classList.remove('set--loading', 'set--loaded', 'set--loadingMount');
      if (show == true) {
        Vitrine.build(
          idCollection,
          undefined,
          false,
          false,
          `?${search}&O=${order}&_from=${queryFrom}&_to=${queryFrom + 23}`
        );
      } else {
        handleSmartResearch(false);
      }
    }, 500);
  };

  return (
    <>
      <div className="contentProducts"></div>
      <button
        onClick={e => showMore(e.currentTarget)}
        className={`contentProducts__smartResearch set--smartResearch ${!show && 'hidden'}`}
      />
    </>
  );
};

export default SmartResearch;
