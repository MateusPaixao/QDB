// import React from "react";
// import PropTypes from "prop-types";

class Card extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Sku: this.props.info.items[0],
      Avaliable: true,
      Hover: false
    };
    
    this.setAvaliable = this.setAvaliable.bind(this);
    this.setDiscount = this.setDiscount.bind(this);
    this.setBeforePrice = this.setBeforePrice.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setAvaliable(){
    let avaliable = true;
    if(this.state.Sku.sellers[0].commertialOffer.AvailableQuantity == 0 || this.state.Sku.sellers[0].commertialOffer.Price == 0 || this.state.Sku.sellers[0].commertialOffer.ListPrice == 0){
      avaliable = false;
    }
    return (
      this.setState({
        Avaliable: avaliable
      }, ()=>{
        console.log(this.state.Avaliable);
      })
    )
  }

  setDiscount(){
    let discount;
    if(this.state.Avaliable == true){
      discount = this.state.Sku.sellers[0].commertialOffer.Price - this.state.Sku.sellers[0].commertialOffer.ListPrice;
      if(discount != 0){
        discount = Math.round(discount * 100 / this.state.Sku.sellers[0].commertialOffer.ListPrice);
      }
    }
    return (
      this.setState({
        Discount: discount
      })
    )
  }

  setBeforePrice(){
    let haveBefore = true;
    if(this.state.Sku.sellers[0].commertialOffer.ListPrice == this.state.Sku.sellers[0].commertialOffer.Price || this.state.Sku.sellers[0].commertialOffer.AvailableQuantity == 0){
      return haveBefore = false;
    }
  }

  toggleHover() {
    this.setState({Hover: !this.state.Hover})
  }

  addToCart(e){
    // e.target.preventDefault();
    e.innerHTML = "Adicionando...";
    e.classList.add("--adding");
    vtexjs.checkout.getOrderForm().then((orderForm) => {
        console.log(orderForm);
        if(!!orderForm.items.length){
            orderForm.items.map((e, i) => {
                if(e.id == this.state.Sku.itemId){
                    let quantity = 1 + e.quantity;
                    let updateItem = {
                        index: i,
                        quantity: quantity
                    };
                    return vtexjs.checkout.updateItems([updateItem]);
                }else{
                    let newitem = {
                        id: this.state.Sku.itemId,
                        quantity: '1',
                        seller: '1'
                    };
                    return vtexjs.checkout.addToCart([newitem]);
                }
            })
        }else{
            let newitem = {
                id: this.state.Sku.itemId,
                quantity: '1',
                seller: '1'
            };
            return vtexjs.checkout.addToCart([newitem]);
        }
    })
    .done(function(orderForm) {
        console.log(orderForm);

        // Legado Minicart
        vtexjs.checkout.getOrderForm().then((orderForm) => {
            window._orderForm = orderForm;
            // document.querySelector('.__cart-link a span').textContent = document.querySelector('.__cart-link a span').textContent++;
            // let qty = 0;

            // Foreach IE Testar
            for(let i = 0; i < orderForm.items.length; i++ ){
              console.log(orderForm.items[i]);
              // if(!orderForm.items.isGift[i]){
              //   qty += orderForm.items.quantity[i];
              // }
            }
            // document.querySelectorAll(orderForm.items).forEach((ndx, item) => {
            //     if (!item.isGift) {
            //         qty += item.quantity;
            //     }
            // });
            // if (isFinite(qty)) {
            //     document.querySelector('.__cart-link a span').textContent = qty;
            // }
        }).done(() => {
            e.innerHTML = '<svg className="cardProduct--addToCart__bag" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z" /></svg><p className="cardProduct--addToCart__cta">Adicionar a Sacola</p>'
            e.classList.remove("--adding");
            $('html').trigger('open.MiniCart'); // Função em Jquery devido ao evento do Minicart em General.
        });
    });
  }

  componentDidMount(){
    this.setDiscount();
    // this.setAvaliable();
  }

  render(){
    String.prototype.allReplace = function(obj) {
      var retStr = this;
      for (var x in obj) {
          retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
      }
      return retStr;
    };
    
    const countRating = () => {
      let stars = [];
      for(let i = 1; i <= this.props.review.Rating; i++){
          stars.push(<svg className="cardProduct__review__rating__ratingHeart" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.605 14.394L0 10.48s2.528-2.836 3.605-3.913l5.014-5.013a5.326 5.326 0 0 1 7.523 0 5.321 5.321 0 0 1 0 7.521l-1.406 1.405 1.406 1.405a5.321 5.321 0 0 1 0 7.521 5.327 5.327 0 0 1-7.523 0l-5.014-5.013z" fill="#67605F"/></svg>)
      }
      return stars;      
    }

    return (
      <div className={"cardProduct avaliable-" + this.state.Avaliable} data-prod={this.props.info.productId} /*onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}*/>
        <span className="cardProduct--change"></span>
        <a href={"/" + this.props.info.linkText + "/p"} className="cardProduct__link">
          <span className="cardProduct__discount">
            {this.state.Discount != 0 &&
              <p className="cardProduct__discount__content">
                {this.state.Discount + "%"}
              </p>
            }
          </span>
          <div className="cardProduct__pictureContainer">
            <div className="cardProduct__pictureContainer__review">
              <ul className="cardProduct__pictureContainer__review__rating">
                {countRating()}
              </ul>
              <span className="cardProduct__pictureContainer__review__qtd">
                Baseado em  <br/>{this.props.review.TotalRatings} avaliações
              </span>
            </div>
            <img className="cardProduct__pictureContainer__picture" src={this.state.Hover == false ? this.state.Sku.images[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "150", "#height#": "150" , "~": ""}) : this.state.Sku.images[1].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "150", "#height#": "150" , "~": ""})} loading="lazy"></img>
          </div>
          <div className="cardProduct__info">
            <p className="cardProduct__info__name">
              {this.props.info.productName}
            </p>
            <svg className="cardProduct__info--favorite" width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1503 3.53732L11.5 3.87959L11.8497 3.53732L13.3914 2.02851C15.4757 -0.0113849 18.8643 -0.00747146 20.9442 2.02806C23.022 4.06158 23.0154 7.36215 20.9437 9.38962L15.4508 14.7654L11.4951 18.3313C11.4434 18.286 11.3866 18.2361 11.3253 18.1823C11.0157 17.9102 10.5906 17.5356 10.1287 17.1249C9.20159 16.3006 8.1373 15.341 7.55654 14.7726L2.05628 9.38962C-0.0153681 7.36215 -0.0219969 4.06158 2.05583 2.02806C4.13571 -0.00747146 7.52425 -0.0113849 9.60859 2.02851L11.1503 3.53732Z" /></svg>
          </div>
          <div className="cardProduct__price">
            <p className={`cardProduct__price__before _before-${this.setBeforePrice()}`}>{"R$" + this.state.Sku.sellers[0].commertialOffer.ListPrice.toFixed(2).toString().replace(".", ",")}</p>
            <p className="cardProduct__price__actual">{"R$" + this.state.Sku.sellers[0].commertialOffer.Price.toFixed(2).toString().replace(".", ",")}</p>
            <p className="cardProduct__price__installment">{"até " + Math.max.apply(Math, this.state.Sku.sellers[0].commertialOffer.Installments.map(function(o) { return o.NumberOfInstallments; })) + "x de R$" + Math.min.apply(Math, this.state.Sku.sellers[0].commertialOffer.Installments.map(function(o) { return o.Value; })).toFixed(2).toString().replace(".", ",") + " sem juros"}</p>
          </div>
        </a>
        {/* <span className="cardProduct--addToCart" onClick={e => this.addToCart(e.currentTarget)}> */}
        <a href={"/" + this.props.info.linkText + "/p"} >
          <span className="cardProduct--addToCart">
            {/* <svg className="cardProduct--addToCart__bag" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z" /></svg> */}
            {/* <p className="cardProduct--addToCart__cta">Adicionar a Sacola</p> */}
            <p className="cardProduct--addToCart__cta">COMPRAR</p>
          </span>
        </a>
      </div>
    );
  }
}

// Card.propTypes = {
//   ProductId: PropTypes.string.isRequired,
//   idSku: PropTypes.string.isRequired,
//   // text: PropTypes.string.isRequired,
//   // type: PropTypes.string.isRequired,
//   // id: PropTypes.string.isRequired,
//   // value: PropTypes.string.isRequired,
//   // handleChange: PropTypes.func.isRequired
// };

export default Card;