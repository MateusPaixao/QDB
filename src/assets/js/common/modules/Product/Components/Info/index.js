import React from 'react'
import {Description} from "./Description"
import {Shipping} from "./Shipping"
import {Return} from "./Return"
import {Reviews} from './Reviews'
// import {ColorPick} from './ColorPick/_ColorPick.jsx'
// import {Content} from './Content/_Content.jsx'

class Info extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Product: this.props.Product,
            Sku: this.props.Sku,
            Reviews: this.props.Reviews,
        }
    }

    componentDidMount(){
    }

    render(){
        return (
            <div className="info">
                <Description Product={this.props.Product} Sku={this.props.Sku} />
                <Shipping />
                <Return />
                <Reviews 
                    Product={this.props.Product}
                    Reviews={this.props.Reviews} 
                    ReviewOpen={this.props.ReviewOpen}
                    handleReviews={this.props.handleReviews} 
                />
            </div>
        )
    }

}

export default Info;