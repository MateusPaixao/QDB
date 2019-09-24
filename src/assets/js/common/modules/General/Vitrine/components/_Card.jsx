// import PropTypes from "prop-types";

class Card extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Sku: this.props.info.items.find(i => i.itemId == this.props.skuHighlight),
      Avaliable: true,
      haveBefore: false,
      Hover: false,
      openConfig: false
    };
    
    this.setAvaliable = this.setAvaliable.bind(this);
    this.setDiscount = this.setDiscount.bind(this);
    this.setBeforePrice = this.setBeforePrice.bind(this);
    this.setBeforePrice = this.setBeforePrice.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.mountConfig = this.mountConfig.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.openConfig = this.openConfig.bind(this);
  }

  setAvaliable(){
    let avaliable = true;
    if(this.state.Sku.sellers[0].commertialOffer.AvailableQuantity == 0 || this.state.Sku.sellers[0].commertialOffer.Price == 0 || this.state.Sku.sellers[0].commertialOffer.ListPrice == 0){
      avaliable = false;
    }
    return (
      this.setState({
        Avaliable: avaliable
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
    let before;
    if(this.state.Sku.sellers[0].commertialOffer.ListPrice == this.state.Sku.sellers[0].commertialOffer.Price || this.state.Sku.sellers[0].commertialOffer.AvailableQuantity == 0){
      before = false
    }
    return(
      this.setState({
        haveBefore: before
      })
    )
  }

  toggleHover() {
    this.setState({Hover: !this.state.Hover})
  }

  // Configuration of Product
  openConfig(){
    this.setState({
      openConfig: !this.state.openConfig
    })
  }

  mountConfig(){
    const getImgSku = (sku) => {
      let skuImg;
      skuImg = sku.images.filter(o => {
        if(o.imageLabel === "thumb" || o.imageLabel === "Thumb"){
            // console.log(o.imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "50", "#height#": "50" , "~": ""}));
            return o
        }
      })
      if(skuImg.length > 0){
        // return skuImg
        return skuImg[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "40", "#height#": "40" , "~": ""});
      }
    }
    const changeSku = (e) => {
      this.setState({
        Sku: this.props.info.items.find(i => i.itemId == e.dataset.sku)
      }, () => {
        // let listItem = document.querySelectorAll(".cardProduct__config__list");
        this.openConfig();
        e.parentElement.querySelector(".cardProduct__config__list__item.selected").classList.remove("selected");
        for(let i = 0; i < e.parentElement.querySelectorAll(".cardProduct__config__list__item").length; i++){
          let item = e.parentElement.querySelectorAll(".cardProduct__config__list__item")[i];
          item.dataset.sku == this.state.Sku.itemId ? item.classList.add("selected") : "";
        }
      })
    }
    return(
      <div className="cardProduct__config">
        <div className="cardProduct__config__type">
          <span className="cardProduct__config__type__colors"></span>
          <p className="cardProduct__config__type__title">Cor</p>
        </div>
        <ul className="cardProduct__config__list">
        {
          this.props.info.items.map(sku => 
            <li className={`cardProduct__config__list__item ${sku.itemId == this.props.skuHighlight ? "selected" : ""}`} data-name={sku["Escolha a Cor"]} data-sku={sku.itemId} onClick={e => changeSku(e.currentTarget)}>
              {/* {console.log()} */}
              {/* {console.log(sku.images.filter(o => { if(o.imageLabel === "thumb" || o.imageLabel === "Thumb"){ return o }}))[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "50", "#height#": "50" , "~": ""})} */}
              <img className={`${sku.itemId == this.props.skuHighlight ? "selected" : ""}`} data-src={getImgSku(sku)} alt={sku["Escolha a Cor"]} />
              <small>{sku["Escolha a Cor"]}</small>
            </li>
          )
        }
        </ul>
        {/* <div className="cardProduct__config__type">
          <span className="cardProduct__config__type__bulk"></span>
          <p className="cardProduct__config__type__title">Volume</p>
        </div> */}
      </div>
    )
  }

  addToCart(e){
    // e.target.preventDefault();
    e.innerHTML = '<div class="status--adding__text">ADICIONANDO</div><span class="status--adding__dots"></span>';
    e.classList.add("status--request");
    setTimeout(() => {
      e.classList.add("status--adding");
    }, 1000);
    // vtexjs.checkout.getOrderForm().then((orderForm) => {
    //     console.log(orderForm);
    //     if(!!orderForm.items.length){
    //         orderForm.items.map((e, i) => {
    //             if(e.id == this.state.Sku.itemId){
    //                 let quantity = 1 + e.quantity;
    //                 let updateItem = {
    //                     index: i,
    //                     quantity: quantity
    //                 };
    //                 return vtexjs.checkout.updateItems([updateItem]);
    //             }else{
    //                 let newitem = {
    //                     id: this.state.Sku.itemId,
    //                     quantity: '1',
    //                     seller: '1'
    //                 };
    //                 return vtexjs.checkout.addToCart([newitem]);
    //             }
    //         })
    //     }else{
    //         let newitem = {
    //             id: this.state.Sku.itemId,
    //             quantity: '1',
    //             seller: '1'
    //         };
    //         return vtexjs.checkout.addToCart([newitem]);
    //     }
    // })
    // .done(function(orderForm) {
    //     console.log(orderForm);

    //     // Legado Minicart
    //     vtexjs.checkout.getOrderForm().then((orderForm) => {
    //         window._orderForm = orderForm;
    //         // document.querySelector('.__cart-link a span').textContent = document.querySelector('.__cart-link a span').textContent++;
    //         // let qty = 0;

    //         // Foreach IE Testar
    //         for(let i = 0; i < orderForm.items.length; i++ ){
    //           console.log(orderForm.items[i]);
    //           // if(!orderForm.items.isGift[i]){
    //           //   qty += orderForm.items.quantity[i];
    //           // }
    //         }
    //         // document.querySelectorAll(orderForm.items).forEach((ndx, item) => {
    //         //     if (!item.isGift) {
    //         //         qty += item.quantity;
    //         //     }
    //         // });
    //         // if (isFinite(qty)) {
    //         //     document.querySelector('.__cart-link a span').textContent = qty;
    //         // }
    //     }).done(() => {
    //         e.innerHTML = '<svg className="cardProduct--addToCart__bag" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z" /></svg><p className="cardProduct--addToCart__cta">Adicionar a Sacola</p>'
    //         e.classList.remove("adding");
    //         $('html').trigger('open.MiniCart'); // Função em Jquery devido ao evento do Minicart em General.
    //     });
    // });
  }

  componentDidMount(){
    this.setDiscount();
    this.setBeforePrice();
    this.setAvaliable();
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
      <div className={`cardProduct avaliable-${this.state.Avaliable} change-${this.state.openConfig}`} data-prod={this.props.info.productId} /*onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}*/>
        <span className={`cardProduct--change`} onClick={e => this.openConfig(e)}>
          <svg className="cardProduct--change__engine" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.9753 18.1459L23.3748 17.0566C23.6185 16.2054 23.7352 15.3359 23.7129 14.4688L25.5673 13.8311C25.8072 13.7492 25.9298 13.4893 25.8688 13.2612L25.1283 10.4917C25.0673 10.2636 24.8316 10.0999 24.5829 10.1492L22.6588 10.5262C22.2456 9.76413 21.7108 9.0696 21.075 8.45457L21.9176 6.70916C22.0162 6.49059 21.9585 6.20926 21.7314 6.07816L19.2543 4.648C19.0272 4.51691 18.7667 4.58689 18.6148 4.80229L17.5245 6.40468C16.674 6.16162 15.8051 6.04573 14.9385 6.06891L14.3029 4.21407C14.2213 3.97407 13.9617 3.85172 13.7337 3.91295L10.9649 4.65648C10.7369 4.71771 10.5731 4.95378 10.6221 5.20253L10.9971 7.12736C10.235 7.54154 9.54034 8.07732 8.92503 8.71401L7.1814 7.87265C6.96305 7.77413 6.68182 7.83219 6.55057 8.05951L5.11883 10.5394C4.98759 10.7667 5.05728 11.0274 5.27241 11.1791L6.89351 12.2804C6.64977 13.1316 6.53311 14.0011 6.55545 14.8681L4.70102 15.5058C4.46107 15.5877 4.33854 15.8476 4.39952 16.0757L5.13998 18.8453C5.20096 19.0734 5.43674 19.2371 5.6854 19.1878L7.60952 18.8107C8.02274 19.5728 8.55755 20.2674 9.1933 20.8824L8.3388 22.6485C8.24013 22.867 8.29789 23.1484 8.52496 23.2795L11.0021 24.7096C11.2291 24.8407 11.4897 24.7707 11.6416 24.5553L12.7438 22.9323C13.5943 23.1753 14.4632 23.2912 15.3298 23.268L15.9654 25.1229C16.047 25.3629 16.2947 25.5059 16.5346 25.424L19.3034 24.6805C19.5314 24.6192 19.6952 24.3832 19.6462 24.1344L19.2712 22.2096C20.0333 21.7954 20.728 21.2596 21.3433 20.623L23.1075 21.4762C23.3259 21.5747 23.6071 21.5167 23.7384 21.2894L25.1701 18.8095C25.2601 18.5584 25.1904 18.2977 24.9753 18.1459ZM23.0981 20.3962L21.4283 19.5699C21.2306 19.4833 21.0145 19.5239 20.8658 19.686C20.2115 20.438 19.4159 21.0532 18.5236 21.5024C18.3249 21.6081 18.2382 21.806 18.2785 22.0222L18.6273 23.8493L16.7381 24.3566L16.1286 22.5995C16.0557 22.3921 15.8612 22.2523 15.6571 22.2722C14.6602 22.3303 13.6642 22.1962 12.7224 21.8729C12.5128 21.807 12.3054 21.8801 12.1774 22.0542L11.0784 23.624L9.36506 22.6348L10.1925 20.9633C10.2792 20.7654 10.2389 20.5492 10.077 20.4006C9.32607 19.7467 8.71191 18.9512 8.26384 18.0588C8.179 17.872 7.96064 17.7735 7.74455 17.8141L5.91816 18.1649L5.4129 16.275L7.16961 15.6636C7.37698 15.5904 7.51693 15.3957 7.49724 15.1915C7.44005 14.1941 7.57509 13.1974 7.87849 12.2429C7.94458 12.033 7.87167 11.8256 7.69782 11.6977L6.17122 10.6234L7.16151 8.90821L8.83128 9.73448C9.029 9.82108 9.24508 9.78051 9.39375 9.61836C10.0481 8.86642 10.8437 8.25116 11.7567 7.8139C11.9553 7.70817 12.0421 7.51026 12.0017 7.29409L11.6529 5.46702L13.5422 4.95967L14.1516 6.71676C14.2245 6.92418 14.419 7.06402 14.6232 7.04412C15.6201 6.98595 16.616 7.1201 17.5697 7.42275C17.7794 7.48868 17.9868 7.41553 18.1148 7.24146L19.1693 5.70106L20.8826 6.69025L20.0552 8.36175C19.9684 8.55965 20.0088 8.77582 20.1707 8.92441C20.9216 9.57837 21.5358 10.3738 21.9719 11.2869C22.0774 11.4856 22.2751 11.5722 22.4912 11.5316L24.3176 11.1808L24.8228 13.0707L23.0661 13.6821C22.8588 13.7553 22.7188 13.95 22.7385 14.1543C22.7957 15.1517 22.6606 16.1483 22.3366 17.0909C22.2705 17.3007 22.3434 17.5082 22.5173 17.6361L24.0677 18.669L23.0774 20.3843L23.0981 20.3962ZM18.2259 9.28951C15.2741 7.58524 11.4629 8.6087 9.75678 11.5639C8.05062 14.519 9.06984 18.3313 12.0217 20.0355C14.9736 21.7398 18.7847 20.7163 20.4909 17.7612C22.197 14.806 21.1778 10.9938 18.2259 9.28951ZM12.499 19.2089C10.0012 17.7668 9.13881 14.5411 10.5825 12.0406C12.0262 9.54005 15.2509 8.67406 17.7487 10.1161C20.2464 11.5582 21.1089 14.784 19.6652 17.2845C18.2215 19.785 14.9967 20.651 12.499 19.2089Z" /></svg>
          <p className="cardProduct--change__title">Configurar Produto</p>
          <p className="cardProduct--change__close"><svg width="16" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.354 4.354a.5.5 0 0 0 0-.708L12.172.464a.5.5 0 1 0-.708.708L14.293 4l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182zM0 4.5h15v-1H0v1z" fill="#342E37"/></svg></p>
        </span>
        {this.mountConfig()}
        <a href={"/" + this.props.info.linkText + "/p?idsku=" + this.state.Sku.itemId} className="cardProduct__link">
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
            <img className="cardProduct__pictureContainer__picture" src={this.state.Sku.images[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "150", "#height#": "150" , "~": ""})} loading="lazy"></img>
          </div>
          <div className="cardProduct__info">
            <p className="cardProduct__info__name">
              {this.state.Sku.name}
            </p>
            <svg className="cardProduct__info--favorite" width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1503 3.53732L11.5 3.87959L11.8497 3.53732L13.3914 2.02851C15.4757 -0.0113849 18.8643 -0.00747146 20.9442 2.02806C23.022 4.06158 23.0154 7.36215 20.9437 9.38962L15.4508 14.7654L11.4951 18.3313C11.4434 18.286 11.3866 18.2361 11.3253 18.1823C11.0157 17.9102 10.5906 17.5356 10.1287 17.1249C9.20159 16.3006 8.1373 15.341 7.55654 14.7726L2.05628 9.38962C-0.0153681 7.36215 -0.0219969 4.06158 2.05583 2.02806C4.13571 -0.00747146 7.52425 -0.0113849 9.60859 2.02851L11.1503 3.53732Z" /></svg>
          </div>
          <div className="cardProduct__price">
            <p className={"cardProduct__price__before"}>
            {
              this.state.haveBefore != false &&
              "R$" + this.state.Sku.sellers[0].commertialOffer.ListPrice.toFixed(2).toString().replace(".", ",")
            }
            </p>
            <p className="cardProduct__price__actual">{"R$" + this.state.Sku.sellers[0].commertialOffer.Price.toFixed(2).toString().replace(".", ",")}</p>
            <p className="cardProduct__price__installment">{"até " + Math.max.apply(Math, this.state.Sku.sellers[0].commertialOffer.Installments.map(function(o) { return o.NumberOfInstallments; })) + "x de R$" + Math.min.apply(Math, this.state.Sku.sellers[0].commertialOffer.Installments.map(function(o) { return o.Value; })).toFixed(2).toString().replace(".", ",") + " sem juros"}</p>
          </div>
        </a>
        {/* <a href={"/" + this.props.info.linkText + "/p?idsku=" + this.state.Sku.itemId} className="cardProduct__link"> */}
          {/* <span className="cardProduct--addToCart"> */}
          <span className="cardProduct--addToCart" onClick={e => this.addToCart(e.currentTarget)}>
              <svg className="cardProduct--addToCart__bag" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z" /></svg>
              <p className="cardProduct--addToCart__cta">Adicionar à Sacola</p>
          </span>
        {/* </a> */}
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