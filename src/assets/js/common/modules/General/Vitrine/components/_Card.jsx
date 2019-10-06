// import PropTypes from "prop-types";

class Card extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Sku: this.props.info.items.find(i => i.itemId == this.props.skuHighlight),
      SelectedSkuThumb: "",
      FreeShipping: "notSet",
      clusterHighlights: Object.entries(this.props.info.clusterHighlights).length === 0 && this.props.info.clusterHighlights.constructor === Object ? {} : this.props.info.clusterHighlights,
      Avaliable: true,
      haveBefore: false,
      Hover: false,
      openConfig: false,
      Qty: 1
    };
    
    this.setAvaliable = this.setAvaliable.bind(this);
    this.setDiscount = this.setDiscount.bind(this);
    this.setBeforePrice = this.setBeforePrice.bind(this);
    this.setBeforePrice = this.setBeforePrice.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.mountConfig = this.mountConfig.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.openConfig = this.openConfig.bind(this);
    this.getImgSku = this.getImgSku.bind(this);
  }

  setAvaliable(){
    // Move Unavaliable to End
    // let item = document.querySelectorAll(`cardProduct-${this.props.info.productId} .cardProduct__config__list.__color .cardProduct__config__list__item`);
    // for(let i = 0; i < item.length; i++){      
    //   if(item[i].classList.contains("set--avaliable-false")){
    //     item[i].parentNode.appendChild(item[i]);
    //   }
    // }
    let avaliable = true;
    if(this.state.Sku.sellers[0].commertialOffer.AvailableQuantity == 0 || this.state.Sku.sellers[0].commertialOffer.Price == 0 || this.state.Sku.sellers[0].commertialOffer.ListPrice == 0){
      avaliable = false;
    }
    return (
      this.setState({
        Avaliable: avaliable
      }, ()=>{
        this.setDiscount();
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
    } else {
      discount = 0;
      this.setState({
        RawPrice: this.props.info.items.find(sku => sku.sellers[0].commertialOffer.ListPrice != 0 ? sku.sellers[0].commertialOffer.ListPrice.toFixed(2).toString().replace(".", ",") : "")
      })
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
  getImgSku(sku, size){
    let skuImg;
    skuImg = sku.images.filter(o => {
      if(o.imageLabel === "thumb" || o.imageLabel === "Thumb"){
          // console.log(o.imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "50", "#height#": "50" , "~": ""}));
          return o
      }
    })
    if(skuImg.length > 0){
      // return skuImg
      return skuImg[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": size, "#height#": size, "~": ""});
    }else{
      return "noImg"
    }
  }
  mountConfig(){
    const changeSku = (e) => {
      this.setState({
        Sku: this.props.info.items.find(i => i.itemId == e.dataset.sku),
      }, () => {
        // let listItem = document.querySelectorAll(".cardProduct__config__list");
        console.log(this.props.info);
        this.setBeforePrice();
        this.setAvaliable();
        this.setState({
          SelectedSkuThumb: this.getImgSku(this.state.Sku, "10px")
        })

        e.parentElement.querySelector(".cardProduct__config__list__item.selected").classList.remove("selected");
        for(let i = 0; i < e.parentElement.querySelectorAll(".cardProduct__config__list__item").length; i++){
          let item = e.parentElement.querySelectorAll(".cardProduct__config__list__item")[i];
          item.dataset.sku == this.state.Sku.itemId ? item.classList.add("selected") : "";
        }
      })
    }
    return(
      <div className="cardProduct__config">
        {this.props.info.items[0]["Escolha a Cor"] != undefined ?
          <React.Fragment>
            {this.props.info.items.map(sku => sku.itemId == this.props.skuHighlight && 
              <span className="cardProduct__config__selected" style={{backgroundImage: `url(${this.state.SelectedSkuThumb})`, backgroundSize: `5000%`}}>
                <p className="cardProduct__config__selected__name">{this.state.Sku["Escolha a Cor"]}</p>
              </span>
            )}
            <div className="cardProduct__config__type">
              <span className="cardProduct__config__type__colors"></span>
              <p className="cardProduct__config__type__title">Escolha a Cor</p>
            </div>
            <ul className="cardProduct__config__list">
            {
              this.props.info.items.map(sku => 
                <li className={
                  `cardProduct__config__list__item __color 
                  ${sku.itemId == this.props.skuHighlight ? "selected" : ""} 
                  ${sku.sellers[0].commertialOffer.AvailableQuantity == 0 || sku.sellers[0].commertialOffer.Price == 0 || sku.sellers[0].commertialOffer.ListPrice == 0 ? "set--avaliable-false" : "set--avaliable-true"}
                  ${Math.round((sku.sellers[0].commertialOffer.Price - sku.sellers[0].commertialOffer.ListPrice) * 100 / sku.sellers[0].commertialOffer.ListPrice) < 0 ? "set--discount": "" }
                  `}
                  data-name={sku["Escolha a Cor"]}
                  data-discount={sku.sellers[0].commertialOffer.AvailableQuantity == 0 || sku.sellers[0].commertialOffer.Price == 0 || sku.sellers[0].commertialOffer.ListPrice == 0 ? "" : Math.round((sku.sellers[0].commertialOffer.Price - sku.sellers[0].commertialOffer.ListPrice) * 100 / sku.sellers[0].commertialOffer.ListPrice)}
                  data-sku={sku.itemId} 
                  onClick={e => changeSku(e.currentTarget)}>
                  {/* {console.log(sku)} */}
                  {/* {console.log(sku.images.filter(o => { if(o.imageLabel === "thumb" || o.imageLabel === "Thumb"){ return o }}))[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "50", "#height#": "50" , "~": ""})} */}
                  <img className={`${sku.itemId == this.props.skuHighlight ? "selected" : ""}`} data-src={this.getImgSku(sku, "40px")} alt={sku["Escolha a Cor"]} />
                  {/* <small>{sku["Escolha a Cor"]}</small> */}
                </li>
              )
            }
            </ul>
          </React.Fragment>
          :
          <React.Fragment>
          {this.props.info.items.map(sku => sku.itemId == this.props.skuHighlight && 
            <span className="cardProduct__config__selected __volume">
              <p className="cardProduct__config__selected__name">{this.state.Sku["Escolha o Volume"]}</p>
            </span>
          )}
          <div className="cardProduct__config__type">
            {/* {this.props.info.items.map(sku => console.log(sku))} */}
            {/* {console.log(this.props.info)} */}
            <span className="cardProduct__config__type__bulk"></span>
            <p className="cardProduct__config__type__title">Escolha o Volume</p>
          </div>
          <ul className="cardProduct__config__list">
          {
            this.props.info.items.map(sku => 
              <li className={`cardProduct__config__list__item __volume 
              ${sku.itemId == this.props.skuHighlight ? "selected" : ""}
              ${sku.sellers[0].commertialOffer.AvailableQuantity == 0 || sku.sellers[0].commertialOffer.Price == 0 || sku.sellers[0].commertialOffer.ListPrice == 0 ? "set--avaliable-false" : "set--avaliable-true"}
              ${Math.round((sku.sellers[0].commertialOffer.Price - sku.sellers[0].commertialOffer.ListPrice) * 100 / sku.sellers[0].commertialOffer.ListPrice) < 0 ? "set--discount": "" }
              `} 
              data-name={sku["Escolha o Volume"]} 
              data-sku={sku.itemId}
              data-discount={sku.sellers[0].commertialOffer.AvailableQuantity == 0 || sku.sellers[0].commertialOffer.Price == 0 || sku.sellers[0].commertialOffer.ListPrice == 0 ? "" : Math.round((sku.sellers[0].commertialOffer.Price - sku.sellers[0].commertialOffer.ListPrice) * 100 / sku.sellers[0].commertialOffer.ListPrice)}
              onClick={e => changeSku(e.currentTarget)}>
                {sku["Escolha o Volume"]}
              </li>
            )
          }
          </ul>
          </React.Fragment>
        }
      </div>
    )
  }

  unAvaliable(){
    return(
      <div className="cardProduct__sendMe">
        <span className="cardProduct__sendMe set--close">

        </span>
        <div className="cardProduct__sendMe__steps">
          <p className="cardProduct__sendMe__steps__title">
            Saiba quando <b className="cardProduct__sendMe__steps__title__product">{this.state.Sku.name}</b> ficar disponível
          </p>
        </div>
      </div>
    )
  }

  addToCart(e){
    // e.target.preventDefault();
    let _this = this;

    const Add = () => {
      return new Promise ((resolve, reject) => {
        vtexjs.checkout.getOrderForm().then((orderForm) => {
            console.log(orderForm);
            if(!!orderForm.items.length){
                orderForm.items.map((e, i) => {
                    if(e.id == this.state.Sku.itemId){
                        _this.setState({
                          Qty: e.quantity + 1
                        }, () => {
                          let quantity = _this.state.Qty;
                          let updateItem = {
                              index: i,
                              quantity: quantity
                          };
                          return vtexjs.checkout.updateItems([updateItem]);
                        });
                    }else{
                        _this.setState({
                          Qty: 1
                        }, () => {
                          let newitem = {
                              id: this.state.Sku.itemId,
                              quantity: '1',
                              seller: '1'
                          };
                          return vtexjs.checkout.addToCart([newitem]);
                        });
                    }
                })
            }else{
              _this.setState({
                Qty: 1
              }, () => {
                let newitem = {
                    id: this.state.Sku.itemId,
                    quantity: _this.state.Qty,
                    seller: '1'
                };
                return vtexjs.checkout.addToCart([newitem]);
              })
            }
        })
        .done(function(orderForm) {
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
                resolve(console.log(orderForm));
                let bagMask = document.querySelectorAll(".__maskBag circle");
                // if(document.querySelector(".minicart--itens").textContent > 10){
                //   for(let i = 0; i < bagMask.length; i++){
                //       bagMask[i].classList.add("set--high");
                //   }
                // }
                // else if(document.querySelector(".minicart--itens").textContent > 5){
                //   for(let i = 0; i < bagMask.length; i++){
                //       bagMask[i].classList.add("set--medium");
                //   }
                // }else{
                //   for(let i = 0; i < bagMask.length; i++){
                //       bagMask[i].classList.add("set--low");
                //   }
                // }
            //     var
            //     stylesheet = document.styleSheets[6] // replace 0 with the number of the stylesheet that you want to modify,
            //     rules = stylesheet.rules, 
            //     i = rules.length, 
            //     keyframes, 
            //     keyframe;
                
            //     while (i--) {
            //         keyframes = rules.item(i);
            //         if (
            //             (
            //                   keyframes.type === keyframes.KEYFRAMES_RULE
            //                 || keyframes.type === keyframes.WEBKIT_KEYFRAMES_RULE
            //             )
            //             && keyframes.name === "drift"
            //         ) {rules = keyframes.cssRules;
            //             i = rules.length;
            //             while (i--) {
            //                 keyframe = rules.item(i);
            //                 if (
            //                     (
            //                           keyframe.type === keyframe.KEYFRAME_RULE
            //                         || keyframe.type === keyframe.WEBKIT_KEYFRAME_RULE
            //                     )
            //                     && keyframe.keyText === "100%"
            //                 ) {
            //                     keyframe.style.transform =
            //                         "translate(30px, 280px) rotate(360deg);";
            //                     break;
            //                 }
            //             }
            //             break;
            //         }
            //     }
            });
        });
      });
    } 
    if(e.classList.contains("status--standBy")) {
      e.innerHTML = 
      `<div class="status--adding__text">ADICIONANDO</div>
      <span class="status--adding__dots"></span>
      <span class="status--adding__actions"></span>`;

      e.classList.add("status--request");
      e.classList.remove("status--standBy");

      Add().then(()=>{
        e.classList.add("status--adding");

        setTimeout(() => {
          const reset = () => {
            e.classList.add("status--remove");
            e.classList.remove("status--request");
            setTimeout(() => {
              e.classList = "cardProduct--addToCart status--standBy";
            }, 800);
            e.innerHTML = `<svg class="cardProduct--addToCart__bag" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z" /></svg><p class="cardProduct--addToCart__cta">Adicionar a Sacola</p>`;
          }

          let removeTimeout = setTimeout(reset, 5000);

          e.classList.add("status--added");
          e.querySelector(".status--adding__text").innerHTML = 
          `${_this.state.Sku.name} foi adicionado!`

          e.querySelector(".status--adding__dots").innerHTML = 
          `<span class="status--adding__dots__qty">${_this.state.Qty}</span>
          <img class="status--adding__dots__img" src="${_this.state.Sku.images[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "150", "#height#": "150" , "~": ""})}" alt="${_this.state.Sku.name}" />
          <svg class="circle-dots" viewBox="0 0 95 95"><circle cx="48" cy="48" r="46" class="circle time-count"></circle></svg>`
          
          e.querySelector(".status--adding__actions").innerHTML = 
          `<a href="/checkout/#/cart">
              <span class="status--adding__actions__cart">Fechar Pedido</span>
            </a>`
            // <span class="status--adding__actions--add">+1</span>
            // document.querySelector(".status--adding__actions--add").addEventListener("click", () => {
            //   clearTimeout(removeTimeout);
            //   Add().then(()=>{
            //     _this.setState({
            //       Qty: _this.state.Qty++
            //     })
            //     removeTimeout = setTimeout(reset(), 5000);
            //   });
            // });
        }, 1500);
      })
    }
  }

  componentDidMount(){
    this.setBeforePrice();
    this.setAvaliable();
    this.setState({SelectedSkuThumb: this.getImgSku(this.state.Sku, "10px")});
    this.setState({FreeShipping: 109})
    // this.setState({FreeShipping: window.valorFrete})
    // console.log(this.state.FreeShipping);
    // this.props.info.clusterHighlights.map(flag => flag == "Outlet"? "Outlet" : "dope")
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
      let i = 1;
      for(i = 1; i <= this.props.review.Rating; i++){
          stars.push(<svg className="cardProduct__review__rating__ratingStar" viewBox="0 0 88 84" width="88" height="84" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M43.91.047a2 2 0 0 0-1.819 1.384l-9.42 29.194-30.667-.06a2 2 0 0 0-1.177 3.62l24.85 17.983-9.541 29.164a2 2 0 0 0 3.08 2.238l24.779-18.083 24.79 18.084a2 2 0 0 0 3.078-2.239l-9.541-29.164 24.85-17.982a2 2 0 0 0-1.176-3.621l-30.669.06-9.43-29.195A2 2 0 0 0 43.911.047z" fill="#67605F"/></svg>)
      }
      while(i > this.props.review.Rating && i <= 5){
          stars.push(<svg className="cardProduct__review__rating__ratingStar set--outline" viewBox="0 0 88 84" width="88" height="84" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M43.91.047a2 2 0 0 0-1.819 1.384l-9.42 29.194-30.667-.06a2 2 0 0 0-1.177 3.62l24.85 17.983-9.541 29.164a2 2 0 0 0 3.08 2.238l24.779-18.083 24.79 18.084a2 2 0 0 0 3.078-2.239l-9.541-29.164 24.85-17.982a2 2 0 0 0-1.176-3.621l-30.669.06-9.43-29.195A2 2 0 0 0 43.911.047z" stroke="#67605F"/></svg>)
          i++;
      }
      return stars;      
    }
    const flags = () =>{
      return(
        <React.Fragment>
          {this.state.Discount != 0 && this.state.Avaliable == true &&
          <span className="cardProduct__flag __discount">
              <p className="cardProduct__flag__content">
                {this.state.Discount + "%"}
              </p>
            </span>
          }
          {this.state.FreeShipping != "notSet" || this.state.FreeShipping > this.state.Sku.sellers[0].commertialOffer.Price.toFixed(2) &&
          <span className="cardProduct__flag __frete">
              <p className="cardProduct__flag__content">
                Frete Grátis
              </p>
            </span>
          }
          {this.state.Avaliable != false &&
            Object.entries(this.state.clusterHighlights).map(flag =>
              <span className={`cardProduct__flag __${flag[1].replace("ç", "c")}`}>
                <p className="cardProduct__flag__content">
                  {flag[1]}
                </p>
              </span>
            )
          }
        </React.Fragment>
      )
    }
    return (
      <div className={`cardProduct cardProduct-${this.props.info.productId} avaliable-${this.state.Avaliable} change-${this.state.openConfig}`} data-prod={this.props.info.productId} /*onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}*/>
        {this.props.info.items[0].variations != undefined &&
          <React.Fragment>
            <span className={`cardProduct--change`} onClick={e => this.openConfig(e)}>
              <span className="cardProduct--change__dots"></span>
              <p className="cardProduct--change__close"><svg width="16" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.354 4.354a.5.5 0 0 0 0-.708L12.172.464a.5.5 0 1 0-.708.708L14.293 4l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182zM0 4.5h15v-1H0v1z"/></svg></p>
            </span>
            {this.mountConfig()}
          </React.Fragment>
        }
        <a href={"/" + this.props.info.linkText + "/p?idsku=" + this.state.Sku.itemId} className="cardProduct__link">
          <div className="cardProduct__flags">
            {flags()}
          </div>
          <div className="cardProduct__pictureContainer">
            <img className="cardProduct__pictureContainer__picture" src={this.state.Sku.images[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0].allReplace({ "#width#": "150", "#height#": "150" , "~": ""})} loading="lazy"></img>
            {this.props.review.TotalRatings > 0 &&
              <div className="cardProduct__pictureContainer__review">
                <ul className="cardProduct__pictureContainer__review__rating">
                  {countRating()}
                </ul>
                <span className="cardProduct__pictureContainer__review__qtd">
                  {this.props.review.TotalRatings} avaliações
                </span>
              </div>
            }
          </div>
          <div className="cardProduct__info">
            <p className="cardProduct__info__name">
              {this.state.Sku.name}
            </p>
            {/* <svg className="cardProduct__info--favorite" width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1503 3.53732L11.5 3.87959L11.8497 3.53732L13.3914 2.02851C15.4757 -0.0113849 18.8643 -0.00747146 20.9442 2.02806C23.022 4.06158 23.0154 7.36215 20.9437 9.38962L15.4508 14.7654L11.4951 18.3313C11.4434 18.286 11.3866 18.2361 11.3253 18.1823C11.0157 17.9102 10.5906 17.5356 10.1287 17.1249C9.20159 16.3006 8.1373 15.341 7.55654 14.7726L2.05628 9.38962C-0.0153681 7.36215 -0.0219969 4.06158 2.05583 2.02806C4.13571 -0.00747146 7.52425 -0.0113849 9.60859 2.02851L11.1503 3.53732Z" /></svg> */}
          </div>
          {this.state.Avaliable != false ?
            <div className="cardProduct__price">
            {
              this.state.haveBefore != false &&
              <p className="cardProduct__price__before">
                {"R$" + this.state.Sku.sellers[0].commertialOffer.ListPrice.toFixed(2).toString().replace(".", ",")}
              </p>
            }
              <p className="cardProduct__price__actual">{"R$" + this.state.Sku.sellers[0].commertialOffer.Price.toFixed(2).toString().replace(".", ",")}</p>
              <p className="cardProduct__price__installment">{"até " + Math.max.apply(Math, this.state.Sku.sellers[0].commertialOffer.Installments.map(function(o) { return o.NumberOfInstallments; })) + "x de R$" + Math.min.apply(Math, this.state.Sku.sellers[0].commertialOffer.Installments.map(function(o) { return o.Value; })).toFixed(2).toString().replace(".", ",") + " sem juros"}</p>
            </div>
            :
            <div className="cardProduct__price">
              <p className="cardProduct__price__actual">{"R$" + this.state.RawPrice}</p>
            </div>
          }
        </a>
        {/* <a href={"/" + this.props.info.linkText + "/p?idsku=" + this.state.Sku.itemId} className="cardProduct__link"> */}
          {/* <span className="cardProduct--addToCart"> */}
          
          {this.state.Avaliable != false ?
          <span className="cardProduct--addToCart status--standBy" onClick={e => this.addToCart(e.currentTarget)}>
              <svg className="cardProduct--addToCart__bag" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8779 6.22321C18.8046 5.43449 18.0966 4.83464 17.259 4.85168H14.7489V4.53631C14.7492 2.03134 12.6006 0.000399137 9.94984 3.99499e-05C9.94963 3.99499e-05 9.94941 3.99499e-05 9.9492 3.99499e-05C7.36904 -0.0102225 5.26862 1.95802 5.25779 4.39623C5.25758 4.44293 5.25817 4.48962 5.2595 4.53631V4.85291H2.74878C1.93116 4.85876 1.25334 5.45317 1.18619 6.22321L0.0167767 19.9383C-0.0877588 20.9886 0.299876 22.0295 1.07749 22.7865C1.81873 23.5618 2.8738 24.0029 3.97953 23.9997H16.0327C17.1408 24.0136 18.2003 23.5707 18.9347 22.7865C19.6662 22.0032 20.0466 20.9818 19.9954 19.9383L18.8779 6.22321ZM6.32086 4.53631C6.29403 2.61379 7.92153 1.03475 9.95597 1.00941C11.9904 0.984058 13.6614 2.52205 13.6882 4.44457C13.6886 4.47515 13.6886 4.50573 13.6882 4.53631V4.85291H6.32086V4.53631ZM18.1541 22.0475C17.6184 22.6231 16.8445 22.9502 16.0334 22.9441H3.97697C2.39256 22.9385 1.11301 21.7201 1.11904 20.2229C1.11936 20.1452 1.1232 20.0677 1.13056 19.9903L2.30248 6.27519C2.30573 6.03731 2.51246 5.84694 2.76419 5.85001C2.77785 5.85017 2.79145 5.85094 2.805 5.85222H5.31641V7.80374C5.31641 8.09504 5.56628 8.33118 5.87455 8.33118C6.18283 8.33118 6.4327 8.09504 6.4327 7.80374V5.85463H13.8V7.80615C13.8 8.09745 14.0499 8.33359 14.3581 8.33359C14.6664 8.33359 14.9163 8.09745 14.9163 7.80615V5.85463H17.4277C17.687 5.84853 17.9068 6.03351 17.9302 6.27755L19.1021 19.9926C19.0331 20.7573 18.6999 21.4793 18.1541 22.0475Z" /></svg>
              <p className="cardProduct--addToCart__cta">Adicionar à Sacola</p>
          </span>
          :
          <span className="cardProduct--letMeKnow status--standBy" onClick={e => this.letMeKnow(e.currentTarget)}>
              <svg  className="cardProduct--letMeKnow__mail" width="24" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.098 0h17.698c1.692 0 2.993 1.301 2.993 2.993v10.671c0 1.692-1.301 3.123-2.993 3.123H3.098c-1.692 0-2.994-1.431-2.994-3.123V2.994C.104 1.3 1.406 0 3.098 0zM2.057 1.822l8.328 6.897c.781.65 2.212.65 3.123 0l8.329-6.897c-.26-.26-.65-.52-1.041-.52H3.098c-.39 0-.781.26-1.041.52zm20.43 1.301L14.42 9.76c-1.431 1.171-3.643 1.171-4.945 0L1.406 3.123v10.541c0 .911.78 1.692 1.692 1.692h17.698c.91 0 1.692-.78 1.692-1.692V3.124z" fill="#FDFDFD"/></svg>
              <p className="cardProduct--letMeKnow__cta">Avise-me quando chegar</p>
          </span>
          }
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