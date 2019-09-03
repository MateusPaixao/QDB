class ClaroStrategy {
    getResult() {
        var obj = {
            "id": "claro",
            "name" : "Tom Claro",
            "imageURL" : "https://via.placeholder.com/150",
            "text" : "Texto explicativo para pessoas de tom de pele claro",
            "subtones" : { //objetos do segundo nível
                    "quente" : {
                        "name" : "Subtom quente",
                        "imageURL" : "https://via.placeholder.com/150",
                        "text" : "Texto explicativo para pessoas de subtom de pele quente",
                        "colors" : [
                            {
                                "name" : "Cor 00N",
                                "imageURL" : "https://via.placeholder.com/150",
                                "text" : "Texto explicativo para pessoas cor de pele XX",
                                "url" : "/claro-quente-00N"
                            },
                            {
                                "name" : "Cor 01Q",
                                "imageURL" : "https://via.placeholder.com/150",
                                "text" : "Texto explicativo para pessoas cor de pele XX",
                                "url" : "/claro-quente-01Q"
                            }
                        ]
                    }, 
                    "neutro" : {
                        "name" : "Subtom neutro",
                        "imageURL" : "https://via.placeholder.com/150",
                        "text" : "Texto explicativo para pessoas de subtom de pele neutro",
                        "colors" : [
                             {
                                "name" : "Cor 00N",
                                "text" : "Texto explicativo para pessoas cor de pele XX",
                                "imageURL" : "https://via.placeholder.com/150",
                                "url" : "/claro-neutro-00N"
                            },
                            {
                                "name" : "Cor 01Q",
                                "imageURL" : "https://via.placeholder.com/150",
                                "text" : "Texto explicativo para pessoas cor de pele XX",
                                "url" : "/claro-neutro-01Q"
                            }
                        ]
                    }, 
                    "frio" : {
                        "name" : "Subtom frio",
                        "imageURL" : "https://via.placeholder.com/150",
                        "text" : "Texto explicativo para pessoas de subtom de pele frio",
                        "colors" : [
                            {
                                "name" : "Cor 01F",
                                "text" : "Texto explicativo para pessoas cor de pele XX",
                                "imageURL" : "https://via.placeholder.com/150",
                                "url" : "/claro-frio-01F"
                            },
                            {
                                "name" : "Cor 00N",
                                "imageURL" : "https://via.placeholder.com/150",
                                "text" : "Texto explicativo para pessoas cor de pele XX",
                                "url" : "/claro-frio-00N"
                            }
                        ]
                    }, 
            }
        };
        return obj;
    }
}