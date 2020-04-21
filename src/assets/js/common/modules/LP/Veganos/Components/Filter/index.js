import React from 'react';
import OrderFilter from './OrderFilter/orderFilter';
import Vitrine from '../../../../General/Vitrine';

const filter = props => {
  // const resizeForSubcategory = () => {
  //     let url = window.location.href.split('/');
  //     let body = document.querySelectorAll(".category")
  //     if(url.length == 6){
  //         body[0].classList.add("subcategory")
  //     }
  //     else if(url.length == 5){
  //         body[0].classList.add("category-new")
  //     }
  // }

  // React.useEffect(() => {
  //     resizeForSubcategory();
  // }, []);

  const handleFilter = department => {
    document.querySelector('.contentProducts').innerHTML = '';
    const Content = document.querySelector('.contentProducts');

    let idCollection = Math.floor(Math.random() * 5000);
    let Collection = document.createElement('div');
    Collection.classList.add('contentProducts__render-collection', 'render-collection', 'shell');
    Collection.setAttribute('id', 'collection' + idCollection);
    Content.appendChild(Collection);

    Vitrine.build(
      idCollection,
      undefined,
      false,
      false,
      `${department}?fq=specificationFilter_114:Sim&O=${props.order}`
    );

    props.handleSmartResearch(false);

    props.handleOrigin(department);
    // !showSmartResearch && handleSmartResearch();
  };
  return (
    <div className="filterContainer">
      <div className="shell">
        <h2 className="section__title">Todos os produtos veganos</h2>
      </div>
      <span className="filters">
        <div className="shell">
          <p className="filters__title">Já sabe o que procura?</p>
          <ul className="filters__list">
            <li className="item" onClick={() => handleFilter('/maquiagem')}>
              <a>Maquiagem</a>
            </li>
            <li className="item" onClick={() => handleFilter('/perfumaria')}>
              <a>Perfumaria</a>
            </li>
          </ul>
        </div>
      </span>

      <div className="shell">
        <OrderFilter
          showSmartResearch={props.showSmartResearch}
          handleSmartResearch={props.handleSmartResearch}
          handleOrder={props.handleOrder}
          handleOrigin={props.handleOrigin}
          origin={props.origin}
        />
      </div>
    </div>
  );
};

export default filter;
