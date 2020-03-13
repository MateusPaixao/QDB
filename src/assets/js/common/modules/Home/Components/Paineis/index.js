import React from 'react'
import ReactDOM from 'react-dom'
import { Carousel } from 'react-pannable'

import Painel from "./_Painel"
import { slugify } from '../../../../global/global-index'
import { SvgPrev, SvgNext } from '../../../General/Icons'

const PaineisContainer = () => {

    let Banners = []
    const getBanners = () => {
        let bannersPaineis = document.querySelector(".paineisBeleza__banners")

        for (let i = 1; i < bannersPaineis.textContent.split('<div class="box-banner">').length; i++) {
            let Banner = {};
            let Content = bannersPaineis.textContent.split('<div class="box-banner">')[i];
            let banUrl = Content.substring(
                Content.lastIndexOf('href="') + 6,
                Content.lastIndexOf('">')
            );
            let banImg = Content.substring(
                Content.lastIndexOf('src="') + 5,
                Content.lastIndexOf('?v=')
            );
            let banAlt = Content.substring(
                Content.lastIndexOf('alt="') + 5,
                Content.lastIndexOf('" src=')
            );

            Banner["Url"] = banUrl;
            Banner["Src"] = banImg;
            Banner["Alt"] = banAlt
            Banners.push(Banner);

        }
    }
    getBanners()


    const [scrollToIndex, setScrollToIndex] = React.useState(null);
    const [mainBanners, setBanners] = React.useState(
        Banners.map((banner, index) => (
            <li className={`principal__banners__list ${window.innerWidth > 768 && i == 0 ? 'set--active' : ''}`}>
                <Painel
                    Url={banner.Url}
                    Src={banner.Src}
                    Alt={banner.Alt}
                    Index={index}
                />
            </li>
        ))
    )

    React.useEffect(() => {
        window.promotions.push(
            Banners.map((Banner, i) =>
                (
                    {
                        'id': Banner.Src.match(/ids\/(.*)\//)[1],
                        'name': slugify(Banner.Alt),
                        'creative': 'body',
                        'position': i + 1
                    }
                )
            )
        )
    }, [])

    const onIndicatorPrev = React.useCallback(() => {
        setScrollToIndex({
            index: ({ activeIndex }) => activeIndex - 1,
            animated: true,
        });
    }, []);

    const onIndicatorNext = React.useCallback(() => {
        setScrollToIndex({
            index: ({ activeIndex }) => activeIndex + 1,
            animated: true,
        });
    }, []);

    const renderItem = React.useCallback(
        ({ itemIndex }) => {
            return mainBanners[itemIndex]
        },
        [mainBanners]
    );

    return (
        <div className="shell">
            <div className="category-pagination">
                1/4
            </div>
            <div className="principal__pictures">
                <ul className="principal__pictures__list">
                    {window.innerWidth < 768 ?
                        < Carousel
                            width={355}
                            height={355}
                            direction="x"
                            loop={true}
                            itemCount={mainBanners.length}
                            autoplayEnabled={false}
                            renderItem={renderItem}
                            scrollToIndex={scrollToIndex}
                        >
                            {
                                mainBanners.length > 1 &&
                                <React.Fragment>
                                    <SvgPrev onPrev={onIndicatorPrev} />
                                    <SvgNext onNext={onIndicatorNext} />

                                </React.Fragment>
                            }
                        </Carousel>
                        :
                        mainBanners}
                </ul>
            </div>
        </div >
    )

}
export function BuildPaineisBeleza() {
    ReactDOM.render(
        <PaineisContainer />,
        document.getElementById('paineisBeleza--render')
    )
}

export default PaineisContainer