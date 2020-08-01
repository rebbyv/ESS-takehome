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
    let inputTwo, inputThree, labelTwo, labelThree;
    if (this.props.type === 'Course') {
      labelTwo = 'Description:';
      labelThree = 'Domain:'
      inputTwo = <input type='text' value={this.state.description} className='modal-input' id='edit-course-description' onChange={this.handleChange} placeholder='Description'></input>
      inputThree = <input type='text' value={this.state.domain} className='modal-input' id='edit-course-domain' onChange={this.handleChange} placeholder='Domain'></input>
    } else {
      labelTwo = 'Duration:';
      labelThree = 'Number of Questions:'
      inputTwo = <input type='text' value={this.state.duration} className='modal-input' id='edit-test-duration' onChange={this.handleChange} placeholder='Test Duration'></input>
      inputThree = <input type='text' value={this.state.num_of_questions} className='modal-input' id='edit-test-num_of_questions' onChange={this.handleChange} placeholder='Number of Questions'></input>
    }

    return (
      <div id='modal'>
        <div className='modal-body'>
          <div className='modal-header'>
            <span><strong>Add {this.props.type}</strong></span> 
            <span className='exit-btn' onClick={() => this.props.closeAdd(null)}>X</span>
          </div>

          <form className='modal-form' onSubmit={this.handleSubmit}>
            <label>Name:</label>
            <input type='text' value={this.state.name} className='modal-input' id='edit-name' onChange={this.handleChange} placeholder={`${this.props.type} Name`} required></input>
            <label>{labelTwo}</label>
            {inputTwo}
            <label>{labelThree}</label>
            {inputThree}
            <input className='form-btn' type='submit' value='Submit'></input>
          </form>

        </div>
      </div>
    )
  }
}

export default Add;