class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      domain: '',
      duration: '',
      num_of_questions: '',
      clickCount: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // update correct values
  handleChange(event) {
    if (event.target.id === 'edit-name') {
      this.setState({ name: event.target.value })
    } else if (event.target.id === 'edit-course-description') {
      this.setState({ description: event.target.value })
    } else if (event.target.id === 'edit-course-domain') {
      this.setState({ domain: event.target.value })
    } else if (event.target.id === 'edit-test-duration') {
      this.setState({ duration: event.target.value })
    } else {
      this.setState({ num_of_questions: event.target.value })
    }
  }

  // submit the edit form to update values
  handleSubmit(e) {
    e.preventDefault();
    this.props.closeEdit(this.props.data, this.state);
  }

  // delete a course or test
  handleDelete() {
    // make the user confirm deletion
    if (this.state.clickCount === 0) {
      this.setState({ clickCount: 1 })
    } else {
      // submit request to delete & close Edit Modal
      this.props.delete(this.props.data);
      this.props.closeEdit();
      this.setState({ clickCount: 0 })
    }
  }


  render() {
    // change type & input based on whether it's a test or course being edited
    let type, inputTwo, inputThree;
    if (this.props.data.domain) {
      type = 'Course';
      inputTwo = <input type='text' value={this.state.description === '' ? this.props.data.description: this.state.description} id='edit-course-description' onChange={this.handleChange}></input>
      inputThree = <input type='text' value={this.state.domain === '' ? this.props.data.domain: this.state.domain} id='edit-course-domain' onChange={this.handleChange}></input>
    } else {
      type = 'Test';
      inputTwo = <input type='text' value={this.state.duration === '' ? this.props.data.duration: this.state.duration} id='edit-test-duration' onChange={this.handleChange}></input>
      inputThree = <input type='text' value={this.state.num_of_questions === '' ? this.props.data.num_of_questions: this.state.num_of_questions} id='edit-test-num_of_questions' onChange={this.handleChange}></input>
    }

    return (
      <div>
        <span>
          <span>Edit {type}</span> 
          <span onClick={() => this.props.closeEdit(null)}>X</span>
        </span>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.name === '' ? this.props.data.name: this.state.name} id='edit-name' onChange={this.handleChange}></input>
          {inputTwo}
          {inputThree}
          <input type='submit' value='submit'></input>
        </form>

        {this.state.clickCount === 1 ? <span>Are you sure? {type} will be deleted.</span>: null}
        <button onClick={this.handleDelete}>{this.state.clickCount === 1 ? 'Yes, ':null}Delete {type}</button>
      </div>
    )
  }
}

export default Edit;