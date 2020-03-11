const Methods = {
    init(){
        Methods.modal_infoBar();
    },
    modal_infoBar(){
        let _itens = document.querySelectorAll('.infoBar__render .__container');
        var _lightBox = document.createElement('div');
        _lightBox.classList.add("__lightBox");
        var _modalContent = document.createElement('div');
        _modalContent.classList.add("__modalContent");
        document.body.appendChild(_lightBox);
        document.querySelector('.infoBar__render').appendChild(_modalContent);
        for(let i = 0; i < _itens.length; i++){
            var _itemInfo =  _itens[i];
            // var _itemHref =  _itens[i].querySelector('.__content a');
            // var _itemLink = "<a class='_ctaModal' href='" +
            // _itemHref.href +
            // "'>aproveite!</a>";
            _itemInfo.addEventListener("click", openInfoModal); 
        }
        function openInfoModal() {
            document.body.classList.add("__modal--on");
            _modalContent.innerHTML = "<span class='__closeModal'>X</span>" + 
            this.innerHTML; 
            document.querySelector('.__closeModal').addEventListener("click", closeInfoModal);
        }
        function closeInfoModal() { 
            document.body.classList.remove("__modal--on");
        }

    }
}
export default {
    init: Methods.init
}