import React from 'react';
import ReactDOM from 'react-dom';
import Breadcrumbs from '../../General/Breadcrumbs';
import ImageText from './components/ImageText';

const Methods = {
    init() {
        Methods.BuildPage();
    },

    BuildPage() {
        class Beneficios extends React.Component {
            constructor(props) {
                super(props);
                this.state = {};
            }

            render() {
                return (
                    <>
                        <Breadcrumbs />
                        <div className="principal-banner">
                            <img src="/arquivos/Banner-Desk-LP-10-MOTIVOS-TIME_01_01vatual.gif" className="banner-desk" />
                            <img src="/arquivos/LP-MOBILE_02_03.gif" className="banner-mobile" />
                        </div>
                        <div className="wrapper-a">

                            <ImageText
                                number="1"
                                title="Entrega Expressa pros estados de SP | MG | RJ | ES | PR | SC | RS | GO | BA"
                                text="Após a confirmação do pagamento do seu pedido, a entrega é feita em até 3 dias úteis. Essa modalidade fica sempre ativa no site, ou seja, para compras a qualquer hora!*Lembre-se de confirmar no carrinho se sua cidade é atendida."
                                class="hidden"
                            />
                            <ImageText
                                number="2"
                                title="Entrega Super Expressa pro estado de SP"
                                text="Pedidos com pagamento confirmado até às 18:00h terão a entrega feita em 1 dia útil.*Lembre-se de confirmar no carrinho se sua localidade é atendida."
                                class="hidden"
                            />
                            <ImageText
                                number="3"
                                title="Frete grátis nas compras acima de R$79"
                                text="Reduzimos o valor mínimo de compra para você ganhar o benefício do frete grátis! Essa regra vale para a modalidade de entrega padrão (econômica)."
                                class="hidden"
                            />
                            <ImageText
                                number="4"
                                title="Devolução garantida de itens para pele"
                                text="Comprou algum produto pra pele' até o dia 15/04 e errou no tom? Você pode trocá-lo ou devolvê-lo mesmo tendo aberto a embalagem! Entre em contato com nosso SAC pelo telefone 0800 726 6482 em até 15 dias após a data de recebimento do produto.'base, pó, iluminador, corretivo, contorno, BB creme e CC creme."
                                class="hidden"
                            />
                            <ImageText
                                number="5"
                                title="Troca e devolução com prazos estendidos"
                                text="Caso se arrependa da compra de qualquer item, estendemos o prazo de troca e devolução para 30 dias após o recebimento do produto. A embalagem dos produtos não pode ter sido aberta.Ação válida para compras realizadas até dia 30/04."
                                link="/institucional/trocas-e-devolucoes"
                                more="Saiba mais"
                            />
                            <ImageText
                                number="6"
                                title="Cupom da Loja com desconto e frete grátis"
                                text="Cuidamos do nosso time de loja! Escolha o cupom da sua preferida, ganhe 10% de desconto acumulativos + frete grátis e parte da venda será revertida para a loja selecionada."
                                link="/nossas-lojas"
                                more="Saiba mais"
                            />
                            <ImageText
                                number="7"
                                title="Vendas pelo WhatsApp"
                                text="Compre seus produtos preferidos também pelo Whats e receba na sua casa em até 1 dia útil! Estamos disponíveis de segunda a sexta-feira, das 8h às 18h, e também aos sábados, das 8h às 12h. É só chamar no (41) 98775-7336 ou clicar no link pra conversar com a gente: "
                                link="https://bit.ly/3azxpKW"
                                more="Clique aqui !"
                            />
                            <ImageText
                                number="8"
                                title="Parcelamento em até 10x"
                                text="Nos cartões Visa, Mastercard, Elo, American Express, Hipercard, Diners e JCB com parcela mínima de R$15."
                                class="hidden"
                            />
                            <ImageText
                                number="9"
                                title="Opção de pagamento em boleto"
                                text="Caso prefira pagar por boleto, também aceitamos! É só escolher 'boleto bancário' nas opções de pagamento quando estiver finalizando a sua compra."
                                class="hidden"
                            />
                            <ImageText
                                number="10"
                                title="Site 100% seguro"
                                text="Certificado por Loja Confiável, Selo Site Blindado e Compre&Confie."
                                class="hidden"
                            />
                        </div>
                    </>
                );
            }
        }

        ReactDOM.render(<Beneficios />, document.getElementById('root'));
    }
};

export default {
    init: Methods.init
};
