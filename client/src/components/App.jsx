import SearchBar from './SearchBar.jsx';
import AllCourses from './AllCourses.jsx';
import Edit from './Edit.jsx';
import Add from './Add.jsx'
import sortData from '../helpers/sortData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      editModal: false,
      dataToEdit: null,
      addModal: false,
      typeToAdd: null
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
    // get all courses & tests
    axios.get(`http://localhost:2000/ce/${type}/${identifier}/${input}`)
      .then((response) => {
        // sort into array of objects, tests are nested in the courses
        var courses = sortData(response.data)
        this.setState({ courses })
      })
      .catch((error) => console.log(error))
  }

  openEdit(data) {
    this.setState({ 
      editModal: true,
      dataToEdit: data
    })
  }

  // close edit modal. If data is not null, edit the coures or test
  closeEdit(data, updates) {
    if (data) {
      let type = data.domain ? 'course': 'test';
      axios.put(`http://localhost:2000/ce/${type}/${data.id}`, updates)
      .then(() => {
        this.search(null, 'course id');
      })
      .catch((error) => console.log(error))
    } 
    this.setState({
      editModal: false,
      dataToEdit: null
    })
  }

  // open add Modal to add course or test
  openAdd(type) {
    this.setState({
      addModal: true,
      typeToAdd: type
    })
  }

  closeAdd(data, type) {
    if (data) {
      axios.post(`http://localhost:2000/ce/${type}`, data)
      .then(() => {
        this.search(null, 'course id');
      })
      .catch((error) => console.log(error))
    } 
    this.setState({
      addModal: false,
      typeToAdd: null
    })
  }

  // delete a course or test & then get updated results
  delete(data) {
    let type = data.domain ? 'course': 'test';
    axios.delete(`http://localhost:2000/ce/${type}/${data.id}`)
      .then(() => {
        this.search(null, 'course id');
      })
      .catch((error) => console.log(error))
  }

  // grab all courses & tests upon loading portal
  componentDidMount() {
    this.search(null, 'course id');
  }


  render() {
    return (
      <div>
        {this.state.editModal ? <Edit data={this.state.dataToEdit} closeEdit={this.closeEdit.bind(this)} delete={this.delete.bind(this)}/>: null}
        {this.state.addModal ? <Add type={this.state.typeToAdd} closeAdd={this.closeAdd.bind(this)}/>: null}

        <SearchBar search={this.search.bind(this)}/>

        {this.state.courses.length === 0 ? <div>Loading...</div>: <AllCourses courses={this.state.courses} edit={this.openEdit.bind(this)}/>}
        
        <button onClick={this.openAdd.bind(this, 'Course')}>Add New Course</button>
      </div>
    )
  }
}

export default App;