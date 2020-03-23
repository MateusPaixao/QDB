class ClaroMedioStrategy {
  getResult() {
    var obj = {
      id: 'claro-medio',
      name: 'Tom claro médio',
      imageURL: 'https://via.placeholder.com/150',
      text: 'Texto explicativo para pessoas de tom de pele claro medio',
      subtones: {
        //objetos do segundo nível
        quente: {
          name: 'Subtom quente',
          imageURL: 'https://via.placeholder.com/150',
          text: 'Texto explicativo para pessoas de subtom de pele quente',
          colors: [
            {
              name: 'Cor 02Q',
              imageURL: 'https://via.placeholder.com/150',
              text: 'Texto explicativo para pessoas cor de pele XX',
              url: '/claro-quente-02Q'
            },
            {
              name: 'Cor 3Q',
              imageURL: 'https://via.placeholder.com/150',
              text: 'Texto explicativo para pessoas cor de pele XX',
              url: '/claro-quente-3Q'
            }
          ]
        },
        neutro: {
          name: 'Subtom neutro',
          imageURL: 'https://via.placeholder.com/150',
          text: 'Texto explicativo para pessoas de subtom de pele neutro',
          colors: [
            {
              name: 'Cor 02F',
              text: 'Texto explicativo para pessoas cor de pele XX',
              imageURL: 'https://via.placeholder.com/150',
              url: '/claro-neutro-02F'
            },
            {
              name: 'Cor 02Q',
              imageURL: 'https://via.placeholder.com/150',
              text: 'Texto explicativo para pessoas cor de pele XX',
              url: '/claro-neutro-02Q'
            },
            {
              name: 'Cor 03Q',
              text: 'Texto explicativo para pessoas cor de pele XX',
              imageURL: 'https://via.placeholder.com/150',
              url: '/claro-neutro-03Q'
            },
            {
              name: 'Cor 03F',
              imageURL: 'https://via.placeholder.com/150',
              text: 'Texto explicativo para pessoas cor de pele XX',
              url: '/claro-neutro-03F'
            }
          ]
        },
        frio: {
          name: 'Subtom frio',
          imageURL: 'https://via.placeholder.com/150',
          text: 'Texto explicativo para pessoas de subtom de pele frio',
          colors: [
            {
              name: 'Cor 03F',
              text: 'Texto explicativo para pessoas cor de pele XX',
              imageURL: 'https://via.placeholder.com/150',
              url: '/claro-frio-03F'
            },
            {
              name: 'Cor 02F',
              imageURL: 'https://via.placeholder.com/150',
              text: 'Texto explicativo para pessoas cor de pele XX',
              url: '/claro-frio-02F'
            }
          ]
        }
      }
    };
    return obj;
  }
}
