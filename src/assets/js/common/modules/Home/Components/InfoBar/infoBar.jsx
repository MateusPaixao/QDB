import Info from "./_Item.jsx"
// import General from "../../../General/general-index"

const Methods = {
    InfoBar(){
        class Bar extends React.Component {
            constructor(props){
                super(props);
                this.state = {
                    Infos: [
                        {
                            Content: '', 
                            Icon: '<svg class="__truck" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.123 31.107"><g transform="translate(-0.094 -2.44)"><rect width="25.089" height="21.326" transform="translate(0.594 2.94)"/><path d="M16,8h6.657l4.993,4.993v8.321H16Z" transform="translate(10.067 3.336)"/><circle  cx="4.391" cy="4.391" r="4.391" transform="translate(4.357 24.266)"/><circle cx="4.391" cy="4.391" r="4.391" transform="translate(25.682 24.266)"/></g></svg>', 
                        },
                        {
                            Content: 'Pode confiar! Nosso site é blindado contra ataques.',
                            Icon: '<svg xmlns="http://www.w3.org/2000/svg" class="__locked" viewBox="0 0 27.704 34"><g transform="translate(-5)"><path d="M28.926,12.664V9.13C28.926,4.1,24.406,0,18.852,0S8.778,4.1,8.778,9.13v3.534A4.556,4.556,0,0,0,5,17.145v12.3A4.557,4.557,0,0,0,9.552,34h18.6A4.557,4.557,0,0,0,32.7,29.448v-12.3A4.555,4.555,0,0,0,28.926,12.664ZM10.037,9.13c0-4.34,3.954-7.87,8.815-7.87s8.815,3.53,8.815,7.87v3.463H10.037ZM31.444,29.448a3.3,3.3,0,0,1-3.292,3.292H9.552a3.3,3.3,0,0,1-3.292-3.292v-12.3a3.3,3.3,0,0,1,3.292-3.292h18.6a3.3,3.3,0,0,1,3.292,3.292Z" transform="translate(0 0)"/><path d="M25.519,28A2.521,2.521,0,0,0,23,30.519V34.3a2.519,2.519,0,0,0,5.037,0V30.519A2.521,2.521,0,0,0,25.519,28Zm1.259,6.3a1.259,1.259,0,0,1-2.519,0V30.519a1.259,1.259,0,0,1,2.519,0Z" transform="translate(-6.667 -10.37)"/></g></svg>',  
                        },
                        {
                            Content: 'Tudo em até 10x sem juros e parcela mínima de R$ 15.',
                            Icon: '<svg xmlns="http://www.w3.org/2000/svg" class="__card" viewBox="0 0 43.811 27.747"><path d="M43.811 24.096V3.647A3.651 3.651 0 0040.16-.004H3.651A3.651 3.651 0 000 3.647v20.449a3.651 3.651 0 003.651 3.651H40.16a3.651 3.651 0 003.651-3.651zM3.651 1.461H40.16a2.191 2.191 0 012.19 2.186v1.46H1.46v-1.46a2.191 2.191 0 012.191-2.186zM1.46 6.572h40.89v4.381H1.46zm2.191 19.715a2.191 2.191 0 01-2.191-2.191V12.413h40.89v11.683a2.191 2.191 0 01-2.19 2.191z"/></svg>'
                        },
                        {
                            Content: '<a href="/servicos">Faça sua make na loja </a>e receba 100% do valor em produtos.',
                            Icon: '<svg xmlns="http://www.w3.org/2000/svg" class="__cosmetics" viewBox="0 0 33.448 35"><path d="M9.381 16.152h-.383v-3.109a.667.667 0 00-.667-.667h-.055V6.015a.667.667 0 00-.369-.6L2.744 2.833a.667.667 0 00-.966.6v8.945h-.057a.667.667 0 00-.667.667v3.109H.667a.667.667 0 00-.667.667v17.511a.667.667 0 00.667.667h8.714a.667.667 0 00.667-.667V16.819a.667.667 0 00-.667-.667zM3.11 4.512l3.829 1.915v5.951H3.11zm-.724 9.2h5.278v2.442H2.386zm6.328 19.955h-7.38V17.486h7.38zM32.78 27.069H11.109a.667.667 0 100 1.334h20.61l-.153.317a5.089 5.089 0 01-4.561 2.867h-15.9a.667.667 0 100 1.334h15.9a6.43 6.43 0 005.764-3.623l.613-1.274a.667.667 0 00-.6-.956zM9.569 4.906a13.426 13.426 0 1117.72 20.164.667.667 0 10.855 1.024A14.761 14.761 0 108.66 3.927a.667.667 0 10.907.979z"/></svg>', 
                        }
                        // {
                        //     Content: 'vem nos visitar em <br> <a href="/nossas-lojas"> nossas lojas </a>',
                        //     Icon: '<svg class="marker" width="23" height="33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.623 0a11.383 11.383 0 0 0-8.045 3.33 11.361 11.361 0 0 0-3.333 8.037c0 5.866 9.543 19.11 10.644 20.603l.734 1.03.734-1.03C13.457 30.477 23 17.233 23 11.367c0-3.015-1.199-5.906-3.332-8.038A11.383 11.383 0 0 0 11.623 0zm0 29.817c-2.261-3.23-9.506-13.94-9.506-18.45a9.492 9.492 0 0 1 2.784-6.715 9.51 9.51 0 0 1 13.443 0 9.492 9.492 0 0 1 2.784 6.715c0 4.51-7.245 15.22-9.505 18.45z" fill="#67605F"/><path d="M11.623 4.726a5.413 5.413 0 0 0-4.998 3.337 5.4 5.4 0 0 0 1.173 5.89 5.411 5.411 0 0 0 9.235-3.822 5.41 5.41 0 0 0-1.587-3.82 5.42 5.42 0 0 0-3.823-1.585zM8.07 10.131a3.547 3.547 0 0 1 2.193-3.28 3.556 3.556 0 0 1 4.844 2.588 3.547 3.547 0 0 1-1.51 3.643 3.555 3.555 0 0 1-5.527-2.95z" fill="#67605F"/></svg>',
                        // }
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
                let StateInfos = this.state.Infos, Content = document.querySelector(".infoBar").textContent;
                // if(General.getBrowserVendor() == 'safari/webkit'){
                    StateInfos[0].Content = Content.substring(
                        Content.lastIndexOf('shippingTextInit') + 16, 
                        Content.lastIndexOf('shippingTextEnd')
                    )
                // }else{
                //     StateInfos[0].Content = Content.match(/(?<=shippingTextInit)(.*)(?=shippingTextEnd)/)[0];
                // }
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