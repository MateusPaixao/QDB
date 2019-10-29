const Methods = {
    StockLeft(stockLeft){
        class StockLeft extends React.Component {
            constructor(props){
                super(props);
                this.state = {
                    stock: stockLeft
                }
            }
            render(){
                return(
                    <React.Fragment>
                        <span class="addToCart__stock-left set--stock-left">Restam {this.state.stock} no estoque</span>
                    </React.Fragment>
                )
            }
        }
        ReactDOM.render(
            <StockLeft />,
            document.getElementById('stockLeft--render')
        );
    }
}

export default {
    init: Methods.StockLeft
};