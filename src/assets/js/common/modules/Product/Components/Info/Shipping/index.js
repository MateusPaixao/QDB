import React from 'react'

export const Shipping = () => {
    const [status, setStatus] = React.useState(false);
    const [handle, setHandle] = React.useState("+");

    React.useEffect(() => {
        status == false ? setHandle("+") : setHandle("-");
    }, [status])

    const handleStatus = () =>{
        setStatus(!status);
    }

    return (
        <div className={`info__shippingContainer container setOpen--${status}`}>
            <h2 className="info__title" onClick={() => handleStatus()}>Frete e prazos</h2>
            <span className="info__handle" onClick={() => handleStatus()}>{handle}</span>

            <p className="info__shippingContainer__content">O prazo de entrega varia de acordo com a região.</p>
            <p className="info__shippingContainer__content">Para estimar o valor e data aproximada, insira o CEP ao finalizar sua compra</p>

            <div className="info__shippingContainer__omni">
                <h3 className="info__shippingContainer__omni__title">Comprar no site e retirar na loja</h3>
                <p className="info__shippingContainer__omni__content">Você também pode comprar aqui no site e retirar em uma loja <i className="info__shippingContainer__omni__content__cite">quem disse, berenice?</i> perto de você. No momento em que você for finalizar sua compra, insira o seu CEP e selecione a opção “Retirar”. Mostraremos opções de lojas <i className="info__shippingContainer__omni__content__cite">quem disse, berenice?</i> mais próximas de você.</p>
            </div>
        </div>
    )
}