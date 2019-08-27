var _client = {};
jQuery(function ($) {
    $("input[name='cepEmp']").change(function () {
        var cep_code = $(this).val();
        if (cep_code.length <= 0) return;

        $.get("http://apps.widenet.com.br/busca-cep/api/cep.json", {
                code: cep_code
            },
            function (result) {
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
});
$('._form-container').attr('onsubmit','return postDados()');
$('#_termos').change(function() {
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
    if(_checkbox == 'checked' && _client.validation.length == 0){
        $.ajax({
            url: "https://botiwall.corebiz.com.br/md/update",
            data: {
                table: 'VC',
                body: JSON.stringify(_client)
            },
            type: "GET",
            dataType: "json",
            success: function (data) {
                ValidaCel(_client.telEmp);
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
            error: function (error) {
                console.log(error);
            }
        });
    }
    else {
        if($('._msgError').length <= 0){
            $('label[for="_termos"]').append( "<div class='_msgError' style='font-size:10px;color:red;'>VocÃª precisa concordar com os termos de uso.</small>" );
            // console.log('nÃ£o checkou');
        }
    }
}

// VALIDAÇÃO CELULAR
function ValidaCel(_celular){
    // #Valida data celular
    if(_celular == '' || _celular == null){
        $('#lp-vc .group-tel-emp').addClass('has-warning');
        $('#lp-vc .group-tel-emp small').text('*Obrigatório.');
        $('#lp-vc .group-tel-emp small').removeClass('hidden');
    }else if (_celular == undefined || _celular.length < 14) {
        $('#lp-vc .group-tel-emp').addClass('has-error');
        $('#lp-vc .group-tel-emp small').text('Verifique se o número está correto.');
        $('#lp-vc .group-tel-emp small').removeClass('hidden');
    } else {
        $('#lp-vc input[name="telEmp"]').removeClass('has-error has-warning');
    }
}
$('#lp-vc input[name="telEmp"]').focus(function () {
    $('#lp-vc .group-tel-emp input[name="telEmp"]').attr('placeholder', '(00) 00000-0000');
    $('#lp-vc .group-tel-emp').removeClass('has-error has-warning');
    $('#lp-vc .group-tel-emp small').addClass('hidden');
});
$('#lp-vc input[name="telEmp"]').focusout(function () {
    setTimeout(() => {
        ValidaCel($('#lp-vc input[name="telEmp"]').val());
    }, 1000);
    $('#lp-vc .group-tel-emp input[name="telEmp"]').attr('placeholder', '');
});
