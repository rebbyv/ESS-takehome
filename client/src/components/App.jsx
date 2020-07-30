import SearchBar from './SearchBar.jsx';
import AllCourses from './AllCourses.jsx';
import sortData from '../helpers/sortData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    }
  }

  // search for course or test 
  search(input, term) {
    let type = 'course';
    let identifier = 'name';
    if (term === 'course id') {
      identifier = 'id';
    } else {
      type = 'test';
    }

    axios.get(`http://localhost:2000/ce/${type}/${identifier}/${input}`)
      .then((response) => {
        var courses = sortData(response.data)
        this.setState({ courses })
      })
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    this.search(null, 'course id');
  }


  render() {
    return (
      <div>
        <SearchBar search={this.search.bind(this)}/>
        {this.state.courses.length === 0 ? <div>Loading...</div>: <AllCourses courses={this.state.courses}/>}
        <button>Add New Course</button>
      </div>
    )
  }
}

export default App;