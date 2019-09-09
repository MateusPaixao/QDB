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

var colorName = document.querySelector('#color-name');
colorName.innerHTML = option;

var resultImage = document.querySelector('#quiz-image');
resultImage.innerHTML = `<img src='/arquivo/${option}'/>`;