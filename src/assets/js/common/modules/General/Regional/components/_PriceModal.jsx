class PriceModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      LatLng: "04551000",
      Region: "Sudeste",
      Regions: [
        "Norte,66000000",
        "Nordeste,41000000",
        "Centro Oeste,70000000",
        "Sudeste,04551000",
        "Sul,80000000"
      ]
    }
    this.getLocation = this.getLocation.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getLocation(){
    const getCookie = function(name){
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }
    if(getCookie("vtexRegion") != undefined){
      return (
        this.setState({
          Session: getCookie("vtex_session"),
          Region: getCookie("vtexRegion")
        })
      )
    }

    this.setPosition(this.state.Region, this.state.LatLng);
  }

  setPosition(Region, LatLong){
      return new Promise((resolve, reject) => {
          let request = new XMLHttpRequest(),
          data = {
              "public":{
                  "country":{
                      "value":"BRA"
                  },
                  "geoCoordinates":{
                      "value": LatLong
                  }
              }
          };
          
          request.open('POST', "/api/sessions/" + this.state.Session);
          request.setRequestHeader("Content-Type", "application/json");
          request.onreadystatechange = () => {
              if (request.readyState === 4) {
                  resolve(JSON.parse(request.response));
                  document.querySelector(".modalRegional").classList.add("hidden");
                  console.log("Location Up");
              }
          };

          request.send(JSON.stringify(data));
      }).then(() => {
          document.cookie = "vtexRegion=" + Region;
      }).catch(()=>{
          this.setState({
              Region: "Sudeste"
          })
          document.cookie = "vtexRegion=Sudeste";
      })
  }
  
  componentDidMount(){
      this.getLocation();
  }

  handleChange(e){
    this.setState({
      Region: e.split(",")[0],
      LatLng: e.split(",")[1]
    })
  }

  render(){
    return (
      <React.Fragment>
        <div className="modalRegional__overlay"></div>
        <div className="modalRegional__container">
          <h3 className="modalRegional__container__title">Por favor, selecione sua região</h3>
          <select className="modalRegional__selection" onChange={e => this.handleChange(e.target.value)} >
             { this.state.Regions.map(R => <option value={R} key={R.split(",")[1]} selected={R.split(",")[0] == this.state.Region ? "selected" : ""} > {R.split(",")[0]} </option>) }
          </select>
          <button className="modalRegional__button" onClick={() => this.setPosition(this.state.Region, this.state.LatLng)}>Estou na Região {this.state.Region}</button>
        </div>
      </React.Fragment>
    )
  }
}

export default PriceModal;