var domIsReady = (function(domIsReady) {
    var isBrowserIeOrNot = function() {
       return (!document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie');
    }
 
    domIsReady = function(callback) {
       if(callback && typeof callback === 'function'){
          if(isBrowserIeOrNot() !== 'ie') {
             document.addEventListener("DOMContentLoaded", function() {
                return callback();
             });
          } else {
             document.attachEvent("onreadystatechange", function() {
                if(document.readyState === "complete") {
                   return callback();
                }
             });
          }
       } else {
          console.error('The callback is not a function!');
       }
    }
    
    return domIsReady;
})(domIsReady || {});

var showModal= false,
modalBirthday= false,
isMobile= window.innerWidth <= 768, 
btnMov= false,
document = {
    error: '',
    message:'',
    document: '',
    email: '',
    nome: '',
    id: ''
},
club={
    status:'',
    card: '',
    canScore: '',
    canChange: '',
    score: '',
    extract: '',
    birthday: ''
}
   function CheckEmail(){
      // vtexjs.checkout.getOrderForm().then(function(orderForm) {
      //     console.log('seu email é:', orderForm.clientProfileData.email, '<3')
      //     searchMasterData(orderForm.clientProfileData.email);
      // });
      $.ajax({
          url: "https://www.quemdisseberenice.com.br/no-cache/profileSystem/getProfile",
          success: function( data ) {
            searchMasterDataLogin(data.Email);
            console.log(data);
            document.id = data.UserId;
            document.email = data.Email;
            document.nome = data.FirstName;
        }
      });
      searchMasterDataLogin(document.email);
      GetOrders(3, "._last-orders");
   }
   var statusOrder = function (status) {
       var OrderStatus = {
            "pci": "",
            "meuspedidos": "",
            "timeline": "",
       }
        switch (status) {
            case 'waiting-for-seller-confirmation':
                OrderStatus = {
                    "pci": "Authorizing",
                    "meuspedidos": "Processando Pagamento",
                    "timeline": "Realizado"
                }
                break;
            case 'payment-pending':
                OrderStatus = {
                    "pci": "Authorizing",
                    "meuspedidos": "Pagamento Pendente",
                    "timeline": "Realizado"
                }
                break;
            case 'payment-approved':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    }
                break;
            case 'payment-approved':
                    OrderStatus = {
                        "pci": "Authorizing",
                        "meuspedidos": "Processando Pagamento",
                        "timeline": "Realizado"
                    }
                break;
            case 'payment-denied':
                    OrderStatus = {
                        "pci": "Cancelled",
                        "meuspedidos": "Pagamento Negado",
                        "timeline": "Cancelado"
                    }
                break;
            case 'waiting-for-seller-decision':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Verificando possibilidade de cancelamento",
                        "timeline": "Realizado"
                    }
                break;
            case 'waiting-ffmt-authorization---authorize-fulfillment':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    }
                break;
            case 'window-to-cancel':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    }
                break;
            case 'ready-for-handling':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    }
                break;
            case 'start-handling':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    }
                break;
            case 'handling':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    }
                break;
            case 'ship---invoice':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Entregando Produtos",
                        "timeline": "Enviado"
                    }
                break;
            case 'invoiced':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Faturado",
                        "timeline": "Enviado"
                    }
                break;
            case 'request-cancel':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Cancelado",
                        "timeline": "Cancelado"
                    }
                break;
            case 'order-accepted':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Processando Pedido",
                        "timeline": "Realizado"
                    }
                break;
            case 'shipped---invoiced':
                    OrderStatus = {
                        "pci": "Finished",
                        "meuspedidos": "Enviado",
                        "timeline": "Enviado"
                    }
                break;
            case 'cancel':
                    OrderStatus = {
                        "pci": "Cancelled",
                        "meuspedidos": "Processando Cancelamento",
                        "timeline": "Cancelado"
                    }
                break;
            case 'canceled':
                    OrderStatus = {
                        "pci": "Cancelled",
                        "meuspedidos": "Cancelado",
                        "timeline": "Cancelado"
                    }
                break;
        
            default:
                break;
        }
        return OrderStatus;
    };
    // Converte a data de servidor em data de usuario => 2016-07-14T14:50:38.117' to 14/07/2016 11:50:38
    var dateServeToDateUser = function (dataServer) {

        if (!dataServer) {

            return;

        }
        var now = new Date(dataServer);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1);

        if (month.length == 1) {

            month = "0" + month;

        }

        var day = "" + now.getDate();

        if (day.length == 1) {

            day = "0" + day;

        }

        var hour = "" + now.getHours();

        if (hour.length == 1) {

            hour = "0" + hour;

        }

        var minute = "" + now.getMinutes();

        if (minute.length == 1) {

            minute = "0" + minute;

        }

        var second = "" + now.getSeconds();

        if (second.length == 1) {

            second = "0" + second;

        }

        return day + "/" + month + "/" + year;

    };
    function formatNumber(num) {
        var NumFormat = num.toString().slice(0, -2) +","+num.toString().slice(-2);
        
        return NumFormat.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
   function GetOrders(qtd, Ellist){
       let html = '';
       let LastOrders = new Promise((resolve, reject) => {

            let request = new XMLHttpRequest();
            let url = "https://www.quemdisseberenice.com.br/api/checkout/pub/orders";
            request.open('GET', url);
            request.send();

            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    resolve(JSON.parse(request.response))
                }
              }
       });
       LastOrders.then( (orders) => {
           let maxIndex = qtd == "index" ? orders.length : qtd;
           for (let i = 0; i < maxIndex; i++) {
               const element = orders[i];
               console.log(element);
               html += 
                '<li class="_order _order-' + i + '">' +
                    '<a href="#/orders/'+ element.orderId +'"><span class="_info">' +
                        '<span class="_color-status ' + statusOrder(element.state).timeline + '"></span>' +
                        '<p class="_id"> ' + dateServeToDateUser(element.creationDate) + ' | ' + element.orderId.substring(0, element.orderId.lastIndexOf('qbbr')) + ':</p>' +
                        '<p class="_status">' + statusOrder(element.state).meuspedidos + ' <svg viewbox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '</p>' +
                    '</span></a>' +
                '</li>';
           }
           document.querySelector(Ellist).innerHTML = Ellist == "._last-orders" ? "<b>Últimos Pedidos:</b>" + html : html;
           document.querySelectorAll("._last-orders ._order").forEach(function(el){
               el.addEventListener("click", function(){
                document.querySelector("._profile ._initial").classList.add("--top");
                document.querySelector(".clube-das-beres-container").classList.add("hidden");
                document.querySelector(".clube-das-beres-container").style.display = "none";
                document.querySelector(".render-route-my-account-portal").style.display = "initial";
                document.querySelectorAll("._menu_item").forEach((item)=>{
                    item.classList.remove("--active");
                });
                document.querySelector("._menu_item.--orders").classList.add("--active");
                setTimeout(() => {
                    scrollIt(document.querySelector('.vtex-account'), 500, 'easeOutQuad');
                }, 500);
            });
           });
        }).catch( (orders) => {
           console.log("Erro ao buscar pedidos");
           console.log(orders);
        });
   }
   document.querySelector("._menu_item.--club").addEventListener('click', function(){
       document.querySelector("._profile ._initial").classList.add("--top");
       document.querySelector(".clube-das-beres-container").classList.remove("hidden");
       document.querySelector(".clube-das-beres-container").style.display = "flex";
       document.querySelector(".render-route-my-account-portal").style.display = "none";
       document.querySelectorAll("._menu_item").forEach((item)=>{
        item.classList.remove("--active");
    });
    this.classList.add("--active");
   });
   document.querySelector("._menu_item.--orders").addEventListener('click', function(){
       document.querySelector("._profile ._initial").classList.add("--top");
       document.querySelector(".clube-das-beres-container").classList.add("hidden");
       document.querySelector(".clube-das-beres-container").style.display = "none";
       document.querySelector(".render-route-my-account-portal").style.display = "initial";
       window.location.href = "#/orders";
       document.querySelectorAll("._menu_item").forEach((item)=>{
           item.classList.remove("--active");
       });
       this.classList.add("--active");
   });
   document.querySelector("._menu_item.--account").addEventListener('click', function(){
       document.querySelector("._profile ._initial").classList.add("--top");
       document.querySelector(".clube-das-beres-container").classList.add("hidden");
       document.querySelector(".clube-das-beres-container").style.display = "none";
       document.querySelector(".render-route-my-account-portal").style.display = "initial";
       window.location.href = "#/profile";
       document.querySelectorAll("._menu_item").forEach((item)=>{
        item.classList.remove("--active");
    });
    this.classList.add("--active");
   });
    function validateCPF(cpf){
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        
        digitos_iguais = 1;
        
        if (cpf.length < 11)
            return false;
        
        for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1)){
                digitos_iguais = 0;
                break;
            }

        if(!digitos_iguais){
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;
            
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                
                if (resultado != digitos.charAt(0))
                    return false;
              
                numeros = cpf.substring(0,10);
                soma = 0;
              
                for (i = 11; i > 1; i--)
                    soma += numeros.charAt(11 - i) * i;
                
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                
                if (resultado != digitos.charAt(1))
                    return false;
                return true;
        }

        else
            return false;  
    }
    function toggle(){
        showModal = !showModal;
    }
    function formatData(date){
        return date.split("T")[0].split("-")[2]  + "/" + date.split("T")[0].split("-")[1] + "/" + date.split("T")[0].split("-")[0];
    }
    function header(){
        return {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json; charset=utf-8',
            'x-vtex-api-appKey': 'vtexappkey-qbbrqa-MPHBCP',
            'x-vtex-api-appToken': 'FFWRYHSCIANVOSLQWGMMUKPLHZQPVIHJBLKVKPUJVRWDTKSHBHZABQXVPLKYRDHZSDUDHQFGMCRDNLSWHIOOJHIKOPFZEVSSKWLPPOAKBSNYZTHDSORJOSQLVJOSKGCR'
        }
    }
    function xmlToJson(xml){
        var obj = {};

        if (xml.nodeType == 1){
            if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        }else if (xml.nodeType == 3){
            obj = xml.nodeValue;
        }

        if(xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3){
            obj = xml.childNodes[0].nodeValue;
        }

        else if(xml.hasChildNodes()){
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        
        return obj;
    }
    function searchExtract(_card, _document){
        var _soap = '<?xml version="1.0" encoding="utf-8"?>'
        + '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'
            + '<soap:Body>'
                + '<ExtratoParticipante xmlns="http://tempuri.org/">'
                + '<pAut>'
                    + '<Canal>3</Canal>'
                    + '<Usuario>admin</Usuario>'
                    + '<Senha>admin</Senha>'
                + '</pAut>'
                + '<pCodigoCartao>' + _card + '</pCodigoCartao>'
                + '<pCPF>' + _document + '</pCPF>'
                + '<dataInicial>'
                    + '<Dia>1</Dia>'
                    + '<Mes>1</Mes>'
                    + '<Ano>2012</Ano>'
                + '</dataInicial>'
                + '<dataFinal>'
                    + '<Dia>31</Dia>'
                    + '<Mes>12</Mes>'
                    + '<Ano>2020</Ano>'
                + '</dataFinal>'
                + '<pTipoParticipante>2</pTipoParticipante>'
                + '</ExtratoParticipante>'
            + '</soap:Body>'
        + '</soap:Envelope>';

        $.ajax({
            url: "http://fidelidade.quemdisseberenice.com.br/fidelidade/businessfidelidade/Site/operacoes.asmx?op=ExtratoParticipante",
            type: "POST",
            data: _soap,
            contentType: "text/xml; charset=\"utf-8\"",
            dataType: 'xml',
            headers: {
                SOAPAction: 'http://tempuri.org/ExtratoParticipante'
            },
            success:function (data){
                var _extract = xmlToJson(data)['soap:Envelope']['soap:Body'].ExtratoParticipanteResponse.ExtratoParticipanteResult.ItensExtrato.anyType;

                var _arrayExtract = [];

                console.log('>>>>>>>>>>>>>>> extrato', _extract);


                if(_extract != undefined) {
                    for (var i = _extract.length - 1; i >= 0; i--) {
                        var _object = {
                            "status": _extract[i].Status,
                            "cnpj": _extract[i].CNPJ,
                            "canal": _extract[i].Canal,
                            "cartaoCliente": _extract[i].CartaoCliente,
                            "data": formatData(_extract[i].Data),
                            "pontos": _extract[i].Pontos,
                            "validade": _extract[i].Validade
                        }

                        _arrayExtract.push(_object)
                    }

                    club.extract = _arrayExtract;
                } else {
                    club.extract = false;
                }
            },
            error:function (error){
                console.log(error)
            }
        });
    };
    var getDateServeToDateUser = function(dataServer){
        if (!dataServer) {
            return;
        }
    
        var now = new Date(dataServer);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1);
    
        if (month.length == 1) {
            month = "0" + month;
        }
        var day = "" + now.getDate();
    
        if (day.length == 1) {
            day = "0" + day;
        }
        var hour = "" + now.getHours();
    
        if (hour.length == 1) {
            hour = "0" + hour;
        }
        var minute = "" + now.getMinutes();
    
        if (minute.length == 1) {
            minute = "0" + minute;
        }
        var second = "" + now.getSeconds();
    
        if (second.length == 1) {
            second = "0" + second;
        }
        
        return day + "/" + month + "/" + year;
    };
    var getDateServe = function(){
        var _this = this

        $.get('/no-cache/HoraAtualServidor.aspx', function(date){
            _this.formatDateVtex(date)
            _this.formatMonth(date)
            _this.countDaysMouth(date)
        });
    };
    var formatDateVtex = function (date) {
        
        var array = date.split(" ");
        var month = array[0];
        var day = array[1].replace(",","");
        var year = array[2];
        var hours = array[3];
        // transformar em objeto depois

        switch (month) {
            case "jan":
                month = "1";
                break;
            case "fev":
                month = "2";
                break;
            case "mar":
                month = "3";
                break;
            case "abr":
                month = "4";
                break;
            case "mai":
                month = "5";
                break;
            case "jun":
                month = "6";
                break;
            case "jul":
                month = "7";
                break;
            case "ago":
                month = "8";
                break;
            case "set":
                month = "9";
                break;
            case "out":
                month = "10";
                break;
            case "nov":
                month = "11";
                break;
            case "dez":
                month = "12";
                break;
        }

        return {
            "Dia" : day,
            "Mes" : month
        };
    };
    var formatMonth = function (date) {


        var array = date.split(" ");
        var month = array[0];
        var day = array[1].replace(",","");
        var year = array[2];
        var hours = array[3];
        // transformar em objeto depois

        switch (month) {
            case "jan":
                month = "janeiro";
                break;
            case "fev":
                month = "fevereiro";
                break;
            case "mar":
                month = "março";
                break;
            case "abr":
                month = "abril";
                break;
            case "mai":
                month = "maio";
                break;
            case "jun":
                month = "junho";
                break;
            case "jul":
                month = "julho";
                break;
            case "ago":
                month = "agosto";
                break;
            case "set":
                month = "setembro";
                break;
            case "out":
                month = "outubro";
                break;
            case "nov":
                month = "novembro";
                break;
            case "dez":
                month = "dezembro";
                break;
        }

        return {
            "Dia" : day,
            "Mes" : month
        };
    };
    var countDaysMouth = function(date){
        var array = date.split(" ");
        var month = array[0];
        var day = array[1].replace(",","");
        var year = array[2];
        var hours = array[3];
        // transformar em objeto depois

        switch (month) {
            case "jan":
                month = "31";
                break;
            case "fev":
                month = "28";
                break;
            case "mar":
                month = "31";
                break;
            case "abr":
                month = "30";
                break;
            case "mai":
                month = "31";
                break;
            case "jun":
                month = "30";
                break;
            case "jul":
                month = "31";
                break;
            case "ago":
                month = "31";
                break;
            case "set":
                month = "30";
                break;
            case "out":
                month = "31";
                break;
            case "nov":
                month = "30";
                break;
            case "dez":
                month = "31";
                break;
        }

        return {
            "Dia" : day,
            "Mes" : month
        };
    };
    var getBirthday = function(dateBirthday){
        $.get('/no-cache/HoraAtualServidor.aspx', function(date){
            
            var dateUser = dateBirthday.Mes;
            var dateFromServer = formatDateVtex(date).Mes;
            var monthBirthdayUser = formatMonth(date).Mes;
            var dayMonth = countDaysMouth(date).Mes;

            if(dateUser == dateFromServer){
                //$('.selo-birthday').show();
                $('.modal-aniversario .mes-aniversario').text(dateUser);
                $('.modal-aniversario .mesPorExtenso').text(monthBirthdayUser);
                $('.modal-aniversario .diaDoMes').text(dayMonth);
                
                $('.selo-birthday').click(function(){
                    $('body').addClass('modal-on');
                })
            
                $('.modal-aniversario .close-modal, .modal-aniversario button, .modal-overlay').click(function(){
                    $('body').removeClass('modal-on');
                })
            }
        });
    };
    function searchFidelity(_document){
        // var _soap = '<?xml version="1.0" encoding="utf-8"?>'
        // + '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'
        //     + ' <soap:Body>'
        //         + '<ConsultaResumoCliente xmlns="http://tempuri.org/">'
        //         + ' <pAut>'
        //             + '<Canal>1</Canal>'
        //             + '<Usuario>admin</Usuario>'
        //             + '<Senha>admin</Senha>'
        //         + ' </pAut>'
        //         + ' <pCPF>'+ _document +'</pCPF>'
        //         + '</ConsultaResumoCliente>'
        //     + ' </soap:Body>'
        // + '</soap:Envelope>';

        $.ajax({
            url: "https://botiwall.corebiz.com.br/bematech/soap/consultar",
            type: "GET",
            data: { documentNumber: _document},
            success:function(data) {
                console.log("Fidelity OK");
                var _club = xmlToJson(data)['soap:Envelope']['soap:Body'].ConsultaResumoClienteResponse.ConsultaResumoClienteResult;
                console.log(_club);

                if(_club.Status == "3288334563"){
                    document.querySelector("._not-member").classList.remove("hidden");
                    document.querySelector("._club-member").classList.add("hidden");
                }else{
                    document.querySelector("._not-member").classList.add("hidden");
                    document.querySelector("._club-member").classList.remove("hidden");
                    document.querySelector(".clube-das-beres-container ._promos ._banners").classList.add("--active");
                    console.log('clube',_club);
                    console.log('clube',_club.DataNascimento);

                    club.status = _club.Status;
                    club.card = _club.Cartao;
                    club.canScore = _club.PodePontuar;
                    club.canChange = _club.PodeTrocar;
                    club.score = _club.Saldo;
    
                    getBirthday(_club.DataNascimento);

                    setDataClub(club.score);
                    //busca extrato 
                    searchExtract(
                        club.card,
                        document.document,
                    )
                }
            },
            error:function(error){
                console.log("Fidelity Error");
                console.error(error);
                document.querySelector("._not-member").classList.remove("hidden");
                document.querySelector("._club-member").classList.add("hidden");
            }
        });
    }
    function setDataClub(_saldo){
        document.querySelector("._price b").innerHTML = ((_saldo / 100) * 5).toFixed(2).replace(",", ".").replace(".", ",");
        document.querySelector("._points p").innerHTML = _saldo.substr(-2) + " pontos";
        document.querySelector("._sup-club").innerHTML = "Faltam " + (_saldo.toString().substr(-2) == 00 ? 100 : Math.round(100 - parseInt(_saldo.toString().substr(-2))).toString().substr(-2)) + " pontos para ganhar R$5,00 em desconto na próxima compra.";
        document.querySelector("._fill").style.width = (Math.round(_saldo / 100) * 100 - _saldo) + "%";
        if(_saldo < 100){
            document.querySelector("._less-points").innerHTML = "(" + _saldo + " pontos, a partir de 100 pontos você poderá usar seu saldo.)";
            document.querySelector("._less-points").style.display = "flex";
            // document.querySelector("._saldoclube").classList.add("insuficient");
        }else{
            document.querySelector("._less-points").innerHTML = "(" + _saldo + " pontos)";
            document.querySelector("._less-points").style.display = "flex";
        }
    }
    function SetDataUsuario(){
        document.querySelector("._welcome b").innerHTML = document.nome;
    }
    function searchMasterDataLogin(_email){
        $.ajax({
            url: 'https://api.vtexcrm.com.br/qbbr/dataentities/CL/search?_fields=document&_where=email=' + _email,
            type: 'GET',
            headers: header(),
            success:function(data) {
                console.log(data);
                console.log(data[0].document);
                if(validateCPF(data[0].document)){
                    document.error = false;
                    document.message = "CPF valido";
                    document.document = data[0].document;
                    console.log("Search Master OK");
                    SetDataUsuario();
                    searchFidelity(data[0].document);
                }else{
                    document.error = true;
                    document.message = "CPF invalido";
                    document.document = data[0].document;
                    SetDataUsuario();
                }
            },
            error:function(error) {
                console.log(error);
            }
        }); 
    }
    function updateMasterData(){
        $.ajax({
            url: 'https://api.vtexcrm.com.br/qbbr/dataentities/' + ENT + '/search?' + params,
            type: 'PATCH',
            data: dados_arquivo,
            headers: header(),
            success:function(data){
                console.log(data)
            },
            error:function (error){
                console.log(error);
            }
        });
    }
    function formatMoney(money){
        return money.replace('-','');
    }
    function addClass(){
        btnMov = !btnMov
    }
