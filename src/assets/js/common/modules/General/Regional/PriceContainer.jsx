import PriceSelect from "./components/_PriceSelect.jsx"
import PriceModal from "./components/_PriceModal.jsx";

const Methods = {
    init(){
        Methods.setRegion();
    },
    setRegion(){
        class ModalContainer extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    Session: "",
                    Region: ""
                };
            }
            
            render(){
                return (
                    <PriceModal />
                )
            }
        }
        ReactDOM.render(
            <ModalContainer />,
            document.getElementById('modalRegional')
        );
    }
}

export default {
    init: Methods.init
};