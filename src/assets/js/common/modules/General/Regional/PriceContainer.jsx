import PriceModal from "./components/_PriceModal.jsx"

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

                this.getLocation = this.getLocation.bind(this);
            }
            
            getLocation(){
                getCookie("vtexRegion")
                if(getCookie("vtexRegion") != undefined){
                    this.setState({
                        Session: getCookie("vtex_session"),
                        Region: getCookie("vtexRegion")
                    });
                }else{
                    setPosition();
                }
                const getCookie = function(name){
                    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                    if (match) return match[2];
                }
                const setPosition = (UF, LatLong) => {
                    return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest(),
                        data = {
                            "public":{
                                "country":{
                                    "value":"BRA"
                                },
                                "geoCoordinates":{
                                    "value": LatLong
                                }
                            }
                        };
                        
                        request.open('POST', "/api/sessions/" + this.state.Session);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.onreadystatechange = () => {
                            if (request.readyState === 4) {
                                resolve(JSON.parse(request.response));
                                console.log("Location Up");
                            }
                        };

                        request.send(JSON.stringify(data));
                    }).then(() => {
                        this.setState({
                            Region: UF
                        })
                    }).catch(()=>{
                        this.setState({
                            Region: "Sudeste"
                        })
                    })
                }
            }

            componentDidMount(){
                this.getLocation();
            }

            render(){
                return (
                    <PriceModal Region={this.state.Region} />
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