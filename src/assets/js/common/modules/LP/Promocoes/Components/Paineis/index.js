// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Painel from './_Painel';
// import { Carousel } from 'react-pannable';
import Slider from '../../../../General/Slider';
// import General from "../../../General/general-index"

// const Methods = {
//     BuildPaineisBeleza(){
const PaineisContainer = () => {
  let bannersPaineis = document.querySelector('.promo__banners__source');
  // const [scrollToIndex, setScrollToIndex] = React.useState(null);
  const [Banners, setBanners] = useState([]);

  // const Banners = () => {
  //   let banners = [];
  //   this.state.Banners.map((Ban, index) => {
  //     banners.push();
  //   });
  //   return <div className="shell">{banners}</div>;
  // };

  useEffect(() => {
    for (let i = 1; i < bannersPaineis.textContent.split('<div class="box-banner">').length; i++) {
      // let Banner = {};
      let Content = bannersPaineis.textContent.split('<div class="box-banner">')[i];
      let banUrl = Content.substring(Content.lastIndexOf('href="') + 6, Content.lastIndexOf('">'));
      let banImg = Content.substring(Content.lastIndexOf('src="') + 5, Content.lastIndexOf('?v='));
      // Banner['Url'] = banUrl;
      // Banner['Src'] = banImg;

      setBanners(Banners => [...Banners, <Painel Url={banUrl} Src={banImg} key={i} />]);
    }
  }, []);

  return (
    <div className="shell paineisContainer">
      <h2 className="title">Ofertas pra se jogar!</h2>
      <div className="paineis">
        <Slider
          settings={{
            slidesToShow: 3.05,
            slidesToScroll: 1,
            infinite: true,
            speed: 200,
            responsive: [
              {
                breakpoint: 768,
                dots: true,
                arrows: false,
                settings: {
                  slidesToShow: 1.05,
                  slidesToScroll: 1
                }
              }
            ]
          }}
        >
          {Banners}
        </Slider>
      </div>
    </div>
  );
};
//     }
// }

export function BuildPaineisBeleza() {
  ReactDOM.render(<PaineisContainer />, document.getElementById('paineisBeleza--render'));
}

export default PaineisContainer;
