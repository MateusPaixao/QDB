const Methods = {
    PeopleInPage(num){
        class PeopleSeeing extends React.Component {
            constructor(props){
                super(props);
                this.state = {
                    nPeople: num
                }
                this.setViews = this.setViews.bind(this);
            }
    
            setViews(){
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
                        }, 8000);
                        document.querySelector(".people-seeing").style.display = "flex";
                    }
                });
            }
    
            componentDidMount(){
                // this.setViews();
                document.querySelector(".people-seeing").style.display = "flex";
            }
            
            render(){
                console.log(this.props);
                return (
                    <span class="people-seeing">
                        {/* <span class="--close">x</span> */}
                        {/* <svg class="_icon" viewBox="0 0 40 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0C13.28 0 6.967 2.91 2.223 8.194L.217 10.43a.857.857 0 0 0 0 1.14l2.006 2.235C6.967 19.09 13.28 22 20 22c6.72 0 13.032-2.91 17.776-8.195l2.007-2.235a.856.856 0 0 0 0-1.14l-2.007-2.236C33.032 2.91 26.72 0 20 0zm0 1.692c6.245 0 12.12 2.714 16.544 7.643L38.04 11l-1.495 1.665c-4.424 4.928-10.3 7.642-16.544 7.642-6.245 0-12.121-2.714-16.545-7.642L1.961 11l1.494-1.665C7.88 4.405 13.755 1.692 20 1.692zm0 2.392c-1.15 0-2.26.248-3.298.739A7.303 7.303 0 0 0 14.04 6.96c-.91 1.188-1.39 2.584-1.39 4.04 0 3.813 3.297 6.915 7.351 6.915 4.053 0 7.35-3.102 7.35-6.915S24.053 4.084 20 4.084zm0 1.692c3.134 0 5.684 2.343 5.684 5.224 0 2.88-2.55 5.223-5.684 5.223-3.134 0-5.684-2.343-5.684-5.223 0-.24.017-.478.053-.712 0 .002.004-.003.005-.003a3.457 3.457 0 0 0 2.841 1.507c1.919 0 3.479-1.585 3.479-3.532 0-.962-.383-1.834-1-2.472v-.005c.101-.005.204-.007.306-.007zm-2.724.645c.971.032 1.751.845 1.751 1.839 0 1.015-.813 1.84-1.812 1.84-.999 0-1.812-.825-1.812-1.84 0-.119.017-.244.05-.386a5.635 5.635 0 0 1 1.823-1.453z"/></svg> */}
                        {num} pessoas estão vendo esse produto agora.
                    </span>
                )
            }
        
        }
        
        ReactDOM.render(
            <PeopleSeeing />,
            document.getElementById('people-seeing--render')
        );
    }
}

export default {
    init: Methods.PeopleInPage
};