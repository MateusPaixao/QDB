import Info from "./_Item.jsx"

const Methods = {
    InfoBar(){
        class Bar extends React.Component {
            constructor(props){
                super(props);
                this.state = {
                    Infos: [
                        {
                            Content: '',
                            Icon: '<svg class="truck" xmlns="http://www.w3.org/2000/svg" width="51.146" height="37.4"><g data-name="caminhao frete"><path fill="#67605F" d="M50.007 32.146l.01-.01.03-.06.03-.06c0-.01 0-.01.01-.02s.01-.03.02-.05.01-.02.01-.03.01-.02.01-.04a1654.149 1654.149 0 0 0 .02-.06c.03-.25.619-4.965.879-8V23.8c.08-.879.12-1.618.12-2.068a9.746 9.746 0 0 0-9.74-9.74h-3.217L39.158.839v-.07a.757.757 0 0 0-.45-.689H38.7c-.02-.01-.03-.01-.05-.02s-.01 0-.02-.01-.03-.01-.04-.01-.02-.01-.03-.01a.06.06 0 0 1-.04-.01.076.076 0 0 1-.04-.01h-15.4a.755.755 0 0 0-.749.749.755.755 0 0 0 .749.749h14.51L36.1 18.63l-.38 4.315H9.69l.44-4.5h4.955a.75.75 0 1 0 0-1.5h-4.816l.919-9.49h7.892a.75.75 0 0 0 0-1.5h-7.742l.43-4.465h8.311a.755.755 0 0 0 .749-.749.755.755 0 0 0-.749-.741h-8.99a.749.749 0 0 0-.729.589V.6c0 .02-.01.04-.01.06v.02l-.51 5.284H.749A.8.8 0 0 0 0 6.743a.748.748 0 0 0 .749.749H9.69l-.919 9.49H6.094a.75.75 0 0 0 0 1.5h2.527l-.5 5.164-.769 7.991V31.787c0 .02.01.04.01.06v.02c0 .01.01.03.01.04a.037.037 0 0 0 .01.03v.01a.788.788 0 0 0 .18.29c.01.01.02.02.03.02a.656.656 0 0 0 .17.12c.01.01.03.01.04.02h.01c.02.01.04.01.06.02h.01a.637.637 0 0 0 .07.02h.01c.02 0 .04.01.07.01h3.406a5.7 5.7 0 0 0 11.308 0h12.017a5.7 5.7 0 0 0 11.308 0h3.416a.127.127 0 0 0 .06-.01c.01 0 .02 0 .02-.01s.03-.01.04-.01.02-.01.03-.01.02-.01.04-.01.02-.01.03-.01.02-.01.03-.02.02-.01.03-.02.02-.01.03-.02.02-.01.03-.02.02-.01.03-.02.02-.01.02-.02l.03-.03.02-.02.03-.03.02-.02c.01.009.023-.011.03-.021zM37.66 17.981l.39-4.5zm-1.249 6.493h.09c.02 0 .04-.01.06-.01s.02 0 .02-.01.03-.01.04-.01.02-.01.03-.01.03-.01.04-.01.02-.01.03-.01.02-.01.03-.02.02-.01.03-.02.02-.01.03-.02.02-.01.03-.02.02-.01.03-.02.02-.01.03-.02l.03-.03c.01-.01.02-.01.02-.02l.03-.03c.01-.01.01-.02.02-.02s.02-.02.02-.03.01-.02.02-.02.01-.02.02-.03a.037.037 0 0 0 .01-.03c.01-.01.01-.02.02-.04s.01-.02.01-.03.01-.02.01-.04.01-.02.01-.03.01-.02.01-.04.01-.02.01-.04a458.37 458.37 0 0 1 .02-.08v-.01l.9-10.3s5.095-.849 8.491 1.8c4.925 3.1 2.338 14.395 2.188 15.683h-2.679a5.7 5.7 0 0 0-11.308 0H22.736a5.7 5.7 0 0 0-11.308 0H8.92l.629-6.493 26.861.01zM17.082 35.922a4.206 4.206 0 1 1 4.206-4.206 4.212 4.212 0 0 1-4.206 4.206zm23.325 0a4.206 4.206 0 1 1 4.206-4.206 4.212 4.212 0 0 1-4.206 4.206z"/><path fill="#67605F" d="M7.841 12.137a.755.755 0 0 0-.749-.749H3.426a.75.75 0 0 0 0 1.5h3.666a.755.755 0 0 0 .749-.751z"/></g></svg>',
                        },
                        {
                            Content: 'tudo em até 10x sem juros <br> e parcela mínima de R$ 15',
                            Icon: '<svg class="card" width="46" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.867.425a3.204 3.204 0 0 0-.985.113L2.449 9.734c-1.757.483-2.807 2.352-2.337 4.155l1.816 6.957v13.221c0 1.867 1.486 3.394 3.305 3.394h31.956a5.301 5.301 0 0 1-.549-1.436H5.233c-1.068 0-1.906-.861-1.906-1.958V14.15c0-1.096.838-1.956 1.906-1.956h34.612c1.068 0 1.906.86 1.906 1.956v15.495c.475.015.946.097 1.398.246v-3.764c1.426-.68 2.221-2.341 1.8-3.952l-1.8-6.9V14.15c0-.893-.343-1.705-.897-2.313l-2.323-8.9C39.547 1.47 38.273.483 36.867.424zm-.237 1.433c.89-.059 1.706.523 1.948 1.45l.115.439-25.488 7.011H5.233c-1.722 0-3.143 1.368-3.29 3.098l-.366.1-.114-.44c-.277-1.058.317-2.112 1.348-2.396l33.433-9.197c.13-.035.258-.056.386-.065zM40 8.756l.543 2.08a3.194 3.194 0 0 0-.698-.078h-7.123L40 8.756zm3.15 12.063l.45 1.727a1.97 1.97 0 0 1-.45 1.846V20.82zm-4.566 8.833l-15.272.135a.735.735 0 0 0-.534.227.772.772 0 0 0-.219.55.789.789 0 0 0 .228.547.75.75 0 0 0 .538.218l14.643-.129c.392-.41.847-.75 1.347-1.009a.77.77 0 0 0-.278-.394.738.738 0 0 0-.453-.145zm-18.912.027l-9.055.08a.735.735 0 0 0-.535.227.774.774 0 0 0-.218.55.789.789 0 0 0 .227.546.748.748 0 0 0 .539.219l9.054-.08a.734.734 0 0 0 .535-.227.772.772 0 0 0 .219-.55.789.789 0 0 0-.228-.547.75.75 0 0 0-.538-.218zm21.919.653c-2.43 0-4.41 2.033-4.41 4.526 0 2.494 1.98 4.527 4.41 4.527 2.429 0 4.409-2.033 4.409-4.526 0-2.494-1.98-4.527-4.41-4.527zm0 1.06c1.87 0 3.376 1.546 3.376 3.466 0 1.921-1.505 3.467-3.376 3.467-1.872 0-3.377-1.546-3.377-3.467 0-1.92 1.505-3.466 3.377-3.466zM15.14 32.506a.245.245 0 0 0-.22.133l-.88 1.564a.262.262 0 0 0 .086.36.246.246 0 0 0 .347-.103l.88-1.564a.263.263 0 0 0-.087-.354.245.245 0 0 0-.126-.036zm26.45.117c-.929 0-1.686.756-1.724 1.7l-.001.024v.42a.225.225 0 0 0-.091.182v1.92c0 .124.098.225.22.225h3.194c.122 0 .22-.1.22-.226v-1.92a.225.225 0 0 0-.091-.18v-.022-.423c-.038-.945-.797-1.7-1.726-1.7zm-28.459.416l-2.774.041a.495.495 0 0 0-.352.156.521.521 0 0 0 .01.727.494.494 0 0 0 .357.146l2.774-.042a.495.495 0 0 0 .352-.156.52.52 0 0 0-.01-.726.494.494 0 0 0-.357-.146zm6.009 0l-2.775.041a.495.495 0 0 0-.352.156.521.521 0 0 0 .01.727.494.494 0 0 0 .357.146l2.774-.042a.49.49 0 0 0 .352-.156.514.514 0 0 0 .142-.365.528.528 0 0 0-.152-.361.5.5 0 0 0-.356-.146zm22.463.315c.055 0 .111.007.166.018.445.072.803.49.816.952.002.133.002.267.002.4h-1.996v-.342c.01-.138.03-.295.092-.427a.999.999 0 0 1 .92-.601zm-.108 1.742h.192c.035 0 .062.03.062.065v.57a.32.32 0 0 1 .16.269c0 .18-.143.326-.318.326a.323.323 0 0 1-.318-.326.32.32 0 0 1 .16-.27v-.57c0-.034.028-.064.062-.064z" fill="#67605F"/></svg>',
                        },
                        {
                            Content: 'troque pontos por produtos no <br> <a href="/clube-das-beres"> clube das berês fidelidade </a>',
                            Icon: '<svg class="star" viewBox="0 0 52 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M53.84 19.66a3.2 3.2 0 0 0-2.72-2.21l-15-1.63-6.18-13.76a3.22 3.22 0 0 0-5.88 0l-6.18 13.76-15 1.63a3.23 3.23 0 0 0-1.82 5.6l11.17 10.13-3.08 14.76a3.23 3.23 0 0 0 4.76 3.46L27 43.9l13.09 7.5a3.23 3.23 0 0 0 4.76-3.46l-3.08-14.76 11.17-10.13a3.199 3.199 0 0 0 .9-3.39zm-2.25 1.9L40 32.08a1 1 0 0 0-.31 1l3.2 15.32a1.23 1.23 0 0 1-1.81 1.32L27.5 41.88a1 1 0 0 0-1 0l-13.58 7.79a1.23 1.23 0 0 1-1.81-1.32L14.31 33a.999.999 0 0 0-.31-1L2.41 21.56a1.19 1.19 0 0 1-.35-1.28 1.2 1.2 0 0 1 1-.84l15.56-1.69a1 1 0 0 0 .8-.59l6.46-14.28a1.23 1.23 0 0 1 2.24 0l6.42 14.28a1 1 0 0 0 .8.59l15.56 1.69a1.2 1.2 0 0 1 1 .84 1.19 1.19 0 0 1-.31 1.28z" fill="#000"/></svg>',
                        },
                        {
                            Content: 'vem nos visitar em <br> <a href="/nossas-lojas"> nossas lojas </a>',
                            Icon: '<svg class="marker" width="23" height="33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.623 0a11.383 11.383 0 0 0-8.045 3.33 11.361 11.361 0 0 0-3.333 8.037c0 5.866 9.543 19.11 10.644 20.603l.734 1.03.734-1.03C13.457 30.477 23 17.233 23 11.367c0-3.015-1.199-5.906-3.332-8.038A11.383 11.383 0 0 0 11.623 0zm0 29.817c-2.261-3.23-9.506-13.94-9.506-18.45a9.492 9.492 0 0 1 2.784-6.715 9.51 9.51 0 0 1 13.443 0 9.492 9.492 0 0 1 2.784 6.715c0 4.51-7.245 15.22-9.505 18.45z" fill="#67605F"/><path d="M11.623 4.726a5.413 5.413 0 0 0-4.998 3.337 5.4 5.4 0 0 0 1.173 5.89 5.411 5.411 0 0 0 9.235-3.822 5.41 5.41 0 0 0-1.587-3.82 5.42 5.42 0 0 0-3.823-1.585zM8.07 10.131a3.547 3.547 0 0 1 2.193-3.28 3.556 3.556 0 0 1 4.844 2.588 3.547 3.547 0 0 1-1.51 3.643 3.555 3.555 0 0 1-5.527-2.95z" fill="#67605F"/></svg>',
                        }
                    ]
                }

                this.getShippingInfo = this.getShippingInfo.bind(this);
                this.setInfos = this.setInfos.bind(this);
            }

            componentDidMount(){
                this.getShippingInfo();
                this.setInfos();
            }

            getShippingInfo(){
                let StateInfos = this.state.Infos;
                StateInfos[0].Content = document.querySelector(".infoBar").textContent.match(/(?<=shippingTextInit)(.*)(?=shippingTextEnd)/)[0];
                // console.log(document.querySelector(".infoBar").textContent.match(/(?<=shippingTextInit)(.*)(?=shippingTextEnd)/));
                this.setState({
                    Infos: StateInfos
                })
            }

            setInfos(){
                setTimeout(() => {
                    for( let i = 0; i < document.querySelectorAll(".infoBar__render .__container").length; i++){
                        // console.log(document.querySelectorAll(".infoBar__render .__container .__icon")[i])
                        // console.log(this.state.Infos[i]);
                        document.querySelectorAll(".infoBar__render .__container .__icon")[i].innerHTML = this.state.Infos[i].Icon;
                        document.querySelectorAll(".infoBar__render .__container .__content")[i].innerHTML = this.state.Infos[i].Content;
                    }
                }, 500);
            }

            render(){
                const Infos = () => {
                    let items = [];
                    this.state.Infos.map((item, index) => {
                        items.push(
                            <Info Icon={item.Icon} Text={item.Content} key={index} />
                        );
                    })
                    return (
                      <React.Fragment>
                          {items}
                      </React.Fragment>
                    )
                  }
          
                  return <Infos />
            }
        
        }
        
        ReactDOM.render(
            <Bar />,
            document.getElementById('infoBar__render')
        );
    }
}
  
export default {
    init: Methods.InfoBar
};