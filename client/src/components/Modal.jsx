import React from 'react';
import { useInput } from '../hooks/input-hook.js';
import DeleteBtn from './DeletBtn.jsx';

///////////// USING HOOKS /////////////
var Modal = (props) => {
  const { value:name, bind:bindName } = useInput('');
  const { value:description, bind:bindDescription } = useInput('');
  const { value:domain, bind:bindDomain } = useInput('');
  const { value:duration, bind:bindDuration } = useInput('');
  const { value:num_of_questions, bind:bindNum_of_questions } = useInput('');


  // change type & input based on whether it's a test or course being edited
  let inputOne, inputTwo, inputThree;
  if (props.type === 'Course') {
    inputOne = <input type='text' {...bindName} className='modal-input' placeholder={props.data ? props.data.course_name: null}></input>
    inputTwo = <input type='text' {...bindDescription} className='modal-input' placeholder={props.data ? props.data.description: null}></input>
    inputThree = <input type='text' {...bindDomain} className='modal-input' placeholder={props.data ? props.data.domain: null}></input>
  } else {
    inputOne = <input type='text' {...bindName} className='modal-input' placeholder={props.data ? props.data.name: null}></input>
    inputTwo = <input type='text' {...bindDuration} className='modal-input' placeholder={props.data ? props.data.duration: null}></input>
    inputThree = <input type='text' {...bindNum_of_questions} className='modal-input' placeholder={props.data ? props.data.num_of_questions: null}></input>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.modal === 'Edit') {
      props.closeEdit(props.data, { name, description, domain, duration, num_of_questions });
    } else {
      var data = props.type === 'Course' ? [name, domain, description]: [props.id, parseInt(num_of_questions), name, duration];
      props.closeAdd(data, props.type);
    }
  }


  return (
    <div id='modal'>
    <div className='modal-body'>

      <div className='modal-header'>
        <span><strong>{props.modal}</strong> <strong>{props.type}</strong></span> 
        <span className='exit-btn' onClick={() => props.closeEdit(null)}>X</span>
      </div>

      <form className='modal-form' onSubmit={handleSubmit}>
        <label>Name:</label>
        {inputOne}
        <label>{props.type === 'Course' ? 'Description': 'Duration'}</label>
        {inputTwo}
        <label>{props.type === 'Course' ? 'Category': 'Number of Questions'}</label>
        {inputThree}
        <input className='form-btn' type='submit' value='Submit'></input>
      </form>

      {props.modal === 'Edit' ? <DeleteBtn type={props.type} data={props.data} delete={props.delete} closeEdit={props.closeEdit}/>: null}
      
    </div>
  </div>
  )
}

export default Modal;


/*
///////////// WITHOUT HOOKS /////////////
class Modal extends React.Component {
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
    this.props.closeEdit(this.props.data, this.state);
  }


  render() {
    // change type & input based on whether it's a test or course being edited
    let name, inputTwo, inputThree, labelTwo, labelThree;
    if (this.props.type === 'Course') {
      name = this.props.data.course_name;
      labelTwo = 'Description:';
      labelThree = 'Domain:';
      inputTwo = <input type='text' value={this.state.description === '' ? this.props.data.description: this.state.description} id='edit-course-description' className='modal-input' onChange={this.handleChange}></input>
      inputThree = <input type='text' value={this.state.domain === '' ? this.props.data.domain: this.state.domain} id='edit-course-domain' className='modal-input' onChange={this.handleChange}></input>
    } else {
      name = this.props.data.name;
      labelTwo = 'Duration:';
      labelThree = 'Number of Questions';
      inputTwo = <input type='text' value={this.state.duration === '' ? this.props.data.duration: this.state.duration} id='edit-test-duration' className='modal-input' onChange={this.handleChange}></input>
      inputThree = <input type='text' value={this.state.num_of_questions === '' ? this.props.data.num_of_questions: this.state.num_of_questions} id='edit-test-num_of_questions' className='modal-input' onChange={this.handleChange}></input>
    }

    return (
      <div id='modal'>
        <div className='modal-body'>
          <div className='modal-header'>
            <span><strong>Edit {this.props.type}</strong></span> 
            <span className='exit-btn' onClick={() => this.props.closeEdit(null)}>X</span>
          </div>

          <form className='modal-form' onSubmit={this.handleSubmit}>
            <label>Name:</label>
            <input type='text' value={this.state.name === '' ? name: this.state.name} id='edit-name' className='modal-input' onChange={this.handleChange}></input>
            <label>{labelTwo}</label>
            {inputTwo}
            <label>{labelThree}</label>
            {inputThree}
            <input className='form-btn' type='submit' value='Submit'></input>
          </form>

          <DeleteBtn type={this.props.type} data={this.props.data} delete={this.props.delete} closeEdit={this.props.closeEdit}/>
          
        </div>
      </div>
    )
  }
}

export default Modal;
*/