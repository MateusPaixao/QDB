
import Card from "./components/_Card.jsx"

const Methods = {
  init(){
    // Methods.Form();
    Methods.BuildCard();
  },
  BuildCard(){
    class CardContainer extends React.Component {
      constructor() {
        super(props);
        this.state = {
          ids: [10, 55, 25]
        };
      }
      Product(id, sku) {
        this.setState({ ProductId: id });
        this.setState({ idSku: sku });
      }
      render() {
        const { idSku } = this.state.idSku,
        { ProductId } = this.state.ProductId;
        let ids = this.state.ids,
        cards = [];
        for (let i = 0; i < ids.length; i++){
          cards.push(
          <Card
            ProductId={ProductId}
            idSku={idSku}
            // handleChange={this.handleChange}
          />);
        }
        return (
          cards
        );
      }
    }
    
    ReactDOM.render(
      <CardContainer />,
      document.getElementById('app')
    );
  }
}

export default {
  init: Methods.init
};