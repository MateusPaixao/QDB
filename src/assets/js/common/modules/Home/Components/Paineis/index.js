import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Painel from "./_Painel.js"
import { slugify } from '../../../../global/global-index'
// import General from "../../../General/general-index"

const Methods = {
    BuildPaineisBeleza() {
        class PaineisContainer extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    Banners: [
                        {
                            Url: "",
                            Src: "",
                            Alt: ""
                        }
                    ],
                    Rendered: false
                }
                this.getBanners = this.getBanners.bind(this);
            }

            getBanners() {
                let bannersPaineis = document.querySelector(".paineisBeleza__banners"),
                    Banners = [];

                for (let i = 1; i < bannersPaineis.textContent.split('<div class="box-banner">').length; i++) {
                    let Banner = {};
                    let Content = bannersPaineis.textContent.split('<div class="box-banner">')[i];
                    // if(General.getBrowserVendor() == 'safari/webkit'){
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
                    // }else{
                    //     Banner["Url"] = Content.match(/href\s*=\s*"(.+?)"/)[1];
                    //     Banner["Src"] = Content.match(/src\s*=\s*"(.+?)"/)[1];       
                    // }
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
                    window.promotions.push(
                        this.state.Banners.map((Banner, i) =>
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
                });
            }

            componentDidMount() {
                this.getBanners();
            }

            render() {
                const Banners = () => {
                    let banners = [];
                    this.state.Banners.map((Ban, index) => {
                        banners.push(
                            <Painel Url={Ban.Url} Src={Ban.Src} Alt={Ban.Alt} Index={index} key={index} />
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