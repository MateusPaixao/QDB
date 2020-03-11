import React from 'react';

class PriceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LatLng: '04551000',
      Region: 'Sudeste',
      Regions: [
        'Norte,66000000',
        'Nordeste,41000000',
        'Centro Oeste,70000000',
        'Sudeste,04551000',
        'Sul,80000000'
      ]
    };
    this.getLocation = this.getLocation.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getLocation() {
    const getCookie = function(name) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
    };
    if (getCookie('vtexRegion') != undefined) {
      return this.setState({
        Session: getCookie('vtex_session'),
        Region: getCookie('vtexRegion').split(',')[0],
        LatLng: getCookie('vtexRegion').split(',')[1]
      });
    }
    document.querySelector('.header__region').classList.add('--active');
    setTimeout(() => {
      document.querySelector('.header__region').classList.remove('--active');
    }, 5000);
    // this.setPosition(this.state.Region, this.state.LatLng);
  }

  setPosition(Region, LatLong) {
    return new Promise(resolve => {
      let request = new XMLHttpRequest(),
        data = {
          public: {
            country: {
              value: 'BRA'
            },
            postalCode: {
              value: LatLong
            }
          }
        };

      request.open('POST', '/api/sessions/' + this.state.Session);
      request.setRequestHeader('Content-Type', 'application/json');
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(JSON.parse(request.response));
          console.log('Location Up');
        }
      };

      request.send(JSON.stringify(data));
    })
      .then(() => {
        document.cookie = 'vtexRegion=' + Region + ',' + LatLong;
      })
      .catch(() => {
        this.setState({
          Region: 'Sudeste',
          LatLng: '04551000'
        });
        document.cookie = 'vtexRegion=Sudeste,04551000';
      });
  }

  componentDidMount() {
    this.getLocation();
  }

  handleChange(e) {
    this.setState(
      {
        Region: e.split(',')[0],
        LatLng: e.split(',')[1]
      },
      () => {
        this.setPosition(this.state.Region, this.state.LatLng);
      }
    );
    // setTimeout(() => {
    // }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <select
          className="header__region__selection"
          value={this.state.Region + ',' + this.state.LatLng}
          id="selectRegiao"
          onChange={e => this.handleChange(e.target.value)}
        >
          {this.state.Regions.map(R => (
            <option className="header__region__selection--option" value={R} key={R.split(',')[1]}>
              {' '}
              {R.split(',')[0]}{' '}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }
}

export default PriceModal;
