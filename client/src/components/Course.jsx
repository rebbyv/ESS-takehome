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
      <div className='courses' onClick={this.viewTests.bind(this)}>
        <span className='edit-course-btn' onClick={() => this.props.edit(this.props.data)}>Edit</span>
        <span className='course-info'>
          <span className='course-name'><strong>{this.props.data.name}</strong> - {this.props.data.description}</span>
          <span>Domain: {this.props.data.domain}</span>
        </span>

        <div className='show-tests'>{this.state.testsVisible ? '- Hide':'+ Show'} Tests</div>
        {!this.state.testsVisible ? null:
          <ul>
            {this.props.data.tests.map((test, i) => <Test data={test} key={i} edit={this.props.edit}/>)}
          </ul>
        }
        {!this.state.testsVisible ? null:
          <button onClick={() => this.props.add('Test', this.props.data.id)}>Add New Test</button>
        }
      </div>
    )
  }
}

export default Course;