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

    //date - 2019-07-07 11:00:05
    var date = new Date();
    var fullDate = `${date.getFullYear()}-${(date.getMonth()<10?'0':'') + date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${date.getSeconds()}`;

    btn.addEventListener("click", function(e) {
        e.preventDefault();
        var jsonData = JSON.stringify({
            'origin': document.querySelector('#bf_origem').value,
            'campaign': document.querySelector('#bf_campanha').value,
            'date': fullDate,
            'name': document.querySelector('#bf_nome').value,
            'email': document.querySelector('#bf_email').value,
            'acceptEmail': document.querySelector('#bf_autoriza').checked
        });

        var XHR = new XMLHttpRequest();
        // XHR.open('POST', '//api.vtexcrm.com.br/' + jsnomeLoja + '/dataentities/PS/documents');
        XHR.open('POST', '/api/dataentities/PS/documents', true);
    
        // Add the required HTTP header
        XHR.setRequestHeader('accept', 'application/vnd.vtex.ds.v10+json');
        XHR.setRequestHeader('content-type', 'application/json');
        XHR.send(jsonData);
    
        //successful
        XHR.addEventListener('load', function (event) {
            // window.location.href = "http://qbbr.vtexcommercestable.com.br/pre-black-week?success=1";
            window.location.href = window.location.href;
            alert('Dados confirmados com sucesso!');
            btn.text('Confirmado!').attr('disabled', true);
        });
    
        //error
        XHR.addEventListener('error', function (event) {
            alert('Houve um erro, por favor tente novamente.');
        });

    });
}
sendBFData();