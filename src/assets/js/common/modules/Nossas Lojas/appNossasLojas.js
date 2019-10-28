// -------------------------------------------------------------------------------------------------------------------------
// # QDB Nossas lojas
// -------------------------------------------------------------------------------------------------------------------------

/*
-----------------------------------
Utilizando as libs
-----------------------------------
- Angular JS
- SavanaJS
-----------------------------------

-----------------------------------
Arquivos do projeto
-----------------------------------
01 - appNossasLojas.js        -> Configuração iniciais do projeto
02 - controllerNossasLojas.js -> Controles gerais do projeto
03 - storeService.js          -> Servicos que chamam a API do MD
04 - masterdataAPIService.js  -> API do MD (todos os ajax)

*/

// -------------------------------------------------------------------------------------------------------------------------
// # Configuração de configuração nossas lojas
// -------------------------------------------------------------------------------------------------------------------------

var app = angular.module('NossasLojas', []);
var config = {
    'headers': {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json',
    },
    'baseUrl': 'https://api.vtexcrm.com.br/qbbr/dataentities/',
    'tableStores': 'NL',
    'tableStates': 'EN',
    'tableCities': 'CI'
};

// Numero minimo de lojas que serão paginadas (Default: 1 loja por paginaçãp)
config.min_show_stores = 10;

// Numero maximo de lojas que a API teve fornecer (Default: 0-1000)
config.max_show_stores = 1000;