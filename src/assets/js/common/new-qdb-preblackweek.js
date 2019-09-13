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

function sendBFData() {
    //Form BlackFriday
    var btn = document.querySelector('#bf_form .btnSubmit');
    $('body.pre-black-week').append("<div class='lightBox_submit'><p><span>X</span>Para que a gente possa te avisar sobre as promoções da Black Week, você precisa preencher todos os dados aceitar receber nossas comunicações.</p></div>");
    $('.lightBox_submit p span').click(function () {
        $('.lightBox_submit').fadeOut();
    });
    
    btn.addEventListener("click", function(e) {
        e.preventDefault();
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