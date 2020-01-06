# Estrutura
Nossa estrutura a partir de 2019 começou a ser modularizada, inspirando se no modelo de Atomic Design, o que significa que quanto mais componentizado sua arquitetura for, melhor será para reutilização de módulos, e melhor legivel será seu código, você pode ver mais sobre esse modelo nesse artigo [Atomic Design e a componentização de interfaces](https://chocoladesign.com/blog/designsystems/atomic-design-e-a-componentizacao-de-interfaces/) e no livro oficial escrito por Brad Frost [Atomic Design](http://atomicdesign.bradfrost.com/). Também serviu de muita utilidade para essse modelo organizacional um artigo escrito por Ven Korolyov sobre [como estruturar uma aplicação em React](https://hackernoon.com/how-to-structure-your-react-app-98c48e102aad).

## Javascript
Este projeto é baseado em [React](https://reactjs.org/), com algumas dependências em outras tecnologias, a partir de 2019 foi incorporado o uso unicamente e exclusivo do framework React para desenvolvimento em javascript, todo o código desenvolvido em ES6+ é compilado pelo do [Babel](https://babeljs.io/)

## CSS
Para CSS a principal metodologia é baseado no [BEM](http://getbem.com/), [RSCSS](https://willianjusten.com.br/falando-sobre-rscss/) e [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)

## Testes

## Tarefas Automatizadas

## Fluxo de Integração Continua

## Pastas e Arquivos
#### Pastas
- Dist
- Docs
- QA
- Spec
- Test

#### Arquivos
- .babelrc
- .gitignore
- bitbucket-pipelines.yml
- nightwatch.conf.js
- nightwatch.json
- node-tasks.js