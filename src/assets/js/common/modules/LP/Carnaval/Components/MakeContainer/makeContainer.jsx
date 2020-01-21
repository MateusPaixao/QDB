class makeContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            card: [
                {
                    image: '/arquivos/make-1.jpg',                    
                    name: 'Pra brilhar na festa',
                    alt: 'Banner passo a passo carnaval quem disse, Berenice?',
                    title: 'passo a passo carnaval quem disse, Berenice?',
                    description: 'Quer brilhar muito neste carnaval?  Faça sua maquiagem com um de nossos especialistas e saia de nossa loja direto pra festa.',
                },
                {
                    image: '/arquivos/make-2.jpg',                    
                    name: 'Pra chegar chegando',
                    alt: 'Banner passo a passo carnaval quem disse, Berenice?',
                    title: 'passo a passo carnaval quem disse, Berenice?',
                    description: 'Sabe aquela maquiagem que é colorida e elegante ao mesmo tempo? Agende um horário com o Menu de Makes e encha seu carnaval de cor.',
                },
                {
                    image: '/arquivos/make-3.jpg',                    
                    name: 'Pra acertar na folia',
                    alt: 'Banner passo a passo carnaval quem disse, Berenice?',
                    title: 'passo a passo carnaval quem disse, Berenice?',
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
                    <p>Pra entrar ainda mais no clima de festa, você escolhe o look e a gente faz.</p>
                </div>      

                <div className="makeContainer__product">
                {
                    this.state.card.map((card) => 
                    
                        <div className="makeContainer__individual">
                            <div className="makeContainer__individual__image">
                                <img src={card.image} alt={card.alt} title={card.title}/>
                            </div>

                            <div className="makeContainer__individual__info">
                                <h3>{card.name}</h3>
                                <p>{card.description}</p>

                                <a class="productCard__button makeContainer__button" href="https://www.servicosquemdisseberenice.com.br/">Agendar</a>
                            </div>

                        </div>
                    
                    )}

                        <div className="makeContainer__individual more">
                            <div className="makeContainer__more">
                                <a href="https://www.quemdisseberenice.com.br/servicos">
                                    <img src="/arquivos/ver_mais.png?v=12.png" alt=""/>
                                    <h2>Conheça as nossas outras opções</h2>
                                </a>
                            </div>
                        </div>
                </div>                
            </div>
        )
    }
}

export default makeContainer;