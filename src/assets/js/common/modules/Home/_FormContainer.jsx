
import Input from "./components/Input.jsx";

const Methods = {
  init(){
    // Methods.Form();
    Methods.Form();
  },
  Form(){
    class FormContainer extends React.Component {
      constructor() {
        super();
        this.state = {
          seo_title: ""
        };
        this.handleChange = this.handleChange.bind(this);
      }
      handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
      }
      render() {
        const { seo_title } = this.state;
        return (
          <form id="article-form">
            <Input
              text="SEO title"
              label="seo_title"
              type="text"
              id="seo_title"
              value={seo_title}
              handleChange={this.handleChange}
            />
          </form>
        );
      }
    }
    
    ReactDOM.render(
      <FormContainer />,
      document.getElementById('app')
    );
  }
}

export default {
  init: Methods.init
};
