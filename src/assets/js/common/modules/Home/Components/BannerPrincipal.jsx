const Methods = {
    BuildBanners(){
        class BannerPrincipal extends React.Component {
            constructor(props){
            super(props);
            this.state = {
                BannersImgs: [],
                BannersUrls: [],
                Viewport: "Desktop"
            }
            this.getBanners = this.getBanners.bind(this);
            this.setViewport = this.setViewport.bind(this);
            }

            setViewport(size){
                let actualViewport = size <= 768 ? "Mobile" : "Desktop"
                return(
                    this.setState({
                        Viewport: actualViewport
                    })
                )
            }

            getBanners(){
                let bannerViewport = document.querySelector(".banners" + this.state.Viewport);
                for(let i = 1; i < bannerViewport.textContent.split('<div class="box-banner">').length; i++){
                    this.state.BannersImgs.push(bannerViewport.textContent.split('<div class="box-banner">')[i].match(/src\s*=\s*"(.+?)"/)[1])
                    this.state.BannersUrls.push(bannerViewport.textContent.split('<div class="box-banner">')[i].match(/href\s*=\s*"(.+?)"/)[1])
                }
            }
            
            componentDidMount(){
                this.setViewport(window.innerWidth);
                this.getBanners();
            }
        
            // handleChange(e){
            //   this.setState({

            //   })
            // }
        
            render(){
                let banners = [];
                const Banners = () => {
                    this.state.BannersImgs.map((banner, i)=>{
                        banners.push(
                            <a className="bannerHero__link" href={this.state.BannersUrls[i]} key={i}>
                                <img className="bannerHero__img" src={banner} loading="lazy" />
                            </a>
                        )
                    });

                    return banners;
                }

                return <Banners />
            }
        }
        
        ReactDOM.render(
            <BannerPrincipal />,
            document.getElementById('bannerHero--render')
        );
    }
}
  
export default {
    init: Methods.BuildBanners
};