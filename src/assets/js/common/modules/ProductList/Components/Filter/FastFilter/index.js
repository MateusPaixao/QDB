import React from 'react';

class fastFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departament: this.props.departament,
      category: {},
      showMore: false
    };
  }

  toggleOptions() {
    this.setState(
      {
        showOptions: !this.state.showOptions
      },
      () => {
        document.querySelector('body').classList.remove(`setOverlay-${!this.state.showOptions}`);
        document.querySelector('body').classList.add(`setOverlay-${this.state.showOptions}`);
      }
    );
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

    let url = window.location.href.split('/');
    if (url[4] == "") {
      url = url.slice(0, -1)
    }

    return (
      <div className="filterContainer__fastFilter__names">

        {url.length <= 4 && departament.hasChildren == true ?
          <p>Já sabe o que procura?</p> :

          ''
        }

        {url.length == 5 && category[0].hasChildren == true ?
          <p>Já sabe o que procura?</p> :

          ''
        }
        <ul>
          {(url.length <= 4 && (
            <React.Fragment>
              {departament.children.map((children, i) => (
                <a href={children.url} key={i}>
                  <li>{children.name}</li>
                </a>
              ))}
            </React.Fragment>
          )) ||
            (url.length == 5 && (
              <React.Fragment>

                {category.length > 0 && category[0].children.map((actualCategory, i) => (
                  <a href={actualCategory.url} key={i}>
                    <li>{actualCategory.name}</li>
                  </a>
                ))
                  // firstCategories.map((children) =>
                  //     <a href={children.url}>
                  //         <li>{children.name}</li>
                  //     </a>
                  // )
                }
                {/* <p className="filterContainer__otherOptions" onClick={() => this.showMore()}>{this.state.showMore == true ? 'Menos opções' : 'Mais opções'}</p> */}
              </React.Fragment>
            ))}
        </ul>

        {/* <ul className="otherCategories">
                        {
                            this.state.showMore == true &&

                                newCategories.map((children) =>
                                    <a href={children.url}>
                                        <li>{children.name}</li>
                                    </a>    
                                )
                            
                        }
                    </ul> */}
      </div>
    );
  }
}

export default fastFilter;
