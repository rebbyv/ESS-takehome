class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      domain: '',
      duration: '',
      num_of_questions: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    let data;
    if (this.props.type === 'Course') {
      data = [this.state.name, this.state.domain, this.state.description]
    } else {
      data = [this.props.id, parseInt(this.state.num_of_questions), this.state.name, this.state.duration]
    }
    this.props.closeAdd(data, this.props.type);
  }


  render() {
    // change type & input based on whether it's a test or course being edited
    let inputTwo, inputThree;
    if (this.props.type === 'Course') {
      inputTwo = <input type='text' value={this.state.description} id='edit-course-description' onChange={this.handleChange} placeholder='Description'></input>
      inputThree = <input type='text' value={this.state.domain} id='edit-course-domain' onChange={this.handleChange} placeholder='Domain'></input>
    } else {
      inputTwo = <input type='text' value={this.state.duration} id='edit-test-duration' onChange={this.handleChange} placeholder='Test Duration'></input>
      inputThree = <input type='text' value={this.state.num_of_questions} id='edit-test-num_of_questions' onChange={this.handleChange} placeholder='Number of Questions'></input>
    }

    return (
      <div>
        <span>
          <span>Add {this.props.type}</span> 
          <span onClick={() => this.props.closeAdd(null)}>X</span>
        </span>

        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.name} id='edit-name' onChange={this.handleChange} placeholder={`${this.props.type} Name`} required></input>
          {inputTwo}
          {inputThree}
          <input type='submit' value='submit'></input>
        </form>

      </div>
    )
  }
}

export default Add;