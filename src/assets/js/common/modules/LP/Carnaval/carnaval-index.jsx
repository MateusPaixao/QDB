import VideoContainer from "./Components/VideoContainer/videoContainer.jsx"
// import ProductContainer from "./Components/ProductContainer/productContainer.jsx"
import MakeContainer from "./Components/MakeContainer/makeContainer.jsx"
import {isInViewport} from "../../../global/global-index"


const Methods = {
    init(){
        Methods.LPCarnaval();
        isInViewport();
    },
    LPCarnaval(){
        class Carnaval extends React.Component{
            constructor(props){
                super(props)
                this.state = {

                }
            }

            componentDidMount(){
                console.log("LP Montada")
            }

            render() {
                return(
                    <div>
                        <VideoContainer />
                        <MakeContainer />
                    </div>
                )
            }            
        }

        ReactDOM.render(
            <Carnaval />,
            document.getElementById("render--page")
        )
    }
}

export default {
    init: Methods.init
}