import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Slider from '../../../General/Slider';
import Painel from './_Painel';
// import { slugify } from '../../../../global/global-index'
// import { SvgPrev, SvgNext } from '../../../General/Icons'

const PaineisContainer = () => {
  // const getBanners = () => {
  const [Banners, setBanners] = useState([]);
  const [actualIndex, setIndex] = useState(1);
  let bannersPaineis = document.querySelector('.paineisBeleza__banners');
  const [BannerUrl, setBannerUrl] = useState(null)

  useEffect(() => {
    console.log(actualIndex);
    for (let i = 1; i < bannersPaineis.textContent.split('<div class="box-banner">').length; i++) {
      // let Banner = {};
      let Content = bannersPaineis.textContent.split('<div class="box-banner">')[i];
      let banUrl = Content.substring(Content.lastIndexOf('href="') + 6, Content.lastIndexOf('">'));
      let banImg = Content.substring(Content.lastIndexOf('src="') + 5, Content.lastIndexOf('?v='));
      let banAlt = Content.substring(
        Content.lastIndexOf('alt="') + 5,
        Content.lastIndexOf('" src=')
      );
      // Banner['Url'] = banUrl;
      // Banner['Src'] = banImg;

      setBanners(Banners => [
        ...Banners,
        <Painel Url={banUrl} Src={banImg} Alt={banAlt} key={i} />,
        setBannerUrl(banUrl)
      ]);
    }
  }, []);

  // React.useEffect(() => {
  //     window.promotions.push(
  //         Banners.map((Banner, i) =>
  //             (
  //                 {
  //                     'id': Banner.Src.match(/ids\/(.*)\//)[1],
  //                     'name': slugify(Banner.Alt),
  //                     'creative': 'body',
  //                     'position': i + 1
  //                 }
  //             )
  //         )
  //     )
  // }, [])

  return (
    <div className="shell paineisContainer">
      <div className="paineis">
        <div className="category-pagination">
          {actualIndex}/{Banners.length}{' '}
        </div>
        {/* {window.innerWidth < 768 ? */}
        <Slider
          settings={{
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            speed: 200,
            afterChange: function(index) {
              setTimeout(() => {
                setIndex(index + 1);
                console.log(actualIndex);
              }, 10);
            },
            responsive: [
              {
                breakpoint: 768,
                dots: true,
                arrows: true,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          }}
        >
          {Banners}
        </Slider>
        {/* :
                    Banners} */}
        <a href={BannerUrl}> <button className="paineisBeleza__button">Quero esse</button></a>
      </div>
    </div>
  );
};
export function BuildPaineisBeleza() {
  ReactDOM.render(<PaineisContainer />, document.getElementById('paineisBeleza--render'));
}

export default PaineisContainer;
