import Siema from "../../../../global/vendor/siema-slider/siema.min.js"
import Banner from "./_BannerPrincipal.jsx"

const Methods = {
    BuildBanners(){
        class BannerContainer extends React.Component {
            constructor(props){
                super(props);
                this.state = {
                    Banners: [
                        {
                            Url: "",
                            Src: ""
                        }
                    ],
                    Viewport: "Desktop"
                }
                this.getBanners = this.getBanners.bind(this);
                this.setViewport = this.setViewport.bind(this);
                this.Resize = this.Resize.bind(this);
                this.buildSlider = this.buildSlider.bind(this);
            }

            setViewport(size){
                let actualViewport = size <= 768 ? "Mobile" : "Desktop";
                return(
                    this.setState({
                        Viewport: actualViewport,
                        Banners: []
                    }, () => {
                        this.getBanners();
                    })
                )
            }

            getBanners(){
                let bannerViewport = document.querySelector(".banners" + this.state.Viewport);

                let Banners = [];

                for(let i = 1; i < bannerViewport.textContent.split('<div class="box-banner">').length; i++){
                    let Banner = {};
                    Banner["Url"] = bannerViewport.textContent.split('<div class="box-banner">')[i].match(/href\s*=\s*"(.+?)"/)[1];
                    Banner["Src"] = bannerViewport.textContent.split('<div class="box-banner">')[i].match(/src\s*=\s*"(.+?)"/)[1];
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
                }, () => {
                    this.buildSlider();
                });
            }

            buildSlider(){
                const slideBanners = new Siema({
                    selector: ".bannerHero__banners",
                    duration: 150,
                    easing: 'ease-out',
                    perPage: 1,
                    startIndex: 0,
                    draggable: true,
                    multipleDrag: true,
                    threshold: 20,
                    loop: true,
                    rtl: false,
                    onChange: printSlideIndex
                });
                let Autoplay = setInterval(() => slideBanners.next(), 5000);

                function printSlideIndex() {
                    clearInterval(Autoplay);
                    Autoplay = setInterval(() => slideBanners.next(), 5000);
                    this.innerElements.forEach((slide, i) => {
                        const addOrRemove = i === this.currentSlide ? 'add' : 'remove';
                        document.querySelectorAll(".--controls__dots .--changePosition")[i].classList[addOrRemove]('--active');
                    })

                    // if(this.currentSlide == 0){
                    //     document.querySelector(".bannerHero__controls--arrows .--prev").classList.add("off");
                    // }else if(this.currentSlide == (this.innerElements.length - 1) ){
                    //     document.querySelector(".bannerHero__controls--arrows .--next").classList.add("off");
                    // }else{
                    //     document.querySelector(".bannerHero__controls--arrows .--prev").classList.remove("off");
                    //     document.querySelector(".bannerHero__controls--arrows .--next").classList.remove("off");
                    // }
                }

                // let controls = document.createElement("div");
                // controls.classList.add("bannerHero__controls");

                Siema.prototype.addPagination = function() {
                    let dotControl = document.createElement("span");
                    dotControl.classList.add("--controls__dots");
                    // controls.appendChild(dotControl);
                    this.selector.appendChild(dotControl);

                    for (let i = 0; i < this.innerElements.length; i++) {
                        const btn = document.createElement('button');
                        btn.classList.add("--changePosition")
                        btn.addEventListener('click', () => {
                            clearInterval(Autoplay);
                            Autoplay = setInterval(() => slideBanners.next(), 5000);
                            this.goTo(i)
                        });
                        dotControl.appendChild(btn);
                    }
                    document.querySelector(".--controls__dots").childNodes[0].classList.add("--active");
                }

                // Style the arrows with CSS or JS — up to you mate
                Siema.prototype.addArrows = function () {
                    let _this = this;
      
                    // make buttons & append them inside Siema's container
                    _this.prevArrow = document.createElement('button');
                    _this.prevArrow.classList.add("--prev");
                    _this.nextArrow = document.createElement('button');
                    _this.nextArrow.classList.add("--next");
                    _this.prevArrow.textContent = '⯇';
                    _this.nextArrow.textContent = '⯈';
                    
                    let arrowsControl = document.createElement("span");
                    arrowsControl.classList.add("--controls__arrows");
                    _this.selector.appendChild(arrowsControl);
                
                    arrowsControl.appendChild(_this.prevArrow);
                    arrowsControl.appendChild(_this.nextArrow);

                    // event handlers on buttons
                    _this.prevArrow.addEventListener('click', function () {
                        return _this.prev();
                    });
                    _this.nextArrow.addEventListener('click', function () {
                        return _this.next();
                    });
                };

                document.addEventListener('keydown', (e) => {
                    // if it's left arrow key
                    if (e.keyCode === 37) {
                        clearInterval(Autoplay);
                        Autoplay = setInterval(() => slideBanners.next(), 5000);
                        slideBanners.prev()
                    }
                    // if it's right arrow key
                    else if (e.keyCode === 39) {
                        clearInterval(Autoplay);
                        Autoplay = setInterval(() => slideBanners.next(), 5000);
                        slideBanners.next()
                    }
                });
                
                slideBanners.addPagination();
                slideBanners.addArrows();

                window.addEventListener('resize', () => {
                    slideBanners.addPagination();
                    slideBanners.addArrows();
                });
            }

            Resize(){
                this.setViewport(window.innerWidth);
            }
            // handleChange(e){
            //   this.setState({

            //   })
            // }

            componentDidMount(){
                this.setViewport(window.innerWidth);
                window.addEventListener("resize", ()=>{
                    if(window.innerWidth < 768){
                        this.Resize();
                    }
                });
            }
            
            render(){
                const Banners = () => {
                    let banners = [];
                    this.state.Banners.map((Ban, index) => {
                        banners.push(
                            <Banner Url={Ban.Url} Src={Ban.Src} key={index} />
                        );
                    })
                    return (
                      <React.Fragment>
                          {banners}
                      </React.Fragment>
                    )
                  }
          
                  return <Banners />
            }
        
        }
        
        ReactDOM.render(
            <BannerContainer />,
            document.getElementById('bannerHero--render')
        );
    }
}
  
export default {
    init: Methods.BuildBanners
};