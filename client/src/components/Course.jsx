import Test from './Test.jsx';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testsVisible: false,
    }
  }

  // view the tests available for that course or close the tests
  viewTests() {
    this.setState({ testsVisible: !this.state.testsVisible });
  }

  render() {
    return (
      <>
        <div onClick={this.viewTests.bind(this)}>
          <span>
            <h5>{this.props.data.name}</h5>
            <p> - {this.props.data.description}</p>
          </span>
          <p>Domain: {this.props.data.domain}</p>
          <p>View Tests +</p>
        </div>

        <span onClick={() => this.props.edit(this.props.data)}>Edit</span>
        
        {!this.state.testsVisible ? null:
          this.props.data.tests.map((test, i) => <Test data={test} key={i} edit={this.props.edit}/>)
        }
      </>
    )
  }
}

export default Course;