class ClaroMedioStrategy {
    getResult() {
        var obj = {
            "id": "claro-medio",
            "offset": "2",
            "name" : "Claro Medio",
            "imageURL" : "https://via.placeholder.com/150",
            "text" : "Texto explicativo para pessoas de tom de pele claro médio",
            "tones" : { 
                    "tone2" : {
                        "name" : "Tom 2",
                        "imageURL" : "https://via.placeholder.com/150",
                        "text" : "Texto explicativo para pessoas de tom de pele 2"
                    }, "tone3" : {
                        "name" : "Tom 3",
                        "imageURL" : "https://via.placeholder.com/150",
                        "text" : "Texto explicativo para pessoas de tom de pele 3"
                    }
            }
        };
        return obj;
    }
}