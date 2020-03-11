import React from 'react'

import { Pictures } from "./Pictures"
import { ColorPick } from './ColorPick'
import { AllColors } from './AllColors'
import { SizePick } from './SizePick'
import { Content } from './Content'

class Principal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Product: this.props.Product,
            Sku: this.props.Sku,
            Reviews: this.props.Reviews,
            mainPicture: null,
            showAll: false
        }

        this.setAvaliable = this.setAvaliable.bind(this);
        this.handleMainPicture = this.handleMainPicture.bind(this);
        this.handleShowAll = this.handleShowAll.bind(this);
    }
    
    handleMainPicture(main){
        this.setState({
            mainPicture: main
        })
    }
    handleShowAll(){
        this.setState({
            showAll: !this.state.showAll
        }, () => {
            document.querySelector("body").classList.remove(`setOverlay-${!this.state.showAll}`)
            document.querySelector("body").classList.add(`setOverlay-${this.state.showAll}`)
        })
    }

    setAvaliable(sku){
        let avaliable = 
            sku.sellers[0].commertialOffer.AvailableQuantity == 0 
            || sku.sellers[0].commertialOffer.Price == 0 
            || sku.sellers[0].commertialOffer.ListPrice == 0 
            ? "set--unavaliable" 
            : "set--avaliable"
        return avaliable;
    }
    componentDidMount(){
        console.log(this.state.Product);
        // console.log(Math.min.apply(Math, this.state.Product.items.map(function(o) { return o.length; })));
    }

    render(){
        return (
            <div className={`principal ${this.setAvaliable(this.props.Sku)}`}>
                <div className="principal__left">
                    <Pictures Sku={this.props.Sku} MainPicture={this.state.mainPicture} handleMainPicture={this.handleMainPicture} />
                </div>
                <div className="principal__right">
                    <h1 className="principal__title">{this.props.Sku.nameComplete}</h1>
                    <small  className="principal__ref">Ref.: {this.props.Sku.referenceId[0].Value}</small>
                    {
                        this.props.Product.items.length > 1 ?
                            this.props.Product.skuSpecifications != undefined && this.props.Product.skuSpecifications[0].field.name == "Escolha a Cor" ?
                                <ColorPick Product={this.props.Product} Sku={this.props.Sku} handleSku={this.props.handleSku} handleMainPicture={this.handleMainPicture} handleShowAll={this.handleShowAll} showAll={this.state.showAll} />
                            :
                                <SizePick Product={this.props.Product} Sku={this.props.Sku} handleSku={this.props.handleSku} handleMainPicture={this.handleMainPicture} />
                        :
                            ""
                    }
                    <Content Product={this.props.Product} Sku={this.props.Sku} Reviews={this.props.Reviews} handleReviews={this.props.handleReviews} onPage={this.props.onPage} />
                </div>
                {
                    this.props.Product.items.length > 1 ?
                        this.props.Product.skuSpecifications != undefined && this.props.Product.skuSpecifications[0].field.name == "Escolha a Cor" &&
                            <AllColors Product={this.props.Product} Sku={this.props.Sku} handleSku={this.props.handleSku} handleMainPicture={this.handleMainPicture} handleShowAll={this.handleShowAll} showAll={this.state.showAll} />
                    :
                        ""
                }
            </div>
        )
    }

}

export default Principal;