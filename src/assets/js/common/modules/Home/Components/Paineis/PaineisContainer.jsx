import Painel from "./_Painel.jsx"

const Methods = {
    BuildPaineisBeleza(){
        class PaineisContainer extends React.Component {
            constructor(props){
                super(props);
                this.state = {
                    Banners: [
                        {
                            Url: "",
                            Src: ""
                        }
                    ],
                    Rendered: false
                }
                this.getBanners = this.getBanners.bind(this);
            }

            getBanners(){
                let bannersPaineis = document.querySelector(".paineisBeleza__banners");

                let Banners = [];

                for(let i = 1; i < bannersPaineis.textContent.split('<div class="box-banner">').length; i++){
                    let Banner = {};
                    Banner["Url"] = bannersPaineis.textContent.split('<div class="box-banner">')[i].match(/href\s*=\s*"(.+?)"/)[1];
                    Banner["Src"] = bannersPaineis.textContent.split('<div class="box-banner">')[i].match(/src\s*=\s*"(.+?)"/)[1];
                    Banners.push(Banner);

                    // this.state.Banners.push(
                    //     <a className="bannerHero__link" href={bannerViewport.textContent.split('<div class="box-banner">')[i].match(/href\s*=\s*"(.+?)"/)[1]} key={i}>
                    //         <img className="bannerHero__img" src={bannerViewport.textContent.split('<div class="box-banner">')[i].match(/src\s*=\s*"(.+?)"/)[1]} loading="lazy" />
                    //     </a>
                    // )
                    // let idImg = string.match(/\d+/);;
                    // string.replace(idImg[0], idImg[0] + "#{width}-#{height}")
                }
                
                this.setState({
                    Banners: Banners
                });
            }

            componentDidMount(){
                this.getBanners();
            }
            
            render(){
                const Banners = () => {
                    let banners = [];
                    this.state.Banners.map((Ban, index) => {
                        banners.push(
                            <Painel Url={Ban.Url} Src={Ban.Src} key={index} />
                        );
                    })
                    return (
                        <div className="shell">
                            {banners}
                        </div>
                    )
                  }
          
                  return <Banners />
            }
        
        }
        
        ReactDOM.render(
            <PaineisContainer />,
            document.getElementById('paineisBeleza--render')
        );
    }
}
  
export default {
    init: Methods.BuildPaineisBeleza
};