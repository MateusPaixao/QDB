const Modal = () => {
  return (
    <React.Fragment>
      <div class="overlay"></div>
      <div class="modalRegional__container">
        <h3>Por favor, selecione sua região</h3>
        <select class="modalRegional__selection">
          <option value="NORTE">Norte</option>
          <option value="NORDESTE">Nordeste</option>
          <option value="CENTRO">Centro-Oeste</option>
          <option value="SUDESTE">Sudeste</option>
          <option value="SUL">Sul</option>
        </select>
        <button class="modalRegional__button">CONTINUAR</button>
      </div>
    </React.Fragment>
  )
}