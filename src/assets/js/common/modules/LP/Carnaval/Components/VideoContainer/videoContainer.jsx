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
                    <h1>Arrase nesse</h1>
                    <h1>Carnaval</h1>
                    <p>Aprenda a fazer sua make com <br/> as cores tendências nesse Carnaval.</p>
                </div>
            </div>
        )
    }
}

export default videoContainer;