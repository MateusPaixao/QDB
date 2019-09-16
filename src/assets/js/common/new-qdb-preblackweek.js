//form

function sendBFData() {
    //Form BlackFriday
    var btn = document.querySelector('#bf_form .btnSubmit');
    $('body.pre-black-week').append("<div class='lightBox_submit'><p><span>X</span>Para que a gente possa te avisar sobre as promoções da Black Week, você precisa preencher todos os dados aceitar receber nossas comunicações.</p></div>");
    $('.lightBox_submit p span').click(function () {
        $('.lightBox_submit').fadeOut();
    });
    
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        //get data
        var date = new Date();
        var fullDate = `${date.getFullYear()}-${(date.getMonth()<=10?'0':'')}` + `${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${date.getSeconds()}`;
        var jsonData = JSON.stringify({
            'origin': document.querySelector('#bf_origem').value,
            'campaign': document.querySelector('#bf_campanha').value,
            'date': fullDate,
            'name': document.querySelector('#bf_nome').value,
            'email': document.querySelector('#bf_email').value,
            'acceptEmail': document.querySelector('#bf_autoriza').checked
        });

        //set form validation
        var filtroEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var validUser = document.querySelector("input[name='validation-field']").value == 0;
        var validTerms = document.querySelector('#bf_autoriza').checked == true;
        var validName = document.querySelector('#bf_nome').value != "";
        var validEmail =  filtroEmail.test(document.querySelector('#bf_email').value);

        if (validEmail && validName && validTerms && validUser) {
            var XHR = new XMLHttpRequest();
            // XHR.open('POST', '//api.vtexcrm.com.br/' + jsnomeLoja + '/dataentities/PS/documents');
            XHR.open('POST', '/api/dataentities/PS/documents', true);
            // Add the required HTTP header
            XHR.setRequestHeader('accept', 'application/vnd.vtex.ds.v10+json');
            XHR.setRequestHeader('content-type', 'application/json');
            XHR.send(jsonData);
            //successful
            XHR.addEventListener('load', function (event) {
                alert('Dados confirmados com sucesso!');
            });
            //error
            XHR.addEventListener('error', function (event) {
                alert('Houve um erro, por favor tente novamente.');
            });
            if (window.location.href.indexOf("?success=1") > -1) {
                $(".form .group-form").remove();
                $(".form .form-success").show();
            }
        } else {
            e.preventDefault();
            $('.lightBox_submit').fadeIn();
        }
    });
}
window.onload = sendBFData();