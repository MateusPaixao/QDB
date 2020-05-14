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
    <React.Fragment>
      <div className="filterContainer shell">
        <h2 className="title">Pra todos os gostos e bolsos</h2>
        <div className="filterContainer__selection">
          <nav className="filterContainer__selection__options">
            <a href="/busca/?fq=P:[0TO25]&amp;O=OrderByBestDiscountDESC">
              <button data-href="/busca/?&amp;fq=P:[0TO25]">até R$ 25</button>
            </a>

            <a href="/busca/?fq=P:[0TO50]&amp;O=OrderByBestDiscountDESC">
              <button data-href="/busca/?&amp;fq=P:[0TO50]">até R$ 50</button>
            </a>

            <a href="/busca/?fq=P:[0TO75]&amp;O=OrderByBestDiscountDESC">
              <button data-href="/busca/?&amp;fq=P:[0TO75]">até R$ 75</button>
            </a>

            {/* <a href="/busca/?fq=P:[75TO500]&amp;O=OrderByBestDiscountDESC">
              <button data-href="/busca/?&amp;fq=P:[75TO500]&amp;O=OrderByBestDiscountDESC">
                acima de R$ 75
              </button>
            </a> */}
          </nav>
        </div>
        <OrderFilter
          showSmartResearch={props.showSmartResearch}
          handleSmartResearch={props.handleSmartResearch}
          handleOrder={props.handleOrder}
        />
      </div>
    </React.Fragment>
  );
};

export default filter;
