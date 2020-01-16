class videoContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        console.log("Video container montado")
    }

    render(){
        return(
            <div className="videoContainer">
                <div className="videoContainer__text">
                    <h2>Arrase nesse</h2>
                    <h2>Carnaval</h2>
                    <h2>Aprenda a fazer sua make com <br/> as cores tendências nesse Carnaval.</h2>
                </div>
            </div>
        )
    }
}

export default videoContainer;