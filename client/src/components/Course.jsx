import Test from './Test.jsx';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testsVisible: false
    }
  }

  handleClick() {
    this.setState({ testsVisible: !this.state.testsVisible })
  }

  render() {
    return (
      <>
        <div onClick={this.handleClick.bind(this)}>
          <span>
            <h5>{this.props.data.name}</h5>
            <p> - {this.props.data.description}</p>
          </span>
          <p>Domain: {this.props.data.domain}</p>
        </div>

        {!this.state.testsVisible ? null:
          this.props.data.tests.map((test, i) => <Test data={test} key={i}/>)
        }
      </>
    )
  }
}

export default Course;