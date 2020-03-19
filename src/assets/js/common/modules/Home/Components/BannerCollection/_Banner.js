import React from 'react';

const Banner = ({ pos }) => {
  const [banner, setBanner] = React.useState({ Url: '', Src: '' });
  const [viewPort, setViewport] = React.useState(window.innerWidth < 768 ? 'Mob' : 'Desk');

  let bannersCollection = document.querySelectorAll('.bannerCollectionHidden')[pos];

  // Banners.push(BannerContent);

  // setBanners(Banners);

  const Resize = () => {
    window.onresize = () => {
      setViewport(window.innerWidth < 768 ? 'Mob' : 'Desk');
    };
  };

  React.useEffect(() => {
    let Content = bannersCollection.querySelector('.bannerVitrine' + viewPort).textContent;
    let banUrl = Content.substring(Content.lastIndexOf('href="') + 6, Content.lastIndexOf('">'));
    let banImg = Content.substring(Content.lastIndexOf('src="') + 5, Content.lastIndexOf('?v='));
    console.log(bannersCollection.querySelector('.titleVitrine'));

    setBanner({ Url: banUrl, Src: banImg });
    Resize();
  }, []);

  return (
    <React.Fragment>
      {/* <h3 class="bannerCollection__info__title">{bannersCollection.querySelector(".titleVitrine").textContent}</h3> */}
      <a className="bannerCollection__link" href={banner.Url}>
        <img className="bannerCollection__img" data-src={banner.Src} loading="lazy" />
      </a>
    </React.Fragment>
  );
};
export default Banner;
