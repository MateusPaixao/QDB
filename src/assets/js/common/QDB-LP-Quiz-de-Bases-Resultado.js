const urlString = window.location.href;
const abcde = new URL(urlString);

const option = abcde.searchParams.get("option");
const supermate = abcde.searchParams.get("supermate");
const altacobertura = abcde.searchParams.get("altacobertura");
const corretivoaqua = abcde.searchParams.get("corretivoaqua");
const superfluida = abcde.searchParams.get("superfluida");
const aqua = abcde.searchParams.get("aqua");
const bbcreme = abcde.searchParams.get("bbcreme");

console.log(`option ${option}`);
console.log(`supermate ${supermate}`);
console.log(`alta cobertura ${altacobertura}`);
console.log(`corretivo ${corretivoaqua}`);
console.log(`superfluida ${superfluida}`);
console.log(`aqua ${aqua}`);
console.log(`bb creme ${bbcreme}`);

var nameDOM = document.querySelector('#color-name');
nameDOM.innerHTML = option;

var imageDOM = document.querySelector('#quiz-image');
imageDOM.innerHTML = `<img src='/arquivos/quizresultado${option}.png'/>`;

var supermateDOM = document.querySelector('#quiz-supermate');
supermateDOM.innerHTML = `${supermate}`;

var altacoberturaDOM = document.querySelector('#quiz-altacobertura');
altacoberturaDOM.innerHTML = `${altacobertura}`;

var corretivoaquaDOM = document.querySelector('#quiz-corretivoaqua');
corretivoaquaDOM.innerHTML = `${corretivoaqua}`;

var superfluidaDOM = document.querySelector('#quiz-superfluida');
superfluidaDOM.innerHTML = `${superfluida}`;

var aquaDOM = document.querySelector('#quiz-aqua');
aquaDOM.innerHTML = `${aqua}`;

var bbcremeDOM = document.querySelector('#quiz-bbcreme');
bbcremeDOM.innerHTML = `${bbcreme}`;
