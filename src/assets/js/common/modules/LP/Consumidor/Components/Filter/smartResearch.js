import React from 'react';
import Vitrine from '../../../../General/Vitrine';

// Fix
const SmartResearch = ({ order, from, show, handleSmartResearch }) => {
  const [queryFrom, setFrom] = React.useState(from);

  React.useEffect(() => {
    setFrom(from);
  }, [order]);

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
    console.log(`${window.location.pathname}?O=${order}&_from=${from}&_to=${from + 23}`);
    Vitrine.build(
      idCollection,
      undefined,
      false,
      false,
      `?fq=H:303&O=${order}&_from=${queryFrom}&_to=${queryFrom + 23}`
    );

    e.classList.add('set--loaded');
    setTimeout(() => {
      e.classList.remove('set--loading', 'set--loaded', 'set--loadingMount');
      document.querySelectorAll('.cardProductContainer')[
        document.querySelectorAll('.cardProductContainer').length
      ] == undefined ||
      document.querySelectorAll('.cardProductContainer')[
        document.querySelectorAll('.cardProductContainer').length
      ].childElementCount < 23
        ? handleSmartResearch()
        : '';
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
