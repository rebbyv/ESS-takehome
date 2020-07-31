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
        <div className='courses' onClick={this.viewTests.bind(this)}>
          <span>
            <p><strong>{this.props.data.name}</strong> - {this.props.data.description}</p>
            <p>Domain: {this.props.data.domain}</p>
            <p>View Tests +</p>
          </span>
          <span onClick={() => this.props.edit(this.props.data)}>Edit</span>
        </div>

        
        {!this.state.testsVisible ? null:
          this.props.data.tests.map((test, i) => <Test data={test} key={i} edit={this.props.edit}/>)
        }
        {!this.state.testsVisible ? null:
          <button onClick={() => this.props.add('Test', this.props.data.id)}>Add New Test</button>
        }
      </>
    )
  }
}

export default Course;