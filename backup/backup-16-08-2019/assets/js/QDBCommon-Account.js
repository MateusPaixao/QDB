(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _accountIndex = require("./modules/Account/account-index");

var _accountIndex2 = _interopRequireDefault(_accountIndex);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_accountIndex2.default.init();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYzdhNjlmZDUuanMiXSwibmFtZXMiOlsiX2FjY291bnRJbmRleCIsInJlcXVpcmUiLCJfYWNjb3VudEluZGV4MiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsImluaXQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLGdCQUFnQkMsUUFBUSxpQ0FBUixDQUFwQjs7QUFFQSxJQUFJQyxpQkFBaUJDLHVCQUF1QkgsYUFBdkIsQ0FBckI7O0FBRUEsU0FBU0csc0JBQVQsQ0FBZ0NDLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsT0FBT0EsSUFBSUMsVUFBWCxHQUF3QkQsR0FBeEIsR0FBOEIsRUFBRUUsU0FBU0YsR0FBWCxFQUFyQztBQUF3RDs7QUFFL0ZGLGVBQWVJLE9BQWYsQ0FBdUJDLElBQXZCIiwiZmlsZSI6ImZha2VfYzdhNjlmZDUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9hY2NvdW50SW5kZXggPSByZXF1aXJlKFwiLi9tb2R1bGVzL0FjY291bnQvYWNjb3VudC1pbmRleFwiKTtcblxudmFyIF9hY2NvdW50SW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWNjb3VudEluZGV4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuX2FjY291bnRJbmRleDIuZGVmYXVsdC5pbml0KCk7Il19
},{"./modules/Account/account-index":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Methods = {
    init: function init() {
        Methods.login();
    },
    login: function login() {
        var _this2 = this;

        var domIsReady = function (domIsReady) {
            var isBrowserIeOrNot = function isBrowserIeOrNot() {
                return !document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie';
            };

            domIsReady = function domIsReady(callback) {
                if (callback && typeof callback === 'function') {
                    if (isBrowserIeOrNot() !== 'ie') {
                        document.addEventListener("DOMContentLoaded", function () {
                            return callback();
                        });
                    } else {
                        document.attachEvent("onreadystatechange", function () {
                            if (document.readyState === "complete") {
                                return callback();
                            }
                        });
                    }
                } else {
                    console.error('The callback is not a function!');
                }
            };

            return domIsReady;
        }(domIsReady || {});

        var showModal = false,
            modalBirthday = false,
            isMobile = window.innerWidth <= 768,
            btnMov = false,
            document = {
            error: '',
            message: '',
            document: '',
            email: '',
            nome: '',
            id: ''
        },
            club = {
            status: '',
            card: '',
            canScore: '',
            canChange: '',
            score: '',
            extract: '',
            birthday: ''
        };
        function CheckEmail() {
            // vtexjs.checkout.getOrderForm().then(function(orderForm) {
            //     console.log('seu email é:', orderForm.clientProfileData.email, '<3')
            //     searchMasterData(orderForm.clientProfileData.email);
            // });
            $.ajax({
                url: "https://www.quemdisseberenice.com.br/no-cache/profileSystem/getProfile",
                success: function success(data) {
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
        var statusOrder = function statusOrder(status) {
            var OrderStatus = {
                "pci": "",
                "meuspedidos": "",
                "timeline": ""
            };
            switch (status) {
                case 'waiting-for-seller-confirmation':
                    OrderStatus = {
                        "pci": "Authorizing",
                        "meuspedidos": "Processando Pagamento",
                        "timeline": "Realizado"
                    };
                    break;
                case 'payment-pending':
                    OrderStatus = {
                        "pci": "Authorizing",
                        "meuspedidos": "Pagamento Pendente",
                        "timeline": "Realizado"
                    };
                    break;
                case 'payment-approved':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    };
                    break;
                case 'payment-approved':
                    OrderStatus = {
                        "pci": "Authorizing",
                        "meuspedidos": "Processando Pagamento",
                        "timeline": "Realizado"
                    };
                    break;
                case 'payment-denied':
                    OrderStatus = {
                        "pci": "Cancelled",
                        "meuspedidos": "Pagamento Negado",
                        "timeline": "Cancelado"
                    };
                    break;
                case 'waiting-for-seller-decision':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Verificando possibilidade de cancelamento",
                        "timeline": "Realizado"
                    };
                    break;
                case 'waiting-ffmt-authorization---authorize-fulfillment':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    };
                    break;
                case 'window-to-cancel':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    };
                    break;
                case 'ready-for-handling':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    };
                    break;
                case 'start-handling':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    };
                    break;
                case 'handling':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Preparando Entrega",
                        "timeline": "Pago"
                    };
                    break;
                case 'ship---invoice':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Entregando Produtos",
                        "timeline": "Enviado"
                    };
                    break;
                case 'invoiced':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Faturado",
                        "timeline": "Enviado"
                    };
                    break;
                case 'request-cancel':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Cancelado",
                        "timeline": "Cancelado"
                    };
                    break;
                case 'order-accepted':
                    OrderStatus = {
                        "pci": "Approved",
                        "meuspedidos": "Processando Pedido",
                        "timeline": "Realizado"
                    };
                    break;
                case 'shipped---invoiced':
                    OrderStatus = {
                        "pci": "Finished",
                        "meuspedidos": "Enviado",
                        "timeline": "Enviado"
                    };
                    break;
                case 'cancel':
                    OrderStatus = {
                        "pci": "Cancelled",
                        "meuspedidos": "Processando Cancelamento",
                        "timeline": "Cancelado"
                    };
                    break;
                case 'canceled':
                    OrderStatus = {
                        "pci": "Cancelled",
                        "meuspedidos": "Cancelado",
                        "timeline": "Cancelado"
                    };
                    break;

                default:
                    break;
            }
            return OrderStatus;
        };
        // Converte a data de servidor em data de usuario => 2016-07-14T14:50:38.117' to 14/07/2016 11:50:38
        var dateServeToDateUser = function dateServeToDateUser(dataServer) {

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
            var NumFormat = num.toString().slice(0, -2) + "," + num.toString().slice(-2);

            return NumFormat.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }
        function GetOrders(qtd, Ellist) {
            var html = '';
            var LastOrders = new Promise(function (resolve, reject) {

                var request = new XMLHttpRequest();
                var url = "https://www.quemdisseberenice.com.br/api/checkout/pub/orders";
                request.open('GET', url);
                request.send();

                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        resolve(JSON.parse(request.response));
                    }
                };
            });
            LastOrders.then(function (orders) {
                var maxIndex = qtd == "index" ? orders.length : qtd;
                for (var i = 0; i < maxIndex; i++) {
                    var element = orders[i];
                    //    console.log(element);
                    html += '<li class="_order _order-' + i + '">' + '<a href="#/orders/' + element.orderId + '"><span class="_info">' + '<span class="_color-status ' + statusOrder(element.state).timeline + '"></span>' + '<p class="_id"> ' + dateServeToDateUser(element.creationDate) + ' | ' + element.orderId.substring(0, element.orderId.lastIndexOf('qbbr')) + ':</p>' + '<p class="_status">' + statusOrder(element.state).meuspedidos + ' <svg viewbox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">' + '</p>' + '</span></a>' + '</li>';
                }
                document.querySelector(Ellist).innerHTML = Ellist == "._last-orders" ? "<b>Últimos Pedidos:</b>" + html : html;
                document.querySelectorAll("._last-orders ._order").forEach(function (el) {
                    el.addEventListener("click", function () {
                        document.querySelector("._profile ._initial").classList.add("--top");
                        document.querySelector(".clube-das-beres-container").classList.add("hidden");
                        document.querySelector(".clube-das-beres-container").style.display = "none";
                        document.querySelector(".render-route-my-account-portal").style.display = "initial";
                        document.querySelectorAll("._menu_item").forEach(function (item) {
                            item.classList.remove("--active");
                        });
                        document.querySelector("._menu_item.--orders").classList.add("--active");
                        setTimeout(function () {
                            scrollIt(document.querySelector('.vtex-account'), 500, 'easeOutQuad');
                        }, 500);
                    });
                });
            }).catch(function (orders) {
                console.log("Erro ao buscar pedidos");
                console.log(orders);
            });
        }
        var clubMenuEl = document.querySelectorAll("._menu_item.--club")[0];
        var ordersMenuEl = document.querySelectorAll("._menu_item.--orders")[0];
        var accountMenuEl = document.querySelectorAll("._menu_item.--account")[0];

        clubMenuEl.addEventListener("click", function () {
            document.querySelector("._profile ._initial").classList.add("--top");
            document.querySelector(".clube-das-beres-container").classList.remove("hidden");
            document.querySelector(".clube-das-beres-container").style.display = "flex";
            document.querySelector(".render-route-my-account-portal").style.display = "none";
            document.querySelectorAll("._menu_item").forEach(function (item) {
                item.classList.remove("--active");
            });
            _this2.classList.add("--active");
        });
        ordersMenuEl.addEventListener("click", function () {
            document.querySelector("._profile ._initial").classList.add("--top");
            document.querySelector(".clube-das-beres-container").classList.add("hidden");
            document.querySelector(".clube-das-beres-container").style.display = "none";
            document.querySelector(".render-route-my-account-portal").style.display = "initial";
            window.location.href = "#/orders";
            document.querySelectorAll("._menu_item").forEach(function (item) {
                item.classList.remove("--active");
            });
            _this2.classList.add("--active");
        });
        accountMenuEl.addEventListener("click", function () {
            document.querySelector("._profile ._initial").classList.add("--top");
            document.querySelector(".clube-das-beres-container").classList.add("hidden");
            document.querySelector(".clube-das-beres-container").style.display = "none";
            document.querySelector(".render-route-my-account-portal").style.display = "initial";
            window.location.href = "#/profile";
            document.querySelectorAll("._menu_item").forEach(function (item) {
                item.classList.remove("--active");
            });
            _this2.classList.add("--active");
        });
        function validateCPF(cpf) {
            var numeros, digitos, soma, i, resultado, digitos_iguais;

            digitos_iguais = 1;

            if (cpf.length < 11) return false;

            for (i = 0; i < cpf.length - 1; i++) {
                if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                    digitos_iguais = 0;
                    break;
                }
            }if (!digitos_iguais) {
                numeros = cpf.substring(0, 9);
                digitos = cpf.substring(9);
                soma = 0;

                for (i = 10; i > 1; i--) {
                    soma += numeros.charAt(10 - i) * i;
                }resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

                if (resultado != digitos.charAt(0)) return false;

                numeros = cpf.substring(0, 10);
                soma = 0;

                for (i = 11; i > 1; i--) {
                    soma += numeros.charAt(11 - i) * i;
                }resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

                if (resultado != digitos.charAt(1)) return false;
                return true;
            } else return false;
        }
        function toggle() {
            showModal = !showModal;
        }
        function formatData(date) {
            return date.split("T")[0].split("-")[2] + "/" + date.split("T")[0].split("-")[1] + "/" + date.split("T")[0].split("-")[0];
        }
        function header() {
            return {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json; charset=utf-8',
                'x-vtex-api-appKey': 'vtexappkey-qbbrqa-MPHBCP',
                'x-vtex-api-appToken': 'FFWRYHSCIANVOSLQWGMMUKPLHZQPVIHJBLKVKPUJVRWDTKSHBHZABQXVPLKYRDHZSDUDHQFGMCRDNLSWHIOOJHIKOPFZEVSSKWLPPOAKBSNYZTHDSORJOSQLVJOSKGCR'
            };
        }
        function xmlToJson(xml) {
            var obj = {};

            if (xml.nodeType == 1) {
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) {
                obj = xml.nodeValue;
            }

            if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
                obj = xml.childNodes[0].nodeValue;
            } else if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof obj[nodeName] == "undefined") {
                        obj[nodeName] = this.xmlToJson(item);
                    } else {
                        if (typeof obj[nodeName].push == "undefined") {
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
        function searchExtract(_card, _document) {
            var _soap = '<?xml version="1.0" encoding="utf-8"?>' + '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' + '<soap:Body>' + '<ExtratoParticipante xmlns="http://tempuri.org/">' + '<pAut>' + '<Canal>3</Canal>' + '<Usuario>admin</Usuario>' + '<Senha>admin</Senha>' + '</pAut>' + '<pCodigoCartao>' + _card + '</pCodigoCartao>' + '<pCPF>' + _document + '</pCPF>' + '<dataInicial>' + '<Dia>1</Dia>' + '<Mes>1</Mes>' + '<Ano>2012</Ano>' + '</dataInicial>' + '<dataFinal>' + '<Dia>31</Dia>' + '<Mes>12</Mes>' + '<Ano>2020</Ano>' + '</dataFinal>' + '<pTipoParticipante>2</pTipoParticipante>' + '</ExtratoParticipante>' + '</soap:Body>' + '</soap:Envelope>';

            $.ajax({
                url: "http://fidelidade.quemdisseberenice.com.br/fidelidade/businessfidelidade/Site/operacoes.asmx?op=ExtratoParticipante",
                type: "POST",
                data: _soap,
                contentType: "text/xml; charset=\"utf-8\"",
                dataType: 'xml',
                headers: {
                    SOAPAction: 'http://tempuri.org/ExtratoParticipante'
                },
                success: function success(data) {
                    var _extract = xmlToJson(data)['soap:Envelope']['soap:Body'].ExtratoParticipanteResponse.ExtratoParticipanteResult.ItensExtrato.anyType;

                    var _arrayExtract = [];

                    console.log('>>>>>>>>>>>>>>> extrato', _extract);

                    if (_extract != undefined) {
                        for (var i = _extract.length - 1; i >= 0; i--) {
                            var _object = {
                                "status": _extract[i].Status,
                                "cnpj": _extract[i].CNPJ,
                                "canal": _extract[i].Canal,
                                "cartaoCliente": _extract[i].CartaoCliente,
                                "data": formatData(_extract[i].Data),
                                "pontos": _extract[i].Pontos,
                                "validade": _extract[i].Validade
                            };

                            _arrayExtract.push(_object);
                        }

                        club.extract = _arrayExtract;
                    } else {
                        club.extract = false;
                    }
                },
                error: function error(_error) {
                    console.log(_error);
                }
            });
        };
        var getDateServeToDateUser = function getDateServeToDateUser(dataServer) {
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
        var getDateServe = function getDateServe() {
            var _this = this;

            $.get('/no-cache/HoraAtualServidor.aspx', function (date) {
                _this.formatDateVtex(date);
                _this.formatMonth(date);
                _this.countDaysMouth(date);
            });
        };
        var formatDateVtex = function formatDateVtex(date) {

            var array = date.split(" ");
            var month = array[0];
            var day = array[1].replace(",", "");
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
                "Dia": day,
                "Mes": month
            };
        };
        var formatMonth = function formatMonth(date) {

            var array = date.split(" ");
            var month = array[0];
            var day = array[1].replace(",", "");
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
                "Dia": day,
                "Mes": month
            };
        };
        var countDaysMouth = function countDaysMouth(date) {
            var array = date.split(" ");
            var month = array[0];
            var day = array[1].replace(",", "");
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
                "Dia": day,
                "Mes": month
            };
        };
        var getBirthday = function getBirthday(dateBirthday) {
            $.get('/no-cache/HoraAtualServidor.aspx', function (date) {

                var dateUser = dateBirthday.Mes;
                var dateFromServer = formatDateVtex(date).Mes;
                var monthBirthdayUser = formatMonth(date).Mes;
                var dayMonth = countDaysMouth(date).Mes;

                if (dateUser == dateFromServer) {
                    //$('.selo-birthday').show();
                    $('.modal-aniversario .mes-aniversario').text(dateUser);
                    $('.modal-aniversario .mesPorExtenso').text(monthBirthdayUser);
                    $('.modal-aniversario .diaDoMes').text(dayMonth);

                    $('.selo-birthday').click(function () {
                        $('body').addClass('modal-on');
                    });

                    $('.modal-aniversario .close-modal, .modal-aniversario button, .modal-overlay').click(function () {
                        $('body').removeClass('modal-on');
                    });
                }
            });
        };
        function searchFidelity(_document) {
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
                data: { documentNumber: _document },
                success: function success(data) {
                    console.log("Fidelity OK");
                    var _club = xmlToJson(data)['soap:Envelope']['soap:Body'].ConsultaResumoClienteResponse.ConsultaResumoClienteResult;
                    console.log(_club);

                    if (_club.Status == "3288334563") {
                        document.querySelector("._not-member").classList.remove("hidden");
                        document.querySelector("._club-member").classList.add("hidden");
                    } else {
                        document.querySelector("._not-member").classList.add("hidden");
                        document.querySelector("._club-member").classList.remove("hidden");
                        document.querySelector(".clube-das-beres-container ._promos ._banners").classList.add("--active");
                        console.log('clube', _club);
                        console.log('clube', _club.DataNascimento);

                        club.status = _club.Status;
                        club.card = _club.Cartao;
                        club.canScore = _club.PodePontuar;
                        club.canChange = _club.PodeTrocar;
                        club.score = _club.Saldo;

                        getBirthday(_club.DataNascimento);

                        setDataClub(club.score);
                        //busca extrato 
                        searchExtract(club.card, document.document);
                    }
                },
                error: function error(_error2) {
                    console.log("Fidelity Error");
                    console.error(_error2);
                    document.querySelector("._not-member").classList.remove("hidden");
                    document.querySelector("._club-member").classList.add("hidden");
                }
            });
        }
        function setDataClub(_saldo) {
            document.querySelector("._price b").innerHTML = (_saldo / 100 * 5).toFixed(2).replace(",", ".").replace(".", ",");
            document.querySelector("._points p").innerHTML = _saldo.substr(-2) + " pontos";
            document.querySelector("._sup-club").innerHTML = "Faltam " + (_saldo.toString().substr(-2) == "00" ? 100 : Math.round(100 - parseInt(_saldo.toString().substr(-2))).toString().substr(-2)) + " pontos para ganhar R$5,00 em desconto na próxima compra.";
            document.querySelector("._fill").style.width = Math.round(_saldo / 100) * 100 - _saldo + "%";
            if (_saldo < 100) {
                document.querySelector("._less-points").innerHTML = "(" + _saldo + " pontos, a partir de 100 pontos você poderá usar seu saldo.)";
                document.querySelector("._less-points").style.display = "flex";
                // document.querySelector("._saldoclube").classList.add("insuficient");
            } else {
                document.querySelector("._less-points").innerHTML = "(" + _saldo + " pontos)";
                document.querySelector("._less-points").style.display = "flex";
            }
        }
        function SetDataUsuario() {
            document.querySelector("._welcome b").innerHTML = document.nome;
        }
        function searchMasterDataLogin(_email) {
            $.ajax({
                url: 'https://api.vtexcrm.com.br/qbbr/dataentities/CL/search?_fields=document&_where=email=' + _email,
                type: 'GET',
                headers: header(),
                success: function success(data) {
                    console.log(data);
                    console.log(data[0].document);
                    if (validateCPF(data[0].document.toString().replace(/\.|\-/g, ''))) {
                        document.error = false;
                        document.message = "CPF valido";
                        document.document = data[0].document;
                        console.log("Search Master OK");
                        SetDataUsuario();
                        console.log(data[0].document.toString().replace(/\.|\-/g, ''));
                        searchFidelity(data[0].document.toString().replace(/\.|\-/g, ''));
                    } else {
                        document.error = true;
                        document.message = "CPF invalido";
                        document.document = data[0].document;
                        SetDataUsuario();
                    }
                },
                error: function error(_error3) {
                    console.log(_error3);
                }
            });
        }
        function updateMasterData() {
            $.ajax({
                url: 'https://api.vtexcrm.com.br/qbbr/dataentities/' + ENT + '/search?' + params,
                type: 'PATCH',
                data: dados_arquivo,
                headers: header(),
                success: function success(data) {
                    console.log(data);
                },
                error: function error(_error4) {
                    console.log(_error4);
                }
            });
        }
        function formatMoney(money) {
            return money.replace('-', '');
        }
        function addClass() {
            btnMov = !btnMov;
        }
        // }
        // })
        function SkeletonLoad() {
            document.querySelectorAll(".--skeleton").forEach(function (skeleton) {
                setTimeout(function () {
                    skeleton.classList.remove("--skeleton");
                    skeleton.style.opacity = 0;
                    setTimeout(function () {
                        skeleton.style.opacity = 1;
                    }, 500);
                }, 3500);
            });
        }
        function GetProfileImg() {
            setTimeout(function () {
                var observer = new MutationObserver(function (mutations) {
                    if (document.contains(document.querySelector(".vtex-account__user-image .cover"))) {
                        document.querySelector("._picture ._photo img").src = document.querySelector(".vtex-account__user-image .cover").style.backgroundImage.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)[0];
                        observer.disconnect();
                    }
                });

                observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });
            }, 3000);
        }
        function _getClients(email) {

            var clients = new Promise(function (resolve, reject) {

                var request = new XMLHttpRequest();
                var url = "https://botiwall.corebiz.com.br/md?table=CL&filter=email=" + email + "&param=id,nickName,email,birthDate,corporateDocument,corporateName,document,documentType,firstName,lastName,gender,homePhone,isCorporate,isNewsletterOptIn,phone,stateRegistration,tradeName,thumbface,thumbimage,nickName";
                request.open('GET', url);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        resolve(JSON.parse(request.response));
                    }
                };
                request.send();
            });
            clients.then(function (client) {
                console.log(client);
            });
        };

        function _getAddressAll(userId) {
            var addressAll = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                var url = "https://botiwall.corebiz.com.br/md?table=AD&filter=userId=" + userId + "&param=id,number,addressName,addressType,city,complement,country,neighborhood,postalCode,receiverName,reference,state,street";
                request.open('GET', url);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        resolve(JSON.parse(request.response));
                    }
                };
                request.send();
            });
            addressAll.then(function (address) {
                console.log(address);
            });
        };
        // FIRE EVENT
        function eventFire(el, etype) {
            if (el.fireEvent) {
                el.fireEvent('on' + etype);
            } else {
                var evObj = document.createEvent('Events');
                evObj.initEvent(etype, true, false);
                el.dispatchEvent(evObj);
            }
        }

        function _getAddress(addressId) {
            var Adress = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                var url = "https://botiwall.corebiz.com.br/md?table=AD&filter=id=" + addressId + "&param=id,number,addressName,addressType,city,complement,country,neighborhood,postalCode,receiverName,reference,state,street";
                request.open('GET', url);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        resolve(JSON.parse(request.response));
                    }
                };
                request.send();
            });
            Adress.then(function (address) {
                console.log(address);
            });
        };

        document.querySelector(".--edit-avatar").addEventListener("click", function () {
            eventFire(document.querySelector(".vtex-account__user-image button"), 'click');
        });

        document.querySelectorAll(".logged section.clube-das-beres-container ._faq ul li").forEach(function (el) {
            el.addEventListener("click", function () {
                this.classList.toggle("_active");
            });
        });
        document.querySelectorAll("input").forEach(function (el) {
            el.addEventListener("keyup", function () {
                removeInvalidChars(el);
            });
            el.addEventListener("focusout", function () {
                removeInvalidChars(el);
            });
        });

        (function (document, window, domIsReady, undefined) {
            domIsReady(function () {
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
    }
};

exports.default = { init: Methods.init };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIk1ldGhvZHMiLCJpbml0IiwibG9naW4iLCJkb21Jc1JlYWR5IiwiaXNCcm93c2VySWVPck5vdCIsImRvY3VtZW50IiwiYXR0YWNoRXZlbnQiLCJjYWxsYmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWFkeVN0YXRlIiwiY29uc29sZSIsImVycm9yIiwic2hvd01vZGFsIiwibW9kYWxCaXJ0aGRheSIsImlzTW9iaWxlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImJ0bk1vdiIsIm1lc3NhZ2UiLCJlbWFpbCIsIm5vbWUiLCJpZCIsImNsdWIiLCJzdGF0dXMiLCJjYXJkIiwiY2FuU2NvcmUiLCJjYW5DaGFuZ2UiLCJzY29yZSIsImV4dHJhY3QiLCJiaXJ0aGRheSIsIkNoZWNrRW1haWwiLCIkIiwiYWpheCIsInVybCIsInN1Y2Nlc3MiLCJkYXRhIiwic2VhcmNoTWFzdGVyRGF0YUxvZ2luIiwiRW1haWwiLCJsb2ciLCJVc2VySWQiLCJGaXJzdE5hbWUiLCJHZXRPcmRlcnMiLCJzdGF0dXNPcmRlciIsIk9yZGVyU3RhdHVzIiwiZGF0ZVNlcnZlVG9EYXRlVXNlciIsImRhdGFTZXJ2ZXIiLCJub3ciLCJEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImxlbmd0aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsImZvcm1hdE51bWJlciIsIm51bSIsIk51bUZvcm1hdCIsInRvU3RyaW5nIiwic2xpY2UiLCJyZXBsYWNlIiwicXRkIiwiRWxsaXN0IiwiaHRtbCIsIkxhc3RPcmRlcnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZW5kIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCJ0aGVuIiwib3JkZXJzIiwibWF4SW5kZXgiLCJpIiwiZWxlbWVudCIsIm9yZGVySWQiLCJzdGF0ZSIsInRpbWVsaW5lIiwiY3JlYXRpb25EYXRlIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJtZXVzcGVkaWRvcyIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsIiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJkaXNwbGF5IiwiaXRlbSIsInJlbW92ZSIsInNldFRpbWVvdXQiLCJzY3JvbGxJdCIsImNhdGNoIiwiY2x1Yk1lbnVFbCIsIm9yZGVyc01lbnVFbCIsImFjY291bnRNZW51RWwiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YWxpZGF0ZUNQRiIsImNwZiIsIm51bWVyb3MiLCJkaWdpdG9zIiwic29tYSIsInJlc3VsdGFkbyIsImRpZ2l0b3NfaWd1YWlzIiwiY2hhckF0IiwidG9nZ2xlIiwiZm9ybWF0RGF0YSIsImRhdGUiLCJzcGxpdCIsImhlYWRlciIsInhtbFRvSnNvbiIsInhtbCIsIm9iaiIsIm5vZGVUeXBlIiwiYXR0cmlidXRlcyIsImoiLCJhdHRyaWJ1dGUiLCJub2RlTmFtZSIsIm5vZGVWYWx1ZSIsImhhc0NoaWxkTm9kZXMiLCJjaGlsZE5vZGVzIiwicHVzaCIsIm9sZCIsInNlYXJjaEV4dHJhY3QiLCJfY2FyZCIsIl9kb2N1bWVudCIsIl9zb2FwIiwidHlwZSIsImNvbnRlbnRUeXBlIiwiZGF0YVR5cGUiLCJoZWFkZXJzIiwiU09BUEFjdGlvbiIsIl9leHRyYWN0IiwiRXh0cmF0b1BhcnRpY2lwYW50ZVJlc3BvbnNlIiwiRXh0cmF0b1BhcnRpY2lwYW50ZVJlc3VsdCIsIkl0ZW5zRXh0cmF0byIsImFueVR5cGUiLCJfYXJyYXlFeHRyYWN0IiwidW5kZWZpbmVkIiwiX29iamVjdCIsIlN0YXR1cyIsIkNOUEoiLCJDYW5hbCIsIkNhcnRhb0NsaWVudGUiLCJEYXRhIiwiUG9udG9zIiwiVmFsaWRhZGUiLCJnZXREYXRlU2VydmVUb0RhdGVVc2VyIiwiZ2V0RGF0ZVNlcnZlIiwiX3RoaXMiLCJnZXQiLCJmb3JtYXREYXRlVnRleCIsImZvcm1hdE1vbnRoIiwiY291bnREYXlzTW91dGgiLCJhcnJheSIsImhvdXJzIiwiZ2V0QmlydGhkYXkiLCJkYXRlQmlydGhkYXkiLCJkYXRlVXNlciIsIk1lcyIsImRhdGVGcm9tU2VydmVyIiwibW9udGhCaXJ0aGRheVVzZXIiLCJkYXlNb250aCIsInRleHQiLCJjbGljayIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzZWFyY2hGaWRlbGl0eSIsImRvY3VtZW50TnVtYmVyIiwiX2NsdWIiLCJDb25zdWx0YVJlc3Vtb0NsaWVudGVSZXNwb25zZSIsIkNvbnN1bHRhUmVzdW1vQ2xpZW50ZVJlc3VsdCIsIkRhdGFOYXNjaW1lbnRvIiwiQ2FydGFvIiwiUG9kZVBvbnR1YXIiLCJQb2RlVHJvY2FyIiwiU2FsZG8iLCJzZXREYXRhQ2x1YiIsIl9zYWxkbyIsInRvRml4ZWQiLCJzdWJzdHIiLCJNYXRoIiwicm91bmQiLCJwYXJzZUludCIsIndpZHRoIiwiU2V0RGF0YVVzdWFyaW8iLCJfZW1haWwiLCJ1cGRhdGVNYXN0ZXJEYXRhIiwiRU5UIiwicGFyYW1zIiwiZGFkb3NfYXJxdWl2byIsImZvcm1hdE1vbmV5IiwibW9uZXkiLCJTa2VsZXRvbkxvYWQiLCJza2VsZXRvbiIsIm9wYWNpdHkiLCJHZXRQcm9maWxlSW1nIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwiY29udGFpbnMiLCJzcmMiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJtYXRjaCIsImRpc2Nvbm5lY3QiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiY2hhcmFjdGVyRGF0YSIsInN1YnRyZWUiLCJfZ2V0Q2xpZW50cyIsImNsaWVudHMiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiY2xpZW50IiwiX2dldEFkZHJlc3NBbGwiLCJ1c2VySWQiLCJhZGRyZXNzQWxsIiwiYWRkcmVzcyIsImV2ZW50RmlyZSIsImV0eXBlIiwiZmlyZUV2ZW50IiwiZXZPYmoiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJfZ2V0QWRkcmVzcyIsImFkZHJlc3NJZCIsIkFkcmVzcyIsInJlbW92ZUludmFsaWRDaGFycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxVQUFVO0FBQ1pDLFFBRFksa0JBQ047QUFDRkQsZ0JBQVFFLEtBQVI7QUFDSCxLQUhXO0FBSVpBLFNBSlksbUJBSUw7QUFBQTs7QUFDSCxZQUFJQyxhQUFjLFVBQVNBLFVBQVQsRUFBcUI7QUFDbkMsZ0JBQUlDLG1CQUFtQixTQUFuQkEsZ0JBQW1CLEdBQVc7QUFDL0IsdUJBQVEsQ0FBQ0MsU0FBU0MsV0FBVixJQUF5QixPQUFPRCxTQUFTQyxXQUFoQixLQUFnQyxXQUF6RCxHQUF1RSxRQUF2RSxHQUFrRixJQUExRjtBQUNGLGFBRkQ7O0FBSUFILHlCQUFhLG9CQUFTSSxRQUFULEVBQW1CO0FBQzdCLG9CQUFHQSxZQUFZLE9BQU9BLFFBQVAsS0FBb0IsVUFBbkMsRUFBOEM7QUFDM0Msd0JBQUdILHVCQUF1QixJQUExQixFQUFnQztBQUM3QkMsaUNBQVNHLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3RELG1DQUFPRCxVQUFQO0FBQ0YseUJBRkQ7QUFHRixxQkFKRCxNQUlPO0FBQ0pGLGlDQUFTQyxXQUFULENBQXFCLG9CQUFyQixFQUEyQyxZQUFXO0FBQ25ELGdDQUFHRCxTQUFTSSxVQUFULEtBQXdCLFVBQTNCLEVBQXVDO0FBQ3BDLHVDQUFPRixVQUFQO0FBQ0Y7QUFDSCx5QkFKRDtBQUtGO0FBQ0gsaUJBWkQsTUFZTztBQUNKRyw0QkFBUUMsS0FBUixDQUFjLGlDQUFkO0FBQ0Y7QUFDSCxhQWhCRDs7QUFrQkEsbUJBQU9SLFVBQVA7QUFDSCxTQXhCZ0IsQ0F3QmRBLGNBQWMsRUF4QkEsQ0FBakI7O0FBMEJBLFlBQUlTLFlBQVcsS0FBZjtBQUFBLFlBQ0FDLGdCQUFlLEtBRGY7QUFBQSxZQUVBQyxXQUFVQyxPQUFPQyxV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QUFULENBQXVCLGtDQUF2QixDQUFWLEVBQXNFLE9BQXRFO0FBQ0gsU0FGRDs7QUFJQXpGLGlCQUFTMkYsZ0JBQVQsQ0FBMEIsdURBQTFCLEVBQW1GQyxPQUFuRixDQUEyRixVQUFTQyxFQUFULEVBQVk7QUFDbkdBLGVBQUcxRixnQkFBSCxDQUFvQixPQUFwQixFQUE2QixZQUFVO0FBQ25DLHFCQUFLMkYsU0FBTCxDQUFlc0IsTUFBZixDQUFzQixTQUF0QjtBQUNILGFBRkQ7QUFHSCxTQUpEO0FBS0FwSCxpQkFBUzJGLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DQyxPQUFuQyxDQUEyQyxVQUFTQyxFQUFULEVBQVk7QUFDbkRBLGVBQUcxRixnQkFBSCxDQUFvQixPQUFwQixFQUE2QixZQUFVO0FBQ25DMk8sbUNBQW1CakosRUFBbkI7QUFDSCxhQUZEO0FBR0FBLGVBQUcxRixnQkFBSCxDQUFvQixVQUFwQixFQUFnQyxZQUFVO0FBQ3RDMk8sbUNBQW1CakosRUFBbkI7QUFDSCxhQUZEO0FBR0gsU0FQRDs7QUFTQSxTQUFDLFVBQVM3RixRQUFULEVBQW1CVSxNQUFuQixFQUEyQlosVUFBM0IsRUFBdUN1SixTQUF2QyxFQUFrRDtBQUMvQ3ZKLHVCQUFXLFlBQVc7QUFDZDJCO0FBQ0FtTDtBQUNBeEssMEJBQVUsT0FBVixFQUFtQixZQUFuQjtBQUNBMks7QUFDQWEsNEJBQVk1TixTQUFTYyxLQUFyQjtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFFSixhQXRCRDtBQXVCRixTQXhCRixFQXdCSWQsUUF4QkosRUF3QmNVLE1BeEJkLEVBd0JzQlosVUF4QnRCO0FBeUJIO0FBeitCVyxDQUFoQjs7a0JBNCtCZSxFQUFFRixNQUFNRCxRQUFRQyxJQUFoQixFIiwiZmlsZSI6Il9hY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTWV0aG9kcyA9IHtcclxuICAgIGluaXQoKXtcclxuICAgICAgICBNZXRob2RzLmxvZ2luKCk7XHJcbiAgICB9LFxyXG4gICAgbG9naW4oKXtcclxuICAgICAgICB2YXIgZG9tSXNSZWFkeSA9IChmdW5jdGlvbihkb21Jc1JlYWR5KSB7XHJcbiAgICAgICAgICAgIHZhciBpc0Jyb3dzZXJJZU9yTm90ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiAoIWRvY3VtZW50LmF0dGFjaEV2ZW50IHx8IHR5cGVvZiBkb2N1bWVudC5hdHRhY2hFdmVudCA9PT0gXCJ1bmRlZmluZWRcIiA/ICdub3QtaWUnIDogJ2llJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIGRvbUlzUmVhZHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICBpZihjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICAgICAgICBpZihpc0Jyb3dzZXJJZU9yTm90KCkgIT09ICdpZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGUgY2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb24hJyk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGRvbUlzUmVhZHk7XHJcbiAgICAgICAgfSkoZG9tSXNSZWFkeSB8fCB7fSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHNob3dNb2RhbD0gZmFsc2UsXHJcbiAgICAgICAgbW9kYWxCaXJ0aGRheT0gZmFsc2UsXHJcbiAgICAgICAgaXNNb2JpbGU9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCwgXHJcbiAgICAgICAgYnRuTW92PSBmYWxzZSxcclxuICAgICAgICBkb2N1bWVudCA9IHtcclxuICAgICAgICAgICAgZXJyb3I6ICcnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOicnLFxyXG4gICAgICAgICAgICBkb2N1bWVudDogJycsXHJcbiAgICAgICAgICAgIGVtYWlsOiAnJyxcclxuICAgICAgICAgICAgbm9tZTogJycsXHJcbiAgICAgICAgICAgIGlkOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2x1Yj17XHJcbiAgICAgICAgICAgIHN0YXR1czonJyxcclxuICAgICAgICAgICAgY2FyZDogJycsXHJcbiAgICAgICAgICAgIGNhblNjb3JlOiAnJyxcclxuICAgICAgICAgICAgY2FuQ2hhbmdlOiAnJyxcclxuICAgICAgICAgICAgc2NvcmU6ICcnLFxyXG4gICAgICAgICAgICBleHRyYWN0OiAnJyxcclxuICAgICAgICAgICAgYmlydGhkYXk6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIGZ1bmN0aW9uIENoZWNrRW1haWwoKXtcclxuICAgICAgICAgICAgICAvLyB2dGV4anMuY2hlY2tvdXQuZ2V0T3JkZXJGb3JtKCkudGhlbihmdW5jdGlvbihvcmRlckZvcm0pIHtcclxuICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ3NldSBlbWFpbCDDqTonLCBvcmRlckZvcm0uY2xpZW50UHJvZmlsZURhdGEuZW1haWwsICc8MycpXHJcbiAgICAgICAgICAgICAgLy8gICAgIHNlYXJjaE1hc3RlckRhdGEob3JkZXJGb3JtLmNsaWVudFByb2ZpbGVEYXRhLmVtYWlsKTtcclxuICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly93d3cucXVlbWRpc3NlYmVyZW5pY2UuY29tLmJyL25vLWNhY2hlL3Byb2ZpbGVTeXN0ZW0vZ2V0UHJvZmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiggZGF0YSApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hNYXN0ZXJEYXRhTG9naW4oZGF0YS5FbWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuaWQgPSBkYXRhLlVzZXJJZDtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5lbWFpbCA9IGRhdGEuRW1haWw7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQubm9tZSA9IGRhdGEuRmlyc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHNlYXJjaE1hc3RlckRhdGFMb2dpbihkb2N1bWVudC5lbWFpbCk7XHJcbiAgICAgICAgICAgICAgR2V0T3JkZXJzKDMsIFwiLl9sYXN0LW9yZGVyc1wiKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgdmFyIHN0YXR1c09yZGVyID0gZnVuY3Rpb24gKHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICB2YXIgT3JkZXJTdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJwY2lcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm1ldXNwZWRpZG9zXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dhaXRpbmctZm9yLXNlbGxlci1jb25maXJtYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPcmRlclN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGNpXCI6IFwiQXV0aG9yaXppbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV1c3BlZGlkb3NcIjogXCJQcm9jZXNzYW5kbyBQYWdhbWVudG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZWxpbmVcIjogXCJSZWFsaXphZG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BheW1lbnQtcGVuZGluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9yZGVyU3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwY2lcIjogXCJBdXRob3JpemluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXVzcGVkaWRvc1wiOiBcIlBhZ2FtZW50byBQZW5kZW50ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIlJlYWxpemFkb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncGF5bWVudC1hcHByb3ZlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcmRlclN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBjaVwiOiBcIkFwcHJvdmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXVzcGVkaWRvc1wiOiBcIlByZXBhcmFuZG8gRW50cmVnYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZWxpbmVcIjogXCJQYWdvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncGF5bWVudC1hcHByb3ZlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcmRlclN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBjaVwiOiBcIkF1dGhvcml6aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXVzcGVkaWRvc1wiOiBcIlByb2Nlc3NhbmRvIFBhZ2FtZW50b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZWxpbmVcIjogXCJSZWFsaXphZG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdwYXltZW50LWRlbmllZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcmRlclN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBjaVwiOiBcIkNhbmNlbGxlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV1c3BlZGlkb3NcIjogXCJQYWdhbWVudG8gTmVnYWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIkNhbmNlbGFkb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dhaXRpbmctZm9yLXNlbGxlci1kZWNpc2lvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcmRlclN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBjaVwiOiBcIkFwcHJvdmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXVzcGVkaWRvc1wiOiBcIlZlcmlmaWNhbmRvIHBvc3NpYmlsaWRhZGUgZGUgY2FuY2VsYW1lbnRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIlJlYWxpemFkb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dhaXRpbmctZmZtdC1hdXRob3JpemF0aW9uLS0tYXV0aG9yaXplLWZ1bGZpbGxtZW50JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9yZGVyU3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGNpXCI6IFwiQXBwcm92ZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldXNwZWRpZG9zXCI6IFwiUHJlcGFyYW5kbyBFbnRyZWdhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIlBhZ29cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd3aW5kb3ctdG8tY2FuY2VsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9yZGVyU3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGNpXCI6IFwiQXBwcm92ZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldXNwZWRpZG9zXCI6IFwiUHJlcGFyYW5kbyBFbnRyZWdhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIlBhZ29cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWFkeS1mb3ItaGFuZGxpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3JkZXJTdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwY2lcIjogXCJBcHByb3ZlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV1c3BlZGlkb3NcIjogXCJQcmVwYXJhbmRvIEVudHJlZ2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpbWVsaW5lXCI6IFwiUGFnb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0LWhhbmRsaW5nJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9yZGVyU3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGNpXCI6IFwiQXBwcm92ZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldXNwZWRpZG9zXCI6IFwiUHJlcGFyYW5kbyBFbnRyZWdhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIlBhZ29cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdoYW5kbGluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcmRlclN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBjaVwiOiBcIkFwcHJvdmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXVzcGVkaWRvc1wiOiBcIlByZXBhcmFuZG8gRW50cmVnYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZWxpbmVcIjogXCJQYWdvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2hpcC0tLWludm9pY2UnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3JkZXJTdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwY2lcIjogXCJBcHByb3ZlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV1c3BlZGlkb3NcIjogXCJFbnRyZWdhbmRvIFByb2R1dG9zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIkVudmlhZG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnZvaWNlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcmRlclN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBjaVwiOiBcIkFwcHJvdmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXVzcGVkaWRvc1wiOiBcIkZhdHVyYWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIkVudmlhZG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXF1ZXN0LWNhbmNlbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcmRlclN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBjaVwiOiBcIkFwcHJvdmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXVzcGVkaWRvc1wiOiBcIkNhbmNlbGFkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZWxpbmVcIjogXCJDYW5jZWxhZG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdvcmRlci1hY2NlcHRlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcmRlclN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBjaVwiOiBcIkFwcHJvdmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXVzcGVkaWRvc1wiOiBcIlByb2Nlc3NhbmRvIFBlZGlkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZWxpbmVcIjogXCJSZWFsaXphZG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzaGlwcGVkLS0taW52b2ljZWQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3JkZXJTdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwY2lcIjogXCJGaW5pc2hlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV1c3BlZGlkb3NcIjogXCJFbnZpYWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIkVudmlhZG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdjYW5jZWwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3JkZXJTdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwY2lcIjogXCJDYW5jZWxsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldXNwZWRpZG9zXCI6IFwiUHJvY2Vzc2FuZG8gQ2FuY2VsYW1lbnRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1lbGluZVwiOiBcIkNhbmNlbGFkb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGVkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9yZGVyU3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGNpXCI6IFwiQ2FuY2VsbGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXVzcGVkaWRvc1wiOiBcIkNhbmNlbGFkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZWxpbmVcIjogXCJDYW5jZWxhZG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGVyU3RhdHVzO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBDb252ZXJ0ZSBhIGRhdGEgZGUgc2Vydmlkb3IgZW0gZGF0YSBkZSB1c3VhcmlvID0+IDIwMTYtMDctMTRUMTQ6NTA6MzguMTE3JyB0byAxNC8wNy8yMDE2IDExOjUwOjM4XHJcbiAgICAgICAgICAgIHZhciBkYXRlU2VydmVUb0RhdGVVc2VyID0gZnVuY3Rpb24gKGRhdGFTZXJ2ZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YVNlcnZlcikge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZShkYXRhU2VydmVyKTtcclxuICAgICAgICAgICAgICAgIHZhciB5ZWFyID0gXCJcIiArIG5vdy5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoID0gXCJcIiArIChub3cuZ2V0TW9udGgoKSArIDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnRoLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcIjBcIiArIG1vbnRoO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGRheSA9IFwiXCIgKyBub3cuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGRheS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRheSA9IFwiMFwiICsgZGF5O1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGhvdXIgPSBcIlwiICsgbm93LmdldEhvdXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoaG91ci5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGhvdXIgPSBcIjBcIiArIGhvdXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgbWludXRlID0gXCJcIiArIG5vdy5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAobWludXRlLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbWludXRlID0gXCIwXCIgKyBtaW51dGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgc2Vjb25kID0gXCJcIiArIG5vdy5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Vjb25kLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kID0gXCIwXCIgKyBzZWNvbmQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF5ICsgXCIvXCIgKyBtb250aCArIFwiL1wiICsgeWVhcjtcclxuICAgICAgICBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIE51bUZvcm1hdCA9IG51bS50b1N0cmluZygpLnNsaWNlKDAsIC0yKSArXCIsXCIrbnVtLnRvU3RyaW5nKCkuc2xpY2UoLTIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtRm9ybWF0LnJlcGxhY2UoLyhcXGQpKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJyQxLicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBmdW5jdGlvbiBHZXRPcmRlcnMocXRkLCBFbGxpc3Qpe1xyXG4gICAgICAgICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgICAgICAgICBsZXQgTGFzdE9yZGVycyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHBzOi8vd3d3LnF1ZW1kaXNzZWJlcmVuaWNlLmNvbS5ici9hcGkvY2hlY2tvdXQvcHViL29yZGVyc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2UpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICBMYXN0T3JkZXJzLnRoZW4oIChvcmRlcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgIGxldCBtYXhJbmRleCA9IHF0ZCA9PSBcImluZGV4XCIgPyBvcmRlcnMubGVuZ3RoIDogcXRkO1xyXG4gICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhJbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IG9yZGVyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICBodG1sICs9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiX29yZGVyIF9vcmRlci0nICsgaSArICdcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YSBocmVmPVwiIy9vcmRlcnMvJysgZWxlbWVudC5vcmRlcklkICsnXCI+PHNwYW4gY2xhc3M9XCJfaW5mb1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIl9jb2xvci1zdGF0dXMgJyArIHN0YXR1c09yZGVyKGVsZW1lbnQuc3RhdGUpLnRpbWVsaW5lICsgJ1wiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHAgY2xhc3M9XCJfaWRcIj4gJyArIGRhdGVTZXJ2ZVRvRGF0ZVVzZXIoZWxlbWVudC5jcmVhdGlvbkRhdGUpICsgJyB8ICcgKyBlbGVtZW50Lm9yZGVySWQuc3Vic3RyaW5nKDAsIGVsZW1lbnQub3JkZXJJZC5sYXN0SW5kZXhPZigncWJicicpKSArICc6PC9wPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8cCBjbGFzcz1cIl9zdGF0dXNcIj4nICsgc3RhdHVzT3JkZXIoZWxlbWVudC5zdGF0ZSkubWV1c3BlZGlkb3MgKyAnIDxzdmcgdmlld2JveD1cIjAgMCA1NCA1NFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3A+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPjwvYT4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRWxsaXN0KS5pbm5lckhUTUwgPSBFbGxpc3QgPT0gXCIuX2xhc3Qtb3JkZXJzXCIgPyBcIjxiPsOabHRpbW9zIFBlZGlkb3M6PC9iPlwiICsgaHRtbCA6IGh0bWw7XHJcbiAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLl9sYXN0LW9yZGVycyAuX29yZGVyXCIpLmZvckVhY2goZnVuY3Rpb24oZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLl9wcm9maWxlIC5faW5pdGlhbFwiKS5jbGFzc0xpc3QuYWRkKFwiLS10b3BcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2x1YmUtZGFzLWJlcmVzLWNvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsdWJlLWRhcy1iZXJlcy1jb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlbmRlci1yb3V0ZS1teS1hY2NvdW50LXBvcnRhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbml0aWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuX21lbnVfaXRlbVwiKS5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiLS1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLl9tZW51X2l0ZW0uLS1vcmRlcnNcIikuY2xhc3NMaXN0LmFkZChcIi0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbEl0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52dGV4LWFjY291bnQnKSwgNTAwLCAnZWFzZU91dFF1YWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goIChvcmRlcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJybyBhbyBidXNjYXIgcGVkaWRvc1wiKTtcclxuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9yZGVycyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjbHViTWVudUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5fbWVudV9pdGVtLi0tY2x1YlwiKVswXTtcclxuICAgICAgICAgICAgbGV0IG9yZGVyc01lbnVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuX21lbnVfaXRlbS4tLW9yZGVyc1wiKVswXTtcclxuICAgICAgICAgICAgbGV0IGFjY291bnRNZW51RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLl9tZW51X2l0ZW0uLS1hY2NvdW50XCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgY2x1Yk1lbnVFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fcHJvZmlsZSAuX2luaXRpYWxcIikuY2xhc3NMaXN0LmFkZChcIi0tdG9wXCIpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbHViZS1kYXMtYmVyZXMtY29udGFpbmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsdWJlLWRhcy1iZXJlcy1jb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZW5kZXItcm91dGUtbXktYWNjb3VudC1wb3J0YWxcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5fbWVudV9pdGVtXCIpLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiLS1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcIi0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb3JkZXJzTWVudUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLl9wcm9maWxlIC5faW5pdGlhbFwiKS5jbGFzc0xpc3QuYWRkKFwiLS10b3BcIik7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsdWJlLWRhcy1iZXJlcy1jb250YWluZXJcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2x1YmUtZGFzLWJlcmVzLWNvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlbmRlci1yb3V0ZS1teS1hY2NvdW50LXBvcnRhbFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbml0aWFsXCI7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiIy9vcmRlcnNcIjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuX21lbnVfaXRlbVwiKS5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIi0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCItLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGFjY291bnRNZW51RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuX3Byb2ZpbGUgLl9pbml0aWFsXCIpLmNsYXNzTGlzdC5hZGQoXCItLXRvcFwiKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2x1YmUtZGFzLWJlcmVzLWNvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbHViZS1kYXMtYmVyZXMtY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVuZGVyLXJvdXRlLW15LWFjY291bnQtcG9ydGFsXCIpLnN0eWxlLmRpc3BsYXkgPSBcImluaXRpYWxcIjtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIjL3Byb2ZpbGVcIjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuX21lbnVfaXRlbVwiKS5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIi0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCItLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlQ1BGKGNwZil7XHJcbiAgICAgICAgICAgICAgICB2YXIgbnVtZXJvcywgZGlnaXRvcywgc29tYSwgaSwgcmVzdWx0YWRvLCBkaWdpdG9zX2lndWFpcztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGlnaXRvc19pZ3VhaXMgPSAxO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoY3BmLmxlbmd0aCA8IDExKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNwZi5sZW5ndGggLSAxOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNwZi5jaGFyQXQoaSkgIT0gY3BmLmNoYXJBdChpICsgMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdG9zX2lndWFpcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCFkaWdpdG9zX2lndWFpcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtZXJvcyA9IGNwZi5zdWJzdHJpbmcoMCw5KTtcclxuICAgICAgICAgICAgICAgICAgICBkaWdpdG9zID0gY3BmLnN1YnN0cmluZyg5KTtcclxuICAgICAgICAgICAgICAgICAgICBzb21hID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAxMDsgaSA+IDE7IGktLSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc29tYSArPSBudW1lcm9zLmNoYXJBdCgxMCAtIGkpICogaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0YWRvID0gc29tYSAlIDExIDwgMiA/IDAgOiAxMSAtIHNvbWEgJSAxMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRhZG8gIT0gZGlnaXRvcy5jaGFyQXQoMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJvcyA9IGNwZi5zdWJzdHJpbmcoMCwxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvbWEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDExOyBpID4gMTsgaS0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29tYSArPSBudW1lcm9zLmNoYXJBdCgxMSAtIGkpICogaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdGFkbyA9IHNvbWEgJSAxMSA8IDIgPyAwIDogMTEgLSBzb21hICUgMTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0YWRvICE9IGRpZ2l0b3MuY2hhckF0KDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0b2dnbGUoKXtcclxuICAgICAgICAgICAgICAgIHNob3dNb2RhbCA9ICFzaG93TW9kYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gZm9ybWF0RGF0YShkYXRlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIi1cIilbMl0gICsgXCIvXCIgKyBkYXRlLnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIi1cIilbMV0gKyBcIi9cIiArIGRhdGUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiLVwiKVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBoZWFkZXIoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi92bmQudnRleC5kcy52MTAranNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgICAgICAgICAneC12dGV4LWFwaS1hcHBLZXknOiAndnRleGFwcGtleS1xYmJycWEtTVBIQkNQJyxcclxuICAgICAgICAgICAgICAgICAgICAneC12dGV4LWFwaS1hcHBUb2tlbic6ICdGRldSWUhTQ0lBTlZPU0xRV0dNTVVLUExIWlFQVklISkJMS1ZLUFVKVlJXRFRLU0hCSFpBQlFYVlBMS1lSREhaU0RVREhRRkdNQ1JETkxTV0hJT09KSElLT1BGWkVWU1NLV0xQUE9BS0JTTllaVEhEU09SSk9TUUxWSk9TS0dDUidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB4bWxUb0pzb24oeG1sKXtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh4bWwubm9kZVR5cGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhtbC5hdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpbXCJAYXR0cmlidXRlc1wiXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHhtbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlID0geG1sLmF0dHJpYnV0ZXMuaXRlbShqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialtcIkBhdHRyaWJ1dGVzXCJdW2F0dHJpYnV0ZS5ub2RlTmFtZV0gPSBhdHRyaWJ1dGUubm9kZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKHhtbC5ub2RlVHlwZSA9PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSB4bWwubm9kZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoeG1sLmhhc0NoaWxkTm9kZXMoKSAmJiB4bWwuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiYgeG1sLmNoaWxkTm9kZXNbMF0ubm9kZVR5cGUgPT09IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHhtbC5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoeG1sLmhhc0NoaWxkTm9kZXMoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHhtbC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0geG1sLmNoaWxkTm9kZXMuaXRlbShpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVOYW1lID0gaXRlbS5ub2RlTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZihvYmpbbm9kZU5hbWVdKSA9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbbm9kZU5hbWVdID0gdGhpcy54bWxUb0pzb24oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG9ialtub2RlTmFtZV0ucHVzaCkgPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGQgPSBvYmpbbm9kZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialtub2RlTmFtZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbbm9kZU5hbWVdLnB1c2gob2xkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialtub2RlTmFtZV0ucHVzaCh0aGlzLnhtbFRvSnNvbihpdGVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VhcmNoRXh0cmFjdChfY2FyZCwgX2RvY3VtZW50KXtcclxuICAgICAgICAgICAgICAgIHZhciBfc29hcCA9ICc8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJ1dGYtOFwiPz4nXHJcbiAgICAgICAgICAgICAgICArICc8c29hcDpFbnZlbG9wZSB4bWxuczpzb2FwPVwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS9cIiB4bWxuczp4c2k9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZVwiIHhtbG5zOnhzZD1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICsgJzxzb2FwOkJvZHk+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArICc8RXh0cmF0b1BhcnRpY2lwYW50ZSB4bWxucz1cImh0dHA6Ly90ZW1wdXJpLm9yZy9cIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJzxwQXV0PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJzxDYW5hbD4zPC9DYW5hbD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArICc8VXN1YXJpbz5hZG1pbjwvVXN1YXJpbz4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArICc8U2VuaGE+YWRtaW48L1NlbmhhPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPC9wQXV0PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPHBDb2RpZ29DYXJ0YW8+JyArIF9jYXJkICsgJzwvcENvZGlnb0NhcnRhbz4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJzxwQ1BGPicgKyBfZG9jdW1lbnQgKyAnPC9wQ1BGPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPGRhdGFJbmljaWFsPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJzxEaWE+MTwvRGlhPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJzxNZXM+MTwvTWVzPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJzxBbm8+MjAxMjwvQW5vPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPC9kYXRhSW5pY2lhbD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJzxkYXRhRmluYWw+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnPERpYT4zMTwvRGlhPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJzxNZXM+MTI8L01lcz4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArICc8QW5vPjIwMjA8L0Fubz4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJzwvZGF0YUZpbmFsPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPHBUaXBvUGFydGljaXBhbnRlPjI8L3BUaXBvUGFydGljaXBhbnRlPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPC9FeHRyYXRvUGFydGljaXBhbnRlPidcclxuICAgICAgICAgICAgICAgICAgICArICc8L3NvYXA6Qm9keT4nXHJcbiAgICAgICAgICAgICAgICArICc8L3NvYXA6RW52ZWxvcGU+JztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9maWRlbGlkYWRlLnF1ZW1kaXNzZWJlcmVuaWNlLmNvbS5ici9maWRlbGlkYWRlL2J1c2luZXNzZmlkZWxpZGFkZS9TaXRlL29wZXJhY29lcy5hc214P29wPUV4dHJhdG9QYXJ0aWNpcGFudGVcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBfc29hcCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJ0ZXh0L3htbDsgY2hhcnNldD1cXFwidXRmLThcXFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICd4bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU09BUEFjdGlvbjogJ2h0dHA6Ly90ZW1wdXJpLm9yZy9FeHRyYXRvUGFydGljaXBhbnRlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXh0cmFjdCA9IHhtbFRvSnNvbihkYXRhKVsnc29hcDpFbnZlbG9wZSddWydzb2FwOkJvZHknXS5FeHRyYXRvUGFydGljaXBhbnRlUmVzcG9uc2UuRXh0cmF0b1BhcnRpY2lwYW50ZVJlc3VsdC5JdGVuc0V4dHJhdG8uYW55VHlwZTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hcnJheUV4dHJhY3QgPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz4+Pj4+Pj4+Pj4+Pj4+PiBleHRyYXRvJywgX2V4dHJhY3QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfZXh0cmFjdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBfZXh0cmFjdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfb2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBfZXh0cmFjdFtpXS5TdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY25walwiOiBfZXh0cmFjdFtpXS5DTlBKLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhbmFsXCI6IF9leHRyYWN0W2ldLkNhbmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhcnRhb0NsaWVudGVcIjogX2V4dHJhY3RbaV0uQ2FydGFvQ2xpZW50ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IGZvcm1hdERhdGEoX2V4dHJhY3RbaV0uRGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG9udG9zXCI6IF9leHRyYWN0W2ldLlBvbnRvcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZGFkZVwiOiBfZXh0cmFjdFtpXS5WYWxpZGFkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYXJyYXlFeHRyYWN0LnB1c2goX29iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdWIuZXh0cmFjdCA9IF9hcnJheUV4dHJhY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHViLmV4dHJhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24gKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBnZXREYXRlU2VydmVUb0RhdGVVc2VyID0gZnVuY3Rpb24oZGF0YVNlcnZlcil7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFTZXJ2ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKGRhdGFTZXJ2ZXIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHllYXIgPSBcIlwiICsgbm93LmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9udGggPSBcIlwiICsgKG5vdy5nZXRNb250aCgpICsgMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnRoLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcIjBcIiArIG1vbnRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGRheSA9IFwiXCIgKyBub3cuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChkYXkubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXkgPSBcIjBcIiArIGRheTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBob3VyID0gXCJcIiArIG5vdy5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChob3VyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG91ciA9IFwiMFwiICsgaG91cjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBtaW51dGUgPSBcIlwiICsgbm93LmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAobWludXRlLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWludXRlID0gXCIwXCIgKyBtaW51dGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgc2Vjb25kID0gXCJcIiArIG5vdy5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHNlY29uZC5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZCA9IFwiMFwiICsgc2Vjb25kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF5ICsgXCIvXCIgKyBtb250aCArIFwiL1wiICsgeWVhcjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGdldERhdGVTZXJ2ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkLmdldCgnL25vLWNhY2hlL0hvcmFBdHVhbFNlcnZpZG9yLmFzcHgnLCBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mb3JtYXREYXRlVnRleChkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZvcm1hdE1vbnRoKGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY291bnREYXlzTW91dGgoZGF0ZSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0RGF0ZVZ0ZXggPSBmdW5jdGlvbiAoZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXkgPSBkYXRlLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBtb250aCA9IGFycmF5WzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheSA9IGFycmF5WzFdLnJlcGxhY2UoXCIsXCIsXCJcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgeWVhciA9IGFycmF5WzJdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhvdXJzID0gYXJyYXlbM107XHJcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2Zvcm1hciBlbSBvYmpldG8gZGVwb2lzXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1vbnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImphblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZmV2XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gXCIyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYXJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcIjNcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFiclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiNFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibWFpXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gXCI1XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJqdW5cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcIjZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImp1bFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiN1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYWdvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gXCI4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzZXRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcIjlcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm91dFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMTBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vdlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMTFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRlelwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMTJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiRGlhXCIgOiBkYXksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJNZXNcIiA6IG1vbnRoXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0TW9udGggPSBmdW5jdGlvbiAoZGF0ZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGFycmF5ID0gZGF0ZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9udGggPSBhcnJheVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXkgPSBhcnJheVsxXS5yZXBsYWNlKFwiLFwiLFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHllYXIgPSBhcnJheVsyXTtcclxuICAgICAgICAgICAgICAgIHZhciBob3VycyA9IGFycmF5WzNdO1xyXG4gICAgICAgICAgICAgICAgLy8gdHJhbnNmb3JtYXIgZW0gb2JqZXRvIGRlcG9pc1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChtb250aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJqYW5cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcImphbmVpcm9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZldlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiZmV2ZXJlaXJvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYXJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcIm1hcsOnb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYWJyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gXCJhYnJpbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibWFpXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gXCJtYWlvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJqdW5cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcImp1bmhvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJqdWxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcImp1bGhvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhZ29cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcImFnb3N0b1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gXCJzZXRlbWJyb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwib3V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gXCJvdXR1YnJvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJub3ZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcIm5vdmVtYnJvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkZXpcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBcImRlemVtYnJvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBcIkRpYVwiIDogZGF5LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiTWVzXCIgOiBtb250aFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGNvdW50RGF5c01vdXRoID0gZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXkgPSBkYXRlLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBtb250aCA9IGFycmF5WzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheSA9IGFycmF5WzFdLnJlcGxhY2UoXCIsXCIsXCJcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgeWVhciA9IGFycmF5WzJdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhvdXJzID0gYXJyYXlbM107XHJcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2Zvcm1hciBlbSBvYmpldG8gZGVwb2lzXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1vbnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImphblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZldlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMjhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm1hclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFiclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm1haVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImp1blwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImp1bFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFnb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNldFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm91dFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vdlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRlelwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IFwiMzFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiRGlhXCIgOiBkYXksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJNZXNcIiA6IG1vbnRoXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZ2V0QmlydGhkYXkgPSBmdW5jdGlvbihkYXRlQmlydGhkYXkpe1xyXG4gICAgICAgICAgICAgICAgJC5nZXQoJy9uby1jYWNoZS9Ib3JhQXR1YWxTZXJ2aWRvci5hc3B4JywgZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGVVc2VyID0gZGF0ZUJpcnRoZGF5Lk1lcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZUZyb21TZXJ2ZXIgPSBmb3JtYXREYXRlVnRleChkYXRlKS5NZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vbnRoQmlydGhkYXlVc2VyID0gZm9ybWF0TW9udGgoZGF0ZSkuTWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXlNb250aCA9IGNvdW50RGF5c01vdXRoKGRhdGUpLk1lcztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRlVXNlciA9PSBkYXRlRnJvbVNlcnZlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJCgnLnNlbG8tYmlydGhkYXknKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2RhbC1hbml2ZXJzYXJpbyAubWVzLWFuaXZlcnNhcmlvJykudGV4dChkYXRlVXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2RhbC1hbml2ZXJzYXJpbyAubWVzUG9yRXh0ZW5zbycpLnRleHQobW9udGhCaXJ0aGRheVVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubW9kYWwtYW5pdmVyc2FyaW8gLmRpYURvTWVzJykudGV4dChkYXlNb250aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc2Vsby1iaXJ0aGRheScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ21vZGFsLW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2RhbC1hbml2ZXJzYXJpbyAuY2xvc2UtbW9kYWwsIC5tb2RhbC1hbml2ZXJzYXJpbyBidXR0b24sIC5tb2RhbC1vdmVybGF5JykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbW9kYWwtb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VhcmNoRmlkZWxpdHkoX2RvY3VtZW50KXtcclxuICAgICAgICAgICAgICAgIC8vIHZhciBfc29hcCA9ICc8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJ1dGYtOFwiPz4nXHJcbiAgICAgICAgICAgICAgICAvLyArICc8c29hcDpFbnZlbG9wZSB4bWxuczpzb2FwPVwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvc29hcC9lbnZlbG9wZS9cIiB4bWxuczp4c2k9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZVwiIHhtbG5zOnhzZD1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hXCI+J1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICsgJyA8c29hcDpCb2R5PidcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgKyAnPENvbnN1bHRhUmVzdW1vQ2xpZW50ZSB4bWxucz1cImh0dHA6Ly90ZW1wdXJpLm9yZy9cIj4nXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICsgJyA8cEF1dD4nXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICArICc8Q2FuYWw+MTwvQ2FuYWw+J1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgKyAnPFVzdWFyaW8+YWRtaW48L1VzdWFyaW8+J1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgKyAnPFNlbmhhPmFkbWluPC9TZW5oYT4nXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICsgJyA8L3BBdXQ+J1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICArICcgPHBDUEY+JysgX2RvY3VtZW50ICsnPC9wQ1BGPidcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgKyAnPC9Db25zdWx0YVJlc3Vtb0NsaWVudGU+J1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICsgJyA8L3NvYXA6Qm9keT4nXHJcbiAgICAgICAgICAgICAgICAvLyArICc8L3NvYXA6RW52ZWxvcGU+JztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vYm90aXdhbGwuY29yZWJpei5jb20uYnIvYmVtYXRlY2gvc29hcC9jb25zdWx0YXJcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgZG9jdW1lbnROdW1iZXI6IF9kb2N1bWVudH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlkZWxpdHkgT0tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfY2x1YiA9IHhtbFRvSnNvbihkYXRhKVsnc29hcDpFbnZlbG9wZSddWydzb2FwOkJvZHknXS5Db25zdWx0YVJlc3Vtb0NsaWVudGVSZXNwb25zZS5Db25zdWx0YVJlc3Vtb0NsaWVudGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF9jbHViKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX2NsdWIuU3RhdHVzID09IFwiMzI4ODMzNDU2M1wiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuX25vdC1tZW1iZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuX2NsdWItbWVtYmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fbm90LW1lbWJlclwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fY2x1Yi1tZW1iZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2x1YmUtZGFzLWJlcmVzLWNvbnRhaW5lciAuX3Byb21vcyAuX2Jhbm5lcnNcIikuY2xhc3NMaXN0LmFkZChcIi0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsdWJlJyxfY2x1Yik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2x1YmUnLF9jbHViLkRhdGFOYXNjaW1lbnRvKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdWIuc3RhdHVzID0gX2NsdWIuU3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1Yi5jYXJkID0gX2NsdWIuQ2FydGFvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1Yi5jYW5TY29yZSA9IF9jbHViLlBvZGVQb250dWFyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1Yi5jYW5DaGFuZ2UgPSBfY2x1Yi5Qb2RlVHJvY2FyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1Yi5zY29yZSA9IF9jbHViLlNhbGRvO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEJpcnRoZGF5KF9jbHViLkRhdGFOYXNjaW1lbnRvKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldERhdGFDbHViKGNsdWIuc2NvcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9idXNjYSBleHRyYXRvIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoRXh0cmFjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHViLmNhcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWRlbGl0eSBFcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuX25vdC1tZW1iZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fY2x1Yi1tZW1iZXJcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXREYXRhQ2x1Yihfc2FsZG8pe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fcHJpY2UgYlwiKS5pbm5lckhUTUwgPSAoKF9zYWxkbyAvIDEwMCkgKiA1KS50b0ZpeGVkKDIpLnJlcGxhY2UoXCIsXCIsIFwiLlwiKS5yZXBsYWNlKFwiLlwiLCBcIixcIik7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLl9wb2ludHMgcFwiKS5pbm5lckhUTUwgPSBfc2FsZG8uc3Vic3RyKC0yKSArIFwiIHBvbnRvc1wiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fc3VwLWNsdWJcIikuaW5uZXJIVE1MID0gXCJGYWx0YW0gXCIgKyAoX3NhbGRvLnRvU3RyaW5nKCkuc3Vic3RyKC0yKSA9PSBcIjAwXCIgPyAxMDAgOiBNYXRoLnJvdW5kKDEwMCAtIHBhcnNlSW50KF9zYWxkby50b1N0cmluZygpLnN1YnN0cigtMikpKS50b1N0cmluZygpLnN1YnN0cigtMikpICsgXCIgcG9udG9zIHBhcmEgZ2FuaGFyIFIkNSwwMCBlbSBkZXNjb250byBuYSBwcsOzeGltYSBjb21wcmEuXCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLl9maWxsXCIpLnN0eWxlLndpZHRoID0gKE1hdGgucm91bmQoX3NhbGRvIC8gMTAwKSAqIDEwMCAtIF9zYWxkbykgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgIGlmKF9zYWxkbyA8IDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fbGVzcy1wb2ludHNcIikuaW5uZXJIVE1MID0gXCIoXCIgKyBfc2FsZG8gKyBcIiBwb250b3MsIGEgcGFydGlyIGRlIDEwMCBwb250b3Mgdm9jw6ogcG9kZXLDoSB1c2FyIHNldSBzYWxkby4pXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fbGVzcy1wb2ludHNcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuX3NhbGRvY2x1YmVcIikuY2xhc3NMaXN0LmFkZChcImluc3VmaWNpZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fbGVzcy1wb2ludHNcIikuaW5uZXJIVE1MID0gXCIoXCIgKyBfc2FsZG8gKyBcIiBwb250b3MpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5fbGVzcy1wb2ludHNcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIFNldERhdGFVc3VhcmlvKCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLl93ZWxjb21lIGJcIikuaW5uZXJIVE1MID0gZG9jdW1lbnQubm9tZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWFyY2hNYXN0ZXJEYXRhTG9naW4oX2VtYWlsKXtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkudnRleGNybS5jb20uYnIvcWJici9kYXRhZW50aXRpZXMvQ0wvc2VhcmNoP19maWVsZHM9ZG9jdW1lbnQmX3doZXJlPWVtYWlsPScgKyBfZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhWzBdLmRvY3VtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodmFsaWRhdGVDUEYoZGF0YVswXS5kb2N1bWVudC50b1N0cmluZygpLnJlcGxhY2UoL1xcLnxcXC0vZywnJykpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5tZXNzYWdlID0gXCJDUEYgdmFsaWRvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudCA9IGRhdGFbMF0uZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCBNYXN0ZXIgT0tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZXREYXRhVXN1YXJpbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVswXS5kb2N1bWVudC50b1N0cmluZygpLnJlcGxhY2UoL1xcLnxcXC0vZywnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoRmlkZWxpdHkoZGF0YVswXS5kb2N1bWVudC50b1N0cmluZygpLnJlcGxhY2UoL1xcLnxcXC0vZywnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1lc3NhZ2UgPSBcIkNQRiBpbnZhbGlkb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnQgPSBkYXRhWzBdLmRvY3VtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2V0RGF0YVVzdWFyaW8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVNYXN0ZXJEYXRhKCl7XHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLnZ0ZXhjcm0uY29tLmJyL3FiYnIvZGF0YWVudGl0aWVzLycgKyBFTlQgKyAnL3NlYXJjaD8nICsgcGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQQVRDSCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGFkb3NfYXJxdWl2byxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24gKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvcm1hdE1vbmV5KG1vbmV5KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb25leS5yZXBsYWNlKCctJywnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkQ2xhc3MoKXtcclxuICAgICAgICAgICAgICAgIGJ0bk1vdiA9ICFidG5Nb3ZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIGZ1bmN0aW9uIFNrZWxldG9uTG9hZCgpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLi0tc2tlbGV0b25cIikuZm9yRWFjaChmdW5jdGlvbihza2VsZXRvbil7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBza2VsZXRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiLS1za2VsZXRvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBza2VsZXRvbi5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2tlbGV0b24uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH0sIDM1MDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gR2V0UHJvZmlsZUltZygpe1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5jb250YWlucyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZ0ZXgtYWNjb3VudF9fdXNlci1pbWFnZSAuY292ZXJcIikpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuX3BpY3R1cmUgLl9waG90byBpbWdcIikuc3JjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52dGV4LWFjY291bnRfX3VzZXItaW1hZ2UgLmNvdmVyXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZS5tYXRjaCgvKGh0dHAocz8pOikoWy98LnxcXHd8XFxzfC1dKSpcXC4oPzpqcGd8Z2lmfHBuZykvKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge2F0dHJpYnV0ZXM6IGZhbHNlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IGZhbHNlLCBzdWJ0cmVlOnRydWV9KTtcclxuICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRDbGllbnRzKGVtYWlsKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjbGllbnRzID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHBzOi8vYm90aXdhbGwuY29yZWJpei5jb20uYnIvbWQ/dGFibGU9Q0wmZmlsdGVyPWVtYWlsPVwiKyBlbWFpbCArXCImcGFyYW09aWQsbmlja05hbWUsZW1haWwsYmlydGhEYXRlLGNvcnBvcmF0ZURvY3VtZW50LGNvcnBvcmF0ZU5hbWUsZG9jdW1lbnQsZG9jdW1lbnRUeXBlLGZpcnN0TmFtZSxsYXN0TmFtZSxnZW5kZXIsaG9tZVBob25lLGlzQ29ycG9yYXRlLGlzTmV3c2xldHRlck9wdEluLHBob25lLHN0YXRlUmVnaXN0cmF0aW9uLHRyYWRlTmFtZSx0aHVtYmZhY2UsdGh1bWJpbWFnZSxuaWNrTmFtZVwiO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOycpO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIGNsaWVudHMudGhlbigoY2xpZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNsaWVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldEFkZHJlc3NBbGwodXNlcklkKSB7XHJcbiAgICAgICAgICAgIGxldCBhZGRyZXNzQWxsID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHBzOi8vYm90aXdhbGwuY29yZWJpei5jb20uYnIvbWQ/dGFibGU9QUQmZmlsdGVyPXVzZXJJZD1cIisgdXNlcklkICtcIiZwYXJhbT1pZCxudW1iZXIsYWRkcmVzc05hbWUsYWRkcmVzc1R5cGUsY2l0eSxjb21wbGVtZW50LGNvdW50cnksbmVpZ2hib3Job29kLHBvc3RhbENvZGUscmVjZWl2ZXJOYW1lLHJlZmVyZW5jZSxzdGF0ZSxzdHJlZXRcIjtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsnKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBhZGRyZXNzQWxsLnRoZW4oKGFkZHJlc3MpID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gRklSRSBFVkVOVFxyXG4gICAgICAgIGZ1bmN0aW9uIGV2ZW50RmlyZShlbCwgZXR5cGUpe1xyXG4gICAgICAgICAgICBpZiAoZWwuZmlyZUV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlbC5maXJlRXZlbnQoJ29uJyArIGV0eXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBldk9iaiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudHMnKTtcclxuICAgICAgICAgICAgICAgIGV2T2JqLmluaXRFdmVudChldHlwZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChldk9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldEFkZHJlc3MoYWRkcmVzc0lkKSB7XHJcbiAgICAgICAgICAgIGxldCBBZHJlc3MgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IFwiaHR0cHM6Ly9ib3Rpd2FsbC5jb3JlYml6LmNvbS5ici9tZD90YWJsZT1BRCZmaWx0ZXI9aWQ9XCIrIGFkZHJlc3NJZCArXCImcGFyYW09aWQsbnVtYmVyLGFkZHJlc3NOYW1lLGFkZHJlc3NUeXBlLGNpdHksY29tcGxlbWVudCxjb3VudHJ5LG5laWdoYm9yaG9vZCxwb3N0YWxDb2RlLHJlY2VpdmVyTmFtZSxyZWZlcmVuY2Usc3RhdGUsc3RyZWV0XCI7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Jyk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEFkcmVzcy50aGVuKChhZGRyZXNzKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFkZHJlc3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuLS1lZGl0LWF2YXRhclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZXZlbnRGaXJlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudnRleC1hY2NvdW50X191c2VyLWltYWdlIGJ1dHRvblwiKSwgJ2NsaWNrJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5sb2dnZWQgc2VjdGlvbi5jbHViZS1kYXMtYmVyZXMtY29udGFpbmVyIC5fZmFxIHVsIGxpXCIpLmZvckVhY2goZnVuY3Rpb24oZWwpe1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcIl9hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGVsKXtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVJbnZhbGlkQ2hhcnMoZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVJbnZhbGlkQ2hhcnMoZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAoZnVuY3Rpb24oZG9jdW1lbnQsIHdpbmRvdywgZG9tSXNSZWFkeSwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRvbUlzUmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2hlY2tFbWFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFNrZWxldG9uTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdldE9yZGVycyhcImluZGV4XCIsIFwiLm9yZGVycyB1bFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBHZXRQcm9maWxlSW1nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2dldENsaWVudHMoZG9jdW1lbnQuZW1haWwpO1xyXG4gICAgICAgICAgICAgICAgIC8vICNPcGVuIHBvcCB1cCByZWd1bGFtZW50b1xyXG4gICAgICAgICAgICAgICAgIC8vIHZhciBvcGVuUmVndWxhbWVudG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgLy8gICAgJCgnYS5wb3AtcmVndWxhbWVudG8nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgIC8vICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAvLyAgICAgICAkKCcub3ZlcmxheS1jbHViZScpLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgIC8vICAgICAgICQoJyNjb250ZW50LXJlZ3VsYW1lbnRvJykuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICAgLy8gICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdvdmVyZmxvdy1wb3AtdXAnKTtcclxuICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgLy8gdmFyIGFwcCA9IG5ldyBWdWUoe1xyXG4gICAgICAgICAgICAgICAgIC8vICAgICAgIGVsOiAnI2NsdWItZmlkZWxpdHknXHJcbiAgICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAvLyBvcGVuUmVndWxhbWVudG8oKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgIH0pKGRvY3VtZW50LCB3aW5kb3csIGRvbUlzUmVhZHkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGluaXQ6IE1ldGhvZHMuaW5pdCB9Il19
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _account = require('./_account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    init: _account2.default.init
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQtaW5kZXguanMiXSwibmFtZXMiOlsiaW5pdCIsIkFjY291bnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7a0JBRWU7QUFDWEEsVUFBTUMsa0JBQVFEO0FBREgsQyIsImZpbGUiOiJhY2NvdW50LWluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjY291bnQgZnJvbSAnLi9fYWNjb3VudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0OiBBY2NvdW50LmluaXRcclxufSJdfQ==
},{"./_account":2}]},{},[1])