import React from 'react';
import { Carousel } from 'react-pannable';
import { AllReplace } from '../../../../../global/global-index';
import Picture from './_PictureImg';
import { SvgPrev, SvgNext } from '../../../../General/Icons';

export const Pictures = ({ Sku }) => {
  AllReplace();

  // const [scrollToIndex, setScrollToIndex] = React.useState(null);
  const [mainPicture, setMainPicture] = React.useState(
    Sku.images[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]
  );
  const [pictures, setPictures] = React.useState(
    Sku.images.map((SkuImg, i) => (
      <li
        className={`principal__pictures__list__picture ${
          window.innerWidth > 768 && i == 0 ? 'set--active' : ''
        }`}
        key={i}
      >
        <Picture
          Src={
            window.innerWidth > 768
              ? SkuImg.imageTag
                  .match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]
                  .allReplace({ '#width#': '50', '#height#': '50', '~': '' })
              : SkuImg.imageTag
                  .match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]
                  .allReplace({ '#width#': '700', '#height#': '700', '~': '' })
          }
          Alt={SkuImg.imageText}
          SetMain={setMain}
          SkuImg={SkuImg}
        />
      </li>
    ))
  );
  const [scrollToIndex, setScrollToIndex] = React.useState(null);
  const mount = React.useRef(null);

  // const onIndicatorPrev = React.useCallback(() => {
  //     setScrollToIndex({
  //         index: ({ activeIndex }) => activeIndex - 1,
  //         animated: true,
  //     });
  // }, []);

  // const onIndicatorNext = React.useCallback(() => {
  //     setScrollToIndex({
  //         index: ({ activeIndex }) => activeIndex + 1,
  //         animated: true,
  //     });
  // }, []);

  // const onIndicatorGoto = React.useCallback(index => {
  //   setScrollToIndex({ index, animated: true });
  // }, []);

  // const buildSlider = (e) =>{
  //     window.slideBanners = new Siema({
  //         selector: e,
  //         duration: 150,
  //         easing: 'ease-out',
  //         perPage: 1,
  //         // startIndex: 0,
  //         draggable: true,
  //         multipleDrag: true,
  //         threshold: 50,
  //         loop: true,
  //         // rtl: false,
  //         onInit: printSlideIndex,
  //         onChange: printSlideIndex
  //     });

  //     function printSlideIndex() {
  //         for(let i = 0; i < this.innerElements.length; i++){
  //             const addOrRemove = i === Math.ceil(this.currentSlide) ? 'add' : 'remove';
  //             this.innerElements[i].classList[addOrRemove]('set--active');
  //         };
  //     }
  //     // Style the arrows with CSS or JS — up to you mate
  //     Siema.prototype.addArrows = function () {
  //         let _this = this;

  //         // make buttons & append them inside Siema's container
  //         _this.prevArrow = document.createElement('button');
  //         _this.prevArrow.classList.add("prev");
  //         _this.nextArrow = document.createElement('button');
  //         _this.nextArrow.classList.add("next");
  //         _this.prevArrow.textContent = '⯇';
  //         _this.nextArrow.textContent = '⯈';

  //         let arrowsControl = document.createElement("span");
  //         arrowsControl.classList.add("controls__arrows");
  //         _this.selector.appendChild(arrowsControl);

  //         arrowsControl.appendChild(_this.prevArrow);
  //         arrowsControl.appendChild(_this.nextArrow);

  //         // event handlers on buttons
  //         _this.prevArrow.addEventListener('click', function () {
  //             return _this.prev();
  //         });
  //         _this.nextArrow.addEventListener('click', function () {
  //             return _this.next();
  //         });
  //     };

  //     document.addEventListener('keydown', (e) => {
  //         // if it's left arrow key
  //         if (e.keyCode === 37) {
  //             clearInterval(Autoplay);
  //             Autoplay = setInterval(() => slideBanners.next(), 10000);
  //             slideBanners.prev()
  //         }
  //         // if it's right arrow key
  //         else if (e.keyCode === 39) {
  //             clearInterval(Autoplay);
  //             Autoplay = setInterval(() => slideBanners.next(), 10000);
  //             slideBanners.next()
  //         }
  //     });

  //     // slideBanners.addArrows();

  //     window.addEventListener('resize', () => {
  //         // slideBanners.addArrows();
  //     });
  // }

  // React.useEffect(() => {
  //     window.innerWidth < 768 ? buildSlider(mount.current) : '';
  // }, []);

  const setMain = (e, src) => {
    setMainPicture(src);
    document
      .querySelector('.principal__pictures__list__picture.set--active')
      .classList.remove('set--active');
    e.parentElement.classList.add('set--active');
  };

  React.useEffect(() => {
    // window.slideBanners.destroy(true);
    setMainPicture('');
    setTimeout(() => {
      setMainPicture(Sku.images[0].imageTag.match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]);
    }, 200);

    // try{
    //     if(document.querySelector(".principal__pictures__list__picture.set--active")){
    //         document.querySelector(".principal__pictures__list__picture.set--active").classList.remove("set--active");
    //         document.querySelector(".principal__pictures__list__picture").classList.add("set--active");
    //     }else{
    //         document.querySelector(".principal__pictures__list__picture").classList.add("set--active");
    //     }
    // }catch(e){
    //     console.log(e);
    // }
    setPictures(
      <li
        className={`principal__pictures__list__picture ${
          window.innerWidth > 768 ? 'set--active' : ''
        }`}
      ></li>
    );
    setTimeout(() => {
      setPictures(
        Sku.images.map((SkuImg, i) => (
          <li
            className={`principal__pictures__list__picture ${
              window.innerWidth > 768 && i == 0 ? 'set--active' : ''
            }`}
            key={i}
          >
            <Picture
              Src={
                window.innerWidth > 768
                  ? SkuImg.imageTag
                      .match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]
                      .allReplace({ '#width#': '50', '#height#': '50', '~': '' })
                  : SkuImg.imageTag
                      .match(/([^">]+)"*\.(?:jpg|gif|png)/)[0]
                      .allReplace({ '#width#': '700', '#height#': '700', '~': '' })
              }
              Alt={SkuImg.imageText}
              SetMain={setMain}
              SkuImg={SkuImg}
            />
          </li>
        ))
      );
    }, 200);
    console.log(pictures);
  }, [Sku]);

  // React.useEffect(() => {
  //     // setTimeout(() => {
  //         console.log(window.slideBanners.innerElements)
  //         // for(let i = 0; i <= pictures, i++){
  //         //     window.slideBanners.insert(pictures[i], i);

  //         // }
  //         if(window.slideBanners.innerElements.length > pictures.length){
  //             window.slideBanners.remove(window.slideBanners.innerElements.length - 1);
  //             console.log(window.slideBanners.innerElements.length);
  //         }
  //         window.slideBanners.init();
  //     // }, 1000);
  // }, [pictures])

  const onIndicatorPrev = React.useCallback(() => {
    setScrollToIndex({
      index: ({ activeIndex }) => activeIndex - 1,
      animated: true
    });
  }, []);

  const onIndicatorNext = React.useCallback(() => {
    setScrollToIndex({
      index: ({ activeIndex }) => activeIndex + 1,
      animated: true
    });
  }, []);

  return (
    <div className="principal__picturesContainer">
      <div className="principal__pictures">
        <span className="principal__pictures__prev"></span>

        <ul className="principal__pictures__list" ref={mount}>
          {console.log(pictures.length)}
          {window.innerWidth < 768 && pictures.length > 0 ? (
            <Carousel
              width={window.innerWidth}
              height={400}
              direction="x"
              loop={true}
              itemCount={pictures.length}
              autoplayEnabled={false}
              renderItem={({ itemIndex }) => {
                return pictures[itemIndex];
              }}
              scrollToIndex={scrollToIndex}
            >
              {pictures.length > 1 && (
                <React.Fragment>
                  <SvgPrev onPrev={onIndicatorPrev} />
                  <SvgNext onNext={onIndicatorNext} />

                  {/* onPrev={onIndicatorPrev}
                                    onNext={onIndicatorNext} */}
                </React.Fragment>
              )}
              {/* {({ activeIndex }) => <div>{activeIndex}</div>} */}
            </Carousel>
          ) : (
            pictures
          )}
        </ul>
        <span className="principal__pictures__next"></span>
      </div>
      <div className="principal__mainPicture">
        {window.innerWidth > 768 && (
          <picture>
            <source
              media="(min-width: 1920px)"
              srcSet={mainPicture.allReplace({ '#width#': '600', '#height#': '600', '~': '' })}
            />
            <source
              media="(min-width: 465px)"
              srcSet={mainPicture.allReplace({ '#width#': '500', '#height#': '500', '~': '' })}
            />
            <img
              className="principal__mainPicture__img"
              src={mainPicture.allReplace({ '#width#': '400', '#height#': '400', '~': '' })}
              onLoad={e => e.target.classList.add('loaded')}
              alt={Sku.images[0].imageText}
            />
          </picture>
        )}
      </div>
    </div>
  );
};
