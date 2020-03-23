import React from 'react';

class fastFilterMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      showOptions: false,
      showMore: false
    };
  }

  toggleOptions() {
    this.setState({
      showOptions: !this.state.showOptions
    });
  }

  showMore() {
    this.setState({ showMore: !this.state.showMore });
  }

  groupCategory() {
    const { departament } = this.props;
    const subCategory = departament.children.map(ctg => ctg.children);

    const allCategory = [];
    subCategory.forEach(ctgSub => {
      ctgSub.forEach(sub => {
        allCategory.push(sub);
      });
    });

    return allCategory;
  }

  categoryNames() {
    const { departament } = this.props;
    let categoryID = vtxctx.categoryId;
    const actualCategory = [];
    departament.children.map(category => {
      if (categoryID == category.id) {
        actualCategory.push(category);
      }
    });
    return actualCategory;
  }

  render() {
    const { departament } = this.props;

    const category = this.categoryNames();
    // const allCategory = this.groupCategory()

    let url = window.location.href.split('/');
    if (url[4] == "") {
      url = url.slice(0, -1)
    }
    return (
      <div className="filterContainer__fastFilter__mobile">

        {url.length <= 4 && departament.hasChildren == true ?
          <p>Já sabe o que procura?</p> :

          ''
        }

        {url.length == 5 && category[0].hasChildren == true ?
          <p>Já sabe o que procura?</p> :

          ''
        }

        <div>
          <ul>
            {(url.length <= 4 && (
              <React.Fragment>
                {departament.children.length > 3 ? (
                  <React.Fragment>
                    <a href={departament.children[0].url}>
                      <li>{departament.children[0].name}</li>
                    </a>
                    <a href={departament.children[1].url}>
                      <li>{departament.children[1].name}</li>
                    </a>
                    <a href={departament.children[2].url}>
                      <li>{departament.children[2].name}</li>
                    </a>
                    {/* <a href={departament.children[3].url}>
                      <li>{departament.children[3].name}</li>
                    </a> */}
                  </React.Fragment>
                ) : (
                    departament.children.map((children, i) => (
                      <a href={children.url} key={i}>
                        <li>{children.name}</li>
                      </a>
                    ))
                  )}
              </React.Fragment>
            )) ||
              (url.length == 5 && (
                <React.Fragment>
                  {category[0] && category[0].children.length > 0 && (
                    <React.Fragment>
                      <a href={category[0].children[0].url}>
                        <li>{category[0].children[0].name}</li>
                      </a>
                      <a href={category[0].children[1].url}>
                        <li>{category[0].children[1].name}</li>
                      </a>
                      {/* <a href={category[0].children[2].url}>
                                        <li>{category[0].children[2].name}</li>
                                    </a> */}
                    </React.Fragment>
                  )}
                  {category[0] && category[0].children.length > 2 && (
                    <p className="filterContainer__otherOptions" onClick={() => this.showMore()}>
                      {this.state.showMore == true ? 'Menos opções' : 'Mais opções'}
                    </p>
                  )}
                </React.Fragment>
              ))}
          </ul>

          <div className={`fastContainer__options open-${this.state.showMore}`}>
            <div className="otherCategories">
              <div>
                <span>Já sabe o que procura?</span>
                <span onClick={() => this.showMore()}>X</span>
              </div>
              {this.state.showMore == true &&
                category[0].children.map((children, i) => (
                  <div key={i}>
                    <a href={children.url}>
                      <span>{children.name}</span>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default fastFilterMobile;
