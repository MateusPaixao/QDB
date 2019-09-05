import PriceSelect from "./components/_PriceSelect.jsx"

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
                    <PriceSelect />
                )
            }
        }
        ReactDOM.render(
            <ModalContainer />,
            document.getElementById('regiao')
        );
    }
}

export default {
    init: Methods.init
};