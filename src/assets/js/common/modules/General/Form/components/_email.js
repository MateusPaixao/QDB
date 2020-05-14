// const ValidateEmail = _email => {
//   // get valid email
//   let filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
//   if (_email == '' || _email == null) {
//     document.querySelector('.form-group.group-email small').innerHTML = '*Obrigatório.';
//     document.querySelector('.form-group.group-email').classList.add('has-warning');
//     document.querySelector('.form-group.group-email small').classList.remove('hidden');
//   } else if (_email == undefined || !filter.test(_email)) {
//     document.querySelector('.form-group.group-email small').innerHTML =
//       'Verifique se você digitou corretamente o e-mail.';
//     document.querySelector('.form-group.group-email').classList.add('has-error');
//     document.querySelector('.form-group.group-email small').classList.remove('hidden');
//   } else {
//     document.querySelector('.form-group.group-email').classList.remove('has-error', 'has-warning');
//     document.querySelector('.form-group.group-email small').classList.add('hidden');
//   }
// };
// const EmailCheck = () => {
//   document
//     .querySelector('.form-group.group-email input[name="email"]')
//     .addEventListener('focus', function() {
//       //   setPlaceholder(this, 'ex: seuemail@exemplo.com');
//       console.log(this);
//       document
//         .querySelector('.form-group.group-email')
//         .classList.remove('has-error', 'has-warning');
//       document.querySelector('.form-group.group-email small').classList.add('hidden');
//     });
//   document
//     .querySelector('.form-group.group-email input[name="email"]')
//     .addEventListener('focusOut', function() {
//       setTimeout(() => {
//         ValidateEmail(this.value);
//       }, 1000);
//       //   setPlaceholder(this, '');
//     });
// };

// const EmailSend = sku => {
//   document.querySelector('.form-group.group-email .--send').addEventListener('click', function() {
//     document.querySelector('.form-group.group-email').classList.add('--sending');
//     document.querySelector('.--send').innerHTML = 'Cadastrando...(1/2)';
//     ValidateEmail(document.querySelector('.form-group.group-email input[name="email"]').value);

//     if (document.querySelector('.group-email').classList.contains('has-error')) {
//       document.querySelector('.form-group.group-email').classList.remove('--sending');
//       document.querySelector('.--send').innerHTML = 'Avise-me!';
//     } else {
//       new Promise(resolve => {
//         let request = new XMLHttpRequest();
//         let url = 'https://www.quemdisseberenice.com.br/no-cache/AviseMe.aspx';
//         let params =
//           'notifymeClientName=Quem+disse+berenice&notifymeClientEmail=' +
//           document.querySelector('.form-group.group-email input[name="email"]').value +
//           '&notifymeIdSku=' +
//           sku;
//         console.log(params);
//         request.open('POST', url);

//         request.setRequestHeader('Content-Type', 'application/json');
//         request.setRequestHeader(
//           'Authorization',
//           'Basic Mzg4ZWYyZDAtYzNiOC00ZmQ2LWFmMTMtNDQ2YjY5OGQ1NDRhOjU2N2Q0MjVmLTA1MGQtNGY1NC05MWUxLTMzODgwZmFjZmRkMw=='
//         );
//         request.setRequestHeader('Access-Control-Allow-Origin', '*');
//         request.onreadystatechange = () => {
//           if (request.readyState === 4) {
//             document.querySelector('.--send').innerHTML = 'Cadastrando...(2/2)';
//             resolve(request.response);
//           } else {
//             document.querySelector('.--send').innerHTML = 'Erro ao Cadastrar';
//           }
//         };
//         request.send(params);
//       }).then(r => {
//         console.log(r);
//         if (r == true) {
//           document.querySelector('.--send').innerHTML = 'Sucesso! Em breve nós te avisaremos.';
//           setTimeout(() => {
//             document.querySelector('.--send').innerHTML = 'Avise-me!';
//             document.querySelector('.form-group.group-email').classList.remove('--sending');
//           }, 3000);
//         } else {
//           document.querySelector('.--send').innerHTML = 'Avise-me!';
//           document.querySelector('.form-group.group-email').classList.remove('--sending');
//         }
//       });
//     }
//   });
// };
