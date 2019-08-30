_client = {};
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
    
    var _checkbox = $('#_termos').attr('checked');
    if(_checkbox == 'checked'){
        $.ajax({
            url: "https://botiwall.corebiz.com.br/md/update",
            data: {
                table: 'VC',
                body: JSON.stringify(_client)
            },
            type: "GET",
            dataType: "json",
            success: function (data) {
                var _msgContainer = document.createElement('div');
                var _msgDone = document.createElement('span');
                _msgContainer.setAttribute('class', '_msg');
                _msgDone.setAttribute('class', '_msgDone');
                _msgDone.innerText = 'Dados enviados com sucesso <3';
                _msgContainer.appendChild(_msgDone);
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
            $('label[for="_termos"]').append( "<div class='_msgError' style='font-size:10px;color:red;'>Você precisa concordar com os termos de uso.</small>" );
            // console.log('não checkou');
        }
    }
    
}


