//form

function sendBFForm() {
    //Form BlackFriday
    var btn = document.querySelector('#bf_form .btnSubmit');
    var lightBox = document.createElement('div');
    lightBox.classList.add('lightBox_submit');
    lightBox.innerHTML = '<p><span>X</span>Para que a gente possa te avisar sobre as promoções da Black Week, você precisa preencher todos os dados aceitar receber nossas comunicações.</p>';
    document.querySelector('body.pre-black-week').appendChild(lightBox);
    document.querySelector('.lightBox_submit p span').addEventListener('click', function () {
        document.querySelector('.lightBox_submit').style.display = 'none';
    });
    
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        //get data 2019-09-17 15:42:31
        var date = new Date();
        var year = `${date.getFullYear()}`;
        var month = `${(date.getMonth()<9?'0':'')}` + `${date.getMonth()+1}`;
        var day = `${(date.getDate()<10?'0':'')}` + `${date.getDate()}`;
        var hours = `${(date.getHours()<10?'0':'')}` + `${date.getHours()}`;
        var minutes = `${(date.getMinutes()<10?'0':'')}` + `${date.getMinutes()}`;
        var seconds = `${(date.getSeconds()<10?'0':'')}` + `${date.getSeconds()}`;
        var fullDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;       
        var jsonData = JSON.stringify({
            'origin': 'ECOMM',            
            'campaign': 'BLACKFRIDAY',
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
            btn.value = 'Enviando...';
            btn.setAttribute('disabled','disabled');
            var XHR = new XMLHttpRequest();
            // XHR.open('POST', '//api.vtexcrm.com.br/' + jsnomeLoja + '/dataentities/PS/documents');
            XHR.open('POST', '/api/dataentities/PS/documents', true);
            // Add the required HTTP header
            XHR.setRequestHeader('accept', 'application/vnd.vtex.ds.v10+json');
            XHR.setRequestHeader('content-type', 'application/json');
            XHR.send(jsonData);
            //successful
            XHR.addEventListener('load', function (event) {
                document.querySelector('.form .group-form').remove();
                document.querySelector('.form .form-success').style.display = 'block';
            });
            //error
            XHR.addEventListener('error', function (event) {
                alert('Houve um erro, por favor tente novamente.');
            });
        } else {
            e.preventDefault();
            document.querySelector('.lightBox_submit').style.display = 'block';
        }
    });
}
sendBFForm();