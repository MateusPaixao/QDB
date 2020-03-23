import React from 'react';

export const InputFilter = () => {
  return (
    <div className="filter__container">
      <p className="filter__info"></p>
      <div className="filter__form">
        <label className="filter__form--state" htmlFor="state">
          Estado:
          <select id="state" className="filter__select">
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
        </label>
        <div className="filter__wrapper">
          <input type="text" className="filter__input " placeholder="Cidade, Loja, Endereço..." />
          <input type="button" className="filter__submit" id="filter__submit" />
          <label className="header__search--label" htmlFor="filter__submit">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5421 0.875549C17.2029 0.875549 21 4.48844 21 8.92315C21 13.3578 17.2029 16.9708 12.5421 16.9708C10.5263 16.9708 8.6748 16.2928 7.21945 15.167L1.49578 20.613C1.15412 20.9381 0.597942 20.9381 0.25626 20.613C-0.0854187 20.2879 -0.0854187 19.7674 0.25626 19.4423L5.97993 13.9963C4.79436 12.6108 4.08419 10.8433 4.08419 8.92315C4.08419 4.48844 7.88131 0.875549 12.5421 0.875549ZM12.5421 2.54057C8.82704 2.54057 5.8341 5.38829 5.8341 8.92315C5.8341 12.458 8.82705 15.3058 12.5421 15.3058C16.2571 15.3058 19.2501 12.458 19.2501 8.92315C19.2501 5.38829 16.2571 2.54057 12.5421 2.54057Z"
                fill="#67605F"
              ></path>
            </svg>
          </label>
        </div>
        <ul className="filter__suggestion">
          <li className="filter__suggestion--item">São Paulo - SP</li>
          <li className="filter__suggestion--item">São Bernardo - SP</li>
          <li className="filter__suggestion--item">São José dos Pinhais - PR</li>
        </ul>
      </div>
      <div className="filter__makes">
        <label className="filter__makes--label" htmlFor="has--make">
          <input type="checkbox" id="has--make" />
          Possui Agendamento de Make?
        </label>
      </div>
    </div>
  );
};

export const Filter = () => {
  const filterInput = document.querySelector('.filter__input');
  const filterState = document.querySelector('.filter__select');
  const filterSubmit = document.querySelector('.filter__submit');

  const bindFilter = () => {
    const texto = filterInput.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    let statesSelect = document.querySelector('.filter__select');
    let state = statesSelect.options[statesSelect.selectedIndex].value;
    const lojas = document.querySelectorAll('.store__container');

    lojas.forEach(loja => {
      let result = loja.textContent
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .indexOf(' ' + texto.toUpperCase());
      let lojaState = loja.childNodes[1].children[1].lastElementChild.textContent;
      return state !== 'all'
        ? lojaState == state && result > -1
          ? (loja.style = 'display:block;')
          : (loja.style = 'display:none;')
        : result < 0
        ? (loja.style = 'display:none;')
        : (loja.style = 'display:block;');
    });
  };

  filterSubmit.addEventListener('click', () => {
    bindFilter();
  });
  filterInput.addEventListener('keyup', () => {
    bindFilter();
  });
  filterState.addEventListener('change', () => {
    bindFilter();
  });
};

// ReactFilter(Stores) {
//     class ReactFilter extends React.Component {
//         constructor() {
//             super();
//             this.state = {
//                 search: '',
//             }
//         }
//         updateSearch(event) {
//             this.setState({
//                 search: event.target.value
//             })
//             console.log(this.state.search)
//         }

//         render() {
//             let filteredStore = this.props.Stores.filter(Stores => {
//                     return Stores.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(this.state.search) !== -1;
//                 }
//             );
//             return (
//                 <div>
//                     <input type="text"
//                         className="filter__input"
//                         value={this.state.search}
//                         onChange={this.updateSearch.bind(this)}
//                     />
//                 </div>
//             );
//         }
//     }
//     ReactDOM.render(
//         <ReactFilter />,
//         document.getElementById("render--filter")
//     );
// }
