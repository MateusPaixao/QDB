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

  // showMore(){
  //     this.setState({showMore: !this.state.showMore})
  // }

  render() {
    const { departament } = this.props;

    const category = this.categoryNames();

    // const allCategory = this.groupCategory()

    // const firstCategories = allCategory.slice(0,2);

    // const newCategories = allCategory.splice(2)

    const url = window.location.href.split('/');

    return (
      <div className="filterContainer__fastFilter__names">
        <p>Já sabe o que procura?</p>
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
                {category[0].children.map((actualCategory, i) => (
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