/*  Cacheamento de elementos para o DOM nao ser percorrido toda vez que precisar dar um querySelector,
 Ganha pontos no google e melhora performance :D */

export default {
    $globals: {
        body: document.querySelector('body'),
        product: document.querySelector('.product')
    },
    product: {
        FeaturePeopleSeeing: document.querySelector(".set--people-seeing")
    }
}
