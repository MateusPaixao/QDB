class makeContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            card: [
                {
                    image: '/arquivos/make-1.jpg',                    
                    name: 'Pra brilhar na festa',
                    description: 'Quer brilhar muito neste carnaval?  Faça sua maquiagem com um de nossos especialistas e saia de nossa loja direto pra festa.',
                },
                {
                    image: '/arquivos/make-2.jpg',                    
                    name: 'Pra chegar chegando',
                    description: 'Sabe aquela maquiagem que é colorida e elegante ao mesmo tempo? Agende um horário com o Menu de Makes e encha seu carnaval de cor.',
                },
                {
                    image: '/arquivos/make-3.jpg',                    
                    name: 'Pra acertar na folia',
                    description: 'Faça aquela maquiagem que é a cara do Carnaval, e claro, sua cara também. Agende seu horário com um de nossos especialistas.',
                }
            ]
        }
    }

    componentDidMount(){
        console.log("Make container montado")
    }

    render(){        
        console.log(this.state.card)
        return(
            <div className="makeContainer">
                <div className="productContainer__text">
                    <h2>Conheça nosso Menu de Makes especial de Carnaval.</h2>
                    <h2>Pra entrar ainda mais no clima de festa, você escolhe o look e a gente faz.</h2>
                </div>      

                <div className="makeContainer__product">
                {
                    this.state.card.map((card) => 
                    
                        <div className="makeContainer__individual">
                            <div className="makeContainer__individual__image">
                                <img src={card.image} alt="" srcset=""/>
                            </div>

                            <div className="makeContainer__individual__info">
                                <h2>{card.name}</h2>
                                <h2>{card.description}</h2>

                                <a class="productCard__button makeContainer__button" href="https://www.servicosquemdisseberenice.com.br/">Agendar</a>
                            </div>

                        </div>
                    
                    )}

                        <div className="makeContainer__individual more">
                            <div className="makeContainer__more">
                                <a href="https://www.quemdisseberenice.com.br/servicos">
                                    <img src="/arquivos/plus_icon.png" alt=""/>
                                    <h2>Saiba mais sobre o menu de makes</h2>
                                </a>
                            </div>
                        </div>
                </div>

                 {/* {
                     this.state.card.map((card) => 
                        <div className={`productCard ${card.class}`}>
                            <div>
                                <h1>{card.name}</h1>
                                <h2>{card.description}</h2>
                                <span>{card.price}</span>
                                <a className="productCard__button" href="#">Quero esse</a>
                            </div>
                            <div>
                                <img src={card.image} alt="" srcset=""/>
                            </div>
                        </div>
                     )
                 } */}
                
            </div>
        )
    }
}

export default makeContainer;