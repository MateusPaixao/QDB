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
                console.log(size);
                console.log(actualViewport);
                return(
                    this.setState({
                        Viewport: actualViewport
                    })
                )
            }

            getBanners(){
                console.log(".banners" + this.state.Viewport);
                let bannerViewport = document.querySelector(".banners" + this.state.Viewport);
                console.log(bannerViewport);
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
                console.log(this.state.BannersImgs);
                let banners = [];
                const Banners = () => {
                    this.state.BannersImgs.map((banner, i)=>{
                        banners.push(
                            <a class="bannerHero__link" href={this.state.BannersUrls[i]}>
                                <img class="bannerHero__img" src={banner} loading="lazy" />
                            </a>
                        )
                        console.log(banners);
                        return banners
                    });
                }

                return (
                    <React.Fragment>
                        <Banners />
                    </React.Fragment>
                )
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