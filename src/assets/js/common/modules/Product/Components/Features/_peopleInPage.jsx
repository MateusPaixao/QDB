export function PeopleInPage(){
    class PeopleSeeing extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                nPeople: 1
            }
            this.peopleSeeing = this.peopleSeeing.bind(this);
        }

        peopleSeeing = (num, minV) =>{
            this.setState({
                nPeople: Math.floor(Math.random() * (num + 5)) + minV
            }, () => {
                if(this.state.nPeople > 0){
                    let interval = setInterval(() => {
                        let min= this.state.nPeople - 2; 
                        let max= this.state.nPeople + 4;
                        this.setState({
                            nPeople: this.state.nPeople > 2 ? (Math.floor(Math.random() * (+max - +min)) + +min) : 10
                        });
                        // document.querySelector(".people-seeing ._now").textContent = views + " pessoas estão vendo esse produto agora."
                        // document.querySelector(".people-seeing").style.display = "flex";
                    }, 8000);
            
                    document.querySelector(".people-seeing .--close").addEventListener("click", () => {
                        clearInterval(interval);
                        document.querySelector(".people-seeing").style.display = "none";
                    });
                }
            });
        }

        componentDidMount(){

        }
        
        render(){
        }
    
    }
    
    ReactDOM.render(
        <PeopleSeeing />,
        document.getElementById('bannerHero--render')
    );
}