// }
// })
function SkeletonLoad(){
    document.querySelectorAll(".--skeleton").forEach(function(skeleton){
        setTimeout(() => {
            skeleton.classList.remove("--skeleton");
            skeleton.style.opacity = 0;
            setTimeout(() => {
                skeleton.style.opacity = 1;
            }, 500);
        }, 3500);
    });
}
function GetProfileImg(){
    setTimeout(() => {
        var observer = new MutationObserver(function(mutations) {
            if (document.contains(document.querySelector(".vtex-account__user-image .cover"))) {
                document.querySelector("._picture ._photo img").src = document.querySelector(".vtex-account__user-image .cover").style.backgroundImage.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)[0];
                 observer.disconnect();
             }
         });
         
        observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});
    }, 3000);
}
function _getClients(email) {

    let clients = new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        let url = "https://botiwall.corebiz.com.br/md?table=CL&filter=email="+ email +"&param=id,nickName,email,birthDate,corporateDocument,corporateName,document,documentType,firstName,lastName,gender,homePhone,isCorporate,isNewsletterOptIn,phone,stateRegistration,tradeName,thumbface,thumbimage,nickName";
        request.open('GET', url);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                resolve(JSON.parse(request.response));
            }
        }
        request.send();
   });
   clients.then((client) => {
       console.log(client);
    });
};

