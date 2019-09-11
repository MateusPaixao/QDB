// TESTE 0102
// ;(function($, window, document, undefined) {
// 	var $win = $(window);
// 	var $doc = $(document);

// 	$doc.ready(function() {


//         window.setTimeout(function(){
//              var mydate = [new Date().getDate(),(new Date().getMonth() + 1),new Date().getFullYear()].join('-')
//             $('#s_dt_cadastro').val(mydate);
//         },1000);
        

// 		if( $('.countdown-prebw').length ) {
//             var endDate = $('.countdown-prebw').attr('data-end');
//             $('.countdown-prebw').countdown(endDate, function(event) {
//                 $(this).find('.countdown-prebw-hours').text(
//                     event.strftime('%D')
//                 );
//                 $(this).find('.countdown-prebw-minutes').text(
//                     event.strftime('%H')
//                 );
//                 $(this).find('.countdown-prebw-seconds').text(
//                     event.strftime('%M')
//                 );
//             });
//         }

//         if($win.width() <= 767){
// 		    $("div.dicas ul li a").click(function(e) {
// 		        e.preventDefault();
// 			    // Ao clicar em uma li, fecha as outras
//                 $(this).toggleClass('dicas-active');
// 			    var $this = $(this).parent().find('div');
// 			    //$("div.dicas ul li div").not($this).hide();

// 			    $this.toggle();
// 		    });
// 		}

        
//         // SUBMIT FUN
//         $('body.pre-black-week').append("<div class='lightBox_submit'><p><span>X</span>Para que a gente posso te avisar sobre as promoÃ§Ãµes da Black Week, vocÃª precisa aceitar receber nossas comunicaÃ§Ãµes.</p></div>");
//         $('.lightBox_submit p span').click(function () {
//             $('.lightBox_submit').fadeOut();
//         });
//         $('.btnSubmit').on('click',function (e) {
//             if($("input[name='aceito']:checked").length < 1){
//                  e.preventDefault();
//                  $('.lightBox_submit').fadeIn();
//             }

//         });

//         // black-friday?sucess=1

//         // $('.form input[type=submit]').click(function(e) {
//         //     e.preventDefault();
//         //     var form = $(".form");
//         //     var actionURL = form.attr("http://x.relaciona.quemdisseberenice.com.br/ats/post.aspx");
//         //     $.ajax({
//         //         url: actionURL,
//         //         data: form.serialize(),
//         //         cache: false,
//         //         success: function(result){
//         //             window.location.href = "http://qbbr.vtexcommercestable.com.br/pre-black-week?success=1";
//         //         },
//         //         error: function(){
//         //             //error
//         //         }
//         //     });
//         // });
//         if (window.location.href.indexOf("?success=1") > -1) {
//             $(".form .group-form").remove();
//             $(".form .form-success").show();
//         }
        

// 	});

// })(jQuery, window, document);

//form

function getBFData() {
    var jsonData = JSON.stringify({
        'origem': document.querySelector('#bf_origem').value,
        'campanha': document.querySelector('#bf_campanha').value,
        'datacadastro': document.querySelector('#bf_data_cadastro').value,
        'nome': document.querySelector('#bf_nome').value,
        'email': document.querySelector('#bf_email').value,
        'autoriza': document.querySelector('#bf_autoriza').checked
    });
    console.log(jsonData);
    sendBFData(jsonData);
}

function sendBFData(data) {
    var btn = document.querySelector('#bf_form .btnSubmit');

    var XHR = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    var name;

    for(name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
  
    // Define what happens on successful data submission
    XHR.addEventListener('load', function(event) {
        if (localStorage.getItem('confirmation')) {
            localStorage.setItem('values', localStorage.getItem('values') + ' ' + registerId);
        } else {
            localStorage.setItem('confirmation', true);
            localStorage.setItem('values', registerId);
        }
        alert('Dados confirmados com sucesso!');
        btn.text('Confirmado!').attr('disabled', true);
    });
  
    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
        alert('Houve um erro, por favor tente novamente.');
    });
  
    // Set up our request
    XHR.open('POST', '//api.vtexcrm.com.br/'+jsnomeLoja+'/dataentities/CB/documents');
  
    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('accept', 'application/json');
    XHR.setRequestHeader('content-type', 'application/json');
    
    // Finally, send our data.
    XHR.send(urlEncodedData);
}

function getBFEvent() {
    var btn = document.querySelector('#bf_form .btnSubmit');
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("get!!");
        getBFData();
    });
}

getBFEvent();
