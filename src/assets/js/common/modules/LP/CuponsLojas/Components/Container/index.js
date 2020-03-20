import React, { useState, useEffect } from 'react';

const Container = ({ Stores }) => {
  const [cities, setCities] = useState([]);
  const [state, setState] = useState([]);

  const getCities = () => {
    const HeaderConfig = {
      method: 'GET',
      mode: 'cors'
    };

    const url = `http://educacao.dadosabertosbr.com/api/cidades/${state}`;
    fetch(url, HeaderConfig)
      .then(res => res.json())
      .then(data => {
        setCities(data);
      })
      .catch(err => {
        console.log('Erro', err);
      });
  };

  useEffect(() => {
    getCities();
  }, [state]);

  return (
    // console.log(Stores)
    <>
      {/* <select id="state" className="filter__select" onChange={e => setState(e.target.value)}>
        <option value="all">Todos</option>
        <option value="AC">Acre</option>
        <option value="AL">Alagoas</option>
        <option value="AP">Amapá</option>
        <option value="AM">Amazonas</option>
        <option value="BA">Bahia</option>
        <option value="CE">Ceará</option>
        <option value="DF">Distrito Federal</option>
        <option value="ES">Espírito Santo</option>
        <option value="GO">Goiás</option>
        <option value="MA">Maranhão</option>
        <option value="MT">Mato Grosso</option>
        <option value="MS">Mato Grosso do Sul</option>
        <option value="MG">Minas Gerais</option>
        <option value="PA">Pará</option>
        <option value="PB">Paraíba</option>
        <option value="PR">Paraná</option>
        <option value="PE">Pernambuco</option>
        <option value="PI">Piauí</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="RN">Rio Grande do Norte</option>
        <option value="RS">Rio Grande do Sul</option>
        <option value="RO">Rondônia</option>
        <option value="RR">Roraima</option>
        <option value="SC">Santa Catarina</option>
        <option value="SP">São Paulo</option>
        <option value="SE">Sergipe</option>
        <option value="TO">Tocantins</option>
      </select>
      <select>
        {cities.map((city, i) => (
          <option value={city} key={i}>
            {city}
          </option>
        ))}
      </select> */}

      {Stores.map((store, i) => (
        <div className="store__container" key={i}>
          <div className="store__address">
            <p className="store__name"> {store.storeName} </p>
            <p className="store__street">
              {' '}
              {store.street} , {store.number} - {store.complement}
            </p>
          </div>

          <div className="store__address">
            <p className="store__city-state">
              {' '}
              <p className="store__city"> {store.city} </p> -{' '}
              <p className="store__state">{store.state}</p>{' '}
            </p>
          </div>

          {store.make && (
            <div className="store__address">
              <p className="store__hasMake">
                {' '}
                {/* <CheckSVG />  */}
                Use o Cupom: <b className="store__coupon"> {store.coupon} </b>
              </p>
              {/* <a className="store__agendar" href="/servicos">
              Agendar make
            </a> */}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Container;
