class ClaroStrategy {
    
    getResult() {
        var obj = {
            "id": "claro",
            "name" : "Claro", //Como aparece no site
            "imageURL" : "/arquivos/quiz-claro.png",
            "subtones" : { //objetos do segundo nível
                    "quente" : {
                        "name" : "Quente",
                        "imageURL" : "/arquivos/01Q.png",
                        "colors" : [
                            {
                                "name" : "00N",
                                "imageURL" : "/arquivos/00N.png",                                
                                "url" : "/claro-quente-00N",
                                "products" : 
                                    {
                                        "super-mate" : "00N",
                                        "alta-cobertura" : "00N",
                                        "corretivo-aqua" : "1",
                                        "super-fuida" : "01F",
                                        "aqua" : "01F",
                                        "bb-creme" : "01F"
                                    }
                            },
                            {
                                "name" : "01Q",
                                "imageURL" : "/arquivos/01Q.png",                                
                                "url" : "/claro-quente-01Q",
                                "products" : 
                                    {
                                        "super-mate" : "00Q",
                                        "alta-cobertura" : "00Q",
                                        "corretivo-aqua" : "2",
                                        "super-fuida" : "02Q",
                                        "aqua" : "01Q",
                                        "bb-creme" : "01F"
                                    }
                            }
                        ]
                    },
                    "neutro" : {
                        "name" : "Neutro",
                        "imageURL" : "/arquivos/00N.png",
                        "colors" : [
                             {
                                "name" : "00N",
                                "imageURL" : "/arquivos/00N.png",
                                "url" : "/claro-neutro-00N",
                                "products" : 
                                    {
                                        "super-mate" : "00N",
                                        "alta-cobertura" : "00N",
                                        "corretivo-aqua" : "1",
                                        "super-fuida" : "01F",
                                        "aqua" : "01F",
                                        "bb-creme" : "01F"
                                    }
                            },
                            {
                                "name" : "01N",
                                "imageURL" : "/arquivos/01N.png",
                                "url" : "/claro-neutro-01N",
                                "products" : 
                                    {
                                        "super-mate" : "01N",
                                        "alta-cobertura" : "01N",
                                        "corretivo-aqua" : "2",
                                        "super-fuida" : "01F",
                                        "aqua" : "01N",
                                        "bb-creme" : "01F"
                                    }
                            }
                        ]
                    }, 
                    "frio" : {
                        "name" : "Frio",
                        "imageURL" : "/arquivos/01F.png",
                        "colors" : [
                            {
                                "name" : "01F",
                                "imageURL" : "/arquivos/01F.png",
                                "url" : "/claro-frio-01F",
                                "products" : 
                                    {
                                        "super-mate" : "01F",
                                        "alta-cobertura" : "01F",
                                        "corretivo-aqua" : "1",
                                        "super-fuida" : "01F",
                                        "aqua" : "01F",
                                        "bb-creme" : "01F"
                                    }
                            },
                            {
                                "name" : "00N",
                                "imageURL" : "/arquivos/00N.png",
                                "url" : "/claro-frio-00N",
                                "products" : 
                                    {
                                        "super-mate" : "01N",
                                        "alta-cobertura" : "01N",
                                        "corretivo-aqua" : "1",
                                        "super-fuida" : "01F",
                                        "aqua" : "01F",
                                        "bb-creme" : "01F"
                                    }
                            }
                        ]
                    }, 
            }
        };
        return obj;
    }
}