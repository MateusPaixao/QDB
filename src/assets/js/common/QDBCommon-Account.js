
// const Botiwall = "https://botiwall.corebiz.com.br";
const Botiwall = "http://localhost/boti-api-middleware/public";
import XMLJS from 'xml-js';

(function ($, window, document, undefined) {
    var $win = $(window);
    var $doc = $(document);

    $doc.ready(function () { 
        console.log('11111111aaaaaaaaaaaa_____________++++++++++++++++');
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
                $(".modal--beres .logo-fidelidade").css("width", "initial");
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
                $(".modal--beres .logo-fidelidade").css("width", "initial");
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

            if ($(".group-cpf").hasClass("has-error") ||
                $(".group-nome").hasClass("has-error") ||
                $(".group-email").hasClass("has-error") ||
                $(".group-cel").hasClass("has-error") ||
                $(".group-datenasc").hasClass("has-error")) {

            } else {
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

    if (CPF == "00000000000" ||
        CPF == "11111111111" ||
        CPF == "22222222222" ||
        CPF == "33333333333" ||
        CPF == "44444444444" ||
        CPF == "55555555555" ||
        CPF == "66666666666" ||
        CPF == "77777777777" ||
        CPF == "88888888888" ||
        CPF == "99999999999") {
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
function ValidaCPF(_cpf) {
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
        $('#clubSignUp .group-cpf small').text('Informe um CPF VÃ¡lido.');
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
            data: {
                documentNumber: _validaCPF
            },
            success: function (data) {
                var jsonData = JSON.parse(xml2json(data, ""));
                var status = jsonData["soap:Envelope"]["soap:Body"].ConsultaResumoClienteResponse.ConsultaResumoClienteResult.Status;
                var descricao = jsonData["soap:Envelope"]["soap:Body"].ConsultaResumoClienteResponse.ConsultaResumoClienteResult.Descricao;

                // console.log(data);
                console.info('>>>>> searchFidelidade >>>>> status >>>>>>>>> ' + status);
                console.info('>>>>> searchFidelidade >>>>> descricao >>>>>>>' + descricao);

                $("#clubSignUp .loading-form .texto-validacao").text("Validando CPF...");
                if (status == 3288334563) {
                    $("#clubSignUp .loading-form .texto-validacao").text("CPF VÃ¡lido.");
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
                    $("#clubSignUp .loading-form .texto-validacao").text("CPF jÃ¡ cadastrado...tente novamente");
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
$("button.--next").on("click", function () {
    ValidaCPF($('#field-cpf').val());
});
$('#clubSignUp input[name="cpf"]').focus(function () {
    $('#clubSignUp input[name="cpf"]').attr('placeholder', '000.000.000-00');
    $('#clubSignUp .group-cpf small').text('Informe o CPF para prosseguir.');
    $('#clubSignUp .group-cpf').removeClass('has-warning has-error');
    $('#clubSignUp .group-cpf small').addClass('hidden');
});
$('#clubSignUp input[name="cpf"]').focusout(function () {
    $('#clubSignUp input[name="cpf"]').attr('placeholder', '');
});
// VALIDAÃ‡ÃƒO DO NOME
function ValidaNome(_nome) {
    // #Valida nome
    var _sobrenome = _nome.split(' ')[1];
    if (_nome == undefined) {
        $('#clubSignUp .group-nome small').text('Preencha o campo com o nome completo');
        $('#clubSignUp .group-nome').addClass('has-error');
        $('#clubSignUp .group-nome small').removeClass('hidden');
    } else if (_nome == '' || _nome == null) {
        $('#clubSignUp .group-nome small').text('O nome completo Ã© obrigatÃ³rio.');
        $('#clubSignUp .group-nome').addClass('has-warning');
        $('#clubSignUp .group-nome small').removeClass('hidden');
    } else {
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
$('#clubSignUp input[name="nome"]').focus(function () {
    $('#clubSignUp .group-nome').removeClass('has-error has-warning');
    $('#clubSignUp .group-nome small').addClass('hidden');
    $('#clubSignUp input[name="nome"]').attr('placeholder', 'ex: Berenice Silva Santos');
});
$('#clubSignUp input[name="nome"]').focusout(function () {
    setTimeout(() => {
        ValidaNome($('#clubSignUp input[name="nome"]').val());
    }, 1000);
    $('#clubSignUp input[name="nome"]').attr('placeholder', '');
});
// VALIDAÃ‡ÃƒO DO EMAIL
function ValidaEmail(_email) {
    // #Valida email
    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (_email == '' || _email == null) {
        $('#clubSignUp .group-email small').text('*ObrigatÃ³rio.');
        $('#clubSignUp .group-email').addClass('has-warning');
        $('#clubSignUp .group-email small').removeClass('hidden');
    } else if (_email == undefined || !filtro.test(_email)) {
        $('#clubSignUp .group-email small').text('Verifique se vocÃª digitou corretamente o e-mail.');
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
function ValidaDate(_date) {
    var dateNasc = new Date(_date.slice(3, 6) + _date.slice(0, 2) + _date.slice(5, 10));

    if (_date == '' || _date == null) {
        $('#clubSignUp .group-datenasc small').text('*ObrigatÃ³rio.');
        $('#clubSignUp .group-datenasc').addClass('has-warning');
        $('#clubSignUp .group-datenasc small').removeClass('hidden');

    } else if (dateNasc == undefined || dateNasc == "Invalid Date" || _date.length < 10) {
        $('#clubSignUp .group-datenasc small').text('Formato de data invÃ¡lido.');
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
function ValidaCel(_celular) {
    // #Valida data celular
    if (_celular == '' || _celular == null) {
        $('#clubSignUp .group-cel').addClass('has-warning');
        $('#clubSignUp .group-cel small').text('*ObrigatÃ³rio.');
        $('#clubSignUp .group-cel small').removeClass('hidden');
    } else if (_celular == undefined || _celular.length < 14) {
        $('#clubSignUp .group-cel').addClass('has-error');
        $('#clubSignUp .group-cel small').text('Verifique se o nÃºmero estÃ¡ correto.');
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

    if (document.querySelector('#clubSignUp input[name="terms"').checked ||
        $(".group-nome").hasClass("has-error") ||
        $(".group-email").hasClass("has-error") ||
        $(".group-datenasc").hasClass("has-error") ||
        $(".group-cel").hasClass("has-error")) {
        // #Chamada funÃ§Ã£o que verifica se existe email cadastrado na CL passa objeto do form como parametro
        $("#clubSignUp .step-2").addClass("hidden");
        $("#clubSignUp .loading-form #checked").css("display", "none");
        $("#clubSignUp .loading-form #loader").css("display", "initial");
        $("#clubSignUp .loading-form .input-bar").css("background-color", "#00A7E1");
        $("#clubSignUp .loading-form .texto-validacao").text("Validando dados...");
        $("#clubSignUp .loading-form").removeClass("hidden");

        searchMasterData(dataObject);
    } else {
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
        data: {
            table: 'CL',
            filter: 'email=' + _dataObject.email,
            param: 'id'
        },
        type: 'GET',
        success: function (data) {
            // if (data.length == 0) {
            console.info('>>>>>>>>>>>>>>>> NÃ£o possui email cadastrado no master data');
            if (typeof (idCliente) == 'undefined') {
                idCliente = 0;
            }
            insertMasterData(_dataObject, idCliente, function (resp) {
                if (resp) {
                    console.log("Cadastrado na CL do MD!")

                    createFidelidade(_dataObject, '1', function (bool, data) {
                        if (bool) {
                            var dataAtualiza = JSON.parse(xml2json(data, ""));

                            statusAtualiza = dataAtualiza["soap:Envelope"]["soap:Body"].CriaClienteSobrenomeResponse.CriaClienteSobrenomeResult.Status;

                            if (statusAtualiza == 3288334773) {
                                $('#clubSignUp .loading-form .texto-validacao').text("O e-mail " + _dataObject.email + " jÃ¡ estÃ¡ em uso!");
                            } else if (statusAtualiza == 3254845440) {
                                $('#clubSignUp .loading-form .texto-validacao').text("Ocorreu um erro no processamento, revise os dados e tente novamente!");
                            } else if (statusAtualiza == 0) {
                                $("#clubSignUp .loading-form .texto-validacao").text("Dados Gravados 1/2");
                                insertMasterData(_dataObject, idCliente, function (resp) {
                                    if (resp) {
                                        // console.log("Response " + resp)
                                        $("#clubSignUp .loading-form .texto-validacao").text("Dados Gravados 2/2");
                                        setTimeout(() => {
                                            $("#clubSignUp .loading-form .texto-validacao").html("ConcluÃ­do! Em breve vocÃª receberÃ¡ um e-mail confirmando seu cadastro.");
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
            // } else {
            //     idCliente = data[0].id;
            //     console.info('>>>>>>>>>>>>>>>> JÃ¡ possui email cadastrado no master data');
            //     $("#clubSignUp .loading-form .texto-validacao").text("E-mail jÃ¡ cadastrado.");
            //     $("#clubSignUp .loading-form .input-bar").css("background-color", "#e1bb00");
            //     setTimeout(() => {
            //         $("#clubSignUp .step-2").removeClass("hidden");
            //         $("#clubSignUp .loading-form").addClass("hidden");
            //         $("#clubSignUp .loading-form .input-bar").css("background-color", "#00A7E1");
            //         $("#clubSignUp .modal-top .name").text("Cadastro 2/3");
            //     }, 3000);
            // }
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

    // console.log(_dataObject);
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
    if (idCliente) {
        type = 'PATCH';
        url = 'https://api.vtexcrm.com.br/qbbr/dataentities/CL/documents/' + idCliente;
    } else {
        type = 'POST';
        url = 'https://api.vtexcrm.com.br/qbbr/dataentities/CL/documents';
    }

    $.ajax({
        url: Botiwall + '/md/update',
        data: {
            table: 'CL',
            body: JSON.stringify(dados_cliente)
        },
        type: 'GET',
        success: function (data) {
            // console.log(data);
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
        data: {
            table: 'CL',
            filter: 'email=' + _dataObject.email,
            param: 'id, fidelidade'
        },
        type: 'GET',
        success: function (data) {
            if (data.length != 0) {
                if (!data[0].fidelidade) {
                    var dados_cliente_ = {
                        fidelidade: true
                    }
                    $.ajax({
                        url: Botiwall + '/md/update',
                        data: {
                            table: 'CL',
                            body: JSON.stringify(dados_cliente_)
                        },
                        type: 'GET',
                        success: function (data) {
                            // console.log(data);
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
            'number': _dataObject.phone.split(')')[1].replace('(', '').replace('-', '')
        },
        'email': _dataObject.email,
        'atualiza': atualiza,
        'datetime': {
            'day': todayDay,
            'month': todayMonth,
            'year': todayYear,
            'hour': todayHours,
            'minute': todayMinutes,
            'second': todaySeconds
        }
    };

    $.ajax({
        url: Botiwall + "/bematech/soap/cadastrar",
        type: "GET",
        data: {
            data: JSON.stringify(data)
        },
        success: function (data) {
            if (typeof (callback) === "function") callback(true, data);

            if (atualiza == true) {
                $("#clubSignUp .loading-form .texto-validacao").text("JÃ¡ cadastrador, dados atualizados");
                $("#clubSignUp .loading-form .input-bar").css("background-color", "#00E13F");
                $("#clubSignUp .loading-form #loader").css("display", "none");
                $("#clubSignUp .loading-form #checked").css("display", "initial");
                setTimeout(() => {
                    $("#clubSignUp .loading-form .texto-validacao").html("ConcluÃ­do!<br>Em breve vocÃª receberÃ¡ um e-mail confirmando seu cadastro.");
                }, 2000);
            } else {
                $.ajax({
                    url: Botiwall + "/bematech/soap/confirmar",
                    type: "GET",
                    data: {
                        documentNumber: _dataObject.document
                    },
                    success: function (msg) {
                        console.info('ConfirmaÃ§Ã£o');
                        $("#clubSignUp .loading-form .texto-validacao").text("Dados Gravados 2/2");
                        $("#clubSignUp .loading-form .input-bar").css("background-color", "#00E13F");
                        $("#clubSignUp .loading-form #loader").css("display", "none");
                        $("#clubSignUp .loading-form #checked").css("display", "initial");
                        setTimeout(() => {
                            $("#clubSignUp .loading-form .texto-validacao").html("ConcluÃ­do!<br>Em breve vocÃª receberÃ¡ um e-mail confirmando seu cadastro.");
                        }, 2000);
                        console.log(msg.documentElement.textContent);
                    },
                    error: function (msg) {
                        console.info('>>>>>>>>>>>>>> confirmaÃ§Ã£o');
                        console.log(">>>>>>>>>>>>>>> falha para confirmar o cadastro");
                        hideLoader();
                        return false;
                    }
                });
            }
        },
        error: function (error) {
            console.log(error);
            if (typeof (callback) === "function") callback(false, error);
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
            "mensagem": "a cada R$1 gasto em uma das nossas lojas, vocÃª ganha 1 ponto na sua conta do clube das berÃªs fidelidade."
        },
        {
            "title": "como eu troco meus pontos?",
            "mensagem": "a cada 20 pontos acumulados, vocÃª tem direito a R$ 1,00 de crÃ©dito no pagamento de qualquer produto ou serviÃ§o. aÃ­ funciona assim: vocÃª pode usar os pontos pra ter um desconto na sua compra ou pagar ela inteira! mas olha, vocÃª sÃ³ pode fazer essa troca quando tiver o saldo mÃ­nimo de 100 pontos, ok?"
        },
        {
            "title": "como funcionam as promoÃ§Ãµes exclusivas?",
            "mensagem": "a gente sempre prepara promoÃ§Ãµes exclusivas pras consumidoras cadastradas no clube das berÃªs <3 pra saber delas Ã© sÃ³ ficar de olho nos e-mails que a gente envia, nas publicaÃ§Ãµes na nossa pÃ¡gina no Facebook e no nosso site (ah! pra ter acesso Ã s promos na nossa loja virtual, vocÃª precisa fazer o login na sua conta, tÃ¡?). <br/>se vocÃª for comprar em uma das nossas lojas fÃ­sicas, vocÃª precisa levar um print do nosso e-mail ou da nossa publicaÃ§Ã£o no Facebook pra mostrar pra vendedora."
        },
        {
            "title": "tem presente de aniversÃ¡rio?",
            "mensagem": "no mÃªs de aniversÃ¡rio das berÃªs, a gente sempre manda um e-mail com uma surpresa! Ã© sÃ³ ficar de olho nas nossas mensagens ;) nÃ£o esquece que pra participar vocÃª precisa levar um print do e-mail na loja, combinado?"
        },
        {
            "title": "como eu me cadastro?",
            "mensagem": "pra fazer seu cadastro Ã© super fÃ¡cil: Ã© sÃ³ dar uma passadinha em uma das nossas lojas e conversar com uma das vendedoras, ou se cadastrar <a href='' class='pop-cadastro'>aqui no nosso site</a>. ah! vocÃª nÃ£o precisa comprar nada pra se cadastrar!"
        },
        {
            "title": "atÃ© quando valem meus pontos?",
            "mensagem": "os pontos acumulados no clube das berÃªs fidelidade tem o prazo de validade de 1 ano."
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
                // console.log(idx, item);
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
var domIsReady = (function (domIsReady) {
    var isBrowserIeOrNot = function () {
        return (!document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie');
    }

    domIsReady = function (callback) {
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
    }

    return domIsReady;
})(domIsReady || {});

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
    }

function CheckEmail() {
    // vtexjs.checkout.getOrderForm().then(function(orderForm) {
    //     console.log('seu email Ã©:', orderForm.clientProfileData.email, '<3')
    //     searchMasterData(orderForm.clientProfileData.email);
        
    //     document.email = orderForm.clientProfileData.email;
    // });
    $.ajax({
        url: "https://www.quemdisseberenice.com.br/no-cache/profileSystem/getProfile",
        success: function (data) {
            document.id = data.UserId;
            document.email = data.Email;
            document.nome = data.FirstName;

            searchMasterDataLogin(data.Email);
            GetOrders(3, "._last-orders");
        }
    });
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
    var NumFormat = num.toString().slice(0, -2) + "," + num.toString().slice(-2);

    return NumFormat.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function GetOrders(qtd, Ellist) {
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
    LastOrders.then((orders) => {
        let maxIndex = qtd == "index" ? orders.length : qtd;
        for (let i = 0; i < maxIndex; i++) {
            const element = orders[i];
            //    console.log(element);
            html +=
                '<li class="_order _order-' + i + '">' +
                '<a href="#/orders/' + element.orderId + '"><span class="_info">' +
                '<span class="_color-status ' + statusOrder(element.state).timeline + '"></span>' +
                '<p class="_id"> ' + dateServeToDateUser(element.creationDate) + ' | ' + element.orderId.substring(0, element.orderId.lastIndexOf('qbbr')) + ':</p>' +
                '<p class="_status">' + statusOrder(element.state).meuspedidos + ' <svg viewbox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '</p>' +
                '</span></a>' +
                '</li>';
        }
        document.querySelector(Ellist).innerHTML = Ellist == "._last-orders" ? "<b>Ãšltimos Pedidos:</b>" + html : html;
        document.querySelectorAll("._last-orders ._order").forEach(function (el) {
            el.addEventListener("click", function () {
                document.querySelector("._profile ._initial").classList.add("--top");
                document.querySelector(".clube-das-beres-container").classList.add("hidden");
                document.querySelector(".clube-das-beres-container").style.display = "none";
                document.querySelector(".render-route-my-account-portal").style.display = "initial";
                document.querySelectorAll("._menu_item").forEach((item) => {
                    item.classList.remove("--active");
                });
                document.querySelector("._menu_item.--orders").classList.add("--active");
                setTimeout(() => {
                    scrollIt(document.querySelector('.vtex-account'), 500, 'easeOutQuad');
                }, 500);
            });
        });
    }).catch((orders) => {
        console.log("Erro ao buscar pedidos");
        // console.log(orders);
    });
}
$("._menu_item.--club").on('click', function () {
    document.querySelector("._profile ._initial").classList.add("--top");
    document.querySelector(".clube-das-beres-container").classList.remove("hidden");
    document.querySelector(".clube-das-beres-container").style.display = "flex";
    document.querySelector(".render-route-my-account-portal").style.display = "none";
    document.querySelectorAll("._menu_item").forEach((item) => {
        item.classList.remove("--active");
    });
    this.classList.add("--active");
});
$("._menu_item.--orders").on('click', function () {
    document.querySelector("._profile ._initial").classList.add("--top");
    document.querySelector(".clube-das-beres-container").classList.add("hidden");
    document.querySelector(".clube-das-beres-container").style.display = "none";
    document.querySelector(".render-route-my-account-portal").style.display = "initial";
    window.location.href = "#/orders";
    document.querySelectorAll("._menu_item").forEach((item) => {
        item.classList.remove("--active");
    });
    this.classList.add("--active");
});
$("._menu_item.--account").on('click', function () {
    document.querySelector("._profile ._initial").classList.add("--top");
    document.querySelector(".clube-das-beres-container").classList.add("hidden");
    document.querySelector(".clube-das-beres-container").style.display = "none";
    document.querySelector(".render-route-my-account-portal").style.display = "initial";
    window.location.href = "#/profile";
    document.querySelectorAll("._menu_item").forEach((item) => {
        item.classList.remove("--active");
    });
    this.classList.add("--active");
});

function validateCPF(cpf) {
    var numeros, digitos, soma, i, resultado, digitos_iguais;

    digitos_iguais = 1;

    if (cpf.length < 11)
        return false;

    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }

    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;

        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

        if (resultado != digitos.charAt(0))
            return false;

        numeros = cpf.substring(0, 10);
        soma = 0;

        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

        if (resultado != digitos.charAt(1))
            return false;
        return true;
    } else
        return false;
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
    }
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
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = this.xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
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
    var _soap = '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
        '<soap:Body>' +
        '<ExtratoParticipante xmlns="http://tempuri.org/">' +
        '<pAut>' +
        '<Canal>3</Canal>' +
        '<Usuario>admin</Usuario>' +
        '<Senha>admin</Senha>' +
        '</pAut>' +
        '<pCodigoCartao>' + _card + '</pCodigoCartao>' +
        '<pCPF>' + _document + '</pCPF>' +
        '<dataInicial>' +
        '<Dia>1</Dia>' +
        '<Mes>1</Mes>' +
        '<Ano>2012</Ano>' +
        '</dataInicial>' +
        '<dataFinal>' +
        '<Dia>31</Dia>' +
        '<Mes>12</Mes>' +
        '<Ano>2020</Ano>' +
        '</dataFinal>' +
        '<pTipoParticipante>1</pTipoParticipante>' +
        '</ExtratoParticipante>' +
        '</soap:Body>' +
        '</soap:Envelope>';

    $.ajax({
        url: "http://fidelidade.quemdisseberenice.com.br/fidelidade/businessfidelidade/Site/operacoes.asmx?op=ExtratoParticipante",
        type: "POST",
        data: _soap,
        contentType: "text/xml; charset=\"utf-8\"",
        dataType: 'xml',
        headers: {
            SOAPAction: 'http://tempuri.org/ExtratoParticipante'
        },
        success: function (data) {
            var _extract = xmlToJson(data)['soap:Envelope']['soap:Body'].ExtratoParticipanteResponse.ExtratoParticipanteResult.ItensExtrato.anyType;

            var _arrayExtract = [];

            // console.log('>>>>>>>>>>>>>>> extrato', _extract);


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
                    }

                    _arrayExtract.push(_object)
                }

                club.extract = _arrayExtract;
            } else {
                club.extract = false;
            }
        },
        error: function (error) {
            console.log(error)
        }
    });
};
var getDateServeToDateUser = function (dataServer) {
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
var getDateServe = function () {
    var _this = this

    $.get('/no-cache/HoraAtualServidor.aspx', function (date) {
        _this.formatDateVtex(date)
        _this.formatMonth(date)
        _this.countDaysMouth(date)
    });
};
var formatDateVtex = function (date) {

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
var formatMonth = function (date) {


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
            month = "marÃ§o";
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
var countDaysMouth = function (date) {
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
var getBirthday = function (dateBirthday) {
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
            })

            $('.modal-aniversario .close-modal, .modal-aniversario button, .modal-overlay').click(function () {
                $('body').removeClass('modal-on');
            })
        }
    });
};

function searchFidelity(_document) {
    $.ajax({
        url: Botiwall + "/bematech/soap/consultar",
        type: "GET",
        data: {
            documentNumber: _document
        },
        success: function (data) {
            console.log("Fidelity OK");
            console.log(data.getElementsByTagName("Status")[0].childNodes[0].nodeValue);

            // console.log(XMLJS.xml2json(data['soap:Envelope']['soap:Body'].ConsultaResumoClienteResponse.ConsultaResumoClienteResult,{compact: true, spaces: 4}))
            // var _club = xmlToJson(data)['soap:Envelope']['soap:Body'].ConsultaResumoClienteResponse.ConsultaResumoClienteResult;
            // console.log('aaaa',_club);

            if (data.getElementsByTagName("Status")[0].childNodes[0].nodeValue == "3288334563") {
                $("._not-member").addClass("hidden");
                $("._club-member").addClass("hidden");
            } else {
                $("._not-member").addClass("hidden");
                $("._club-member").removeClass("hidden");
                $(".clube-das-beres-container ._promos ._banners").addClass("--active");
                console.log('clube', data);
                console.log('clube', data.getElementsByTagName("DataNascimento")[0].childNodes[0].nodeValue);

                club.status = data.getElementsByTagName("Status")[0].childNodes[0].nodeValue;
                club.card = data.getElementsByTagName("Cartao")[0].childNodes[0].nodeValue;
                club.canScore = data.getElementsByTagName("PodePontuar")[0].childNodes[0].nodeValue;
                club.canChange = data.getElementsByTagName("PodeTrocar")[0].childNodes[0].nodeValue;
                club.score = data.getElementsByTagName("Saldo")[0].childNodes[0];

                getBirthday(data.getElementsByTagName("DataNascimento")[0].childNodes[0]);

                setDataClub(club.score);
                //busca extrato 
                // searchExtract(
                //     club.card,
                //     document.document,
                // )
            }
        },
        error: function (error) {
            console.log("Fidelity Error");
            console.error(error);
            document.querySelector("._not-member").classList.remove("hidden");
            document.querySelector("._club-member").classList.add("hidden");
        }
    });
}

function setDataClub(_saldo) {
    $("._price b").html(((_saldo / 100) * 5).toFixed(2).replace(",", ".").replace(".", ","));
    $("._points p").html(_saldo.substr(-2) + " pontos");
    $("._sup-club").html("Faltam " + (_saldo.toString().substr(-2) == "00" ? 100 : Math.round(100 - parseInt(_saldo.toString().substr(-2))).toString().substr(-2)) + " pontos para ganhar R$5,00 em desconto na prÃ³xima compra.");
    $("._fill").css("width", Math.round(_saldo / 100) * 100 - _saldo + "%");
    if (_saldo < 100) {
        $("._less-points").html("(" + _saldo + " pontos, a partir de 100 pontos vocÃª poderÃ¡ usar seu saldo.)");
        $("._less-points").css("display", "flex");
        // document.querySelector("._saldoclube").classList.add("insuficient");
    } else {
        $("._less-points").html("(" + _saldo + " pontos)");
        $("._less-points").css("display","flex");
    }
}

function SetDataUsuario() {
    $("._welcome b").html(document.nome);
}

function searchMasterDataLogin(_email) {
    console.log('AAAAAA'+_email);
    console.log('BBBBB'+ document.email);
    var _clients = new Promise((resolve, reject) => {
        let _request = new XMLHttpRequest();
        let _url = Botiwall + "/md?table=CL&filter=email=" + _email + "&param=id,nickName,email,birthDate,corporateDocument,corporateName,document,documentType,firstName,lastName,gender,homePhone,isCorporate,isNewsletterOptIn,phone,stateRegistration,tradeName,thumbface,thumbimage,nickName";
        console.log(_url);
        _request.open('GET', _url);
        _request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        _request.onreadystatechange = () => {
            if (_request.readyState === 4) {
                resolve(JSON.parse(_request.response));
            }
        }
        _request.send();
    });
    _clients.then((client) => {
        console.log(client[0].document);
        document._cpf = client[0].document;
        if (validateCPF(client[0].document.toString().replace(/\.|\-/g, ''))) {
            document.error = false;
            document.message = "CPF valido";
            document.document = client[0].document;
            console.log("Search Master OK");
            SetDataUsuario();
            console.log(client[0].document.toString().replace(/\.|\-/g, ''));
            searchFidelity(client[0].document.toString().replace(/\.|\-/g, ''));
        } else {
            document.error = true;
            document.message = "CPF invalido";
            document.document = client[0].document;
            SetDataUsuario();
        }
    });
    
    // $.ajax({
    //     url: 'https://api.vtexcrm.com.br/qbbr/dataentities/CL/search?_fields=document&_where=email=' + _email,
    //     type: 'GET',
    //     headers: header(),
    //     success: function (data) {
    //         console.log(data);
    //         console.log(data[0].document);
    //         if (validateCPF(data[0].document.toString().replace(/\.|\-/g, ''))) {
    //             document.error = false;
    //             document.message = "CPF valido";
    //             document.document = data[0].document;
    //             console.log("Search Master OK");
    //             SetDataUsuario();
    //             console.log(data[0].document.toString().replace(/\.|\-/g, ''));
    //             searchFidelity(data[0].document.toString().replace(/\.|\-/g, ''));
    //         } else {
    //             document.error = true;
    //             document.message = "CPF invalido";
    //             document.document = data[0].document;
    //             SetDataUsuario();
    //         }
    //     },
    //     error: function (error) {
    //         console.log(error);
    //     }
    // });
}

function updateMasterData() {
    $.ajax({
        url: 'https://api.vtexcrm.com.br/qbbr/dataentities/' + ENT + '/search?' + params,
        type: 'PATCH',
        data: dados_arquivo,
        headers: header(),
        success: function (data) {
            console.log(data)
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function formatMoney(money) {
    return money.replace('-', '');
}

function addClass() {
    btnMov = !btnMov
}
// }
// })
function SkeletonLoad() {
    document.querySelectorAll(".--skeleton").forEach(function (skeleton) {
        setTimeout(() => {
            skeleton.classList.remove("--skeleton");
            skeleton.style.opacity = 0;
            setTimeout(() => {
                skeleton.style.opacity = 1;
            }, 500);
        }, 3500);
    });
}

function GetProfileImg() {
    setTimeout(() => {
        var observer = new MutationObserver(function (mutations) {
            if (document.contains(document.querySelector(".vtex-account__user-image .cover"))) {
                document.querySelector("._picture ._photo img").src = document.querySelector(".vtex-account__user-image .cover").style.backgroundImage.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)[0];
                observer.disconnect();
            }
        });

        observer.observe(document, {
            attributes: false,
            childList: true,
            characterData: false,
            subtree: true
        });
    }, 3000);
}

function _getClients(email) {

    let clients = new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        let url = Botiwall + "/md?table=CL&filter=email=" + email + "&param=id,nickName,email,birthDate,corporateDocument,corporateName,document,documentType,firstName,lastName,gender,homePhone,isCorporate,isNewsletterOptIn,phone,stateRegistration,tradeName,thumbface,thumbimage,nickName";
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
        // console.log(client);
        // document._cpf = client[0].document;
    });
};

function _getAddressAll(userId) {
    let addressAll = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        let url = Botiwall + "/md?table=AD&filter=userId=" + userId + "&param=id,number,addressName,addressType,city,complement,country,neighborhood,postalCode,receiverName,reference,state,street";
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
    let Adress = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        let url = Botiwall + "/md?table=AD&filter=id=" + addressId + "&param=id,number,addressName,addressType,city,complement,country,neighborhood,postalCode,receiverName,reference,state,street";
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

$(".--edit-avatar").on("click", function () {
    eventFire(document.querySelector(".vtex-account__user-image button"), 'click');
});

$(".logged section.clube-das-beres-container ._faq ul li").each(function (el) {
    $(el).on("click", function () {
        this.classList.toggle("_active");
    });
});
$("input").each(function (el) {
    $(el).on("keyup", function () {
        removeInvalidChars($(el));
    });
    $(el).on("focusout", function () {
        removeInvalidChars($(el));
    });
});

$(document).ready(function(){
    CheckEmail();
    GetOrders("index", ".orders ul");
    GetProfileImg();
})
// (function (document, window, domIsReady, undefined) {
//     domIsReady(function () {
        // _getClients(document.email);
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

//     });
// })(document, window, domIsReady);
