import React from 'react';
import OrderFilter from './OrderFilter/orderFilter';

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

  return (
    <div className="filterContainer">
      <div className="shell">
        <h2 className="section__title">Todos os produtos veganos</h2>
      </div>
      <span className="filters">
        <div className="shell">
          <p className="filters__title">Já sabe o que procura?</p>
          <ul className="filters__list">
            <li className="item">
              <a>Maquiagem</a>
            </li>
            <li className="item">
              <a>Perfumaria</a>
            </li>
            <li className="item">
              <a>Unha</a>
            </li>
          </ul>
        </div>
      </span>

      <div className="shell">
        <OrderFilter
          showSmartResearch={props.showSmartResearch}
          handleSmartResearch={props.handleSmartResearch}
          handleOrder={props.handleOrder}
        />
      </div>
    </div>
  );
};

export default filter;