function _getAddressAll(userId) {
    let addressAll = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        let url = "https://botiwall.corebiz.com.br/md?table=AD&filter=userId="+ userId +"&param=id,number,addressName,addressType,city,complement,country,neighborhood,postalCode,receiverName,reference,state,street";
        request.open('GET', url);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                resolve(JSON.parse(request.response));
            }
        }
        request.send();
   });
   addressAll.then((address) => {
       console.log(address);
    });
};
// FIRE EVENT
function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function _getAddress(addressId) {
    let Adress = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        let url = "https://botiwall.corebiz.com.br/md?table=AD&filter=id="+ addressId +"&param=id,number,addressName,addressType,city,complement,country,neighborhood,postalCode,receiverName,reference,state,street";
        request.open('GET', url);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                resolve(JSON.parse(request.response));
            }
        }
        request.send();
   });
    Adress.then((address) => {
       console.log(address);
    });
};

document.querySelector(".--edit-avatar").addEventListener("click", function(){
    eventFire(document.querySelector(".vtex-account__user-image button"), 'click');
});

document.querySelectorAll(".logged section.clube-das-beres-container ._faq ul li").forEach(function(el){
    el.addEventListener("click", function(){
        this.classList.toggle("_active");
    });
});
document.querySelectorAll("input").forEach(function(el){
    el.addEventListener("keyup", function(){
        removeInvalidChars(el);
    });
    el.addEventListener("focusout", function(){
        removeInvalidChars(el);
    });
});

(function(document, window, domIsReady, undefined) {
    domIsReady(function() {
            CheckEmail();
            SkeletonLoad();
            GetOrders("index", ".orders ul");
            GetProfileImg();
            _getClients(document.email);
         // #Open pop up regulamento
         // var openRegulamento = function () {
         //    $('a.pop-regulamento').on('click', function (e) {
         //       e.preventDefault();
         //       $('.overlay-clube').fadeIn();
         //       $('#content-regulamento').fadeIn();
         //       $('body').addClass('overflow-pop-up');
         //    });
         // }

         // var app = new Vue({
         //       el: '#club-fidelity'
         // })

         // openRegulamento();

    });
 })(document, window, domIsReady);