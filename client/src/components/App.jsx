import React from 'react';
import SearchBar from './SearchBar.jsx';
import AllCourses from './AllCourses.jsx';
import Modal from './Modal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      modal: false,
      typeOfModal: null,
      data: null,
      type: null,
      courseId: null,
      link: null,
    }
  }

  // search for course or test 
  search(input, term) {
    let type = 'course';
    let identifier = 'name';
    if (term === 'course id') {
      identifier = 'id';
      if (input !== null) parseInt(input);
    } else if (term === 'test name') {
      type = 'test';
    } 
    // get all courses & tests
    axios.get(`http://localhost:2000/ce/${type}/${identifier}/${input}`)
      .then((response) => {
        if (response.data.length === 0) {
          this.setState({ courses: null })
        } else {
          this.setState({ courses: response.data })
        }
      })
      .catch((error) => console.log(error))
  }

  // open edit modal w/ data to Edit & type being course or test
  openModal(modal, type, data, id) {
    this.setState({ 
      modal: true,
      typeOfModal: modal,
      data: data,
      type: type,
      courseId: id
    })
  }

  // close edit modal. If data is not null, edit the coures or test & then update course list
  closeEdit(data, updates) {
    if (data) {
      let type, id;
      if (this.state.typeToEdit === 'Course') {
        type = 'course'
        id = data.course_id;
      } else {
        type = 'test'
        id = data.id;
      }
      axios.put(`http://localhost:2000/ce/${type}/${id}`, updates)
      .then(() => {
        this.search(null, 'course id');
      })
      .catch((error) => console.log(error))
    } 
    this.setState({
      modal: false,
      typeOfModal: null,
      data: null,
      type: null,
      courseId: null
    })
  }

  // close add modal. If data is not null, add to the database & then update course list
  closeAdd(data, type) {
    if (data) {
      axios.post(`http://localhost:2000/ce/${type}`, data)
      .then(() => {
        this.search(null, 'course id');
      })
      .catch((error) => console.log(error))
    } 
    this.setState({
      modal: false,
      typeOfModal: null,
      data: null,
      type: null,
      courseId: null
    })
  }

  // delete a course or test & then get updated results
  delete(data) {
    let type, id;
    if (this.state.typeToEdit === 'Course') {
      type = 'course'
      id = data.courseID;
    } else {
      type = 'test'
      id = data.id;
    }
    axios.delete(`http://localhost:2000/ce/${type}/${id}`)
      .then(() => {
        this.search(null, 'course id');
      })
      .catch((error) => console.log(error))
  }

  // make a new PDF on checking or unchecking boxes & page load
  renderPDF() {
    axios.get(`http://localhost:2000/ce/pdf`, {
      params: {
        courses:this.state.courses
      }
    })
    .then((response) => {
      var byteCharacters = atob(response.data)
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], {type: 'application/pdf'});
      var URL = window.URL || window.webkitURL;
      var downloadUrl = URL.createObjectURL(blob);
      this.setState({ link: downloadUrl })
    })
    .catch((error) => console.log(error))
  }

  // grab all courses & tests upon loading portal
  componentDidMount() {
    this.search(null, 'course id');
  }


  render() {
    let courses;
    if (this.state.courses === null) {
      courses = <div>No results. Try a different search.</div>
    } else if (this.state.courses.length === 0) {
      courses = <div>Loading...</div>
    } else {
      courses = <AllCourses courses={this.state.courses} modal={this.openModal.bind(this)} renderPDF={this.renderPDF.bind(this)}/>
    }
    

    return (
      <>
        {this.state.modal ? <Modal data={this.state.data} modal={this.state.typeOfModal} id={this.state.courseId} type={this.state.type} closeEdit={this.closeEdit.bind(this)} closeAdd={this.closeAdd.bind(this)}  delete={this.delete.bind(this)}/>: null}

        <header>
          <h1>Education Portal</h1>
          <SearchBar search={this.search.bind(this)}/>
          <div id='pdf-link'><a href={this.state.link} target='_blank'>Download Education History</a></div> 
        </header>

        <div id='main'>
          <h3>Available Courses</h3>

          {courses}

          <div>
            <button onClick={this.openModal.bind(this, 'Add', 'Course')}>Add New Course</button>
          </div>

        </div>
      </>
    )
  }
}

export default App;