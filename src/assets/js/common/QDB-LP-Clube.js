$(function(){
    const Botiwall = "https://botiwall.corebiz.com.br";
    // const Botiwall = "http://localhost/boti-api-middleware/public";
    console.log(document.querySelector('input[name="terms"]').checked);

    (function ($, window, document, undefined) {
        var $win = $(window);
        var $doc = $(document);
    
        $doc.ready(function () {
            // #Limpa input name on focus
            // $('#clubSignUp input#field-name').focus(function () {
            //     $('#clubSignUp input#field-name').attr('placeholder', '');
            // });
            // // #Limpa input email on focus
            // $('#clubSignUp input[type="email"]').focus(function () {
            //     $('#clubSignUp input[type="email"]').attr('placeholder', '');
            // });
            // // #Limpa input cpf on focus
            // $('#clubSignUp input[name="field-cpf"]').focus(function () {
            //     $('#clubSignUp input[name="field-cpf"]').attr('placeholder', '');
            // });
            // // #Limpa input date on focus
            // $('#clubSignUp input[name="field-date"]').focus(function () {
            //     $('#clubSignUp input[name="field-date"]').attr('placeholder', '');
            // });
            // // #Limpa input phone on focus
            // $('#clubSignUp input[name="field-phone-sec"]').focus(function () {
            //     $('#clubSignUp input[name="field-phone-sec"]').attr('placeholder', '');
            // });
            // #check quero receber novidades e termos de uso
            /* $('#field-check-1').click();
                $('#field-check-2').click(); */
    
            // #Input mask form
            $("#clubSignUp input[name=cpf]").mask('000.000.000-00', {
                reverse: true
            });
            $("#clubSignUp input[name=datenasc]").mask('00/00/0000', {
                reverse: true
            });
            var SPMaskBehavior = function (val) {
                    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
                },
                spOptions = {
                    onKeyPress: function (val, e, field, options) {
                        field.mask(SPMaskBehavior.apply({}, arguments), options);
                    }
                };
            $("#clubSignUp input[name=cel]").mask(SPMaskBehavior, spOptions);
            // #Open pop up cadastrar
            $('.pop-cadastro').on('click', function (e) {
                e.preventDefault();
                $('.overlay-clube').fadeIn();
                $('#clubSignUp').fadeIn();
                $('body').addClass('overflow-pop-up');
            });
            // #Open pop up regulamento
            $('a.pop-regulamento').on('click', function (e) {
                e.preventDefault();
                $('.overlay-clube').fadeIn();
                $('#content-regulamento').fadeIn();
                $('body').addClass('overflow-pop-up');
            });
            // #Open pop up video
            $('.box-video img, .box-video .sec-link').on('click', function (e) {
                e.preventDefault();
                $('.overlay-clube').fadeIn();
                $('#popup-video').fadeIn();
                $('body').addClass('overflow-pop-up');
            });
    
    
            //#Close overlay
            $('.overlay-clube').on('click', function (e) {
                e.preventDefault();
                $(this).fadeOut();
                $('body').removeClass('overflow-pop-up');
    
                if ($('#content-regulamento').css('display') == 'block') {
                    $('#content-regulamento').fadeOut();
                }
    
                if ($('#clubSignUp').css('display') == 'block') {
                    $('#clubSignUp').fadeOut();
                    $("#clubSignUp .step-3, #clubSignUp .step-2").addClass("hidden");
                    $("#clubSignUp .step-1").removeClass("hidden");
                    $(".modal--beres .logo-fidelidade").insertAfter("#clubSignUp .modal-top");
                //$(".modal--beres .logo-fidelidade").css("width", "initial");
                    $(".modal--beres .modal-info").css("display", "block");
                    $("#clubSignUp .modal-top .name").text("Cadastro 1/3");
                    $("#clubSignUp input").value("");
                }
    
                if ($('#content-sucesso').css('display') == 'block') {
                    $('#content-sucesso').fadeOut();
                }
                if ($('#popup-video').css('display') == 'block') {
                    $('#popup-video').fadeOut();
                }
            });
    
            // #Close modal
            $('.popup-steps.popup-form .ico-close-modal, .--close, #clubSignUp .--btn-fidelidade-confirm').on('click', function (e) {
                e.preventDefault();
                $('body').removeClass('overflow-pop-up');
                $('.overlay-clube').fadeOut();
    
                if ($('#content-regulamento').css('display') == 'block') {
                    $('#content-regulamento').fadeOut();
                }
    
                if ($('#clubSignUp').css('display') == 'block') {
                    $('#clubSignUp').fadeOut();
                    $("#clubSignUp .step-3, #clubSignUp .step-2").addClass("hidden");
                    $("#clubSignUp .step-1").removeClass("hidden");
                    $(".modal--beres .logo-fidelidade").insertAfter("#clubSignUp .modal-top");
                    //$(".modal--beres .logo-fidelidade").css("width", "initial");
                    $(".modal--beres .modal-info").css("display", "block");
                    $("#clubSignUp .modal-top .name").text("Cadastro 1/3");
                    $("#clubSignUp input").value("");
                }
    
                if ($('#content-sucesso').css('display') == 'block') {
                    $('#content-sucesso').fadeOut();
                }
                if ($('#popup-video').css('display') == 'block') {
                    $('#popup-video').fadeOut();
                }
            });
    
            // #Open regulamento dentro pop up cadastrar
            $('#clubSignUp .checkbox-label a').eq(2).on('click', function (e) {
                e.preventDefault();
                $('#clubSignUp').fadeOut();
                $('#content-regulamento').fadeIn();
            });
    
            // #Open cadastra dentro pop up regulamento
            $('#content-regulamento .form-actions .form-btn').on('click', function (e) {
                e.preventDefault();
                $('#clubSignUp').fadeIn();
                $('#content-regulamento').fadeOut();
            });
    
            // #Valida formulario
            $('#clubSignUp form').on('submit', function (e) {
                e.preventDefault();
                
                ValidaNome($('#clubSignUp input[name="nome"]').val());
                ValidaEmail($('#clubSignUp input[name="email"]').val());
                ValidaDate($('#clubSignUp input[name="datenasc"]').val());
                ValidaCel($('#clubSignUp input[name="cel"]').val());
    
                if($(".group-cpf").hasClass("has-error")
                || $(".group-nome").hasClass("has-error")
                || $(".group-email").hasClass("has-error")
                || $(".group-cel").hasClass("has-error")
                || $(".group-datenasc").hasClass("has-error")){
    
                }else{
                    var cpf = $('#clubSignUp #field-cpf').val();
                    var nome = $('#clubSignUp #field-nome').val();
                    var email = $('#clubSignUp #field-email').val();
                    var dataNascimento = $('#clubSignUp #field-datenasc').val();
                    var celular = $('#clubSignUp #field-cel').val();
    
                    // $('.form-register .message').html('');
    
                    validaForm(cpf, nome, email, dataNascimento, celular)
                }
            });
    
            // Query Mobile
            if ($win.width() < 768) {
                //Acordion
                /* $('.tile h3').on('click', function (event) {
                    $(this).next().toggleClass('active');
                    $(this).toggleClass('active');
                });*/
    
                // Return false link
                /*$('.tile .tile-blue > a, .tile h3 > a').on('click', function (event) {
                    event.preventDefault();
                }); */
            }
        });
    
        $win.on('load', function () {
    
        });
    })(jQuery, window, document);
    
    /* ====================================================================== *\
        #Valida CPF
    \* ====================================================================== */
    function CPFvalida(CPF) {
        var soma, resto;
        soma = 0;
    
        if (CPF == "00000000000"
        || CPF == "11111111111"
        || CPF == "22222222222"
        || CPF == "33333333333"
        || CPF == "44444444444"
        || CPF == "55555555555"
        || CPF == "66666666666"
        || CPF == "77777777777"
        || CPF == "88888888888"
        || CPF == "99999999999"){
            return false;
        }
        for (i = 1; i <= 9; i++) soma = soma + parseInt(CPF.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
    
        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(CPF.substring(9, 10))) return false;
    
        soma = 0;
        for (i = 1; i <= 10; i++) soma = soma + parseInt(CPF.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
    
        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(CPF.substring(10, 11))) return false;
        return true;
    }
    
    /* ====================================================================== *\
        #Valida formulario de cadastro
    \* ====================================================================== */
    function ValidaCPF(_cpf){
        // #Valida CPF
        if (_cpf == '' || _cpf == undefined || _cpf == null) {
            $('#clubSignUp .group-cpf').removeClass('has-warning');
            $('#clubSignUp .group-cpf small').addClass('hidden');
            return false;
        }
    
        var _validaCPF = _cpf.replace('.', '').replace('.', '').replace('-', '')
    
        if (CPFvalida(_validaCPF) == false) {
            $('#clubSignUp .group-cpf').addClass('has-error');
            $('#clubSignUp .group-cpf small').removeClass('hidden');
            $('#clubSignUp .group-cpf small').text('Informe um CPF Válido.');
        } else {
            $('#clubSignUp input[name="field-cpf"]').removeClass('msg-error');
            // $("#clubSignUp .step-2").removeClass("hidden");
            // $("#clubSignUp .step-1").addClass("hidden");
            $('#clubSignUp .step-1').addClass('hidden');
            $('#clubSignUp .loading-form').removeClass('hidden');
            $.support.cors = true;
            $.ajax({
                url: Botiwall + "/bematech/soap/consultar",
                type: "GET",
                data: { documentNumber: _validaCPF},
                success: function (data) {
                    var jsonData = JSON.parse(xml2json(data, ""));
                    var status = jsonData["soap:Envelope"]["soap:Body"].ConsultaResumoClienteResponse.ConsultaResumoClienteResult.Status;
                    var descricao = jsonData["soap:Envelope"]["soap:Body"].ConsultaResumoClienteResponse.ConsultaResumoClienteResult.Descricao;
    
                    console.log(data);
                    console.info('>>>>> searchFidelidade >>>>> status >>>>>>>>> ' + status);
                    console.info('>>>>> searchFidelidade >>>>> descricao >>>>>>>' + descricao);
    
                    $("#clubSignUp .loading-form .texto-validacao").text("Validando CPF...");
                    if (status == 3288334563) {
                        $("#clubSignUp .loading-form .texto-validacao").text("CPF Válido.");
                        $("#clubSignUp .loading-form .input-bar").css("background-color", "#00E13F");
                        $("#clubSignUp .loading-form #loader").css("display", "none");
                        $("#clubSignUp .loading-form #checked").css("display", "initial");
                        setTimeout(() => {
                            $("#clubSignUp .step-2").removeClass("hidden");
                            $("#clubSignUp .loading-form").addClass("hidden");
                            $("#clubSignUp .loading-form .input-bar").css("background-color", "#00A7E1");
                            $("#clubSignUp .modal-top .name").text("Cadastro 2/3");
                        }, 1500);
                    } else if (status == 0) {
                        $("#clubSignUp .loading-form .texto-validacao").text("CPF já cadastrado...tente novamente");
                        $("#clubSignUp .loading-form .input-bar").css("background-color", "#e1bb00");
                        setTimeout(() => {
                            $("#clubSignUp .step-1").removeClass("hidden");
                            $("#clubSignUp .loading-form").addClass("hidden");
                            $("#clubSignUp .loading-form .input-bar").css("background-color", "#00A7E1");
                            $("#clubSignUp .modal-top .name").text("Cadastro 1/3");
                        }, 1000);
                    }
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    }
    $("button.--next").on("click", function(){
        ValidaCPF($('#field-cpf').val());
    });
    $('#clubSignUp input[name="cpf"]').focus(function(){
        $('#clubSignUp input[name="cpf"]').attr('placeholder', '000.000.000-00');
        $('#clubSignUp .group-cpf small').text('Informe o CPF para prosseguir.');
        $('#clubSignUp .group-cpf').removeClass('has-warning has-error');
        $('#clubSignUp .group-cpf small').addClass('hidden');
    });
    $('#clubSignUp input[name="cpf"]').focusout(function(){
        $('#clubSignUp input[name="cpf"]').attr('placeholder', '');
    });
    // VALIDAÃ‡ÃƒO DO NOME
    function ValidaNome(_nome){
        // #Valida nome
        var _sobrenome = _nome.split(' ')[1];
        if (_nome == undefined) {
            $('#clubSignUp .group-nome small').text('Preencha o campo com o nome completo');
            $('#clubSignUp .group-nome').addClass('has-error');
            $('#clubSignUp .group-nome small').removeClass('hidden');
        }else if(_nome == '' || _nome == null){
            $('#clubSignUp .group-nome small').text('O nome completo Ã© obrigatÃ³rio.');
            $('#clubSignUp .group-nome').addClass('has-warning');
            $('#clubSignUp .group-nome small').removeClass('hidden');
        }else{
            $('#clubSignUp input[name="nome"]').attr('placeholder', '');
            $('#clubSignUp .group-nome').removeClass('has-error has-warning');
            $('#clubSignUp .group-nome small').addClass('hidden');
        }
        if (_sobrenome == undefined) {
            $('#clubSignUp .group-nome small').text('*ObrigatÃ³rio.');
            $('#clubSignUp .group-nome').addClass('has-error');
            $('#clubSignUp .group-nome small').removeClass('hidden');
            return false;
        } else {
            $('#clubSignUp input[name="nome"]').attr('placeholder', '');
            $('#clubSignUp .group-nome').removeClass('has-error has-warning');
            $('#clubSignUp .group-nome small').addClass('hidden');
        }
    }
    $('#clubSignUp input[name="nome"]').focus(function(){
        $('#clubSignUp .group-nome').removeClass('has-error has-warning');
        $('#clubSignUp .group-nome small').addClass('hidden');
        $('#clubSignUp input[name="nome"]').attr('placeholder', 'ex: Berenice Silva Santos');
    });
    $('#clubSignUp input[name="nome"]').focusout(function(){
        setTimeout(() => {
            ValidaNome($('#clubSignUp input[name="nome"]').val());
        }, 1000);
        $('#clubSignUp input[name="nome"]').attr('placeholder', '');
    });
    // VALIDAÃ‡ÃƒO DO EMAIL
    function ValidaEmail(_email){
        // #Valida email
        var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (_email == '' ||  _email == null) {
            $('#clubSignUp .group-email small').text('*ObrigatÃ³rio.');
            $('#clubSignUp .group-email').addClass('has-warning');
            $('#clubSignUp .group-email small').removeClass('hidden');
        }else if(_email == undefined || !filtro.test(_email)){
            $('#clubSignUp .group-email small').text('Verifique se você digitou corretamente o e-mail.');
            $('#clubSignUp .group-email').addClass('has-error');
            $('#clubSignUp .group-email small').removeClass('hidden');
        } else {
            $('#clubSignUp .group-email').removeClass('has-error has-warning');
            $('#clubSignUp .group-email small').addClass('hidden');
        }
    }
    $('#clubSignUp input[name="email"]').focus(function () {
        $('#clubSignUp .group-email input[name="email"]').attr('placeholder', 'ex: seuemail@exemplo.com');
        $('#clubSignUp .group-email').removeClass('has-error has-warning');
        $('#clubSignUp .group-email small').addClass('hidden');
    });
    $('#clubSignUp input[name="email"]').focusout(function () {
        setTimeout(() => {
            ValidaEmail($('#clubSignUp input[name="email"]').val());
        }, 1000);
        $('#clubSignUp .group-email input[name="email"]').attr('placeholder', '');
    });
    // VALIDAÃ‡ÃƒO DATA DE NASCIMENTO
    function ValidaDate(_date){
        var dateNasc = new Date(_date.slice(3,6) + _date.slice(0,2) + _date.slice(5,10));
        
        if(_date == '' || _date == null){
            $('#clubSignUp .group-datenasc small').text('*ObrigatÃ³rio.');
            $('#clubSignUp .group-datenasc').addClass('has-warning');
            $('#clubSignUp .group-datenasc small').removeClass('hidden');
            
        }else if (dateNasc == undefined || dateNasc == "Invalid Date" || _date.length < 10) {
            $('#clubSignUp .group-datenasc small').text('Formato de data inválido.');
            $('#clubSignUp .group-datenasc').addClass('has-error');
            $('#clubSignUp .group-datenasc small').removeClass('hidden');
        } else {
            $('#clubSignUp .group-datenasc').removeClass('has-error has-warning');
        }
    }
    $('#clubSignUp input[name="datenasc"]').focus(function () {
        $('#clubSignUp .group-datenasc input[name="datenasc"]').attr('placeholder', '00/00/0000');
        $('#clubSignUp .group-datenasc').removeClass('has-error has-warning');
        $('#clubSignUp .group-datenasc small').addClass('hidden');
    });
    $('#clubSignUp input[name="datenasc"]').focusout(function () {
        setTimeout(() => {
            ValidaDate($('#clubSignUp input[name="datenasc"]').val());
        }, 1000);
        $('#clubSignUp .group-datenasc input[name="datenasc"]').attr('placeholder', '');
    });
    // VALIDAÃ‡ÃƒO CELULAR
    function ValidaCel(_celular){
        // #Valida data celular
        if(_celular == '' || _celular == null){
            $('#clubSignUp .group-cel').addClass('has-warning');
            $('#clubSignUp .group-cel small').text('*ObrigatÃ³rio.');
            $('#clubSignUp .group-cel small').removeClass('hidden');
        }else if (_celular == undefined || _celular.length < 14) {
            $('#clubSignUp .group-cel').addClass('has-error');
            $('#clubSignUp .group-cel small').text('Verifique se o nÃºmero está correto.');
            $('#clubSignUp .group-cel small').removeClass('hidden');
        } else {
            $('#clubSignUp input[name="cel"]').removeClass('has-error has-warning');
        }
    }
    $('#clubSignUp input[name="cel"]').focus(function () {
        $('#clubSignUp .group-cel input[name="cel"]').attr('placeholder', '(00) 00000-0000');
        $('#clubSignUp .group-cel').removeClass('has-error has-warning');
        $('#clubSignUp .group-cel small').addClass('hidden');
    });
    $('#clubSignUp input[name="cel"]').focusout(function () {
        setTimeout(() => {
            ValidaCel($('#clubSignUp input[name="cel"]').val());
        }, 1000);
        $('#clubSignUp .group-cel input[name="cel"]').attr('placeholder', '');
    });
    
    function validaForm(_cpf, _nome, _email, _dataNascimento, _celular) {
        // #Monta objeto com dados do formulario
        var dataObject = {
            'documentType': 'cpf',
            'document': _cpf.replace('.', '').replace('.', '').replace('-', ''),
            'firstName': _nome,
            'lastName': _nome.split(' ')[1],
            'email': _email,
            'birthDate': _dataNascimento,
            'phone': _celular,
            'isNewsletterOptIn': document.querySelector('#clubSignUp input[name="newsletter"]').checked,
            'fidelidade': true,
        }
    
        if(document.querySelector('#clubSignUp input[name="terms"').checked 
            || $(".group-nome").hasClass("has-error")
            || $(".group-email").hasClass("has-error")
            || $(".group-datenasc").hasClass("has-error")
            || $(".group-cel").hasClass("has-error")){
            // #Chamada função que verifica se existe email cadastrado na CL passa objeto do form como parametro
            $("#clubSignUp .step-2").addClass("hidden");
            $("#clubSignUp .loading-form #checked").css("display", "none");
            $("#clubSignUp .loading-form #loader").css("display", "initial");
            $("#clubSignUp .loading-form .input-bar").css("background-color", "#00A7E1");
            $("#clubSignUp .loading-form .texto-validacao").text("Validando dados...");
            $("#clubSignUp .loading-form").removeClass("hidden");
    
            searchMasterData(dataObject);
        }else{
            $("#clubSignUp .group-terms").addClass("has-warning");
        }
    }
    /* ====================================================================== *\
        #Converte xml em json
    \* ====================================================================== */
    function xml2json(xml, tab) {
        var X = {
            toObj: function (xml) {
                var o = {};
                if (xml.nodeType == 1) { // element node ..
                    if (xml.attributes.length) // element with attributes  ..
                        for (var i = 0; i < xml.attributes.length; i++)
                            o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                    if (xml.firstChild) { // element has child nodes ..
                        var textChild = 0,
                            cdataChild = 0,
                            hasElementChild = false;
                        for (var n = xml.firstChild; n; n = n.nextSibling) {
                            if (n.nodeType == 1) hasElementChild = true;
                            else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                            else if (n.nodeType == 4) cdataChild++; // cdata section node
                        }
                        if (hasElementChild) {
                            if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                X.removeWhite(xml);
                                for (var n = xml.firstChild; n; n = n.nextSibling) {
                                    if (n.nodeType == 3) // text node
                                        o["#text"] = X.escape(n.nodeValue);
                                    else if (n.nodeType == 4) // cdata node
                                        o["#cdata"] = X.escape(n.nodeValue);
                                    else if (o[n.nodeName]) { // multiple occurence of element ..
                                        if (o[n.nodeName] instanceof Array)
                                            o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                        else
                                            o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                    } else // first occurence of element..
                                        o[n.nodeName] = X.toObj(n);
                                }
                            } else { // mixed content
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            }
                        } else if (textChild) { // pure text
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        } else if (cdataChild) { // cdata
                            if (cdataChild > 1)
                                o = X.escape(X.innerXml(xml));
                            else
                                for (var n = xml.firstChild; n; n = n.nextSibling)
                                    o["#cdata"] = X.escape(n.nodeValue);
                        }
                    }
                    if (!xml.attributes.length && !xml.firstChild) o = null;
                } else if (xml.nodeType == 9) { // document.node
                    o = X.toObj(xml.documentElement);
                } else
                    alert("unhandled node type: " + xml.nodeType);
                return o;
            },
            toJson: function (o, name, ind) {
                var json = name ? ("\"" + name + "\"") : "";
                if (o instanceof Array) {
                    for (var i = 0, n = o.length; i < n; i++)
                        o[i] = X.toJson(o[i], "", ind + "\t");
                    json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
                } else if (o == null)
                    json += (name && ":") + "null";
                else if (typeof (o) == "object") {
                    var arr = [];
                    for (var m in o)
                        arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                    json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
                } else if (typeof (o) == "string")
                    json += (name && ":") + "\"" + o.toString() + "\"";
                else
                    json += (name && ":") + o.toString();
                return json;
            },
            innerXml: function (node) {
                var s = ""
                if ("innerHTML" in node)
                    s = node.innerHTML;
                else {
                    var asXml = function (n) {
                        var s = "";
                        if (n.nodeType == 1) {
                            s += "<" + n.nodeName;
                            for (var i = 0; i < n.attributes.length; i++)
                                s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                            if (n.firstChild) {
                                s += ">";
                                for (var c = n.firstChild; c; c = c.nextSibling)
                                    s += asXml(c);
                                s += "</" + n.nodeName + ">";
                            } else
                                s += "/>";
                        } else if (n.nodeType == 3)
                            s += n.nodeValue;
                        else if (n.nodeType == 4)
                            s += "<![CDATA[" + n.nodeValue + "]]>";
                        return s;
                    };
                    for (var c = node.firstChild; c; c = c.nextSibling)
                        s += asXml(c);
                }
                return s;
            },
            escape: function (txt) {
                return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
            },
            removeWhite: function (e) {
                e.normalize();
                for (var n = e.firstChild; n;) {
                    if (n.nodeType == 3) { // text node
                        if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                            var nxt = n.nextSibling;
                            e.removeChild(n);
                            n = nxt;
                        } else
                            n = n.nextSibling;
                    } else if (n.nodeType == 1) { // element node
                        X.removeWhite(n);
                        n = n.nextSibling;
                    } else // any other node
                        n = n.nextSibling;
                }
                return e;
            }
        };
        if (xml.nodeType == 9) // document node
            xml = xml.documentElement;
        var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
        return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
    }
    
    /* ====================================================================== *\
        #Regex numbers to string
    \* ====================================================================== */
    function apenasNumeros(string) {
        if (string) {
            var numsStr = string.replace(/[^0-9]/g, '');
            return parseInt(numsStr);
        } else {
            return string;
        }
    }
    
    /* ====================================================================== *\
        #Varifica se cadastro existe no master data
    \* ====================================================================== */
    function searchMasterData(_dataObject) {
        $.ajax({
            url: Botiwall + '/md',
            data: {table:'CL', filter: 'email='+_dataObject.email, param:'id'},
            type: 'GET',
            success: function (data) {
                // if (data.length == 0) {
                    if (data.length == 0) {
                        console.info('>>>>>>>>>>>>>>>> Não possui email cadastrado no master data');
                        insertMasterData(_dataObject, undefined, function (resp) {
                            if (resp) {
                                console.log("Cadastrado na CL do MD!")
                                
                                createFidelidade(_dataObject, '1', function (bool, data) {
                                    if (bool) {
                                        let dataAtualiza = JSON.parse(xml2json(data, ""));
        
                                        let statusAtualiza = dataAtualiza["soap:Envelope"]["soap:Body"].CriaClienteSobrenomeResponse.CriaClienteSobrenomeResult.Status;
        
                                        if (statusAtualiza == 3288334773) {
                                            $('#clubSignUp .loading-form .texto-validacao').text("O e-mail " + _dataObject.email + " já está em uso!");
                                        } else if (statusAtualiza == 3254845440) {
                                            $('#clubSignUp .loading-form .texto-validacao').text("Ocorreu um erro no processamento, revise os dados e tente novamente!");
                                        } else if (statusAtualiza == 0) {
                                            $("#clubSignUp .loading-form .texto-validacao").text("Dados Gravados 1/2");
                                            insertMasterData(_dataObject, undefined, function (resp) {
                                                if (resp) {
                                                    console.log("Response " + resp)
                                                    $("#clubSignUp .loading-form .texto-validacao").text("Dados Gravados 2/2");
                                                    setTimeout(() => {
                                                        $("#clubSignUp .loading-form .texto-validacao").html("Concluído! Em breve você receberá um e-mail confirmando seu cadastro.");
                                                        $("#clubSignUp .loading-form .input-bar").css("background-color", "#00E13F");
                                                        $("#clubSignUp .loading-form #loader").css("display", "none");
                                                        $("#clubSignUp .loading-form #checked").css("display", "initial");
                                                        setTimeout(() => {
                                                            $("#clubSignUp .step-3").removeClass("hidden");
                                                            $("#clubSignUp .loading-form").addClass("hidden");
                                                            $(".modal--beres .logo-fidelidade").insertAfter("#clubSignUp .modal-top .name");
                                                            $(".modal--beres .logo-fidelidade").css("width", "5em");
                                                            $(".modal--beres .modal-info").css("display", "none");
                                                            $("#clubSignUp .modal-top .name").text("Cadastro 3/3");
                                                        }, 2000);
                                                    }, 1500);
                                                } else {
                                                    $('#clubSignUp .loading-form .texto-validacao').text("Dados atualizados com sucesso!");
                                                }
                                            });
                                        }
                                    } else {
                                        $('.texto-validacao').text("Ocorreu um erro no processamento, revise os dados e tente novamente!");
                                    }
                                });
                            }
                        });
                    } else {
                        idCliente = data[0].id;
                        console.info('>>>>>>>>>>>>>>>> Já possui email cadastrado no master data');
                        $("#clubSignUp .loading-form .texto-validacao").text("E-mail já cadastrado.");
                        $("#clubSignUp .loading-form .input-bar").css("background-color", "#e1bb00");
                        setTimeout(() => {
                            $("#clubSignUp .step-2").removeClass("hidden");
                            $("#clubSignUp .loading-form").addClass("hidden");
                            $("#clubSignUp .loading-form .input-bar").css("background-color", "#00A7E1");
                            $("#clubSignUp .modal-top .name").text("Cadastro 2/3");
                        }, 3000);
                }
            },
            error: function (error) {
                console.warn(error);
            }
        });
    }
    
    /* ====================================================================== *\
        #Insere cliente no master data
    \* ====================================================================== */
    function insertMasterData(_dataObject, idCliente, fn) {
    
        var dataNasc = _dataObject.birthDate.split("/");
        var nascimento = dataNasc[2] + "-" + dataNasc[1] + "-" + dataNasc[0];
        
        console.log(_dataObject);
        
        var dados_cliente = {
            email: _dataObject.email,
            firstName: _dataObject.firstName.split(' ')[0],
            lastName: _dataObject.firstName.split(' ')[1],
            birthDate: nascimento,
            documentType: "cpf",
            homePhone: "+55" + apenasNumeros(_dataObject.phone),
            phone: "+55" + apenasNumeros(_dataObject.phone),
            businessPhone: "+55" + apenasNumeros(_dataObject.phone),
            document: apenasNumeros(_dataObject.document),
            isNewsletterOptIn: true
        }

        let type, url;

        if (idCliente != undefined) {
            type = 'PATCH';
            url = 'https://api.vtexcrm.com.br/qbbr/dataentities/CL/documents/' + idCliente;
        } else {
            type = 'POST';
            url = 'https://api.vtexcrm.com.br/qbbr/dataentities/CL/documents';
        }
    
        $.ajax({
            url: Botiwall + '/md/update',
            data: {table:'CL', body: JSON.stringify(dados_cliente)},
            type: 'GET',
            success: function (data) {
                console.log(data);
                fn(data);
            },
            error: function (error) {
                console.error(error);
                fn(false);
            }
        });
    }
    /* ====================================================================== *\
        #Busca cadastro no fidelidade
    \* ====================================================================== */
    function searchFidelidade(_dataObject, idCliente) {
        $.ajax({
            url: Botiwall + '/md',
            data: {table:'CL', filter: 'email='+_dataObject.email, param:'id, fidelidade'},
            type: 'GET',
            success: function (data) {
                if (data.length != 0) {
                    if(!data[0].fidelidade){
                        var dados_cliente_ = {
                            fidelidade: true
                        } 
                        $.ajax({
                            url: Botiwall + '/md/update',
                            data: {table:'CL', body: JSON.stringify(dados_cliente_)},
                            type: 'GET',
                            success: function (data) {
                                console.log(data);
                                console.log("fidelidade atualizado");
                            },
                            error: function (error) {
                                console.error(error);
                            }
                        });
                    }
                }
            },
            error: function (error) {
                console.warn(error);
            }
        }); 
    }
    
    /* ====================================================================== *\
        #Cria fidelidade
    \* ====================================================================== */
    function createFidelidade(_dataObject, atualiza, callback) {
        $.support.cors = true;
    
        var today = new Date();
        var todayDay = today.getDate();
        var todayMonth = today.getMonth() + 1;
        var todayYear = today.getFullYear();
        var todayHours = today.getHours();
        var todayMinutes = today.getMinutes();
        var todaySeconds = today.getSeconds();
    
        var dataToShow = [_dataObject.document, _dataObject.firstName.split(' ')[0] + " " + _dataObject.lastName, _dataObject.birthDate.split('/')[0] + "/" + _dataObject.birthDate.split('/')[1] + "/" + _dataObject.birthDate.split('/')[2], _dataObject.email];
        var labelOfDataToShow = ["CPF", "Nome", "Nascimento", "Email"];
    
        for (var i = 0; i < dataToShow.length; i++) {
            console.info(labelOfDataToShow[i] + " - " + dataToShow[i]);
        }
        var idSexo = document.getElementsByClassName("beres-sexoId");
        var idSexoSelected = idSexo[0].selectedOptions[0].value;
        var dataNascimento = _dataObject.birthDate.split('/')[2].toString() + '/'+ _dataObject.birthDate.split('/')[1].toString() + '-' + _dataObject.birthDate.split('/')[0].toString();
        var telFidelidade = _dataObject.phone.split(')')[0].replace('(', '') + _dataObject.phone.split(')')[1].replace('(', '').replace('-','');
    
        // var data1 = {"consumidor": {
        //     "contatos":    [
        //              {
        //           "valor": _dataObject.email,
        //           "tipoContato": "EMAIL"
        //        },
        //              {
        //           "valor": telFidelidade.replace(' ',''),
        //           "tipoContato": "TELEFONE_CELULAR"
        //        }
        //     ],
        //     "contatosTelefonico": [],
        //     "documentos": [   {
        //        "valor": _dataObject.document,
        //        "tipoDocumento": "CPF"
        //     }],
        //     "nome": _dataObject.firstName.split(' ')[0],
        //     "sobrenome": _dataObject.lastName,
        //     "dataNascimento": dataNascimento.replace('/','-'),
        //     "sexo": idSexoSelected.toUpperCase(),
        //     "enderecos": [   {
        //        "logradouro": "",
        //        "numero": "",
        //        "cep": "",
        //        "bairro": "",
        //        "complemento": "",
        //        "cidade":       {
        //           "nome": "",
        //           "estado": {"abreviacao": ""}
        //        }
        //     }]
        // }}
    
        var data = {
            'document': _dataObject.document,
            'name': _dataObject.firstName.split(' ')[0],
            'lastName': _dataObject.lastName,
            'birthday': {
                'day': _dataObject.birthDate.split('/')[0].toString(),
                'month': _dataObject.birthDate.split('/')[1].toString(),
                'year': _dataObject.birthDate.split('/')[2].toString()
            },
            'phone': {
                'ddd': _dataObject.phone.split(')')[0].replace('(', ''),
                'number': _dataObject.phone.split(')')[1].replace('(', '').replace('-','')
            },
            'email': _dataObject.email,
            'TipoCliente': 1,
            'atualiza': atualiza,
            'datetime': {
                'day': todayDay,
                'month': todayMonth,
                'year': todayYear,
                'hour': todayHours,
                'minute': todayMinutes,
                'second': todaySeconds
            },
            'EnviaComunicacao': document.querySelector('input[name="terms"]').checked
        };
    
        
        var _msgSuccess = function () {
            console.info('Confirmação');
            $("#clubSignUp .step-3").removeClass("hidden");
            $("#clubSignUp .loading-form").addClass("hidden");
            $(".modal--beres .logo-fidelidade").insertAfter("#clubSignUp .modal-top .name");
            $(".modal--beres .logo-fidelidade").css("width", "5em");
            $(".modal--beres .modal-info").css("display", "none");
            $("#clubSignUp .modal-top .name").text("Cadastro 3/3");
            setTimeout(() => {
                $("#clubSignUp .loading-form .texto-validacao").html("Concluído!");
                $("#clubSignUp .step-3").removeClass("hidden");
                $("#clubSignUp .step-2, #clubSignUp .step-1").addClass("hidden");
            }, 2000);
        }
        // let myHeaders = new Headers({
        //     "unidadenegocio": "QDB",
        //     "canalvenda": "LOJA"
        // });
    
        // fetch('https://api.grupoboticario.com.br/grb/sb/fidelidade/'+_dataObject.document+'/cadastro?client_id=cb7dd0da-226b-41bf-bb0e-770c2c54e123&client_secret=I8oT0gR6pX7mW7tW5cF8iF1tE3tW6xR5jD6sL1hG3wR0rV6bM8',{
        //     method: 'POST',
        //     headers : myHeaders,
        //     body:JSON.stringify(data1)
        // }).then((res) => res.json())
        // .then((data) =>  _msgSuccess())
        // .catch((err)=>console.log(err))
    
        $.ajax({
            url: Botiwall + "/bematech/soap/cadastrar",
            type: "GET",
            data: { data: JSON.stringify(data)},
            success: function (data) {
                // if (atualiza == true) {
                //     $("#clubSignUp .loading-form .texto-validacao").text("Já cadastrado, dados atualizados");
                //     $("#clubSignUp .loading-form .input-bar").css("background-color", "#00E13F");
                //     $("#clubSignUp .loading-form #loader").css("display", "none");
                //     $("#clubSignUp .loading-form #checked").css("display", "initial");
                //     setTimeout(() => {
                //         $("#clubSignUp .loading-form .texto-validacao").html("Concluído!<br>Em breve você receberá um e-mail confirmando seu cadastro.");
                //     }, 2000);
                // } else {
                    $.ajax({
                        url: Botiwall + "/bematech/soap/confirmar",
                        type: "GET",
                        data: { documentNumber: _dataObject.document},
                        success: function (msg) {
                            console.info('Confirmação');
                            $("#clubSignUp .loading-form .texto-validacao").text("Dados Gravados 2/2");
                            $("#clubSignUp .loading-form .input-bar").css("background-color", "#00E13F");
                            $("#clubSignUp .loading-form #loader").css("display", "none");
                            $("#clubSignUp .loading-form #checked").css("display", "initial");
                            setTimeout(() => {
                                $("#clubSignUp .loading-form .texto-validacao").html("Concluído!<br>Em breve você receberá um e-mail confirmando seu cadastro.");
                            }, 2000);
                            console.log(msg.documentElement.textContent);
                        },
                        error: function (msg) {
                            console.info('>>>>>>>>>>>>>> confirmação');
                            console.log(">>>>>>>>>>>>>>> falha para confirmar o cadastro");
                            hideLoader();
                            return false;
                        }
                    });
                // }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    $(document).ready(function () {
        var $win = $(window);
        var $doc = $(document);
    
        //Tabs "quer saber mais"
        if ($win.width() > 768) {
            $('.more-about ul.tabs-nav > li').on('click', function (event) {
                event.preventDefault();
                $('.more-about ul.tabs-nav > li').removeClass('active');
                $(this).addClass('active');
    
                $('.more-about .tabs-content > li')
                    .removeClass('active')
                    .eq($(this).index())
                    .addClass('active');
            });
        }
        if ($win.width() < 768) {
            $(".more-about ul.tabs-nav > li > a").click(function () {
                var link = $(this).attr("href"),
                    scroll = $(link).offset().top;
                $("html,body").animate({
                    scrollTop: scroll
                }, 1500);
            });
        };
    
        var perguntas = [{
                "title": "como eu acumulo pontos?",
                "mensagem": "a cada R$1 gasto em uma das nossas lojas, você ganha 1 ponto na sua conta do clube das berês fidelidade."
            },
            {
                "title": "como eu troco meus pontos?",
                "mensagem": "a cada 20 pontos acumulados, você tem direito a R$ 1,00 de crÃ©dito no pagamento de qualquer produto ou serviço. aí funciona assim: você pode usar os pontos pra ter um desconto na sua compra ou pagar ela inteira! mas olha, você sÃ³ pode fazer essa troca quando tiver o saldo mínimo de 100 pontos, ok?"
            },
            {
                "title": "como funcionam as promoçÃµes exclusivas?",
                "mensagem": "a gente sempre prepara promoçÃµes exclusivas pras consumidoras cadastradas no clube das berês <3 pra saber delas Ã© sÃ³ ficar de olho nos e-mails que a gente envia, nas publicaçÃµes na nossa página no Facebook e no nosso site (ah! pra ter acesso Ã s promos na nossa loja virtual, você precisa fazer o login na sua conta, tá?). <br/>se você for comprar em uma das nossas lojas físicas, você precisa levar um print do nosso e-mail ou da nossa publicação no Facebook pra mostrar pra vendedora."
            },
            {
                "title": "tem presente de aniversário?",
                "mensagem": "no mês de aniversário das berês, a gente sempre manda um e-mail com uma surpresa! Ã© sÃ³ ficar de olho nas nossas mensagens ;) não esquece que pra participar você precisa levar um print do e-mail na loja, combinado?"
            },
            {
                "title": "como eu me cadastro?",
                "mensagem": "pra fazer seu cadastro Ã© super fácil: Ã© sÃ³ dar uma passadinha em uma das nossas lojas e conversar com uma das vendedoras, ou se cadastrar <a href='' class='pop-cadastro'>aqui no nosso site</a>. ah! você não precisa comprar nada pra se cadastrar!"
            },
            {
                "title": "atÃ© quando valem meus pontos?",
                "mensagem": "os pontos acumulados no clube das berês fidelidade tem o prazo de validade de 1 ano."
            },
        ];
    
        var isAppended = true;
    
        $('.faq .btn-blue').eq(0).on('click', function (event) {
            event.preventDefault();
    
            if (isAppended) {
                var htmlTotal = "";
    
                var htmlItem = "<div class=\"accordion-section\">" +
                    "    <div class=\"accordion-head\">" +
                    "        <p>#pergunta#</p>" +
                    "    </div>" +
                    "    <div class=\"accordion-body\">" +
                    "        <p>#resposta#</p>" +
                    "    </div>" +
                    "</div>";
    
    
                perguntas.forEach(function (item, idx) {
                    //if(idx >= 4){
                    console.log(idx, item);
                    htmlTotal += htmlItem.replace('#pergunta#', item.title).replace('#resposta#', item.mensagem);
                    //}
                });
    
                $('.faq-accordion').html(htmlTotal);
    
                $('.faq .btn-blue').hide();
                $('section.faq .faq-accordion').css('margin-bottom', '45px')
    
                isAppended = false;
            }
            $('.faq-accordion .accordion-head').on('click', function () {
                $(this).closest('.accordion-section').siblings().find('.accordion-head').removeClass('active').next('.accordion-body').slideUp();
                $(this).toggleClass("active").next('.accordion-body').slideToggle();
            });
        });
    
        $('.faq-accordion .accordion-head').on('click', function () {
            $(this).closest('.accordion-section').siblings().find('.accordion-head').removeClass('active').next('.accordion-body').slideUp();
            $(this).toggleClass("active").next('.accordion-body').slideToggle();
        });
    });
})
