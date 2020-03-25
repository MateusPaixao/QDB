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
