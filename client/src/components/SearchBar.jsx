import React from 'react';
import { useInput } from '../hooks/input-hook.js';

///////////// USING HOOKS /////////////
var SearchBar = (props) => {
  const { value:input, bind:bindInput, reset:resetInput } = useInput('', props.search);
  const { value:option, bind:bindOption, reset:resetOption } = useInput('course id');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.search(input, option)
    resetInput();
    resetOption();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' {...bindInput} placeholder='Search by Course or Test'></input>

      <select {...bindOption}>
        <option value='course id'>Course Id</option>
        <option value='course name'>Course Name</option>
        <option value='test name'>Test Name</option>
      </select>

      <input id='form-submit-btn' type="submit" value="Submit"/>
    </form>
  )
}

export default SearchBar;


/*
///////////// WITHOUT HOOKS /////////////
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      option: 'course id'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  // handle user input for searches
  handleChange(event) {
    // search what the user has entered so far
    this.props.search(event.target.value, this.state.option);
    // update state to hold current input
    this.setState({ input: event.target.value })
  }

  // on submitting the form, search for the input & reset state
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ input: '', option: 'course id' });
  }

  // change what term to search by- course id, course name, or test name
  handleSelectChange(event) {
    this.setState({ option: event.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.input} onChange={this.handleChange} placeholder='Search by Course or Test'></input>

        <select value={this.state.option} onChange={this.handleSelectChange}>
          <option value='course id'>Course Id</option>
          <option value='course name'>Course Name</option>
          <option value='test name'>Test Name</option>
        </select>

        <input id='form-submit-btn' type="submit" value="Submit"/>
      </form>
    )
  }
}
*/