(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _client = {};
jQuery(function ($) {
    $("input[name='cepEmp']").change(function () {
        var cep_code = $(this).val();
        if (cep_code.length <= 0) return;

        $.get("http://apps.widenet.com.br/busca-cep/api/cep.json", {
            code: cep_code
        }, function (result) {
            if (result.status != 1) {
                alert(result.message || "Houve um erro desconhecido");
                return;
            }
            $("input[name='cepEmp']").val(result.code);
            $("input[name='ufEmp']").val(result.state);
            $("input[name='cidadeEmp']").val(result.city);
            //              $("input[name='cepEmp']").val( result.district );
            $("input[name='enderecoEmp']").val(result.address);
            $("input[name='numEmp']").focus();
        });
    });
});
$("input[name='cepEmp']").on("input", function () {
    this.value = this.value.replace(/[^0-9.]/g, '');
    this.value = this.value.replace(/(\..*)\./g, '$1');
});
$('._cadastro-open').click(function () {
    $('._form-modal').show();
    $('._container-vc').hide();
    $('.__overlay').css('visibility', 'visible');
    $('body').addClass('activeModal');
    $('html').scrollTop(0);
});
$('._form-modal ._after').click(function () {
    $('._form-modal').hide();
    $('body').removeClass('activeModal');
    $('.__overlay').css('visibility', 'hidden');
    $('._container-vc').show();
    $('._msg').remove();
    $('._form-container').css({
        "height": "initial",
        "overflow": "initial"
    });
});
$('._form-container').attr('onsubmit', 'return postDados()');
$('#_termos').change(function () {
    if ($(this).is(':checked')) {
        $('._msgError').remove();
    }
});

function postDados() {
    // console.log('executou!');

    _client.nomeEmp = $("input[name='nomeEmp']")[0].value;
    _client.nomeContato = $("input[name='nomeContato']")[0].value;
    _client.email = $("input[name='email']")[0].value;
    _client.telEmp = $("input[name='telEmp']")[0].value;
    _client.cepEmp = $("input[name='cepEmp']")[0].value;
    _client.enderecoEmp = $("input[name='enderecoEmp']")[0].value;
    _client.numEmp = $("input[name='numEmp']")[0].value;
    _client.cidadeEmp = $("input[name='cidadeEmp']")[0].value;
    _client.ufEmp = $("input[name='ufEmp']")[0].value;
    _client.validation = $("input[name='validation-field']")[0].value;

    var _checkbox = $('#_termos').attr('checked');
    if (_checkbox == 'checked' && _client.validation.length == 0) {
        $.ajax({
            url: "https://botiwall.corebiz.com.br/md/update",
            data: {
                table: 'VC',
                body: JSON.stringify(_client)
            },
            type: "GET",
            dataType: "json",
            success: function success(data) {
                var _msgContainer = document.createElement('div');
                var _msgDone = document.createElement('span');
                _msgContainer.setAttribute('class', '_msg');
                _msgDone.setAttribute('class', '_msgDone');
                _msgDone.innerText = 'Dados enviados com sucesso! Em breve entraremos em contato com você.';
                _msgContainer.appendChild(_msgDone);
                $('._form-container').trigger("reset");
                var _formContainer = document.querySelector('._form-modal');
                _formContainer.appendChild(_msgContainer);
                $('._form-container').css({
                    "height": "200px",
                    "overflow": "hidden"
                });
            },
            error: function error(_error) {
                console.log(_error);
            }
        });
    } else {
        if ($('._msgError').length <= 0) {
            $('label[for="_termos"]').append("<div class='_msgError' style='font-size:10px;color:red;'>É necessário concordar com os termos de uso e política de privacidade.</small>");
            // console.log('nÃ£o checkou');
        }
    }
}

// VALIDAÇÃO CELULAR
function ValidaCel(_celular) {
    // #Valida data celular
    if (_celular == '' || _celular == null) {
        $('#lp-vc .group-tel-emp').addClass('has-warning');
        $('#lp-vc .group-tel-emp small').text('*Obrigatório.');
        $('#lp-vc .group-tel-emp small').removeClass('hidden');
    } else if (_celular == undefined || _celular.length < 11) {
        $('#lp-vc .group-tel-emp').addClass('has-error');
        $('#lp-vc .group-tel-emp small').text('Verifique se o número está correto.');
        $('#lp-vc .group-tel-emp small').removeClass('hidden');
    } else {
        $('#lp-vc input[name="telEmp"]').removeClass('has-error has-warning');
    }
}
$('#lp-vc input[name="telEmp"]').focus(function () {
    $('#lp-vc .group-tel-emp input[name="telEmp"]').attr('placeholder', '00 00000-0000');
    $('#lp-vc .group-tel-emp').removeClass('has-error has-warning');
    $('#lp-vc .group-tel-emp small').addClass('hidden');
});
$('#lp-vc input[name="telEmp"]').focusout(function () {
    setTimeout(function () {
        ValidaCel($('#lp-vc input[name="telEmp"]').val());
    }, 1000);
    $('#lp-vc .group-tel-emp input[name="telEmp"]').attr('placeholder', '');
});

// VALIDAÇÃO DO EMAIL
function ValidaEmail(_email) {
    // #Valida email
    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (_email == '' || _email == null) {
        $('#lp-vc .group-email small').text('*Obrigatório.');
        $('#lp-vc .group-email').addClass('has-warning');
        $('#lp-vc .group-email small').removeClass('hidden');
    } else if (_email == undefined || !filtro.test(_email)) {
        $('#lp-vc .group-email small').text('Verifique se você digitou corretamente o e-mail.');
        $('#lp-vc .group-email').addClass('has-error');
        $('#lp-vc .group-email small').removeClass('hidden');
    } else {
        $('#lp-vc .group-email').removeClass('has-error has-warning');
        $('#lp-vc .group-email small').addClass('hidden');
    }
}
$('#lp-vc input[name="email"]').focus(function () {
    $('#lp-vc .group-email input[name="email"]').attr('placeholder', 'ex: seuemail@exemplo.com');
    $('#lp-vc .group-email').removeClass('has-error has-warning');
    $('#lp-vc .group-email small').addClass('hidden');
});
$('#lp-vc input[name="email"]').focusout(function () {
    setTimeout(function () {
        ValidaEmail($('#lp-vc input[name="email"]').val());
    }, 1000);
    $('#lp-vc .group-email input[name="email"]').attr('placeholder', '');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMzYzMjk0OWEuanMiXSwibmFtZXMiOlsiX2NsaWVudCIsImpRdWVyeSIsIiQiLCJjaGFuZ2UiLCJjZXBfY29kZSIsInZhbCIsImxlbmd0aCIsImdldCIsImNvZGUiLCJyZXN1bHQiLCJzdGF0dXMiLCJhbGVydCIsIm1lc3NhZ2UiLCJzdGF0ZSIsImNpdHkiLCJhZGRyZXNzIiwiZm9jdXMiLCJvbiIsInZhbHVlIiwicmVwbGFjZSIsImNsaWNrIiwic2hvdyIsImhpZGUiLCJjc3MiLCJhZGRDbGFzcyIsInNjcm9sbFRvcCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlIiwiYXR0ciIsImlzIiwicG9zdERhZG9zIiwibm9tZUVtcCIsIm5vbWVDb250YXRvIiwiZW1haWwiLCJ0ZWxFbXAiLCJjZXBFbXAiLCJlbmRlcmVjb0VtcCIsIm51bUVtcCIsImNpZGFkZUVtcCIsInVmRW1wIiwidmFsaWRhdGlvbiIsIl9jaGVja2JveCIsImFqYXgiLCJ1cmwiLCJkYXRhIiwidGFibGUiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInR5cGUiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJfbXNnQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiX21zZ0RvbmUiLCJzZXRBdHRyaWJ1dGUiLCJpbm5lclRleHQiLCJhcHBlbmRDaGlsZCIsInRyaWdnZXIiLCJfZm9ybUNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJlcnJvciIsIl9lcnJvciIsImNvbnNvbGUiLCJsb2ciLCJhcHBlbmQiLCJWYWxpZGFDZWwiLCJfY2VsdWxhciIsInRleHQiLCJ1bmRlZmluZWQiLCJmb2N1c291dCIsInNldFRpbWVvdXQiLCJWYWxpZGFFbWFpbCIsIl9lbWFpbCIsImZpbHRybyIsInRlc3QiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLFVBQVUsRUFBZDtBQUNBQyxPQUFPLFVBQVVDLENBQVYsRUFBYTtBQUNoQkEsTUFBRSxzQkFBRixFQUEwQkMsTUFBMUIsQ0FB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QUUsMkJBQUYsRUFBK0J3QixXQUEvQixDQUEyQyxRQUEzQztBQUNILEtBSk0sTUFJQTtBQUNIeEIsVUFBRSxxQkFBRixFQUF5QndCLFdBQXpCLENBQXFDLHVCQUFyQztBQUNBeEIsVUFBRSwyQkFBRixFQUErQnNCLFFBQS9CLENBQXdDLFFBQXhDO0FBQ0g7QUFDSjtBQUNEdEIsRUFBRSw0QkFBRixFQUFnQ2MsS0FBaEMsQ0FBc0MsWUFBWTtBQUM5Q2QsTUFBRSx5Q0FBRixFQUE2QzBCLElBQTdDLENBQWtELGFBQWxELEVBQWlFLDBCQUFqRTtBQUNBMUIsTUFBRSxxQkFBRixFQUF5QndCLFdBQXpCLENBQXFDLHVCQUFyQztBQUNBeEIsTUFBRSwyQkFBRixFQUErQnNCLFFBQS9CLENBQXdDLFFBQXhDO0FBQ0gsQ0FKRDtBQUtBdEIsRUFBRSw0QkFBRixFQUFnQ3FFLFFBQWhDLENBQXlDLFlBQVk7QUFDakRDLGVBQVcsWUFBWTtBQUNuQkMsb0JBQVl2RSxFQUFFLDRCQUFGLEVBQWdDRyxHQUFoQyxFQUFaO0FBQ0gsS0FGRCxFQUVHLElBRkg7QUFHQUgsTUFBRSx5Q0FBRixFQUE2QzBCLElBQTdDLENBQWtELGFBQWxELEVBQWlFLEVBQWpFO0FBQ0gsQ0FMRCIsImZpbGUiOiJmYWtlXzM2MzI5NDlhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY2xpZW50ID0ge307XG5qUXVlcnkoZnVuY3Rpb24gKCQpIHtcbiAgICAkKFwiaW5wdXRbbmFtZT0nY2VwRW1wJ11cIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNlcF9jb2RlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYgKGNlcF9jb2RlLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgJC5nZXQoXCJodHRwOi8vYXBwcy53aWRlbmV0LmNvbS5ici9idXNjYS1jZXAvYXBpL2NlcC5qc29uXCIsIHtcbiAgICAgICAgICAgIGNvZGU6IGNlcF9jb2RlXG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzICE9IDEpIHtcbiAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSB8fCBcIkhvdXZlIHVtIGVycm8gZGVzY29uaGVjaWRvXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdjZXBFbXAnXVwiKS52YWwocmVzdWx0LmNvZGUpO1xuICAgICAgICAgICAgJChcImlucHV0W25hbWU9J3VmRW1wJ11cIikudmFsKHJlc3VsdC5zdGF0ZSk7XG4gICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0nY2lkYWRlRW1wJ11cIikudmFsKHJlc3VsdC5jaXR5KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0nY2VwRW1wJ11cIikudmFsKCByZXN1bHQuZGlzdHJpY3QgKTtcbiAgICAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdlbmRlcmVjb0VtcCddXCIpLnZhbChyZXN1bHQuYWRkcmVzcyk7XG4gICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0nbnVtRW1wJ11cIikuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiQoXCJpbnB1dFtuYW1lPSdjZXBFbXAnXVwiKS5vbihcImlucHV0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5yZXBsYWNlKC9bXjAtOS5dL2csICcnKTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5yZXBsYWNlKC8oXFwuLiopXFwuL2csICckMScpO1xufSk7XG4kKCcuX2NhZGFzdHJvLW9wZW4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnLl9mb3JtLW1vZGFsJykuc2hvdygpO1xuICAgICQoJy5fY29udGFpbmVyLXZjJykuaGlkZSgpO1xuICAgICQoJy5fX292ZXJsYXknKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnYWN0aXZlTW9kYWwnKTtcbiAgICAkKCdodG1sJykuc2Nyb2xsVG9wKDApO1xufSk7XG4kKCcuX2Zvcm0tbW9kYWwgLl9hZnRlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuX2Zvcm0tbW9kYWwnKS5oaWRlKCk7XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdhY3RpdmVNb2RhbCcpO1xuICAgICQoJy5fX292ZXJsYXknKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgJCgnLl9jb250YWluZXItdmMnKS5zaG93KCk7XG4gICAgJCgnLl9tc2cnKS5yZW1vdmUoKTtcbiAgICAkKCcuX2Zvcm0tY29udGFpbmVyJykuY3NzKHtcbiAgICAgICAgXCJoZWlnaHRcIjogXCJpbml0aWFsXCIsXG4gICAgICAgIFwib3ZlcmZsb3dcIjogXCJpbml0aWFsXCJcbiAgICB9KTtcbn0pO1xuJCgnLl9mb3JtLWNvbnRhaW5lcicpLmF0dHIoJ29uc3VibWl0JywgJ3JldHVybiBwb3N0RGFkb3MoKScpO1xuJCgnI190ZXJtb3MnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQoJy5fbXNnRXJyb3InKS5yZW1vdmUoKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gcG9zdERhZG9zKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdleGVjdXRvdSEnKTtcblxuICAgIF9jbGllbnQubm9tZUVtcCA9ICQoXCJpbnB1dFtuYW1lPSdub21lRW1wJ11cIilbMF0udmFsdWU7XG4gICAgX2NsaWVudC5ub21lQ29udGF0byA9ICQoXCJpbnB1dFtuYW1lPSdub21lQ29udGF0byddXCIpWzBdLnZhbHVlO1xuICAgIF9jbGllbnQuZW1haWwgPSAkKFwiaW5wdXRbbmFtZT0nZW1haWwnXVwiKVswXS52YWx1ZTtcbiAgICBfY2xpZW50LnRlbEVtcCA9ICQoXCJpbnB1dFtuYW1lPSd0ZWxFbXAnXVwiKVswXS52YWx1ZTtcbiAgICBfY2xpZW50LmNlcEVtcCA9ICQoXCJpbnB1dFtuYW1lPSdjZXBFbXAnXVwiKVswXS52YWx1ZTtcbiAgICBfY2xpZW50LmVuZGVyZWNvRW1wID0gJChcImlucHV0W25hbWU9J2VuZGVyZWNvRW1wJ11cIilbMF0udmFsdWU7XG4gICAgX2NsaWVudC5udW1FbXAgPSAkKFwiaW5wdXRbbmFtZT0nbnVtRW1wJ11cIilbMF0udmFsdWU7XG4gICAgX2NsaWVudC5jaWRhZGVFbXAgPSAkKFwiaW5wdXRbbmFtZT0nY2lkYWRlRW1wJ11cIilbMF0udmFsdWU7XG4gICAgX2NsaWVudC51ZkVtcCA9ICQoXCJpbnB1dFtuYW1lPSd1ZkVtcCddXCIpWzBdLnZhbHVlO1xuICAgIF9jbGllbnQudmFsaWRhdGlvbiA9ICQoXCJpbnB1dFtuYW1lPSd2YWxpZGF0aW9uLWZpZWxkJ11cIilbMF0udmFsdWU7XG5cbiAgICB2YXIgX2NoZWNrYm94ID0gJCgnI190ZXJtb3MnKS5hdHRyKCdjaGVja2VkJyk7XG4gICAgaWYgKF9jaGVja2JveCA9PSAnY2hlY2tlZCcgJiYgX2NsaWVudC52YWxpZGF0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9ib3Rpd2FsbC5jb3JlYml6LmNvbS5ici9tZC91cGRhdGVcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICB0YWJsZTogJ1ZDJyxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShfY2xpZW50KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgX21zZ0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHZhciBfbXNnRG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBfbXNnQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnX21zZycpO1xuICAgICAgICAgICAgICAgIF9tc2dEb25lLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnX21zZ0RvbmUnKTtcbiAgICAgICAgICAgICAgICBfbXNnRG9uZS5pbm5lclRleHQgPSAnRGFkb3MgZW52aWFkb3MgY29tIHN1Y2Vzc28hIEVtIGJyZXZlIGVudHJhcmVtb3MgZW0gY29udGF0byBjb20gdm9jw6ouJztcbiAgICAgICAgICAgICAgICBfbXNnQ29udGFpbmVyLmFwcGVuZENoaWxkKF9tc2dEb25lKTtcbiAgICAgICAgICAgICAgICAkKCcuX2Zvcm0tY29udGFpbmVyJykudHJpZ2dlcihcInJlc2V0XCIpO1xuICAgICAgICAgICAgICAgIHZhciBfZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5fZm9ybS1tb2RhbCcpO1xuICAgICAgICAgICAgICAgIF9mb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKF9tc2dDb250YWluZXIpO1xuICAgICAgICAgICAgICAgICQoJy5fZm9ybS1jb250YWluZXInKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjIwMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwib3ZlcmZsb3dcIjogXCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoJCgnLl9tc2dFcnJvcicpLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAkKCdsYWJlbFtmb3I9XCJfdGVybW9zXCJdJykuYXBwZW5kKFwiPGRpdiBjbGFzcz0nX21zZ0Vycm9yJyBzdHlsZT0nZm9udC1zaXplOjEwcHg7Y29sb3I6cmVkOyc+w4kgbmVjZXNzw6FyaW8gY29uY29yZGFyIGNvbSBvcyB0ZXJtb3MgZGUgdXNvIGUgcG9sw610aWNhIGRlIHByaXZhY2lkYWRlLjwvc21hbGw+XCIpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ27Dg8KjbyBjaGVja291Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIFZBTElEQcOHw4NPIENFTFVMQVJcbmZ1bmN0aW9uIFZhbGlkYUNlbChfY2VsdWxhcikge1xuICAgIC8vICNWYWxpZGEgZGF0YSBjZWx1bGFyXG4gICAgaWYgKF9jZWx1bGFyID09ICcnIHx8IF9jZWx1bGFyID09IG51bGwpIHtcbiAgICAgICAgJCgnI2xwLXZjIC5ncm91cC10ZWwtZW1wJykuYWRkQ2xhc3MoJ2hhcy13YXJuaW5nJyk7XG4gICAgICAgICQoJyNscC12YyAuZ3JvdXAtdGVsLWVtcCBzbWFsbCcpLnRleHQoJypPYnJpZ2F0w7NyaW8uJyk7XG4gICAgICAgICQoJyNscC12YyAuZ3JvdXAtdGVsLWVtcCBzbWFsbCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9IGVsc2UgaWYgKF9jZWx1bGFyID09IHVuZGVmaW5lZCB8fCBfY2VsdWxhci5sZW5ndGggPCAxMSkge1xuICAgICAgICAkKCcjbHAtdmMgLmdyb3VwLXRlbC1lbXAnKS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgICQoJyNscC12YyAuZ3JvdXAtdGVsLWVtcCBzbWFsbCcpLnRleHQoJ1ZlcmlmaXF1ZSBzZSBvIG7Dum1lcm8gZXN0w6EgY29ycmV0by4nKTtcbiAgICAgICAgJCgnI2xwLXZjIC5ncm91cC10ZWwtZW1wIHNtYWxsJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNscC12YyBpbnB1dFtuYW1lPVwidGVsRW1wXCJdJykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvciBoYXMtd2FybmluZycpO1xuICAgIH1cbn1cbiQoJyNscC12YyBpbnB1dFtuYW1lPVwidGVsRW1wXCJdJykuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAgICQoJyNscC12YyAuZ3JvdXAtdGVsLWVtcCBpbnB1dFtuYW1lPVwidGVsRW1wXCJdJykuYXR0cigncGxhY2Vob2xkZXInLCAnMDAgMDAwMDAtMDAwMCcpO1xuICAgICQoJyNscC12YyAuZ3JvdXAtdGVsLWVtcCcpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3IgaGFzLXdhcm5pbmcnKTtcbiAgICAkKCcjbHAtdmMgLmdyb3VwLXRlbC1lbXAgc21hbGwnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG59KTtcbiQoJyNscC12YyBpbnB1dFtuYW1lPVwidGVsRW1wXCJdJykuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBWYWxpZGFDZWwoJCgnI2xwLXZjIGlucHV0W25hbWU9XCJ0ZWxFbXBcIl0nKS52YWwoKSk7XG4gICAgfSwgMTAwMCk7XG4gICAgJCgnI2xwLXZjIC5ncm91cC10ZWwtZW1wIGlucHV0W25hbWU9XCJ0ZWxFbXBcIl0nKS5hdHRyKCdwbGFjZWhvbGRlcicsICcnKTtcbn0pO1xuXG4vLyBWQUxJREHDh8ODTyBETyBFTUFJTFxuZnVuY3Rpb24gVmFsaWRhRW1haWwoX2VtYWlsKSB7XG4gICAgLy8gI1ZhbGlkYSBlbWFpbFxuICAgIHZhciBmaWx0cm8gPSAvXihbXFx3LV0rKD86XFwuW1xcdy1dKykqKUAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkL2k7XG4gICAgaWYgKF9lbWFpbCA9PSAnJyB8fCBfZW1haWwgPT0gbnVsbCkge1xuICAgICAgICAkKCcjbHAtdmMgLmdyb3VwLWVtYWlsIHNtYWxsJykudGV4dCgnKk9icmlnYXTDs3Jpby4nKTtcbiAgICAgICAgJCgnI2xwLXZjIC5ncm91cC1lbWFpbCcpLmFkZENsYXNzKCdoYXMtd2FybmluZycpO1xuICAgICAgICAkKCcjbHAtdmMgLmdyb3VwLWVtYWlsIHNtYWxsJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSBpZiAoX2VtYWlsID09IHVuZGVmaW5lZCB8fCAhZmlsdHJvLnRlc3QoX2VtYWlsKSkge1xuICAgICAgICAkKCcjbHAtdmMgLmdyb3VwLWVtYWlsIHNtYWxsJykudGV4dCgnVmVyaWZpcXVlIHNlIHZvY8OqIGRpZ2l0b3UgY29ycmV0YW1lbnRlIG8gZS1tYWlsLicpO1xuICAgICAgICAkKCcjbHAtdmMgLmdyb3VwLWVtYWlsJykuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgICAkKCcjbHAtdmMgLmdyb3VwLWVtYWlsIHNtYWxsJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNscC12YyAuZ3JvdXAtZW1haWwnKS5yZW1vdmVDbGFzcygnaGFzLWVycm9yIGhhcy13YXJuaW5nJyk7XG4gICAgICAgICQoJyNscC12YyAuZ3JvdXAtZW1haWwgc21hbGwnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxufVxuJCgnI2xwLXZjIGlucHV0W25hbWU9XCJlbWFpbFwiXScpLmZvY3VzKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcjbHAtdmMgLmdyb3VwLWVtYWlsIGlucHV0W25hbWU9XCJlbWFpbFwiXScpLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ2V4OiBzZXVlbWFpbEBleGVtcGxvLmNvbScpO1xuICAgICQoJyNscC12YyAuZ3JvdXAtZW1haWwnKS5yZW1vdmVDbGFzcygnaGFzLWVycm9yIGhhcy13YXJuaW5nJyk7XG4gICAgJCgnI2xwLXZjIC5ncm91cC1lbWFpbCBzbWFsbCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbn0pO1xuJCgnI2xwLXZjIGlucHV0W25hbWU9XCJlbWFpbFwiXScpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgVmFsaWRhRW1haWwoJCgnI2xwLXZjIGlucHV0W25hbWU9XCJlbWFpbFwiXScpLnZhbCgpKTtcbiAgICB9LCAxMDAwKTtcbiAgICAkKCcjbHAtdmMgLmdyb3VwLWVtYWlsIGlucHV0W25hbWU9XCJlbWFpbFwiXScpLmF0dHIoJ3BsYWNlaG9sZGVyJywgJycpO1xufSk7Il19
},{}]},{},[1])