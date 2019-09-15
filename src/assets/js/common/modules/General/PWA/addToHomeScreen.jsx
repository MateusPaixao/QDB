const Methods = {
    init(){
        Methods.setOffline();
    },
    setOffline(){
        class AddScreen extends React.Component { 
            constructor() {
              this.Pwa = this.Pwa.bind(this);
            }
            Pwa(){
                window.addEventListener('beforeinstallprompt', (e) => {
                    // Prevent Chrome 76 and later from showing the mini-infobar
                    e.preventDefault();
                    // Stash the event so it can be triggered later.
                    deferredPrompt = e;
                    showInstallPromotion();
                });
                window.addEventListener('appinstalled', (evt) => {
                    console.log('a2hs installed');
                });
                
                if (window.matchMedia('(display-mode: standalone)').matches) {
                    console.log('display-mode is standalone');
                }
            }           
            render(){
                this.Pwa();
                return (
                    <div className="ath-container banner-bottom-center">
                        <div className="ath-banner-title">
                            <p>Adicionar Quem Disse Berenice a Tela Inicial?</p>
                            <small>Isso trará uma navegação muito mais rápida</small>
                        </div>
                        <div className="ath-banner">
                            <div className="ath-banner-cell">
                                <button className="btn btn-cancel btn-link">Agora não</button>
                            </div>
                            <div className="ath-banner-cell">
                                <button className="btn btn-install btn-success">Claro!</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        ReactDOM.render(
            <AddScreen />,
            document.getElementById('add2HScreen')
        );
    }
}

export default {
    init: Methods.init
};