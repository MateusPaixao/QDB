class makeContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            card: [
                {
                    image: '/arquivos/ultra-glitter.png',
                    banner: '',
                    name: 'Ultra Glitter Multiuso',
                    description: 'Com tecnologia inovadora, é fácil de aplicar e de retirar.',
                    price: 'R$20,00',
                    class: 'glitter'
                },
                {
                    image: '/arquivos/locao-glitter.png',
                    banner: '',
                    name: 'Loção Glitter',
                    description: 'Tá na dúvida de onde brilhar? Brilha no corpo todo.',
                    price: 'R$20,00',
                    class: 'locao'
                },
                {
                    image: '/arquivos/sombra-refil.png',
                    banner: '',
                    name: 'Sombra Refil',
                    description: 'Duas novas cores vibrantes que faltavam na sua paleta.',
                    price: 'R$20,00',
                    class: 'sombra'
                }
            ]
        }
    }

    componentDidMount(){
        console.log("Make container montado")
    }

    render(){        
        
        return(
            <div className="makeContainer">
                <div className="makeContainer__text">
                    <h2>Sua maquiagem de Carnaval está aqui!</h2>
                    <h2>Conheça nossos lançamentos e curta a folia com a tranquilidade de quem sabe que vai conseguir tirar todo o glitter do corpo.</h2>
                </div>      

                 {
                     this.state.card.map((card) => 
                        <div className={`makeCard ${card.class}`}>
                            <div>
                                <h1>{card.name}</h1>
                                <h2>{card.description}</h2>
                                <span>{card.price}</span>
                                <a className="makeCard__button" href="#">Comprar</a>
                            </div>
                            <div>
                                <img src={card.image} alt="" srcset=""/>
                            </div>
                        </div>
                     )
                 }
                
            </div>
        )
    }
}

export default makeContainer;